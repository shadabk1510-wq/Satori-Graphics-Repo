// build_lab.jsx: STYLE LAB sample, a 2:00 product film for "Aurelo" (a fictional AI workspace app).
// Separate from NOON on purpose: own folder, own project file (AURELO_LAB.aep), own libraries in lib/.
// Purpose: testing the new look (dark glass UI, light sweeps, glows, brand-tinted shadows, a real 3D camera with depth
// of field in every scene, CALM / EXPO eases with no overshoot). No voice-over; add your music on the main comp.
//
// Run: open a NEW, empty project, then File > Scripts > Run Script File... > style_lab/ae/scripts/build_lab.jsx.
// It saves style_lab/ae/AURELO_LAB.aep (then _v002, ...) and writes build_lab.result.json next to this script.
// Every scene comp has its own STYLE CONTROLS layer (Shadow %, Glow %, Sweep %, Camera move %, Depth blur).

#include "lib/ae_lib.jsx"
#include "lib/icons.jsx"
#include "lib/n3_core.jsx"
#include "lib/look.jsx"
#include "lab_kit.jsx"
#include "scenes/s01_s03.jsx"
#include "scenes/s04_s06.jsx"
#include "scenes/s07_s10.jsx"

var LAB_CFG = { name: "AURELO_MAIN", xfade: 0.8, save: true };

function buildLab() {
    var here = AEL.scriptDir($.fileName), main, t = 0, i, sc, S, l, failed = [], bg;
    if (AEL.findItem(LAB_CFG.name, CompItem)) { throw new Error("This project already has " + LAB_CFG.name + ". Run the script in a new, empty project."); }
    N3.warmFonts();
    LAB.folders = { main: AEL.folder("01_Main"), scenes: AEL.folder("02_Scenes"), pre: AEL.folder("03_Precomps") };
    main = app.project.items.addComp(LAB_CFG.name, 1920, 1080, 1, 120, N3.FPS);
    main.parentFolder = LAB.folders.main; main.motionBlur = true;
    AEL.created("comp", main.name);
    bg = main.layers.addSolid([0.02, 0.025, 0.08], "BG (behind transitions)", 1920, 1080, 1, 120);
    for (i = 0; i < LAB.SCENES.length; i++) {
        sc = LAB.SCENES[i];
        try {
            AEL.pendingExpr = [];
            S = sc.build();
            AEL.retryExpressions();
            N3.motionBlur(S.comp);
            l = LAB.place(main, S, t, i === 0 ? 0.6 : LAB_CFG.xfade, i === LAB.SCENES.length - 1 ? 1.2 : LAB_CFG.xfade);
            AEL.compMarker(main, t, "Scene " + sc.id + ": " + S.comp.name.replace("LAB " + sc.id + " ", ""));
            AEL.created("scene", S.comp.name);
        } catch (e) {
            failed.push(sc.id + ": " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
            AEL.warn("scene " + sc.id + " failed: " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
        }
        t += sc.T - LAB_CFG.xfade;
    }
    bg.moveToEnd();
    AEL.compMarker(main, 0.01, "MUSIC: add your track here (no voice-over in this sample)");
    AEL.result.failedScenes = failed;
    AEL.result.length = t + LAB_CFG.xfade;
    try { main.openInViewer(); } catch (e2) {}
    if (LAB_CFG.save) { AEL.saveIncremental((new Folder(here + "/..")).fsName, "AURELO_LAB"); }
}

AEL.run($.fileName, "Build Aurelo style lab", buildLab);
