#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { createProcessor } from "@mdx-js/mdx";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const CONTENT_DIR = path.join(process.cwd(), "content");
const processor = createProcessor({
  format: "mdx",
  remarkPlugins: [remarkMath, remarkGfm],
});

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files;
}

function nodeText(node) {
  if (!node || typeof node !== "object") return "";
  if (typeof node.value === "string") return node.value;
  return Array.isArray(node.children)
    ? node.children.map(nodeText).join("")
    : "";
}

const failures = [];
const files = walkMdx(CONTENT_DIR);
for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf8");
  const source = raw.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  let tree;
  try {
    tree = processor.parse(source);
  } catch {
    continue; // 语法错误由 mdx-check 负责，避免重复报错。
  }

  const slugger = new GithubSlugger();
  const anchors = new Set();
  visit(tree, "heading", (node) => {
    anchors.add(slugger.slug(nodeText(node).trim()));
  });

  for (const match of source.matchAll(/\]\(#([^\s)]+)\)/g)) {
    let anchor = match[1];
    try {
      anchor = decodeURIComponent(anchor);
    } catch {
      // 非法转义保留原值，随后按不存在处理。
    }
    if (!anchors.has(anchor)) {
      failures.push({
        file: path.relative(process.cwd(), filePath).replaceAll(path.sep, "/"),
        anchor,
      });
    }
  }
}

if (failures.length > 0) {
  console.error(
    `[source-anchor-check] ${files.length} files, ${failures.length} errors:`,
  );
  for (const failure of failures)
    console.error(`- ${failure.file}: #${failure.anchor}`);
  process.exitCode = 1;
} else {
  console.log(`[source-anchor-check] ${files.length} files, 0 errors. ✓`);
}
