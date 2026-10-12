VIDEO 4 ("New Meta Logo"): SOUND EFFECTS PROJECT
================================================

This is a separate After Effects project that lays the sound effects over the video you already rendered.
Your own project is not opened or changed.

WHAT'S IN THIS FOLDER
  MM_SFX_project.jsx         The script that builds the SFX project, all in one file. The 227 cue times
                             are inside it, one line each, if you ever want to edit them as text.
  SFX/                       24 sounds from your NOON_SFX library. Nothing new was bought or generated.
  META_Video4_SFX_stem.wav   All the sounds already mixed as one 48 kHz WAV (no VO), 7:18.27, starting at 0:00.
                             Use this if you would rather drop the SFX straight into your edit.

HOW TO BUILD IT
  1. UNZIP the whole folder first (right-click > Extract All). Running the script from inside the zip
     does not work, because AE can't see the SFX folder. You can also copy your rendered video
     (.mp4/.mov) into the unzipped folder.
  2. In After Effects, go to File > Scripts > Run Script File... and pick MM_SFX_project.jsx.
       - If your video is not in this folder, the script asks you to pick it.
       - The script starts a new project. AE asks whether to save the open one first, as usual.
  3. The script saves META_Video4_SFX.aep in this folder. If that file already exists, it saves _v002, _v003
     and so on instead of overwriting.
  4. If something goes wrong, a message says which step stopped and why. Send me a screenshot of it.

WHAT THE PROJECT CONTAINS
  Comp "META_Video4_SFX" (same size, fps and length as your render):
    - "YOUR RENDER (picture + VO)": your video, locked.
    - "SFX (all sounds) - Audio Levels here = master volume": one layer holding every sound.
      Raise or lower all the SFX at once with this layer's Audio Levels.
  Comp "SFX (all sounds)" (in 02_SFX files): one layer per sound. Each layer is named
  "<sound>  <m:ss>  <scene> <what moves>", for example "whoosh  1:58.22  E13 push in".
    - To retime a sound, drag its layer.
    - To swap a sound, Alt-drag a different file onto the layer.
    - To change one sound's volume, use that layer's Audio Levels. To remove it, delete the layer.

EXPORT
  Composition > Add to Render Queue, then:
    - Output Module "WAV" (audio only) gives you an SFX stem. Turn your render layer's audio off first.
    - A normal video module gives you the picture with VO and SFX mixed.

HOW THE CUES WERE MADE
  - Every cue comes from the motion in the build: whips, zooms, pushes, pages, tags, pops, pen rings and
    highlights, the calendar, the montage and the post cards.
  - Each cue was checked against your render, and a cue was dropped wherever your edit no longer shows that
    motion: the studio shot at 1:58, the WIRED shot at 2:52, the clip at 5:06-5:20, the silhouettes at 5:31,
    and the end from 7:07 on, which is left silent for your outro.
  - Your cuts in and out of those shots got their own whoosh.
  - Each transition sound peaks on your cut (measured: median +0.01 s).

  Levels:
  - The sounds sit 7-13 dB under your VO: whooshes about 10 dB under, ticks about 13 dB under.
  - The mix peaks at -1.2 dBFS, which is your VO's own peak, so nothing clips.

  Sound types and their layer label colours:
  - whoosh (push), zoomw (zoom-through), swish (whip / element sliding in), paper (pages, clippings),
    draw (pen rings, underlines, highlighter), pop (tags, faces, reactions), tick (headlines, calendar days,
    variations), click (montage cuts, redaction bars), type (comment boxes), ding (heart / share),
    window (browser, post cards), accent (the Muse logo reveal).
