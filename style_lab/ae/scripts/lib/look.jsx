// look.jsx: the "glass" look kit (v1), built from the two reference templates (Main = calm blue SaaS, Final = dark glow).
// Needs ae_lib.jsx and noon3_lib.jsx. Everything stays editable: plain effects with named instances, one STYLE CONTROLS
// layer per comp whose sliders scale shadows, glows, sweeps and the camera move.
//
// Values measured from the templates (4K there, halved here for 1080p):
//  - moves: no overshoot. CALM = 70% / 70% influence (Main: opacity 0.67 s, moves 1.0-1.5 s);
//    EXPO = leave fast, settle long: 30% out -> 100% in (Final: 0.4-0.8 s).
//  - shadows are tinted with the brand colour, never black, and stacked: a tight one plus a wide soft one.
//  - glow halo = Drop Shadow at distance 0 with a large softness (Final uses this 17 times).
//  - card fills = 4-Color Gradient, light corner top-left; headline text = Gradient Ramp.
//  - light sweep = a blurred band moving across the card, matted to it.

var LOOK = LOOK || {};

LOOK.CALM = [70, 70];
LOOK.EXPO = [30, 100];
LOOK.CTRL = "STYLE CONTROLS";

// Key a move from rest to rest with the given [out, in] influence.
LOOK.key = function (prop, t0, t1, v0, v1, inf) {
    var k0, k1;
    inf = inf || LOOK.CALM;
    k0 = N3.addKey(prop, t0, v0); k1 = N3.addKey(prop, t1, v1);
    k0 = prop.nearestKeyIndex(t0); k1 = prop.nearestKeyIndex(t1);
    N3.straight(prop, k0); N3.straight(prop, k1);
    N3._ease(prop, k0, "out", N3._zero(prop), inf[0]);
    N3._ease(prop, k1, "in", N3._zero(prop), inf[1]);
};

// One controls layer per comp: sliders other expressions read.
LOOK.controls = function (comp) {
    var l = comp.layer(LOOK.CTRL);
    if (l) { return l; }
    l = comp.layers.addNull(comp.duration);
    l.name = LOOK.CTRL; l.label = 11; l.enabled = false;
    N3.slider(l, "Shadow %", 100); N3.slider(l, "Glow %", 100); N3.slider(l, "Sweep %", 100);
    N3.slider(l, "Camera move %", 100); N3.slider(l, "Depth blur", 60);
    return l;
};
LOOK.ref = function (name) { return "thisComp.layer(\"" + LOOK.CTRL + "\").effect(\"" + name + "\")(1)"; };
// Controls live in the main comp; precomps read them through comp("...").
LOOK.refIn = function (mainName, name) { return "comp(\"" + mainName + "\").layer(\"" + LOOK.CTRL + "\").effect(\"" + name + "\")(1)"; };

LOOK.gradient4 = function (layer, w, h, c) {   // c: [top-left, top-right, bottom-left, bottom-right] hex; w,h = box in layer space centred on 0
    var f = N3.fx(layer, "ADBE 4ColorGradient", "Glass fill"), P = layer.property("ADBE Effect Parade").property(f.name);
    P.property("ADBE 4ColorGradient-0001").setValue([-w / 2, -h / 2]); P.property("ADBE 4ColorGradient-0002").setValue(N3.rgba(c[0]));
    P.property("ADBE 4ColorGradient-0003").setValue([w / 2, -h / 2]); P.property("ADBE 4ColorGradient-0004").setValue(N3.rgba(c[1]));
    P.property("ADBE 4ColorGradient-0005").setValue([-w / 2, h / 2]); P.property("ADBE 4ColorGradient-0006").setValue(N3.rgba(c[2]));
    P.property("ADBE 4ColorGradient-0007").setValue([w / 2, h / 2]); P.property("ADBE 4ColorGradient-0008").setValue(N3.rgba(c[3]));
    return P;
};
LOOK.ramp = function (layer, p0, c0, p1, c1, name) {   // gradient text / strokes: keeps the layer's alpha
    var f = N3.fx(layer, "ADBE Ramp", name || "Gradient"), P = layer.property("ADBE Effect Parade").property(f.name);
    P.property("ADBE Ramp-0001").setValue(p0); P.property("ADBE Ramp-0002").setValue(N3.rgba(c0));
    P.property("ADBE Ramp-0003").setValue(p1); P.property("ADBE Ramp-0004").setValue(N3.rgba(c1));
    return P;
};
// Drop Shadow with a name; strength follows a STYLE CONTROLS slider when ctlExpr is given.
LOOK.dropShadow = function (layer, name, o, ctlExpr) {
    var f = N3.fx(layer, "ADBE Drop Shadow", name), P = layer.property("ADBE Effect Parade").property(f.name);
    P.property("ADBE Drop Shadow-0001").setValue(N3.rgba(o.color));
    P.property("ADBE Drop Shadow-0002").setValue(Math.round(o.opacity * 255));
    P.property("ADBE Drop Shadow-0003").setValue(o.dir === undefined ? 180 : o.dir);
    P.property("ADBE Drop Shadow-0004").setValue(o.dist);
    P.property("ADBE Drop Shadow-0005").setValue(o.soft);
    if (ctlExpr) { AEL.expr(layer.property("ADBE Effect Parade").property(f.name).property("ADBE Drop Shadow-0002"), "value * " + ctlExpr + " / 100"); }
    return layer.property("ADBE Effect Parade").property(f.name);
};
// Brand-tinted double shadow (tight + wide).
LOOK.shadow2 = function (layer, tint, ctlExpr) {
    LOOK.dropShadow(layer, "Shadow tight", { color: tint, opacity: 0.16, dist: 5, soft: 14 }, ctlExpr);
    LOOK.dropShadow(layer, "Shadow wide", { color: tint, opacity: 0.20, dist: 26, soft: 90 }, ctlExpr);
};
// Glow halo (Drop Shadow at distance 0). Returns its Opacity property so it can be keyed (0..255).
LOOK.halo = function (layer, color, soft, ctlExpr) {
    var P = LOOK.dropShadow(layer, "Glow halo", { color: color, opacity: 0, dist: 0, soft: soft }, ctlExpr);
    return layer.property("ADBE Effect Parade").property(P.name).property("ADBE Drop Shadow-0002");
};
LOOK.boxBlur = function (layer, radius, name) {
    var f = N3.fx(layer, "ADBE Box Blur2", name || "Soft blur"), P = layer.property("ADBE Effect Parade").property(f.name);
    P.property("ADBE Box Blur2-0001").setValue(radius); P.property("ADBE Box Blur2-0002").setValue(3);
    return layer.property("ADBE Effect Parade").property(f.name).property("ADBE Box Blur2-0001");
};

// Glass card inside a precomp ctx: gradient body, light rim fading down, and a light sweep at tSweep.
// o: {name, cx, cy, w, h, r, colors:[4 hex], rim, tSweep, sweepCtl (expression for the Sweep % slider)}
LOOK.glassCard = function (ctx, o) {
    var body, rim, matte, band, gi, op, x0, x1;
    body = N3.box(ctx, { name: o.name, cx: o.cx, cy: o.cy, w: o.w, h: o.h, r: o.r, fill: "#FFFFFF" });
    LOOK.gradient4(body, o.w, o.h, o.colors);
    rim = N3.box(ctx, { name: o.name + " rim", cx: o.cx, cy: o.cy, w: o.w - 1, h: o.h - 1, r: o.r, stroke: "#FFFFFF", sw: 1.5 });
    LOOK.ramp(rim, [0, -o.h / 2], o.rim || "#FFFFFF", [0, o.h / 2], o.colors[3], "Rim fade");
    if (o.tSweep !== undefined && o.tSweep !== null) {
        band = N3.box(ctx, { name: o.name + " sweep", cx: o.cx, cy: o.cy, w: 70, h: o.h * 1.8, r: 0, fill: "#FFFFFF" });
        N3.xf(band, "ADBE Rotate Z").setValue(18);
        LOOK.boxBlur(band, 22, "Sweep softness");
        op = N3.xf(band, "ADBE Opacity"); op.setValue(55);
        if (o.sweepCtl) { AEL.expr(op, "value * " + o.sweepCtl + " / 100"); }
        x0 = N3.P(ctx, o.cx - o.w * 0.75, o.cy); x1 = N3.P(ctx, o.cx + o.w * 0.75, o.cy);
        LOOK.key(N3.pos(band), o.tSweep, o.tSweep + 1.1, x0, x1, LOOK.CALM);
        matte = N3.box(ctx, { name: o.name + " sweep matte", cx: o.cx, cy: o.cy, w: o.w, h: o.h, r: o.r, fill: "#FFFFFF" });
        matte.moveBefore(band);
        AEL.trackMatte(band, matte, TrackMatteType.ALPHA);
    }
    return body;
};

// Soft light orbs behind everything (3D, far back, so the camera gives them parallax and depth blur).
LOOK.orbs = function (comp, list) {   // list: [{color, d, x, y, z, opacity, drift:[dx,dy], period}]
    var i, o, l, gi;
    for (i = 0; i < list.length; i++) {
        o = list[i];
        l = N3.shapeLayer(comp, "Light orb " + (i + 1));
        gi = N3.addGroup(l, "Orb"); N3.addEllipse(l, gi, o.d, o.d); N3.addFill(l, gi, o.color);
        l.threeDLayer = true;
        N3.pos(l).setValue([o.x, o.y, o.z]);
        N3.xf(l, "ADBE Opacity").setValue(o.opacity);
        LOOK.boxBlur(l, o.blur || 140, "Orb softness");
        AEL.expr(N3.pos(l), "var p = " + (o.period || 14) + ", a = " + N3.num(o.drift || [60, 30]) + ";\n" +
            "add(value, [a[0] * Math.sin(2 * Math.PI * time / p), a[1] * Math.cos(2 * Math.PI * time / p), 0])");
        l.moveToEnd();
    }
};

// Two-node camera with depth of field focused on the z = 0 plane; dolly and drift between two poses (CALM ease).
// o: {from:{pos, poi}, to:{pos, poi}, t0, t1}
LOOK.camera = function (comp, o) {
    var cam = comp.layers.addCamera("CAMERA", [comp.width / 2, comp.height / 2]), X = cam.property("ADBE Transform Group"), C;
    LOOK.key(X.property("ADBE Position"), o.t0, o.t1, o.from.pos, o.to.pos, LOOK.CALM);
    LOOK.key(X.property("ADBE Anchor Point"), o.t0, o.t1, o.from.poi, o.to.poi, LOOK.CALM);
    cam = comp.layer("CAMERA"); X = cam.property("ADBE Transform Group");
    AEL.expr(X.property("ADBE Position"), "// Camera move % on STYLE CONTROLS scales the dolly (0 = locked at the first key)\n" +
        "var c = " + LOOK.ref("Camera move %") + " / 100, a = key(1).value;\nadd(a, mul(sub(value, a), c))");
    C = cam.property("ADBE Camera Options Group");
    C.property("ADBE Camera Depth of Field").setValue(1);
    C.property("ADBE Camera Blur Level").setValue(100);
    AEL.expr(C.property("ADBE Camera Focus Distance"), "// focus stays on the cards (the z = 0 plane)\nlength(transform.position, transform.pointOfInterest)");
    AEL.expr(C.property("ADBE Camera Aperture"), LOOK.ref("Depth blur"));
    return cam;
};

// CC Light Sweep, set up like the user's AP Automation project: Direction -30, Sharp, Width 142, Sweep Intensity 186,
// Edge Intensity 50, Edge Thickness 20, coloured light, Reception Add. Center travels from p0 to p1 (layer space) between t0 and t1.
// o: {p0, p1, t0, t1, color, width, intensity, dir, ctl (expression for Sweep %)}. Params are found by index and checked by name.
LOOK.ccSweep = function (layer, o) {
    var f = N3.fx(layer, "CC Light Sweep", o.name || "Light sweep"), nm = f.name, P = function (i, n) {
        var fx = layer.property("ADBE Effect Parade").property(nm), q = fx.property(i);
        if (q.name !== n) { q = fx.property(n); }
        if (!q) { throw new Error("CC Light Sweep: no parameter '" + n + "'"); }
        return q;
    };
    P(2, "Direction").setValue(o.dir === undefined ? -30 : o.dir);
    P(3, "Shape").setValue(3);                                   // Sharp
    P(4, "Width").setValue(o.width || 142);
    P(5, "Sweep Intensity").setValue(o.intensity || 186);
    P(6, "Edge Intensity").setValue(50);
    P(7, "Edge Thickness").setValue(20);
    P(8, "Light Color").setValue(N3.rgba(o.color || "#FFFFFF"));
    P(9, "Light Reception").setValue(1);                         // Add
    LOOK.key(P(1, "Center"), o.t0, o.t1, o.p0, o.p1, LOOK.CALM);
    if (o.ctl) { AEL.expr(P(5, "Sweep Intensity"), "value * " + o.ctl + " / 100"); }
    return layer.property("ADBE Effect Parade").property(nm);
};
