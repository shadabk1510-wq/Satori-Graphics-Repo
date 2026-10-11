# House style (the user's own work). Read this before designing any scene for this user.

Built from the user's own scene breakdown ("Main SaaS", Scene 1: a 2.4 s vertical clip, the timeline and graph-editor screenshots, and the render). Extend this file as more of their projects come in, ideally as `export_template.jsx` JSON.

## Format and pacing
- Vertical **1080×1920, 30 fps** (reels). Use **fast social pacing**: a beat lasts **0.6–1.8 s**, not the 10–15 s calm explainer scenes.
- Something always moves: the background gradient drifts, the group pushes in slowly, and the next beat arrives before the current one settles.

## Easing (speed graph)
- Speed curves are **tall, narrow spikes** (peaks of 2,000–7,000 px/s) on long flat ends. A move hangs back, snaps through in a few frames, then settles. Use **high influence (85–100%)** and stagger properties **0.1–0.3 s** apart.
- There are two flavours: a fast start with a long settle (out low, in ~100), and a slow build with a sharp stop (out ~100, in low). There's no overshoot or bounce.

## Rig
- **Null 15** sets the master **Scale** (a slow push for the whole beat). **Null 13** is the position mover, a child of Null 15, and the content hangs from it.
- **Null 12** is a 3D group null with **Scale** and **Orientation Z (~27°)**. It tilts and scales a set of 3D shape layers as one unit.
- Small items are parented to the item they ride with (`ai.png` → the "AI" text).

## Signature elements
- **Fake-extruded glossy 3D tiles:** seven stacked 3D shape layers (Shape Layer 5–11) under one null make a thick, bevelled tile, coloured blue / mint, with a white document or $ icon. They fly in, drift with rotation, and leave upward with motion blur.
- **Huge gradient type:** "AI" at a scale of ~366% that keys down into place. Lavender → white, with sparkles beside it.
- **Pastel backgrounds:**
  - sunburst rays (pink / yellow / mint / lavender) on a blush gradient;
  - or an aurora **4-Color Gradient** (lavender top-right, pink top-left, mint bottom-left, near-white middle) whose **points are keyed to drift**. The moving light is done with Point 1–4 keys.
- **Kinetic word roller:** a column of repeated words ("Handles" ×5, then "Everything"). The middle copy is 100%, the outer copies fade to ~30%. It rolls up continuously like a slot machine and swaps to the next word right after a beat.
- **Checkbox tick:** an outline box, then a green tick pops in at the beat ("That ☐ Handles" → "That ☑ Everything").

## Transitions (2–3 frames each)
- **In:** a lens bubble (CC Lens / Optics Compensation) expands from the centre with radial blur, from frame 0 to 3.
- **Out:** a whip (fast position/scale with **motion blur**) up or to the side, over the last 2–4 frames, then a hard cut.
- **End of beat:** a fast zoom-in with a shift and motion blur (the text grows and slides left).
