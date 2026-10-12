// mm_scenes_c.jsx: chapter 4, "the responses" (231-282 s); the disturbing part (282-322 s); chapter 5, "you can still
// disagree" (322-414 s); the close (414-438 s). Calm, minimal.

// K01 "But here's exactly how some people responded to that design or to this job."
MM.SCENES.push({ id: "K01", title: "Chapter: the responses", cue: "But heres exactly how some people responded", build: function (S) {
    MM.push(S, 4);
    MM.chapter(S, "04", "how people responded", { fs: 130 });
} });

// K02 "The San Francisco Chronicle quoted illustrator Fathima writing, disgusted, followed by, it's not about money, it's about ethics."
MM.SCENES.push({ id: "K02", title: "Disgusted", cue: "The San Francisco Chronicle quoted", build: function (S) {
    MM.push(S, 3);
    MM.card(S, S.M, "sourced/sfc_masthead.png", { name: "Chronicle masthead", w: 640, h: 98, r: 6, pad: 22, y: -390, t: 0.05, from: "down" });
    MM.quote(S, S.M, "\u201CDisgusted.\u201D\nIt's not about money,\nit's about ethics.", { who: "FATHIMA KATHRADA, ILLUSTRATOR", t: S.at("illustrator") - 0.3, y: 70, w: 1100, fs: 70, after: S.at("disgusted") - 0.3 });
} });

// K03 "Marketing executive Autumn Williams called the decision massively disappointing."
MM.SCENES.push({ id: "K03", title: "Massively disappointing", cue: "Marketing executive Autumn Williams", build: function (S) {
    MM.push(S, 3);
    MM.quote(S, S.M, "\u201Cmassively\ndisappointing\u201D", { who: "AUTUMN WILLIAMS, MARKETING EXECUTIVE", t: 0.05, y: 0, w: 1000, fs: 96, after: S.at("massively") - 0.3 });
    MM.pill(S, S.M, "via San Francisco Chronicle", 0, 330, { bg: "#FFFFFF", color: MM.C.ink, fs: 30, t: 0.6 });
} });

// K04 "Those comments were judging her decision to accept the job rather than the quality of her lettering or the logo."
MM.SCENES.push({ id: "K04", title: "Judging the decision", cue: "Those comments were judging her decision", build: function (S) {
    var A, B, tq = S.at("quality");
    MM.push(S, 3);
    MM.say(S, S.M, "judging her decision", { sty: "mid", fs: 76, cy: -380, after: S.at("judging") - 0.3 });
    A = MM.panel(S, S.M, { name: "The decision", x: -400, y: 50, w: 640, h: 420, t: S.at("decision") - 0.3, from: "left" }).n;
    MM.tile(S, A, "check", 0, -60, { s: 150, color: MM.C.coral, t: S.at("accept") });
    SAT.hang(SAT.text(S, "to accept the job", { name: "Label decision", x: 0, cy: 110, fs: 40, wt: 800, color: MM.C.ink, align: "center" }), A, -2);
    B = MM.panel(S, S.M, { name: "The lettering", x: 400, y: 50, w: 640, h: 420, t: tq - 0.4, from: "right" }).n;
    MM.muse(S, B, { name: "Lettering M", w: 320, y: -50 });
    SAT.hang(SAT.text(S, "not her lettering", { name: "Label lettering", x: 0, cy: 110, fs: 40, wt: 800, color: MM.C.soft, align: "center" }), B, -2);
    MM.strike(S, B, 0, -40, 400, S.at("lettering") + 0.1, { z: -20 });
} });

// K05 "But another response quoted by Wired compared accepting the commission to doing a hit job for the mob."
MM.SCENES.push({ id: "K05", title: "A hit for the mob", cue: "But another response quoted by Wired", build: function (S) {
    MM.push(S, 3);
    MM.say(S, S.M, "accepting the commission was like...", { sty: "cap", fs: 54, cy: -300, color: MM.C.soft, after: S.at("accepting") - 0.3 });
    MM.quote(S, S.M, "doing a hit job\nfor the mob", { who: "A RESPONSE QUOTED BY WIRED", t: S.at("compared") - 0.3, y: 60, w: 1000, fs: 96, after: S.at("doing") - 0.3 });
} });

// K06 "Now that's a bit extreme ... a really cool addition to the Godfather series. ... I hope Netflix is listening."
MM.SCENES.push({ id: "K06", title: "Godfather IV", cue: "Now thats a bit extreme", build: function (S) {
    var tg = S.at("godfather"), ex;
    MM.push(S, 4);
    ex = MM.say(S, S.M, "a bit extreme", { sty: "big", fs: 130, cy: -20 });
    MM.fadeOut(ex, tg - 0.6, 0.35);
    MM.card(S, S.M, "godfather_iv.png", { name: "Godfather IV poster", w: 520, h: 780, r: 10, x: 360, y: 20, t: tg - 0.3, from: "up", off: 900, d: 0.9 });
    MM.say(S, S.M, "the godfather\nseries", { sty: "big", fs: 110, lh: 116, align: "left", x: -860, cy: -120, after: tg - 0.4 });
    MM.pill(S, S.M, "I hope Netflix is listening", -560, 210, { bg: MM.C.ink, fs: 36, t: S.at("netflix") - 0.2 });
    SAT.hang(SAT.text(S, "Fictional parody poster", { name: "Parody note", x: 360, cy: 450, fs: 22, wt: 600, color: MM.C.soft, align: "center" }), S.M, -5);
} });

// K07 "There's a mildly disturbing fact worth addressing here. Strong criticism of a professional decision is something a designer may have to answer, sure."
MM.SCENES.push({ id: "K07", title: "A disturbing fact", cue: "Theres a mildly disturbing fact", build: function (S) {
    MM.push(S, 3);
    MM.say(S, S.M, "a mildly disturbing fact", { sty: "big", fs: 120, cy: -110 });
    MM.say(S, S.M, "strong criticism of a professional decision\nis something a designer may have to answer", { sty: "cap", fs: 50, lh: 64, cy: 130, color: MM.C.soft, after: S.at("strong") - 0.3 });
} });

// K08 "But posting photographs of their home online? ... it serves what purpose? What does that add to the argument ...?"
MM.SCENES.push({ id: "K08", title: "What purpose", cue: "But posting photographs of their home", build: function (S) {
    var tp = S.at("serves");
    MM.push(S, 3);
    MM.say(S, S.M, "posting photographs of their home?", { sty: "mid", fs: 72, cy: -400, after: S.at("posting") - 0.3 });
    MM.polaroid(S, S.M, -480, -20, -6, S.at("photographs") - 0.2, S.at("online"));
    MM.polaroid(S, S.M, 0, -50, 3, S.at("home") - 0.1, S.at("online") + 0.1);
    MM.polaroid(S, S.M, 480, -20, 7, S.at("online"), S.at("online") + 0.25);
    MM.bubble(S, S.M, 0, -60, 200, tp, { glyph: "?", z: -60 });
    MM.say(S, S.M, "what does that add to the argument?", { sty: "mid", fs: 64, cy: 360, color: MM.C.coral, after: S.at("what does") - 0.3 });
} });

// K09 "Hische said that she spent two days crying in bed after the reaction escalated ... regretted accepting the job ... 'not exactly.'"
MM.SCENES.push({ id: "K09", title: "Not exactly", cue: "Hish said that she spent two days", build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [560, 170, 0], 0, "right", { d: 1.0, off: 200 }), im, tn = S.at("not exactly"), A;
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 700, h: 747, fit: "width" });
    SAT.hang(im, R, 0);
    MM.push(S, 4);
    A = MM.rig(S, "Two days", S.M, [-520, -230, 0], S.at("two days") - 0.3, "up", { off: 140 });
    MM.tile(S, A, "calendar", -110, 0, { s: 140, color: MM.C.ink, t: S.at("two days") - 0.2 });
    MM.tile(S, A, "bed", 70, 0, { s: 140, color: MM.C.ink, t: S.at("bed") - 0.2 });
    MM.say(S, S.M, "two days crying in bed", { sty: "cap", fs: 48, wt: 700, cy: -80, x: -520, after: S.at("two days") - 0.3 });
    MM.say(S, S.M, "did she regret it?", { sty: "mid", fs: 72, cy: 100, x: -400, after: S.at("regretted") - 0.4, times: [S.at("regretted") - 0.3, S.at("regretted") - 0.15, S.at("regretted"), S.at("accepting")] });
    MM.say(S, S.M, "\u201Cnot exactly.\u201D", { sty: "big", fs: 130, cy: 290, x: -400, color: MM.C.coral, times: [tn, S.at("exactly")] });
} });

// L01 "Now you can still disagree with her."
MM.SCENES.push({ id: "L01", title: "Chapter: you can disagree", cue: "Now you can still disagree with her", build: function (S) {
    MM.push(S, 4);
    MM.chapter(S, "05", "you can still disagree", { fs: 120 });
} });

// L02 "If you believe a product harms creative workers, helping brand it might cross a line for you somewhere."
MM.SCENES.push({ id: "L02", title: "Cross a line", cue: "If you believe a product harms", build: function (S) {
    var ln = N3.path(S.ctx, { name: "The line", verts: [[-760, 120], [760, 120]], stroke: MM.C.coral, sw: 8, trim: true }), tl = S.at("cross"), d;
    MM.push(S, 3);
    SAT.hang(ln, S.M, 0);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), tl - 0.4, tl + 0.6, 0, 100, SAT.OUT);
    MM.say(S, S.M, "if a product harms creative workers", { sty: "mid", fs: 70, cy: -160, after: S.at("product") - 0.4 });
    d = MM.tile(S, S.M, "brush", -300, 20, { s: 120, color: MM.C.ink, t: S.at("helping") - 0.2 });
    SAT.k(N3.pos(d), tl, tl + 1.2, [-300, 20, 0], [300, 230, 0], SAT.SNAP);
    MM.say(S, S.M, "helping brand it might cross a line", { sty: "cap", fs: 54, cy: 300, color: MM.C.coral, after: S.at("helping") - 0.3 });
} });

// L03 "That is a position worth discussing, but judging the assignment is different from deciding that one commission tells you everything about a person"
MM.SCENES.push({ id: "L03", title: "Assignment vs person", cue: "That is a position worth discussing", build: function (S) {
    var A, B;
    MM.push(S, 3);
    MM.say(S, S.M, "a position worth discussing", { sty: "mid", fs: 70, cy: -390 });
    A = MM.panel(S, S.M, { name: "The assignment", x: -420, y: 40, w: 640, h: 420, t: S.at("assignment") - 0.4, from: "left" }).n;
    MM.muse(S, A, { name: "Assignment M", w: 300, y: -50 });
    SAT.hang(SAT.text(S, "judging the assignment", { name: "Label assignment", x: 0, cy: 110, fs: 38, wt: 800, color: MM.C.ink, align: "center" }), A, -2);
    MM.pill(S, S.M, "\u2260", 0, 40, { bg: MM.C.coral, fs: 70, w: 120, t: S.at("different") - 0.1, z: -30 });
    B = MM.panel(S, S.M, { name: "The person", x: 420, y: 40, w: 640, h: 420, t: S.at("deciding") - 0.4, from: "right" }).n;
    MM.tile(S, B, "mirror", 0, -50, { s: 150, color: MM.C.ink, t: S.at("person") - 0.2 });
    SAT.hang(SAT.text(S, "judging the whole person", { name: "Label person", x: 0, cy: 110, fs: 38, wt: 800, color: MM.C.ink, align: "center" }), B, -2);
} });

// L04 "and furthermore to move towards potentially destroying part of their life."
MM.SCENES.push({ id: "L04", title: "Part of their life", cue: "and furthermore to move towards", build: function (S) {
    MM.push(S, 5);
    MM.say(S, S.M, "potentially destroying\npart of their life", { sty: "big", fs: 120, lh: 130, cy: -60, after: S.at("potentially") - 0.3 });
} });

// L05 "And that's what concerns me about where this could take our industry. People are becoming so, so tribal these days"
MM.SCENES.push({ id: "L05", title: "So tribal", cue: "And thats what concerns me", build: function (S) {
    var tt = S.at("tribal"), L = SAT.drift(S, "Camp A", S.M, { pos: [-220, 0, 0] }, tt), R = SAT.drift(S, "Camp B", S.M, { pos: [220, 0, 0] }, tt), i;
    MM.say(S, S.M, "where this could take our industry", { sty: "mid", fs: 66, cy: -380, after: S.at("where") - 0.3 });
    MM.say(S, S.M, "so tribal", { sty: "head", fs: 230, cy: 0, color: MM.C.ink, times: [S.at("so", 6), tt] });
    for (i = 0; i < 5; i++) {
        MM.bubble(S, L, -560 - (i % 2) * 140, -150 + i * 90, 90, tt - 0.6 + i * 0.12, { glyph: "!", rot: -8, z: 40 });
        MM.bubble(S, R, 560 + (i % 2) * 140, -150 + i * 90, 90, tt - 0.5 + i * 0.12, { glyph: "!", color: MM.C.sketch, rot: 8, z: 40 });
    }
    MM.say(S, S.M, "not just in graphic design", { sty: "cap", fs: 50, cy: 330, color: MM.C.soft, after: S.at("not just") - 0.3 });
} });

// L06 "But if every disagreement becomes a test of whose side you're on, what happens to the conversation?"
MM.SCENES.push({ id: "L06", title: "Whose side", cue: "But if every disagreement becomes", build: function (S) {
    var tc = S.at("conversation"), m;
    MM.push(S, 3);
    MM.say(S, S.M, "a test of whose side you're on", { sty: "big", fs: 100, cy: -150, after: S.at("test") - 0.4 });
    m = MM.tile(S, S.M, "message", 0, 130, { s: 170, color: MM.C.ink, t: S.at("what happens") - 0.2 });
    SAT.k(N3.xf(m, "ADBE Scale"), tc + 0.3, S.T, [100, 100, 100], [70, 70, 70], SAT.CALM);
    MM.say(S, S.M, "what happens to the conversation?", { sty: "cap", fs: 54, cy: 330, color: MM.C.coral, after: S.at("what happens") - 0.3 });
} });

// L07 "Do designers explain their choices honestly or keep quiet because the explanation might become the next thing used against them?"
MM.SCENES.push({ id: "L07", title: "Explain or keep quiet", cue: "Do designers explain their choices", build: function (S) {
    var tq = S.at("keep quiet");
    MM.push(S, 3);
    MM.tile(S, S.M, "message", -170, -170, { s: 170, color: MM.C.ink, t: S.at("explain") - 0.2 });
    MM.tile(S, S.M, "mute", 170, -170, { s: 170, color: MM.C.alarm, t: tq - 0.2 });
    MM.say(S, S.M, "explain honestly,\nor keep quiet?", { sty: "big", fs: 104, lh: 114, cy: 60, after: S.at("explain") - 0.4 });
    MM.say(S, S.M, "the next thing used against them", { sty: "cap", fs: 50, cy: 330, color: MM.C.soft, after: S.at("the next") - 0.3 });
} });

// L08 "Now you might still think that she should have turned down the job, fair enough, but explain why."
MM.SCENES.push({ id: "L08", title: "Explain why", cue: "Now you might still think", build: function (S) {
    MM.push(S, 4);
    MM.say(S, S.M, "she should have turned it down?", { sty: "mid", fs: 70, cy: -230, color: MM.C.soft, after: S.at("she should") - 0.3 });
    MM.say(S, S.M, "fair enough.", { sty: "mid", fs: 70, cy: -110, after: S.at("fair") - 0.2 });
    MM.say(S, S.M, "but explain why.", { sty: "head", fs: 190, cy: 100, color: MM.C.coral, after: S.at("but explain") - 0.2 });
} });

// L09 "Which part crosses the line for you? And would you apply that same standard to a designer you admire or even to yourself?"
MM.SCENES.push({ id: "L09", title: "Same standard", cue: "Which part crosses the line for you", build: function (S) {
    var ln = N3.path(S.ctx, { name: "The line", verts: [[-700, -120], [700, -120]], stroke: MM.C.coral, sw: 8, trim: true });
    MM.push(S, 3);
    SAT.hang(ln, S.M, 0);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), 0.1, 1.0, 0, 100, SAT.OUT);
    MM.say(S, S.M, "which part crosses the line?", { sty: "big", fs: 96, cy: -250 });
    MM.tile(S, S.M, "heart", -260, 110, { s: 150, color: MM.C.coral, t: S.at("admire") - 0.2 });
    MM.tile(S, S.M, "mirror", 260, 110, { s: 150, color: MM.C.ink, t: S.at("yourself") - 0.2 });
    MM.say(S, S.M, "a designer you admire", { sty: "cap", fs: 40, wt: 800, cy: 250, x: -260, after: S.at("a designer") - 0.3 });
    MM.say(S, S.M, "or yourself?", { sty: "cap", fs: 40, wt: 800, cy: 250, x: 260, after: S.at("or even") - 0.3 });
} });

// L10 "I mean twelve point five grand here. Would you turn that down?"
MM.SCENES.push({ id: "L10", title: "Would you turn it down", cue: "I mean twelve point five grand", build: function (S) {
    var R = MM.rig(S, "Fee", S.M, [0, -60, 0], 0, "scale", { s0: 60 });
    MM.push(S, 4);
    MM.counter(S, R, 0, 12500, 0.1, 1.4, { name: "Fee counter", prefix: "$", fs: 220, cy: 0, color: MM.C.coral });
    MM.say(S, S.M, "would you turn that down?", { sty: "mid", fs: 80, cy: 240, after: S.at("would you") - 0.3 });
} });

// L11 "And that's what I'd like us to get better at as an industry. Asking difficult questions without making people afraid to answer them."
MM.SCENES.push({ id: "L11", title: "Difficult questions", cue: "And thats what Id like us to get better at", build: function (S) {
    MM.push(S, 3);
    MM.say(S, S.M, "what we can get better at", { sty: "cap", fs: 56, cy: -300, color: MM.C.soft });
    MM.say(S, S.M, "asking difficult questions", { sty: "big", fs: 116, cy: -80, after: S.at("asking") - 0.3 });
    MM.say(S, S.M, "without making people afraid to answer", { sty: "mid", fs: 64, cy: 140, color: MM.C.coral, after: S.at("without") - 0.3 });
} });

// L12 "Because if sharing a commission means risking personal attacks, ... some designers may simply stop sharing."
MM.SCENES.push({ id: "L12", title: "Stop sharing", cue: "Because if sharing a commission", build: function (S) {
    var ts = S.at("stop sharing"), i, t;
    MM.push(S, 3);
    MM.say(S, S.M, "if sharing means\nrisking personal attacks", { sty: "big", fs: 100, lh: 110, cy: -270, after: S.at("sharing") - 0.4 });
    for (i = 0; i < 5; i++) {
        t = MM.tile(S, S.M, "share", (i - 2) * 220, 150, { s: 150, color: MM.C.ink, t: S.at("sharing") + i * 0.1 });
        MM.away(t, ts - 0.4 + i * 0.12, "shrink", 0.35);
    }
    MM.say(S, S.M, "designers may simply stop sharing", { sty: "cap", fs: 54, cy: 360, color: MM.C.coral, after: S.at("some designers") - 0.3 });
} });

// L13 "And that means we end up losing the chance to question things openly out there in the wild."
MM.SCENES.push({ id: "L13", title: "Question openly", cue: "And that means we end up losing", build: function (S) {
    MM.push(S, 5);
    MM.say(S, S.M, "we lose the chance\nto question things openly", { sty: "big", fs: 112, lh: 124, cy: -60, after: S.at("losing") - 0.3 });
} });

// M01 "So would you have taken this job? Tell me your reasoning in the comments ... we don't need to argue on the answer of course."
MM.SCENES.push({ id: "M01", title: "Would you take it", cue: "So would you have taken this job", build: function (S) {
    var C, tx, tc = S.at("tell me");
    MM.push(S, 3);
    MM.say(S, S.M, "would you have\ntaken this job?", { sty: "head", fs: 140, lh: 146, cy: -250, align: "left", x: -860 });
    MM.muse(S, MM.rig(S, "M", S.M, [650, -190, 0], 0.2, "scale", { s0: 60 }), { name: "Muse M", w: 420 });
    C = MM.panel(S, S.M, { name: "Comment box", x: 0, y: 270, w: 1300, h: 170, r: 85, fill: 96, t: tc - 0.3, from: "up" }).n;
    SAT.hang(N3.ellipse(S.ctx, { name: "Comment avatar", cx: -560, cy: 0, d: 90, fill: MM.C.lav }), C, -1);
    tx = SAT.text(S, "I would / wouldn't have taken it, because...", { name: "Comment text", x: -480, cy: 0, fs: 44, wt: 600, color: MM.C.ink });
    N3.typeOn(tx, tc + 0.2, tc + 2.4);
    SAT.hang(tx, C, -1);
    MM.pill(S, C, "Comment", 520, 0, { bg: MM.C.coral, fs: 32, t: tc + 2.4, z: -2 });
} });

// M02 "But we should be able to discuss things without somebody's home becoming part of the conversation."
MM.SCENES.push({ id: "M02", title: "Discuss it", cue: "But we should be able to discuss", build: function (S) {
    MM.push(S, 4);
    MM.say(S, S.M, "discuss things", { sty: "big", fs: 130, cy: -170, after: S.at("discuss") - 0.3 });
    MM.tile(S, S.M, "homeX", 0, 50, { s: 150, color: MM.C.alarm, t: S.at("home") - 0.2 });
    MM.say(S, S.M, "without somebody's home becoming\npart of the conversation", { sty: "cap", fs: 56, lh: 70, cy: 230, color: MM.C.ink, after: S.at("without") - 0.3 });
} });

// M03 "And if you would like to stay up to date with everything in our industry ... do subscribe and check out the playlist on our homepage."
MM.SCENES.push({ id: "M03", title: "Subscribe", cue: "And if you would like to stay up to date", build: function (S) {
    MM.push(S, 4);
    MM.say(S, S.M, "stay up to date\nwith our industry", { sty: "big", fs: 110, lh: 120, cy: -230 });
    MM.tile(S, S.M, "bell", -230, 160, { s: 150, color: MM.C.coral, t: S.at("subscribe") - 0.3 });
    MM.pill(S, S.M, "Subscribe", 40, 160, { bg: MM.C.coral, fs: 52, t: S.at("subscribe") - 0.1 });
    MM.pill(S, S.M, "the playlist on our homepage", 0, 330, { bg: "#FFFFFF", color: MM.C.ink, fs: 36, t: S.at("playlist") - 0.2 });
} });

// M04 "But until next time, design your future today. Peace."
MM.SCENES.push({ id: "M04", title: "Design your future today", cue: "But until next time", build: function (S) {
    MM.push(S, 4);
    MM.say(S, S.M, "until next time,", { sty: "cap", fs: 56, cy: -200, color: MM.C.soft });
    MM.say(S, S.M, "design your\nfuture today.", { sty: "head", fs: 170, lh: 176, cy: -40, color: MM.C.coral, after: S.at("design") - 0.2 });
    MM.say(S, S.M, "peace.", { sty: "mid", fs: 64, cy: 330, after: S.at("peace") - 0.2 });
} });
