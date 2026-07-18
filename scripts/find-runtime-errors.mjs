#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

process.env.NODE_ENV = "production";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const concurrency = Number.parseInt(
  process.env.MDX_RUNTIME_CONCURRENCY ?? "16",
  10,
);

function listMdxFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listMdxFiles(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files;
}

const noopComponent = () => null;
const renderJsx = (type, props) =>
  typeof type === "function" ? type(props ?? {}) : null;
const jsxRuntime = {
  Fragment: Symbol.for("mdx-runtime-check.fragment"),
  jsx: renderJsx,
  jsxs: renderJsx,
  jsxDEV: renderJsx,
};

async function checkFile(filePath) {
  const source = matter(fs.readFileSync(filePath, "utf8")).content;
  const { compiledSource } = await serialize(
    source,
    {
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [[rehypeKatex, { strict: "error" }]],
      },
    },
    true,
  );
  const componentNames = [
    ...compiledSource.matchAll(/_missingMdxReference\("([^"]+)"/g),
  ].map((match) => match[1]);
  const components = Object.fromEntries(
    componentNames.map((name) => [name, noopComponent]),
  );

  // The production renderer also evaluates this trusted, repository-owned output.
  const compiledModule = Function("opts", compiledSource)(jsxRuntime);
  compiledModule.default({ components });
}

async function main() {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error("MDX_RUNTIME_CONCURRENCY must be a positive integer");
  }

  const files = listMdxFiles(contentRoot).sort();
  const failures = [];
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= files.length) return;
      const filePath = files[index];
      try {
        await checkFile(filePath);
      } catch (error) {
        failures.push({
          filePath,
          message: `${error?.name ?? "Error"}: ${error?.message ?? error}`,
        });
      }
      completed += 1;
      if (completed % 500 === 0) {
        console.log(`[mdx-runtime-check] ${completed}/${files.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  failures.sort((a, b) => a.filePath.localeCompare(b.filePath));

  if (failures.length > 0) {
    console.error(
      `[mdx-runtime-check] ${failures.length}/${files.length} files failed:`,
    );
    for (const failure of failures) {
      console.error(
        `${path.relative(projectRoot, failure.filePath)}: ${failure.message}`,
      );
    }
    process.exit(1);
  }

  console.log(`[mdx-runtime-check] ${files.length} files, 0 errors. OK`);
}

main().catch((error) => {
  console.error("[mdx-runtime-check] fatal:", error);
  process.exit(2);
});
