#!/usr/bin/env node

/**
 * set-book-draft.mjs —— 批量设置一本书所有章节的 frontmatter draft 标志。
 *
 * 用法：
 *   node scripts/set-book-draft.mjs --book <slug> --draft false   # 上架（去 draft）
 *   node scripts/set-book-draft.mjs --book <slug> --draft true    # 下架
 *
 * 仅修改 frontmatter 区的 `draft:` 行；无 draft 行的章节补一行 draft: <value>。
 */

import fs from "node:fs";
import path from "node:path";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const bookSlug = argument("--book");
const draftRaw = argument("--draft");
if (!bookSlug || draftRaw === null) {
  throw new Error("必须提供 --book <slug> 与 --draft <true|false>");
}
const draftValue = draftRaw === "true";

const contentDir = path.join(process.cwd(), "content", bookSlug);
if (!fs.existsSync(contentDir)) throw new Error(`不存在书籍目录：content/${bookSlug}`);

const mdxFiles = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".mdx")) mdxFiles.push(p);
  }
};
walk(contentDir);

let changed = 0;
for (const file of mdxFiles) {
  const src = fs.readFileSync(file, "utf8");
  const fmEnd = src.indexOf("---", 3);
  if (fmEnd < 0) continue; // 无 frontmatter，跳过
  let fm = src.slice(0, fmEnd + 3);
  const rest = src.slice(fmEnd + 3);
  const draftRe = /^draft:\s*(true|false)\s*$/m;
  if (draftRe.test(fm)) {
    const before = fm;
    fm = fm.replace(draftRe, `draft: ${draftValue}`);
    if (fm === before) continue;
  } else {
    // 无 draft 行：在 frontmatter 末尾（结束 --- 之前）补一行
    fm = fm.replace(/\n---\s*$/, `\ndraft: ${draftValue}\n---`);
  }
  fs.writeFileSync(file, fm + rest);
  changed++;
}

console.log(`content/${bookSlug}: ${changed}/${mdxFiles.length} 章 draft 设为 ${draftValue}`);
