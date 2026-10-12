// mm_doc.jsx: the documentary toolkit for Video 4 v2 (the user's review: storytelling, real images, Vox / Johnny Harris
// article treatment, directional transitions, never crossfades). Builds on mm_kit.jsx.

// ---------------------------------------------------------------- per-scene backgrounds (2D, parented to MASTER so
// transitions carry them; oversized so drifts and pushes never show an edge)
MM.BGS = { paper: "paper_warm.jpg", blush: "paper_blush.jpg", news: "paper_news.jpg" };
MM.bg = function (S, kind, o) {
    o = o || {};
    var l, P, c;
    if (MM.BGS[kind]) {
        l = N3.image(S.ctx, MM.BGS[kind], { name: "BG " + kind, cx: 0, cy: 0, w: 2400, h: 1400, fit: "stretch" });
    } else if (kind === "photo") {
        l = N3.image(S.ctx, o.img, { name: "BG photo", cx: 0, cy: 0, w: 2400, h: 1400 });
        N3.blur(l).setValue(o.blur === undefined ? 10 : o.blur);
        c = N3.box(S.ctx, { name: "BG photo dim", cx: 0, cy: 0, w: 2400, h: 1400, fill: o.tint || "#2A1218" });
        N3.xf(c, "ADBE Opacity").setValue(o.dim === undefined ? 55 : o.dim);
        N3.parent(c, S.M); N3.pos(c).setValue([0, 0]); c.moveToEnd();
    } else {
        l = N3.box(S.ctx, { name: "BG " + kind, cx: 0, cy: 0, w: 2400, h: 1400, fill: "#FFFFFF" });
        P = { coral: ["#FBE3E6", "#F4B8C0", "#E8828F", "#D9465A"], blushg: ["#FDF5F6", "#FBE7EA", "#F6CDD3", "#EDA0AA"],
            muse: ["#FAF8F4", "#EEF3FF", "#F4EFE8", "#DCE8FF"], dark: ["#2A1B22", "#1A1216", "#3A2028", "#120C0F"] }[kind];
        LOOK.gradient4(l, 2400, 1400, P);
    }
    N3.parent(l, S.M); N3.pos(l).setValue([0, 0]);
    l.moveToEnd();
    return l;
};

// ---------------------------------------------------------------- transitions (MASTER keys; main sets the tails)
// how: "push" (old slides out as new slides in, lockstep, motion blur), "whip" (fast smear, hard cut), "zoom"
// (zoom-through, hard cut), "cut". dir: where the NEW frame comes from ("right" = it slides in from the right).
MM.TAILS = { push: 0.38, whip: 0, zoom: 0, cut: 0 };
MM.DIRV = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };
MM.PUSHE = [72, 72];   // same ease on both sides so the seam stays locked
MM.inT = function (S, tr) {
    var p = N3.pos(S.M), sc = N3.xf(S.M, "ADBE Scale"), d = MM.DIRV[tr.dir || "right"], s;
    if (tr.how === "push") { SAT.k(p, 0, MM.TAILS.push, [960 + d[0] * 1920, 540 + d[1] * 1080, 0], [960, 540, 0], MM.PUSHE); }
    else if (tr.how === "whip") { SAT.k(p, 0, 0.24, [960 + d[0] * 2400, 540 + d[1] * 1500, 0], [960, 540, 0], SAT.OUT); }
    else if (tr.how === "zoom") { s = sc.valueAtTime(0.45, false); SAT.k(sc, 0, 0.45, [s[0] * 1.7, s[1] * 1.7, s[2] * 1.7], s, SAT.OUT); }
};
MM.outT = function (S, tr) {
    var p = N3.pos(S.M), d = MM.DIRV[tr.dir || "right"], E = S.E;
    if (tr.how === "push") { SAT.k(p, E, E + MM.TAILS.push, [960, 540, 0], [960 - d[0] * 1920, 540 - d[1] * 1080, 0], MM.PUSHE); }
    else if (tr.how === "whip") { SAT.k(p, E - 0.2, E, [960, 540, 0], [960 - d[0] * 2400, 540 - d[1] * 1500, 0], SAT.IN); }
    else if (tr.how === "zoom") { SAT.zoomThrough(S.M, E, 0.28); }
};
// Camera shake on the MASTER's anchor (independent of the transition keys on its position).
MM.shake = function (S, t, amp, d) {
    var a = N3.xf(S.M, "ADBE Anchor Point"), k = [[0, 0], [1, -0.6], [-0.8, 0.5], [0.5, 0.7], [-0.3, -0.3], [0, 0]], i, n = k.length;
    amp = amp || 14; d = d || 0.32;
    for (i = 0; i < n; i++) { a.setValueAtTime(t + d * i / (n - 1), [k[i][0] * amp, k[i][1] * amp, 0]); }
};

// ---------------------------------------------------------------- type
// Per-word reveal with a configurable slam: words scale down from s0 %, de-blur and settle on their VO times.
MM.wordAnim = function (layer, times, o) {
    var ai, an, P, sel;
    o = o || {};
    for (var i = 0; i < times.length; i++) { AEL.layerMarker(layer, N3.r3(times[i]), ""); }
    ai = layer.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator").propertyIndex;
    an = function () { return layer.property("ADBE Text Properties").property("ADBE Text Animators").property(ai); };
    an().name = "Words in (markers)";
    P = function () { return an().property("ADBE Text Animator Properties"); };
    P().addProperty("ADBE Text Opacity"); P().property("ADBE Text Opacity").setValue(0);
    P().addProperty("ADBE Text Scale 3D"); P().property("ADBE Text Scale 3D").setValue([o.s0 || 170, o.s0 || 170, 100]);
    if (o.dy) { P().addProperty("ADBE Text Position 3D"); P().property("ADBE Text Position 3D").setValue([0, o.dy, 0]); }
    P().addProperty("ADBE Text Blur"); P().property("ADBE Text Blur").setValue([o.blur || 18, o.blur || 18]);
    an().property("ADBE Text Selectors").addProperty("ADBE Text Expressible Selector");
    sel = an().property("ADBE Text Selectors").property(1);
    sel.property("ADBE Text Range Type2").setValue(3);   // words
    AEL.expr(sel.property("ADBE Text Expressible Amount"),
        "// word i lands at layer marker i (drag markers to retime)\n" +
        "var n = marker.numKeys, i = textIndex, t0 = 0;\n" +
        "if (n > 0) { t0 = i <= n ? marker.key(i).time : marker.key(n).time + (i - n) * 0.06; }\n" +
        "var u = Math.min(1, Math.max(0, (time - t0) / " + (o.lin || 0.22) + "));\n" +
        "var v = 100 * Math.pow(1 - u, 3);\n[v, v, v]");
    try { layer.property("ADBE Text Properties").property("ADBE Text More Options").property("ADBE Text Anchor Point Option").setValue(2); } catch (e) {}
    return layer;
};
// Banger type: heavy, tight, each word slams in on its VO word. o: like MM.say plus {s0, shake (amp)}
MM.slam = function (S, parent, text, o) {
    o = o || {};
    var l = SAT.text(S, o.caps ? String(text).toUpperCase() : text, { name: o.name || ("Slam: " + String(text).replace(/\n/g, " ").substr(0, 30)), x: o.x || 0, cy: o.cy || 0,
        fs: o.fs || 190, wt: o.wt || 900, ls: o.ls === undefined ? -0.045 : o.ls, lh: o.lh, color: o.color || MM.C.ink, align: o.align || "center" }), tms, i;
    tms = o.times || MM.times(S, text, o.after);
    MM.wordAnim(l, tms, { s0: o.s0 || 180, blur: o.blur || 16, lin: o.lin || 0.2 });
    SAT.hang(l, parent || S.M, o.z || 0);
    if (o.shake) { for (i = 0; i < tms.length; i++) { MM.shake(S, tms[i] + 0.02, o.shake, 0.22); } }
    return l;
};
// Black tag label (documentary lower-third style). o: {fs, bg, color, t, z}
MM.tag = function (S, parent, str, x, y, o) {
    o = o || {};
    var fs = o.fs || 30, w = String(str).length * fs * 0.66 + fs * 1.4, h = fs * 1.9, n = SAT.nul(S, "Tag " + str, [x, y, o.z || -30], parent || S.M), b, t;
    b = N3.box(S.ctx, { name: "Tag bg", cx: 0, cy: 0, w: w, h: h, r: 4, fill: o.bg || "#141014" });
    t = SAT.text(S, String(str).toUpperCase(), { name: "Tag text", x: 0, cy: 0, fs: fs, wt: 800, color: o.color || "#FFFFFF", align: "center", ls: 0.08 });
    SAT.hang(b, n, 0); SAT.hang(t, n, -1);
    if (o.rot) { N3.xf(n, "ADBE Rotate Z").setValue(o.rot); }
    if (o.t !== undefined) { SAT.k(N3.xf(b, "ADBE Scale"), o.t, o.t + 0.3, [0, 100, 100], [100, 100, 100], SAT.OUT); N3.unitReveal(t, { times: [o.t + 0.1], based: "lines", blur: 2, lin: 0.25 }); N3.xf(b, "ADBE Anchor Point").setValue([-w / 2, 0]); N3.pos(b).setValue([-w / 2, 0, 0]); }
    return n;
};
// Translucent tape strip.
MM.tape = function (S, parent, x, y, w, rot, z) {
    var l = N3.box(S.ctx, { name: "Tape", cx: 0, cy: 0, w: w || 180, h: 48, r: 2, fill: "#F3E7CC", fillOpacity: 78 });
    SAT.hang(l, parent || S.M, z === undefined ? -8 : z);
    N3.pos(l).setValue([x, y, z === undefined ? -8 : z]); N3.xf(l, "ADBE Rotate Z").setValue(rot || 0);
    return l;
};

// ---------------------------------------------------------------- photos
// Cut-out / photo with optional white border, shadow, tape. o: {w, h, fit, x, y, z, t, from, d, off, border, tape, rot, name, shadow}
MM.photo = function (S, parent, rel, o) {
    var nm = o.name || rel, n = MM.rig(S, nm, parent, [o.x || 0, o.y || 0, o.z || 0], o.t || 0, o.from || "up", o), im, fr, bw = o.border || 0;
    if (bw) {
        fr = N3.box(S.ctx, { name: nm + " border", cx: 0, cy: 0, w: o.w + bw * 2, h: o.h + bw * 2, r: 3, fill: "#FFFFFF" });
        LOOK.dropShadow(fr, "Soft shadow", { color: "#4A1E28", opacity: 0.3, dist: 22, soft: 60 });
        SAT.hang(fr, n, 0);
    }
    im = N3.image(S.ctx, rel, { name: nm, cx: 0, cy: 0, w: o.w, h: o.h, fit: o.fit || "cover" });
    if (!bw && o.shadow !== false) { LOOK.dropShadow(im, "Soft shadow", { color: "#4A1E28", opacity: 0.28, dist: 20, soft: 50 }); }
    SAT.hang(im, n, -1);
    if (o.rot) { N3.xf(n, "ADBE Rotate Z").setValue(o.rot); }
    if (o.tape) { MM.tape(S, n, 0, -o.h / 2 - bw + 6, 200, (o.rot || 0) > 0 ? -6 : 5, -3); }
    return n;
};
// Round face photo with a white ring and a name tag beside it. o: {d, t, from, name, role, side}
MM.face = function (S, parent, x, y, o) {
    o = o || {};
    var d = o.d || 260, n = MM.rig(S, "Face", parent, [x, y, o.z || -20], o.t || 0, o.from || "scale", { s0: 1, d: 0.5 }), ring, im;
    ring = N3.ellipse(S.ctx, { name: "Face ring", cx: 0, cy: 0, d: d + 16, fill: "#FFFFFF" });
    LOOK.dropShadow(ring, "Soft shadow", { color: "#4A1E28", opacity: 0.3, dist: 16, soft: 40 });
    SAT.hang(ring, n, 0);
    im = N3.image(S.ctx, o.bw ? "hische_face_bw.png" : "hische_face.png", { name: "Face photo", cx: 0, cy: 0, w: d, h: d, fit: "stretch" });
    SAT.hang(im, n, -1);
    if (o.name) { MM.tag(S, n, o.name, (o.side === "left" ? -1 : 1) * (d / 2 + 30 + o.name.length * 11), -18, { fs: 28, t: (o.t || 0) + 0.25, z: -2 }); }
    if (o.role) { MM.tag(S, n, o.role, (o.side === "left" ? -1 : 1) * (d / 2 + 30 + o.role.length * 8), 40, { fs: 20, bg: MM.C.coral, t: (o.t || 0) + 0.4, z: -2 }); }
    return n;
};

// ---------------------------------------------------------------- articles (documentary treatment)
// Full article page on a 3D plane: pg = MM.page(...); MM.focus(pg, t0, t1, px, py, zoom) moves the camera so image pixel
// (px, py) sits at frame centre; MM.hl highlights rects (image px) in sync with the VO; MM.ring circles a phrase.
MM.page = function (S, parent, rel, size, o) {
    // the page, its highlights and pen rings live in one flat precomp; only that precomp is tilted in 3D, so the marks
    // can never sort behind the page
    var nm = o.name || "Page", R = MM.rig(S, nm, parent, [0, 0, 0], o.t || 0, o.from || "up", { off: o.off || 500, d: o.d || 0.9 }),
        P = SAT.nul(S, nm + " camera", [0, 0, 0], R), s = o.w / size[0], W = Math.round(size[0] * s), H = Math.round(size[1] * s), pc, L, img;
    pc = app.project.items.addComp("SAT " + S.id + " \u00B7 " + nm, W, H, 1, S.T, SAT.FPS);
    pc.parentFolder = SAT.folders.pre; AEL.created("precomp", pc.name);
    img = pc.layers.add(N3.file(rel)); img.name = nm + " image";
    N3.xf(img, "ADBE Scale").setValue([s * 100, s * 100]); N3.pos(img).setValue([W / 2, H / 2]);
    L = S.comp.layers.add(pc); L.name = nm; L.threeDLayer = true;
    LOOK.dropShadow(L, "Soft shadow", { color: "#4A1E28", opacity: 0.32, dist: 34, soft: 90 });
    N3.parent(L, P); N3.pos(L).setValue([0, 0, 0]);
    if (o.tilt) { N3.xf(R, "ADBE Orientation").setValue(o.tilt); }
    return { R: R, P: P, L: img, layer: L, comp: pc, s: s, iw: size[0], ih: size[1], S: S };
};
MM.focus = function (pg, t0, t1, px, py, z, inf) {
    var p = N3.pos(pg.P), sc = N3.xf(pg.P, "ADBE Scale"), dx = (px - pg.iw / 2) * pg.s, dy = (py - pg.ih / 2) * pg.s;
    if (t1 <= t0) { p.setValue([-dx * z, -dy * z, 0]); sc.setValue([z * 100, z * 100, z * 100]); return; }
    SAT.k(p, t0, t1, p.valueAtTime(t0, false), [-dx * z, -dy * z, 0], inf || [55, 88]);
    SAT.k(sc, t0, t1, sc.valueAtTime(t0, false), [z * 100, z * 100, z * 100], inf || [55, 88]);
};
// Highlighter: one swipe per rect, spread over t0..t1 (translucent, so the text shows through).
// mode "under" (dark pages): a coral bar sweeps under the line instead of a multiply highlight.
MM.hl = function (pg, rects, t0, t1, color, mode) {
    var C = pg.comp, n = rects.length, i, r, l, gi, dur = (t1 - t0) / n, pad = 10, under = mode === "under";
    for (i = 0; i < n; i++) {
        r = rects[i];
        l = N3.shapeLayer(C, N3.uname(C, under ? "Underline" : "Highlighter")); gi = N3.addGroup(l, "Mark");
        N3.addRect(l, gi, r[2] + pad * 2, under ? 10 : r[3] * 1.05, under ? 5 : 6, [(r[2] + pad * 2) / 2, 0]);
        N3.addFill(l, gi, color || (under ? "#FF4D6A" : "#FF5C78"));
        N3.parent(l, pg.L); N3.pos(l).setValue([r[0] - pad, under ? r[1] + r[3] + 8 : r[1] + r[3] / 2]);
        if (!under) { N3.xf(l, "ADBE Opacity").setValue(45); }
        SAT.k(N3.xf(l, "ADBE Scale"), t0 + i * dur, t0 + (i + 1) * dur, [0, 100, 100], [100, 100, 100], [30, 80]);
    }
};
// Hand-drawn red pen ring around a rect (image px on a page, or local px on a null when pg.L is a null).
MM.ring = function (S, parentLayer, cx, cy, rw, rh, t, o) {
    o = o || {};
    var V = [], I = [], O = [], k, a, n = 14, turns = 1.12, rr, l, gi, sw = o.sw || 7;
    for (k = 0; k <= n; k++) {
        a = -2.4 + (k / n) * Math.PI * 2 * turns; rr = 1 + 0.06 * Math.sin(k * 1.7);
        V.push([Math.cos(a) * rw * rr, Math.sin(a) * rh * rr]);
        I.push([Math.sin(a) * rw * 0.22, -Math.cos(a) * rh * 0.22]); O.push([-Math.sin(a) * rw * 0.22, Math.cos(a) * rh * 0.22]);
    }
    var C = parentLayer.containingComp;
    l = N3.shapeLayer(C, N3.uname(C, "Pen ring")); gi = N3.addGroup(l, "Ring");
    N3.addPath(l, gi, V, I, O, false); N3.addTrim(l, gi); N3.addStroke(l, gi, o.color || "#E0313F", sw, undefined, true);
    if (parentLayer.threeDLayer) { l.threeDLayer = true; N3.parent(l, parentLayer); N3.pos(l).setValue([cx, cy, -1]); }
    else { N3.parent(l, parentLayer); N3.pos(l).setValue([cx, cy]); }
    SAT.k(N3.gc(l, gi).property(2).property("ADBE Vector Trim End"), t, t + (o.d || 0.45), 0, 100, [30, 80]);
    return l;
};

// ---------------------------------------------------------------- UI pieces
// Browser window with a screenshot. o: {w, h, url, x, y, z, t, from, tilt}
MM.browser = function (S, parent, rel, o) {
    var nm = o.name || "Browser", n = MM.rig(S, nm, parent, [o.x || 0, o.y || 0, o.z || 0], o.t || 0, o.from || "up", o), bar = 54, win, l, i;
    win = N3.box(S.ctx, { name: nm + " window", cx: 0, cy: 0, w: o.w, h: o.h + bar, r: 18, fill: "#FFFFFF" });
    LOOK.dropShadow(win, "Soft shadow", { color: "#4A1E28", opacity: 0.3, dist: 30, soft: 80 });
    SAT.hang(win, n, 0);
    l = N3.box(S.ctx, { name: nm + " bar", cx: 0, cy: -(o.h + bar) / 2 + bar / 2, w: o.w, h: bar, r: 18, fill: "#F1ECEC" }); SAT.hang(l, n, -1);
    for (i = 0; i < 3; i++) { l = N3.ellipse(S.ctx, { name: "Dot " + (i + 1), cx: -o.w / 2 + 30 + i * 26, cy: -(o.h + bar) / 2 + bar / 2, d: 14, fill: ["#FF6159", "#FFBD2E", "#28C941"][i] }); SAT.hang(l, n, -2); }
    if (o.url) {
        l = N3.box(S.ctx, { name: nm + " url", cx: 0, cy: -(o.h + bar) / 2 + bar / 2, w: Math.min(o.w * 0.5, 620), h: 32, r: 16, fill: "#FFFFFF" }); SAT.hang(l, n, -2);
        l = SAT.text(S, o.url, { name: nm + " url text", x: 0, cy: -(o.h + bar) / 2 + bar / 2, fs: 18, wt: 500, color: MM.C.soft, align: "center" }); SAT.hang(l, n, -3);
    }
    l = N3.image(S.ctx, rel, { name: nm + " page", cx: 0, cy: bar / 2, w: o.w, h: o.h, fit: o.fit || "cover" }); SAT.hang(l, n, -1);
    if (o.tilt) { N3.xf(n, "ADBE Orientation").setValue(o.tilt); }
    return n;
};
// Reaction card: a quoted reaction from the press coverage, with a red "!" badge. o: {t, rot, z, fs}
MM.react = function (S, parent, text, x, y, o) {
    o = o || {};
    var fs = o.fs || 40, w = String(text).length * fs * 0.56 + 150, h = fs * 2.3, n = SAT.nul(S, "Reaction " + text, [x, y, o.z || 0], parent || S.M), b, c, t;
    b = N3.box(S.ctx, { name: "Reaction card", cx: 0, cy: 0, w: w, h: h, r: h / 2, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.26, dist: 16, soft: 40 });
    c = N3.ellipse(S.ctx, { name: "Reaction badge", cx: -w / 2 + h / 2, cy: 0, d: h * 0.62, fill: MM.C.alarm });
    t = SAT.text(S, "!", { name: "Badge mark", x: -w / 2 + h / 2, cy: 0, fs: h * 0.42, wt: 900, color: "#FFFFFF", align: "center" });
    SAT.hang(b, n, 0); SAT.hang(c, n, -1); SAT.hang(t, n, -2);
    t = SAT.text(S, text, { name: "Reaction text", x: -w / 2 + h + 6, cy: 0, fs: fs, wt: 700, color: MM.C.ink }); SAT.hang(t, n, -1);
    MM.pop(n, o.t || 0, 0.35);
    SAT.k(N3.xf(n, "ADBE Rotate Z"), o.t || 0, (o.t || 0) + 0.4, (o.rot || 0) - 12, o.rot || 0, SAT.OUT);
    return n;
};

// Article pages captured from the web (image px rects of the lines used on screen; 2x screenshots).
MM.PAGES = {
    wired: { img: "web/page_wired.jpg", size: [2560, 3240], head1: [140, 1560, 925, 82], head2: [140, 1672, 867, 82], hate: [395, 1672, 612, 82],
        dek: [468, 1874, 656, 44], para1: [318, 2950, 1060, 48], para2: [428, 3000, 840, 48], para3: [676, 3054, 568, 46] },
    inq: { img: "web/page_inq.jpg", size: [2560, 1400], head1: [300, 812, 1740, 84], head2: [300, 912, 1460, 88], dek: [300, 1042, 1730, 52] },
    sfc: { img: "web/page_sfc.jpg", size: [1340, 5500], head: [70, 120, 1200, 200], disgusted: [192, 4016, 168, 46], ethics: [282, 4082, 102, 46] }
};
// White speech callout with a tail, text typed on. o: {w, fs, t, tail: "left" | "right" | "down"}
MM.callbox = function (S, parent, text, x, y, o) {
    o = o || {};
    var fs = o.fs || 44, lines = String(text).split("\n"), w = o.w || 560, h = lines.length * fs * 1.25 + 60, n = SAT.nul(S, "Callout box", [x, y, o.z || -20], parent || S.M), b, tl, t;
    b = N3.box(S.ctx, { name: "Callout bubble", cx: 0, cy: 0, w: w, h: h, r: 28, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: "#4A1E28", opacity: 0.25, dist: 16, soft: 40 });
    tl = N3.path(S.ctx, { name: "Callout tail", verts: [[-30, h / 2 - 4], [30, h / 2 - 4], [o.tail === "left" ? -60 : 60, h / 2 + 46]], closed: true, fill: "#FFFFFF" });
    SAT.hang(b, n, 0); SAT.hang(tl, n, 0);
    t = SAT.text(S, text, { name: "Callout text", x: 0, cy: -(lines.length - 1) * fs * 0.62, fs: fs, wt: 800, lh: fs * 1.25, color: MM.C.ink, align: "center" });
    SAT.hang(t, n, -1);
    N3.typeOn(t, (o.t || 0) + 0.15, (o.t || 0) + 0.15 + (o.type || 1.0));
    MM.pop(n, o.t || 0, 0.4);
    return n;
};
