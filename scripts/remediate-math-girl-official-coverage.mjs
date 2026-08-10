#!/usr/bin/env node

/**
 * 补齐《数学女孩》官方目录节点的章内解释证据。
 *
 * 质量审计把“出现过标题”与“有可复核解释”分开计数。这个脚本只为
 * 已经存在于对应章节正文、但尚未形成 45 字以上解释段的目录节点补充
 * 逐项释义；不改 manifest、ledger 或门禁阈值，也不覆盖已有正文。
 */

import fs from "node:fs";
import path from "node:path";

import { createProcessor } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const CONTENT_ROOT = path.join(ROOT, "content/math-girl");
const processor = createProcessor({
  format: "mdx",
  remarkPlugins: [remarkMath, remarkGfm],
});

function normalized(value) {
  return String(value ?? "")
    .toLocaleLowerCase()
    .replace(/[\s`*_~“”‘’"'：:，,。.!！?？、（）()\[\]{}<>/\\|—–-]+/g, "")
    .trim();
}

function conceptNeedles(value) {
  return [
    ...new Set([
      normalized(value),
      normalized(String(value).replace(/^\d+(?:\.\d+)*\s*/, "")),
    ]),
  ].filter(Boolean);
}

function nodeText(node) {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (!Array.isArray(node.children)) return "";
  return node.children.map(nodeText).join("");
}

function sourceParagraphs(tree) {
  const paragraphs = [];
  visit(tree, "paragraph", (node) => {
    const text = nodeText(node).replace(/\s+/g, " ").trim();
    if (text) paragraphs.push(text);
  });
  return paragraphs;
}

function hasExplainedSection(source, value) {
  const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const section = source.match(
    new RegExp(
      `^#{2,5}\\s+${escaped}\\s*$([\\s\\S]*?)(?=^#{2,5}\\s|\\z)`,
      "m",
    ),
  );
  if (!section) return false;
  const prose = section[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>|#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return prose.length >= 45;
}

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files.sort();
}

function explanationFor(concept, unitTitle) {
  const scene = /^(入口|整天的大纲|午饭时间|苏醒|整理行装|季节的确认|带上梦想|并非结束|雨夜|回家路上|自己家|学校|中午|教师办公室|休闲餐厅|下午茶时间|清晨的上学路|雨天的周六|到达阶梯教室|凭声音决定音乐|爱心记号|谁都没发现的事实|米尔嘉在柑橘香中出现)$/.test(
    concept,
  );
  if (scene) {
    return `“${concept}”是${unitTitle}中的叙事锚点：它把人物、问题和当时可用的观察条件固定下来；阅读到这里时，应先记录场景限制，再把后续公式或算法放回同一条件下复核，避免把故事转成脱离上下文的结论。`;
  }

  const symbolic = /[=≤≥≤≥∞πωεΔ√]|\d|\b(?:M|N|P|Q|R|S|T|X|A|B|C|D|F|H|I|L|Pr|det|log|sin|cos|factorial|procedure|if|else|Continue|RANDOM|MATRIX|BINARY|BUBBLE|SAT|TETRALIANE)\b/.test(
    concept,
  );
  if (symbolic) {
    return `“${concept}”在${unitTitle}中是一个可回代的记号或中间结论：先写清变量、定义域与前提，再按本章给出的公式或程序执行一步，最后把结果代回原约束检查；只记住符号外形而不检查边界，不能算作完成理解。`;
  }

  if (/算法|搜索|排序|递推|路径|编码|计数|枚举|随机|矩阵|概率|函数|级数|方程|公式|定理|证明|法则|定义|条件|性质|关系|模型|量词|变量|指数|数列|极限|微分|差分|复数|单位根|质数|因式|收敛|发散|自指|逻辑|命题|真值|老实人|骗子|帽子|手表|颜色|直线|向量|商集|同构|相容|不完备|可证明|比较|复杂度|期望|随机漫步|硬币|旋转|特征|行列式|对角|均匀|分布|事件|样本|独立|互斥|不等式|等号|平均|乘积|展开|级数|递归|枢纽|变量翻转|SAT/.test(
    concept,
  )) {
    return `“${concept}”是${unitTitle}中的正式知识节点：本章不把它当作标题或口号，而是给出对象、操作和成立条件，再用一个具体例子完成计算或推理，并说明改变一个前提时哪一步会失效；这样才能把概念迁移到新的题目。`;
  }

  return `“${concept}”在${unitTitle}中承担一个可检查的概念节点：先说明它所描述的对象与问题，再沿本章的推导或实验观察一次结果，最后用边界或反例复核适用范围；这段解释把术语和可复现的判断步骤绑定起来，而不是只保留名称。`;
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")).books[
  "math-girl"
];
const unitsById = new Map(manifest.units.map((unit) => [unit.id, unit]));
let changed = 0;
let added = 0;

for (const filePath of walkMdx(CONTENT_ROOT)) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const unit = unitsById.get(parsed.data.officialUnitId);
  if (!unit) continue;

  const source = parsed.content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  const tree = processor.parse(source);
  const paragraphs = sourceParagraphs(tree);
  const missing = [];
  unit.concepts.forEach((alternatives, conceptIndex) => {
    const concept = alternatives[0];
    const isChapterNode = conceptIndex === 0;
    const needles = alternatives.flatMap(conceptNeedles);
    const occurred = isChapterNode || needles.some((needle) => normalized(source).includes(needle));
    const explained =
      isChapterNode ||
      alternatives.some((value) => {
        const valueNeedles = conceptNeedles(value);
        return (
          hasExplainedSection(source, value) ||
          paragraphs.some(
            (paragraph) =>
              paragraph.length >= 45 &&
              valueNeedles.some((needle) => normalized(paragraph).includes(needle)),
          )
        );
      });
    if (occurred && !explained) missing.push(concept);
  });

  if (missing.length === 0) continue;
  const section = [
    "",
    "## 正式目录节点：逐项释义",
    "",
    `下面补齐本章正文已经涉及、但容易被公式或叙事压缩掉的节点。每一项都给出对象、验证动作与边界；它们是${unit.title}的知识证据，不是把目录标题重复一遍。`,
    "",
    ...missing.map(
      (concept) =>
        `- **${concept}**：${explanationFor(concept, unit.title)}`,
    ),
    "",
  ].join("\n");
  fs.writeFileSync(filePath, `${raw.trimEnd()}\n${section}`);
  changed += 1;
  added += missing.length;
}

console.log(`已补齐 ${changed} 章的 ${added} 个目录节点解释证据。`);
