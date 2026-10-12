# Video 4 SFX step 2: build events -> sound cues, checked against the user's own render, written as JSX.
# Usage: python3 mm_classify.py model.json events.json scene_dir user24.gray mine24.gray cues.jsx cues.json
#   user24/mine24.gray: ffmpeg -i X -vf "fps=24,scale=96:54,format=gray" -f rawvideo X.gray
# A cue is kept only if the user's render actually moves around that time (their edit replaced some visuals),
# and cuts that exist only in the user's render (their inserts) get a whoosh of their own.
import json, re, sys, os, glob
import numpy as np
model, evf, scdir, ug, mg, out_jsx, out_json = sys.argv[1:8]
d = json.load(open(model)); comps = {c['name']: c for c in d['comps']}
ev = json.load(open(evf))

# scene windows in META_MAIN and how each scene comes in
TIN = {}
for f in glob.glob(os.path.join(scdir, 'mm_scenes_*.jsx')):
    for m in re.finditer(r'id: "(\w+)".*?tin: \{ how: "(\w+)"', open(f).read()):
        TIN[m.group(1)] = m.group(2)
SC = []
for L in comps['META_MAIN']['layers']:
    src = (L.get('source') or {}).get('comp') or ''
    if src.startswith('SAT '): SC.append((L['in'], L['out'], src.split()[1]))
SC.sort()

# ---- candidates -------------------------------------------------------------------------------------------
c = []   # (t, sound, scene, note)
for i, (a, b, sid) in enumerate(SC):
    how = TIN.get(sid, 'cut')
    if i == 0: continue
    if how == 'push': c.append((a + 0.19, 'whoosh', sid, 'push in'))
    elif how == 'whip': c.append((a, 'swish', sid, 'whip in'))
    elif how == 'zoom': c.append((a, 'zoomw', sid, 'zoom in'))

first_marker = set()
DRAW = r'^(Pen ring|Strike|Underline|Marker underline|The line|Callout line|Client work line|Highlighter)'
PAGE = r'(page|Clipping|Brief|Sketch sheet|Variations sheet|Sketchbook|Artboard)$'
POPS = r'^(Tag bg|Bubble|Face$|Reaction|Callout box|Muse mascot|Mark$|Lookalike ring|Mural mini|Muse mini|Shop$|The work$|Divider|Caption panel)'
TICKS = r'^(Day|Variation|Logo card|Print|Handle)'
for t, sid, name, pn, v0, v1, span in ev:
    if name.endswith(' drift') or name == 'MASTER' or name.startswith('BG'): continue
    if pn == 'Marker':
        if name.startswith('Slam') and (sid, name) not in first_marker:
            first_marker.add((sid, name)); c.append((t, 'pop' if sid.startswith('H') else 'tick', sid, name))
        continue
    if re.match(DRAW, name):
        if name == 'Highlighter' and not (isinstance(v1, list) and v1[0] > (v0[0] if isinstance(v0, list) else 0)): continue
        c.append((t, 'draw', sid, name)); continue
    if name in ('Ghost M', 'Muse M', 'Meta sketch', 'Pen stroke') and 'Trim' in pn:
        c.append((t, 'accent' if name == 'Muse M' else 'draw', sid, name)); continue
    if pn == 'Path 1/Path': c.append((t, 'whoosh', sid, name + ' morph')); continue
    if name.endswith('page camera'):
        if span >= 0.3 and t > 0: c.append((t, 'whoosh', sid, name))
        continue
    if 'Range Selector' in pn: c.append((t, 'type', sid, name + ' dur=%.2f' % span)); continue
    if name == 'Offer card' and 'Light sweep' in pn: c.append((t, 'shine', sid, '$12,500 gleam')); continue
    if name in ('Tile heart', 'Tile share'): c.append((t, 'ding', sid, name)); continue
    if name in ('Hush bar', 'Redaction bar'): c.append((t, 'click', sid, name)); continue
    if name == 'Montage': c.append((t, 'click', sid, 'montage image')); continue
    grow = isinstance(v0, list) and isinstance(v1, list) and pn.endswith('Scale') and v1[0] > v0[0] and v0[0] < 60
    if pn.endswith('Scale') and not grow: continue
    if re.match(TICKS, name): c.append((t, 'tick', sid, name)); continue
    if re.match(POPS, name): c.append((t, 'pop', sid, name)); continue
    if pn.endswith('Position') or pn.endswith('Rotation'):
        if name in ('Calendar',) or re.search(PAGE, name): c.append((t, 'paper', sid, name)); continue
        if name == 'muse.ai': c.append((t, 'window', sid, 'browser window')); continue
        if name == 'Comment box' or name == 'Her post': c.append((t, 'window', sid, name)); continue
        if span >= 0.25 and not name.startswith('Tag'): c.append((t, 'swish', sid, name)); continue
    if pn.endswith('Scale') and grow: c.append((t, 'pop', sid, name))
c.sort()

# ---- check against the user's render ----------------------------------------------------------------------
U = np.fromfile(ug, np.uint8).reshape(-1, 54, 96).astype(np.float32)
M = np.fromfile(mg, np.uint8).reshape(-1, 54, 96).astype(np.float32)
def motion(V):
    df = np.abs(np.diff(V, axis=0)).reshape(-1, 6, 9, 8, 12).mean((2, 4))   # 6x8 cells
    return np.concatenate([[0], df.reshape(len(df), -1).max(1)])
mu, mm = motion(U), motion(M)
def win(a, t, lo=-0.12, hi=0.5): i0, i1 = int((t + lo) * 24), int((t + hi) * 24) + 1; return a[max(0, i0):i1].max()
def grad(V):   # edge image, normalised: matches layouts even when the colours / backgrounds changed
    g = np.abs(np.diff(V, axis=2))[:, :-1, :] + np.abs(np.diff(V, axis=1))[:, :, :-1]
    g = g - g.mean((1, 2), keepdims=True); return g / (np.sqrt((g ** 2).mean((1, 2), keepdims=True)) + 1e-3)
n = min(len(U), len(M)); corr = (grad(U[:n]) * grad(M[:n])).mean((1, 2))
def same(t):   # layout similarity of their frame and the build over the next 0.6 s (about 0 = their own shot)
    i = int(t * 24); return float(corr[max(0, i):min(n, i + 15)].mean())
# their own shots: stretches of 1.5 s+ where the layout matches the build nowhere (1 s mean < 0.1)
cs = np.convolve(corr, np.ones(24) / 24, 'same'); low = cs < 0.1; INS = []; i = 0
while i < n:
    if low[i]:
        j = i
        while j < n and low[j]: j += 1
        if j - i >= 36: INS.append((i / 24, j / 24))
        i = j
    else: i += 1
OUTRO = INS[-1][0] if INS and INS[-1][1] > n / 24 - 1 else 1e9   # their render ends on their own outro
print('their shots:', [(round(a, 2), round(b, 2)) for a, b in INS])
hard = [(i + 1) / 24 for i in np.where(np.abs(np.diff(U, axis=0)).mean((1, 2)) > 50)[0]]
AT = {'whoosh': 0.15, 'zoomw': 0.10, 'swish': 0.08}
kept, dropped = [], []
for t, s, sid, note in c:
    um, bm, df = win(mu, t), win(mm, t), same(t)
    trans = note.endswith(' in')
    inside = any(a + 0.3 < t < b - 0.1 for a, b in INS) or t >= OUTRO - 0.2
    ok = um >= 2.5 and not inside and (trans or um >= 0.3 * bm)
    if ok and trans:   # their edit cut here: put the sound's peak on the cut
        near = [h for h in hard if abs(h - (t + AT[s])) < 0.4]
        if near: t = round(min(near, key=lambda h: abs(h - t - AT[s])) - AT[s], 3)
    if s == 'click' and note == 'montage image': ok = False   # the montage gets its clicks from their own cuts
    (kept if ok else dropped).append((t, s, sid, note, round(float(um), 1), round(float(bm), 1), round(df, 2)))

# user-only cuts (their inserts): a hard cut with no build transition within 0.4 s
cut = np.where(np.abs(np.diff(U, axis=0)).mean((1, 2)) > 28)[0] + 1
cuts = []
for i in cut:
    t = i / 24
    if cuts and t - cuts[-1] < 0.5: continue
    cuts.append(t)
bt = [a for a, b, sid in SC if TIN.get(sid, 'cut') != 'cut']   # build transitions that already carry a sound
def diff_at(t): i = min(max(int(t * 24), 0), len(U) - 1, len(M) - 1); return float(np.abs(U[i] - M[i]).mean())
mont = [(a, b) for a, b, sid in SC if sid == 'E07b']
for t in cuts:
    if any(a - 0.1 <= t <= b + 0.1 for a, b in mont):
        kept.append((t, 'click', 'E07b', 'montage cut %.2f' % t, 0, 0, 0)); continue
    if min(abs(t - x) for x in bt) > 0.3 and t < OUTRO - 0.2 and any(abs(t - a) < 0.6 or abs(t - b) < 0.6 for a, b in INS):
        kept.append((t - 0.05, 'whoosh', 'USER', 'your inserted shot (cut %.2f)' % t, 0, 0, 0))
kept.sort()

# ---- cluster + thin ---------------------------------------------------------------------------------------
PRI = ['accent', 'shine', 'zoomw', 'window', 'swish', 'whoosh', 'click', 'ding', 'type', 'paper', 'draw', 'pop', 'tick']
GAP = {'whoosh': 1.0, 'zoomw': 1.0, 'swish': 0.6, 'window': 1.0, 'paper': 0.6, 'draw': 0.5, 'pop': 0.2, 'tick': 0.18, 'click': 0.18, 'ding': 0.4}
out = []
for q in kept:
    t, s = q[0], q[1]
    near = [p for p in out if t - p[0] < 0.2]
    if near:
        if PRI.index(near[-1][1]) <= PRI.index(s): continue
        out.remove(near[-1])
    if any(p[1] == s and t - p[0] < GAP.get(s, 0) for p in out): continue
    out.append(q)
# ticks/pops in long runs (calendar days, 30 variations, logo wall): keep at most one per 0.3 s
thin = []
for q in out:
    if q[1] in ('tick', 'pop', 'click') and thin and thin[-1][1] == q[1] and q[0] - thin[-1][0] < 0.3: continue
    thin.append(q)
out = thin
# body headlines (slams after the hook) tick only when nothing else sounds within 1 s
out = [q for q in out if not (q[1] == 'tick' and q[3].startswith('Slam') and any(p is not q and abs(p[0] - q[0]) < 1.0 for p in out))]

def mmss(t): return '%d:%05.2f' % (int(t // 60), t % 60)
L = ['// Video 4 (New Meta Logo) SFX cues: [time in your render (s), sound, note, typing length (s) or 0].',
     '// Made from the build timings and checked against your render (cues whose visual you replaced were dropped;',
     '// your inserted shots got their own whoosh). Edit a time here, or drag the layer in AE.',
     'var MM_SFX_CUES = [']
for q in out:
    m = re.search(r'dur=([\d.]+)', q[3]); dur = float(m.group(1)) if m else 0
    note = re.sub(r' dur=[\d.]+', '', '%s  %s %s' % (mmss(q[0]), q[2], q[3])).replace('"', "'")
    note = ''.join(ch if ord(ch) < 128 else '\\u%04X' % ord(ch) for ch in note)
    L.append('    [%.2f, "%s", "%s", %.2f],' % (q[0], q[1], note, dur))
L[-1] = L[-1].rstrip(','); L.append('];')
open(out_jsx, 'w').write('\n'.join(L) + '\n')
json.dump(dict(cues=out, dropped=dropped), open(out_json, 'w'), indent=0)
from collections import Counter
print('candidates', len(c), 'kept', len(kept), 'dropped', len(dropped), 'cues', len(out), Counter(q[1] for q in out))
print('per minute', sorted(Counter(int(q[0] // 60) for q in out).items()))
print('gaps > 8 s', [(mmss(a[0]), round(b[0] - a[0], 1)) for a, b in zip(out, out[1:]) if b[0] - a[0] > 8])
