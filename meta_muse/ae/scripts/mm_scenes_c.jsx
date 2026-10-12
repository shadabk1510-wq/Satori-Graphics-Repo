// mm_scenes_c.jsx (v2): 3:51-7:18. The responses (the Chronicle page, Johnny Harris style), the Godfather beat, the
// disturbing part, "you can still disagree", and the close. Documentary style, level text, smooth moves.

// K01 "But here's exactly how some people responded to that design or to this job."
MM.SCENES.push({ id: "K01", title: "How people responded", cue: "But heres exactly how some people responded", tin: { how: "push", dir: "right" }, build: function (S) {
    var C = MM.PAGES.sfc, pg;
    MM.bg(S, "news");
    pg = MM.page(S, S.M, C.img, C.size, { name: "Chronicle page", w: 1900, t: 0, from: "up", off: 400, tilt: [8, -10, 0] });
    MM.focus(pg, 0, 0, 1225, 900, 0.62);
    MM.focus(pg, 0.3, 1.8, 700, 360, 1.0);
    MM.hl(pg, [C.head2], S.at("responded") - 0.1, S.at("responded") + 0.6);
    MM.focus(pg, 2.6, S.E, 900, 1150, 0.78, [30, 70]);
    MM.tag(S, S.M, "San Francisco Chronicle", -620, -440, { fs: 30, t: 0.15 });
} });

// K02 "The San Francisco Chronicle quoted illustrator Fathima writing, disgusted, followed by, it's not about money, it's about ethics."
MM.SCENES.push({ id: "K02", title: "Disgusted", cue: "The San Francisco Chronicle quoted", tin: { how: "push", dir: "up" }, build: function (S) {
    var C = MM.PAGES.sfc, pg, td = S.at("disgusted");
    MM.bg(S, "news");
    pg = MM.page(S, S.M, C.img, C.size, { name: "Chronicle page", w: 1900, t: 0, from: "none", tilt: [8, -10, 0] });
    MM.focus(pg, 0, 0, 900, 4100, 0.9);
    MM.focus(pg, 0.1, td, 900, 4370, 1.15);
    MM.hl(pg, [C.disg1, C.disg2], td - 0.05, S.at("ethics") + 0.3);
    MM.ring(S, pg.L, 290, 4362, 150, 42, td + 0.1, { sw: 8 });
    MM.slam(S, S.M, "\u201CDisgusted.\u201D", { fs: 140, x: 0, cy: 350, color: MM.C.alarm, times: [td] });
    MM.tag(S, S.M, "Fathima Kathrada, illustrator", -560, -420, { fs: 30, t: S.at("illustrator") });
} });

// K03 "Marketing executive Autumn Williams called the decision massively disappointing."
MM.SCENES.push({ id: "K03", title: "Massively disappointing", cue: "Marketing executive Autumn Williams", tin: { how: "push", dir: "up" }, build: function (S) {
    var C = MM.PAGES.sfc, pg, tm = S.at("massively");
    MM.bg(S, "news");
    pg = MM.page(S, S.M, C.img, C.size, { name: "Chronicle page", w: 1900, t: 0, from: "none", tilt: [8, -10, 0] });
    MM.focus(pg, 0, 0, 900, 5300, 0.9);
    MM.focus(pg, 0.1, tm, 900, 5480, 1.15);
    MM.hl(pg, [C.will1], S.at("autumn") - 0.1, tm + 0.5);
    MM.ring(S, pg.L, C.massively[0] + C.massively[2] / 2, C.massively[1] + 20, C.massively[2] * 0.62, 44, tm + 0.2, { sw: 8 });
    MM.tag(S, S.M, "Autumn Williams, marketing executive", -480, -420, { fs: 30, t: S.at("autumn") });
    MM.slam(S, S.M, "massively disappointing", { fs: 110, cy: 360, color: MM.C.alarm, times: [tm, S.at("disappointing")] });
} });

// K04 "Those comments were judging her decision to accept the job rather than the quality of her lettering or the logo."
MM.SCENES.push({ id: "K04", title: "Judging the decision", cue: "Those comments were judging her decision", tin: { how: "push", dir: "right" }, build: function (S) {
    var tq = S.at("quality"), W = ["web/work_Greatness-is-Everywhere.jpg", "web/work_Pretty-Happy-Feeling.jpg", "web/work_The-Wonder-Years.jpg"], i;
    MM.bg(S, "paper");
    MM.push(S, 3);
    MM.slam(S, S.M, "judging her decision", { fs: 100, cy: -400, after: S.at("judging") - 0.3 });
    MM.face(S, S.M, -560, -60, { d: 300, t: S.at("decision") - 0.2 });
    MM.tag(S, S.M, "to accept the job", -560, 170, { fs: 34, bg: MM.C.coral, t: S.at("accept") });
    for (i = 0; i < 3; i++) { MM.photo(S, S.M, W[i], { name: "Her lettering " + (i + 1), w: 300, h: 300, x: 180 + i * 330, y: 0, t: tq - 0.3 + i * 0.12, from: "up", border: 10 }); }
    MM.tag(S, S.M, "not the quality of her lettering", 510, 240, { fs: 32, t: S.at("lettering") });
} });

// K05 "But another response quoted by Wired compared accepting the commission to doing a hit job for the mob."
MM.SCENES.push({ id: "K05", title: "A hit for the mob", cue: "But another response quoted by Wired", tin: { how: "zoom" }, build: function (S) {
    var W = MM.PAGES.wired, pg;
    MM.bg(S, "dark");
    pg = MM.page(S, S.M, W.img, W.size, { name: "WIRED page", w: 2100, t: 0, from: "none", tilt: [6, 10, 0] });
    MM.focus(pg, 0, 0, 1300, 1700, 0.8);
    MM.focus(pg, 0.1, S.E, 1200, 1760, 0.95, [20, 60]);
    MM.clip(S, S.M, "Doing this job is like\ndoing a hit for the mob.", 0, 90, { w: 1150, fs: 78, t: S.at("compared") - 0.4, from: "up", off: 700, after: S.at("doing") - 0.4, src: "a response quoted by WIRED" });
} });

// K06 "Now that's a bit extreme ... it would make a really cool addition to the Godfather series ... I hope Netflix is listening."
MM.SCENES.push({ id: "K06", title: "Godfather IV", cue: "Now thats a bit extreme", tin: { how: "push", dir: "left" }, build: function (S) {
    var tg = S.at("godfather"), ex;
    MM.bg(S, "dark");
    MM.push(S, 5);
    ex = MM.slam(S, S.M, "a bit extreme", { fs: 150, cy: -20, color: "#FFFFFF" });
    MM.fadeOut(ex, tg - 0.7, 0.3);
    MM.photo(S, S.M, "godfather_iv.png", { name: "Godfather IV poster", w: 560, h: 840, x: 380, y: 20, t: tg - 0.4, from: "up", off: 1100, d: 0.9, shadow: true });
    MM.slam(S, S.M, "the godfather\nseries", { fs: 120, lh: 124, align: "left", x: -860, cy: -140, color: "#FFFFFF", after: tg - 0.4 });
    MM.tag(S, S.M, "I hope Netflix is listening", -560, 200, { fs: 36, bg: MM.C.alarm, t: S.at("netflix") - 0.2 });
} });

// K07 "There's a mildly disturbing fact worth addressing here. Strong criticism of a professional decision is something a designer may have to answer, sure."
MM.SCENES.push({ id: "K07", title: "A disturbing fact", cue: "Theres a mildly disturbing fact", tin: { how: "cut" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [560, 200, 0], S.at("strong") - 0.3, "right", { d: 0.8 }), im;
    MM.bg(S, "photo", { img: "sourced/sfc_hische.jpg", blur: 14, dim: 80, tint: "#1A0E12" });
    MM.push(S, 4);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 720, h: 768, fit: "width" }); SAT.hang(im, R, 0);
    MM.slam(S, S.M, "a mildly\ndisturbing fact", { fs: 140, lh: 144, align: "left", x: -860, cy: -230, color: "#FFFFFF" });
    MM.say(S, S.M, "strong criticism of a professional\ndecision is something a designer\nmay have to answer", { sty: "cap", fs: 48, lh: 62, align: "left", x: -860, cy: 130, color: "#F4B8C0", after: S.at("strong") - 0.3 });
} });

// K08 "But posting photographs of their home online? ... it serves what purpose? What does that add to the argument ...?"
MM.SCENES.push({ id: "K08", title: "What purpose", cue: "But posting photographs of their home", tin: { how: "push", dir: "right" }, build: function (S) {
    var tp = S.at("serves");
    MM.bg(S, "paper");
    MM.push(S, 3);
    MM.polaroid(S, S.M, -500, -40, -6, S.at("photographs") - 0.2, S.at("online"));
    MM.polaroid(S, S.M, 0, -70, 3, S.at("home") - 0.1, S.at("online") + 0.1);
    MM.polaroid(S, S.M, 500, -40, 7, S.at("online"), S.at("online") + 0.25);
    MM.ring(S, S.M, 0, -70, 230, 240, S.at("home"), { sw: 9 });
    MM.slam(S, S.M, "what purpose?", { fs: 130, cy: 330, color: MM.C.alarm, times: [S.at("what a") , tp + 0.6] });
    MM.slam(S, S.M, "what does that add to the argument?", { fs: 64, cy: -430, after: S.at("what does") - 0.3 });
} });

// K09 "Hische said that she spent two days crying in bed ... regretted accepting the job ... 'not exactly.'"
MM.SCENES.push({ id: "K09", title: "Not exactly", cue: "Hish said that she spent two days", tin: { how: "push", dir: "left" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [560, 190, 0], 0, "right", { d: 0.9, off: 200 }), im, tn = S.at("not exactly"), cal;
    MM.bg(S, "blush");
    MM.push(S, 4);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 740, h: 790, fit: "width" }); SAT.hang(im, R, 0);
    cal = MM.calendar(S, S.M, -420, -250, { t: S.at("two days") - 0.4, from: "up" });
    N3.xf(cal.n, "ADBE Scale").setValue([70, 70, 70]);
    MM.days(cal, 1, 2, MM.C.alarm, S.at("two days") - 0.05, S.at("crying") + 0.2);
    MM.slam(S, S.M, "two days crying in bed", { fs: 64, align: "left", x: -860, cy: -40, after: S.at("two days") - 0.3 });
    MM.say(S, S.M, "did she regret it?", { sty: "mid", fs: 70, align: "left", x: -860, cy: 110, after: S.at("regretted") - 0.4, times: [S.at("regretted") - 0.3, S.at("regretted") - 0.15, S.at("regretted"), S.at("accepting")] });
    MM.slam(S, S.M, "\u201Cnot exactly.\u201D", { fs: 140, align: "left", x: -860, cy: 300, color: MM.C.coral, times: [tn, S.at("exactly")] });
} });

// L01 "Now you can still disagree with her."
MM.SCENES.push({ id: "L01", title: "You can disagree", cue: "Now you can still disagree with her", tin: { how: "zoom" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 6);
    MM.slam(S, S.M, "you can still\ndisagree", { fs: 190, lh: 186, cy: -40, color: "#FFFFFF" });
} });

// L02 "If you believe a product harms creative workers, helping brand it might cross a line for you somewhere."
MM.SCENES.push({ id: "L02", title: "Cross a line", cue: "If you believe a product harms", tin: { how: "push", dir: "right" }, build: function (S) {
    var ln = N3.path(S.ctx, { name: "The line", verts: [[-860, 140], [860, 140]], stroke: MM.C.alarm, sw: 10, trim: true }), tl = S.at("cross"), M;
    MM.bg(S, "paper");
    MM.push(S, 3);
    SAT.hang(ln, S.M, 0);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), tl - 0.5, tl + 0.6, 0, 100, SAT.OUT);
    MM.slam(S, S.M, "a product that harms\ncreative workers?", { fs: 100, lh: 108, cy: -280, after: S.at("product") - 0.4 });
    M = MM.rig(S, "Mark", S.M, [-420, 300, 0], S.at("helping") - 0.3, "left");
    MM.muse(S, M, { name: "Muse M", w: 300 });
    SAT.k(N3.pos(M), tl, tl + 1.2, [-420, 300, 0], [420, 300, 0], SAT.SNAP);
    MM.tag(S, S.M, "might cross a line for you", 0, 40, { fs: 40, bg: MM.C.alarm, t: tl });
} });

// L03 "That is a position worth discussing, but judging the assignment is different from deciding that one commission tells you everything about a person"
MM.SCENES.push({ id: "L03", title: "Assignment vs person", cue: "That is a position worth discussing", tin: { how: "push", dir: "up" }, build: function (S) {
    var L, R, bl, br;
    bl = N3.image(S.ctx, "paper_warm.jpg", { name: "Left half", cx: -480, cy: 0, w: 980, h: 1400, fit: "cover" }); N3.parent(bl, S.M); N3.pos(bl).setValue([-480, 0]); bl.moveToEnd();
    br = N3.box(S.ctx, { name: "Right half", cx: 480, cy: 0, w: 980, h: 1400, fill: "#F7D9DE" }); N3.parent(br, S.M); N3.pos(br).setValue([480, 0]); br.moveToEnd();
    MM.push(S, 3);
    MM.slam(S, S.M, "a position worth discussing", { fs: 76, cy: -440 });
    L = MM.rig(S, "Assignment", S.M, [-480, 20, 0], S.at("assignment") - 0.4, "left");
    MM.muse(S, L, { name: "Assignment M", w: 460, y: -40 });
    MM.tag(S, L, "judging the assignment", 0, 230, { fs: 34, t: S.at("assignment") });
    MM.slam(S, S.M, "\u2260", { fs: 200, cy: 0, color: MM.C.alarm, times: [S.at("different")], z: -40 });
    R = MM.rig(S, "Person", S.M, [480, 20, 0], S.at("deciding") - 0.4, "right");
    MM.face(S, R, 0, -40, { d: 340, t: S.at("deciding") - 0.2 });
    MM.tag(S, R, "judging the whole person", 0, 230, { fs: 34, bg: MM.C.alarm, t: S.at("person") });
} });

// L04 "and furthermore to move towards potentially destroying part of their life."
MM.SCENES.push({ id: "L04", title: "Part of their life", cue: "and furthermore to move towards", tin: { how: "cut" }, build: function (S) {
    MM.bg(S, "dark");
    MM.push(S, 5);
    MM.polaroid(S, S.M, -560, 260, -5, 0.1, 0.5);
    MM.polaroid(S, S.M, 560, 260, 6, 0.3, 0.7);
    MM.slam(S, S.M, "potentially destroying\npart of their life", { fs: 120, lh: 128, cy: -180, color: "#FFFFFF", after: S.at("potentially") - 0.3 });
} });

// L05 "And that's what concerns me about where this could take our industry. People are becoming so, so tribal these days"
MM.SCENES.push({ id: "L05", title: "So tribal", cue: "And thats what concerns me", tin: { how: "push", dir: "right" }, build: function (S) {
    var tt = S.at("tribal"), L = SAT.drift(S, "Camp A", S.M, { pos: [-240, 0, 0] }, tt), R = SAT.drift(S, "Camp B", S.M, { pos: [240, 0, 0] }, tt),
        A = ["sellout", "unforgivable", "how could you", "never again"], B = ["let her work", "it's just a job", "artists need income", "leave her alone"], i;
    MM.bg(S, "blush");
    MM.slam(S, S.M, "where this could take our industry", { fs: 64, cy: -430, after: S.at("where") - 0.3 });
    MM.slam(S, S.M, "so tribal", { fs: 210, cy: 0, color: MM.C.ink, times: [S.at("so", 6), tt] });
    for (i = 0; i < 4; i++) {
        MM.react(S, L, A[i], -620 + (i % 2) * 60, -230 + i * 150, { t: tt - 0.5 + i * 0.12, fs: 34, z: 40 });
        MM.react(S, R, B[i], 620 - (i % 2) * 60, -230 + i * 150, { t: tt - 0.4 + i * 0.12, fs: 34, z: 40 });
    }
    MM.tag(S, S.M, "not just in graphic design", 0, 430, { fs: 30, t: S.at("not just") });
} });

// L06 "But if every disagreement becomes a test of whose side you're on, what happens to the conversation?"
MM.SCENES.push({ id: "L06", title: "Whose side", cue: "But if every disagreement becomes", tin: { how: "push", dir: "left" }, build: function (S) {
    var tc = S.at("what happens"), c;
    MM.bg(S, "paper");
    MM.push(S, 3);
    MM.slam(S, S.M, "a test of whose\nside you're on", { fs: 130, lh: 136, cy: -200, after: S.at("test") - 0.4 });
    c = MM.callbox(S, S.M, "...", 0, 260, { w: 260, fs: 70, t: tc - 0.2, type: 0.4 });
    SAT.k(N3.xf(c, "ADBE Scale"), S.at("conversation"), S.T, [100, 100, 100], [60, 60, 60], SAT.CALM);
    MM.tag(S, S.M, "what happens to the conversation?", 0, 460, { fs: 34, bg: MM.C.coral, t: tc });
} });

// L07 "Do designers explain their choices honestly or keep quiet because the explanation might become the next thing used against them?"
MM.SCENES.push({ id: "L07", title: "Explain or keep quiet", cue: "Do designers explain their choices", tin: { how: "cut" }, build: function (S) {
    var P = MM.post(S, S.M, 440, 30, { t: 0.05, from: "right", w: 620 }), bar, tq = S.at("keep quiet");
    MM.bg(S, "blush");
    MM.push(S, 3);
    bar = N3.box(S.ctx, { name: "Hush bar", cx: 0, cy: 30, w: 600, h: 650, r: 26, fill: "#141014" });
    N3.xf(bar, "ADBE Anchor Point").setValue([-300, 0]); N3.pos(bar).setValue([960 - 300, 540 + 30]);
    SAT.hang(bar, P, -6);
    SAT.k(N3.xf(bar, "ADBE Scale"), tq - 0.1, tq + 0.45, [0, 100, 100], [100, 100, 100], SAT.OUT);
    MM.slam(S, S.M, "explain honestly,", { fs: 100, align: "left", x: -880, cy: -220, after: S.at("explain") - 0.3 });
    MM.slam(S, S.M, "or keep quiet?", { fs: 100, align: "left", x: -880, cy: -80, color: MM.C.alarm, after: tq - 0.3 });
    MM.tag(S, S.M, "used against them", -560, 200, { fs: 36, t: S.at("used against") });
} });

// L08 "Now you might still think that she should have turned down the job, fair enough, but explain why."
MM.SCENES.push({ id: "L08", title: "Explain why", cue: "Now you might still think", tin: { how: "zoom" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 5);
    MM.slam(S, S.M, "she should have turned it down?", { fs: 74, cy: -260, color: "#FFFFFF", after: S.at("she should") - 0.3 });
    MM.slam(S, S.M, "fair enough.", { fs: 90, cy: -120, color: MM.C.ink, after: S.at("fair") - 0.2 });
    MM.slam(S, S.M, "but explain why.", { fs: 200, cy: 110, color: "#FFFFFF", after: S.at("but explain") - 0.2 });
} });

// L09 "Which part crosses the line for you? And would you apply that same standard to a designer you admire or even to yourself?"
MM.SCENES.push({ id: "L09", title: "Same standard", cue: "Which part crosses the line for you", tin: { how: "push", dir: "right" }, build: function (S) {
    var ln = N3.path(S.ctx, { name: "The line", verts: [[-860, -150], [860, -150]], stroke: MM.C.alarm, sw: 10, trim: true }), W = ["web/work_Samsung_Korea.jpg", "web/work_Wake-Forest-New-Frontier.jpg"];
    MM.bg(S, "paper");
    MM.push(S, 3);
    SAT.hang(ln, S.M, 0);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), 0.1, 1.0, 0, 100, SAT.OUT);
    MM.slam(S, S.M, "which part crosses the line?", { fs: 96, cy: -300 });
    MM.photo(S, S.M, W[0], { name: "A designer you admire 1", w: 300, h: 300, x: -560, y: 140, t: S.at("admire") - 0.4, from: "up", border: 10 });
    MM.photo(S, S.M, W[1], { name: "A designer you admire 2", w: 300, h: 300, x: -220, y: 140, t: S.at("admire") - 0.25, from: "up", border: 10 });
    MM.tag(S, S.M, "a designer you admire", -390, 360, { fs: 32, t: S.at("admire") });
    MM.face(S, S.M, 420, 130, { d: 280, t: S.at("yourself") - 0.3, bw: true });
    MM.tag(S, S.M, "or yourself?", 420, 360, { fs: 32, bg: MM.C.alarm, t: S.at("yourself") });
} });

// L10 "I mean twelve point five grand here. Would you turn that down?"
MM.SCENES.push({ id: "L10", title: "Would you turn it down", cue: "I mean twelve point five grand", tin: { how: "cut" }, build: function (S) {
    MM.bg(S, "blush");
    MM.push(S, 5);
    MM.slam(S, S.M, "$12,500", { fs: 280, cy: -80, color: MM.C.coral, times: [S.at("twelve")] });
    MM.slam(S, S.M, "would you turn that down?", { fs: 90, cy: 220, after: S.at("would you") - 0.3 });
} });

// L11 "And that's what I'd like us to get better at as an industry. Asking difficult questions without making people afraid to answer them."
MM.SCENES.push({ id: "L11", title: "Difficult questions", cue: "And thats what Id like us to get better at", tin: { how: "push", dir: "up" }, build: function (S) {
    MM.bg(S, "paper");
    MM.push(S, 4);
    MM.slam(S, S.M, "what we can get better at", { fs: 60, cy: -330, color: MM.C.soft });
    MM.slam(S, S.M, "asking difficult\nquestions", { fs: 150, lh: 150, cy: -60, after: S.at("asking") - 0.3 });
    MM.tag(S, S.M, "without making people afraid to answer", 0, 250, { fs: 38, bg: MM.C.coral, t: S.at("without") });
} });

// L12 "Because if sharing a commission means risking personal attacks, ... some designers may simply stop sharing."
MM.SCENES.push({ id: "L12", title: "Stop sharing", cue: "Because if sharing a commission", tin: { how: "push", dir: "left" }, build: function (S) {
    var ts = S.at("stop sharing"), I = ["web/work_Greatness-is-Everywhere.jpg", "web/work_Pretty-Happy-Feeling.jpg", "web/work_The-Wonder-Years.jpg", "web/work_Samsung_Korea.jpg"], i, p;
    MM.bg(S, "blush");
    MM.push(S, 3);
    MM.slam(S, S.M, "if sharing means risking\npersonal attacks", { fs: 90, lh: 98, cy: -350, after: S.at("sharing") - 0.4 });
    for (i = 0; i < 4; i++) {
        p = MM.post(S, S.M, (i - 1.5) * 440, 170, { t: S.at("sharing") + i * 0.12, from: "up", w: 400, img: I[i], caption: "New work!" });
        MM.away(p, ts - 0.3 + i * 0.12, "down", 0.5);
    }
    MM.tag(S, S.M, "designers may simply stop sharing", 0, 430, { fs: 36, bg: MM.C.alarm, t: ts });
} });

// L13 "And that means we end up losing the chance to question things openly out there in the wild."
MM.SCENES.push({ id: "L13", title: "Question openly", cue: "And that means we end up losing", tin: { how: "zoom" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 5);
    MM.slam(S, S.M, "we lose the chance\nto question things openly", { fs: 120, lh: 128, cy: -60, color: "#FFFFFF", after: S.at("losing") - 0.3 });
} });

// M01 "So would you have taken this job? Tell me your reasoning in the comments ..."
MM.SCENES.push({ id: "M01", title: "Would you take it", cue: "So would you have taken this job", tin: { how: "push", dir: "right" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [600, 200, 0], 0.05, "right", { d: 0.7 }), im, C, tx, tc = S.at("tell me");
    MM.bg(S, "blush");
    MM.push(S, 3);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 700, h: 747, fit: "width" }); SAT.hang(im, R, 0);
    MM.slam(S, S.M, "would you have\ntaken this job?", { fs: 140, lh: 146, align: "left", x: -880, cy: -260 });
    C = MM.panel(S, S.M, { name: "Comment box", x: -260, y: 260, w: 1150, h: 150, r: 75, fill: 96, t: tc - 0.3, from: "up" }).n;
    SAT.hang(N3.image(S.ctx, "hische_face.png", { name: "Comment avatar", cx: -500, cy: 0, w: 84, h: 84, fit: "stretch" }), C, -1);
    tx = SAT.text(S, "I would / wouldn't have, because...", { name: "Comment text", x: -430, cy: 0, fs: 40, wt: 600, color: MM.C.ink });
    N3.typeOn(tx, tc + 0.2, tc + 2.2); SAT.hang(tx, C, -1);
    MM.tag(S, C, "comment", 460, 0, { fs: 28, bg: MM.C.coral, t: tc + 2.2, z: -2 });
} });

// M02 "But we should be able to discuss things without somebody's home becoming part of the conversation."
MM.SCENES.push({ id: "M02", title: "Discuss it", cue: "But we should be able to discuss", tin: { how: "push", dir: "up" }, build: function (S) {
    MM.bg(S, "paper");
    MM.push(S, 4);
    MM.slam(S, S.M, "discuss things", { fs: 160, cy: -260, after: S.at("discuss") - 0.3 });
    MM.polaroid(S, S.M, 0, 120, 3, S.at("home") - 0.2, S.at("home") + 0.3);
    MM.tag(S, S.M, "without somebody's home becoming part of it", 0, 420, { fs: 34, bg: MM.C.alarm, t: S.at("without") });
} });

// M03 "And if you would like to stay up to date with everything in our industry ... do subscribe and check out the playlist on our homepage."
MM.SCENES.push({ id: "M03", title: "Subscribe", cue: "And if you would like to stay up to date", tin: { how: "push", dir: "left" }, build: function (S) {
    MM.bg(S, "blush");
    MM.push(S, 4);
    MM.slam(S, S.M, "stay up to date\nwith our industry", { fs: 120, lh: 126, cy: -230 });
    MM.tag(S, S.M, "subscribe", 0, 120, { fs: 64, bg: MM.C.alarm, t: S.at("subscribe") - 0.1 });
    MM.tag(S, S.M, "the playlist on our homepage", 0, 280, { fs: 34, t: S.at("playlist") - 0.1 });
} });

// M04 "But until next time, design your future today. Peace."
MM.SCENES.push({ id: "M04", title: "Design your future today", cue: "But until next time", tin: { how: "zoom" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 4);
    MM.slam(S, S.M, "until next time,", { fs: 64, cy: -260, color: "#FFFFFF" });
    MM.slam(S, S.M, "design your\nfuture today.", { fs: 180, lh: 184, cy: -40, color: MM.C.ink, after: S.at("design") - 0.2 });
    MM.slam(S, S.M, "peace.", { fs: 70, cy: 330, color: "#FFFFFF", after: S.at("peace") - 0.2 });
} });
