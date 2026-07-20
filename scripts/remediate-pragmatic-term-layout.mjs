#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BOOK_DIR = path.join(ROOT, "content/pragmatic-programmer");
const START = "## 版次、对象与验收合同\n\n";
const END = '\n\n<Callout type="info">';
const TERM_PATTERN = /<Term def="([^"]*)">\s*([^<]+?)\s*<\/Term>/g;

function walkMdx(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMdx(entryPath);
      return entry.name.endsWith(".mdx") ? [entryPath] : [];
    })
    .sort();
}

function normalizeFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const start = source.indexOf(START);
  const end = source.indexOf(END, start + START.length);
  if (start < 0 || end < 0)
    throw new Error(`找不到术语合同边界: ${path.relative(ROOT, filePath)}`);

  const block = source.slice(start + START.length, end);
  const matches = [...block.matchAll(TERM_PATTERN)];
  if (matches.length !== 5)
    throw new Error(
      `术语数量不是 5: ${path.relative(ROOT, filePath)} (${matches.length})`,
    );

  const last = matches.at(-1);
  const suffix = block
    .slice((last?.index ?? 0) + (last?.[0].length ?? 0))
    .replace(/^\s*、?\s*/, "")
    .trim();
  if (!suffix.startsWith("共同构成本页验收坐标。"))
    throw new Error(`术语后缀异常: ${path.relative(ROOT, filePath)}`);

  const itemLines = matches.map(
    (match) =>
      `    { term: ${JSON.stringify(match[2].trim())}, def: ${JSON.stringify(match[1])} },`,
  );
  const replacement = [
    "<TermSequence",
    "  items={[",
    ...itemLines,
    "  ]}",
    `  suffix=${JSON.stringify(suffix)}`,
    "/>",
  ].join("\n");

  let next =
    source.slice(0, start + START.length) + replacement + source.slice(end);
  next = next.replace(/^  Term,$/m, "  TermSequence,");
  if (!next.includes("  TermSequence,"))
    throw new Error(`未更新组件导入: ${path.relative(ROOT, filePath)}`);
  if (next.includes("<Term def="))
    throw new Error(`仍有散落 Term: ${path.relative(ROOT, filePath)}`);

  fs.writeFileSync(filePath, next);
}

const files = walkMdx(BOOK_DIR);
for (const filePath of files) normalizeFile(filePath);
console.log(`已把 ${files.length} 页术语合同改为单段 TermSequence。`);
