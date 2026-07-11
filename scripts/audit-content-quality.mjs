#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";
import ts from "typescript";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const CONTENT_INDEX = path.join(ROOT, "src/lib/content.ts");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const REPORT_DIR = path.join(ROOT, "quality/reports");
const TASK_DIR = path.join(ROOT, "quality/tasks");
const DEFAULT_THRESHOLD = 90;

const DIMENSIONS = {
  depth: { label: "内容深度", max: 25 },
  structure: { label: "结构完整", max: 15 },
  visual: { label: "图示教学", max: 20 },
  practice: { label: "实践与检验", max: 15 },
  pedagogy: { label: "教学设计", max: 15 },
  fidelity: { label: "来源与忠实度", max: 10 },
};

function parseArgs(argv) {
  const result = {
    book: null,
    system: null,
    failUnder: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--") continue;
    if (argument === "--book") result.book = argv[++index] ?? null;
    else if (argument === "--system") result.system = argv[++index] ?? null;
    else if (argument === "--fail-under") {
      result.failUnder = Number(argv[++index] ?? DEFAULT_THRESHOLD);
    } else if (argument === "--help" || argument === "-h") {
      console.log(
        "用法: pnpm quality:audit -- [--system slug] [--book slug] [--fail-under 90]",
      );
      process.exit(0);
    } else {
      throw new Error(`未知参数: ${argument}`);
    }
  }

  if (result.failUnder !== null && !Number.isFinite(result.failUnder)) {
    throw new Error("--fail-under 必须是数字");
  }

  return result;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return null;
}

function getProperty(objectNode, name) {
  return objectNode.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

function stringValue(node) {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    ? node.text
    : null;
}

function findVariable(sourceFile, name) {
  let found = null;

  function visit(node) {
    if (found) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === name) found = node;
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (!found?.initializer) throw new Error(`无法解析 ${name}`);
  return unwrapExpression(found.initializer);
}

function unwrapExpression(node) {
  let current = node;
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function parseContentModel() {
  const source = fs.readFileSync(CONTENT_INDEX, "utf8");
  const sourceFile = ts.createSourceFile(
    CONTENT_INDEX,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const orderNode = findVariable(sourceFile, "BOOK_ORDER");
  if (!ts.isArrayLiteralExpression(orderNode)) {
    throw new Error("BOOK_ORDER 不是数组");
  }
  const bookOrder = orderNode.elements.map(stringValue).filter(Boolean);

  const titlesNode = findVariable(sourceFile, "BOOK_TITLES");
  if (!ts.isObjectLiteralExpression(titlesNode)) {
    throw new Error("BOOK_TITLES 不是对象");
  }
  const titles = new Map();
  for (const property of titlesNode.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const key = propertyName(property.name);
    const value = stringValue(property.initializer);
    if (key && value) titles.set(key, value);
  }

  const pathsNode = findVariable(sourceFile, "LEARNING_PATH_CONFIGS");
  if (!ts.isArrayLiteralExpression(pathsNode)) {
    throw new Error("LEARNING_PATH_CONFIGS 不是数组");
  }

  const systems = [];
  const assignment = new Map();
  for (const pathNode of pathsNode.elements) {
    if (!ts.isObjectLiteralExpression(pathNode)) continue;
    const slug = stringValue(getProperty(pathNode, "slug")?.initializer);
    const title = stringValue(getProperty(pathNode, "title")?.initializer);
    const stagesNode = getProperty(pathNode, "stages")?.initializer;
    if (
      !slug ||
      !title ||
      !stagesNode ||
      !ts.isArrayLiteralExpression(stagesNode)
    ) {
      continue;
    }

    const system = { slug, title, stages: [] };
    for (const stageNode of stagesNode.elements) {
      if (!ts.isObjectLiteralExpression(stageNode)) continue;
      const level = stringValue(getProperty(stageNode, "level")?.initializer);
      const itemsCall = getProperty(stageNode, "items")?.initializer;
      const itemsNode =
        itemsCall && ts.isCallExpression(itemsCall)
          ? itemsCall.arguments[0]
          : null;
      if (!level || !itemsNode || !ts.isArrayLiteralExpression(itemsNode))
        continue;

      const books = itemsNode.elements.map(stringValue).filter(Boolean);
      system.stages.push({ level, books });
      for (const bookSlug of books) {
        if (assignment.has(bookSlug)) {
          throw new Error(
            `书籍重复归类: ${bookSlug} (${assignment.get(bookSlug).systemSlug}, ${slug})`,
          );
        }
        assignment.set(bookSlug, {
          systemSlug: slug,
          systemTitle: title,
          level,
        });
      }
    }
    systems.push(system);
  }

  return { assignment, bookOrder: [...new Set(bookOrder)], systems, titles };
}

function walkMdx(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".mdx"))
      files.push(fullPath);
  }
  return files.sort();
}

function countMatches(source, expression) {
  return [...source.matchAll(expression)].length;
}

function extractBlock(source, component) {
  return (
    source.match(
      new RegExp(`<${component}\\b[^>]*>([\\s\\S]*?)<\\/${component}>`, "i"),
    )?.[1] ?? ""
  );
}

function normalized(source) {
  return source
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\s`*_{}()[\]<>:：，。、“”‘’'"/\\|+-]/g, "");
}

function proseText(source) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/^import\s.+$/gm, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|=-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreByThreshold(value, thresholds) {
  let score = 0;
  for (const [minimum, points] of thresholds) {
    if (value >= minimum) score = points;
  }
  return score;
}

function scoreChapter(filePath, bookSlug, manifest) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const source = parsed.content;
  const chapterSlug = path.basename(filePath, ".mdx");
  const relativePath = path.relative(ROOT, filePath);
  const role = chapterSlug.includes("learning-map")
    ? "learning-map"
    : chapterSlug.includes("final-review")
      ? "final-review"
      : "chapter";

  const headings = countMatches(source, /^#{2,4}\s+.+$/gm);
  const codeBlocks = Math.floor(countMatches(source, /^```/gm) / 2);
  const mathBlocks = Math.floor(countMatches(source, /^\$\$/gm) / 2);
  const terms = [...source.matchAll(/<Term\b[^>]*>([^<]+)<\/Term>/g)].map(
    (match) => normalized(match[1]),
  );
  const glossaryTerms = [
    ...source.matchAll(/<GlossaryItem\b[^>]*\bterm=["']([^"']+)["']/g),
  ].map((match) => normalized(match[1]));
  const matchedTerms = terms.filter((term) =>
    glossaryTerms.includes(term),
  ).length;
  const objectives = extractBlock(source, "Objectives");
  const objectiveLines = objectives.match(/^\s*[-*]\s+.+$/gm) ?? [];
  const objectiveItems = objectiveLines.length;
  const actionableObjectives = objectiveLines.filter((line) =>
    /能.{0,24}(?:解释|修改|推导|实现|回答|区分|比较|描述|分析|设计|写出|说出|判断|计算|绘制|复现)/.test(
      line,
    ),
  ).length;
  const exercises = extractBlock(source, "Exercises");
  const exerciseItems = Math.max(
    countMatches(exercises, /\*\*问题\s*\d+/g),
    countMatches(exercises, /^\s*\d+[.)、]\s+/gm),
  );
  const answers = countMatches(exercises, /<Answer\b/g);
  const traps = countMatches(source, /<Callout\b[^>]*type=["']trap["']/g);
  const steps = countMatches(source, /<Step\b/g);
  const stepBlocks = [
    ...source.matchAll(/<Step\b[^>]*>([\s\S]*?)<\/Step>/g),
  ].map((match) => match[1]);
  const visualNamePattern =
    /(Diagram|Viz|Figure|Demo|Chart|Scene|Canvas|Slider|Timeline|Anatomy|Flow|Lab|Map)$/;
  const components = [...source.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].map(
    (match) => match[1],
  );
  const visualComponents = components.filter((name) =>
    visualNamePattern.test(name),
  );
  const uniqueVisuals = [...new Set(visualComponents)];
  const interactiveComponents = components.filter((name) =>
    /(Stepper|Slider|Demo|Scene|Canvas|Lab)$/.test(name),
  );
  const stepVisuals = stepBlocks.filter((block) =>
    [...block.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)].some((match) =>
      visualNamePattern.test(match[1]),
    ),
  ).length;
  const inlineVisuals =
    countMatches(source, /<svg\b/g) +
    countMatches(source, /<img\b/g) +
    countMatches(source, /!\[[^\]]*\]\([^)]+\)/g);
  const chapterSpecificDiagram = new RegExp(
    `from\\s+["']@/components/mdx/${bookSlug}/diagrams/${chapterSlug}["']`,
  ).test(source);
  const hasSummary = /^##\s*(小结|总结|本章回顾|回顾)/m.test(source);
  const hasIntuition = /^##\s*(直觉|为什么|问题|从.+开始)/m.test(source);
  const hasPrediction = /(猜一猜|先预测|动手试|试一试|观察.*变化)/.test(source);
  const hasAttribution = /<Attribution\b/.test(source);
  const adaptedUrl = source.match(/\badaptedUrl=["']([^"']+)["']/)?.[1] ?? "";
  const frontmatterSource = String(parsed.data.sourceUrl ?? "").trim();
  const hasSourceLink = Boolean(frontmatterSource || adaptedUrl);
  const text = proseText(source);
  const proseChars = normalized(text).length;
  const isMathExpected = parsed.data.math === true || parsed.data.type === "B";
  const isPracticeExpected = parsed.data.type === "C";

  const dimensionScores = {
    depth:
      scoreByThreshold(proseChars, [
        [600, 3],
        [1000, 6],
        [1600, 9],
        [2400, 12],
        [3600, 15],
      ]) +
      scoreByThreshold(headings, [
        [2, 1],
        [4, 2],
        [6, 3],
        [8, 4],
      ]) +
      scoreByThreshold(terms.length, [
        [1, 1],
        [3, 2],
        [5, 3],
      ]) +
      (isMathExpected
        ? scoreByThreshold(mathBlocks, [
            [1, 1],
            [2, 2],
            [4, 3],
          ])
        : scoreByThreshold(codeBlocks + mathBlocks, [
            [1, 1],
            [2, 2],
            [3, 3],
          ])),
    structure:
      (objectiveItems >= 2 && objectiveItems <= 5
        ? 3
        : objectiveItems > 0
          ? 1
          : 0) +
      (hasIntuition ? 2 : 0) +
      (headings >= 4 ? 2 : headings >= 2 ? 1 : 0) +
      (traps >= 2 ? 2 : traps === 1 ? 1 : 0) +
      (exerciseItems >= 2 ? 2 : exerciseItems === 1 ? 1 : 0) +
      (answers >= exerciseItems && exerciseItems >= 2 ? 1 : 0) +
      (glossaryTerms.length >= 3 ? 2 : glossaryTerms.length > 0 ? 1 : 0) +
      (hasAttribution ? 1 : 0),
    visual:
      (chapterSpecificDiagram ? 8 : uniqueVisuals.length > 0 ? 3 : 0) +
      scoreByThreshold(uniqueVisuals.length + inlineVisuals, [
        [1, 2],
        [2, 3],
        [3, 5],
      ]) +
      (steps >= 3
        ? stepVisuals >= 2
          ? 4
          : stepVisuals === 1
            ? 2
            : 1
        : steps > 0
          ? 1
          : 0) +
      scoreByThreshold(interactiveComponents.length + inlineVisuals, [
        [1, 1],
        [2, 2],
        [3, 3],
      ]),
    practice:
      (isPracticeExpected
        ? scoreByThreshold(codeBlocks, [
            [1, 2],
            [2, 4],
            [3, 5],
          ])
        : scoreByThreshold(codeBlocks + mathBlocks, [
            [1, 2],
            [2, 4],
            [3, 5],
          ])) +
      scoreByThreshold(exerciseItems, [
        [1, 2],
        [2, 3],
        [3, 4],
      ]) +
      (exerciseItems >= 2
        ? Math.min(
            3,
            Math.round((Math.min(answers, exerciseItems) / exerciseItems) * 3),
          )
        : 0) +
      (hasPrediction ? 3 : interactiveComponents.length > 0 ? 1 : 0),
    pedagogy:
      (terms.length >= 3
        ? Math.min(4, Math.round((matchedTerms / terms.length) * 4))
        : matchedTerms > 0
          ? 2
          : 0) +
      (traps >= 2 ? 3 : traps === 1 ? 1 : 0) +
      (objectiveItems >= 2
        ? Math.min(3, Math.round((actionableObjectives / objectiveItems) * 3))
        : 0) +
      (hasSummary ? 2 : 0) +
      (steps >= 3 ? 2 : steps > 0 ? 1 : 0) +
      (hasPrediction ? 1 : 0),
    fidelity:
      (hasSourceLink ? 4 : 0) +
      (hasAttribution ? 2 : 0) +
      (manifest?.status === "verified-outline" ? 4 : 0),
  };

  const deficits = [];
  for (const [key, definition] of Object.entries(DIMENSIONS)) {
    if (dimensionScores[key] < definition.max) {
      deficits.push(
        `${definition.label} ${dimensionScores[key]}/${definition.max}`,
      );
    }
  }
  if (!manifest || manifest.status !== "verified-outline") {
    deficits.unshift("未核对权威原书核心单元，评分封顶 89");
  }
  if (isMathExpected && mathBlocks === 0) {
    deficits.unshift("数学型章节缺少可核查推导或公式");
  }
  if (isPracticeExpected && codeBlocks < 2) {
    deficits.unshift("实战型章节缺少足量可复现代码");
  }
  if (!chapterSpecificDiagram) {
    deficits.unshift("缺少与本章 slug 对应的专属图示模块");
  }
  if (steps >= 3 && stepVisuals < 2) {
    deficits.unshift("Stepper 大多数步骤只有文字，没有分步视觉变化");
  }
  if (terms.length !== matchedTerms) {
    deficits.unshift(
      `Term/Glossary 未完全对应 (${matchedTerms}/${terms.length})`,
    );
  }

  let score = Object.values(dimensionScores).reduce(
    (sum, value) => sum + value,
    0,
  );
  if (!manifest || manifest.status !== "verified-outline")
    score = Math.min(score, 89);

  return {
    bookSlug,
    chapterSlug,
    deficits,
    dimensions: dimensionScores,
    frontmatter: {
      draft: Boolean(parsed.data.draft),
      math: Boolean(parsed.data.math),
      section: String(parsed.data.section ?? ""),
      title: String(parsed.data.title ?? chapterSlug),
      type: String(parsed.data.type ?? ""),
    },
    metrics: {
      actionableObjectives,
      answers,
      chapterSpecificDiagram,
      codeBlocks,
      exerciseItems,
      glossaryTerms: glossaryTerms.length,
      headings,
      inlineVisuals,
      mathBlocks,
      objectiveItems,
      proseChars,
      stepVisuals,
      steps,
      terms: terms.length,
      traps,
      uniqueVisuals: uniqueVisuals.length,
    },
    pass: score >= DEFAULT_THRESHOLD,
    path: relativePath,
    role,
    score,
    _source: source,
  };
}

function scoreOutline(chapters, manifest) {
  if (
    !manifest ||
    manifest.status !== "verified-outline" ||
    !manifest.units?.length
  ) {
    return {
      coverage: 0,
      coveredUnits: 0,
      missingUnits: [],
      totalUnits: manifest?.units?.length ?? 0,
      units: [],
    };
  }

  const corpus = normalized(
    chapters
      .filter((chapter) => chapter.role !== "learning-map")
      .map((chapter) => chapter._source)
      .join("\n"),
  );
  const units = manifest.units.map((unit) => {
    const matchedGroups = unit.concepts.filter((alternatives) =>
      alternatives.some((alternative) =>
        corpus.includes(normalized(alternative)),
      ),
    ).length;
    const coverage = unit.concepts.length
      ? Math.round((matchedGroups / unit.concepts.length) * 100)
      : 0;
    return {
      coverage,
      id: unit.id,
      pass: coverage >= 67,
      title: unit.title,
    };
  });
  const coverage = units.length
    ? Math.round(
        units.reduce((sum, unit) => sum + unit.coverage, 0) / units.length,
      )
    : 0;

  return {
    coverage,
    coveredUnits: units.filter((unit) => unit.pass).length,
    missingUnits: units.filter((unit) => !unit.pass).map((unit) => unit.title),
    totalUnits: units.length,
    units,
  };
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function buildAudit() {
  const model = parseContentModel();
  const manifests = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")).books;
  const contentDirectories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const knownBooks = new Set([...model.bookOrder, ...contentDirectories]);
  const books = [];

  for (const bookSlug of knownBooks) {
    const classification = model.assignment.get(bookSlug) ?? {
      level: "unclassified",
      systemSlug: "unclassified",
      systemTitle: "未归类",
    };
    const manifest = manifests[bookSlug] ?? null;
    const chapterFiles = walkMdx(path.join(CONTENT_DIR, bookSlug));
    const chapters = chapterFiles.map((filePath) =>
      scoreChapter(filePath, bookSlug, manifest),
    );
    const chapterAverage = chapters.length
      ? round(
          chapters.reduce((sum, chapter) => sum + chapter.score, 0) /
            chapters.length,
        )
      : 0;
    const outline = scoreOutline(chapters, manifest);
    const sourceScore = manifest?.status === "verified-outline" ? 10 : 0;
    let score = round(
      chapterAverage * 0.65 + outline.coverage * 0.25 + sourceScore,
    );
    const hasFailingChapter = chapters.some((chapter) => !chapter.pass);
    const manifestVerified = manifest?.status === "verified-outline";
    if (hasFailingChapter || !manifestVerified) score = Math.min(score, 89);
    const pass =
      score >= DEFAULT_THRESHOLD &&
      !hasFailingChapter &&
      manifestVerified &&
      outline.coverage >= DEFAULT_THRESHOLD;

    books.push({
      bookSlug,
      chapterAverage,
      chapters,
      level: classification.level,
      manifest: manifest
        ? {
            edition: manifest.edition,
            sourceKind: manifest.sourceKind,
            sourceUrl: manifest.sourceUrl,
            status: manifest.status,
            verifiedAt: manifest.verifiedAt,
          }
        : null,
      outline,
      pass,
      score,
      systemSlug: classification.systemSlug,
      systemTitle: classification.systemTitle,
      title: model.titles.get(bookSlug) ?? bookSlug,
    });
  }

  const systemMap = new Map();
  for (const system of [
    ...model.systems.map(({ slug, title }) => ({ slug, title })),
    { slug: "unclassified", title: "未归类" },
  ]) {
    const systemBooks = books.filter((book) => book.systemSlug === system.slug);
    if (!systemBooks.length) continue;
    const chapterCount = systemBooks.reduce(
      (sum, book) => sum + book.chapters.length,
      0,
    );
    const weightedScore = chapterCount
      ? systemBooks.reduce(
          (sum, book) => sum + book.score * book.chapters.length,
          0,
        ) / chapterCount
      : 0;
    let score = round(weightedScore);
    if (systemBooks.some((book) => !book.pass)) score = Math.min(score, 89);
    systemMap.set(system.slug, {
      bookCount: systemBooks.length,
      books: systemBooks,
      chapterCount,
      pass:
        score >= DEFAULT_THRESHOLD && systemBooks.every((book) => book.pass),
      score,
      slug: system.slug,
      title: system.title,
    });
  }

  const systems = [...systemMap.values()];
  const chapterCount = books.reduce(
    (sum, book) => sum + book.chapters.length,
    0,
  );
  const passingChapters = books.reduce(
    (sum, book) => sum + book.chapters.filter((chapter) => chapter.pass).length,
    0,
  );
  const verifiedBooks = books.filter(
    (book) => book.manifest?.status === "verified-outline",
  ).length;

  return {
    generatedAt: new Date().toISOString(),
    rubricVersion: 1,
    threshold: DEFAULT_THRESHOLD,
    totals: {
      books: books.length,
      chapters: chapterCount,
      passingBooks: books.filter((book) => book.pass).length,
      passingChapters,
      passingSystems: systems.filter((system) => system.pass).length,
      systems: systems.length,
      verifiedBooks,
    },
    systems,
  };
}

function cleanForJson(audit) {
  return JSON.parse(
    JSON.stringify(audit, (key, value) =>
      key === "_source" ? undefined : value,
    ),
  );
}

function writeReports(audit) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.rmSync(TASK_DIR, { force: true, recursive: true });
  fs.mkdirSync(TASK_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(REPORT_DIR, "content-quality.json"),
    `${JSON.stringify(cleanForJson(audit), null, 2)}\n`,
  );

  const summary = [
    "# 全库内容质量基线",
    "",
    `> 生成时间：${audit.generatedAt}；通过线：${audit.threshold} 分。`,
    "",
    `- 体系：${audit.totals.passingSystems}/${audit.totals.systems} 通过`,
    `- 书籍：${audit.totals.passingBooks}/${audit.totals.books} 通过`,
    `- 章节：${audit.totals.passingChapters}/${audit.totals.chapters} 通过`,
    `- 已核对权威原书目录：${audit.totals.verifiedBooks}/${audit.totals.books} 本`,
    "",
    "| 体系 | 体系分 | 书籍 | 章节 | 通过书籍 | 通过章节 |",
    "|---|---:|---:|---:|---:|---:|",
  ];
  for (const system of audit.systems) {
    const passingChapters = system.books.reduce(
      (sum, book) =>
        sum + book.chapters.filter((chapter) => chapter.pass).length,
      0,
    );
    summary.push(
      `| [${system.title}](../tasks/${system.slug}.md) | ${system.score} | ${system.bookCount} | ${system.chapterCount} | ${system.books.filter((book) => book.pass).length} | ${passingChapters} |`,
    );
  }
  summary.push(
    "",
    "详细逐章分数见 `content-quality.json`；逐体系整改任务见 `quality/tasks/`。",
    "",
  );
  fs.writeFileSync(
    path.join(REPORT_DIR, "content-quality-summary.md"),
    summary.join("\n"),
  );

  const taskIndex = [
    "# 全库整改任务",
    "",
    `> 所有任务完成条件：章节、书籍、体系均达到 ${audit.threshold} 分。`,
    "",
    "| 体系 | 分数 | 未通过书籍 | 未通过章节 |",
    "|---|---:|---:|---:|",
  ];

  for (const system of audit.systems) {
    const failingChapters = system.books.reduce(
      (sum, book) =>
        sum + book.chapters.filter((chapter) => !chapter.pass).length,
      0,
    );
    taskIndex.push(
      `| [${system.title}](./${system.slug}.md) | ${system.score} | ${system.books.filter((book) => !book.pass).length} | ${failingChapters} |`,
    );

    const lines = [
      `# ${system.title}整改任务`,
      "",
      `> 当前体系分：${system.score}；${system.bookCount} 本书，${system.chapterCount} 章。`,
      "",
    ];
    for (const book of system.books) {
      const marker = book.pass ? "x" : " ";
      const sourceState = book.manifest
        ? `${book.manifest.status} · ${book.manifest.sourceUrl}`
        : "未建立权威原书目录清单";
      lines.push(
        `## [${marker}] ${book.title} (${book.bookSlug}) — ${book.score} 分`,
        "",
        `- 章节均分：${book.chapterAverage}；原书核心单元覆盖：${book.outline.coverage}% (${book.outline.coveredUnits}/${book.outline.totalUnits})。`,
        `- 来源状态：${sourceState}。`,
      );
      if (book.outline.missingUnits.length) {
        lines.push(`- 未充分覆盖：${book.outline.missingUnits.join("、")}。`);
      }
      lines.push("");
      for (const chapter of book.chapters) {
        const chapterMarker = chapter.pass ? "x" : " ";
        const topDeficits = chapter.deficits.slice(0, 4).join("；");
        lines.push(
          `- [${chapterMarker}] [${chapter.frontmatter.title}](../../${chapter.path}) — ${chapter.score} 分${topDeficits ? `：${topDeficits}` : ""}`,
        );
      }
      if (!book.chapters.length) lines.push("- [ ] 没有章节文件");
      lines.push("");
    }
    fs.writeFileSync(
      path.join(TASK_DIR, `${system.slug}.md`),
      lines.join("\n"),
    );
  }

  taskIndex.push("");
  fs.writeFileSync(path.join(TASK_DIR, "README.md"), taskIndex.join("\n"));
}

function selectedSystems(audit, args) {
  let systems = audit.systems;
  if (args.system)
    systems = systems.filter((system) => system.slug === args.system);
  if (args.book) {
    systems = systems
      .map((system) => ({
        ...system,
        books: system.books.filter((book) => book.bookSlug === args.book),
      }))
      .filter((system) => system.books.length > 0);
  }
  if (!systems.length) throw new Error("指定的体系或书籍不存在");
  return systems;
}

const args = parseArgs(process.argv.slice(2));
const audit = buildAudit();
writeReports(audit);
const selected = selectedSystems(audit, args);

for (const system of selected) {
  const visibleBooks = args.book ? system.books : system.books;
  console.log(
    `${system.title}: ${system.score} 分，${visibleBooks.filter((book) => book.pass).length}/${visibleBooks.length} 本通过`,
  );
  if (args.book) {
    for (const book of visibleBooks) {
      console.log(
        `  ${book.title}: ${book.score} 分，章节 ${book.chapters.filter((chapter) => chapter.pass).length}/${book.chapters.length}，原书覆盖 ${book.outline.coverage}%`,
      );
    }
  }
}
console.log(
  `全库: ${audit.totals.passingSystems}/${audit.totals.systems} 体系，${audit.totals.passingBooks}/${audit.totals.books} 本书，${audit.totals.passingChapters}/${audit.totals.chapters} 章通过；权威目录已核对 ${audit.totals.verifiedBooks}/${audit.totals.books} 本。`,
);

if (args.failUnder !== null) {
  const failing = selected.some((system) => {
    if (args.book)
      return system.books.some((book) => book.score < args.failUnder);
    return system.score < args.failUnder;
  });
  if (failing) process.exitCode = 1;
}
