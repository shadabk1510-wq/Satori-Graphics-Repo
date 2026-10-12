// mm_scenes_a.jsx (v2): chapter 1, "the job itself" (31-103 s). Explanation pace = smooth, not slow: a new visual
// lands every 2-3 s on its VO word; scenes change with pushes, whips and match cuts; real pages, photos and her work.

// E01 "Let's start with the job itself."
MM.SCENES.push({ id: "E01", title: "The job itself", cue: "Lets start with the job itself", tin: { how: "zoom" }, build: function (S) {
    var u;
    MM.bg(S, "blush");
    MM.push(S, 5);
    MM.slam(S, S.M, "let's start with\nthe job itself.", { fs: 150, lh: 156, cy: -90, s0: 150 });
    u = N3.path(S.ctx, { name: "Marker underline", verts: [[-420, 160], [430, 148]], stroke: MM.C.coral, sw: 18, trim: true });
    SAT.hang(u, S.M, -5);
    SAT.k(N3.gc(u, 1).property(2).property("ADBE Vector Trim End"), S.at("itself") - 0.1, S.at("itself") + 0.35, 0, 100, SAT.OUT);
} });

// E02 "Because Meta didn't hand her a blank artboard and say, Hey, get on with the design."
MM.SCENES.push({ id: "E02", title: "Not a blank artboard", cue: "Because Meta didnt hand her", tin: { how: "push", dir: "right" }, build: function (S) {
    var tx = S.at("hey"), R, im, x;
    MM.bg(S, "paper");
    MM.push(S, 4);
    MM.say(S, S.M, "Meta didn't hand her a blank artboard", { sty: "mid", fs: 64, cy: -420 });
    MM.artboard(S, S.M, 900, 520, S.at("didnt") - 0.1, { x: -330, y: 40, from: "up", label: "Muse logo \u2014 blank" });
    x = MM.rig(S, "Cross", S.M, [-330, 40, -30], S.at("blank") + 0.2, "none");
    MM.strike(S, x, 0, 0, 760, S.at("artboard"), { tilt: 120, sw: 16, color: MM.C.alarm });
    MM.strike(S, x, 0, 0, 760, S.at("artboard") + 0.15, { tilt: -120, sw: 16, color: MM.C.alarm });
    R = MM.rig(S, "Mini Hische", S.M, [600, 250, -40], tx - 0.25, "up", { d: 0.45, off: 500 });
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische mini", cx: 0, cy: 0, w: 400, h: 427, fit: "width" });
    LOOK.dropShadow(im, "Soft shadow", { color: "#4A1E28", opacity: 0.3, dist: 16, soft: 40 });
    SAT.hang(im, R, 0);
    MM.callbox(S, R, "Hey, get on\nwith the design.", 0, -390, { w: 520, fs: 44, t: tx - 0.1, type: 1.1 });
} });

// E03 "Understanding what they actually asked her to do changes how we should possibly judge her involvement, if at all."
MM.SCENES.push({ id: "E03", title: "What they asked", cue: "Understanding what they actually asked", tin: { how: "push", dir: "up" }, build: function (S) {
    var B = MM.rig(S, "Brief", S.M, [-380, 30, 0], 0.05, "left", { d: 0.7 }), b, l, i, hl;
    MM.bg(S, "paper");
    MM.push(S, 4);
    b = N3.box(S.ctx, { name: "Brief sheet", cx: 0, cy: 0, w: 640, h: 820, r: 6, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.25, dist: 22, soft: 60 }); SAT.hang(b, B, 0);
    l = SAT.text(S, "THE ASK", { name: "Brief title", x: -250, cy: -330, fs: 40, wt: 900, color: MM.C.ink, ls: 0.1 }); SAT.hang(l, B, -1);
    for (i = 0; i < 9; i++) { l = N3.box(S.ctx, { name: "Brief line " + (i + 1), cx: -250 + (i % 3 === 2 ? 180 : 250) - 250 + 0, cy: -240 + i * 62, w: i % 3 === 2 ? 320 : 500, h: 14, r: 7, fill: "#E9E2E2" }); N3.pos(l).setValue([960 - 250 + (i % 3 === 2 ? 160 : 250), 540 - 240 + i * 62]); SAT.hang(l, B, -1); }
    l = SAT.text(S, "Refine our M.", { name: "Brief ask", x: -250, cy: 330, fs: 54, wt: 800, color: MM.C.coral }); SAT.hang(l, B, -1);
    MM.tape(S, B, -200, -410, 180, -8, -3); MM.tape(S, B, 220, -410, 160, 7, -3);
    hl = MM.ring(S, B, -100, 330, 230, 60, S.at("asked") - 0.1, { sw: 8 });
    MM.say(S, S.M, "what they actually\nasked her to do", { sty: "mid", fs: 70, lh: 80, align: "left", x: 60, cy: -300 });
    MM.face(S, S.M, 260, 120, { d: 240, t: S.at("judge") - 0.2, bw: true });
    MM.tag(S, S.M, "judge her involvement?", 500, 320, { fs: 40, t: S.at("involvement") - 0.2 });
    MM.slam(S, S.M, "if at all.", { fs: 90, cy: 430, x: 420, color: MM.C.coral, s0: 150, after: S.at("if at") - 0.3 });
} });

// E04 "So the company already had an initial sketch for the M ... Hische's job was to refine that idea."
MM.SCENES.push({ id: "E04", title: "Sketch to refined", cue: "So the company already had", tin: { how: "push", dir: "right" }, build: function (S) {
    var tr = S.at("refine"), P = MM.rig(S, "Sketchbook", S.M, [-150, 30, 0], 0.05, "up", { d: 0.7 }), pg, sk, fin, W = 720, i, l;
    MM.bg(S, "paper");
    pg = N3.box(S.ctx, { name: "Sketchbook page", cx: 0, cy: 0, w: 1180, h: 760, r: 8, fill: "#FFFEFB" });
    LOOK.dropShadow(pg, "Soft shadow", { color: "#4A1E28", opacity: 0.22, dist: 24, soft: 70 }); SAT.hang(pg, P, 0);
    for (i = 0; i < 9; i++) { l = N3.box(S.ctx, { name: "Rule " + (i + 1), cx: 0, cy: -320 + i * 80, w: 1120, h: 2, fill: "#E8DCDC" }); SAT.hang(l, P, -1); }
    sk = MM.muse(S, P, { name: "Meta sketch", w: W, color: MM.C.sketch, sw: 30, v: MM.SKETCH, draw: [S.at("sketch") - 0.3, S.at("logo") + 0.2], ease: [25, 70], z: -2 });
    MM.tag(S, P, "Meta's initial sketch", -330, -330, { fs: 34, t: S.at("initial") - 0.2 });
    SAT.k(N3.xf(P, "ADBE Scale"), S.at("and what many") - 0.1, S.at("hishs") + 0.2, [100, 100, 100], [112, 112, 112], [50, 80]);   // lean in
    MM.face(S, S.M, 640, 220, { d: 230, t: S.at("hishs") - 0.15, name: "Hische", role: "refined it", side: "left" });
    MM.morph(sk, W, tr - 0.1, tr + 0.9, MM.SKETCH, {}, SAT.SNAP);
    fin = MM.muse(S, P, { name: "Refined M", w: W, z: -3 });
    MM.morph(fin, W, tr - 0.1, tr + 0.9, MM.SKETCH, {}, SAT.SNAP);
    SAT.k(N3.xf(fin.layer, "ADBE Opacity"), tr - 0.1, tr + 0.5, 0, 100, SAT.CALM);
    SAT.k(N3.xf(sk.layer, "ADBE Opacity"), tr + 0.2, tr + 0.7, 100, 0, SAT.CALM);
    MM.slam(S, S.M, "refine", { fs: 120, x: 560, cy: -330, color: MM.C.coral, times: [tr], s0: 160 });
    MM.push(S, 3);
} });

// E05 "And that distinction alone matters ... which design decisions were hers or were not."  (split frame)
MM.SCENES.push({ id: "E05", title: "Whose decisions", cue: "And that distinction alone matters", tin: { how: "cut" }, build: function (S) {
    var L, R, th = S.at("hers"), bl, br, d;
    bl = N3.box(S.ctx, { name: "Left half", cx: -480, cy: 0, w: 980, h: 1400, fill: "#FFFFFF" }); LOOK.gradient4(bl, 980, 1400, ["#FAF8F4", "#EEF3FF", "#F4EFE8", "#DCE8FF"]);
    br = N3.image(S.ctx, "paper_warm.jpg", { name: "Right half", cx: 480, cy: 0, w: 980, h: 1400, fit: "cover" });
    N3.parent(br, S.M); N3.pos(br).setValue([480, 0]); br.moveToEnd(); N3.parent(bl, S.M); N3.pos(bl).setValue([-480, 0]); bl.moveToEnd();
    MM.push(S, 3);
    d = N3.box(S.ctx, { name: "Divider", cx: 0, cy: 0, w: 6, h: 1400, fill: MM.C.ink }); SAT.hang(d, S.M, -2);
    SAT.k(N3.xf(d, "ADBE Scale"), 0, 0.4, [100, 0, 100], [100, 100, 100], SAT.OUT);
    L = MM.rig(S, "Meta side", S.M, [-480, 0, 0], 0.05, "left", { off: 200 });
    MM.muse(S, L, { name: "Sketch M", w: 560, color: MM.C.sketch, sw: 26, v: MM.SKETCH, y: -40 });
    MM.tag(S, L, "Meta's decisions", 0, 260, { fs: 40, bg: MM.C.blue, t: 0.3 });
    R = MM.rig(S, "Her side", S.M, [480, 0, 0], 0.1, "right", { off: 200 });
    MM.muse(S, R, { name: "Final M", w: 560, y: -40 });
    MM.tag(S, R, "her decisions", 0, 260, { fs: 40, t: 0.45 });
    MM.face(S, R, 300, -330, { d: 170, t: 0.6 });
    MM.say(S, S.M, "which decisions were hers?", { sty: "mid", fs: 66, cy: -440 });
    SAT.k(N3.xf(R, "ADBE Scale"), th - 0.1, th + 0.5, [100, 100, 100], [110, 110, 110], SAT.OUT);
    MM.ring(S, R, 0, -40, 360, 230, th + 0.1, { sw: 9 });
} });

// E06 "Because some people did draw comparisons to her logo with another existing design."  (Inquirer page)
MM.SCENES.push({ id: "E06", title: "Comparisons", cue: "Because some people did draw comparisons", tin: { how: "push", dir: "down" }, build: function (S) {
    var Q = MM.PAGES.inq, pg, te = S.at("existing");
    MM.bg(S, "news");
    pg = MM.page(S, S.M, Q.img, Q.size, { name: "Inquirer page", w: 2000, t: 0, from: "none", tilt: [8, 10, -1] });
    MM.focus(pg, 0, 0, 1280, 700, 0.75);
    MM.focus(pg, 0.2, 1.4, 1170, 920, 1.0);
    MM.hl(pg, [Q.head1, Q.head2], S.at("comparisons") - 0.1, S.at("logo") + 0.2);
    MM.away(pg.R, te - 0.45, "up", 0.45);   // the page clears the frame, then the two logos own it
    MM.photo(S, S.M, "logo_mural_arts_crop.png", { name: "Mural Arts logo", w: 680, h: 486, x: -390, y: 10, z: -60, t: te - 0.25, from: "up", off: 900, border: 14, tape: true });
    MM.photo(S, S.M, "logo_muse_crop.png", { name: "Muse logo", w: 680, h: 486, x: 390, y: 10, z: -60, t: te - 0.05, from: "up", off: 900, border: 14, tape: true });
    MM.tag(S, S.M, "Mural Arts Philadelphia", -390, 330, { fs: 30, t: te + 0.25 });
    MM.tag(S, S.M, "Meta Muse", 390, 330, { fs: 30, bg: MM.C.blue, t: te + 0.4 });
    MM.slam(S, S.M, "\u2248", { fs: 160, cy: 0, color: MM.C.coral, times: [te + 0.3], z: -90 });
    MM.tag(S, S.M, "The Philadelphia Inquirer", -620, -440, { fs: 28, t: 0.15 });
    MM.push(S, 3);
} });

// E07 "Which, come on, let's be honest. These days it's quite easy to liken a design with something else in the design world."
MM.SCENES.push({ id: "E07", title: "Easy to liken", cue: "Which come on lets be honest", tin: { how: "whip", dir: "right" }, build: function (S) {
    var F = SAT.drift(S, "Wall", S.M, { scale: 93, pos: [0, -40, 0] }, 0), L = ["Southern-Living", "Jenis", "Eating-Well", "Retail-Me-Not", "mail-chimp", "goode-co",
        "eventbrite", "Dirty-Vine", "golden-hour", "the-general"], i, x, y, n, b, im, ring, tl = S.at("liken");
    MM.bg(S, "blushg");
    for (i = 0; i < 12; i++) {
        x = (i % 4 - 1.5) * 430; y = (Math.floor(i / 4) - 1) * 250;
        n = SAT.nul(S, "Logo card " + (i + 1), [x, y, 0], F);
        b = N3.box(S.ctx, { name: "Logo card bg", cx: 0, cy: 0, w: 390, h: 210, r: 18, fill: "#FFFFFF" });
        LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.16, dist: 12, soft: 30 }); SAT.hang(b, n, 0);
        if (i < 10) { im = N3.image(S.ctx, "web/logo_" + L[i] + ".png", { name: "Logo " + L[i], cx: 0, cy: 0, w: 320, h: 148, fit: "width" }); SAT.hang(im, n, -1); }
        else { MM.muse(S, n, { name: i === 10 ? "Muse in the wall" : "Sketch in the wall", w: 230, sw: 24, z: -1, color: i === 10 ? null : MM.C.sketch, v: i === 10 ? {} : MM.SKETCH }); }
        MM.pop(n, 0.1 + i * 0.07, 0.4);
    }
    ring = MM.rig(S, "Lookalike ring", S.M, [-645, -250, -40], tl - 0.2, "scale", { s0: 1, d: 0.3 });
    MM.ring(S, ring, 0, 0, 230, 135, tl - 0.2, { sw: 10 });
    SAT.k(N3.pos(ring), S.at("design with") - 0.1, S.at("something") + 0.1, [-645, -250, -40], [645, 250, -40], SAT.SNAP);
    var pan = MM.rig(S, "Caption panel", S.M, [0, -20, -70], S.at("easy") - 0.3, "scale", { s0: 1, d: 0.35 }), pb;
    pb = N3.box(S.ctx, { name: "Caption panel bg", cx: 0, cy: 0, w: 1320, h: 300, r: 26, fill: "#FFFFFF" });
    LOOK.dropShadow(pb, "Soft shadow", { color: "#4A1E28", opacity: 0.28, dist: 22, soft: 60 }); SAT.hang(pb, pan, 0);
    MM.slam(S, pan, "easy to liken a design\nwith something else", { fs: 92, lh: 100, cy: -50, color: MM.C.ink, after: S.at("easy") - 0.4, z: -2 });
    MM.say(S, S.M, "come on, let's be honest", { sty: "cap", fs: 48, cy: -440, color: MM.C.soft });
} });

// E07b "There's just so much content and so much design work out there these days."  (fast montage of real work)
MM.SCENES.push({ id: "E07b", title: "So much design work", cue: "Theres just so much content", tin: { how: "cut" }, build: function (S) {
    var IM = ["web/work_Greatness-is-Everywhere.jpg", "web/book_happy.png", "web/work_Pretty-Happy-Feeling.jpg", "web/museai_og.jpg", "web/work_Samsung_Korea.jpg",
        "web/book_In-Progress.png", "web/work_The-Wonder-Years.jpg", "sourced/wired_hero.jpg", "web/work_Wake-Forest-New-Frontier.jpg", "web/book_Tomorrow-Ill-Be-Brave.png",
        "web/book_Who-Will-U-Be.png", "logo_mural_arts_crop.png", "web/book_Tomorrow-Ill-Be-Kind.png", "logo_muse_crop.png", "web/book_My-First-Book-of-Fancy-Letters.png"],
        i, l, t = 0, d = Math.max(0.22, (S.E - 0.1) / IM.length), sz;
    MM.bg(S, "dark");
    for (i = 0; i < IM.length; i++) {
        sz = [1980, 1120];
        l = N3.image(S.ctx, IM[i], { name: "Montage " + (i + 1), cx: 0, cy: 0, w: sz[0], h: sz[1], fit: "cover" });
        SAT.hang(l, S.M, -i * 0.1);
        l.inPoint = t; l.outPoint = (i === IM.length - 1) ? S.T : t + d;
        SAT.k(N3.xf(l, "ADBE Scale"), t, t + d, [N3.xf(l, "ADBE Scale").value[0] * 1.08, N3.xf(l, "ADBE Scale").value[1] * 1.08, 100], N3.xf(l, "ADBE Scale").value, [1, 1]);
        t += d;
    }
    MM.tag(S, S.M, "so much design work", 0, 400, { fs: 54, bg: MM.C.coral, t: S.at("design work") - 0.2, z: -60 });
} });

// E08 "But in her words, Hische told the Philadelphia Inquirer, which is a local newspaper,"
MM.SCENES.push({ id: "E08", title: "In her words", cue: "But in her words", tin: { how: "cut" }, build: function (S) {
    MM.bg(S, "news");
    MM.push(S, 4);
    MM.face(S, S.M, -520, 40, { d: 420, t: 0.05, bw: true });
    MM.slam(S, S.M, "\u201Cin her words\u201D", { fs: 110, x: 230, cy: -260, s0: 150, color: MM.C.ink });
    MM.photo(S, S.M, "sourced/inquirer_masthead_clean.png", { name: "Inquirer masthead", w: 900, h: 155, x: 260, y: 20, z: -20, t: S.at("philadelphia") - 0.3, from: "right", border: 18, tape: true });
    MM.tag(S, S.M, "a local newspaper", 260, 230, { fs: 40, bg: MM.C.coral, t: S.at("local") - 0.1 });
} });

// E08b "that the Meta sketch was based on a pen stroke or just a mere kind of scribble."
MM.SCENES.push({ id: "E08b", title: "A pen stroke", cue: "that the meta sketch was based", tin: { how: "push", dir: "up" }, build: function (S) {
    var R = MM.rig(S, "Sheet", S.M, [0, 60, 0], 0, "none"), s;
    MM.bg(S, "paper");
    MM.push(S, 5);
    MM.muse(S, R, { name: "Pen stroke", w: 1150, color: MM.C.sketch, sw: 14, v: { tension: 1.35, slant: 0.18, amp: 0.95 }, draw: [S.at("pen") - 0.2, S.at("scribble") + 0.3], ease: [15, 55] });
    MM.slam(S, S.M, "a pen stroke", { fs: 110, x: -460, cy: -360, s0: 150, after: S.at("pen") - 0.4 });
    MM.slam(S, S.M, "a mere scribble", { fs: 110, x: 420, cy: 400, s0: 150, color: MM.C.coral, after: S.at("mere") - 0.4 });
    MM.tag(S, S.M, "Meta's sketch", 640, -360, { fs: 34, t: S.at("meta sketch") - 0.1, bg: MM.C.blue });
} });

// E09 "She then went on to adjust the stroke angles, the endings, and the rhythm of the design itself"
MM.SCENES.push({ id: "E09", title: "Angles, endings, rhythm", cue: "She then went on to adjust", tin: { how: "push", dir: "right" }, build: function (S) {
    var R = MM.rig(S, "Mark", S.M, [-330, 40, 0], 0, "scale", { s0: 80 }), H, im, W = 820, k = W / 1000;
    MM.bg(S, "photo", { img: "sourced/sfc_hische.jpg", blur: 16, dim: 72, tint: "#2A1218" });
    MM.push(S, 4);
    H = MM.rig(S, "Hische", S.M, [620, 200, 0], 0.1, "right", { d: 0.7 });
    im = N3.image(S.ctx, "hische_cutout.png", { name: "Hische cut-out", cx: 0, cy: 0, w: 680, h: 726, fit: "width" });
    SAT.hang(im, H, 0);
    MM.muse(S, R, { name: "Muse M", w: W, color: "#FFFFFF" });
    MM.callout(S, R, -300 * k, 0, -180, -270, "angles", S.at("angles") - 0.15);
    MM.callout(S, R, 500 * k, 56 * k, 60, 260, "endings", S.at("endings") - 0.15);
    MM.callout(S, R, 14 * k, -191 * k, 200, -190, "rhythm", S.at("rhythm") - 0.15);
    MM.slam(S, S.M, "she adjusted", { fs: 84, x: -330, cy: -430, color: "#FFFFFF", s0: 150, after: S.at("adjust") - 0.6, times: [S.at("adjust") - 0.6, S.at("adjust")] });
} });

// E10 "exploring more than thirty variations in total."
MM.SCENES.push({ id: "E10", title: "Thirty variations", cue: "exploring more than thirty", tin: { how: "zoom" }, build: function (S) {
    var G = SAT.drift(S, "Grid", S.M, { scale: 105 }, 0), i, x, y, n, b, t0 = S.at("exploring"), cols = 6, last;
    MM.bg(S, "blushg");
    for (i = 0; i < 30; i++) {
        x = (i % cols - 2.5) * 250; y = (Math.floor(i / cols) - 2) * 150 + 80;
        n = SAT.nul(S, "Variation " + (i + 1), [x, y, 0], G);
        b = N3.box(S.ctx, { name: "Variation card " + (i + 1), cx: 0, cy: 0, w: 230, h: 134, r: 16, fill: "#FFFFFF" });
        LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.16, dist: 10, soft: 28 }); SAT.hang(b, n, 0);
        MM.muse(S, n, { name: "Variation M " + (i + 1), w: 150, sw: 15, color: i === 29 ? null : (i % 2 ? MM.C.sketch : MM.C.lavD), v: MM.VARIANTS[i], z: -1, grad: i === 29 });
        MM.pop(n, t0 + i * 0.045, 0.35);
        if (i === 29) { last = n; }
    }
    MM.slam(S, S.M, "30+ variations", { fs: 130, cy: -420, color: MM.C.ink, times: [S.at("thirty") - 0.05, S.at("variations")], s0: 170 });
    SAT.k(N3.xf(last, "ADBE Scale"), S.at("total") - 0.1, S.at("total") + 0.45, [100, 100, 100], [125, 125, 125], SAT.OUT);
    MM.ring(S, last, 0, 0, 150, 100, S.at("total"), { sw: 7 });
} });
