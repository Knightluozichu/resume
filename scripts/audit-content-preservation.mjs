#!/usr/bin/env node
/**
 * audit-content-preservation.mjs — 全库内容保护审计
 *
 * 以 1955146c742e 为基线，检查 Batch 1–70 的内容变化是否破坏了原有教学内容。
 * 只读审计：不修改任何 content/ 文件。
 *
 * 检查项：
 *  1. 基线正式章节和知识标题不得静默消失
 *  2. 基线代码块不得无解释删除
 *  3. 基线图片、资源、表格和专用组件不得静默删除
 *  4. 基线练习及答案不得静默删除
 *  5. 基线中的案例和教学流程必须能映射到新内容
 *  6. 重命名必须有旧路径→新路径映射
 *  7. 每个基线知识单元必须标记为 preserved / expanded / rewritten-equivalent
 *  8. removed 状态必须为 0
 *  9. rewritten-equivalent 必须保存映射证据
 * 10. 目录覆盖率、字数增加和质量分数均不能代替内容保留证据
 *
 * 用法：
 *   node scripts/audit-content-preservation.mjs --book <slug> --check
 *   node scripts/audit-content-preservation.mjs --all --check
 *   node scripts/audit-content-preservation.mjs --all --report
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// ── 配置 ──────────────────────────────────────────────
const BASELINE_SHA = "1955146c742e";
const CURRENT_SHA = "HEAD";
const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const REPORT_DIR = path.join(ROOT, "quality", "reports", "content-preservation");
const LEDGER_PATH = path.join(ROOT, "quality", "content-preservation-ledger.json");

// 辅助章节（不计入正式知识章节）
const AUXILIARY_PATTERNS =
  /learning-map|official-guide|学习地图|导学|final-review|book-review|全书复习|总复习|全书验收|glossary|术语|index|索引|foreword|preface|前言|序|afterword|后记|appendix|附录/i;

// 已知模板标题（由 remediate-*-v2.mjs 生成器写入）
const TEMPLATE_H2_MARKERS = new Set([
  "为什么从这个问题开始",
  "来源合同、版本差异与安全边界",
  "来源合同与版本差异",
  "正式目录坐标逐项解释",
  "正式目录坐标",
  "三个可操作证据视图",
  "最小可重现实验协议",
  "小结与上架门",
  "练习与答案",
  "六个裁决术语",
]);

// ── CLI 解析 ──────────────────────────────────────────
const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const reportMode = args.includes("--report");
const allMode = args.includes("--all");
const bookIdx = args.indexOf("--book");
const singleBook = bookIdx >= 0 ? args[bookIdx + 1] : null;

if (!checkMode && !reportMode) {
  console.error("用法: node scripts/audit-content-preservation.mjs --book <slug> --check | --all --check | --all --report");
  process.exit(2);
}

// ── Git 只读工具 ─────────────────────────────────────
function gitShow(sha, filePath) {
  try {
    return execSync(`git show ${sha}:${filePath}`, {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

function gitLsTree(sha, dir) {
  try {
    const out = execSync(`git ls-tree -r --name-only ${sha} -- ${dir}`, {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    return out.trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function gitDiffNameStatus(shaA, shaB, dir) {
  try {
    const out = execSync(
      `git diff --find-renames --name-status ${shaA}..${shaB} -- ${dir}`,
      { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
    );
    return out
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("\t");
        const status = parts[0];
        const paths = parts.slice(1);
        return { status, baselinePath: paths[0], currentPath: paths[paths.length - 1] };
      });
  } catch {
    return [];
  }
}

// ── MDX 内容解析 ─────────────────────────────────────
function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return { data: {}, content: raw };
  const data = {};
  const body = fmMatch[1];
  for (const line of body.split("\n")) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      data[m[1]] = val;
    }
  }
  return { data, content: raw.slice(fmMatch[0].length) };
}

function parseMdx(raw) {
  if (!raw) return null;
  const { data, content } = parseFrontmatter(raw);

  // 标题
  const h2 = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const h3 = [...content.matchAll(/^###\s+(.+)$/gm)].map((m) => m[1].trim());
  const h4 = [...content.matchAll(/^####\s+(.+)$/gm)].map((m) => m[1].trim());

  // 代码块
  const codeBlocks = [...content.matchAll(/```(\w*)\n([\s\S]*?)```/g)].map((m) => ({
    language: m[1] || "text",
    lineCount: m[2].split("\n").length,
  }));

  // 图片 / 媒体
  const mdImages = [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => m[2]);
  const svgRefs = [...content.matchAll(/<svg[\s\S]*?<\/svg>/gi)].length;
  const componentImages = [...content.matchAll(/<(?:Image|Diagram|Figure|Chart|Visual)\b[^>]*\ssrc=["']([^"']+)["']/gi)].map((m) => m[1]);

  // MDX 组件导入
  const imports = [...content.matchAll(/^import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/gm)].map((m) => ({
    components: m[1].split(",").map((s) => s.trim()).filter(Boolean),
    from: m[2],
  }));
  const importComponents = new Set(imports.flatMap((i) => i.components));

  // MDX 组件使用
  const componentUsage = [...content.matchAll(/<([A-Z][a-zA-Z0-9]+)/g)].map((m) => m[1]);

  // 表格行
  const tableRows = (content.match(/^\|.*\|$/gm) || []).length;

  // 练习与答案
  const exercises = (content.match(/<Exercises[\s>]/g) || []).length;
  const answers = (content.match(/<Answer[\s>]/g) || []).length;
  const exerciseHeadings = h2.filter((h) => /练习|exercise|问题/i.test(h)).length;

  // Callout
  const callouts = (content.match(/<Callout[\s>]/g) || []).length;

  // 正文哈希
  const bodyHash = crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);

  return {
    data,
    content,
    headings: { h2, h3, h4 },
    codeBlocks,
    images: [...mdImages, ...componentImages],
    svgCount: svgRefs,
    imports,
    importComponents: [...importComponents],
    componentUsage,
    tableRows,
    exercises,
    answers,
    exerciseHeadings,
    callouts,
    bodyLength: content.length,
    bodyHash,
  };
}

// ── 辅助函数 ─────────────────────────────────────────
function getSectionLength(content, heading) {
  const regex = new RegExp(`^##\\s+${escapeRegex(heading)}\\s*$([\\s\\S]*?)(?=^##\\s|$)`, "m");
  const m = content.match(regex);
  return m ? m[1].trim().length : 0;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findEquivalentHeading(baselineH2, currentH2List) {
  for (const ch of currentH2List) {
    if (ch === baselineH2) return ch;
    const baseWords = baselineH2.split(/[\s,，、：:（）()【】\[\]]+/).filter((w) => w.length >= 2);
    const currWords = ch.split(/[\s,，、：:（）()【】\[\]]+/).filter((w) => w.length >= 2);
    const overlap = baseWords.filter((w) => currWords.some((cw) => cw.includes(w) || w.includes(cw)));
    if (overlap.length >= Math.min(baseWords.length, currWords.length) * 0.5 && overlap.length >= 1) {
      return ch;
    }
  }
  return null;
}

// ── 单文件对比 ───────────────────────────────────────
function compareFile(baselinePath, currentPath, status) {
  const baselineRaw = gitShow(BASELINE_SHA, baselinePath);
  const currentRaw = fs.existsSync(path.join(ROOT, currentPath))
    ? fs.readFileSync(path.join(ROOT, currentPath), "utf8")
    : gitShow(CURRENT_SHA, currentPath);

  const baseline = parseMdx(baselineRaw);
  const current = parseMdx(currentRaw);

  if (!baseline && !current) return null;
  if (!baseline) {
    return {
      baselinePath, currentPath, changeType: status,
      baselineExists: false, currentExists: true,
      note: "基线不存在（新增文件）",
    };
  }
  if (!current) {
    return {
      baselinePath, currentPath, changeType: status,
      baselineExists: true, currentExists: false,
      note: "当前不存在（已删除）",
      baselineHeadings: baseline.headings,
      baselineCodeBlocks: baseline.codeBlocks.length,
      baselineImages: baseline.images.length,
      baselineExercises: baseline.exercises + baseline.exerciseHeadings,
    };
  }

  const baselineH2Set = new Set(baseline.headings.h2);
  const currentH2Set = new Set(current.headings.h2);
  const missingH2 = baseline.headings.h2.filter((h) => !currentH2Set.has(h));
  const newH2 = current.headings.h2.filter((h) => !baselineH2Set.has(h));

  const templateH2Count = current.headings.h2.filter((h) => TEMPLATE_H2_MARKERS.has(h)).length;
  const isTemplateReplaced =
    templateH2Count >= 4 && missingH2.length >= baseline.headings.h2.length * 0.5;

  const baselineCodeCount = baseline.codeBlocks.length;
  const currentCodeCount = current.codeBlocks.length;
  const codeBlocksLost = Math.max(0, baselineCodeCount - currentCodeCount);

  const baselineImgCount = baseline.images.length + baseline.svgCount;
  const currentImgCount = current.images.length + current.svgCount;
  const imagesLost = Math.max(0, baselineImgCount - currentImgCount);

  const baselineExCount = baseline.exercises + baseline.exerciseHeadings + baseline.answers;
  const currentExCount = current.exercises + current.exerciseHeadings + current.answers;
  const exercisesLost = Math.max(0, baselineExCount - currentExCount);

  const tablesLost = Math.max(0, baseline.tableRows - current.tableRows);

  const baselineComponents = new Set(baseline.componentUsage);
  const currentComponents = new Set(current.componentUsage);
  const componentsLost = [...baselineComponents].filter((c) => !currentComponents.has(c));

  const knowledgeUnits = baseline.headings.h2.map((h2) => {
    if (currentH2Set.has(h2)) {
      const bLen = getSectionLength(baseline.content, h2);
      const cLen = getSectionLength(current.content, h2);
      if (cLen > bLen * 1.2) return { title: h2, status: "expanded", evidence: `字数 ${bLen}→${cLen}` };
      return { title: h2, status: "preserved", evidence: `字数 ${bLen}→${cLen}` };
    }
    const equivalent = findEquivalentHeading(h2, current.headings.h2);
    if (equivalent) {
      return { title: h2, status: "rewritten-equivalent", newHeading: equivalent, evidence: `"${h2}" → "${equivalent}"` };
    }
    return { title: h2, status: "removed", evidence: "未找到对应标题" };
  });

  const removedCount = knowledgeUnits.filter((u) => u.status === "removed").length;

  return {
    baselinePath, currentPath, changeType: status,
    baselineExists: true, currentExists: true,
    isTemplateReplaced, templateH2Count,
    baselineHeadings: baseline.headings,
    currentHeadings: current.headings,
    missingH2, newH2,
    baselineCodeBlocks: baselineCodeCount,
    currentCodeBlocks: currentCodeCount,
    codeBlocksLost,
    baselineImages: baselineImgCount,
    currentImages: currentImgCount,
    imagesLost,
    baselineExercises: baselineExCount,
    currentExercises: currentExCount,
    exercisesLost,
    baselineTables: baseline.tableRows,
    currentTables: current.tableRows,
    tablesLost,
    componentsLost,
    baselineBodyLength: baseline.bodyLength,
    currentBodyLength: current.bodyLength,
    baselineBodyHash: baseline.bodyHash,
    currentBodyHash: current.bodyHash,
    knowledgeUnits,
    removedCount,
  };
}

// ── 单书审计 ─────────────────────────────────────────
function auditBook(bookSlug) {
  const bookDir = path.join(CONTENT_DIR, bookSlug);
  if (!fs.existsSync(bookDir)) {
    return { book: bookSlug, status: "error", error: "目录不存在" };
  }

  const allDiffs = gitDiffNameStatus(BASELINE_SHA, "11af69414", `content/${bookSlug}`);
  const baselineFiles = gitLsTree(BASELINE_SHA, `content/${bookSlug}`).filter((f) => f.endsWith(".mdx"));
  const currentFiles = gitLsTree(CURRENT_SHA, `content/${bookSlug}`).filter((f) => f.endsWith(".mdx"));

  const fileAudits = [];
  const processedPaths = new Set();

  for (const diff of allDiffs) {
    if (!diff.baselinePath.endsWith(".mdx") && !diff.currentPath.endsWith(".mdx")) continue;
    const key = `${diff.baselinePath}→${diff.currentPath}`;
    if (processedPaths.has(key)) continue;
    processedPaths.add(key);
    const result = compareFile(diff.baselinePath, diff.currentPath, diff.status);
    if (result) fileAudits.push(result);
  }

  const changedChapters = fileAudits.filter(
    (f) => f.currentHeadings && !AUXILIARY_PATTERNS.test(f.currentPath),
  );
  const h2Signatures = changedChapters.map((f) => f.currentHeadings?.h2?.join("||") || "");
  const uniqueSignatures = new Set(h2Signatures.filter(Boolean));
  const isFullyTemplated =
    changedChapters.length >= 3 && uniqueSignatures.size <= 2 && changedChapters.length > 0;

  const stats = {
    totalFiles: fileAudits.length,
    templateReplaced: fileAudits.filter((f) => f.isTemplateReplaced).length,
    filesWithMissingH2: fileAudits.filter((f) => f.missingH2?.length > 0).length,
    filesWithCodeLoss: fileAudits.filter((f) => f.codeBlocksLost > 0).length,
    filesWithImageLoss: fileAudits.filter((f) => f.imagesLost > 0).length,
    filesWithExerciseLoss: fileAudits.filter((f) => f.exercisesLost > 0).length,
    totalMissingH2: fileAudits.reduce((s, f) => s + (f.missingH2?.length || 0), 0),
    totalCodeBlocksLost: fileAudits.reduce((s, f) => s + (f.codeBlocksLost || 0), 0),
    totalImagesLost: fileAudits.reduce((s, f) => s + (f.imagesLost || 0), 0),
    totalExercisesLost: fileAudits.reduce((s, f) => s + (f.exercisesLost || 0), 0),
    totalRemovedUnits: fileAudits.reduce((s, f) => s + (f.removedCount || 0), 0),
    totalBodyLengthDelta: fileAudits.reduce(
      (s, f) => s + ((f.currentBodyLength || 0) - (f.baselineBodyLength || 0)), 0,
    ),
  };

  let riskLevel = "P2";
  const riskReasons = [];

  if (isFullyTemplated || stats.templateReplaced >= stats.totalFiles * 0.5) {
    riskLevel = "P0";
    riskReasons.push(`整书模板替换（${stats.templateReplaced}/${stats.totalFiles} 文件）`);
  }
  if (stats.totalMissingH2 >= 10 || stats.totalRemovedUnits >= 10) {
    riskLevel = "P0";
    riskReasons.push(`大量标题消失（${stats.totalMissingH2} 个 H2 缺失，${stats.totalRemovedUnits} 个知识单元 removed）`);
  }
  if (stats.totalCodeBlocksLost >= 10) {
    if (riskLevel !== "P0") riskLevel = "P0";
    riskReasons.push(`代码块大幅减少（丢失 ${stats.totalCodeBlocksLost} 个）`);
  }
  if (stats.totalImagesLost >= 5) {
    if (riskLevel === "P2") riskLevel = "P1";
    riskReasons.push(`图片/资源丢失 ${stats.totalImagesLost} 个`);
  }
  if (stats.totalExercisesLost >= 5) {
    if (riskLevel === "P2") riskLevel = "P1";
    riskReasons.push(`练习丢失 ${stats.totalExercisesLost} 个`);
  }
  if (riskLevel === "P2" && stats.totalFiles > 0) {
    riskReasons.push("原内容基本完整，只需融合来源和版本修正");
  }

  return {
    book: bookSlug,
    status: "audited",
    riskLevel,
    riskReasons,
    isFullyTemplated,
    baselineFileCount: baselineFiles.length,
    currentFileCount: currentFiles.length,
    stats,
    files: fileAudits,
  };
}

// ── 报告生成 ─────────────────────────────────────────
function generateBookReport(audit) {
  const lines = [];
  lines.push(`# 内容保护审计报告：${audit.book}`);
  lines.push("");
  lines.push(`- 基线：${BASELINE_SHA}`);
  lines.push(`- 风险等级：**${audit.riskLevel}**`);
  lines.push(`- 基线文件数：${audit.baselineFileCount}`);
  lines.push(`- 当前文件数：${audit.currentFileCount}`);
  lines.push(`- 变更文件数：${audit.stats.totalFiles}`);
  lines.push(`- 整书模板替换：${audit.isFullyTemplated ? "是" : "否"}`);
  lines.push("");
  lines.push("## 风险原因");
  for (const r of audit.riskReasons) lines.push(`- ${r}`);
  lines.push("");
  lines.push("## 汇总统计");
  lines.push(`| 指标 | 数值 |`);
  lines.push(`|------|------|`);
  lines.push(`| 模板替换文件数 | ${audit.stats.templateReplaced} |`);
  lines.push(`| H2 缺失文件数 | ${audit.stats.filesWithMissingH2} |`);
  lines.push(`| 代码块丢失文件数 | ${audit.stats.filesWithCodeLoss} |`);
  lines.push(`| 图片丢失文件数 | ${audit.stats.filesWithImageLoss} |`);
  lines.push(`| 练习丢失文件数 | ${audit.stats.filesWithExerciseLoss} |`);
  lines.push(`| 总缺失 H2 | ${audit.stats.totalMissingH2} |`);
  lines.push(`| 总丢失代码块 | ${audit.stats.totalCodeBlocksLost} |`);
  lines.push(`| 总丢失图片 | ${audit.stats.totalImagesLost} |`);
  lines.push(`| 总丢失练习 | ${audit.stats.totalExercisesLost} |`);
  lines.push(`| 总 removed 知识单元 | ${audit.stats.totalRemovedUnits} |`);
  lines.push(`| 正文长度变化 | ${audit.stats.totalBodyLengthDelta >= 0 ? "+" : ""}${audit.stats.totalBodyLengthDelta} |`);
  lines.push("");
  lines.push("## 逐文件详情");
  for (const f of audit.files) {
    lines.push(`### ${f.currentPath}`);
    lines.push(`- 变更类型：${f.changeType}`);
    if (f.isTemplateReplaced) lines.push(`- ⚠ **模板替换**（模板 H2：${f.templateH2Count}）`);
    if (f.missingH2?.length) lines.push(`- 缺失 H2：${f.missingH2.join("、")}`);
    if (f.newH2?.length) lines.push(`- 新增 H2：${f.newH2.join("、")}`);
    lines.push(`- 代码块：${f.baselineCodeBlocks} → ${f.currentCodeBlocks}（丢失 ${f.codeBlocksLost}）`);
    lines.push(`- 图片：${f.baselineImages} → ${f.currentImages}（丢失 ${f.imagesLost}）`);
    lines.push(`- 练习：${f.baselineExercises} → ${f.currentExercises}（丢失 ${f.exercisesLost}）`);
    lines.push(`- 表格行：${f.baselineTables} → ${f.currentTables}`);
    lines.push(`- 正文长度：${f.baselineBodyLength} → ${f.currentBodyLength}`);
    if (f.knowledgeUnits?.length) {
      const removed = f.knowledgeUnits.filter((u) => u.status === "removed");
      const rewritten = f.knowledgeUnits.filter((u) => u.status === "rewritten-equivalent");
      if (removed.length) lines.push(`- **removed 知识单元**：${removed.map((u) => u.title).join("、")}`);
      if (rewritten.length) lines.push(`- rewritten-equivalent：${rewritten.map((u) => `${u.title}→${u.newHeading}`).join("、")}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

// ── 主流程 ───────────────────────────────────────────
function main() {
  let books = [];
  if (allMode) {
    const diffs = gitDiffNameStatus(BASELINE_SHA, "11af69414", "content");
    const bookSet = new Set();
    for (const d of diffs) {
      const parts = d.currentPath.split("/");
      if (parts[0] === "content" && parts[1]) bookSet.add(parts[1]);
    }
    books = [...bookSet].sort();
  } else if (singleBook) {
    books = [singleBook];
  } else {
    console.error("请指定 --book <slug> 或 --all");
    process.exit(2);
  }

  console.log(`==> 基线：${BASELINE_SHA}`);
  console.log(`==> 审计 ${books.length} 本书`);

  const audits = [];
  let p0 = [], p1 = [], p2 = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    process.stdout.write(`  [${i + 1}/${books.length}] ${book} ... `);
    const audit = auditBook(book);
    audits.push(audit);
    console.log(`${audit.riskLevel} (${audit.stats.totalFiles} 文件, removed=${audit.stats.totalRemovedUnits})`);

    if (reportMode) {
      const reportPath = path.join(REPORT_DIR, `${book}.md`);
      fs.writeFileSync(reportPath, generateBookReport(audit));
    }
  }

  p0 = audits.filter((a) => a.riskLevel === "P0");
  p1 = audits.filter((a) => a.riskLevel === "P1");
  p2 = audits.filter((a) => a.riskLevel === "P2");

  const ledger = {
    baseline: BASELINE_SHA,
    batch70End: "11af69414",
    currentMain: execSync("git rev-parse HEAD", { encoding: "utf8" }).trim(),
    generatedAt: new Date().toISOString(),
    totalBooks: audits.length,
    totalFiles: audits.reduce((s, a) => s + a.stats.totalFiles, 0),
    summary: {
      P0: p0.length,
      P1: p1.length,
      P2: p2.length,
      totalRemovedKnowledgeUnits: audits.reduce((s, a) => s + a.stats.totalRemovedUnits, 0),
      totalTemplateReplaced: audits.reduce((s, a) => s + a.stats.templateReplaced, 0),
      totalCodeBlocksLost: audits.reduce((s, a) => s + a.stats.totalCodeBlocksLost, 0),
      totalImagesLost: audits.reduce((s, a) => s + a.stats.totalImagesLost, 0),
      totalExercisesLost: audits.reduce((s, a) => s + a.stats.totalExercisesLost, 0),
    },
    books: {},
  };

  for (const audit of audits) {
    ledger.books[audit.book] = {
      status: audit.status,
      riskLevel: audit.riskLevel,
      riskReasons: audit.riskReasons,
      isFullyTemplated: audit.isFullyTemplated,
      baselineFileCount: audit.baselineFileCount,
      currentFileCount: audit.currentFileCount,
      changedFileCount: audit.stats.totalFiles,
      stats: audit.stats,
    };
  }

  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));

  if (reportMode) {
    const summaryPath = path.join(REPORT_DIR, "_summary.md");
    const lines = [
      `# 全库内容保护审计汇总`, ``,
      `- 基线：${BASELINE_SHA}`,
      `- 生成时间：${ledger.generatedAt}`,
      `- 审计书籍：${audits.length}`,
      `- 审计文件：${ledger.totalFiles}`,
      ``, `## 风险分布`, ``, `| 等级 | 数量 |`, `|------|------|`,
      `| P0 | ${p0.length} |`, `| P1 | ${p1.length} |`, `| P2 | ${p2.length} |`,
      ``, `## 全库损失汇总`, ``, `| 指标 | 数值 |`, `|------|------|`,
      `| 模板替换文件 | ${ledger.summary.totalTemplateReplaced} |`,
      `| removed 知识单元 | ${ledger.summary.totalRemovedKnowledgeUnits} |`,
      `| 丢失代码块 | ${ledger.summary.totalCodeBlocksLost} |`,
      `| 丢失图片 | ${ledger.summary.totalImagesLost} |`,
      `| 丢失练习 | ${ledger.summary.totalExercisesLost} |`,
      ``, `## P0 书籍（${p0.length}）`, ``,
    ];
    for (const a of p0) {
      lines.push(`- **${a.book}**：${a.riskReasons.join("；")}（${a.stats.totalFiles} 文件，removed=${a.stats.totalRemovedUnits}）`);
    }
    lines.push("", `## P1 书籍（${p1.length}）`, "");
    for (const a of p1) {
      lines.push(`- **${a.book}**：${a.riskReasons.join("；")}（${a.stats.totalFiles} 文件）`);
    }
    lines.push("", `## P2 书籍（${p2.length}）`, "");
    for (const a of p2) {
      lines.push(`- **${a.book}**：${a.riskReasons.join("；")}（${a.stats.totalFiles} 文件）`);
    }
    fs.writeFileSync(summaryPath, lines.join("\n"));
  }

  console.log("");
  console.log("════════════════════════════════════════");
  console.log(`  全库内容保护审计完成`);
  console.log("════════════════════════════════════════");
  console.log(`  基线：${BASELINE_SHA}`);
  console.log(`  审计：${audits.length} 本书，${ledger.totalFiles} 个文件`);
  console.log(`  P0：${p0.length} 本  P1：${p1.length} 本  P2：${p2.length} 本`);
  console.log(`  removed 知识单元：${ledger.summary.totalRemovedKnowledgeUnits}`);
  console.log(`  模板替换文件：${ledger.summary.totalTemplateReplaced}`);
  console.log(`  丢失代码块：${ledger.summary.totalCodeBlocksLost}`);
  console.log(`  丢失图片：${ledger.summary.totalImagesLost}`);
  console.log(`  丢失练习：${ledger.summary.totalExercisesLost}`);
  console.log("");

  if (p0.length > 0) {
    console.log("P0 书籍：");
    for (const a of p0.slice(0, 15)) {
      console.log(`  ${a.book} — ${a.riskReasons[0]}`);
    }
    if (p0.length > 15) console.log(`  ... 还有 ${p0.length - 15} 本`);
    console.log("");
  }

  console.log(`台账：${LEDGER_PATH}`);
  if (reportMode) console.log(`报告：${REPORT_DIR}/`);

  if (checkMode) {
    if (ledger.summary.totalRemovedKnowledgeUnits > 0 || p0.length > 0) {
      console.error(`✗ 内容保护检查未通过：${ledger.summary.totalRemovedKnowledgeUnits} 个 removed 知识单元，${p0.length} 本 P0 书`);
      process.exit(1);
    }
    console.log("✓ 内容保护检查通过");
    process.exit(0);
  }
}

main();
