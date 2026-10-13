# Satori Graphics: motion design with After Effects scripts

After Effects projects built as native, editable layers from ExtendScript (`.jsx`), plus the Claude Code skill and tools behind them.

**Moving to your PC or starting a new session? Read `HANDOFF.md` first.** `CLAUDE.md` gives Claude Code the context.

## Layout

| Folder | What it is |
|---|---|
| `.claude/skills/after-effects-motion-design/` | The skill: workflow, AE scripting reference, motion recipes, the SFX workflow, `ae_sim` (a strict AE model plus a preview renderer), SFX tools, and `export_template.jsx` |
| `noon_ae/` | **NOON**, the 11-minute design-tutorial video (delivered). The build is `ae/scripts/build_noon3.jsx`; the docs are in `docs/NOON3_AE.md` |
| `noon_ae/ae/scripts/add_sfx.jsx` + `sfx/` | NOON sound effects: 190 cues from the build timings, run on the finished project |
| `noon_ae/ae/scripts/style/` | NOON style test: the glass look and 3D camera on one moment (8:22) |
| `style_lab/` | **Aurelo** style lab: a separate 2-minute test film (fictional app) for the new look. See `style_lab/README.md` |
| `satori_lab/` | **Satori lab**: a 30 s sample in the user's own style (Tallyo, fictional), built from their scene breakdowns. See `satori_lab/README.md` |
| `meta_muse/` | **Video 4, "New Meta Logo"** (Meta Muse / Jessica Hische): a 7:18 documentary-style commentary locked to the VO (v2). See `meta_muse/README.md` |
| `meta_muse/sfx/` | Video 4 sound effects: a separate AE project over the user's own re-edited render (227 cues) |

Client assets, voice-overs, renders and package zips are kept out of git (see `.gitignore`).

## Where things stand
- **NOON:** delivered, SFX added. Client changes, if any, come later.
- **Style lab v2:**
  - built with CC Light Sweep using the user's settings, Gradient Ramps on UI, null rigs with lifted, cascading rows, and a two-node camera with depth of field;
  - waiting on the user's render and feedback.
- **Next:** match the user's own style (pacing, design and 3D moves). The inputs will be:
  - their finished projects exported with `export_template.jsx`, run with no comp open so it exports every comp;
  - each project's render and voice-over;
  - a cheat sheet of their rules.

  Turn these into a house-style section in the skill.
- **Satori lab:**
  - The 30 s sample is approved overall.
  - v2 adds the hold-drift rule: every held frame keeps moving the way it came in (see `references/house-style.md`).
  - The Satori reference videos (Drive: `Satori Video Refrence`) are broken down in `references/house-style.md`: palettes, VO-synced visuals, glass cards, 3D screen recordings.
  - Per-video folders on Drive (VO, materials, asset requirements) start each project.
- **Video 4 (Meta Muse):**
  - v1 was rejected; the v2 documentary rebuild (64 scenes) was approved with fixes;
  - the user re-edited and rendered it;
  - the SFX project over their render was delivered: v2 of the script is self-contained, but not yet confirmed in their AE.
- **ElevenLabs:** the restricted connector is connected (SFX, TTS, transcription; no music). Credit rules are in the skill's `references/sfx-workflow.md` § 7.

## Working rules
- Develop on `claude/after-effects-code-skills-bh5k75`; commit and push every change.
- Check every build in `ae_sim` before delivery: `node model.mjs build.jsx out.json`, then `node render.mjs out.json --comp NAME --times ...`.
- Write non-ASCII in JSX as `\uXXXX`. In expressions, use `add()` / `sub()` / `mul()` for array math.
- The user is careful with credits: keep checks light, and ask before long generations or renders.
