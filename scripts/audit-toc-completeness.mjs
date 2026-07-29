#!/usr/bin/env node
/**
 * audit-toc-completeness.mjs — 书籍目录完整性审计
 *
 * 检测逻辑：
 * 1. 优先读取 quality/original-toc.json；缺失时使用全库 fidelity manifest
 * 2. 扫描 content/<book>/ 统计实质章节数（排除 learning-map / final-review）
 * 3. 检查 section 目录名是否为通用模板（fundamentals/core/advanced/review）
 * 4. 计算覆盖率 = 平台章数 / 原版章数
 * 5. 检查每章 MDX 行数是否 >= 200
 * 6. 输出分级报告 + 不合格清单
 *
 * 用法：node scripts/audit-toc-completeness.mjs [--json] [--book <slug>]
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const TOC_PATH = path.join(ROOT, "quality/original-toc.json");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");

const jsonOutput = process.argv.includes("--json");
const bookArg = process.argv.indexOf("--book");
const singleBook = bookArg >= 0 ? process.argv[bookArg + 1] : null;

// 通用四段式模板检测
const GENERIC_SECTIONS = new Set([
  "00-fundamentals",
  "01-core",
  "02-advanced",
  "03-review",
  "00-foundations",
  "01-foundations",
  "02-advanced",
  "03-advanced",
]);

function isGenericTemplate(sectionDirs) {
  const names = sectionDirs.map((d) => d.toLowerCase());
  const genericCount = names.filter((n) =>
    /fundamentals|core|advanced|review|foundations/.test(n),
  ).length;
  return genericCount >= 3 && names.length <= 5;
}

function countSubstantiveChapters(bookDir) {
  const chapters = [];
  const sections = fs
    .readdirSync(bookDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const section of sections) {
    const sectionDir = path.join(bookDir, section);
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      // 排除结构页
      if (
        /learning-map|final-review|official-learning-map|official-final-review/.test(
          slug,
        )
      )
        continue;
      const filePath = path.join(sectionDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n").length;
      chapters.push({ slug, section, lines, filePath });
    }
  }
  return { chapters, sections };
}

function gradeBook(
  platformChapters,
  originalChapters,
  isGeneric,
  shortChapters,
) {
  if (!originalChapters || originalChapters <= 0)
    return { grade: "?", coverage: null };

  const coverage = platformChapters / originalChapters;

  // 豁免：原版本身 <= 10 章
  if (originalChapters <= 10 && platformChapters >= originalChapters * 0.8) {
    return { grade: "A", coverage };
  }

  if (isGeneric) {
    return { grade: coverage < 0.5 ? "D" : "C", coverage };
  }

  if (coverage >= 0.95) return { grade: "A", coverage };
  if (coverage >= 0.8) return { grade: "B", coverage };
  if (coverage >= 0.5) return { grade: "C", coverage };
  return { grade: "D", coverage };
}

// 主逻辑
let tocData = {};
if (fs.existsSync(TOC_PATH)) {
  tocData = JSON.parse(fs.readFileSync(TOC_PATH, "utf8"));
}
const manifestDocument = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
  : { books: {} };
const manifests = manifestDocument.books ?? {};

const books = singleBook
  ? [singleBook]
  : fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();

const results = [];

for (const book of books) {
  const bookDir = path.join(CONTENT_DIR, book);
  if (!fs.existsSync(bookDir)) continue;

  const { chapters, sections } = countSubstantiveChapters(bookDir);
  const platformCount = chapters.length;
  const isGeneric = isGenericTemplate(sections);
  const shortChapters = chapters.filter((c) => c.lines < 200);

  const toc = tocData[book];
  const manifest = manifests[book] ?? null;
  const originalChapters = toc
    ? toc.originalChapters
    : Array.isArray(manifest?.units)
      ? manifest.units.length
      : null;
  const tocEvidence = toc
    ? "verified-original-toc"
    : manifest
      ? "fidelity-manifest-units"
      : "missing";

  const { grade, coverage } = gradeBook(
    platformCount,
    originalChapters,
    isGeneric,
    shortChapters,
  );

  results.push({
    book,
    platformChapters: platformCount,
    originalChapters,
    coverage: coverage !== null ? Math.round(coverage * 100) : null,
    grade,
    isGeneric,
    shortChapters: shortChapters.length,
    sections: sections.length,
    bookTitle: toc ? toc.bookTitle : null,
    tocEvidence,
    sourceAccess: manifest?.sourceAccess ?? null,
    sourceMode: manifest?.defaultSourceMode ?? null,
  });
}

// 输出
if (jsonOutput) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const grades = { A: [], B: [], C: [], D: [], "?": [] };
for (const r of results) grades[r.grade].push(r);

console.log("=== 目录结构计数覆盖率审计（不代表正文质量）===");
console.log(`A 级（结构计数 >= 95%）：${grades.A.length} 本`);
console.log(`B 级（结构计数 >= 80%）：${grades.B.length} 本`);
console.log(`C 级（结构计数 < 80%）：${grades.C.length} 本`);
console.log(`D 级（结构计数 < 50%）：${grades.D.length} 本`);
console.log(`? 级（无目录证据）：${grades["?"].length} 本`);
console.log("");

if (grades.D.length > 0) {
  console.log("=== D 级（严重不合格）===");
  for (const r of grades.D) {
    const flags = [`${r.coverage}%`];
    if (r.isGeneric) flags.push("通用四段式");
    if (r.shortChapters > 0) flags.push(`${r.shortChapters}章<200行`);
    console.log(
      `  ${r.book}: ${r.platformChapters}/${r.originalChapters} [${flags.join("] [")}]`,
    );
  }
  console.log("");
}

if (grades.C.length > 0) {
  console.log("=== C 级（不合格）===");
  for (const r of grades.C) {
    const flags = [`${r.coverage}%`];
    if (r.isGeneric) flags.push("通用四段式");
    if (r.shortChapters > 0) flags.push(`${r.shortChapters}章<200行`);
    console.log(
      `  ${r.book}: ${r.platformChapters}/${r.originalChapters} [${flags.join("] [")}]`,
    );
  }
  console.log("");
}

if (grades["?"].length > 0 && !singleBook) {
  console.log(`=== ? 级（无目录证据，需补充）：${grades["?"].length} 本 ===`);
  // 只列出使用通用模板的（高度疑似不合格）
  const suspicious = grades["?"].filter((r) => r.isGeneric);
  if (suspicious.length > 0) {
    console.log("  其中使用通用四段式模板（高度疑似不合格）：");
    for (const r of suspicious) {
      console.log(`    ${r.book}: ${r.platformChapters} 章`);
    }
  }
}

// 退出码：C/D 或缺少目录证据都返回 1；未知不能再静默通过。
const failCount = grades.C.length + grades.D.length + grades["?"].length;
if (failCount > 0) {
  console.log(`\n总计 ${failCount} 本不合格。`);
  process.exit(1);
} else {
  console.log("\n所有书籍的目录结构计数合格；正文仍须通过质量 v2。");
  process.exit(0);
}
