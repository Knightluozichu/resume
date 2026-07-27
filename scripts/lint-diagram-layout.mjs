#!/usr/bin/env node

/**
 * lint-diagram-layout.mjs —— SVG 配图布局铁律自动化检查（docs/diagram-layout-rules.md）。
 *
 * 静态可查的规则：
 *  - R3: viewBox 宽 ≥ 660px
 *  - R4: 正文字号 ≥ 11px（< 11px 记为疑似违规；≤ 9px 为明确违规）
 *  - R1: 顶部文字距画布上边界 ≥ 24px（仅检查字面量 y 坐标）
 *  - R2: 底部文字距画布下边界 ≥ 24px（仅检查字面量 y 坐标）
 *
 * 用法：
 *   node scripts/lint-diagram-layout.mjs [--book <slug>] [--fix-report]
 * 输出每个图解文件的违规清单，并汇总统计。
 */

import fs from "node:fs";
import path from "node:path";

const bookArg = process.argv.indexOf("--book");
const bookSlug = bookArg >= 0 ? process.argv[bookArg + 1] : null;

const COMP = path.join(process.cwd(), "src/components/mdx");

// 收集目标图解文件
const files = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".tsx") && /diagrams|labs/.test(p)) files.push(p);
  }
};
if (bookSlug) {
  const dir = path.join(COMP, bookSlug);
  if (fs.existsSync(dir)) walk(dir);
} else {
  walk(COMP);
}

const violations = [];
let checked = 0;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  // 只处理含 <svg 的图解文件
  if (!/<svg[\s>]/.test(src)) continue;
  checked++;

  const rel = path.relative(COMP, file);
  const issues = [];

  // R3: viewBox 宽 ≥ 660
  const vbMatch = src.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  let viewW = null;
  let viewH = null;
  if (vbMatch) {
    viewW = parseFloat(vbMatch[1]);
    viewH = parseFloat(vbMatch[2]);
    if (viewW < 660) issues.push(`R3 viewBox宽=${viewW} <660`);
  }

  // R4: 字号检查
  const fontSizes = [];
  const fsRe = /fontSize=\{?["']?(\d+(?:\.\d+)?)["']?\}?/g;
  let m;
  while ((m = fsRe.exec(src))) fontSizes.push(parseFloat(m[1]));
  const small = fontSizes.filter((s) => s < 11);
  const tiny = fontSizes.filter((s) => s <= 9);
  if (tiny.length > 0) issues.push(`R4 字号≤9px ×${tiny.length}（明确违规: ${[...new Set(tiny)].join(",")}）`);
  else if (small.length > 2) issues.push(`R4 字号10-10.9px ×${small.length} >2处（脚注限2处）`);

  // R1/R2: 文字上下边距（仅字面量 y）
  if (viewH) {
    const textYs = [];
    const tyRe = /<text[^>]*\sy=["'](\d+(?:\.\d+)?)["']/g;
    while ((m = tyRe.exec(src))) textYs.push(parseFloat(m[1]));
    if (textYs.length > 0) {
      const minY = Math.min(...textYs);
      const maxY = Math.max(...textYs);
      // 顶部：文字基线 y 减去字号后距顶部应 ≥24；简化为基线 y ≥ 32（留出字号空间）
      if (minY < 32) issues.push(`R1 顶部文字y=${minY} <32（距上边界过近）`);
      // 底部：文字基线距底部应 ≥24
      if (maxY > viewH - 24) issues.push(`R2 底部文字y=${maxY} >VIEW_H-24=${viewH - 24}（贴底）`);
    }
  }

  if (issues.length > 0) {
    violations.push({ file: rel, issues });
  }
}

// 输出
console.log(`═══ SVG 布局铁律检查 ═══`);
console.log(`检查图解文件: ${checked} 个\n`);

if (violations.length === 0) {
  console.log("✓ 全部通过 R1-R4 检查。");
} else {
  console.log(`违规文件: ${violations.length} 个\n`);
  for (const v of violations) {
    console.log(`  ${v.file}`);
    for (const i of v.issues) console.log(`    - ${i}`);
  }
  // 按规则汇总
  const byRule = {};
  for (const v of violations) {
    for (const i of v.issues) {
      const rule = i.split(" ")[0];
      byRule[rule] = (byRule[rule] || 0) + 1;
    }
  }
  console.log(`\n按规则汇总: ${JSON.stringify(byRule)}`);
}
