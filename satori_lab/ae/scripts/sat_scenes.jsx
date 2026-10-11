// sat_scenes.jsx: the 30 s Tallyo sample (fictional invoice app). Hook 0-6.3 s fast, explanation 6.3-30 s calm.
// Every scene hangs from a MASTER null (the user's Null 15 / Null 13 pattern); exits are zoom-throughs or whips with
// motion blur, and the next scene starts already moving, so the hard cuts hide inside the motion.

// H1 "AI" (1.7 s): sunburst rays, huge gradient AI scaling down, two glossy tiles fly in and drift; whip up.
SAT.SCENES.push({ id: "H1", T: 1.7, build: function () {
    var S = SAT.scene("H1", "AI", 1.7), M, ai, sp, a, b, bg;
    bg = S.comp.layers.addSolid([1, 1, 1], "BG blush", 1920, 1080, 1, S.T);
    LOOK.ramp(bg, [960, 0], SAT.P.pink, [960, 1080], "#FFF4F6", "Gradient Ramp");
    SAT.rays(S, S.T);
    bg.moveToEnd();
    M = SAT.nul(S, "MASTER", [960, 540, 0]);
    ai = SAT.text(S, "AI", { name: "AI", x: -10, cy: 10, fs: 330, wt: 800, ls: -0.04, align: "center" });
    SAT.grad(ai, 330, "#A58BF5", "#FFFFFF"); SAT.hang(ai, M, 0);
    SAT.k(N3.xf(ai, "ADBE Scale"), 0.05, 0.6, [360, 360, 100], [100, 100, 100], SAT.OUT);
    sp = N3.icon(S.ctx, "sparkles", { name: "Sparkles", cx: 250, cy: -120, size: 110, color: "#8F78F2", sw: 2.4 });
    SAT.hang(sp, M, -10); SAT.pop(sp, 0.35, 0.4);
    a = SAT.tile(S, M, { name: "Tile invoice", x: -470, y: -230, z: -60, s: 190, c0: "#7C7CF0", c1: SAT.P.indigo, dark: SAT.P.indigoD, icon: "coin" });
    b = SAT.tile(S, M, { name: "Tile doc", x: 470, y: 230, z: -40, s: 190, c0: "#7FF0D4", c1: SAT.P.mintD, dark: "#1D8F6E", icon: "file" });
    SAT.k(N3.pos(a), 0.0, 0.55, [-1250, -650, -60], [-470, -230, -60], SAT.OUT); SAT.k(N3.pos(a), 0.55, 1.45, [-470, -230, -60], [-440, -250, -60], SAT.CALM);
    SAT.k(N3.pos(b), 0.0, 0.55, [1250, 650, -40], [470, 230, -40], SAT.OUT); SAT.k(N3.pos(b), 0.55, 1.45, [470, 230, -40], [440, 210, -40], SAT.CALM);
    SAT.k(N3.xf(a, "ADBE Orientation"), 0.0, 1.45, [20, -35, 40], [-14, 18, 27], SAT.OUT);
    SAT.k(N3.xf(b, "ADBE Orientation"), 0.0, 1.45, [-20, 35, -40], [12, -20, -25], SAT.OUT);
    SAT.whip(M, S.T, 0, -1400, 0.22);
    return S;
} });

// H2 "That [ ] Handles -> [x] Everything" (2.2 s): word roller swaps on the tick; slow push; zoom-through.
SAT.SCENES.push({ id: "H2", T: 2.2, build: function () {
    var S = SAT.scene("H2", "That handles everything", 2.2), M = SAT.nul(S, "MASTER", [960, 540, 0]), th, r, rl, words = [], i, txt;
    th = SAT.text(S, "That", { name: "That", x: -250, cy: 0, fs: 92, wt: 600, align: "right" }); SAT.hang(th, M, 0);
    SAT.checkbox(S, M, -180, 4, 74, 0.9);
    // roller: one column (Handles x4, Everything x5) in a precomp, masked with a soft vertical fade
    r = SAT.group(S, "Word roller", 760, 520, M, [250, 0, 0]); r.layer.threeDLayer = false;
    for (i = 0; i < 4; i++) { words.push("Handles"); }
    for (i = 0; i < 5; i++) { words.push("Everything"); }
    txt = SAT.text(r.S, words.join("\n"), { name: "Roller words", x: -360, top: -55, fs: 92, wt: 600, lh: 104 });
    // centre line = line 4 (Handles) at the start; the tick swaps it to line 6 (Everything)
    rl = N3.pos(txt); var p0 = rl.value, line = 104;
    SAT.k(rl, 0, 0.85, [p0[0], p0[1] - 3 * line + 30, p0[2]], [p0[0], p0[1] - 3 * line, p0[2]], SAT.CALM);
    SAT.k(rl, 0.95, 1.5, [p0[0], p0[1] - 3 * line, p0[2]], [p0[0], p0[1] - 6 * line, p0[2]], SAT.SNAP);
    SAT.k(rl, 1.5, 1.95, [p0[0], p0[1] - 6 * line, p0[2]], [p0[0], p0[1] - 6 * line - 20, p0[2]], SAT.CALM);
    N3.mask(r.layer, N3.rrShape(0, 70, 760, 380, 0), 0).property("ADBE Mask Feather").setValue([0, 170]);
    SAT.k(N3.xf(M, "ADBE Scale"), 0, 1.93, [100, 100, 100], [108, 108, 108], SAT.CALM);
    SAT.zoomThrough(M, S.T, 0.27);
    return S;
} });

// H3 "Type or Speak" (2.4 s): guide lines frame the headline, offset reveal, highlight bar, tiles flip in from edge-on.
SAT.SCENES.push({ id: "H3", T: 2.4, build: function () {
    var S = SAT.scene("H3", "Type or speak", 2.4), M = SAT.nul(S, "MASTER", [960, 540, 0]), h, bar, a, b;
    SAT.k(N3.xf(M, "ADBE Scale"), 0, 0.5, [150, 150, 150], [100, 100, 100], SAT.OUT);   // lands from the zoom-through
    SAT.guides(S, M, 0.0, { t: -95, b: 95, l: -520, r: 520 });
    bar = N3.box(S.ctx, { name: "Highlight bar", cx: 0, cy: 6, w: 980, h: 128, r: 14, fill: "#FFFFFF" });
    LOOK.gradient4(bar, 980, 128, [SAT.P.mint, "#C9F4E8", SAT.P.lav, "#D9CCFB"]); N3.xf(bar, "ADBE Opacity").setValue(55);
    SAT.hang(bar, M, 5); SAT.k(N3.xf(bar, "ADBE Scale"), 0.15, 0.7, [0, 100, 100], [100, 100, 100], SAT.OUT);
    h = SAT.text(S, "Type or Speak", { name: "Headline", x: 0, cy: 4, fs: 104, wt: 600, align: "center" });
    SAT.hang(h, M, 0); SAT.reveal(h, 0.1, 0.75, { dy: 40 });
    a = SAT.tile(S, M, { name: "Tile speak", x: -660, y: -300, z: -80, s: 170, c0: "#7C7CF0", c1: SAT.P.indigo, dark: SAT.P.indigoD, icon: "users" });
    b = SAT.tile(S, M, { name: "Tile type", x: 660, y: 290, z: -60, s: 170, c0: "#7FF0D4", c1: SAT.P.mintD, dark: "#1D8F6E", label: "Aa" });
    SAT.k(N3.xf(a, "ADBE Rotate Y"), 0.05, 0.75, 92, -14, SAT.OUT); SAT.k(N3.xf(a, "ADBE Rotate Z"), 0.05, 2.1, 30, 22, SAT.OUT);
    SAT.k(N3.xf(b, "ADBE Rotate Y"), 0.12, 0.82, -92, 16, SAT.OUT); SAT.k(N3.xf(b, "ADBE Rotate Z"), 0.12, 2.1, -30, -20, SAT.OUT);
    SAT.whip(M, S.T, -2200, 0, 0.2);
    return S;
} });

// E1 split text + pill -> card that builds and flips (7.5 s, calm).
SAT.SCENES.push({ id: "E1", T: 7.5, build: function () {
    var S = SAT.scene("E1", "Pill to card", 7.5), M = SAT.nul(S, "MASTER", [960, 540, 0]), C, pill, ic, ta, tb, i, l, rows, back, front = [], tf = 6.5,
        R = [["Payment terms", "Net 30"], ["Currency", "GBP"], ["Invoice", "INV-2048"], ["Amount", "\u00A31,905.00"]];
    SAT.k(N3.xf(M, "ADBE Scale"), 0, 6.1, [96, 96, 96], [104, 104, 104], SAT.CALM);
    C = SAT.nul(S, "CARD", [0, 0, 0], M);
    pill = SAT.glass(S, { name: "Pill / card", w: 150, h: 72, r: 36, fill: 40 }); SAT.hang(pill, C, 0); front.push(pill);
    SAT.pop(pill, 0.1, 0.5, 0.4);
    ic = N3.icon(S.ctx, "sparkles", { name: "Pill sparkles", cx: 0, cy: 0, size: 40, color: "#FFFFFF", sw: 2.4 }); SAT.hang(ic, C, -2);
    SAT.pop(ic, 0.25, 0.4); SAT.fade(ic, 2.3, 0.3, 100, 0);
    ta = SAT.text(S, "Tallyo", { name: "Word left", x: -110, cy: 0, fs: 78, wt: 600, align: "right" }); SAT.hang(ta, M, 2);
    tb = SAT.text(S, "Automatically", { name: "Word right", x: 110, cy: 0, fs: 78, wt: 600 }); SAT.hang(tb, M, 2);
    SAT.reveal(ta, 0.35, 1.1, { dx: 60, dy: 0, chars: true }); SAT.reveal(tb, 0.45, 1.2, { dx: -60, dy: 0, chars: true });
    SAT.k(N3.pos(ta), 2.3, 3.1, N3.pos(ta).value, [N3.pos(ta).value[0] - 420, 0, 2], SAT.CALM); SAT.fade(ta, 2.4, 0.5, 100, 0);
    SAT.k(N3.pos(tb), 2.3, 3.1, N3.pos(tb).value, [N3.pos(tb).value[0] + 420, 0, 2], SAT.CALM); SAT.fade(tb, 2.4, 0.5, 100, 0);
    // the pill becomes the vendor card
    SAT.k(SAT.rectSize(pill), 2.3, 3.4, [150, 72], [660, 430], SAT.SNAP);
    SAT.k(SAT.rectRound(pill), 2.3, 3.4, 36, 30, SAT.SNAP);
    // card content builds line by line (front side)
    l = N3.ellipse(S.ctx, { name: "Avatar", cx: -255, cy: -150, d: 64, fill: SAT.P.lav }); front.push(SAT.hang(l, C, -2)); SAT.pop(l, 3.3, 0.4);
    l = SAT.text(S, "Brightline Office Ltd", { name: "Vendor", x: -205, cy: -162, fs: 30, wt: 700, color: SAT.P.ink }); front.push(SAT.hang(l, C, -2)); SAT.reveal(l, 3.35, 3.9);
    l = SAT.text(S, "Office supplies \u00B7 verified vendor", { name: "Vendor sub", x: -205, cy: -128, fs: 18, wt: 500, color: SAT.P.soft }); front.push(SAT.hang(l, C, -2)); SAT.reveal(l, 3.5, 4.0);
    l = N3.box(S.ctx, { name: "Email chip", cx: -110, cy: -70, w: 330, h: 42, r: 21, fill: "#D5F6EC" }); front.push(SAT.hang(l, C, -2)); SAT.pop(l, 3.65, 0.4, 0.6);
    l = SAT.text(S, "invoices@brightline.co", { name: "Email", x: -110, cy: -70, fs: 18, wt: 600, color: SAT.P.teal, align: "center" }); front.push(SAT.hang(l, C, -3)); SAT.fade(l, 3.75, 0.3);
    for (i = 0; i < R.length; i++) {
        l = SAT.text(S, R[i][0], { name: "Row label " + (i + 1), x: -280, cy: -4 + i * 48, fs: 20, wt: 500, color: SAT.P.soft }); front.push(SAT.hang(l, C, -2)); SAT.reveal(l, 3.9 + i * 0.15, 4.4 + i * 0.15);
        l = SAT.text(S, R[i][1], { name: "Row value " + (i + 1), x: 280, cy: -4 + i * 48, fs: 20, wt: 600, color: SAT.P.ink, align: "right" }); front.push(SAT.hang(l, C, -2)); SAT.reveal(l, 3.95 + i * 0.15, 4.45 + i * 0.15);
    }
    LOOK.ccSweep(pill, { p0: [-520, 0], p1: [520, 0], t0: 5.0, t1: 6.0, color: "#FFFFFF", width: 160, intensity: 120 });
    // flip: the card turns 180 on Y; the front hides at the edge-on moment, the back (pre-turned 180) shows
    SAT.k(N3.xf(C, "ADBE Rotate Y"), tf - 0.35, tf + 0.35, 0, 180, SAT.SNAP);
    for (i = 0; i < front.length; i++) { N3.hold(N3.xf(front[i], "ADBE Opacity"), [tf - 0.02, tf], [100, 0]); }
    back = SAT.glass(S, { name: "Card back", w: 660, h: 430, r: 30, fill: 55 }); SAT.hang(back, C, 0);
    l = N3.icon(S.ctx, "circleCheck", { name: "Approved tick", cx: 0, cy: -30, size: 150, color: SAT.P.green, sw: 2.6 }); SAT.hang(l, C, -2);
    rows = SAT.text(S, "Approved", { name: "Approved", x: 0, cy: 110, fs: 40, wt: 700, color: SAT.P.ink, align: "center" }); SAT.hang(rows, C, -2);
    var B = [back, l, rows];
    for (i = 0; i < B.length; i++) { N3.xf(B[i], "ADBE Rotate Y").setValue(180); N3.hold(N3.xf(B[i], "ADBE Opacity"), [0, tf], [0, 100]); }
    SAT.zoomThrough(M, S.T, 0.3);
    return S;
} });

// E2 radial build (7.2 s, calm steps): a ring per step (emails -> PDFs -> data -> approval) orbits the hub while the
// master null zooms out a notch per step (the user's Grid Builder Radial + Null 3 scale steps).
SAT.SCENES.push({ id: "E2", T: 7.2, build: function () {
    var S = SAT.scene("E2", "Radial flow", 7.2), M = SAT.nul(S, "MASTER", [960, 560, 0]), hub, l, k, j, Rn, rad, t, ang, it, lab,
        RING = [["Emails", "file", 220], ["PDFs", "pdf", 330], ["Data", "chip", 440], ["Approval", "circleCheck", 550]], step = 1.7;
    SAT.k(N3.xf(M, "ADBE Scale"), 0, 0.6, [150, 150, 150], [118, 118, 118], SAT.OUT);
    for (k = 1; k < 4; k++) { SAT.k(N3.xf(M, "ADBE Scale"), k * step - 0.2, k * step + 0.45, [118 - (k - 1) * 13, 118 - (k - 1) * 13, 100], [118 - k * 13, 118 - k * 13, 100], SAT.SNAP); }
    hub = SAT.glass(S, { name: "Hub", w: 190, h: 190, r: 95, fill: 55 }); SAT.hang(hub, M, 0); SAT.pop(hub, 0.1, 0.5, 0.5);
    l = N3.ellipse(S.ctx, { name: "Hub logo", cx: 0, cy: -8, d: 70, stroke: "#FFFFFF", sw: 9 }); SAT.hang(l, M, -2);
    LOOK.ramp(l, [-35, -35], SAT.P.mintD, [35, 35], SAT.P.lavD, "Gradient Ramp"); SAT.pop(l, 0.25, 0.5);
    l = SAT.text(S, "Tallyo", { name: "Hub label", x: 0, cy: 58, fs: 24, wt: 700, color: SAT.P.ink, align: "center" }); SAT.hang(l, M, -2); SAT.fade(l, 0.4, 0.4);
    for (k = 0; k < RING.length; k++) {
        t = 0.3 + k * step; rad = RING[k][2];
        Rn = SAT.nul(S, "RING " + (k + 1), [0, 0, 0], M);
        l = N3.ellipse(S.ctx, { name: "Ring " + (k + 1), cx: 0, cy: 0, d: rad * 2, stroke: "#FFFFFF", sw: 2.5 }); N3.xf(l, "ADBE Opacity").setValue(55);
        SAT.hang(l, Rn, 4); SAT.k(N3.xf(l, "ADBE Scale"), t, t + 0.7, [60, 60, 100], [100, 100, 100], SAT.OUT); SAT.fade(l, t, 0.3, 0, 55);
        SAT.k(N3.xf(Rn, "ADBE Rotate Z"), t, t + 1.0, 45, 165, SAT.SNAP); SAT.k(N3.xf(Rn, "ADBE Rotate Z"), t + 1.0, S.T, 165, 165 + (S.T - t) * 6, [1, 1]);
        for (j = 0; j < 3; j++) {
            ang = (j * 120 - 90) * Math.PI / 180;
            it = SAT.glass(S, { name: RING[k][0] + " " + (j + 1), cx: rad * Math.cos(ang), cy: rad * Math.sin(ang), w: 92, h: 92, r: 22, fill: 70 }); SAT.hang(it, Rn, -2);
            l = N3.icon(S.ctx, RING[k][1], { name: RING[k][0] + " icon " + (j + 1), cx: rad * Math.cos(ang), cy: rad * Math.sin(ang), size: 44, color: k === 3 ? SAT.P.green : SAT.P.lavD, sw: 2.4 }); SAT.hang(l, Rn, -3);
            // stay upright while the ring turns
            SAT.k(N3.xf(it, "ADBE Rotate Z"), t, t + 1.0, -45, -165, SAT.SNAP); SAT.k(N3.xf(it, "ADBE Rotate Z"), t + 1.0, S.T, -165, -165 - (S.T - t) * 6, [1, 1]);
            SAT.k(N3.xf(l, "ADBE Rotate Z"), t, t + 1.0, -45, -165, SAT.SNAP); SAT.k(N3.xf(l, "ADBE Rotate Z"), t + 1.0, S.T, -165, -165 - (S.T - t) * 6, [1, 1]);
            SAT.pop(it, t + 0.2 + j * 0.08, 0.45, 0.3); SAT.pop(l, t + 0.25 + j * 0.08, 0.45, 0.3);
        }
        lab = SAT.label(S, M, RING[k][0], rad * 0.72 + 60, -rad * 0.72 - 10, k === 3 ? SAT.P.green : SAT.P.lavD);
        SAT.pop(lab[0], t + 0.5, 0.4, 0.5); SAT.fade(lab[1], t + 0.55, 0.3);
    }
    SAT.whip(M, S.T, 0, -1500, 0.22);
    return S;
} });

// E3 tilted invoice panel (6.0 s): the rig rises and un-tilts; rows cascade up from behind the panel (z +259.8 -> lifted,
// 0.1 s apart, as in the user's Invoice2-6); a 3D-tilted line of text (Orientation X 331) explains it.
SAT.SCENES.push({ id: "E3", T: 6.0, build: function () {
    var S = SAT.scene("E3", "Invoice panel", 6.0), M = SAT.nul(S, "MASTER", [960, 540, 0]), RIG, P, i, g, c, l, y, TXT, tx, first,
        V = [["Brightline Office Ltd", "INV-2048", "\u00A31,905.00", "Matched", "97%"], ["Northgate Logistics", "INV-2051", "\u00A3222.60", "Matched", "92%"],
            ["Harbor Print Co", "INV-2055", "\u00A3480.00", "Matched", "95%"], ["Cloudnest Hosting", "INV-2060", "\u00A31,250.00", "Review", "61%"], ["Fieldline Studio", "INV-2062", "\u00A3640.00", "Pending", "--"]];
    RIG = SAT.nul(S, "RIG panel", [0, 70, 0], M);
    SAT.k(N3.pos(RIG), 0.1, 1.3, [0, 330, 360], [0, 70, 0], SAT.OUT); SAT.k(N3.pos(RIG), 1.3, 5.7, [0, 70, 0], [0, 60, -40], SAT.CALM);
    SAT.k(N3.xf(RIG, "ADBE Rotate X"), 0.1, 1.4, 34, 18, SAT.OUT); SAT.k(N3.xf(RIG, "ADBE Rotate X"), 1.4, 5.7, 18, 14, SAT.CALM);
    P = SAT.group(S, "Panel", 1360, 760, RIG, [0, 0, 0]); c = P.S;
    l = N3.box(c.ctx, { name: "Panel", cx: 0, cy: 0, w: 1300, h: 720, r: 30, fill: "#FFFFFF", fillOpacity: 90 });
    LOOK.dropShadow(P.layer, "Soft shadow", { color: "#5B6FA8", opacity: 0.25, dist: 30, soft: 90 });
    N3.box(c.ctx, { name: "Sidebar", cx: -540, cy: 0, w: 200, h: 680, r: 20, fill: "#F2F0FB" });
    SAT.text(c, "Tallyo", { name: "Side brand", x: -610, cy: -300, fs: 24, wt: 700, color: SAT.P.lavD });
    SAT.text(c, "Invoices", { name: "Side item", x: -610, cy: -240, fs: 18, wt: 600, color: SAT.P.ink });
    SAT.text(c, "Approvals", { name: "Side item 2", x: -610, cy: -200, fs: 18, wt: 500, color: SAT.P.soft });
    SAT.text(c, "Invoices", { name: "Header", x: -400, cy: -300, fs: 34, wt: 700, color: SAT.P.ink });
    N3.box(c.ctx, { name: "Search", cx: 470, cy: -300, w: 260, h: 46, r: 23, fill: "#F2F0FB" });
    SAT.text(c, "Search invoices", { name: "Search text", x: 375, cy: -300, fs: 16, wt: 500, color: SAT.P.soft });
    for (i = 0; i < V.length; i++) {
        y = -180 + i * 106;
        g = SAT.group(S, "Invoice " + (i + 1), 1120, 100, RIG, [100, y, i === 0 ? -90 : -40]); c = g.S; if (i === 0) { first = g.layer; }
        l = N3.box(c.ctx, { name: "Row", cx: 0, cy: 0, w: 1090, h: 84, r: 18, fill: i === 0 ? "#DDF7EF" : "#FFFFFF" });
        if (i === 0) { LOOK.dropShadow(l, "Soft shadow", { color: SAT.P.teal, opacity: 0.22, dist: 10, soft: 30 }); }
        N3.ellipse(c.ctx, { name: "Avatar", cx: -490, cy: 0, d: 48, fill: [SAT.P.lav, SAT.P.mint, SAT.P.pink, SAT.P.yellow, SAT.P.lav][i] });
        SAT.text(c, V[i][0], { name: "Vendor", x: -450, cy: 0, fs: 21, wt: 700, color: SAT.P.ink });
        SAT.text(c, V[i][1], { name: "Invoice no", x: -110, cy: 0, fs: 18, wt: 500, color: SAT.P.soft });
        SAT.text(c, V[i][2], { name: "Amount", x: 170, cy: 0, fs: 21, wt: 700, color: SAT.P.ink, align: "right" });
        l = N3.chip(c.ctx, V[i][3], { name: "Status", x: 230, cy: 0, fs: 16, bg: V[i][3] === "Matched" ? "#C9F2E4" : (V[i][3] === "Review" ? "#FFF0C2" : "#EEEAF8"),
            color: V[i][3] === "Matched" ? SAT.P.teal : SAT.P.ink, padX: 14, padY: 6 });
        N3.chip(c.ctx, V[i][4], { name: "Score", x: 420, cy: 0, fs: 16, bg: "#F2F0FB", color: SAT.P.ink, padX: 14, padY: 6 });
        // cascade: from behind the panel (z + 259.8) to lifted, 0.1 s apart; lower rows softer
        var p = N3.pos(g.layer).value;
        SAT.k(N3.pos(g.layer), 1.0 + i * 0.1, 1.75 + i * 0.1, [p[0], p[1] + 20, p[2] + 259.8], p, SAT.OUT);
        SAT.k(N3.xf(g.layer, "ADBE Opacity"), 1.0 + i * 0.1, 1.35 + i * 0.1, 0, i < 3 ? 100 : (i === 3 ? 80 : 55), SAT.CALM);
    }
    LOOK.ccSweep(first, { p0: [-600, 0], p1: [600, 0], t0: 3.4, t1: 4.4, color: "#FFFFFF", width: 140, intensity: 90 });
    TXT = SAT.nul(S, "TEXT tilt", [0, -395, -220], M);
    N3.xf(TXT, "ADBE Orientation").setValue([331, 0, 0]);
    SAT.k(N3.pos(TXT), 2.0, 3.0, [0, -330, -220], [0, -395, -220], SAT.OUT);
    tx = SAT.text(S, "Confirming what was ordered was actually received", { name: "Explain line", x: 0, cy: 0, fs: 50, wt: 600, align: "center" });
    SAT.hang(tx, TXT, 0); SAT.reveal(tx, 2.0, 3.0);
    SAT.zoomThrough(M, S.T, 0.3);
    return S;
} });

// E4 end card (3.0 s): the logo lands, a light sweep crosses the wordmark, the line follows.
SAT.SCENES.push({ id: "E4", T: 3.0, build: function () {
    var S = SAT.scene("E4", "End card", 3.0), M = SAT.nul(S, "MASTER", [960, 540, 0]), r, gi, w, tg;
    SAT.k(N3.xf(M, "ADBE Scale"), 0, 0.6, [140, 140, 140], [100, 100, 100], SAT.OUT); SAT.k(N3.xf(M, "ADBE Scale"), 0.6, 3.0, [100, 100, 100], [104, 104, 104], SAT.CALM);
    r = N3.shapeLayer(S.comp, "Logo ring"); gi = N3.addGroup(r, "Ring");
    N3.addEllipse(r, gi, 130, 130); N3.addTrim(r, gi); N3.addStroke(r, gi, "#FFFFFF", 16, undefined, true);
    N3.pos(r).setValue([960 - 270, 540 - 40]); SAT.hang(r, M, 0);
    LOOK.ramp(r, [-65, -65], SAT.P.mintD, [65, 65], SAT.P.lavD, "Gradient Ramp");
    SAT.k(N3.gc(r, gi).property(2).property("ADBE Vector Trim End"), 0.05, 0.8, 0, 100, SAT.OUT);
    w = SAT.text(S, "Tallyo", { name: "Wordmark", x: -175, cy: -40, fs: 150, wt: 700, ls: -0.04 }); SAT.hang(w, M, 0);
    SAT.grad(w, 150, "#FFFFFF", "#E2D8FF"); SAT.reveal(w, 0.2, 0.8, { chars: true });
    LOOK.dropShadow(w, "Soft shadow", { color: "#6C5BB8", opacity: 0.35, dist: 8, soft: 40 });
    LOOK.ccSweep(w, { p0: [-150, -55], p1: [560, -55], t0: 1.0, t1: 2.0, color: "#FFFFFF", width: 150 });
    tg = SAT.text(S, "Invoices, handled.", { name: "Tagline", x: 0, cy: 95, fs: 46, wt: 500, align: "center" }); SAT.hang(tg, M, 0);
    SAT.reveal(tg, 0.9, 1.6); LOOK.dropShadow(tg, "Soft shadow", { color: "#6C5BB8", opacity: 0.3, dist: 4, soft: 24 });
    return S;
} });
