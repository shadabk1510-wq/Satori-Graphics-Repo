// mm_scenes_hook.jsx (v2): the hook, 0-31 s. A banger: bold slam type with the Muse branding in the first second,
// real press pages and photos, beats of 1.5-3 s, whips / zooms / hard cuts on the beat (never crossfades).
// tin = how this scene comes in (main gives the previous scene the matching exit).

// H1 "She took a design job for Meta"
MM.SCENES.push({ id: "H1", title: "Design job", cue: "She took a design job", hook: true, tin: { how: "cut" }, build: function (S) {
    var G, R, im;
    MM.bg(S, "coral");
    MM.push(S, 6);
    G = MM.rig(S, "Ghost M", S.M, [0, 0, 400], 0, "none");
    MM.muse(S, G, { name: "Ghost M", w: 2300, color: "#F7C9D0", sw: 230, draw: [0, 0.5], ease: [10, 70] });
    R = MM.rig(S, "Hische", S.M, [520, 190, 0], 0.25, "up", { d: 0.45, off: 700 });
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 760, h: 811, fit: "width" });
    LOOK.dropShadow(im, "Soft shadow", { color: "#5A1020", opacity: 0.35, dist: 24, soft: 60 });
    SAT.hang(im, R, 0);
    MM.slam(S, S.M, "she took a\ndesign job", { fs: 176, lh: 170, align: "left", x: -880, cy: -150, color: MM.C.ink, shake: 9 });
    MM.tag(S, S.M, "for Meta", -600, 240, { fs: 62, bg: MM.C.blue, t: S.at("for meta"), rot: -3 });
    MM.shake(S, S.at("for meta") + 0.05, 12);
} });

// H2 "the new Muse logo": straight into Muse's world, the M draws itself.
MM.SCENES.push({ id: "H2", title: "The new Muse logo", cue: "the new Muse logo", hook: true, tin: { how: "zoom" }, build: function (S) {
    var R = MM.rig(S, "Logo", S.M, [0, -90, 0], 0, "scale", { s0: 160, d: 0.5 });
    MM.bg(S, "muse");
    MM.push(S, 5);
    MM.muse(S, R, { name: "Muse M", w: 1050, draw: [0.02, 0.6], ease: [15, 80] });
    MM.slam(S, S.M, "the new muse logo", { fs: 120, cy: 380, shake: 8 });
} });

// H3 "but she didn't probably expect the kind of": WIRED's own line, underlined as the VO says it.
MM.SCENES.push({ id: "H3", title: "Didn't expect", cue: "but she didnt probably expect", hook: true, tin: { how: "whip", dir: "right" }, build: function (S) {
    var W = MM.PAGES.wired, pg;
    MM.bg(S, "dark");
    pg = MM.page(S, S.M, W.img, W.size, { name: "WIRED page", w: 2300, t: 0, from: "none", tilt: [6, -8, 0] });
    MM.focus(pg, 0, 0, 800, 1820, 1.05);
    MM.focus(pg, 0, S.E, 795, 1880, 1.35, [20, 60]);
    MM.hl(pg, [W.dek], S.at("she didnt") - 0.05, S.at("expect") + 0.3, null, "under");
    MM.tag(S, S.M, "WIRED", -790, -420, { fs: 34, t: 0.1 });
} });

// H3b "public reaction of anger escalating to people": the reactions the press reported, piling up.
MM.SCENES.push({ id: "H3b", title: "Anger escalating", cue: "public reaction of anger", hook: true, tin: { how: "cut" }, build: function (S) {
    var R = [["Disgusted.", -480, -300, -4], ["selling out", 430, -190, 5], ["massively disappointing", -260, 60, -2], ["it's about ethics", 470, 250, 4]], i, t;
    MM.bg(S, "coral");
    MM.push(S, 8);
    t = [S.at("public"), S.at("reaction"), S.at("anger"), S.at("escalating")];
    for (i = 0; i < R.length; i++) { MM.react(S, S.M, R[i][0], R[i][1], R[i][2], { t: t[i], rot: R[i][3], fs: 46 }); MM.shake(S, t[i] + 0.03, 8); }
    MM.burst(S, S.M, S.at("escalating") + 0.15, 10, { cx: 0, cy: 0, r0: 300, r1: 340, s: 110, gap: 0.12, accel: 0.85, seed: 4, z0: 60 });
} });

// H4 "posting photographs of her house online": prints slam onto the desk, then get redacted.
MM.SCENES.push({ id: "H4", title: "Photographs", cue: "posting photographs", hook: true, tin: { how: "whip", dir: "up" }, build: function (S) {
    var tb = S.at("online"), a, b, c;
    MM.bg(S, "paper");
    MM.push(S, 7);
    a = MM.polaroid(S, S.M, -520, -10, -8, 0.0, tb); MM.shake(S, 0.04, 10);
    b = MM.polaroid(S, S.M, 0, -50, 4, S.at("photographs"), tb + 0.08); MM.shake(S, S.at("photographs") + 0.04, 10);
    c = MM.polaroid(S, S.M, 520, 0, 9, S.at("house"), tb + 0.16); MM.shake(S, S.at("house") + 0.04, 10);
    MM.tape(S, a, 0, -180, 160, 6, -5); MM.tape(S, b, 0, -180, 160, -4, -5); MM.tape(S, c, 0, -180, 160, 5, -5);
    MM.ring(S, S.M, 0, -50, 230, 240, S.at("house") + 0.1, { sw: 9 });
    MM.tag(S, S.M, "her house", 0, 330, { fs: 48, bg: MM.C.alarm, t: S.at("house") + 0.2, rot: -2 });
} });

// H5 "Yeah, people actually went there."
MM.SCENES.push({ id: "H5", title: "Went there", cue: "Yeah people actually went there", hook: true, tin: { how: "cut" }, build: function (S) {
    MM.bg(S, "dark");
    MM.push(S, 6);
    MM.slam(S, S.M, "yeah, people actually", { fs: 80, cy: -200, color: "#F4B8C0", s0: 140 });
    MM.slam(S, S.M, "went there.", { fs: 330, cy: 70, color: MM.C.coral, shake: 16 });
} });

// H6 "According to Wired, Jessica Hische faced personal attacks after sharing her work on the"
MM.SCENES.push({ id: "H6", title: "According to WIRED", cue: "According to Wired", hook: true, tin: { how: "zoom" }, build: function (S) {
    var W = MM.PAGES.wired, pg;
    MM.bg(S, "paper");
    pg = MM.page(S, S.M, W.img, W.size, { name: "WIRED page", w: 1900, t: 0, from: "up", off: 300, tilt: [10, -14, 2] });
    MM.focus(pg, 0, 0, 1280, 1500, 0.62);
    MM.focus(pg, 0.3, 1.6, 640, 1660, 1.0);
    MM.focus(pg, S.at("faced") - 0.3, S.E, 700, 1712, 1.18, [40, 70]);
    MM.hl(pg, [W.hate], S.at("personal") - 0.05, S.at("attacks") + 0.35, null, "under");
    MM.ring(S, pg.L, W.hate[0] + W.hate[2] / 2, W.hate[1] + W.hate[3] / 2, W.hate[2] * 0.62, W.hate[3] * 1.1, S.at("attacks") + 0.2, { sw: 10 });
    MM.tag(S, S.M, "WIRED \u00B7 Oct 8, 2026", -650, -420, { fs: 30, t: 0.2 });
    MM.face(S, S.M, -610, 300, { d: 230, t: S.at("jessica") - 0.1, name: "Jessica Hische", role: "lettering artist" });
} });

// H7 "identity for Meta's new personal AI agent, Muse."
MM.SCENES.push({ id: "H7", title: "Personal AI agent", cue: "identity for Metas new", hook: true, tin: { how: "push", dir: "right" }, build: function (S) {
    MM.bg(S, "muse");
    MM.push(S, 5);
    MM.browser(S, S.M, "web/museai_page.png", { name: "muse.ai", w: 1280, h: 800, url: "muse.ai", x: 180, y: -20, t: 0.05, from: "tiltR", d: 0.6 });
    MM.tag(S, S.M, "personal AI agent", -560, -120, { fs: 46, bg: MM.C.blue, t: S.at("personal") - 0.05, rot: -2 });
    MM.photo(S, S.M, "web/museai_og.jpg", { name: "Muse mascot", w: 560, h: 294, x: -520, y: 250, z: -40, t: S.at("muse") - 0.15, from: "scale", s0: 1, border: 12, rot: -4, tape: true });
} });

// H8 "But why were some designers so, so very angry?"
MM.SCENES.push({ id: "H8", title: "So angry", cue: "But why were some designers", hook: true, tin: { how: "whip", dir: "left" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 6, S.E - 0.3);
    MM.slam(S, S.M, "but why were some designers", { fs: 92, cy: -250, color: "#FFFFFF", s0: 140 });
    MM.slam(S, S.M, "so, so very angry?", { fs: 200, cy: 40, color: MM.C.ink, shake: 12 });
    var B = [[-760, -380, -14], [790, -350, 10], [-820, 300, 8], [820, 330, -9], [-520, 420, 4], [560, 430, -5], [0, 440, 6]], i, tb = S.at("so") + 0.05;
    for (i = 0; i < B.length; i++) { MM.bubble(S, S.M, B[i][0], B[i][1], 120, tb + i * 0.13, { rot: B[i][2], z: -10 }); }
} });
