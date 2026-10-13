// page_images.cjs: save every image a page loads (bigger than MIN_KB) while scrolling it, the way a reader sees it.
// Usage: node page_images.cjs URL OUT_DIR PREFIX [MIN_KB=60]
const { chromium } = require("playwright"); const fs = require("fs"); const path = require("path");
const [url, outDir, prefix, minKB] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" });
  const seen = new Set(); let n = 0; const saves = [];
  p.on("response", async (r) => {
    try {
      const ct = r.headers()["content-type"] || ""; if (!/image\/(jpeg|png|webp|avif|gif)/.test(ct)) return;
      const u = r.url(); const key = u.split("?")[0]; if (seen.has(key)) return; seen.add(key);
      const buf = await r.body(); if (buf.length < (+minKB || 60) * 1024) return;
      n++; const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : ct.includes("avif") ? "avif" : ct.includes("gif") ? "gif" : "jpg";
      const f = path.join(outDir, `${prefix}_${String(n).padStart(2, "0")}.${ext}`); fs.writeFileSync(f, buf); saves.push([f, u.slice(0, 120), buf.length]);
    } catch (e) {}
  });
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 }); await p.waitForTimeout(3000);
  for (let i = 0; i < 14; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(700); }
  await p.waitForTimeout(2000);
  for (const s of saves) console.log(s.join("  "));
  await b.close();
})();
