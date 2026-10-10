// lab_kit.jsx: building blocks for the style-lab sample ("Aurelo", a fictional AI workspace app).
// Dark glass look on top of lib/look.jsx: deep navy gradient, violet / cyan / pink glows, light sweeps, a two-node
// camera with depth of field in every scene, CALM / EXPO eases (no overshoot). Needs lib/ae_lib, lib/n3_core, lib/icons, lib/look.

var LAB = LAB || {};
LAB.SCENES = [];
LAB.P = {
    white: "#FFFFFF", mute: "#AEB6E8", dim: "#6F78B8", violet: "#7C5CFF", cyan: "#38D3F2", pink: "#FF5FA2", green: "#3DDC97",
    gTL: "#2C3478", gTR: "#1E255C", gBL: "#181D4C", gBR: "#11153C", line: "#323A7A", deep: "#02030C"
};

// ---------------------------------------------------------------- scene comps
LAB.scene = function (id, title, T, cam) {
    var c = app.project.items.addComp("LAB " + id + " " + title, 1920, 1080, 1, T, N3.FPS), S;
    c.parentFolder = LAB.folders.scenes; c.motionBlur = true;
    try { c.renderer = "ADBE Advanced 3d"; } catch (e) { AEL.log("renderer: " + e); }
    AEL.created("comp", c.name);
    LOOK.controls(c);
    LAB.bg(c);
    if (cam) { LOOK.camera(c, { t0: 0, t1: T, from: cam.from, to: cam.to }); }
    S = { comp: c, T: T, id: id, ctx: { comp: c, ox: 960, oy: 540, parent: null, slot: "pre", S: null } };
    return S;
};
// Deep navy 4-colour gradient plus three glowing orbs far back (Add blend, depth-blurred by the camera).
LAB.bg = function (c) {
    var bg = c.layers.addSolid([0, 0, 0], "BG gradient", 1920, 1080, 1, c.duration), X, i, l;
    LOOK.gradient4(bg, 0, 0, ["#0F1548", "#080B24", "#0A0E30", "#140C36"]);
    X = bg.property("ADBE Effect Parade").property("Glass fill");
    X.property("ADBE 4ColorGradient-0001").setValue([0, 0]); X.property("ADBE 4ColorGradient-0003").setValue([1920, 0]);
    X.property("ADBE 4ColorGradient-0005").setValue([0, 1080]); X.property("ADBE 4ColorGradient-0007").setValue([1920, 1080]);
    LOOK.orbs(c, [
        { color: LAB.P.violet, d: 1000, x: 420, y: 300, z: 1800, opacity: 40, drift: [90, 50], period: 17 },
        { color: LAB.P.cyan, d: 760, x: 1560, y: 820, z: 2000, opacity: 32, drift: [-70, 40], period: 21 },
        { color: LAB.P.pink, d: 560, x: 1600, y: 160, z: 2200, opacity: 22, drift: [50, -60], period: 15 }
    ]);
    for (i = 1; i <= c.numLayers; i++) { l = c.layer(i); if (l.name.indexOf("Light orb") === 0) { l.blendingMode = BlendingMode.ADD; } }
    bg.moveToEnd();
};
// A precomp placed in the scene as a 3D layer (collapsed). o: {x, y, z, rx, ry} relative to the frame centre.
LAB.group = function (S, name, w, h, o) {
    var pc = app.project.items.addComp("LAB " + S.id + " \u00B7 " + name, w, h, 1, S.T, N3.FPS), l;
    o = o || {};
    pc.parentFolder = LAB.folders.pre;
    AEL.created("precomp", pc.name);
    l = S.comp.layers.add(pc); l.name = name;
    l.collapseTransformation = true; l.threeDLayer = true;
    N3.pos(l).setValue([960 + (o.x || 0), 540 + (o.y || 0), o.z || 0]);
    if (o.rx) { N3.xf(l, "ADBE Rotate X").setValue(o.rx); }
    if (o.ry) { N3.xf(l, "ADBE Rotate Y").setValue(o.ry); }
    return { ctx: { comp: pc, ox: w / 2, oy: h / 2, parent: null, slot: "pre", S: null }, layer: l, comp: pc, w: w, h: h };
};

// ---------------------------------------------------------------- motion
LAB.softBlur = function (layer) {
    var P = layer.property("ADBE Effect Parade"), f = P.property("Soft blur");
    if (!f) { LOOK.boxBlur(layer, 0, "Soft blur"); }
    return layer.property("ADBE Effect Parade").property("Soft blur").property("ADBE Box Blur2-0001");
};
// EXPO entrance: from deeper / lower / blurred to the layer's current place. o: {dy, dz, rx, ry, blur, dur}
LAB.enter = function (layer, t, o) {
    var p = N3.pos(layer), v = p.value, d, is3 = layer.threeDLayer;
    o = o || {}; d = o.dur || 1.0;
    LOOK.key(p, t, t + d, is3 ? [v[0] + (o.dx || 0), v[1] + (o.dy === undefined ? 60 : o.dy), v[2] + (o.dz === undefined ? 400 : o.dz)] : [v[0] + (o.dx || 0), v[1] + (o.dy === undefined ? 40 : o.dy), v[2] || 0], v, LOOK.EXPO);
    LOOK.key(N3.xf(layer, "ADBE Opacity"), t, t + d * 0.6, 0, 100, LOOK.CALM);
    LOOK.key(LAB.softBlur(layer), t, t + d * 0.7, o.blur === undefined ? 24 : o.blur, 0, LOOK.CALM);
    if (is3 && o.ry) { LOOK.key(N3.xf(layer, "ADBE Rotate Y"), t, t + d * 1.1, N3.xf(layer, "ADBE Rotate Y").value + o.ry, N3.xf(layer, "ADBE Rotate Y").value, LOOK.EXPO); }
    if (is3 && o.rx) { LOOK.key(N3.xf(layer, "ADBE Rotate X"), t, t + d * 1.1, N3.xf(layer, "ADBE Rotate X").value + o.rx, N3.xf(layer, "ADBE Rotate X").value, LOOK.EXPO); }
    return layer;
};
LAB.exit = function (layer, t, d) {
    d = d || 0.6;
    LOOK.key(N3.xf(layer, "ADBE Opacity"), t, t + d, 100, 0, LOOK.CALM);
    LOOK.key(LAB.softBlur(layer), t, t + d, 0, 20, LOOK.CALM);
    return layer;
};
// Pop in (EXPO, no overshoot) for small elements in a 2D precomp.
LAB.pop = function (layer, t, d) {
    var s = N3.xf(layer, "ADBE Scale"), v = s.value;
    d = d || 0.55;
    LOOK.key(s, t, t + d, [0, 0, v[2]], v, LOOK.EXPO);
    LOOK.key(N3.xf(layer, "ADBE Opacity"), t, t + d * 0.5, 0, 100, LOOK.CALM);
    return layer;
};

// ---------------------------------------------------------------- elements
LAB.text = function (ctx, str, o) { o.color = o.color || LAB.P.white; return N3.text(ctx, str, o); };
LAB.grad = function (layer, fs, c0, c1) { return LOOK.ramp(layer, [0, -fs], c0 || LAB.P.white, [0, fs * 0.25], c1 || "#B9C2FF", "Gradient text"); };
// Headline in the scene comp: gradient text, blur-in per word, 3D at z (default -200, in front of the cards).
LAB.headline = function (S, str, o) {   // o.flat: stays 2D (drawn over the 3D scene, unaffected by the camera)
    var p, l = LAB.text(S.ctx, str, { name: o.name || "Headline", x: o.x || 0, top: o.top, fs: o.fs || 64, wt: o.wt || 700, ls: o.ls === undefined ? -0.03 : o.ls, align: o.align || "center", color: LAB.P.white });
    LAB.grad(l, o.fs || 64, LAB.P.white, o.to || "#B9C2FF");
    N3.unitReveal(l, { times: [o.t], based: "words", stagger: o.stagger || 0.14, dy: o.dy || 34, blur: 12, lin: o.lin || 0.8 });
    if (!o.flat) { l.threeDLayer = true; p = N3.pos(l).value; N3.pos(l).setValue([p[0], p[1], o.z === undefined ? -200 : o.z]); }
    if (o.tout) { LAB.exit(l, o.tout, 0.6); }
    return l;
};
// Dark glass panel: gradient body (92%), rim fading down, optional light sweep (Add). o: {name, cx, cy, w, h, r, tSweep, main}
LAB.panel = function (ctx, o) {
    var body = LOOK.glassCard(ctx, { name: o.name, cx: o.cx || 0, cy: o.cy || 0, w: o.w, h: o.h, r: o.r || 28, rim: "#C9D0FF",
        colors: o.colors || [LAB.P.gTL, LAB.P.gTR, LAB.P.gBL, LAB.P.gBR], tSweep: o.tSweep, sweepCtl: o.main ? LOOK.refIn(o.main, "Sweep %") : null }), sw;
    N3.xf(body, "ADBE Opacity").setValue(o.opacity || 94);
    sw = ctx.comp.layer(o.name + " sweep");
    if (sw) { sw.blendingMode = BlendingMode.ADD; }
    return body;
};
// Brand shadow for 3D groups on dark: tight + wide near-black.
LAB.shadow = function (layer) {
    LOOK.dropShadow(layer, "Shadow tight", { color: LAB.P.deep, opacity: 0.45, dist: 6, soft: 18 }, LOOK.ref("Shadow %"));
    LOOK.dropShadow(layer, "Shadow wide", { color: LAB.P.deep, opacity: 0.55, dist: 30, soft: 110 }, LOOK.ref("Shadow %"));
};
// Coloured glow halo (zero-distance Drop Shadow); keyed up at t. Returns the opacity property.
LAB.glow = function (layer, color, soft, t, level, main) {
    var h = LOOK.halo(layer, color, soft, main ? LOOK.refIn(main, "Glow %") : LOOK.ref("Glow %"));
    if (t !== null && t !== undefined) { LOOK.key(h, t, t + 0.6, 0, level || 160, LOOK.EXPO); }
    return h;
};
// Pill with a glow. o: {name, x|cx, top|cy, fs, bg, color, glow, t, main}
LAB.pill = function (ctx, str, o) {
    var c = N3.chip(ctx, str, { name: o.name, x: o.x, cx: o.cx, top: o.top, cy: o.cy, fs: o.fs || 18, wt: 600, bg: o.bg || LAB.P.violet, color: o.color || LAB.P.white, padX: o.padX || 18, padY: o.padY || 9 });
    if (o.glow !== false) { LAB.glow(c.bg, o.bg || LAB.P.violet, o.soft || 40, o.t, o.level || 170, o.main); }
    if (o.t !== null && o.t !== undefined) { N3.show(c.bg, o.t, null, 12, { lin: 0.5, blur: 8 }); N3.show(c.text, o.t, null, 12, { lin: 0.5, blur: 8 }); }
    return c;
};
// Number that counts from a to b between t0 and t1 (ease-out). Source Text expression; style stays editable.
LAB.counter = function (layer, a, b, t0, t1, pre, suf, dec) {
    AEL.expr(layer.property("ADBE Text Properties").property("ADBE Text Document"),
        "var u = Math.min(1, Math.max(0, (time - " + t0 + ") / " + (t1 - t0) + "));\nu = 1 - Math.pow(1 - u, 4);\n" +
        "\"" + (pre || "") + "\" + (" + a + " + (" + (b - a) + ") * u).toFixed(" + (dec || 0) + ") + \"" + (suf || "") + "\"");
    return layer;
};
// Progress ring: faint track + stroke drawn with Trim Paths from 0 to pct between t0 and t1.
LAB.ring = function (ctx, o) {
    var tr = N3.ellipse(ctx, { name: o.name + " track", cx: o.cx, cy: o.cy, d: o.d, stroke: LAB.P.line, sw: o.sw || 10 }), l, gi;
    l = N3.shapeLayer(ctx.comp, o.name); gi = N3.addGroup(l, "Ring");
    N3.addEllipse(l, gi, o.d, o.d); N3.addTrim(l, gi); N3.addStroke(l, gi, o.color || LAB.P.cyan, o.sw || 10, undefined, true);
    N3.pos(l).setValue(N3.P(ctx, o.cx, o.cy)); N3.xf(l, "ADBE Rotate Z").setValue(-90);
    LOOK.key(N3.gc(l, gi).property(2).property("ADBE Vector Trim End"), o.t0, o.t1, 0, o.pct, LOOK.CALM);
    return l;
};
// Bar growing up from its base (EXPO). o: {name, x (centre), base (y of the bottom), w, h, color, t}
LAB.bar = function (ctx, o) {
    var l = N3.shapeLayer(ctx.comp, N3.uname(ctx.comp, o.name || "Bar")), gi = N3.addGroup(l, "Bar");
    N3.addRect(l, gi, o.w, o.h, Math.min(8, o.w / 2), [0, -o.h / 2]); N3.addFill(l, gi, o.color || LAB.P.violet);
    N3.pos(l).setValue(N3.P(ctx, o.x, o.base));
    LOOK.key(N3.xf(l, "ADBE Scale"), o.t, o.t + 0.9, [100, 0], [100, 100], LOOK.EXPO);
    return l;
};
// Line chart drawn on with Trim Paths, with a glow. o: {name, pts:[[x,y]...] ctx coords, color, t, d}
LAB.chartLine = function (ctx, o) {
    var v = [], i, l;
    for (i = 0; i < o.pts.length; i++) { v.push(N3.P(ctx, o.pts[i][0], o.pts[i][1])); }
    for (i = 0; i < v.length; i++) { v[i] = [v[i][0] - ctx.ox, v[i][1] - ctx.oy]; }
    l = N3.path(ctx, { name: o.name || "Chart line", verts: v, closed: false, stroke: o.color || LAB.P.cyan, sw: o.sw || 4, trim: true });
    LOOK.key(N3.trimOf(l).property("ADBE Vector Trim End"), o.t, o.t + (o.d || 1.6), 0, 100, LOOK.CALM);
    LAB.glow(l, o.color || LAB.P.cyan, 24, o.t, 200, o.main);
    return l;
};
// App tile: rounded square with an accent gradient, white icon and a soft glow. o: {name, cx, cy, s, icon, c0, c1, main}
LAB.tile = function (ctx, o) {
    var b = N3.box(ctx, { name: o.name, cx: o.cx, cy: o.cy, w: o.s, h: o.s, r: o.s * 0.26, fill: "#FFFFFF" }), ic;
    LOOK.gradient4(b, o.s, o.s, [o.c0, o.c0, o.c1, o.c1]);
    ic = N3.icon(ctx, o.icon, { name: o.name + " icon", cx: o.cx, cy: o.cy, size: o.s * 0.46, color: "#FFFFFF", sw: 2.4 });
    LAB.glow(b, o.c0, 34, null, 0, o.main).setValue(120);
    return { box: b, icon: ic };
};
// Logo: ring drawn on + wordmark. Returns {ring, word}. o: {cx, cy, d, fs, t, main}
LAB.logo = function (ctx, o) {
    var r = N3.shapeLayer(ctx.comp, "Logo ring"), gi = N3.addGroup(r, "Ring"), w;
    N3.addEllipse(r, gi, o.d, o.d); N3.addTrim(r, gi); N3.addStroke(r, gi, "#FFFFFF", o.d * 0.11, undefined, true);
    N3.pos(r).setValue(N3.P(ctx, o.cx, o.cy)); N3.xf(r, "ADBE Rotate Z").setValue(-120);
    LOOK.ramp(r, [-o.d / 2, -o.d / 2], LAB.P.cyan, [o.d / 2, o.d / 2], LAB.P.violet, "Ring gradient");
    LOOK.key(N3.gc(r, gi).property(2).property("ADBE Vector Trim End"), o.t, o.t + 1.2, 0, 100, LOOK.CALM);
    LOOK.key(N3.xf(r, "ADBE Rotate Z"), o.t, o.t + 1.6, -220, -120, LOOK.EXPO);
    LAB.glow(r, LAB.P.violet, o.d * 0.5, o.t + 0.6, 190, o.main);
    w = LAB.text(ctx, "aurelo", { name: "Wordmark", x: o.cx + o.d * 0.75, cy: o.cy, fs: o.fs, wt: 700, ls: -0.04 });
    LAB.grad(w, o.fs, "#FFFFFF", "#C7CDFF");
    N3.unitReveal(w, { times: [o.t + 0.5], based: "chars", stagger: 0.05, dy: 30, blur: 10, lin: 0.6 });
    return { ring: r, word: w };
};

// ---------------------------------------------------------------- main sequence
// Scene layer in the main comp with soft blur-scale transitions. in/out: overlap seconds (0 = hard start/end).
LAB.place = function (main, S, tin, xin, xout) {
    var l = main.layers.add(S.comp), s, op, b, tend = tin + S.T;
    l.startTime = tin; l.name = S.comp.name.replace("LAB ", "");
    s = N3.xf(l, "ADBE Scale"); op = N3.xf(l, "ADBE Opacity"); b = LAB.softBlur(l);
    if (xin) {
        LOOK.key(op, tin, tin + xin, 0, 100, LOOK.CALM);
        LOOK.key(s, tin, tin + xin * 1.6, [94, 94], [100, 100], LOOK.EXPO);
        LOOK.key(b, tin, tin + xin, 30, 0, LOOK.CALM);
    }
    if (xout) {
        LOOK.key(op, tend - xout, tend, 100, 0, LOOK.CALM);
        LOOK.key(s, tend - xout * 1.4, tend, [100, 100], [106, 106], LOOK.CALM);
        LOOK.key(b, tend - xout, tend, 0, 30, LOOK.CALM);
    }
    l.moveToBeginning();
    return l;
};
