# Video 4: "New Meta Logo" (Meta Muse / Jessica Hische)

A 7:18 commentary video built as native, editable After Effects layers and locked to the voice-over word by word.
This is **v2, the documentary rebuild**. It was approved with one round of fixes: no wiggle, level text. You then re-edited it and rendered it yourself. The sound effects are a separate project over that render; see `sfx/`.

## Status
- **v1** (60 scenes; pastel slides, crossfades) was rejected as "slow, presentation-like". The lessons are in the skill's `references/house-style.md` › "Hard rules from the Video 4 review".
- **v2** (64 scenes) was approved, and the full package plus a 24 fps preview were delivered.
- **Your render:** you edited it in AE and rendered it yourself (`Compressed.mp4`, 1280×720, 23.976 fps, 7:18.27). The changes:
  - new backgrounds;
  - real photos in place of the redacted house prints;
  - inserted shots: the studio at 1:58, the WIRED hero image at 2:52, the stock clip at 5:06–5:20 and the silhouettes at 5:31;
  - the end cards blanked from about 7:07.
- **SFX:** `sfx/MM_SFX_project.jsx` builds a separate AE project with 227 cues over your render. The first version stopped in your AE; the self-contained version replaced it but hasn't been confirmed in your AE yet.

## Build it
1. Keep the layout: `meta_muse/ae/scripts/…` next to `meta_muse/assets/` (the assets come in the asset pack, not in git).
2. Optional, for full audio quality: put the original VO, `Vo MEta MUse.mp3`, in `assets/`. Otherwise the build uses `vo_small.mp3`.
3. Install the Inter font family, including **Inter Black**. In AE, turn on Preferences › Scripting & Expressions › Allow Scripts to Write Files and Access Network.
4. In a **new, empty project**, run File › Scripts › Run Script File… › `meta_muse/ae/scripts/build_meta.jsx`. It builds `META_MAIN` (1920×1080, 29.97 fps, 438.3 s) and saves `meta_muse/ae/META_MUSE.aep` (re-runs save `_v002`, and so on).
   - Build part of it: set `MM_CONFIG.only = ["H1", "H2"]` (scene ids) or `MM_CONFIG.until = 103` (seconds) at the top of `build_meta.jsx`.

## How it's built
- **Libraries (`ae/scripts/lib/`):**
  - `ae_lib.jsx`: the run, import and save helpers;
  - `n3_core.jsx`: text, shapes and images;
  - `look.jsx`: shadows, glows and gradients;
  - `icons.jsx` + `mm_icons.jsx`: Tabler icons;
  - `sat_kit.jsx`: the Satori kit (easing presets SNAP / OUT / IN / CALM, `SAT.drift`, `SAT.hang`).
- **`mm_data.jsx`:**
  - `MM_WORDS`: the VO's 1,121 words with start times (Parakeet speech-to-text);
  - `MM_M`: the Muse M, traced from the press image as one centre-line stroke (`sw` 110.3).
- **`mm_kit.jsx`:**
  - palette `MM.C` (ink `#33222A`, coral `#DE4E5F`, alarm `#D93448`, Meta blue `#1877F2` used only on the M);
  - VO helpers: `MM.find(phrase, from)`, `MM.times`, and `S.at(phrase)` for the local time of a phrase in a scene;
  - `MM.scene`, `MM.rig` (entrance + matching hold drift), `MM.push`, `MM.say` (word-timed captions);
  - cards, pills, tiles, bubbles, bursts, polaroids, quotes, the chapter card and the strike;
  - the M itself: `MM.muse` (draw-on), `MM.morph`, and `MM.VARIANTS` (30 variations).
- **`mm_doc.jsx` (the v2 documentary kit):**
  - backgrounds `MM.bg(S, kind)`: paper / blush / news (paper JPGs), photo (blurred + dim), and coral / blushg / muse / dark (gradients);
  - transitions `MM.inT` / `MM.outT`: push (0.38 s overlap, lockstep ease 72/72), whip, zoom-through, cut. **Never crossfades;**
  - `MM.shake` is deliberately a no-op (no wiggle);
  - type: `MM.slam` (start ≤130 %, gentle) and `MM.wordAnim`;
  - labels and images: `MM.tag` (always level), `MM.tape`, `MM.photo`, `MM.face`;
  - article pages: `MM.page` (a flat precomp tilted in 3D, so highlights never sort behind it), `MM.focus` (camera push to a line), `MM.hl` (highlighter / underline synced to the VO) and `MM.ring` (red pen circle);
  - UI pieces: `MM.browser`, `MM.react`, `MM.callbox`, `MM.calendar` + `MM.days`, `MM.post` (social post, with heart / comment / share parented to the card) and `MM.clip` (newspaper clipping);
  - `MM.PAGES`: the measured pixel rectangles of the quoted lines on the WIRED, Inquirer and SF Chronicle page captures.
- **Scenes** (each has its own comp, `SAT <id> <title>`, with its own full-frame background):
  - `mm_scenes_hook.jsx`: H1–H8 (0:00–0:31);
  - `mm_scenes_a.jsx`: E01–E10 (the job, the sketch, the 30 variations; to 1:43);
  - `mm_scenes_b.jsx`: E11–E14, F01–F08 (why take the gig, the $12,500 fee, WIRED), G01–G05 (keep it quiet);
  - `mm_scenes_c.jsx`: K01–K09 (how people responded, the Godfather line, the disturbing part), L01–L13 (you can still disagree), M01–M04 (the close).
- **Scene timing:** each scene starts on a VO phrase (`cue`). Its transition in (`tin`) sets the previous scene's exit.

## Assets (`meta_muse/assets/`, in the asset pack)
- **Root:**
  - `hische_cutout.png` (keyed from your thumbnail), `hische_face.png`, `hische_face_bw.png`;
  - `godfather_iv.png` (your parody poster);
  - `inq_*.png` and `logo_*_crop.png`;
  - `paper_warm/blush/news.jpg`;
  - `vo_small.mp3`.
- **`sourced/`:** `wired_hero.jpg`, the `sfc_*.jpg` photos and the masthead crops.
- **`web/`:**
  - full-page captures `page_wired.jpg`, `page_inq.jpg` and `page_sfc.jpg` (the rects in `MM.PAGES` match these files; recalibrate if you replace them);
  - `museai_og.jpg`, `museai_page.png`;
  - Drawling shop images;
  - 10 client logos, 7 book covers and 5 lettering works.
- **On-screen sources:**
  - WIRED, "She Designed Meta's New AI Logo. Then Came the Hate";
  - the San Francisco Chronicle;
  - The Philadelphia Inquirer (opinion; Mural Arts comparison);
  - Hische's own site (work images, downloaded before it switched to a "Coming Soon" page).

## Sound effects (`sfx/`)
- `MM_SFX_project.jsx`: a self-contained script. It makes a NEW project with your render (locked) and one "SFX (all sounds)" master layer, then saves `META_Video4_SFX.aep` next to itself.
  - Sounds come from your NOON_SFX library: the `SFX/` folder next to the script, then `D:/EYDIT/Satori Graphic/SFX/NOON_SFX`, then `D:/AE Assets/3. sfx/NOON_SFX`; if none exists, it asks.
- `README.txt`: the instructions for the user.
- `tools/`: how the cues were made.
  1. `mm_events.py`: build events from the ae_sim model.
  2. `mm_classify.py`: events → sounds, checked against your render (motion, layout match, your own shots, cut snapping).
  3. `mm_mix.py`: the mix and stem.
  4. `make_sfx_script.py`: template + `mm_sfx_cues.jsx` → `MM_SFX_project.jsx`.
- To re-time the SFX for a new render: run steps 1–4 again with the new render. See the skill's `references/sfx-workflow.md` § 8.
