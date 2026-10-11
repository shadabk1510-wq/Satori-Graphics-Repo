// build_sat.jsx: SATORI LAB, a 30 s sample in the user's own style (16:9, 29.97 fps), for "Tallyo" (a fictional invoice app).
// Separate from NOON and the Aurelo lab: own folder, own project file (SATORI_LAB.aep), own library copies in lib/.
// Hook 0-6.3 s fast (lens-bubble in, AI + tiles, word roller + tick, guides + Type or Speak); explanation 6.3-30 s calm
// (pill -> card -> flip, radial build, tilted invoice panel with cascading rows, end card). One aurora gradient keeps
// drifting under every cut. No voice-over; add music on SATORI_MAIN.
// Run: open a NEW, empty project, then File > Scripts > Run Script File... > satori_lab/ae/scripts/build_sat.jsx.

#include "lib/ae_lib.jsx"
#include "lib/icons.jsx"
#include "lib/n3_core.jsx"
#include "lib/look.jsx"
#include "sat_kit.jsx"
#include "sat_scenes.jsx"

function buildSat() {
    var here = AEL.scriptDir($.fileName), main, bg, X, t = 0, i, sc, S, l, failed = [], m, sh;
    if (AEL.findItem("SATORI_MAIN", CompItem)) { throw new Error("This project already has SATORI_MAIN. Run the script in a new, empty project."); }
    N3.warmFonts();
    SAT.folders = { main: AEL.folder("01_Main"), scenes: AEL.folder("02_Scenes"), pre: AEL.folder("03_Precomps") };
    main = app.project.items.addComp("SATORI_MAIN", 1920, 1080, 1, 30, SAT.FPS);
    main.parentFolder = SAT.folders.main; main.motionBlur = true; AEL.created("comp", main.name);
    // the continuous aurora: 4-Color Gradient whose points (and colours) drift through all 30 s
    bg = main.layers.addSolid([1, 1, 1], "BG aurora (drifts under every cut)", 1920, 1080, 1, 30);
    LOOK.gradient4(bg, 0, 0, ["#F9CFD8", "#B49AF5", "#94E8D2", "#F6F2FF"]);
    X = bg.property("ADBE Effect Parade").property("Glass fill");
    SAT.k(X.property("ADBE 4ColorGradient-0001"), 0, 30, [120, 80], [520, 260], [1, 1]);
    SAT.k(X.property("ADBE 4ColorGradient-0003"), 0, 30, [1820, 60], [1500, 300], [1, 1]);
    SAT.k(X.property("ADBE 4ColorGradient-0005"), 0, 30, [140, 1040], [460, 860], [1, 1]);
    SAT.k(X.property("ADBE 4ColorGradient-0007"), 0, 30, [1800, 1020], [1400, 760], [1, 1]);
    SAT.k(X.property("ADBE 4ColorGradient-0004"), 6.3, 21, N3.rgba("#B49AF5"), N3.rgba("#8FD8F0"), SAT.CALM);   // the light shifts colour in the explanation
    for (i = 0; i < SAT.SCENES.length; i++) {
        sc = SAT.SCENES[i];
        try {
            AEL.pendingExpr = [];
            S = sc.build();
            AEL.retryExpressions();
            N3.motionBlur(S.comp);
            l = main.layers.add(S.comp); l.startTime = t; l.name = S.comp.name.replace("SAT ", ""); l.motionBlur = true; l.moveToBeginning();
            if (i === 0) {   // lens-bubble opening: a feathered round mask grows from the centre in 4 frames
                m = l.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
                m.property("ADBE Mask Feather").setValue([90, 90]);
                sh = function (d) { return N3.rrShape(960 - d / 2, 540 - d / 2, d, d, d / 2); };
                m.property("ADBE Mask Shape").setValueAtTime(0, sh(140)); m.property("ADBE Mask Shape").setValueAtTime(0.14, sh(2600));
                SAT.k(N3.xf(l, "ADBE Scale"), 0, 0.2, [118, 118], [100, 100], SAT.OUT);
            }
            AEL.compMarker(main, t, sc.id + ": " + S.comp.name.replace("SAT " + sc.id + " ", ""));
        } catch (e) {
            failed.push(sc.id + ": " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
            AEL.warn("scene " + sc.id + " failed: " + e.toString() + (e.line ? " (line " + e.line + ")" : ""));
        }
        t += sc.T;
    }
    bg.moveToEnd();
    AEL.compMarker(main, 6.3, "Hook ends: explanation pace from here");
    AEL.result.failedScenes = failed; AEL.result.length = t;
    try { main.openInViewer(); } catch (e2) {}
    AEL.saveIncremental((new Folder(here + "/..")).fsName, "SATORI_LAB");
}

AEL.run($.fileName, "Build Satori lab sample", buildSat);
