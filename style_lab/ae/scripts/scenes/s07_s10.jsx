// Scenes 07-10: focus time, integrations, results, end card.

// 07 Focus (12.8 s): a week full of meetings clears, and a glowing focus block takes the space.
LAB.SCENES.push({ id: "07", T: 12.8, build: function () {
    var S = LAB.scene("07", "Focus", 12.8, { from: { pos: [960, 660, -2850], poi: [960, 580, 0] }, to: { pos: [960, 520, -2420], poi: [960, 560, 0] } }),
        M = S.comp.name, g = LAB.group(S, "Calendar", 1540, 900, { y: 40, z: 150, rx: 8 }), c = g.ctx, D = ["Mon", "Tue", "Wed", "Thu", "Fri"], i, x, b, l, f, fx,
        MT = [[0, -190, 70, "Stand-up"], [0, 40, 110, "Planning"], [1, -120, 90, "Sync"], [1, 130, 70, "1:1"], [2, -200, 70, "Stand-up"], [2, 0, 130, "Review"],
            [3, -80, 90, "Vendor call"], [3, 160, 80, "Sync"], [4, -190, 70, "Stand-up"], [4, 60, 120, "Retro"]];
    LAB.panel(c, { name: "Panel", w: 1460, h: 820, r: 34, main: M });
    LAB.text(c, "Week of May 12", { name: "Week", x: -660, top: -370, fs: 30, wt: 700 });
    for (i = 0; i < 5; i++) {
        x = -520 + i * 260;
        LAB.text(c, D[i], { name: "Day " + D[i], x: x, top: -290, fs: 18, wt: 600, color: LAB.P.mute, align: "center" });
        if (i) { N3.box(c, { name: "Grid " + i, cx: x - 130, cy: 40, w: 2, h: 600, fill: LAB.P.line }); }
    }
    for (i = 0; i < MT.length; i++) {
        x = -520 + MT[i][0] * 260;
        b = N3.box(c, { name: "Meeting " + (i + 1), cx: x, cy: MT[i][1], w: 220, h: MT[i][2], r: 14, fill: i % 3 === 1 ? LAB.P.pink : LAB.P.violet, opacity: 70 });
        l = LAB.text(c, MT[i][3], { name: "Meeting label " + (i + 1), x: x - 96, top: MT[i][1] - MT[i][2] / 2 + 10, fs: 16, wt: 600 });
        if (MT[i][0] >= 1 && MT[i][0] <= 3) {   // Tue-Thu clear out
            LOOK.key(N3.xf(b, "ADBE Scale"), 3.0 + i * 0.08, 3.6 + i * 0.08, [100, 100], [100, 0], LOOK.CALM);
            LOOK.key(N3.xf(b, "ADBE Opacity"), 3.0 + i * 0.08, 3.6 + i * 0.08, 70, 0, LOOK.CALM);
            LOOK.key(N3.xf(l, "ADBE Opacity"), 2.9 + i * 0.08, 3.3 + i * 0.08, 100, 0, LOOK.CALM);
        }
    }
    // the focus block: grows across Tue-Thu
    f = N3.box(c, { name: "Focus block", cx: -260 + 260, cy: 30, w: 740, h: 300, r: 22, fill: "#FFFFFF" });
    LOOK.gradient4(f, 740, 300, [LAB.P.cyan, "#4FA8F5", LAB.P.violet, "#6A4CF0"]);
    LOOK.key(N3.xf(f, "ADBE Scale"), 4.4, 5.4, [0, 100], [100, 100], LOOK.EXPO);
    LAB.glow(f, LAB.P.cyan, 60, 4.8, 170, M);
    fx = LAB.text(c, "Focus time \u00B7 3 h", { name: "Focus label", x: 0, cy: 30, fs: 34, wt: 700, align: "center" });
    N3.unitReveal(fx, { times: [5.2], based: "words", stagger: 0.08, dy: 14, blur: 8, lin: 0.5 });
    LAB.enter(g.layer, 0.4, { dz: 600, dy: 120, rx: 14, dur: 1.6 });
    LAB.shadow(g.layer);
    LAB.headline(S, "Protect your focus.", { top: -470, fs: 56, t: 6.4, stagger: 0.14, flat: true });
    return S;
} });

// 08 Integrations (12.8 s): eight app tiles orbit the hub in depth.
LAB.SCENES.push({ id: "08", T: 12.8, build: function () {
    var S = LAB.scene("08", "Integrations", 12.8, { from: { pos: [960, 600, -3000], poi: [960, 540, 0] }, to: { pos: [960, 520, -2600], poi: [960, 540, 0] } }),
        M = S.comp.name, hub = LAB.group(S, "Hub", 420, 420, { z: 0 }), r, gi, i, g, A = [["folder", LAB.P.violet], ["file", LAB.P.cyan], ["users", LAB.P.pink], ["clock", "#4FA8F5"],
            ["search", LAB.P.violet], ["bolt", "#F5B544"], ["target", LAB.P.pink], ["devices", LAB.P.cyan]], t;
    r = N3.box(hub.ctx, { name: "Hub tile", cx: 0, cy: 0, w: 230, h: 230, r: 64, fill: "#FFFFFF" });
    LOOK.gradient4(r, 230, 230, ["#3A2FB0", LAB.P.violet, "#1A1F5C", "#2A2390"]);
    LAB.glow(r, LAB.P.violet, 90, 0.6, 200, M);
    r = N3.shapeLayer(hub.ctx.comp, "Hub ring"); gi = N3.addGroup(r, "Ring");
    N3.addEllipse(r, gi, 104, 104); N3.addStroke(r, gi, "#FFFFFF", 13, undefined, true); N3.pos(r).setValue(N3.P(hub.ctx, 0, 0));
    LOOK.ramp(r, [-52, -52], LAB.P.cyan, [52, 52], "#FFFFFF", "Ring gradient");
    LAB.enter(hub.layer, 0.4, { dz: 400, dy: 0, dur: 1.2 });
    for (i = 0; i < A.length; i++) {
        g = LAB.group(S, "App " + (i + 1), 200, 200, {});
        LAB.tile(g.ctx, { name: "Tile", cx: 0, cy: 0, s: 130, icon: A[i][0], c0: A[i][1], c1: "#241C78", main: M });
        AEL.expr(N3.pos(g.layer), "// orbit: radius, height and depth of the ellipse; speed in turns per second\n" +
            "var a = " + (i * 2 * Math.PI / A.length) + " + time * 0.32;\n[960 + 600 * Math.cos(a), 540 + 210 * Math.sin(a), 420 * Math.sin(a)]");
        t = 1.0 + i * 0.16;
        LOOK.key(N3.xf(g.layer, "ADBE Opacity"), t, t + 0.6, 0, 100, LOOK.CALM);
        LOOK.key(LAB.softBlur(g.layer), t, t + 0.7, 20, 0, LOOK.CALM);
        LOOK.key(N3.xf(g.layer, "ADBE Scale"), t, t + 0.8, [40, 40, 100], [100, 100, 100], LOOK.EXPO);
    }
    LAB.headline(S, "Works with the tools you already use.", { top: 380, fs: 48, t: 3.4, stagger: 0.1, z: -200 });
    return S;
} });

// 09 Results (11.8 s): three numbers on a curved wall of glass cards.
LAB.SCENES.push({ id: "09", T: 11.8, build: function () {
    var S = LAB.scene("09", "Results", 11.8, { from: { pos: [780, 600, -3050], poi: [900, 560, 0] }, to: { pos: [1100, 520, -2560], poi: [1020, 560, 0] } }),
        M = S.comp.name, R = [[0, 6, "", "h", "saved per person,\nevery week"], [0, 38, "", "%", "fewer meetings\nafter a month"], [1, 1, "", "", "place for plans,\ntasks and notes"]],
        X = [-560, 0, 560], Z = [90, 0, 90], RY = [-14, 0, 14], i, g, l, t, n;
    for (i = 0; i < 3; i++) {
        t = 0.6 + i * 0.6;
        g = LAB.group(S, "Result " + (i + 1), 540, 580, { x: X[i], y: 70, z: Z[i], ry: RY[i] });
        LAB.panel(g.ctx, { name: "Panel", w: 480, h: 520, r: 36, tSweep: t + 1.0, main: M });
        n = LAB.text(g.ctx, String(R[i][1]) + R[i][3], { name: "Number", x: -190, top: -200, fs: 128, wt: 800, ls: -0.04 });
        LAB.grad(n, 128, "#FFFFFF", i === 1 ? "#FF9BC6" : "#9FE8FF");
        if (R[i][0] !== R[i][1]) { LAB.counter(n, R[i][0], R[i][1], t + 0.4, t + 2.0, R[i][2], R[i][3], 0); }
        l = LAB.text(g.ctx, R[i][4], { name: "Caption", x: -190, top: 10, fs: 28, lh: 38, color: LAB.P.mute });
        N3.box(g.ctx, { name: "Accent", cx: -150, cy: 160, w: 80, h: 6, r: 3, fill: i === 1 ? LAB.P.pink : LAB.P.cyan });
        LAB.enter(g.layer, t, { dz: 520, dy: 90, ry: i === 2 ? 26 : -26, dur: 1.1 });
        LAB.shadow(g.layer);
    }
    LAB.headline(S, "Calm work adds up.", { top: -480, fs: 56, t: 4.0, stagger: 0.14, z: -150 });
    l = LAB.text(S.ctx, "Sample figures for this demo", { name: "Footnote", x: 0, top: 470, fs: 15, color: LAB.P.dim, align: "center" });
    N3.show(l, 4.4, null, 0, { lin: 0.6 });
    return S;
} });

// 10 End (12.0 s): logo, line, call to action with a breathing glow.
LAB.SCENES.push({ id: "10", T: 12.0, build: function () {
    var S = LAB.scene("10", "End", 12.0, { from: { pos: [960, 540, -2900], poi: [960, 540, 0] }, to: { pos: [960, 540, -2560], poi: [960, 540, 0] } }),
        M = S.comp.name, g = LAB.group(S, "End", 1500, 760, { z: 0 }), c, h;
    h = LAB.logo(g.ctx, { cx: -250, cy: -150, d: 150, fs: 150, t: 0.4, main: M });
    LOOK.ccSweep(h.word, { p0: [-120, -55], p1: [600, -55], t0: 2.0, t1: 3.2, color: "#B9C4FF", width: 150, ctl: LOOK.refIn(M, "Sweep %") });
    h = LAB.text(g.ctx, "Calm work, done.", { name: "Line", x: 0, top: 10, fs: 54, wt: 600, align: "center", color: LAB.P.mute });
    N3.unitReveal(h, { times: [1.8], based: "words", stagger: 0.14, dy: 26, blur: 10, lin: 0.7 });
    c = LAB.pill(g.ctx, "Start free", { name: "CTA", cx: 0, top: 140, fs: 30, padX: 34, padY: 16, bg: LAB.P.violet, t: 2.8, soft: 60, level: 210, main: M });
    AEL.expr(c.bg.property("ADBE Effect Parade").property("Glow halo").property("ADBE Drop Shadow-0002"),
        "// breathing glow after it lands\nvar b = value * " + LOOK.refIn(M, "Glow %") + " / 100;\ntime < 3.4 ? b : b * (0.75 + 0.25 * Math.sin((time - 3.4) * 2.4))");
    LOOK.ccSweep(c.bg, { p0: [-160, 0], p1: [160, 0], t0: 3.6, t1: 4.6, color: "#E2DBFF", width: 90, ctl: LOOK.refIn(M, "Sweep %") });
    h = LAB.text(g.ctx, "Web \u00B7 Mac \u00B7 iOS", { name: "Platforms", x: 0, top: 250, fs: 20, color: LAB.P.dim, align: "center" });
    N3.show(h, 3.6, null, 10, { lin: 0.6 });
    return S;
} });
