import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/luozichu/Repositories/learn/remuse";
const CONTENT = path.join(ROOT, "content");
const COMP = path.join(ROOT, "src/components/mdx");

// 通用组件（几乎所有章都引用，不代表本章有真图解）
const GENERIC_MODS = new Set(["mdx-components"]);

// 图形特征：SVG 元素 / canvas / 动画 hook
const GRAPHIC_RE = /<svg[\s>]|viewBox=|<canvas[\s>]|<line[\s>]|<circle[\s>]|<ellipse[\s>]|<path[\s>]|<rect[\s>]|<polygon[\s>]|<polyline[\s>]|getContext\(|useTeachingTimeline|requestAnimationFrame/;

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
  try { src = fs.readFileSync(file, "utf8"); } catch { return false; }
  let graphics = GRAPHIC_RE.test(src);
  fileCache.set(file, graphics);
  if (!graphics) {
    const importRe = /(?:import|export)[^'"]*?from\s+["']([^"']+)["']/g;
    let m;
    while ((m = importRe.exec(src))) {
      const dep = resolveImport(file, m[1]);
      if (dep && !seen.has(dep)) {
        if (analyzeFile(dep, seen)) { graphics = true; }
      }
    }
    fileCache.set(file, graphics);
  }
  return graphics;
}

function chapterHasRealGraphic(mdxPath) {
  const src = fs.readFileSync(mdxPath, "utf8");
  const fmEnd = src.indexOf("---", 3);
  const body = fmEnd > 0 ? src.slice(fmEnd + 3) : src;

  const nameToFile = new Map();
  const importRe = /import\s*\{([^}]+)\}\s*from\s*["']@\/components\/mdx\/([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(src))) {
    const names = m[1].split(",").map(s => s.trim()).filter(Boolean);
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

  for (const tag of used) {
    const modPath = nameToFile.get(tag);
    if (!modPath || GENERIC_MODS.has(modPath)) continue;
    const file = resolveImport(path.join(CONTENT, "dummy.mdx"), "@/components/mdx/" + modPath);
    if (!file) continue;
    if (analyzeFile(file)) return true;
  }
  if (/<svg[\s>]/.test(body)) return true;
  return false;
}

// 扫描全部书，只统计未下架（draft:false）的章节
const books = fs.readdirSync(CONTENT, { withFileTypes: true })
  .filter(e => e.isDirectory()).map(e => e.name);

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
  let real = 0, total = 0, drafted = 0;
  const noGraphChapters = [];
  for (const f of mdxFiles) {
    const src = fs.readFileSync(f, "utf8");
    const fm = src.slice(0, fmEndIdx(src));
    if (/^draft:\s*true\s*$/m.test(fm)) { drafted++; continue; }
    total++;
    if (chapterHasRealGraphic(f)) real++;
    else noGraphChapters.push(path.basename(f, ".mdx"));
  }
  if (total > 0) report.push({ book, total, real, pct: Math.round(real / total * 100), noGraphChapters });
}

function fmEndIdx(src) { const i = src.indexOf("---", 3); return i > 0 ? i : Math.min(src.length, 800); }

report.sort((a, b) => b.pct - a.pct || b.real - a.real);
console.log(`books with live chapters: ${report.length}\n`);
for (const r of report) {
  console.log(`${String(r.pct).padStart(3)}%  ${String(r.real).padStart(3)}/${String(r.total).padStart(3)}  ${r.book}`);
}
fs.writeFileSync(path.join(ROOT, "real-graphics-report.json"), JSON.stringify(report, null, 2));
console.log("\nwritten: real-graphics-report.json");
