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
    var CUES = /*@@CUES@@*/;

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
        names = ["D:/EYDIT/Satori Graphic/SFX/NOON_SFX", "D:/AE Assets/3. sfx/NOON_SFX"];   // your library, if it lives there
        for (i = 0; i < names.length; i++) {
            f = new Folder(names[i]);
            if (f.exists) { return f; }
        }
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
