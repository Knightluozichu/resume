import puppeteer from "puppeteer";

/**
 * 验证某章页面 Stepper 三步各自的动画图（TimelineControls）具备：
 *  1. 独立播放控件（播放/暂停按钮 + 进度条 + 步点条）
 *  2. 字幕同步：点动画的"下一步"后当前步文案随之变化
 *
 * 结构假设：页面用 <Stepper>（section.mdx-stepper），每步内容里有一个
 * <figure class="mdx-figure"> 内嵌 TimelineControls（含 input[type=range]）。
 *
 * 用法：CHROME_PATH=<headless-shell> node scripts/verify-diagram-anim.mjs <urlPath>
 */

const BASE = process.env.BASE_URL || "http://localhost:3000";
const urlPath = process.argv[2];
if (!urlPath) {
  console.error("用法: node scripts/verify-diagram-anim.mjs <urlPath>");
  process.exit(1);
}

const url = `${BASE}${urlPath}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const launchOptions = { headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] };
if (process.env.CHROME_PATH) launchOptions.executablePath = process.env.CHROME_PATH;
const browser = await puppeteer.launch(launchOptions);

let exitCode = 0;
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1000 });

  const errors = [];
  // 分析/埋点类请求（dev 环境噪音，与组件无关）
  const isAnalytics = (u = "") =>
    /cloudflareinsights|cdn-cgi\/rum|google-analytics|googletagmanager|vercel-insights|\/analytics\//.test(u);
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (req) => {
    if (!isAnalytics(req.url())) errors.push(`requestfailed: ${req.url()} (${req.failure()?.errorText})`);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const t = msg.text();
      const loc = msg.location()?.url || "";
      // 过滤分析脚本 CORS / 资源失败噪音（requestfailed 已精确捕获真实失败）
      if (isAnalytics(t) || isAnalytics(loc)) return;
      if (/Failed to load resource/.test(t)) return;
      errors.push(`console.error: ${t}`);
    }
  });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector("section.mdx-stepper", { timeout: 30000 });

  const stepCount = await page.evaluate(() => {
    const sec = document.querySelector("section.mdx-stepper");
    return sec.querySelectorAll(":scope > ol button").length;
  });

  console.log(`\n页面: ${url}`);
  console.log(`Stepper 共 ${stepCount} 步\n`);

  for (let i = 0; i < stepCount; i++) {
    // 切到第 i 步
    await page.evaluate((idx) => {
      const sec = document.querySelector("section.mdx-stepper");
      sec.querySelectorAll(":scope > ol button")[idx].click();
    }, i);
    await sleep(700); // 等懒加载动画组件挂载

    // 读取当前步内动画图控件信息
    const info = await page.evaluate(() => {
      const sec = document.querySelector("section.mdx-stepper");
      const fig = Array.from(sec.querySelectorAll("figure.mdx-figure")).find((f) =>
        f.querySelector('input[type="range"]'),
      );
      if (!fig) return { found: false };
      const controls = fig.querySelector('input[type="range"]').closest(".not-prose");
      const buttons = Array.from(controls.querySelectorAll("button"));
      const playBtn = buttons.find((b) =>
        /播放|暂停/.test(b.getAttribute("aria-label") || ""),
      );
      const stepDots = controls.querySelectorAll("ol button");
      const captionEl = Array.from(controls.querySelectorAll("p")).find((p) =>
        /第\s*\d+\s*\/\s*\d+\s*步/.test(p.textContent || ""),
      );
      return {
        found: true,
        hasPlay: !!playBtn,
        stepCount: stepDots.length,
        caption: captionEl?.textContent?.trim() || "",
      };
    });

    if (!info.found) {
      exitCode = 1;
      console.log(`  步${i + 1}: ✗ 未找到动画图（figure 内无 TimelineControls）`);
      continue;
    }

    // 字幕同步：点动画"下一步"，等待 React 更新，再读文案
    const before = info.caption;
    await page.evaluate(() => {
      const sec = document.querySelector("section.mdx-stepper");
      const fig = Array.from(sec.querySelectorAll("figure.mdx-figure")).find((f) =>
        f.querySelector('input[type="range"]'),
      );
      const controls = fig.querySelector('input[type="range"]').closest(".not-prose");
      const nextBtn = Array.from(controls.querySelectorAll("button")).find((b) =>
        /下一步/.test(b.textContent || ""),
      );
      if (nextBtn && !nextBtn.disabled) nextBtn.click();
    });
    await sleep(450);
    const after = await page.evaluate(() => {
      const sec = document.querySelector("section.mdx-stepper");
      const fig = Array.from(sec.querySelectorAll("figure.mdx-figure")).find((f) =>
        f.querySelector('input[type="range"]'),
      );
      const controls = fig.querySelector('input[type="range"]').closest(".not-prose");
      const captionEl = Array.from(controls.querySelectorAll("p")).find((p) =>
        /第\s*\d+\s*\/\s*\d+\s*步/.test(p.textContent || ""),
      );
      return captionEl?.textContent?.trim() || "";
    });

    const captionChanged = before !== after;
    const ok = info.hasPlay && info.stepCount >= 2 && captionChanged;
    if (!ok) exitCode = 1;
    console.log(
      `  步${i + 1}: 播放键=${info.hasPlay ? "✓" : "✗"} 步点=${info.stepCount} 字幕同步=${captionChanged ? "✓" : "✗"}`,
    );
    console.log(`       步前: ${before}`);
    console.log(`       步后: ${after}`);
  }

  if (errors.length > 0) {
    exitCode = 1;
    console.log(`\n运行时错误 (${errors.length}):`);
    for (const e of errors) console.log(`  ✗ ${e}`);
  } else {
    console.log("\n无运行时错误 ✓");
  }

  console.log(exitCode === 0 ? `\n✅ 通过` : `\n❌ 未通过`);
} finally {
  await browser.close();
}

process.exit(exitCode);
