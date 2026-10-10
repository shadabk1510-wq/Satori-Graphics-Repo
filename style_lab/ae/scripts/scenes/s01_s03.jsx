// Scenes 01-03: hook, the noise field, the logo reveal.

// 01 Hook (9.8 s): "Work got louder." -> three glowing noise pills -> "And it's getting harder to think."
LAB.SCENES.push({ id: "01", T: 9.8, build: function () {
    var S = LAB.scene("01", "Hook", 9.8, { from: { pos: [960, 540, -3000], poi: [960, 540, 0] }, to: { pos: [960, 520, -2600], poi: [960, 540, 0] } }), g, M = S.comp.name;
    LAB.headline(S, "Work got louder.", { top: -90, fs: 118, t: 0.6, stagger: 0.18, z: -100, tout: 4.0 });
    g = LAB.group(S, "Noise", 1500, 520, { z: 0 });
    LAB.pill(g.ctx, "47 unread", { name: "Pill unread", cx: -430, cy: -60, fs: 40, bg: LAB.P.pink, t: 4.6, main: M });
    LAB.pill(g.ctx, "9 meetings today", { name: "Pill meetings", cx: 0, cy: 50, fs: 40, bg: LAB.P.violet, t: 5.1, main: M });
    LAB.pill(g.ctx, "23 open tabs", { name: "Pill tabs", cx: 450, cy: -40, fs: 40, bg: "#2A9FC4", t: 5.6, main: M });
    LAB.headline(S, "And it's getting harder to think.", { top: 190, fs: 44, wt: 500, t: 6.6, stagger: 0.09, to: LAB.P.mute, z: -100 });
    return S;
} });

// 02 Noise field (12.8 s): fourteen notifications float in depth while the camera flies through them.
LAB.SCENES.push({ id: "02", T: 12.8, build: function () {
    var S = LAB.scene("02", "Noise field", 12.8, { from: { pos: [960, 560, -3400], poi: [960, 540, 0] }, to: { pos: [1010, 520, -1500], poi: [1010, 540, 700] } }),
        N = [["Design review moved", "#product \u00B7 2 min ago", "clock", LAB.P.violet], ["New comment on Q3 plan", "Docs \u00B7 just now", "file", LAB.P.cyan],
            ["Reminder: stand-up", "Calendar \u00B7 in 5 min", "clock", LAB.P.pink], ["3 files shared with you", "Drive \u00B7 4 min ago", "folder", LAB.P.violet],
            ["Can you take a look?", "Maya \u00B7 1 min ago", "users", LAB.P.cyan], ["Sprint goals updated", "Board \u00B7 6 min ago", "target", LAB.P.pink],
            ["Meeting in 5 minutes", "Calendar \u00B7 now", "clock", LAB.P.violet], ["Budget sheet edited", "Sheets \u00B7 3 min ago", "coin", LAB.P.cyan],
            ["New task assigned", "Board \u00B7 just now", "checklist", LAB.P.pink], ["Feedback needed today", "Jo \u00B7 8 min ago", "pencil", LAB.P.violet],
            ["Calendar conflict", "Calendar \u00B7 12 min ago", "clock", LAB.P.pink], ["Draft ready for review", "Docs \u00B7 9 min ago", "file", LAB.P.cyan],
            ["Weekly report is due", "Reports \u00B7 1 h ago", "brief", LAB.P.violet], ["5 new mentions", "#general \u00B7 now", "bolt", LAB.P.cyan]],
        XYZ = [[-620, -300, 200], [520, -340, 500], [-220, 140, -300], [700, 120, 900], [-760, 260, 700], [260, -60, 100], [-420, -40, 1100],
            [120, 330, 600], [640, -200, -200], [-120, -330, 1300], [880, 360, 300], [-860, -120, -100], [380, 200, 1400], [-500, 380, 1500]],
        i, g, n, M = S.comp.name, h;
    for (i = 0; i < N.length; i++) {
        n = N[i];
        g = LAB.group(S, "Notification " + (i + 1), 480, 130, { x: XYZ[i][0], y: XYZ[i][1], z: XYZ[i][2], ry: (i % 2 ? 6 : -6) });
        LAB.panel(g.ctx, { name: "Card", w: 450, h: 100, r: 24, main: M });
        LAB.tile(g.ctx, { name: "App", cx: -170, cy: 0, s: 58, icon: n[2], c0: n[3], c1: "#3B2FA8", main: M });
        LAB.text(g.ctx, n[0], { name: "Title", x: -125, top: -30, fs: 21, wt: 600 });
        LAB.text(g.ctx, n[1], { name: "Meta", x: -125, top: 2, fs: 16, color: LAB.P.mute });
        N3.ellipse(g.ctx, { name: "Badge", cx: 196, cy: -26, d: 12, fill: LAB.P.pink });
        LAB.enter(g.layer, 0.3 + i * 0.3, { dz: 500, dy: 40, ry: i % 2 ? 20 : -20 });
        LAB.shadow(g.layer);
    }
    h = LAB.headline(S, "Everything, everywhere, all at once.", { top: 330, fs: 60, t: 6.4, stagger: 0.12, flat: true });
    LOOK.dropShadow(h, "Readability", { color: LAB.P.deep, opacity: 0.8, dist: 0, soft: 40 });
    return S;
} });

// 03 Reveal (10.8 s): the ring draws, the wordmark rises, a light sweep crosses it, tagline.
LAB.SCENES.push({ id: "03", T: 10.8, build: function () {
    var S = LAB.scene("03", "Reveal", 10.8, { from: { pos: [960, 540, -2950], poi: [960, 540, 0] }, to: { pos: [960, 530, -2500], poi: [960, 540, 0] } }),
        g = LAB.group(S, "Logo", 1500, 420, { z: 0 }), M = S.comp.name, lg, mt, band;
    lg = LAB.logo(g.ctx, { cx: -250, cy: 0, d: 150, fs: 150, t: 0.6, main: M });
    // light sweep across the wordmark: a blurred band matted to a copy of the wordmark
    mt = LAB.text(g.ctx, "aurelo", { name: "Wordmark sweep matte", x: -250 + 150 * 0.75, cy: 0, fs: 150, wt: 700, ls: -0.04 });
    band = N3.box(g.ctx, { name: "Wordmark sweep", cx: -200, cy: 0, w: 90, h: 360, fill: "#FFFFFF" });
    N3.xf(band, "ADBE Rotate Z").setValue(20); LOOK.boxBlur(band, 26, "Sweep softness"); band.blendingMode = BlendingMode.ADD;
    N3.xf(band, "ADBE Opacity").setValue(80);
    LOOK.key(N3.pos(band), 2.8, 4.0, N3.P(g.ctx, -220, 0), N3.P(g.ctx, 520, 0), LOOK.CALM);
    mt.moveBefore(band); AEL.trackMatte(band, mt, TrackMatteType.ALPHA);
    LAB.headline(S, "One calm workspace for your team.", { top: 150, fs: 42, wt: 500, t: 3.4, stagger: 0.1, to: LAB.P.mute, z: -100 });
    return S;
} });
