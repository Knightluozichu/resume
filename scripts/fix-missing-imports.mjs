#!/usr/bin/env node
/**
 * fix-missing-imports.mjs —— 为 MDX 中使用了但未导入的书本专属组件补上 import。
 * 扫描 src/components/mdx 下所有导出的组件，建立 组件名→import路径 映射；
 * 对每个 MDX，找出使用了但未导入且非全局的书本组件，按文件分组补 import。
 * 用法：node scripts/fix-missing-imports.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";

const dryRun = process.argv.includes("--dry-run");
const ROOT = process.cwd();
const COMP = path.join(ROOT, "src/components/mdx");
const CONTENT = path.join(ROOT, "content");

// 1. 全局组件名（mdx-components.tsx 的 mdxComponents 对象键）
const mc = fs.readFileSync(path.join(COMP, "mdx-components.tsx"), "utf8");
const global = new Set();
const exp = mc.match(/export const mdxComponents[^=]*=\s*\{([\s\S]*?)\n\};/);
if (exp) { const re = /([A-Z][A-Za-z0-9]*):/g; let m; while ((m = re.exec(exp[1]))) global.add(m[1]); }

// 2. 扫描所有书本组件导出，建立 组件名 → import 路径（@/components/mdx/...）
const compToFile = new Map();
const walkComp = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkComp(p);
    else if (e.name.endsWith(".tsx") && e.name !== "mdx-components.tsx") {
      const src = fs.readFileSync(p, "utf8");
      const re = /export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g;
      let m;
      while ((m = re.exec(src))) {
        const rel = path.relative(COMP, p).replace(/\.tsx$/, "").replace(/\\/g, "/");
        compToFile.set(m[1], "@/components/mdx/" + rel);
      }
    }
  }
};
walkComp(COMP);

// 3. 遍历 MDX，补 import
const dirs = fs.readdirSync(CONTENT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
let fixedFiles = 0, fixedImports = 0;
const walkMdx = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walkMdx(p);
    else if (e.name.endsWith(".mdx")) fixMdx(p);
  }
};
function fixMdx(p) {
  const src = fs.readFileSync(p, "utf8");
  // 剩离代码块后再匹配组件用法，避免把泛型 <T>/<TKey> 等误当组件
  const noCode = src.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  const used = new Set(); const ure = /<([A-Z][A-Za-z0-9]*)[\s/>]/g; let m;
  while ((m = ure.exec(noCode))) used.add(m[1]);
  const imported = new Set(); const ire = /import\s*\{([^}]*)\}/g;
  while ((m = ire.exec(src))) m[1].split(",").forEach((s) => { const n = s.trim().split(/\s+as\s+/).pop().trim(); if (n) imported.add(n); });
  // 需要补的：使用了、未导入、非全局、且有对应组件文件
  const byFile = new Map();
  for (const c of used) {
    if (imported.has(c) || global.has(c)) continue;
    const file = compToFile.get(c);
    if (!file) continue;
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(c);
  }
  if (byFile.size === 0) return;
  // 生成 import 语句，插在 frontmatter 之后第一个 import 之前（或 frontmatter 后）
  const fmEnd = src.indexOf("---", 3);
  if (fmEnd < 0) return;
  const head = src.slice(0, fmEnd + 3);
  let body = src.slice(fmEnd + 3);
  const importLines = [...byFile.entries()].map(([file, names]) =>
    `import { ${names.sort().join(", ")} } from "${file}";`
  ).join("\n");
  // 插在 body 中第一个已有 import 之前（保留 frontmatter 后的空行）；若无 import 则置于开头空行后
  const firstImport = body.search(/\n[ \t]*import\b/);
  if (firstImport >= 0) {
    body = body.slice(0, firstImport) + "\n" + importLines + body.slice(firstImport);
  } else {
    body = "\n\n" + importLines + body;
  }
  if (!dryRun) fs.writeFileSync(p, head + body);
  fixedFiles++;
  fixedImports += byFile.size;
}
for (const d of dirs) walkMdx(path.join(CONTENT, d));
console.log(`${dryRun ? "[dry-run] " : ""}修复 ${fixedFiles} 个 MDX 文件，补 ${fixedImports} 组 import。`);
