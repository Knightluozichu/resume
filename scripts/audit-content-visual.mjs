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
const SYSTEM_CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

function parseArgs(argv) {
  const args = {
    book: null,
    chapter: null,
    all: false,
    baseUrl: "http://localhost:3000",
    concurrency: Number(process.env.QUALITY_VISUAL_CONCURRENCY ?? 4),
    writeResults: true,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") args.book = argv[++index] ?? null;
    else if (argument === "--chapter") args.chapter = argv[++index] ?? null;
    else if (argument === "--all") args.all = true;
    else if (argument === "--base-url")
      args.baseUrl = argv[++index] ?? args.baseUrl;
    else if (argument === "--concurrency")
      args.concurrency = Number(argv[++index] ?? args.concurrency);
    else if (argument === "--no-write") args.writeResults = false;
    else if (argument === "--help" || argument === "-h") {
      console.log(
        "用法: pnpm quality:visual -- --book slug [--chapter chapter-slug] [--base-url URL] [--concurrency N] [--no-write]；全库需显式 --all",
      );
      process.exit(0);
    } else throw new Error(`未知参数: ${argument}`);
  }
  if (!args.book && !args.all)
    throw new Error("必须指定 --book slug；全库巡检需显式使用 --all");
  if (args.chapter && !args.book)
    throw new Error("--chapter 必须与 --book 一起使用");
  if (
    !Number.isInteger(args.concurrency) ||
    args.concurrency < 1 ||
    args.concurrency > 8
  )
    throw new Error("--concurrency 必须是 1 到 8 的整数");
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

function findHeadlessShell(chromeExecutablePath) {
  const marker = `${path.sep}chrome${path.sep}`;
  const markerIndex = chromeExecutablePath.indexOf(marker);
  if (markerIndex < 0) return null;
  const cacheRoot = chromeExecutablePath.slice(0, markerIndex);
  const buildDirectory = chromeExecutablePath
    .slice(markerIndex + marker.length)
    .split(path.sep)[0];
  const shellRoot = path.join(
    cacheRoot,
    "chrome-headless-shell",
    buildDirectory,
  );
  const visit = (directory, depth = 0) => {
    if (!fs.existsSync(directory) || depth > 5) return null;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (
        entry.isFile() &&
        ["chrome-headless-shell", "chrome-headless-shell.exe"].includes(
          entry.name,
        )
      )
        return entryPath;
      if (entry.isDirectory()) {
        const nested = visit(entryPath, depth + 1);
        if (nested) return nested;
      }
    }
    return null;
  };
  return visit(shellRoot);
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
  const middlePath = path.join(artifactRoot, `${viewport.name}-middle.png`);
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
    const insideHorizontalScroller = (element) => {
      let ancestor = element.parentElement;
      while (ancestor && ancestor.closest("article")) {
        const style = getComputedStyle(ancestor);
        const rect = ancestor.getBoundingClientRect();
        if (
          /auto|scroll/.test(style.overflowX) &&
          ancestor.scrollWidth > ancestor.clientWidth + 1 &&
          rect.left >= -1 &&
          rect.right <= viewportWidth + 1
        )
          return true;
        ancestor = ancestor.parentElement;
      }
      return false;
    };
    const overflowElements = [...document.querySelectorAll("article *")]
      .filter(
        (element) =>
          isVisible(element) &&
          !inClosedDrawer(element) &&
          !element.closest(".katex-mathml") &&
          // SVG path/circle/line 的局部坐标会在 getBoundingClientRect 中包含
          // viewBox 变换前的巨大几何范围；实际裁切边界由外层 <svg> 决定。
          // 保留 svg 与 text 的检查，只排除不会独立形成页面溢出的几何图元。
          !(element instanceof SVGGeometryElement) &&
          !insideHorizontalScroller(element),
      )
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
    const invalidTermMarkup = [
      ...document.querySelectorAll("article .mdx-term button p"),
    ].map((element) => (element.textContent ?? "").trim().slice(0, 80));
    const orphanProsePunctuation = [
      ...document.querySelectorAll("article .prose > p"),
    ]
      .map((element) => (element.textContent ?? "").trim())
      .filter((text) => /^[、，,。；;：:]+$/.test(text))
      .slice(0, 20);
    const oversizedTerms = [
      ...document.querySelectorAll("article .mdx-term button"),
    ]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent ?? "").trim().slice(0, 80),
          height: Math.round(rect.height),
        };
      })
      .filter((item) => item.height > 48)
      .slice(0, 20);
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
      invalidTermMarkup,
      orphanProsePunctuation,
      oversizedTerms,
      footerText: (document.querySelector("footer")?.textContent ?? "").trim(),
      pageHeight: document.documentElement.scrollHeight,
    };
  });

  const middleTarget = await page.evaluate(() => {
    const target =
      document.querySelector("article [data-term-sequence]") ??
      document.querySelector("article .prose");
    if (!target) return null;
    if (target.hasAttribute("data-term-sequence"))
      target.scrollIntoView({ block: "center", inline: "nearest" });
    else {
      const rect = target.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + rect.top + rect.height / 2);
    }
    return {
      tag: target.tagName,
      termSequence: target.hasAttribute("data-term-sequence"),
    };
  });
  await new Promise((resolve) => setTimeout(resolve, 100));
  await page.screenshot({ path: middlePath });

  const coreTarget = await page.evaluate(() => {
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
    const candidates = [
      ...document.querySelectorAll(
        "article .prose section[aria-label*='实验'], article .prose figure, article .prose section.not-prose, article .prose canvas, article .prose svg",
      ),
    ].filter(isVisible);
    const target =
      candidates.find((element) =>
        element.matches("section[aria-label*='实验']"),
      ) ??
      candidates
        .map((element) => ({
          element,
          area:
            element.getBoundingClientRect().width *
            element.getBoundingClientRect().height,
        }))
        .sort((left, right) => right.area - left.area)[0]?.element ??
      null;
    if (!target) return null;
    target.scrollIntoView({ block: "center", inline: "nearest" });
    const rect = target.getBoundingClientRect();
    return {
      tag: target.tagName,
      label: target.getAttribute("aria-label") ?? "",
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  });
  await new Promise((resolve) => setTimeout(resolve, 100));
  await page.screenshot({ path: corePath });

  let interactionChanged = null;
  let interactiveHandles = await page.$$(
    "article .prose section[aria-label*='实验'] button:not([disabled]), article .prose section[aria-label*='实验'] input[type=range], article .prose section[aria-label*='实验'] select",
  );
  if (interactiveHandles.length === 0)
    interactiveHandles = await page.$$(
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
  // 优先操作显式声明为未选中的按钮，避免重复点击默认状态产生假阴性。
  const buttonHandles = [];
  const otherHandles = [];
  for (const handle of teachingHandles) {
    const tagName = await handle.evaluate((element) => element.tagName);
    (tagName === "BUTTON" ? buttonHandles : otherHandles).push(handle);
  }
  const orderedHandles = [...buttonHandles, ...otherHandles];
  const preferredHandles = [];
  for (const handle of orderedHandles) {
    const isUnselected = await handle.evaluate(
      (element) => element.getAttribute("aria-pressed") === "false",
    );
    if (isUnselected) preferredHandles.push(handle);
  }
  const candidates = [
    ...preferredHandles,
    ...orderedHandles.filter((handle) => !preferredHandles.includes(handle)),
  ];
  let resetRestored = null;
  if (candidates.length > 0) {
    interactionChanged = false;
    for (const handle of candidates.slice(0, 3)) {
      try {
        const container = await handle.evaluateHandle(
          (element) =>
            element.closest("section[aria-label*='实验']") ||
            element.closest(".not-prose") ||
            element.parentElement ||
            element,
        );
        const containerElement = container.asElement();
        if (!containerElement) continue;
        const experimentSelector = "article .prose section[aria-label*='实验']";
        const experimentIndex = await containerElement.evaluate(
          (element, selector) =>
            [...document.querySelectorAll(selector)].indexOf(element),
          experimentSelector,
        );
        const currentContainer = async () => {
          if (experimentIndex < 0) return containerElement;
          return (await page.$$(experimentSelector))[experimentIndex] ?? null;
        };
        const stateSignature = (elementHandle) =>
          elementHandle.evaluate((element) =>
            JSON.stringify({
              controls: [
                ...element.querySelectorAll("button, input, select, textarea"),
              ].map((control) => ({
                text: (control.textContent ?? "").trim(),
                value: "value" in control ? control.value : null,
                pressed: control.getAttribute("aria-pressed"),
                className: control.getAttribute("class"),
              })),
              status: [...element.querySelectorAll("[role='status']")].map(
                (status) => (status.textContent ?? "").trim(),
              ),
            }),
          );
        const beforeState = await stateSignature(containerElement);
        const before = await containerElement.screenshot();
        const tagName = await handle.evaluate((element) => element.tagName);
        if (tagName === "BUTTON")
          await handle.evaluate((element) => element.click());
        else await handle.click();
        await new Promise((resolve) => setTimeout(resolve, 250));
        const afterContainer = await currentContainer();
        if (!afterContainer) continue;
        const afterState = await stateSignature(afterContainer);
        const after = await afterContainer.screenshot();
        if (
          beforeState !== afterState &&
          before &&
          after &&
          digest(before) !== digest(after)
        ) {
          interactionChanged = true;
          const resetHandles = await afterContainer.$$("button");
          const resetHandle = await (async () => {
            for (const candidate of resetHandles) {
              const isReset = await candidate.evaluate((element) =>
                /重置|reset/i.test(
                  `${element.getAttribute("aria-label") ?? ""} ${element.textContent ?? ""}`,
                ),
              );
              if (isReset) return candidate;
            }
            return null;
          })();
          if (resetHandle) {
            await resetHandle.evaluate((element) => element.click());
            await new Promise((resolve) => setTimeout(resolve, 250));
            const resetContainer = await currentContainer();
            resetRestored = Boolean(
              resetContainer &&
              (await stateSignature(resetContainer)) === beforeState,
            );
          } else resetRestored = false;
          break;
        }
      } catch {
        // 当前控件可能因前一次操作重绘而失效，继续尝试下一个。
      }
    }
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
  if (metrics.invalidTermMarkup.length > 0)
    findings.push({
      severity: "high",
      code: "invalid-term-markup",
      detail: metrics.invalidTermMarkup,
    });
  if (metrics.orphanProsePunctuation.length > 0)
    findings.push({
      severity: "high",
      code: "orphan-prose-punctuation",
      detail: metrics.orphanProsePunctuation,
    });
  if (metrics.oversizedTerms.length > 0)
    findings.push({
      severity: "high",
      code: "term-control-block-layout",
      detail: metrics.oversizedTerms,
    });
  if (metrics.visualCount === 0)
    findings.push({
      severity: "high",
      code: "chapter-visual-missing",
      detail: "页面没有章节视觉",
    });
  if (!coreTarget || coreTarget.width < 200 || coreTarget.height < 120)
    findings.push({
      severity: "high",
      code: "core-evidence-target-invalid",
      detail: coreTarget ?? "没有可截图的核心教学区",
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
  if (interactionChanged === true && resetRestored !== true)
    findings.push({
      severity: "high",
      code: "interaction-reset-failed",
      detail: "教学控件改变后未恢复初始状态",
    });
  if (metrics.canvasCount > 0 && !metrics.fallbackText)
    findings.push({
      severity: "high",
      code: "canvas-fallback-undocumented",
      detail: `canvas=${metrics.canvasCount}`,
    });
  if (
    chapter.bookSlug !== "learnopengl" &&
    /改编自\s*LearnOpenGL/i.test(metrics.footerText)
  )
    findings.push({
      severity: "high",
      code: "global-attribution-mismatch",
      detail: "非 LearnOpenGL 书籍错误继承了 LearnOpenGL 授权声明",
    });
  const evidence = [topPath, middlePath, corePath, endPath].map((filePath) =>
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
      middleTarget,
      coreTarget,
    },
    interactionChanged,
    resetRestored,
  };
}

async function inspectChapter(browser, chapter, baseUrl) {
  const viewports = [];
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage();
    try {
      viewports.push(await inspectViewport(page, chapter, viewport, baseUrl));
    } finally {
      await page.close();
    }
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
const pinnedChromePath = await puppeteer.executablePath();
const executablePath = [
  process.env.CHROME_PATH,
  findHeadlessShell(pinnedChromePath),
  pinnedChromePath,
  ...SYSTEM_CHROME_CANDIDATES,
].find((candidate) => candidate && fs.existsSync(candidate));
const browser = await puppeteer.launch({
  headless: true,
  timeout: 60000,
  ...(executablePath ? { executablePath } : {}),
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    // macOS 可能在读取登录钥匙串时阻塞无头浏览器；巡检不需要真实凭据。
    "--use-mock-keychain",
    "--password-store=basic",
  ],
});
const previous = fs.existsSync(RESULT_PATH)
  ? JSON.parse(fs.readFileSync(RESULT_PATH, "utf8"))
  : { version: 1, chapters: {} };
const results = { ...previous.chapters };
try {
  let nextIndex = 0;
  const inspectNext = async () => {
    while (nextIndex < chapters.length) {
      const index = nextIndex++;
      const chapter = chapters[index];
      results[chapter.id] = await inspectChapter(
        browser,
        chapter,
        args.baseUrl,
      );
      console.log(
        `[${index + 1}/${chapters.length}] ${chapter.id}: ${results[chapter.id].pass ? "PASS" : "FAIL"}`,
      );
    }
  };
  await Promise.all(
    Array.from(
      { length: Math.min(args.concurrency, chapters.length) },
      inspectNext,
    ),
  );
} finally {
  await browser.close();
}
if (args.writeResults) {
  ensureDirectory(path.dirname(RESULT_PATH));
  fs.writeFileSync(
    RESULT_PATH,
    `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), chapters: results }, null, 2)}\n`,
  );
}
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
