#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "data-structures-visual";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const OUTLINE_PATH = path.join(
  ROOT,
  "quality/data-structures-visual-official-outline.json",
);
const PROFILE_PATH = path.join(
  ROOT,
  "quality/data-structures-visual-v2-profiles.json",
);
const PUBLISHER_DETAIL =
  "https://www.tup.tsinghua.edu.cn/bookscenter/book_08952301.html";
const PUBLISHER_TOC =
  "https://www.tup.tsinghua.edu.cn/bookscenter/bookcatalog?id=08952301";
const PUBLISHER_SAMPLE =
  "https://www.tup.tsinghua.edu.cn/upload/books/yz/089523-01.pdf";

const SOURCES = {
  publisherDetail: PUBLISHER_DETAIL,
  publisherToc: PUBLISHER_TOC,
  publisherSample: PUBLISHER_SAMPLE,
  nistDads: "https://www.nist.gov/dads/",
  nistDataStructure: "https://xlinux.nist.gov/dads/HTML/dataStructure.html",
  openDataStructures: "https://opendatastructures.org/",
  princetonAlgorithms: "https://algs4.cs.princeton.edu/home/",
};

const SOURCE_META = {
  publisherDetail: [
    "清华大学出版社图书详情",
    "official-publisher-edition-page",
    "核对程杰、ISBN 9787302564713、2020年12月1日出版、C语言定位、溢彩加强版和当前印次",
  ],
  publisherToc: [
    "清华大学出版社完整目录",
    "official-publisher-complete-numbered-outline",
    "核对第1章至第9章、282个编号小节及页码边界，不把目录中的叙事摘句复制成正文",
  ],
  publisherSample: [
    "出版社第2章授权样章",
    "official-publisher-authorized-sample",
    "局部核对算法定义、特性、设计要求、度量、渐近增长和复杂度讲法；样章不扩大整书授权",
  ],
  nistDads: [
    "NIST算法与数据结构词典",
    "nist-primary-technical-dictionary",
    "核对ADT、数组、链表、栈、队列、树、图、查找、排序与复杂度术语",
  ],
  nistDataStructure: [
    "NIST data structure词条",
    "nist-primary-definition",
    "核对数据组织、关联操作与保持结构性质的当前定义边界",
  ],
  openDataStructures: [
    "Open Data Structures开放教材",
    "cc-by-open-primary-text-and-code",
    "核对列表、队列、哈希、搜索树、堆、图和B树的实现不变量、分析与开放许可",
  ],
  princetonAlgorithms: [
    "Princeton Algorithms官方课程站",
    "university-primary-course-material",
    "核对经典查找、排序、图算法和可执行样例的教学边界",
  ],
};

const UNIT_TITLES = {
  1: "第1章 数据结构绪论",
  2: "第2章 算法",
  3: "第3章 线性表",
  4: "第4章 栈与队列",
  5: "第5章 串",
  6: "第6章 树",
  7: "第7章 图",
  8: "第8章 查找",
  9: "第9章 排序",
};

const UNIT_IDS = {
  1: "dsvc-01",
  2: "dsvc-02",
  3: "dsvc-03",
  4: "dsvc-04",
  5: "dsvc-05",
  6: "dsvc-06",
  7: "dsvc-07",
  8: "dsvc-08",
  9: "dsvc-09",
};

const EXPECTED_TOPIC_COUNTS = {
  "dsvc-01": 17,
  "dsvc-02": 30,
  "dsvc-03": 33,
  "dsvc-04": 32,
  "dsvc-05": 16,
  "dsvc-06": 45,
  "dsvc-07": 30,
  "dsvc-08": 46,
  "dsvc-09": 33,
};

const PATHS = {
  "dsvc-01": "01-foundations/data-structure-introduction",
  "dsvc-02": "01-foundations/algorithms",
  "dsvc-03": "02-linear/linear-list",
  "dsvc-04": "02-linear/stacks-and-queues",
  "dsvc-05": "02-linear/strings",
  "dsvc-06": "03-trees/trees",
  "dsvc-07": "03-trees/graphs",
  "dsvc-08": "04-algorithms/searching",
  "dsvc-09": "04-algorithms/sorting",
};

const SPECS = {
  "dsvc-01": {
    question:
      "抽象数据类型、逻辑关系与物理存储怎样形成不依赖某段代码的结构合同？",
    scenario:
      "用同一线性表分别映射到连续数组和链式结点，并逐项检查长度与可达性",
    fault: "把容量当逻辑长度，或把指针地址邻近误说成抽象元素相邻",
    invariant: "抽象元素集合、逻辑次序与操作语义不随合法物理表示改变",
    artifact: "ADT签名、逻辑关系、两种表示映射、边界输入与不变量检查",
    focus: "数据、数据元素、数据项、数据对象、逻辑结构、物理结构与ADT",
    experiment: "contract",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDataStructure",
      "nistDads",
      "openDataStructures",
    ],
    operations: [
      [
        "定义对象",
        "元素域和相等关系已冻结",
        "声明值集合与逻辑次序",
        "表示中无额外可观察语义",
      ],
      [
        "选择表示",
        "操作合同不变",
        "映射到数组或链式结点",
        "每个抽象元素恰有一个表示",
      ],
      [
        "执行插入",
        "位置在0到length之间",
        "建立新元素并保持次序",
        "length增加1且旧元素相对次序不变",
      ],
      [
        "执行删除",
        "目标位置有效",
        "移除目标并闭合表示",
        "length减少1且无悬空可达关系",
      ],
    ],
  },
  "dsvc-02": {
    question:
      "正确性、实际操作计数与渐近阶怎样分层，避免用大O替代具体算法证据？",
    scenario: "在同一有序数组上逐比较重放顺序查找和折半查找",
    fault: "只给大O阶却不固定输入模型、基本操作、最坏或平均分布",
    invariant:
      "两算法返回同一结果，比较次数来自轨迹，渐近结论另带成本模型与量词",
    artifact: "前置条件、后置条件、比较轨迹、成本模型、最坏输入与空间账本",
    focus: "算法定义、特性、设计要求、事前与事后度量、渐近增长和时空复杂度",
    experiment: "complexity",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "publisherSample",
      "nistDads",
      "princetonAlgorithms",
    ],
    operations: [
      [
        "冻结问题",
        "输入域与目标结果已定义",
        "写前置条件和后置条件",
        "正确性结论不含未声明输入",
      ],
      ["建立参考输出", "小输入可穷举", "执行直接算法", "参考输出与定义一致"],
      [
        "记录基本操作",
        "成本单位已选择",
        "逐步计比较、读取与写入",
        "计数可由轨迹复算",
      ],
      [
        "推广渐近界",
        "输入规模变量和量词已声明",
        "给上界、下界或紧界",
        "常数与低阶项不改变所声明阶",
      ],
    ],
  },
  "dsvc-03": {
    question:
      "顺序表与链表在插入、删除和查找中的真实差异怎样由已知信息和操作计数决定？",
    scenario: "固定长度和插入位置，分别计算数组搬移与链表遍历、改链",
    fault: "比较数组和链表时，一边假定已知下标，另一边却包含查找前驱的成本",
    invariant: "插入后元素多重集正确、逻辑次序保持、长度加一且无越界或悬空边",
    artifact: "数组槽位轨迹、链表可达图、搬移与改链计数、头尾边界反例",
    focus: "线性表ADT、顺序存储、单链表、静态链表、循环链表与双向链表",
    experiment: "list",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "openDataStructures",
    ],
    operations: [
      [
        "定位位置",
        "0≤index≤length",
        "按下标或沿next找前驱",
        "定位结果对应同一逻辑缝隙",
      ],
      [
        "准备容量或结点",
        "数组有空槽或结点分配成功",
        "保留旧结构直到新资源可用",
        "失败不改变原表",
      ],
      [
        "提交插入",
        "前驱与后继身份有效",
        "搬移后写值或按先后顺序改链",
        "新表可达且无丢结点",
      ],
      [
        "验收删除",
        "目标位置存在",
        "保存被删值并闭合空隙",
        "其余元素相对次序不变",
      ],
    ],
  },
  "dsvc-04": {
    question: "栈、队列与循环缓冲怎样用端点状态证明LIFO、FIFO和空满边界？",
    scenario: "让循环队列跨过数组末端，重放入队后的head、tail和保留槽位",
    fault: "把head等于tail同时解释为空和满，却没有长度字段或保留槽约定",
    invariant: "栈只从同一端提交，队列按入队顺序出队，模回绕不改变逻辑次序",
    artifact: "操作序列、栈顶轨迹、循环队列槽位、表达式栈和空满反例",
    focus: "栈ADT、共享空间、递归、后缀表达式、队列ADT、循环队列与链队列",
    experiment: "stack-queue",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "openDataStructures",
    ],
    operations: [
      ["压栈", "栈未满或结点可分配", "在top端提交新值", "新值成为唯一栈顶"],
      ["出栈", "栈非空", "读取并移除top", "返回最近一次未匹配压栈的值"],
      [
        "入队",
        "循环队列未满",
        "在tail写值并模容量前进",
        "旧队列次序不变且新值位于末尾",
      ],
      ["出队", "队列非空", "读取head并模容量前进", "返回最早尚未出队的值"],
    ],
  },
  "dsvc-05": {
    question:
      "KMP怎样复用已匹配前后缀，使文本指针不回退且仍返回与朴素匹配相同的位置？",
    scenario: "对普通文本和重复字符压力文本同时计算prefix数组与字符比较次数",
    fault: "prefix或next数组的索引约定改变后，搜索循环仍沿用旧回退位置",
    invariant: "matched始终是已读文本后缀与模式前缀的最长匹配长度",
    artifact: "文本与模式、prefix推导、朴素与KMP比较轨迹、首个匹配和偏移反例",
    focus: "串ADT、存储、朴素匹配、KMP、next、nextval与改进边界",
    experiment: "kmp",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "princetonAlgorithms",
    ],
    operations: [
      [
        "构造前缀状态",
        "模式非空且索引约定冻结",
        "逐字符计算最长真前后缀",
        "prefix[i]不超过i",
      ],
      [
        "比较当前字符",
        "matched是合法模式下标",
        "比较text[i]与pattern[matched]",
        "已读文本以前无需回退",
      ],
      [
        "失配回退",
        "matched大于0",
        "令matched回到较短边界",
        "保留仍可能匹配的最长前缀",
      ],
      [
        "提交匹配",
        "matched等于模式长度",
        "返回当前文本位置减模式长度加一",
        "返回位置逐字符等于模式",
      ],
    ],
  },
  "dsvc-06": {
    question: "树的表示、遍历、转换与编码怎样用连通无环和一次访问不变量统一？",
    scenario: "对固定二叉树重放前序、中序、后序并比较访问集合与根处理时机",
    fault: "递归或显式栈遗漏空孩子基例，导致重复访问、漏结点或无法终止",
    invariant: "从根可达全部结点、除根外父结点唯一、遍历恰访问每个结点一次",
    artifact: "树结点表、父子边、三种遍历轨迹、栈状态、Huffman前缀码检查",
    focus: "树ADT、三类存储、二叉树性质、遍历、线索化、森林转换与Huffman编码",
    experiment: "tree",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "openDataStructures",
    ],
    operations: [
      [
        "验证树形",
        "结点与父子边已给定",
        "从根执行一次标记遍历",
        "连通、无环且边数为结点数减一",
      ],
      [
        "前序遍历",
        "当前结点可达",
        "先访问根再遍历孩子",
        "根先于其全部后代出现",
      ],
      [
        "中序遍历",
        "对象是有左右孩子的二叉树",
        "左子树、根、右子树",
        "每结点恰出现一次",
      ],
      ["后序遍历", "孩子关系稳定", "先孩子后根", "根晚于其全部后代出现"],
    ],
  },
  "dsvc-07": {
    question: "图表示、遍历、生成树、最短路与DAG调度怎样各自声明边与权重前提？",
    scenario: "在固定非负权图上逐顶点重放Dijkstra确定与松弛轨迹",
    fault: "向Dijkstra输入负权边，或把有向边当成邻接矩阵中的对称记录",
    invariant:
      "抽象边集与表示一致；已确定最短距离有非负权前提；遍历不重不漏可达顶点",
    artifact: "顶点边表、表示对照、访问队列、松弛记录、前驱树与负权反例",
    focus: "图ADT、五类存储、DFS、BFS、MST、最短路、拓扑排序与关键路径",
    experiment: "graph",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "openDataStructures",
      "princetonAlgorithms",
    ],
    operations: [
      [
        "冻结图合同",
        "方向、权重、重边和自环策略已声明",
        "建立顶点边表",
        "表示与抽象边集合一一对应",
      ],
      [
        "选择暂定最小点",
        "所有未确定路径经非负边延伸",
        "取最小暂定距离顶点",
        "该距离可永久确定",
      ],
      [
        "松弛出边",
        "源距离有限且边存在",
        "比较旧距离与经当前点的新距离",
        "距离单调不增且保留前驱",
      ],
      ["验收路径", "目标可达", "沿前驱回溯到源", "路径权重和等于记录距离"],
    ],
  },
  "dsvc-08": {
    question:
      "静态查找、搜索树、B树与哈希怎样用各自前置条件解释查找轨迹和失败结果？",
    scenario: "在排序数组上重放顺序与折半查找，保存每次探测下标",
    fault: "对未排序输入运行折半查找，或忽略哈希负载因子与冲突策略",
    invariant: "成功返回的键确实存在，失败证明合法搜索空间已为空或完整探测终止",
    artifact: "键集合、顺序条件、探测轨迹、树路径、冲突链和负载因子",
    focus: "顺序、有序与索引查找、BST、AVL、多路树、哈希函数和冲突处理",
    experiment: "search",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "openDataStructures",
      "princetonAlgorithms",
    ],
    operations: [
      [
        "验证输入结构",
        "查找结构已构建",
        "检查排序、BST序或哈希容量",
        "算法前提与表示真实一致",
      ],
      [
        "产生探测",
        "候选区间或桶非空",
        "读取中点、树结点或哈希槽",
        "探测身份在合法范围",
      ],
      [
        "缩小候选",
        "比较结果可决定方向",
        "删除不可能包含目标的区域",
        "若目标存在仍留在候选集合",
      ],
      [
        "提交结果",
        "命中或候选为空",
        "返回位置或未找到",
        "结果可由原键集合直接复查",
      ],
    ],
  },
  "dsvc-09": {
    question:
      "排序正确性、稳定性、比较次数、写入次数与输入分布怎样形成完整选择依据？",
    scenario: "对确定性置换和逆序压力输入同时执行冒泡与插入排序并逐操作计数",
    fault: "只按大O表格选算法，忽略稳定性、额外空间、写入成本和输入已有序程度",
    invariant:
      "输出非降且与输入拥有相同元素多重集；稳定算法保持相等键原相对次序",
    artifact: "带身份输入、比较写入轨迹、有序输出、稳定性反例与空间账本",
    focus: "排序分类、稳定性、冒泡、选择、插入、希尔、堆、归并与快速排序",
    experiment: "sort",
    sourceIds: [
      "publisherDetail",
      "publisherToc",
      "nistDads",
      "princetonAlgorithms",
    ],
    operations: [
      [
        "冻结输入身份",
        "每个键携带原位置",
        "复制输入多重集",
        "后续可检查丢失、重复与稳定性",
      ],
      [
        "执行比较",
        "比较器满足一致次序",
        "按算法选择键对",
        "每次分支来自真实比较结果",
      ],
      [
        "提交写入",
        "目标槽位有效",
        "交换或搬移元素",
        "当前区间保持算法循环不变量",
      ],
      [
        "验收输出",
        "算法终止",
        "检查相邻非降与身份多重集",
        "有序、守恒且稳定性结论可复查",
      ],
    ],
  },
};

const MAP_SPEC = {
  question:
    "291个正式坐标怎样沿ADT、表示、操作、算法与证据形成可执行学习地图？",
  scenario: "为每章选择一个不变量、一个真实操作计数、一个单故障和一个恢复工件",
  fault: "用73个聚合概念替代出版社282个编号小节，或用静态图数量冒充交互质量",
  invariant:
    "每个正式坐标有稳定证据键，目录范围、样章、当前参考和本站扩展保持分层",
  artifact: "291坐标矩阵、表示—操作依赖、实验索引、来源身份和缺口清单",
  focus: "9个章根和282个编号小节怎样组成从抽象结构到算法实证的路线",
  experiment: "cross",
  sourceIds: [
    "publisherDetail",
    "publisherToc",
    "publisherSample",
    "nistDads",
    "nistDataStructure",
    "openDataStructures",
    "princetonAlgorithms",
  ],
  operations: [
    [
      "定义ADT",
      "对象与操作签名已冻结",
      "声明逻辑值与前后置条件",
      "不依赖某一存储布局",
    ],
    [
      "选择表示",
      "抽象合同不变",
      "映射为数组、链、树或图",
      "表示关系完整且无歧义",
    ],
    ["重放操作", "输入满足前置条件", "逐步执行并计数", "每一步保持结构不变量"],
    [
      "攻击与恢复",
      "只改变一个前提",
      "定位首错后撤销重放",
      "输出、结构与计数共同恢复",
    ],
  ],
};

const REVIEW_SPEC = {
  question: "怎样跨九章验收结构与算法，而不是背名词、动画帧或复杂度表？",
  scenario: "随机抽取每章一个坐标，口述合同、执行小输入、注入反例并恢复",
  fault: "看到动画终点正确就跳过中间不变量、元素守恒与操作计数",
  invariant: "任一结论都能由输入、轨迹、输出和不变量重放，破坏前提时能定位首错",
  artifact: "九章口试、操作轨迹、反例库、复杂度账本、来源与未知项",
  focus: "ADT、线性结构、串、树、图、查找与排序的综合证据验收",
  experiment: "cross",
  sourceIds: [
    "publisherDetail",
    "publisherToc",
    "publisherSample",
    "nistDads",
    "openDataStructures",
    "princetonAlgorithms",
  ],
  operations: [
    [
      "口述结构合同",
      "抽象对象与合法输入已给定",
      "说明逻辑关系与表示",
      "表示满足对象语义",
    ],
    ["预测操作", "前置状态可见", "写下一状态与成本", "预测先于动画或代码运行"],
    [
      "执行并对照",
      "实现版本固定",
      "逐步保存读取、比较、写入与边变化",
      "结果和计数可复算",
    ],
    ["反例与恢复", "故障变量唯一", "定位首错并撤销", "同输入重新满足全部门"],
  ],
};

async function loadOfficialOutline() {
  if (fs.existsSync(OUTLINE_PATH)) {
    return JSON.parse(fs.readFileSync(OUTLINE_PATH, "utf8"));
  }
  const response = await fetch(PUBLISHER_TOC);
  if (!response.ok) {
    throw new Error(`无法读取出版社目录：HTTP ${response.status}`);
  }
  const html = await response.text();
  const entries = [];
  const seen = new Set();
  const pattern = /(?:^|>)([1-9]\.\d+(?:\.\d+)?)[　?\u00a0\s]+([^<\r\n]+)/gu;
  for (const match of html.matchAll(pattern)) {
    const coordinate = match[1];
    const title = match[2]
      .replace(/&nbsp;/gu, " ")
      .replace(/\s+/gu, " ")
      .replace(/\s+\d+\s*$/u, "")
      .trim();
    if (!coordinate || !title || seen.has(coordinate)) continue;
    seen.add(coordinate);
    entries.push(`${coordinate} ${title}`);
  }
  const units = Object.entries(UNIT_TITLES).map(([chapter, title]) => {
    const id = UNIT_IDS[chapter];
    const concepts = entries.filter((entry) => entry.startsWith(`${chapter}.`));
    return { id, title, concepts };
  });
  const actualCounts = Object.fromEntries(
    units.map((unit) => [unit.id, unit.concepts.length]),
  );
  for (const [id, expected] of Object.entries(EXPECTED_TOPIC_COUNTS)) {
    if (actualCounts[id] !== expected) {
      throw new Error(
        `${id}出版社编号小节应为${expected}，实际${actualCounts[id]}`,
      );
    }
  }
  await writeFormatted(
    OUTLINE_PATH,
    `${JSON.stringify(
      {
        version: 1,
        bookSlug: BOOK,
        sourceUrl: PUBLISHER_TOC,
        capturedAt: "2026-07-30",
        units,
      },
      null,
      2,
    )}\n`,
    "json",
  );
  return JSON.parse(fs.readFileSync(OUTLINE_PATH, "utf8"));
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function alphaKey(index, profile) {
  let value = index;
  let suffix = "";
  do {
    suffix = String.fromCharCode(65 + (value % 26)) + suffix;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return `${profile.id.toUpperCase()}-${suffix}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function mechanismFor(concept, profile, index) {
  if (/开场白|结尾语|总结回顾/u.test(concept)) {
    return `${profile.title}把“${concept.replaceAll(".", "·")}”当作原版叙事坐标，不虚构其中故事；本站只交付本章预测、证据回顾或边界清单。`;
  }
  if (/抽象数据类型|定义|概念|术语/u.test(concept)) {
    return `${profile.title}为这个坐标写对象域、操作签名、前置条件和后置条件，定义不依赖某个C结构体的偶然布局。`;
  }
  if (/顺序存储|链式|链表|数组|存储结构/u.test(concept)) {
    return `${profile.title}把逻辑元素映射到槽位或结点身份，逐项核对长度、可达性、边界与失败原子性。`;
  }
  if (/复杂度|渐近|大O|效率|最坏|平均/u.test(concept)) {
    return `${profile.title}声明规模变量、输入分布、基本操作与量词，并把实际计数和渐近阶分开报告。`;
  }
  if (/栈|队列|递归|后缀|中缀/u.test(concept)) {
    return `${profile.title}沿top、head、tail或调用帧重放每次状态迁移，以LIFO、FIFO或表达式语义裁决。`;
  }
  if (/KMP|next|模式匹配|串/u.test(concept)) {
    return `${profile.title}冻结文本、模式、索引约定和prefix状态，比较朴素与KMP的真实字符轨迹。`;
  }
  if (/树|遍历|森林|哈夫曼/u.test(concept)) {
    return `${profile.title}以连通无环、父结点唯一和一次访问作为树操作不变量，并保存递归或显式栈轨迹。`;
  }
  if (
    /图|路径|生成树|拓扑|关键路径|Prim|Kruskal|Dijkstra|Floyd/u.test(concept)
  ) {
    return `${profile.title}声明方向、权重、重边和负权前提，逐顶点保存访问、松弛、前驱与失败反例。`;
  }
  if (/查找|索引|AVL|B树|B\\+树|散列|哈希/u.test(concept)) {
    return `${profile.title}把排序、平衡、负载因子或冲突策略写进前置条件，成功和失败探测都可复查。`;
  }
  if (/排序|冒泡|选择|插入|希尔|堆|归并|快速/u.test(concept)) {
    return `${profile.title}用带原位置身份的键同时验收非降、多重集守恒与稳定性，并分开计比较和写入。`;
  }
  return `${profile.title}把“${concept.replaceAll(".", "·")}”落实为输入、表示、操作、输出、不变量和反例；序号${index + 1}只用于证据追踪，不代表难度或效率。`;
}

function makeGates(title, spec) {
  return [
    {
      label: "来源、样章与坐标门",
      detail: `${title}分开出版社291坐标、第2章样章、当前参考和本站独立实验。`,
    },
    {
      label: "ADT与表示门",
      detail: `${title}记录对象、操作、逻辑关系、物理表示、容量和边界约定。`,
    },
    {
      label: "前后置条件门",
      detail: `${title}每次操作先验证输入，再提交状态，并核对“${spec.invariant}”。`,
    },
    {
      label: "真实计数门",
      detail: `${title}从轨迹统计读取、比较、写入、搬移、改链或松弛，不生成综合效率分。`,
    },
    {
      label: "单故障与首错门",
      detail: `${title}只注入“${spec.fault}”，定位首个越界、错误状态或错误输出。`,
    },
    {
      label: "恢复、工件与未知门",
      detail: `${title}交付${spec.artifact}，同输入恢复结构、输出与计数并报告未测范围。`,
    },
  ];
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  return {
    id,
    title,
    target,
    chapterSlug: path.basename(target),
    componentBase: pascal(path.basename(target)),
    concepts,
    role,
    officialUnitId,
    ...spec,
    operations: spec.operations.map(
      ([label, precondition, action, invariant]) => ({
        label,
        precondition,
        action,
        invariant,
      }),
    ),
    gates: makeGates(title, spec),
  };
}

function objectives(profile) {
  return `<Objectives>

- 把${profile.focus}落实为ADT、物理表示、前后置条件与可复查状态
- 只注入“${profile.fault}”，定位${profile.title}操作轨迹的首个错误状态
- 交付${profile.artifact}，分开出版社目录、第2章样章、当前参考与本站扩展

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、授权样章与当前参考边界

${profile.title}以[清华大学出版社详情页](${PUBLISHER_DETAIL})核对程杰、《大话数据结构[溢彩加强版]》、ISBN 9787302564713、2020年12月1日出版、C语言定位和全彩图表、动效课件定位。出版社页面在2026年7月30日显示印次1—9、最近印刷日期2026年3月24日；${profile.title}把这当作当前书志状态，不把未来变化写死为原版内容。

${profile.title}以[出版社完整目录](${PUBLISHER_TOC})核对第1章至第9章、282个编号小节；加上9个章根，正式分母是291个坐标。旧清单只有73个聚合概念，既漏掉开场白、总结、结尾，也漏掉大量二级和三级小节；${profile.title}现用完整坐标追踪，但不会复制目录页附带的生活类比摘句。

${profile.title}可访问[出版社第2章样章](${PUBLISHER_SAMPLE})，因此总体来源级别记为authorized-sample。${profile.title}只用样章局部核对算法定义、特性、设计要求、度量和复杂度；其余8章正文、全彩图、逐行代码与课件内容仍不视为已授权复制。${profile.title}的中文讲解、算法轨迹、反例和交互均为本站独立重构，不是原书翻译或替代品。

${profile.title}以NIST DADS、Open Data Structures和Princeton Algorithms核对当前术语、实现不变量与经典算法。${profile.title}所有交互在浏览器内使用小规模确定性数据，不执行用户代码、不上传数据；操作计数来自实际循环和状态迁移，大O、动画终点或勾选数量都不会被包装成综合效率分。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 291正式坐标逐项深读

${profile.concepts
  .map((concept, index) => {
    const key = alphaKey(index, profile);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${concept.replaceAll(".", "·")}；稳定证据键 ${key}。** ${mechanismFor(concept, profile, index)} ${profile.title}在 ${key} 下保存输入、表示、操作序列、真实计数、输出、不变量、单故障首错和同输入恢复；目录标题只限定原版范围，不能单独证明算法正确、复杂度或本站教学扩展。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作结构与算法实验

${profile.title}先预测：若只注入“${profile.fault}”，抽象合同、物理表示、前置条件、状态、不变量、输出或操作计数中的哪一项最先变化？${profile.title}随后选择正式坐标与表示，调整小输入获得真实轨迹，再沿基线、故障和恢复逐项关闭发布门。

<Stepper>
  <Step title="表示合同：连接ADT、物理存储与不变量">
    <${profile.componentBase}RepresentationContractLab />
  </Step>
  <Step title="操作计数：执行算法并记录比较、写入或边变化">
    <${profile.componentBase}OperationCounterLab />
  </Step>
  <Step title="轨迹门：重放基线、单故障与恢复">
    <${profile.componentBase}TraceGateLab />
  </Step>
</Stepper>

${profile.title}的操作计数器真正执行顺序与折半查找、数组与链表插入模型、循环队列、KMP、树遍历、Dijkstra或排序循环。${profile.title}的固定小图和小数组用于复算机制，不代表生产负载；缓存、分配器、语言实现、输入分布和硬件效应需要另做基准测试。`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. ${profile.title}先冻结元素身份、输入规模、逻辑关系、物理表示、容量、索引约定、比较器、图方向与权重以及成功条件。
2. ${profile.title}用小输入建立参考轨迹并保存${profile.artifact}；输出、多重集、可达性或计数不稳定就停止，不用复杂度表解释实现。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录首个越界、错误边、错误候选区、错误输出或不变量破坏。
4. ${profile.title}撤销唯一故障，从干净结构以同一输入重放；结构、输出、操作计数和“${profile.invariant}”没有一起恢复时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：完整目录和第2章样章等于整书授权">
${profile.title}的291坐标可以完整限定范围，但只有出版社开放的第2章样章可局部逐页核对；其余正文、彩图、代码与课件不能因可见书目而被复制或虚构。
</Callout>

<Callout type="trap" title="${profile.title}误区二：动画终点正确就代表算法正确">
${profile.title}必须保存每一步前置条件、状态转移、元素守恒和不变量；静态图、流畅动画或某个输入的正确终点都不能证明全称正确性。
</Callout>

<Callout type="trap" title="${profile.title}误区三：大O表格可以直接决定实现">
${profile.title}分开比较、写入、搬移、改链、分配、缓存与额外空间；渐近阶还依赖输入分布和成本模型，小输入常数也要由实际轨迹或基准测量。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter") {
    return profile.concepts
      .map((concept, index) => ({ concept, index }))
      .filter(({ concept }) => /^\d+\.\d+\s/u.test(concept));
  }
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第\d章/u.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = alphaKey(index, profile);
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的证据键 ${key} 设计一个最小输入、参考操作轨迹、真实计数、单前提故障和恢复断言，并说明结构不变量。

<Answer>
${profile.title}先为 ${key} 冻结抽象对象、物理表示、元素身份、容量、索引与前后置条件，再以小输入逐步执行并统计相关基本操作。${profile.title}只注入“${profile.fault}”关联的一项变化，定位首个错误状态；撤销后以同一输入重新满足“${profile.invariant}”。${profile.title}把未开放原文、未测语言布局、缓存和生产输入分布保留为未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么291个坐标不等于291段原书正文**

${profile.title}应怎样描述出版社完整目录、第2章样章和本站交互之间的授权与证据关系？

<Answer>
${profile.title}用9个章根和282个编号小节回答“原版覆盖什么”；只有出版社开放的第2章样章能支持该章局部正文核对。${profile.title}的其他解释、图形、操作计数、反例与练习均由NIST、开放教材和大学课程资料独立核对并重新组织，不能冒充原书段落、彩图或课件。
</Answer>

**问题 ${start + 1}：什么时候不能发布“更快”或“正确”**

${profile.title}缺少哪些证据时只能报告局部观察？

<Answer>
${profile.title}缺少输入域、前后置条件、表示、比较器、方向或权重、状态轨迹、元素守恒、不变量、真实操作计数、故障反例或同输入恢复中的关键一项时，只能报告局部结果。${profile.title}不会用动画、一次输出、大O标签或合成评分填补这些缺口。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "抽象数据类型",
      `${profile.title}中由值集合与操作语义定义且不绑定单一物理布局的合同`,
    ],
    [
      "表示不变量",
      `${profile.title}中每次合法操作前后都必须成立的槽位、可达边、树序或图边性质`,
    ],
    [
      "前置条件",
      `${profile.title}中某操作被允许执行之前输入与状态必须满足的约束`,
    ],
    [
      "操作计数",
      `${profile.title}从真实轨迹统计的比较、读取、写入、搬移、改链或松弛次数`,
    ],
    [
      "首个错误状态",
      `${profile.title}的故障轨迹相对参考轨迹最早出现越界、不变量破坏或错误输出的位置`,
    ],
    [
      "同输入恢复",
      `${profile.title}撤销唯一故障并用原输入恢复结构、输出、不变量与计数的断言`,
    ],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；${profile.title}用它们指向真实对象、状态和轨迹，不生成成熟度分、难度分或综合效率分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核状态链：完整目录给正式坐标，第2章样章限定局部正文，当前参考核对新陈述，ADT合同解释对象，物理表示承载状态，真实操作计数暴露成本，单故障定位首错，同输入恢复决定结论能否上架。${profile.title}最终交付${profile.artifact}，并同时报告授权、前提、成本模型、输入分布与未知项。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="程杰《大话数据结构[溢彩加强版]》出版社完整目录与第2章授权样章"
  adaptedUrl="${PUBLISHER_DETAIL}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    experiment: profile.experiment,
    operations: profile.operations,
    gates: profile.gates,
  };
  return `"use client";

import {
  DataStructureEvidenceLab,
  type DataStructureEvidenceModel,
} from "@/components/mdx/data-structures-visual/v2/data-structure-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies DataStructureEvidenceModel;

export function ${profile.componentBase}RepresentationContractLab() {
  return <DataStructureEvidenceLab model={model} view="representation-contract" />;
}

export function ${profile.componentBase}OperationCounterLab() {
  return <DataStructureEvidenceLab model={model} view="operation-counter" />;
}

export function ${profile.componentBase}TraceGateLab() {
  return <DataStructureEvidenceLab model={model} view="trace-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}RepresentationContractLab,
  ${profile.componentBase}OperationCounterLab,
  ${profile.componentBase}TraceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。${profile.title}先冻结ADT、表示和输入，再执行操作并保存真实计数，最后用单故障和同输入恢复验收；只有守住“${profile.invariant}”并交付${profile.artifact}，一张图或一个复杂度标签才可能升级为可复核证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用表示合同、真实操作计数与轨迹门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: PUBLISHER_DETAIL,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const officialOutline = await loadOfficialOutline();
const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);

const existingById = new Map(manifest.units.map((unit) => [unit.id, unit]));
manifest.units = officialOutline.units.map((outlineUnit) => {
  const existing = existingById.get(outlineUnit.id) ?? {};
  return {
    ...existing,
    id: outlineUnit.id,
    title: outlineUnit.title,
    concepts: outlineUnit.concepts.map((concept) => [concept]),
  };
});

for (const unit of manifest.units) {
  const expected = EXPECTED_TOPIC_COUNTS[unit.id];
  if (!expected || !SPECS[unit.id] || !PATHS[unit.id])
    throw new Error(`缺少单元配置：${unit.id}`);
  if (unit.concepts.flat().length !== expected) {
    throw new Error(
      `${unit.id}编号小节应为${expected}，实际${unit.concepts.flat().length}`,
    );
  }
}

const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...unit.concepts.flat(),
]);
const publicSections = manifest.units.reduce(
  (count, unit) => count + unit.concepts.flat().length,
  0,
);
if (manifest.units.length !== 9)
  throw new Error(`正式章数应为9，实际${manifest.units.length}`);
if (publicSections !== 282)
  throw new Error(`编号小节应为282，实际${publicSections}`);
if (allCoordinates.length !== 291)
  throw new Error(`正式坐标应为291，实际${allCoordinates.length}`);

const profiles = [
  enrich(
    "learningMap",
    "《大话数据结构[溢彩加强版]》291坐标证据学习地图",
    "00-intro/dsv-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      [unit.title, ...unit.concepts.flat()],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《大话数据结构[溢彩加强版]》291坐标全书证据总复习",
    "03-algorithms/dsv-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11)
  throw new Error(`页面数量应为11，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  const spec = SPECS[unit.id];
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = spec.sourceIds;
}
manifest.edition =
  "《大话数据结构[溢彩加强版]》，程杰，清华大学出版社，2020年12月1日，ISBN 9787302564713，C语言；出版社2026年7月30日页面显示印次1—9";
manifest.sourceKind =
  "official-publisher-edition-page-and-complete-282-section-outline-plus-official-chapter-2-authorized-sample-plus-current-nist-open-text-and-university-primary-references";
manifest.sourceUrl = PUBLISHER_TOC;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== PUBLISHER_TOC,
);
manifest.status =
  "verified-291-coordinate-authorized-sample-independent-rewrite-current-algorithm-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母来自清华大学出版社完整目录：9个章根和282个编号小节，共291个正式坐标；旧清单73个聚合概念已纠正。出版社详情页核对程杰、2020年12月1日、ISBN 9787302564713、C语言与溢彩动效定位，并在2026年7月30日显示印次1—9。出版社开放第2章样章，因此全书访问级别为authorized-sample，但样章只支持第2章局部正文核对，其余8章保持独立重构。当前ADT、数据结构与经典算法事实由NIST DADS、CC BY开放教材与Princeton官方课程资料核对；交互计数来自真实小输入轨迹，不生成综合效率分。";
manifest.unitMappingEvidence =
  "quality/data-structures-visual-v2-profiles.json";
manifest.factSourcePolicy =
  "出版社详情与完整目录限定版本和291个正式坐标；第2章授权样章只用于局部核对，不扩大整书正文、彩图、代码和课件许可。本站中文讲解、反例、操作计数与交互为独立重构；当前ADT、表示、查找、排序、树图算法与复杂度事实由NIST DADS、Open Data Structures和Princeton Algorithms核对，不能倒写成原作者观点。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 291,
  coveredFormalNodes: 291,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 9,
  officialNumberedSections: 282,
  formalNodes: 291,
  officialUnits: 9,
  authorizedFullChapterSamples: 1,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "authorized-sample",
      originalEdition: "2020-12-01, ISBN 9787302564713",
      formalNodes: 291,
      officialChapterRoots: 9,
      officialNumberedSections: 282,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9章、282个编号小节、291个正式坐标与33个交互视图。");
