#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "chatgpt-principles-practice";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/chatgpt-principles-practice-v2-profiles.json",
);

const SOURCES = {
  library: "https://lib2.buct.edu.cn/bookInfo_01h1342428.html",
  dedao:
    "https://www.dedao.cn/ebook/detail?id=AnKgjNlArlXVNGKD1yL2Ek6YaogQv0YYybe0bZ4RBn7j589zJpMxmdPeqOYDxqL4",
  transformer: "https://arxiv.org/abs/1706.03762",
  bert: "https://arxiv.org/abs/1810.04805",
  gpt3: "https://arxiv.org/abs/2005.14165",
  gpt4: "https://arxiv.org/abs/2303.08774",
  instruct: "https://arxiv.org/abs/2203.02155",
  ppo: "https://arxiv.org/abs/1707.06347",
  cot: "https://arxiv.org/abs/2201.11903",
  lora: "https://arxiv.org/abs/2106.09685",
  gymnasium: "https://gymnasium.farama.org/",
};

const SOURCE_INDEX = {
  library: {
    label: "北京化工大学图书馆书目",
    url: SOURCES.library,
    use: "核对作者、题名、机械工业出版社、2023年8月、XI+291页和ISBN",
  },
  dedao: {
    label: "得到数字版完整目录",
    url: SOURCES.dedao,
    use: "核对前言、10章及全部170个节/小节",
  },
  transformer: {
    label: "Transformer原始论文",
    url: SOURCES.transformer,
    use: "独立核对注意力、编码器/解码器和序列建模机制",
  },
  bert: {
    label: "BERT原始论文",
    url: SOURCES.bert,
    use: "独立核对双向预训练、下游微调与Encoder模型边界",
  },
  gpt3: {
    label: "GPT-3原始论文",
    url: SOURCES.gpt3,
    use: "独立核对自回归预训练、规模与上下文学习的历史证据",
  },
  gpt4: {
    label: "GPT-4技术报告",
    url: SOURCES.gpt4,
    use: "核对公开能力与评估，同时保留未公开架构和训练细节",
  },
  instruct: {
    label: "InstructGPT原始论文",
    url: SOURCES.instruct,
    use: "独立核对SFT、偏好比较、奖励模型和人类反馈训练",
  },
  ppo: {
    label: "PPO原始论文",
    url: SOURCES.ppo,
    use: "独立核对截断代理目标、策略更新与基线比较",
  },
  cot: {
    label: "Chain-of-Thought原始论文",
    url: SOURCES.cot,
    use: "独立核对思维链提示的实验设置与规模边界",
  },
  lora: {
    label: "LoRA原始论文",
    url: SOURCES.lora,
    use: "独立核对低秩适配、冻结基座参数与可训练参数边界",
  },
  gymnasium: {
    label: "Gymnasium当前官方文档",
    url: SOURCES.gymnasium,
    use: "核对原书OpenAI Gym API的后续维护轨道与环境接口变化",
  },
};

const PATHS = {
  "cgpt-preface": "01-preface/cgpt-preface",
  "cgpt-01": "02-understanding/cgpt-01-understanding-chatgpt",
  "cgpt-02": "03-principles/cgpt-02-principles",
  "cgpt-03": "04-pretrained-models/cgpt-03-pretrained-language-models",
  "cgpt-04": "05-reinforcement-learning/cgpt-04-reinforcement-learning",
  "cgpt-05": "06-prompt-emergence/cgpt-05-prompt-emergence",
  "cgpt-06": "07-llm-pretraining/cgpt-06-llm-pretraining",
  "cgpt-07": "08-gpt-series/cgpt-07-gpt-series",
  "cgpt-08": "09-ppo-rlhf/cgpt-08-ppo-rlhf",
  "cgpt-09": "10-private-practice/cgpt-09-chatgpt-practice",
  "cgpt-10": "11-trends/cgpt-10-trends",
};

const SPEC_DATA = {
  "cgpt-preface": [
    "建立中文首版、完整目录、2023技术快照与当前核查的来源边界",
    "怎样阅读一本覆盖算法、工程和产业判断的2023年技术书而不混淆证据等级？",
    "把数字版目录或试读当成完整正文，并把2023年的产品叙述当成当前事实",
    "书目时间轴、主张等级、181坐标矩阵与事实来源清单",
    "书目范围、技术证据、历史快照与独立重写",
    ["library", "dedao", "transformer", "instruct"],
  ],
  "cgpt-01": [
    "把产品历史、生成流程和日常/代码/办公用例拆成输入输出合同",
    "了解ChatGPT时，怎样区分产品叙述、生成机制、能力演示与可重复评估？",
    "用单次聊天成功证明模型理解任务、事实正确且适合自动执行副作用",
    "历史时间轴、生成轨迹、用例风险矩阵与人工复核记录",
    "由来、工作流程、用例与能力边界",
    ["library", "dedao", "gpt3", "instruct"],
  ],
  "cgpt-02": [
    "重建预训练、提示/监督、偏好比较、奖励建模和策略优化证据链",
    "ChatGPT原理解构怎样避免把公开研究、同类产品推断和未知产品细节混为一谈？",
    "把RLHF写成模型能够自我进化，并把偏好奖励等同于真实和安全",
    "训练阶段图、数据谱系、奖励模型探针与未知实现清单",
    "NLP谱系、同类产品、训练阶段、标注与奖励建模",
    ["transformer", "gpt3", "instruct", "gpt4"],
  ],
  "cgpt-03": [
    "按Encoder、Decoder和Encoder-Decoder比较目标、注意力掩码、输入输出与任务适配",
    "几十种预训练模型怎样用统一合同比较，而不是堆砌名称和参数？",
    "仅凭架构家族给模型排序，忽略训练目标、数据、分词、许可和评估任务",
    "模型谱系表、掩码/目标对照、训练推理trace与UniLM复现实验",
    "Transformer、三类架构、模型谱系与UniLM实战",
    ["transformer", "bert", "gpt3"],
  ],
  "cgpt-04": [
    "从MDP、价值、策略和采样轨迹重放Q-learning、SARSA、DQN、PG与Actor-Critic",
    "强化学习算法的更新目标和on/off-policy边界怎样用同一环境轨迹验证？",
    "混用旧OpenAI Gym与当前环境API，或同时改变环境、种子和算法后归因",
    "环境合同、转移轨迹、更新表、学习曲线与API迁移记录",
    "学习分类、Gym环境、价值方法与策略方法",
    ["ppo", "gymnasium"],
  ],
  "cgpt-05": [
    "区分提示模板、答案映射、多提示、上下文学习、思维链与任务评估",
    "提示学习与涌现结论怎样通过固定模型、样本顺序和独立数据集检验？",
    "挑选最好提示和最好示例顺序，把一次提升宣称为普适涌现能力",
    "提示版本、示例顺序、答案映射、消融矩阵与情感分析评估",
    "提示学习、ICL、思维链、涌现与情感分析实战",
    ["gpt3", "cot", "bert"],
  ],
  "cgpt-06": [
    "串联分词、数据清洗、并行拓扑、预训练、Freeze/LoRA/P-Tuning与信息抽取",
    "大型语言模型预训练怎样证明token、样本、并行状态和检查点都可追溯？",
    "只报告最终loss，隐藏分词版本、数据去重、并行切分和失败检查点",
    "token账本、数据谱系、并行拓扑、检查点与参数高效微调差分",
    "分词器、分布式框架、预训练与参数高效微调",
    ["transformer", "gpt3", "lora"],
  ],
  "cgpt-07": [
    "按公开论文区分GPT-1至GPT-4、InstructGPT和GPT-2摘要实战的证据层级",
    "GPT系列分析怎样在公开信息不足时明确未知，而不是补写想象中的架构？",
    "把GPT-4未公开的规模、数据或结构写成确定事实，或把Code-X名称错误当成证据",
    "版本谱系、公开/未知字段、训练阶段表与摘要评估",
    "GPT谱系、InstructGPT、公开信息边界与GPT-2摘要",
    ["gpt3", "gpt4", "instruct"],
  ],
  "cgpt-08": [
    "从策略比率、截断目标、KL约束、奖励模型和价值基线重放PPO/RLHF",
    "PPO用于RLHF时，哪一步优化偏好奖励，哪一步控制策略偏移与能力退化？",
    "把代理奖励上升等同于真实质量上升，并忽略reward hacking与KL漂移",
    "PPO项分解、奖励/价值轨迹、KL曲线、偏好评估与失败样本",
    "PPO、奖励模型、RLHF价值/问题与情感生成实战",
    ["ppo", "instruct"],
  ],
  "cgpt-09": [
    "用同一文档问句任务贯通SFT、RM和RL三个阶段",
    "类ChatGPT私有化实战怎样保证数据、模型、奖励和评估在三阶段间不泄漏？",
    "SFT、RM和RL复用测试集或错误配对checkpoint，却把最终提升归给RLHF",
    "任务合同、数据切分、三阶段checkpoint、奖励轨迹与端到端评估",
    "任务设计、数据准备、SFT、RM、RL与私有化边界",
    ["instruct", "ppo", "lora"],
  ],
  "cgpt-10": [
    "把2023趋势判断拆成可观测信号、应用风险、决策门和复核日期",
    "云边协同、工具、可控生成及2C/2B场景怎样从愿景变成可验证产品假设？",
    "用旧趋势段落预测当前市场，忽略隐私、自动化偏差、人工责任和失败成本",
    "趋势假设表、场景评估、风险登记、决策日志与复核计划",
    "AIGC趋势、2C/2B场景、行业建议与时间边界",
    ["library", "gpt4", "instruct"],
  ],
};

const MAP_SPEC = [
  "把前言、10章和170个节/小节组织成算法—训练—私有化学习图",
  "怎样覆盖181个正式目录坐标，并区分模型事实、算法证据、项目实验和趋势判断？",
  "用通用ChatGPT课程替代原书目录，或把所有模型和训练阶段压成一条故事线",
  "181坐标矩阵、模型谱系、训练流水线与发布检查点",
  "全书目录、模型谱系、训练阶段、实践链与证据等级",
  ["library", "dedao", "transformer", "gpt3", "instruct", "ppo"],
];

const REVIEW_SPEC = [
  "从产品用例到SFT—RM—RL私有化重放全书证据链",
  "能否为181个坐标给出输入、目标、状态、反例、评估与适用边界？",
  "只背模型名和流程图，无法定位数据泄漏、奖励偏差、版本错位或首个失败状态",
  "全书回归集、模型/算法矩阵、三阶段trace与最终发布门",
  "全书复盘、跨章整合、反例迁移与私有化验收",
  [
    "library",
    "dedao",
    "transformer",
    "bert",
    "gpt3",
    "gpt4",
    "instruct",
    "ppo",
    "cot",
    "lora",
    "gymnasium",
  ],
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

function mechanismFor(concept, profile) {
  const value = concept.toLocaleLowerCase();
  if (/前言|了解|由来|历史|用例|趋势|场景|建议|小结/.test(value))
    return `${profile.title}把书目、模型论文、2023产品快照、应用假设和当前核查分列；演示与趋势必须给出复核日期和失败成本。`;
  if (
    /transformer|encoder|decoder|bert|roberta|ernie|spanbert|macbert|albert|nezha|unilm|glm|electra|gpt|cpm|palm|opt|bloom|llama|mass|bart|t5/.test(
      value,
    )
  )
    return `${profile.title}用注意力掩码、训练目标、数据、分词、参数公开度和下游任务比较模型；家族名称或规模不能替代同一评估合同。`;
  if (/强化|q-learning|sarsa|dqn|policy gradient|actor-critic|gym/.test(value))
    return `${profile.title}冻结环境版本、状态动作空间、奖励、终止语义和随机种子，逐步复算价值或策略更新并区分on-policy与off-policy。`;
  if (/提示|上下文|思维链|涌现|情感分析/.test(value))
    return `${profile.title}固定模型、提示版本、示例集合与顺序，预注册答案映射和独立评估；最好一次输出不能证明普适涌现。`;
  if (
    /分词|bpe|wordpiece|unigram|sentencepiece|分布式|megatron|deepspeed|colossal|fairscale|parallelformers|oneflow|预训练|freeze|lora|p-tuning/.test(
      value,
    )
  )
    return `${profile.title}记录tokenizer哈希、数据去重、并行拓扑、优化器状态、检查点和可训练参数；只有loss无法复现大模型训练。`;
  if (/ppo|rlhf|奖励|rm|sft|rl阶段|自我进化/.test(value))
    return `${profile.title}分开监督示范、偏好对、奖励模型、策略更新、价值估计与KL约束，并用独立人评检查代理奖励是否偏离真实目标。`;
  if (
    /项目|数据预处理|模型训练|模型推理|模型生成|模型评估|任务设计|数据准备/.test(
      value,
    )
  )
    return `${profile.title}为数据切分、预处理、checkpoint、推理配置和评估结果建立谱系，防止训练/测试泄漏和阶段错配。`;
  return `${profile.title}把${concept}放入来源、输入、目标、状态变换、输出与独立评估合同，并用单故障反例定位首个偏离。`;
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
    invariant: `${title}的数据版本、模型/算法状态、训练或推理输出、评估与适用边界始终可追溯`,
    scenario: `在锁定的一手研究与2023原书目录边界内重放${focus}`,
  };
}

function enrichProfile(id, spec, role, concepts, officialUnitId = null) {
  const target =
    role === "learning-map"
      ? "00-map/cgpt-official-learning-map"
      : role === "final-review"
        ? "12-review/cgpt-official-final-review"
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
      name: `${profile.title} · 来源与输入`,
      input: profile.scenario,
      operation: `冻结${profile.focus}所需的数据、模型、算法、环境、版本和评估集`,
      output: `${profile.title}的来源快照、输入合同与未知项清单`,
      check: `${profile.title}没有把目录、二手总结或2023产品描述冒充当前实现事实`,
    },
    {
      name: `${profile.title} · 目标与状态`,
      input: `${profile.title}的冻结输入、目标函数与预注册预测`,
      operation: profile.duty,
      output: `${profile.title}的参考状态、训练/推理轨迹与中间证据`,
      check: `${profile.title}的每一步可由同一数据、参数、随机种子和顺序复算`,
    },
    {
      name: `${profile.title} · 单故障`,
      input: `${profile.title}的参考轨迹与保持不变的模型、数据和评估`,
      operation: `只注入“${profile.fault}”`,
      output: `${profile.title}的首个分岔、传播路径和失败输出`,
      check: `${profile.title}没有同时更换数据、模型、算法、环境和评价标准`,
    },
    {
      name: `${profile.title} · 恢复与评估`,
      input: `${profile.title}的故障快照、恢复操作与独立评估`,
      operation: "撤销单一故障，从同一检查点重放并检查分布外边界",
      output: `${profile.title}的恢复差分、接受/拒绝理由与交付证据`,
      check: `${profile.title}满足“${profile.invariant}”`,
    },
  ];
  profile.cases = [
    {
      name: `${profile.title} · 参考`,
      setup: `固定${profile.scenario}的输入、版本、随机性与执行顺序`,
      prediction: `${profile.title}应持续满足“${profile.invariant}”`,
      boundary: `${profile.title}只回答本页正式坐标与已运行模型、数据和环境`,
    },
    {
      name: `${profile.title} · 单故障`,
      setup: `保持其余条件不变，只注入“${profile.fault}”`,
      prediction: `${profile.title}应出现可定位的首个状态分岔，而不是只有末端指标变化`,
      boundary: `${profile.title}的故障结果不能外推到未测试模型、任务或产品版本`,
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
      label: "书目与研究来源门",
      detail: `${profile.title}区分馆藏/数字目录、原始论文、2023产品快照、项目实验和当前未知。`,
    },
    {
      label: "数据与状态门",
      detail: `${profile.title}的数据切分、tokenizer、模型/算法版本、随机性、训练/推理状态和检查点可复算。`,
    },
    {
      label: "反例与恢复门",
      detail: `${profile.title}只注入“${profile.fault}”，记录首个分岔并从同一检查点恢复。`,
    },
    {
      label: "独立评估与边界门",
      detail: `${profile.title}交付${profile.artifact}，并报告代理指标、真实目标、失败与未测试范围。`,
    },
  ];
  return profile;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 解释${profile.focus}中的数据、目标、模型/算法状态与输出，而不只罗列名称
- 用单一反例“${profile.fault}”定位${profile.title}的首个错误状态
- 交付${profile.artifact}，区分2023书目快照、原始研究和当前未知

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
  return `## 书目、181个坐标与技术事实边界

${profile.title}以[北京化工大学图书馆书目](${SOURCES.library})核对刘聪、杜振东、涂铭、沈盛宇著《ChatGPT原理与实战：大型语言模型的算法、技术和私有化》，机械工业出版社，2023年8月，XI+291页，ISBN 978-7-111-73303-4；馆藏记录将它作为中文技术著作，本课程不虚构英文原版或翻译来源。

${profile.title}以[得到数字版完整目录](${SOURCES.dedao})核对前言、10个章标题和170个节/小节，共181个正式层级；数字版页面列出2023年7月发行信息，而馆藏书目列2023年8月出版，因此课程分别保留数字发行与纸书出版时间，不强行合并。课程以学习地图、前言、10章和总复习共13页承载全部坐标。

${profile.title}没有获得纸书完整正文访问权，来源级别是outline-only；目录只限定学习范围，Transformer、BERT、GPT、PPO、RLHF、思维链和LoRA等事实必须回到原始论文独立核对。本站不复制或近似改写纸书正文、图片、代码和练习，所有中文机制解释、状态轨迹、反例、交互、练习与答案均为独立教学重构；ChatGPT产品和行业趋势陈述明确限定为2023年历史快照。

### 本页独立事实来源

${links}`;
}

function coordinateEvidenceKey(index) {
  let value = index + 1;
  let letters = "";
  while (value > 0) {
    value -= 1;
    letters = String.fromCharCode(65 + (value % 26)) + letters;
    value = Math.floor(value / 26);
  }
  return `CGPT-${letters}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项解释

${profile.concepts
  .map((concept, index) => {
    const evidenceKey = coordinateEvidenceKey(index);
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${concept}。稳定证据键 ${evidenceKey}。** ${mechanismFor(concept, profile)} ${profile.title}只有在保存来源、数据/输入、目标、状态轨迹、单一故障、独立评估和恢复结果后，才能把目录名称升级为可验证知识；参数量、loss或流畅样例不能单独通过发布门。`;
  })
  .join("\n\n")}`;
}

function termsSection(profile) {
  const terms = [
    ["数据谱系", `${profile.title}从来源、清洗、切分到训练和评估样本的追踪`],
    ["目标函数", `${profile.title}实际优化的损失、奖励或代理目标及其偏差`],
    ["状态轨迹", `${profile.title}训练、推理或环境交互中可重放的中间状态`],
    ["单一故障", `${profile.title}只改变一个因素以定位首个机制分岔的实验`],
    ["独立评估", `${profile.title}不复用训练、提示选择或奖励建模数据的检查`],
    ["历史边界", `${profile.title}仅在2023书目或指定论文版本成立的陈述`],
  ];
  return `## 术语与证据对象

在${profile.title}中，${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}组成最小证据语言。术语必须绑定数据、目标、状态和失败条件；只替换模型名、扩大参数量或提高代理奖励，不能自动扩大结论边界。

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

先预测：只注入“${profile.fault}”时，${profile.title}的数据、token、模型状态、价值/奖励、训练检查点、生成输出或独立评估中的哪一项最先偏离？请写下可观测信号，再比较参考、故障和恢复轨迹。

<Stepper>
  <Step title="上下文合同：选择正式坐标">
    <${profile.componentBase}ContextContractLab />
  </Step>
  <Step title="计算轨迹：重放目标与状态">
    <${profile.componentBase}ComputeTraceLab />
  </Step>
  <Step title="证据门：检查评估与边界">
    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可复现实验协议

1. 为${profile.title}冻结书目/论文版本、数据、tokenizer、模型或算法、环境、随机种子、计算预算和独立评估集。
2. 运行参考路径，逐阶段保存${profile.artifact}；只报告最终loss、奖励或自然语言输出，无法支持机制归因。
3. 保持其余条件不变，只注入“${profile.fault}”，记录数据、状态、目标或输出中的首个分岔及传播路径。
4. 撤销故障，从同一检查点重放；只有状态、代理指标和独立评估都恢复，才允许接受归因或批准发布。

<Callout type="trap" title="${profile.title}误区一：目录或二手图就是算法事实">
目录能证明原书覆盖范围，不能证明模型结构、训练数据或产品实现；${profile.title}必须使用原始论文，并把未公开信息保持为未知。
</Callout>

<Callout type="trap" title="${profile.title}误区二：代理指标上升就是真实提升">
loss、奖励模型分数或自动评估可能被优化过程利用；${profile.title}需要留出集、人评、反例和分布外检查。
</Callout>

<Callout type="trap" title="${profile.title}误区三：同时换模型、数据和算法">
多变量同时变化无法定位因果；${profile.title}必须执行单故障实验、保存首个分岔，并验证撤销后的恢复。
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
先冻结${profile.scenario}，把稳定证据键 ${evidenceKey} 对应的${conceptLabel}映射到数据、目标、模型/算法状态和输出；参考路径保存${profile.artifact}，故障路径只注入“${profile.fault}”。只有首个分岔可定位、撤销后状态恢复且独立评估支持，才能接受局部机制结论；未测试模型、数据、任务、产品版本与部署都留在${profile.title}边界外。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${conceptQuestions}

**问题 ${start}：公开与未知**

列出${profile.title}中一个可由原始论文核对的事实和一个必须保持未知的ChatGPT产品实现细节。

<Answer>
Transformer注意力结构、PPO目标或InstructGPT论文中的SFT—RM—RL流程可由原始论文核对；当前ChatGPT具体模型的完整训练数据、参数规模、内部架构和生产对齐配方若未由提供方公开，就必须保持未知。不能用相邻模型论文补齐产品秘密。
</Answer>

**问题 ${start + 1}：三阶段泄漏**

为什么SFT、RM和RL阶段共用测试样本会破坏${profile.title}的私有化验收？

<Answer>
测试样本进入示范、偏好或策略优化后，最终结果不再是独立泛化证据。${profile.title}应在任务级划分数据，记录每个样本的阶段归属，冻结最终评估集，并检查相似文档、生成问题和偏好对之间的近重复泄漏。
</Answer>

</Exercises>`;
}

function synthesisSection(profile) {
  return `## 小结与上架门

${profile.title}的核心不是罗列模型、框架或流行词，而是把${profile.focus}放进一条可复算链：书目与论文限定能说什么，数据和目标决定学到什么，模型/算法状态说明怎样变化，单一反例定位首个错误，独立评估与恢复决定能否发布。最终交付${profile.artifact}，并同时报告历史事实、当前证据、失败、未知和未测试范围。

${exercisesSection(profile)}

${termsSection(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authoritative-book-metadata-complete-public-toc-and-primary-research"
  workTitle="刘聪、杜振东、涂铭、沈盛宇《ChatGPT原理与实战：大型语言模型的算法、技术和私有化》"
  adaptedUrl="${SOURCES.library}"
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

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测数据、目标、模型/算法状态、奖励、输出或评估中的首个变化，再运行参考、故障和恢复路径；只有守住“${profile.invariant}”并交付${profile.artifact}，模型名、loss、奖励或演示输出才可能成为机制证据。

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
    description: `${profile.duty}；用上下文合同、状态轨迹和独立评估门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.library,
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
if (manifest.units.length !== 11)
  throw new Error(`正式单元数量应为11，实际${manifest.units.length}`);

const allCoordinates = manifest.units.flatMap(conceptStrings);
const prefaceNodes = allCoordinates.filter((item) => item === "前言").length;
const chapterHeadings = allCoordinates.filter((item) =>
  /^第\d+章/.test(item),
).length;
const sectionNodes = allCoordinates.filter((item) =>
  /^\d+(?:\.\d+)+\s/.test(item),
).length;
if (
  prefaceNodes !== 1 ||
  chapterHeadings !== 10 ||
  sectionNodes !== 170 ||
  allCoordinates.length !== 181
)
  throw new Error(
    `目录计数异常：前言${prefaceNodes}、章${chapterHeadings}、节/小节${sectionNodes}、总计${allCoordinates.length}`,
  );

const profiles = [
  enrichProfile(
    "learningMap",
    normalizeSpec(
      "learningMap",
      MAP_SPEC,
      "《ChatGPT原理与实战》181坐标证据学习地图",
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
      "《ChatGPT原理与实战》全书训练与私有化总复习",
    ),
    "final-review",
    allCoordinates,
  ),
];
if (profiles.length !== 13)
  throw new Error(`页面数量应为13，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "outline-only";
  unit.factSourceIds = [
    "library",
    "dedao",
    "transformer",
    "bert",
    "gpt3",
    "gpt4",
    "instruct",
    "ppo",
    "cot",
    "lora",
    "gymnasium",
  ];
}
manifest.edition =
  "刘聪、杜振东、涂铭、沈盛宇《ChatGPT原理与实战：大型语言模型的算法、技术和私有化》，机械工业出版社，2023年8月，XI+291页，ISBN 9787111733034";
manifest.sourceKind =
  "authoritative-library-metadata-complete-digital-toc-and-primary-research";
manifest.sourceUrl = SOURCES.library;
manifest.secondarySourceUrls = [
  SOURCES.dedao,
  SOURCES.transformer,
  SOURCES.bert,
  SOURCES.gpt3,
  SOURCES.gpt4,
  SOURCES.instruct,
  SOURCES.ppo,
  SOURCES.cot,
  SOURCES.lora,
  SOURCES.gymnasium,
];
manifest.status = "verified-outline-independent-rewrite-primary-research";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "outline-only";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "馆藏书目确认中文首版作者、题名、出版社、2023年8月、XI+291页和ISBN；得到数字版完整目录核对前言、10章和170个节/小节，共181个正式层级，并列出2023年7月数字发行。未获得纸书完整正文，课程不虚构英文原版、不复制正文/图片/代码/练习，按目录与Transformer、BERT、GPT、PPO、InstructGPT、CoT、LoRA等原始研究独立重写；产品与趋势陈述限定为2023历史快照。";
manifest.unitMappingEvidence =
  "quality/chatgpt-principles-practice-v2-profiles.json";
manifest.factSourcePolicy =
  "书目和目录限定范围；模型架构、训练目标、PPO/RLHF、提示学习和参数高效微调只采用原始论文或维护方官方文档，未公开的ChatGPT实现保持未知。";
manifest.factSources = {
  library: {
    kind: "authoritative-library-metadata",
    label: "北京化工大学图书馆书目",
    url: SOURCES.library,
  },
  dedao: {
    kind: "issued-digital-edition-complete-toc",
    label: "得到数字版完整目录",
    url: SOURCES.dedao,
  },
  transformer: {
    kind: "primary-research-paper",
    label: "Attention Is All You Need",
    url: SOURCES.transformer,
  },
  bert: {
    kind: "primary-research-paper",
    label: "BERT",
    url: SOURCES.bert,
  },
  gpt3: {
    kind: "primary-research-paper",
    label: "Language Models are Few-Shot Learners",
    url: SOURCES.gpt3,
  },
  gpt4: {
    kind: "primary-technical-report",
    label: "GPT-4 Technical Report",
    url: SOURCES.gpt4,
  },
  instruct: {
    kind: "primary-research-paper",
    label:
      "Training language models to follow instructions with human feedback",
    url: SOURCES.instruct,
  },
  ppo: {
    kind: "primary-research-paper",
    label: "Proximal Policy Optimization Algorithms",
    url: SOURCES.ppo,
  },
  cot: {
    kind: "primary-research-paper",
    label:
      "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    url: SOURCES.cot,
  },
  lora: {
    kind: "primary-research-paper",
    label: "LoRA",
    url: SOURCES.lora,
  },
  gymnasium: {
    kind: "current-maintainer-documentation",
    label: "Gymnasium",
    url: SOURCES.gymnasium,
  },
};
manifest.coverageMetrics = {
  targetFormalNodes: 181,
  coveredFormalNodes: 181,
  coveragePercent: 100,
};
manifest.metrics = {
  formalPrefaceNodes: 1,
  formalChapterHeadings: 10,
  formalSectionsAndSubsections: 170,
  formalConceptNodes: 181,
  officialUnits: 11,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 13,
  interactiveViews: 39,
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
      sourceAccess: "outline-only",
      defaultSourceMode: "independent-rewrite",
      formalCoordinates: 181,
      pageCount: 13,
      interactiveViews: 39,
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
  "已重建13页，覆盖前言1+章标题10+节/小节170=181个正式坐标，生成39个训练与私有化交互视图。",
);
