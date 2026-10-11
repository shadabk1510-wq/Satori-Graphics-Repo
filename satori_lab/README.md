# Satori lab: a 30 s sample in your own style

**Tallyo** is a fictional invoice app, and every name and number in the sample is made up. The sample is built from your scene breakdowns (SaaS Style 1 and 2) and the rules in `.claude/skills/after-effects-motion-design/references/house-style.md`. It's separate from NOON and the Aurelo lab: its own folder, project file and library copies.

## Run it
In a **new, empty project**, run `File › Scripts › Run Script File… › satori_lab/ae/scripts/build_sat.jsx`. It builds `SATORI_MAIN` (1920×1080, 29.97 fps, 0:30) and saves `satori_lab/ae/SATORI_LAB.aep`. You need the Inter font.

## What's in it

| Time | Scene | Your technique it uses |
|---|---|---|
| 0:00 | H1 "AI" | Lens-bubble opening; pastel sunburst rays; "AI" scales down from 360%; two glossy **fake-extruded tiles** (7 stacked 3D layers); **whip up** with motion blur |
| 0:01.7 | H2 "That ☐ Handles → ☑ Everything" | **Word roller** (soft vertical fade) swaps on the **tick**; slow push; **zoom-through** (master null scales ~3.5× in 8 frames) |
| 0:03.9 | H3 "Type or Speak" | Lands from the zoom; **guide lines** slide in; **IN offset reveal**; gradient highlight bar; tiles **flip in from edge-on**; whip left |
| 0:06.3 | E1 pill → card | Split text slides out from behind a glass pill; the pill **morphs** into the vendor card; lines build one by one; CC Light Sweep; **3D flip** to "Approved"; zoom-through |
| 0:13.8 | E2 radial | A ring per step (Emails → PDFs → Data → Approval) **orbits** the hub; the master null **zooms out a notch per step** |
| 0:21.0 | E3 invoice panel | The **rig** rises and un-tilts (X 34 → 18°); rows **cascade from z +259.8**, 0.1 s apart; lower rows are softer; **3D-tilted text** (Orientation X 331°) |
| 0:27.0 | E4 end card | The logo ring draws on, the wordmark reveals, a light sweep crosses it, then the line |

- **Background:** one `BG aurora` 4-Color Gradient sits under every cut in `SATORI_MAIN`. Its points drift for the full 30 s, and its colour shifts in the explanation, so the cuts never feel like slides.
- **Easing**, from your graph editor:
  - **SNAP** (92/92): hangs, snaps, settles.
  - **OUT** (12/96): fast start, long settle.
  - **IN** (96/12): slow build, sharp stop.
  - **CALM** (70/70): explanation drifts.
- **Rigs:** every scene hangs from a `MASTER` null; cards, rings and the panel have their own child nulls, and every held frame sits under a drift null.
- **Pacing:** the hook is fast (0–6.3 s, beats of 1.7–2.4 s); the explanation is calm (6–7.5 s per scene).
- **Hold drift (v2):** no frame ever freezes. Every frame hangs from its own `... drift` null that keeps moving the way the frame came in:
  - **H1:** "AI" keeps scaling down; the tiles keep travelling diagonally.
  - **H2:** the line keeps rising; the push runs straight into the zoom.
  - **H3:** keeps scaling down; the tiles keep turning.
  - **E1:** the words keep sliding apart; the card keeps growing, and keeps turning after the flip.
  - **E2:** keeps zooming out between the steps.
  - **E3:** the panel keeps rising, coming closer and un-tilting; the text keeps rising.
  - **E4:** keeps settling down to the last frame.

  The drifts are near-linear, so they never ease to a stop.

No voice-over: add music on `SATORI_MAIN` (there's a marker where the hook ends).
