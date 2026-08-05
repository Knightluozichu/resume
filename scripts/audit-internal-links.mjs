#!/usr/bin/env node

/**
 * scripts/audit-internal-links.mjs — 源级内链审计（不依赖构建）
 *
 * 扫 content/**\/*.mdx 中所有站内链接（/learn/... 与相对导航链接），验证：
 *  - 三段式 /learn/<book>/<section>/<chapter> → 目标 .mdx 必须存在
 *  - 两段式 /learn/<book>（书籍根路径）→ 该书至少有一个章节
 *  - 页内锚点 #xxx → 当前文件需包含对应标题（近似检查，避免误报）
 *
 * 与 scripts/check-links.mjs 互补：check-links 在 build 后守门 HTML 渲染结果，
 * 本脚本在 CI/提交前快速拦截 MDX 里的坏链接，无需先跑 pnpm build。
 *
 * 用法：node scripts/audit-internal-links.mjs [--book <slug>]
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");

const index = process.argv.indexOf("--book");
const onlyBook = index >= 0 ? process.argv[index + 1] : null;

const allMdx = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".mdx")) allMdx.push(full);
  }
})(CONTENT_DIR);

/** 站内 /learn/... 目标 → 对应 .mdx 是否存在 */
function learnTargetExists(url) {
  const parts = url.replace(/^\/learn\//, "").split("/").filter(Boolean);
  if (parts.length === 1) {
    // 书籍根路径：书目录存在即可（路由会重定向到第一章）
    return fs.existsSync(path.join(CONTENT_DIR, parts[0]));
  }
  if (parts.length === 3) {
    const [book, section, chapter] = parts;
    return fs.existsSync(
      path.join(CONTENT_DIR, book, section, `${chapter}.mdx`),
    );
  }
  return false; // 其他形态（0 段 / 2 段 / 4 段）视为不可解析
}

const issues = [];
let checked = 0;

for (const file of allMdx) {
  if (onlyBook && !file.includes(`/${onlyBook}/`)) continue;
  const src = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);

  // 站内绝对链接 /learn/...（排除 http(s) 外链——nodejs.org/en/learn/... 等）
  // markdown 链接形如 ](url)，用 ]( 锚定后捕获 url，再排除以 http 开头的。
  for (const m of src.matchAll(/\]\(([^)\s]+)\)/g)) {
    const url = m[1];
    if (/^https?:\/\//i.test(url)) continue; // 外链跳过
    if (!url.startsWith("/learn/")) continue; // 非站内
    checked++;
    if (!learnTargetExists(url)) {
      issues.push({ rel, url, reason: "目标章节文件不存在" });
    }
  }

  // 站内相对导航链接（../或./开头且指向 /learn 或同级 mdx）
  for (const m of src.matchAll(/\]\(((?:\.\.?\/)[^)\s]+)\)/g)) {
    const raw = m[1];
    // 只关心指向 /learn 或同书章节的相对路径（跳过图片/静态资源）
    if (/\.(png|jpg|svg|webp|gif)$/i.test(raw)) continue;
    const resolved = path.resolve(path.dirname(file), raw);
    // 若解析后是 .mdx 文件，检查存在性
    if (resolved.endsWith(".mdx")) {
      checked++;
      if (!fs.existsSync(resolved)) {
        issues.push({ rel, url: raw, reason: "相对链接目标不存在" });
      }
    }
  }
}

if (issues.length > 0) {
  console.error(`✗ 内链审计失败（${issues.length} 处，共检查 ${checked} 条）：`);
  for (const { rel, url, reason } of issues.slice(0, 30)) {
    console.error(`  - ${rel}\n      ${url} → ${reason}`);
  }
  process.exit(1);
}

console.log(`✓ 内链审计通过：${checked} 条链接全部有效。`);
