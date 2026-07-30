import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-from-scratch-2";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-from-scratch-2/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-from-scratch-2-v2-profiles.json",
);

const SOURCES = {
  original: "https://www.oreilly.co.jp/books/9784873119069/",
  repository: "https://github.com/oreilly-japan/deep-learning-from-scratch-3",
  errata:
    "https://github.com/oreilly-japan/deep-learning-from-scratch-3/wiki/Errata",
  authorSample: "https://koki0702.github.io/dezero-book/",
  python: "https://docs.python.org/3/tutorial/",
  numpy: "https://numpy.org/doc/stable/user/",
  broadcasting: "https://numpy.org/doc/stable/user/basics.broadcasting.html",
  weakref: "https://docs.python.org/3/library/weakref.html",
  unittest: "https://docs.python.org/3/library/unittest.html",
  graphviz: "https://graphviz.org/documentation/",
  scipyOptimize: "https://docs.scipy.org/doc/scipy/tutorial/optimize.html",
  mnist: "https://yann.lecun.com/exdb/mnist/",
  backpropagation: "https://doi.org/10.1038/323533a0",
  numericalGradient:
    "https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.check_grad.html",
  softmax:
    "https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.softmax.html",
  optimizers: "https://pytorch.org/docs/stable/optim.html",
  dropout: "https://jmlr.org/papers/v15/srivastava14a.html",
  convolution: "https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html",
  vgg: "https://arxiv.org/abs/1409.1556",
  cupy: "https://docs.cupy.dev/en/stable/",
  rnn: "https://doi.org/10.1162/neco.1997.9.8.1735",
  colab: "https://colab.research.google.com/",
};

const PATHS = {};

function spec(
  duty,
  question,
  invariant,
  fault,
  scenario,
  stageNames,
  sources,
  artifact,
  opening,
) {
  return {
    duty,
    question,
    invariant,
    fault,
    scenario,
    stageNames,
    sources,
    artifact,
    opening,
  };
}

const SPECS = {};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} manifest`);

function walkMdx(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkMdx(entryPath));
    else if (entry.name.endsWith(".mdx")) files.push(entryPath);
  }
  return files;
}

const pathByTitle = new Map();
for (const filePath of walkMdx(CONTENT_ROOT)) {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  pathByTitle.set(
    parsed.data.title,
    path
      .relative(CONTENT_ROOT, filePath)
      .replaceAll(path.sep, "/")
      .replace(/\.mdx$/, ""),
  );
}
PATHS.learningMap = "00-guide/dl2-official-learning-map";
PATHS.finalReview = "07-review/dl2-official-final-review";
for (const unit of previousManifest.units) {
  const chapterPath = pathByTitle.get(unit.title);
  if (!chapterPath)
    throw new Error(`无法按标题定位页面：${unit.id} ${unit.title}`);
  PATHS[unit.id] = chapterPath;
}

function stageFor(unit) {
  const match = unit.id.match(/^dl2-step-(\d+)$/);
  if (!match) return "appendix";
  const step = Number(match[1]);
  if (step <= 10) return "automatic-differentiation";
  if (step <= 24) return "natural-api";
  if (step <= 36) return "higher-order";
  if (step <= 51) return "neural-network";
  return "advanced";
}

const STAGE_SPECS = {
  "automatic-differentiation": {
    duty: "建立Variable/Function、计算图、链式法则、自动反向与梯度测试",
    question:
      "怎样让对象身份、creator边和反向传播顺序形成可自动验证的最小计算图？",
    invariant:
      "Variable.data/grad/creator、Function输入输出、局部导数、拓扑顺序和梯度检查一致",
    fault: "creator边或局部导数错误，但只凭一个标量结果看似正确",
    stageNames: ["对象合同", "前向连边", "局部导数", "反向调度", "梯度测试"],
    source: SOURCES.numericalGradient,
  },
  "natural-api": {
    duty: "扩展可变参数、梯度累加、拓扑排序、内存模式、运算符重载与包结构",
    question:
      "怎样让自然Python语法保持正确计算图、梯度累加、生命周期和类型分派？",
    invariant:
      "多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致",
    fault: "API更易用却丢失一条边、覆盖共享梯度或形成循环引用",
    stageNames: ["API输入", "图连接", "梯度汇聚", "资源释放", "回归兼容"],
    source: SOURCES.weakref,
  },
  "higher-order": {
    duty: "实现计算图可视化、函数优化、反向图构建与高阶导数",
    question:
      "怎样让反向传播本身也由Variable和Function表达，从而支持二阶及更高阶导数？",
    invariant:
      "create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致",
    fault: "反向阶段使用裸ndarray切断计算图，仍声称支持double backprop",
    stageNames: [
      "可视化前向图",
      "构建一阶图",
      "保留反向图",
      "再次反向",
      "高阶对照",
    ],
    source: SOURCES.graphviz,
  },
  "neural-network": {
    duty: "扩展张量shape、广播/矩阵积、层/模型/优化器、损失、数据集与训练循环",
    question:
      "怎样把自动微分核心扩展为可训练神经网络，同时保持shape、参数注册和数据角色正确？",
    invariant:
      "reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致",
    fault: "广播或参数遍历漏项，训练损失仍因其他参数变化而下降",
    stageNames: ["张量合同", "层与参数", "损失前向", "优化更新", "训练回归"],
    source: SOURCES.broadcasting,
  },
  advanced: {
    duty: "加入GPU、保存加载、训练/测试模式、CNN、VGG16、RNN与LSTM",
    question:
      "怎样在设备、序列状态和训练模式变化时保持模型、参数、梯度与数据加载语义一致？",
    invariant:
      "CPU/GPU设备、序列状态、train/test模式、序列化参数、卷积shape和时间切断一致",
    fault: "设备或模式切换只改数据表面，参数、缓存或隐藏状态仍留在旧语义",
    stageNames: [
      "设备与模式",
      "算子前向",
      "状态缓存",
      "反向更新",
      "跨环境复现",
    ],
    source: SOURCES.cupy,
  },
  appendix: {
    duty: "补足in-place别名、get_item反向与Colab运行边界",
    question: "怎样在补充场景中保持缓存、切片梯度和运行环境可重放？",
    invariant: "别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确",
    fault: "原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加",
    stageNames: [
      "补充前提",
      "执行边界操作",
      "记录缓存",
      "反向复核",
      "环境回归",
    ],
    source: SOURCES.colab,
  },
};

function specForUnit(unit) {
  const stageKey = stageFor(unit);
  const group = STAGE_SPECS[stageKey];
  const stepLabel = unit.title;
  const conceptNames = unit.concepts.map((items) => items.join("；"));
  return spec(
    `${group.duty}，并逐项覆盖${conceptNames.join("、")}`,
    `${group.question} 当前步骤新增的最小能力和失败边界分别是什么？`,
    `${group.invariant}；${stepLabel}的新增能力不得破坏此前步骤`,
    `${group.fault}；在${stepLabel}验收中只注入这一处`,
    `从上一步DeZero快照出发，只实现“${stepLabel}”，再用参考图与单故障图做差分回归。`,
    group.stageNames,
    [SOURCES.original, SOURCES.repository, group.source],
    `${unit.id}代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现。`,
    `“${stepLabel}”必须交付一个可单独回退的框架增量，不能把后续完整DeZero倒灌进当前步骤。`,
  );
}

Object.assign(SPECS, {
  learningMap: {
    title: "《深度学习入门2：自制框架》275个原版目录层级学习地图",
    ...spec(
      "沿5阶段60步与附录A-C恢复DeZero从自动微分核心到神经网络、GPU、CNN和RNN的连续演进",
      "怎样把275个原版目录坐标组织成60个可回退、可测试、可解释的框架增量？",
      "5个阶段标题、60个步骤、207个编号小节和3个附录逐项覆盖，每步前置合同、新增能力与回归证据可追溯",
      "按主题合并步骤，或直接展示最终框架而隐去中间设计决策、失败模式和兼容回归",
      "从空包开始，用60次小提交构建DeZero，并为每步保留参考与故障轨迹。",
      ["阶段定位", "前置合同", "新增能力", "反向证据", "全量回归"],
      [SOURCES.original, SOURCES.repository, SOURCES.authorSample],
      "275层覆盖矩阵、60步依赖图、每步代码差分、计算图快照、梯度测试、资源/设备状态和最终框架复现包。",
      "学习地图强调60步的顺序依赖：每一步都只增加一种能力，并证明旧能力没有回归。",
    ),
    boundary:
      "原版出版于2020年，中文版书目为2023年；当前Python/NumPy/CuPy兼容修正和后续框架只作时间化扩展。",
  },
  finalReview: {
    title: "《深度学习入门2：自制框架》DeZero总复习",
    ...spec(
      "综合复核5阶段60步、207个编号小节和附录A-C，交付可运行、可求高阶导、可训练并可跨设备复现的DeZero",
      "怎样从275个原版坐标重建框架能力图，并定位一次错误梯度、内存泄漏、设备错配或模式污染？",
      "每项框架能力都能回到引入步骤、对象/边、前向缓存、反向轨迹、资源生命周期、回归测试和2020/当前边界",
      "只跑最终训练样例，隐藏中间步骤、梯度错误、循环引用、设备/模式状态和序列断图",
      "从官方60步之外的空目录重建DeZero，执行自动微分、高阶导、MLP、CNN和LSTM五类验收。",
      [
        "恢复60步依赖",
        "检查核心图",
        "验证高阶导",
        "训练多类模型",
        "跨设备回归",
      ],
      [SOURCES.original, SOURCES.repository, SOURCES.errata],
      "275层覆盖账本、60步提交图、核心API合同、高阶导测试、模型训练、CPU/GPU对照、序列状态和失败注入报告。",
      "总复习页要求解释框架为何这样演进，而不仅是让最终仓库通过一个示例。",
    ),
    boundary:
      "综合实现以2020年原版、官方仓库与勘误为基线；2023年中文译本书目和当前依赖兼容层分开记录。",
  },
});
for (const unit of previousManifest.units) SPECS[unit.id] = specForUnit(unit);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function mechanismFor(concept) {
  const dezeroRules = [
    [
      /阶段|步骤\d+/,
      [
        "声明本步相对上一快照新增的框架能力与依赖",
        "前置API、代码差分、对象/边快照、回归用例和回退点",
        "把后续完整实现倒灌到当前步骤",
      ],
    ],
    [
      /Variable|变量|Function|函数的连续|函数的连结|backward|反向传播|链式|计算图|creator/,
      [
        "用Variable与Function对象记录前向边并按链式法则传播梯度",
        "对象身份、data/grad/creator、inputs/outputs、generation、缓存和局部导数",
        "边丢失、对象覆盖或错误拓扑顺序",
      ],
    ],
    [
      /数值微分|导数|梯度检验|测试|单元测试/,
      [
        "以中心差分和自动测试反证反向传播实现",
        "差分步长、数值/解析梯度、相对误差、输入种子和失败定位",
        "只测一个幸运输入或差分步长不稳定",
      ],
    ],
    [
      /可变长|重复使用|复杂的计算图|优先级|辈分|内存|循环引用|weakref|Config|模式|运算符|打包/,
      [
        "扩展自然API同时维护梯度累加、拓扑顺序和资源生命周期",
        "多输入输出、累加次数、generation队列、weakref释放、模式栈和分派优先级",
        "易用性改动破坏共享梯度或形成内存环",
      ],
    ],
    [
      /Graphviz|DOT|可视化|高阶|double backprop|泰勒|牛顿|Rosenbrock|优化/,
      [
        "让反向传播也构图并以可视化、优化和高阶导验证",
        "create_graph、反向算子图、DOT节点/边、一阶/二阶导和数值对照",
        "反向使用裸数组切断高阶图",
      ],
    ],
    [
      /张量|reshape|transpose|求和|sum|axis|keepdims|广播|broadcast|矩阵|乘积|切片|get_item/,
      [
        "为张量变形、归约、广播、矩阵积和切片实现互为伴随的反向",
        "输入输出shape、轴、keepdims、sum_to/broadcast_to、索引与梯度散射",
        "前向可广播但反向归约轴错误",
      ],
    ],
    [
      /线性回归|神经网络|Parameter|Layer|Model|MLP|Optimizer|SGD|softmax|交叉熵|多分类/,
      [
        "将自动微分核心组装为参数可发现、可优化的模型系统",
        "Parameter注册、Layer递归、损失、梯度清零、Optimizer状态、预测与曲线",
        "参数遍历漏项或测试数据参与选择",
      ],
    ],
    [
      /Dataset|DataLoader|预处理|MNIST|小批量|accuracy/,
      [
        "以可重放数据管道提供批次、预处理与独立评估",
        "数据版本、索引、shuffle种子、batch、变换统计、标签和指标",
        "预处理泄漏或末批处理不一致",
      ],
    ],
    [
      /GPU|CuPy|cuda|保存|加载|Dropout|测试模式|Colab/,
      [
        "跨设备、序列化和训练模式保持参数与缓存语义",
        "设备、dtype、参数键、checkpoint、随机mask、train/test开关与依赖版本",
        "数据、参数或缓存停留在旧设备/模式",
      ],
    ],
    [
      /CNN|卷积|填充|步幅|conv2d|pooling|im2col|VGG/,
      [
        "由卷积几何与im2col实现CNN前反向和预训练模型",
        "NCHW/核shape、padding/stride、窗口、col矩阵、梯度与权重版本",
        "边界取整、通道轴或权重预处理错位",
      ],
    ],
    [
      /RNN|LSTM|时间序列|正弦波|连接|数据加载器/,
      [
        "显式管理循环状态、截断反向和时间批次",
        "时间索引、隐藏/记忆状态、detach边界、序列batch、损失与预测轨迹",
        "跨样本泄漏隐藏状态或错误切断图",
      ],
    ],
    [
      /in-place|复制|覆盖/,
      [
        "区分数组别名、复制与前向缓存不变量",
        "对象id、内存共享、版本计数、缓存值、覆盖前后梯度和反例",
        "原地修改让反向读取被污染缓存",
      ],
    ],
  ];
  return (
    dezeroRules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转为有对象、图边、形状、梯度、资源和回归的框架增量合同",
      "代码快照、输入输出对象、图边、张量shape、缓存、梯度、资源状态、反例和时间边界",
      "只复述代码或模型名称",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\s*\d+阶段\s*/, "")
    .replace(/^步骤\s*\d+\s*/, "")
    .replace(/^\d+(?:\.\d+)*\s+/, "")
    .replace(/^附录\s*[A-C]\s*/, "")
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 24
    ? short
    : `实现坐标${index + 1}`;
}

function proseConcept(concept) {
  return concept.replace(/\.(?=\d)/g, "·");
}

function alphaCode(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  if (!chapterPath) throw new Error(`缺少路径：${key}`);
  if (!specification) throw new Error(`缺少页面规格：${key}`);
  const concepts = unit
    ? unit.concepts.map((group) => group.join("；"))
    : previousManifest.units.flatMap((item) =>
        item.concepts.map((group) => group.join("；")),
      );
  const title = specification.title ?? unit?.title;
  const boundary =
    specification.boundary ??
    `“${title}”以2020年日文原版与2023年中文译本目录为内容边界；当前Python/NumPy/CuPy兼容修正和后续框架只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "锁定上一步快照、对象与公共API",
      "冻结版本、对象身份、dtype/shape、图边和允许读取的信息",
      "可追溯框架前置状态",
    ],
    [
      "执行本步新增的类、函数或算子",
      "保存对象、输入输出shape、creator/generation、参数与缓存",
      "可重放计算图状态",
    ],
    [
      "执行局部反向、图调度或资源更新",
      "保存上游梯度、归约轴、队列、差分误差和生命周期",
      "可复核反向状态",
    ],
    [
      "运行本步示例和单一故障注入",
      "保存API调用、输出、异常、模式/设备和回退差分",
      "可比较框架行为",
    ],
    [
      "重跑此前全部步骤的回归测试",
      "检查图、梯度、内存、设备、模式和历史兼容",
      "独立框架证据包",
    ],
  ];
  return {
    key,
    id: unit?.id ?? key,
    officialUnitId: unit?.id ?? null,
    role,
    chapterPath,
    componentBase: toPascal(path.basename(chapterPath)),
    concepts,
    title,
    ...specification,
    artifact: specification.artifact.replace(/[。.]\s*$/, ""),
    boundary,
    stages: specification.stageNames.map((name, index) => ({
      name,
      input: `${title}：${stageDetails[index][0]}，保持其余DeZero合同不变`,
      operation: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      output: `${name}产生${stageDetails[index][2]}`,
      check: `${stageDetails[index][2]}、身份/shape/梯度断言；出现“${specification.fault}”时停止`,
    })),
    cases: [
      {
        name: "参考运行",
        observation: `${specification.scenario} 固定代码快照、对象图、输入、shape、顺序、容差和种子。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”得到可复核框架增量。`,
        boundary: `全过程必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        observation: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        prediction:
          "定位第一处对象、边、拓扑、梯度、资源、设备或模式状态偏离，并拒绝结论。",
        boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
      },
    ],
    referenceTrace: [
      `为“${title}”冻结代码快照、对象图、dtype/shape、顺序、容差和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存对象、边、输入输出、参数与缓存`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录梯度、调度、资源与模式状态`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同代码快照、对象图、dtype/shape、顺序、容差和种子`,
      `只改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的对象、图边、梯度、资源或模式分叉`,
      `撤销故障重放；只有“${specification.invariant}”恢复才接受修正`,
    ],
  };
}

const profiles = [
  enrichProfile("learningMap", SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(
      unit.id,
      SPECS[unit.id],
      unit.id.startsWith("dl2-app-") ? "appendix" : "chapter",
      unit,
    ),
  ),
  enrichProfile("finalReview", SPECS.finalReview, "final-review"),
];
if (profiles.length !== 65) throw new Error("课程必须恰好为65页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2020年原版、2023年中文译本与当前扩展
- 能先预测“${profile.question}”“${profile.title}”会改变哪个对象、图边、梯度、资源或模式状态，再逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、回退或拒绝框架增量

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个框架问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个对象、图边、shape、梯度、资源或模式状态会变化；运行后补理由不算预测。

围绕“${profile.question}”“${profile.title}”建立参考、故障与恢复路径。只有它守住“${profile.invariant}”并交付${profile.artifact}，代码、对象图或训练结果才构成自制框架证据。

## 书目、275个原版层级与版本边界

“${profile.title}”以[O’Reilly Japan原版官方书页](${SOURCES.original})核对斋藤康毅著《ゼロから作るDeep Learning ❸ ―フレームワーク編》于2020年4月20日出版、552页、ISBN 9784873119069。对“${profile.title}”而言，出版社同页给出的5个阶段、60个步骤与编号小节构成完整目录边界；本站逐项统计5个阶段标题、60个步骤、207个编号小节和附录A至C，共275个正式目录层级。“${profile.title}”再以[出版社官方代码仓库](${SOURCES.repository})核对逐步实现，以[作者公开样章](${SOURCES.authorSample})核对教学顺序，以[官方勘误](${SOURCES.errata})识别已知错误。

“${profile.title}”没有使用未获授权的原书完整正文，只以出版社完整目录、官方代码、作者公开样章和勘误限定范围；中文解释、代码实验、交互、练习与答案均为独立教学重写。“${profile.title}”的中文译本书目信息仅用于核对郑明智译《深度学习入门2：自制框架》、人民邮电出版社2023年3月、ISBN 9787115607515，不用来证明日文原版正文。${profile.boundary}

“${profile.title}”另以${links}核对算法定义、实现语义或数值诊断；这些外部资料能验证本页技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结代码快照、对象图与shape，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个框架问题：它怎样${m}、改变哪个对象、图边、梯度或资源状态、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小框架增量合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回上一步快照。`,
  (p, c, m, e, x, i) =>
    `第${i + 1}个正式坐标「${c}」服务于${p.duty}，需要以${e}呈现${m}；${x}会破坏“${p.invariant}”。`,
];

function conceptsSection(profile) {
  return `## 原版目录层级与实现机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const visibleConcept = proseConcept(concept);
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受对象身份、图边、dtype/shape、梯度、资源生命周期与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个步骤专属框架实验

<Callout type="info" title="先写出哪个对象、图边或梯度状态会先变化">
  对“${profile.title}”先冻结代码快照、对象身份、图边、dtype/shape、顺序、容差和种子，再操作计算图合同、反向轨迹和框架验收门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 对象、图边与前向合同">
    固定“${profile.scenario}”，在参考与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”的对象输入、连边动作、输出和身份/shape检查。

    <${profile.componentBase}GraphContractLab />
  </Step>
  <Step title="2. 参考与单故障反向轨迹">
    保持代码快照、对象图、输入shape和初值不变，只注入“${profile.fault}”，定位第一处偏离“${profile.invariant}”的对象、边、梯度或资源状态。

    <${profile.componentBase}BackwardTraceLab />
  </Step>
  <Step title="3. 框架增量证据验收门">
    分别锁定前置API、对象图、反向梯度、资源/模式状态与历史回归，展开${profile.artifact}后决定是否接受本步增量。

    <${profile.componentBase}FrameworkGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余代码快照、对象身份、图边、dtype/shape、顺序、容差和种子不变，沿五阶段寻找最早偏离；最终示例看似可运行不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="能运行不等于计算图与梯度语义正确">
  ${profile.scenario} 的代码只说明当前样例没有报错；“${profile.title}”仍需对象身份、图边、generation顺序、dtype/shape、前向缓存、梯度对照、资源状态和边界反例。
</Callout>

<Callout type="trap" title="当前兼容层不能冒充2020年原版">
  “${profile.title}”引用现行文档是为了核对计算语义；当前Python、NumPy、CuPy兼容修正和后续框架能力必须单列时间标签，不能倒填2020年日文原版或2023年中文译本。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实现协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的对象、图边、算子、资源或模式状态 | ${index === 0 ? "代码快照、前置API、对象身份、dtype/shape与版本" : index === 4 ? "梯度对照、资源释放、跨设备/模式回归、反例与复现" : "输入输出对象、creator/generation、缓存、梯度、参数与资源状态"} | ${index === 0 ? "前置快照或对象图不可追溯" : index === 4 ? "无法重放或缺少历史回归" : profile.fault} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
stages: ${JSON.stringify(profile.stageNames)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_case_stage_trace_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同代码快照、对象图、dtype/shape、初值、顺序、容差和种子下重放。重置后若案例、阶段、轨迹模式、步骤、框架门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dl2-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、对象/图边、shape、梯度轨迹、资源状态与回归证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释实现作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵最终代码或API，而是能围绕“${profile.question}”重建前置快照、对象、图边、前向、梯度、资源与回归证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：框架增量合同。** “${profile.title}”为什么必须先冻结代码快照、对象图、dtype/shape、初值、顺序、容差和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同输出可能来自不同对象身份、图边、缓存、梯度、资源或随机轨迹；“${profile.title}”先冻结合同，才能把观测连接到当前步骤新增的单一框架机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一代码快照、对象图、dtype/shape、初值、顺序、容差和种子，重放参考路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有计算图合同、反向轨迹、框架门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-plus-official-code-and-author-sample"
  workTitle="斋藤康毅著《ゼロから作るDeep Learning ❸ ―フレームワーク編》"
  adaptedUrl="${SOURCES.original}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "快照、对象与公共API",
        detail: `“${profile.title}”的代码快照、前置API、对象身份、dtype/shape、允许读取的信息和版本可追溯。`,
      },
      {
        label: "计算图与拓扑顺序",
        detail: `“${profile.title}”的输入输出对象、creator边、generation队列、前向缓存和输出shape已冻结。`,
      },
      {
        label: "梯度与资源生命周期",
        detail: `“${profile.title}”的上游/局部/累加梯度、数值对照、weakref、缓存释放和异常轨迹可重放。`,
      },
      {
        label: "模式、设备与历史回归",
        detail: `“${profile.title}”归档训练/测试模式、CPU/GPU状态、此前步骤回归、反例、复现环境和时间标签。`,
      },
    ],
  };
  return `"use client";

import {
  DezeroEvidenceLab,
  type DezeroEvidenceModel,
} from "./dezero-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies DezeroEvidenceModel;

export function ${profile.componentBase}GraphContractLab() {
  return <DezeroEvidenceLab model={model} view="graph-contract" />;
}

export function ${profile.componentBase}BackwardTraceLab() {
  return <DezeroEvidenceLab model={model} view="backward-trace" />;
}

export function ${profile.componentBase}FrameworkGateLab() {
  return <DezeroEvidenceLab model={model} view="framework-gate" />;
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
  const filePath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = path.basename(profile.chapterPath);
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
import { ${profile.componentBase}GraphContractLab, ${profile.componentBase}BackwardTraceLab, ${profile.componentBase}FrameworkGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

${objectivesBlock(profile)}

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.duty}；用计算图合同、单故障反向轨迹和框架增量验收门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.original,
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
    path.join(COMPONENT_ROOT, `${slug}.tsx`),
    wrapperSource(profile),
    "typescript",
  );
}

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

const allConcepts = previousManifest.units.flatMap((unit) =>
  unit.concepts.map((group) => group.join("；")),
);
const stageTitles = allConcepts.filter((item) =>
  /^第\s*\d+阶段/.test(item),
).length;
const stepTitles = allConcepts.filter((item) =>
  /^步骤\s*\d+/.test(item),
).length;
const numberedTopics = allConcepts.filter((item) =>
  /^(?:\d+(?:\.\d+)+|[A-C]\.\d+)\s/.test(item),
).length;
const appendixLevels = allConcepts.filter((item) =>
  /^附录\s*[A-C]/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  stageTitles !== 5 ||
  stepTitles !== 60 ||
  numberedTopics !== 207 ||
  appendixLevels !== 3 ||
  catalogLevels !== 275
) {
  throw new Error(
    `目录口径应为5阶段+60步骤+207编号小节+3附录=275，实际${stageTitles}+${stepTitles}+${numberedTopics}+${appendixLevels}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "斋藤康毅著、郑明智译《深度学习入门2：自制框架》，人民邮电出版社，2023年3月，ISBN 9787115607515；原版《ゼロから作るDeep Learning ❸ ―フレームワーク編》，O'Reilly Japan，2020年4月20日，552页，ISBN 9784873119069",
  sourceKind:
    "official-original-publisher-complete-five-stage-sixty-step-two-hundred-seven-numbered-section-three-appendix-outline-plus-official-code-author-sample-and-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly Japan原版官方书页确认斋藤康毅著、2020年4月20日、552页、ISBN 9784873119069，并提供5阶段60步骤完整目录、官方代码、作者公开样章与勘误入口。中文译本书目信息核对郑明智译、人民邮电出版社2023年3月、ISBN 9787115607515。原版目录逐项统计5个阶段标题、60个步骤、207个编号小节和附录A-C，共275个正式层级；原版网页目录遗漏41.3，已用中文实体书目录交叉核对并纳入。课程按60步与3个附录逐一覆盖，另设学习地图和总复习，共65页、195个步骤专属交互。未取得原书完整正文授权，全部中文解释、代码实验、交互、练习与答案均为独立教学重写。旧65页虽然保留目录路径，却缺少合法目标/归属结构、对象图/梯度/资源证据和可复核交互，现已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
    stageTitles,
    stepTitles,
    numberedTopics,
    appendixLevels,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/deep-learning-from-scratch-2-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly Japan官方书页与完整目录限定2020年原版事实和275个目录层级，官方代码仓库、作者公开样章与勘误核对DeZero逐步实现；Python/NumPy weakref、unittest、Graphviz、SciPy优化/梯度核验、MNIST、反向传播、Softmax、优化器、Dropout、卷积、VGG、CuPy、RNN与Colab分别以官方文档或原始论文核对。当前兼容修正和后续框架能力不得反写原版。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput) {
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);
}

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSources: [SOURCES.original],
      officialCodeSource: SOURCES.repository,
      authorizedSampleSource: SOURCES.authorSample,
      errataSource: SOURCES.errata,
      translationMetadata:
        "郑明智译《深度学习入门2：自制框架》，人民邮电出版社，2023年3月，ISBN 9787115607515",
      technicalSources: Object.values(SOURCES).slice(4),
      officialUnits: previousManifest.units.length,
      officialStageTitles: stageTitles,
      officialStepTitles: stepTitles,
      officialNumberedTopics: numberedTopics,
      officialAppendixLevels: appendixLevels,
      officialCatalogLevels: catalogLevels,
      coursePages: profiles.length,
      interactiveViews: profiles.length * 3,
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
        historicalBoundary: profile.boundary,
        technicalSources: profile.sources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖${stageTitles}阶段+${stepTitles}步骤+${numberedTopics}编号小节+${appendixLevels}附录=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
