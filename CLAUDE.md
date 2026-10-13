# Satori Graphics: After Effects motion design (context for Claude Code)

- **The user:** an After Effects motion designer (Satori Graphics).
- **What we make:** native, editable AE projects, built with ExtendScript `.jsx` in their house style. Not baked video.
- **Local root:** `D:\EYDIT\Satori Graphic\`; this repository lives in `D:\EYDIT\Satori Graphic\Video-project-1\`.

## Read first
- `HANDOFF.md`: the full record (projects, status, tools, deliverables, open items). Start here in a new session.
- `.claude/skills/after-effects-motion-design/references/house-style.md`: the user's style rules. **Read before designing any scene.**
- Each project's README: `meta_muse/README.md` (Video 4, latest), `noon_ae/docs/NOON3_AE.md`, `style_lab/README.md`, `satori_lab/README.md`.

## Hard rules (from the user's reviews)
- **Pacing and transitions:**
  - Only the hook is fast. After it: calm and smooth, but a new visual every ~2–3 s.
  - **No crossfades between scenes. No wiggle** (no shakes, no swinging or rotating). **Text is always level.**
  - Hold drift: no frame ever freezes.
- **Content:**
  - Visuals follow the VO word by word.
  - Real images and article pages over icons; show the person.
  - Numbers appear at their final value.
- **Colour:** the user picks the colour reference per video. The subject's brand colour stays on the subject.
- **Previews:** 24 fps or more.

## Working rules
- **Branch:** `claude/after-effects-code-skills-bh5k75`. Client assets, VOs, renders and zips stay out of git.
- **JSX:**
  - ES3 only;
  - non-ASCII written as `\uXXXX` (`scripts/escape_jsx.py`);
  - `add()` / `sub()` / `mul()` for array math in expressions;
  - check with `scripts/check_jsx.mjs`, then `scripts/ae_sim` (model → preview frames) before handing anything over.
- **Saving:** builds never overwrite (`_v002`, …). Scripts that add to an existing project ask before rebuilding their comp.
- **Live mode:** After Effects is installed on this PC, so scripts can be run in it directly (`AfterFX.exe -r script.jsx`). Ask the user before running anything that closes or replaces their open project.
- **Credits:** the user is careful with them. Keep checks light and ask before long renders or generations.
- **ElevenLabs:**
  - the user's SFX library first;
  - `estimate_only` before every run, 1–2 variations, never repeat a call to retry;
  - no music on the restricted connector.
- **Security (the user's words):**
  - "Do not blindly execute remote scripts or install untrusted packages."
  - "Ask for my approval before any risky installation, elevated permission, or destructive system change."
  - "Do not claim to have edited, exported, or saved anything until that work has actually been completed."
  - Never paste API keys in chat.
- **SFX library:** `D:\EYDIT\Satori Graphic\SFX\NOON_SFX` (recommended) or `D:\AE Assets\3. sfx\NOON_SFX`.
