// article_capture.cjs: full-page screenshot of a news article + the page rectangles of phrases to highlight.
// Usage: node article_capture.cjs URL OUT_BASENAME VIEWPORT_WIDTH "phrase one" "phrase two" ...
//   writes OUT.png (deviceScaleFactor 2, so image px = 2 x the rects) and OUT.json ({phrase: [[x,y,w,h], ...], __h1, __page}).
// Hides cookie banners, consent iframes and fixed headers first. Needs: npm i playwright && npx playwright install chromium.
// Used for Video 4 (MM.PAGES rects in mm_doc.jsx). Check the rects visually: sites reflow, so recalibrate after cropping.
const { chromium } = require("playwright"); const fs = require("fs");
const [url, out, w, ...phrases] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 1100 }, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" });
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }); await p.waitForTimeout(5000);
  for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(450); }
  await p.evaluate(() => { window.scrollTo(0, 0);
    for (const el of document.querySelectorAll('[id*="cookie" i],[class*="cookie-" i],[id*="consent" i],iframe')) el.style.display = "none";
    for (const el of document.querySelectorAll("*")) { const s = getComputedStyle(el); if (s.position === "fixed") el.style.display = "none"; } });
  await p.waitForTimeout(1500);
  const rects = await p.evaluate((phrases) => {
    const out = {}; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = []; let n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (const ph of phrases) {
      for (const nd of nodes) { const i = nd.textContent.indexOf(ph); if (i < 0) continue;
        const r = document.createRange(); r.setStart(nd, i); r.setEnd(nd, i + ph.length);
        const rs = Array.from(r.getClientRects()).filter(q => q.width > 2).map(q => [Math.round(q.left + scrollX), Math.round(q.top + scrollY), Math.round(q.width), Math.round(q.height)]);
        if (rs.length) { out[ph] = rs; break; } }
      if (!out[ph]) out[ph] = null;
    }
    const h1 = document.querySelector("h1").getBoundingClientRect();
    out.__h1 = [Math.round(h1.left + scrollX), Math.round(h1.top + scrollY), Math.round(h1.width), Math.round(h1.height)];
    out.__page = [document.documentElement.scrollWidth, document.documentElement.scrollHeight];
    return out; }, phrases);
  const H = Math.min(rects.__page[1], 9000);
  await p.screenshot({ path: out + ".png", fullPage: false, clip: { x: 0, y: 0, width: +w, height: H } , fullPage: true });
  fs.writeFileSync(out + ".json", JSON.stringify(rects, null, 1)); console.log(JSON.stringify(rects));
  await b.close();
})();
