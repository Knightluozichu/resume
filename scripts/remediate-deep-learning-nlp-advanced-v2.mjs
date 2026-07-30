import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "deep-learning-nlp-advanced";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/deep-learning-nlp-advanced/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/deep-learning-nlp-advanced-v2-profiles.json",
);

const SOURCES = {
  original: "https://www.oreilly.co.jp/books/9784873118369/",
  chinese:
    "https://www.oreilly.com/library/view/shen-du-xue-xi-jin-jie-zi-ran-yu-yan-chu-li/9787115547644/",
  repository: "https://github.com/oreilly-japan/deep-learning-from-scratch-2",
  errata:
    "https://github.com/oreilly-japan/deep-learning-from-scratch-2/wiki/errata",
  python: "https://docs.python.org/3/tutorial/",
  numpy: "https://numpy.org/doc/stable/user/",
  broadcasting: "https://numpy.org/doc/stable/user/basics.broadcasting.html",
  cupy: "https://docs.cupy.dev/en/stable/",
  wordnet: "https://wordnet.princeton.edu/",
  nltkWordnet: "https://www.nltk.org/howto/wordnet.html",
  ptb: "https://catalog.ldc.upenn.edu/LDC99T42",
  word2vec: "https://arxiv.org/abs/1301.3781",
  negativeSampling:
    "https://proceedings.neurips.cc/paper_files/paper/2013/hash/9aa42b31882ec039965f3c4923ce901b-Abstract.html",
  bptt: "https://doi.org/10.1109/5.58337",
  lstm: "https://doi.org/10.1162/neco.1997.9.8.1735",
  gru: "https://arxiv.org/abs/1406.1078",
  seq2seq:
    "https://proceedings.neurips.cc/paper_files/paper/2014/hash/a14ac55a4f27472c5d894ec1c3c743d2-Abstract.html",
  attention: "https://arxiv.org/abs/1409.0473",
  gnmt: "https://arxiv.org/abs/1609.08144",
  transformer: "https://arxiv.org/abs/1706.03762",
  ntm: "https://arxiv.org/abs/1410.5401",
  dropout: "https://jmlr.org/papers/v15/srivastava14a.html",
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
PATHS.learningMap = "00-guide/dna-official-learning-map";
PATHS.finalReview = "10-review/dna-official-final-review";
for (const unit of previousManifest.units) {
  const chapterPath = pathByTitle.get(unit.title);
  if (!chapterPath)
    throw new Error(`无法按标题定位页面：${unit.id} ${unit.title}`);
  PATHS[unit.id] = chapterPath;
}

function stageFor(unit) {
  return unit.id;
}

const STAGE_SPECS = {
  "dna-01": {
    duty: "复核矩阵shape、层式前反向、Trainer与CPU/GPU运行合同",
    question: "怎样让同一网络的前向、反向、更新和设备结果沿shape账本相互核对？",
    invariant: "输入/权重shape、缓存、梯度、更新顺序、精度与设备语义一致",
    fault: "广播或矩阵方向错误仍产生可运行输出，训练曲线掩盖局部实现错误",
    stageNames: ["冻结数组", "追踪前向", "核对反向", "执行更新", "跨设备回归"],
    source: SOURCES.broadcasting,
  },
  "dna-02": {
    duty: "把语料、词表、共现、PMI与SVD变成可复核的分布式表示流水线",
    question:
      "怎样证明相似词来自固定窗口和统计变换，而不是语料泄漏或索引错位？",
    invariant: "语料版本、token/ID映射、窗口、共现计数、PPMI与SVD维度一致",
    fault: "词表或窗口改变后仍直接比较相似度，或把测试语料并入表示构建",
    stageNames: ["冻结语料", "建立词表", "累计共现", "变换降维", "检索反例"],
    source: SOURCES.ptb,
  },
  "dna-03": {
    duty: "从上下文/目标词构造CBOW与skip-gram的推理、损失和词向量证据",
    question: "怎样让one-hot、输入/输出权重与概率目标在同一上下文合同中对齐？",
    invariant: "窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致",
    fault: "上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果",
    stageNames: ["切分上下文", "编码词ID", "执行CBOW", "反向更新", "比较表示"],
    source: SOURCES.word2vec,
  },
  "dna-04": {
    duty: "以Embedding、负采样和采样分布降低word2vec计算量并保持目标一致",
    question:
      "怎样证明加速改变的是计算路径，而不是学习目标、样本分布或梯度语义？",
    invariant:
      "词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致",
    fault: "负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较",
    stageNames: [
      "锁定词ID",
      "查询Embedding",
      "抽取负样本",
      "累计梯度",
      "效率对照",
    ],
    source: SOURCES.negativeSampling,
  },
  "dna-05": {
    duty: "展开RNN时间图、执行Truncated BPTT并以困惑度评价RNNLM",
    question:
      "怎样在连续时间状态与截断梯度之间划清边界，同时保持mini-batch序列连续？",
    invariant: "时间索引、隐藏状态、截断窗口、batch偏移、梯度与困惑度分母一致",
    fault: "序列被随机打散、隐藏状态跨样本泄漏，或截断处错误重置前向状态",
    stageNames: [
      "切分时间批次",
      "展开RNN",
      "缓存隐藏态",
      "截断反向",
      "评价困惑度",
    ],
    source: SOURCES.bptt,
  },
  "dna-06": {
    duty: "诊断RNN梯度消失/爆炸，并复核LSTM门、权重共享与Dropout模式",
    question: "怎样沿时间检查梯度流，区分门控收益、裁剪作用和正则化效果？",
    invariant:
      "门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致",
    fault: "把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask",
    stageNames: ["测量梯度", "展开门控", "更新记忆", "约束训练", "模式回归"],
    source: SOURCES.lstm,
  },
  "dna-07": {
    duty: "复核RNN文本生成、Encoder/Decoder、Reverse与Peeky seq2seq实验",
    question:
      "怎样让训练时目标、推理时自回归输入和可变长序列使用同一编码合同？",
    invariant:
      "词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致",
    fault: "推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进",
    stageNames: ["编码输入", "压缩状态", "自回归解码", "应用改进", "隔离评价"],
    source: SOURCES.seq2seq,
  },
  "dna-08": {
    duty: "构造Attention权重、上下文向量与seq2seq对齐，并标清2018年应用边界",
    question: "怎样证明注意力图来自归一化对齐计算，而不是只展示漂亮热力图？",
    invariant:
      "Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致",
    fault: "在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章",
    stageNames: [
      "冻结序列",
      "计算score",
      "归一Attention",
      "汇聚context",
      "评价对齐",
    ],
    source: SOURCES.attention,
  },
  "dna-app-a": {
    duty: "从计算图推导sigmoid与tanh导数并核对饱和区梯度",
    question: "怎样让符号推导、数值差分与饱和区观测相互印证？",
    invariant: "函数值、解析导数、差分步长、误差与输入区间一致",
    fault: "只在零点验证导数，忽略大绝对值输入的数值与梯度边界",
    stageNames: ["选择输入", "计算函数", "推导导数", "数值差分", "检查饱和"],
    source: SOURCES.numpy,
  },
  "dna-app-b": {
    duty: "安装并运行WordNet，区分同义词网络与分布式表示的证据来源",
    question: "怎样让synset、关系边和路径相似度在固定WordNet版本上可重放？",
    invariant: "NLTK/WordNet版本、词性、synset ID、关系类型与相似度定义一致",
    fault: "混合不同词性或语料版本，仍把路径距离解释为通用语义真值",
    stageNames: [
      "锁定资源",
      "查询synset",
      "遍历关系",
      "计算相似度",
      "比较边界",
    ],
    source: SOURCES.wordnet,
  },
  "dna-app-c": {
    duty: "用更新门与重置门复核GRU状态转移及其与LSTM的结构差异",
    question: "怎样从门值和隐藏状态轨迹解释GRU记忆，而不是只比较参数量？",
    invariant: "门定义、shape、候选状态、旧/新状态混合、梯度与时间索引一致",
    fault: "更新门方向写反但短序列输出仍近似，或把不同初态比较成结构结论",
    stageNames: [
      "登记旧状态",
      "计算双门",
      "生成候选态",
      "混合新状态",
      "时间回归",
    ],
    source: SOURCES.gru,
  },
};

function specForUnit(unit) {
  const stageKey = stageFor(unit);
  const group = STAGE_SPECS[stageKey];
  const chapterLabel = unit.title;
  const conceptNames = unit.concepts.map((items) => items.join("；"));
  return spec(
    `${group.duty}，并逐项覆盖${conceptNames.join("、")}`,
    `${group.question} 本章各目录坐标如何汇合为同一证据链？`,
    `${group.invariant}；${chapterLabel}的结论不得越过原版目录与数据边界`,
    `${group.fault}；在${chapterLabel}验收中只注入这一处`,
    `为“${chapterLabel}”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。`,
    group.stageNames,
    [SOURCES.original, SOURCES.repository, group.source],
    `${unit.id}语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现`,
    `“${chapterLabel}”必须把表示、序列状态和评价条件写成可重放合同，不能用最终指标替代中间机制。`,
  );
}

Object.assign(SPECS, {
  learningMap: {
    title: "《深度学习进阶：自然语言处理》191个原版目录层级学习地图",
    ...spec(
      "沿神经网络复习、分布式表示、word2vec、RNN/LSTM、seq2seq、Attention与三个附录恢复全书机制链",
      "怎样把191个原版目录坐标组织成从语料表示、序列状态到独立评价的可复核路径？",
      "8个章标题、46个一级节、125个二级节、3个附录标题和9个附录节逐项覆盖",
      "按当前热点重排原书，或把8.5.2 Transformer升成独立章并忽略word2vec/RNN证据链",
      "用固定语料和词表，从共现/CBOW推进到RNNLM、seq2seq与Attention，并保留每次变换的shape、状态和评价证据。",
      ["目录定位", "冻结语料", "建立表示", "追踪序列", "独立评价"],
      [SOURCES.original, SOURCES.repository, SOURCES.chinese],
      "191层覆盖矩阵、语料/词表快照、表示账本、时序状态图、梯度诊断、训练曲线、评价协议和失败复现",
      "学习地图保持原书8章与3个附录的顺序，把Transformer严格放回8.5.2的历史坐标。",
    ),
    boundary:
      "原版出版于2018年，中文版书目为2020年；当前大模型、现代Transformer变体和依赖兼容修正只作时间化扩展。",
  },
  finalReview: {
    title: "《深度学习进阶：自然语言处理》表示—序列—评价总复习",
    ...spec(
      "综合复核8章、46个一级节、125个二级节与附录A-C，交付可重放的NLP实验档案",
      "怎样从191个原版坐标定位一次词表错位、时序泄漏、梯度异常或评价污染？",
      "每项结论都能回到语料/词表、张量shape、序列状态、梯度轨迹、评价协议与2018/当前边界",
      "只比较最终困惑度或热力图，隐藏语料差异、目标泄漏、随机采样和历史范围",
      "从固定语料重建共现/PPMI、CBOW/负采样、RNNLM/LSTM、seq2seq与Attention五类实验。",
      ["锁定范围", "复核表示", "追踪时序", "诊断梯度", "封存评价"],
      [SOURCES.original, SOURCES.repository, SOURCES.errata],
      "191层覆盖账本、语料/词表快照、表示与采样记录、时序状态、梯度诊断、独立评价和失败注入报告",
      "总复习页要求解释表示、序列和注意力证据怎样衔接，而不仅是复述模型名称。",
    ),
    boundary:
      "综合实现以2018年原版、官方仓库与勘误为基线；2020年中文译本书目和当前NLP扩展分开记录。",
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
  const nlpRules = [
    [
      /第\d+章|附录[A-C]|小结/,
      [
        "声明本章在表示—序列—评价链中的职责与范围",
        "原版坐标、输入数据、核心状态、下游接口、反例和时间边界",
        "用当前热点重排原版或只罗列术语",
      ],
    ],
    [
      /数学|Python|向量|矩阵|广播|内积|乘积|形状|神经网络|层|损失|导数|梯度|链式|计算图|权重|Trainer|高速|位精度|GPU|CuPy/,
      [
        "以shape账本和前反向缓存建立后续NLP模型的数值合同",
        "版本、dtype、输入/权重shape、缓存、局部梯度、更新顺序和设备差分",
        "广播或矩阵方向错误仍被训练曲线掩盖",
      ],
    ],
    [
      /自然语言|单词的含义|同义词|WordNet|语料|预处理|分布式|分布假设|共现|相似|点互信息|降维|SVD|PTB/,
      [
        "把固定语料变换为可比较的词ID、共现统计与低维表示",
        "语料版本、token/ID映射、窗口、共现矩阵、PPMI、SVD维度和近邻结果",
        "词表漂移、语料泄漏或不同维度下直接比较相似度",
      ],
    ],
    [
      /word2vec|CBOW|skip-gram|one-hot|上下文|目标词|推理|概率/,
      [
        "用上下文预测任务学习输入/输出权重中的词表示",
        "窗口、上下文/目标索引、one-hot轴、权重shape、损失、梯度和表示读取策略",
        "上下文错位或混淆输入权重与输出权重",
      ],
    ],
    [
      /Embedding|多分类|二分类|sigmoid|交叉熵|负采样|Negative Sampling|采样/,
      [
        "以索引查询和受控负样本降低word2vec计算成本",
        "词ID、正负标签、噪声分布、采样种子、Sigmoid损失、共享索引和梯度累加",
        "负样本污染或重复索引梯度被覆盖",
      ],
    ],
    [
      /语言模型|RNN|循环|展开|Backpropagation Through Time|BPTT|Truncated|时序|Time|困惑|perplexity/,
      [
        "沿时间展开隐藏状态并在明确边界执行截断反向与语言模型评价",
        "时间索引、batch偏移、hidden状态、截断窗口、梯度范数、损失token数和困惑度",
        "序列打散、状态泄漏或困惑度分母错误",
      ],
    ],
    [
      /梯度消失|梯度爆炸|LSTM|门|记忆|Dropout|权重共享|多层/,
      [
        "用门控状态、梯度裁剪、正则化与共享权重改善长时依赖训练",
        "input/forget/output门、cell/hidden状态、梯度范数、裁剪阈值、mask和共享参数",
        "门方向写反、评估仍启用Dropout或把裁剪误当消失对策",
      ],
    ],
    [
      /生成文本|seq2seq|Encoder|Decoder|Reverse|Peeky|可变长度|加法数据集|聊天机器人|算法学习|图像描述/,
      [
        "以编码器状态和自回归解码器完成可变长序列转换",
        "词表、起止符、padding/mask、Encoder状态、Decoder输入、采样策略和序列级评价",
        "训练/推理输入不一致、目标泄漏或padding进入损失",
      ],
    ],
    [
      /Attention|注意力|score|对齐|双向|skip connection|GNMT|Transformer|NTM/,
      [
        "从Encoder序列计算归一化对齐权重和上下文向量",
        "score函数、softmax轴、mask、权重和、context、Decoder状态、热力图与任务指标",
        "错误轴归一化、忽略padding或把Transformer误作独立原书章",
      ],
    ],
    [
      /sigmoid函数|tanh函数|饱和/,
      [
        "以解析推导和数值差分复核激活函数导数",
        "输入区间、函数值、解析导数、差分步长、误差和饱和区观测",
        "只在零点检查导数",
      ],
    ],
    [
      /NLTK|synset|语义相似|单词网络/,
      [
        "在固定WordNet资源上查询synset、关系边和路径相似度",
        "资源版本、词性、synset ID、关系类型、路径与相似度定义",
        "混合词性或把词典路径当作普适语义真值",
      ],
    ],
    [
      /GRU|更新门|重置门/,
      [
        "以更新门和重置门控制隐藏状态的保留与改写",
        "门定义、候选状态、旧/新状态混合、shape、时间索引和梯度",
        "更新门方向写反或初始状态不一致",
      ],
    ],
  ];
  return (
    nlpRules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把目录坐标转为有语料、表示、序列状态、梯度和评价的NLP实验合同",
      "原版范围、输入输出、词ID/shape、缓存、状态、梯度、指标、反例和时间边界",
      "只复述模型名称或最终指标",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^第\s*\d+章\s*/, "")
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
    `“${title}”以2018年日文原版与2020年中文译本目录为内容边界；当前大模型、现代Transformer变体与依赖兼容修正只作带时间标签的独立核验。`;
  const stageDetails = [
    [
      "锁定语料/数据、词表、切分与运行版本",
      "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息",
      "可追溯NLP实验前置状态",
    ],
    [
      "执行本章表示、采样、序列或对齐变换",
      "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存",
      "可重放表示或序列状态",
    ],
    [
      "执行损失、反向、状态更新或统计变换",
      "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹",
      "可复核学习状态",
    ],
    [
      "运行参考案例与单一故障注入",
      "保存近邻、序列输出、对齐权重、指标、异常和回退差分",
      "可比较NLP行为",
    ],
    [
      "在隔离评价集上重放并核对历史边界",
      "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界",
      "独立NLP证据包",
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
      input: `${title}：${stageDetails[index][0]}，保持其余表示、序列与评价合同不变`,
      operation: `${stageDetails[index][1]}，并持续满足“${specification.invariant}”`,
      output: `${name}产生${stageDetails[index][2]}`,
      check: `${stageDetails[index][2]}、词ID/shape/状态/梯度/指标断言；出现“${specification.fault}”时停止`,
    })),
    cases: [
      {
        name: "参考运行",
        observation: `${specification.scenario} 固定数据、词表、输入、shape、时间顺序、容差和种子。`,
        prediction: `沿“${specification.stageNames.join(" → ")}”得到可复核NLP证据链。`,
        boundary: `全过程必须满足“${specification.invariant}”。`,
      },
      {
        name: "边界反例",
        observation: `${specification.scenario} 其余条件不变，只注入“${specification.fault}”。`,
        prediction:
          "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
        boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
      },
    ],
    referenceTrace: [
      `为“${title}”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子`,
      `执行${specification.stageNames.slice(0, 2).join("、")}，保存词ID、输入输出、表示、状态、参数与缓存`,
      `推进${specification.stageNames.slice(2, 4).join("、")}，记录损失、梯度、采样、序列与评价状态`,
      `在${specification.stageNames[4]}交付${specification.artifact}`,
    ],
    faultTrace: [
      `“${title}”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子`,
      `只改变一个条件：${specification.fault}`,
      `沿“${specification.stageNames.join(" → ")}”寻找最早的词ID、表示、时序、梯度、采样或评价分叉`,
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
      unit.id.startsWith("dna-app-") ? "appendix" : "chapter",
      unit,
    ),
  ),
  enrichProfile("finalReview", SPECS.finalReview, "final-review"),
];
if (profiles.length !== 13) throw new Error("课程必须恰好为13页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2018年原版、2020年中文译本与当前扩展
- 能先预测“${profile.question}”“${profile.title}”会改变哪个词ID、表示、时序状态、梯度、采样或评价结果，再逐步复核
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、回退或拒绝NLP结论

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个NLP问题开始

${profile.opening} “${profile.title}”的贯穿任务是：${profile.scenario} 动手前先写下哪个词ID、表示、shape、时序状态、梯度、采样或评价结果会变化；运行后补理由不算预测。

围绕“${profile.question}”“${profile.title}”建立参考、故障与恢复路径。只有它守住“${profile.invariant}”并交付${profile.artifact}，近邻、序列输出、注意力图或指标才构成NLP证据。

## 书目、191个原版层级与版本边界

“${profile.title}”以[O’Reilly Japan原版官方书页](${SOURCES.original})核对斋藤康毅著《ゼロから作るDeep Learning ❷ ―自然言語処理編》于2018年7月21日出版、432页、ISBN 9784873118369。对“${profile.title}”而言，出版社同页给出的8章与附录A至C构成完整目录边界；本站逐项统计8个章标题、46个一级节、125个二级节、3个附录标题和9个附录节，共191个正式目录层级。“${profile.title}”再以[出版社官方代码仓库](${SOURCES.repository})核对ch01至ch08实现，以[官方勘误](${SOURCES.errata})识别已知错误。

“${profile.title}”没有使用未获授权的原书完整正文，只以出版社完整目录、官方代码和勘误限定范围；中文解释、代码实验、交互、练习与答案均为独立教学重写。“${profile.title}”的[中文授权书目页](${SOURCES.chinese})仅用于核对陆宇杰译《深度学习进阶：自然语言处理》、人民邮电出版社2020年10月、ISBN 9787115547644，不用来证明日文原版正文。${profile.boundary}

“${profile.title}”另以${links}核对算法定义、实现语义或数值诊断；这些外部资料能验证本页技术事实，不能反向证明原书采用了本站表述。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的坐标${i + 1}中，目录项「${c}」用于${m}；先冻结语料/数据、词表、时序与shape，再以${e}复核，出现${x}时撤回结论。`,
  (p, c, m, e, x, i) =>
    `目录项「${c}」进入“${p.title}”后要回答第${i + 1}个NLP问题：它怎样${m}、改变哪个词ID、表示、时序状态、梯度或评价结果、由哪些${e}证明，并如何排除${x}。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”“${p.title}”在原版层级${i + 1}把「${c}」落实为${m}；复核者先读取${e}，不能接受${x}。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，目录项「${c}」的最小NLP实验合同是${m}，第${i + 1}次检查保存${e}；若产生${x}，就返回同一语料与词表快照。`,
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
    const definition = `${term}对应原版目录坐标“${visibleConcept}”，在“${profile.title}”中用于${mechanism}，并受语料/数据、词表、dtype/shape、时序状态、梯度、评价协议与版本边界约束。`;
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**原版坐标 ${index + 1}/${profile.concepts.length}。** ${patterns[index % patterns.length](profile, visibleConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章节专属NLP实验

<Callout type="info" title="先写出哪个词ID、表示或序列状态会先变化">
  对“${profile.title}”先冻结语料/数据、词表、切分、dtype/shape、时间顺序、容差和种子，再操作表示账本、序列轨迹和评价验收门；结果与预测不一致时修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 语料、表示与shape账本">
    固定“${profile.scenario}”，在参考与反例间切换，逐阶段查看“${profile.stageNames.join("、")}”的输入词ID、表示/算子动作、输出和shape检查。

    <${profile.componentBase}RepresentationLedgerLab />
  </Step>
  <Step title="2. 参考与单故障序列轨迹">
    保持语料/数据、词表、输入shape、时间切分和初值不变，只注入“${profile.fault}”，定位第一处偏离“${profile.invariant}”的表示、状态、梯度、采样或评价结果。

    <${profile.componentBase}SequenceTraceLab />
  </Step>
  <Step title="3. 独立评价与历史边界验收门">
    分别锁定数据/词表、表示shape、时序/梯度、随机采样与独立评价，展开${profile.artifact}后决定是否接受本章结论。

    <${profile.componentBase}EvaluationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时保持其余语料/数据、词表、切分、dtype/shape、时间顺序、容差和种子不变，沿五阶段寻找最早偏离；最终指标看似合理不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="能训练不等于表示、序列与评价语义正确">
  ${profile.scenario} 的代码只说明当前样例没有报错；“${profile.title}”仍需词ID映射、dtype/shape、时序状态、梯度对照、采样记录、独立评价和边界反例。
</Callout>

<Callout type="trap" title="当前大模型不能冒充2018年原版">
  “${profile.title}”引用现行文档是为了核对技术语义；当前大模型、现代Transformer变体与依赖兼容修正必须单列时间标签，不能倒填2018年日文原版或2020年中文译本；Transformer只属于原版8.5.2。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放实现协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stageNames
  .map(
    (stage, index) =>
      `| ${stage} | 在“${profile.title}”执行${stage}，只改变声明的表示、序列、梯度、采样或评价状态 | ${index === 0 ? "语料/数据哈希、词表、切分、dtype/shape与版本" : index === 4 ? "独立评价、反例、随机性、2018/当前边界与复现" : "词ID、输入输出shape、表示/隐藏状态、缓存、梯度、采样与损失"} | ${index === 0 ? "语料、词表或切分不可追溯" : index === 4 ? "无法重放或缺少独立评价" : profile.fault} |`,
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

该协议要求“${profile.title}”在相同语料/数据、词表、切分、dtype/shape、初值、时间顺序、容差和种子下重放。重置后若案例、阶段、轨迹模式、步骤、评价门或证据包没有回到基线，交互状态已经污染比较。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>检索键 dna-${alphaCode(index)} 对应目录坐标「${proseConcept(concept)}」；在“${profile.title}”中用于${mechanism}，需要连接原版范围、语料/词表、shape、时序/梯度轨迹、采样与评价证据。</GlossaryItem>`;
    })
    .join("\n");
  const coverageList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的目录项「${proseConcept(concept)}」：以“${mechanism}”解释实现作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背诵模型名称或最终指标，而是能围绕“${profile.question}”重建语料/数据、词表、表示、时序状态、梯度、采样与评价证据，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：NLP实验合同。** “${profile.title}”为什么必须先冻结语料/数据、词表、切分、dtype/shape、初值、时间顺序、容差和种子？

<Answer>
  ${profile.scenario} 若这些条件变化，相同输出可能来自不同词ID、表示、隐藏状态、梯度、采样或评价轨迹；“${profile.title}”先冻结合同，才能把观测连接到单一NLP机制。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明原版目录坐标已经进入机制、交互和练习？

<Answer>
${coverageList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一语料/数据、词表、切分、dtype/shape、初值、时间顺序、容差和种子，重放参考路径后只注入“${profile.fault}”；记录最早偏离，撤销故障再运行。只有表示账本、序列轨迹、评价门和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-plus-official-code-and-errata"
  workTitle="斋藤康毅著《ゼロから作るDeep Learning ❷ ―自然言語処理編》"
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
        label: "语料、词表与切分",
        detail: `“${profile.title}”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。`,
      },
      {
        label: "表示、shape与时序状态",
        detail: `“${profile.title}”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。`,
      },
      {
        label: "梯度、采样与随机性",
        detail: `“${profile.title}”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。`,
      },
      {
        label: "独立评价与历史边界",
        detail: `“${profile.title}”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。`,
      },
    ],
  };
  return `"use client";

import {
  NlpEvidenceLab,
  type NlpEvidenceModel,
} from "./nlp-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies NlpEvidenceModel;

export function ${profile.componentBase}RepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function ${profile.componentBase}SequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function ${profile.componentBase}EvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
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
import { ${profile.componentBase}RepresentationLedgerLab, ${profile.componentBase}SequenceTraceLab, ${profile.componentBase}EvaluationGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用表示账本、单故障序列轨迹和独立评价验收门完成复核。`,
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
const chapterHeadings = allConcepts.filter((item) =>
  /^第\s*\d+章/.test(item),
).length;
const primarySections = allConcepts.filter((item) =>
  /^\d+\.\d+\s/.test(item),
).length;
const secondarySections = allConcepts.filter((item) =>
  /^\d+\.\d+\.\d+\s/.test(item),
).length;
const appendixTitles = allConcepts.filter((item) =>
  /^附录\s*[A-C]/.test(item),
).length;
const appendixSections = allConcepts.filter((item) =>
  /^[A-C]\.\d+\s/.test(item),
).length;
const catalogLevels = allConcepts.length;
if (
  chapterHeadings !== 8 ||
  primarySections !== 46 ||
  secondarySections !== 125 ||
  appendixTitles !== 3 ||
  appendixSections !== 9 ||
  catalogLevels !== 191
) {
  throw new Error(
    `目录口径应为8章+46一级节+125二级节+3附录标题+9附录节=191，实际${chapterHeadings}+${primarySections}+${secondarySections}+${appendixTitles}+${appendixSections}=${catalogLevels}`,
  );
}

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "斋藤康毅著、陆宇杰译《深度学习进阶：自然语言处理》，人民邮电出版社，2020年10月，ISBN 9787115547644；原版《ゼロから作るDeep Learning ❷ ―自然言語処理編》，O'Reilly Japan，2018年7月21日，432页，ISBN 9784873118369",
  sourceKind:
    "official-original-publisher-complete-eight-chapter-forty-six-primary-one-hundred-twenty-five-secondary-three-appendix-nine-appendix-section-outline-plus-official-code-and-errata",
  sourceUrl: SOURCES.original,
  secondarySourceUrls: Object.values(SOURCES).slice(1),
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly Japan原版官方书页确认斋藤康毅著、2018年7月21日、432页、ISBN 9784873118369，并提供8章、3个附录的完整目录、官方代码与勘误入口；O'Reilly中文授权书目页核对陆宇杰译、人民邮电出版社2020年10月、ISBN 9787115547644。原版目录逐项统计8个章标题、46个一级节、125个二级节、3个附录标题和9个附录节，共191个正式层级。课程按8章与3个附录逐一覆盖，另设学习地图和总复习，共13页、39个章节专属交互；Transformer保持原版8.5.2坐标，不虚构独立章。未取得原书完整正文授权，全部中文解释、代码实验、交互、练习与答案均为独立教学重写。旧13页缺少合法目标/归属结构，存在跨章/章内模板复制，并缺少表示、时序、梯度和评价证据，现已整体替换。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  metrics: {
    formalUnits: previousManifest.units.length,
    chapterHeadings,
    primarySections,
    secondarySections,
    appendixTitles,
    appendixSections,
    formalNodes: catalogLevels,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
    reviewQuestions: profiles.length * 3,
  },
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/deep-learning-nlp-advanced-v2-profiles.json",
  factSourcePolicy:
    "O'Reilly Japan官方书页与完整目录限定2018年原版事实和191个目录层级，官方代码仓库与勘误核对实现；Python/NumPy/CuPy、WordNet/NLTK/PTB、word2vec/负采样、BPTT、LSTM/GRU、seq2seq、Attention、GNMT、Transformer、NTM与Dropout分别以官方文档、数据目录或原始论文核对。当前大模型、现代Transformer变体和兼容修正不得反写原版。",
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
      errataSource: SOURCES.errata,
      translationCatalogSource: SOURCES.chinese,
      translationMetadata:
        "陆宇杰译《深度学习进阶：自然语言处理》，人民邮电出版社，2020年10月，ISBN 9787115547644",
      technicalSources: Object.values(SOURCES).slice(4),
      officialUnits: previousManifest.units.length,
      officialChapterHeadings: chapterHeadings,
      officialPrimarySections: primarySections,
      officialSecondarySections: secondarySections,
      officialAppendixTitles: appendixTitles,
      officialAppendixSections: appendixSections,
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
  `已重建 ${profiles.length} 页，覆盖${chapterHeadings}章+${primarySections}一级节+${secondarySections}二级节+${appendixTitles}附录标题+${appendixSections}附录节=${catalogLevels}个原版层级，生成 ${profiles.length * 3} 个交互视图。`,
);
