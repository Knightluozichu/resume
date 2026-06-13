// 桌面宽屏真 GPU 截图（headful + 离屏 + 禁用遮挡节流，不打扰用户）。
// 用法：node scripts/shot.mjs <url> <out> [w] [h]
import puppeteer from "puppeteer-core";
const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: false,
  args: [
    "--no-sandbox",
    `--window-size=${w},${+h + 120}`,
    "--window-position=-4000,200",
    "--ignore-gpu-blocklist",
    "--enable-gpu",
    // 关键：禁止 Chrome 因窗口离屏/遮挡而暂停渲染，保证离屏窗口仍出 GPU 帧
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-features=CalculateNativeWinOcclusion",
    "--disable-backgrounding-occluded-windows",
  ],
});
const p = await b.newPage();
await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 7000));
await p.screenshot({ path: out });
await b.close();
console.log("shot saved:", out, `${w}x${h}`);
