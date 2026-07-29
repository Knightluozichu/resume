#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "advanced-algorithm-engineering";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/advanced-algorithm-engineering-v2-profiles.json",
);
const OFFICIAL_BOOK =
  "https://www.cambridge.org/core/books/pearls-of-algorithm-engineering/95061352D7263CCCBD4F243018236EB2";
const OFFICIAL_CONTENTS =
  "https://www.cambridge.org/core/books/pearls-of-algorithm-engineering/contents/6F143C716C0C559D0B34275914BC5858";
const OFFICIAL_FRONTMATTER =
  "https://assets.cambridge.org/97810091/23280/frontmatter/9781009123280_frontmatter.pdf";

const PAGES = [
  {
    id: "pae-01",
    path: "00-foundations/introduction",
    officialTitle: "1 Introduction",
    focus: "把 RAM 步数、存储层次与块传输放进同一成本判断",
    formula: "Scan(N) = ceil(N / B)",
    invariant: "相同输入与结果必须同时报告 CPU 工作量、传输次数和访问局部性",
    fault: "把每次内存访问都当作相同成本，掩盖随机 I/O 与顺序扫描的差异",
    evidence: "输入规模、M/B、访问序列、块传输计数、运行时间与结果校验",
    subtopics: [],
  },
  {
    id: "pae-02",
    path: "00-foundations/warm-up",
    officialTitle: "2 A Warm-up",
    focus: "用最大子数组和比较从三次方到线性时间的逐步消元",
    formula: "bestEnding(i) = max(a[i], bestEnding(i-1) + a[i])",
    invariant: "任意输入都要返回同一最优区间、端点与和，并与穷举预言机一致",
    fault: "把初值固定为 0，导致全负数组错误地返回空区间",
    evidence: "输入数组、候选端点、前缀和、最优值、穷举结果与操作计数",
    subtopics: [
      "2.1 A Cubic-Time Algorithm",
      "2.2 A Quadratic-Time Algorithm",
      "2.3 A Linear-Time Algorithm",
      "2.4 Another Linear-Time Algorithm",
      "2.5 A Few Interesting Variants∞",
    ],
  },
  {
    id: "pae-03",
    path: "01-randomization-parallel/random-sampling",
    officialTitle: "3 Random Sampling",
    focus: "在磁盘、已知长度流和未知长度流中保持等概率抽样合同",
    formula: "P(item i is retained after n arrivals) = m / n",
    invariant: "每个合法元素的入样概率只由 m 与 n 决定，不依赖到达位置",
    fault: "用有偏取模或错误的替换边界，让早到或晚到元素获得额外概率",
    evidence: "随机种子、到达序号、抽样决策、频数分布、置信区间与磁盘读写",
    subtopics: [
      "3.1 Disk Model and Known Sequence Length",
      "3.2 Streaming Model and Known Sequence Length",
      "3.3 Streaming Model and Unknown Sequence Length",
    ],
  },
  {
    id: "pae-04",
    path: "01-randomization-parallel/list-ranking",
    officialTitle: "4 List Ranking",
    focus: "把链式随机访问改写为指针跳跃、排序扫描与分治收缩",
    formula: "rounds = ceil(log2(n))",
    invariant: "每个节点的最终 rank 等于到链尾的真实距离且节点集合不丢失",
    fault: "同一轮原地更新 successor 与 rank，混用新旧状态破坏并行轮次语义",
    evidence:
      "节点 id、successor、每轮 rank、收缩集合、排序/扫描次数与串行预言机",
    subtopics: [
      "4.1 The Pointer-Jumping Technique",
      "4.2 Parallel Algorithm Simulation in a Two-Level Memory",
      "4.3 A Divide-and-Conquer Approach",
    ],
  },
  {
    id: "pae-05",
    path: "02-sorting-search/sorting-atomic-items",
    officialTitle: "5 Sorting Atomic Items",
    focus: "比较归并、分布式排序、下界与多磁盘 I/O 组织",
    formula: "Sort(N) = Theta((N/B) log_(M/B)(N/B))",
    invariant: "输出全序、元素多重集不变，且每轮归并的输入缓冲与输出缓冲不超 M",
    fault: "归并扇入超过可用缓冲页，模型声称的顺序 I/O 在实现中退化为抖动",
    evidence: "初始 runs、扇入、M/B、比较数、块读写、校验和与排序预言机",
    subtopics: [
      "5.1 The Merge-Based Sorting Paradigm",
      "5.2 Lower Bounds",
      "5.3 The Distribution-Based Sorting Paradigm",
      "5.4 Sorting With Multi-Disks∞",
    ],
  },
  {
    id: "pae-06",
    path: "02-sorting-search/set-intersection",
    officialTitle: "6 Set Intersection",
    focus: "根据集合规模比在归并、相互分割、倍增搜索与块索引间切换",
    formula: "work = O(m log(n/m))，m ≤ n",
    invariant: "结果只包含两边共有元素，保持排序并明确集合与多重集合语义",
    fault: "忽略重复键或越过倍增搜索边界，产生漏报、重复输出或越界访问",
    evidence: "两表长度、探测位置、分割点、比较次数、块访问与朴素求交结果",
    subtopics: [
      "6.1 Merge-Based Approach",
      "6.2 Mutual Partitioning",
      "6.3 Doubling Search",
      "6.4 Two-Level Storage Approach",
    ],
  },
  {
    id: "pae-07",
    path: "02-sorting-search/sorting-strings",
    officialTitle: "7 Sorting Strings",
    focus: "用区分前缀、基数分桶与多关键字快速排序减少字符检查",
    formula: "character work = Theta(D + n log n)",
    invariant: "输出按声明字符序全序排列，公共前缀只在必要的递归层重新读取",
    fault: "终止符、字符编码或稳定性约定不一致，前缀串与长串次序被颠倒",
    evidence: "字符串集合、区分前缀 D、字符探测、桶边界、递归轨迹与排序预言机",
    subtopics: [
      "7.1 A Lower Bound",
      "7.2 RADIXSORT",
      "7.3 Multi-key QUICKSORT",
      "7.4 Some Observations on the Two-Level Memory Model∞",
    ],
  },
  {
    id: "pae-08",
    path: "02-sorting-search/dictionary-problem",
    officialTitle: "8 The Dictionary Problem",
    focus: "比较直接寻址、通用/完美哈希、布谷鸟哈希与布隆过滤器的保证",
    formula: "Bloom FPR ≈ (1 - exp(-k n / m))^k",
    invariant: "已插入键不能假阴性；误报、空间与更新保证必须与所选结构一致",
    fault: "复用相关哈希或超过设计负载仍声称常数最坏时间与目标误报率",
    evidence: "键集、哈希种子、负载因子、逐出路径、位图占用、误报率与真值表",
    subtopics: [
      "8.1 Direct-Address Tables",
      "8.2 Hash Tables",
      "8.3 Universal Hashing",
      "8.4 A Simple (Static) Perfect Hash Table",
      "8.5 Cuckoo Hashing",
      "8.6 More on Static and Perfect Hashing: Minimal and Ordered",
      "8.7 Bloom Filters",
    ],
  },
  {
    id: "pae-09",
    path: "02-sorting-search/searching-strings-by-prefix",
    officialTitle: "9 Searching Strings by Prefix",
    focus: "在前端编码、插值搜索、压缩 Trie 与 Patricia 树间组织前缀查询",
    formula: "query = O(|prefix| + output)",
    invariant: "返回且只返回具有给定前缀的连续词典区间，并限制解码依赖",
    fault: "从非锚点随机解码 front-coded 字符串，导致错误候选或隐藏线性回溯",
    evidence: "词典版本、锚点、LCP、区间边界、解码链、页轨迹与朴素扫描结果",
    subtopics: [
      "9.1 Array of String Pointers",
      "9.2 Locality-Preserving Front Coding∞",
      "9.3 Interpolation Search",
      "9.4 Compacted Trie",
      "9.5 Patricia Trie",
      "9.6 Managing Huge Dictionaries∞",
    ],
  },
  {
    id: "pae-10",
    path: "02-sorting-search/searching-strings-by-substring",
    officialTitle: "10 Searching Strings by Substring",
    focus: "用后缀数组、LCP 与后缀树把子串查询变成有序区间定位",
    formula: "suffix-array query = O(m log n + occ)",
    invariant: "所有后缀恰出现一次并保持词典序，查询区间与朴素匹配结果一致",
    fault: "遗漏唯一终止符或混淆 LCP 下标，使构造、比较与区间边界不一致",
    evidence: "文本 hash、SA、LCP、比较区间、匹配位置、构造阶段与朴素预言机",
    subtopics: [
      "10.1 Notation and Terminology",
      "10.2 The Suffix Array",
      "10.3 The Suffix Tree",
      "10.4 Some Interesting Problems",
    ],
  },
  {
    id: "pae-11",
    path: "03-compression/integer-coding",
    officialTitle: "11 Integer Coding",
    focus: "按整数分布、单调性与查询需求选择自定界和块级编码",
    formula: "Elias-Fano ≤ n ceil(log2(U/n)) + 2n bits",
    invariant: "编码可唯一解码，整数域与零值约定明确，round-trip 保持完整序列",
    fault: "把只支持正整数的码直接用于零或在差分时溢出，破坏码流边界",
    evidence: "输入域、参数、逐项码字、位偏移、总位数、解码序列与边界样例",
    subtopics: [
      "11.1 Elias Codes: γ and δ",
      "11.2 Rice Code",
      "11.3 PForDelta Code",
      "11.4 Variable-Byte Code and (s, c)-Dense Codes",
      "11.5 Interpolative Code",
      "11.6 Elias–Fano Code",
    ],
  },
  {
    id: "pae-12",
    path: "03-compression/statistical-coding",
    officialTitle: "12 Statistical Coding",
    focus: "从频率模型推导 Huffman、算术编码与 PPM 的码长和状态",
    formula: "H0 = -sum_x p(x) log2 p(x)",
    invariant: "编码器与解码器使用同一概率模型，码流可逆且码长与模型预测可核对",
    fault: "更新频率的时点不同，导致算术区间或 PPM escape 状态在两端分叉",
    evidence: "符号频率、码长/区间、重归一化事件、escape、总位数与 round-trip",
    subtopics: [
      "12.1 Huffman Coding",
      "12.2 Arithmetic Coding",
      "12.3 Prediction by Partial Matching∞",
    ],
  },
  {
    id: "pae-13",
    path: "03-compression/dictionary-based-compressors",
    officialTitle: "13 Dictionary-Based Compressors",
    focus: "比较 LZ77、LZ78 与 LZW 的窗口、短语字典和解码同步",
    formula: "LZ77 token = (distance, length, next-symbol)",
    invariant: "token 流在声明的窗口与字典规则下唯一恢复原始字节序列",
    fault: "复制重叠 match 时先缓存源片段，错误地禁止新输出继续成为复制源",
    evidence: "输入 hash、窗口、匹配、token、字典新增、输出位置与 round-trip",
    subtopics: [
      "13.1 LZ77",
      "13.2 LZ78",
      "13.3 LZW",
      "13.4 On the Optimality of Compressors∞",
    ],
  },
  {
    id: "pae-14",
    path: "03-compression/block-sorting-compression",
    officialTitle: "14 Block-Sorting Compression",
    focus: "跟踪 BWT、MTF、RLE 与熵编码如何逐层改变局部统计",
    formula: "LF(i) = C[L[i]] + Occ(L[i], i)",
    invariant: "变换携带足够的 primary/sentinel 信息并能逐字节逆变换",
    fault: "丢失 primary index 或对相同字符使用不稳定次序，使 LF 环无法闭合",
    evidence: "旋转/后缀次序、L 列、primary、Occ、MTF/RLE 流与逆变换结果",
    subtopics: [
      "14.1 The Burrows–Wheeler Transform",
      "14.2 Two Other Simple Transforms",
      "14.3 The bzip Compressor",
      "14.4 On Compression Boosting∞",
      "14.5 On Compressed Indexing∞",
    ],
  },
  {
    id: "pae-15",
    path: "04-succinct/compressed-data-structures",
    officialTitle: "15 Compressed Data Structures",
    focus: "在压缩空间内支持 bitvector、树和图的导航与查询",
    formula: "rank1(select1(j)) = j",
    invariant:
      "压缩表示、rank/select 与朴素结构回答相同，并单独报告辅助索引空间",
    fault: "混用 0/1 起始下标或闭开区间，令 rank/select 的互逆关系偏移一位",
    evidence: "原始结构、压缩位串、辅助表、查询序列、空间位数与朴素预言机",
    subtopics: [
      "15.1 Compressed Representation of (Binary) Arrays",
      "15.2 Succinct Representation of Trees",
      "15.3 Succinct Representation of Graphs",
    ],
  },
  {
    id: "pae-16",
    path: "05-conclusion/conclusion",
    officialTitle: "16 Conclusion",
    focus: "把模型、算法、实现、实验与可证伪结论闭合为算法工程循环",
    formula: "T_total = T_cpu + Q * L_io + C_build",
    invariant: "选择理由必须绑定工作负载、机器、成本模型、正确性与可重复基准",
    fault: "只优化单次吞吐或平均值，却改变输入分布、预处理成本或结果语义",
    evidence: "版本、数据集、机器、参数、成本预测、基准分布、残差与恢复记录",
    subtopics: [],
  },
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function officialMapping(profile) {
  const items =
    profile.subtopics.length > 0
      ? profile.subtopics
          .map(
            (subtopic) =>
              `- **${subtopic}**：在本页正文中以“${profile.focus}”的对象、状态、复杂度或工程边界核对。`,
          )
          .join("\n")
      : `- **${profile.officialTitle}**：本章在官方目录中没有编号小节；本页以“${profile.focus}”保持该章边界。`;

  return `## 来源、版次与独立重写边界

“${profile.officialTitle}”对应 Paolo Ferragina 的 *Pearls of Algorithm Engineering*（Cambridge University Press，2023）。[出版社书籍页](${OFFICIAL_BOOK})确认作者、版次、ISBN、318页与算法工程定位；[官方目录页](${OFFICIAL_CONTENTS})和[官方前置信息 PDF](${OFFICIAL_FRONTMATTER})共同给出16章、61个编号节与索引的正式顺序。

对“${profile.officialTitle}”而言，当前公开可核验材料是出版社目录、前言与书籍说明，并非获授权完整正文。因此，下方中文讲解、公式推导、代码和实验是按公开目录坐标进行的独立教学重写，不声称逐段翻译原书；涉及“${profile.focus}”的结论必须由本页的最小输入、预言机与成本记录重新证明。

### 官方目录坐标：${profile.officialTitle}

${items}`;
}

function objectives(profile) {
  const coordinates =
    profile.subtopics.length > 0
      ? profile.subtopics
          .map((item) => item.split(" ").slice(1).join(" "))
          .join("、")
      : profile.officialTitle;
  return `<Objectives>

- 能解释“${profile.officialTitle}”如何${profile.focus}
- 能逐项核对${coordinates}，不把平台页数或相邻章节主题冒充原版目录
- 能固定输入和参数，按“${profile.formula}”手算一个最小样例，并找到输出或成本的首个分叉
- 能注入“${profile.fault}”，保存基线、故障、恢复和同输入重放证据

</Objectives>`;
}

function experiments(profile, componentBase) {
  return `## 先预测，再操作三个章专属实验

<Stepper>
  <Step title="1. 成本模型与工作集">
    在“${profile.officialTitle}”中先预测层级和访问模式如何改变“${profile.formula}”，再切换工作集与局部性；最终结果相同不代表代价相同。

    <${componentBase}CostLab />

  </Step>
  <Step title="2. 状态、传输与正式节点">
    沿“${profile.officialTitle}”的官方目录坐标逐步推进，保存${profile.evidence}。

    <${componentBase}TraceLab />

  </Step>
  <Step title="3. 单变量故障与恢复">
    固定输入后注入“${profile.fault}”，定位首个分叉，撤销后以同一输入重放。

    <${componentBase}EvidenceLab />

  </Step>
</Stepper>

## 可重放工程合同

<Callout type="trap" title="本章首要反例">
  ${profile.fault}。这会破坏“${profile.invariant}”；应先从${profile.evidence}定位，不能用最终输出或一次耗时掩盖。
</Callout>

<Callout type="trap" title="成本模型也有适用域">
  “${profile.officialTitle}”中的“${profile.formula}”只在本页声明的输入、存储与操作单位下成立。若工作集、块大小、字符模型或预处理边界变化，必须重新推导“${profile.focus}”的成本，不能沿用旧数字。
</Callout>

<Callout type="trap" title="一次基准不是工程结论">
  对“${profile.officialTitle}”只报告最快一次运行，会隐藏预热、随机种子、尾延迟与“${profile.fault}”。交付时必须同时保存${profile.evidence}，并解释预测与实测的残差。
</Callout>

“${profile.officialTitle}”的实验必须保留：${profile.evidence}。本章性能数据至少预热一次、重复多次并报告分布；正确性必须与独立预言机比较，不能只比较两个共享同一错误的优化实现。

## 练习与答案

<Exercises>

**问题 1：正式目录。** “${profile.officialTitle}”的公开目录边界是什么，平台如何证明没有把其他章主题混入？

<Answer>
  对“${profile.officialTitle}”，以 Cambridge 官方目录和前置信息为分母，逐项映射本页标题与${profile.subtopics.length || 1}个${profile.subtopics.length ? "编号节" : "章级单元"}。当前只有 outline-only 访问，因此本页必须标为独立重写，不能声称复刻原书段落。
</Answer>

**问题 2：最小反例。** 怎样验证“${profile.formula}”不是只写在页面上的公式？

<Answer>
  先固定一个可手算输入，记录${profile.evidence}；再只改变一个规模、布局或算法参数。若手算、实现和独立预言机的方向或边界不一致，先拒绝性能结论。
</Answer>

**问题 3：恢复证据。** 怎样证明“${profile.fault}”已经修复？

<Answer>
  为“${profile.officialTitle}”保存正常基线，注入“${profile.fault}”并标记首个不同状态；撤销后用完全相同的输入、随机种子、机器与参数重放。只有${profile.evidence}重新一致，修复才可交接。
</Answer>

</Exercises>`;
}

function wrapperSource(profile, componentBase) {
  const model = {
    title: profile.officialTitle,
    focus: profile.focus,
    formula: profile.formula,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    stages:
      profile.subtopics.length > 0
        ? profile.subtopics.map((item) => item.replace(/^\d+(?:\.\d+)?\s+/, ""))
        : ["问题合同", "成本模型", "实现", "实验", "复核"],
  };
  return `"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies AlgorithmEngineeringModel;

export function ${componentBase}CostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function ${componentBase}TraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function ${componentBase}EvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
`;
}

function remediatePage(profile) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const componentImport = `import { ${componentBase}CostLab, ${componentBase}TraceLab, ${componentBase}EvidenceLab } from "@/components/mdx/${BOOK}/v2/${slug}";`;
  const sharedImport = `import {
  Objectives,
  Callout,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";`;
  let body = parsed.content.trim();

  if (!body.includes("ADVANCED_ALGORITHM_ENGINEERING_QUALITY_V2")) {
    const original = body
      .replaceAll("（）", "")
      .replaceAll("原章定理12.3", "标准算术编码界")
      .replaceAll("原章", "本页")
      .replaceAll("原书", "本课程")
      .replace("## 本页延伸", "## 独立教学延伸");
    const experimentBlock = experiments(profile, componentBase);
    if (!original.includes("\n## 本章回顾")) {
      throw new Error(`缺少“本章回顾”插入点：${profile.path}`);
    }
    body = `${componentImport}
${sharedImport}

${objectives(profile)}

{/* ADVANCED_ALGORITHM_ENGINEERING_QUALITY_V2 */}

${officialMapping(profile)}

${original.replace("\n## 本章回顾", `\n${experimentBlock}\n\n## 本章回顾`)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="Pearls of Algorithm Engineering"
  adaptedUrl="${OFFICIAL_BOOK}"
/>`;
  } else {
    body = body
      .replace(/<Objectives>[\s\S]*?<\/Objectives>/, objectives(profile))
      .replace(
        /## 来源、版次与独立重写边界[\s\S]*?(?=\n## 从)/,
        officialMapping(profile),
      )
      .replace(
        /## 先预测，再操作三个章专属实验[\s\S]*?<\/Exercises>/,
        experiments(profile, componentBase),
      );
  }

  const frontmatter = {
    ...parsed.data,
    sourceUrl: OFFICIAL_BOOK,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
    officialUnitId: profile.id,
  };
  fs.writeFileSync(filePath, matter.stringify(body, frontmatter));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile, componentBase),
  );
}

function updateManifest() {
  const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const formalNodeCount = PAGES.reduce(
    (sum, page) => sum + 1 + page.subtopics.length,
    0,
  );
  document.books ??= {};
  document.books[BOOK] = {
    version: 2,
    edition:
      "Pearls of Algorithm Engineering (Paolo Ferragina, Cambridge University Press, 2023, ISBN 9781009123280)",
    status: "verified-outline",
    sourceUrl: OFFICIAL_FRONTMATTER,
    sourceKind: "official-publisher-table-of-contents",
    sourceAccess: "outline-only",
    sourceMode: "independent-rewrite",
    defaultSourceMode: "independent-rewrite",
    verifiedAt: "2026-07-30",
    disclosureNote:
      "公开可核验范围为出版社目录、前言和书籍说明；中文正文、代码与实验为独立教学重写，不声称逐段翻译原书。",
    unitMappingEvidence:
      "quality/advanced-algorithm-engineering-v2-profiles.json",
    factSourcePolicy:
      "目录只限定章与编号节范围；技术结论须由最小实验、预言机与成本记录独立复核。",
    factSources: [
      {
        id: "cambridge-book",
        title: "Cambridge official book page",
        url: OFFICIAL_BOOK,
      },
      {
        id: "cambridge-contents",
        title: "Cambridge official contents",
        url: OFFICIAL_CONTENTS,
      },
      {
        id: "cambridge-frontmatter",
        title: "Cambridge official frontmatter",
        url: OFFICIAL_FRONTMATTER,
      },
    ],
    coverage: {
      formalNodes: formalNodeCount,
      mappedNodes: formalNodeCount,
      ratio: 1,
      chapterPages: PAGES.length,
      indexTreatedAsReferenceMatter: true,
    },
    metrics: {
      officialChapters: 16,
      officialNumberedSections: 61,
      platformPages: 16,
      interactiveViews: 48,
    },
    visualImplementation: {
      viewsPerPage: 3,
      modes: ["cost", "trace", "evidence"],
      sharedComponent:
        "src/components/mdx/advanced-algorithm-engineering/v2/official-algorithm-engineering-lab.tsx",
    },
    units: PAGES.map((page) => ({
      id: page.id,
      title: page.officialTitle,
      chapterPath: page.path,
      concepts: [
        [page.officialTitle],
        ...page.subtopics.map((subtopic) => [subtopic]),
      ],
      factSourceIds: [
        "cambridge-book",
        "cambridge-contents",
        "cambridge-frontmatter",
      ],
    })),
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(document, null, 2)}\n`);
  fs.writeFileSync(
    PROFILE_PATH,
    `${JSON.stringify(
      {
        version: 2,
        book: BOOK,
        sourceAccess: "outline-only",
        officialChapters: 16,
        officialNumberedSections: 61,
        formalNodes: formalNodeCount,
        pages: PAGES,
      },
      null,
      2,
    )}\n`,
  );
}

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const profile of PAGES) remediatePage(profile);
updateManifest();

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: PAGES.length,
      formalNodes: PAGES.reduce(
        (sum, page) => sum + 1 + page.subtopics.length,
        0,
      ),
      visualViews: PAGES.length * 3,
    },
    null,
    2,
  ),
);
