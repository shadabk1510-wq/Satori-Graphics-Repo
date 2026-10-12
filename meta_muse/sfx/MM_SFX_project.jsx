// MM_SFX_project.jsx: a separate After Effects project with the sound effects for Video 4 ("New Meta Logo"),
// laid over the video you already rendered. Your own project is not opened or changed.
// One self-contained file: it needs only the "SFX" folder that sits next to it.
//
// HOW TO RUN
//  1. Unzip the whole META_Video4_SFX folder first (don't run it from inside the zip).
//  2. In After Effects: File > Scripts > Run Script File... > MM_SFX_project.jsx
//  3. Pick your rendered video when asked (or put the .mp4/.mov next to this script and it is used automatically).
//  4. AE starts a new project (it asks whether to save the open one first, as usual), builds the SFX project and
//     saves META_Video4_SFX.aep next to this script (never over an existing file).
//
// WHAT YOU GET
//  Comp "META_Video4_SFX": your render at the bottom (picture + VO, locked), and above it one layer
//  "SFX (all sounds)" whose Audio Levels is the master volume for every effect.
//  Inside the "SFX (all sounds)" comp each sound is its own layer, named "<sound>  <m:ss>  <scene> <element>":
//  drag it to retime, Alt-drag another file onto it to swap it, change its Audio Levels, or delete it.
//  Export: Composition > Add to Render Queue; Output Module "WAV"/"AIFF" (audio only) for an SFX stem,
//  or a normal video module for the picture with VO + SFX mixed.
//
// Plain ES3 (ExtendScript): var, function expressions, no JSON / forEach / indexOf.

(function () {
    var STEP = "starting";

    // ------------------------------------------------------------------ settings
    var MAIN_NAME = "META_Video4_SFX", SFX_COMP = "SFX (all sounds)", PROJECT = "META_Video4_SFX";
    var MASTER_NAME = "SFX (all sounds) - Audio Levels here = master volume", RENDER_NAME = "YOUR RENDER (picture + VO)";
    var TYPE_TAIL = 0.25;
    // For each sound: db = where its peak sits in the mix (dBFS; your VO sits around -16 dBFS),
    // at = where that peak lands after the cue (s), label = layer colour,
    // files = [file, time of the peak inside the file (s; typing: where the typing starts), gain that brings the
    // file's own peak to 0 dB]. Files take turns so repeats vary.
    var SOUNDS = {
        whoosh: { db: -26, at: 0.15, label: 8, files: [["Soft_Whoosh_22.wav", 0.39, 9.5], ["Whooshe_Modern_12.wav", 0.67, 3.5]] },
        zoomw:  { db: -25, at: 0.10, label: 8, files: [["Whoosh Deep Light.wav", 0.75, 8.0]] },
        swish:  { db: -27, at: 0.08, label: 14, files: [["Sharp swoosh.wav", 0.17, 14.0], ["Fast swish.wav", 0.21, 19.0], ["Short whip.wav", 0.32, 13.5]] },
        paper:  { db: -27, at: 0.05, label: 3, files: [["Just Sound Effects - Smartphone UI - Menu Navigation Swipe Short 2.wav", 0.16, 13.5]] },
        draw:   { db: -30, at: 0.20, label: 3, files: [["Just Sound Effects - Smartphone UI - Menu Navigation Swipe Short 2.wav", 0.16, 13.5], ["Sharp swoosh.wav", 0.17, 14.0]] },
        pop:    { db: -27, at: 0.03, label: 2, files: [["ui-pop-up-14-197900.mp3", 0.04, 12.0], ["floraphonic-ui-pop-up-5-197889.mp3", 0.04, 12.5], ["ui-pop-up-15-197897.mp3", 0.03, 15.0], ["bubble-pop-293342.mp3", 0.13, 12.0]] },
        tick:   { db: -30, at: 0.02, label: 12, files: [["Click_02.wav", 0.08, 12.0], ["Digital Click - 1.mp3", 0.24, 22.0], ["Digital Click - 3.mp3", 0.25, 25.5], ["Digital Click - 7.mp3", 0.08, 19.5]] },
        click:  { db: -26, at: 0.00, label: 9, files: [["Button_01.wav", 0.02, 12.0], ["Click_02.wav", 0.08, 12.0]] },
        type:   { db: -29, at: 0.00, label: 10, files: [["Keyboard - 4.mp3", 0.08, 29.0], ["typing_keyboard.mp3", 0.04, 38.0]] },
        ding:   { db: -25, at: 0.02, label: 11, files: [["notification-ping-372479.mp3", 0.10, 12.5], ["Right (bells).wav", 0.04, 22.5]] },
        window: { db: -25, at: 0.10, label: 5, files: [["ES_Flash, Modern, Design 01 - Epidemic Sound.mp3", 0.10, 21.5], ["HUD Screen - 02.wav", 0.43, 20.5]] },
        shine:  { db: -24, at: 0.10, label: 13, files: [["Gleam hit.wav", 0.75, 23.0]] },
        accent: { db: -22, at: 0.00, label: 13, files: [["Reverse Boom 2.wav", 0.99, 5.0]] }
    };

    // ------------------------------------------------------------------ cues
    // [time in your render (s), sound, note, typing length (s) or 0]. Made from the build timings and checked
    // against your render. Edit a time here, or just drag the layer in AE.
    var CUES = [
        [0.25, "swish", "0:00.25  H1 Hische", 0.00],
        [1.92, "pop", "0:01.92  H1 Tag bg", 0.00],
        [2.72, "accent", "0:02.72  H2 Muse M", 0.00],
        [4.25, "swish", "0:04.25  H3 whip in", 0.00],
        [4.51, "draw", "0:04.51  H3 Underline", 0.00],
        [7.04, "pop", "0:07.04  H3b Reaction Disgusted.", 0.00],
        [7.44, "pop", "0:07.44  H3b Reaction selling out", 0.00],
        [8.08, "pop", "0:08.08  H3b Reaction massively disappointing", 0.00],
        [8.56, "pop", "0:08.56  H3b Reaction it's about ethics", 0.00],
        [9.09, "pop", "0:09.09  H3b Bubble !", 0.00],
        [9.59, "swish", "0:09.59  H4 whip in", 0.00],
        [10.16, "tick", "0:10.16  H4 Print", 0.00],
        [11.06, "draw", "0:11.06  H4 Pen ring", 0.00],
        [11.36, "click", "0:11.36  H4 Redaction bar", 0.00],
        [12.64, "pop", "0:12.64  H5 Slam: yeah, people actually", 0.00],
        [14.00, "pop", "0:14.00  H5 Slam: went there.", 0.00],
        [16.15, "zoomw", "0:16.15  H6 zoom in", 0.00],
        [16.52, "whoosh", "0:16.52  H6 WIRED page camera", 0.00],
        [17.98, "pop", "0:17.98  H6 Face", 0.00],
        [19.55, "draw", "0:19.55  H6 Underline", 0.00],
        [21.95, "window", "0:21.95  H7 browser window", 0.00],
        [23.39, "pop", "0:23.39  H7 Tag bg", 0.00],
        [24.73, "pop", "0:24.73  H7 Muse mascot", 0.00],
        [26.30, "swish", "0:26.30  H8 whip in", 0.00],
        [28.08, "pop", "0:28.08  H8 Slam: so, so very angry?", 0.00],
        [28.39, "pop", "0:28.39  H8 Bubble !", 0.00],
        [28.91, "pop", "0:28.91  H8 Bubble !", 0.00],
        [30.86, "zoomw", "0:30.86  E01 zoom in", 0.00],
        [32.30, "draw", "0:32.30  E01 Marker underline", 0.00],
        [33.43, "whoosh", "0:33.43  E02 push in", 0.00],
        [34.14, "paper", "0:34.14  E02 Artboard", 0.00],
        [34.49, "tick", "0:34.49  E02 Handle 1", 0.00],
        [35.44, "draw", "0:35.44  E02 Strike", 0.00],
        [36.23, "swish", "0:36.23  E02 Mini Hische", 0.00],
        [36.53, "type", "0:36.53  E02 Callout text", 1.10],
        [39.11, "whoosh", "0:39.11  E03 push in", 0.00],
        [40.30, "draw", "0:40.30  E03 Pen ring", 0.00],
        [43.16, "pop", "0:43.16  E03 Face", 0.00],
        [43.88, "pop", "0:43.88  E03 Tag bg", 0.00],
        [47.23, "whoosh", "0:47.23  E04 push in", 0.00],
        [48.88, "pop", "0:48.88  E04 Tag bg", 0.00],
        [49.18, "draw", "0:49.18  E04 Meta sketch", 0.00],
        [54.13, "pop", "0:54.13  E04 Face", 0.00],
        [55.46, "whoosh", "0:55.46  E04 Meta sketch morph", 0.00],
        [57.17, "swish", "0:57.17  E05 Meta side", 0.00],
        [57.42, "pop", "0:57.42  E05 Tag bg", 0.00],
        [61.90, "draw", "1:01.90  E05 Pen ring", 0.00],
        [63.71, "whoosh", "1:03.71  E06 push in", 0.00],
        [64.98, "draw", "1:04.98  E06 Highlighter", 0.00],
        [65.65, "draw", "1:05.65  E06 Highlighter 2", 0.00],
        [66.99, "swish", "1:06.99  E06 Mural Arts logo", 0.00],
        [67.49, "pop", "1:07.49  E06 Tag bg", 0.00],
        [68.80, "swish", "1:08.80  E07 whip in", 0.00],
        [69.04, "tick", "1:09.04  E07 Logo card 3", 0.00],
        [69.46, "tick", "1:09.46  E07 Logo card 9", 0.00],
        [71.82, "pop", "1:11.82  E07 Caption panel", 0.00],
        [72.40, "draw", "1:12.40  E07 Pen ring", 0.00],
        [73.06, "pop", "1:13.06  E07 Lookalike ring", 0.00],
        [76.21, "click", "1:16.21  E07b montage cut 76.21", 0.00],
        [76.79, "click", "1:16.79  E07b montage cut 76.79", 0.00],
        [77.42, "click", "1:17.42  E07b montage cut 77.42", 0.00],
        [78.04, "click", "1:18.04  E07b montage cut 78.04", 0.00],
        [78.67, "click", "1:18.67  E07b montage cut 78.67", 0.00],
        [79.25, "click", "1:19.25  E07b montage cut 79.25", 0.00],
        [79.92, "click", "1:19.92  E07b montage cut 79.92", 0.00],
        [80.50, "click", "1:20.50  E07b montage cut 80.50", 0.00],
        [80.93, "pop", "1:20.93  E08 Face", 0.00],
        [82.94, "swish", "1:22.94  E08 Inquirer masthead", 0.00],
        [85.14, "pop", "1:25.14  E08 Tag bg", 0.00],
        [86.54, "whoosh", "1:26.54  E08b push in", 0.00],
        [88.27, "draw", "1:28.27  E08b Pen stroke", 0.00],
        [89.75, "tick", "1:29.75  E08b Slam: a mere scribble", 0.00],
        [92.45, "swish", "1:32.45  E09 Hische", 0.00],
        [94.69, "draw", "1:34.69  E09 Callout line", 0.00],
        [98.48, "zoomw", "1:38.48  E10 zoom in", 0.00],
        [98.79, "tick", "1:38.79  E10 Variation 1", 0.00],
        [99.24, "tick", "1:39.24  E10 Variation 11", 0.00],
        [99.69, "tick", "1:39.69  E10 Variation 21", 0.00],
        [101.91, "draw", "1:41.91  E10 Pen ring", 0.00],
        [103.36, "swish", "1:43.36  E11 Inquirer masthead", 0.00],
        [105.29, "paper", "1:45.29  E11 Sketch sheet", 0.00],
        [105.59, "pop", "1:45.59  E11 Tag bg", 0.00],
        [106.89, "tick", "1:46.89  E11 Variations sheet", 0.00],
        [107.19, "pop", "1:47.19  E11 Tag bg 2", 0.00],
        [108.39, "tick", "1:48.39  E11 Slam: proof.", 0.00],
        [109.63, "swish", "1:49.63  E12 whip in", 0.00],
        [110.87, "tick", "1:50.87  E12 Slam: this wasn't the main issue", 0.00],
        [114.51, "tick", "1:54.51  E12 Print", 0.00],
        [115.11, "click", "1:55.11  E12 Redaction bar", 0.00],
        [118.22, "whoosh", "1:58.22  E13 push in", 0.00],
        [122.19, "swish", "2:02.19  E13 Changed", 0.00],
        [122.59, "whoosh", "2:02.59  E13 Changing M morph", 0.00],
        [123.95, "swish", "2:03.95  E13 Similar", 0.00],
        [124.20, "pop", "2:04.20  E13 Muse mini", 0.00],
        [125.98, "draw", "2:05.98  E13 Strike 2", 0.00],
        [126.74, "zoomw", "2:06.74  E14 zoom in", 0.00],
        [128.80, "pop", "2:08.80  E14 Tag bg", 0.00],
        [133.08, "pop", "2:13.08  E14 Tag bg 2", 0.00],
        [135.57, "whoosh", "2:15.57  F01 push in", 0.00],
        [138.15, "swish", "2:18.15  F02 Hische", 0.00],
        [140.12, "paper", "2:20.12  F02 Clipping", 0.00],
        [143.73, "whoosh", "2:23.73  F03 push in", 0.00],
        [145.52, "swish", "2:25.52  F03 Client work chart", 0.00],
        [146.72, "draw", "2:26.72  F03 Client work line", 0.00],
        [148.18, "whoosh", "2:28.18  F04 push in", 0.00],
        [149.87, "swish", "2:29.87  F04 Drawling shop", 0.00],
        [150.22, "pop", "2:30.22  F04 Tag bg", 0.00],
        [151.18, "swish", "2:31.18  F04 Studio", 0.00],
        [151.58, "pop", "2:31.58  F04 Tag bg 3", 0.00],
        [153.25, "whoosh", "2:33.25  F05 push in", 0.00],
        [153.51, "pop", "2:33.51  F05 Tag bg 2", 0.00],
        [154.54, "tick", "2:34.54  F05 Slam: $12,500", 0.00],
        [155.72, "paper", "2:35.72  F05 Calendar", 0.00],
        [156.17, "tick", "2:36.17  F05 Day fill 1", 0.00],
        [156.53, "tick", "2:36.53  F05 Day fill 2", 0.00],
        [156.78, "pop", "2:36.78  F05 Tag bg 3", 0.00],
        [159.21, "tick", "2:39.21  F05 Day fill 3", 0.00],
        [159.79, "tick", "2:39.79  F05 Day fill 7", 0.00],
        [160.44, "pop", "2:40.44  F05 Tag bg 4", 0.00],
        [160.65, "tick", "2:40.65  F05 Day fill 13", 0.00],
        [162.15, "swish", "2:42.15  F06 Hische", 0.00],
        [166.62, "pop", "2:46.62  F06 Reaction should she accept it at all?", 0.00],
        [171.78, "whoosh", "2:51.78  USER your inserted shot (cut 171.83)", 0.00],
        [175.45, "whoosh", "2:55.45  USER your inserted shot (cut 175.50)", 0.00],
        [176.87, "swish", "2:56.87  F07 Objection", 0.00],
        [177.27, "pop", "2:57.27  F07 Reaction it's about ethics", 0.00],
        [177.65, "pop", "2:57.65  F07 Reaction massively disappointing", 0.00],
        [179.94, "zoomw", "2:59.94  F08 zoom in", 0.00],
        [180.23, "draw", "3:00.23  F08 Underline", 0.00],
        [180.93, "draw", "3:00.93  F08 Underline 2", 0.00],
        [182.13, "paper", "3:02.13  F08 Clipping", 0.00],
        [187.09, "pop", "3:07.09  F08 Tag bg", 0.00],
        [190.42, "swish", "3:10.42  G01 whip in", 0.00],
        [192.37, "pop", "3:12.37  G01 Tag bg", 0.00],
        [194.16, "window", "3:14.16  G02 Her post", 0.00],
        [197.59, "tick", "3:17.59  G02 Slam: provided she didn't talk about", 0.00],
        [199.25, "click", "3:19.25  G02 Hush bar", 0.00],
        [199.70, "pop", "3:19.70  G02 Tag bg", 0.00],
        [201.03, "pop", "3:21.03  G02 Tag bg 2", 0.00],
        [206.43, "ding", "3:26.43  G03 Tile share", 0.00],
        [208.63, "tick", "3:28.63  G03 Slam: a company hiring an artist des", 0.00],
        [211.09, "ding", "3:31.09  G03 Tile heart", 0.00],
        [212.98, "swish", "3:32.98  G04 Hische", 0.00],
        [217.05, "pop", "3:37.05  G04 Tag bg 2", 0.00],
        [218.11, "zoomw", "3:38.11  G05 zoom in", 0.00],
        [219.53, "pop", "3:39.53  G05 Tag bg", 0.00],
        [220.97, "tick", "3:40.97  G05 Slam: silence doesn't change what sh", 0.00],
        [224.73, "tick", "3:44.73  G05 Slam: it just changes who knows abou", 0.00],
        [228.17, "pop", "3:48.17  G05 Tag bg 2", 0.00],
        [231.68, "whoosh", "3:51.68  K01 push in", 0.00],
        [233.75, "draw", "3:53.75  K01 Highlighter", 0.00],
        [237.59, "whoosh", "3:57.59  K02 Chronicle page camera", 0.00],
        [240.01, "pop", "4:00.01  K02 Tag bg", 0.00],
        [242.04, "draw", "4:02.04  K02 Highlighter", 0.00],
        [247.59, "whoosh", "4:07.59  K03 Chronicle page camera", 0.00],
        [248.95, "draw", "4:08.95  K03 Highlighter", 0.00],
        [251.57, "draw", "4:11.57  K03 Pen ring", 0.00],
        [253.92, "whoosh", "4:13.92  K04 push in", 0.00],
        [255.41, "pop", "4:15.41  K04 Face", 0.00],
        [256.25, "pop", "4:16.25  K04 Tag bg", 0.00],
        [258.35, "swish", "4:18.35  K04 Her lettering 1", 0.00],
        [259.85, "pop", "4:19.85  K04 Tag bg 2", 0.00],
        [261.98, "zoomw", "4:21.98  K05 zoom in", 0.00],
        [264.17, "paper", "4:24.17  K05 Clipping", 0.00],
        [269.43, "whoosh", "4:29.43  K06 push in", 0.00],
        [273.93, "swish", "4:33.93  K06 Godfather IV poster", 0.00],
        [279.09, "pop", "4:39.09  K06 Tag bg", 0.00],
        [282.73, "tick", "4:42.73  K07 Slam: a mildly disturbing fact", 0.00],
        [285.31, "swish", "4:45.31  K07 Hische", 0.00],
        [292.48, "whoosh", "4:52.48  K08 push in", 0.00],
        [293.01, "tick", "4:53.01  K08 Print", 0.00],
        [294.33, "draw", "4:54.33  K08 Pen ring", 0.00],
        [294.57, "click", "4:54.57  K08 Redaction bar", 0.00],
        [294.82, "pop", "4:54.82  K08 Redaction bar 3", 0.00],
        [299.22, "tick", "4:59.22  K08 Slam: what purpose?", 0.00],
        [300.50, "tick", "5:00.50  K08 Slam: what does that add to the argu", 0.00],
        [306.38, "swish", "5:06.38  K09 Hische", 0.00],
        [321.73, "zoomw", "5:21.73  L01 zoom in", 0.00],
        [324.33, "whoosh", "5:24.33  L02 push in", 0.00],
        [328.56, "draw", "5:28.56  L02 The line", 0.00],
        [331.18, "whoosh", "5:31.18  L03 push in", 0.00],
        [334.26, "swish", "5:34.26  L03 Assignment", 0.00],
        [334.66, "pop", "5:34.66  L03 Tag bg", 0.00],
        [335.78, "swish", "5:35.78  L03 Person", 0.00],
        [335.98, "pop", "5:35.98  L03 Face", 0.00],
        [339.70, "pop", "5:39.70  L03 Tag bg 2", 0.00],
        [341.13, "tick", "5:41.13  L04 Print", 0.00],
        [341.53, "click", "5:41.53  L04 Redaction bar", 0.00],
        [341.73, "pop", "5:41.73  L04 Redaction bar 2", 0.00],
        [342.83, "tick", "5:42.83  L04 Slam: potentially destroying part of", 0.00],
        [346.35, "whoosh", "5:46.35  L05 push in", 0.00],
        [348.43, "tick", "5:48.43  L05 Slam: where this could take our indu", 0.00],
        [353.13, "pop", "5:53.13  L05 Reaction sellout", 0.00],
        [353.59, "pop", "5:53.59  L05 Reaction leave her alone", 0.00],
        [355.63, "pop", "5:55.63  L05 Tag bg", 0.00],
        [357.56, "whoosh", "5:57.56  L06 push in", 0.00],
        [359.39, "tick", "5:59.39  L06 Slam: a test of whose side you're on", 0.00],
        [361.66, "type", "6:01.66  L06 Callout text", 0.40],
        [364.04, "window", "6:04.04  L07 Her post", 0.00],
        [365.07, "tick", "6:05.07  L07 Slam: explain honestly,", 0.00],
        [367.13, "click", "6:07.13  L07 Hush bar", 0.00],
        [370.99, "pop", "6:10.99  L07 Tag bg", 0.00],
        [372.48, "zoomw", "6:12.48  L08 zoom in", 0.00],
        [374.27, "tick", "6:14.27  L08 Slam: she should have turned it down", 0.00],
        [376.19, "tick", "6:16.19  L08 Slam: fair enough.", 0.00],
        [377.31, "tick", "6:17.31  L08 Slam: but explain why.", 0.00],
        [379.31, "whoosh", "6:19.31  L09 push in", 0.00],
        [384.45, "swish", "6:24.45  L09 A designer you admire 1", 0.00],
        [384.85, "pop", "6:24.85  L09 Tag bg", 0.00],
        [386.55, "pop", "6:26.55  L09 Face", 0.00],
        [386.85, "pop", "6:26.85  L09 Tag bg 2", 0.00],
        [388.45, "tick", "6:28.45  L10 Slam: $12,500", 0.00],
        [390.13, "tick", "6:30.13  L10 Slam: would you turn that down?", 0.00],
        [391.48, "whoosh", "6:31.48  L11 push in", 0.00],
        [395.01, "tick", "6:35.01  L11 Slam: asking difficult questions", 0.00],
        [396.45, "pop", "6:36.45  L11 Tag bg", 0.00],
        [399.56, "whoosh", "6:39.56  L12 push in", 0.00],
        [400.05, "window", "6:40.05  L12 Her post", 0.00],
        [406.23, "window", "6:46.23  L12 Her post", 0.00],
        [407.69, "zoomw", "6:47.69  L13 zoom in", 0.00],
        [414.38, "swish", "6:54.38  M01 Hische", 0.00],
        [416.31, "window", "6:56.31  M01 Comment box", 0.00],
        [416.81, "type", "6:56.81  M01 Comment text", 2.00],
        [418.81, "pop", "6:58.81  M01 Tag bg", 0.00],
        [421.18, "whoosh", "7:01.18  M02 push in", 0.00],
        [423.09, "pop", "7:03.09  M02 Tag bg", 0.00],
        [423.69, "tick", "7:03.69  M02 Print", 0.00]
    ];

    // ------------------------------------------------------------------ helpers
    var warnings = [];
    function here() { return (new File($.fileName)).parent; }
    function testMode() { return typeof MM_SFX_TEST !== "undefined" ? MM_SFX_TEST : null; }

    function findSfxFolder() {
        var t = testMode(), f, names = ["SFX", "sfx"], i;
        if (t && t.sfx) { return new Folder(t.sfx); }
        for (i = 0; i < names.length; i++) {
            f = new Folder(here().fsName + "/" + names[i]);
            if (f.exists) { return f; }
        }
        f = new Folder("D:/AE Assets/3. sfx/NOON_SFX");
        if (f.exists) { return f; }
        alert("Video 4 SFX: there is no \"SFX\" folder next to this script:\n" + here().fsName +
            "\n\nUnzip the whole META_Video4_SFX folder first (don't run the script from inside the zip).\n" +
            "Next you can point to the folder with the sound files yourself.");
        return Folder.selectDialog("Select the SFX folder (the sound files for Video 4)");
    }

    function findRender() {
        var t = testMode(), files, i;
        if (t && t.render) { return new File(t.render); }
        files = here().getFiles();
        for (i = 0; i < files.length; i++) {
            if (files[i] instanceof File && /\.(mp4|mov|m4v|avi|mxf)$/i.test(files[i].name)) { return files[i]; }
        }
        return File.openDialog("Select your rendered Video 4 (the .mp4 / .mov you exported)");
    }

    function findItem(name, type) {
        var i, it;
        for (i = 1; i <= app.project.numItems; i++) {
            it = app.project.item(i);
            if (it.name === name && it instanceof type) { return it; }
        }
        return null;
    }

    function folderItem(name) { return findItem(name, FolderItem) || app.project.items.addFolder(name); }

    function importFile(file, parent) {
        var io = new ImportOptions(file), item = app.project.importFile(io);
        if (parent) { item.parentFolder = parent; }
        return item;
    }

    function importSounds(dir, parent) {
        var k, s, i, f, items = {}, missing = [], kept;
        for (k in SOUNDS) {
            if (!SOUNDS.hasOwnProperty(k)) { continue; }
            s = SOUNDS[k]; kept = [];
            for (i = 0; i < s.files.length; i++) {
                if (items[s.files[i][0]]) { kept.push(s.files[i]); continue; }
                f = new File(dir.fsName + "/" + s.files[i][0]);
                if (!f.exists) { missing.push(s.files[i][0]); continue; }
                STEP = "importing " + s.files[i][0];
                try { items[s.files[i][0]] = importFile(f, parent); kept.push(s.files[i]); }
                catch (e) { warnings.push("Could not import " + s.files[i][0] + ": " + e.toString()); }
            }
            s.files = kept;
            if (!kept.length) { warnings.push("No files for the '" + k + "' sounds, so those cues are skipped."); }
        }
        if (missing.length) { warnings.push("Not found in " + dir.fsName + ": " + missing.join(", ")); }
        return items;
    }

    function place(comp, items, cue, i, pick) {
        var t = cue[0], cat = cue[1], note = cue[2], dur = cue[3], s = SOUNDS[cat], f, l, lev, levels, end;
        if (!s || !s.files.length) { return 0; }
        f = s.files[pick % s.files.length];
        l = comp.layers.add(items[f[0]]);
        l.startTime = t + s.at - f[1];
        lev = s.db + f[2] + ((i * 7) % 5 - 2) * 0.5;   // +/-1 dB so repeats don't sound stamped
        levels = l.property("ADBE Audio Group").property("ADBE Audio Levels");
        if (dur > 0) {
            end = Math.min(l.outPoint, t + dur + TYPE_TAIL);
            l.outPoint = end;
            levels.setValueAtTime(end - 0.2, [lev, lev]);
            levels.setValueAtTime(end, [-48, -48]);
        } else {
            levels.setValue([lev, lev]);
        }
        l.name = cat + "  " + note;
        l.label = s.label;
        return 1;
    }

    function saveNextToScript() {
        var dir = here(), n = 1, f = new File(dir.fsName + "/" + PROJECT + ".aep");
        while (f.exists) { n++; f = new File(dir.fsName + "/" + PROJECT + "_v" + ("00" + n).slice(-3) + ".aep"); }
        app.project.save(f);
        return f.fsName;
    }

    // ------------------------------------------------------------------ run
    var render, dir, video, main, comp, items, i, n = 0, turn = {}, pick = [], k, vl, ml, saved = null, fR, fS;
    try {
        STEP = "checking After Effects";
        if (typeof app === "undefined" || !app.project) { throw new Error("Run this from After Effects (File > Scripts > Run Script File...)."); }

        STEP = "finding the SFX folder";
        dir = findSfxFolder();
        if (!dir || !dir.exists) { alert("Video 4 SFX: no SFX folder, so nothing was made."); return; }

        STEP = "picking your rendered video";
        render = findRender();
        if (!render) { alert("Video 4 SFX: no video picked, so nothing was made."); return; }
        if (!render.exists) { alert("Video 4 SFX: can't find " + render.fsName); return; }

        STEP = "starting a new project";
        if (!(testMode() && testMode().keepProject)) {
            if (!app.newProject()) { alert("Video 4 SFX: kept the open project, so nothing was made."); return; }
        }

        app.beginUndoGroup("Video 4 SFX project");
        fR = folderItem("01_Your render");
        fS = folderItem("02_SFX files");

        STEP = "importing your video " + render.name;
        video = importFile(render, fR);
        if (!video.hasVideo) { throw new Error(render.name + " has no picture. Pick the rendered video."); }

        STEP = "making the comps";
        main = app.project.items.addComp(MAIN_NAME, video.width, video.height, video.pixelAspect, video.duration, video.frameRate);
        vl = main.layers.add(video);
        vl.name = RENDER_NAME;

        STEP = "importing the sound files";
        items = importSounds(dir, fS);
        comp = app.project.items.addComp(SFX_COMP, video.width, video.height, video.pixelAspect, video.duration, video.frameRate);
        comp.parentFolder = fS;

        STEP = "placing the sounds";
        // files of a sound take turns in time order; layers are added last to first so the earliest is on top
        for (i = 0; i < CUES.length; i++) { k = CUES[i][1]; turn[k] = (turn[k] || 0); pick[i] = turn[k]; turn[k] += 1; }
        for (i = CUES.length - 1; i >= 0; i--) {
            if (CUES[i][0] > video.duration) { continue; }
            try { n += place(comp, items, CUES[i], i, pick[i]); }
            catch (e1) { warnings.push("cue at " + CUES[i][0] + " s: " + e1.toString()); }
        }
        ml = main.layers.add(comp);
        ml.startTime = 0;
        ml.name = MASTER_NAME;
        ml.enabled = false;   // video off; the sounds still play
        ml.label = 11;
        vl.moveToEnd();
        vl.locked = true;
        app.endUndoGroup();

        STEP = "saving the project";
        try { saved = saveNextToScript(); }
        catch (e2) { warnings.push("Could not save next to the script (" + e2.toString() + "). Use File > Save As to save it yourself."); }
        try { main.openInViewer(); } catch (e3) {}

        if (testMode()) { testMode().result = { ok: true, layers: n, warnings: warnings, saved: saved }; }
        alert("Video 4 SFX: " + n + " sounds placed over " + render.name + "." +
            (saved ? "\nSaved " + saved : "") +
            (warnings.length ? "\n\nWarnings:\n" + warnings.join("\n") : ""));
    } catch (e) {
        try { app.endUndoGroup(); } catch (e4) {}
        if (testMode()) { testMode().result = { ok: false, error: e.toString(), step: STEP }; }
        alert("Video 4 SFX stopped while " + STEP + ":\n" + e.toString() + (e.line ? " (line " + e.line + ")" : "") +
            "\n\nPlease send me a screenshot of this message.");
    }
})();
