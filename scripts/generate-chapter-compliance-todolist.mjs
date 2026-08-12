#!/usr/bin/env node

/**
 * Generate the complete chapter compliance inventory.
 *
 * The remediation TODO used to be an append-only list of chapters that had
 * already entered the quality queue.  That makes missing official units
 * invisible: they have no MDX file, no ledger entry, and therefore no TODO
 * row.  This generator deliberately builds the list from both inventories:
 *
 *   1. every MDX chapter in publication-ledger.json; and
 *   2. every fidelity-manifest unit that has no (or incomplete) evidence.
 *
 * It is safe to rerun after content, ledger, or manifest changes.
 */

import fs from "node:fs";
import path from "node:path";

import {
  chapterQualityFailures,
  loadPublicationState,
  validateBookEligibility,
} from "./lib/publication-quality.mjs";

const ROOT = process.cwd();
const TODO_PATH = path.join(ROOT, "quality/chapter-compliance-todolist.md");
const TOC_PATH = path.join(ROOT, "quality/original-toc.json");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");

const state = loadPublicationState(ROOT);
const toc = JSON.parse(fs.readFileSync(TOC_PATH, "utf8"));
const manifests =
  JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")).books ?? {};
const ledger = state.ledger.chapters ?? {};

const contentIds = new Set(state.contentIds);
const ledgerIds = new Set(Object.keys(ledger));
const missingLedgerEntries = [...contentIds].filter((id) => !ledgerIds.has(id));
const staleLedgerEntries = [...ledgerIds].filter((id) => !contentIds.has(id));
if (missingLedgerEntries.length || staleLedgerEntries.length) {
  throw new Error(
    [
      "内容库存与 publication-ledger 不一致，拒绝生成不完整 TODO。",
      missingLedgerEntries.length
        ? `ledger 缺少：${missingLedgerEntries.slice(0, 20).join(", ")}`
        : null,
      staleLedgerEntries.length
        ? `ledger 多出：${staleLedgerEntries.slice(0, 20).join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
}

const clean = (value) =>
  String(value ?? "")
    .replaceAll("\r", "")
    .replaceAll("\n", " ")
    .replaceAll("`", "'")
    .trim();

const formatList = (values, fallback = "无") =>
  values.length ? values.map(clean).join("、") : fallback;

const byBook = (bookSlug) =>
  Object.entries(ledger)
    .filter(([id]) => id.startsWith(`${bookSlug}/`))
    .map(([id, entry]) => ({ id, entry }))
    .sort((a, b) => a.id.localeCompare(b.id));

const bookSlugs = [
  ...new Set([
    ...state.contentIds.map((id) => id.split("/")[0]),
    ...Object.keys(manifests),
    ...Object.keys(toc),
  ]),
].sort();

const statusIcon = {
  failed: "❌",
  queued: "⚠️",
  passed: "✅",
  published: "🚀",
};

const statusPriority = {
  failed: "P1",
  queued: "P2",
  passed: "",
  published: "",
};

const statusLabel = {
  failed: "failed",
  queued: "queued（待发布）",
  passed: "passed",
  published: "published（已发布）",
};

const allBookData = [];
for (const bookSlug of bookSlugs) {
  const chapters = byBook(bookSlug);
  const manifest = manifests[bookSlug] ?? null;
  const units = Array.isArray(manifest?.units) ? manifest.units : [];
  const unitsById = new Map(units.map((unit) => [unit.id, unit]));
  const evidenceByUnit = new Map();

  for (const { id, entry } of chapters) {
    for (const evidence of entry.unitEvidence ?? []) {
      const current = evidenceByUnit.get(evidence.id) ?? {
        best: evidence,
        chapterIds: [],
      };
      if (!current.chapterIds.includes(id)) current.chapterIds.push(id);
      if ((evidence.explained ?? 0) > (current.best.explained ?? 0))
        current.best = evidence;
      evidenceByUnit.set(evidence.id, current);
    }
  }

  const unmappedUnits = units.filter((unit) => !evidenceByUnit.has(unit.id));
  const incompleteUnits = units.filter((unit) => {
    const evidence = evidenceByUnit.get(unit.id)?.best;
    if (!evidence) return false;
    const conceptCount = Array.isArray(unit.concepts)
      ? unit.concepts.length
      : 0;
    return (evidence.explained ?? 0) < conceptCount;
  });
  const extraEvidenceIds = [...evidenceByUnit.keys()].filter(
    (id) => !unitsById.has(id),
  );

  const totalConcepts = units.reduce(
    (sum, unit) =>
      sum + (Array.isArray(unit.concepts) ? unit.concepts.length : 0),
    0,
  );
  const explainedConcepts = units.reduce((sum, unit) => {
    const evidence = evidenceByUnit.get(unit.id)?.best;
    const conceptCount = Array.isArray(unit.concepts)
      ? unit.concepts.length
      : 0;
    return sum + Math.min(conceptCount, evidence?.explained ?? 0);
  }, 0);
  const conceptCoverage = totalConcepts
    ? Math.round((explainedConcepts / totalConcepts) * 1000) / 10
    : null;

  const gateFailures = validateBookEligibility(state, bookSlug, {
    requireApproved: true,
  }).failures;
  const chapterStatus = chapters.reduce((counts, { entry }) => {
    counts[entry.status] = (counts[entry.status] ?? 0) + 1;
    return counts;
  }, {});
  const chapterFailures = new Map();
  for (const { id, entry } of chapters) {
    const failures = chapterQualityFailures(entry);
    if (state.contentHashes.get(id) !== entry?.contentHash)
      failures.push(
        `contentHash-stale=${entry?.contentHash ?? "missing"} actual=${state.contentHashes.get(id) ?? "missing"}`,
      );
    if (failures.length) chapterFailures.set(id, failures);
  }
  const chapterGateFailures = chapterFailures.size;
  const gateOtherFailures = gateFailures.filter(
    (failure) =>
      !failure.includes("official-unit-unmapped=") &&
      !failure.startsWith(`${bookSlug}: official-concept-coverage=`) &&
      !failure.startsWith(`${bookSlug}/`),
  );

  allBookData.push({
    bookSlug,
    chapters,
    manifest,
    units,
    unitsById,
    evidenceByUnit,
    unmappedUnits,
    incompleteUnits,
    extraEvidenceIds,
    conceptCoverage,
    chapterStatus,
    chapterFailures,
    chapterGateFailures,
    gateFailures,
    gateOtherFailures,
    tocChapterCount: toc[bookSlug]?.originalChapters ?? null,
  });
}

const totals = allBookData.reduce(
  (sum, book) => {
    sum.books += 1;
    sum.chapters += book.chapters.length;
    sum.manifestUnits += book.units.length;
    sum.unmappedUnits += book.unmappedUnits.length;
    sum.incompleteUnits += book.incompleteUnits.length;
    for (const [status, count] of Object.entries(book.chapterStatus))
      sum.status[status] = (sum.status[status] ?? 0) + count;
    return sum;
  },
  {
    books: 0,
    chapters: 0,
    manifestUnits: 0,
    unmappedUnits: 0,
    incompleteUnits: 0,
    status: {},
  },
);

const lines = [
  "# 全库章节规范符合性待办清单（完整库存）",
  "",
  `> 生成时间：${new Date().toISOString()}`,
  "> 生成命令：`node scripts/generate-chapter-compliance-todolist.mjs`",
  "> 章节库存：`content/` 全部 MDX ↔ `quality/publication-ledger.json`",
  "> 门禁库存：`quality/fidelity-manifests.json` 全部正式 unit；未映射 unit 单独列为门禁阻断任务",
  "",
  "## 总览",
  "",
  "| 项目 | 数量 |",
  "|---|---:|",
  `| 书籍 | ${totals.books} |`,
  `| 实际 MDX 章节/页面 | ${totals.chapters} |`,
  `| manifest 正式 unit | ${totals.manifestUnits} |`,
  `| manifest 未映射 unit | ${totals.unmappedUnits} |`,
  `| manifest 证据不完整 unit | ${totals.incompleteUnits} |`,
  `| failed | ${totals.status.failed ?? 0} |`,
  `| queued | ${totals.status.queued ?? 0} |`,
  `| passed | ${totals.status.passed ?? 0} |`,
  `| published | ${totals.status.published ?? 0} |`,
  "",
  "状态说明：`[ ]` 表示仍有章节质量问题、正式 unit 门禁缺口或证据不完整；`[x]` 仅表示该内容页面自身已通过章节审计。书级 manifest 阻断仍以每本书标题下的门禁摘要为准。",
  "",
];

for (const book of allBookData) {
  const { bookSlug } = book;
  const statusSummary = ["failed", "queued", "passed", "published"]
    .filter((status) => book.chapterStatus[status])
    .map((status) => `${status}:${book.chapterStatus[status]}`)
    .join(" ");
  const gateSummary = book.gateFailures.length
    ? `🚫 门禁阻断 ${book.gateFailures.length} 项`
    : "✅ 书级门禁条件满足";
  const tocSummary =
    book.tocChapterCount !== null || book.units.length
      ? `目录=${book.tocChapterCount ?? "未登记"}，manifest=${book.units.length}`
      : "目录证据=未登记";
  const coverageSummary =
    book.conceptCoverage === null
      ? "正式 unit 覆盖率=无"
      : `正式概念覆盖率=${book.conceptCoverage}%`;

  lines.push(
    `## ${bookSlug}（${book.chapters.length} 个内容页面 · ${statusSummary || "无内容"} · ${gateSummary}）`,
    "",
    `- 门禁摘要：${tocSummary}；${coverageSummary}；未映射 unit=${book.unmappedUnits.length}；证据不完整 unit=${book.incompleteUnits.length}。`,
  );
  if (book.extraEvidenceIds.length)
    lines.push(
      `- 口径异常：ledger 中有 ${book.extraEvidenceIds.length} 个 unit evidence 不在当前 manifest：${formatList(book.extraEvidenceIds.slice(0, 20))}${book.extraEvidenceIds.length > 20 ? "……" : ""}。`,
    );
  if (book.gateOtherFailures.length)
    lines.push(
      `- 其他门禁阻断：${formatList(book.gateOtherFailures.slice(0, 12))}${book.gateOtherFailures.length > 12 ? "……" : ""}。`,
    );
  lines.push("");

  for (const { id, entry } of book.chapters) {
    const status = entry.status ?? "failed";
    const chapterFailures = book.chapterFailures.get(id) ?? [];
    const checked =
      ["passed", "published"].includes(status) && chapterFailures.length === 0
        ? "x"
        : " ";
    const priority = chapterFailures.length ? "P1" : statusPriority[status];
    const prefix = priority
      ? `${statusIcon[status] ?? "❌"} ${priority} `
      : `${statusIcon[status] ?? "❌"} `;
    const details = [
      `${statusLabel[status] ?? status}`,
      `score ${entry.score ?? "?"}`,
    ];
    if (chapterFailures.length)
      details.push(`门禁阻断: ${formatList(chapterFailures)}`);
    if (entry.hardBlockers?.length)
      details.push(`hardBlockers: ${formatList(entry.hardBlockers)}`);
    if (entry.dimensionFailures?.length)
      details.push(`维度缺口: ${formatList(entry.dimensionFailures)}`);
    if (entry.officialUnitId && !book.unitsById.has(entry.officialUnitId))
      details.push(
        `officialUnitId 未在 manifest 登记: ${entry.officialUnitId}`,
      );
    lines.push(
      `- [${checked}] ${prefix}**${clean(id.slice(bookSlug.length + 1))}** — ${details.join("；")}`,
      `    - 路径：\`${clean(entry.path)}\``,
    );
    const unitEvidence = entry.unitEvidence ?? [];
    if (unitEvidence.length) {
      lines.push(
        `    - 正式 unit：${unitEvidence
          .map(
            (evidence) =>
              `\`${clean(evidence.id)}\` explained=${evidence.explained ?? 0}/${evidence.total ?? 0}`,
          )
          .join("、")}`,
      );
    } else if (book.units.length) {
      lines.push("    - 正式 unit：未映射（该页面没有 unitEvidence）");
    }
  }

  for (const unit of book.unmappedUnits) {
    const concepts = Array.isArray(unit.concepts) ? unit.concepts.length : 0;
    lines.push(
      `- [ ] 🔴 P0 **[正式 unit ${clean(unit.id)}] ${clean(unit.title)}** — manifest unit 未映射；当前没有可用于发布门禁的章节证据；concepts=${concepts}`,
      `    - 路径：待创建或映射（officialUnitId: \`${clean(unit.id)}\`）`,
    );
  }

  for (const unit of book.incompleteUnits) {
    const evidence = book.evidenceByUnit.get(unit.id);
    const best = evidence?.best ?? {};
    const conceptCount = Array.isArray(unit.concepts)
      ? unit.concepts.length
      : 0;
    const paths = (evidence?.chapterIds ?? [])
      .map((id) => ledger[id]?.path)
      .filter(Boolean);
    lines.push(
      `- [ ] 🔴 P1 **[正式 unit ${clean(unit.id)}] ${clean(unit.title)}** — evidence 不完整；explained=${best.explained ?? 0}/${conceptCount}`,
      `    - 关联路径：${paths.length ? paths.map((value) => `\`${clean(value)}\``).join("、") : "待映射"}`,
    );
  }

  lines.push("");
}

lines.push(
  "---",
  "",
  "> 维护规则：任何新增/删除 MDX、manifest unit、officialUnitId 或发布状态变化后，都必须重新运行生成命令。此文件是完整库存视图；若只想看待修章节，应按 `[ ]`、`P0/P1/P2` 筛选，不得再把缺少内容的章节排除在库存之外。",
  "",
);

fs.writeFileSync(TODO_PATH, `${lines.join("\n").replace(/\n+$/, "")}\n`);
console.log(
  JSON.stringify(
    {
      output: path.relative(ROOT, TODO_PATH),
      books: totals.books,
      chapters: totals.chapters,
      manifestUnits: totals.manifestUnits,
      unmappedUnits: totals.unmappedUnits,
      incompleteUnits: totals.incompleteUnits,
      status: totals.status,
    },
    null,
    2,
  ),
);
