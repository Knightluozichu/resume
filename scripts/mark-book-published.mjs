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
const release = argument("--release");
const commit = argument("--commit");
const checkOnly = process.argv.includes("--check");
if (!bookSlug || (!checkOnly && (!release || !commit))) {
  throw new Error(
    checkOnly
      ? "检查模式必须提供 --book"
      : "必须提供 --book、--release 与 --commit",
  );
}
if (!checkOnly && !/^[0-9a-f]{7,40}$/i.test(commit))
  throw new Error(`非法 commit SHA: ${commit}`);
const state = loadPublicationState();
const { ledger } = state;
const publishedAt = new Date().toISOString();
const entries = Object.entries(ledger.chapters).filter(([id]) =>
  id.startsWith(`${bookSlug}/`),
);
const { failures, chapterCount } = validateBookEligibility(state, bookSlug, {
  requireApproved: true,
});
if (failures.length > 0) {
  throw new Error(
    `发布资格检查失败（${failures.length} 项）：\n${failures
      .slice(0, 100)
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
}
if (checkOnly) {
  console.log(`发布资格检查通过：${bookSlug} 共 ${chapterCount} 章。`);
  process.exit(0);
}
for (const [, entry] of entries) {
  entry.status = "published";
  entry.publishedAt = publishedAt;
  entry.publishedRelease = release;
  entry.publishedCommit = commit;
}
ledger.generatedAt = publishedAt;
fs.writeFileSync(state.ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(
  `已标记 ${bookSlug} 的 ${entries.length} 章为 published（${release}）。`,
);
