// mm_scenes_b.jsx (v2): 1:43-3:51. The proof, the real objection, why she took the gig, and "another response".
// Documentary style: real pages and photos, her on screen when she is the subject, level text, smooth moves.

// E11 "She also supplied the newspaper with the original sketch and her variations as kind of proof."
MM.SCENES.push({ id: "E11", title: "Proof", cue: "She also supplied the newspaper", tin: { how: "push", dir: "right" }, build: function (S) {
    var A, B, i;
    MM.bg(S, "news");
    MM.push(S, 4);
    MM.photo(S, S.M, "sourced/inquirer_masthead_clean.png", { name: "Inquirer masthead", w: 760, h: 131, x: 0, y: -400, z: -10, t: 0.05, from: "down", border: 16 });
    A = MM.rig(S, "Sketch sheet", S.M, [-400, 60, 0], S.at("original") - 0.3, "left");
    SAT.hang(N3.box(S.ctx, { name: "Sketch sheet paper", cx: 0, cy: 0, w: 640, h: 460, r: 6, fill: "#FFFFFF" }), A, 0);
    MM.muse(S, A, { name: "Sketch M", w: 420, color: MM.C.sketch, sw: 24, v: MM.SKETCH, y: -20, z: -1 });
    MM.tape(S, A, 0, -232, 180, -4, -2);
    MM.tag(S, A, "the original sketch", 0, 270, { fs: 30, t: S.at("original") });
    B = MM.rig(S, "Variations sheet", S.M, [400, 60, 0], S.at("variations") - 0.3, "right");
    SAT.hang(N3.box(S.ctx, { name: "Variations sheet paper", cx: 0, cy: 0, w: 640, h: 460, r: 6, fill: "#FFFFFF" }), B, 0);
    for (i = 0; i < 6; i++) { MM.muse(S, B, { name: "Mini variation " + (i + 1), w: 150, sw: 14, color: i === 5 ? null : MM.C.sketch, grad: i === 5, v: MM.VARIANTS[i * 5 + 4], x: (i % 3 - 1) * 190, y: (Math.floor(i / 3) - 0.5) * 150 - 10, z: -1 }); }
    MM.tape(S, B, 0, -232, 180, 5, -2);
    MM.tag(S, B, "her variations", 0, 270, { fs: 30, bg: MM.C.blue, t: S.at("variations") });
    MM.slam(S, S.M, "proof.", { fs: 150, cy: 410, color: MM.C.coral, times: [S.at("proof")] });
} });

// E12 "But here's the thing, this wasn't the main issue or the reason for ... stalker-esque behaviour against Jessica."
MM.SCENES.push({ id: "E12", title: "Not the main issue", cue: "But heres the thing", tin: { how: "whip", dir: "left" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [560, 190, 0], 0.05, "right", { d: 0.6 }), im, tb = S.at("stalker");
    MM.bg(S, "dark");
    MM.push(S, 4);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 760, h: 811, fit: "width" }); SAT.hang(im, R, 0);
    MM.slam(S, S.M, "this wasn't\nthe main issue", { fs: 130, lh: 136, align: "left", x: -860, cy: -260, color: "#FFFFFF", after: S.at("this wasnt") - 0.3 });
    MM.polaroid(S, S.M, -700, 250, -6, tb - 0.2, tb + 0.4);
    MM.polaroid(S, S.M, -360, 270, 5, tb + 0.05, tb + 0.55);
    MM.slam(S, S.M, "stalker-esque behaviour", { fs: 84, align: "left", x: -860, cy: 30, color: MM.C.coral, times: [tb, S.at("behaviour")] });
} });

// E13 "The criticism and the full on backlash wasn't simply about how much she'd changed the M or how similar it looked"
MM.SCENES.push({ id: "E13", title: "Not about the M", cue: "The criticism and the full on backlash", tin: { how: "push", dir: "up" }, build: function (S) {
    var t1 = S.at("changed"), t2 = S.at("similar"), L, R, m, bl, br;
    bl = N3.image(S.ctx, "paper_warm.jpg", { name: "Left half", cx: -480, cy: 0, w: 980, h: 1400, fit: "cover" }); N3.parent(bl, S.M); N3.pos(bl).setValue([-480, 0]); bl.moveToEnd();
    br = N3.box(S.ctx, { name: "Right half", cx: 480, cy: 0, w: 980, h: 1400, fill: "#E3D2F5" }); N3.parent(br, S.M); N3.pos(br).setValue([480, 0]); br.moveToEnd();
    MM.push(S, 3);
    MM.slam(S, S.M, "the backlash wasn't about...", { fs: 70, cy: -430, after: S.at("backlash") - 0.3, times: [S.at("backlash") - 0.25, S.at("backlash"), S.at("wasnt"), S.at("simply")] });
    L = MM.rig(S, "Changed", S.M, [-480, 30, 0], t1 - 0.6, "left");
    m = MM.muse(S, L, { name: "Changing M", w: 520, color: MM.C.sketch, sw: 26, v: MM.SKETCH });
    MM.morph(m, 520, t1 - 0.2, t1 + 0.7, MM.SKETCH, {}, SAT.SNAP);
    MM.tag(S, L, "how much she changed the M", 0, 250, { fs: 30, t: t1 - 0.3 });
    R = MM.rig(S, "Similar", S.M, [480, 30, 0], t2 - 0.6, "right");
    MM.photo(S, R, "logo_mural_arts_crop.png", { name: "Mural mini", w: 360, h: 257, x: -190, y: -20, t: t2 - 0.5, from: "scale", s0: 1, border: 10 });
    MM.photo(S, R, "logo_muse_crop.png", { name: "Muse mini", w: 360, h: 257, x: 190, y: -20, t: t2 - 0.35, from: "scale", s0: 1, border: 10 });
    MM.tag(S, R, "how similar it looked", 0, 250, { fs: 30, t: t2 - 0.3 });
    MM.strike(S, L, 0, 0, 640, S.at("or how") - 0.1, { tilt: 0.01, sw: 14, color: MM.C.alarm, z: -30 });
    MM.strike(S, R, 0, -20, 820, S.at("logo") + 0.15, { tilt: 0.01, sw: 14, color: MM.C.alarm, z: -30 });
} });

// E14 "The fact is that some designers objected to her helping brand an AI product for Meta in the first place."
MM.SCENES.push({ id: "E14", title: "The real objection", cue: "The fact is that some designers objected", tin: { how: "zoom" }, build: function (S) {
    MM.bg(S, "muse");
    MM.push(S, 4);
    MM.photo(S, S.M, "web/museai_og.jpg", { name: "Muse brand image", w: 1000, h: 525, x: 360, y: 60, t: 0.05, from: "right", border: 14 });
    MM.slam(S, S.M, "some designers\nobjected", { fs: 120, lh: 124, align: "left", x: -880, cy: -300 });
    MM.tag(S, S.M, "objection", -620, -60, { fs: 44, bg: MM.C.alarm, t: S.at("objected") + 0.1 });
    MM.say(S, S.M, "to her helping brand\nan AI product for Meta", { sty: "mid", fs: 62, lh: 74, align: "left", x: -880, cy: 120, after: S.at("helping") - 0.3 });
    MM.tag(S, S.M, "in the first place", -680, 360, { fs: 32, bg: MM.C.coral, t: S.at("first place") - 0.1 });
} });

// F01 "So why does she even take the gig?"   (her photo as the backdrop)
MM.SCENES.push({ id: "F01", title: "Why take the gig", cue: "So why does she even take the gig", tin: { how: "push", dir: "right" }, build: function (S) {
    MM.bg(S, "photo", { img: "sourced/sfc_hische.jpg", blur: 6, dim: 58, tint: "#2A1218" });
    MM.push(S, 6);
    MM.slam(S, S.M, "so why take\nthe gig?", { fs: 190, lh: 190, cy: -40, color: "#FFFFFF", after: S.at("why") - 0.3, times: [S.at("so"), S.at("why"), S.at("take"), S.at("the gig"), S.at("gig")] });
} });

// F02 "Because even she herself said she knew it probably would upset a few people."
MM.SCENES.push({ id: "F02", title: "She knew", cue: "Because even she herself said", tin: { how: "push", dir: "up" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [-560, 190, 0], 0.05, "left", { d: 0.6 }), im;
    MM.bg(S, "blush");
    MM.push(S, 4);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 760, h: 811, fit: "width" }); SAT.hang(im, R, 0);
    MM.clip(S, S.M, "she knew it would\nupset a few people", 330, -40, { w: 980, fs: 72, t: S.at("knew") - 0.5, from: "right", after: S.at("knew") - 0.4, src: "Jessica Hische, via WIRED" });
} });

// F03 "Hische told Wired that her client work had slowed down recently"   (her studio as B-roll)
MM.SCENES.push({ id: "F03", title: "Client work slowed", cue: "Well Hish told Wired", tin: { how: "push", dir: "left" }, build: function (S) {
    var C, ln, tb = S.at("slowed");
    MM.bg(S, "photo", { img: "sourced/sfc_hische.jpg", blur: 0, dim: 18, tint: "#1A0E12" });
    SAT.k(N3.xf(S.M, "ADBE Scale"), 0, S.T, [100, 100, 100], [112, 112, 112], [1, 1]);   // slow Ken Burns push into the studio
    MM.tag(S, S.M, "her studio, Oakland", -650, -440, { fs: 30, t: 0.2 });
    C = MM.panel(S, S.M, { name: "Client work chart", x: -470, y: 160, w: 700, h: 400, t: S.at("client") - 0.3, from: "up", fill: 94 }).n;
    ln = N3.path(S.ctx, { name: "Client work line", verts: [[-290, -110], [-160, -90], [-50, -130], [60, -30], [170, 40], [290, 140]], stroke: MM.C.alarm, sw: 10, trim: true });
    SAT.hang(ln, C, -2);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), tb - 0.3, tb + 0.8, 0, 100, SAT.CALM);
    SAT.hang(SAT.text(S, "client work", { name: "Chart label", x: -290, cy: 150, fs: 34, wt: 800, color: MM.C.ink }), C, -2);
    MM.slam(S, S.M, "slowed down", { fs: 110, x: 420, cy: 300, color: "#FFFFFF", times: [tb, S.at("down")] });
} });

// F04 "and that income helped support her shops and pay her staff."
MM.SCENES.push({ id: "F04", title: "Shops and staff", cue: "and that income helped", tin: { how: "push", dir: "left" }, build: function (S) {
    var ts = S.at("shops"), tf = S.at("staff");
    MM.bg(S, "paper");
    MM.push(S, 4);
    MM.photo(S, S.M, "web/drawling_banner.png", { name: "Drawling shop", w: 860, h: 364, x: -420, y: -130, t: ts - 0.35, from: "left", border: 14, tape: true });
    MM.tag(S, S.M, "Drawling, Temescal Alley", -420, 110, { fs: 30, t: ts });
    MM.tag(S, S.M, "+ Jessica Hische & Friends", -420, 170, { fs: 26, bg: MM.C.coral, t: ts + 0.25 });
    MM.photo(S, S.M, "sourced/sfc_hische.jpg", { name: "Studio", w: 720, h: 480, x: 470, y: 60, t: tf - 0.4, from: "right", border: 14, tape: true });
    MM.tag(S, S.M, "her staff", 470, 340, { fs: 34, t: tf });
    MM.slam(S, S.M, "her shops & her staff", { fs: 86, cy: -420, after: S.at("support") - 0.3, times: [ts - 0.2, ts, ts + 0.6, tf - 0.1, tf] });
} });

// F05 "She says that she charged $12,500 for the two-day sprint on the M logo, with another two weeks spent on the logotype."
MM.SCENES.push({ id: "F05", title: "The fee", cue: "She says that she charged", tin: { how: "push", dir: "right" }, build: function (S) {
    var tf = S.at("$12500"), cal;
    MM.bg(S, "blush");
    MM.push(S, 3);
    MM.face(S, S.M, -700, -320, { d: 220, t: 0.05, name: "Hische", role: "her fee", side: "right" });
    MM.slam(S, S.M, "$12,500", { fs: 240, x: 330, cy: -300, color: MM.C.coral, times: [tf], s0: 130 });
    cal = MM.calendar(S, S.M, 0, 220, { t: S.at("twoday") - 0.5, from: "up" });
    MM.days(cal, 1, 2, MM.C.coral, S.at("twoday") - 0.05, S.at("sprint") + 0.1);
    MM.tag(S, S.M, "2-day sprint: the M", -330, 470, { fs: 30, bg: MM.C.coral, t: S.at("sprint") });
    MM.days(cal, 3, 14, MM.C.blue, S.at("two weeks") - 0.05, S.at("logo type") + 0.4);
    MM.tag(S, S.M, "+ 2 weeks: the logotype", 260, 470, { fs: 30, bg: MM.C.blue, t: S.at("logo type") - 0.1 });
} });

// F06 "Now you can see why the offer would be attractive ... But her critics were questioning whether she should have accepted the work at all"
MM.SCENES.push({ id: "F06", title: "Should she accept", cue: "Now you can see why the offer", tin: { how: "push", dir: "left" }, build: function (S) {
    var tc = S.at("critics"), R = MM.rig(S, "Hische", S.M, [560, 200, 0], 0.05, "right", { d: 0.6 }), im, O, b;
    MM.bg(S, "paper");
    MM.push(S, 3);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 720, h: 768, fit: "width" }); SAT.hang(im, R, 0);
    O = MM.rig(S, "Offer", S.M, [-420, -220, 0], 0.15, "up");
    b = N3.box(S.ctx, { name: "Offer card", cx: 0, cy: 0, w: 640, h: 260, r: 26, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.24, dist: 22, soft: 60 }); SAT.hang(b, O, 0);
    SAT.hang(SAT.text(S, "THE OFFER", { name: "Offer label", x: 0, cy: -70, fs: 28, wt: 800, color: MM.C.soft, align: "center", ls: 0.1 }), O, -1);
    SAT.hang(SAT.text(S, "$12,500", { name: "Offer amount", x: 0, cy: 20, fs: 110, wt: 900, color: MM.C.ink, align: "center", ls: -0.03 }), O, -1);
    LOOK.ccSweep(b, { p0: [-400, 0], p1: [400, 0], t0: S.at("attractive") - 0.2, t1: S.at("attractive") + 0.8, color: "#FFFFFF", width: 140, intensity: 80 });
    MM.tag(S, S.M, "attractive", -420, -40, { fs: 36, bg: MM.C.coral, t: S.at("attractive") });
    MM.react(S, S.M, "should she accept it at all?", -420, 160, { t: tc, fs: 40 });
    MM.slam(S, S.M, "her critics weren't so sure", { fs: 70, align: "left", x: -880, cy: 380, after: tc - 0.4, times: [tc - 0.2, tc, tc + 0.3, S.at("questioning") - 0.1, S.at("questioning") + 0.2] });
} });

// F07 "The money explains the practical appeal of the job, obviously, but it did not settle the objection of people online."
MM.SCENES.push({ id: "F07", title: "Appeal vs objection", cue: "The money explains the practical appeal", tin: { how: "cut" }, build: function (S) {
    var L, R, bl, br, d;
    bl = N3.image(S.ctx, "paper_warm.jpg", { name: "Left half", cx: -480, cy: 0, w: 980, h: 1400, fit: "cover" }); N3.parent(bl, S.M); N3.pos(bl).setValue([-480, 0]); bl.moveToEnd();
    br = N3.box(S.ctx, { name: "Right half", cx: 480, cy: 0, w: 980, h: 1400, fill: "#F2C3CB" }); N3.parent(br, S.M); N3.pos(br).setValue([480, 0]); br.moveToEnd();
    MM.push(S, 3);
    d = N3.box(S.ctx, { name: "Divider", cx: 0, cy: 0, w: 6, h: 1400, fill: MM.C.ink }); SAT.hang(d, S.M, -2);
    L = MM.rig(S, "Appeal", S.M, [-480, 0, 0], S.at("practical") - 0.4, "left");
    MM.photo(S, L, "web/drawling_banner.png", { name: "Shop", w: 640, h: 271, y: -60, t: S.at("practical") - 0.3, from: "scale", s0: 1, border: 12 });
    SAT.hang(SAT.text(S, "$12,500", { name: "Appeal amount", x: 0, cy: 170, fs: 90, wt: 900, color: MM.C.ink, align: "center" }), L, -1);
    MM.tag(S, L, "the practical appeal", 0, -300, { fs: 36, t: S.at("appeal") });
    R = MM.rig(S, "Objection", S.M, [480, 0, 0], S.at("settle") - 0.4, "right");
    MM.react(S, R, "Disgusted.", -60, -160, { t: S.at("settle") - 0.2, fs: 40 });
    MM.react(S, R, "it's about ethics", 40, -10, { t: S.at("settle"), fs: 40 });
    MM.react(S, R, "massively disappointing", -10, 140, { t: S.at("objection") - 0.1, fs: 40 });
    MM.tag(S, R, "didn't settle the objection", 0, -300, { fs: 34, bg: MM.C.alarm, t: S.at("objection") });
} });

// F08 "In response, Jessica argued that Meta hiring an independent artist was something to welcome in this new modern era of AI graphic design."
MM.SCENES.push({ id: "F08", title: "Something to welcome", cue: "In response Jessica argued", tin: { how: "zoom" }, build: function (S) {
    var W = MM.PAGES.wired, pg;
    MM.bg(S, "paper");
    pg = MM.page(S, S.M, W.img, W.size, { name: "WIRED page", w: 2000, t: 0, from: "none", tilt: [8, 12, 0] });
    MM.focus(pg, 0, 0, 800, 2950, 0.9);
    MM.focus(pg, 0.1, S.E, 760, 3010, 1.05, [20, 60]);
    MM.hl(pg, [W.para1, W.para2], 0.2, 1.6, null, "under");
    MM.clip(S, S.M, "Meta hiring an independent\nartist was something to welcome", 0, 180, { w: 1300, fs: 66, t: S.at("meta hiring") - 0.5, from: "up", off: 600, after: S.at("meta hiring") - 0.4, src: "Jessica Hische, to WIRED" });
    MM.tag(S, S.M, "the new era of AI design", 0, 430, { fs: 34, bg: MM.C.coral, t: S.at("modern") - 0.1 });
    MM.tag(S, S.M, "WIRED", -800, -440, { fs: 30, t: 0.1 });
} });

// G01 "But there was another response that she described to Wired."
MM.SCENES.push({ id: "G01", title: "Another response", cue: "But there was another response", tin: { how: "whip", dir: "right" }, build: function (S) {
    MM.bg(S, "coral");
    MM.push(S, 6);
    MM.slam(S, S.M, "another\nresponse", { fs: 220, lh: 210, cy: -40, color: "#FFFFFF" });
    MM.tag(S, S.M, "described to WIRED", 0, 330, { fs: 36, t: S.at("described") - 0.1 });
} });

// G02 "Some people were willing to accept her taking the work, provided she didn't talk about it publicly, which is a weird stipulation from strangers"
MM.SCENES.push({ id: "G02", title: "Don't talk about it", cue: "Some people were willing to accept", tin: { how: "push", dir: "left" }, build: function (S) {
    var P = MM.post(S, S.M, -420, 40, { t: 0.05, from: "left", w: 660 }), bar, tp = S.at("publicly");
    MM.bg(S, "blush");
    MM.push(S, 3);
    bar = N3.box(S.ctx, { name: "Hush bar", cx: 0, cy: 40, w: 640, h: 690, r: 26, fill: "#141014" });
    N3.xf(bar, "ADBE Anchor Point").setValue([-320, 0]); N3.pos(bar).setValue([960 - 320, 540 + 40]);
    SAT.hang(bar, P, -6);
    SAT.k(N3.xf(bar, "ADBE Scale"), tp - 0.1, tp + 0.45, [0, 100, 100], [100, 100, 100], SAT.OUT);
    MM.tag(S, P, "keep it quiet", 0, 40, { fs: 44, bg: MM.C.alarm, t: tp + 0.35, z: -10 });
    MM.say(S, S.M, "willing to accept it...", { sty: "cap", fs: 52, align: "left", x: 40, cy: -330, color: MM.C.soft, times: [S.at("willing"), S.at("to accept"), S.at("accept"), S.at("taking")] });
    MM.slam(S, S.M, "provided she\ndidn't talk about\nit publicly", { fs: 96, lh: 104, align: "left", x: 40, cy: -200, after: S.at("provided") - 0.3 });
    MM.tag(S, S.M, "a weird stipulation from strangers", 400, 330, { fs: 34, bg: MM.C.coral, t: S.at("weird") });
} });

// G03 "Here she said that she wanted to share it online partly because she thought a company hiring an artist deserved some recognition."
MM.SCENES.push({ id: "G03", title: "Deserved recognition", cue: "Here she said that she wanted to share", tin: { how: "cut" }, build: function (S) {
    var P = MM.post(S, S.M, -420, 40, { t: 0, from: "none", w: 660 }), tr = S.at("recognition");
    MM.bg(S, "blush");
    MM.push(S, 3);
    MM.tile(S, P, "share", 230, 330, { s: 120, color: MM.C.coral, t: S.at("share") - 0.2, z: -20 });
    MM.tile(S, P, "heart", 200, -380, { s: 100, color: MM.C.coral, t: tr - 0.1, z: -20 });
    MM.tile(S, P, "heart", 330, -300, { s: 84, color: MM.C.coral, t: tr + 0.12, z: -20 });
    MM.slam(S, S.M, "a company hiring\nan artist deserves\nrecognition", { fs: 96, lh: 104, align: "left", x: 40, cy: -200, after: S.at("company") - 0.4 });
} });

// G04 "Would keeping the commission quiet have made it any more acceptable in your opinion?"   (new frame: dark, her, the question)
MM.SCENES.push({ id: "G04", title: "Quiet = acceptable?", cue: "Would keeping the commission quiet", tin: { how: "push", dir: "up" }, build: function (S) {
    var R = MM.rig(S, "Hische", S.M, [-560, 200, 0], 0.05, "left", { d: 0.6 }), im;
    MM.bg(S, "dark");
    MM.push(S, 4);
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 740, h: 790, fit: "width" }); SAT.hang(im, R, 0);
    MM.tag(S, S.M, "kept quiet?", -560, -330, { fs: 44, bg: MM.C.alarm, t: S.at("quiet") });
    MM.slam(S, S.M, "would keeping it\nquiet make it more\nacceptable?", { fs: 104, lh: 112, align: "left", x: 40, cy: -230, color: "#FFFFFF", after: S.at("keeping") - 0.4 });
    MM.tag(S, S.M, "in your opinion?", 300, 280, { fs: 40, bg: MM.C.coral, t: S.at("your opinion") });
} });

// G05 "If the objection is the work itself, silence doesn't change what she helped produce ... It just changes who knows about it. ... a weird kind of stance"
MM.SCENES.push({ id: "G05", title: "Silence changes nothing", cue: "If the objection is the work itself", tin: { how: "zoom" }, build: function (S) {
    var R = MM.rig(S, "The work", S.M, [-440, 30, 0], 0, "scale", { s0: 80 }), tw = S.at("who knows");
    MM.bg(S, "muse");
    MM.push(S, 3);
    MM.muse(S, R, { name: "The work", w: 700 });
    MM.tag(S, R, "the work itself", 0, 290, { fs: 34, bg: MM.C.blue, t: S.at("the work") });
    MM.slam(S, S.M, "silence doesn't change\nwhat she helped produce", { fs: 76, lh: 86, align: "left", x: 60, cy: -250, after: S.at("silence") - 0.4 });
    MM.slam(S, S.M, "it just changes\nwho knows about it", { fs: 76, lh: 86, align: "left", x: 60, cy: 60, color: MM.C.coral, after: tw - 0.6 });
    MM.tag(S, S.M, "a weird kind of stance", 360, 360, { fs: 32, t: S.at("weird") });
} });
