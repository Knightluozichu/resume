import fs from "node:fs";
import path from "node:path";

/**
 * audit-real-graphics-all.mjs —— 全库真图解审计（发布门禁用）。
 *
 * 与 audit-real-graphics.mjs 的区别：
 *  1. 不跳过 draft 章——统计所有章节（含下架书），用于评估「哪些下架书可恢复发布」。
 *  2. 豁免结构页（学习地图/总复习/前言等）——结构页不要求知识点解剖图。
 *  3. 输出每书「实质章真图解覆盖率」，100% 即合格候选。
 *
 * 真图解判定：按 MDX 实际引用组件的 import 闭包检测 SVG/Canvas/动画特征；
 * 文字卡（数据数组+map 渲染 div，零图形元素）不算。技术不限（静态 SVG 也算合格）。
 */

const ROOT = "/Users/luozichu/Repositories/learn/remuse";
const CONTENT = path.join(ROOT, "content");
const COMP = path.join(ROOT, "src/components/mdx");

const GENERIC_MODS = new Set(["mdx-components"]);

// 通用模板 Lab 判定（与 audit-diagram-quality.mjs 一致）：
// 名字以 MapLab/ExperimentLab/EvidenceLab 结尾，或 Official*Lab，或路径 official-*-lab。
// 这类是「三视图」自动生成模板（可能带 SVG 但非章节专属知识点图解），不算合格真图解。
const LAB_SYMBOL = /(ExperimentLab|EvidenceLab|MapLab|ProbabilityLab)$|^Official[A-Za-z0-9]*Lab$|Official[A-Za-z0-9]*Lab/;
// official-lab / official-course-lab / official-tcg-lab 等共享通用组件路径
const LAB_PATH = /official[-\w]*lab/i;

const GRAPHIC_RE =
  /<svg[\s>]|viewBox=|<canvas[\s>]|<line[\s>]|<circle[\s>]|<ellipse[\s>]|<path[\s>]|<rect[\s>]|<polygon[\s>]|<polyline[\s>]|getContext\(|useTeachingTimeline|requestAnimationFrame/;

const fileCache = new Map();

function resolveImport(fromFile, spec) {
  let base;
  if (spec.startsWith("@/components/mdx/")) {
    base = path.join(COMP, spec.slice("@/components/mdx/".length));
  } else if (spec.startsWith("@/components/")) {
    base = path.join(ROOT, "src/components", spec.slice("@/components/".length));
  } else if (spec.startsWith(".")) {
    base = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }
  for (const cand of [base + ".tsx", base + ".ts", path.join(base, "index.tsx"), path.join(base, "index.ts")]) {
    if (fs.existsSync(cand)) return cand;
  }
  return null;
}

function analyzeFile(file, seen = new Set()) {
  if (fileCache.has(file)) return fileCache.get(file);
  if (seen.has(file)) return false;
  seen.add(file);
  let src;
  try {
    src = fs.readFileSync(file, "utf8");
  } catch {
    return false;
  }
  let graphics = GRAPHIC_RE.test(src);
  fileCache.set(file, graphics);
  if (!graphics) {
    const importRe = /(?:import|export)[^'"]*?from\s+["']([^"']+)["']/g;
    let m;
    while ((m = importRe.exec(src))) {
      const dep = resolveImport(file, m[1]);
      if (dep && !seen.has(dep)) {
        if (analyzeFile(dep, seen)) graphics = true;
      }
    }
    fileCache.set(file, graphics);
  }
  return graphics;
}

// 文件是否是 official*lab 共享通用组件（路径命中）。
function isOfficialLabFile(file) {
  return LAB_PATH.test(file);
}

// 闭包真图解检测：文件自身或其 import 闭包（排除 official*lab 通用文件）含直接图形内容。
// auto-why-car-runs 的真 SVG 在深层 why-car-runs-lab.tsx（非 official*lab）→ genuine；
// this-is-chatgpt/unity 的 SVG 只在 official*lab 里→非 genuine。
function hasGenuineGraphic(file, seen = new Set()) {
  if (seen.has(file)) return false;
  seen.add(file);
  let src;
  try {
    src = fs.readFileSync(file, "utf8");
  } catch {
    return false;
  }
  if (!isOfficialLabFile(file)) {
    const body = src.replace(/^[ \t]*(?:import|export)\b[^\n]*?from\s+["'][^"']*["'];?[ \t]*$/gm, "");
    if (GRAPHIC_RE.test(body)) return true;
  }
  const importRe = /(?:import|export)[^'"]*?from\s+["']([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(src))) {
    const dep = resolveImport(file, m[1]);
    if (dep && hasGenuineGraphic(dep, seen)) return true;
  }
  return false;
}

// 文件是否 import 了 official*lab 共享通用组件。
function fileImportsOfficialLab(file) {
  let src;
  try {
    src = fs.readFileSync(file, "utf8");
  } catch {
    return false;
  }
  const importRe = /(?:import|export)[^'"]*?from\s+["']([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(src))) {
    if (LAB_PATH.test(m[1])) return true;
  }
  return false;
}

// 返回 { genuine: 闭包含非模板真图解, genericLab: 用了通用模板 Lab }
function chapterGraphicAnalysis(mdxPath) {
  const src = fs.readFileSync(mdxPath, "utf8");
  const fmEnd = src.indexOf("---", 3);
  const body = fmEnd > 0 ? src.slice(fmEnd + 3) : src;

  const nameToFile = new Map();
  const importRe = /import\s*\{([^}]+)\}\s*from\s*["']@\/components\/mdx\/([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(src))) {
    const names = m[1].split(",").map((s) => s.trim()).filter(Boolean);
    const modPath = m[2];
    for (let n of names) {
      n = n.split(/\s+as\s+/).pop().trim();
      if (n) nameToFile.set(n, modPath);
    }
  }
  const defRe = /import\s+([A-Z]\w*)\s+from\s*["']@\/components\/mdx\/([^"']+)["']/g;
  while ((m = defRe.exec(src))) nameToFile.set(m[1], m[2]);

  const used = new Set();
  const tagRe = /<([A-Z]\w*)[\s/>]/g;
  while ((m = tagRe.exec(body))) used.add(m[1]);

  let genuine = false;
  let genericLab = false;
  for (const tag of used) {
    const modPath = nameToFile.get(tag);
    if (!modPath || GENERIC_MODS.has(modPath)) continue;
    const file = resolveImport(path.join(CONTENT, "dummy.mdx"), "@/components/mdx/" + modPath);
    if (!file) continue;
    // 真图解：组件 import 闭包（排除 official*lab）含直接图形内容
    if (hasGenuineGraphic(file)) genuine = true;
    // 通用模板：组件名命中三连特征，或文件 import 了 official*lab 共享组件
    if (LAB_SYMBOL.test(tag) || fileImportsOfficialLab(file)) genericLab = true;
  }
  if (/<svg[\s>]/.test(body)) genuine = true;
  return { genuine, genericLab };
}

// 结构页豁免（与 audit-diagram-quality.mjs 的 isStructural 一致）
function isStructural(relPath, title) {
  const s = relPath.toLowerCase();
  if (/(official-)?learning-map/.test(s)) return true;
  if (/(official-)?final-review/.test(s)) return true;
  if (/acknowledg/.test(s)) return true;
  if (/(^|[-/])(introduction|preface|foreword|prologue)([-/]|$)/.test(s)) return true;
  if (/^[IVXLC]+\.\s/.test((title || "").trim())) return true;
  return false;
}

function fmEndIdx(src) {
  const i = src.indexOf("---", 3);
  return i > 0 ? i : Math.min(src.length, 800);
}

function parseTitle(src) {
  const fm = src.slice(0, fmEndIdx(src));
  const m = fm.match(/^title:\s*(.+)\s*$/m);
  return m ? m[1].replace(/^["']|["']$/g, "").trim() : "";
}

const books = fs
  .readdirSync(CONTENT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const report = [];
for (const book of books) {
  const bookDir = path.join(CONTENT, book);
  const mdxFiles = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".mdx")) mdxFiles.push(p);
    }
  };
  walk(bookDir);

  let substantive = 0,
    real = 0,
    structural = 0,
    templated = 0,
    withLab = 0;
  const noGraph = [];
  const structuralPages = [];
  for (const f of mdxFiles) {
    const src = fs.readFileSync(f, "utf8");
    const rel = path.relative(CONTENT, f);
    const title = parseTitle(src);
    if (isStructural(rel, title)) {
      structural++;
      structuralPages.push(path.basename(f, ".mdx"));
      continue;
    }
    substantive++;
    const { genuine, genericLab } = chapterGraphicAnalysis(f);
    if (genericLab) withLab++;
    if (genuine) real++;
    else {
      if (genericLab) templated++;
      noGraph.push(path.basename(f, ".mdx"));
    }
  }
  const pct = substantive > 0 ? Math.round((real / substantive) * 100) : 100;
  report.push({ book, total: mdxFiles.length, substantive, structural, real, templated, withLab, pct, noGraph, structuralPages });
}

report.sort((a, b) => b.pct - a.pct || b.substantive - a.substantive);

const qualified = report.filter((r) => r.substantive > 0 && r.pct === 100);
const cleanQualified = qualified.filter((r) => r.withLab === 0);
const residueQualified = qualified.filter((r) => r.withLab > 0);
const partial = report.filter((r) => r.substantive > 0 && r.pct > 0 && r.pct < 100);
const zero = report.filter((r) => r.substantive > 0 && r.pct === 0);

console.log("════════════ A. 干净合格（实质章 100% 真图解 且 无通用Lab残留）════════════");
console.log(`共 ${cleanQualified.length} 本\n`);
for (const r of cleanQualified) {
  console.log(`  ✓ ${r.book}  (实质 ${r.substantive} 章，结构页 ${r.structural} 豁免)`);
}

console.log(`\n════════════ B. 合格但残留通用Lab（有真图解，但章节还用了Map/Experiment/Evidence三连模板）════════════`);
console.log(`共 ${residueQualified.length} 本\n`);
for (const r of residueQualified) {
  console.log(`  ◐ ${r.book}  (实质 ${r.substantive} 章，${r.withLab} 章残留通用Lab)`);
}

console.log(`\n════════════ 部分合格（0<覆盖率<100%）${partial.length} 本 ════════════`);
for (const r of partial.slice(0, 30)) {
  console.log(`  ${String(r.pct).padStart(3)}%  ${String(r.real).padStart(3)}/${String(r.substantive).padStart(3)}  ${r.book}  缺:[${r.noGraph.slice(0, 4).join(",")}${r.noGraph.length > 4 ? "…" : ""}]`);
}

console.log(`\n════════════ 汇总 ════════════`);
console.log(`全书 ${report.length} 本 | 合格 ${qualified.length}（干净 ${cleanQualified.length} + 残留 ${residueQualified.length}）| 部分 ${partial.length} | 零真图解 ${zero.length}`);

fs.writeFileSync("/tmp/real-graphics-all.json", JSON.stringify(report, null, 2));
console.log("\n详细 JSON: /tmp/real-graphics-all.json");
