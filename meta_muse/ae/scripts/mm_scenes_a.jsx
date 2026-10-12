// mm_scenes_a.jsx: chapter 1, "the job itself" (31-135 s). Calm: one idea per frame, clean OUT entrances, near-linear
// hold drifts, crossfades between beats.

// E01 "Let's start with the job itself."
MM.SCENES.push({ id: "E01", title: "Chapter: the job itself", cue: "Lets start with the job itself", build: function (S) {
    MM.push(S, 4);
    MM.chapter(S, "01", "the job itself");
} });

// E02 "Meta didn't hand her a blank artboard and say, Hey, get on with the design."
MM.SCENES.push({ id: "E02", title: "Not a blank artboard", cue: "Because Meta didnt hand her", build: function (S) {
    var A, N, nt, tx;
    MM.push(S, 3);
    MM.say(S, S.M, "didn't hand her a blank artboard", { sty: "mid", fs: 72, cy: -390 });
    A = MM.artboard(S, S.M, 980, 560, S.at("blank") - 0.15, { y: 60 });
    N = MM.rig(S, "Note", S.M, [430, 250, -60], S.at("hey"), "scale", { s0: 1, d: 0.5 });
    nt = N3.box(S.ctx, { name: "Sticky note", cx: 0, cy: 0, w: 380, h: 220, r: 10, fill: MM.C.yellow });
    LOOK.dropShadow(nt, "Soft shadow", { color: MM.C.glassTint, opacity: 0.22, dist: 14, soft: 34 });
    SAT.hang(nt, N, 0);
    tx = MM.say(S, N, "hey, get on\nwith the design", { sty: "cap", fs: 40, wt: 700, lh: 50, cy: 0, after: S.at("hey") - 0.1, dy: 10, z: -1 });
    N3.xf(N, "ADBE Rotate Z").setValue(-5);
} });

// E03 "Understanding what they actually asked her to do changes how we should possibly judge her involvement, if at all."
MM.SCENES.push({ id: "E03", title: "What they asked", cue: "Understanding what they actually asked", build: function (S) {
    var R = MM.rig(S, "Lines", S.M, [0, 0, 0], 0, "up", { off: 120 });
    MM.push(S, 3);
    MM.say(S, R, "what they actually asked her to do", { sty: "cap", fs: 60, cy: -150, color: MM.C.soft });
    MM.say(S, R, "changes how we judge\nher involvement", { sty: "big", fs: 112, lh: 120, cy: 40 });
    MM.say(S, R, "if at all.", { sty: "mid", fs: 64, cy: 330, color: MM.C.coral });
    MM.tile(S, R, "scale", 0, -330, { s: 120, color: MM.C.lavD, t: S.at("judge") - 0.1 });
} });

// E04 "So the company already had an initial sketch for the M logo design. ... Hische's job was to refine that idea."
MM.SCENES.push({ id: "E04", title: "Sketch to refined", cue: "So the company already had", build: function (S) {
    var A, sk, fin, tr = S.at("refine"), W = 640;
    MM.push(S, 3);
    A = MM.artboard(S, S.M, 980, 560, 0, { y: 40, from: "up", label: "Muse / M" });
    sk = MM.muse(S, A, { name: "Meta sketch", w: W, color: MM.C.sketch, sw: 34, v: MM.SKETCH, draw: [S.at("sketch") - 0.2, S.at("logo") + 0.3], ease: [30, 70] });
    MM.pill(S, S.M, "Meta's initial sketch", -300, 380, { bg: MM.C.sketch, fs: 36, t: S.at("initial") - 0.1 });
    // refine: the sketch morphs into the final mark while the blue takes over
    MM.morph(sk, W, tr - 0.1, tr + 0.9, MM.SKETCH, {}, SAT.SNAP);
    fin = MM.muse(S, A, { name: "Refined M", w: W, z: -1 });
    MM.morph(fin, W, tr - 0.1, tr + 0.9, MM.SKETCH, {}, SAT.SNAP);
    SAT.k(N3.xf(fin.layer, "ADBE Opacity"), tr - 0.1, tr + 0.6, 0, 100, SAT.CALM);
    SAT.k(N3.xf(sk.layer, "ADBE Opacity"), tr + 0.2, tr + 0.8, 100, 0, SAT.CALM);
    MM.pill(S, S.M, "Hische: refine it", 320, 380, { bg: MM.C.blue, fs: 36, t: S.at("hishs") });
    MM.say(S, S.M, "her job was to refine that idea", { sty: "mid", fs: 64, cy: -400, after: S.at("job") - 0.3 });
} });

// E05 "And that distinction alone matters when we're discussing which design decisions were hers or were not."
MM.SCENES.push({ id: "E05", title: "Whose decisions", cue: "And that distinction alone matters", build: function (S) {
    var L, R, th = S.at("hers");
    MM.push(S, 3);
    L = MM.panel(S, S.M, { name: "Meta's", x: -420, y: 60, w: 640, h: 460, t: 0.05, from: "left" }).n;
    MM.muse(S, L, { name: "Sketch M", w: 380, color: MM.C.sketch, sw: 22, v: MM.SKETCH, y: -30 });
    SAT.hang(SAT.text(S, "Meta's decisions", { name: "Label Meta", x: 0, cy: 170, fs: 40, wt: 800, color: MM.C.sketch, align: "center" }), L, -2);
    R = MM.panel(S, S.M, { name: "Hers", x: 420, y: 60, w: 640, h: 460, t: 0.2, from: "right" }).n;
    MM.muse(S, R, { name: "Final M", w: 380, y: -30 });
    SAT.hang(SAT.text(S, "her decisions", { name: "Label hers", x: 0, cy: 170, fs: 40, wt: 800, color: MM.C.blue, align: "center" }), R, -2);
    MM.say(S, S.M, "which decisions were hers?", { sty: "mid", fs: 76, cy: -360 });
    SAT.k(N3.xf(R, "ADBE Scale"), th - 0.1, th + 0.5, [100, 100, 100], [108, 108, 108], SAT.OUT);
} });

// E06 "Because some people did draw comparisons to her logo with another existing design."
MM.SCENES.push({ id: "E06", title: "Comparisons", cue: "Because some people did draw comparisons", build: function (S) {
    var H, a, b, eq;
    MM.push(S, 3);
    H = MM.card(S, S.M, "sourced/inquirer_headline.png", { name: "Inquirer article", w: 1100, h: 269, r: 10, y: -300, t: 0.05, from: "down" });
    a = MM.card(S, S.M, "inq_mural_arts.png", { name: "Mural Arts logo", w: 560, h: 373, r: 16, x: -330, y: 170, t: S.at("logo") - 0.2, from: "left" });
    b = MM.card(S, S.M, "inq_muse.png", { name: "Muse logo", w: 560, h: 373, r: 16, x: 330, y: 170, t: S.at("existing") - 0.2, from: "right" });
    eq = MM.pill(S, S.M, "\u2248", 0, 170, { bg: MM.C.coral, fs: 60, w: 110, t: S.at("design", 3.5), z: -30 });
    SAT.hang(SAT.text(S, "Mural Arts Philadelphia (2016)", { name: "Caption Mural Arts", x: -330, cy: 400, fs: 26, wt: 700, color: MM.C.soft, align: "center" }), S.M, -5);
    SAT.hang(SAT.text(S, "Meta Muse (2026)", { name: "Caption Muse", x: 330, cy: 400, fs: 26, wt: 700, color: MM.C.soft, align: "center" }), S.M, -5);
    SAT.hang(SAT.text(S, "Illustration: Julia Duarte / The Philadelphia Inquirer", { name: "Credit", x: 0, cy: 488, fs: 20, wt: 500, color: MM.C.soft, align: "center" }), S.M, -5);
} });

// E07 "Which, come on, let's be honest. These days it's quite easy to liken a design with something else ... so much content"
MM.SCENES.push({ id: "E07", title: "The design world", cue: "Which come on lets be honest", build: function (S) {
    var F = SAT.drift(S, "Field", S.M, { scale: 92 }, 0), i, x, y, m, t0 = S.at("so much content"), cols = 9, rows = 5;
    for (i = 0; i < cols * rows; i++) {
        x = (i % cols - (cols - 1) / 2) * 220; y = (Math.floor(i / cols) - (rows - 1) / 2) * 200;
        m = MM.muse(S, F, { name: "Field M " + (i + 1), w: 120, sw: 14, color: (i % 3 === 0) ? MM.C.lav : (i % 3 === 1 ? "#F6CDD3" : "#FFFFFF"), v: MM.VARIANTS[i % 29], x: x, y: y, z: 260 });
        SAT.pop(m.layer, (i < 18 ? 0.2 + i * 0.03 : t0 - 0.2 + (i - 18) * 0.04), 0.5);
    }
    MM.say(S, S.M, "it's easy to liken a design\nwith something else", { sty: "big", fs: 96, lh: 108, cy: -40, after: S.at("these days") - 0.2 });
    MM.say(S, S.M, "so much design work out there", { sty: "cap", fs: 56, cy: 290, color: MM.C.lavD, after: t0 - 0.3 });
} });

// E08 "But in her words, Hische told the Philadelphia Inquirer ... the Meta sketch was based on a pen stroke or just a mere kind of scribble."
MM.SCENES.push({ id: "E08", title: "A pen stroke", cue: "But in her words", build: function (S) {
    var M1, pen;
    MM.push(S, 3);
    MM.card(S, S.M, "sourced/inquirer_masthead_clean.png", { name: "Inquirer masthead", w: 760, h: 131, r: 8, pad: 26, y: -340, t: S.at("philadelphia") - 0.2, from: "down" });
    MM.pill(S, S.M, "a local newspaper", 0, -220, { bg: MM.C.ink, fs: 30, t: S.at("local") });
    M1 = MM.rig(S, "Scribble", S.M, [0, 70, 0], 0, "none");
    MM.muse(S, M1, { name: "Pen stroke", w: 720, color: MM.C.sketch, sw: 16, v: { tension: 1.3, slant: 0.15, amp: 0.9 }, draw: [S.at("pen") - 0.1, S.at("scribble") + 0.2], ease: [20, 60] });
    pen = MM.tile(S, M1, "pencil2", 420, -150, { s: 110, color: MM.C.sketch, t: S.at("pen") - 0.3 });
    MM.say(S, S.M, "a pen stroke, or a mere scribble", { sty: "mid", fs: 70, cy: 380, after: S.at("pen") - 0.3 });
} });

// E09 "She then went on to adjust the stroke angles, the endings, and the rhythm of the design itself"
MM.SCENES.push({ id: "E09", title: "Angles, endings, rhythm", cue: "She then went on to adjust", build: function (S) {
    var R = MM.rig(S, "Mark", S.M, [0, 30, 0], 0, "scale", { s0: 80 }), W = 900, k = W / 1000;
    MM.muse(S, R, { name: "Muse M", w: W });
    MM.callout(S, R, -300 * k, 0, -200, -260, "angles", S.at("angles") - 0.15);
    MM.callout(S, R, 500 * k, 56 * k, 120, -300, "endings", S.at("endings") - 0.15);
    MM.callout(S, R, 14 * k, -191 * k, 230, -150, "rhythm", S.at("rhythm") - 0.15);
    MM.say(S, S.M, "she adjusted", { sty: "cap", fs: 54, cy: -450, color: MM.C.soft, after: S.at("adjust") - 0.6, times: [S.at("adjust") - 0.6, S.at("adjust")] });
    MM.push(S, 3);
} });

// E10 "exploring more than thirty variations in total."
MM.SCENES.push({ id: "E10", title: "Thirty variations", cue: "exploring more than thirty", build: function (S) {
    var G = SAT.drift(S, "Grid", S.M, { scale: 104 }, 0), i, x, y, n, b, m, t0 = S.at("thirty") - 0.4, cols = 6, last;
    for (i = 0; i < 30; i++) {
        x = (i % cols - 2.5) * 250; y = (Math.floor(i / cols) - 2) * 150 + 70;
        n = SAT.nul(S, "Variation " + (i + 1), [x, y, 0], G);
        b = N3.box(S.ctx, { name: "Variation card " + (i + 1), cx: 0, cy: 0, w: 230, h: 134, r: 16, fill: "#FFFFFF" });
        LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.16, dist: 10, soft: 28 });
        SAT.hang(b, n, 0);
        m = MM.muse(S, n, { name: "Variation M " + (i + 1), w: 150, sw: 15, color: i === 29 ? null : (i % 2 ? MM.C.sketch : MM.C.lavD), v: MM.VARIANTS[i], z: -1, grad: i === 29 });
        MM.pop(n, t0 + i * 0.05, 0.45);
        if (i === 29) { last = n; }
    }
    MM.counter(S, S.M, 0, 30, t0, t0 + 1.6, { name: "30+", fs: 120, cy: -430, x: -130, prefix: "" });
    MM.say(S, S.M, "variations", { sty: "mid", fs: 64, cy: -430, x: -20, align: "left", times: [S.at("variations")] });
    SAT.k(N3.xf(last, "ADBE Scale"), S.at("total") - 0.1, S.at("total") + 0.5, [100, 100, 100], [118, 118, 118], SAT.OUT);
} });

// E11 "She also supplied the newspaper with the original sketch and her variations as kind of proof."
MM.SCENES.push({ id: "E11", title: "Proof", cue: "She also supplied the newspaper", build: function (S) {
    var A, B, st, i;
    MM.push(S, 3);
    A = MM.panel(S, S.M, { name: "Original sketch", x: -400, y: 20, w: 600, h: 440, t: S.at("original") - 0.3, from: "left" }).n;
    MM.muse(S, A, { name: "Sketch M", w: 360, color: MM.C.sketch, sw: 22, v: MM.SKETCH, y: -30 });
    SAT.hang(SAT.text(S, "the original sketch", { name: "Label sketch", x: 0, cy: 160, fs: 36, wt: 800, color: MM.C.sketch, align: "center" }), A, -2);
    B = MM.panel(S, S.M, { name: "Her variations", x: 400, y: 20, w: 600, h: 440, t: S.at("variations") - 0.3, from: "right" }).n;
    for (i = 0; i < 6; i++) { MM.muse(S, B, { name: "Mini variation " + (i + 1), w: 130, sw: 13, color: i === 5 ? null : MM.C.lavD, grad: i === 5, v: MM.VARIANTS[i * 5 + 4], x: (i % 3 - 1) * 170, y: (Math.floor(i / 3) - 0.5) * 120 - 30, z: -1 }); }
    SAT.hang(SAT.text(S, "her variations", { name: "Label variations", x: 0, cy: 160, fs: 36, wt: 800, color: MM.C.blue, align: "center" }), B, -2);
    st = MM.pill(S, S.M, "PROOF", 0, -250, { bg: MM.C.coral, fs: 56, t: S.at("proof") - 0.1, z: -40 });
    N3.xf(st, "ADBE Rotate Z").setValue(-8);
} });

// E12 "But here's the thing, this wasn't the main issue ... bordering on stalker-esque behaviour against Jessica."
MM.SCENES.push({ id: "E12", title: "Not the main issue", cue: "But heres the thing", build: function (S) {
    var tb = S.at("stalker");
    MM.push(S, 4);
    MM.say(S, S.M, "this wasn't the main issue", { sty: "big", fs: 110, cy: -120 });
    MM.say(S, S.M, "stalker-esque behaviour", { sty: "big", fs: 96, cy: 110, color: MM.C.coral, times: [tb, S.at("behaviour")] });
    MM.burst(S, S.M, tb + 0.1, 4, { cx: 0, cy: 100, r0: 520, r1: 80, s: 96, gap: 0.3, accel: 1, seed: 5, z0: 60 });
} });

// E13 "The criticism and the full on backlash wasn't simply about how much she'd changed the M or how similar it looked"
MM.SCENES.push({ id: "E13", title: "Not about the M", cue: "The criticism and the full on backlash", build: function (S) {
    var A, B, t1 = S.at("changed"), t2 = S.at("similar");
    MM.push(S, 3);
    MM.say(S, S.M, "the backlash wasn't about...", { sty: "mid", fs: 76, cy: -380, after: 0, times: [S.at("backlash") - 0.3, S.at("backlash"), S.at("wasnt"), S.at("about")] });
    A = MM.panel(S, S.M, { name: "How much she changed", x: -420, y: 40, w: 640, h: 440, t: t1 - 0.6, from: "left" }).n;
    MM.muse(S, A, { name: "M", w: 360, y: -40 });
    SAT.hang(SAT.text(S, "how much she changed the M", { name: "Label changed", x: 0, cy: 150, fs: 32, wt: 800, color: MM.C.ink, align: "center" }), A, -2);
    B = MM.panel(S, S.M, { name: "How similar", x: 420, y: 40, w: 640, h: 440, t: t2 - 0.6, from: "right" }).n;
    MM.card(S, B, "inq_mural_arts.png", { name: "Mural mini", w: 260, h: 173, pad: 6, r: 10, x: -130, y: -40, t: t2 - 0.5, from: "scale", s0: 1 });
    MM.card(S, B, "inq_muse.png", { name: "Muse mini", w: 260, h: 173, pad: 6, r: 10, x: 140, y: -40, t: t2 - 0.4, from: "scale", s0: 1 });
    SAT.hang(SAT.text(S, "how similar it looked", { name: "Label similar", x: 0, cy: 150, fs: 32, wt: 800, color: MM.C.ink, align: "center" }), B, -2);
    MM.strike(S, A, 0, 0, 560, t2 - 0.2, { z: -20 });
    MM.strike(S, B, 0, 0, 560, S.at("logo") + 0.1, { z: -20 });
} });

// E14 "The fact is that some designers objected to her helping brand an AI product for Meta in the first place."
MM.SCENES.push({ id: "E14", title: "The real objection", cue: "The fact is that some designers objected", build: function (S) {
    var R = MM.rig(S, "Row", S.M, [0, 110, 0], 0.1, "up", { off: 140 });
    MM.push(S, 3);
    MM.say(S, S.M, "some designers objected", { sty: "big", fs: 116, cy: -250 });
    MM.muse(S, R, { name: "M", w: 380, x: -520 });
    SAT.hang(SAT.text(S, "+", { name: "Plus 1", x: -250, cy: 0, fs: 110, wt: 300, color: MM.C.soft, align: "center" }), R, 0);
    MM.tile(S, R, "robot", -20, 0, { s: 200, color: MM.C.ink, t: S.at("ai") - 0.1 });
    SAT.hang(SAT.text(S, "+", { name: "Plus 2", x: 210, cy: 0, fs: 110, wt: 300, color: MM.C.soft, align: "center" }), R, 0);
    MM.pill(S, R, "Meta", 430, 0, { bg: MM.C.blue, fs: 64, t: S.at("meta") - 0.1 });
    MM.bubble(S, S.M, 790, -360, 150, S.at("objected"), { glyph: "\u00D7", z: -40 });
    MM.say(S, S.M, "brand an AI product", { sty: "cap", fs: 54, cy: 380, color: MM.C.soft, after: S.at("brand") - 0.3 });
} });
