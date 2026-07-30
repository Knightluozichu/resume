import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "competitive-algorithms";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/competitive-algorithms/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/competitive-algorithms-v2-profiles.json",
);

const SOURCES = {
  catalog: "https://www.tenlong.com.tw/products/9787522615059?list_name=rd",
  procurement:
    "https://zfcg.henan.gov.cn/cmsweb81e27e/nas/webfile2024//henan/rootfiles/2024/07/26/2f9f478cc1494af09a6cc32b574049b2.pdf",
  icpc: "https://icpc.global/worldfinals/rules/",
  cppDraft:
    "https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/n4950.pdf",
  reservoir: "https://doi.org/10.1145/3147.3165",
  search: "https://doi.org/10.1137/0201010",
  dynamicProgramming:
    "https://projecteuclid.org/journals/bulletin-of-the-american-mathematical-society/volume-60/issue-6/The-theory-of-dynamic-programming/bams/1183519147.full",
  strassen: "https://doi.org/10.1007/BF02165411",
};

const PATHS = {
  "cai-01": "00-foundations/01-welcome-to-algorithms",
  "cai-02": "01-strategies/02-exhaustive-and-greedy",
  "cai-03": "01-strategies/03-randomness",
  "cai-04": "02-search-dp/04-search-and-ai",
  "cai-05": "02-search-dp/05-dynamic-programming",
  "cai-06": "03-divide-conquer/06-divide-and-conquer",
};

const SCENARIOS = {
  "cai-01": {
    question:
      "怎样从题面约束、正确性合同和资源上限选择可提交的算法与 C++ 实现？",
    invariant:
      "算法对完整输入域终止并满足输出合同，时间、空间和数值范围不越过题目限制。",
    fault: "只用样例输出判断正确，却没有验证排列保持、边界输入和复杂度",
    technicalLabel: "ICPC 世界总决赛规则与 WG21 C++23 最终工作草案",
    technicalUrls: [SOURCES.icpc, SOURCES.cppDraft],
  },
  "cai-02": {
    question:
      "怎样区分可证明完整的穷举、具有交换论证的贪心与只在样例上成功的捷径？",
    invariant:
      "穷举覆盖所有候选且无重复遗漏，贪心选择具有可说明的安全性或明确反例边界。",
    fault: "看到局部收益最大就直接采用贪心，没有交换论证或最小反例搜索",
    technicalLabel: "WG21 C++23 最终工作草案中的算法与整数语义",
    technicalUrls: [SOURCES.cppDraft],
  },
  "cai-03": {
    question:
      "怎样同时记录随机算法的分布、种子、失败概率、期望成本和确定性验证？",
    invariant:
      "同一生成器状态可重放同一轨迹，随机性只影响已声明的时间或误差边界。",
    fault: "只记录最终随机结果，不保存生成器、种子、调用顺序和失败判据",
    technicalLabel: "Vitter 蓄水池抽样原始论文与 WG21 C++ 随机库草案",
    technicalUrls: [SOURCES.reservoir, SOURCES.cppDraft],
  },
  "cai-04": {
    question: "怎样从状态、动作、终止条件和剪枝安全性证明搜索既完整又可控？",
    invariant:
      "搜索状态唯一可解释，访问策略不会丢失可行解，深度和资源上限有显式退出。",
    fault: "把 visited 设得过粗，合并了未来选择不同的状态并错误剪掉答案",
    technicalLabel: "Tarjan 深度优先搜索原始论文",
    technicalUrls: [SOURCES.search],
  },
  "cai-05": {
    question: "怎样由最优子结构、状态定义、转移依赖和计算顺序构造动态规划？",
    invariant:
      "每个状态具有唯一语义，转移只读取已建立子问题并覆盖所有合法决策。",
    fault: "状态省略了影响未来决策的信息，使两个不同子问题被错误合并",
    technicalLabel: "Bellman 动态规划原始论文",
    technicalUrls: [SOURCES.dynamicProgramming],
  },
  "cai-06": {
    question: "怎样证明分解后的子问题、合并步骤、递归终止与复杂度递推都成立？",
    invariant:
      "子问题覆盖原问题且边界不重不漏，合并恢复完整合同，基例保证终止。",
    fault: "只计算递归子问题却遗漏跨分区贡献，使局部正确无法合成整体正确",
    technicalLabel: "Strassen 1969 年快速矩阵乘法原始论文",
    technicalUrls: [SOURCES.strassen],
  },
};

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function artifactFor(title) {
  return `${title}的题面摘要、约束表、输入生成器、算法伪码或代码版本、复杂度推导、正确性理由、最小反例、实际输出与资源统计。`;
}

function enrichProfile(profile) {
  const concepts = profile.concepts;
  const last = concepts.at(-1);
  return {
    ...profile,
    componentBase: `Cai${toPascal(path.basename(profile.chapterPath))}`,
    artifact: artifactFor(profile.title),
    constraints: [
      {
        label: `固定${concepts[0]}`,
        premise: `写出${concepts[0]}的输入域、输出合同、规模和数值范围。`,
        decision: `只比较能够完整覆盖${concepts[1] ?? concepts[0]}前提的候选策略。`,
        evidence: `保存${profile.title}的最小、边界与对抗输入。`,
      },
      {
        label: `验证${concepts[Math.min(2, concepts.length - 1)]}`,
        premise: `保持题面不变，逐步执行${concepts[Math.min(2, concepts.length - 1)]}。`,
        decision: `在第一处状态变化处核对不变量与终止度量。`,
        evidence: `记录“${profile.fault}”触发时的最小反例。`,
      },
      {
        label: `验收${last}`,
        premise: `覆盖正常、边界、错误和最大规模，恢复相同初值复跑。`,
        decision: `只有正确性与成本同时满足才接受${last}方案。`,
        evidence: `交付${artifactFor(profile.title)}`,
      },
    ],
    normalTrace: [
      `形式化${concepts[0]}的输入与输出`,
      `选择${concepts[1] ?? concepts[0]}并声明不变量`,
      `执行${concepts[Math.min(2, concepts.length - 1)]}并记录成本`,
      `用${last}核对正确性、终止和资源`,
    ],
    failureTrace: [
      `复用${profile.title}的相同题面与输入`,
      `仅注入错误策略：${profile.fault}`,
      `保存第一处错误决策与最小反例`,
      `拒绝用偶然样例通过替代完整证明`,
    ],
  };
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);

const profiles = previousManifest.units.map((unit) => {
  const chapterPath = PATHS[unit.id];
  const scenario = SCENARIOS[unit.id];
  if (!chapterPath || !scenario)
    throw new Error(`缺少 ${unit.id} 的路径或场景配置`);
  return enrichProfile({
    id: unit.id,
    role: "chapter",
    chapterPath,
    title: unit.title,
    concepts: unit.concepts.map((alternatives) => alternatives[0]),
    ...scenario,
  });
});

if (profiles.length !== 6) throw new Error("算法竞赛图解版必须恰好映射 6 章");

function objectivesBlock(profile) {
  return `{/* CAI_OBJECTIVES_V2_START */}
<Objectives>

- 能解释${profile.concepts[0]}与${profile.concepts[1] ?? profile.concepts[0]}在“${profile.title}”中的适用条件
- 能围绕“${profile.question}”运行正常与失败轨迹，定位第一处错误决策
- 能用“${profile.artifact}”证明“${profile.invariant}”

</Objectives>
{/* CAI_OBJECTIVES_V2_END */}`;
}

function sourceBlock(profile) {
  const technicalLinks = profile.technicalUrls
    .map((url, index) => `[技术来源 ${index + 1}](${url})`)
    .join("、");

  return `{/* CAI_SOURCE_V2_START */}
## 来源、目录与技术核对边界

“${profile.title}”以[天瓏书店详细书目与目录](${SOURCES.catalog})核对段忠杰、顾业鸣著、中国水利水电出版社、ISBN 9787522615059、245 页以及全书 6 章；该页标出版日期 2023 年 6 月 1 日。[河南省政府采购书目](${SOURCES.procurement})记录同一 ISBN、题名、作者和出版社，但出版时间写作 2023 年 5 月。日期口径相差一个月，本课程保留差异，不自行断言哪一天是正式首发日。

对“${profile.title}”而言，公开来源只提供书目和详细目录，不含可授权改写的完整正文；本站的解释、推导、代码、交互、练习和答案均为独立教学重写。目录页第 4 章和第 6 章标题存在明显 OCR 或排版异常，站内按上下文规范化标题，但在清单中披露校正。

“${profile.title}”的技术事实另以${profile.technicalLabel}复核：${technicalLinks}。来源用于检查概念、语言语义或历史算法边界，不把现代竞赛规则静默投射成 2023 年原书的逐字内容。

围绕“${profile.question}”，先预测正确轨迹，再只注入“${profile.fault}”。若不能用最小反例定位第一处错误决策，就拒绝当前算法解释。
{/* CAI_SOURCE_V2_END */}`;
}

function evidenceBlock(profile) {
  const conceptRows = profile.concepts
    .map(
      (concept, index) =>
        `- <Term def="在“${profile.title}”中，${concept}必须连接问题约束、算法决策、正确性与成本证据。">${concept}</Term>：第 ${index + 1} 个正式节点要能回到“${profile.invariant}”，并给出成功输入与失败反例。`,
    )
    .join("\n");

  return `{/* CAI_EVIDENCE_V2_START */}
## 正式节点与算法证据

${conceptRows}

<Callout type="trap" title="反例边界：${profile.fault}">
  在“${profile.title}”中，这个策略会破坏“${profile.invariant}”。保持题面与输入不变，只切换错误策略；找到第一处决策分岔后重置三个交互，再复跑正常路径。
</Callout>

<${profile.componentBase}ConstraintMapLab />

<${profile.componentBase}ExecutionTraceLab />

<${profile.componentBase}CounterexampleLab />
{/* CAI_EVIDENCE_V2_END */}

`;
}

function practiceBlock(profile) {
  const concepts = profile.concepts.join("、");
  const glossary = profile.concepts
    .map(
      (concept) =>
        `  <GlossaryItem term="${concept}">“${profile.title}”中的正式节点；需要同时说明前提、决策、正确性理由与成本边界。</GlossaryItem>`,
    )
    .join("\n");

  return `{/* CAI_PRACTICE_V2_START */}
## 练习与答案

<Exercises>
  1. **问题 1：建立算法合同。** 回答“${profile.question}”，并写出约束、决策、不变量和验收结果。

  <Answer question="怎样建立“${profile.title}”的算法合同？">先固定${profile.concepts[0]}的输入域与输出，再说明${profile.concepts[1] ?? profile.concepts[0]}为何适用；执行${profile.concepts[Math.min(2, profile.concepts.length - 1)]}时逐步核对不变量，最后用${profile.concepts.at(-1)}验证“${profile.invariant}”。样例、边界与最大规模必须使用同一合同。</Answer>

  2. **问题 2：构造最小反例。** 只采用“${profile.fault}”，怎样确认失败来自算法而不是实现噪声？

  <Answer question="“${profile.title}”的错误策略怎样用反例定位？">复用问题 1 的题面、输入和实现版本，只切换错误策略；缩小到仍能触发失败的最小输入，比较两条轨迹的第一处不同决策。若修正该决策后反例和回归集都通过，才把它列为根因。</Answer>

  3. **问题 3：覆盖正式节点。** 用一个证据包串联${concepts}，并解释为什么复杂度更低不必然在给定规模上更快。

  <Answer question="“${profile.title}”应交付哪些复核材料？">${profile.artifact}证据包逐项标记${concepts}的位置，并分别保存渐近成本、常数、输入规模和实测资源。复杂度描述增长趋势，给定机器上的实际时间还受常数、缓存、分支和实现影响，因此两类证据不能互相替代。</Answer>
</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="《深入浅出算法竞赛（图解版）》"
  adaptedUrl="${SOURCES.catalog}"
/>
{/* CAI_PRACTICE_V2_END */}`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    constraints: profile.constraints,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
  };

  return `"use client";

import {
  CompetitionEvidenceLab,
  type CompetitionEvidenceModel,
} from "./competition-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies CompetitionEvidenceModel;

export function ${profile.componentBase}ConstraintMapLab() {
  return <CompetitionEvidenceLab model={model} view="constraint-map" />;
}

export function ${profile.componentBase}ExecutionTraceLab() {
  return <CompetitionEvidenceLab model={model} view="execution-trace" />;
}

export function ${profile.componentBase}CounterexampleLab() {
  return <CompetitionEvidenceLab model={model} view="counterexample" />;
}
`;
}

function stripManaged(body) {
  return body
    .replace(
      /\{\/\* CAI_OBJECTIVES_V2_START \*\/\}[\s\S]*?\{\/\* CAI_OBJECTIVES_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* CAI_SOURCE_V2_START \*\/\}[\s\S]*?\{\/\* CAI_SOURCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* CAI_EVIDENCE_V2_START \*\/\}[\s\S]*?\{\/\* CAI_EVIDENCE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /\{\/\* CAI_PRACTICE_V2_START \*\/\}[\s\S]*?\{\/\* CAI_PRACTICE_V2_END \*\/\}\s*/g,
      "",
    )
    .replace(
      /^import \{ Objectives \} from "@\/components\/mdx\/objectives";\s*$/gm,
      "",
    )
    .replace(/^import \{ Term \} from "@\/components\/mdx\/term";\s*$/gm, "")
    .replace(
      /^import \{ Callout \} from "@\/components\/mdx\/callout";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Answer, Exercises \} from "@\/components\/mdx\/exercises";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Glossary, GlossaryItem \} from "@\/components\/mdx\/glossary";\s*$/gm,
      "",
    )
    .replace(
      /^import \{ Attribution \} from "@\/components\/mdx\/attribution";\s*$/gm,
      "",
    )
    .replace(
      /^import \{\s*(?:[A-Za-z0-9_]+,?\s*)+\} from "@\/components\/mdx\/competitive-algorithms\/v2\/[^"]+";\s*/gm,
      "",
    );
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);

  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const stripped = stripManaged(parsed.content).trim();
  const firstHeading = stripped.search(/^## /m);
  if (firstHeading < 0) throw new Error(`缺少正文标题：${profile.chapterPath}`);
  const existingImports = stripped.slice(0, firstHeading).trim();
  const prose = stripped.slice(firstHeading).trim();

  const wrapperImport = `import { ${profile.componentBase}ConstraintMapLab, ${profile.componentBase}ExecutionTraceLab, ${profile.componentBase}CounterexampleLab } from "@/components/mdx/competitive-algorithms/v2/${path.basename(profile.chapterPath)}";`;
  const imports = `import { Objectives } from "@/components/mdx/objectives";
import { Term } from "@/components/mdx/term";
import { Callout } from "@/components/mdx/callout";
import { Answer, Exercises } from "@/components/mdx/exercises";
import { Glossary, GlossaryItem } from "@/components/mdx/glossary";
import { Attribution } from "@/components/mdx/attribution";
${wrapperImport}`;

  let body = `${existingImports ? `${existingImports}\n` : ""}${imports}

${objectivesBlock(profile)}

${sourceBlock(profile)}

${prose}`;

  const summaryPattern = /^## 小结$/m;
  if (!summaryPattern.test(body))
    throw new Error(`缺少小结：${profile.chapterPath}`);
  body = body.replace(summaryPattern, `${evidenceBlock(profile)}$&`);
  body = `${body.trim()}

${practiceBlock(profile)}
`;

  const data = {
    ...parsed.data,
    title: profile.title,
    demo: true,
    sourceUrl: SOURCES.catalog,
    qualityVersion: 2,
    practiceMode: "calculation",
    sourceMode: "independent-rewrite",
    officialUnitId: profile.id,
  };

  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${path.basename(profile.chapterPath)}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

const units = previousManifest.units.map((unit) => {
  const profile = profiles.find((candidate) => candidate.id === unit.id);
  if (!profile) throw new Error(`清单存在未映射单元：${unit.id}`);
  return {
    ...unit,
    chapterPath: profile.chapterPath,
  };
});

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "《深入浅出算法竞赛（图解版）》，段忠杰、顾业鸣，中国水利水电出版社，ISBN 9787522615059，245页；书店标2023年6月1日，政府采购书目标2023年5月",
  sourceKind:
    "bookseller-detailed-six-chapter-toc-government-procurement-metadata-and-primary-technical-sources",
  sourceUrl: SOURCES.catalog,
  secondarySourceUrls: [
    SOURCES.procurement,
    SOURCES.icpc,
    SOURCES.cppDraft,
    SOURCES.reservoir,
    SOURCES.search,
    SOURCES.dynamicProgramming,
    SOURCES.strassen,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "天瓏书店页确认作者、出版社、ISBN、245页和6章详细目录，出版日期标2023-06-01；河南省政府采购书目对同一ISBN记录2023.05，日期口径相差一个月。目录页第4章出现“A；”、第6章出现“一分治”等明显OCR或排版异常，站内按上下文规范化但不改动6章分母。",
  units,
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/competitive-algorithms-v2-profiles.json",
  factSourcePolicy:
    "书目与目录只核定6章范围；C++语义、随机抽样、深度优先搜索、动态规划与Strassen算法分别以WG21材料和原始论文核对。课程推导、代码、交互、练习与答案独立编写。",
};
fs.writeFileSync(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSource: SOURCES.catalog,
      metadataSource: SOURCES.procurement,
      officialUnits: 6,
      teachingConceptMappings: profiles.reduce(
        (sum, profile) => sum + profile.concepts.length,
        0,
      ),
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        officialUnitId: profile.id,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
        technicalSources: profile.technicalUrls,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已增强 ${profiles.length} 页，映射 ${profiles.reduce((sum, profile) => sum + profile.concepts.length, 0)} 个教学概念，生成 ${profiles.length * 3} 个交互视图。`,
);
