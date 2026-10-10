// ae_sim/sim.js - browser-side renderer for a model.json dump (see model.mjs). Canvas 2D, one frame at a time.
// Implements the AE behaviour the NOON builds rely on: keyframe interpolation (hold/linear/temporal bezier, straight
// spatial paths), expressions (JS engine semantics, common API subset), parenting, collapsed precomps, track mattes
// (alpha), masks, shape groups (rect/ellipse/path/fill/stroke/trim), point text with animators (range + expression
// selectors), Gaussian blur, drop shadow, gradient ramp, multiply blending. Approximate by design: it is a layout and
// timing check, not a pixel match for After Effects.
(function () {
  "use strict";
  const PVT = { ThreeD_SPATIAL: 6413, ThreeD: 6414, TwoD_SPATIAL: 6415, TwoD: 6416, OneD: 6417, COLOR: 6418, SHAPE: 6423, TEXT_DOCUMENT: 6424 };
  const KIT = { LINEAR: 6612, BEZIER: 6613, HOLD: 6614 };
  const JUST = { 7413: "left", 7414: "right", 7415: "center" };
  const BLEND = { 5212: "source-over", 5216: "multiply", 5220: "screen", 5228: "lighter", 5232: "overlay" };
  let MODEL, FOOT, COMPS = {}, LAYERS = {}, ERR = new Map(), PROP_ID = 0, CACHE = new Map(), PENDING = new Set(), IMG = new Map();
  const OPT = { bg: false, guides: false };

  // ---------------------------------------------------------------- setup
  function index(p, layer, comp) {
    p._id = ++PROP_ID; p._layer = layer; p._comp = comp;
    if (p.kids) for (const k of p.kids) { k._parent = p; index(k, layer, comp); }
  }
  window.simLoad = function (model, foot, opt) {
    MODEL = model; FOOT = foot; Object.assign(OPT, opt || {});
    for (const c of model.comps) {
      COMPS[c.name] = c;
      for (const L of c.layers) {
        L._comp = c; LAYERS[L.uid] = L;
        L._root = { mn: "root", kids: L.props };
        index(L._root, L, c);
        L._g = (mn) => L.props.find((p) => p.mn === mn);
      }
    }
    return Object.keys(COMPS);
  };
  const kid = (p, mn) => (p && p.kids ? p.kids.find((k) => k.mn === mn || k.name === mn) : null);
  const tr = (L, mn) => kid(L._g("ADBE Transform Group"), mn);

  // ---------------------------------------------------------------- math
  const isA = Array.isArray;
  const add = (a, b) => (isA(a) ? a.map((x, i) => x + (isA(b) ? b[i] || 0 : b)) : isA(b) ? b.map((x) => x + a) : a + b);
  const sub = (a, b) => (isA(a) ? a.map((x, i) => x - (isA(b) ? b[i] || 0 : b)) : isA(b) ? b.map((x) => a - x) : a - b);
  const mul = (a, b) => (isA(a) ? a.map((x) => x * b) : isA(b) ? b.map((x) => x * a) : a * b);
  const div = (a, b) => (isA(a) ? a.map((x) => x / b) : a / b);
  const clamp = (v, a, b) => (isA(v) ? v.map((x, i) => Math.min(isA(b) ? b[i] : b, Math.max(isA(a) ? a[i] : a, x))) : Math.min(b, Math.max(a, v)));
  const length = (a, b) => { const d = b === undefined ? a : sub(a, b); return isA(d) ? Math.hypot(...d) : Math.abs(d); };
  const lerpV = (a, b, u) => (isA(a) ? a.map((x, i) => x + (b[i] - x) * u) : a + (b - a) * u);
  function mapR(t, a, b, v0, v1, f) { if (v0 === undefined) { v0 = a; v1 = b; a = 0; b = 1; } const u = b === a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a), 0, 1); return lerpV(v0, v1, f(u)); }
  const linear = (t, a, b, v0, v1) => mapR(t, a, b, v0, v1, (u) => u);
  const ease = (t, a, b, v0, v1) => mapR(t, a, b, v0, v1, (u) => u * u * (3 - 2 * u));
  const easeIn = (t, a, b, v0, v1) => mapR(t, a, b, v0, v1, (u) => u * u);
  const easeOut = (t, a, b, v0, v1) => mapR(t, a, b, v0, v1, (u) => 1 - (1 - u) * (1 - u));

  // ---------------------------------------------------------------- keyframes
  function bez1(t, t0, t1, v0, v1, eo, ei) {
    const dt = t1 - t0, x1 = t0 + (eo.i / 100) * dt, y1 = v0 + eo.s * (eo.i / 100) * dt, x2 = t1 - (ei.i / 100) * dt, y2 = v1 - ei.s * (ei.i / 100) * dt;
    const bx = (u) => (1 - u) ** 3 * t0 + 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u * u * x2 + u ** 3 * t1;
    let lo = 0, hi = 1;
    for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (bx(m) < t) lo = m; else hi = m; }
    const u = (lo + hi) / 2;
    return (1 - u) ** 3 * v0 + 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3 * v1;
  }
  function bezPath(p0, p1, p2, p3) {   // sampled cubic with arc-length lookup
    const P = [], L = [0], N = 48;
    for (let j = 0; j <= N; j++) { const u = j / N, A = (1 - u) ** 3, B = 3 * (1 - u) ** 2 * u, C = 3 * (1 - u) * u * u, D = u ** 3; P.push(p0.map((_, d) => A * p0[d] + B * p1[d] + C * p2[d] + D * p3[d])); if (j) L.push(L[j - 1] + length(P[j], P[j - 1])); }
    return { len: L[N], at: (s) => { let j = 1; while (j < N && L[j] < s) j++; const u = (s - L[j - 1]) / Math.max(1e-9, L[j] - L[j - 1]); return lerpV(P[j - 1], P[j], Math.min(1, Math.max(0, u))); } };
  }
  function keyed(p, t) {
    const K = p.keys;
    if (!K || !K.length) return p.value;
    if (t <= K[0].t) return K[0].v;
    if (t >= K[K.length - 1].t) return K[K.length - 1].v;
    let i = 0; while (t >= K[i + 1].t) i++;
    const a = K[i], b = K[i + 1], dt = b.t - a.t;
    if (a.outI === KIT.HOLD || p.type === PVT.SHAPE || p.type === PVT.TEXT_DOCUMENT) return a.v;
    const spatial = p.type === PVT.ThreeD_SPATIAL || p.type === PVT.TwoD_SPATIAL;
    // spatial bezier: keys with non-zero spatial tangents move along the curve P0, P0+outT, P1+inT, P1 (by arc length)
    const curve = spatial && ((a.outT || []).some((x) => x) || (b.inT || []).some((x) => x)) ? bezPath(a.v, add(a.v, a.outT || [0, 0]), add(b.v, b.inT || [0, 0]), b.v) : null;
    if (a.outI === KIT.LINEAR && b.inI === KIT.LINEAR && !curve) return lerpV(a.v, b.v, (t - a.t) / dt);
    const lin = (v0, v1) => ({ s: (v1 - v0) / dt, i: 33.333 });
    const E = (k, side, d) => { const e = side === "o" ? k.outE : k.inE; return e ? e[Math.min(d, e.length - 1)] : { s: 0, i: 16.667 }; };
    if (spatial || !isA(a.v) || p.type === PVT.COLOR) {
      if (!isA(a.v)) {
        const eo = a.outI === KIT.LINEAR ? lin(a.v, b.v) : E(a, "o", 0), ei = b.inI === KIT.LINEAR ? lin(a.v, b.v) : E(b, "i", 0);
        return bez1(t, a.t, b.t, a.v, b.v, eo, ei);
      }
      const Ld = curve ? curve.len : spatial ? length(a.v, b.v) : 1;
      if (Ld === 0) return a.v;
      const eo = a.outI === KIT.LINEAR ? lin(0, Ld) : E(a, "o", 0), ei = b.inI === KIT.LINEAR ? lin(0, Ld) : E(b, "i", 0);
      const sp = p.type === PVT.COLOR ? { s: 0, i: eo.i } : eo, spi = p.type === PVT.COLOR ? { s: 0, i: ei.i } : ei;
      const s = bez1(t, a.t, b.t, 0, Ld, sp, spi);
      return curve ? curve.at(s) : lerpV(a.v, b.v, s / Ld);
    }
    return a.v.map((v0, d) => {
      const v1 = b.v[d], eo = a.outI === KIT.LINEAR ? lin(v0, v1) : E(a, "o", d), ei = b.inI === KIT.LINEAR ? lin(v0, v1) : E(b, "i", d);
      return bez1(t, a.t, b.t, v0, v1, eo, ei);
    });
  }

  // ---------------------------------------------------------------- expressions
  const RUN = new Function("api", "code", "with (api) { return eval(code); }");
  function layerApi(L, t) {
    const c = L._comp;
    const api = {
      name: L.name, index: c.layers.indexOf(L) + 1,
      effect: (n) => {
        const fx = L._g("ADBE Effect Parade").kids.find((e) => e.name === n || e.mn === n) || (typeof n === "number" ? L._g("ADBE Effect Parade").kids[n - 1] : null);
        if (!fx) throw new Error(`effect("${n}") not found on ${L.name}`);
        const f = (pn) => { const p = typeof pn === "number" ? fx.kids[pn - 1] : fx.kids.find((k) => k.name === pn || k.mn === pn); if (!p) throw new Error(`effect param ${pn}`); return val(p, t); };
        return f;
      },
      get transform() { return { get position() { return val(tr(L, "ADBE Position"), t); }, get pointOfInterest() { return val(tr(L, "ADBE Anchor Point"), t); }, get anchorPoint() { return val(tr(L, "ADBE Anchor Point"), t); }, get scale() { return val(tr(L, "ADBE Scale"), t); }, get opacity() { return val(tr(L, "ADBE Opacity"), t); },
        get anchorPoint() { return val(tr(L, "ADBE Anchor Point"), t); }, get rotation() { return val(tr(L, "ADBE Rotate Z"), t); } }; },
      get marker() { const m = L._g("ADBE Marker"), K = (m && m.keys) || []; return { numKeys: K.length, key: (i) => { const k = K[i - 1]; if (!k) throw new Error("marker key " + i); return { time: k.t, comment: k.comment }; } }; },
      sourceRectAtTime: (tt) => sourceRect(L, tt === undefined ? t : tt),
      get width() { return L.src ? L.src.w : 0; }, get height() { return L.src ? L.src.h : 0; },
    };
    return api;
  }
  function compApi(c, t) {
    return { name: c.name, width: c.w, height: c.h, duration: c.dur, frameDuration: 1 / c.fps, numLayers: c.layers.length,
      layer: (n) => { const L = typeof n === "number" ? c.layers[n - 1] : c.layers.find((l) => l.name === n); if (!L) throw new Error(`layer("${n}") not in ${c.name}`); return layerApi(L, t); } };
  }
  function runExpr(p, t, pre, extra) {
    const L = p._layer, la = layerApi(L, t);
    const api = Object.assign({
      time: t, value: pre, thisProperty: { value: pre }, numKeys: p.keys ? p.keys.length : 0,
      key: (i) => { const k = p.keys[i - 1]; if (!k) throw new Error("key " + i); return { time: k.t, value: k.v }; },
      valueAtTime: (tt) => keyed(p, tt),
      thisLayer: la, thisComp: compApi(L._comp, t), comp: (n) => { if (!COMPS[n]) throw new Error(`comp("${n}") not found`); return compApi(COMPS[n], t); },
      effect: la.effect, get transform() { return la.transform; }, get marker() { return la.marker; }, sourceRectAtTime: la.sourceRectAtTime,
      add, sub, mul, div, clamp, length, linear, ease, easeIn, easeOut, Math, degreesToRadians: (d) => (d * Math.PI) / 180, radiansToDegrees: (r) => (r * 180) / Math.PI,
      framesToTime: (f) => f / L._comp.fps, timeToFrames: (tt) => Math.round((tt === undefined ? t : tt) * L._comp.fps),
    }, extra || {});
    try {
      let v = RUN(api, p.expr);
      if (isA(pre) && isA(v) && v.length < pre.length) v = v.concat(pre.slice(v.length));
      if (isA(pre) && !isA(v) && typeof v === "number" && p.type !== PVT.OneD) throw new Error("expression returned a number for a " + pre.length + "D property");
      if (p.type === PVT.TEXT_DOCUMENT && (typeof v === "string" || typeof v === "number")) return String(v);
      if (v === undefined || (typeof v === "number" && isNaN(v)) || (isA(v) && v.some((x) => typeof x !== "number" || isNaN(x)))) throw new Error("expression result is not a number: " + JSON.stringify(v));
      return v;
    } catch (e) {
      const k = `${L._comp.name} / ${L.name} / ${p.name}: ${e.message}`;
      ERR.set(k, (ERR.get(k) || 0) + 1);
      return pre;
    }
  }
  function val(p, t, extra) {
    if (!p) return undefined;
    if (extra) return p.expr ? runExpr(p, t, keyed(p, t), extra) : keyed(p, t);
    const ck = p._id + "@" + t;
    if (CACHE.has(ck)) return CACHE.get(ck);
    CACHE.set(ck, keyed(p, t));                    // guards against self-reference loops
    const v = p.expr ? runExpr(p, t, keyed(p, t)) : keyed(p, t);
    CACHE.set(ck, v);
    return v;
  }

  // ---------------------------------------------------------------- transforms
  function localM(L, t) {
    const a = val(tr(L, "ADBE Anchor Point"), t), p = val(tr(L, "ADBE Position"), t), s = val(tr(L, "ADBE Scale"), t), r = val(tr(L, "ADBE Rotate Z"), t);
    return new DOMMatrix().translate(p[0], p[1]).rotate(r).scale(s[0] / 100, s[1] / 100).translate(-a[0], -a[1]);
  }
  // ---- 3D: two-node camera (or AE's default 50 mm camera), perspective by a local affine fit at the layer's anchor
  function localM3(L, t) {
    const a = val(tr(L, "ADBE Anchor Point"), t), p = val(tr(L, "ADBE Position"), t), s = val(tr(L, "ADBE Scale"), t), o = tr(L, "ADBE Orientation") ? val(tr(L, "ADBE Orientation"), t) : [0, 0, 0];
    const rx = (tr(L, "ADBE Rotate X") ? val(tr(L, "ADBE Rotate X"), t) : 0) + o[0], ry = (tr(L, "ADBE Rotate Y") ? val(tr(L, "ADBE Rotate Y"), t) : 0) + o[1], rz = val(tr(L, "ADBE Rotate Z"), t) + o[2];
    return new DOMMatrix().translate(p[0], p[1], p[2] || 0).rotate(0, 0, rz).rotate(0, ry, 0).rotate(rx, 0, 0).scale(s[0] / 100, s[1] / 100, (s[2] === undefined ? 100 : s[2]) / 100).translate(-a[0], -a[1], -(a[2] || 0));
  }
  function worldM3(L, t) { let m = localM3(L, t), q = L.parent ? LAYERS[L.parent] : null; while (q) { m = localM3(q, t).multiply(m); q = q.parent ? LAYERS[q.parent] : null; } return m; }
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  function cameraOf(C, t) {
    const cam = C.layers.find((L) => L.kind === "camera" && L.enabled && inTime(L, t)), Z0 = C.w * 50 / 36;
    let P = [C.w / 2, C.h / 2, -Z0], A = [C.w / 2, C.h / 2, 0], zoom = Z0, dof = 0, focus = Z0, ap = 0, bl = 100;
    if (cam) {
      P = val(tr(cam, "ADBE Position"), t); A = val(tr(cam, "ADBE Anchor Point"), t);
      const O = cam._g("ADBE Camera Options Group"), g = (mn) => val(kid(O, mn), t);
      zoom = g("ADBE Camera Zoom"); dof = g("ADBE Camera Depth of Field"); focus = g("ADBE Camera Focus Distance"); ap = g("ADBE Camera Aperture"); bl = g("ADBE Camera Blur Level");
    }
    const f = norm([A[0] - P[0], A[1] - P[1], (A[2] || 0) - P[2]]), r = norm(cross([0, 1, 0], f)), u = cross(f, r);
    return { P, f, r, u, zoom, dof, focus, ap, bl, W: C.w, H: C.h };
  }
  function project(cam, X) {
    const d = [X[0] - cam.P[0], X[1] - cam.P[1], (X[2] || 0) - cam.P[2]], z = Math.max(1, dot(d, cam.f));
    return [cam.W / 2 + cam.zoom * dot(d, cam.r) / z, cam.H / 2 + cam.zoom * dot(d, cam.u) / z, z];
  }
  function affine3(L, t, cam) {   // 2D matrix that matches the projection at the anchor (exact there, close nearby)
    const M = worldM3(L, t), a = val(tr(L, "ADBE Anchor Point"), t), S = 60;
    const w = (x, y) => { const q = M.transformPoint(new DOMPoint(x, y, 0)); return project(cam, [q.x, q.y, q.z]); };
    const o = w(a[0], a[1]), ex = w(a[0] + S, a[1]), ey = w(a[0], a[1] + S);
    const A = (ex[0] - o[0]) / S, B = (ex[1] - o[1]) / S, Cc = (ey[0] - o[0]) / S, D = (ey[1] - o[1]) / S;
    return { m: new DOMMatrix([A, B, Cc, D, o[0] - A * a[0] - Cc * a[1], o[1] - B * a[0] - D * a[1]]), z: o[2] };
  }
  function worldM(L, t) { let m = localM(L, t), q = L.parent ? LAYERS[L.parent] : null; while (q) { m = localM(q, t).multiply(m); q = q.parent ? LAYERS[q.parent] : null; } return m; }
  const mScale = (m) => Math.sqrt(Math.abs(m.a * m.d - m.b * m.c));

  // ---------------------------------------------------------------- canvases
  const POOL = [];
  let W = 1920, H = 1080;
  function getCv() { const c = POOL.pop() || document.createElement("canvas"); if (c.width !== W || c.height !== H) { c.width = W; c.height = H; } const x = c.getContext("2d"); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = "source-over"; x.filter = "none"; x.clearRect(0, 0, W, H); return c; }
  const relCv = (c) => POOL.push(c);

  // ---------------------------------------------------------------- footage
  function image(url) {
    let im = IMG.get(url);
    if (!im) { im = new Image(); im.src = url; IMG.set(url, im); }
    if (!im.complete || !im.naturalWidth) { PENDING.add(im); return null; }
    return im;
  }
  function footageFrame(L, t) {
    const F = FOOT[L.source.footage]; if (!F) return null;
    if (F.kind === "still") return image(F.url);
    let ft = t - L.start;
    if (L.timeRemap) ft = val(L._g("ADBE Time Remapping"), t);
    const n = Math.max(0, Math.min(F.n - 1, Math.floor(ft * F.fps + 1e-4)));
    return image(F.dir + "/" + String(n + 1).padStart(5, "0") + ".jpg");
  }

  // ---------------------------------------------------------------- shapes
  function rrPath(cx, cy, w, h, r) {
    const P = new Path2D(), x = cx - w / 2, y = cy - h / 2; r = Math.max(0, Math.min(r, w / 2, h / 2));
    if (P.roundRect) P.roundRect(x, y, w, h, r); else P.rect(x, y, w, h);
    return P;
  }
  function shapePoly(s, steps = 16) {   // flatten an AE shape to polylines (for trim + length)
    const pts = [], n = s.v.length; if (!n) return pts;
    const seg = (k, k2) => { const p0 = s.v[k], p3 = s.v[k2], p1 = [p0[0] + s.o[k][0], p0[1] + s.o[k][1]], p2 = [p3[0] + s.i[k2][0], p3[1] + s.i[k2][1]];
      for (let j = 1; j <= steps; j++) { const u = j / steps, a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, c = 3 * (1 - u) * u * u, d = u ** 3; pts.push([a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]); } };
    pts.push(s.v[0].slice());
    for (let k = 0; k < n - 1; k++) seg(k, k + 1);
    if (s.c) seg(n - 1, 0);
    return pts;
  }
  function rrPoly(cx, cy, w, h, r) { r = Math.max(0, Math.min(r, w / 2, h / 2)); const k = 0.5523 * r, l = cx - w / 2, t = cy - h / 2, R = l + w, B = t + h;
    return shapePoly({ v: [[l + r, t], [R - r, t], [R, t + r], [R, B - r], [R - r, B], [l + r, B], [l, B - r], [l, t + r]], i: [[-k, 0], [0, 0], [0, -k], [0, 0], [k, 0], [0, 0], [0, k], [0, 0]], o: [[0, 0], [k, 0], [0, 0], [0, k], [0, 0], [-k, 0], [0, 0], [0, -k]], c: true }); }
  function ellPoly(cx, cy, w, h) { const pts = []; for (let j = 0; j <= 64; j++) { const a = (j / 64) * 2 * Math.PI - Math.PI / 2; pts.push([cx + (w / 2) * Math.cos(a), cy + (h / 2) * Math.sin(a)]); } return pts; }
  function trimPoly(pts, a, b) {   // a,b in 0..1 of length
    if (pts.length < 2) return [];
    const L = [0]; for (let k = 1; k < pts.length; k++) L.push(L[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
    const tot = L[L.length - 1], s0 = a * tot, s1 = b * tot, out = [];
    const at = (s) => { let k = 1; while (k < L.length - 1 && L[k] < s) k++; const u = (s - L[k - 1]) / Math.max(1e-9, L[k] - L[k - 1]); return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * u, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * u]; };
    if (s1 <= s0) return [];
    out.push(at(s0)); for (let k = 0; k < pts.length; k++) if (L[k] > s0 && L[k] < s1) out.push(pts[k]); out.push(at(s1));
    return out;
  }
  function polyPath(pts, close) { const P = new Path2D(); pts.forEach((p, k) => (k ? P.lineTo(p[0], p[1]) : P.moveTo(p[0], p[1]))); if (close) P.closePath(); return P; }
  const rgba = (c, o = 1) => `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${(c.length > 3 ? c[3] : 1) * o})`;
  function drawVectors(contents, t, x, M, op) {
    // contents: "ADBE Vectors Group" / root contents. Items above an operator are painted by it; lower items render underneath.
    const items = contents.kids || [];
    const paths = [];   // {poly, closed, idx}
    items.forEach((it, idx) => {
      if (it.mn === "ADBE Vector Shape - Rect") { const s = val(kid(it, "ADBE Vector Rect Size"), t), p = val(kid(it, "ADBE Vector Rect Position"), t), r = val(kid(it, "ADBE Vector Rect Roundness"), t); paths.push({ poly: rrPoly(p[0], p[1], s[0], s[1], r), closed: true, idx }); }
      else if (it.mn === "ADBE Vector Shape - Ellipse") { const s = val(kid(it, "ADBE Vector Ellipse Size"), t), p = val(kid(it, "ADBE Vector Ellipse Position"), t); paths.push({ poly: ellPoly(p[0], p[1], s[0], s[1]), closed: true, idx }); }
      else if (it.mn === "ADBE Vector Shape - Group") { const s = val(kid(it, "ADBE Vector Shape"), t); if (s && s.v && s.v.length) paths.push({ poly: shapePoly(s), closed: s.c, idx }); }
      else if (it.mn === "ADBE Vector Filter - Trim") {
        let a = val(kid(it, "ADBE Vector Trim Start"), t) / 100, b = val(kid(it, "ADBE Vector Trim End"), t) / 100; const o = (val(kid(it, "ADBE Vector Trim Offset"), t) / 360) % 1;
        if (a > b) [a, b] = [b, a];
        for (const p of paths) if (p.idx < idx && !p.trimmed) { let pp = trimPoly(p.poly, Math.min(1, Math.max(0, a + o)), Math.min(1, Math.max(0, b + o))); p.poly = pp; p.closed = false; p.trimmed = true; }
      }
    });
    for (let idx = items.length - 1; idx >= 0; idx--) {
      const it = items[idx];
      if (it.mn === "ADBE Vector Group") { drawGroup(it, t, x, M, op); continue; }
      const mine = paths.filter((p) => p.idx < idx);
      if (it.mn === "ADBE Vector Graphic - Fill") {
        const c = val(kid(it, "ADBE Vector Fill Color"), t), o = val(kid(it, "ADBE Vector Fill Opacity"), t) / 100;
        x.setTransform(M); x.fillStyle = rgba(c, o * op);
        // AE fills all paths above the Fill in one group as a single compound path (Fill Rule 1 non-zero, 2 even-odd)
        const P = new Path2D(); for (const p of mine) if (p.poly.length > 1) P.addPath(polyPath(p.poly, true));
        x.fill(P, val(kid(it, "ADBE Vector Fill Rule"), t) === 2 ? "evenodd" : "nonzero");
      } else if (it.mn === "ADBE Vector Graphic - Stroke") {
        const c = val(kid(it, "ADBE Vector Stroke Color"), t), o = val(kid(it, "ADBE Vector Stroke Opacity"), t) / 100, w = val(kid(it, "ADBE Vector Stroke Width"), t);
        const cap = val(kid(it, "ADBE Vector Stroke Line Cap"), t), join = val(kid(it, "ADBE Vector Stroke Line Join"), t);
        if (w <= 0) continue;
        x.setTransform(M); x.strokeStyle = rgba(c, o * op); x.lineWidth = w; x.lineCap = ["butt", "butt", "round", "square"][cap] || "butt"; x.lineJoin = ["miter", "miter", "round", "bevel"][join] || "miter";
        // Stroke > Dashes: dash/gap pairs in layer units (+ Offset)
        const dk = (kid(it, "ADBE Vector Stroke Dashes") || {}).kids || [], dpat = dk.filter((d) => d.mn !== "ADBE Vector Stroke Offset").map((d) => Math.max(0, val(d, t))), doff = dk.find((d) => d.mn === "ADBE Vector Stroke Offset");
        x.setLineDash(dpat.length ? dpat : []); x.lineDashOffset = doff ? -val(doff, t) : 0;
        for (const p of mine) if (p.poly.length > 1) x.stroke(polyPath(p.poly, p.closed));
        x.setLineDash([]); x.lineDashOffset = 0;
      }
    }
  }
  function drawGroup(g, t, x, M, op) {
    const T = kid(g, "ADBE Vector Transform Group"), a = val(kid(T, "ADBE Vector Anchor"), t), p = val(kid(T, "ADBE Vector Position"), t), s = val(kid(T, "ADBE Vector Scale"), t), r = val(kid(T, "ADBE Vector Rotation"), t), o = val(kid(T, "ADBE Vector Group Opacity"), t) / 100;
    const m = M.multiply(new DOMMatrix().translate(p[0], p[1]).rotate(r).scale(s[0] / 100, s[1] / 100).translate(-a[0], -a[1]));
    drawVectors(kid(g, "ADBE Vectors Group"), t, x, m, op * o);
  }
  function shapeBounds(L, t) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const walk = (contents, M) => (contents.kids || []).forEach((it) => {
      let poly = null;
      if (it.mn === "ADBE Vector Group") { const T = kid(it, "ADBE Vector Transform Group"), a = val(kid(T, "ADBE Vector Anchor"), t), p = val(kid(T, "ADBE Vector Position"), t), s = val(kid(T, "ADBE Vector Scale"), t);
        walk(kid(it, "ADBE Vectors Group"), M.multiply(new DOMMatrix().translate(p[0], p[1]).scale(s[0] / 100, s[1] / 100).translate(-a[0], -a[1]))); return; }
      if (it.mn === "ADBE Vector Shape - Rect") { const s = val(kid(it, "ADBE Vector Rect Size"), t), p = val(kid(it, "ADBE Vector Rect Position"), t); poly = [[p[0] - s[0] / 2, p[1] - s[1] / 2], [p[0] + s[0] / 2, p[1] + s[1] / 2]]; }
      if (it.mn === "ADBE Vector Shape - Ellipse") { const s = val(kid(it, "ADBE Vector Ellipse Size"), t), p = val(kid(it, "ADBE Vector Ellipse Position"), t); poly = [[p[0] - s[0] / 2, p[1] - s[1] / 2], [p[0] + s[0] / 2, p[1] + s[1] / 2]]; }
      if (it.mn === "ADBE Vector Shape - Group") { const s = val(kid(it, "ADBE Vector Shape"), t); if (s) poly = s.v; }
      if (poly) for (const q of poly) { const P = M.transformPoint(new DOMPoint(q[0], q[1])); x0 = Math.min(x0, P.x); y0 = Math.min(y0, P.y); x1 = Math.max(x1, P.x); y1 = Math.max(y1, P.y); }
    });
    walk(L._g("ADBE Root Vectors Group"), new DOMMatrix());
    return isFinite(x0) ? { left: x0, top: y0, width: x1 - x0, height: y1 - y0 } : { left: 0, top: 0, width: 0, height: 0 };
  }

  // ---------------------------------------------------------------- text
  const MCV = document.createElement("canvas").getContext("2d");
  function fontCss(doc) {
    const f = doc.font || "", m = f.match(/^Inter-?(.*)$/i);
    const wmap = { thin: 100, extralight: 200, light: 300, "": 400, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
    if (m) return `${wmap[m[1].toLowerCase()] || 400} ${doc.fontSize}px Inter`;
    return `400 ${doc.fontSize}px Arial`;
  }
  function textLayout(L, t) {
    const dp = kid(L._g("ADBE Text Properties"), "ADBE Text Document");
    let doc = val(dp, t);
    if (typeof doc === "string" || typeof doc === "number") doc = Object.assign({}, keyed(dp, t), { text: String(doc) });   // Source Text expression returning a string
    MCV.font = fontCss(doc); MCV.letterSpacing = "0px";
    const fs = doc.fontSize, track = (doc.tracking / 1000) * fs, lead = doc.autoLeading ? fs * 1.2 : doc.leading || fs * 1.2;
    const lines = String(doc.allCaps ? doc.text.toUpperCase() : doc.text).split(/\r\n|\r|\n/), just = JUST[doc.justification] || "left";
    const chars = []; let ci = 0, wi = 0, nonSpace = 0;
    lines.forEach((ln, li) => {
      const w = ln.length ? MCV.measureText(ln).width + track * (ln.length - 1) : 0, x0 = just === "center" ? -w / 2 : just === "right" ? -w : 0;
      let inWord = false;
      for (let k = 0; k < ln.length; k++) {
        const ch = ln[k], x = x0 + MCV.measureText(ln.slice(0, k)).width + track * k, cw = MCV.measureText(ch).width, sp = /\s/.test(ch);
        if (!sp && !inWord) { wi++; inWord = true; } if (sp) inWord = false;
        chars.push({ ch, x, y: li * lead, w: cw, line: li, idx: ci++, word: sp ? 0 : wi, ns: sp ? 0 : ++nonSpace, space: sp });
      }
      if (inWord) inWord = false;
    });
    return { doc, chars, lines, lead, track, nWords: wi, nNS: nonSpace, n: chars.length };
  }
  function sourceRect(L, t) {
    if (L.kind === "text") {
      const lay = textLayout(L, t); MCV.font = fontCss(lay.doc);
      let x0 = Infinity, x1 = -Infinity, top = Infinity, bot = -Infinity;
      for (const c of lay.chars) { if (c.space) continue; const m = MCV.measureText(c.ch); x0 = Math.min(x0, c.x - m.actualBoundingBoxLeft); x1 = Math.max(x1, c.x + m.actualBoundingBoxRight); top = Math.min(top, c.y - m.actualBoundingBoxAscent); bot = Math.max(bot, c.y + m.actualBoundingBoxDescent); }
      if (!isFinite(x0)) return { left: 0, top: 0, width: 0, height: 0 };
      return { left: x0, top, width: x1 - x0, height: bot - top };
    }
    if (L.kind === "shape") return shapeBounds(L, t);
    return { left: 0, top: 0, width: L.src ? L.src.w : 0, height: L.src ? L.src.h : 0 };
  }
  function selectorAmount(sel, t, c, lay) {
    const based = val(kid(sel, "ADBE Text Range Type2") || kid(kid(sel, "ADBE Text Range Advanced"), "ADBE Text Range Type2"), t) || 1;
    let i, n;   // 1-based unit index & total
    if (based === 3) { if (c.space) return null; i = c.word; n = lay.nWords; }
    else if (based === 2) { if (c.space) return null; i = c.ns; n = lay.nNS; }
    else if (based === 4) { i = c.line + 1; n = lay.lines.length; }
    else { i = c.idx + 1; n = lay.n; }
    if (sel.mn === "ADBE Text Expressible Selector") {
      const p = kid(sel, "ADBE Text Expressible Amount");
      const v = p.expr ? runExpr(p, t, [100, 100, 100], { textIndex: i, textTotal: n, selectorValue: [100, 100, 100] }) : keyed(p, t);
      return (isA(v) ? v[0] : v) / 100;
    }
    const adv = kid(sel, "ADBE Text Range Advanced");
    const s = val(kid(sel, "ADBE Text Percent Start"), t), e = val(kid(sel, "ADBE Text Percent End"), t), o = val(kid(sel, "ADBE Text Percent Offset"), t), amt = val(kid(adv, "ADBE Text Selector Max Amount"), t) / 100;
    const r0 = Math.min(s, e) + o, r1 = Math.max(s, e) + o, u0 = ((i - 1) / n) * 100, u1 = (i / n) * 100;
    const cov = Math.max(0, Math.min(r1, u1) - Math.max(r0, u0)) / (u1 - u0);
    return cov * amt;
  }
  // Path text: each glyph's centre sits at its arc length (First Margin + layout x) on the mask path, rotated to the tangent
  // when Perpendicular To Path is on. Left/centre/right justification between the margins; Force Alignment spreads the glyphs.
  function textPathAt(L, t, lay) {
    const po = kid(L._g("ADBE Text Properties"), "ADBE Text Path Options"), pi = po ? val(kid(po, "ADBE Text Path"), t) : 0;
    if (!pi) return null;
    const mk = (L._g("ADBE Mask Parade").kids || [])[pi - 1]; if (!mk) return null;
    let pts = shapePoly(val(kid(mk, "ADBE Mask Shape"), t), 32); const closed = val(kid(mk, "ADBE Mask Shape"), t).c;
    if (val(kid(po, "ADBE Text Reverse Path"), t)) pts = pts.reverse();
    const cum = [0]; for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
    const tot = cum[cum.length - 1], first = val(kid(po, "ADBE Text First Margin"), t), last = val(kid(po, "ADBE Text Last Margin"), t);
    const perp = val(kid(po, "ADBE Text Perpendicular To Path"), t), force = val(kid(po, "ADBE Text Force Align Path"), t), just = JUST[lay.doc.justification] || "left";
    const n = lay.chars.length, w = n ? lay.chars[n - 1].x + lay.chars[n - 1].w - lay.chars[0].x : 0, end = tot - last;
    const base = just === "center" ? (first + end) / 2 : just === "right" ? end : first, extra = force && n > 1 ? (end - first - w) / (n - 1) : 0;
    return (c) => {
      let s = force ? first + (c.x - lay.chars[0].x) + c.idx * extra + c.w / 2 : base + c.x + c.w / 2;
      if (closed) s = ((s % tot) + tot) % tot; else s = Math.max(0, Math.min(tot, s));
      let k = 1; while (k < cum.length - 1 && cum[k] < s) k++;
      const a = pts[k - 1], b = pts[k], u = (s - cum[k - 1]) / Math.max(1e-9, cum[k] - cum[k - 1]);
      return { x: a[0] + (b[0] - a[0]) * u, y: a[1] + (b[1] - a[1]) * u, a: perp ? (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI : 0 };
    };
  }
  function drawText(L, t, x, M, op) {
    const lay = textLayout(L, t), doc = lay.doc;
    if (!doc.applyFill) return;
    const anims = (kid(L._g("ADBE Text Properties"), "ADBE Text Animators").kids || []);
    const ms = mScale(M);
    x.font = fontCss(doc); x.textBaseline = "alphabetic";
    const onPath = textPathAt(L, t, lay);   // Text > Path Options > Path (a mask): glyphs ride the mask outline
    for (const c of lay.chars) {
      if (c.space) continue;
      let o = 1, dx = 0, dy = 0, sc = [1, 1], bl = 0, col = doc.fillColor.slice(0, 3);
      for (const an of anims) {
        const sels = kid(an, "ADBE Text Selectors").kids || [], props = kid(an, "ADBE Text Animator Properties").kids || [];
        let a = 0; if (!sels.length) a = 1; for (const s of sels) { const v = selectorAmount(s, t, c, lay); if (v !== null) a = Math.max(a, Math.min(1, Math.max(0, v))); }
        if (a <= 0) continue;
        for (const p of props) {
          const v = val(p, t);
          if (p.mn === "ADBE Text Opacity") o *= 1 + (v / 100 - 1) * a;
          else if (p.mn === "ADBE Text Position 3D") { dx += v[0] * a; dy += v[1] * a; }
          else if (p.mn === "ADBE Text Scale 3D") { sc = [sc[0] * (1 + (v[0] / 100 - 1) * a), sc[1] * (1 + (v[1] / 100 - 1) * a)]; }
          else if (p.mn === "ADBE Text Blur") bl += v[0] * a;
          else if (p.mn === "ADBE Text Fill Color") col = lerpV(col, v.slice(0, 3), a);
        }
      }
      if (o <= 0.002) continue;
      if (onPath) { const q = onPath(c); x.setTransform(M.translate(q.x, q.y).rotate(q.a).translate(dx, dy).scale(sc[0], sc[1]).translate(-c.w / 2, 0)); }
      else x.setTransform(M.translate(c.x + dx + c.w / 2, c.y + dy).scale(sc[0], sc[1]).translate(-c.w / 2, 0));
      x.globalAlpha = Math.max(0, Math.min(1, o * op)); x.filter = bl > 0.05 ? `blur(${(bl * ms) / 2.5}px)` : "none";   // AE blur units ~2.5x CSS sigma
      x.fillStyle = rgba(col);
      x.fillText(c.ch, 0, 0);
    }
    x.filter = "none"; x.globalAlpha = 1;
  }

  // ---------------------------------------------------------------- layers & comps
  function inTime(L, t) { return t >= L.in - 1e-6 && t < L.out - 1e-6; }
  function fxList(L) { return (L._g("ADBE Effect Parade").kids || []); }
  function drawContent(L, t, x, M, depth) {
    if (L.kind === "shape") return drawVectors(L._g("ADBE Root Vectors Group"), t, x, M, 1);
    if (L.kind === "text") return drawText(L, t, x, M, 1);
    if (L.kind === "solid") {
      x.setTransform(M);
      const ramp = fxList(L).find((f) => f.mn === "ADBE Ramp");
      if (ramp) { const p0 = val(kid(ramp, "ADBE Ramp-0001"), t), p1 = val(kid(ramp, "ADBE Ramp-0003"), t), g = x.createLinearGradient(p0[0], p0[1], p1[0], p1[1]); g.addColorStop(0, rgba(val(kid(ramp, "ADBE Ramp-0002"), t))); g.addColorStop(1, rgba(val(kid(ramp, "ADBE Ramp-0004"), t))); x.fillStyle = g; }
      else if (fxList(L).find((f) => f.mn === "ADBE Fractal Noise")) return;   // grain: skipped
      else x.fillStyle = rgba(L.solid.color);
      x.fillRect(0, 0, L.src.w, L.src.h); return;
    }
    if (L.kind === "footage") { const im = footageFrame(L, t); if (im) { x.setTransform(M); x.drawImage(im, 0, 0, L.src.w, L.src.h); } return; }
    if (L.kind === "precomp") { const C = COMPS[L.source.comp]; renderComp(C, t - L.start, x, M, depth + 1); }
  }
  function maskPath(L, t, x, M) {
    const ms = (L._g("ADBE Mask Parade").kids || []).filter((m) => m.maskMode !== 6812);
    if (!ms.length) return;
    const tmp = getCv(), y = tmp.getContext("2d");
    for (const m of ms) {
      const s = val(kid(m, "ADBE Mask Shape"), t), f = val(kid(m, "ADBE Mask Feather"), t);
      y.setTransform(M); y.filter = f && f[0] > 0 ? `blur(${(f[0] * mScale(M)) / 2.5}px)` : "none"; y.fillStyle = "#000";
      y.fill(polyPath(shapePoly(s), true));
    }
    x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = "destination-in"; x.drawImage(tmp, 0, 0); x.globalCompositeOperation = "source-over";
    relCv(tmp);
  }
  function fillOver(buf, paint) { const g = buf.getContext("2d"); g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = "source-atop"; paint(g); g.restore(); }
  function colorFx(L, t, buf, M) {   // generators that recolour the layer inside its own alpha
    for (const f of fxList(L)) {
      if (f.enabled === false) continue;
      if (f.mn === "ADBE 4ColorGradient") {
        const P = [1, 3, 5, 7].map((i) => val(kid(f, "ADBE 4ColorGradient-000" + i), t)), Cc = [2, 4, 6, 8].map((i) => val(kid(f, "ADBE 4ColorGradient-000" + i), t));
        const tp = (q) => { const r = M.transformPoint(new DOMPoint(q[0], q[1])); return [r.x, r.y]; }, p = P.map(tp);
        const top = getCv(), bot = getCv(), a = top.getContext("2d"), b = bot.getContext("2d");
        let g = a.createLinearGradient(p[0][0], p[0][1], p[1][0], p[1][1]); g.addColorStop(0, rgba(Cc[0])); g.addColorStop(1, rgba(Cc[1])); a.fillStyle = g; a.fillRect(0, 0, W, H);
        g = b.createLinearGradient(p[2][0], p[2][1], p[3][0], p[3][1]); g.addColorStop(0, rgba(Cc[2])); g.addColorStop(1, rgba(Cc[3])); b.fillStyle = g; b.fillRect(0, 0, W, H);
        const mid = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2], low = [(p[2][0] + p[3][0]) / 2, (p[2][1] + p[3][1]) / 2];
        g = b.createLinearGradient(mid[0], mid[1], low[0], low[1]); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,1)");
        b.globalCompositeOperation = "destination-in"; b.fillStyle = g; b.fillRect(0, 0, W, H);
        a.drawImage(bot, 0, 0); fillOver(buf, (x) => x.drawImage(top, 0, 0)); relCv(top); relCv(bot);
      } else if (f.mn === "ADBE Ramp" && L.kind !== "solid") {
        const tp = (q) => { const r = M.transformPoint(new DOMPoint(q[0], q[1])); return [r.x, r.y]; }, p0 = tp(val(kid(f, "ADBE Ramp-0001"), t)), p1 = tp(val(kid(f, "ADBE Ramp-0003"), t));
        fillOver(buf, (x) => { const g = x.createLinearGradient(p0[0], p0[1], p1[0], p1[1]); g.addColorStop(0, rgba(val(kid(f, "ADBE Ramp-0002"), t))); g.addColorStop(1, rgba(val(kid(f, "ADBE Ramp-0004"), t))); x.fillStyle = g; x.fillRect(0, 0, W, H); });
      }
    }
  }
  function renderLayer(L, t, M0, depth, M3) {   // -> canvas with the layer's look (masks, matte, effects) but not opacity/blend
    const M = M3 ? M0.multiply(M3) : M0.multiply(worldM(L, t)), buf = getCv(), x = buf.getContext("2d");
    drawContent(L, t, x, M, depth);
    maskPath(L, t, x, M);
    colorFx(L, t, buf, M);
    let out = buf;
    const fx = fxList(L), ms = mScale(M);
    let sigma = 0;
    for (const f of fx) {
      if (f.mn === "ADBE Gaussian Blur 2" && f.kids) sigma = Math.max(sigma, (val(kid(f, "ADBE Gaussian Blur 2-0001"), t) * ms) / 2.5);
      if (f.mn === "ADBE Box Blur2" && f.kids) sigma = Math.max(sigma, val(kid(f, "ADBE Box Blur2-0001"), t) * ms * 0.58);
    }
    if (L._dof) sigma = Math.hypot(sigma, L._dof);
    const shs = fx.filter((f) => f.mn === "ADBE Drop Shadow" && val(kid(f, "ADBE Drop Shadow-0002"), t) > 0.5);
    if (sigma > 0.05 || shs.length) {
      const o2 = getCv(), y = o2.getContext("2d");
      for (const sh of shs) {
        const c = val(kid(sh, "ADBE Drop Shadow-0001"), t), op = val(kid(sh, "ADBE Drop Shadow-0002"), t) / 255, dir = (val(kid(sh, "ADBE Drop Shadow-0003"), t) * Math.PI) / 180, dist = val(kid(sh, "ADBE Drop Shadow-0004"), t) * ms, soft = val(kid(sh, "ADBE Drop Shadow-0005"), t) * ms;
        const s1 = getCv(), z = s1.getContext("2d"); z.filter = `blur(${soft / 2}px)`; z.drawImage(buf, Math.sin(dir) * dist, -Math.cos(dir) * dist);
        z.filter = "none"; z.globalCompositeOperation = "source-in"; z.fillStyle = rgba(c, Math.min(1, op)); z.fillRect(0, 0, W, H);
        y.drawImage(s1, 0, 0); relCv(s1);
      }
      y.drawImage(buf, 0, 0);
      if (sigma > 0.05) { const o3 = getCv(), q = o3.getContext("2d"); q.filter = `blur(${sigma}px)`; q.drawImage(o2, 0, 0); relCv(o2); relCv(buf); out = o3; }
      else { relCv(buf); out = o2; }
    }
    if (L.matte) {
      const ML = LAYERS[L.matte.uid];
      if (ML && inTime(ML, t)) { const mb = renderLayer(ML, t, M0, depth), z = out.getContext("2d"); z.setTransform(1, 0, 0, 1, 0, 0); z.globalAlpha = val(tr(ML, "ADBE Opacity"), t) / 100;
        z.globalCompositeOperation = L.matte.type === 5014 ? "destination-out" : "destination-in"; z.drawImage(mb, 0, 0); z.globalCompositeOperation = "source-over"; z.globalAlpha = 1; relCv(mb); }
      else { out.getContext("2d").clearRect(0, 0, W, H); }
    }
    return out;
  }
  function renderComp(C, t, x, M0, depth) {
    if (depth > 12) throw new Error("comp nesting too deep");
    const vis = [];
    for (let k = C.layers.length - 1; k >= 0; k--) {
      const L = C.layers[k];
      if (!L.enabled && !(OPT.guides && L.guide)) continue;
      if (L.kind === "null" || L.kind === "audio" || L.kind === "camera" || !inTime(L, t)) continue;
      if (L.guide && !OPT.guides) continue;
      vis.push(L);
    }
    const cam = vis.some((L) => L.threeD) ? cameraOf(C, t) : null;
    // runs of adjacent 3D layers are drawn far-to-near (2D layers split the runs, as in AE)
    const order = []; let run = [];
    const flush = () => { run.sort((a, b) => b._z - a._z); order.push(...run); run = []; };
    for (const L of vis) {
      if (cam && L.threeD) {
        const A = affine3(L, t, cam); L._m3 = A.m; L._z = A.z;
        L._dof = cam.dof ? Math.min(60, cam.ap * (cam.bl / 100) * Math.abs(A.z - cam.focus) / A.z / 3) : 0;
        run.push(L);
      } else { flush(); L._m3 = null; L._dof = 0; order.push(L); }
    }
    flush();
    for (const L of order) {
      const op = val(tr(L, "ADBE Opacity"), t) / 100;
      if (op <= 0.001) continue;
      const cv = renderLayer(L, t, M0, depth, L._m3);
      x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = op; x.globalCompositeOperation = BLEND[L.blend] || "source-over"; x.drawImage(cv, 0, 0); x.restore();
      relCv(cv);
    }
  }
  function noonBg(x) {
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#FCEAE9"); g.addColorStop(0.55, "#F7CFCE"); g.addColorStop(1, "#F1AEAD"); x.fillStyle = g; x.fillRect(0, 0, W, H);
  }
  // Render comp `name` at time t into the visible canvas. Resolves once every image needed by the frame has loaded.
  window.simRender = async function (name, t, opt) {
    const C = COMPS[name]; if (!C) throw new Error("no comp " + name);
    W = C.w; H = C.h;
    const view = document.getElementById("view"); view.width = W; view.height = H;
    for (let pass = 0; pass < 6; pass++) {
      CACHE.clear(); PENDING.clear();
      const x = view.getContext("2d"); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = "source-over"; x.filter = "none"; x.clearRect(0, 0, W, H);
      if ((opt && opt.bg) || OPT.bg) noonBg(x);
      renderComp(C, t, x, new DOMMatrix(), 0);
      if (!PENDING.size) break;
      await Promise.all([...PENDING].map((im) => (im.decode ? im.decode().catch(() => {}) : new Promise((r) => { im.onload = im.onerror = r; }))));
    }
    return true;
  };
  window.simErrors = () => [...ERR.entries()].map(([k, n]) => `${k} (x${n})`);
  window.simInfo = (name) => { const C = COMPS[name]; return C ? { w: C.w, h: C.h, dur: C.dur, fps: C.fps, layers: C.layers.length } : null; };
})();
