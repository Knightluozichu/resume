import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const SCORE_THRESHOLD = 90;
export const AUDIT_RULES_VERSION = 3;

export function walkMdxInventory(contentDir) {
  const inventory = new Map();
  const visit = (directory) => {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(entryPath);
      else if (entry.name.endsWith(".mdx")) {
        const id = path
          .relative(contentDir, entryPath)
          .replaceAll(path.sep, "/")
          .replace(/\.mdx$/, "");
        const contentHash = crypto
          .createHash("sha256")
          .update(fs.readFileSync(entryPath))
          .digest("hex")
          .slice(0, 16);
        inventory.set(id, contentHash);
      }
    }
  };
  visit(contentDir);
  return new Map(
    [...inventory.entries()].sort(([a], [b]) => a.localeCompare(b)),
  );
}

export function loadPublicationState(root = process.cwd()) {
  const ledgerPath = path.join(root, "quality/publication-ledger.json");
  const policyPath = path.join(root, "quality/publication-policy.json");
  const manifestPath = path.join(root, "quality/fidelity-manifests.json");
  const contentInventory = walkMdxInventory(path.join(root, "content"));
  return {
    ledgerPath,
    policyPath,
    manifestPath,
    ledger: JSON.parse(fs.readFileSync(ledgerPath, "utf8")),
    policy: JSON.parse(fs.readFileSync(policyPath, "utf8")),
    manifests: JSON.parse(fs.readFileSync(manifestPath, "utf8")).books ?? {},
    contentIds: [...contentInventory.keys()],
    contentHashes: contentInventory,
  };
}

export function manifestFailures({ manifests, contentIds }) {
  const failures = [];
  const bookSlugs = [...new Set(contentIds.map((id) => id.split("/")[0]))];
  const knownSourceAccess = new Set([
    "outline-only",
    "authorized-sample",
    "full-text-primary",
    "public-full-presentation",
  ]);
  for (const bookSlug of bookSlugs) {
    const manifest = manifests[bookSlug];
    if (!manifest) {
      failures.push(`${bookSlug}: fidelity-manifest-missing`);
      continue;
    }
    if (!Array.isArray(manifest.units) || manifest.units.length === 0)
      failures.push(`${bookSlug}: fidelity-units-missing`);
    if (!knownSourceAccess.has(manifest.sourceAccess))
      failures.push(
        `${bookSlug}: sourceAccess=${manifest.sourceAccess ?? "missing"}`,
      );
    if (!manifest.sourceUrl)
      failures.push(`${bookSlug}: authoritative-source-url-missing`);
    if (
      manifest.sourceAccess === "outline-only" &&
      manifest.defaultSourceMode !== "independent-rewrite"
    )
      failures.push(`${bookSlug}: outline-only-requires-independent-rewrite`);
  }
  return failures;
}

export function policyFailures(policy) {
  const failures = [];
  if (policy?.version !== 1) failures.push(`policy-version=${policy?.version}`);
  if (policy?.mode !== "strict-book-allowlist")
    failures.push(`policy-mode=${policy?.mode}`);
  if (!Array.isArray(policy?.publishedBooks))
    failures.push("policy-publishedBooks-missing");
  else {
    const invalid = policy.publishedBooks.filter(
      (bookSlug) =>
        typeof bookSlug !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(bookSlug),
    );
    if (invalid.length > 0)
      failures.push(`policy-invalid-slugs=${invalid.join(",")}`);
    const duplicates = policy.publishedBooks.filter(
      (bookSlug, index) => policy.publishedBooks.indexOf(bookSlug) !== index,
    );
    if (duplicates.length > 0)
      failures.push(`policy-duplicates=${[...new Set(duplicates)].join(",")}`);
  }
  return failures;
}

export function chapterQualityFailures(entry) {
  const failures = [];
  if (!["passed", "published"].includes(entry?.status))
    failures.push(`status=${entry?.status ?? "missing"}`);
  if (!Number.isFinite(entry?.score) || entry.score < SCORE_THRESHOLD)
    failures.push(`score=${entry?.score ?? "missing"}<${SCORE_THRESHOLD}`);
  if (!Array.isArray(entry?.dimensionFailures))
    failures.push("dimensionFailures-missing");
  else if (entry.dimensionFailures.length > 0)
    failures.push(`dimensionFailures=${entry.dimensionFailures.join(",")}`);
  if (!Array.isArray(entry?.hardBlockers))
    failures.push("hardBlockers-missing");
  else if (entry.hardBlockers.length > 0)
    failures.push(`hardBlockers=${entry.hardBlockers.join(",")}`);
  if (entry?.qualityVersion !== 2) failures.push("qualityVersion!=2");
  if (!entry?.practiceMode) failures.push("practiceMode-missing");
  if (!entry?.sourceMode) failures.push("sourceMode-missing");
  if (entry?.manualBypass) failures.push("manualBypass-forbidden");
  if (typeof entry?.contentHash !== "string" || entry.contentHash.length < 8)
    failures.push("contentHash-missing");
  return failures;
}

export function inventoryFailures({ ledger, contentIds }) {
  const failures = [];
  const ledgerIds = Object.keys(ledger.chapters ?? {}).sort();
  const contentSet = new Set(contentIds);
  const ledgerSet = new Set(ledgerIds);
  const missing = contentIds.filter((id) => !ledgerSet.has(id));
  const stale = ledgerIds.filter((id) => !contentSet.has(id));
  if (ledger.version !== 2) failures.push(`ledger-version=${ledger.version}`);
  if (ledger.auditRulesVersion !== AUDIT_RULES_VERSION)
    failures.push(
      `ledger-audit-rules=${ledger.auditRulesVersion ?? "missing"} expected=${AUDIT_RULES_VERSION}`,
    );
  if (ledger.totalChapters !== contentIds.length)
    failures.push(
      `ledger-total=${ledger.totalChapters ?? "missing"} content-total=${contentIds.length}`,
    );
  if (ledgerIds.length !== contentIds.length)
    failures.push(
      `ledger-entries=${ledgerIds.length} content-total=${contentIds.length}`,
    );
  if (missing.length > 0)
    failures.push(`ledger-missing=${missing.slice(0, 20).join(",")}`);
  if (stale.length > 0)
    failures.push(`ledger-stale=${stale.slice(0, 20).join(",")}`);
  return failures;
}

export function validateBookEligibility(
  state,
  bookSlug,
  { requireApproved = false, includeGlobalInventory = true } = {},
) {
  const failures = [
    ...policyFailures(state.policy),
    ...manifestFailures(state).filter((failure) =>
      failure.startsWith(`${bookSlug}:`),
    ),
    ...(includeGlobalInventory ? inventoryFailures(state) : []),
  ];
  const contentIds = state.contentIds.filter((id) =>
    id.startsWith(`${bookSlug}/`),
  );
  const ledgerEntries = Object.entries(state.ledger.chapters ?? {}).filter(
    ([id]) => id.startsWith(`${bookSlug}/`),
  );
  const contentSet = new Set(contentIds);
  const ledgerSet = new Set(ledgerEntries.map(([id]) => id));

  if (contentIds.length === 0) failures.push(`book-not-found=${bookSlug}`);
  for (const id of contentIds) {
    if (!ledgerSet.has(id)) failures.push(`${id}: ledger-entry-missing`);
  }
  for (const [id] of ledgerEntries) {
    if (!contentSet.has(id)) failures.push(`${id}: content-file-missing`);
  }
  for (const [id, entry] of ledgerEntries) {
    const entryFailures = chapterQualityFailures(entry);
    if (state.contentHashes.get(id) !== entry?.contentHash)
      entryFailures.push(
        `contentHash-stale=${entry?.contentHash ?? "missing"} actual=${state.contentHashes.get(id) ?? "missing"}`,
      );
    if (entryFailures.length > 0)
      failures.push(`${id}: ${entryFailures.join("; ")}`);
  }

  const manifest = state.manifests[bookSlug];
  if (manifest && Array.isArray(manifest.units)) {
    const strongestEvidence = new Map();
    for (const [, entry] of ledgerEntries) {
      if (entry.role !== "chapter") continue;
      for (const evidence of entry.unitEvidence ?? []) {
        const previous = strongestEvidence.get(evidence.id);
        if (!previous || evidence.explained > previous.explained)
          strongestEvidence.set(evidence.id, evidence);
      }
    }
    let totalConcepts = 0;
    let explainedConcepts = 0;
    for (const unit of manifest.units) {
      const evidence = strongestEvidence.get(unit.id);
      const conceptCount = Array.isArray(unit.concepts)
        ? unit.concepts.length
        : 0;
      totalConcepts += conceptCount;
      explainedConcepts += Math.min(conceptCount, evidence?.explained ?? 0);
      if (!evidence)
        failures.push(`${bookSlug}: official-unit-unmapped=${unit.id}`);
    }
    const coverage = totalConcepts ? explainedConcepts / totalConcepts : 0;
    if (coverage < 0.9)
      failures.push(
        `${bookSlug}: official-concept-coverage=${(coverage * 100).toFixed(1)}%<90%`,
      );
  }

  const approved = new Set(state.policy.publishedBooks ?? []);
  if (requireApproved && !approved.has(bookSlug))
    failures.push(`${bookSlug}: publication-policy-not-approved`);

  return { failures, chapterCount: contentIds.length };
}
