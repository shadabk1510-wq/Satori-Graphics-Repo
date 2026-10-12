// mm_kit.jsx: building blocks for Video 4 ("New Meta Logo"), on top of the Satori kit (sat_kit.jsx).
// The look: reference 1's coral-pink world (blush-to-coral gradient light, white cards, plum and coral type; the user's
// colour reference for this video), with the thumbnail's editorial pieces (huge heavy lowercase type, B&W cut-out, red "!"
// bubbles, the blue Muse M). Every visual lands on its word in the VO (MM_WORDS), and every held frame drifts.

var MM = MM || {};
MM.SCENES = [];
MM.TAIL = 0.4;   // each scene runs this long past its cut so the next one crossfades over it
MM.C = { ink: "#33222A", soft: "#A8707B", coral: "#DE4E5F", coralD: "#C23A4D", alarm: "#D93448", blush: "#FCE6EA", white: "#FFFFFF",
    blue: "#1877F2", blueD: "#0A5BE0", blueL: "#4DA6FF", lav: "#F2B5BE", lavD: "#D9576A", lavL: "#FDEFF1", mint: "#F7C9A8",
    mintD: "#E07A5F", yellow: "#FFFFFF", sketch: "#5A3A44", line: "#F2B5BE", glassTint: "#B8485C" };
N3.FONT[900] = "Inter-Black";
N3.FONT_ALT["Inter-Black"] = "Inter-ExtraBold";

// ---------------------------------------------------------------- the VO
MM.norm = function (s) { return String(s).toLowerCase().replace(/[\u2019']/g, "").replace(/[^a-z0-9$]/g, ""); };
MM.idx = function (phrase, from) {
    var p = String(phrase).split(/\s+/), q = [], i, j, ok;
    for (i = 0; i < p.length; i++) { if (MM.norm(p[i])) { q.push(MM.norm(p[i])); } }
    for (i = 0; i < MM_WORDS.length; i++) {
        if (MM_WORDS[i][1] < (from || 0) - 0.001) { continue; }
        ok = true;
        for (j = 0; j < q.length; j++) { if (!MM_WORDS[i + j] || MM_WORDS[i + j][0] !== q[j]) { ok = false; break; } }
        if (ok) { return i; }
    }
    throw new Error("VO cue not found: '" + phrase + "' after " + from + " s");
};
MM.find = function (phrase, from) { return MM_WORDS[MM.idx(phrase, from)][1]; };
// Start time of each displayed word (local to scene S), matched in order against the VO; words the VO doesn't say
// follow the previous one by 0.14 s.
MM.times = function (S, text, after) {
    var ws = String(text).replace(/\n/g, " ").split(/\s+/), out = [], c = 0, i, j, w, t = null, g = S.g0 + (after || 0) - 0.35;
    while (c < MM_WORDS.length && MM_WORDS[c][1] < g) { c++; }
    for (i = 0; i < ws.length; i++) {
        if (!ws[i]) { continue; }
        w = MM.norm(ws[i]);
        for (j = c; w && j < Math.min(c + 9, MM_WORDS.length); j++) { if (MM_WORDS[j][0] === w) { break; } }
        if (w && j < Math.min(c + 9, MM_WORDS.length)) { t = MM_WORDS[j][1]; c = j + 1; }
        else { t = t === null ? (c < MM_WORDS.length ? MM_WORDS[c][1] : g) : t + 0.14; }
        out.push(Math.max(0, t - S.g0));
    }
    return out;
};

// ---------------------------------------------------------------- scenes
// MM.SCENES entries: {id, title, cue (first VO words of the beat), hook (fast cut style), build(S)}.
MM.scene = function (id, title, g0, T) {
    var S = SAT.scene(id, title, T + MM.TAIL);
    S.g0 = g0; S.E = T;   // S.T = full comp length (cut + tail); S.E = the cut
    S.at = function (phrase, after) { return MM.find(phrase, g0 + (after || 0) - 0.4) - g0; };
    S.M = SAT.nul(S, "MASTER", [960, 540, 0]);
    return S;
};
// Slow master push for the whole beat (the hold never freezes): scale a little, linear.
MM.push = function (S, amt, end) { var a = 100 + (amt || 4); SAT.k(N3.xf(S.M, "ADBE Scale"), 0, end || S.T, [100, 100, 100], [a, a, a], SAT.DRIFT); };

// ---------------------------------------------------------------- rigs: entrance + matching hold drift
MM.DRIFT = { up: { pos: [0, -30, 0] }, down: { pos: [0, 30, 0] }, right: { pos: [-40, 0, 0] }, left: { pos: [40, 0, 0] },
    scale: { scale: 104 }, back: { pos: [0, -12, -70] }, tiltR: { ry: 6, pos: [-20, 0, 0] }, tiltL: { ry: -6, pos: [20, 0, 0] }, none: { scale: 103 } };
// A group null at pos (local to parent) that enters from `from` at t and keeps drifting the same way.
MM.rig = function (S, name, parent, pos, t, from, o) {
    o = o || {}; from = from || "up"; t = t || 0;
    var D = SAT.drift(S, name, parent || S.M, MM.DRIFT[from] || MM.DRIFT.none, t), n = SAT.nul(S, name, pos, D), d = o.d || 0.8,
        p = N3.pos(n), sc = N3.xf(n, "ADBE Scale"), off = o.off || 240, v = pos, s0 = o.s0 === undefined ? 1 : o.s0;
    if (from === "up") { SAT.k(p, t, t + d, [v[0], v[1] + off, v[2]], v, SAT.OUT); }
    else if (from === "down") { SAT.k(p, t, t + d, [v[0], v[1] - off, v[2]], v, SAT.OUT); }
    else if (from === "right") { SAT.k(p, t, t + d, [v[0] + off * 1.8, v[1], v[2]], v, SAT.OUT); }
    else if (from === "left") { SAT.k(p, t, t + d, [v[0] - off * 1.8, v[1], v[2]], v, SAT.OUT); }
    else if (from === "scale") { SAT.k(sc, t, t + d * 0.75, [s0, s0, s0], [100, 100, 100], SAT.OUT); }
    else if (from === "back") { SAT.k(p, t, t + d, [v[0], v[1] + 60, v[2] + 900], v, SAT.OUT); }
    else if (from === "tiltR" || from === "tiltL") {
        SAT.k(N3.xf(n, "ADBE Rotate Y"), t, t + d, from === "tiltR" ? -80 : 80, 0, SAT.OUT);
        SAT.k(p, t, t + d, [v[0] + (from === "tiltR" ? 1 : -1) * off * 1.4, v[1], v[2]], v, SAT.OUT);
    }
    return n;
};
// Pop a group null in from (almost) nothing.
MM.pop = function (n, t, d, s0) { SAT.k(N3.xf(n, "ADBE Scale"), t, t + (d || 0.45), [s0 || 1, s0 || 1, s0 || 1], [100, 100, 100], SAT.OUT); return n; };
// Leave: a group null scales away (hook) or slides off.
MM.away = function (n, t, how, d) {
    var p = N3.pos(n), v = p.valueAtTime(t, false), sc = N3.xf(n, "ADBE Scale"), s = sc.valueAtTime(t, false);
    d = d || 0.35;
    if (how === "shrink") { SAT.k(sc, t, t + d, s, [1, 1, 1], SAT.IN); }
    else if (how === "up") { SAT.k(p, t, t + d, v, [v[0], v[1] - 1300, v[2]], SAT.IN); }
    else if (how === "down") { SAT.k(p, t, t + d, v, [v[0], v[1] + 1300, v[2]], SAT.IN); }
    else if (how === "left") { SAT.k(p, t, t + d, v, [v[0] - 2400, v[1], v[2]], SAT.IN); }
    else if (how === "right") { SAT.k(p, t, t + d, v, [v[0] + 2400, v[1], v[2]], SAT.IN); }
};

// ---------------------------------------------------------------- type
MM.STY = {
    cap: { fs: 64, wt: 600, ls: -0.01, color: MM.C.ink, dy: 28, blur: 5, lin: 0.36 },
    head: { fs: 200, wt: 900, ls: -0.045, color: MM.C.ink, dy: 70, blur: 12, lin: 0.3 },
    big: { fs: 124, wt: 800, ls: -0.035, color: MM.C.ink, dy: 46, blur: 8, lin: 0.32 },
    mid: { fs: 84, wt: 700, ls: -0.025, color: MM.C.ink, dy: 34, blur: 6, lin: 0.34 },
    small: { fs: 34, wt: 600, ls: 0, color: MM.C.soft, dy: 14, blur: 3, lin: 0.3 },
    label: { fs: 26, wt: 700, ls: 0.12, color: MM.C.soft, dy: 10, blur: 2, lin: 0.3 }
};
// Kinetic VO text: each word fades up out of blur on the moment the VO says it.
// o: {sty, x, cy, fs, wt, color, align, after (s, local: where to start matching), times (override), z, grad:[c0,c1], caps}
MM.say = function (S, parent, text, o) {
    o = o || {};
    var st = MM.STY[o.sty || "cap"], fs = o.fs || st.fs, str = o.caps ? String(text).toUpperCase() : text, l, tms;
    l = SAT.text(S, str, { name: o.name || ("Say: " + String(text).replace(/\n/g, " ").substr(0, 30)), x: o.x || 0, cy: o.cy || 0, fs: fs,
        wt: o.wt || st.wt, ls: o.ls !== undefined ? o.ls : st.ls, lh: o.lh, color: o.color || st.color, align: o.align || "center" });
    tms = o.times || MM.times(S, text, o.after);
    N3.unitReveal(l, { times: tms, based: "words", dy: o.dy === undefined ? st.dy : o.dy, blur: o.blur === undefined ? st.blur : o.blur, lin: st.lin });
    if (o.grad) { LOOK.ramp(l, [0, -fs * 0.9], o.grad[0], [0, fs * 0.25], o.grad[1], "Gradient Ramp"); }
    SAT.hang(l, parent || S.M, o.z || 0);
    return l;
};
MM.fadeOut = function (l, t, d) { SAT.fade(l, t, d || 0.3, 100, 0); return l; };

// ---------------------------------------------------------------- cards, pills, tiles
// White-framed image card with a soft lavender shadow. o: {name, w, h, pad, r, fit, x, y, z, t, from, d, tilt}
MM.card = function (S, parent, rel, o) {
    var nm = o.name || "Card", n = MM.rig(S, nm, parent, [o.x || 0, o.y || 0, o.z || 0], o.t || 0, o.from || "up", o), pad = o.pad === undefined ? 14 : o.pad,
        r = o.r === undefined ? 20 : o.r, fr, im;
    fr = N3.box(S.ctx, { name: nm + " frame", cx: 0, cy: 0, w: o.w + pad * 2, h: o.h + pad * 2, r: r + pad * 0.6, fill: "#FFFFFF" });
    LOOK.dropShadow(fr, "Soft shadow", { color: MM.C.glassTint, opacity: 0.24, dist: 26, soft: 80 });
    SAT.hang(fr, n, 0);
    im = N3.image(S.ctx, rel, { name: nm + " image", cx: 0, cy: 0, w: o.w, h: o.h, r: r, fit: o.fit });
    SAT.hang(im, n, -1);
    if (o.tilt) { N3.xf(n, "ADBE Orientation").setValue(o.tilt); }
    return { n: n, frame: fr, img: im };
};
// Glass/white panel group. o: {name, x, y, z, w, h, r, fill, t, from}
MM.panel = function (S, parent, o) {
    var n = MM.rig(S, o.name || "Panel", parent, [o.x || 0, o.y || 0, o.z || 0], o.t || 0, o.from || "up", o), b;
    b = SAT.glass(S, { name: (o.name || "Panel") + " box", w: o.w, h: o.h, r: o.r || 28, fill: o.fill === undefined ? 88 : o.fill, tint: MM.C.glassTint });
    SAT.hang(b, n, 0);
    return { n: n, box: b };
};
// Pill label (no expressions). o: {fs, bg, color, wt, t, z, w}
MM.pill = function (S, parent, str, cx, cy, o) {
    o = o || {};
    var fs = o.fs || 30, h = fs * 1.9, w = o.w || (String(str).length * fs * 0.6 + fs * 1.6), n = SAT.nul(S, "Pill " + str, [cx, cy, o.z || 0], parent || S.M), b, tx;
    b = N3.box(S.ctx, { name: "Pill " + str + " bg", cx: 0, cy: 0, w: w, h: h, r: h / 2, fill: o.bg || MM.C.ink });
    if (o.shadow !== false) { LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.2, dist: 10, soft: 30 }); }
    tx = SAT.text(S, str, { name: "Pill " + str + " text", x: 0, cy: 0, fs: fs, wt: o.wt || 700, color: o.color || "#FFFFFF", align: "center", ls: 0 });
    SAT.hang(b, n, 0); SAT.hang(tx, n, -1);
    if (o.t !== undefined) { MM.pop(n, o.t, 0.45); }
    return n;
};
// Rounded white tile with a Tabler icon. o: {s, bg, color, sw, t, z}
MM.tile = function (S, parent, icon, cx, cy, o) {
    o = o || {};
    var s = o.s || 130, n = SAT.nul(S, "Tile " + icon, [cx, cy, o.z || 0], parent || S.M), b, ic;
    b = N3.box(S.ctx, { name: "Tile " + icon + " bg", cx: 0, cy: 0, w: s, h: s, r: s * 0.28, fill: o.bg || "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.22, dist: 16, soft: 44 });
    ic = N3.icon(S.ctx, icon, { name: "Icon " + icon, cx: 0, cy: 0, size: s * 0.5, color: o.color || MM.C.ink, sw: o.sw || 3.4 });
    SAT.hang(b, n, 0); SAT.hang(ic, n, -1);
    if (o.t !== undefined) { MM.pop(n, o.t, 0.5); }
    return n;
};
// Coral speech bubble with a mark ("!", "?", "x"). o: {color, glyph, rot, z}
MM.bubble = function (S, parent, cx, cy, s, t, o) {
    o = o || {};
    var n = SAT.nul(S, "Bubble " + (o.glyph || "!"), [cx, cy, o.z || 0], parent || S.M), l = N3.shapeLayer(S.comp, N3.uname(S.comp, "Bubble shape")),
        gi = N3.addGroup(l, "Bubble"), tx;
    N3.addEllipse(l, gi, s, s * 0.9);
    N3.addPath(l, gi, [[-s * 0.06, s * 0.3], [s * 0.34, s * 0.6], [s * 0.26, s * 0.18]], null, null, true);
    N3.addFill(l, gi, o.color || MM.C.alarm);
    N3.pos(l).setValue([960, 540]);
    LOOK.dropShadow(l, "Soft shadow", { color: MM.C.coralD, opacity: 0.3, dist: 12, soft: 30 });
    tx = SAT.text(S, o.glyph || "!", { name: "Bubble mark", x: 0, cy: -s * 0.02, fs: s * 0.62, wt: 900, color: "#FFFFFF", align: "center" });
    SAT.hang(l, n, 0); SAT.hang(tx, n, -1);
    MM.pop(n, t, 0.45);
    return n;
};
// A burst of bubbles scattered round a centre, one every `gap` s (accelerating when accel < 1).
MM.burst = function (S, parent, t0, n, o) {
    o = o || {};
    var i, a, r, gap = o.gap || 0.18, t = t0, L = [], seed = o.seed || 3, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (i = 0; i < n; i++) {
        a = rnd() * Math.PI * 2; r = (o.r0 || 260) + rnd() * (o.r1 || 260);
        L.push(MM.bubble(S, parent, (o.cx || 0) + Math.cos(a) * r * 1.5, (o.cy || 0) + Math.sin(a) * r * 0.85, (o.s || 110) * (0.7 + rnd() * 0.6), t,
            { rot: (rnd() - 0.5) * 30, z: (o.z0 === undefined ? -20 : o.z0) - i * 4, glyph: o.glyph }));
        t += gap; gap *= (o.accel || 0.86);
    }
    return L;
};
// Photo-print with a house icon, redacted by a black bar that sweeps across (no real photos of anyone's home).
MM.polaroid = function (S, parent, cx, cy, rot, t, tb) {
    var n = SAT.nul(S, "Print", [cx, cy, 0], parent || S.M), b, ph, ic, bar;
    b = N3.box(S.ctx, { name: "Print frame", cx: 0, cy: 0, w: 300, h: 350, r: 10, fill: "#FFFFFF" });
    LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.25, dist: 18, soft: 50 });
    ph = N3.box(S.ctx, { name: "Print photo", cx: 0, cy: -28, w: 260, h: 250, r: 4, fill: "#FBE3E6" });
    ic = N3.icon(S.ctx, "home", { name: "Print house", cx: 0, cy: -28, size: 120, color: "#D9A0AA", sw: 4 });
    bar = N3.box(S.ctx, { name: "Redaction bar", cx: 0, cy: -28, w: 280, h: 72, r: 4, fill: "#111018" });
    N3.xf(bar, "ADBE Anchor Point").setValue([-140, 0]); N3.pos(bar).setValue([960 - 140, 540 - 28]);
    SAT.hang(b, n, 0); SAT.hang(ph, n, -1); SAT.hang(ic, n, -2); SAT.hang(bar, n, -3);
    SAT.k(N3.xf(bar, "ADBE Scale"), tb, tb + 0.35, [0, 100, 100], [100, 100, 100], SAT.OUT);
    N3.xf(n, "ADBE Rotate Z").setValue(rot);
    MM.pop(n, t, 0.45);
    return n;
};
// Quote card: big coral quote mark, the quote revealed with the VO, attribution under it.
// o: {w, fs, x, y, t, from, after, who, src, lines (count)}
MM.quote = function (S, parent, text, o) {
    var lines = String(text).split("\n").length, fs = o.fs || 58, lh = fs * 1.22, w = o.w || 1180, h = lines * lh + 240, n, q, l;
    n = MM.panel(S, parent, { name: o.name || "Quote", x: o.x || 0, y: o.y || 0, w: w, h: h, r: 34, fill: 92, t: o.t || 0, from: o.from || "up" }).n;
    q = SAT.text(S, "\u201C", { name: "Quote mark", x: -w / 2 + 70, cy: -h / 2 + 62, fs: 150, wt: 900, color: MM.C.coral });
    SAT.hang(q, n, -2); SAT.fade(q, (o.t || 0) + 0.15, 0.3);
    l = MM.say(S, n, text, { sty: "cap", fs: fs, wt: 700, align: "left", x: -w / 2 + 70, cy: -h / 2 + 118 + lh / 2, lh: lh, after: o.after, z: -2 });
    if (o.who) {
        l = SAT.text(S, o.who, { name: "Quote by", x: -w / 2 + 70, cy: h / 2 - 52, fs: 28, wt: 700, color: MM.C.soft, ls: 0.04 });
        SAT.hang(l, n, -2); SAT.fade(l, (o.t || 0) + 0.3, 0.4);
    }
    return n;
};
// Chapter card: outlined number + heavy title (said by the VO).
MM.chapter = function (S, num, title, o) {
    o = o || {};
    var n = MM.rig(S, "Chapter", S.M, [0, 0, 0], 0, "scale", { s0: 70 }), nb, ln;
    nb = SAT.text(S, num, { name: "Chapter number", x: 0, cy: -150, fs: 64, wt: 800, color: MM.C.coral, align: "center", ls: 0.08 });
    SAT.hang(nb, n, 0); SAT.fade(nb, 0.05, 0.3);
    ln = N3.box(S.ctx, { name: "Chapter rule", cx: 0, cy: -96, w: 120, h: 6, r: 3, fill: MM.C.coral });
    SAT.hang(ln, n, 0); SAT.k(N3.xf(ln, "ADBE Scale"), 0.1, 0.6, [0, 100, 100], [100, 100, 100], SAT.OUT);
    MM.say(S, n, title, { sty: "head", fs: o.fs || 150, cy: 40, after: o.after });
    return n;
};
// Number counter (Source Text expression). o: {x, cy, fs, prefix, color, wt}
MM.counter = function (S, parent, from, to, t0, t1, o) {
    o = o || {};
    var l = SAT.text(S, (o.prefix || "") + "0", { name: o.name || "Counter", x: o.x || 0, cy: o.cy || 0, fs: o.fs || 220, wt: o.wt || 900, color: o.color || MM.C.ink, align: "center", ls: -0.04 });
    AEL.expr(l.property("ADBE Text Properties").property("ADBE Text Document"),
        "// counts " + from + " -> " + to + " between " + N3.r3(t0) + " and " + N3.r3(t1) + " s (ease out)\n" +
        "var u = Math.min(1, Math.max(0, (time - " + N3.r3(t0) + ") / " + N3.r3(t1 - t0) + ")); u = 1 - Math.pow(1 - u, 3);\n" +
        "var v = Math.round(" + from + " + (" + to + " - " + from + ") * u), s = String(v), o = '';\n" +
        "while (s.length > 3) { o = ',' + s.substr(s.length - 3) + o; s = s.substr(0, s.length - 3); }\n" +
        "'" + (o.prefix || "") + "' + s + o");
    SAT.hang(l, parent || S.M, o.z || 0);
    return l;
};
// A coral strike line drawn across (trim path).
MM.strike = function (S, parent, cx, cy, w, t, o) {
    o = o || {};
    var l = N3.path(S.ctx, { name: "Strike", verts: [[cx - w / 2, cy + (o.tilt || 8)], [cx + w / 2, cy - (o.tilt || 8)]], stroke: o.color || MM.C.coral, sw: o.sw || 12, trim: true });
    SAT.hang(l, parent || S.M, o.z || -10);
    SAT.k(N3.gc(l, 1).property(2).property("ADBE Vector Trim End"), t, t + 0.35, 0, 100, SAT.OUT);
    return l;
};

// ---------------------------------------------------------------- the Muse M (native stroke)
// v: variation {slant, amp, tension (1 = traced), endA/endB (stretch the end strokes), sx (rhythm: peak spacing)}
MM.mShape = function (w, v) {
    var k = w / 1000, e = MM_M, V = [], I = [], O = [], i, x, y, ten, n = e.v.length, s;
    v = v || {};
    ten = v.tension === undefined ? 1 : v.tension;
    for (i = 0; i < n; i++) {
        x = e.v[i][0] * (v.sx || 1); y = e.v[i][1] * (v.amp || 1);
        x += (v.slant || 0) * y;
        if (i === 0 && v.endA) { x += (x - e.v[1][0]) * (v.endA - 1); y += (y - e.v[1][1]) * (v.endA - 1); }
        if (i === n - 1 && v.endB) { x += (x - e.v[n - 2][0]) * (v.endB - 1); y += (y - e.v[n - 2][1]) * (v.endB - 1); }
        V.push([x * k, y * k]);
        I.push([e.i[i][0] * k * ten, e.i[i][1] * k * ten]); O.push([e.o[i][0] * k * ten, e.o[i][1] * k * ten]);
    }
    s = new Shape(); s.vertices = V; s.inTangents = I; s.outTangents = O; s.closed = false;
    return s;
};
// Meta's rigid sketch: the same strokes, straight segments and sharp turns (the Inquirer: "more rigid").
MM.SKETCH = { tension: 0, slant: 0.12, amp: 0.92 };
// o: {name, w, sw, x, y, z, color, grad (default true), draw: [t0, t1], v}
MM.muse = function (S, parent, o) {
    var l = N3.shapeLayer(S.comp, N3.uname(S.comp, o.name || "Muse M")), gi = N3.addGroup(l, "M"), sh = MM.mShape(o.w, o.v), pi, tr;
    N3.addPath(l, gi, sh.vertices, sh.inTangents, sh.outTangents, false);
    if (o.draw) { N3.addTrim(l, gi); }
    N3.addStroke(l, gi, o.color || MM.C.blue, o.sw || MM_M.sw * o.w / 1000, undefined, true);
    if (o.grad !== false && !o.color) { LOOK.ramp(l, [-o.w * 0.45, -o.w * 0.3], MM.C.blueD, [o.w * 0.45, o.w * 0.3], MM.C.blueL, "Gradient Ramp"); }
    N3.pos(l).setValue([960 + (o.x || 0), 540 + (o.y || 0)]);
    SAT.hang(l, parent || S.M, o.z || 0);
    if (o.draw) { SAT.k(N3.gc(l, gi).property(2).property("ADBE Vector Trim End"), o.draw[0], o.draw[1], 0, 100, o.ease || [40, 90]); }
    return { layer: l, path: function () { return N3.gc(l, gi).property(1).property("ADBE Vector Shape"); } };
};
// Morph the M between two variations.
MM.morph = function (m, w, t0, t1, va, vb, inf) { SAT.k(m.path(), t0, t1, MM.mShape(w, va), MM.mShape(w, vb), inf || SAT.SNAP); };
// Thirty explored variations: angles (slant), endings (end strokes), rhythm (peak spacing/height), smoothness.
MM.VARIANTS = (function () {
    var L = [], i, sl = [-0.18, -0.08, 0, 0.1, 0.2, 0.28], am = [0.82, 1, 1.14, 0.94, 1.08], te = [0, 0.55, 1, 1.25, 0.8];
    for (i = 0; i < 30; i++) {
        L.push({ slant: sl[i % 6], amp: am[(i * 2) % 5], tension: te[(i * 3) % 5], endA: [1, 1.5, 0.6, 1.2, 0.8][i % 5], endB: [1.3, 0.7, 1, 1.6, 0.9][(i + 2) % 5], sx: [1, 0.92, 1.08][i % 3] });
    }
    L[29] = {};   // the last one is the final mark
    return L;
}());

// Figma-style artboard: white frame, thin border, "Frame" label, corner handles.
MM.artboard = function (S, parent, w, h, t, o) {
    o = o || {};
    var n = MM.rig(S, "Artboard", parent, [o.x || 0, o.y || 0, 0], t, o.from || "scale", { s0: 85 }), b, lb, i, hx;
    b = N3.box(S.ctx, { name: "Artboard", cx: 0, cy: 0, w: w, h: h, r: 6, fill: "#FFFFFF", stroke: MM.C.line, sw: 2 });
    LOOK.dropShadow(b, "Soft shadow", { color: MM.C.glassTint, opacity: 0.18, dist: 24, soft: 70 });
    SAT.hang(b, n, 0);
    lb = SAT.text(S, o.label || "Frame 1", { name: "Artboard label", x: -w / 2, cy: -h / 2 - 30, fs: 24, wt: 600, color: MM.C.lavD });
    SAT.hang(lb, n, 0); SAT.fade(lb, t + 0.3, 0.3);
    for (i = 0; i < 4; i++) {
        hx = N3.box(S.ctx, { name: "Handle " + (i + 1), cx: (i % 2 ? 1 : -1) * w / 2, cy: (i < 2 ? -1 : 1) * h / 2, w: 16, h: 16, r: 2, fill: "#FFFFFF", stroke: MM.C.lavD, sw: 2.5 });
        SAT.hang(hx, n, -1); SAT.pop(hx, t + 0.35 + i * 0.05, 0.3);
    }
    return n;
};
// Small coral callout: dot + line + label, for the stroke anatomy.
MM.callout = function (S, parent, x, y, dx, dy, text, t) {
    var n = SAT.nul(S, "Callout " + text, [x, y, -20], parent || S.M), dot, ln, tx;
    dot = N3.ellipse(S.ctx, { name: "Callout dot", cx: 0, cy: 0, d: 22, fill: MM.C.coral });
    ln = N3.path(S.ctx, { name: "Callout line", verts: [[0, 0], [dx, dy]], stroke: MM.C.coral, sw: 4, trim: true });
    tx = SAT.text(S, text, { name: "Callout text", x: dx + (dx >= 0 ? 16 : -16), cy: dy, fs: 40, wt: 800, color: MM.C.coral, align: dx >= 0 ? "left" : "right" });
    SAT.hang(dot, n, 0); SAT.hang(ln, n, 1); SAT.hang(tx, n, 0);
    SAT.pop(dot, t, 0.3);
    SAT.k(N3.gc(ln, 1).property(2).property("ADBE Vector Trim End"), t + 0.05, t + 0.4, 0, 100, SAT.OUT);
    N3.unitReveal(tx, { times: [t + 0.25], based: "lines", dy: 12, blur: 3, lin: 0.3 });
    return n;
};

// Aurora colour stops [time, [top-left, top-right, bottom-left, bottom-right]], all from reference 1: blush light at the
// top, coral rising from the bottom. Each chapter holds its mix, then shifts over ~2 s: the hook and close strongest,
// the explanation softer, money whiter, the responses full coral, the disturbing part muted.
MM.BG = (function () {
    var P = { hook: ["#FBE3E6", "#FDF5F6", "#EFA5AF", "#E16170"], job: ["#FDF5F6", "#FBE7EA", "#F6CDD3", "#EDA0AA"],
        money: ["#FFFFFF", "#FDF0F2", "#F9D9DE", "#F0B0B8"], quiet: ["#FBE3E6", "#F7D3D9", "#F2BAC2", "#E8939E"],
        resp: ["#FDF5F6", "#F6C9CF", "#EB99A4", "#DE4E5F"], dark: ["#EBD9DC", "#DDB7BD", "#CC98A1", "#B5606E"] },
        S = [[0, "hook"], [31, "job"], [135.4, "money"], [190.4, "quiet"], [231.5, "resp"], [282.3, "dark"], [321.8, "hook"]], L = [], i;
    for (i = 0; i < S.length; i++) {
        L.push([S[i][0], P[S[i][1]]]);
        if (i + 1 < S.length) { L.push([S[i + 1][0] - 2, P[S[i][1]]]); }
    }
    return L;
}());
