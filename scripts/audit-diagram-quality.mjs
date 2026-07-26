#!/usr/bin/env node

/**
 * scripts/audit-diagram-quality.mjs —— 解剖图质量自动审计（全库高质量解剖图总纲 §6）。
 *
 * 对每个章节静态检查「三图齐全 + 均动画 + label 在动画起点 + 无通用模板残留 + aria + 设计 token」：
 *  1. 三图齐全：MDX 正文里领域图组件的 JSX 使用数 >= 3（机制/取舍/反例）。
 *  2. 均动画：每个领域图组件源码含 useTeachingTimeline + TimelineControls（独立播放控件）。
 *  3. label 在动画起点：STEPS 里每个 step 的 label 都有对应 tl.label()，且首 label 打在 t=0
 *     （保证步骤字幕与画面同步、末步可达）。
 *  4. 无通用模板残留：正文不再实际使用 ExperimentLab/EvidenceLab/MapLab/official-*-lab。
 *  5. 规范：组件含 aria-label 与设计 token（var(--accent)/--text-primary/--border 等）。
 *
 * 结构页（学习地图/分隔页/总复习/前言）按 slug+标题启发式识别并豁免，不计入合格率分母。
 *
 * 用法：
 *   node scripts/audit-diagram-quality.mjs                 # 全库
 *   node scripts/audit-diagram-quality.mjs --book <slug>   # 单书
 *   node scripts/audit-diagram-quality.mjs --verbose       # 打印每章明细
 *   node scripts/audit-diagram-quality.mjs --include-structural  # 结构页也计入
 *   node scripts/audit-diagram-quality.mjs --json <path>   # 输出 JSON 台账（进度看板用）
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const SRC_DIR = path.join(ROOT, "src");

// 通用模板符号：MapLab/ExperimentLab/EvidenceLab 及 official-*-lab 系列。
const LAB_SYMBOL = /(ExperimentLab|EvidenceLab|MapLab)$|^Official[A-Za-z0-9]*Lab$|Official[A-Za-z0-9]*Lab/;
const LAB_PATH = /official-[\w-]*-lab/i;

function parseArgs(argv) {
  const args = { book: null, verbose: false, includeStructural: false, json: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--book") args.book = argv[++i] ?? null;
    else if (a === "--verbose" || a === "-v") args.verbose = true;
    else if (a === "--include-structural") args.includeStructural = true;
    else if (a === "--json") args.json = argv[++i] ?? null;
    else if (a === "--help" || a === "-h") {
      console.log(
        "用法: node scripts/audit-diagram-quality.mjs [--book slug] [--verbose] [--include-structural] [--json out.json]",
      );
      process.exit(0);
    } else throw new Error(`未知参数: ${a}`);
  }
  return args;
}

/** 递归列出目录下所有 .mdx 文件。 */
function listMdx(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMdx(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/** 结构页（豁免三图要求）：学习地图/总复习/前言/致谢 + 罗马数字分节标题。 */
function isStructural(relPath, title) {
  const s = relPath.toLowerCase();
  if (/(official-)?learning-map/.test(s)) return true;
  if (/(official-)?final-review/.test(s)) return true;
  if (/acknowledg/.test(s)) return true;
  if (/(^|[-/])(introduction|preface|foreword|prologue)([-/]|$)/.test(s)) return true;
  // 分节页标题形如 "II. Design Patterns Revisited"（纯罗马数字前缀）；实质章用阿拉伯数字 "2. Command"。
  if (/^[IVXLC]+\.\s/.test((title || "").trim())) return true;
  return false;
}

/** 解析 import 语句 → [{ symbols:[], path:'' }]（支持多行具名导入）。 */
function parseImports(content) {
  const imports = [];
  const re = /import\s+(?:type\s+)?(?:\{([^}]*)\}|([A-Za-z0-9_]+))\s+from\s+["']([^"']+)["']/g;
  for (const m of content.matchAll(re)) {
    const named = m[1]
      ? m[1]
          .split(",")
          .map((x) => x.trim().split(/\s+as\s+/)[0].trim())
          .filter(Boolean)
      : [];
    const def = m[2] ? [m[2]] : [];
    imports.push({ symbols: [...named, ...def], path: m[3] });
  }
  return imports;
}

/** 把 @/components/... 导入路径解析为源码文件绝对路径。 */
function resolveComponent(importPath) {
  if (!importPath.startsWith("@/")) return null;
  const rel = importPath.slice(2); // 去掉 @/
  const base = path.join(SRC_DIR, rel);
  for (const cand of [`${base}.tsx`, `${base}.ts`, path.join(base, "index.tsx"), path.join(base, "index.ts")]) {
    if (fs.existsSync(cand)) return cand;
  }
  return null;
}

const fileCache = new Map();
function readSource(file) {
  if (!file) return null;
  if (!fileCache.has(file)) {
    try {
      fileCache.set(file, fs.readFileSync(file, "utf8"));
    } catch {
      fileCache.set(file, null);
    }
  }
  return fileCache.get(file);
}

/** 静态分析一个图表组件源码的动画质量。 */
function analyzeComponent(source) {
  const animated = /useTeachingTimeline/.test(source) && /TimelineControls/.test(source);

  // 时间线上实际打的 label。
  const tlLabels = [...source.matchAll(/\.label\(\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);

  // step 列表：优先取 `const STEPS = [...]` 里的 label，回退到 caption: 计数。
  let stepLabels = [];
  const stepsMatch = source.match(/const\s+STEPS\b[\s\S]*?=\s*\[([\s\S]*?)\];/);
  if (stepsMatch) {
    stepLabels = [...stepsMatch[1].matchAll(/label:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  }
  const captionCount = (source.match(/caption:\s*["'`]/g) || []).length;
  const stepCount = stepLabels.length || captionCount;

  // label 齐全：每个 step 的 label 都在时间线上打过。
  const labelsComplete =
    stepLabels.length > 0
      ? stepLabels.every((l) => tlLabels.includes(l))
      : captionCount > 0 && tlLabels.length >= captionCount;
  // 首 label 打在 t=0（setup 步），保证从第一帧起字幕同步。
  const firstLabelAtZero = /\.label\(\s*["'`][^"'`]+["'`]\s*,\s*0\s*\)/.test(source);

  const aria = /aria-label/.test(source);
  const tokens = /var\(--(accent|text-primary|text-secondary|border|elevated)\)/.test(source);

  return {
    animated,
    stepCount,
    tlLabelCount: tlLabels.length,
    labelsComplete,
    firstLabelAtZero,
    labelsOK: labelsComplete && firstLabelAtZero,
    aria,
    tokens,
  };
}

/** 统计符号在正文里的 JSX 使用次数（<Symbol ）。 */
function countUsages(content, symbol) {
  const re = new RegExp(`<${symbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
  return (content.match(re) || []).length;
}

/** 分析单个章节。 */
function analyzeChapter(mdxFile) {
  const rel = path.relative(CONTENT_DIR, mdxFile);
  const raw = fs.readFileSync(mdxFile, "utf8");
  let data = {};
  let body = raw;
  try {
    const parsed = matter(raw);
    data = parsed.data;
    body = parsed.content;
  } catch {
    // frontmatter 解析失败时退回全文
  }

  const structural = isStructural(rel, data.title);

  const imports = parseImports(raw);
  const diagramImports = imports.filter((imp) => /\/diagrams\//.test(imp.path));

  // 通用模板：区分「导入」与「正文实际使用」。
  let labImported = false;
  let labUsed = false;
  const labSymbols = [];
  // 领域图组件：非 lab 的 diagrams 导入符号。
  const figureSymbols = [];

  for (const imp of diagramImports) {
    const pathIsLab = LAB_PATH.test(imp.path);
    for (const sym of imp.symbols) {
      if (LAB_SYMBOL.test(sym) || pathIsLab) {
        labImported = true;
        labSymbols.push(sym);
        if (countUsages(body, sym) > 0) labUsed = true;
      } else {
        figureSymbols.push({ sym, file: resolveComponent(imp.path) });
      }
    }
  }

  // 领域图 JSX 使用总数（机制/取舍/反例）。
  let figureUsages = 0;
  const componentChecks = [];
  const seenFiles = new Set();
  for (const { sym, file } of figureSymbols) {
    figureUsages += countUsages(body, sym);
    if (file && !seenFiles.has(file)) {
      seenFiles.add(file);
      const src = readSource(file);
      if (src) componentChecks.push({ file: path.relative(SRC_DIR, file), ...analyzeComponent(src) });
    }
  }

  const threeFigures = figureUsages >= 3;
  const allAnimated = componentChecks.length > 0 && componentChecks.every((c) => c.animated);
  const allLabelsOK = componentChecks.length > 0 && componentChecks.every((c) => c.labelsOK);
  const allAria = componentChecks.length > 0 && componentChecks.every((c) => c.aria);
  const allTokens = componentChecks.length > 0 && componentChecks.every((c) => c.tokens);

  // 判定。
  let status;
  const issues = [];
  if (structural) {
    status = "structural";
  } else if (labUsed) {
    status = "template";
    issues.push("通用模板残留");
  } else if (componentChecks.length === 0) {
    status = "none";
    issues.push("无领域图组件");
  } else {
    if (!threeFigures) issues.push(`三图不齐(用图${figureUsages})`);
    if (!allAnimated) issues.push("非全动画");
    if (!allLabelsOK) issues.push("label未在起点");
    if (!allAria) issues.push("缺aria-label");
    if (!allTokens) issues.push("缺设计token");
    status = issues.length === 0 ? "pass" : "partial";
  }

  return {
    rel,
    title: data.title || rel,
    structural,
    status,
    issues,
    figureUsages,
    labImported,
    labUsed,
    labSymbols: labImported && !labUsed ? labSymbols : [],
    components: componentChecks,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  const bookDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => (args.book ? name === args.book : true));

  if (args.book && bookDirs.length === 0) {
    console.error(`✗ 未找到书籍目录: content/${args.book}`);
    process.exit(2);
  }

  const STATUS_ORDER = ["pass", "partial", "template", "none", "structural"];
  const bookReports = [];
  const totals = { pass: 0, partial: 0, template: 0, none: 0, structural: 0, substantive: 0 };

  for (const book of bookDirs.sort()) {
    const files = listMdx(path.join(CONTENT_DIR, book));
    const chapters = files.map(analyzeChapter).sort((a, b) => a.rel.localeCompare(b.rel));

    const counts = { pass: 0, partial: 0, template: 0, none: 0, structural: 0 };
    for (const ch of chapters) counts[ch.status] += 1;
    const substantive = chapters.length - counts.structural;
    const rate = substantive > 0 ? counts.pass / substantive : 1;

    for (const k of Object.keys(counts)) totals[k] += counts[k];
    totals.substantive += substantive;

    bookReports.push({ book, total: chapters.length, substantive, counts, rate, chapters });

    const pct = (rate * 100).toFixed(1).padStart(5);
    console.log(
      `${pct}%  ${book.padEnd(42)} 实质${String(substantive).padStart(3)} 合格${String(counts.pass).padStart(3)}` +
        ` 部分${String(counts.partial).padStart(3)} 模板${String(counts.template).padStart(3)}` +
        ` 无图${String(counts.none).padStart(3)} 结构${String(counts.structural).padStart(3)}`,
    );

    if (args.verbose) {
      for (const ch of chapters) {
        if (ch.status === "structural" && !args.includeStructural) continue;
        const flag = ch.status === "pass" ? "✓" : ch.status === "structural" ? "○" : "✗";
        const extra = ch.issues.length ? ` [${ch.issues.join(", ")}]` : "";
        const deadLab = ch.labSymbols.length ? ` (死导入:${ch.labSymbols.join("/")})` : "";
        console.log(`    ${flag} ${ch.status.padEnd(9)} ${ch.title}${extra}${deadLab}`);
      }
    }
  }

  const totalRate = totals.substantive > 0 ? totals.pass / totals.substantive : 1;
  console.log("\n──────────────────────── 全库汇总 ────────────────────────");
  console.log(
    `合格率 ${(totalRate * 100).toFixed(1)}%  实质章节 ${totals.substantive}  合格 ${totals.pass}` +
      `  部分 ${totals.partial}  模板 ${totals.template}  无图 ${totals.none}  结构页(豁免) ${totals.structural}`,
  );

  if (args.json) {
    const payload = {
      generatedAt: new Date().toISOString(),
      totals: { ...totals, rate: totalRate },
      books: bookReports.map((b) => ({
        book: b.book,
        total: b.total,
        substantive: b.substantive,
        counts: b.counts,
        rate: b.rate,
        chapters: b.chapters.map((c) => ({
          rel: c.rel,
          title: c.title,
          status: c.status,
          issues: c.issues,
          figureUsages: c.figureUsages,
          labUsed: c.labUsed,
          deadLabImports: c.labSymbols,
          components: c.components,
        })),
      })),
    };
    fs.mkdirSync(path.dirname(path.resolve(args.json)), { recursive: true });
    fs.writeFileSync(args.json, JSON.stringify(payload, null, 2));
    console.log(`\nJSON 台账已写入: ${args.json}`);
  }

  // 状态排序提示（便于看板）
  void STATUS_ORDER;
}

main();
