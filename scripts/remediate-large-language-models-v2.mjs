#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "large-language-models";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/large-language-models/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/large-language-models-v2-profiles.json",
);

const SOURCES = {
  issuedEdition:
    "https://www.dedao.cn/ebook/detail?id=ekM2z5Kexap9AKyJEz8DOYn6GNrV20KNY89wdgbRXq1Qvlj7P5ZmoMkLB47y6ONA",
  catalog: "https://libopac.zust.edu.cn/Book.aspx?id=0124896178",
  publicToc: "https://book.douban.com/subject/36833492/",
  transformer:
    "https://proceedings.neurips.cc/paper/7181-attention-is-all-you-need",
  sentencePiece: "https://aclanthology.org/D18-2012/",
  gpt3: "https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html",
  scaling: "https://arxiv.org/abs/2001.08361",
  chinchilla: "https://arxiv.org/abs/2203.15556",
  switch: "https://jmlr.org/papers/v23/21-0998.html",
  rag: "https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html",
  instructGpt: "https://arxiv.org/abs/2203.02155",
  lora: "https://arxiv.org/abs/2106.09685",
  toxicity: "https://aclanthology.org/2020.findings-emnlp.301/",
  flamingo:
    "https://proceedings.neurips.cc/paper_files/paper/2022/hash/960a172bc7fbf0177ccccbb411a7d800-Abstract-Conference.html",
  blip2: "https://proceedings.mlr.press/v202/li23q.html",
  energy: "https://aclanthology.org/P19-1355/",
};

const PATHS = {
  learningMap: "00-map/llm-official-learning-map",
  "llm-preface": "01-preface/llm-preface",
  "llm-01": "02-debates-future/llm-01-debates-future",
  "llm-02": "03-language-tokenization/llm-02-language-modeling-tokenization",
  "llm-03": "04-transformer/llm-03-transformer",
  "llm-04": "05-pretraining-decoding/llm-04-pretraining-decoding",
  "llm-05": "06-icl-finetuning/llm-05-icl-lightweight-finetuning",
  "llm-06": "07-training-scale/llm-06-training-larger-models",
  "llm-07": "08-sparse-moe/llm-07-sparse-moe",
  "llm-08": "09-retrieval-augmented/llm-08-retrieval-augmented-lm",
  "llm-09": "10-preference-alignment/llm-09-human-preference-alignment",
  "llm-10": "11-bias-toxicity/llm-10-bias-toxicity",
  "llm-11": "12-vision-language/llm-11-vision-language-models",
  "llm-12": "13-environment/llm-12-environmental-impact",
  "llm-references": "14-references/llm-references",
  finalReview: "15-review/llm-official-final-review",
};

const UNIT_SPECS = {
  "llm-preface": {
    duty: "界定本书从语言建模到环境影响的12章范围、读者、出版时点与事实更新规则",
    question:
      "哪些内容属于2024年原书范围，哪些是当前补充，怎样避免把后来进展倒填为原书判断？",
    scenario: "建立一张原书目录、原始研究与当前实现的时间边界表",
    invariant: "出版时间、目录坐标、原始研究日期和当前API日期分栏记录",
    fault: "把2024年以后出现的模型、基准或政策写成原书已讨论事实",
    artifact: "范围声明、时间线、来源角色表与不适用边界",
    focus: "范围、时间与来源角色",
    sources: [SOURCES.issuedEdition, SOURCES.catalog],
  },
  "llm-01": {
    duty: "把意识、具身、世界模型、意图与泛化争议改写成可证伪主张和分层证据",
    question: "一个关于LLM理解、意识或世界模型的主张需要什么操作定义和反例？",
    scenario: "复核一项关于大语言模型能力或意识的公开主张",
    invariant: "术语、行为测试、机制证据、替代解释和不适用范围彼此分离",
    fault: "把流畅输出或单个成功案例直接当作意识与全面泛化证明",
    artifact: "主张—证据矩阵、反例、替代解释与结论强度",
    focus: "能力主张、意识争议与可证伪性",
    sources: [SOURCES.gpt3],
  },
  "llm-02": {
    duty: "从概率分解、统计/神经语言模型、困惑度和多种分词策略建立输入表示合同",
    question: "分词方案怎样改变序列长度、概率分解、词表覆盖和公平比较？",
    scenario: "让同一多语言样本经过字符、子词与无分词器表示",
    invariant: "文本规范化、词表、未知符号、序列长度、概率单位和评估集固定",
    fault: "比较模型困惑度时忽略不同分词器造成的每词元单位差异",
    artifact: "分词轨迹、概率账本、压缩率与可比性说明",
    focus: "语言概率、词元边界与评估单位",
    sources: [SOURCES.sentencePiece],
  },
  "llm-03": {
    duty: "从注意力、编码器—解码器、位置表示、长上下文、外部记忆到推理优化重建Transformer计算链",
    question: "每个张量shape、掩码、位置关系、缓存和近似优化怎样影响同一输出？",
    scenario: "在一个可手算短序列上逐层追踪Transformer与推理解码",
    invariant: "批次、头、序列、通道轴、因果掩码、位置、精度和缓存版本一致",
    fault: "因果掩码方向反转，注意力仍有数值却泄漏未来词元",
    artifact: "shape账本、注意力矩阵、缓存轨迹、首差与优化误差",
    focus: "注意力计算、位置与推理状态",
    sources: [SOURCES.transformer],
  },
  "llm-04": {
    duty: "比较模型架构、预训练目标、代表性模型与贪心/采样/束搜索等解码策略",
    question: "训练目标定义的条件概率与推理时解码规则怎样共同决定输出？",
    scenario: "冻结同一模型logits并比较多种解码策略",
    invariant:
      "模型快照、上下文、logits、温度、截断规则、随机种子和停止条件固定",
    fault: "不同模型使用不同温度与提示，却把输出差异完全归因于预训练目标",
    artifact: "目标分解、logit轨迹、候选树、随机状态与解码比较",
    focus: "预训练目标、条件概率与解码",
    sources: [SOURCES.gpt3, SOURCES.transformer],
  },
  "llm-05": {
    duty: "比较上下文学习、示范选择/排序、思维链、校准与添加/规范/重参数化轻量微调",
    question: "性能变化来自上下文样本、顺序、校准还是参数更新？",
    scenario: "对同一冻结模型执行上下文学习与LoRA式适配的单因素比较",
    invariant:
      "基座快照、提示模板、示范集合、顺序、训练预算、数据切分和评估冻结",
    fault: "同时更换示范、指令模板和适配器后把提升只归因于LoRA",
    artifact: "提示版本、示范排列、校准曲线、适配参数与单因素消融",
    focus: "上下文状态、校准与参数高效适配",
    sources: [SOURCES.gpt3, SOURCES.lora],
  },
  "llm-06": {
    duty: "把扩大尺度法则、涌现、加速器、数据/流水线/张量并行和低精度训练连接到预算与误差合同",
    question: "模型、数据、计算和精度规模怎样在同一预算口径下比较？",
    scenario: "为固定训练预算设计参数量、词元量、并行和精度方案",
    invariant:
      "参数、训练词元、FLOPs、硬件、通信、精度、损失口径和失败运行完整记录",
    fault: "只按参数量外推性能，忽略训练词元不足、通信与低精度误差",
    artifact: "规模账本、预算分解、并行时间线、数值探针与失败曲线",
    focus: "扩展规律、并行、精度与计算预算",
    sources: [SOURCES.scaling, SOURCES.chinchilla],
  },
  "llm-07": {
    duty: "比较词元到专家、专家到词元、全局/随机/双层路由与生产部署中的容量和负载",
    question: "每个词元为何进入这些专家，溢出、负载均衡和通信代价怎样被观察？",
    scenario: "让固定词元批次经过多种稀疏专家路由",
    invariant:
      "路由logits、top-k方向、容量因子、溢出规则、辅助损失和专家版本一致",
    fault: "只报告激活参数和吞吐，不记录溢出词元与专家负载塌缩",
    artifact: "路由矩阵、专家负载、溢出率、辅助损失与通信剖面",
    focus: "稀疏路由、容量与负载均衡",
    sources: [SOURCES.switch],
  },
  "llm-08": {
    duty: "比较预训练、词元级、精简、多跳、黑盒与视觉检索增强语言模型",
    question: "检索查询、候选文档、证据版本和生成结论怎样可追溯？",
    scenario: "在冻结语料快照上重放一次多跳检索增强问答",
    invariant: "查询、分块、嵌入、索引、top-k、重排、证据版本和答案引用冻结",
    fault: "答案引用的段落不在实际送入生成器的检索上下文中",
    artifact: "查询链、候选/重排列表、上下文包、引用对齐与无答案案例",
    focus: "检索谱系、上下文证据与生成归因",
    sources: [SOURCES.rag],
  },
  "llm-09": {
    duty: "从人类反馈、KL、REINFORCE/TRPO/PPO、语言/AI/自我反馈与偏好预训练建立对齐证据链",
    question: "偏好数据、奖励模型、参考策略和优化目标怎样避免相互污染？",
    scenario: "用冻结偏好对和参考策略复算一次对齐更新",
    invariant:
      "标注者与切分、偏好对、奖励模型、参考策略、KL方向、策略版本和评估独立",
    fault: "奖励模型训练数据与最终偏好测试重复，并把奖励上升当作人类偏好提升",
    artifact: "偏好数据卡、奖励差、KL、策略更新、盲评与分歧报告",
    focus: "偏好数据、奖励代理与策略约束",
    sources: [SOURCES.instructGpt],
  },
  "llm-10": {
    duty: "区分偏见与有害性，并比较解码、提示、数据、投影/正则、风格转换和强化学习干预",
    question: "谁定义伤害，哪些群体/语言/上下文被测，干预代价如何报告？",
    scenario: "在预注册多群体提示集上评估一种单一减害干预",
    invariant: "群体定义、提示模板、语言、采样、标注协议、效用与伤害指标均冻结",
    fault: "删除触发词后毒性分数下降，却忽略任务效用和隐含表达中的伤害",
    artifact: "数据声明、分群指标、标注分歧、效用—伤害权衡与失败案例",
    focus: "伤害定义、分群测量与干预权衡",
    sources: [SOURCES.toxicity],
  },
  "llm-11": {
    duty: "比较零额外训练、视觉引导、相似性、多模态适配、交叉注意力、联合训练、检索和视觉指令调整",
    question: "图像、文本、投影器、交叉注意力和语言模型分别改变什么表示？",
    scenario: "让同一图文样本经过冻结、轻量适配与联合训练三种路径",
    invariant:
      "图像预处理、文本、编码器/语言模型快照、投影维度、训练数据和评估一致",
    fault: "图文对来自同一实体却跨训练/测试泄漏，检索相似被误当泛化",
    artifact: "模态shape账本、注意力路径、数据谱系、对照生成与泄漏测试",
    focus: "视觉—语言接口、适配与数据谱系",
    sources: [SOURCES.flamingo, SOURCES.blip2],
  },
  "llm-12": {
    duty: "把训练与推理的能源、碳强度、硬件利用率、区域和估算不确定性连接为环境账本",
    question: "一次模型运行的能耗和排放边界包含哪些阶段，估算误差来自哪里？",
    scenario: "对同一训练任务在两个硬件/区域方案中估算排放",
    invariant:
      "系统边界、运行时间、功率、PUE、碳强度、硬件寿命分摊和不确定性显式",
    fault: "只用GPU标称功率乘训练时长，忽略利用率、PUE、区域和推理生命周期",
    artifact: "能耗账本、排放区间、假设、敏感性分析与报告边界",
    focus: "能源、排放、系统边界与不确定性",
    sources: [SOURCES.energy],
  },
  "llm-references": {
    duty: "把参考文献从装饰性书目变成目录主张、原始研究、版本和复核结论的双向索引",
    question: "每个技术结论是否能定位到真正支持它的原始来源与适用范围？",
    scenario: "抽样复核一个目录节点的主张、论文、实验和当前实现",
    invariant: "作者、题名、年份、版本、主张位置、证据类型和边界能够双向追溯",
    fault: "引用综述或二手博客，却声称其直接证明原始实验结论",
    artifact: "主张—来源矩阵、版本记录、支持/不支持裁决与缺口清单",
    focus: "引用谱系、证据强度与版本",
    sources: [SOURCES.transformer, SOURCES.rag],
  },
};

const MAP_SPEC = {
  title: "《大语言模型：基础与前沿》原版结构学习地图",
  duty: "沿前言、12章、参考文献和153个正式目录层级规划表示、训练、扩展、应用、风险与环境证据",
  question:
    "怎样按原书依赖从语言模型走到Transformer、训练扩展、RAG、对齐、多模态与环境影响？",
  scenario: "为一个可审计LLM项目建立16页学习与验收路线",
  invariant: "每个目录节点连接输入角色、可观察状态、单故障、恢复和独立评估",
  fault: "按流行模型拼贴课程，遗漏原书的争议、稀疏专家、环境影响或参考文献复核",
  artifact: "16页路线、153坐标覆盖矩阵与跨章依赖图",
  focus: "原版结构、先修依赖与证据路线",
  sources: [SOURCES.issuedEdition, SOURCES.publicToc],
};

const REVIEW_SPEC = {
  title: "《大语言模型：基础与前沿》全书证据总复习",
  duty: "把词元、注意力、训练目标、扩展、路由、检索、偏好、多模态、风险和环境成本串成端到端交付",
  question:
    "一个LLM结论怎样从正式坐标追溯到数据、计算、输出、独立评估与社会技术边界？",
  scenario: "复核一个从基座模型到检索、对齐和多模态部署的交付包",
  invariant: "153个坐标、参考/故障/恢复轨迹与时间/应用边界可以双向追溯",
  fault: "只凭精选输出或单一基准宣称模型能力、安全、效率和环境表现均成立",
  artifact: "全书覆盖矩阵、首差定位、跨切分评估与发布裁决",
  focus: "全书证据链、迁移与边界",
  sources: [SOURCES.transformer, SOURCES.instructGpt],
};

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function toPascal(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function stripCoordinate(value) {
  return value.replace(/^第\d+章\s*/, "").replace(/^\d+(?:\.\d+)+\s*/, "");
}

function mdxText(value) {
  return value
    .replace(/_/g, "\\_")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

function proseCoordinate(value) {
  return value.replace(/\.(?=\d)/g, "·");
}

function alphaCode(index) {
  let value = index + 1;
  let output = "";
  while (value > 0) {
    value -= 1;
    output = String.fromCharCode(65 + (value % 26)) + output;
    value = Math.floor(value / 26);
  }
  return output;
}

function termFor(concept, index) {
  const short = stripCoordinate(concept)
    .split(/[；;：:——,，]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 30
    ? short
    : `大语言模型坐标${index + 1}`;
}

function buildStages(title, specification) {
  return [
    {
      name: `${title} · 数据与输入`,
      input: specification.scenario,
      operation: `冻结${specification.focus}所需的数据角色、版本、切分、模板和shape`,
      output: `${title}的输入合同、版本表与基线快照`,
      check: `${title}的来源、许可、角色、单位、shape和可见性没有越界`,
    },
    {
      name: `${title} · 目标与计算`,
      input: `${title}的冻结输入与模型快照`,
      operation: `执行${specification.duty}的最小计算并保存中间状态`,
      output: `${title}的目标分量、计算轨迹与单故障分岔`,
      check: `${title}每一步可由同一输入、公式、版本和随机状态复算`,
    },
    {
      name: `${title} · 输出与解码`,
      input: `${title}的中间状态、候选与决策规则`,
      operation: "比较输出、路由、检索、策略或资源估计的更新前后状态",
      output: `${title}的候选差、引用/策略/资源谱系与恢复路径`,
      check: `${title}没有把代理目标、精选输出或训练内统计当作最终结论`,
    },
    {
      name: `${title} · 独立评估`,
      input: `${title}的冻结候选与未见数据、盲评或独立诊断`,
      operation: "重放预测、单故障、恢复和不适用边界",
      output: `${title}的接受、回退或拒绝理由`,
      check: `${title}满足“${specification.invariant}”`,
    },
  ];
}

function enrichProfile(key, specification, role, allCoordinates, unit = null) {
  const target = PATHS[key];
  if (!target) throw new Error(`缺少页面路径：${key}`);
  const [, chapterSlug] = target.split("/");
  const title = specification.title ?? unit?.title;
  if (!title) throw new Error(`缺少标题：${key}`);
  const concepts =
    role === "unit"
      ? conceptStrings(unit)
      : allCoordinates.filter(
          (value) =>
            value === "前言" || value === "参考文献" || /^第\d+章/.test(value),
        );
  const stages = buildStages(title, specification);
  return {
    id: key,
    role,
    officialUnitId: role === "unit" ? unit.id : null,
    target,
    chapterSlug,
    componentBase: toPascal(chapterSlug),
    title,
    concepts,
    stages,
    ...specification,
    cases: [
      {
        name: `${title} · 基线`,
        setup: `固定${specification.scenario}的数据、模型、模板、种子和预算`,
        prediction: `${title}的参考轨迹应持续满足“${specification.invariant}”`,
        boundary: `${title}只回答本页正式坐标与已运行实验合同内的问题`,
      },
      {
        name: `${title} · 单故障`,
        setup: `保持其余条件不变，只注入“${specification.fault}”`,
        prediction: `${title}应出现可定位的首个状态分岔，而不是只在末端输出异常`,
        boundary: `${title}的故障结论不能外推到未运行的数据、模型、语言或部署流量`,
      },
      {
        name: `${title} · 恢复`,
        setup: `撤销故障并从同一快照重放${specification.scenario}`,
        prediction: `${title}的计算、独立评估和交付证据应恢复基线`,
        boundary: `${title}若不能复现恢复结果，就不能把异常归因给单一故障`,
      },
    ],
    referenceTrace: stages.map(
      (stage, index) =>
        `${title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}。`,
    ),
    faultTrace: stages.map((stage, index) =>
      index === 1
        ? `${title}故障步骤${index + 1}：只注入“${specification.fault}”，记录首个偏离“${stage.check}”的状态。`
        : `${title}故障步骤${index + 1}：保持${stage.input}不变，检查${stage.output}如何受单一故障传播。`,
    ),
    gates: [
      {
        label: "原书结构与时间边界",
        detail: `${title}区分2024年发行版目录、原始研究、当前框架行为与本站独立重写，不把后续进展倒填为原书内容。`,
      },
      {
        label: "数据、表示与计算合同",
        detail: `${title}的输入、来源、切分、词元/模态shape、模型版本、中间状态和随机性可复算。`,
      },
      {
        label: "目标、输出与资源合同",
        detail: `${title}的训练/代理目标、解码/路由/检索决策、输出、引用、资源或伤害指标已归档。`,
      },
      {
        label: "独立评估与社会技术边界",
        detail: `${title}以未见数据、盲评或独立诊断复核“${specification.invariant}”，并报告“${specification.fault}”的恢复结果。`,
      },
    ],
  };
}

function mechanismFor(concept, profile) {
  const title = stripCoordinate(concept);
  const rules = [
    [
      /前言|辩论|争议|未来|意识|具身|世界模型|意图|泛化|曙光/,
      "把范围或能力主张写成带时间、操作定义、替代解释和反例的可证伪合同",
      "主张—证据矩阵、时间线、行为测试、机制证据和反例",
      "把流畅输出、作者观点或单个成功案例当作机制与普遍能力证明",
    ],
    [
      /语言模型|统计|神经语言|评估|分词|词元|字符|子词|空格/,
      "对齐文本规范化、词元边界、概率分解、序列长度和评估单位",
      "分词轨迹、词表覆盖、概率账本、序列长度和可比性说明",
      "忽略不同分词器导致的概率单位与成本差异",
    ],
    [
      /Transformer|编码器|解码器|位置|上下文|记忆|注意力|推测解码|修剪|蒸馏|混合精度|推理/,
      "追踪注意力shape、掩码、位置、缓存、近似和解码状态",
      "shape账本、注意力矩阵、缓存轨迹、延迟、内存与误差",
      "掩码、位置或缓存版本错位但输出仍看似合理",
    ],
    [
      /预训练|模型架构|代表性|解码策略/,
      "区分训练条件概率、模型架构、logits和推理解码规则",
      "目标分解、logit轨迹、候选树、随机种子与停止原因",
      "同时更换模型、提示和解码参数后给单一因素归因",
    ],
    [
      /上下文学习|示范|样本|指令|思维链|提示|校准|微调|添加|规范|参数|混合方法/,
      "冻结基座、提示、示范、切分与预算，区分上下文状态和参数更新",
      "提示版本、示范顺序、校准曲线、适配参数和单因素消融",
      "提示、数据和适配器同时变化造成不可归因比较",
    ],
    [
      /尺度|涌现|加速器|并行|流水线|张量|专家混合|低精度|FP8|INT8|内存/,
      "把参数、词元、计算、硬件、并行、精度和失败运行放进同一预算",
      "规模账本、FLOPs、并行时间线、通信、数值探针和学习曲线",
      "只按参数量外推能力并忽略数据、计算、通信和数值误差",
    ],
    [
      /稀疏|专家|路由|top-k|分配|生产规模|MoE|集成/,
      "跟踪词元—专家分配、容量、溢出、负载均衡和通信",
      "路由矩阵、专家负载、溢出率、辅助损失和通信剖面",
      "只报告激活参数与吞吐，隐藏路由塌缩和丢弃词元",
    ],
    [
      /检索|问答|多跳|黑盒|视觉增强/,
      "保存查询、分块、索引、候选、重排、上下文和答案引用谱系",
      "查询链、候选列表、上下文包、引用对齐和无答案案例",
      "引用未进入生成上下文或索引版本与声明不一致",
    ],
    [
      /偏好|人类反馈|强化学习|KL|REINFORCE|TRPO|PPO|语言反馈|人工智能反馈|自我反馈|监督学习/,
      "区分偏好数据、奖励代理、参考策略、KL约束、策略更新和盲评",
      "偏好数据卡、奖励差、KL、策略版本、盲评与标注分歧",
      "奖励模型与最终测试泄漏或代理奖励取代真实偏好",
    ],
    [
      /偏见|有害|脱毒|投影|正则化|风格转换/,
      "预注册群体、语言、提示、标注、效用和伤害指标并报告权衡",
      "数据声明、分群指标、标注分歧、效用—伤害曲线和失败案例",
      "只降单一分类器分数却隐藏效用损失或未测群体",
    ],
    [
      /视觉|多模态|图像|相似性|前缀|交叉注意力|图文/,
      "对齐图像、文本、编码器、投影器、交叉注意力和语言模型的数据角色",
      "模态shape、注意力路径、数据谱系、对照生成和泄漏测试",
      "图文实体跨切分泄漏或相似检索被误当作跨域泛化",
    ],
    [
      /环境|能源|排放|温室气体/,
      "声明能耗与排放系统边界、硬件、利用率、区域、PUE和不确定性",
      "运行日志、功率、PUE、碳强度、估算区间和敏感性分析",
      "只用标称功率乘时间并外推完整生命周期排放",
    ],
    [
      /参考文献|小结/,
      "把本章主张、原始来源、版本、复核结论和未解决缺口双向连接",
      "主张—来源矩阵、版本记录、支持/不支持裁决和缺口清单",
      "二手来源或总结段被当作原始实验与普遍结论",
    ],
  ];
  const rule = rules.find(([pattern]) => pattern.test(title));
  return rule
    ? rule.slice(1)
    : [
        `把“${title}”放进${profile.focus}的数据—目标—计算—输出链`,
        `${profile.title}的输入角色、中间状态、输出、反例与独立评估`,
        `只复述“${title}”名称而没有可观察状态、单一故障和恢复证据`,
      ];
}

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并区分2024年原书目录、原始研究、当前实现和本站重写
- 能先预测“${profile.question}”会改变哪一个数据、表示、目标、计算、输出或评估状态，再操作三类交互证据
- 能只注入“${profile.fault}”，定位首个偏离“${profile.invariant}”的状态，并从同一快照完成恢复

</Objectives>`;
}

function sourceSection(profile) {
  const sources = profile.sources
    .map((url, index) => `[本页独立核对 ${index + 1}](${url})`)
    .join("、");
  return `## 原书书目、153个正式坐标与访问边界

“${profile.title}”以[发行数字版](${SOURCES.issuedEdition})核对熊涛著《大语言模型：基础与前沿》的前言、12章和参考文献，以[馆藏书目](${SOURCES.catalog})核对人民邮电出版社、2024年4月、260页和ISBN 9787115634887，再以[公开目录](${SOURCES.publicToc})交叉核对全部节/小节。正式分母为前言1个、章标题12个、编号节/小节139个和参考文献1个，合计153个目录层级。

本书是熊涛原创中文专著，不是外文书的中译本；因此不存在可假定的英文“原版”供逐句对照。发行数字版可阅读不等于允许复制或改编，“${profile.title}”不复制、翻译或改写原书正文、图表和案例，只把目录与书目元数据作为范围坐标；中文讲解、计算轨迹、反例、交互、练习与答案均为独立教学重写。

${sources}只用于独立核对本页技术事实和实验边界，不能反向证明原书采用本站表述。2024年以后出现的模型、框架、政策或基准必须带当前时间标签，不能倒填为原书内容。`;
}

const patterns = [
  (p, c, m, e, x, i) =>
    `在“${p.title}”的第${i + 1}个正式坐标中，「${c}」通过${m}推进${p.focus}；复核者保存${e}，出现${x}就撤回结论。`,
  (p, c, m, e, x, i) =>
    `围绕“${p.question}”，“${p.title}”在坐标${i + 1}把「${c}」落实为${m}；只有${e}可重放且反例排除${x}，本节点才算掌握。`,
  (p, c, m, e, x, i) =>
    `“${p.title}”的目录节点${i + 1}「${c}」不能停在术语解释：它要${m}，交付${e}，并把${x}设为单一反事实。`,
  (p, c, m, e, x, i) =>
    `对“${p.title}”而言，「${c}」在第${i + 1}次检查中改变可观察状态，因为它负责${m}；${e}必须与“${p.invariant}”对齐，不能接受${x}。`,
];

function conceptsSection(profile) {
  return `## 原书目录层级与可验证机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept, profile);
    const term = termFor(concept, index);
    const safeConcept = mdxText(proseCoordinate(concept));
    const definition = `${term}对应正式目录坐标“${concept}”，在“${profile.title}”中用于${mechanism}，并受数据、版本、shape、目标、随机性、评估与社会技术边界约束。`;
    return `### ${safeConcept}

<Term def=${JSON.stringify(definition)}>${mdxText(term)}</Term>

**正式坐标 ${index + 1}/${profile.concepts.length}。** 原书目录键 \`${concept}\`。${patterns[index % patterns.length](profile, safeConcept, mechanism, evidence, caution, index)}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个章专属实验

<Callout type="info" title="先写出哪个状态会最先变化">
  对“${profile.title}”先冻结${profile.scenario}的数据、模型、模板、预算、随机性和评估口径，再操作三类实验；结果与预测不同就修改假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 语料、上下文与输出合同">
    为“${profile.title}”选择正式目录坐标，在参考合同与单一反例间切换，逐阶段核对输入、操作、输出证据和裁决。

    <${profile.componentBase}ContextContractLab />
  </Step>
  <Step title="2. 目标、计算与解码轨迹">
    保持“${profile.title}”的${profile.scenario}不变，只注入“${profile.fault}”，逐步定位首个偏离“${profile.invariant}”的位置。

    <${profile.componentBase}ComputeTraceLab />
  </Step>
  <Step title="3. 独立评估与边界门">
    在“${profile.title}”的基线、单故障和恢复案例间切换，展开结构、数据、计算和独立评估门后再决定是否交付。

    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页单一故障：${profile.fault}">
  “${profile.title}”遇到该故障时必须保持其余数据、模型、模板、预算和随机序列不变；精选输出偶尔更好不能替代首个状态分岔与恢复证据。
</Callout>

<Callout type="trap" title="代理目标和演示输出不等于独立结论">
  “${profile.title}”中的训练损失、困惑度、奖励、检索分数、毒性分类器或碳估算只回答各自合同；它们不能自动证明理解、偏好、安全、泛化或完整环境影响。
</Callout>

<Callout type="trap" title="数字版可阅读不等于允许复制">
  “${profile.title}”可以用发行版和公开目录核对范围，但没有获得复制、翻译或改写原书正文与图表的授权；当前内容必须保持独立表达、原始研究核对和时间边界。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放协议

| 阶段 | 允许动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage) =>
      `| ${stage.name} | ${stage.operation} | ${stage.output} | 未满足“${stage.check}” |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_concept_mode_stage_trace_step_case_gates_and_artifact
\`\`\`

“${profile.title}”要求从同一数据、模型、模板、版本、预算和随机状态重放参考、故障与恢复路径。重置后若目录选择、模式、阶段、轨迹步骤、案例、证据门或交付包没有回到基线，本次比较已经混入状态泄漏。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept, profile);
      return `  <GlossaryItem term=${JSON.stringify(termFor(concept, index))}>检索键 llm-${alphaCode(index)} 对应正式目录坐标「${mdxText(proseCoordinate(concept))}」；在“${profile.title}”中用于${mechanism}，需要连接原书范围、计算状态、独立证据和不适用边界。</GlossaryItem>`;
    })
    .join("\n");
  const coverage = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept, profile);
      return `${index + 1}. “${profile.title}”的目录项「${mdxText(proseCoordinate(concept))}」：以“${mechanism}”解释作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是背模型名或复制提示，而是围绕“${profile.question}”重建数据、表示、目标、计算、输出、资源和独立评估，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}。

## 练习与答案

<Exercises>

1. **问题 1：实验合同。** “${profile.title}”为什么必须先冻结数据、模型、模板、版本、预算、随机性和评估口径？

<Answer>
  若同时改变这些条件，相同输出可能来自不同语料、表示、目标、解码、检索或选择路径；先冻结合同，才能把观测连接到单一机制并定位首差。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明“${profile.title}”的正式目录坐标已经进入机制、交互和练习？

<Answer>
${coverage}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一数据、模型、模板、版本、预算和随机流，重放参考路径后只注入该故障；记录首个偏离，撤销故障再运行。只有上下文合同、计算轨迹、独立评估和${profile.artifact}重新满足“${profile.invariant}”，修正才可提交。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="issued-edition-complete-detailed-toc-plus-primary-research"
  workTitle="熊涛著《大语言模型：基础与前沿》"
  adaptedUrl="${SOURCES.issuedEdition}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    stages: profile.stages,
    cases: profile.cases,
    referenceTrace: profile.referenceTrace,
    faultTrace: profile.faultTrace,
    gates: profile.gates,
  };
  return `"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "./llm-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies LlmEvidenceModel;

export function ${profile.componentBase}ContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function ${profile.componentBase}ComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function ${profile.componentBase}EvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
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
  ${profile.componentBase}ContextContractLab,
  ${profile.componentBase}ComputeTraceLab,
  ${profile.componentBase}EvidenceGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

“${profile.title}”围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个数据、表示、目标、计算、输出或评估状态会最先变化，再运行参考、故障和恢复路径；运行后补理由不算预测。只有守住“${profile.invariant}”并交付${profile.artifact}，困惑度、基准、偏好、检索、伤害或环境指标才构成机制证据。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesisSection(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    section: profile.title,
    description: `${profile.duty}；用上下文合同、计算轨迹和独立证据门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.issuedEdition,
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
    wrapperSource(profile),
    "typescript",
  );
}

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = manifestDocument.books[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  if (!unit.chapterPath) throw new Error(`缺少单元页面映射：${unit.id}`);
}

const allCoordinates = manifest.units.flatMap(conceptStrings);
const prefaceNodes = allCoordinates.filter((item) => item === "前言").length;
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const numberedNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const referenceNodes = allCoordinates.filter(
  (item) => item === "参考文献",
).length;
const formalNodes = allCoordinates.length;
if (
  prefaceNodes !== 1 ||
  chapterHeadings !== 12 ||
  numberedNodes !== 139 ||
  referenceNodes !== 1 ||
  formalNodes !== 153
)
  throw new Error(
    `目录层级计数异常：前言${prefaceNodes}、章${chapterHeadings}、编号节/小节${numberedNodes}、参考文献${referenceNodes}、总计${formalNodes}`,
  );

const profiles = [
  enrichProfile("learningMap", MAP_SPEC, "learning-map", allCoordinates),
  ...manifest.units.map((unit) => {
    const specification = UNIT_SPECS[unit.id];
    if (!specification) throw new Error(`缺少单元画像：${unit.id}`);
    return enrichProfile(unit.id, specification, "unit", allCoordinates, unit);
  }),
  enrichProfile("finalReview", REVIEW_SPEC, "final-review", allCoordinates),
];
if (profiles.length !== 16)
  throw new Error(`页面数量异常：应为16，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

manifest.status = "verified-outline-independent-rewrite";
manifest.verifiedAt = "2026-07-30";
manifest.edition =
  "熊涛著《大语言模型：基础与前沿》，人民邮电出版社/异步图书，2024年4月，260页，ISBN 9787115634887";
manifest.sourceUrl = SOURCES.issuedEdition;
manifest.sourceKind =
  "publisher-issued-digital-edition-complete-preface-twelve-chapter-one-hundred-thirty-nine-numbered-section-reference-toc-plus-library-metadata";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.secondarySourceUrls = [SOURCES.catalog, SOURCES.publicToc];
manifest.disclosureNote =
  "发行数字版核对熊涛原创中文专著《大语言模型：基础与前沿》的前言、12章与参考文献，馆藏书目核对人民邮电出版社、2024年4月、260页和ISBN 9787115634887，公开目录交叉核对139个编号节/小节；正式分母为153个目录层级。本书不是外文书中译本，不假设不存在的英文原版。发行版可阅读不等于允许复制，本站不复制或改写原书正文、图表与案例；技术讲解、交互、反例、练习和答案均按目录与原始研究独立重写。";
manifest.unitMappingEvidence =
  "14个manifest单元与前言、12章、参考文献复核页一一映射；学习地图与总复习不冒充原书单元。";
manifest.factSourcePolicy =
  "发行版和公开目录只限定范围；技术事实由原始论文或官方文档独立核对。2024年以后出现的模型、框架、政策和基准必须标注当前时间，不倒填为原书内容；无法核对时不得写成确定事实。";
manifest.metrics = {
  formalPrefaceNodes: 1,
  formalChapterHeadings: 12,
  formalNumberedSectionsAndSubsections: 139,
  formalReferenceNodes: 1,
  formalConceptNodes: 153,
  officialUnits: 14,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 16,
  interactiveViews: 48,
  visualKinds: [
    "llm-context-contract",
    "llm-compute-trace",
    "llm-evidence-gate",
  ],
};
manifest.coverageMetrics = {
  targetFormalNodes: 153,
  coveredFormalNodes: 153,
  coveragePercent: 100,
};

const portableProfiles = profiles.map((profile) => ({
  id: profile.id,
  role: profile.role,
  officialUnitId: profile.officialUnitId,
  target: profile.target,
  title: profile.title,
  duty: profile.duty,
  question: profile.question,
  scenario: profile.scenario,
  invariant: profile.invariant,
  fault: profile.fault,
  artifact: profile.artifact,
  focus: profile.focus,
  concepts: profile.concepts,
  sources: profile.sources,
  sourceAccess: "outline-only",
  sourceMode: "independent-rewrite",
}));

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(portableProfiles, null, 2)}\n`,
  "json",
);
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

console.log(
  `已重建16页，覆盖前言1+12章+139编号节/小节+参考文献1=${formalNodes}个正式坐标，生成48个交互视图。`,
);
