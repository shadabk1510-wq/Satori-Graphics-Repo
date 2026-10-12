# Video 4: "New Meta Logo" (Meta Muse / Jessica Hische)

A 7:18 commentary video, built as native, editable After Effects layers and locked to the voice-over word by word.

- **Colours:** reference 1 (the coral-pink "Luma Skills" video), as the user asked: blush-to-coral gradient light, white cards, plum and coral type. The Meta blue is kept only for the Muse M itself.
- **Editing pieces:** from the thumbnail (huge heavy lowercase type, the B&W cut-out, the red "!" bubbles).
- **Pacing:**
  - The hook (0–31 s) is fast: whips and zoom-throughs.
  - After the hook it's calm and minimal: one idea per frame, crossfades, and every held frame drifts.

## Run it
1. Put the assets folder next to the scripts, as `meta_muse/assets/` (it's in the package).
2. Optional: for full audio quality, add the original VO, `Vo MEta MUse.mp3`, to `assets/`. Without it the build uses `vo_small.mp3`.
3. In a **new, empty project**, run `File › Scripts › Run Script File… › meta_muse/ae/scripts/build_meta.jsx`.

It builds `META_MAIN` (1920×1080, 29.97 fps, 7:18.3) and saves `meta_muse/ae/META_MUSE.aep`. You need the Inter font family, including **Inter Black**.

## How it's built
- **`mm_data.jsx`**:
  - `MM_WORDS`: the VO's 1,121 words with start times, from a speech-to-text pass;
  - `MM_M`: the Muse M, traced from the press image as one centre-line stroke.
- **Scene timing:** each scene starts on a VO phrase (`cue`). Every caption word appears when the VO says it, using an animator with layer markers, so you can drag a marker to retime a word.
- **`mm_kit.jsx`**:
  - captions (`MM.say`);
  - cards, pills, icon tiles, alert bubbles and redacted prints;
  - quote cards, the chapter card and the `$12,500` counter;
  - the native M: draw-on, the sketch → final morph, and 30 variations;
  - the artboard, the stroke callouts, and entrance rigs with matching hold drift.
- **Scene files:**
  - `mm_scenes_hook.jsx` (H1–H8);
  - `mm_scenes_a.jsx` (chapter 1: the job);
  - `mm_scenes_b.jsx` (2: why take the gig; 3: another response);
  - `mm_scenes_c.jsx` (4: the responses; the disturbing part; 5: you can still disagree; the close).
- **Background:** one `BG aurora` 4-Color Gradient under every cut, drifting for the full 7 minutes, with its mix shifting per chapter.

## Sources used on screen
- Article headers:
  - WIRED, "She Designed Meta's New AI Logo. Then Came the Hate" (Zoë Schiffer);
  - San Francisco Chronicle (Aidin Vaziri);
  - The Philadelphia Inquirer (opinion; Mural Arts comparison illustration by Julia Duarte).
- Images:
  - the Muse UI image (SF Chronicle);
  - the Hische cut-out, keyed from the user's own thumbnail;
  - the "Godfather IV" fictional parody poster, supplied by the user.
- The house beats use a house **icon** under redaction bars. There are no real photos of anyone's home.
