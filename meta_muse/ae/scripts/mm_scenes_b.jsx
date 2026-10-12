// mm_scenes_b.jsx: chapter 2, "why take the gig?" (135-190 s) and chapter 3, "another response" (190-231 s). Calm.

// Social-post card used in chapter 3: avatar, name lines, the M as the post image. Returns the group null.
MM.post = function (S, parent, x, y, t, from) {
    var n = MM.panel(S, parent, { name: "Post", x: x, y: y, w: 620, h: 560, r: 30, fill: 96, t: t, from: from || "up" }).n, l, i;
    l = N3.ellipse(S.ctx, { name: "Post avatar", cx: -230, cy: -210, d: 64, fill: MM.C.lav }); SAT.hang(l, n, -1);
    l = N3.box(S.ctx, { name: "Post name", cx: -90, cy: -222, w: 200, h: 18, r: 9, fill: MM.C.ink }); SAT.hang(l, n, -1);
    l = N3.box(S.ctx, { name: "Post handle", cx: -120, cy: -192, w: 140, h: 14, r: 7, fill: MM.C.lav }); SAT.hang(l, n, -1);
    l = N3.box(S.ctx, { name: "Post image", cx: 0, cy: 30, w: 540, h: 300, r: 18, fill: MM.C.lavL }); SAT.hang(l, n, -1);
    MM.muse(S, n, { name: "Post M", w: 330, y: 30, z: -2 });
    for (i = 0; i < 3; i++) { l = N3.ellipse(S.ctx, { name: "Post action " + (i + 1), cx: -230 + i * 70, cy: 230, d: 30, stroke: MM.C.soft, sw: 3 }); SAT.hang(l, n, -1); }
    return n;
};

// F01 "So why does she even take the gig?"
MM.SCENES.push({ id: "F01", title: "Chapter: why take the gig", cue: "So why does she even take the gig", build: function (S) {
    MM.push(S, 4);
    MM.chapter(S, "02", "why take the gig?");
} });

// F02 "Because even she herself said she knew it probably would upset a few people."
MM.SCENES.push({ id: "F02", title: "She knew", cue: "Because even she herself said", build: function (S) {
    MM.push(S, 3);
    MM.quote(S, S.M, "she knew it probably\nwould upset a few people", { who: "JESSICA HISCHE, VIA WIRED", t: 0.05, y: 0, w: 1160, fs: 66 });
} });

// F03 "Hische told Wired that her client work had slowed down recently and that income helped support her shops and pay her staff."
MM.SCENES.push({ id: "F03", title: "Client work slowed", cue: "Well Hish told Wired", build: function (S) {
    var C = MM.panel(S, S.M, { name: "Client work chart", x: -380, y: 60, w: 760, h: 480, t: 0.05, from: "left" }).n, ln, i, g;
    for (i = 0; i < 4; i++) { g = N3.box(S.ctx, { name: "Chart grid " + (i + 1), cx: 0, cy: -150 + i * 90, w: 620, h: 2, fill: MM.C.lavL }); SAT.hang(g, C, -1); }
    ln = N3.path(S.ctx, { name: "Client work line", verts: [[-300, -150], [-170, -120], [-60, -160], [50, -60], [170, 20], [300, 140]], stroke: MM.C.coral, sw: 10, trim: true });
    SAT.hang(ln, C, -2);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), S.at("slowed") - 0.5, S.at("recently") + 0.3, 0, 100, SAT.CALM);
    SAT.hang(SAT.text(S, "client work", { name: "Chart label", x: -300, cy: 200, fs: 34, wt: 800, color: MM.C.ink }), C, -2);
    MM.say(S, S.M, "her client work had slowed down", { sty: "mid", fs: 70, cy: -400, after: S.at("her client") - 0.3 });
    MM.tile(S, S.M, "shop", 330, -10, { s: 190, color: MM.C.ink, t: S.at("shops") - 0.2 });
    MM.tile(S, S.M, "group", 580, -10, { s: 190, color: MM.C.ink, t: S.at("staff") - 0.2 });
    MM.say(S, S.M, "her shops", { sty: "cap", fs: 40, wt: 800, cy: 150, x: 330, times: [S.at("shops")] });
    MM.say(S, S.M, "her staff", { sty: "cap", fs: 40, wt: 800, cy: 150, x: 580, times: [S.at("staff")] });
    MM.push(S, 3);
} });

// F04 "She says that she charged $12,500 for the two-day sprint on the M logo, with another two weeks spent on the logotype."
MM.SCENES.push({ id: "F04", title: "The fee", cue: "She says that she charged", build: function (S) {
    var t0 = S.at("$12500"), R = MM.rig(S, "Fee", S.M, [0, -80, 0], t0 - 0.3, "scale", { s0: 60 });
    MM.push(S, 3);
    MM.say(S, S.M, "she charged", { sty: "cap", fs: 56, cy: -330, color: MM.C.soft });
    MM.counter(S, R, 0, 12500, t0 - 0.1, t0 + 1.3, { name: "Fee counter", prefix: "$", fs: 230, cy: 0, color: MM.C.coral });
    MM.pill(S, S.M, "2-day sprint: the M", -300, 250, { bg: MM.C.ink, fs: 40, t: S.at("twoday") - 0.1 });
    MM.pill(S, S.M, "+ 2 weeks: the logotype", 330, 250, { bg: "#FFFFFF", color: MM.C.ink, fs: 40, t: S.at("another two weeks") });
} });

// F05 "Now you can see why the offer would be attractive ... But her critics were questioning whether she should have accepted the work at all"
MM.SCENES.push({ id: "F05", title: "Should she accept", cue: "Now you can see why the offer", build: function (S) {
    var tc = S.at("critics"), F = MM.rig(S, "Offer", S.M, [0, -40, 0], 0, "up", { off: 160 }), b, m;
    MM.push(S, 3);
    b = N3.box(S.ctx, { name: "Offer card", cx: 0, cy: 0, w: 560, h: 300, r: 30, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.22, dist: 24, soft: 70 });
    SAT.hang(b, F, 0);
    SAT.hang(SAT.text(S, "the offer", { name: "Offer label", x: 0, cy: -80, fs: 34, wt: 700, color: MM.C.soft, align: "center" }), F, -1);
    SAT.hang(SAT.text(S, "$12,500", { name: "Offer amount", x: 0, cy: 20, fs: 110, wt: 900, color: MM.C.ink, align: "center", ls: -0.03 }), F, -1);
    LOOK.ccSweep(b, { p0: [-400, 0], p1: [400, 0], t0: S.at("attractive") - 0.2, t1: S.at("attractive") + 0.8, color: "#FFFFFF", width: 140, intensity: 80 });
    MM.fadeOut(MM.say(S, S.M, "attractive, of course", { sty: "mid", fs: 64, cy: 230, color: MM.C.coral, after: S.at("attractive") - 0.3 }), tc - 0.3, 0.3);
    MM.away(F, tc - 0.2, "up", 0.6);
    MM.say(S, S.M, "but should she have\naccepted the work at all?", { sty: "big", fs: 104, lh: 116, cy: -60, after: tc - 0.4, times: null });
    MM.bubble(S, S.M, 700, -260, 120, tc + 0.4, { glyph: "?", rot: 8, z: -20 });
    MM.bubble(S, S.M, -720, 160, 100, tc + 1.0, { glyph: "?", rot: -10, z: -20 });
    MM.bubble(S, S.M, 640, 240, 90, S.at("at all"), { glyph: "?", rot: 4, z: -20 });
} });

// F06 "The money explains the practical appeal of the job, obviously, but it did not settle the objection of people online."
MM.SCENES.push({ id: "F06", title: "Appeal vs objection", cue: "The money explains the practical appeal", build: function (S) {
    var A, B;
    MM.push(S, 3);
    MM.say(S, S.M, "the money explains...", { sty: "mid", fs: 72, cy: -380, times: [S.at("money") - 0.3, S.at("money"), S.at("explains")] });
    A = MM.panel(S, S.M, { name: "Practical appeal", x: -380, y: 40, w: 620, h: 400, t: S.at("practical") - 0.4, from: "left" }).n;
    MM.tile(S, A, "check", 0, -60, { s: 150, color: MM.C.coral, t: S.at("appeal") });
    SAT.hang(SAT.text(S, "the practical appeal", { name: "Label appeal", x: 0, cy: 110, fs: 40, wt: 800, color: MM.C.ink, align: "center" }), A, -2);
    B = MM.panel(S, S.M, { name: "The objection", x: 380, y: 40, w: 620, h: 400, t: S.at("settle") - 0.4, from: "right" }).n;
    MM.tile(S, B, "x", 0, -60, { s: 150, color: MM.C.alarm, t: S.at("objection") });
    SAT.hang(SAT.text(S, "not the objection", { name: "Label objection", x: 0, cy: 110, fs: 40, wt: 800, color: MM.C.alarm, align: "center" }), B, -2);
} });

// F07 "In response, Jessica argued that Meta hiring an independent artist was something to welcome in this new modern era of AI graphic design."
MM.SCENES.push({ id: "F07", title: "Something to welcome", cue: "In response Jessica argued", build: function (S) {
    MM.push(S, 3);
    MM.quote(S, S.M, "Meta hiring an independent artist\nwas something to welcome", { who: "JESSICA HISCHE, VIA WIRED", t: 0.05, y: -40, w: 1300, fs: 64, after: S.at("meta") - 0.3 });
    MM.pill(S, S.M, "in the new era of AI design", 0, 300, { bg: MM.C.coral, fs: 38, t: S.at("modern") - 0.2 });
} });

// G01 "But there was another response that she described to Wired."
MM.SCENES.push({ id: "G01", title: "Chapter: another response", cue: "But there was another response", build: function (S) {
    MM.push(S, 4);
    MM.chapter(S, "03", "another response", { fs: 140 });
} });

// G02 "Some people were willing to accept her taking the work, provided she didn't talk about it publicly, which is a weird stipulation from strangers"
MM.SCENES.push({ id: "G02", title: "Don't talk about it", cue: "Some people were willing to accept", build: function (S) {
    var P = MM.post(S, S.M, -360, 30, 0.05, "left"), bar, tp = S.at("publicly");
    bar = N3.box(S.ctx, { name: "Hush bar", cx: 0, cy: 30, w: 580, h: 320, r: 18, fill: MM.C.ink });
    N3.xf(bar, "ADBE Anchor Point").setValue([-290, 0]); N3.pos(bar).setValue([960 - 290, 540 + 30]);
    SAT.hang(bar, P, -6);
    SAT.k(N3.xf(bar, "ADBE Scale"), tp - 0.1, tp + 0.4, [0, 100, 100], [100, 100, 100], SAT.OUT);
    MM.tile(S, P, "mute", 0, 30, { s: 130, color: MM.C.ink, t: tp + 0.15, z: -8 });
    MM.say(S, S.M, "accept the work...", { sty: "cap", fs: 52, cy: -260, x: 140, align: "left", color: MM.C.soft, times: [S.at("accept"), S.at("taking"), S.at("work")] });
    MM.say(S, S.M, "provided she\ndidn't talk\nabout it publicly", { sty: "big", fs: 92, lh: 100, cy: -130, x: 140, align: "left", after: S.at("provided") - 0.3 });
    MM.say(S, S.M, "a weird stipulation from strangers", { sty: "cap", fs: 46, wt: 700, cy: 330, x: 140, align: "left", color: MM.C.coral, after: S.at("weird") - 0.3 });
    MM.push(S, 3);
} });

// G03 "She wanted to share it online partly because she thought a company hiring an artist deserved some recognition."
MM.SCENES.push({ id: "G03", title: "Deserved recognition", cue: "Here she said that she wanted to share", build: function (S) {
    var P = MM.post(S, S.M, 360, 30, 0.05, "right"), tr = S.at("recognition");
    MM.tile(S, S.M, "share", -40, -210, { s: 130, color: MM.C.coral, t: S.at("share") - 0.2, z: -20 });
    MM.say(S, S.M, "a company hiring\nan artist deserves\nrecognition", { sty: "big", fs: 92, lh: 100, cy: -110, x: -880, align: "left", after: S.at("company") - 0.4 });
    MM.tile(S, P, "heart", -200, -330, { s: 100, color: MM.C.coral, t: tr - 0.1, z: -30 });
    MM.tile(S, P, "heart", 40, -360, { s: 84, color: MM.C.coral, t: tr + 0.12, z: -30 });
    MM.tile(S, P, "heart", 250, -320, { s: 92, color: MM.C.coral, t: tr + 0.3, z: -30 });
    MM.push(S, 3);
} });

// G04 "Would keeping the commission quiet have made it any more acceptable in your opinion?"
MM.SCENES.push({ id: "G04", title: "Quiet = acceptable?", cue: "Would keeping the commission quiet", build: function (S) {
    MM.push(S, 4);
    MM.say(S, S.M, "would keeping it quiet\nmake it more acceptable?", { sty: "big", fs: 112, lh: 124, cy: -60 });
    MM.say(S, S.M, "in your opinion", { sty: "cap", fs: 54, cy: 250, color: MM.C.coral, after: S.at("your opinion") - 0.3 });
} });

// G05 "If the objection is the work itself, silence doesn't change what she helped produce, surely. It just changes who knows about it."
MM.SCENES.push({ id: "G05", title: "Silence changes nothing", cue: "If the objection is the work itself", build: function (S) {
    var R = MM.rig(S, "Work", S.M, [-420, 40, 0], 0, "scale", { s0: 80 }), tw = S.at("who knows");
    MM.push(S, 3);
    MM.muse(S, R, { name: "The work", w: 640 });
    MM.say(S, S.M, "silence doesn't change\nwhat she helped produce", { sty: "mid", fs: 70, lh: 82, cy: -200, x: 120, align: "left", after: S.at("silence") - 0.4 });
    MM.tile(S, S.M, "eyeOff", 200, 110, { s: 150, color: MM.C.ink, t: tw - 0.2 });
    MM.say(S, S.M, "it changes who knows", { sty: "cap", fs: 54, wt: 800, cy: 110, x: 310, align: "left", color: MM.C.coral, after: tw - 0.6 });
    MM.say(S, S.M, "a weird kind of stance", { sty: "cap", fs: 46, cy: 330, x: 120, align: "left", color: MM.C.soft, after: S.at("weird") - 0.3 });
} });
