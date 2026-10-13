# Handoff: Satori Graphics × Claude, moving to your PC

**Prepared:** 2026-10-13, from the cloud session that built everything below.
**Your local root:** `D:\EYDIT\Satori Graphic`
**Repository:** `shadabk1510-wq/Satori-Graphics-Repo` (renamed on GitHub from `Video-project-1`; the old address still redirects), branch `claude/after-effects-code-skills-bh5k75`. Everything is pushed.

This file is the complete record. It covers:
- every project, script, tool, rule and preference we set up;
- what's only in this cloud session, which is now in the handoff zips;
- how to carry on locally, by hand in After Effects or with Claude Code on your PC.

---

## 1. What to download and where to put it

I sent these zips in the chat. Extract **every zip into the same folder**, `D:\EYDIT\Satori Graphic\`. They all start with `Video-project-1\`, so they merge into one project folder.

| Zip | What's inside | Goes to |
|---|---|---|
| `SatoriGraphic_Handoff_1_Code.zip` | All the code from git: build scripts, kits, the Claude skill, tools, docs, this file | `D:\EYDIT\Satori Graphic\Video-project-1\` |
| `SatoriGraphic_Handoff_2_Video4_assets_web.zip` | `meta_muse\assets\web\`: article page captures, Muse images, logos, book covers, Hische work | merges into the same folder |
| `SatoriGraphic_Handoff_3_Video4_assets_main.zip` | `meta_muse\assets\` (root and `sourced\`): cut-outs, faces, paper textures, press photos, `vo_small.mp3` | merges |
| `SatoriGraphic_Handoff_4_NOON_assets.zip` | `noon_ae\assets\_ae\`: NOON images, the motion clips, `chat_clip.mp4`, `dropbox_clip.mp4`, `vo_chunk4.m4a` | merges |
| `SatoriGraphic_Handoff_5_Video4_SFX.zip` | The Video 4 SFX project kit: script, your 24 SFX files, the SFX stem WAV, README | anywhere, e.g. `D:\EYDIT\Satori Graphic\Video 4 New Meta Logo\SFX\` |

Afterwards it looks like this:
```
D:\EYDIT\Satori Graphic\
├─ Video-project-1\                 ← this repository (code + assets)
│  ├─ HANDOFF.md                    ← this file
│  ├─ CLAUDE.md                     ← context for Claude Code on your PC
│  ├─ README.md
│  ├─ .claude\skills\after-effects-motion-design\   ← the skill (loads automatically in Claude Code)
│  ├─ noon_ae\      NOON (11-min design tutorial)
│  ├─ style_lab\    Aurelo style lab (2-min test film)
│  ├─ satori_lab\   Satori lab (30 s Tallyo sample)
│  └─ meta_muse\    Video 4 "New Meta Logo" (+ sfx\)
├─ SFX\NOON_SFX\                    ← recommended home for your SFX library (the scripts look here first)
└─ … your existing Satori project folders, untouched
```

**With git instead of zip 1** (recommended, so you can pull future changes):
```powershell
cd "D:\EYDIT\Satori Graphic"
git clone -b claude/after-effects-code-skills-bh5k75 https://github.com/shadabk1510-wq/Satori-Graphics-Repo.git Video-project-1
```
The last word keeps the folder name `Video-project-1`, so the asset zips line up. Then extract zips 2–4 over it. They contain only files git ignores, so they don't clash.

Nothing in the zips is a program that runs by itself. The `.jsx` files run only when you start them from After Effects.

---

## 2. Software on your PC

| Needed for | Install | Notes |
|---|---|---|
| Building any project | **After Effects 2023 or newer** | Preferences › Scripting & Expressions › tick **Allow Scripts to Write Files and Access Network** |
| All builds | **Inter** font family (static TTFs: Light, Regular, Medium, SemiBold, Bold, ExtraBold, **Black**) | Restart AE after installing |
| Using Claude Code locally | **Claude Code** (desktop app or CLI) | Open `D:\EYDIT\Satori Graphic\Video-project-1` as the project |
| git (optional, recommended) | Git for Windows (`winget install Git.Git`) | |
| The checks and tools (optional) | **Node.js 22** (`winget install OpenJS.NodeJS.LTS`) | `ae_sim`, `check_jsx.mjs`, the web capture scripts |
| | **Python 3.11+** (`winget install Python.Python.3.12`) + `pip install numpy pillow` | SFX tools, `media_tools.py` |
| | **ffmpeg** (`winget install Gyan.FFmpeg`) | probes, previews, mixes |
| | Playwright: `npm i playwright` then `npx playwright install chromium` | `ae_sim` preview renders and article captures |
| VO word timings, offline (optional) | `pip install sherpa-onnx` + the Parakeet TDT 0.6B v2 int8 model (~650 MB) | Or use ElevenLabs Scribe (costs credits) |

Install these yourself, and only the ones you need. For just opening and editing in AE, you need only After Effects and Inter.

---

## 3. The projects

### 3.1 Video 4: "New Meta Logo" (Meta Muse / Jessica Hische). Latest; most detail in `meta_muse\README.md`
- **Story:** a 7:18 commentary. Jessica Hische designed the M for Meta's AI agent Muse, then faced backlash and personal attacks.
- **Inputs (your Drive `Video 4 New Meta Logo\`):**
  - `Voice over\Vo MEta MUse.mp3` (plus `vo_small.mp3`);
  - `Materials\` (Script.docx, Notes.txt, thumbnail.png, The Godfather of Design.png, logo compafriosn.gif);
  - `Asset requirements\`.
- **History:**
  - **v1:** 60 scenes in a pastel SaaS style. You rejected it: slow, crossfades, blank frames, icon-heavy, "kid work".
  - **v2:** a documentary rebuild with real article pages, photos, pushes, whips and zooms. You approved it with fixes ("too much wiggle in the beginning… align the text angles"). Fixed: no shakes, no swinging or rotating, level text, gentler slams.
  - **Your edit:** you edited it in AE and rendered `Compressed.mp4` (1280×720, 23.976 fps, 7:18.27).
  - **SFX:** I built a separate SFX project over your render. The first script failed in your AE. The second version (one self-contained file with clear error messages) hasn't been confirmed by you yet.
- **Build:** in a new, empty AE project, run `meta_muse\ae\scripts\build_meta.jsx`. You get `META_MAIN`, 1920×1080, 29.97 fps, 438.3 s, saved as `meta_muse\ae\META_MUSE.aep`.
  - Put `Vo MEta MUse.mp3` in `meta_muse\assets\` for full-quality VO.
  - Build only some scenes: set `MM_CONFIG.only = ["K05","K06"]` or `MM_CONFIG.until = 103` at the top of `build_meta.jsx`.
- **Code:** `mm_kit.jsx` (base kit, the M logo, captions), `mm_doc.jsx` (documentary kit: backgrounds, transitions, article pages, highlighter, pen rings, clippings, posts, calendar), and `mm_scenes_*.jsx` (the 64 scenes). The full API is in `meta_muse\README.md`.
- **Your render vs the build** (found by comparing frames):
  - **Same:** structure, VO timing.
  - **Changed:**
    - backgrounds;
    - real photos instead of the redacted house prints;
    - inserted shots at 1:58 (studio), 2:52 (WIRED hero), 5:06–5:20 (stock clip) and 5:31 (silhouettes);
    - end cards blanked from about 7:07.
- **SFX:** `meta_muse\sfx\MM_SFX_project.jsx` and zip 5.
  1. Run it from AE (File › Scripts › Run Script File) **after extracting** the zip.
  2. It asks for your render, starts a new project, and builds `META_Video4_SFX`: your render (locked) plus one `SFX (all sounds)` layer. That layer's Audio Levels is the master volume.
  3. Inside, there's one layer per sound (227 cues), named like `whoosh  1:58.22  E13 push in`.
  4. It saves `META_Video4_SFX.aep` next to the script.
  - Easiest route: `META_Video4_SFX_stem.wav` (SFX only, starts at 0:00) dropped under your edit.
  - Levels: 7–13 dB under the VO; the mix peaks at −1.2 dBFS.
  - Your inserted shots and the outro have no build sounds; your cuts into the inserted shots get whooshes.

<details><summary><b>Video 4 scene list (64 scenes, build timeline)</b></summary>

| Scene | Starts | Title | Comes in by |
|---|---|---|---|
| H1 | 0:00.00 | Design job | cut |
| H2 | 0:02.70 | The new Muse logo | zoom |
| H3 | 0:04.30 | Didn't expect | whip |
| H3b | 0:06.94 | Anger escalating | cut |
| H4 | 0:09.66 | Photographs | whip |
| H5 | 0:12.54 | Went there | cut |
| H6 | 0:16.22 | According to WIRED | zoom |
| H7 | 0:21.90 | Personal AI agent | push |
| H8 | 0:26.30 | So angry | whip |
| E01 | 0:30.92 | The job itself | zoom |
| E02 | 0:33.24 | Not a blank artboard | push |
| E03 | 0:38.92 | What they asked | push |
| E04 | 0:47.12 | Sketch to refined | push |
| E05 | 0:57.12 | Whose decisions | cut |
| E06 | 1:03.52 | Comparisons | push |
| E07 | 1:08.80 | Easy to liken | whip |
| E07b | 1:16.16 | So much design work | cut |
| E08 | 1:20.88 | In her words | cut |
| E08b | 1:26.35 | A pen stroke | push |
| E09 | 1:32.35 | Angles, endings, rhythm | push |
| E10 | 1:38.59 | Thirty variations | zoom |
| E11 | 1:43.31 | Proof | push |
| E12 | 1:49.63 | Not the main issue | whip |
| E13 | 1:58.11 | Not about the M | push |
| E14 | 2:06.74 | The real objection | zoom |
| F01 | 2:15.38 | Why take the gig | push |
| F02 | 2:18.10 | She knew | push |
| F03 | 2:23.54 | Client work slowed | push |
| F04 | 2:28.18 | Shops and staff | push |
| F05 | 2:33.06 | The fee | push |
| F06 | 2:42.10 | Should she accept | push |
| F07 | 2:51.87 | Appeal vs objection | cut |
| F08 | 3:00.03 | Something to welcome | zoom |
| G01 | 3:10.43 | Another response | whip |
| G02 | 3:14.11 | Don't talk about it | push |
| G03 | 3:24.59 | Deserved recognition | cut |
| G04 | 3:32.93 | Quiet = acceptable? | push |
| G05 | 3:38.21 | Silence changes nothing | zoom |
| K01 | 3:51.49 | How people responded | push |
| K02 | 3:57.49 | Disgusted | push |
| K03 | 4:07.49 | Massively disappointing | push |
| K04 | 4:13.73 | Judging the decision | push |
| K05 | 4:22.05 | A hit for the mob | zoom |
| K06 | 4:29.41 | Godfather IV | push |
| K07 | 4:42.29 | A disturbing fact | cut |
| K08 | 4:52.37 | What purpose | push |
| K09 | 5:06.38 | Not exactly | push |
| L01 | 5:21.82 | You can disagree | zoom |
| L02 | 5:24.14 | Cross a line | push |
| L03 | 5:31.34 | Assignment vs person | push |
| L04 | 5:41.03 | Part of their life | cut |
| L05 | 5:46.31 | So tribal | push |
| L06 | 5:57.51 | Whose side | push |
| L07 | 6:03.99 | Explain or keep quiet | cut |
| L08 | 6:12.55 | Explain why | zoom |
| L09 | 6:19.27 | Same standard | push |
| L10 | 6:27.77 | Would you turn it down | cut |
| L11 | 6:31.29 | Difficult questions | push |
| L12 | 6:39.37 | Stop sharing | push |
| L13 | 6:47.77 | Question openly | zoom |
| M01 | 6:54.33 | Would you take it | push |
| M02 | 7:01.29 | Discuss it | push |
| M03 | 7:06.62 | Subscribe | push |
| M04 | 7:13.90 | Design your future today | zoom |
</details>

### 3.2 NOON: the 11-minute design tutorial (delivered; docs in `noon_ae\docs\NOON3_AE.md`)
- **v1/v2:** the first AE tests (blush/coral theme).
- **v3:** motion clips made first as HTML with the motion-broll engine (`noon_ae\motion\`), then ported to native AE.
  - The full build is `noon_ae\ae\scripts\build_noon3.jsx`: 31 clips in 4 VO chunks up to 11:00, NOON3_MAIN 660.5 s, 23.976 fps.
  - Each clip has a `WORLD (camera)` and one continuous `SHAPE` card (W/H/Radius/CX/CY/Fill/Pop/Press sliders, spring expressions).
  - Captions are word-timed with layer markers.
- **SFX:** `noon_ae\ae\scripts\add_sfx.jsx` runs on your open NOON3 project.
  - 190 cues, the comp `NOON3 SFX`, 33 files from `NOON_SFX`.
  - It looks for the library in `D:\EYDIT\Satori Graphic\SFX\NOON_SFX`, then `D:\AE Assets\3. sfx\NOON_SFX`, then asks.
- **Style test:** `noon_ae\ae\scripts\style\`, the glass look and a 3D camera on one moment (8:22). Docs: `noon_ae\docs\STYLE_TEST.md`.
- **Open from the brief:** the laptop mockup (you said you'd add it), the reference videos you mentioned (never received), and music (yours).
- **Assets:** zip 4. Use your own original NOON VO for full quality; the build uses `vo_chunk4.m4a`.

### 3.3 Aurelo style lab: a 2-min test film for a glass / 3D look (`style_lab\README.md`)
- A fictional AI workspace app.
- 10 scenes: CC Light Sweep with your settings, Gradient Ramps, null rigs with lifted cascades, a two-node camera with depth of field, and a STYLE CONTROLS layer.
- Run `style_lab\ae\scripts\build_lab.jsx` in a new project. It needs no assets. **Status:** waiting on your render and feedback.

### 3.4 Satori lab: a 30 s Tallyo sample in your own style (`satori_lab\README.md`)
- Built from your SaaS Style 1 and 2 breakdowns: lens bubble, fake-extruded tiles, word roller, zoom-throughs, radial orbit, rig cascade, end card.
- **v2** added the **hold-drift rule** (every held frame keeps moving the way it came in).
- Run `satori_lab\ae\scripts\build_sat.jsx`. **Status:** approved overall. `sat_kit.jsx` from it is reused in Video 4.

---

## 4. The Claude skill: `.claude\skills\after-effects-motion-design\`
Claude Code on your PC loads it automatically when you open the `Video-project-1` folder. It holds everything we learned.

| File | What it holds |
|---|---|
| `SKILL.md` | The workflow: preflight → plan → build with scripts → check → run → verify; handoff mode vs live mode; long VOs; SFX; copying a template's style; safety; portable project layout |
| `references\house-style.md` | **Your style rules. Read before any new video.** Summary in § 5 |
| `references\sfx-workflow.md` | The SFX method: cues from the build timings, measured levels, ElevenLabs credit rules (§ 7), SFX over a render you've re-edited (§ 8) |
| `references\production-workflow.md` | Asset intake, reading a reference video, VO sync, organisation, handoff |
| `references\extendscript-api.md`, `motion-recipes.md`, `render-and-troubleshoot.md` | AE scripting reference, motion recipes, rendering and troubleshooting |
| `jsx\` | `ae_lib.jsx` (helpers), `starter_build.jsx`, `add_sfx.jsx` (template), `export_template.jsx` (dumps any AE project's style and motion to JSON), `probe_env.jsx` |
| `scripts\ae_sim\` | **ae_sim**: a strict model of the AE scripting DOM plus a Chromium preview renderer. It catches errors before AE does and renders preview frames and video |
| `scripts\sfx\` | `events.py`, `classify.py`, `measure.py`, `mix.py` (the NOON SFX pipeline) |
| `scripts\web\` | `article_capture.cjs` (full-page article screenshot + rects of the quoted lines), `page_images.cjs`, `fetch_in_page.cjs` (images from sites that block downloads) |
| `scripts\asr\words_parakeet.py` | Offline word timings for long VOs |
| `scripts\` | `check_jsx.mjs` (ES3 syntax + AE pitfalls), `mock_run.mjs`, `media_tools.py` (probe, scenes, speech, …), `svg_to_ae.py` (SVG icons → shape data), `escape_jsx.py` (non-ASCII → `\uXXXX`), `run_jsx.sh` / `detect_env.sh` (run JSX in a local AE) |

**ae_sim commands** (from the skill's `scripts\ae_sim` folder; Node 22 + Playwright):
```
node model.mjs path\to\build.jsx out.json                      # run the build in the strict model
node render.mjs out.json --comp META_MAIN --times 1,5,9 --out sheet.png
node render.mjs out.json --comp META_MAIN --video out.mp4 --from 0 --to 30 --fps 24 --width 960
```

**Live mode on your PC:** with After Effects on the same machine, Claude can run scripts straight in AE: `AfterFX.exe -r script.jsx`, or `scripts\run_jsx.sh` (in Git Bash) with `AE_EXE` set to your `AfterFX.exe`. That's faster than handoff mode: Claude runs it, reads `*.result.json`, fixes, and runs again.

---

## 5. Your rules (from all reviews; the full text is in `house-style.md`)
- **Format:** 16:9, 1920×1080. **Only the hook is fast** (0.6–1.8 s beats, whips, zoom-throughs). After the hook: calm, smooth, explanatory, but a new visual still lands every ~2–3 s. Calm means smooth, not slow.
- **No opacity crossfades between scenes, ever.** Use push, whip, zoom-through, match cut, or hard cut on the beat. The screen is never blank.
- **No wiggle:** no camera shake, no swinging or rotating pops, no rotating drifts. Slams start at ≤130 % and settle over ~0.3 s.
- **Text is always level** (no Z tilt). Pages may lean in 3D but never roll. Only photos and tape may sit at an angle.
- **Hold drift:** no frame ever freezes. Each frame hangs from a `… drift` null that keeps moving the way it came in (25–50 px, 3–8 % scale, 4–10°), near-linear.
- **Easing:** SNAP 92/92, OUT 12/96, IN 96/12, CALM 70/70. Tall, narrow speed spikes, no overshoot. Rigs: MASTER → drift → content; group everything that moves together.
- **Storytelling over SaaS:**
  - Use real images: the people, their work, places, real article pages. Icons only as small accents.
  - Show the person whenever the VO talks about them.
- **Articles:** the documentary treatment. Page on a 3D plane over paper, camera push to the quoted line, highlighter synced to the VO, red pen circles, tape.
- **Visuals follow the VO word by word.** Captions reveal on spoken word times; scenes cue on VO phrases.
- **Numbers pop in at their final value.** Never a "0" waiting.
- **No layout scraps:** no half logos, stray credits, or elements cutting into each other.
- **Backgrounds vary per scene:** paper collage, brand world, full-bleed photo, the reference gradient.
- **Colour reference is per video**, chosen by you.
  - Video 4 uses ref 1's coral-pink: blush → coral, white cards, plum `#33222A`, coral `#DE4E5F`, alarm `#D93448`.
  - The subject's brand colour (Meta blue) appears only on the subject.
- **Previews at 24 fps or more.**

---

## 6. How a new video was made (the pipeline to repeat)
1. **Intake:** a Drive folder per video (`Voice over`, `Materials`, `Asset requirements`). Read the script, notes and thumbnail, and agree the colour reference.
2. **VO word timings:** run `scripts\asr\words_parakeet.py` (or ElevenLabs Scribe, which costs credits) and store the result as `MM_WORDS`-style data.
3. **Beat sheet:** one scene per VO phrase. Decide each scene's transition in and its key visual. Source real images and article pages: use `article_capture.cjs` and measure the quoted lines' rects.
4. **Build:** the project kit plus the scene files (ES3, non-ASCII escaped). Check with `check_jsx.mjs`, then `ae_sim` (model → contact sheets → 24 fps preview).
5. **Deliver:** the package zip (scripts + assets) and the preview. You run it in AE.
6. **SFX:** for a build we made, use `add_sfx.jsx`. For a render you re-edited, use the Video 4 method (`meta_muse\sfx\tools`, `sfx-workflow.md` § 8). Use your library first.

---

## 7. Working preferences and safety rules (please keep these for Claude locally)
- **Credits:** you're careful with credits. Keep checks light and ask before long renders or generations.
- **ElevenLabs:**
  - your SFX library first; ElevenLabs only for unique sounds;
  - always `estimate_only` first, 1–2 variations, never repeat a call to retry;
  - the restricted connector has no music. Music needs the full connector (`https://api.elevenlabs.io/v1/mcp`).
- **Security (your words):**
  - "Do not blindly execute remote scripts or install untrusted packages."
  - "Ask for my approval before any risky installation, elevated permission, or destructive system change."
  - "Do not claim to have edited, exported, or saved anything until that work has actually been completed."
  - Never paste API keys in chat.
- **Scripts never overwrite:** every build saves `_v002`, `_v003` and so on, and SFX scripts ask before rebuilding their comp.
- **Git:** work on `claude/after-effects-code-skills-bh5k75`. Client assets, VOs, renders and zips stay out of git (`.gitignore`).
- **Tools you asked about** (only explained, not installed in the cloud):
  - **claude-mem:** your choice was "on my own PC": `npx claude-mem install`, Anthropic plan provider, Cloud Sync off, `<private>` tags for anything sensitive.
  - **headroom:** `pip install "headroom-ai[all]"`, `setx HEADROOM_BEACON off`, then `headroom wrap claude` or `headroom mcp install`.
  - **OmniRoute:** explained only.

  Install any of them only if you still want them; they're third-party tools.

---

## 8. Connectors and data (cloud → local)
- **Google Drive:** your folders (`Video 4 New Meta Logo`, `Satori Video Refrence`, `Satori Projects\Scene breakdown\Saas Style 1`) stay on Drive. Connect the Drive connector in Claude to read them, or sync them into `D:\EYDIT\Satori Graphic`.
- **ElevenLabs:** the restricted connector is connected to your claude.ai account. If it doesn't appear in Claude Code on your PC, add it there as an MCP connector (check Claude Code's settings / `/mcp`).
- **GitHub:** the repository above. The cloud session pushed every change. A local clone gets everything except the asset zips.
- **What existed only in the cloud session and wasn't kept** (all reproducible):
  - `ae_sim` model dumps and preview renders;
  - the Parakeet model download;
  - the speech-to-text intermediates (`MM_WORDS` itself is in `mm_data.jsx`);
  - the WAV conversions of the SFX library;
  - the frame-comparison data used for the SFX.

  The useful one-off scripts are now in the skill's `scripts\web` and `scripts\asr`.

---

## 9. Every deliverable sent so far

| File | Contents |
|---|---|
| `NOON_Test_v2_package.zip`, `NOON_v3_AE_package.zip`, `NOON3_StyleTest_script.zip`, `NOON3_SFX_preview_audio.m4a` | NOON builds, style test, SFX preview |
| `AURELO_StyleLab_package.zip` | Aurelo style lab v2 |
| `SATORI_Lab_package.zip`, `SATORI_Lab_v2_package.zip`, `SATORI_sample_preview_lowres.mp4` | Satori lab |
| `META_Video4_v2_package.zip` | Video 4 v2: scripts + assets (the final approved build) |
| `META_Video4_v2_FULL_preview_small.mp4` | Video 4 v2 full preview (24 fps) |
| `META_Video4_SFX_package.zip` + `META_Video4_SFX_preview.mp4` | Video 4 SFX over your render (superseded by zip 5 of this handoff) |
| `SatoriGraphic_Handoff_1…5` | This handoff |

---

## 10. Open items and next steps
1. **Video 4 SFX:** run the new `MM_SFX_project.jsx` (zip 5). If it stops, the message names the step; send me a screenshot. Or just use the stem WAV.
2. **Optional marker-scribble SFX:** your library has no pen sound, so the pen rings and highlights use a soft swipe. Generating one in ElevenLabs costs 1–2 variations.
3. **NOON:** add the laptop mockup and music; any client changes.
4. **Aurelo style lab:** your render and feedback.
5. **Next video:** drop the Drive folder (VO, materials, asset requirements). On your PC, Claude can now run the builds in your After Effects directly.

## 11. Commit history (oldest → newest)
- 2026-10-09 `320b7d8` Add after-effects-motion-design Claude Code skill
- 2026-10-09 `bae8400` Fix media_tools speech --noise usage for negative dB values
- 2026-10-09 `554afa3` Add NOON style-test AE build (first 61 s of VO)
- 2026-10-09 `c978705` NOON test v2: blush/coral theme, drop-in icons/radar, stage-2 UI scenes
- 2026-10-09 `565a056` Fix v2 build stopping after scene 3; caption legibility
- 2026-10-09 `b436c75` NOON v3: continuous-shape motion clips rendered with the motion-broll engine
- 2026-10-09 `879fe39` Ignore mock-run expressions.json output
- 2026-10-09 `254e03d` Clip 06: finish brief bullets and skeleton before the cut to clip 07
- 2026-10-09 `1882c7b` Clip 08: fade the cursor in after the cut instead of popping on
- 2026-10-09 `0f62554` Clip 11: word-synced intro line fills the empty card; larger High-level label
- 2026-10-09 `b947771` NOON v3 native AE build: noon3 library, clip 02 port, ae_sim model + Chromium previewer
- 2026-10-09 `91da2b4` Seamless 09->10 cut (camera settles, chips carried over); porting guide and per-clip AE test harness
- 2026-10-09 `f0a0cb5` AE port: clip 01 (hook) and clip 03 (radar)
- 2026-10-09 `20a72c9` AE port: clips 06 and 07; blur in AE units (BLUR_K), motion blur on all clip comps; previewer fill rule
- 2026-10-09 `2df32a9` WIP: AE ports of clips 04, 05, 08-12 in progress (not yet verified)
- 2026-10-09 `cdbf527` AE port: clips 04, 05, 08-12 verified; footage-aware blur/shadow in N3; 11->12 label match; previewer: text on path, dashes, spatial tangents, mask default
- 2026-10-09 `411526c` NOON3 AE build hand-over notes; skill: native AE port + ae_sim verification workflow
- 2026-10-09 `a013dee` Seamless 02->03 (in 2027 column) and 03->04 (radar carried over and cleared)
- 2026-10-09 `d0ec84e` AE port: seamless 02->03 (in 2027 column) and 03->04 (radar carried over)
- 2026-10-09 `fc8ead0` Fix AE build: every clip failed on NaN ease speed (2-value Scale keys); ASCII-escape JSX text; model now ES3-strict (no ES5+ built-ins) and rejects NaN eases
- 2026-10-09 `cb13ebe` AE build: warm up Inter weights before building (first-text serif font quirk)
- 2026-10-09 `e7ee9e1` Fix AE run on 26.0: stale property refs (live refs, re-fetch), time remap hold, expressions retried after each clip, defensive VO step; model reproduces AE invalid refs, time-remap rules and expression reference checks
- 2026-10-09 `feade65` Chunk 2: clip 12 runs on into the working document; clips 13-18 (jobs, PURPOSE, content plan, stage, main-pack build, DESIGN RULES); shared scene kit; camera drift; VO chunk 2
- 2026-10-09 `f495914` Chunk 3: clips 19-25 (rules 1-3, rules beside the designs, motion rule, stage 05 review, follows-the-rules stamps); kit rule boards and mocks; VO chunk 3
- 2026-10-09 `e794eff` NOON3: chunk 4 (clips 26-31), final part to 11:00
- 2026-10-09 `ef2da50` NOON3: escape non-ASCII in kit and clips 29-31 for ExtendScript
- 2026-10-10 `077e810` NOON3: add_sfx.jsx places 191 SFX cues from the build timings
- 2026-10-10 `606c679` NOON3 SFX: measured timing and levels for the NOON_SFX files
- 2026-10-10 `18ed191` Skill: SFX workflow, chunked-VO workflow and AE gotchas from real runs
- 2026-10-10 `d4667a5` Skill: export_template.jsx dumps an AE template's style and motion to JSON
- 2026-10-10 `8a4973e` NOON3 style test: glass look kit from the two reference templates
- 2026-10-10 `26672ed` gitignore: style test package zip
- 2026-10-10 `3d87347` ae_sim renders 3D camera, gradients, box blur; fix array math in look.jsx
- 2026-10-10 `aee821f` Style lab: 2-min Aurelo sample in the new look, separate from NOON
- 2026-10-10 `ddc0057` Style lab v2: CC Light Sweep, gradient ramps and null rigs with lifted cascades
- 2026-10-10 `104073a` Style lab README: panels use CC Light Sweep
- 2026-10-10 `587af30` Skill: ElevenLabs rules for SFX (library first, estimate, 1-2 variations, no music on the restricted connector)
- 2026-10-10 `0b99bb5` Add repo README: layout, current state, next steps, working rules
- 2026-10-11 `0b86409` Skill: house-style notes from the user's Scene 1 breakdown
- 2026-10-11 `be24f7b` House style: 16:9, fast pacing only in the hook, calm clean motion for explanations
- 2026-10-11 `ab65465` House style: SaaS Style 1 scenes 2-3 (zoom-through cut, chained nulls, guide lines, offset reveal, mockup templates)
- 2026-10-11 `f8bed99` Satori lab: 30 s sample in the user's own style (Tallyo, fictional)
- 2026-10-11 `c4dab98` Satori lab v2: hold drift - every held frame keeps moving the way it came in
- 2026-10-12 `a13fbce` House style: breakdown of the two Satori reference videos
- 2026-10-12 `1ce740a` Video 4 (Meta Muse): look and beat-sheet plan from the script and thumbnail
- 2026-10-12 `f71779c` Video 4 (Meta Muse): full 7:18 build locked to the VO
- 2026-10-12 `78d26a7` House style: hard rules from the Video 4 review (no crossfades, real images, documentary article treatment, pacing)
- 2026-10-12 `1c6e23c` Video 4 v2: documentary rebuild of 0:00-1:43 (hook + chapter 1)
- 2026-10-12 `a293e24` Video 4 v2: no shakes or wiggles, level text, gentler slams (user review)
- 2026-10-12 `5b9ce88` Video 4 v2: full rebuild 1:43-7:18 in the documentary style
- 2026-10-12 `70a706c` Video 4: separate SFX project over the user's re-edited render
- 2026-10-12 `bfc29f1` Video 4 SFX: one self-contained script (no includes), clear step-by-step error messages
- 2026-10-13 this handoff (HANDOFF.md, CLAUDE.md, web/ASR tools in the skill, local SFX paths)
