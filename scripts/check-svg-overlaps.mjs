/**
 * check-svg-overlaps.mjs
 *
 * SVG 图质量验收（7 维），HEL-222 升级版。
 *
 * 检测维度（HIGH/MID/LOW 三级）：
 *  1. HIGH · rect-rect 重叠 >30%（滤父子嵌套、滤同位置叠加范式）
 *  2. HIGH · text 落入错误 rect（中心在 A 框但 bbox >20% 伸进 B 框）
 *  3. HIGH · text 被 viewBox 裁剪（左/上/右/下任意方向溢出 >2px）
 *  4. MID  · viewBox 利用率异常（<0.5 浪费 / >1.05 溢出）
 *  5. MID  · 节点贴边（距 viewBox 任意边 <12px）
 *  6. LOW  · 节点密度过高（rect 数 / (svgW*svgH/10000) > 8）
 *  7. HIGH · 客户端动画图 hydration 等待（含可交互/下一步控件再等 1000ms）
 *
 * 输出：
 *  - 控制台：按级排序、HIGH/MID/LOW 前缀
 *  - scripts/svg-overlap-report.txt（人读，兼容旧约定）
 *  - scripts/svg-quality-report.json（机读，summary + byPage）
 *
 * Exit code：HIGH > 0 → 1，否则 0（便于 CI/deploy 前置门禁）
 *
 * Usage: pnpm svg-check
 * Requires: dev server 在 http://localhost:3000
 */
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const BASE = "http://localhost:3000";
const REPORT_TXT = path.resolve("scripts/svg-overlap-report.txt");
const REPORT_JSON = path.resolve("scripts/svg-quality-report.json");

// All pages that contain diagrams
const PAGES = [
  // LearnOpenGL
  "/learn/learnopengl/getting-started/hello-window",
  "/learn/learnopengl/getting-started/hello-triangle",
  "/learn/learnopengl/getting-started/shaders",
  "/learn/learnopengl/getting-started/textures",
  "/learn/learnopengl/getting-started/transformations",
  "/learn/learnopengl/getting-started/coordinate-systems",
  "/learn/learnopengl/getting-started/camera",
  "/learn/learnopengl/lighting/basic-lighting",
  "/learn/learnopengl/lighting/light-casters",
  "/learn/learnopengl/lighting/lighting-maps",
  "/learn/learnopengl/lighting/multiple-lights",
  "/learn/learnopengl/model-loading/assimp",
  "/learn/learnopengl/model-loading/mesh",
  "/learn/learnopengl/model-loading/model",
  "/learn/learnopengl/advanced-opengl/depth-testing",
  "/learn/learnopengl/advanced-opengl/stencil-testing",
  "/learn/learnopengl/advanced-opengl/blending",
  "/learn/learnopengl/advanced-opengl/face-culling",
  "/learn/learnopengl/advanced-opengl/framebuffers",
  "/learn/learnopengl/advanced-opengl/cubemaps",
  "/learn/learnopengl/advanced-opengl/advanced-data",
  "/learn/learnopengl/advanced-opengl/advanced-glsl",
  "/learn/learnopengl/advanced-opengl/geometry-shader",
  "/learn/learnopengl/advanced-opengl/instancing",
  "/learn/learnopengl/advanced-opengl/anti-aliasing",
  "/learn/learnopengl/advanced-lighting/blinn-phong",
  "/learn/learnopengl/advanced-lighting/gamma-correction",
  "/learn/learnopengl/advanced-lighting/shadow-mapping",
  "/learn/learnopengl/advanced-lighting/point-shadows",
  "/learn/learnopengl/advanced-lighting/normal-mapping",
  "/learn/learnopengl/advanced-lighting/parallax-mapping",
  "/learn/learnopengl/advanced-lighting/hdr",
  "/learn/learnopengl/advanced-lighting/bloom",
  "/learn/learnopengl/advanced-lighting/deferred-shading",
  "/learn/learnopengl/advanced-lighting/ssao",
  // C++ Primer
  "/learn/cpp-primer-5e/cpp-basics/getting-started",
  "/learn/cpp-primer-5e/cpp-basics/variables-and-types",
  "/learn/cpp-primer-5e/cpp-basics/strings-vectors-and-arrays",
  "/learn/cpp-primer-5e/cpp-basics/expressions",
  "/learn/cpp-primer-5e/cpp-basics/statements",
  "/learn/cpp-primer-5e/cpp-basics/functions",
  "/learn/cpp-primer-5e/cpp-basics/classes",
  "/learn/cpp-primer-5e/cpp-library/sequential-containers",
  "/learn/cpp-primer-5e/cpp-library/generic-algorithms",
  "/learn/cpp-primer-5e/cpp-library/associative-containers",
  "/learn/cpp-primer-5e/cpp-library/dynamic-memory",
  "/learn/cpp-primer-5e/cpp-library/io-library",
  "/learn/cpp-primer-5e/cpp-class-design/copy-control",
  "/learn/cpp-primer-5e/cpp-class-design/overloaded-operations",
  "/learn/cpp-primer-5e/cpp-class-design/oop",
  "/learn/cpp-primer-5e/cpp-class-design/templates",
  "/learn/cpp-primer-5e/cpp-advanced/large-programs",
  "/learn/cpp-primer-5e/cpp-advanced/specialized-library",
  "/learn/cpp-primer-5e/cpp-advanced/specialized-tools",
  // C Primer Plus
  "/learn/c-primer-plus/c-basics/getting-ready",
  "/learn/c-primer-plus/c-basics/introducing-c",
  "/learn/c-primer-plus/c-basics/data-and-c",
  "/learn/c-primer-plus/c-basics/strings-io",
  "/learn/c-primer-plus/c-basics/operators-expressions",
  "/learn/c-primer-plus/c-control-io/control-loops",
  "/learn/c-primer-plus/c-control-io/control-branching",
  "/learn/c-primer-plus/c-control-io/char-io-validation",
  "/learn/c-primer-plus/c-func-array-ptr/functions",
  "/learn/c-primer-plus/c-func-array-ptr/arrays-pointers",
  "/learn/c-primer-plus/c-func-array-ptr/strings-functions",
  "/learn/c-primer-plus/c-advanced/storage-linkage-memory",
  "/learn/c-primer-plus/c-advanced/file-io",
  "/learn/c-primer-plus/c-advanced/structures",
  "/learn/c-primer-plus/c-advanced/bit-fiddling",
  "/learn/c-primer-plus/c-advanced/preprocessor",
  "/learn/c-primer-plus/c-advanced/advanced-data",
  // Android
  "/learn/android-advanced-decryption/system-architecture/android-architecture",
  "/learn/android-advanced-decryption/system-boot/system-startup",
  "/learn/android-advanced-decryption/process-management/app-process-startup",
  // Unity Game Optimization
  "/learn/unity-game-optimization/base-scripting/evaluating-performance-problems",
  "/learn/unity-game-optimization/base-scripting/scripting-strategies",
  "/learn/unity-game-optimization/graphical-optimizations/benefits-of-batching",
  "/learn/unity-game-optimization/graphical-optimizations/optimizing-art-assets",
  "/learn/unity-game-optimization/graphical-optimizations/faster-physics",
  "/learn/unity-game-optimization/graphical-optimizations/dynamic-graphics",
  "/learn/unity-game-optimization/advanced-optimizations/xr-optimizations",
  "/learn/unity-game-optimization/advanced-optimizations/memory-management",
  "/learn/unity-game-optimization/advanced-optimizations/data-oriented-technology-stack",
  "/learn/unity-game-optimization/advanced-optimizations/tactical-tips-and-tricks",
  // Profiling Unity Games
  "/learn/profiling-unity-games/profiling-workflow/profiling-workflow-baseline",
  "/learn/profiling-unity-games/profiling-workflow/profile-analyzer-regression",
  "/learn/profiling-unity-games/cpu-profiling/cpu-profiler-deep-dive",
  "/learn/profiling-unity-games/gpu-profiling/gpu-performance-analysis",
  "/learn/profiling-unity-games/memory-and-power/memory-profiler",
  "/learn/profiling-unity-games/memory-and-power/power-optimization",
  "/learn/profiling-unity-games/platform-specific/platform-specific-profiling",
  // Mobile/XR/Web
  "/learn/mobile-xr-web-optimization/urp-optimization/mobile-optimization",
  "/learn/mobile-xr-web-optimization/urp-optimization/urp-optimization",
  "/learn/mobile-xr-web-optimization/web-optimization/web-specific-optimization",
  "/learn/mobile-xr-web-optimization/xr-optimization/xr-specific-optimization",
  // AI 智能体应用开发
  "/learn/ai-agent-apps/foundations/what-is-an-agent",
  "/learn/ai-agent-apps/foundations/augmented-llm",
  "/learn/ai-agent-apps/foundations/agentic-loop",
  "/learn/ai-agent-apps/foundations/first-agent",
  "/learn/ai-agent-apps/context-engineering/prompt-engineering",
  "/learn/ai-agent-apps/context-engineering/context-window",
  "/learn/ai-agent-apps/context-engineering/structured-output",
];

const LEVEL_ORDER = { HIGH: 0, MID: 1, LOW: 2 };

async function checkPage(page, url) {
  try {
    await page.goto(BASE + url, { waitUntil: "networkidle0", timeout: 20000 });
  } catch {
    return []; // timeout = skip
  }

  // Base wait for any post-hydration layout settle
  await new Promise((r) => setTimeout(r, 1500));

  // 7: 客户端动画图 hydration —— 含可交互/下一步 chip 时多等
  try {
    const hasInteractive = await page.evaluate(() => {
      return !!document.querySelector(
        '[aria-label*="可交互"], [aria-label="下一步"], [aria-label="上一步"]',
      );
    });
    if (hasInteractive) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  } catch {
    // ignore
  }

  let issues;
  try {
    issues = await page.evaluate(() => {
      const out = [];
      const svgs = document.querySelectorAll(".mdx-figure svg, figure svg");

      svgs.forEach((svg, svgIdx) => {
        const svgRect = svg.getBoundingClientRect();
        const svgW = svgRect.width;
        const svgH = svgRect.height;
        if (svgW === 0 || svgH === 0) return;

        const texts = [...svg.querySelectorAll("text")];
        const rects = [...svg.querySelectorAll("rect")];

        function relBox(el) {
          const r = el.getBoundingClientRect();
          return {
            left: r.left - svgRect.left,
            top: r.top - svgRect.top,
            right: r.right - svgRect.left,
            bottom: r.bottom - svgRect.top,
            width: r.width,
            height: r.height,
            text: el.textContent?.trim().slice(0, 40) || "",
            tag: el.tagName.toLowerCase(),
          };
        }
        function overlaps2D(a, b) {
          return !(
            a.right <= b.left ||
            b.right <= a.left ||
            a.bottom <= b.top ||
            b.bottom <= a.top
          );
        }
        function overlapArea(a, b) {
          const x = Math.max(
            0,
            Math.min(a.right, b.right) - Math.max(a.left, b.left),
          );
          const y = Math.max(
            0,
            Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top),
          );
          return x * y;
        }
        function contains(outer, inner, tol = 0.5) {
          return (
            inner.left >= outer.left - tol &&
            inner.top >= outer.top - tol &&
            inner.right <= outer.right + tol &&
            inner.bottom <= outer.bottom + tol
          );
        }

        const textBoxes = texts
          .filter((t) => t.textContent?.trim())
          .map((t) => relBox(t));
        const rectBoxes = rects
          .map((r) => relBox(r))
          .filter((r) => r.width > 0 && r.height > 0);

        // ───────── 1. HIGH · rect-rect 重叠 >30%（滤父子+同位叠加） ─────────
        for (let i = 0; i < rectBoxes.length; i++) {
          for (let j = i + 1; j < rectBoxes.length; j++) {
            const a = rectBoxes[i],
              b = rectBoxes[j];
            // 跳过几乎填满 svg 的背景 rect 与任何 rect 的"重叠"
            const aArea = a.width * a.height;
            const bArea = b.width * b.height;
            const svgArea = svgW * svgH;
            if (aArea > svgArea * 0.85 || bArea > svgArea * 0.85) continue;

            if (!overlaps2D(a, b)) continue;
            const area = overlapArea(a, b);
            const minArea = Math.min(aArea, bArea);
            if (minArea <= 0) continue;
            const ratio = area / minArea;
            if (ratio <= 0.3) continue;

            // 滤父子嵌套：A 完全包住 B 或反之
            if (contains(a, b) || contains(b, a)) continue;

            // 滤同位置叠加范式：~95% 重合 + 几乎同 W/H（底框+高亮层）
            if (
              ratio >= 0.95 &&
              Math.abs(a.width - b.width) < 4 &&
              Math.abs(a.height - b.height) < 4
            ) {
              continue;
            }

            out.push({
              level: "HIGH",
              type: "rect-rect-overlap",
              svg: svgIdx,
              detail: `rect#${i} (${Math.round(a.width)}x${Math.round(a.height)}) ↔ rect#${j} (${Math.round(b.width)}x${Math.round(b.height)}) overlap ${Math.round(ratio * 100)}%`,
            });
          }
        }

        // ───────── 2. HIGH · text 落入错误 rect ─────────
        textBoxes.forEach((tb) => {
          if (tb.width === 0) return;
          const cx = (tb.left + tb.right) / 2;
          const cy = (tb.top + tb.bottom) / 2;
          // 找 text 中心所在的 rect（最小者，更可能是直接归属）
          let host = null;
          for (const rb of rectBoxes) {
            if (
              cx >= rb.left &&
              cx <= rb.right &&
              cy >= rb.top &&
              cy <= rb.bottom
            ) {
              if (!host || rb.width * rb.height < host.width * host.height)
                host = rb;
            }
          }
          if (!host) return;
          // 检查 text 是否 >20% 伸进其它 rect
          for (const rb of rectBoxes) {
            if (rb === host) continue;
            const rArea = rb.width * rb.height;
            // 跳过几乎填满 svg 的背景，跳过包含 host 的更大父框
            if (rArea > svgW * svgH * 0.85) continue;
            if (contains(rb, host)) continue;
            if (contains(host, rb)) continue;
            if (!overlaps2D(tb, rb)) continue;
            const area = overlapArea(tb, rb);
            const tArea = tb.width * tb.height;
            if (tArea > 0 && area / tArea > 0.2) {
              out.push({
                level: "HIGH",
                type: "text-wrong-rect",
                svg: svgIdx,
                detail: `text "${tb.text}" 中心在某 rect 但 ${Math.round((area / tArea) * 100)}% 伸进另一 rect`,
              });
              break;
            }
          }
        });

        // ───────── 3. HIGH · text 被 viewBox 裁剪（四向） ─────────
        textBoxes.forEach((tb) => {
          if (tb.width === 0) return;
          if (tb.left < -2) {
            out.push({
              level: "HIGH",
              type: "text-clip-left",
              svg: svgIdx,
              detail: `text "${tb.text}" 左侧溢出 ${Math.round(-tb.left)}px`,
            });
          }
          if (tb.top < -2) {
            out.push({
              level: "HIGH",
              type: "text-clip-top",
              svg: svgIdx,
              detail: `text "${tb.text}" 顶部溢出 ${Math.round(-tb.top)}px`,
            });
          }
          if (tb.right > svgW + 2) {
            out.push({
              level: "HIGH",
              type: "text-clip-right",
              svg: svgIdx,
              detail: `text "${tb.text}" 右侧溢出 ${Math.round(tb.right - svgW)}px`,
            });
          }
          if (tb.bottom > svgH + 2) {
            out.push({
              level: "HIGH",
              type: "text-clip-bottom",
              svg: svgIdx,
              detail: `text "${tb.text}" 底部溢出 ${Math.round(tb.bottom - svgH)}px`,
            });
          }
        });

        // ───────── 4/5/6 需要 content union bbox ─────────
        const allNodes = [
          ...rectBoxes,
          ...textBoxes.filter((t) => t.width > 0),
        ];
        if (allNodes.length > 0) {
          let minL = Infinity,
            minT = Infinity,
            maxR = -Infinity,
            maxB = -Infinity;
          for (const n of allNodes) {
            if (n.left < minL) minL = n.left;
            if (n.top < minT) minT = n.top;
            if (n.right > maxR) maxR = n.right;
            if (n.bottom > maxB) maxB = n.bottom;
          }
          const contentW = Math.max(0, maxR - minL);
          const contentH = Math.max(0, maxB - minT);
          const contentArea = contentW * contentH;
          const svgArea = svgW * svgH;
          const ratio = svgArea > 0 ? contentArea / svgArea : 0;

          // 4. MID · viewBox 利用率
          if (ratio < 0.5) {
            out.push({
              level: "MID",
              type: "viewbox-underused",
              svg: svgIdx,
              detail: `content 仅占 viewBox ${Math.round(ratio * 100)}%（建议 ≥50%）`,
            });
          } else if (ratio > 1.05) {
            out.push({
              level: "MID",
              type: "viewbox-overflow",
              svg: svgIdx,
              detail: `content 超出 viewBox ${Math.round(ratio * 100)}%（应 ≤105%）`,
            });
          }

          // 5. MID · 节点贴边（任一节点距任意边 <12px 且不是背景框）
          const EDGE = 12;
          let edgeCount = 0;
          const edgeSamples = [];
          for (const n of allNodes) {
            // 跳过几乎填满 svg 的背景 rect（n.tag === 'rect' && area > 85%）
            const nArea = n.width * n.height;
            if (n.tag === "rect" && nArea > svgArea * 0.85) continue;
            const dL = n.left;
            const dT = n.top;
            const dR = svgW - n.right;
            const dB = svgH - n.bottom;
            const minD = Math.min(dL, dT, dR, dB);
            if (minD < EDGE && minD > -2) {
              edgeCount++;
              if (edgeSamples.length < 3) {
                edgeSamples.push(
                  `${n.tag}${n.text ? ` "${n.text}"` : ""} d=${Math.round(minD)}px`,
                );
              }
            }
          }
          if (edgeCount > 0) {
            out.push({
              level: "MID",
              type: "node-near-edge",
              svg: svgIdx,
              detail: `${edgeCount} 个节点距 viewBox 边 <${EDGE}px (e.g. ${edgeSamples.join("; ")})`,
            });
          }

          // 6. LOW · 节点密度（rect 数 / (svgArea/10000) > 8）
          const density =
            svgArea > 0 ? rectBoxes.length / (svgArea / 10000) : 0;
          if (density > 8) {
            out.push({
              level: "LOW",
              type: "node-density-high",
              svg: svgIdx,
              detail: `rect 密度 ${density.toFixed(1)} / 100×100px（建议 ≤8）`,
            });
          }
        }
      });

      return out;
    });
  } catch {
    return []; // page crashed, skip
  }

  return issues.map((o) => ({ ...o, page: url }));
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const byPageMap = new Map();
  let totalHigh = 0,
    totalMid = 0,
    totalLow = 0;

  for (let i = 0; i < PAGES.length; i++) {
    const url = PAGES[i];
    process.stdout.write(
      `[${i + 1}/${PAGES.length}] ${url.split("/").pop()} ... `,
    );
    const issues = await checkPage(page, url);
    if (issues.length > 0) {
      issues.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
      byPageMap.set(url, issues);
      const h = issues.filter((x) => x.level === "HIGH").length;
      const m = issues.filter((x) => x.level === "MID").length;
      const l = issues.filter((x) => x.level === "LOW").length;
      totalHigh += h;
      totalMid += m;
      totalLow += l;
      console.log(`H=${h} M=${m} L=${l}`);
    } else {
      console.log("OK");
    }
  }

  await browser.close();

  // 排序：HIGH 多的页排前
  const byPage = [...byPageMap.entries()]
    .map(([url, issues]) => ({
      url,
      issues: issues.map((x) => ({
        level: x.level,
        type: x.type,
        svg: x.svg,
        detail: x.detail,
      })),
    }))
    .sort((a, b) => {
      const ah = a.issues.filter((i) => i.level === "HIGH").length;
      const bh = b.issues.filter((i) => i.level === "HIGH").length;
      if (ah !== bh) return bh - ah;
      return b.issues.length - a.issues.length;
    });

  const summary = {
    totalPages: PAGES.length,
    pagesWithIssues: byPage.length,
    high: totalHigh,
    mid: totalMid,
    low: totalLow,
  };

  // ── JSON 报告 ──
  fs.writeFileSync(REPORT_JSON, JSON.stringify({ summary, byPage }, null, 2));

  // ── 人读 TXT 报告 ──
  const lines = [];
  lines.push("SVG 质量验收报告");
  lines.push("=".repeat(60));
  lines.push(
    `总页 ${summary.totalPages} · 有问题 ${summary.pagesWithIssues} · HIGH ${summary.high} · MID ${summary.mid} · LOW ${summary.low}`,
  );
  lines.push("");
  for (const p of byPage) {
    lines.push(`▸ ${p.url}`);
    for (const iss of p.issues) {
      lines.push(
        `  [${iss.level}] ${iss.type} (svg#${iss.svg}): ${iss.detail}`,
      );
    }
    lines.push("");
  }
  fs.writeFileSync(REPORT_TXT, lines.join("\n"));

  // ── 控制台终结 ──
  console.log("");
  console.log("=".repeat(60));
  console.log(
    `summary: 总页 ${summary.totalPages} · 有问题 ${summary.pagesWithIssues} · HIGH ${summary.high} · MID ${summary.mid} · LOW ${summary.low}`,
  );
  console.log(`报告: ${REPORT_TXT}`);
  console.log(`JSON: ${REPORT_JSON}`);

  if (totalHigh > 0) {
    console.log(
      `\n✗ HIGH 级问题 ${totalHigh} 处，deploy 门禁不通过。详见报告。`,
    );
    process.exitCode = 1;
  } else if (totalMid > 0 || totalLow > 0) {
    console.log(`\n△ 无 HIGH 问题，但有 MID/LOW，可参考报告优化。`);
    process.exitCode = 0;
  } else {
    console.log(`\n✓ 全部通过。`);
    process.exitCode = 0;
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 2;
});
