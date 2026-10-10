// style_test.jsx: one NOON3 moment rebuilt in the new look, to approve before it is used anywhere else.
// The moment: "communication goals" at 8:22 (clip 26), 16.5 s, with its voice-over.
// It only adds new items ("STYLE TEST" comps in a 10_Style folder); nothing else in the project is touched.
// Run in any project (a new empty one is fine): File > Scripts > Run Script File... > style/style_test.jsx.
//
// Shown here:
//  - real 3D: a two-node camera dollies slowly across a curved wall of cards, with depth of field;
//  - glass cards: 4-colour gradient body, light rim fading down, brand-tinted double shadow;
//  - light sweep across each card after it lands; coral glow halo on each tick;
//  - gradient headline with a blur-in per word; soft light orbs far behind;
//  - two ease presets: CALM (70/70) for camera and fades, EXPO (30 -> 100) for entrances. No overshoot.
// Effect Controls on "STYLE CONTROLS" scale it all: Shadow %, Glow %, Sweep %, Camera move %, Depth blur.

#include "../ae_lib.jsx"
#include "../noon3_icons.jsx"
#include "../noon3_lib.jsx"
#include "look.jsx"

var ST = {
    name: "NOON3 STYLE TEST - Goals",
    T: 16.5,
    vo: "vo_chunk4.m4a", voAt: 502.5 - 2.0,          // comp time 0 = 8:22.5 on the main timeline (VO file starts at 2.0 s)
    eye: 1.1, cards: [4.78, 8.30, 11.74], ticks: [7.18, 10.86, 14.46],
    who: ["ALEX \u00B7 MARKETING", "MAYA \u00B7 FOUNDER", "JO \u00B7 SALES"], goal: ["Energy", "Composed", "Clearly coffee"],
    q: ["Does the work have the\nenergy Alex wanted?", "Does the information feel\ncomposed, as Maya asked?", "Is the coffee clearly\nidentified for Jo?"],
    // curved wall: x, z and Y rotation per card
    x: [-560, 0, 560], z: [90, 0, 90], ry: [-14, 0, 14],
    glass: ["#FFFFFF", "#FFF7F5", "#FCEDEC", "#F7D3D2"],
    tint: "#96323A"
};

function cardComp(i, main) {
    var W = 600, H = 640, pc = app.project.items.addComp("STYLE \u00B7 Card " + (i + 1), W, H, 1, ST.T, N3.FPS), ctx, l, c, t = ST.cards[i], ic, halo,
        ctl = function (n) { return LOOK.refIn(main.name, n); };
    pc.parentFolder = ST.folder;
    ctx = { comp: pc, ox: W / 2, oy: H / 2, parent: null, slot: "pre", S: null };
    LOOK.glassCard(ctx, { name: "Card", cx: 0, cy: 0, w: 480, h: 520, r: 34, colors: ST.glass, tSweep: t + 0.75, sweepCtl: ctl("Sweep %") });
    c = N3.chip(ctx, ST.who[i], { name: "Who", x: -200, top: -220, fs: 14, wt: 600, ls: 0.06, bg: i === 0 ? N3.COL.coral : "#FCE3E2", color: i === 0 ? "#FFFFFF" : N3.COL.capRed });
    l = N3.text(ctx, ST.goal[i], { name: "Goal", x: -200, top: -160, fs: 46, wt: 700, ls: -0.03 });
    LOOK.ramp(l, [0, -40], N3.COL.ink, [0, 6], N3.COL.coralD, "Gradient text");
    N3.unitReveal(l, { times: [t + 0.35], based: "chars", stagger: 0.025, dy: 22, blur: 8, lin: 0.55 });
    l = N3.text(ctx, ST.q[i], { name: "Question", x: -200, top: -84, fs: 24, lh: 34, color: N3.COL.soft });
    N3.unitReveal(l, { times: [t + 0.6], based: "words", stagger: 0.05, dy: 14, blur: 6, lin: 0.5 });
    // tick: pops in (EXPO, no overshoot) and lights a coral halo
    ic = N3.icon(ctx, "circleCheck", { name: "Tick", cx: 0, cy: 150, size: 120, color: N3.COL.coral, sw: 3 });
    LOOK.key(N3.xf(ic, "ADBE Scale"), ST.ticks[i], ST.ticks[i] + 0.55, [0, 0], [100, 100], LOOK.EXPO);
    LOOK.key(N3.xf(ic, "ADBE Rotate Z"), ST.ticks[i], ST.ticks[i] + 0.7, -14, 0, LOOK.EXPO);
    halo = LOOK.halo(ic, N3.COL.coral, 70, ctl("Glow %"));
    LOOK.key(halo, ST.ticks[i] + 0.05, ST.ticks[i] + 0.6, 0, 150, LOOK.EXPO);
    LOOK.key(halo, ST.ticks[i] + 1.4, ST.ticks[i] + 2.6, 150, 70, LOOK.CALM);
    // chip fades in just before the title
    N3.show(c.bg, t + 0.25, null, 10, { lin: 0.45, blur: 6 }); N3.show(c.text, t + 0.25, null, 10, { lin: 0.45, blur: 6 });
    return pc;
}

function build() {
    var here = AEL.scriptDir($.fileName), main, ctl, bg, i, pc, l, X, t, z0, head, eye, vo;
    N3.ASSET_DIR = (new Folder(here + "/../../../assets/_ae")).fsName;
    N3.warmFonts();
    ST.folder = AEL.folder("10_Style");
    if (AEL.findItem(ST.name, CompItem)) { throw new Error("'" + ST.name + "' already exists: delete it (and the STYLE \u00B7 comps) to rebuild."); }
    main = app.project.items.addComp(ST.name, 1920, 1080, 1, ST.T, N3.FPS);
    main.parentFolder = ST.folder; main.motionBlur = true;
    try { main.renderer = "ADBE Advanced 3d"; } catch (e0) { AEL.log("renderer left as is: " + e0); }
    AEL.created("comp", main.name);
    ctl = LOOK.controls(main);

    // background: warm 4-colour gradient (2D, so the camera doesn't move it)
    bg = main.layers.addSolid([1, 1, 1], "BG gradient", 1920, 1080, 1, ST.T);
    LOOK.gradient4(bg, 0, 0, ["#FCEBE7", "#F9DCDB", "#F7D6D3", "#F1C3C1"]);
    X = bg.property("ADBE Effect Parade").property("Glass fill");
    X.property("ADBE 4ColorGradient-0001").setValue([0, 0]); X.property("ADBE 4ColorGradient-0003").setValue([1920, 0]);
    X.property("ADBE 4ColorGradient-0005").setValue([0, 1080]); X.property("ADBE 4ColorGradient-0007").setValue([1920, 1080]);
    bg.moveToEnd();
    LOOK.orbs(main, [
        { color: "#FFFFFF", d: 900, x: 520, y: 260, z: 1400, opacity: 70, drift: [80, 40], period: 16 },
        { color: N3.COL.coral, d: 760, x: 1500, y: 820, z: 1600, opacity: 22, drift: [-60, 30], period: 19 },
        { color: "#F4512B", d: 520, x: 1650, y: 180, z: 1800, opacity: 12, drift: [40, -50], period: 13 }
    ]);
    bg.moveToEnd();

    // headline (3D, a little in front of the cards for parallax)
    eye = N3.text({ comp: main, ox: 960, oy: 540, parent: null, slot: "pre" }, "Back to the brief", { name: "Eyebrow", x: -700, top: -410, fs: 16, wt: 600, ls: 0.16, caps: true, color: N3.COL.capRed });
    head = N3.text({ comp: main, ox: 960, oy: 540, parent: null, slot: "pre" }, "Communication goals", { name: "Headline", x: -700, top: -380, fs: 66, wt: 700, ls: -0.035 });
    LOOK.ramp(head, [0, -60], N3.COL.ink, [0, 10], N3.COL.coralD, "Gradient text");
    N3.unitReveal(eye, { times: [ST.eye], based: "chars", stagger: 0.02, dy: 10, blur: 6, lin: 0.5 });
    N3.unitReveal(head, { times: [ST.eye + 0.25, ST.eye + 0.5], based: "words", stagger: 0.12, dy: 34, blur: 12, lin: 0.8 });
    eye.threeDLayer = true; head.threeDLayer = true;
    z0 = N3.pos(head).value; N3.pos(head).setValue([z0[0], z0[1], -140]);
    z0 = N3.pos(eye).value; N3.pos(eye).setValue([z0[0], z0[1], -140]);

    // cards: 3D precomp layers on a curved wall; EXPO entrance from deeper, lower and turned
    for (i = 0; i < 3; i++) {
        pc = cardComp(i, main);
        l = main.layers.add(pc); l.name = "Card " + (i + 1);
        l.collapseTransformation = true; l.threeDLayer = true;
        t = ST.cards[i];
        LOOK.key(N3.pos(l), t, t + 1.0, [960 + ST.x[i], 600 + 90, ST.z[i] + 520], [960 + ST.x[i], 600, ST.z[i]], LOOK.EXPO);
        LOOK.key(N3.xf(l, "ADBE Rotate Y"), t, t + 1.1, ST.ry[i] + (i === 2 ? 26 : -26), ST.ry[i], LOOK.EXPO);
        LOOK.key(N3.xf(l, "ADBE Opacity"), t, t + 0.6, 0, 100, LOOK.CALM);
        X = LOOK.boxBlur(l, 0, "Entrance blur");
        LOOK.key(X, t, t + 0.7, 24, 0, LOOK.CALM);
        LOOK.shadow2(l, ST.tint, LOOK.ref("Shadow %"));
    }

    // camera: slow dolly-in drifting left to right across the wall, depth of field on the cards
    LOOK.camera(main, { t0: 0, t1: ST.T,
        from: { pos: [960 - 160, 540 + 60, -3050], poi: [960 - 60, 560, 0] },
        to: { pos: [960 + 140, 540 - 20, -2560], poi: [960 + 60, 560, 0] } });

    // voice-over for the same moment
    if ((new File(N3.ASSET_DIR + "/" + ST.vo)).exists) {
        try { vo = AEL.importFile(N3.ASSET_DIR + "/" + ST.vo, ST.folder); l = main.layers.add(vo); l.name = "VO"; l.startTime = -ST.voAt; l.moveToEnd(); }
        catch (e1) { AEL.warn("VO not placed: " + e1); }
    } else { AEL.warn("VO not found in " + N3.ASSET_DIR + " (the test still builds, silent)."); }
    ctl.moveToBeginning();
    main.openInViewer();
}

AEL.run($.fileName, "NOON3 style test", build);
