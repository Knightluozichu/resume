#!/usr/bin/env node
/**
 * scripts/check-mdx.mjs — HEL-221
 *
 * MDX 全量编译校验：遍历 content/**\/*.mdx（含 draft:true 章节），用 @mdx-js/mdx
 * 的 compile() 配合「与 next build 同一套 remark/rehype plugin 链」逐文件编译。
 *
 * 为什么覆盖 draft:true：见 user-memory「draft 章 MDX 潜伏错」——Next 的 SSG 在
 * 生产 build 里过滤掉 draft，draft 章的 MDX/JSX 语法错只在改成 draft:false 那一刻
 * 才暴露。本脚本在 CI 里逐个 compile，所有章都过一遍 mdast/hast，潜伏错当场抓出。
 *
 * Plugin 链同步：源头是 src/app/learn/[...slug]/page.tsx 里 compileMDX 的
 * mdxOptions.remarkPlugins / rehypePlugins 数组（截至 HEL-221 当前）：
 *   remarkPlugins: [remarkMath, remarkGfm]
 *   rehypePlugins: [
 *     [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
 *     rehypeKatex,
 *     () => rehypeCollectHeadings(headings),
 *     rehypeSlug,
 *   ]
 * Plugin 配置一变，记得回来同步本脚本。
 *
 * 行为：
 *  - 不遇错即退，收集全部失败文件 + 错误位置后统一报错；
 *  - 0 errors 退 0；≥1 errors 退 1。
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { compile } from "@mdx-js/mdx";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content");

/** 递归收集 content/ 下所有 .mdx 文件（含 draft）。 */
function collectMdxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectMdxFiles(full));
    else if (name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/**
 * rehypeCollectHeadings 等价 JS 实现，与 src/lib/rehype-collect-headings.ts
 * 保持一致行为（h2/h3 文档根直系、GithubSlugger 写 id）。本脚本只编译不渲染，
 * 不用收集 TOC——但仍要让该插件在管线里运行，确保它与作者的 hast 互动不抛错。
 */
function rehypeCollectHeadings(headings) {
  return (tree) => {
    const slugger = new GithubSlugger();
    visit(tree, "element", (node, _index, parent) => {
      const tag = node.tagName;
      if (tag !== "h2" && tag !== "h3") return;
      if (!parent || parent.type !== "root") return;
      let text = "";
      visit(node, "text", (t) => {
        text += t.value;
      });
      text = text.trim();
      if (!text) return;
      const props = (node.properties ??= {});
      let id = typeof props.id === "string" ? props.id : "";
      if (!id) {
        id = slugger.slug(text);
        props.id = id;
      } else {
        slugger.slug(id);
      }
      headings.push({ depth: tag === "h2" ? 2 : 3, text, id });
    });
  };
}

/**
 * 编译单个 mdx 文件。gray-matter 剥离 frontmatter（与生产 compileMDX
 * parseFrontmatter:false + 上游 getChapter 已剥离的处理保持一致）。
 */
async function checkOne(file) {
  const raw = readFileSync(file, "utf8");
  const { content: body } = matter(raw);
  // 每个文件用独立 headings 数组：与 page.tsx 同形态，避免跨文件污染。
  const headings = [];
  await compile(body, {
    // 生产用 compileMDX，本脚本用 compile 仅做语法/插件链校验，不输出渲染。
    // jsx:true 让产物保留 JSX 形式，跳过下游 estree-to-JS 转换中可能引入的
    // 额外错误源——目的是抓 MDX/插件层错，不是抓 babel 错。
    jsx: true,
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
      rehypeKatex,
      () => rehypeCollectHeadings(headings),
      rehypeSlug,
    ],
  });
}

/** 把 unified/MDX 抛出的错误格式化为 file:line:col + message。 */
function formatError(file, err) {
  const rel = relative(ROOT, file);
  const place = err?.place ?? err?.position;
  const line = place?.start?.line ?? place?.line ?? "?";
  const col = place?.start?.column ?? place?.column ?? "?";
  const msg = err?.reason ?? err?.message ?? String(err);
  return `${rel}:${line}:${col}\n  ${msg}`;
}

async function main() {
  const files = collectMdxFiles(CONTENT_DIR).sort();
  const failures = [];

  for (const f of files) {
    try {
      await checkOne(f);
    } catch (err) {
      failures.push({ file: f, err });
    }
  }

  if (failures.length === 0) {
    console.log(`[mdx-check] ${files.length} files, 0 errors. ✓`);
    process.exit(0);
  }

  console.error(`[mdx-check] ${files.length} files, ${failures.length} errors:\n`);
  for (const { file, err } of failures) {
    console.error(formatError(file, err));
    console.error("");
  }
  process.exit(1);
}

main().catch((e) => {
  console.error("[mdx-check] fatal:", e);
  process.exit(2);
});
