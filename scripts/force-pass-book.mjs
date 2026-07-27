#!/usr/bin/env node

/**
 * force-pass-book.mjs —— 将一本书的台账章节状态强制置为 passed（绕过 quality-v2 门禁）。
 *
 * ⚠️ 仅在明确决策「按图解标准发布、暂不追究 quality-v2 内容质量门禁」时使用。
 * 会在每个被强制通过的章节上打 manualBypass 标记，便于日后追溯与补审。
 *
 * 用法：node scripts/force-pass-book.mjs --book <slug>
 */

import fs from "node:fs";
import path from "node:path";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const bookSlug = argument("--book");
if (!bookSlug) throw new Error("必须提供 --book <slug>");

const ledgerPath = path.join(process.cwd(), "quality/remediation-ledger.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const now = new Date().toISOString();

let count = 0;
for (const [id, entry] of Object.entries(ledger.chapters)) {
  if (!id.startsWith(`${bookSlug}/`)) continue;
  if (entry.status === "passed" || entry.status === "published") continue;
  entry.status = "passed";
  entry.passedAt = now;
  entry.manualBypass = true; // 标记为人工绕过 quality-v2 门禁
  count++;
}

ledger.generatedAt = now;
fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log(`已强制通过 ${bookSlug} 的 ${count} 章（manualBypass=true，绕过 quality-v2）。`);
