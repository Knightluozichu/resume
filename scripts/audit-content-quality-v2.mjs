#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { createProcessor } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const LEDGER_PATH = path.join(ROOT, "quality/remediation-ledger.json");
const VISUAL_RESULTS_PATH = path.join(ROOT, "quality/visual-results.json");
const REPORT_DIR = path.join(ROOT, "quality/v2/reports");
const SCORE_THRESHOLD = 90;
const DIMENSION_FLOORS = {
  source: 12,
  knowledge: 16,
  pedagogy: 12,
  visual: 16,
  practice: 8,
  ux: 8,
  engineering: 8,
};
const DIMENSION_MAXES = {
  source: 15,
  knowledge: 20,
  pedagogy: 15,
  visual: 20,
  practice: 10,
  ux: 10,
  engineering: 10,
};
const GENERIC_PATTERNS = [
  ["content-missing", /content_missing|目录驱动工程框架|材料尚未进入项目/i],
  [
    "official-course-template",
    /OFFICIAL_COURSE_ENHANCEMENT|为什么只记结论不足以掌握/,
  ],
  [
    "generic-quality-prose",
    /冻结输入、上下文、版本和成功标准|第一条证据分叉|单故障样本/,
  ],
  ["placeholder-copy", /\b(?:TODO|TBD)\b|待补充|占位内容|lorem ipsum/i],
];
const VISUAL_NAME =
  /(Diagram|Viz|Figure|Demo|Chart|Scene|Canvas|Slider|Timeline|Anatomy|Flow|Lab|Map)$/;
const INTERACTIVE_NAME = /(Stepper|Slider|Demo|Scene|Canvas|Lab)$/;
const processor = createProcessor({
  format: "mdx",
  remarkPlugins: [remarkMath, remarkGfm],
});

function parseArgs(argv) {
  const args = {
    book: null,
    changed: false,
    changedFrom: "origin/main",
    check: false,
    updateLedger: false,
    selfTest: false,
    failUnder: SCORE_THRESHOLD,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") args.book = argv[++index] ?? null;
    else if (argument === "--changed") args.changed = true;
    else if (argument === "--changed-from")
      args.changedFrom = argv[++index] ?? args.changedFrom;
    else if (argument === "--check") args.check = true;
    else if (argument === "--update-ledger") args.updateLedger = true;
    else if (argument === "--self-test") args.selfTest = true;
    else if (argument === "--fail-under")
      args.failUnder = Number(argv[++index] ?? SCORE_THRESHOLD);
    else if (argument === "--help" || argument === "-h") {
      console.log(
        "用法: pnpm quality:audit -- [--book slug] [--changed] [--check] [--update-ledger] [--self-test] [--fail-under 90]",
      );
      process.exit(0);
    } else throw new Error(`未知参数: ${argument}`);
  }
  return args;
}

function regressionBlockers(source) {
  const blockers = GENERIC_PATTERNS.filter(([, pattern]) =>
    pattern.test(source),
  ).map(([code]) => code);
  if (countMatches(source, /<Objectives\b/g) !== 1)
    blockers.push("objectives-block-count");
  if (countMatches(source, /<Attribution\b/g) !== 1)
    blockers.push("attribution-block-count");
  if (/<OfficialCourseLab\b/.test(source))
    blockers.push("generic-official-course-lab");
  return blockers;
}

function runRegressionSelfTest() {
  // 取自《汽车为什么会跑》v1 已确认的污染指纹；这类内容必须硬失败，
  // 不能再被正文长度、组件数量或标题替换掩盖。
  const legacyCarChapter = `
<Objectives><li>认识汽车</li></Objectives>
<Objectives><li>完成课程</li></Objectives>
content_missing
OFFICIAL_COURSE_ENHANCEMENT
<OfficialCourseLab />
<Attribution />
<Attribution />
`;
  assert.deepEqual(regressionBlockers(legacyCarChapter).sort(), [
    "attribution-block-count",
    "content-missing",
    "generic-official-course-lab",
    "objectives-block-count",
    "official-course-template",
  ]);

  const remediatedCarChapter = `
<Objectives><li>解释发动机四冲程</li><li>诊断点火异常</li></Objectives>
## 四冲程的因果链
进气、压缩、做功和排气共同把燃料的化学能转换为曲轴机械能。
<EnginePrinciplesLab />
<Exercises><Answer>先核对压缩压力，再检查点火与喷油。</Answer></Exercises>
<Attribution />
`;
  assert.deepEqual(regressionBlockers(remediatedCarChapter), []);

  const validKotlinIdentifier = `
<Objectives><li>解析数值</li></Objectives>
val value = raw.toDoubleOrNull()
<Attribution />
`;
  assert.equal(
    regressionBlockers(validKotlinIdentifier).includes("placeholder-copy"),
    false,
  );
  assert.equal(
    regressionBlockers(
      validKotlinIdentifier.replace("val value", "TODO val value"),
    ).includes("placeholder-copy"),
    true,
  );

  const repeated =
    "同一段模板话术如果跨三章反复出现，就必须作为跨章复制阻断，而不能用字数平均掉。";
  const owners = duplicateSentenceOwners([
    { id: "auto/a/one", sentenceFingerprints: [repeated] },
    { id: "auto/b/two", sentenceFingerprints: [repeated] },
    { id: "auto/c/three", sentenceFingerprints: [repeated] },
  ]);
  assert.equal(owners.get(normalized(repeated))?.size, 3);
  const withinChapterTemplate = Array.from(
    { length: 10 },
    (_, index) =>
      `围绕“节点${index + 1}”固定同一套输入，只替换标题而不解释具体机制；这种段落即使很长，也不能被字数或目录覆盖率掩盖，还会让不同知识点得到完全相同的实验因果与验收结论。`,
  );
  assert.equal(maxWithinChapterTemplateCopies(withinChapterTemplate), 10);
  console.log(
    JSON.stringify({
      version: 2,
      regression: "passed",
      cases: [
        "legacy-car-template-hard-fails",
        "remediated-car-template-clean",
        "cross-chapter-copy-detected",
        "within-chapter-template-copy-detected",
        "placeholder-boundary-detected-without-kotlin-false-positive",
      ],
    }),
  );
}

function walkMdx(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function normalized(value) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .replace(/[\s`*_~“”‘’"'：:，,。.!！?？、（）()\[\]{}<>/\\|—–-]+/g, "")
    .trim();
}

function conceptNeedles(value) {
  const raw = String(value ?? "");
  return [
    ...new Set([
      normalized(raw),
      normalized(raw.replace(/^\d+(?:\.\d+)*\s*/, "")),
    ]),
  ].filter(Boolean);
}

function hasExplainedSection(source, value) {
  const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const section = source.match(
    new RegExp(`^#{2,5}\\s+${escaped}\\s*$([\\s\\S]*?)(?=^#{2,5}\\s|\\z)`, "m"),
  );
  if (!section) return false;
  const prose = section[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>|#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return prose.length >= 45;
}

function nodeText(node) {
  if (!node || typeof node !== "object") return "";
  if (typeof node.value === "string") return node.value;
  if (!Array.isArray(node.children)) return "";
  return node.children.map(nodeText).join("");
}

function extractBlock(source, name) {
  const match = source.match(
    new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"),
  );
  return match?.[1] ?? "";
}

function removeOutlineListing(source) {
  return source.replace(
    /^##\s*(?:权威目录|原书目录|核心单元|核心概念逐项对照)[^\n]*\n[\s\S]*?(?=^##\s|\z)/gim,
    "",
  );
}

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function scoreByThreshold(value, thresholds) {
  let score = 0;
  for (const [minimum, points] of thresholds)
    if (value >= minimum) score = points;
  return score;
}

function sourceAccessFor(manifest) {
  if (manifest?.sourceAccess) return manifest.sourceAccess;
  const kind = String(manifest?.sourceKind ?? "").toLocaleLowerCase();
  if (
    /full-text|full-online|open-book|open-access-pdf|downloadable-full-pdf|complete-web-book/.test(
      kind,
    )
  )
    return "full-text-primary";
  if (/sample|preview/.test(kind)) return "authorized-sample";
  if (kind) return "outline-only";
  return "secondary-only";
}

function sourceDomainsFor(manifest) {
  const factSources = Array.isArray(manifest?.factSources)
    ? manifest.factSources
    : Object.values(manifest?.factSources ?? {});
  const urls = [
    manifest?.sourceUrl,
    ...(manifest?.secondarySourceUrls ?? []),
    ...factSources.map((source) => source.url),
  ].filter(Boolean);
  return new Set(
    urls.flatMap((value) => {
      try {
        const hostname = new URL(value).hostname.replace(/^www\./, "");
        return hostname ? [hostname] : [];
      } catch {
        return [];
      }
    }),
  );
}

function resolveImportedModule(modulePath, importer = null) {
  let base = null;
  if (modulePath.startsWith("@/"))
    base = path.join(ROOT, "src", modulePath.slice(2));
  else if (importer && modulePath.startsWith("."))
    base = path.resolve(path.dirname(importer), modulePath);
  if (!base) return null;
  for (const candidate of [
    `${base}.tsx`,
    `${base}.ts`,
    path.join(base, "index.tsx"),
  ]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

const moduleCorpusCache = new Map();

function moduleCorpus(modulePath, seen = new Set()) {
  if (moduleCorpusCache.has(modulePath))
    return moduleCorpusCache.get(modulePath);
  if (seen.has(modulePath)) return "";
  seen.add(modulePath);
  const source = fs.readFileSync(modulePath, "utf8");
  // 只追踪薄包装层的 re-export。若递归普通 import，公共 MDX 入口会把整个
  // 组件注册表（数千个懒加载模块）拼进每一章，既污染专属性证据也拖慢审计。
  const isAutoChapterWrapper = modulePath.includes(
    `${path.sep}auto-why-car-runs${path.sep}labs${path.sep}`,
  );
  const dependencyPattern = isAutoChapterWrapper
    ? /(?:export\s+(?:\{[^}]+\}|\*)\s+from|import[\s\S]*?from)\s+["']([^"']+)["']/g
    : /export\s+(?:\{[^}]+\}|\*)\s+from\s+["']([^"']+)["']/g;
  const dependencies = [...source.matchAll(dependencyPattern)]
    .map((match) => resolveImportedModule(match[1], modulePath))
    .filter(
      (candidate) =>
        candidate &&
        candidate.startsWith(path.join(ROOT, "src/components/mdx")),
    );
  const corpus = [
    source,
    ...dependencies.map((dependency) => moduleCorpus(dependency, seen)),
  ].join("\n");
  moduleCorpusCache.set(modulePath, corpus);
  return corpus;
}

function sourceParagraphs(tree) {
  const paragraphs = [];
  visit(tree, "paragraph", (node) => {
    const text = nodeText(node).replace(/\s+/g, " ").trim();
    if (text) paragraphs.push(text);
  });
  return paragraphs;
}

function sentenceFingerprint(paragraphs) {
  const sentences = paragraphs
    .flatMap((paragraph) => paragraph.split(/(?<=[。！？.!?])\s*/u))
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .filter((sentence) => sentence.length >= 70 && sentence.length <= 500);
  return [...new Set(sentences)];
}

function maxWithinChapterTemplateCopies(paragraphs) {
  const counts = new Map();
  for (const paragraph of paragraphs) {
    if (paragraph.length < 70) continue;
    const fingerprint = normalized(
      paragraph.replace(/“[^”]+”/g, "“主题”").replace(/\d+(?:\.\d+)*/g, "#"),
    );
    if (fingerprint.length < 45) continue;
    counts.set(fingerprint, (counts.get(fingerprint) ?? 0) + 1);
  }
  return counts.size ? Math.max(...counts.values()) : 0;
}

function parseChapter(filePath, manifests, visualResults) {
  const relativePath = path.relative(ROOT, filePath).replaceAll(path.sep, "/");
  const [, bookSlug, sectionSlug, fileName] = relativePath.split("/");
  const chapterSlug = fileName.replace(/\.mdx$/, "");
  const id = `${bookSlug}/${sectionSlug}/${chapterSlug}`;
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const source = parsed.content;
  const sourceWithoutOutline = removeOutlineListing(source);
  let tree = null;
  let parseError = null;
  try {
    tree = processor.parse(source);
  } catch (error) {
    parseError = error instanceof Error ? error.message : String(error);
  }

  const jsxNames = [];
  const headings = [];
  const paragraphs = tree ? sourceParagraphs(tree) : [];
  if (tree) {
    visit(tree, (node) => {
      if (
        (node.type === "mdxJsxFlowElement" ||
          node.type === "mdxJsxTextElement") &&
        node.name
      )
        jsxNames.push(node.name);
      if (node.type === "heading")
        headings.push({ depth: node.depth, text: nodeText(node).trim() });
    });
  }

  const imports = [...source.matchAll(/from\s+["'](@\/[^"']+)["']/g)].map(
    (match) => match[1],
  );
  const importedSources = imports
    .map(resolveImportedModule)
    .filter(Boolean)
    .map((modulePath) => ({ modulePath, source: moduleCorpus(modulePath) }));
  const importedCorpus = importedSources.map((item) => item.source).join("\n");
  const genericWrapper =
    /OfficialCourseLab|OfficialPoeaa24Lab|OfficialDeZeroLab|OfficialCrv18Lab/.test(
      importedCorpus,
    );
  const visualComponents = jsxNames.filter((name) => VISUAL_NAME.test(name));
  const interactiveComponents = jsxNames.filter((name) =>
    INTERACTIVE_NAME.test(name),
  );
  const uniqueVisuals = [...new Set(visualComponents)];
  const objectivesBlock = extractBlock(source, "Objectives");
  const exercisesBlock = extractBlock(source, "Exercises");
  const objectiveItems = (objectivesBlock.match(/^\s*[-*]\s+.+$/gm) ?? [])
    .length;
  const exerciseItems = Math.max(
    countMatches(exercisesBlock, /\*\*问题\s*\d+/g),
    countMatches(exercisesBlock, /^\s*\d+[.)、]\s+/gm),
  );
  const answers = countMatches(exercisesBlock, /<Answer\b/g);
  const objectiveBlocks = countMatches(source, /<Objectives\b/g);
  const attributionBlocks = countMatches(source, /<Attribution\b/g);
  const terms = [...source.matchAll(/<Term\b[^>]*>([\s\S]*?)<\/Term>/g)].map(
    (match) => normalized(match[1].replace(/<[^>]+>/g, "")),
  );
  const glossary = [
    ...source.matchAll(/<GlossaryItem\b[^>]*\bterm=["']([^"']+)["']/g),
  ].map((match) => normalized(match[1]));
  const glossaryMatches = terms.filter((term) =>
    glossary.includes(term),
  ).length;
  const traps =
    countMatches(source, /<Callout\b[^>]*type=["']trap["']/g) +
    headings.filter((heading) => /误区|易错|坑/.test(heading.text)).length;
  const steps = countMatches(source, /<Step\b/g);
  const stepVisuals = [
    ...source.matchAll(/<Step\b[^>]*>([\s\S]*?)<\/Step>/g),
  ].filter((match) =>
    [...match[1].matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].some((component) =>
      VISUAL_NAME.test(component[1]),
    ),
  ).length;
  const hasSummary = headings.some((heading) =>
    /小结|总结|回顾|复习/.test(heading.text),
  );
  const hasIntuition = headings.some((heading) =>
    /为什么|直觉|问题|从.+开始|章节理解报告/.test(heading.text),
  );
  const hasPrediction = /猜一猜|先预测|动手试|试一试|观察.*变化/.test(source);
  const hasAttribution = attributionBlocks > 0;
  const hasSourceUrl =
    typeof parsed.data.sourceUrl === "string" &&
    parsed.data.sourceUrl.trim() !== "";
  const qualityVersion = parsed.data.qualityVersion ?? 1;
  const practiceMode = parsed.data.practiceMode ?? null;
  const sourceMode = parsed.data.sourceMode ?? null;
  const manifest = manifests[bookSlug] ?? null;
  const sourceDomains = sourceDomainsFor(manifest);
  const factSourceLinks = [
    ...source.matchAll(/https?:\/\/[^\s)"'<>]+/g),
  ].filter((match) => {
    try {
      const hostname = new URL(match[0]).hostname.replace(/^www\./, "");
      return [...sourceDomains].some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
      );
    } catch {
      return false;
    }
  }).length;
  const sourceAccess = sourceAccessFor(manifest);
  const role = /learning-map/.test(chapterSlug)
    ? "learning-map"
    : /final-review/.test(chapterSlug)
      ? "final-review"
      : /compound-patterns/.test(chapterSlug)
        ? "synthesis"
        : "chapter";
  const normalizedSource = normalized(sourceWithoutOutline);
  const visualCorpus = normalized(importedCorpus);
  const exerciseCorpus = normalized(exercisesBlock);

  const unitEvidence = [];
  if (role === "chapter") {
    const manifestUnits = manifest?.units ?? [];
    // v2 manifest 的 unit id 与章节 slug 是稳定的一对一键。优先使用它，
    // 避免“表目录”误命中“核对表目录”之类的标题子串。
    const idMatchedUnit = manifestUnits.find((unit) => unit.id === chapterSlug);
    const titleMatchedUnits = idMatchedUnit
      ? [idMatchedUnit]
      : manifestUnits.filter(
          (unit) =>
            normalized(parsed.data.title) === normalized(unit.title) ||
            normalized(parsed.data.title).startsWith(normalized(unit.title)) ||
            normalized(unit.title).startsWith(normalized(parsed.data.title)),
        );
    for (const unit of titleMatchedUnits.length > 0
      ? titleMatchedUnits
      : manifestUnits) {
      const titleMatch = titleMatchedUnits.includes(unit);
      const unitPresent =
        titleMatch ||
        unit.concepts.some((alternatives) =>
          alternatives.some((value) =>
            normalizedSource.includes(normalized(value)),
          ),
        );
      if (!unitPresent) continue;
      const conceptMatches = unit.concepts.map((alternatives, conceptIndex) => {
        const isChapterNode = titleMatch && conceptIndex === 0;
        const alternative =
          (isChapterNode
            ? alternatives[0]
            : alternatives.find((value) =>
                conceptNeedles(value).some((needle) =>
                  normalizedSource.includes(needle),
                ),
              )) ?? null;
        const explained =
          isChapterNode ||
          alternatives.some((value) => {
            const needles = conceptNeedles(value);
            return (
              hasExplainedSection(source, value) ||
              paragraphs.some(
                (paragraph) =>
                  paragraph.length >= 45 &&
                  needles.some((needle) =>
                    normalized(paragraph).includes(needle),
                  ),
              )
            );
          });
        const visual =
          (isChapterNode && uniqueVisuals.length > 0) ||
          alternatives.some((value) =>
            conceptNeedles(value).some((needle) =>
              visualCorpus.includes(needle),
            ),
          );
        const practice =
          (isChapterNode && exerciseItems >= 2) ||
          alternatives.some((value) =>
            conceptNeedles(value).some((needle) =>
              exerciseCorpus.includes(needle),
            ),
          );
        return {
          alternative,
          explained,
          visual,
          practice,
          level: alternative
            ? 1 + Number(explained) + Number(visual) + Number(practice)
            : 0,
        };
      });
      if (titleMatch || conceptMatches.some((evidence) => evidence.level > 0)) {
        unitEvidence.push({
          id: unit.id,
          title: unit.title,
          concepts: conceptMatches,
        });
      }
    }
  }
  const conceptEvidence = unitEvidence.flatMap((unit) => unit.concepts);
  const explainedRatio = conceptEvidence.length
    ? conceptEvidence.filter((evidence) => evidence.explained).length /
      conceptEvidence.length
    : role === "chapter"
      ? 0
      : 1;
  const visualEvidenceRatio = conceptEvidence.length
    ? conceptEvidence.filter((evidence) => evidence.visual).length /
      conceptEvidence.length
    : role === "chapter"
      ? 0
      : 1;
  const practiceEvidenceRatio = conceptEvidence.length
    ? conceptEvidence.filter((evidence) => evidence.practice).length /
      conceptEvidence.length
    : role === "chapter"
      ? 0
      : 1;
  const visualCandidate = visualResults.chapters?.[id] ?? null;
  const contentHash = crypto
    .createHash("sha256")
    .update(raw)
    .digest("hex")
    .slice(0, 16);
  const visualResult =
    visualCandidate?.contentHash === contentHash ? visualCandidate : null;
  const genericFlags = GENERIC_PATTERNS.filter(([, pattern]) =>
    pattern.test(source),
  ).map(([code]) => code);
  if (genericWrapper) genericFlags.push("generic-official-course-lab");

  return {
    id,
    bookSlug,
    sectionSlug,
    chapterSlug,
    relativePath,
    parseError,
    role,
    title: String(parsed.data.title ?? chapterSlug),
    type: String(parsed.data.type ?? ""),
    qualityVersion,
    practiceMode,
    sourceMode,
    factSourceLinks,
    sourceAccess,
    hasSourceUrl,
    hasAttribution,
    objectiveItems,
    objectiveBlocks,
    exerciseItems,
    answers,
    attributionBlocks,
    terms,
    glossary,
    glossaryMatches,
    traps,
    steps,
    stepVisuals,
    headings,
    sentenceFingerprints: sentenceFingerprint(paragraphs),
    withinChapterTemplateCopies: maxWithinChapterTemplateCopies(paragraphs),
    uniqueVisuals,
    interactiveComponents,
    imports,
    genericFlags,
    genericWrapper,
    hasSummary,
    hasIntuition,
    hasPrediction,
    unitEvidence,
    explainedRatio,
    visualEvidenceRatio,
    practiceEvidenceRatio,
    visualResult,
    proseChars: tree
      ? nodeText(tree).replace(/\s+/g, "").length
      : paragraphs.join("").length,
    contentHash,
  };
}

function duplicateSentenceOwners(chapters) {
  const owners = new Map();
  for (const chapter of chapters) {
    for (const sentence of chapter.sentenceFingerprints) {
      const key = normalized(sentence);
      if (!owners.has(key)) owners.set(key, new Set());
      owners.get(key).add(chapter.id);
    }
  }
  return owners;
}

function scoreChapter(chapter, sentenceOwners) {
  const repeatedSentences = chapter.sentenceFingerprints.filter(
    (sentence) => (sentenceOwners.get(normalized(sentence))?.size ?? 0) >= 3,
  );
  const hardBlockers = [...chapter.genericFlags];
  if (chapter.parseError) hardBlockers.push("mdx-ast-parse-error");
  if (chapter.objectiveBlocks !== 1)
    hardBlockers.push("objectives-block-count");
  if (chapter.attributionBlocks !== 1)
    hardBlockers.push("attribution-block-count");
  if (repeatedSentences.length >= 3)
    hardBlockers.push("cross-chapter-template-copy");
  if (chapter.withinChapterTemplateCopies >= 10)
    hardBlockers.push("within-chapter-template-copy");
  if (chapter.qualityVersion !== 2) hardBlockers.push("quality-v2-unreviewed");
  if (chapter.qualityVersion === 2 && !chapter.practiceMode)
    hardBlockers.push("practice-mode-missing");
  if (chapter.qualityVersion === 2 && !chapter.sourceMode)
    hardBlockers.push("source-mode-missing");
  if (
    chapter.sourceMode === "licensed-adaptation" &&
    chapter.sourceAccess === "outline-only"
  )
    hardBlockers.push("license-or-source-claim-mismatch");
  if (chapter.role === "chapter" && chapter.unitEvidence.length === 0)
    hardBlockers.push("official-unit-unmapped");
  if (chapter.qualityVersion === 2 && !chapter.visualResult)
    hardBlockers.push("visual-evidence-missing");
  if (chapter.visualResult && !chapter.visualResult.pass)
    hardBlockers.push("visual-runtime-failed");

  const source =
    (chapter.sourceAccess === "full-text-primary"
      ? 3
      : chapter.sourceAccess === "authorized-sample" ||
          chapter.sourceAccess === "outline-only"
        ? 2
        : 0) +
    (chapter.sourceMode ? 3 : 0) +
    (chapter.hasAttribution ? 3 : 0) +
    (chapter.hasSourceUrl || chapter.sourceMode === "original" ? 2 : 0) +
    (chapter.factSourceLinks > 0 ? 1 : 0) +
    Math.round((chapter.role === "chapter" ? chapter.explainedRatio : 1) * 4);
  const knowledge =
    chapter.role === "chapter"
      ? scoreByThreshold(chapter.proseChars, [
          [600, 2],
          [1200, 4],
          [2200, 6],
        ]) +
        scoreByThreshold(chapter.headings.length, [
          [3, 1],
          [5, 2],
          [8, 3],
        ]) +
        scoreByThreshold(chapter.terms.length, [
          [2, 1],
          [4, 2],
          [6, 3],
        ]) +
        Math.round(chapter.explainedRatio * 8)
      : Math.min(
          20,
          scoreByThreshold(chapter.proseChars, [
            [300, 4],
            [600, 6],
          ]) +
            scoreByThreshold(chapter.headings.length, [
              [3, 2],
              [5, 3],
            ]) +
            Math.round(chapter.explainedRatio * 8) +
            (chapter.uniqueVisuals.length > 0 ? 3 : 0),
        );
  const pedagogy =
    chapter.role === "chapter"
      ? (chapter.objectiveItems >= 2 && chapter.objectiveItems <= 5 ? 3 : 0) +
        (chapter.hasIntuition ? 2 : 0) +
        Math.min(3, chapter.traps) +
        (chapter.hasSummary ? 2 : 0) +
        (chapter.terms.length > 0
          ? Math.round((chapter.glossaryMatches / chapter.terms.length) * 3)
          : 0) +
        (chapter.objectiveBlocks === 1 && chapter.attributionBlocks === 1
          ? 2
          : 0)
      : (chapter.objectiveItems >= 2 && chapter.objectiveItems <= 5 ? 3 : 0) +
        (chapter.hasIntuition ? 2 : 0) +
        (chapter.headings.length >= 4 ? 3 : 0) +
        (chapter.exerciseItems >= 3 && chapter.answers >= 3 ? 3 : 0) +
        (chapter.hasPrediction ? 2 : 0) +
        (chapter.objectiveBlocks === 1 && chapter.attributionBlocks === 1
          ? 2
          : 0);
  const visual =
    (chapter.imports.some(
      (value) =>
        value.includes(`/${chapter.bookSlug}/`) &&
        value.includes(chapter.chapterSlug),
    )
      ? 6
      : chapter.uniqueVisuals.length > 0
        ? 2
        : 0) +
    scoreByThreshold(chapter.uniqueVisuals.length, [
      [1, 2],
      [2, 3],
      [3, 4],
    ]) +
    (chapter.genericWrapper ? 0 : 4) +
    (chapter.visualResult?.pass ? 2 : 0) +
    (chapter.steps >= 3
      ? Math.min(3, chapter.stepVisuals)
      : chapter.uniqueVisuals.length > 0
        ? 2
        : 0) +
    Math.round(chapter.visualEvidenceRatio * 3);
  const practice =
    scoreByThreshold(chapter.exerciseItems, [
      [1, 2],
      [2, 3],
      [3, 4],
    ]) +
    (chapter.exerciseItems > 0
      ? Math.min(2, Math.round((chapter.answers / chapter.exerciseItems) * 2))
      : 0) +
    (chapter.interactiveComponents.length > 0 ? 2 : 0) +
    (chapter.hasPrediction ? 2 : 0);
  const ux = chapter.visualResult
    ? Math.max(
        0,
        Math.min(
          10,
          chapter.visualResult.score ?? (chapter.visualResult.pass ? 10 : 0),
        ),
      )
    : 0;
  const engineering =
    (chapter.parseError ? 0 : 3) +
    (chapter.objectiveBlocks === 1 && chapter.attributionBlocks === 1 ? 2 : 0) +
    (chapter.hasAttribution &&
    (chapter.hasSourceUrl || chapter.sourceMode === "original")
      ? 2
      : 0) +
    (chapter.imports.length > 0 || chapter.uniqueVisuals.length > 0 ? 3 : 1);
  const rawDimensions = {
    source,
    knowledge,
    pedagogy,
    visual,
    practice,
    ux,
    engineering,
  };
  const dimensions = Object.fromEntries(
    Object.entries(rawDimensions).map(([key, value]) => [
      key,
      Math.min(DIMENSION_MAXES[key], value),
    ]),
  );
  const score = Object.values(dimensions).reduce(
    (sum, value) => sum + value,
    0,
  );
  const dimensionFailures = Object.entries(DIMENSION_FLOORS)
    .filter(([key, minimum]) => dimensions[key] < minimum)
    .map(([key]) => key);
  const blocking = hardBlockers.filter(
    (code) => code !== "quality-v2-unreviewed",
  );
  const pass =
    score >= SCORE_THRESHOLD &&
    dimensionFailures.length === 0 &&
    hardBlockers.length === 0;
  const status = pass
    ? "passed"
    : chapter.qualityVersion !== 2 && blocking.length === 0
      ? "queued"
      : "failed";
  return {
    ...chapter,
    repeatedSentences,
    hardBlockers: [...new Set(hardBlockers)],
    dimensions,
    dimensionFailures,
    score,
    pass,
    status,
  };
}

function changedFiles(base) {
  try {
    const output = execFileSync(
      "git",
      ["diff", "--name-only", `${base}...HEAD`],
      { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return new Set(
      output
        .split(/\r?\n/)
        .filter(
          (value) => value.startsWith("content/") && value.endsWith(".mdx"),
        ),
    );
  } catch {
    const output = execFileSync("git", ["diff", "--name-only"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return new Set(
      output
        .split(/\r?\n/)
        .filter(
          (value) => value.startsWith("content/") && value.endsWith(".mdx"),
        ),
    );
  }
}

function baselinePassedIds(base) {
  try {
    const raw = execFileSync(
      "git",
      ["show", `${base}:quality/remediation-ledger.json`],
      {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    const ledger = JSON.parse(raw);
    return new Set(
      Object.entries(ledger.chapters ?? {})
        .filter(([, entry]) => ["passed", "published"].includes(entry.status))
        .map(([id]) => id),
    );
  } catch {
    return new Set();
  }
}

function previousLedger() {
  if (!fs.existsSync(LEDGER_PATH)) return { version: 2, chapters: {} };
  return JSON.parse(fs.readFileSync(LEDGER_PATH, "utf8"));
}

function ledgerEntry(chapter, previous, generatedAt) {
  const previousEntry = previous?.chapters?.[chapter.id] ?? null;
  const unchanged =
    previousEntry?.contentHash === chapter.contentHash &&
    JSON.stringify(previousEntry.hardBlockers) ===
      JSON.stringify(chapter.hardBlockers) &&
    JSON.stringify(previousEntry.dimensions) ===
      JSON.stringify(chapter.dimensions);
  const preservePublished =
    previousEntry?.status === "published" && chapter.pass;
  const unitEvidence = chapter.unitEvidence.map((unit) => {
    const total = unit.concepts.length;
    return {
      id: unit.id,
      total,
      occurred: unit.concepts.filter((concept) => concept.level >= 1).length,
      explained: unit.concepts.filter((concept) => concept.explained).length,
      visualized: unit.concepts.filter((concept) => concept.visual).length,
      practiced: unit.concepts.filter((concept) => concept.practice).length,
    };
  });
  return {
    bookSlug: chapter.bookSlug,
    sectionSlug: chapter.sectionSlug,
    chapterSlug: chapter.chapterSlug,
    title: chapter.title,
    path: chapter.relativePath,
    role: chapter.role,
    status: preservePublished ? "published" : chapter.status,
    score: chapter.score,
    dimensions: chapter.dimensions,
    dimensionFailures: chapter.dimensionFailures,
    hardBlockers: chapter.hardBlockers,
    sourceAccess: chapter.sourceAccess,
    sourceMode: chapter.sourceMode,
    practiceMode: chapter.practiceMode,
    qualityVersion: chapter.qualityVersion,
    unitEvidence,
    metrics: {
      objectiveItems: chapter.objectiveItems,
      exerciseItems: chapter.exerciseItems,
      answers: chapter.answers,
      traps: chapter.traps,
      headings: chapter.headings.length,
      terms: chapter.terms.length,
      glossaryMatches: chapter.glossaryMatches,
      uniqueVisuals: chapter.uniqueVisuals.length,
      interactiveComponents: chapter.interactiveComponents.length,
      explainedRatio: chapter.explainedRatio,
      visualEvidenceRatio: chapter.visualEvidenceRatio,
      practiceEvidenceRatio: chapter.practiceEvidenceRatio,
    },
    repeatedSentenceCount: chapter.repeatedSentences.length,
    visualEvidence: chapter.visualResult?.evidence ?? [],
    contentHash: chapter.contentHash,
    auditedAt: unchanged ? previousEntry.auditedAt : generatedAt,
    passedAt: chapter.pass ? (previousEntry?.passedAt ?? generatedAt) : null,
    publishedAt: preservePublished ? previousEntry.publishedAt : null,
    publishedRelease: preservePublished ? previousEntry.publishedRelease : null,
  };
}

function writeOutputs(chapters, generatedAt) {
  const previous = previousLedger();
  const entries = Object.fromEntries(
    chapters.map((chapter) => [
      chapter.id,
      ledgerEntry(chapter, previous, generatedAt),
    ]),
  );
  const ledger = {
    version: 2,
    generatedAt,
    totalChapters: chapters.length,
    chapters: entries,
  };
  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.writeFileSync(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const publicChapters = chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    status: entries[chapter.id].status,
    score: chapter.score,
    dimensions: chapter.dimensions,
    hardBlockers: chapter.hardBlockers,
    dimensionFailures: chapter.dimensionFailures,
  }));
  fs.writeFileSync(
    path.join(REPORT_DIR, "content-quality.json"),
    `${JSON.stringify({ version: 2, generatedAt, chapters: publicChapters }, null, 2)}\n`,
  );

  const byBook = new Map();
  for (const chapter of publicChapters) {
    const book = chapter.id.split("/")[0];
    if (!byBook.has(book)) byBook.set(book, []);
    byBook.get(book).push(chapter);
  }
  const books = [...byBook.entries()]
    .map(([bookSlug, items]) => ({
      bookSlug,
      chapters: items.length,
      failed: items.filter((item) => item.status === "failed").length,
      queued: items.filter((item) => item.status === "queued").length,
      passed: items.filter((item) => item.status === "passed").length,
      blockerCount: items.reduce(
        (sum, item) => sum + item.hardBlockers.length,
        0,
      ),
    }))
    .sort(
      (a, b) =>
        b.failed - a.failed ||
        b.blockerCount - a.blockerCount ||
        a.bookSlug.localeCompare(b.bookSlug),
    );
  const totals = {
    books: books.length,
    chapters: chapters.length,
    failed: publicChapters.filter((item) => item.status === "failed").length,
    queued: publicChapters.filter((item) => item.status === "queued").length,
    passed: publicChapters.filter((item) => item.status === "passed").length,
    published: Object.values(entries).filter(
      (item) => item.status === "published",
    ).length,
  };
  const lines = [
    "# 全书库质量 v2 基线",
    "",
    `> ${generatedAt}；旧版分数不迁移。`,
    "",
    `- 书籍：${totals.books}`,
    `- 章节：${totals.chapters}`,
    `- failed：${totals.failed}`,
    `- queued：${totals.queued}`,
    `- passed：${totals.passed}`,
    `- published：${totals.published}`,
    "",
    "| 优先级 | 书籍 | 章节 | failed | queued | passed | 阻断项 |",
    "|---:|---|---:|---:|---:|---:|---:|",
    ...books.map(
      (book, index) =>
        `| ${index + 1} | ${book.bookSlug} | ${book.chapters} | ${book.failed} | ${book.queued} | ${book.passed} | ${book.blockerCount} |`,
    ),
    "",
  ];
  fs.writeFileSync(path.join(REPORT_DIR, "summary.md"), lines.join("\n"));
  return { totals, books };
}

const args = parseArgs(process.argv.slice(2));
if (args.selfTest) {
  runRegressionSelfTest();
  process.exit(0);
}
const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifests = manifestDocument.books ?? {};
const visualResults = fs.existsSync(VISUAL_RESULTS_PATH)
  ? JSON.parse(fs.readFileSync(VISUAL_RESULTS_PATH, "utf8"))
  : { version: 1, chapters: {} };
const files = walkMdx(CONTENT_DIR);
const parsedChapters = files.map((filePath) =>
  parseChapter(filePath, manifests, visualResults),
);
const sentenceOwners = duplicateSentenceOwners(parsedChapters);
const chapters = parsedChapters.map((chapter) =>
  scoreChapter(chapter, sentenceOwners),
);
const selectedPaths = args.changed ? changedFiles(args.changedFrom) : null;
const ratchetedIds = args.changed
  ? baselinePassedIds(args.changedFrom)
  : new Set();
const selected = chapters.filter(
  (chapter) =>
    (!args.book || chapter.bookSlug === args.book) &&
    (!selectedPaths ||
      selectedPaths.has(chapter.relativePath) ||
      ratchetedIds.has(chapter.id)),
);
const generatedAt = new Date().toISOString();
let summary = null;
if (!args.check || args.updateLedger)
  summary = writeOutputs(chapters, generatedAt);
else
  summary = {
    totals: {
      chapters: chapters.length,
      failed: chapters.filter((chapter) => chapter.status === "failed").length,
      queued: chapters.filter((chapter) => chapter.status === "queued").length,
      passed: chapters.filter((chapter) => chapter.status === "passed").length,
    },
  };

const selectedFailures = selected.filter(
  (chapter) => !chapter.pass || chapter.score < args.failUnder,
);
console.log(
  JSON.stringify(
    {
      version: 2,
      inventory: summary.totals,
      selected: selected.length,
      selectedFailures: selectedFailures.length,
      failures: selectedFailures.slice(0, 50).map((chapter) => ({
        id: chapter.id,
        score: chapter.score,
        hardBlockers: chapter.hardBlockers,
        dimensions: chapter.dimensionFailures,
      })),
    },
    null,
    2,
  ),
);
if (selectedFailures.length > 0 && (args.check || args.book || args.changed))
  process.exitCode = 1;
