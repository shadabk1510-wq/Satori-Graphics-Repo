// mm_scenes_hook.jsx: the hook (0-31 s). Fast: 2-5 s beats, whips and zoom-throughs with motion blur on the MASTER
// null, hard cuts hidden inside the motion. Every word-led visual lands on its VO word.

// H1 "She took a design job for Meta"
MM.SCENES.push({ id: "H1", title: "Design job", cue: "She took a design job", hook: true, build: function (S) {
    var R, im;
    MM.push(S, 5, S.E - 0.25);
    R = MM.rig(S, "Hische", S.M, [500, 150, 0], 0, "right", { d: 0.7 });
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 700, h: 747, fit: "width" });
    LOOK.dropShadow(im, "Soft shadow", { color: MM.C.glassTint, opacity: 0.22, dist: 24, soft: 60 });
    SAT.hang(im, R, 0);
    MM.say(S, S.M, "she took a\ndesign job", { sty: "head", fs: 168, lh: 168, align: "left", x: -860, cy: -90 });
    MM.pill(S, S.M, "for Meta", -560, 210, { bg: MM.C.blue, fs: 52, t: S.at("for meta") });
    SAT.whip(S.M, S.E, -2600, 0, 0.22);
} });

// H2 "the new Muse logo": the M draws itself, huge.
MM.SCENES.push({ id: "H2", title: "The new Muse logo", cue: "the new Muse logo", hook: true, build: function (S) {
    var R = MM.rig(S, "Logo", S.M, [0, -60, 0], 0, "scale", { s0: 140, d: 0.6 });
    MM.muse(S, R, { name: "Muse M", w: 980, draw: [0.05, 0.85] });
    MM.say(S, S.M, "meta muse", { sty: "big", fs: 110, cy: 380, times: [S.at("muse") - 0.25, S.at("muse")] });
    SAT.whip(S.M, S.E, 0, -1500, 0.22);
} });

// H3 "but she didn't probably expect ... public reaction of anger escalating": the thumbnail layout, bubbles burst.
MM.SCENES.push({ id: "H3", title: "Public reaction", cue: "but she didnt probably expect", hook: true, build: function (S) {
    var L, R, im;
    MM.push(S, 6, S.E - 0.3);
    L = MM.rig(S, "Logo small", S.M, [-520, 170, 0], 0, "up", { d: 0.6 });
    MM.muse(S, L, { name: "Muse M", w: 600 });
    R = MM.rig(S, "Hische", S.M, [520, 190, 0], 0, "up", { d: 0.7, off: 300 });
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 640, h: 683, fit: "width" });
    SAT.hang(im, R, 0);
    MM.say(S, S.M, "she didn't expect\nthe reaction", { sty: "head", fs: 130, lh: 132, align: "left", x: -880, cy: -300 });
    MM.burst(S, S.M, S.at("anger"), 12, { cx: 330, cy: 60, r0: 200, r1: 220, s: 120, gap: 0.16, accel: 0.88, z0: 90 });   // behind her
    SAT.zoomThrough(S.M, S.E, 0.25);
} });

// H4 "posting photographs of her house online": three prints slam in and get redacted.
MM.SCENES.push({ id: "H4", title: "Photographs", cue: "posting photographs", hook: true, build: function (S) {
    var t1 = S.at("posting"), t2 = S.at("photographs"), t3 = S.at("house"), tb = S.at("online");
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0, 0.4, [140, 140, 140], [100, 100, 100], SAT.OUT);
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0.4, S.E - 0.25, [100, 100, 100], [94, 94, 94], SAT.DRIFT);   // landed by scaling down: keeps going
    MM.polaroid(S, S.M, -540, -40, -8, Math.max(0, t1 - 0.05), tb);
    MM.polaroid(S, S.M, 0, -70, 4, t2, tb + 0.08);
    MM.polaroid(S, S.M, 540, -30, 9, t3, tb + 0.16);
    MM.say(S, S.M, "of her house online", { sty: "mid", fs: 76, cy: 330 });
    SAT.whip(S.M, S.E, -2600, 0, 0.2);
} });

// H5 "Yeah, people actually went there."
MM.SCENES.push({ id: "H5", title: "Went there", cue: "Yeah people actually went there", hook: true, build: function (S) {
    var R = MM.rig(S, "Words", S.M, [0, 0, 0], 0, "right", { d: 0.5 });
    MM.push(S, 6, S.E - 0.3);
    MM.say(S, R, "yeah, people actually", { sty: "mid", fs: 80, cy: -190, color: MM.C.soft });
    MM.say(S, R, "went there.", { sty: "head", fs: 280, cy: 60, color: MM.C.coral });
    SAT.zoomThrough(S.M, S.E, 0.27);
} });

// H6 "According to Wired, Jessica Hische faced personal attacks after sharing her work"
MM.SCENES.push({ id: "H6", title: "According to WIRED", cue: "According to Wired", hook: true, build: function (S) {
    var C;
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0, 0.45, [150, 150, 150], [100, 100, 100], SAT.OUT);   // lands from the zoom-through
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0.45, S.E - 0.25, [100, 100, 100], [96, 96, 96], SAT.DRIFT);
    C = MM.card(S, S.M, "sourced/wired_headline.png", { name: "WIRED article", w: 1240, h: 537, r: 16, x: 0, y: -110, t: 0.05, from: "tiltR" });
    MM.pill(S, S.M, "Jessica Hische", -400, 290, { bg: MM.C.ink, fs: 46, t: S.at("jessica") });
    MM.say(S, S.M, "faced personal attacks", { sty: "big", fs: 92, cy: 410, x: 0, color: MM.C.coral });
    MM.pill(S, S.M, "via WIRED", 470, 290, { bg: "#FFFFFF", color: MM.C.ink, fs: 34, t: 0.6 });
    SAT.whip(S.M, S.E, -2600, 0, 0.22);
} });

// H7 "identity for Meta's new personal AI agent, Muse."
MM.SCENES.push({ id: "H7", title: "Personal AI agent", cue: "identity for Metas new", hook: true, build: function (S) {
    MM.push(S, 5, S.E - 0.3);
    MM.card(S, S.M, "sourced/sfc_muse.jpg", { name: "Muse UI", w: 980, h: 655, r: 18, x: 300, y: 0, t: 0, from: "right", d: 0.6 });
    MM.say(S, S.M, "the identity\nfor Meta's new", { sty: "mid", fs: 70, lh: 82, align: "left", x: -880, cy: -200 });
    MM.pill(S, S.M, "personal AI agent", -600, 40, { bg: MM.C.blue, fs: 44, t: S.at("personal") });
    MM.pill(S, S.M, "Muse", -730, 170, { bg: MM.C.ink, fs: 44, t: S.at("muse") });
    SAT.zoomThrough(S.M, S.E, 0.27);
} });

// H8 "But why were some designers so, so very angry?"
MM.SCENES.push({ id: "H8", title: "So angry", cue: "But why were some designers", hook: true, build: function (S) {
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0, 0.45, [150, 150, 150], [100, 100, 100], SAT.OUT);
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0.45, S.E - 0.28, [100, 100, 100], [95, 95, 95], SAT.DRIFT);
    MM.say(S, S.M, "but why were some designers", { sty: "mid", fs: 72, cy: -230, color: MM.C.soft });
    MM.say(S, S.M, "so, so very angry?", { sty: "head", fs: 176, cy: 10 });
    MM.burst(S, S.M, S.at("so") + 0.1, 9, { cx: 0, cy: 60, r0: 360, r1: 160, s: 110, gap: 0.2, accel: 0.9, seed: 11, z0: 120 });   // behind the type
    SAT.zoomThrough(S.M, S.E, 0.3);
} });
