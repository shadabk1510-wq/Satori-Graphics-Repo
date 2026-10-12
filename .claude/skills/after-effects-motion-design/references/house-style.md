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

## Satori reference videos (Drive: `Satori Video Refrence`, broken down 2026-10-12)
These are two finished Satori Graphics videos. They are the target for **look, colour and how visuals follow the voice-over**. The palette comes from **each video's topic or sponsor**; the technique stays the same.

### Ref 1: "Luma Skills" (30 s, coral and pink, kinetic type)
- **Palette**, measured from the frames:
  - coral `#DE4E5F` / `#E16170`;
  - mid pink `#EB99A4` / `#ECA3AB`;
  - blush `#F4CCD1` / `#FAD0D5`;
  - near-white `#FDF5F6`;
  - white `#FFFFFF`.
- **Backgrounds:**
  - soft blush → coral vertical gradients with a radial coral blob;
  - plain white for emphasis words;
  - full coral radial gradient for big statements.
  - Faint **design-canvas grid lines with corner dots** sit on top.
- **Captions are the VO, phrase by phrase.** ~2.8 words/s, 3–6 words on screen at a time.
  - Each word fades and de-blurs in on its own beat, slightly off its baseline, then settles.
  - The phrase drifts upward slowly while it holds, then blurs off.
  - Weights: light/semibold white over pink, **bold coral** over white for emphasis words ("Importantly", "It's not magic"), and **huge bold white** over coral ("Myself", with the vertical word roller above and below).
- **Opening:** a photoreal studio desk (3D or photo) whose ultrawide monitor shows the captions on a coral gradient, with a slow camera push.
  - Words split apart to make room for an **inline image chip** ("Finally Nailed [image] Direction").
- **Icon cards:** four white rounded cards (icon + two-line label) pop in staggered in a row.
  - They then re-arrange into a diamond, and coral connector lines draw on between them.
- **UI mockup:** a dark app window (with a pink outer glow) swings in from a 3D tilt.
  - A product image is dragged into the prompt bar.
  - Prompt text types on.
  - A results grid fills in staggered, with pink placeholder tiles before each image loads.
- **Transitions:**
  - motion-blurred whip and zoom of huge type ("Importantly" streaks in, then scales down);
  - quick cross-dissolves between caption beats;
  - 4-point **sparkle stars** pop beside "magic".

### Ref 2: "Dropbox × ChatGPT" (3 min sponsor walkthrough, dark navy and electric blue)
- **Palette:**
  - navy `#06071C` / `#121731` / `#141E3E` (top-left);
  - electric blue `#3572F8` / `#3D5FF8` (bottom glow);
  - mid blues `#1C417B` / `#295AD1`;
  - cyan `#3E93DD` / `#6CA8D6`.
  - Logo scenes switch to flat grey `#C4C4C4`; screen recordings are dark UI `#171717`.
- **Background:** one navy → electric-blue gradient with a big soft blue glow rising from the bottom edge. It stays under the whole video.
- **Hook (0–28 s):**
  - A dot grows into a white circle badge with **rotating circular text** ("Design Process — BRIEF → RESEARCH → CONCEPT → …"); the product image inside swaps on the beat.
  - The headline sits beside it in two weights: thin "I've been thinking a lot about" over **bold italic underlined "Artificial Intelligence"**.
  - A 3D chrome-blue head render with a UI widget ("ADD INFORMATION NO. 1 [INSERT]"): a cursor clicks, the counter increments, and white "Info." speech-bubble chips flip out of the head in 3D.
- **Logo and glass-card sequence:**
  - The logo shrinks on grey, an outline card draws around it, and a light sweep crosses it.
  - Cut to blue: a **glass card** draws its outline from one corner (trim path), then fills with a blue-violet → cyan gradient.
  - A vertical line splits it into two halves, the second logo rises in, small tracked caps labels appear below (DROPBOX / CHATGPT), and an "×" draws on.
  - Meme characters peek in from the card edges ("like Rick and Morty"); the card stretches to a full-width banner and the show logo is revealed.
- **Explanation (28 s – 2:50):** screen recordings on a 3D plane.
  - A 3D laptop pushes in, then the screen fills the frame.
  - Recordings tilt on Y/X to show their edge against the blue background.
  - The camera pushes in on the part being talked about (a table, the prompt bubble).
  - **Glass callout cards** slide in from the frame edge with bullet lists ("Material Used: • the original client brief • audience research • feedback…"), with a hand-drawn curved arrow.
  - Floating 3D folder icons ("Audience Research", "Discovery Notes", "Brief") orbit a white app-logo disc.
- **End:** logo on grey with a small line ("Use my link below").
- **VO pacing:** ~165 words/min. Every noun the VO names gets a visual on that word: "Dropbox" → logo, "Rick and Morty" → characters, "the brief, the feedback, the audience research" → the bullet card.

### What carries across both (apply to every Satori video)
1. **The visuals follow the VO word by word.** Captions or kinetic type for statements; an object, logo, card or UI for every named thing, landing on the word.
2. **One continuous gradient background per video**, coloured from the topic or sponsor brand. Use a light/pastel world (ref 1, the Tallyo lab) or a dark navy + brand-glow world (ref 2). Not both in one video.
3. **Glass and white cards:** rounded, thin white stroke, gradient or white fill, soft shadow or outer glow. They draw on (outline trim) or pop in staggered; light sweeps cross logos.
4. **Type:** Inter/SF-style sans. Two-weight headlines (thin lead-in + bold or bold-italic key phrase). Bold for emphasis words; small tracked caps for labels.
5. **UI and screen recordings live in 3D:** tilted planes, a laptop push-in, and camera pushes to the detail. Callouts slide in from the edge.
6. **Motion:** motion-blurred whips and zooms for emphasis; the circular-text badge, the word roller and the canvas grid with corner dots as signature pieces.
7. **Holds:** the reference screen-recording section has 0.5–1.3 s fully still stretches (about 73 s of the 3 min). Under the hold-drift rule above, **never leave those still**: give every recording a slow push or tilt drift.

## Per-video colour reference (the user's rule, 2026-10-12)
- The user names the colour reference for each video. Video 4 ("New Meta Logo") uses reference 1's coral-pink world:
  - blush → coral gradient light;
  - white cards with a warm shadow (`#B8485C` tint);
  - plum `#33222A` and coral `#DE4E5F` type;
  - a deeper red `#D93448` for alarm bubbles.
- The subject's own brand colour stays only on the subject (the Meta blue M).
- The thumbnail sets the editorial pieces (big lowercase heavy type, cut-out, "!" bubbles), not the palette.
- Lock visuals to the VO: transcribe it with word times, cue each scene on a VO phrase, and reveal caption words on their spoken time (Video 4's `MM.say` / `MM.times`).
