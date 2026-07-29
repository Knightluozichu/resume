#!/usr/bin/env node

import {
  chapterQualityFailures,
  inventoryFailures,
  loadPublicationState,
  manifestFailures,
  policyFailures,
  validateBookEligibility,
} from "./lib/publication-quality.mjs";

const state = loadPublicationState();
const failures = [
  ...policyFailures(state.policy),
  ...manifestFailures(state),
  ...inventoryFailures(state),
];
const approvedBooks = new Set(state.policy.publishedBooks ?? []);
const ledgerPublishedBooks = new Set();

for (const [id, entry] of Object.entries(state.ledger.chapters ?? {})) {
  if (["passed", "published"].includes(entry.status)) {
    const entryFailures = chapterQualityFailures(entry);
    if (entryFailures.length > 0)
      failures.push(`${id}: ${entryFailures.join("; ")}`);
  }
  if (entry.status === "published") ledgerPublishedBooks.add(id.split("/")[0]);
}

for (const bookSlug of approvedBooks) {
  const result = validateBookEligibility(state, bookSlug, {
    requireApproved: true,
    includeGlobalInventory: false,
  });
  failures.push(...result.failures.map((failure) => `${bookSlug}: ${failure}`));
}
for (const bookSlug of ledgerPublishedBooks) {
  if (!approvedBooks.has(bookSlug))
    failures.push(`${bookSlug}: ledger-published-but-policy-quarantined`);
}

if (failures.length > 0) {
  console.error(`发布不变量失败：${failures.length} 项`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200)
    console.error(`…另有 ${failures.length - 200} 项未显示`);
  process.exitCode = 1;
} else {
  console.log(
    `发布不变量通过：${state.contentIds.length} 章，${approvedBooks.size} 本已发布。`,
  );
}
