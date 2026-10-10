// Scenes 04-06: the dashboard, the AI summary, tasks.

// 04 Dashboard (16.8 s): a tilted glass dashboard rises and settles; stats count up, the chart draws, bars grow; two callouts float in front.
LAB.SCENES.push({ id: "04", T: 16.8, build: function () {
    var S = LAB.scene("04", "Dashboard", 16.8, { from: { pos: [960, 820, -2850], poi: [960, 580, 0] }, to: { pos: [980, 520, -2380], poi: [980, 560, 0] } }),
        M = S.comp.name, g = LAB.group(S, "Dashboard", 1640, 940, { y: 40, z: 150, rx: 6 }), c = g.ctx, i, l, side = ["Overview", "Tasks", "Calendar", "Docs", "Settings"],
        stat = [["Focus hours", 0, 128, "", "", "+12%"], ["Tasks done", 0, 342, "", "", "+28%"], ["Meetings", 0, 38, "-", "%", "-38%"]], x, b, call;
    LAB.panel(c, { name: "Panel", w: 1560, h: 860, r: 34, tSweep: 3.4, main: M });
    // sidebar
    N3.box(c, { name: "Sidebar", cx: -650, cy: 0, w: 230, h: 800, r: 24, fill: "#141A48" });
    l = N3.ellipse(c, { name: "Side logo", cx: -725, cy: -360, d: 26, stroke: LAB.P.cyan, sw: 5 });
    LAB.text(c, "aurelo", { name: "Side wordmark", x: -700, cy: -360, fs: 22, wt: 700 });
    for (i = 0; i < side.length; i++) {
        if (i === 0) { N3.box(c, { name: "Side active", cx: -650, cy: -280, w: 200, h: 46, r: 14, fill: LAB.P.violet, opacity: 85 }); }
        LAB.text(c, side[i], { name: "Side " + side[i], x: -720, cy: -280 + i * 60, fs: 18, wt: i ? 500 : 600, color: i ? LAB.P.mute : LAB.P.white });
    }
    // header
    LAB.text(c, "Overview", { name: "Header", x: -500, top: -395, fs: 34, wt: 700 });
    N3.box(c, { name: "Search", cx: 520, cy: -372, w: 300, h: 50, r: 25, fill: "#1A2158" });
    N3.icon(c, "search", { name: "Search icon", cx: 400, cy: -372, size: 22, color: LAB.P.mute, sw: 2 });
    LAB.text(c, "Search", { name: "Search text", x: 425, cy: -372, fs: 18, color: LAB.P.dim });
    // stat tiles
    for (i = 0; i < 3; i++) {
        x = -340 + i * 380;
        b = N3.box(c, { name: "Stat " + (i + 1), cx: x, cy: -215, w: 350, h: 160, r: 22, fill: "#1A2158" }); N3.show(b, 2.0 + i * 0.2, null, 16, { lin: 0.5 });
        l = LAB.text(c, stat[i][0], { name: "Stat label " + (i + 1), x: x - 150, top: -270, fs: 17, color: LAB.P.mute }); N3.show(l, 2.1 + i * 0.2, null, 10, { lin: 0.5 });
        l = LAB.text(c, "0", { name: "Stat number " + (i + 1), x: x - 150, top: -236, fs: 52, wt: 700 }); N3.show(l, 2.1 + i * 0.2, null, 10, { lin: 0.5 });
        LAB.counter(l, stat[i][1], stat[i][2], 2.2 + i * 0.2, 4.2 + i * 0.2, stat[i][3], stat[i][4], 0);
        LAB.pill(c, stat[i][5], { name: "Delta " + (i + 1), x: x + 60, top: -222, fs: 14, padX: 10, padY: 5, bg: i === 2 ? "#1F7A5A" : "#2F3A8F", t: 3.0 + i * 0.2, soft: 20, level: 120, main: M });
    }
    // line chart
    b = N3.box(c, { name: "Chart card", cx: -150, cy: 140, w: 730, h: 400, r: 22, fill: "#161C4E" }); N3.show(b, 2.6, null, 16, { lin: 0.5 });
    LAB.text(c, "Team focus", { name: "Chart title", x: -490, top: -40, fs: 19, wt: 600 });
    LAB.chartLine(c, { name: "Focus line", pts: [[-480, 270], [-420, 230], [-360, 250], [-300, 190], [-240, 205], [-180, 150], [-120, 170], [-60, 110], [0, 125], [60, 80], [120, 95], [180, 40]], t: 3.4, d: 1.8, main: M });
    // bar chart
    b = N3.box(c, { name: "Bars card", cx: 420, cy: 140, w: 400, h: 400, r: 22, fill: "#161C4E" }); N3.show(b, 2.8, null, 16, { lin: 0.5 });
    LAB.text(c, "Meetings per day", { name: "Bars title", x: 245, top: -40, fs: 19, wt: 600 });
    var H = [150, 190, 130, 170, 110, 90, 60];
    for (i = 0; i < H.length; i++) { LAB.bar(c, { name: "Bar " + (i + 1), x: 270 + i * 50, base: 300, w: 28, h: H[i], color: i === H.length - 1 ? LAB.P.cyan : LAB.P.violet, t: 4.0 + i * 0.12 }); }
    LAB.enter(g.layer, 0.4, { dz: 600, dy: 160, rx: 18, dur: 1.6 });
    LAB.shadow(g.layer);
    // callouts floating in front
    call = LAB.group(S, "Callout focus", 560, 120, { x: 20, y: 20, z: -300 });
    LAB.pill(call.ctx, "Focus up 24% this week", { name: "Callout", cx: 0, cy: 0, fs: 26, bg: "#2A9FC4", t: null, main: M });
    LAB.enter(call.layer, 6.4, { dz: 300, dy: 30 });
    call = LAB.group(S, "Callout meetings", 520, 120, { x: -560, y: 320, z: -300 });
    LAB.pill(call.ctx, "Meetings down 38%", { name: "Callout", cx: 0, cy: 0, fs: 26, bg: LAB.P.pink, t: null, main: M });
    LAB.enter(call.layer, 9.6, { dz: 300, dy: 30 });
    return S;
} });

// 05 AI summary (13.8 s): a prompt types in, the AI answer builds line by line, three result pills light up.
LAB.SCENES.push({ id: "05", T: 13.8, build: function () {
    var S = LAB.scene("05", "AI summary", 13.8, { from: { pos: [880, 560, -2750], poi: [900, 560, 0] }, to: { pos: [1040, 520, -2400], poi: [1020, 560, 0] } }),
        M = S.comp.name, g = LAB.group(S, "Chat", 1320, 880, { y: 40, z: 200, ry: -6 }), c = g.ctx, l, b, i,
        lines = ["Launch moves to May 14; design sign-off is on Friday.", "Two risks: the vendor delay and QA capacity.", "Five next steps, assigned to Maya, Jo and Alex."];
    LAB.panel(c, { name: "Panel", w: 1220, h: 800, r: 34, tSweep: 5.4, main: M });
    LAB.tile(c, { name: "AI badge", cx: -530, cy: -330, s: 54, icon: "sparkles", c0: LAB.P.violet, c1: "#3B2FA8", main: M });
    LAB.text(c, "Aurelo AI", { name: "AI title", x: -490, cy: -330, fs: 24, wt: 700 });
    // prompt bubble
    b = N3.box(c, { name: "Prompt bubble", cx: 260, cy: -210, w: 600, h: 70, r: 35, fill: "#FFFFFF" });
    LOOK.gradient4(b, 600, 70, [LAB.P.violet, "#6A4CF0", "#5B3FE0", "#4B34C8"]);
    N3.show(b, 0.8, null, 16, { lin: 0.5 });
    l = LAB.text(c, "Summarise this week for the team", { name: "Prompt", x: -15, cy: -210, fs: 23, wt: 500 });
    N3.typeOn(l, 1.1, 2.6);
    // answer card
    b = N3.box(c, { name: "Answer card", cx: -40, cy: 70, w: 1080, h: 380, r: 26, fill: "#161C4E", stroke: LAB.P.cyan, sw: 1.5 });
    N3.show(b, 3.0, null, 20, { lin: 0.6 }); LAB.glow(b, LAB.P.cyan, 40, 3.2, 90, M);
    N3.icon(c, "sparkle", { name: "Answer icon", cx: -520, cy: -60, size: 30, color: LAB.P.cyan, sw: 2 });
    for (i = 0; i < 3; i++) {
        N3.ellipse(c, { name: "Dot " + (i + 1), cx: -500, cy: -2 + i * 70, d: 9, fill: LAB.P.cyan });
        l = LAB.text(c, lines[i], { name: "Answer " + (i + 1), x: -470, cy: -2 + i * 70, fs: 25, wt: 500 });
        N3.unitReveal(l, { times: [3.6 + i * 0.7], based: "words", stagger: 0.04, dy: 10, blur: 6, lin: 0.4 });
    }
    // result pills
    LAB.pill(c, "3 decisions", { name: "Pill decisions", x: -500, top: 290, fs: 20, bg: LAB.P.violet, t: 6.4, main: M });
    LAB.pill(c, "2 risks", { name: "Pill risks", x: -300, top: 290, fs: 20, bg: LAB.P.pink, t: 6.8, main: M });
    LAB.pill(c, "5 next steps", { name: "Pill steps", x: -150, top: 290, fs: 20, bg: "#2A9FC4", t: 7.2, main: M });
    LAB.enter(g.layer, 0.3, { dz: 500, dy: 80, ry: -14, dur: 1.4 });
    LAB.shadow(g.layer);
    LAB.headline(S, "Ask once. Get the summary.", { top: -470, fs: 52, t: 8.4, stagger: 0.12, flat: true });
    return S;
} });

// 06 Tasks (13.8 s): four tasks tick off with a cyan glow, the progress ring fills to 80%.
LAB.SCENES.push({ id: "06", T: 13.8, build: function () {
    var S = LAB.scene("06", "Tasks", 13.8, { from: { pos: [1020, 560, -2750], poi: [1000, 560, 0] }, to: { pos: [900, 520, -2420], poi: [940, 560, 0] } }),
        M = S.comp.name, g = LAB.group(S, "Task list", 1000, 820, { x: -260, y: 40, z: 100, ry: 8 }), c = g.ctx, i, y, l, ck, tk = [2.2, 3.0, 3.8, 4.6],
        T = ["Confirm launch date with vendor", "Final review of the design files", "Book QA time for next sprint", "Send the summary to the team", "Plan the launch retro"],
        who = ["MK", "JO", "AL", "MK", "JO"], p, r;
    LAB.panel(c, { name: "Panel", w: 920, h: 740, r: 34, main: M });
    LAB.text(c, "This week", { name: "List title", x: -400, top: -330, fs: 32, wt: 700 });
    for (i = 0; i < T.length; i++) {
        y = -180 + i * 112;
        N3.box(c, { name: "Row " + (i + 1), cx: 0, cy: y, w: 820, h: 92, r: 20, fill: "#1A2158" });
        N3.ellipse(c, { name: "Box " + (i + 1), cx: -360, cy: y, d: 36, stroke: LAB.P.dim, sw: 2.5 });
        l = LAB.text(c, T[i], { name: "Task " + (i + 1), x: -320, cy: y, fs: 23, wt: 500 });
        N3.ellipse(c, { name: "Avatar " + (i + 1), cx: 350, cy: y, d: 44, fill: i % 2 ? LAB.P.pink : LAB.P.violet });
        LAB.text(c, who[i], { name: "Initials " + (i + 1), x: 350, cy: y, fs: 15, wt: 700, align: "center" });
        if (i < tk.length) {
            ck = N3.ellipse(c, { name: "Done " + (i + 1), cx: -360, cy: y, d: 36, fill: LAB.P.cyan });
            LAB.pop(ck, tk[i]); LAB.glow(ck, LAB.P.cyan, 26, tk[i], 200, M);
            ck = N3.icon(c, "check", { name: "Tick " + (i + 1), cx: -360, cy: y, size: 24, color: "#0B1036", sw: 3 }); LAB.pop(ck, tk[i] + 0.05);
            LOOK.key(N3.xf(l, "ADBE Opacity"), tk[i] + 0.1, tk[i] + 0.6, 100, 45, LOOK.CALM);
        }
    }
    LAB.enter(g.layer, 0.3, { dz: 500, dy: 80, ry: 16, dur: 1.4 });
    LAB.shadow(g.layer);
    p = LAB.group(S, "Progress", 540, 540, { x: 560, y: 10, z: -120, ry: -10 });
    LAB.panel(p.ctx, { name: "Panel", w: 470, h: 470, r: 40, tSweep: 5.2, main: M });
    r = LAB.ring(p.ctx, { name: "Ring", cx: 0, cy: -20, d: 300, sw: 18, color: LAB.P.cyan, t0: 2.2, t1: 5.0, pct: 80 });
    LAB.glow(r, LAB.P.cyan, 30, 2.4, 170, M);
    l = LAB.text(p.ctx, "0%", { name: "Percent", x: 0, cy: -20, fs: 76, wt: 700, align: "center" });
    LAB.counter(l, 0, 80, 2.2, 5.0, "", "%", 0);
    LAB.text(p.ctx, "Done this week", { name: "Ring label", x: 0, cy: 175, fs: 20, color: LAB.P.mute, align: "center" });
    LAB.enter(p.layer, 0.9, { dz: 500, dy: 60, ry: -16, dur: 1.4 });
    LAB.shadow(p.layer);
    LAB.headline(S, "Turn talk into tasks.", { top: -470, fs: 56, t: 6.2, stagger: 0.14, flat: true });
    return S;
} });
