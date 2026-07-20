#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

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
const ledgerPath = path.join(process.cwd(), "quality/remediation-ledger.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const publishedAt = new Date().toISOString();
const entries = Object.entries(ledger.chapters).filter(([id]) =>
  id.startsWith(`${bookSlug}/`),
);
if (entries.length === 0) throw new Error(`台账中不存在图书：${bookSlug}`);
const invalid = entries.filter(
  ([, entry]) => !["passed", "published"].includes(entry.status),
);
if (invalid.length > 0) {
  throw new Error(`仍有 ${invalid.length} 章未通过，不允许标记发布`);
}
if (checkOnly) {
  console.log(`发布资格检查通过：${bookSlug} 共 ${entries.length} 章。`);
  process.exit(0);
}
for (const [, entry] of entries) {
  entry.status = "published";
  entry.publishedAt = publishedAt;
  entry.publishedRelease = release;
  entry.publishedCommit = commit;
}
ledger.generatedAt = publishedAt;
fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(
  `已标记 ${bookSlug} 的 ${entries.length} 章为 published（${release}）。`,
);
