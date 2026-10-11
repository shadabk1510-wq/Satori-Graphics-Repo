// sat_kit.jsx: building blocks in the user's own style (references/house-style.md), from the SaaS Style 1 and 2 breakdowns.
// Null rigs carry the moves; easing is the user's speed-ramp shape (tall narrow spikes, no overshoot); one aurora
// gradient keeps drifting behind every cut; the hook is fast, the explanation is calm.

var SAT = SAT || {};
SAT.SCENES = [];
SAT.FPS = 30000 / 1001;
SAT.P = { pink: "#F7C6D1", blush: "#FCE6EA", lav: "#B79CF6", lavD: "#8C6FF0", mint: "#8DE6CE", mintD: "#2BC496", indigo: "#5B5CE2", indigoD: "#34359E",
    white: "#FFFFFF", ink: "#22314A", soft: "#6E7C92", green: "#22C47A", yellow: "#FFD45E", teal: "#0F8F74" };
// ease shapes measured from the user's graph editor
SAT.SNAP = [92, 92];   // symmetric spike: hangs, snaps through the middle, settles (transitions, rig moves)
SAT.OUT = [12, 96];    // leaves fast, long settle (entrances)
SAT.IN = [96, 12];     // builds slowly, stops sharp (exits, whips)
SAT.CALM = [70, 70];   // explanation drifts and pushes
SAT.k = function (prop, t0, t1, v0, v1, inf) { LOOK.key(prop, t0, t1, v0, v1, inf || SAT.CALM); return prop; };

SAT.scene = function (id, title, T) {
    var c = app.project.items.addComp("SAT " + id + " " + title, 1920, 1080, 1, T, SAT.FPS);
    c.parentFolder = SAT.folders.scenes; c.motionBlur = true;
    AEL.created("comp", c.name);
    return { id: id, comp: c, T: T, ctx: { comp: c, ox: 960, oy: 540, parent: null, slot: "pre", S: null } };
};
// 3D null with its anchor at 0 (children use plain offsets). pos is absolute, or local when parent is given.
SAT.nul = function (S, name, pos, parent) {
    var n = S.comp.layers.addNull(S.T);
    n.name = name; n.threeDLayer = true; n.label = 2;
    N3.xf(n, "ADBE Anchor Point").setValue([0, 0, 0]);
    if (parent) { N3.parent(n, parent); }
    N3.pos(n).setValue(pos);
    return n;
};
// Hang a layer built in frame coordinates (offsets from the frame centre) under a 3D null, keeping that offset.
SAT.hang = function (layer, parent, z) {
    var p = N3.pos(layer).value;
    layer.threeDLayer = true;
    N3.parent(layer, parent);
    N3.pos(layer).setValue([p[0] - 960, p[1] - 540, z || 0]);
    return layer;
};
SAT.text = function (S, str, o) {
    return N3.text(S.ctx, str, { name: o.name, x: o.x || 0, top: o.top, cy: o.cy, fs: o.fs, wt: o.wt || 600, ls: o.ls === undefined ? -0.02 : o.ls,
        lh: o.lh, color: o.color || SAT.P.white, align: o.align || "left" });
};
SAT.grad = function (l, fs, c0, c1) { return LOOK.ramp(l, [0, -fs], c0, [0, fs * 0.3], c1, "Gradient Ramp"); };
// Offset reveal like the user's "IN" animator: units fade up from blur as the Range Selector Offset runs 0 -> 100.
SAT.reveal = function (l, t0, t1, o) {
    var ai = l.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator").propertyIndex,
        an = function () { return l.property("ADBE Text Properties").property("ADBE Text Animators").property(ai); }, sel;
    o = o || {};
    an().name = "IN";
    an().property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");
    an().property("ADBE Text Animator Properties").property("ADBE Text Opacity").setValue(0);
    an().property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");
    an().property("ADBE Text Animator Properties").property("ADBE Text Position 3D").setValue([o.dx || 0, o.dy === undefined ? 36 : o.dy, 0]);
    an().property("ADBE Text Animator Properties").addProperty("ADBE Text Blur");
    an().property("ADBE Text Animator Properties").property("ADBE Text Blur").setValue([24, 24]);
    an().property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    sel = an().property("ADBE Text Selectors").property(1);
    sel.property("ADBE Text Range Advanced").property("ADBE Text Range Type2").setValue(o.chars ? 2 : 3);
    SAT.k(sel.property("ADBE Text Percent Offset"), t0, t1, 0, 100, o.inf || SAT.OUT);
    return l;
};
SAT.pop = function (l, t, d, from) {
    var s = N3.xf(l, "ADBE Scale"), v = s.value;
    SAT.k(s, t, t + (d || 0.45), [v[0] * (from || 0), v[1] * (from || 0), v[2]], v, SAT.OUT);
    SAT.k(N3.xf(l, "ADBE Opacity"), t, t + (d || 0.45) * 0.5, 0, 100, SAT.CALM);
    return l;
};
SAT.fade = function (l, t, d, a, b) { return SAT.k(N3.xf(l, "ADBE Opacity"), t, t + (d || 0.4), a === undefined ? 0 : a, b === undefined ? 100 : b, SAT.CALM); };

// Glossy fake-extruded tile (like the user's Shape Layer 5-11 stack): side layers stacked in z behind a gradient face.
// o: {name, x, y, z (local to parent), s (size), c0, c1 (face colours), dark (side colour), icon | label, depth}
SAT.tile = function (S, parent, o) {
    var n = SAT.nul(S, o.name, [o.x || 0, o.y || 0, o.z || 0], parent), i, l, d = o.depth || 7, s = o.s, r = s * 0.22;
    for (i = d - 1; i >= 1; i--) {
        l = N3.box(S.ctx, { name: o.name + " side " + i, cx: 0, cy: 0, w: s, h: s, r: r, fill: o.dark });
        SAT.hang(l, n, i * 3.2);
    }
    l = N3.box(S.ctx, { name: o.name + " face", cx: 0, cy: 0, w: s, h: s, r: r, fill: "#FFFFFF" });
    LOOK.gradient4(l, s, s, [SAT.mix(o.c0, "#FFFFFF", 0.28), o.c0, o.c1, SAT.mix(o.c1, o.dark, 0.35)]);
    SAT.hang(l, n, 0);
    l = N3.box(S.ctx, { name: o.name + " rim", cx: 0, cy: 0, w: s - 3, h: s - 3, r: r, stroke: "#FFFFFF", sw: 2.5 });
    N3.xf(l, "ADBE Opacity").setValue(55); SAT.hang(l, n, -0.6);
    if (o.icon) { l = N3.icon(S.ctx, o.icon, { name: o.name + " icon", cx: 0, cy: 0, size: s * 0.46, color: "#FFFFFF", sw: 2.6 }); }
    else { l = SAT.text(S, o.label, { name: o.name + " label", x: 0, cy: 0, fs: s * 0.34, wt: 600, align: "center" }); }
    SAT.hang(l, n, -1.2);
    return n;
};
SAT.mix = function (a, b, u) {
    var x = N3.hex(a), y = N3.hex(b), i, o = "#", h;
    for (i = 0; i < 3; i++) { h = Math.round((x[i] + (y[i] - x[i]) * u) * 255).toString(16); o += h.length < 2 ? "0" + h : h; }
    return o.toUpperCase();
};
// Glass panel/pill: soft white fill, white rim, tinted shadow.
SAT.glass = function (S, o) {
    var l = N3.box(S.ctx, { name: o.name, cx: o.cx || 0, cy: o.cy || 0, w: o.w, h: o.h, r: o.r, stroke: "#FFFFFF", sw: o.sw || 2, fill: "#FFFFFF", fillOpacity: o.fill === undefined ? 38 : o.fill });
    if (o.shadow !== false) { LOOK.dropShadow(l, "Soft shadow", { color: o.tint || "#6C5BB8", opacity: 0.22, dist: 18, soft: 70 }); }
    return l;
};
SAT.rectSize = function (l) { return N3.root(l).property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Rect Size"); };
SAT.rectRound = function (l) { return N3.root(l).property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Rect Roundness"); };

// Pastel sunburst rays (Scene 1 of SaaS Style 1), slowly turning.
SAT.rays = function (S, T) {
    var l = N3.shapeLayer(S.comp, "Sunburst rays"), C = [SAT.P.pink, SAT.P.yellow, SAT.P.mint, SAT.P.lav], i, a, w, gi, R = 1700, b;
    for (i = 0; i < 16; i++) {
        a = (i / 16) * 2 * Math.PI; w = 0.07 + (i % 3) * 0.025;
        gi = N3.addGroup(l, "Ray " + (i + 1));
        N3.addPath(l, gi, [[0, 0], [R * Math.cos(a - w), R * Math.sin(a - w)], [R * Math.cos(a + w), R * Math.sin(a + w)]], null, null, true);
        N3.addFill(l, gi, C[i % 4], 70);
    }
    N3.pos(l).setValue([960, 520]);
    b = N3.blur(l); b.setValue(14);
    SAT.k(N3.xf(l, "ADBE Rotate Z"), 0, T, 0, 14, [10, 10]);
    return l;
};
// Thin design-canvas guides that slide in to frame a headline (lines / lines 2-4 in the user's Scene 2).
SAT.guides = function (S, parent, t, box) {
    var L = [], spec = [[0, box.t, 2400, 2], [0, box.b, 2400, 2], [box.l, 0, 2, 1600], [box.r, 0, 2, 1600]], i, l, p, from;
    for (i = 0; i < 4; i++) {
        l = N3.box(S.ctx, { name: "Guide " + (i + 1), cx: spec[i][0], cy: spec[i][1], w: spec[i][2], h: spec[i][3], fill: "#FFFFFF" });
        N3.xf(l, "ADBE Opacity").setValue(55);
        SAT.hang(l, parent, -20);
        p = N3.pos(l).value; from = i < 2 ? [p[0] + (i ? 1400 : -1400), p[1], p[2]] : [p[0], p[1] + (i === 2 ? -1100 : 1100), p[2]];
        SAT.k(N3.pos(l), t + i * 0.06, t + 0.55 + i * 0.06, from, p, SAT.OUT);
        L.push(l);
    }
    return L;
};
// Checkbox: an outline square; a green tick pops in at t.
SAT.checkbox = function (S, parent, x, y, s, t) {
    var b = N3.box(S.ctx, { name: "Checkbox", cx: x, cy: y, w: s, h: s, r: s * 0.22, stroke: "#FFFFFF", sw: 3 }), f, ic;
    SAT.hang(b, parent, 0);
    f = N3.box(S.ctx, { name: "Checkbox fill", cx: x, cy: y, w: s, h: s, r: s * 0.22, fill: "#FFFFFF" });
    SAT.hang(f, parent, -0.5); SAT.fade(f, t, 0.25, 0, 85);
    ic = N3.icon(S.ctx, "check", { name: "Tick", cx: x, cy: y, size: s * 0.8, color: SAT.P.green, sw: 3.4 });
    SAT.hang(ic, parent, -1); SAT.pop(ic, t, 0.4);
    return b;
};
// Precomp placed as a collapsed 3D layer (rows, cards): opacity and position act on the whole group.
SAT.group = function (S, name, w, h, parent, pos) {
    var pc = app.project.items.addComp("SAT " + S.id + " \u00B7 " + name, w, h, 1, S.T, SAT.FPS), l;
    pc.parentFolder = SAT.folders.pre; AEL.created("precomp", pc.name);
    l = S.comp.layers.add(pc); l.name = name; l.collapseTransformation = true; l.threeDLayer = true;
    if (parent) { N3.parent(l, parent); }
    N3.pos(l).setValue(pos);
    return { layer: l, comp: pc, S: { id: S.id, comp: pc, T: S.T, ctx: { comp: pc, ox: w / 2, oy: h / 2, parent: null, slot: "pre", S: null } } };
};
// Pill label without expressions (safe to hang under a 3D null): width from the text length.
SAT.label = function (S, parent, str, cx, cy, color) {
    var fs = 22, w = 34 + str.length * fs * 0.58, b = N3.box(S.ctx, { name: "Label " + str, cx: cx, cy: cy, w: w, h: 44, r: 22, fill: color }), t;
    t = SAT.text(S, str, { name: "Label text " + str, x: cx, cy: cy, fs: fs, wt: 600, align: "center" });
    SAT.hang(b, parent, -6); SAT.hang(t, parent, -7);
    return [b, t];
};
// Zoom-through exit (the user's 100 -> 352% master-null scale in ~8 frames) and whip exits.
// (values are read at the exit's start, so earlier keys on the same property are respected)
SAT.zoomThrough = function (master, T, d) { var s = N3.xf(master, "ADBE Scale"), t0 = T - (d || 0.27), v = s.valueAtTime(t0, false); SAT.k(s, t0, T, v, [v[0] * 3.52, v[1] * 3.52, v[2] * 3.52], SAT.IN); };
SAT.whip = function (master, T, dx, dy, d) { var p = N3.pos(master), t0 = T - (d || 0.2), v = p.valueAtTime(t0, false); SAT.k(p, t0, T, v, [v[0] + dx, v[1] + dy, v[2]], SAT.IN); };
