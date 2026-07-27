#!/usr/bin/env node

/**
 * strip-official-labs.mjs —— 批量清除 MDX 中的「三视图实验」通用 Lab 文字卡及模板废话段。
 *
 * 清除内容：
 *  1. Official*Lab 的 import 块
 *  2. {/* OFFICIAL_COURSE_ENHANCEMENT *\/} 注释
 *  3. "## 三视图实验" 整段（到 </Stepper> 结束）
 *  4. "## 为什么只记结论" 整段（到下一个 ## 之前）
 *  5. "## 权威目录与核心概念逐项对照" 整段（到下一个 ## 之前）
 *  6. 若 Stepper/Step 不再使用，从 mdx-components import 中移除
 *
 * 用法：node scripts/strip-official-labs.mjs [--book <slug>] [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";

const bookArg = process.argv.indexOf("--book");
const bookSlug = bookArg >= 0 ? process.argv[bookArg + 1] : null;
const dryRun = process.argv.includes("--dry-run");

const CONTENT = path.join(process.cwd(), "content");
const books = bookSlug
  ? [bookSlug]
  : fs.readdirSync(CONTENT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

let totalCleaned = 0;

for (const book of books) {
  const bookDir = path.join(CONTENT, book);
  if (!fs.existsSync(bookDir)) continue;
  const mdxFiles = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".mdx")) mdxFiles.push(p);
    }
  };
  walk(bookDir);

  for (const file of mdxFiles) {
    let src = fs.readFileSync(file, "utf8");
    const original = src;

    // 1. 移除含 *MapLab/*ExperimentLab/*EvidenceLab 的 import 块
    src = src.replace(
      /import\s*\{[^}]*(MapLab|ExperimentLab|EvidenceLab)[^}]*\}\s*from\s*["'][^"']*["'];?\s*\n?/g,
      ""
    );

    // 2. 移除 OFFICIAL_COURSE_ENHANCEMENT 注释
    src = src.replace(/\{\/\*\s*OFFICIAL_COURSE_ENHANCEMENT\s*\*\/\}\s*\n?/g, "");

    // 3. 移除含 Stepper/Steps+Lab 的“实验”段（覆盖“三视图实验”“三步交互实验”“可操作机制实验”等变体）
    // 注意：^ + m 标志锚定行首，避免误匹配 ### 标题中的 "## " 子串
    src = src.replace(new RegExp("^## [^\\n]*\u5b9e\u9a8c[^\\n]*\\n[\\s\\S]*?<\\/(?:Stepper|Steps)>\\s*\\n?", "gm"), "");

    // 3b. 删除所有残留的 *MapLab/*ExperimentLab/*EvidenceLab 自闭合标签
    src = src.replace(/<[A-Za-z0-9]*(MapLab|ExperimentLab|EvidenceLab)\s*\/>\s*\n?/g, "");

    // 4. 清理连续多空行（最多保留一个空行）
    src = src.replace(/\n{3,}/g, "\n\n");

    // 确保最后一个 import 与第一个内容元素之间有空行（MDX 解析要求）
    src = src.replace(/(from\s*["'][^"']*["'];)\n(<)/g, "$1\n\n$2");

    if (src !== original) {
      totalCleaned++;
      if (!dryRun) fs.writeFileSync(file, src);
      if (totalCleaned <= 5 || totalCleaned % 20 === 0) {
        console.log(`  ${dryRun ? "[dry] " : ""}cleaned: ${path.relative(CONTENT, file)}`);
      }
    }
  }
}

console.log(`\n${dryRun ? "[dry-run] " : ""}共清理 ${totalCleaned} 个 MDX 文件。`);
