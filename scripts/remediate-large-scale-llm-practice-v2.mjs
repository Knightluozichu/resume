#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "large-scale-llm-practice";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/large-scale-llm-practice-v2-profiles.json",
);

const SOURCES = {
  bookSite: "https://intro-llm.github.io/",
  bookPdf: "https://intro-llm.github.io/chapter/LLM-TAP.pdf",
  publisher: "https://phei.com.cn/module/goods/wssd_content.jsp?bookid=63826",
  secondPdf: "https://intro-llm.github.io/chapter/LLM-TAP-v2.pdf",
  secondPublisher:
    "https://www.phei.com.cn/module/goods/wssd_content_comment.jsp?bookid=67177",
  transformer: "https://arxiv.org/abs/1706.03762",
  llama: "https://arxiv.org/abs/2302.13971",
  pile: "https://arxiv.org/abs/2101.00027",
  roots: "https://arxiv.org/abs/2303.03915",
  refinedWeb: "https://arxiv.org/abs/2306.01116",
  slimPajama: "https://huggingface.co/datasets/cerebras/SlimPajama-627B",
  zeroPaper: "https://arxiv.org/abs/1910.02054",
  deepspeed: "https://www.deepspeed.ai/tutorials/zero/",
  lora: "https://arxiv.org/abs/2106.09685",
  positionInterpolation: "https://arxiv.org/abs/2306.15595",
  hfTraining: "https://huggingface.co/docs/transformers/main/en/training",
  instruct: "https://arxiv.org/abs/2203.02155",
  ppo: "https://arxiv.org/abs/1707.06347",
  moss: "https://github.com/OpenLMLab/MOSS-RLHF",
  cot: "https://arxiv.org/abs/2201.11903",
  leastToMost: "https://arxiv.org/abs/2205.10625",
  langchain: "https://docs.langchain.com/oss/python/langchain/overview",
  vllmPaper: "https://arxiv.org/abs/2309.06180",
  vllmDocs: "https://docs.vllm.ai/en/stable/index.html",
  helm: "https://arxiv.org/abs/2211.09110",
  ceval: "https://arxiv.org/abs/2305.08322",
  mtbench: "https://arxiv.org/abs/2306.05685",
};

const SOURCE_INDEX = Object.fromEntries(
  [
    [
      "bookSite",
      "作者官方站点",
      SOURCES.bookSite,
      "核对作者、第一版/第二版入口、第一版8章课件与公开完整版标识",
    ],
    [
      "bookPdf",
      "作者公开第一版完整预览稿",
      SOURCES.bookPdf,
      "核对前言、数学符号、8章、参考文献、索引和全部127个正式层级",
    ],
    [
      "publisher",
      "电子工业出版社第一版书目",
      SOURCES.publisher,
      "核对2024年1月、320页、ISBN 9787121467059和四阶段内容简介",
    ],
    [
      "secondPdf",
      "作者公开第二版预览稿",
      SOURCES.secondPdf,
      "仅用于划定2025年第二版新增结构，禁止混入第一版目录",
    ],
    [
      "secondPublisher",
      "电子工业出版社第二版书目",
      SOURCES.secondPublisher,
      "核对2025年4月和ISBN 9787121500572，并记录公开页数冲突",
    ],
    [
      "transformer",
      "Transformer原始论文",
      SOURCES.transformer,
      "独立核对注意力、编码器/解码器、残差与前馈网络",
    ],
    [
      "llama",
      "LLaMA原始论文",
      SOURCES.llama,
      "独立核对第一版讨论的LLaMA模型家族与训练公开边界",
    ],
    [
      "pile",
      "The Pile原始论文",
      SOURCES.pile,
      "核对22个子语料组成、数据多样性及已知风险",
    ],
    [
      "roots",
      "ROOTS原始论文",
      SOURCES.roots,
      "核对多语言语料构建、治理和文档化边界",
    ],
    [
      "refinedWeb",
      "RefinedWeb原始论文",
      SOURCES.refinedWeb,
      "核对网页过滤、去重、规模与公开子集",
    ],
    [
      "slimPajama",
      "SlimPajama维护方数据卡",
      SOURCES.slimPajama,
      "核对SlimPajama数据来源与可用范围",
    ],
    [
      "zeroPaper",
      "ZeRO原始论文",
      SOURCES.zeroPaper,
      "核对优化器状态、梯度和参数分片的内存机制",
    ],
    [
      "deepspeed",
      "DeepSpeed当前ZeRO文档",
      SOURCES.deepspeed,
      "核对当前ZeRO阶段、检查点恢复和配置边界",
    ],
    [
      "lora",
      "LoRA原始论文",
      SOURCES.lora,
      "核对冻结基座参数、低秩增量与可训练参数边界",
    ],
    [
      "positionInterpolation",
      "位置插值原始论文",
      SOURCES.positionInterpolation,
      "核对上下文窗口扩展的插值机制和实验边界",
    ],
    [
      "hfTraining",
      "Transformers当前训练文档",
      SOURCES.hfTraining,
      "核对当前训练接口；不把当前API倒灌成第一版历史代码",
    ],
    [
      "instruct",
      "InstructGPT原始论文",
      SOURCES.instruct,
      "核对SFT、偏好比较、奖励模型和RLHF训练流程",
    ],
    ["ppo", "PPO原始论文", SOURCES.ppo, "核对截断代理目标、策略更新和基线比较"],
    [
      "moss",
      "MOSS-RLHF官方仓库",
      SOURCES.moss,
      "核对第一版MOSS-RLHF实践的代码、依赖、数据和许可证边界",
    ],
    [
      "cot",
      "Chain-of-Thought原始论文",
      SOURCES.cot,
      "核对思维链提示实验设置和模型规模边界",
    ],
    [
      "leastToMost",
      "Least-to-Most原始论文",
      SOURCES.leastToMost,
      "核对由子问题分解到组合求解的提示方法",
    ],
    [
      "langchain",
      "LangChain当前官方概览",
      SOURCES.langchain,
      "核对当前create_agent与LangGraph轨道；不与第一版旧接口混写",
    ],
    [
      "vllmPaper",
      "vLLM原始论文",
      SOURCES.vllmPaper,
      "核对PagedAttention、吞吐和服务实验设置",
    ],
    [
      "vllmDocs",
      "vLLM当前官方文档",
      SOURCES.vllmDocs,
      "核对当前服务入口和平台支持，并与第一版实践分轨",
    ],
    [
      "helm",
      "HELM原始论文",
      SOURCES.helm,
      "核对多场景、多指标和透明报告的整体评估框架",
    ],
    [
      "ceval",
      "C-Eval原始论文",
      SOURCES.ceval,
      "核对中文多学科知识评估设置与限制",
    ],
    [
      "mtbench",
      "MT-Bench与Chatbot Arena原始论文",
      SOURCES.mtbench,
      "核对多轮对话、LLM裁判和位置偏差等评估边界",
    ],
  ].map(([id, label, url, use]) => [id, { label, url, use }]),
);

const PATHS = {
  "lsl-preface": "01-preface/lsl-preface",
  "lsl-mathematical-notation": "02-notation/lsl-mathematical-notation",
  "lsl-01": "03-introduction/lsl-01-introduction",
  "lsl-02": "04-foundations/lsl-02-llm-foundations",
  "lsl-03": "05-data/lsl-03-pretraining-data",
  "lsl-04": "06-distributed-training/lsl-04-distributed-training",
  "lsl-05": "07-supervised-finetuning/lsl-05-supervised-finetuning",
  "lsl-06": "08-reinforcement-learning/lsl-06-reinforcement-learning",
  "lsl-07": "09-applications/lsl-07-llm-applications",
  "lsl-08": "10-evaluation/lsl-08-llm-evaluation",
  "lsl-references": "11-references/lsl-references",
  "lsl-index": "12-index/lsl-index",
};

const SPEC_DATA = {
  "lsl-preface": [
    "建立作者公开稿、出版社纸书、第一版127坐标和第二版排除线的证据合同",
    "怎样使用作者公开完整稿而不把它误写成出版社逐页扫描，也不混入第二版？",
    "把第二版新增章节、2025方法或冲突页数写进第一版正文",
    "第一版来源快照、127坐标矩阵、版本差分和公开元数据冲突记录",
    "作者公开稿、纸书书目、版次边界与独立重写",
    ["bookSite", "bookPdf", "publisher", "secondPdf", "secondPublisher"],
  ],
  "lsl-mathematical-notation": [
    "把标量、向量、矩阵、张量、概率、梯度、损失和复杂度绑定到shape与单位",
    "数学符号怎样成为可执行检查，而不是脱离张量轴、批次和归约方式的装饰？",
    "在不声明shape、axis和归约范围时混用点积、Hadamard积、期望与KL散度",
    "符号表、shape账本、单位检查、最小手算和数值梯度差分",
    "数学符号、张量对象、概率测度与数值检查",
    ["bookPdf", "transformer", "zeroPaper"],
  ],
  "lsl-01": [
    "把基本概念、发展历程、构建流程和全书安排落到可复核的阶段合同",
    "绪论怎样区分历史时间线、模型规模、训练阶段和当前能力证据？",
    "用单一产品演示或参数量证明模型理解、通用性和安全性",
    "历史时间线、构建阶段图、证据等级和失败成本登记",
    "LLM概念、历史、四阶段构建流程与阅读路线",
    ["bookPdf", "publisher", "transformer", "llama"],
  ],
  "lsl-02": [
    "从嵌入、注意力、前馈、残差、归一化、GPT和LLaMA重放张量状态",
    "大语言模型基础怎样从结构名称落实为shape、掩码、目标和可复算输出？",
    "改变注意力掩码、位置或归一化顺序，却只比较最终文本流畅度",
    "张量shape轨迹、掩码矩阵、残差差分、loss与生成回归集",
    "Transformer、GPT、LLaMA与注意力优化",
    ["bookPdf", "transformer", "llama"],
  ],
  "lsl-03": [
    "为通用/专业数据、过滤、去重、隐私、分词、规模、质量和多样性建谱系",
    "预训练数据怎样证明每个token的来源、处理、许可、隐私和评估污染状态？",
    "先切训练测试再做近重复去重，导致评估样本泄漏进训练语料",
    "数据谱系、过滤原因、近重复簇、PII检查、tokenizer哈希和污染报告",
    "数据来源、处理、影响分析与四个开放数据集合",
    ["bookPdf", "pile", "roots", "refinedWeb", "slimPajama"],
  ],
  "lsl-04": [
    "比较数据并行、张量/流水线并行、混合并行、集群拓扑和ZeRO状态分片",
    "分布式训练怎样同时解释内存、计算、通信、气泡、检查点与恢复？",
    "只看单步吞吐而忽略梯度等价、通信同步和分片检查点完整性",
    "rank拓扑、collective trace、显存账本、梯度校验和与恢复检查点",
    "并行策略、集群架构、DeepSpeed与LLaMA训练实践",
    ["bookPdf", "zeroPaper", "deepspeed"],
  ],
  "lsl-05": [
    "串联提示/语境学习、LoRA、位置扩展、指令数据和DeepSpeed-Chat SFT",
    "有监督微调怎样证明数据、可训练参数、上下文位置和评估都没有泄漏？",
    "在同一验证集上选择指令、LoRA秩、窗口长度和最佳检查点后报告泛化",
    "指令数据谱系、参数差分、位置映射、训练曲线和独立评估集",
    "提示学习、高效微调、窗口扩展、指令数据与SFT实践",
    ["bookPdf", "lora", "positionInterpolation", "hfTraining", "instruct"],
  ],
  "lsl-06": [
    "从MDP、偏好数据、奖励模型、策略梯度、GAE、PPO到MOSS-RLHF重放状态",
    "强化学习章节怎样区分偏好代理、策略更新、KL约束和真实任务质量？",
    "把奖励模型分数上升等同于更真实、更安全或更符合未见用户",
    "偏好数据谱系、奖励校准、优势轨迹、PPO比率、KL曲线和人评差分",
    "RLHF、奖励模型、PPO与MOSS-RLHF实践",
    ["bookPdf", "instruct", "ppo", "moss"],
  ],
  "lsl-07": [
    "把CoT、Least-to-Most、LangChain、知识库、Agent、多模态与服务优化分轨",
    "LLM应用怎样把提示、检索、工具、视觉输入和服务运行时变成可观察合同？",
    "混用第一版LangChain/FastServe示例与当前接口，或用一次成功隐藏工具副作用",
    "提示版本、检索证据、工具trace、多模态对齐样本、服务吞吐与回退快照",
    "推理规划、应用框架、Agent、多模态和vLLM推理",
    ["bookPdf", "cot", "leastToMost", "langchain", "vllmPaper", "vllmDocs"],
  ],
  "lsl-08": [
    "建立知识能力、安全、领域、自动/人工指标和基础/SFT/RL模型评估矩阵",
    "大模型评估怎样避免测试污染、裁判偏差、单指标排名和选择性报告？",
    "用同一LLM既生成答案又当裁判，并忽略位置偏差和人类一致性",
    "任务卡、样本哈希、指标定义、裁判交换、置信区间和失败切片",
    "评估体系、指标、方法和基础/SFT/RL模型实践",
    ["bookPdf", "helm", "ceval", "mtbench"],
  ],
  "lsl-references": [
    "把书内参考文献还原成主张—来源—版本—访问日期的可审计索引",
    "参考文献页怎样证明每个技术主张真的回到原始研究而非二手转述？",
    "只堆链接或把相邻论文结论套到未公开模型、不同数据和不同版本",
    "主张来源矩阵、版本日期、原始证据摘记和不支持结论清单",
    "参考文献、原始研究、版本与主张边界",
    ["bookPdf", "transformer", "pile", "zeroPaper", "lora", "ppo", "helm"],
  ],
  "lsl-index": [
    "把索引词映射到首次定义、公式、状态、实践、反例和证据文件",
    "索引怎样从术语清单升级为跨章可复现导航，而不是同义词堆积？",
    "同一术语在数据、训练和评估章改变含义，却没有对象和版本限定",
    "术语坐标表、定义来源、对象/单位、跨章链接和冲突词清单",
    "索引、术语对象、跨章坐标与证据导航",
    ["bookPdf", "bookSite", "transformer", "deepspeed", "vllmDocs"],
  ],
};

const MAP_SPEC = [
  "把第一版127个正式层级组织成来源—数据—训练—对齐—应用—评估证据图",
  "怎样覆盖127个第一版坐标，并让每个坐标都有机制、反例、实践和边界？",
  "用第二版或通用LLM课程替代第一版目录，隐藏页数与版本冲突",
  "127坐标矩阵、四阶段流水线、并行拓扑、应用trace和评估发布门",
  "第一版目录、四阶段训练、应用链与证据等级",
  [
    "bookSite",
    "bookPdf",
    "publisher",
    "secondPdf",
    "transformer",
    "pile",
    "zeroPaper",
    "instruct",
    "vllmPaper",
    "helm",
  ],
];

const REVIEW_SPEC = [
  "从数据来源到基础模型、SFT、奖励建模、RL、应用和评估重放全书",
  "能否为127个坐标给出输入、状态、单故障、恢复、评估与版次边界？",
  "只背框架与数据集名称，无法定位污染、并行分岔、奖励偏差或评估泄漏",
  "全书回归集、数据/训练谱系、并行trace、应用证据包和最终发布门",
  "全书复盘、跨章因果链、反例迁移与发布验收",
  Object.keys(SOURCE_INDEX),
];

function conceptStrings(unit) {
  return unit.concepts.map((alternatives) => alternatives[0]);
}

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function coordinateEvidenceKey(index) {
  let value = index + 1;
  let letters = "";
  while (value > 0) {
    value -= 1;
    letters = String.fromCharCode(65 + (value % 26)) + letters;
    value = Math.floor(value / 26);
  }
  return `LSL-${letters}`;
}

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  if (/前言|内容安排|参考文献|索引|实践思考/.test(value))
    return `${profile.title}把作者第一版公开稿、出版社纸书、原始研究、2023技术快照和当前文档分轨；每个结论都保留页码或版本、证据等级和不支持范围。`;
  if (/数学符号|标量|向量|矩阵|张量|概率|梯度|复杂度/.test(value))
    return `${profile.title}为每个符号声明对象、shape、axis、单位、数据类型与归约范围，再用最小手算和数值差分核对公式与实现。`;
  if (
    /transformer|嵌入|注意力|前馈|残差|归一化|编码器|解码器|gpt|llama|模型结构/.test(
      value,
    )
  )
    return `${profile.title}冻结token、位置、掩码、shape、权重版本和目标函数，逐层保存张量状态；最终loss或流畅文本不能替代中间状态一致性。`;
  if (
    /数据|过滤|冗余|隐私|词元|规模|质量|多样性|pile|roots|refinedweb|slimpajama/.test(
      value,
    )
  )
    return `${profile.title}记录样本来源、许可、语言、过滤原因、近重复簇、PII处理、tokenizer哈希与评估污染，数据量不能替代数据谱系。`;
  if (/分布式|并行|内存|集群|参数服务器|去中心|deepspeed|计算设备/.test(value))
    return `${profile.title}固定world size、rank拓扑、micro-batch和模型状态，比较计算、通信、显存与气泡，并验证分片检查点恢复后的梯度等价。`;
  if (
    /提示|语境|微调|lora|窗口|位置编码|插值|指令|sft|模型训练|模型推理/.test(
      value,
    )
  )
    return `${profile.title}分开指令构建、参数更新、位置映射、检查点选择和留出评估；同一验证集不能同时用于数据筛选、调参与最终报告。`;
  if (
    /强化|人类反馈|奖励|策略梯度|优势|近端策略|ppo|moss|数据收集|开源数据/.test(
      value,
    )
  )
    return `${profile.title}分开偏好数据、奖励模型、策略、价值基线、优势、PPO比率和KL约束，并用独立人评检查代理奖励是否偏离真实目标。`;
  if (
    /推理规划|思维链|由少至多|langchain|知识库|代理|多模态|fastserve|vllm|应用|框架/.test(
      value,
    )
  )
    return `${profile.title}冻结提示、检索库、工具schema、模型、视觉输入和服务版本，保存逐步trace、引用、工具副作用、吞吐与回退结果。`;
  if (/评估|知识与能力|伦理|安全|领域|指标|方法/.test(value))
    return `${profile.title}预注册任务、样本、指标、裁判和切片，检查污染、顺序与位置偏差、置信区间和人类一致性，拒绝单分数排名。`;
  return `${profile.title}把${concept}映射到来源、输入、状态变换、输出、单一反例和独立评估，并用恢复重放限定结论边界。`;
}

function normalizeSpec(id, data, title) {
  const [duty, question, fault, artifact, focus, sourceIds] = data;
  return {
    id,
    title,
    duty,
    question,
    fault,
    artifact,
    focus,
    sourceIds,
    invariant: `${title}的版次、数据、模型/算法状态、计算拓扑、输出、评估和适用边界始终可追溯`,
    scenario: `在作者公开第一版完整稿与锁定的一手研究边界内重放${focus}`,
  };
}

function enrichProfile(id, spec, role, concepts, officialUnitId = null) {
  const target =
    role === "learning-map"
      ? "00-map/lsl-official-learning-map"
      : role === "final-review"
        ? "13-review/lsl-official-final-review"
        : PATHS[id];
  if (!target) throw new Error(`缺少页面映射：${id}`);
  const chapterSlug = target.split("/").at(-1);
  const profile = {
    ...spec,
    role,
    officialUnitId,
    concepts,
    target,
    chapterSlug,
    componentBase: pascal(chapterSlug),
  };
  profile.stages = [
    {
      name: `${profile.title} · 版次与输入`,
      input: profile.scenario,
      operation: `冻结${profile.focus}的来源、数据、模型、代码、硬件、版本和评估集`,
      output: `${profile.title}的来源快照、输入合同、版本差分与未知项`,
      check: `${profile.title}没有把第二版、当前API或二手总结冒充第一版事实`,
    },
    {
      name: `${profile.title} · 状态与目标`,
      input: `${profile.title}的冻结输入、目标函数与预注册预测`,
      operation: profile.duty,
      output: `${profile.title}的参考状态、计算/训练/服务轨迹与中间证据`,
      check: `${profile.title}的每一步可由同一数据、参数、拓扑、随机种子和顺序复算`,
    },
    {
      name: `${profile.title} · 单故障`,
      input: `${profile.title}的参考轨迹与保持不变的版次、数据、模型和评估`,
      operation: `只注入“${profile.fault}”`,
      output: `${profile.title}的首个分岔、传播路径和失败输出`,
      check: `${profile.title}没有同时更换数据、模型、并行策略、应用框架和评价标准`,
    },
    {
      name: `${profile.title} · 恢复与发布`,
      input: `${profile.title}的故障快照、恢复操作与独立评估`,
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: `${profile.title}的恢复差分、接受/拒绝理由与交付证据`,
      check: `${profile.title}满足“${profile.invariant}”`,
    },
  ];
  profile.cases = [
    {
      name: `${profile.title} · 参考`,
      setup: `固定${profile.scenario}的输入、版本、随机性、拓扑和执行顺序`,
      prediction: `${profile.title}应持续满足“${profile.invariant}”`,
      boundary: `${profile.title}只回答本页正式坐标与已运行数据、模型和环境`,
    },
    {
      name: `${profile.title} · 单故障`,
      setup: `保持其余条件不变，只注入“${profile.fault}”`,
      prediction: `${profile.title}应出现可定位的首个状态分岔，而不是只有末端分数变化`,
      boundary: `${profile.title}的故障结果不能外推到第二版、未测试模型或部署`,
    },
    {
      name: `${profile.title} · 恢复`,
      setup: `撤销故障并从同一检查点重放${profile.focus}`,
      prediction: `${profile.title}的状态、输出与独立评估应恢复参考路径`,
      boundary: `${profile.title}若不能恢复，就不能把异常归因给该单一故障`,
    },
  ];
  profile.referenceTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}并断言${stage.check}。`,
  );
  profile.faultTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}故障步骤${index + 1}：保持${stage.input}不变，只检查“${profile.fault}”如何改变${stage.output}。`,
  );
  profile.gates = [
    {
      label: "第一版来源门",
      detail: `${profile.title}区分作者301页公开稿、出版社320页纸书、第二版和当前技术文档。`,
    },
    {
      label: "数据与计算门",
      detail: `${profile.title}的数据、tokenizer、模型状态、并行拓扑、随机性和检查点可复算。`,
    },
    {
      label: "反例与恢复门",
      detail: `${profile.title}只注入“${profile.fault}”，记录首个分岔并从同一检查点恢复。`,
    },
    {
      label: "评估与边界门",
      detail: `${profile.title}交付${profile.artifact}，并报告污染、代理指标、失败和未测试范围。`,
    },
  ];
  return profile;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 解释${profile.focus}中的数据、目标、模型/算法状态与证据，而不只罗列名称
- 用单一反例“${profile.fault}”定位${profile.title}的首个错误状态
- 交付${profile.artifact}，严格区分第一版公开稿、第二版和当前技术轨道

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const source = SOURCE_INDEX[id];
      if (!source) throw new Error(`未知来源：${id}`);
      return `- [${source.label}](${source.url})：在${profile.title}中，${source.use}。`;
    })
    .join("\n");
  return `## 第一版公开稿、纸书与第二版边界

${profile.title}以[作者官方站点](${SOURCES.bookSite})和[作者公开第一版完整预览稿](${SOURCES.bookPdf})为一手内容来源。${profile.title}核对时，官网把该文件标为“第一版完整版”；PDF封面标“预览版”，文件日期为2024年10月7日，共301个PDF页面，正文从前言、数学符号、8章一直覆盖到参考文献和索引。它是作者公开的第一版完整稿，不是出版社纸书的逐页扫描。

${profile.title}以[电子工业出版社第一版页面](${SOURCES.publisher})核对张奇、桂韬、郑锐、黄萱菁著《大规模语言模型：从理论到实践》，2024年1月，320页，ISBN 9787121467059。作者公开稿与纸书页数不同，因此课程保留“作者稿301个PDF页面”和“纸书320页”两个事实，不把页码强行对齐。

${profile.title}只覆盖第一版：前言1、数学符号1、8个章标题、115个节/小节、参考文献1和索引1，共127个正式层级。${profile.title}的排除证据显示，[第二版公开预览稿](${SOURCES.secondPdf})日期为2025年3月5日，共533个PDF页面；[出版社第二版页面](${SOURCES.secondPublisher})列2025年4月、ISBN 9787121500572，却公开显示252页，页数与作者稿冲突。第二版新增和改写内容全部留在本课程边界外。

来源级别为full-text-primary，但本站仍执行独立教学重构：不复制或近似复刻原书段落、图片、表格、代码和练习。第一版正文用于核对定义、结构和历史实践；技术机制再以原始论文或维护方当前文档交叉检查。${profile.title}涉及的第一版LangChain、DeepSpeed、MOSS-RLHF、FastServe和vLLM实践属于2023—2024历史轨道，当前接口另列且绝不混写。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 第一版正式坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const evidenceKey = coordinateEvidenceKey(index);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${concept}。稳定证据键 ${evidenceKey}。** ${mechanismFor(concept, profile)} ${profile.title}只有在保存第一版来源、数据/输入、目标、状态轨迹、单一故障、独立评估和恢复结果后，才能把目录名称升级为可验证知识；参数量、吞吐、loss、奖励或流畅样例不能单独通过发布门。`;
  })
  .join("\n\n")}`;
}

function termsSection(profile) {
  const terms = [
    [
      "版本轨道",
      `${profile.title}对第一版、第二版和当前API分别记录的来源与时间线`,
    ],
    [
      "数据谱系",
      `${profile.title}从采集、过滤、去重、切分到训练和评估的样本追踪`,
    ],
    ["计算拓扑", `${profile.title}中rank、设备、并行组、通信和模型状态的映射`],
    ["状态轨迹", `${profile.title}可从相同输入与检查点重放的中间张量或事件`],
    ["独立评估", `${profile.title}未参与训练、提示选择、奖励建模或调参的检查`],
    [
      "适用边界",
      `${profile.title}已验证版次、数据、模型、硬件、任务和部署范围`,
    ],
  ];
  return `## 六个证据术语

在${profile.title}中，${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}组成最小证据语言。每个术语都必须绑定对象、版本、输入、状态和失败条件；只替换框架名、扩大参数量或提高代理分数，不能自动扩大结论边界。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function experimentSection(profile) {
  return `## 先预测，再运行三个证据视图

先预测：只注入“${profile.fault}”时，${profile.title}的来源版本、数据、token、张量、并行通信、奖励、应用trace或评估中的哪一项最先偏离？请写下可观测信号，再比较参考、故障和恢复轨迹。

<Stepper>
  <Step title="第一版上下文合同：选择正式坐标">
    <${profile.componentBase}ContextContractLab />
  </Step>
  <Step title="计算轨迹：重放数据、训练或应用状态">
    <${profile.componentBase}ComputeTraceLab />
  </Step>
  <Step title="证据门：检查评估、恢复与版次边界">
    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可重现实验协议

1. 为${profile.title}冻结第一版页码/研究版本、数据、tokenizer、模型或算法、并行拓扑、环境、随机种子、计算预算和独立评估集。
2. 运行参考路径，逐阶段保存${profile.artifact}；只报告最终loss、吞吐、奖励或自然语言输出，无法支持机制归因。
3. 保持其余条件不变，只注入“${profile.fault}”，记录来源、数据、状态、通信、目标或输出中的首个分岔及传播路径。
4. 撤销故障，从同一检查点重放；只有中间状态、代理指标和独立评估都恢复，才允许接受归因或批准发布。

<Callout type="trap" title="${profile.title}误区一：第二版可以静默补齐第一版">
第二版结构、方法、代码和页码不能无标记地写进第一版课程。${profile.title}必须保留第一版127坐标和独立的当前核查轨道。
</Callout>

<Callout type="trap" title="${profile.title}误区二：规模或代理指标就是质量">
token数、参数量、吞吐、loss、奖励模型分数或LLM裁判分数都可能掩盖污染、偏差和失败切片；${profile.title}需要留出集、人评、反例和恢复。
</Callout>

<Callout type="trap" title="${profile.title}误区三：同时换数据、模型和系统">
多变量同时变化无法定位因果；${profile.title}必须执行单故障实验，保存首个分岔，并验证撤销后的同输入恢复。
</Callout>`;
}

function exercisesSection(profile) {
  const conceptQuestions = profile.concepts
    .map((concept, index) => {
      const conceptLabel = concept.replaceAll(".", "·");
      const evidenceKey = coordinateEvidenceKey(index);
      return `**问题 ${index + 1}：${concept}**

为${profile.title}中稳定证据键 ${evidenceKey} 对应的${conceptLabel}设计一个最小输入、一个单一故障和一个独立评估，说明首个状态分岔、需要保存的证据及不能外推的范围。

<Answer>
先冻结${profile.scenario}，把稳定证据键 ${evidenceKey} 对应的${conceptLabel}映射到来源、数据、目标、模型/系统状态和输出；参考路径保存${profile.artifact}，故障路径只注入“${profile.fault}”。只有首个分岔可定位、撤销后状态恢复且独立评估支持，才能接受局部机制结论；第二版、未测试模型、数据、硬件、任务和部署都留在${profile.title}边界外。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${conceptQuestions}

**问题 ${start}：两个页数为什么不能合并**

作者第一版公开稿是301个PDF页面，出版社第一版页面列320页。${profile.title}应如何记录？

<Answer>
把它们记录为两个不同载体：作者官网公开的完整预览稿用于正文与目录核对，出版社书目用于纸书出版元数据。没有逐页映射证据时，不声称301等于320，也不把作者稿页码冒充纸书页码；引用时同时写载体、版本、日期和页面体系。
</Answer>

**问题 ${start + 1}：代理指标怎样过发布门**

为什么${profile.title}中的loss、吞吐、奖励或LLM裁判分数不能单独证明改动有效？

<Answer>
这些量分别只覆盖优化目标、系统效率、偏好代理或自动裁判，可能受数据污染、硬件变化、reward hacking、位置偏差和选择性报告影响。应冻结比较合同，保存中间状态，加入独立留出集、人评、失败切片、成本与恢复结果，再限制结论适用范围。
</Answer>

</Exercises>`;
}

function synthesisSection(profile) {
  return `## 小结与上架门

${profile.title}的核心不是罗列数据集、模型、框架或分数，而是把${profile.focus}放进一条可复算链：第一版公开稿限定原作坐标，原始研究与当前文档限定能说什么，数据和目标决定学到什么，计算拓扑与状态说明怎样变化，单一反例定位首个错误，独立评估和恢复决定能否发布。最终交付${profile.artifact}，并同时报告版次、失败、未知和未测试范围。

${exercisesSection(profile)}

${termsSection(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle="张奇、桂韬、郑锐、黄萱菁《大规模语言模型：从理论到实践》第一版"
  adaptedUrl="${SOURCES.bookPdf}"
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
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

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

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测来源、数据、目标、模型/系统状态、通信、奖励、应用输出或评估中的首个变化，再运行参考、故障和恢复路径；只有守住“${profile.invariant}”并交付${profile.artifact}，模型名、loss、吞吐、奖励或演示输出才可能成为机制证据。

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
    description: `${profile.duty}；用第一版上下文、状态轨迹和独立评估门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.bookPdf,
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
if (manifest.units.length !== 12)
  throw new Error(`正式单元数量应为12，实际${manifest.units.length}`);

const allCoordinates = manifest.units.flatMap(conceptStrings);
const prefaceNodes = allCoordinates.filter((item) => item === "前言").length;
const notationNodes = allCoordinates.filter(
  (item) => item === "数学符号",
).length;
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const sectionNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
const referenceNodes = allCoordinates.filter(
  (item) => item === "参考文献",
).length;
const indexNodes = allCoordinates.filter((item) => item === "索引").length;
if (
  prefaceNodes !== 1 ||
  notationNodes !== 1 ||
  chapterHeadings !== 8 ||
  sectionNodes !== 115 ||
  referenceNodes !== 1 ||
  indexNodes !== 1 ||
  allCoordinates.length !== 127
)
  throw new Error(
    `目录计数异常：前言${prefaceNodes}、数学符号${notationNodes}、章${chapterHeadings}、节/小节${sectionNodes}、参考文献${referenceNodes}、索引${indexNodes}、总计${allCoordinates.length}`,
  );

const profiles = [
  enrichProfile(
    "learningMap",
    normalizeSpec(
      "learningMap",
      MAP_SPEC,
      "《大规模语言模型：从理论到实践》第一版127坐标证据学习地图",
    ),
    "learning-map",
    allCoordinates,
  ),
  ...manifest.units.map((unit) => {
    const data = SPEC_DATA[unit.id];
    if (!data) throw new Error(`缺少单元画像：${unit.id}`);
    return enrichProfile(
      unit.id,
      normalizeSpec(unit.id, data, unit.title),
      "chapter",
      conceptStrings(unit),
      unit.id,
    );
  }),
  enrichProfile(
    "finalReview",
    normalizeSpec(
      "finalReview",
      REVIEW_SPEC,
      "《大规模语言模型：从理论到实践》第一版全书证据总复习",
    ),
    "final-review",
    allCoordinates,
  ),
];
if (profiles.length !== 14)
  throw new Error(`页面数量应为14，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "full-text-primary";
  unit.factSourceIds = Object.keys(SOURCE_INDEX);
}
manifest.edition =
  "张奇、桂韬、郑锐、黄萱菁《大规模语言模型：从理论到实践》第一版，电子工业出版社/博文视点，2024年1月，320页，ISBN 9787121467059；作者公开第一版完整预览稿日期2024年10月7日，301个PDF页面";
manifest.sourceKind =
  "author-official-public-complete-first-edition-preview-manuscript-and-publisher-metadata";
manifest.sourceUrl = SOURCES.bookPdf;
manifest.secondarySourceUrls = [
  SOURCES.bookSite,
  SOURCES.publisher,
  SOURCES.secondPdf,
  SOURCES.secondPublisher,
  ...Object.values(SOURCES).filter(
    (url) =>
      ![
        SOURCES.bookPdf,
        SOURCES.bookSite,
        SOURCES.publisher,
        SOURCES.secondPdf,
        SOURCES.secondPublisher,
      ].includes(url),
  ),
];
manifest.status =
  "verified-public-full-first-edition-independent-rewrite-primary-research";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "full-text-primary";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "作者官网将LLM-TAP.pdf标为第一版完整版；PDF封面标预览版，日期2024-10-07，共301个PDF页面，内容从前言、数学符号、8章覆盖到参考文献和索引。出版社第一版页面核对2024年1月、320页、ISBN 9787121467059；作者稿不是纸书逐页扫描，两个页码体系分别保留。分母为前言1+数学符号1+8章标题+115节/小节+参考文献1+索引1=127。作者第二版预览稿日期2025-03-05、533个PDF页面；出版社第二版页面列2025年4月、ISBN 9787121500572和252页，公开页数存在冲突，因此第二版全部排除。课程以第一版公开全文和原始研究独立重构，不复制正文、图片、表格、代码或练习。";
manifest.unitMappingEvidence =
  "quality/large-scale-llm-practice-v2-profiles.json";
manifest.factSourcePolicy =
  "作者第一版公开完整稿核对原作结构与正文；算法、数据、分布式训练、RLHF、应用和评估以原始论文或维护方官方文档交叉核对。第一版、第二版和当前API分轨，冲突或未公开事实保持显式未知。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_INDEX).map(([id, source]) => [
    id,
    {
      kind:
        id === "bookPdf"
          ? "author-official-public-complete-first-edition-manuscript"
          : id === "bookSite"
            ? "author-official-book-site"
            : id === "publisher" || id === "secondPublisher"
              ? "official-publisher-metadata"
              : id === "secondPdf"
                ? "author-official-second-edition-boundary"
                : [
                      "deepspeed",
                      "hfTraining",
                      "moss",
                      "langchain",
                      "vllmDocs",
                      "slimPajama",
                    ].includes(id)
                  ? "maintainer-primary-documentation"
                  : "primary-research-paper",
      label: source.label,
      url: source.url,
    },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 127,
  coveredFormalNodes: 127,
  coveragePercent: 100,
};
manifest.metrics = {
  formalPrefaceNodes: 1,
  formalNotationNodes: 1,
  formalChapterHeadings: 8,
  formalSectionsAndSubsections: 115,
  formalReferenceNodes: 1,
  formalIndexNodes: 1,
  formalConceptNodes: 127,
  officialUnits: 12,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 14,
  interactiveViews: 42,
  visualKinds: [
    "llm-context-contract",
    "llm-compute-trace",
    "llm-evidence-gate",
  ],
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "full-text-primary",
      defaultSourceMode: "independent-rewrite",
      formalCoordinates: 127,
      pageCount: 14,
      interactiveViews: 42,
      profiles,
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(manifestDocument, null, 2)}\n`,
  "json",
);

console.log(
  "已重建14页，覆盖前言1+数学符号1+章标题8+节/小节115+参考文献1+索引1=127个第一版正式坐标，生成42个交互证据视图。",
);
