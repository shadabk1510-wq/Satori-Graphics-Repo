// fetch_in_page.cjs: download images with fetch() inside a real page (same cookies and bot checks as the site).
// Use when curl gets 403 from a site. Usage: node fetch_in_page.cjs LIST.tsv OUT_DIR REFERER_URL
//   LIST.tsv lines: <file name>\t<url 1>\t<url 2 (fallback)>...
const { chromium } = require("playwright"); const fs = require("fs");
const [list, outDir, ref] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36" });
  const p = await ctx.newPage(); await p.goto(ref, { waitUntil: "domcontentloaded", timeout: 45000 }); await p.waitForTimeout(2500);
  for (const line of fs.readFileSync(list, "utf8").split("\n").filter(Boolean)) {
    const [name, ...cands] = line.split("\t"); let ok = false;
    for (const u of cands) {
      const b64 = await p.evaluate(async (u) => { try { const r = await fetch(u); if (!r.ok) return "ERR" + r.status; const a = new Uint8Array(await r.arrayBuffer()); let s = ""; for (let i = 0; i < a.length; i += 32768) s += String.fromCharCode.apply(null, a.subarray(i, i + 32768)); return btoa(s); } catch (e) { return "ERR " + e.message; } }, u);
      if (!b64.startsWith("ERR") && b64.length > 7000) { fs.writeFileSync(outDir + "/" + name, Buffer.from(b64, "base64")); console.log(name, Math.round(b64.length * 0.75)); ok = true; break; }
      else console.log(name, "try", b64.slice(0, 40));
    }
    if (!ok) console.log(name, "FAILED");
  }
  await b.close();
})();
