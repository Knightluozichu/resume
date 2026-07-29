#!/usr/bin/env node

import fs from "node:fs";

import {
  loadPublicationState,
  validateBookEligibility,
} from "./lib/publication-quality.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const bookSlug = argument("--book");
const checkOnly = process.argv.includes("--check");
if (!bookSlug) throw new Error("必须提供 --book <slug>");
if (!/^[a-z0-9][a-z0-9-]*$/.test(bookSlug))
  throw new Error(`非法 book slug: ${bookSlug}`);

const state = loadPublicationState();
const { failures, chapterCount } = validateBookEligibility(state, bookSlug);
if (failures.length > 0) {
  throw new Error(
    `整书发布审批失败（${failures.length} 项）：\n${failures
      .slice(0, 100)
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
}

if (checkOnly) {
  console.log(`整书发布资格通过：${bookSlug}，共 ${chapterCount} 章。`);
  process.exit(0);
}

const publishedBooks = new Set(state.policy.publishedBooks ?? []);
if (publishedBooks.has(bookSlug)) {
  console.log(`整书已在生产白名单中：${bookSlug}。`);
  process.exit(0);
}
publishedBooks.add(bookSlug);
state.policy.publishedBooks = [...publishedBooks].sort();
fs.writeFileSync(
  state.policyPath,
  `${JSON.stringify(state.policy, null, 2)}\n`,
);
console.log(
  `已批准 ${bookSlug} 上架（${chapterCount} 章）。提交 publication-policy.json 后方可部署。`,
);
