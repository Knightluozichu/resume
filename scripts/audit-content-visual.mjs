#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";
import puppeteer from "puppeteer";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const RESULT_PATH = path.join(ROOT, "quality/visual-results.json");
const ARTIFACT_DIR = path.join(ROOT, "quality/artifacts/visual");
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const LOCAL_CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
].filter(Boolean);

function parseArgs(argv) {
  const args = {
    book: null,
    chapter: null,
    all: false,
    baseUrl: "http://localhost:3000",
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") args.book = argv[++index] ?? null;
    else if (argument === "--chapter") args.chapter = argv[++index] ?? null;
    else if (argument === "--all") args.all = true;
    else if (argument === "--base-url")
      args.baseUrl = argv[++index] ?? args.baseUrl;
    else if (argument === "--help" || argument === "-h") {
      console.log(
        "用法: pnpm quality:visual -- --book slug [--chapter chapter-slug] [--base-url URL]；全库需显式 --all",
      );
      process.exit(0);
    } else throw new Error(`未知参数: ${argument}`);
  }
  if (!args.book && !args.all)
    throw new Error("必须指定 --book slug；全库巡检需显式使用 --all");
  if (args.chapter && !args.book)
    throw new Error("--chapter 必须与 --book 一起使用");
  return args;
}

function walkMdx(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function chaptersFor(args) {
  const roots = args.book
    ? [path.join(CONTENT_DIR, args.book)]
    : fs
        .readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(CONTENT_DIR, entry.name));
  return roots
    .flatMap(walkMdx)
    .map((filePath) => {
      const relative = path
        .relative(CONTENT_DIR, filePath)
        .replaceAll(path.sep, "/");
      const [bookSlug, sectionSlug, fileName] = relative.split("/");
      const chapterSlug = fileName.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(filePath, "utf8");
      const frontmatter = matter(raw).data;
      return {
        id: `${bookSlug}/${sectionSlug}/${chapterSlug}`,
        bookSlug,
        sectionSlug,
        chapterSlug,
        title: String(frontmatter.title ?? chapterSlug),
        url: `/learn/${bookSlug}/${sectionSlug}/${chapterSlug}`,
        contentHash: crypto
          .createHash("sha256")
          .update(raw)
          .digest("hex")
          .slice(0, 16),
      };
    })
    .filter((chapter) => !args.chapter || chapter.chapterSlug === args.chapter);
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function digest(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

async function inspectViewport(page, chapter, viewport, baseUrl) {
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  const consoleErrors = [];
  const onConsole = (message) => {
    const value = message.text();
    const sourceUrl = message.location().url ?? "";
    // 本地/候选端口不会被 Cloudflare RUM 的生产域名 CORS 白名单接受；
    // 这是外部遥测噪声，不代表课程运行时错误。
    if (
      message.type() === "error" &&
      !/cloudflareinsights\.com|cdn-cgi\/rum/.test(`${value} ${sourceUrl}`)
    )
      consoleErrors.push(value.slice(0, 500));
  };
  const onPageError = (error) =>
    consoleErrors.push((error.stack || error.message).slice(0, 1500));
  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  let navigationError = null;
  try {
    await page.goto(`${baseUrl}${chapter.url}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
  } catch (error) {
    navigationError = error instanceof Error ? error.message : String(error);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));

  const artifactRoot = path.join(ARTIFACT_DIR, chapter.id);
  ensureDirectory(artifactRoot);
  const topPath = path.join(artifactRoot, `${viewport.name}-top.png`);
  const corePath = path.join(artifactRoot, `${viewport.name}-core.png`);
  const endPath = path.join(artifactRoot, `${viewport.name}-end.png`);
  await page.screenshot({ path: topPath });

  const metrics = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        Number(style.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const inClosedDrawer = (element) => {
      const drawer = element.closest("aside.fixed");
      if (!drawer) return false;
      return drawer.getBoundingClientRect().right <= 0;
    };
    const overflowElements = [...document.querySelectorAll("article *")]
      .filter((element) => isVisible(element) && !inClosedDrawer(element))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          text: (element.textContent ?? "").trim().slice(0, 80),
          left: rect.left,
          right: rect.right,
          width: rect.width,
        };
      })
      .filter((item) => item.left < -1 || item.right > viewportWidth + 1)
      .slice(0, 20);
    const smallSvgText = [...document.querySelectorAll("article svg text")]
      .filter(isVisible)
      .map((element) => ({
        text: (element.textContent ?? "").trim().slice(0, 80),
        size: Number.parseFloat(getComputedStyle(element).fontSize || "0"),
      }))
      .filter((item) => item.size > 0 && item.size < 11)
      .slice(0, 20);
    const controls = [
      ...document.querySelectorAll(
        "article .prose .not-prose button, article .prose .not-prose input, article .prose .not-prose select, article .prose .not-prose textarea",
      ),
    ].filter(isVisible);
    const smallControls = controls
      .map((element) => {
        const hitTarget =
          element instanceof HTMLInputElement &&
          (element.type === "checkbox" || element.type === "radio")
            ? element.closest("label") || element
            : element;
        const rect = hitTarget.getBoundingClientRect();
        return {
          label:
            element.getAttribute("aria-label") ||
            (element.textContent ?? "").trim().slice(0, 80),
          width: rect.width,
          height: rect.height,
        };
      })
      .filter((item) => item.width < 44 || item.height < 44)
      .slice(0, 20);
    const resetControls = controls.filter((element) =>
      /重置|reset/i.test(
        `${element.getAttribute("aria-label") ?? ""} ${element.textContent ?? ""}`,
      ),
    );
    const visualCount = document.querySelectorAll(
      "article .prose figure, article .prose svg, article .prose canvas, article .prose section.not-prose",
    ).length;
    const canvasCount = document.querySelectorAll(
      "article .prose canvas",
    ).length;
    const fallbackText = /不支持|降级|fallback|截图|静态图/i.test(
      document.querySelector("article")?.textContent ?? "",
    );
    return {
      horizontalOverflow:
        document.documentElement.scrollWidth > viewportWidth + 1,
      overflowElements,
      smallSvgText,
      controlCount: controls.length,
      smallControls,
      resetCount: resetControls.length,
      visualCount,
      canvasCount,
      fallbackText,
      pageHeight: document.documentElement.scrollHeight,
    };
  });

  const visualHandle = await page.$(
    "article .prose figure, article .prose section.not-prose, article .prose svg, article .prose canvas",
  );
  if (visualHandle) await visualHandle.screenshot({ path: corePath });
  else await page.screenshot({ path: corePath });

  let interactionChanged = null;
  const interactiveHandles = await page.$$(
    "article .prose .not-prose button:not([disabled]), article .prose .not-prose input[type=range], article .prose .not-prose select",
  );
  const teachingHandles = [];
  for (const handle of interactiveHandles) {
    const isReset = await handle.evaluate((element) =>
      /重置|reset/i.test(
        `${element.getAttribute("aria-label") ?? ""} ${element.textContent ?? ""}`,
      ),
    );
    if (!isReset) teachingHandles.push(handle);
  }
  // 选择组的第一个按钮往往正是默认选中项。优先点击第二个教学按钮，
  // 避免先触发 range 中点和多个连续状态变更，保证检查本身不干扰 React。
  const buttonHandles = [];
  const otherHandles = [];
  for (const handle of teachingHandles) {
    const tagName = await handle.evaluate((element) => element.tagName);
    (tagName === "BUTTON" ? buttonHandles : otherHandles).push(handle);
  }
  const orderedHandles =
    buttonHandles.length > 1
      ? [
          buttonHandles[1],
          ...buttonHandles.slice(2),
          buttonHandles[0],
          ...otherHandles,
        ]
      : [...buttonHandles, ...otherHandles];
  if (orderedHandles.length > 0) {
    interactionChanged = false;
    for (const handle of orderedHandles.slice(0, 3)) {
      try {
        const container = await handle.evaluateHandle(
          (element) =>
            element.closest(".not-prose") || element.parentElement || element,
        );
        const before = await container.asElement()?.screenshot();
        await handle.click();
        await new Promise((resolve) => setTimeout(resolve, 250));
        const after = await container.asElement()?.screenshot();
        if (before && after && digest(before) !== digest(after)) {
          interactionChanged = true;
          break;
        }
      } catch {
        // 当前控件可能因前一次操作重绘而失效，继续尝试下一个。
      }
    }
    const resetHandle = await page.evaluateHandle(() => {
      const controls = [
        ...document.querySelectorAll("article .prose .not-prose button"),
      ];
      return (
        controls.find((element) =>
          /重置|reset/i.test(
            `${element.getAttribute("aria-label") ?? ""} ${element.textContent ?? ""}`,
          ),
        ) ?? null
      );
    });
    if (resetHandle.asElement()) await resetHandle.asElement().click();
  }

  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await new Promise((resolve) => setTimeout(resolve, 100));
  await page.screenshot({ path: endPath });
  page.off("console", onConsole);
  page.off("pageerror", onPageError);

  const findings = [];
  if (navigationError)
    findings.push({
      severity: "high",
      code: "navigation-error",
      detail: navigationError.slice(0, 500),
    });
  if (metrics.horizontalOverflow || metrics.overflowElements.length > 0)
    findings.push({
      severity: "high",
      code: "horizontal-overflow",
      detail: metrics.overflowElements,
    });
  if (metrics.smallSvgText.length > 0)
    findings.push({
      severity: "high",
      code: "svg-text-too-small",
      detail: metrics.smallSvgText,
    });
  if (viewport.name === "mobile" && metrics.smallControls.length > 0)
    findings.push({
      severity: "high",
      code: "touch-target-too-small",
      detail: metrics.smallControls,
    });
  if (consoleErrors.length > 0)
    findings.push({
      severity: "high",
      code: "console-error",
      detail: consoleErrors,
    });
  if (metrics.visualCount === 0)
    findings.push({
      severity: "high",
      code: "chapter-visual-missing",
      detail: "页面没有章节视觉",
    });
  if (metrics.controlCount > 0 && metrics.resetCount === 0)
    findings.push({
      severity: "high",
      code: "reset-control-missing",
      detail: `controls=${metrics.controlCount}`,
    });
  if (interactionChanged === false)
    findings.push({
      severity: "high",
      code: "interaction-no-visible-change",
      detail: "首个教学控件操作前后没有可见变化",
    });
  if (metrics.canvasCount > 0 && !metrics.fallbackText)
    findings.push({
      severity: "high",
      code: "canvas-fallback-undocumented",
      detail: `canvas=${metrics.canvasCount}`,
    });
  const evidence = [topPath, corePath, endPath].map((filePath) =>
    path.relative(ROOT, filePath).replaceAll(path.sep, "/"),
  );
  const score = Math.max(
    0,
    10 - findings.filter((finding) => finding.severity === "high").length * 2,
  );
  return {
    viewport,
    pass: findings.length === 0,
    score,
    findings,
    evidence,
    metrics: {
      visualCount: metrics.visualCount,
      controlCount: metrics.controlCount,
      pageHeight: metrics.pageHeight,
    },
    interactionChanged,
  };
}

async function inspectChapter(browser, chapter, baseUrl) {
  const page = await browser.newPage();
  const viewports = [];
  try {
    for (const viewport of VIEWPORTS)
      viewports.push(await inspectViewport(page, chapter, viewport, baseUrl));
  } finally {
    await page.close();
  }
  const findings = viewports.flatMap((result) =>
    result.findings.map((finding) => ({
      ...finding,
      viewport: result.viewport.name,
    })),
  );
  const evidence = viewports.flatMap((result) => result.evidence);
  return {
    contentHash: chapter.contentHash,
    pass: findings.length === 0,
    score: Math.min(...viewports.map((result) => result.score)),
    findings,
    evidence,
    viewports,
  };
}

const args = parseArgs(process.argv.slice(2));
const chapters = chaptersFor(args);
const executablePath = LOCAL_CHROME_CANDIDATES.find((candidate) =>
  fs.existsSync(candidate),
);
const browser = await puppeteer.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const previous = fs.existsSync(RESULT_PATH)
  ? JSON.parse(fs.readFileSync(RESULT_PATH, "utf8"))
  : { version: 1, chapters: {} };
const results = { ...previous.chapters };
try {
  for (let index = 0; index < chapters.length; index += 1) {
    const chapter = chapters[index];
    results[chapter.id] = await inspectChapter(browser, chapter, args.baseUrl);
    console.log(
      `[${index + 1}/${chapters.length}] ${chapter.id}: ${results[chapter.id].pass ? "PASS" : "FAIL"}`,
    );
  }
} finally {
  await browser.close();
}
ensureDirectory(path.dirname(RESULT_PATH));
fs.writeFileSync(
  RESULT_PATH,
  `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), chapters: results }, null, 2)}\n`,
);
const failed = chapters.filter((chapter) => !results[chapter.id]?.pass);
console.log(
  JSON.stringify(
    {
      checked: chapters.length,
      failed: failed.length,
      failures: failed.map((chapter) => ({
        id: chapter.id,
        findings: results[chapter.id].findings,
      })),
    },
    null,
    2,
  ),
);
if (failed.length > 0) process.exitCode = 1;
