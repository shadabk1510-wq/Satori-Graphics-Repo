// MM_SFX_project.jsx: a separate After Effects project with the sound effects for Video 4 ("New Meta Logo"),
// laid over the video you already rendered. Your own project is not opened or changed.
//
// Run it: File > Scripts > Run Script File... > MM_SFX_project.jsx (keep this folder together).
//  1. It asks for your rendered video (or uses the first .mp4/.mov sitting next to this script).
//  2. It starts a NEW project (AE asks you to save the open one first, as usual).
//  3. It builds "META_Video4_SFX": your render at the bottom (picture + VO, locked) and above it one layer,
//     "SFX (all sounds)". That layer's Audio Levels is the master volume for every effect.
//  4. Inside the "SFX (all sounds)" comp each sound is its own layer named "<sound>  <m:ss>  <scene> <element>":
//     drag it to retime, Alt-drag another file onto it to swap it, change its Audio Levels, or delete it.
//  5. It saves META_Video4_SFX.aep next to this script (never over an existing file).
// To export: Composition > Add to Render Queue, Output Module "WAV" / "AIFF" (audio only) for an SFX stem,
// or a normal video module for the picture with VO + SFX mixed.
//
// Sounds: the "SFX" folder next to this script (files from your NOON_SFX library). Cue times: mm_sfx_cues.jsx.

#include "ae_lib.jsx"
#include "mm_sfx_cues.jsx"

var SFX = {
    folders: ["./SFX", "D:/AE Assets/3. sfx/NOON_SFX"],   // first that exists is used; otherwise you are asked
    main: "META_Video4_SFX",
    comp: "SFX (all sounds)",
    project: "META_Video4_SFX",
    // For each sound: db = where its peak sits in the mix (dBFS; your VO sits around -16 dBFS),
    // at = where that peak lands after the cue (s), label = layer colour,
    // files = [file, time of the peak inside the file (s; typing: where the typing starts), gain that brings
    // the file's own peak to 0 dB]. Files take turns so repeats vary.
    SOUNDS: {
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
    },
    TYPE_TAIL: 0.25,
    MASTER_NAME: "SFX (all sounds) - Audio Levels here = master volume",
    RENDER_NAME: "YOUR RENDER (picture + VO)"
};

SFX.here = function () { return AEL.scriptDir($.fileName); };

SFX.findFolder = function () {
    var i, p, f;
    if (typeof SFX_FOLDER_OVERRIDE !== "undefined") { SFX.folders = [SFX_FOLDER_OVERRIDE]; }
    for (i = 0; i < SFX.folders.length; i++) {
        p = SFX.folders[i];
        f = new Folder(p.charAt(0) === "." ? SFX.here() + "/" + p.substring(2) : p);
        if (f.exists) { return f; }
    }
    f = Folder.selectDialog("Select the SFX folder (the sound files for Video 4)");
    if (!f) { throw new Error("No SFX folder selected."); }
    return f;
};

// your rendered video: a video file next to this script, otherwise you pick it
SFX.findRender = function () {
    var files, i, f;
    if (typeof MM_RENDER_OVERRIDE !== "undefined") { return new File(MM_RENDER_OVERRIDE); }
    files = new Folder(SFX.here()).getFiles("*.*");
    for (i = 0; i < files.length; i++) {
        if (files[i] instanceof File && /\.(mp4|mov|m4v|avi|mxf)$/i.test(files[i].name)) { return files[i]; }
    }
    f = File.openDialog("Select your rendered Video 4 (the .mp4 / .mov you exported)");
    return f || null;
};

SFX.importAll = function (dir, folderItem) {
    var k, s, i, f, items = {}, missing = [], kept;
    for (k in SFX.SOUNDS) {
        if (!SFX.SOUNDS.hasOwnProperty(k)) { continue; }
        s = SFX.SOUNDS[k]; kept = [];
        for (i = 0; i < s.files.length; i++) {
            f = new File(dir.fsName + "/" + s.files[i][0]);
            if (!f.exists) { missing.push(s.files[i][0]); continue; }
            items[s.files[i][0]] = AEL.importFile(f.fsName, folderItem);
            kept.push(s.files[i]);
        }
        s.files = kept;
        if (!kept.length) { AEL.warn("No files found for '" + k + "' sounds; those cues are skipped."); }
    }
    if (missing.length) { AEL.warn("Missing in " + dir.fsName + ": " + missing.join(", ")); }
    return items;
};

SFX.place = function (comp, items, cue, i, pick) {
    var t = cue[0], cat = cue[1], note = cue[2], dur = cue[3], s = SFX.SOUNDS[cat], f, l, lev, levels, end;
    if (!s || !s.files.length) { return 0; }
    f = s.files[pick % s.files.length];
    l = comp.layers.add(items[f[0]]);
    l.startTime = t + s.at - f[1];
    if (l.inPoint < 0) { l.inPoint = 0; }
    lev = s.db + f[2] + ((i * 7) % 5 - 2) * 0.5;   // +/-1 dB so repeats don't sound stamped
    levels = l.property("ADBE Audio Group").property("ADBE Audio Levels");
    if (dur > 0) {
        end = Math.min(l.outPoint, t + dur + SFX.TYPE_TAIL);
        l.outPoint = end;
        levels.setValueAtTime(end - 0.2, [lev, lev]);
        levels.setValueAtTime(end, [-48, -48]);
    } else {
        levels.setValue([lev, lev]);
    }
    l.name = cat + "  " + note;
    l.label = s.label;
    l.comment = "Video 4 SFX cue " + t + " s (" + cat + ")";
    return 1;
};

SFX.build = function (renderFile) {
    var fRender = AEL.folder("01_Your render"), fSfx = AEL.folder("02_SFX files"), dir, items, video, main, comp,
        i, n = 0, turn = {}, pick = [], k, vl, ml, cues = MM_SFX_CUES;
    video = AEL.importFile(renderFile.fsName, fRender);
    if (!video.hasVideo) { throw new Error(renderFile.name + " has no picture; pick the rendered video."); }
    main = app.project.items.addComp(SFX.main, video.width, video.height, video.pixelAspect, video.duration, video.frameRate);
    AEL.created("comp", SFX.main);
    vl = main.layers.add(video);
    vl.name = SFX.RENDER_NAME;
    vl.locked = true;
    dir = SFX.findFolder();
    items = SFX.importAll(dir, fSfx);
    comp = app.project.items.addComp(SFX.comp, video.width, video.height, video.pixelAspect, video.duration, video.frameRate);
    comp.parentFolder = fSfx;
    AEL.created("comp", SFX.comp);
    // files of a sound take turns in time order; layers are added last to first so the earliest is on top
    for (i = 0; i < cues.length; i++) { k = cues[i][1]; turn[k] = (turn[k] || 0); pick[i] = turn[k]; turn[k] += 1; }
    for (i = cues.length - 1; i >= 0; i--) {
        if (cues[i][0] > video.duration) { continue; }
        try { n += SFX.place(comp, items, cues[i], i, pick[i]); }
        catch (e) { AEL.warn("cue at " + cues[i][0] + " s: " + e.toString()); }
    }
    ml = main.layers.add(comp);
    ml.startTime = 0;
    ml.name = SFX.MASTER_NAME;
    ml.enabled = false;   // video off; the sounds still play
    ml.label = 11;
    AEL.result.render = renderFile.fsName;
    AEL.result.sfxFolder = dir.fsName;
    AEL.result.sfxLayers = n;
    AEL.log("Placed " + n + " sound layers for " + cues.length + " cues over " + renderFile.name + ".");
    try { main.openInViewer(); } catch (e) {}
};

(function () {
    var render = SFX.findRender(), res;
    if (!render) { alert("No video picked, nothing was made."); return; }
    if (!render.exists) { alert("Can't find " + render.fsName); return; }
    if (typeof MM_KEEP_PROJECT === "undefined" && !app.newProject()) { alert("Kept the open project; nothing was made."); return; }
    res = AEL.run($.fileName, "Video 4 SFX project", function () { SFX.build(render); });
    if (!res.ok) { alert("Video 4 SFX: " + res.error); return; }
    AEL.saveIncremental(SFX.here(), SFX.project);
    alert("Video 4 SFX: " + res.sfxLayers + " sounds placed over " + render.name + ".\nSaved " + AEL.result.savedProject +
        (res.warnings.length ? "\n\nWarnings:\n" + res.warnings.join("\n") : ""));
})();
