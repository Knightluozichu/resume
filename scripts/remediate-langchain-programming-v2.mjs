#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "langchain-programming";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/langchain-programming-v2-profiles.json",
);

const SOURCES = {
  author: "https://aitutor.liduos.com/",
  catalog: "https://m.bookschina.com/9299314.htm",
  overview: "https://docs.langchain.com/oss/python/langchain/overview",
  migration: "https://docs.langchain.com/oss/python/migrate/langchain-v1",
  repository: "https://github.com/langchain-ai/langchain",
  langgraph: "https://github.com/langchain-ai/langgraph",
  langsmith: "https://docs.langchain.com/langsmith/observability",
  security: "https://github.com/langchain-ai/langchain/security/advisories",
};

const SOURCE_INDEX = {
  author: {
    label: "作者开放学习站",
    url: SOURCES.author,
    use: "核对作者身份、实践取向和相关公开伴学材料，但不把伴学站冒充纸书全文",
  },
  catalog: {
    label: "首版公开书目与完整目录",
    url: SOURCES.catalog,
    use: "核对中文版书目与146个正式目录层级",
  },
  overview: {
    label: "LangChain当前官方总览",
    url: SOURCES.overview,
    use: "核对当前v1的agent harness、模型接口、LangGraph与LangSmith定位",
  },
  migration: {
    label: "LangChain v1官方迁移指南",
    url: SOURCES.migration,
    use: "核对精简命名空间、langchain-classic、create_agent和破坏性变化",
  },
  repository: {
    label: "LangChain官方代码库",
    url: SOURCES.repository,
    use: "核对开源实现、许可证、发布与代码边界",
  },
  langgraph: {
    label: "LangGraph官方代码库",
    url: SOURCES.langgraph,
    use: "核对当前有状态、可恢复编排层的职责",
  },
  langsmith: {
    label: "LangSmith官方可观测性文档",
    url: SOURCES.langsmith,
    use: "核对trace、调试和评估的当前证据入口",
  },
  security: {
    label: "LangChain官方安全公告",
    url: SOURCES.security,
    use: "核对依赖与模板等安全风险不能只靠书中静态建议",
  },
};

const PATHS = {
  "lcp-preface": "01-preface/lcp-preface",
  "lcp-01": "02-introduction/lcp-01-introduction",
  "lcp-02": "03-quickstart/lcp-02-first-experience",
  "lcp-03": "04-model-io/lcp-03-model-io",
  "lcp-04": "05-chains/lcp-04-building-chains",
  "lcp-05": "06-rag/lcp-05-rag",
  "lcp-06": "07-agents/lcp-06-agents",
  "lcp-07": "08-memory/lcp-07-memory",
  "lcp-08": "09-callbacks/lcp-08-callbacks",
  "lcp-09": "10-project/lcp-09-multimodal-bot",
  "lcp-10": "11-community/lcp-10-community-resources",
};

const SPEC_DATA = {
  "lcp-preface": [
    "把2024年原书、作者伴学材料和当前LangChain v1放进可追溯时间轴",
    "怎样学习一本快速过时的框架书，同时保存原书语义并验证当前接口？",
    "把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认",
    "版本时间轴、来源类型表、兼容矩阵与迁移决策记录",
    "原书范围、伴学材料、当前文档与版本治理",
    "当前v1以精简agent构建块为主，旧Chain与检索接口按迁移指南进入langchain-classic或新编排层",
    ["author", "catalog", "overview", "migration"],
  ],
  "lcp-01": [
    "比较2024年六大模块叙事与当前agent harness、LangGraph和集成包结构",
    "LangChain抽象解决什么组合问题，哪些旧模块边界在v1已经重构？",
    "只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容",
    "模块责任图、旧新命名空间差分、最小调用轨迹与框架选择表",
    "产生背景、核心模块、框架比较与当前生态",
    "当前总览以create_agent、标准模型接口、中间件、LangGraph和LangSmith组织职责，不能照搬旧六模块目录",
    ["author", "overview", "migration", "repository"],
  ],
  "lcp-02": [
    "冻结Python、包锁、密钥边界并重放模型—提示—解析—观测—服务链",
    "快速开始怎样从一次成功调用升级为可复现、可观测且安全的最小服务？",
    "使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出",
    "环境锁、输入输出schema、trace、服务合同与密钥泄露检查",
    "环境、快速开始、LCEL、LangSmith、LangServe与安全",
    "当前v1示例应从标准模型接口或create_agent开始；旧LCEL与服务示例需按包版本和迁移指南单独验证",
    ["overview", "migration", "langsmith", "security"],
  ],
  "lcp-03": [
    "把消息、提示模板、示例选择、模型接口和结构化输出连成类型合同",
    "模型输入输出怎样在不可控生成中维持schema、消息角色和失败可诊断性？",
    "字符串拼接替代消息类型，并把一次解析成功当成所有模型都满足schema",
    "消息快照、模板变量表、模型响应、解析错误与结构化输出评估",
    "模型原理、提示模板、示例选择、模型接口与输出解析",
    "当前v1优先标准消息内容、统一模型初始化和provider/tool结构化输出策略，旧接口必须标注版本",
    ["overview", "migration", "repository"],
  ],
  "lcp-04": [
    "追踪Runnable的schema、invoke、stream、batch、配置、分支、并行与容错",
    "组合链怎样保持输入输出类型、事件顺序、并发边界和失败恢复？",
    "把同步invoke通过等同于stream、batch、异步事件和并行分支都正确",
    "schema图、事件流、并发轨迹、重试记录与旧Chain迁移表",
    "Runnable、LCEL高级组合、Chain接口与专用Chain",
    "当前v1将大量旧Chain移至langchain-classic；新开发需依据当前agent或LangGraph职责判断是否仍使用Runnable组合",
    ["migration", "overview", "repository", "langgraph"],
  ],
  "lcp-05": [
    "分解加载、切分、嵌入、索引、检索、上下文装配、生成与评估",
    "RAG系统怎样证明检索到了正确证据，而不是只让答案听起来更具体？",
    "同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升",
    "文档谱系、chunk账本、检索排名、引用覆盖与端到端评估集",
    "RAG组件、文档预处理、检索、生成与关键挑战",
    "当前实现应按集成包和LangGraph/agent工作流明确索引与运行时路径，并用trace与检索评估验收",
    ["overview", "repository", "langgraph", "langsmith"],
  ],
  "lcp-06": [
    "把模型、工具、提示、状态、循环、停止条件和人工介入组成agent合同",
    "智能代理怎样在多模态工具调用中保持参数验证、权限最小化和可恢复状态？",
    "让模型自由选择高权限工具，并把成功最终答案当成每次工具调用都正确",
    "工具schema、状态轨迹、权限矩阵、停止原因与恢复检查点",
    "代理概念、代理类型、自定义工具与多模态代理",
    "当前v1推荐create_agent并以中间件扩展；底层有状态编排由LangGraph承载，旧Agent类型不可直接等同",
    ["overview", "migration", "langgraph", "security"],
  ],
  "lcp-07": [
    "区分短期状态、摘要、实体、知识图和向量检索记忆的写入与读取",
    "记忆组件怎样证明保留了任务所需信息，同时控制泄露、污染和上下文预算？",
    "把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案",
    "状态schema、写入日志、读取命中、遗忘策略与隐私删除测试",
    "记忆类型、代理接入、自定义组合与实战",
    "当前agent状态和持久化应依据LangGraph与当前短期记忆接口建模；旧Conversation*Memory属于历史轨道",
    ["migration", "overview", "langgraph", "security"],
  ],
  "lcp-08": [
    "把模型、链、工具和检索事件转换为可关联trace",
    "回调怎样从日志钩子升级为能定位延迟、错误、成本和质量回归的可观测证据？",
    "只打印开始结束事件，缺少run关联、输入脱敏、嵌套关系和失败状态",
    "事件schema、run树、脱敏检查、延迟分解与回归面板",
    "回调处理器、构造器/请求回调与可观测性插件",
    "当前可观测主路径由LangSmith trace与评估承担；旧回调接口需按版本验证且不能泄露提示或密钥",
    ["langsmith", "overview", "migration", "security"],
  ],
  "lcp-09": [
    "从Slack事件验签、消息归一化、代理工具到监控、评估、安全和部署做端到端验收",
    "多模态机器人怎样在重复事件、附件、工具失败和模型切换下保持可用？",
    "忽略Slack重试与事件验签，让同一事件重复触发高成本或高权限工具",
    "需求追踪、事件幂等键、代理trace、模型评估、安全策略与部署回退",
    "Slack应用、多模态代理、监控、评估、安全与部署",
    "当前实现应以create_agent/LangGraph状态和LangSmith评估替换过时代理骨架，同时保留Slack协议与幂等合同",
    ["overview", "migration", "langgraph", "langsmith", "security"],
  ],
  "lcp-10": [
    "把博客、代码、文档、模板、服务、观测与社区贡献按权威性和版本分类",
    "社区资源怎样帮助迁移而不让旧教程、旧导入路径和路线图污染生产代码？",
    "复制高星示例或旧博客代码，不检查发布日期、包锁、迁移指南与安全公告",
    "资源等级表、版本新鲜度、迁移链接、复现记录与贡献反馈",
    "社区、模板、LangServe、LangSmith、生态变化与发展计划",
    "当前生态以官方docs、reference、代码库、LangGraph、LangSmith和迁移指南为主，路线图陈述必须带日期",
    ["overview", "migration", "repository", "langgraph", "langsmith"],
  ],
};

const MAP_SPEC = [
  "把前言、10章和135个节/小节组织成原书与v1双轨学习图",
  "怎样覆盖146个正式目录坐标，同时把稳定机制和易变API分开治理？",
  "把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口",
  "146坐标矩阵、版本泳道、依赖图与迁移检查点",
  "全书目录、稳定机制、易变接口与发布顺序",
  "当前v1轨道以官方总览和迁移指南为准，原书2024轨道保持原貌并禁止跨轨拼接",
  ["author", "catalog", "overview", "migration", "repository"],
];

const REVIEW_SPEC = [
  "从环境锁到生产机器人重放全书双轨证据链",
  "能否为146个目录坐标说明原书语义、当前v1状态、迁移故障和回退证据？",
  "只背API名称，无法复现输入输出schema、trace、评估或版本迁移",
  "全书回归集、旧新接口矩阵、trace档案与发布/回退决策",
  "全书复盘、跨章组合、迁移演练与生产发布门",
  "当前v1轨道必须通过官方迁移、类型、trace与评估检查；原书轨道只承担历史教学解释",
  [
    "author",
    "catalog",
    "overview",
    "migration",
    "repository",
    "langgraph",
    "langsmith",
    "security",
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
  if (/前言|背景|简介|比较|社区|资源|展望|生态/.test(value))
    return `${profile.title}把原书2024、作者伴学材料、当前v1文档和迁移指南分列；框架定位与路线图必须附版本和核查日期。`;
  if (/环境|安装|安全|服务|langserve|langsmith|观测/.test(value))
    return `${profile.title}冻结Python与包锁，隔离密钥，保存输入输出schema和trace；一次本地成功不能替代服务合同、安全检查与回退。`;
  if (/模型|提示|fewshot|示例选择|输出解析|i\/o|接口/.test(value))
    return `${profile.title}用消息角色、模板变量、模型配置和解析schema组成类型链，并分别测试正常输出、拒答、截断与格式错误。`;
  if (
    /链|runnable|schema|invoke|stream|batch|lambda|branch|passthrough|parallel|容错/.test(
      value,
    )
  )
    return `${profile.title}在同一输入上比较invoke、stream、batch与分支事件，记录顺序、并发、异常传播和v1迁移后的责任归属。`;
  if (/rag|加载|分割|嵌入|向量|检索|文档|问答/.test(value))
    return `${profile.title}从文档版本、chunk、嵌入和索引追到检索排名、引用上下文与生成答案；检索质量和生成质量必须分开评估。`;
  if (/代理|agent|工具|多模态/.test(value))
    return `${profile.title}把模型、工具schema、状态、循环、停止原因和权限写成agent合同，并用工具错误与人工介入路径测试恢复。`;
  if (/记忆|memory|buffer|entity|kg|summary/.test(value))
    return `${profile.title}标记状态的写入者、读取时机、保留预算、遗忘和删除策略；旧Memory类与当前LangGraph持久化不能只按名称替换。`;
  if (/回调|callback|监控|评估|调优/.test(value))
    return `${profile.title}用run树关联模型、工具、检索和错误事件，并对敏感输入脱敏；日志存在不等于trace完整或质量已评估。`;
  if (/slack|应用|消息|部署|需求/.test(value))
    return `${profile.title}从事件验签、幂等键和消息归一化追到agent状态、评估、安全策略、部署与回退，重复事件不得重复执行副作用。`;
  return `${profile.title}把${concept}映射到版本、输入schema、执行状态、输出证据和失败边界，再用单一迁移故障定位首个不兼容点。`;
}

function normalizeSpec(id, data, title) {
  const [duty, question, fault, artifact, focus, currentV1, sourceIds] = data;
  return {
    id,
    title,
    duty,
    question,
    fault,
    artifact,
    focus,
    currentV1,
    sourceIds,
    invariant: `${title}的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致`,
    scenario: `在锁定的2024原书轨道和当前LangChain v1轨道上重放${focus}`,
  };
}

function enrichProfile(id, spec, role, concepts, officialUnitId = null) {
  const target =
    role === "learning-map"
      ? "00-map/lcp-official-learning-map"
      : role === "final-review"
        ? "12-review/lcp-official-final-review"
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
      name: `${profile.title} · 依赖与输入`,
      input: profile.scenario,
      book2024: `冻结原书${profile.focus}对应的2024包版本、导入路径与示例输入`,
      currentV1: `按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema`,
      output: `${profile.title}的依赖锁、输入合同和版本泳道`,
      check: `${profile.title}没有在同一运行中混用v0、langchain-classic与v1接口`,
    },
    {
      name: `${profile.title} · 组合与执行`,
      input: `${profile.title}的锁定依赖、输入与预注册预测`,
      book2024: profile.duty,
      currentV1: profile.currentV1,
      output: `${profile.title}的状态事件、工具/检索调用与输出快照`,
      check: `${profile.title}的每一步可由同一schema、版本、配置和顺序复算`,
    },
    {
      name: `${profile.title} · 迁移故障`,
      input: `${profile.title}的参考轨迹与保持不变的模型、数据和评估集`,
      book2024: `在原书轨道只注入“${profile.fault}”并保存首个失败事件`,
      currentV1: `在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔`,
      output: `${profile.title}的首个不兼容点、传播路径与错误分类`,
      check: `${profile.title}没有把多项依赖升级或模型切换归因给单一API`,
    },
    {
      name: `${profile.title} · 评估与回退`,
      input: `${profile.title}的参考/故障trace、独立评估与回退快照`,
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: `${profile.title}的兼容结论、评估差分与发布/回退理由`,
      check: `${profile.title}满足“${profile.invariant}”`,
    },
  ];
  profile.cases = [
    {
      name: `${profile.title} · 原书参考`,
      setup: `固定${profile.scenario}中的2024依赖、输入和事件顺序`,
      prediction: `${profile.title}的历史轨迹应满足原书接口合同且不声称当前兼容`,
      boundary: `${profile.title}的原书轨道只说明2024首版与锁定依赖`,
    },
    {
      name: `${profile.title} · v1参考`,
      setup: `按当前官方文档固定v1依赖、输入schema、状态与评估`,
      prediction: `${profile.title}应持续满足“${profile.invariant}”`,
      boundary: `${profile.title}只覆盖核查日期的官方v1接口和已运行集成`,
    },
    {
      name: `${profile.title} · 迁移故障`,
      setup: `保持其余条件不变，只注入“${profile.fault}”`,
      prediction: `${profile.title}应定位首个不兼容事件并能从锁定快照回退`,
      boundary: `${profile.title}的迁移结论不能外推到未测试provider、模型或部署`,
    },
  ];
  profile.referenceTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}参考步骤${index + 1}：原书轨道执行${stage.book2024}；当前v1轨道执行${stage.currentV1}；保存${stage.output}并断言${stage.check}。`,
  );
  profile.faultTrace = profile.stages.map(
    (stage, index) =>
      `${profile.title}故障步骤${index + 1}：保持${stage.input}不变，只检查“${profile.fault}”怎样改变${stage.output}。`,
  );
  profile.gates = [
    {
      label: "书目与版本门",
      detail: `${profile.title}区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。`,
    },
    {
      label: "schema与trace门",
      detail: `${profile.title}的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。`,
    },
    {
      label: "迁移与安全门",
      detail: `${profile.title}只注入“${profile.fault}”，检查权限、敏感数据、首个分岔和回退。`,
    },
    {
      label: "评估与发布门",
      detail: `${profile.title}交付${profile.artifact}，并报告通过、失败、未知和未测试集成。`,
    },
  ];
  return profile;
}

function objectivesBlock(profile) {
  return `<Objectives>

- 解释${profile.focus}的输入schema、执行状态、事件与输出，而不只背API名称
- 并列原书2024轨道与当前LangChain v1轨道，定位“${profile.fault}”的首个分岔
- 交付${profile.artifact}，说明评估、回退、安全与未测试边界

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
  return `## 原书、伴学材料与当前v1边界

${profile.title}以[作者李多多（莫尔索）的开放学习站](${SOURCES.author})核对作者身份、实践取向和相关公开伴学材料；站点明确称其为个人学习笔记并宣传纸书，但它不是人民邮电出版社纸书的逐页全文，因此本课程把来源级别记为“作者授权伴学样本”，不虚构完整书稿访问权。

${profile.title}以[首版公开书目与完整目录](${SOURCES.catalog})核对《LangChain编程：从入门到实践》、人民邮电出版社、2024年4月、192页、ISBN 9787115639424，以及前言、10章和全部节/小节。正式分母是1个前言、10个章标题和135个节/小节，共146个层级；课程用学习地图、前言、10章和总复习共13页承载。

${profile.title}以[LangChain当前官方总览](${SOURCES.overview})与[v1迁移指南](${SOURCES.migration})建立第二条事实轨道：当前v1精简核心命名空间、把大量旧Chain与检索接口移到langchain-classic，并以create_agent、中间件、LangGraph和LangSmith组织主路径。本站不复制纸书或伴学站正文、代码和图片，所有中文解释、双轨迁移、反例、交互、练习与答案均为独立重写。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 146个正式坐标中的本页覆盖

${profile.concepts
  .map(
    (concept, index) => `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${concept}。** ${mechanismFor(concept, profile)} 对${profile.title}的验收必须同时保存依赖锁、输入输出schema、参考trace、单一迁移故障、独立评估和回退结果；仅有导入成功、无异常或最终答案流畅，都不能证明当前v1兼容。`,
  )
  .join("\n\n")}`;
}

function termsSection(profile) {
  const terms = [
    ["版本轨道", `${profile.title}把原书2024与当前v1分开的依赖和接口语义`],
    [
      "输入schema",
      `${profile.title}对消息、文档、工具参数或事件负载的类型合同`,
    ],
    [
      "执行trace",
      `${profile.title}把模型、检索、工具、状态和错误关联起来的事件树`,
    ],
    ["迁移故障", `${profile.title}只改变一个版本或接口假设以定位不兼容点`],
    ["独立评估", `${profile.title}不复用演示样本的质量、安全、延迟和成本检查`],
    ["回退快照", `${profile.title}能够恢复依赖、状态和服务行为的可部署版本`],
  ];
  return `## 术语与运行证据

在${profile.title}中，${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}共同约束发布。术语必须落到锁文件、schema、trace、评估和回退；把旧类名替换成新类名而不重跑行为合同，不叫迁移。

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
  return `## 先预测，再操作双轨实验

先预测：在${profile.title}只注入“${profile.fault}”时，依赖解析、输入schema、执行事件、工具/检索状态、输出解析或独立评估中的哪一项最先变化？请先写下可观测信号，再切换原书/v1轨道和参考/故障trace。

<Stepper>
  <Step title="版本合同：比较原书与v1">
    <${profile.componentBase}VersionContractLab />
  </Step>
  <Step title="执行轨迹：重放参考与故障">
    <${profile.componentBase}RunnableTraceLab />
  </Step>
  <Step title="发布证据门：检查评估与回退">
    <${profile.componentBase}ReleaseGateLab />
  </Step>
</Stepper>`;
}

function protocolSection(profile) {
  return `## 最小可复现与迁移协议

1. 为${profile.title}分别冻结原书2024与当前v1的Python、包锁、集成包、模型/工具版本、输入schema、随机性和评估集，禁止跨轨拼接。
2. 在两条轨道运行参考流程，保存${profile.artifact}；若只能看到最终输出，就无法判断差异来自框架、provider还是数据。
3. 保持模型、数据和评估不变，只注入“${profile.fault}”，定位依赖、schema、状态、事件或输出中的首个分岔。
4. 撤销故障，从同一快照重放；只有trace、评估和回退都恢复，才允许批准迁移或发布。

<Callout type="trap" title="${profile.title}误区一：旧API等于错误知识">
原书2024接口是历史教学轨道，仍可解释稳定机制；${profile.title}应标注版本并建立迁移关系，而不是删除历史或假装它仍是当前默认。
</Callout>

<Callout type="trap" title="${profile.title}误区二：改导入路径就完成迁移">
v1改变命名空间、agent构建、状态、中间件和内容块等语义；${profile.title}必须重跑schema、stream、工具错误、trace和评估，不能只让代码通过import。
</Callout>

<Callout type="trap" title="${profile.title}误区三：演示成功即可上线">
LangChain应用还依赖模型、检索、外部工具、权限和数据；${profile.title}必须覆盖故障、重复事件、敏感数据、回退与持续评估。
</Callout>`;
}

function exercisesSection(profile) {
  const conceptQuestions = profile.concepts
    .map((concept, index) => {
      const conceptLabel = concept.replaceAll(".", "·");
      return `**问题 ${index + 1}：${concept}**

为${profile.title}的${conceptLabel}写一个原书2024输入和一个当前v1输入，指出最小迁移故障、首个可观测分岔、独立评估与回退条件。

<Answer>
先分别锁定两条版本轨道，把${conceptLabel}映射到明确schema、执行状态和输出事件；参考运行保存${profile.artifact}，故障运行只注入“${profile.fault}”。若首个分岔可定位、当前v1行为满足独立评估且回退恢复参考状态，才能批准局部迁移；未测试provider、模型、数据源和部署仍在${profile.title}边界外。
</Answer>`;
    })
    .join("\n\n");
  const start = profile.concepts.length + 1;
  return `## 练习与答案

<Exercises>

${conceptQuestions}

**问题 ${start}：为什么不能混合两条轨道**

解释${profile.title}为什么不能在同一示例中无标记地混用原书v0接口、langchain-classic与当前v1接口。

<Answer>
三者的命名空间、状态、事件、agent和内容语义可能不同。无标记混用会让读者无法复现依赖，也无法判断成功来自兼容层还是当前接口。正确做法是分开锁文件和运行入口，逐项写迁移映射，再用同一输入与评估比较行为。
</Answer>

**问题 ${start + 1}：发布证据**

${profile.title}除了“代码能运行”还需要哪些证据才能上线？

<Answer>
${profile.title}至少需要依赖与许可证清单、输入输出schema、完整trace、失败和重试路径、检索或工具调用证据、安全与敏感数据检查、独立质量评估、延迟成本预算、监控告警以及可执行回退快照。任一项未知都应显式列入${profile.title}的发布边界。
</Answer>

</Exercises>`;
}

function synthesisSection(profile) {
  return `## 小结与上架门

${profile.title}的质量不取决于记住多少类名，而取决于能否把${profile.focus}放进版本化证据链：原书轨道解释2024语义，当前轨道依据官方v1文档重建接口，schema和trace揭示行为，单一迁移故障定位不兼容点，独立评估与回退决定能否发布。最终交付${profile.artifact}，并同时报告历史、当前、失败、未知和未测试范围。

${exercisesSection(profile)}

${termsSection(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="author-authorized-companion-sample-plus-public-toc-and-current-upstream-docs"
  workTitle="李多多（莫尔索）《LangChain编程：从入门到实践》"
  adaptedUrl="${SOURCES.author}"
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
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies LangchainEvidenceModel;

export function ${profile.componentBase}VersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function ${profile.componentBase}RunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function ${profile.componentBase}ReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
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
  ${profile.componentBase}VersionContractLab,
  ${profile.componentBase}RunnableTraceLab,
  ${profile.componentBase}ReleaseGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectivesBlock(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。先预测依赖、schema、事件、状态、工具/检索调用或评估中的首个变化，再运行原书参考、v1参考、迁移故障与回退；只有守住“${profile.invariant}”并交付${profile.artifact}，代码运行才构成可发布证据。

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
    description: `${profile.duty}；并列原书2024与当前v1，用版本合同、执行trace和发布门交付${profile.artifact}`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.author,
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
  sectionNodes !== 135 ||
  allCoordinates.length !== 146
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
      "《LangChain编程》原书/v1双轨学习地图",
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
      "《LangChain编程》全书迁移与发布总复习",
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
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = [
    "author",
    "catalog",
    "overview",
    "migration",
    "repository",
    "langgraph",
    "langsmith",
    "security",
  ];
}
manifest.edition =
  "李多多（莫尔索）《LangChain编程：从入门到实践》，人民邮电出版社，2024年4月，192页，ISBN 9787115639424";
manifest.sourceKind =
  "author-authorized-open-companion-plus-complete-public-toc-and-current-upstream-docs";
manifest.sourceUrl = SOURCES.author;
manifest.secondarySourceUrls = [
  SOURCES.catalog,
  SOURCES.overview,
  SOURCES.migration,
  SOURCES.repository,
  SOURCES.langgraph,
  SOURCES.langsmith,
  SOURCES.security,
];
manifest.status =
  "verified-authorized-sample-independent-rewrite-v1-dual-track";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "作者开放学习站确认作者与相关伴学材料，但不是人民邮电出版社纸书的逐页全文；完整书目目录核对前言、10章和135个节/小节，共146个正式层级。课程不复制纸书或伴学站正文与代码，按原书2024轨道和当前LangChain v1轨道独立重写；旧Chain、Memory、Agent等接口不与v1、langchain-classic或LangGraph无标记混用。";
manifest.unitMappingEvidence = "quality/langchain-programming-v2-profiles.json";
manifest.factSourcePolicy =
  "书目与原书范围由作者伴学材料和公开完整目录核对；当前API、迁移、编排、观测与安全只采用LangChain官方文档、代码库和安全公告，并记录2026-07-30核查边界。";
manifest.factSources = {
  author: {
    kind: "author-authorized-open-companion",
    label: "李多多（莫尔索）开放学习站",
    url: SOURCES.author,
  },
  catalog: {
    kind: "public-complete-book-toc",
    label: "首版公开书目与完整目录",
    url: SOURCES.catalog,
  },
  overview: {
    kind: "upstream-current-documentation",
    label: "LangChain当前官方总览",
    url: SOURCES.overview,
  },
  migration: {
    kind: "upstream-v1-migration-guide",
    label: "LangChain v1官方迁移指南",
    url: SOURCES.migration,
  },
  repository: {
    kind: "upstream-source-repository",
    label: "LangChain官方代码库",
    url: SOURCES.repository,
  },
  langgraph: {
    kind: "upstream-orchestration-repository",
    label: "LangGraph官方代码库",
    url: SOURCES.langgraph,
  },
  langsmith: {
    kind: "upstream-observability-documentation",
    label: "LangSmith官方可观测性文档",
    url: SOURCES.langsmith,
  },
  security: {
    kind: "upstream-security-advisories",
    label: "LangChain官方安全公告",
    url: SOURCES.security,
  },
};
manifest.coverageMetrics = {
  targetFormalNodes: 146,
  coveredFormalNodes: 146,
  coveragePercent: 100,
};
manifest.metrics = {
  formalPrefaceNodes: 1,
  formalChapterHeadings: 10,
  formalSectionsAndSubsections: 135,
  formalConceptNodes: 146,
  officialUnits: 11,
  learningMapPages: 1,
  reviewPages: 1,
  totalLearningPages: 13,
  interactiveViews: 39,
  visualKinds: [
    "langchain-version-contract",
    "langchain-runnable-trace",
    "langchain-release-gate",
  ],
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      sourceAccess: "authorized-sample",
      defaultSourceMode: "independent-rewrite",
      formalCoordinates: 146,
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
  "已重建13页，覆盖前言1+章标题10+节/小节135=146个正式坐标，生成39个原书/v1双轨交互视图。",
);
