# words_parakeet.py: word-level timestamps for a long voice-over, offline (NVIDIA Parakeet TDT 0.6B v2 via sherpa-onnx).
# Usage: python3 words_parakeet.py MODEL_DIR vo_16k_mono.wav out.json
#   ffmpeg -i vo.mp3 -ac 1 -ar 16000 -c:a pcm_s16le vo_16k_mono.wav
#   pip install sherpa-onnx numpy; model: sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8 (k2-fsa sherpa-onnx releases, ~650 MB)
# Splits at silences into ~40 s chunks, decodes each, returns {"duration", "silences", "words": [{"w", "t"}]}.
# Video 4: 1,121 words -> MM_WORDS in mm_data.jsx. ElevenLabs Scribe is an alternative (more accurate, costs credits).
import sys, json, wave, re, subprocess, numpy as np, sherpa_onnx
m, wav, out = sys.argv[1:4]
rec = sherpa_onnx.OfflineRecognizer.from_transducer(encoder=f"{m}/encoder.int8.onnx", decoder=f"{m}/decoder.int8.onnx", joiner=f"{m}/joiner.int8.onnx",
    tokens=f"{m}/tokens.txt", model_type="nemo_transducer", num_threads=4)
w = wave.open(wav); sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
dur = len(a) / sr
log = subprocess.run(["ffmpeg", "-nostdin", "-i", wav, "-af", "silencedetect=n=-35dB:d=0.25", "-f", "null", "-"], capture_output=True, text=True).stderr
sil = [(float(s), float(e)) for s, e in zip(re.findall(r"silence_start: ([0-9.]+)", log), re.findall(r"silence_end: ([0-9.]+)", log))]
cuts, last = [0.0], 0.0
for s, e in sil:
    mid = (s + e) / 2
    if mid - last > 40: cuts.append(mid); last = mid
cuts.append(dur)
words = []
for i in range(len(cuts) - 1):
    t0, t1 = cuts[i], cuts[i + 1]
    st = rec.create_stream(); st.accept_waveform(sr, a[int(t0 * sr):int(t1 * sr)]); rec.decode_stream(st); r = st.result
    for tok, ts in zip(r.tokens, r.timestamps):
        if tok.startswith(" ") or not words or words[-1].get("_chunk") != i:
            words.append({"w": tok.strip(), "t": round(t0 + ts, 2), "_chunk": i})
        else:
            words[-1]["w"] += tok
for x in words: x.pop("_chunk")
json.dump({"duration": dur, "silences": sil, "words": words}, open(out, "w"))
print(len(words), "words", round(dur, 1), "s;", len(cuts) - 1, "chunks")
