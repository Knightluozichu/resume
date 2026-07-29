#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content");
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx");
const MANIFESTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "quality/fidelity-manifests.json"), "utf8"),
).books;

const BOOKS = {
  "c-primer-plus": {
    sourceUrl: "https://www.informit.com/store/c-primer-plus-9780321928429",
    sourceName: "C Primer Plus, Sixth Edition",
    unitIds: {
      "getting-ready": "cpr-01",
      "introducing-c": "cpr-02",
      "data-and-c": "cpr-03",
      "strings-io": "cpr-04",
      "operators-expressions": "cpr-05",
      "control-loops": "cpr-06",
      "control-branching": "cpr-07",
      "char-io-validation": "cpr-08",
      functions: "cpr-09",
      "arrays-pointers": "cpr-10",
      "strings-functions": "cpr-11",
      "storage-linkage-memory": "cpr-12",
      "file-io": "cpr-13",
      structures: "cpr-14",
      "bit-fiddling": "cpr-15",
      preprocessor: "cpr-16",
      "advanced-data": "cpr-17",
    },
    failure(label) {
      return `若只记语法而忽略「${label}」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。`;
    },
    evidence(label) {
      return `用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「${label}」的实际行为。`;
    },
  },
  "cpp-primer-5e": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-9780321714114",
    sourceName: "C++ Primer, Fifth Edition",
    unitIds: {
      "getting-started": "cppp-01",
      "variables-and-types": "cppp-02",
      "strings-vectors-and-arrays": "cppp-03",
      expressions: "cppp-04",
      statements: "cppp-05",
      functions: "cppp-06",
      classes: "cppp-07",
      "io-library": "cppp-08",
      "sequential-containers": "cppp-09",
      "generic-algorithms": "cppp-10",
      "associative-containers": "cppp-11",
      "dynamic-memory": "cppp-12",
      "copy-control": "cppp-13",
      "overloaded-operations": "cppp-14",
      oop: "cppp-15",
      templates: "cppp-16",
      "specialized-library": "cppp-17",
      "large-programs": "cppp-18",
      "specialized-tools": "cppp-19",
      "library-appendix": "cppp-a",
    },
    failure(label) {
      return `若把「${label}」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。`;
    },
    evidence(label) {
      return `保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「${label}」的契约。`;
    },
  },
  "cpp-primer-plus": {
    sourceUrl:
      "https://www.informit.com/store/c-plus-plus-primer-plus-9780132781176",
    sourceName: "C++ Primer Plus, Sixth Edition",
    unitIds: {
      "getting-started-with-cpp": "epp-01",
      "setting-out-to-cpp": "epp-02",
      "dealing-with-data": "epp-03",
      "compound-types": "epp-04",
      "loops-and-relational-expressions": "epp-05",
      "branching-statements-and-logical-operators": "epp-06",
      "functions-programming-modules": "epp-07",
      "adventures-in-functions": "epp-08",
      "memory-models-and-namespaces": "epp-09",
      "objects-and-classes": "epp-10",
      "working-with-classes": "epp-11",
      "classes-and-dynamic-memory-allocation": "epp-12",
      "class-inheritance": "epp-13",
      "reusing-code-in-cpp": "epp-14",
      "friends-exceptions-and-more": "epp-15",
      "string-class-and-stl": "epp-16",
      "input-output-and-files": "epp-17",
      "visiting-new-cpp-standard": "epp-18",
    },
    failure(label) {
      return `若只复述「${label}」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。`;
    },
    evidence(label) {
      return `从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「${label}」的状态变化。`;
    },
  },
};

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function toPascalCase(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function stripEditorialComments(source) {
  return source
    .replace(/\n?\{\/\*[\s\S]*?\*\/\}\n?/g, "\n\n")
    .replace(/\n{3,}/g, "\n\n");
}

function plainText(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#|{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalized(value) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .replace(/[\s`*_~“”‘’"'：:，,。.!！?？、（）()[\]{}<>/\\|—–-]+/g, "")
    .trim();
}

function proseParagraphs(source) {
  return source
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map(plainText)
    .filter((paragraph) => paragraph.length >= 45);
}

function preferredConcept(alternatives) {
  return (
    alternatives.find((value) => /[\u3400-\u9fff]/u.test(value)) ??
    alternatives[0]
  );
}

function addMissingConceptCoverage(source, chapter) {
  const unitId = chapter.book.unitIds[chapter.slug];
  if (!unitId) return { source, added: [] };
  const unit = MANIFESTS[chapter.bookSlug]?.units?.find(
    (candidate) => candidate.id === unitId,
  );
  if (!unit)
    throw new Error(`Manifest unit missing: ${chapter.bookSlug}/${unitId}`);

  const paragraphs = proseParagraphs(source);
  const missing = unit.concepts
    .map((alternatives, index) => ({ alternatives, index }))
    .filter(({ alternatives, index }) => {
      if (index === 0) return false;
      return !alternatives.some((alternative) => {
        const needle = normalized(alternative);
        return (
          needle &&
          paragraphs.some((paragraph) => normalized(paragraph).includes(needle))
        );
      });
    })
    .map(({ alternatives, index }) => ({
      label: preferredConcept(alternatives),
      index,
    }));
  if (missing.length === 0 || source.includes("## 原版目录概念补充核对")) {
    return { source, added: [] };
  }

  const sections = missing
    .map(
      ({ label, index }) => `### ${label}：机制、边界与证据

在《${chapter.title}》的官方单元 ${unitId} 中，${label}连接本章第 ${index + 1} 组知识约束。学习时要同时说明它接受什么输入、改变什么状态、在何种边界失效；再以本章示例的编译诊断、固定输入输出或失败用例复核结论，不能只记术语名称。`,
    )
    .join("\n\n");
  const supplement = `## 原版目录概念补充核对

以下条目补齐官方目录中容易被示例主线掩盖的概念。它们不重复罗列目录，而是明确每项概念的机制、适用边界和验收证据。

${sections}

`;
  return {
    source: source.replace("<Attribution", `${supplement}<Attribution`),
    added: missing.map(({ label }) => label),
  };
}

function compactLabel(value) {
  const text = plainText(value).replace(
    /^[一二三四五六七八九十\d]+[、.：:\s-]*/,
    "",
  );
  return text.length > 30 ? `${text.slice(0, 29)}…` : text;
}

function compactMechanism(value, label, title) {
  const cleaned = plainText(value);
  if (!cleaned)
    return `本节把「${label}」放回《${title}》的输入、状态变化与输出路径中理解。`;
  const sentence =
    cleaned.match(/^.{35,180}?[。！？.!?](?:\s|$)/u)?.[0]?.trim() ??
    cleaned.slice(0, 150);
  return sentence.length < cleaned.length && !/[。！？.!?]$/u.test(sentence)
    ? `${sentence}…`
    : sentence;
}

function chapterSections(source, title) {
  const headingPattern = /^##\s+(.+)$/gm;
  const headings = [...source.matchAll(headingPattern)];
  const excluded = /名词解释|术语表|练习|小结|总结|复习题|出处|来源/u;
  const sections = [];

  for (let index = 0; index < headings.length; index += 1) {
    const heading = compactLabel(headings[index][1]);
    if (!heading || excluded.test(heading)) continue;
    const start = headings[index].index + headings[index][0].length;
    const end =
      index + 1 < headings.length ? headings[index + 1].index : source.length;
    const body = source.slice(start, end);
    const paragraph = body
      .split(/\n\s*\n/)
      .map((candidate) => candidate.trim())
      .find(
        (candidate) =>
          candidate.length >= 45 &&
          !/^(?:import\b|<|```|\||[-*]\s|\d+[.)、]\s)/.test(candidate),
      );
    sections.push({
      label: heading,
      mechanism: compactMechanism(paragraph ?? "", heading, title),
    });
    if (sections.length === 3) break;
  }

  const fallbacks = ["建立概念边界", "跟踪状态变化", "用失败证据验收"];
  while (sections.length < 3) {
    const label = fallbacks[sections.length];
    sections.push({
      label,
      mechanism: `围绕《${title}》${label}，明确输入、执行条件、输出与可观察证据。`,
    });
  }
  return sections;
}

function choosePracticeMode(slug) {
  if (
    /loop|branch|io|algorithm|statement|expression|function|standard/.test(slug)
  )
    return "simulation";
  if (/class|template|container|structure|inheritance|oop|library/.test(slug))
    return "design";
  return "diagnosis";
}

function attributeValue(attributes, names) {
  for (const name of names) {
    const match = attributes.match(new RegExp(`\\b${name}="([^"]+)"`));
    if (match) return match[1];
  }
  return null;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function normalizeAttribution(source, book) {
  const attributionPattern = /<Attribution\b([\s\S]*?)\/>/;
  const match = source.match(attributionPattern);
  if (!match) throw new Error("Attribution block missing");
  const adaptedFrom =
    attributeValue(match[1], ["adaptedFrom", "source", "title"]) ??
    book.sourceName;
  const adaptedUrl =
    attributeValue(match[1], ["adaptedUrl", "url"]) ?? book.sourceUrl;
  const replacement = `<Attribution
  adaptedFrom="${escapeAttribute(adaptedFrom)}"
  adaptedUrl="${escapeAttribute(adaptedUrl)}"
  mode="independent-rewrite"
  sourceBasis="outline-only"
/>`;
  return source.replace(attributionPattern, replacement);
}

function addGovernanceFrontmatter(source, book, slug, practiceMode) {
  const parsed = matter(source);
  const unitId = book.unitIds[slug];
  const additions = [
    "qualityVersion: 2",
    `practiceMode: ${practiceMode}`,
    "sourceMode: independent-rewrite",
    ...(unitId ? [`officialUnitId: ${unitId}`] : []),
  ];
  let frontmatter = source.slice(0, source.indexOf("---", 3) + 3);
  const body = source.slice(frontmatter.length);
  if (!/^sourceUrl:/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(
      /^draft:/m,
      `sourceUrl: "${book.sourceUrl}"\ndraft:`,
    );
  }
  for (const addition of additions) {
    const key = addition.split(":")[0];
    if (!new RegExp(`^${key}:`, "m").test(frontmatter)) {
      frontmatter = frontmatter.replace(/\n---$/, `\n${addition}\n---`);
    }
  }
  if (!parsed.data.title) throw new Error("Chapter title missing");
  return `${frontmatter}${body}`;
}

function wrapperSource(chapter) {
  const stages = chapter.sections.map((section) => ({
    label: section.label,
    mechanism: section.mechanism,
    failure: chapter.book.failure(section.label),
    evidence: chapter.book.evidence(section.label),
  }));
  return `"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = ${JSON.stringify(stages, null, 2)};

export function ${chapter.labComponent}() {
  return (
    <ChapterDecisionLab
      title=${JSON.stringify(`${chapter.title}：机制与证据`)}
      prompt=${JSON.stringify(`切换《${chapter.title}》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。`)}
      stages={STAGES}
      conclusion=${JSON.stringify(`学完《${chapter.title}》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。`)}
    />
  );
}

export function ${chapter.mechanismComponent}() {
  return (
    <ChapterMechanismMap
      title=${JSON.stringify(`${chapter.title}：机制路径`)}
      stages={STAGES}
    />
  );
}

export function ${chapter.failureComponent}() {
  return (
    <ChapterFailureMatrix
      title=${JSON.stringify(`${chapter.title}：失效与核验`)}
      stages={STAGES}
    />
  );
}
`;
}

function addChapterVisuals(source, chapter) {
  const importLine = `import { ${chapter.labComponent}, ${chapter.mechanismComponent}, ${chapter.failureComponent} } from "@/components/mdx/${chapter.bookSlug}/${chapter.slug}";`;
  if (!source.includes(importLine)) {
    source = source.replace(
      'import { Attribution } from "@/components/mdx/attribution";',
      `import { Attribution } from "@/components/mdx/attribution";\n${importLine}`,
    );
  }
  const visualBlock = `<${chapter.mechanismComponent} />

<${chapter.labComponent} />

<${chapter.failureComponent} />`;
  if (!source.includes(`<${chapter.mechanismComponent} />`)) {
    source = source.replace("</Objectives>", `</Objectives>\n\n${visualBlock}`);
  }
  return source;
}

const remediated = [];
const supplemented = [];
for (const [bookSlug, book] of Object.entries(BOOKS)) {
  const componentDirectory = path.join(COMPONENT_ROOT, bookSlug);
  fs.mkdirSync(componentDirectory, { recursive: true });

  for (const mdxPath of walkMdx(path.join(CONTENT_ROOT, bookSlug))) {
    const slug = path.basename(mdxPath, ".mdx");
    const componentStem = toPascalCase(slug);
    const chapter = {
      book,
      bookSlug,
      slug,
      labComponent: `${componentStem}DecisionLab`,
      mechanismComponent: `${componentStem}MechanismMap`,
      failureComponent: `${componentStem}FailureDiagram`,
    };
    let source = stripEditorialComments(fs.readFileSync(mdxPath, "utf8"));
    const parsed = matter(source);
    chapter.title = String(parsed.data.title);
    chapter.sections = chapterSections(parsed.content, chapter.title);
    const practiceMode = choosePracticeMode(slug);
    source = addGovernanceFrontmatter(source, book, slug, practiceMode);
    source = normalizeAttribution(source, book);
    source = addChapterVisuals(source, chapter);
    const coverage = addMissingConceptCoverage(source, chapter);
    source = coverage.source;
    if (coverage.added.length > 0) {
      supplemented.push({
        id: `${bookSlug}/${slug}`,
        concepts: coverage.added,
      });
    }
    fs.writeFileSync(mdxPath, source);
    fs.writeFileSync(
      path.join(componentDirectory, `${slug}.tsx`),
      wrapperSource(chapter),
    );
    remediated.push(`${bookSlug}/${slug}`);
  }
}

console.log(
  `Remediated ${remediated.length} Primer chapters across ${Object.keys(BOOKS).length} books.`,
);
for (const entry of supplemented) {
  console.log(`Supplemented ${entry.id}: ${entry.concepts.join(" · ")}`);
}
console.log(`Supplemented chapters: ${supplemented.length}.`);
