# House style (the user's own work). Read this before designing any scene for this user.

Built from the user's own scene breakdown ("Main SaaS", Scene 1: a 2.4 s vertical clip, the timeline and graph-editor screenshots, and the render). Extend this file as more of their projects come in, ideally as `export_template.jsx` JSON.

## Format and pacing (the user's direction, 2026-10-11)
- Satori videos are **16:9** (1920×1080). The Scene 1 breakdown was vertical, but use it only as a **technique reference**: keyframes, colours, the graph editor and speed ramping, gradients, and how nulls move from one frame to the next with cuts in between. It doesn't set the format.
- **Only the hook is fast**: 0.6–1.8 s beats, snappy cuts and whips, as in Scene 1.
- **After the hook the video explains**, following the script: calm pacing that follows the voice-over, with **clean, smooth motion**, no rushing and no busy cuts. Keep the same easing character (clean high-influence speed ramps), applied to longer, calmer moves.
- Make the flow creative, but follow the structure of old Satori videos; the user will share some for breakdowns.
- Something should always move gently (drifting gradient light, a slow null push) so a hold never looks frozen.

## Hold drift: no frame ever freezes (the user's rule, 2026-10-11)
- **Whenever a frame is on screen, it moves.** Parent every layer of a frame (or element group) to its own null, and give that null a small, steady move for the whole time the frame is held.
- **The drift continues the entrance**:
  - slid in left → right: keep sliding right a little;
  - scaled down into place: keep scaling down a little;
  - scaled or grew up: keep growing;
  - rose in: keep rising;
  - flipped or turned: keep turning a few degrees.
- **Size:** subtle but visible.
  - Position: 25–50 px over the hold (more in z, e.g. 80 px toward camera).
  - Scale: 3–8%.
  - Rotation: 4–10°.
- **Ease:** near-linear (influence 1/1), so the drift never eases to a stop. Make a master push linear right up to the exit (the zoom-through or whip).
- **Keys:** keep the entrance and exit keys on the child or the MASTER. The drift null sits between them (MASTER → `... drift` → content), runs from the entrance to the end of the beat, and carries on underneath the exit, so the motion is continuous across the landing and the cut.
- **Code:** in the Satori kit this is `SAT.drift(S, name, parent, {pos | scale | rx | ry | rz}, t0, t1)`.

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

## SaaS Style 1: Scenes 2 and 3 (Drive: `Satori Projects/Scene breakdown/Saas Style 1`)
- **Zoom-through transition** (Scene 1 → 2):
  - The master **Null 15** scales from 100% to **352%** in about 8 frames. Its speed spike is the tallest in the comp (~12,500 %/s): a near-symmetric, very high-influence ease with motion blur.
  - The text flies through the lens, then there's a **hard cut**. The next beat starts *already moving* (tiles mid-flip), so the cut hides inside the motion.
- **Chained nulls:** Null 19 → Null 18 → cards; Null 17 → Null 16 (Position + Scale 145.6%) → lines, text, square and icon. Each beat has its own small rig, and the parent rig moves the whole layout between beats.
- **Design-canvas guide lines:** thin white lines (`lines`, `lines 2–4`) slide into place to frame the headline, like Figma guides.
- **Headline reveal** ("Type or Speak"): a text animator named **IN** whose Range Selector **Offset** is keyed (word-by-word slide and fade). A gradient highlight bar (`square`, a 4-Color Gradient solid) sits behind the text.
- **3D tiles** (card precomps with an icon) **flip in from edge-on** (Y rotation ~90° → face-on), then drift slowly. One sits top-left and one bottom-right, framing the text diagonally.
- **The background gradient stays continuous across cuts:** every 4-Color Gradient solid has the same Point 1–4 keys (for example P1 48,−254; P2 1191,−243; P3 −108,2098; P4 861,1667), so the light keeps drifting through the cut.
- **Phone shots** (Scene 3) use a bought **Videohive "Phone 17 Loop Mockup"**:
  - a pre-rendered phone loop (`07 Mockup Loop (Alpha)`), time-remapped;
  - app UI goes into its `Placeholder_01/02` comps, and `CC Cylinder` (Rotation Y) bends the screen;
  - there's a `Control` layer.

  Our scripts should *fill the user's own mockup templates* (find the Placeholder comps and drop the UI in) rather than rebuild the phones. Never ship the template's own files.
- **Drive transfer:** the connector moves files up to ~3 MB each. Ask for big JSON exports **zipped** (they shrink ~10×), and for big videos either compressed or attached in chat.
