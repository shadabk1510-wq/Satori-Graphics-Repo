// build_meta.jsx: Video 4 "New Meta Logo" (Meta Muse / Jessica Hische), 16:9, 29.97 fps, locked to the VO (7:18).
// v2 (after the user's review): a documentary story, not a presentation. Real photos, pages and work; Vox / Johnny
// Harris article treatment; a banger hook; a new visual every 2-3 s. Native, editable layers: each scene is a comp in
// 02_Scenes with its own background; scenes change by pushes, whips, zoom-throughs or hard cuts, never crossfades.
// Run: open a NEW, empty project, then File > Scripts > Run Script File... > meta_muse/ae/scripts/build_meta.jsx.
// Assets: meta_muse/assets/ (images, and the VO: "Vo MEta MUse.mp3" if present, else vo_small.mp3).

#include "lib/ae_lib.jsx"
#include "lib/icons.jsx"
#include "lib/mm_icons.jsx"
#include "lib/n3_core.jsx"
#include "lib/look.jsx"
#include "sat_kit.jsx"
#include "mm_data.jsx"
#include "mm_kit.jsx"
#include "mm_doc.jsx"
#include "mm_scenes_hook.jsx"
#include "mm_scenes_a.jsx"
#include "mm_scenes_b.jsx"
#include "mm_scenes_c.jsx"

var MM_CONFIG = { duration: 438.3, until: null, vo: ["Vo MEta MUse.mp3", "vo_small.mp3"], only: null };   // until: build the VO up to here (v2 first section); only: ["H1", ...] builds a subset

function buildMeta() {
    var here = AEL.scriptDir($.fileName), main, bg, X, i, sc, S, l, failed = [], g0, g1, T, starts = [], vo, f, k, list = [], nx;
    if (AEL.findItem("META_MAIN", CompItem)) { throw new Error("This project already has META_MAIN. Run the script in a new, empty project."); }
    N3.ASSET_DIR = (new Folder(here + "/../../assets")).fsName;
    N3.warmFonts();
    SAT.folders = { main: AEL.folder("01_Main"), scenes: AEL.folder("02_Scenes"), pre: AEL.folder("03_Precomps") };
    N3.folders = { footage: AEL.folder("04_Footage"), audio: AEL.folder("05_Audio") };
    main = app.project.items.addComp("META_MAIN", 1920, 1080, 1, MM_CONFIG.until || MM_CONFIG.duration, SAT.FPS);
    main.parentFolder = SAT.folders.main; main.motionBlur = true; AEL.created("comp", main.name);
    // VO
    for (i = 0; i < MM_CONFIG.vo.length; i++) {
        f = new File(N3.ASSET_DIR + "/" + MM_CONFIG.vo[i]);
        if (f.exists) { vo = main.layers.add(AEL.importFile(f.fsName, N3.folders.audio)); vo.name = "VO"; break; }
    }
    if (!vo) { AEL.warn("No VO found in " + N3.ASSET_DIR); }
    // every scene carries its own full-frame background; this paper only shows if a scene is switched off
    bg = main.layers.add(N3.file("paper_warm.jpg")); bg.name = "BG paper (safety)";
    N3.xf(bg, "ADBE Scale").setValue([80, 80]);
    // scene windows from their VO cues
    for (i = 0; i < MM.SCENES.length; i++) {
        sc = MM.SCENES[i];
        g0 = i === 0 ? 0 : MM.find(sc.cue, starts[i - 1] + 0.3) - (sc.hook ? 0.1 : 0.2);
        starts.push(g0);
    }
    for (i = 0; i < MM.SCENES.length; i++) {
        sc = MM.SCENES[i]; g0 = starts[i]; g1 = i + 1 < MM.SCENES.length ? starts[i + 1] : MM_CONFIG.duration; T = g1 - g0;
        if (MM_CONFIG.until && g0 >= MM_CONFIG.until - 0.05) { break; }
        if (MM_CONFIG.until) { g1 = Math.min(g1, MM_CONFIG.until); T = g1 - g0; }
        nx = i + 1 < MM.SCENES.length ? MM.SCENES[i + 1].tin || { how: "cut" } : { how: "cut" };
        list.push(sc.id + " " + N3.r3(g0) + "-" + N3.r3(g1) + " in:" + (sc.tin ? sc.tin.how : "cut") + " out:" + nx.how);
        if (MM_CONFIG.only && MM_CONFIG.only.join(",").indexOf(sc.id) < 0) { continue; }
        try {
            AEL.pendingExpr = [];
            S = MM.scene(sc.id, sc.title, g0, T);
            sc.build(S);
            MM.inT(S, sc.tin || { how: "cut" });
            MM.outT(S, nx);
            AEL.retryExpressions();
            N3.motionBlur(S.comp);
            l = main.layers.add(S.comp); l.startTime = g0; l.name = sc.id + " " + sc.title; l.motionBlur = true; l.moveToBeginning();
            l.outPoint = Math.min(main.duration, g1 + (MM.TAILS[nx.how] || 0));   // pushes overlap the next scene; whips, zooms and cuts are hard cuts
            AEL.compMarker(main, g0, sc.id + ": " + sc.title);
        } catch (e) {
            failed.push(sc.id + ": " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
            AEL.warn("scene " + sc.id + " failed: " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
        }
    }
    bg.moveToEnd();
    if (vo) { vo.moveToEnd(); }
    AEL.compMarker(main, 31.0, "Hook ends: explanation pace from here");
    AEL.result.failedScenes = failed; AEL.result.windows = list;
    try { main.openInViewer(); } catch (e2) {}
    AEL.saveIncremental((new Folder(here + "/..")).fsName, "META_MUSE");
}

AEL.run($.fileName, "Build Video 4 (Meta Muse)", buildMeta);
