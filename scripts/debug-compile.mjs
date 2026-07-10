#!/usr/bin/env node
// Debug: compile a specific MDX file and show the compiled output
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node debug-compile.mjs <file.mdx>");
  process.exit(1);
}

const raw = readFileSync(file, "utf8");
const { content: body } = matter(raw);

const compiled = await compile(body, {
  jsx: false,
  remarkPlugins: [],
});

console.log(String(compiled));
