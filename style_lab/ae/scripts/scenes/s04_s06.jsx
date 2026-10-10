// Scenes 04-06: the dashboard, the AI summary, tasks.
// Built like the AP Automation reference: a control null ("RIG ...") holds the tilted panel; cards and rows are separate 3D
// layers parented to it, lifted toward the camera and cascading in a few frames apart; the rig carries the big move.

// 04 Dashboard (16.8 s)
LAB.SCENES.push({ id: "04", T: 16.8, build: function () {
    var S = LAB.scene("04", "Dashboard", 16.8, { from: { pos: [960, 760, -2850], poi: [960, 580, 0] }, to: { pos: [980, 540, -2420], poi: [980, 560, 0] } }),
        M = S.comp.name, rig = LAB.rig(S, "RIG Dashboard", { y: 40, z: 150, rx: 6 }), base, c, i, l, b, x, g, side = ["Overview", "Tasks", "Calendar", "Docs", "Settings"],
        stat = [["Focus hours", 0, 128, "", "", "+12%"], ["Tasks done", 0, 342, "", "", "+28%"], ["Meetings", 0, 38, "-", "%", "-38%"]], H = [150, 190, 130, 170, 110, 90, 60];
    // the rig (positions are comp coordinates; frame centre = 960, 540): rises and un-tilts (EXPO), then drifts slowly (CALM)
    LOOK.key(N3.pos(rig), 0.3, 2.1, [960, 800, 750], [960, 580, 150], LOOK.EXPO);
    LOOK.key(N3.pos(rig), 2.1, 16.8, [960, 580, 150], [960, 560, 120], LOOK.CALM);
    LOOK.key(N3.xf(rig, "ADBE Rotate X"), 0.3, 2.3, 30, 6, LOOK.EXPO);
    LOOK.key(N3.xf(rig, "ADBE Rotate X"), 2.3, 16.8, 6, 2, LOOK.CALM);
    // base panel: sidebar, header
    base = LAB.group(S, "Dashboard base", 1640, 940, {}); c = base.ctx;
    LAB.panel(c, { name: "Panel", w: 1560, h: 860, r: 34, tSweep: 3.2, main: M });
    N3.box(c, { name: "Sidebar", cx: -650, cy: 0, w: 230, h: 800, r: 24, fill: "#141A48" });
    N3.ellipse(c, { name: "Side logo", cx: -725, cy: -360, d: 26, stroke: LAB.P.cyan, sw: 5 });
    LAB.text(c, "aurelo", { name: "Side wordmark", x: -700, cy: -360, fs: 22, wt: 700 });
    for (i = 0; i < side.length; i++) {
        if (i === 0) { N3.box(c, { name: "Side active", cx: -650, cy: -280, w: 200, h: 46, r: 14, fill: LAB.P.violet, opacity: 85 }); }
        LAB.text(c, side[i], { name: "Side " + side[i], x: -720, cy: -280 + i * 60, fs: 18, wt: i ? 500 : 600, color: i ? LAB.P.mute : LAB.P.white });
    }
    LAB.text(c, "Overview", { name: "Header", x: -500, top: -395, fs: 34, wt: 700 });
    N3.box(c, { name: "Search", cx: 520, cy: -372, w: 300, h: 50, r: 25, fill: "#1A2158" });
    N3.icon(c, "search", { name: "Search icon", cx: 400, cy: -372, size: 22, color: LAB.P.mute, sw: 2 });
    LAB.text(c, "Search", { name: "Search text", x: 425, cy: -372, fs: 18, color: LAB.P.dim });
    LAB.attach(base, rig, [0, 0, 0]); LAB.shadow(base.layer);
    // stat tiles: lifted 70 px, cascading 0.1 s apart
    for (i = 0; i < 3; i++) {
        x = -340 + i * 380;
        g = LAB.group(S, "Stat " + (i + 1), 380, 190, {}); c = g.ctx;
        b = N3.box(c, { name: "Tile", cx: 0, cy: 0, w: 350, h: 160, r: 22, fill: "#1E2663" });
        LOOK.ramp(b, [-175, -80], "#2A3380", [175, 80], "#171D52", "Gradient Ramp");
        LAB.text(c, stat[i][0], { name: "Label", x: -150, top: -55, fs: 17, color: LAB.P.mute });
        l = LAB.text(c, "0", { name: "Number", x: -150, top: -21, fs: 52, wt: 700 });
        LAB.counter(l, stat[i][1], stat[i][2], 2.4 + i * 0.1, 4.4 + i * 0.1, stat[i][3], stat[i][4], 0);
        LAB.pill(c, stat[i][5], { name: "Delta", x: 60, top: -7, fs: 14, padX: 10, padY: 5, bg: i === 2 ? "#1F7A5A" : "#2F3A8F", t: 3.0 + i * 0.1, soft: 20, level: 120, main: M });
        LAB.sweep(b, 350, 4.6 + i * 0.12, M, "#B8C4FF");
        LAB.attach(g, rig, [x, -215, -70]); LAB.shadow(g.layer);
        LAB.lift(g.layer, 2.0 + i * 0.1, { depth: 260 });
    }
    // chart card (line) and bar card: lifted 40 px
    g = LAB.group(S, "Chart card", 760, 430, {}); c = g.ctx;
    N3.box(c, { name: "Card", cx: 0, cy: 0, w: 730, h: 400, r: 22, fill: "#161C4E" });
    LAB.text(c, "Team focus", { name: "Title", x: -340, top: -180, fs: 19, wt: 600 });
    LAB.chartLine(c, { name: "Focus line", pts: [[-330, 130], [-270, 90], [-210, 110], [-150, 50], [-90, 65], [-30, 10], [30, 30], [90, -30], [150, -15], [210, -60], [270, -45], [330, -100]], t: 3.4, d: 1.8, main: M });
    LAB.attach(g, rig, [-150, 140, -40]); LAB.shadow(g.layer); LAB.lift(g.layer, 2.4, { depth: 220 });
    g = LAB.group(S, "Bar card", 430, 430, {}); c = g.ctx;
    N3.box(c, { name: "Card", cx: 0, cy: 0, w: 400, h: 400, r: 22, fill: "#161C4E" });
    LAB.text(c, "Meetings per day", { name: "Title", x: -175, top: -180, fs: 19, wt: 600 });
    for (i = 0; i < H.length; i++) { LAB.bar(c, { name: "Bar " + (i + 1), x: -150 + i * 50, base: 160, w: 28, h: H[i], color: i === H.length - 1 ? LAB.P.cyan : LAB.P.violet, t: 4.0 + i * 0.12 }); }
    LAB.attach(g, rig, [420, 140, -40]); LAB.shadow(g.layer); LAB.lift(g.layer, 2.5, { depth: 220 });
    // callouts float well in front of the panel, on the same rig
    g = LAB.group(S, "Callout focus", 560, 120, {});
    LAB.pill(g.ctx, "Focus up 24% this week", { name: "Callout", cx: 0, cy: 0, fs: 26, bg: "#2A9FC4", t: null, main: M });
    LAB.attach(g, rig, [20, -20, -260]); LAB.lift(g.layer, 6.4, { depth: 300, tilt: -20 });
    g = LAB.group(S, "Callout meetings", 520, 120, {});
    LAB.pill(g.ctx, "Meetings down 38%", { name: "Callout", cx: 0, cy: 0, fs: 26, bg: LAB.P.pink, t: null, main: M });
    LAB.attach(g, rig, [-560, 320, -260]); LAB.lift(g.layer, 9.6, { depth: 300, tilt: -20 });
    rig.moveToBeginning();
    return S;
} });

// 05 AI summary (13.8 s)
LAB.SCENES.push({ id: "05", T: 13.8, build: function () {
    var S = LAB.scene("05", "AI summary", 13.8, { from: { pos: [880, 560, -2750], poi: [900, 560, 0] }, to: { pos: [1040, 520, -2400], poi: [1020, 560, 0] } }),
        M = S.comp.name, rig = LAB.rig(S, "RIG Chat", { y: 40, z: 200, ry: -6 }), base, g, c, l, b, i,
        lines = ["Launch moves to May 14; design sign-off is on Friday.", "Two risks: the vendor delay and QA capacity.", "Five next steps, assigned to Maya, Jo and Alex."],
        P = [["3 decisions", LAB.P.violet, -500], ["2 risks", LAB.P.pink, -300], ["5 next steps", "#2A9FC4", -150]];
    LOOK.key(N3.pos(rig), 0.3, 1.9, [960, 700, 800], [960, 580, 200], LOOK.EXPO);
    LOOK.key(N3.xf(rig, "ADBE Rotate Y"), 0.3, 2.0, -24, -6, LOOK.EXPO);
    LOOK.key(N3.xf(rig, "ADBE Rotate Y"), 2.0, 13.8, -6, 4, LOOK.CALM);
    base = LAB.group(S, "Chat base", 1320, 880, {}); c = base.ctx;
    LAB.panel(c, { name: "Panel", w: 1220, h: 800, r: 34, main: M });
    LAB.tile(c, { name: "AI badge", cx: -530, cy: -330, s: 54, icon: "sparkles", c0: LAB.P.violet, c1: "#3B2FA8", main: M });
    LAB.text(c, "Aurelo AI", { name: "AI title", x: -490, cy: -330, fs: 24, wt: 700 });
    LAB.attach(base, rig, [0, 0, 0]); LAB.shadow(base.layer);
    // prompt bubble, lifted
    g = LAB.group(S, "Prompt", 660, 110, {}); c = g.ctx;
    b = N3.box(c, { name: "Bubble", cx: 0, cy: 0, w: 600, h: 70, r: 35, fill: "#FFFFFF" });
    LOOK.gradient4(b, 600, 70, [LAB.P.violet, "#6A4CF0", "#5B3FE0", "#4B34C8"]);
    l = LAB.text(c, "Summarise this week for the team", { name: "Prompt", x: -275, cy: 0, fs: 23, wt: 500 });
    N3.typeOn(l, 1.1, 2.6);
    LAB.sweep(b, 600, 2.8, M, "#D9D2FF");
    LAB.attach(g, rig, [260, -210, -60]); LAB.shadow(g.layer); LAB.lift(g.layer, 0.8, { depth: 240 });
    // answer card, lifted further
    g = LAB.group(S, "Answer", 1120, 430, {}); c = g.ctx;
    b = N3.box(c, { name: "Card", cx: 0, cy: 0, w: 1080, h: 380, r: 26, fill: "#161C4E", stroke: LAB.P.cyan, sw: 1.5 });
    LAB.glow(b, LAB.P.cyan, 40, 3.2, 90, M);
    N3.icon(c, "sparkle", { name: "Icon", cx: -480, cy: -130, size: 30, color: LAB.P.cyan, sw: 2 });
    for (i = 0; i < 3; i++) {
        N3.ellipse(c, { name: "Dot " + (i + 1), cx: -460, cy: -72 + i * 70, d: 9, fill: LAB.P.cyan });
        l = LAB.text(c, lines[i], { name: "Line " + (i + 1), x: -430, cy: -72 + i * 70, fs: 25, wt: 500 });
        N3.unitReveal(l, { times: [3.6 + i * 0.7], based: "words", stagger: 0.04, dy: 10, blur: 6, lin: 0.4 });
    }
    LAB.sweep(b, 1080, 5.4, M, "#9FE8FF");
    LAB.attach(g, rig, [-40, 70, -90]); LAB.shadow(g.layer); LAB.lift(g.layer, 3.0, { depth: 260, tilt: -12 });
    // result pills cascade, 0.1 s apart, lifted furthest
    for (i = 0; i < P.length; i++) {
        g = LAB.group(S, "Pill " + (i + 1), 300, 90, {});
        LAB.pill(g.ctx, P[i][0], { name: "Pill", cx: 0, cy: 0, fs: 20, bg: P[i][1], t: null, main: M });
        LAB.attach(g, rig, [P[i][2] + 70, 310, -140]); LAB.lift(g.layer, 6.4 + i * 0.1, { depth: 300 });
    }
    rig.moveToBeginning();
    LAB.headline(S, "Ask once. Get the summary.", { top: -470, fs: 52, t: 8.4, stagger: 0.12, flat: true });
    return S;
} });

// 06 Tasks (13.8 s): rows rise out of the panel one by one, then tick off; the ring fills to 80%.
LAB.SCENES.push({ id: "06", T: 13.8, build: function () {
    var S = LAB.scene("06", "Tasks", 13.8, { from: { pos: [1020, 560, -2750], poi: [1000, 560, 0] }, to: { pos: [900, 520, -2420], poi: [940, 560, 0] } }),
        M = S.comp.name, rig = LAB.rig(S, "RIG Tasks", { x: -260, y: 40, z: 100, ry: 8 }), base, g, c, i, y, l, ck, tk = [2.6, 3.4, 4.2, 5.0],
        T = ["Confirm launch date with vendor", "Final review of the design files", "Book QA time for next sprint", "Send the summary to the team", "Plan the launch retro"],
        who = ["MK", "JO", "AL", "MK", "JO"], p, r, rb;
    LOOK.key(N3.pos(rig), 0.3, 1.8, [700, 740, 700], [700, 580, 100], LOOK.EXPO);
    LOOK.key(N3.xf(rig, "ADBE Rotate X"), 0.3, 1.9, 26, 0, LOOK.EXPO);
    base = LAB.group(S, "Task base", 1000, 820, {}); c = base.ctx;
    LAB.panel(c, { name: "Panel", w: 920, h: 740, r: 34, main: M });
    LAB.text(c, "This week", { name: "List title", x: -400, top: -330, fs: 32, wt: 700 });
    LAB.attach(base, rig, [0, 0, 0]); LAB.shadow(base.layer);
    for (i = 0; i < T.length; i++) {
        y = -180 + i * 112;
        g = LAB.group(S, "Row " + (i + 1), 860, 110, {}); c = g.ctx;
        rb = N3.box(c, { name: "Row", cx: 0, cy: 0, w: 820, h: 92, r: 20, fill: "#1E2663" });
        N3.ellipse(c, { name: "Box", cx: -360, cy: 0, d: 36, stroke: LAB.P.dim, sw: 2.5 });
        l = LAB.text(c, T[i], { name: "Task", x: -320, cy: 0, fs: 23, wt: 500 });
        N3.ellipse(c, { name: "Avatar", cx: 350, cy: 0, d: 44, fill: i % 2 ? LAB.P.pink : LAB.P.violet });
        LAB.text(c, who[i], { name: "Initials", x: 350, cy: 0, fs: 15, wt: 700, align: "center" });
        if (i < tk.length) {
            ck = N3.ellipse(c, { name: "Done", cx: -360, cy: 0, d: 36, fill: LAB.P.cyan });
            LAB.pop(ck, tk[i]); LAB.glow(ck, LAB.P.cyan, 26, tk[i], 200, M);
            ck = N3.icon(c, "check", { name: "Tick", cx: -360, cy: 0, size: 24, color: "#0B1036", sw: 3 }); LAB.pop(ck, tk[i] + 0.05);
            LOOK.key(N3.xf(l, "ADBE Opacity"), tk[i] + 0.1, tk[i] + 0.6, 100, 45, LOOK.CALM);
        }
        // the active row (first) floats highest; the last rows sit lower and softer, like the reference
        LAB.attach(g, rig, [0, y, i === 0 ? -90 : -50 + i * 8]);
        LAB.lift(g.layer, 1.2 + i * 0.1, { depth: 260, op: i < 4 ? 100 : 60 });
        if (i === 0) { LAB.sweep(rb, 820, 2.0, M, "#9FE8FF"); }
    }
    rig.moveToBeginning();
    p = LAB.group(S, "Progress", 540, 540, { x: 560, y: 10, z: -120, ry: -10 });
    LAB.panel(p.ctx, { name: "Panel", w: 470, h: 470, r: 40, tSweep: 5.2, main: M });
    r = LAB.ring(p.ctx, { name: "Ring", cx: 0, cy: -20, d: 300, sw: 18, color: LAB.P.cyan, t0: 2.6, t1: 5.4, pct: 80 });
    LAB.glow(r, LAB.P.cyan, 30, 2.8, 170, M);
    l = LAB.text(p.ctx, "0%", { name: "Percent", x: 0, cy: -20, fs: 76, wt: 700, align: "center" });
    LAB.counter(l, 0, 80, 2.6, 5.4, "", "%", 0);
    LAB.text(p.ctx, "Done this week", { name: "Ring label", x: 0, cy: 175, fs: 20, color: LAB.P.mute, align: "center" });
    LAB.enter(p.layer, 0.9, { dz: 500, dy: 60, ry: -16, dur: 1.4 });
    LAB.shadow(p.layer);
    LAB.headline(S, "Turn talk into tasks.", { top: -470, fs: 56, t: 6.2, stagger: 0.14, flat: true });
    return S;
} });
