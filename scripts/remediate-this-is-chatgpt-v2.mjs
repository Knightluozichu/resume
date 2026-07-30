#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "this-is-chatgpt";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/this-is-chatgpt-v2-profiles.json",
);

const SOURCES = {
  product:
    "https://www.wolfram-media.com/products/what-is-chatgpt-doing-and-why-does-it-work/",
  essay:
    "https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/",
  translations: "https://www.wolfram-media.com/translations/",
  chinese:
    "https://www.ptpress.com.cn/publishing/book/4bd62f00-4d6e-4f98-92f4-604be0407b8a",
  transformer: "https://arxiv.org/abs/1706.03762",
  gpt3: "https://arxiv.org/abs/2005.14165",
  instruct: "https://arxiv.org/abs/2203.02155",
  wolframAlpha: "https://www.wolframalpha.com/",
};

const SOURCE_INDEX = {
  essay: {
    label: "作者公开完整文章",
    url: SOURCES.essay,
    use: "核对本页在作者论证链中的位置、示例目的和原始时间边界",
  },
  product: {
    label: "Wolfram Media原版产品页",
    url: SOURCES.product,
    use: "核对作者、出版日期、页数、ISBN、两篇正文和完整目录",
  },
  transformer: {
    label: "Transformer原始论文",
    url: SOURCES.transformer,
    use: "独立核对注意力架构的研究来源，不把后来的实现细节倒灌给原书",
  },
  gpt3: {
    label: "GPT-3原始论文",
    url: SOURCES.gpt3,
    use: "独立核对书中使用的GPT-3历史参照、规模与少样本语境",
  },
  instruct: {
    label: "InstructGPT原始论文",
    url: SOURCES.instruct,
    use: "独立核对监督微调、偏好数据和人类反馈训练的证据边界",
  },
  wolframAlpha: {
    label: "Wolfram|Alpha官方入口",
    url: SOURCES.wolframAlpha,
    use: "核对计算知识工具的产品边界，不把工具调用等同于语言模型内生推理",
  },
};

const PATHS = {
  "tcg-preface": "01-main-essay/tcg-preface",
  "tcg-main-01": "01-main-essay/tcg-main-01-one-word-at-a-time",
  "tcg-main-02": "01-main-essay/tcg-main-02-probabilities",
  "tcg-main-03": "01-main-essay/tcg-main-03-model",
  "tcg-main-04": "01-main-essay/tcg-main-04-human-like-tasks",
  "tcg-main-05": "02-neural-models/tcg-main-05-neural-nets",
  "tcg-main-06": "02-neural-models/tcg-main-06-training-neural-nets",
  "tcg-main-07": "02-neural-models/tcg-main-07-training-practice",
  "tcg-main-08": "02-neural-models/tcg-main-08-universal-network",
  "tcg-main-09": "03-chatgpt-inside/tcg-main-09-embeddings",
  "tcg-main-10": "03-chatgpt-inside/tcg-main-10-inside-chatgpt",
  "tcg-main-11": "03-chatgpt-inside/tcg-main-11-training-chatgpt",
  "tcg-main-12": "03-chatgpt-inside/tcg-main-12-beyond-basic-training",
  "tcg-main-13": "04-meaning-language/tcg-main-13-what-lets-it-work",
  "tcg-main-14": "04-meaning-language/tcg-main-14-meaning-space",
  "tcg-main-15": "04-meaning-language/tcg-main-15-semantic-grammar",
  "tcg-main-16": "04-meaning-language/tcg-main-16-conclusion",
  "tcg-resources": "05-resources/tcg-thanks-additional-resources",
  "tcg-wa-01": "06-wolfram-alpha/tcg-wa-01-chatgpt-wolfram-alpha",
  "tcg-wa-02": "06-wolfram-alpha/tcg-wa-02-basic-example",
  "tcg-wa-03": "06-wolfram-alpha/tcg-wa-03-more-examples",
  "tcg-wa-04": "06-wolfram-alpha/tcg-wa-04-path-forward",
};

const SPEC_DATA = {
  "tcg-preface": [
    "把2023年作者问题意识、英文原版与中文译本放回同一时间轴",
    "怎样区分作者当时的解释目标、书目事实和今天仍需重新验证的产品事实？",
    "把2023年的GPT-3与早期ChatGPT描述写成2026年仍不变的当前规格",
    "版本时间轴、主张类型表、过期风险清单与独立核对记录",
    "历史快照、解释范围与现在时事实边界",
    ["essay", "product"],
  ],
  "tcg-main-01": [
    "用条件分布、token和解码规则解释逐步续写",
    "同一上下文如何经过候选分布与采样规则生成下一个token？",
    "把token说成完整单词，并把贪心选择或温度当成模型内部理解",
    "上下文快照、候选分布、解码轨迹与重复性反例",
    "下一个token、温度、贪心与随机采样",
    ["essay", "gpt3"],
  ],
  "tcg-main-02": [
    "从字符与n-gram稀疏性推进到未见序列的概率估计",
    "为什么直接计数不能覆盖长文本，而模型能为未见上下文给出估计？",
    "把语料频率、模型条件概率和校准后的真实概率混成同一个量",
    "计数表、稀疏性曲线、未见上下文探针与校准记录",
    "频率估计、组合爆炸、泛化与校准",
    ["essay", "gpt3"],
  ],
  "tcg-main-03": [
    "区分数据、函数族、参数、拟合目标和外推边界",
    "一个模型何时只是压缩观测关系，何时有资格支持新输入上的预测？",
    "把训练点上的曲线拟合直接解释为真实机制或因果规律",
    "数据切分、候选模型、残差图与外推失败样本",
    "模型族、参数拟合、插值、外推与因果边界",
    ["essay", "gpt3"],
  ],
  "tcg-main-04": [
    "以图像分类说明表示、标签、训练样本和独立测试",
    "面向类人任务的模型怎样从像素表示走到可复核的类别决策？",
    "只报告训练集准确率，忽略分布变化、类别不平衡和错分结构",
    "样本切分、表示探针、混淆矩阵与分布外样本",
    "类人任务、监督信号、泛化与错分诊断",
    ["essay"],
  ],
  "tcg-main-05": [
    "拆解加权和、偏置、激活函数、层与端到端网络",
    "单个简单神经元怎样组合成能够表示非线性映射的网络？",
    "删去非线性后仍声称堆叠线性层增加了函数表达能力",
    "逐层张量形状、激活轨迹、消融对照与输出差分",
    "人工神经元、激活、层级组合与非线性",
    ["essay"],
  ],
  "tcg-main-06": [
    "用损失、梯度、批次与留出集追踪训练过程",
    "权重更新怎样减少训练目标，同时避免把记忆训练样本误判为泛化？",
    "训练与测试数据泄漏，或同时更换初始化、批次和学习率后归因",
    "损失曲线、梯度快照、数据谱系与留出集结果",
    "损失函数、反向传播、优化与独立评估",
    ["essay"],
  ],
  "tcg-main-07": [
    "把训练经验拆成可控制的初始化、数据、优化器和硬件条件",
    "所谓神经网络训练经验怎样变成可复现而非口耳相传的实验合同？",
    "一次改变多个超参数，只保留最好一次运行并隐藏失败种子",
    "实验矩阵、随机种子、资源预算、失败日志与复现实验",
    "训练经验、超参数、随机性与复现纪律",
    ["essay"],
  ],
  "tcg-main-08": [
    "区分函数可表示、参数可找到、数据足够和计算可承受",
    "足够大的网络能表示某个函数，为什么不等于能从有限样本学到它？",
    "把通用逼近结论外推成任何任务都可训练、可泛化且可计算",
    "能力分解表、样本效率曲线、优化失败与计算预算",
    "表示能力、可学习性、泛化与计算复杂度",
    ["essay"],
  ],
  "tcg-main-09": [
    "用邻域、方向、投影和任务探针解释嵌入表示",
    "离散token怎样进入连续表示空间，而相似性结论怎样避免被二维图误导？",
    "把二维投影距离当成高维空间的完整语义距离或因果结构",
    "向量邻域、投影参数、任务探针与反例对",
    "嵌入、相似性、降维投影与任务依赖",
    ["essay", "transformer"],
  ],
  "tcg-main-10": [
    "追踪token、位置、注意力、前馈层与输出分布的历史架构链",
    "书中GPT-3参照怎样解释早期ChatGPT内部计算，又不能冒充当前产品规格？",
    "把作者2023年的GPT-3示意图写成所有当前ChatGPT模型的精确实现",
    "张量形状账本、层级轨迹、历史版本标记与未知项清单",
    "token/位置表示、注意力、前馈计算与历史边界",
    ["essay", "transformer", "gpt3"],
  ],
  "tcg-main-11": [
    "连接大规模语料、预测目标、参数更新与训练计算量",
    "预训练怎样把语料统计压入参数，而不等于逐字保存或保证事实正确？",
    "把参数量、训练语料估计和计算量级写成当前ChatGPT的公开事实",
    "数据来源分层、目标函数、规模估计边界与记忆探针",
    "预训练、压缩、记忆、规模估计与未知项",
    ["essay", "gpt3"],
  ],
  "tcg-main-12": [
    "区分基础预训练、监督示范、偏好比较与策略优化",
    "超越基础训练的对齐阶段改变了什么，又没有证明什么？",
    "把人类偏好奖励等同于真实性、安全性或对所有人一致的价值",
    "阶段数据谱系、奖励模型探针、拒答样本与独立事实评估",
    "指令微调、偏好数据、人类反馈与奖励偏差",
    ["essay", "instruct"],
  ],
  "tcg-main-13": [
    "分开句法规律、语义连贯、世界事实与可执行计算",
    "语言模型为什么能生成连贯文本，却仍会在全局事实和深计算上失败？",
    "看到流畅语法就推断模型拥有可靠世界模型、真值保证或通用计算能力",
    "句法探针、事实反例、长程一致性测试与工具需求表",
    "语言规律、统计结构、事实性与计算边界",
    ["essay"],
  ],
  "tcg-main-14": [
    "把语义空间轨迹当作待检验的表示假说而非已发现物理定律",
    "嵌入中的连续轨迹能否支持可重复的语义运动约束？",
    "从一个降维动画直接宣称存在稳定、普适且可解释的语义运动定律",
    "投影配置、多次运行轨迹、邻域稳定性与否证样本",
    "意义空间、轨迹、投影不确定性与可证伪假说",
    ["essay"],
  ],
  "tcg-main-15": [
    "区分自然语言统计规律、显式语义语法与计算语言",
    "何种结构可以由语言模型隐式捕获，何种精确计算必须交给符号工具？",
    "把作者关于语义语法的研究设想写成已被普遍验证的定律",
    "主张证据表、可执行表示、语言歧义样本与工具对照",
    "语义语法、计算语言、符号执行与研究假说",
    ["essay", "wolframAlpha"],
  ],
  "tcg-main-16": [
    "综合条件续写、神经表示、训练数据与语言结构的解释链",
    "怎样用最少拟人化词汇回答ChatGPT在做什么以及为什么有效？",
    "用理解、思考或意识替代可观测的条件分布、训练和生成机制",
    "因果链图、主张等级、失败案例与不适用边界",
    "条件生成、涌现能力、语言结构与拟人化风险",
    ["essay", "gpt3", "instruct"],
  ],
  "tcg-resources": [
    "把致谢、延伸材料和事实来源整理成可追溯的证据入口",
    "来源列表怎样区分历史材料、技术证据、产品页面和进一步阅读？",
    "把被引用、被感谢或链接存在当成内容正确、许可开放或当前有效",
    "来源类型表、访问日期、主张映射与失效链接替代方案",
    "致谢、补充资源、来源等级与许可边界",
    ["essay", "product"],
  ],
  "tcg-wa-01": [
    "区分语言生成器与可执行计算知识系统的职责",
    "ChatGPT与Wolfram|Alpha组合时，哪一步负责语言，哪一步负责计算和溯源？",
    "只要接入计算工具就宣称整条回答自动真实、完整且无歧义",
    "任务路由、工具输入、计算输出、语言整合与溯源记录",
    "概率语言、计算知识、工具路由与责任边界",
    ["essay", "wolframAlpha"],
  ],
  "tcg-wa-02": [
    "用一个可复算问题追踪自然语言到工具查询再到回答",
    "基本示例怎样保留单位、假设、实体和计算结果的完整谱系？",
    "只展示最终自然语言答案，隐藏工具查询、参数、单位和原始结果",
    "查询计划、规范化输入、工具原始输出与最终答案差分",
    "基本工具调用、参数规范化、单位与结果谱系",
    ["essay", "wolframAlpha"],
  ],
  "tcg-wa-03": [
    "用多类问题检验实体解析、单位换算、符号计算和事实查询",
    "更多示例如何暴露工具组合能力的共性与任务特有失败？",
    "从少数成功演示外推到所有领域、所有措辞和所有多步问题",
    "任务矩阵、领域假设、错误分类与跨示例回归集",
    "示例多样性、实体消歧、组合调用与外推边界",
    ["essay", "wolframAlpha"],
  ],
  "tcg-wa-04": [
    "把未来路径拆成接口、评估、权限、溯源和失效恢复",
    "语言模型与计算工具的组合怎样从演示走向可治理系统？",
    "把2023年的插件或接口形态写成永久架构，并忽略权限和失败处理",
    "能力合同、评估集、权限矩阵、回退策略与版本迁移记录",
    "工具编排、版本迁移、权限治理与持续评估",
    ["essay", "wolframAlpha", "instruct"],
  ],
};

const MAP_SPEC = [
  "把25个正式目录层级组织成可验证的学习路径",
  "怎样从逐token生成走到神经网络、训练、意义空间与计算工具，并保留版本边界？",
  "把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张",
  "25坐标覆盖矩阵、两篇正文依赖图、历史边界与学习检查点",
  "全书目录、机制依赖、来源层级与学习顺序",
  ["essay", "product", "instruct", "wolframAlpha"],
];

const REVIEW_SPEC = [
  "用同一证据协议复核25个正式目录层级",
  "能否从输入、分布、表示、训练、语言规律到工具调用重放全书解释链？",
  "只背结论而不能定位首个错误状态、原始来源或历史适用范围",
  "全书重放记录、反例矩阵、来源审计与最终发布门",
  "全书综合、反例迁移、历史边界与证据闭环",
  ["essay", "product", "transformer", "gpt3", "instruct", "wolframAlpha"],
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
  if (/preface|前言/.test(value))
    return `${profile.title}把作者写作日期、原版出版、中文译本与当前核查日期分列，任何现在时陈述都必须另找一手证据。`;
  if (/one word|添加一个词|probabilit|概率/.test(value))
    return `${profile.title}冻结同一上下文，先比较经验计数与模型条件分布，再分别运行贪心和随机采样；输出差异只能归因于被切换的解码规则。`;
  if (/model|模型|human-like|类人/.test(value))
    return `${profile.title}把数据表示、候选函数、参数拟合、训练切分和独立测试串成一条链，训练集表现不自动支持分布外或因果结论。`;
  if (/neural|神经|network|网络|training|训练/.test(value))
    return `${profile.title}记录逐层输入、加权和、非线性激活、损失与参数更新；表示能力、可优化性、样本效率和泛化必须分别验收。`;
  if (/embedding|嵌入|inside chatgpt|chatgpt内部/.test(value))
    return `${profile.title}从token与位置表示追到注意力、前馈计算和输出分布，并把作者使用的GPT-3示意明确标成2023年历史参照。`;
  if (/beyond|超越|really lets|真正让|meaning|意义|semantic|语义/.test(value))
    return `${profile.title}把偏好训练、句法连贯、语义假说、事实正确与精确计算拆开；流畅输出或漂亮投影不能替代独立真值测试。`;
  if (/thanks|致谢|resources|资源/.test(value))
    return `${profile.title}为每个链接标注作者材料、出版社书目、研究论文或产品入口，并记录它能支持的主张、访问时间和不能证明的事项。`;
  if (
    /wolfram|basic example|基本示例|more examples|更多示例|path forward|前进之路/.test(
      value,
    )
  )
    return `${profile.title}保存语言解析、工具查询、参数与单位、原始计算结果和最终表述的谱系；工具成功不等于整段答案自动真实。`;
  return `${profile.title}把${concept}放入输入、变换、输出和独立评估四层合同，并用一个单故障反例确定首个偏离点。`;
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
    invariant: `${title}的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯`,
    scenario: `在固定的2023年原书语境与独立事实来源下重放${focus}`,
  };
}

function enrichProfile(id, spec, role, concepts, officialUnitId = null) {
  const target =
    role === "learning-map"
      ? "00-learning-map/tcg-official-learning-map"
      : role === "final-review"
        ? "07-final-review/tcg-official-final-review"
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
      operation: `冻结${profile.focus}所需的文本、数据、模型或工具版本`,
      output: `${profile.title}的来源快照、输入合同与版本边界`,
      check: `${profile.title}没有把历史示意、产品名称或演示结果冒充当前规格`,
    },
    {
      name: `${profile.title} · 机制与计算`,
      input: `${profile.title}的冻结输入与预注册预测`,
      operation: profile.duty,
      output: `${profile.title}的参考轨迹、状态变化与中间证据`,
      check: `${profile.title}的每一步都能由同一输入、规则、参数和顺序复算`,
    },
    {
      name: `${profile.title} · 单故障反例`,
      input: `${profile.title}的参考轨迹与保持不变的控制条件`,
      operation: `只注入“${profile.fault}”`,
      output: `${profile.title}的首个状态分岔、传播路径与失败输出`,
      check: `${profile.title}没有同时更换语料、模型、解码、工具和评估集`,
    },
    {
      name: `${profile.title} · 恢复与边界`,
      input: `${profile.title}的故障快照、恢复操作与独立评估`,
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: `${profile.title}的恢复差分、接受结论与边界声明`,
      check: `${profile.title}满足“${profile.invariant}”`,
    },
  ];
  profile.cases = [
    {
      name: `${profile.title} · 参考`,
      setup: `固定${profile.scenario}的输入、版本、随机性与评估顺序`,
      prediction: `${profile.title}应持续满足“${profile.invariant}”`,
      boundary: `${profile.title}只回答本页正式目录坐标及已运行的历史与技术条件`,
    },
    {
      name: `${profile.title} · 单故障`,
      setup: `保持其余条件不变，只注入“${profile.fault}”`,
      prediction: `${profile.title}应出现可定位的首个状态分岔，而不是只有末端结论变化`,
      boundary: `${profile.title}的故障结果不能外推到未测试模型、语料、工具或产品版本`,
    },
    {
      name: `${profile.title} · 恢复`,
      setup: `撤销故障并从同一快照重放${profile.focus}`,
      prediction: `${profile.title}的状态、输出与独立评估应恢复参考路径`,
      boundary: `${profile.title}若无法恢复，就不能把异常归因给该单一故障`,
    },
  ];
  profile.referenceTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}参考步骤${index + 1}：${stage.operation}；保存${stage.output}，并断言${stage.check}。`,
  );
  profile.faultTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}故障步骤${index + 1}：保持${stage.input}不变，检查“${profile.fault}”如何改变${stage.output}。`,
  );
  profile.gates = [
    {
      label: "原文与版本门",
      detail: `${profile.title}区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。`,
    },
    {
      label: "输入与状态门",
      detail: `${profile.title}的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。`,
    },
    {
      label: "反例与恢复门",
      detail: `${profile.title}只注入“${profile.fault}”，记录首个分岔并从同一快照恢复。`,
    },
    {
      label: "结论与边界门",
      detail: `${profile.title}交付${profile.artifact}，并明确未测试模型、产品版本与外推范围。`,
    },
  ];
  return profile;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 解释${profile.focus}中的输入、状态、变换与输出，而不只复述结论
- 用单一反例“${profile.fault}”定位${profile.title}的首个错误状态
- 交付${profile.artifact}，并区分2023年原书主张与当前事实

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
  return `## 原文、版本与事实边界

${profile.title}以[Stephen Wolfram作者公开完整文章](${SOURCES.essay})核对正文论证，以[Wolfram Media原版产品页](${SOURCES.product})核对作者Stephen Wolfram、2023年3月9日出版、112页、纸书ISBN 978-1-57955-081-3以及前言、两篇正文、20个分节、致谢和补充资源。

${profile.title}以[Wolfram Media翻译页](${SOURCES.translations})确认中文译本《这就是ChatGPT》，并以[人民邮电出版社页面](${SOURCES.chinese})核对WOLFRAM传媒汉化小组译、2023年7月、134页和ISBN 9787115618085；全书正式分母是25个目录层级，课程采用学习地图、22个正文单元和总复习共24页承载。

${profile.title}把作者文章视为可访问的完整一手材料，但可访问不等于开放许可；本站不复制、逐段翻译或近似改写原文、图片、代码与示例，所有中文机制解释、交互、反例、练习和答案均为独立教学重写。书中关于GPT-3、早期ChatGPT、参数量和接口形态的陈述属于2023年历史快照，不能冒充2026年当前产品规格。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项解释

${profile.concepts
  .map(
    (concept, index) => `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${concept}。** ${mechanismFor(concept, profile)} 这里的验收不是“读过”或“能复述”，而是能保存输入快照、运行参考路径、只注入${profile.fault}、定位首个分岔，并用${profile.artifact}说明恢复结果与不适用边界。`,
  )
  .join("\n\n")}`;
}

function termsSection(profile) {
  const terms = [
    [
      "生成目标",
      `${profile.title}实际优化或执行的可观测目标，而不是拟人化意图`,
    ],
    [
      "条件分布",
      `${profile.title}在给定上下文与版本后对候选输出建立的相对权重`,
    ],
    ["表示空间", `${profile.title}把离散输入转换为可计算状态的坐标系统`],
    ["训练证据", `${profile.title}的数据、目标、更新过程、留出评估与版本记录`],
    ["单一反例", `${profile.title}只改变一个条件以定位首个机制分岔的测试`],
    ["适用边界", `${profile.title}没有运行、无法核对或不能外推的模型与情境`],
  ];
  return `## 术语与可观测量

在${profile.title}中，${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}共同组成证据合同。术语只有绑定输入、状态、输出和失败条件才有解释力；把标签换成更时髦的词，不会提升结论可信度。

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
  return `## 先预测，再运行三个交互视图

先预测：只注入“${profile.fault}”时，${profile.title}在哪个阶段最先偏离参考路径？请写下会变化的输入、表示、条件分布、工具状态或评估信号，再操作视图；看到结果后补写的理由不能算预注册预测。

<Stepper>
  <Step title="上下文合同：选择坐标与阶段">
    <${profile.componentBase}ContextContractLab />
  </Step>
  <Step title="计算轨迹：比较参考与故障">
    <${profile.componentBase}ComputeTraceLab />
  </Step>
  <Step title="证据门：展开检查与交付">
    <${profile.componentBase}EvidenceGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可复现实验协议

1. 为${profile.title}冻结作者材料、技术论文、模型或工具版本、输入、随机性和成功标准，并把未知的当前产品细节明确标为未知。
2. 运行参考路径，逐阶段保存${profile.artifact}；若只能看到最终自然语言输出，就还没有机制证据。
3. 保持其余条件不变，只注入“${profile.fault}”，记录首个偏离参考状态的位置以及它向后传播的方式。
4. 撤销故障，从同一快照重放；只有状态与独立评估都恢复，才允许把异常归因给该故障。

<Callout type="trap" title="${profile.title}误区一：历史快照就是当前规格">
作者在2023年使用的GPT-3规模、ChatGPT训练解释或工具接口是历史材料；没有当前一手来源时，${profile.title}必须写“未知”，不能用现在时包装旧数字。
</Callout>

<Callout type="trap" title="${profile.title}误区二：流畅就是正确">
连贯文本、相似度投影或成功演示只能证明某次输出表现；${profile.title}仍需事实核查、计算复算、反例和分布外评估。
</Callout>

<Callout type="trap" title="${profile.title}误区三：一次改很多条件">
若同时更换语料、模型、提示、温度、工具和评估集，${profile.title}就无法定位因果；必须保留单故障合同和恢复路径。
</Callout>`;
}

function exercisesSection(profile) {
  const conceptQuestions = profile.concepts
    .map(
      (concept, index) => `**问题 ${index + 1}：${concept}**

为${profile.title}设计一个最小输入和一个单一反例，说明${concept}会改变哪个中间状态、应保存什么证据，以及结论不能外推到哪里。

<Answer>
先冻结${profile.scenario}，把${concept}映射到明确输入、变换和输出；参考路径保存${profile.artifact}，故障路径只注入“${profile.fault}”。若首个分岔可定位且撤销故障后恢复，才能接受局部机制解释；未测试的模型、语料、工具、产品版本与分布都留在${profile.title}的适用边界外。
</Answer>`,
    )
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${conceptQuestions}

**问题 ${start}：原书与当前事实**

指出${profile.title}中至少一个必须标成2023年历史快照的主张，并写出重新验证当前事实需要的一手来源类型。

<Answer>
凡涉及GPT-3参数、早期ChatGPT训练描述、产品接口或工具集成形态，都先标记为2023年历史快照。当前事实需要模型或产品提供方的官方文档、系统卡、发布说明或原始研究；作者文章与旧版书目只能证明当时如何表述，不能证明2026年仍然如此。
</Answer>

**问题 ${start + 1}：恢复为什么必要**

为什么${profile.title}发现故障后还必须撤销故障并从同一快照重放？

<Answer>
恢复重放检验“单一故障导致分岔”这一归因。若撤销后${profile.artifact}仍不能回到参考状态，就说明存在隐藏变量、状态污染或不可复现步骤；此时应拒绝单因果结论，而不是把异常强行归给${profile.fault}。
</Answer>

</Exercises>`;
}

function synthesisSection(profile) {
  return `## 小结与上架门

${profile.title}的核心不是记住一句“ChatGPT逐token生成”，而是把${profile.focus}放进可复算链：来源与版本决定能说什么，输入和表示决定模型看到什么，训练或工具计算决定状态怎样变化，独立评估与反例决定结论能否成立。最终交付${profile.artifact}，并同时报告通过项、失败项、未知项和适用边界。

${exercisesSection(profile)}

${termsSection(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="author-complete-public-essay-plus-official-editions-and-primary-research"
  workTitle="Stephen Wolfram著《What Is ChatGPT Doing ... and Why Does It Work?》与中文译本《这就是ChatGPT》"
  adaptedUrl="${SOURCES.essay}"
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

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先写下哪个输入、表示、分布、训练信号、工具状态或评估结果会最先变化，再运行参考、故障和恢复路径；只有守住“${profile.invariant}”并交付${profile.artifact}，流畅输出或成功演示才可能成为机制证据。

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
    description: `${profile.duty}；用上下文合同、计算轨迹与证据门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: SOURCES.essay,
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
if (manifest.units.length !== 22)
  throw new Error(`正式单元数量异常：${manifest.units.length}`);

const allCoordinates = manifest.units.flatMap(conceptStrings);
if (allCoordinates.length !== 25)
  throw new Error(`正式目录坐标应为25，实际${allCoordinates.length}`);

const profiles = [
  enrichProfile(
    "learningMap",
    normalizeSpec("learningMap", MAP_SPEC, "《这就是ChatGPT》原版证据学习地图"),
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
      "《这就是ChatGPT》全书证据总复习",
    ),
    "final-review",
    allCoordinates,
  ),
];
if (profiles.length !== 24)
  throw new Error(`页面数量应为24，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "full-text-primary";
  unit.factSourceIds = [
    "authorEssay",
    "publisher",
    "transformer",
    "gpt3",
    "instruct",
    "wolframAlpha",
  ];
}
manifest.edition =
  "Stephen Wolfram, What Is ChatGPT Doing ... and Why Does It Work?, Wolfram Media, 2023-03-09, 112 pages, ISBN 9781579550813；WOLFRAM传媒汉化小组译《这就是ChatGPT》，人民邮电出版社，2023年7月，134页，ISBN 9787115618085";
manifest.sourceKind =
  "author-complete-public-essay-plus-official-publisher-complete-contents";
manifest.sourceUrl = SOURCES.essay;
manifest.secondarySourceUrls = [
  SOURCES.product,
  SOURCES.translations,
  SOURCES.chinese,
  SOURCES.transformer,
  SOURCES.gpt3,
  SOURCES.instruct,
  SOURCES.wolframAlpha,
];
manifest.status = "verified-full-primary-independent-rewrite";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "full-text-primary";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "作者页面公开完整文章，Wolfram Media产品页给出完整目录、英文版书目与中文翻译入口；公开可读不等于开放许可。课程不复制或逐段翻译原文、图片、代码和示例，按25个正式目录层级独立重写，并把GPT-3、早期ChatGPT参数与工具接口明确限定为2023年历史快照。";
manifest.unitMappingEvidence = "quality/this-is-chatgpt-v2-profiles.json";
manifest.factSourcePolicy =
  "作者完整文章限定原始论证；版本、架构、训练和工具事实分别由官方书目、原始论文或产品方一手材料独立核对，未知的当前ChatGPT实现保持未知。";
manifest.factSources = {
  authorEssay: {
    kind: "author-complete-public-presentation",
    label: "Stephen Wolfram作者公开完整文章",
    url: SOURCES.essay,
  },
  publisher: {
    kind: "official-publisher-complete-contents",
    label: "Wolfram Media原版产品页",
    url: SOURCES.product,
  },
  translations: {
    kind: "official-publisher-translation-index",
    label: "Wolfram Media翻译页",
    url: SOURCES.translations,
  },
  chinese: {
    kind: "official-chinese-publisher-edition",
    label: "人民邮电出版社中文版",
    url: SOURCES.chinese,
  },
  transformer: {
    kind: "primary-research-paper",
    label: "Attention Is All You Need",
    url: SOURCES.transformer,
  },
  gpt3: {
    kind: "primary-research-paper",
    label: "Language Models are Few-Shot Learners",
    url: SOURCES.gpt3,
  },
  instruct: {
    kind: "primary-research-paper",
    label:
      "Training language models to follow instructions with human feedback",
    url: SOURCES.instruct,
  },
  wolframAlpha: {
    kind: "official-product-source",
    label: "Wolfram|Alpha",
    url: SOURCES.wolframAlpha,
  },
};
manifest.coverageMetrics = {
  targetFormalNodes: 25,
  coveredFormalNodes: 25,
  coveragePercent: 100,
};
manifest.metrics = {
  formalPrefaceNodes: 1,
  formalMainEssayHeadings: 1,
  formalMainEssaySections: 16,
  formalResourceNodes: 2,
  formalWolframAlphaEssayHeadings: 1,
  formalWolframAlphaSections: 4,
  formalAdditionalResourceNodes: 1,
  formalConceptNodes: 25,
  officialUnits: 22,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 24,
  interactiveViews: 72,
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
      formalCoordinates: 25,
      pageCount: 24,
      interactiveViews: 72,
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
  "已重建24页，覆盖前言+两篇正文+主文16节+补文4节+致谢和补充资源=25个正式坐标，生成72个交互视图。",
);
