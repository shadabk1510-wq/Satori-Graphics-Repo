# Style lab: "Aurelo" sample (2:00)

This is a test piece for the new look, kept separate from NOON: it has its own folder, its own After Effects project and its own copies of the libraries. Aurelo is a fictional AI workspace app, and every name, message and number in it is made up for the demo.

## Run it
1. Use After Effects 2023 or newer, with the Inter font installed (Regular, Medium, SemiBold, Bold, ExtraBold).
   Turn on Preferences › Scripting & Expressions › Allow Scripts to Write Files.
2. Open a **new, empty project** and go to **File › Scripts › Run Script File… › `style_lab/ae/scripts/build_lab.jsx`**.
3. It builds `AURELO_MAIN` (1920×1080, 23.976 fps, 2:00), saves `style_lab/ae/AURELO_LAB.aep` (re-runs save `_v002`, and so on) and writes `build_lab.result.json`.

There's no voice-over. A marker at 0:00 says where your music goes, and each scene's start has its own marker.

## Scenes

| # | Time | Scene | What it shows |
|---|---|---|---|
| 01 | 0:00 | Hook | Blur-in headline; three glowing "noise" pills |
| 02 | 0:09 | Noise field | 14 notification cards in depth; the camera flies through them |
| 03 | 0:21 | Reveal | Ring draws on, the wordmark rises, a light sweep crosses it |
| 04 | 0:31 | Dashboard | Tilted glass dashboard settles; counters, a chart line that draws on, bars, floating callouts |
| 05 | 0:47 | AI summary | Prompt types in; the answer builds line by line; result pills glow |
| 06 | 1:00 | Tasks | Tasks tick off with a cyan glow; the progress ring fills to 80% |
| 07 | 1:13 | Focus | The week's meetings clear; a glowing focus block takes their place |
| 08 | 1:25 | Integrations | Eight app tiles orbit the hub in 3D |
| 09 | 1:37 | Results | Three numbers on a curved wall of glass cards |
| 10 | 1:48 | End | Logo, line, a "Start free" button with a breathing glow |

## How it's built (all editable)
- **Camera:** each scene comp has a two-node `CAMERA` with depth of field. The focus follows the cards, and Aperture is linked to the **Depth blur** slider.
- **STYLE CONTROLS:** a layer in every scene comp with **Shadow %, Glow %, Sweep %, Camera move %** and **Depth blur**.
- **Glass panels:** a `4-Color Gradient` body, a rim that fades downward (`Gradient Ramp` on a stroke), and a light sweep (a blurred band in Add mode, alpha-matted to the panel).
- **Glows:** a zero-distance `Drop Shadow` named "Glow halo". **Shadows:** a near-black "Shadow tight" plus "Shadow wide".
- **Easing:** CALM (70/70) for the camera and fades, EXPO (30 → 100) for entrances. There's no overshoot anywhere.
- **Transitions:** each scene layer in `AURELO_MAIN` fades over 0.8 s with a soft blur and scale. To change one, drag the keys on that layer.
- **Code:**
  - `lab_kit.jsx`: building blocks;
  - `scenes/`: the scenes;
  - `lib/`: copies of `ae_lib`, the NOON element library, icons and `look.jsx`.
