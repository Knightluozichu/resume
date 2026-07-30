import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "llm-app-dev-essentials";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/llm-app-dev-essentials/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/llm-app-dev-essentials-v2-profiles.json",
);

const SOURCES = {
  catalog:
    "https://oreilly.com.cn/index.php?func=book&isbn=978-7-115-63640-9",
  original:
    "https://www.oreilly.com/library/view/developing-apps-with/9781098152475/cover.html",
  transformer: "https://arxiv.org/abs/1706.03762",
  gpt4: "https://arxiv.org/abs/2303.08774",
  responses:
    "https://developers.openai.com/api/docs/guides/migrate-to-responses",
  functions:
    "https://developers.openai.com/api/docs/guides/function-calling",
  safety:
    "https://developers.openai.com/api/docs/guides/safety-best-practices",
  optimization:
    "https://developers.openai.com/api/docs/guides/model-optimization",
  embeddings: "https://developers.openai.com/api/docs/guides/embeddings",
  moderation:
    "https://developers.openai.com/api/docs/guides/moderation",
  data:
    "https://platform.openai.com/docs/models/default-usage-policies-by-endpoint",
  audio:
    "https://developers.openai.com/api/docs/guides/speech-to-text",
  images:
    "https://developers.openai.com/api/docs/guides/image-generation",
  langchain: "https://docs.langchain.com/oss/python/langchain/overview",
  openapi: "https://spec.openapis.org/oas/latest.html",
};

const PATHS = {
  learningMap: "00-map/lae-official-learning-map",
  "lae-preface": "01-preface/lae-preface",
  "lae-01": "02-essentials/lae-01-gpt4-chatgpt-essentials",
  "lae-02": "03-api/lae-02-api-deep-dive",
  "lae-03": "04-apps/lae-03-building-apps",
  "lae-04": "05-advanced/lae-04-advanced-techniques",
  "lae-05": "06-frameworks/lae-05-langchain-plugins",
  "lae-glossary": "07-glossary/lae-glossary",
  finalReview: "08-review/lae-official-final-review",
};

const PAGE_SPECS = {
  learningMap: {
    title: "《大模型应用开发极简入门》88条目学习地图",
    duty: "按前言、模型基础、API、应用、进阶、框架与术语表组织88个公开目录条目",
    question:
      "怎样保留2023年前后原书的学习次序，又让学习者识别当前接口、工具和治理要求的迁移边界？",
    invariant:
      "每个原书条目有唯一归属，历史复现与现代迁移使用不同证据，模型输出永远不直接等于应用事实或授权",
    fault: "用现行产品名称覆盖原书接口，导致历史代码、现代建议和应用责任无法区分",
    scenario:
      "团队接手一套基于旧版ChatCompletion与GPT-4插件的示例，要先复原第一版知识图，再规划到现行Responses与工具合同的迁移。",
    stages: ["锁定原书目录与时代", "建立请求和证据主链", "标注现代迁移与治理"],
    boundaries: ["用户任务", "应用编排", "模型请求", "工具执行", "验证与交付"],
    sources: [SOURCES.catalog, SOURCES.original, SOURCES.responses],
    artifact:
      "88条目映射、历史接口标签、现代迁移表、请求合同、工具授权、输出验证、风险记录和回退方案。",
    opening:
      "学习地图以第一版公开目录为分母，不用第二版的RAG、LlamaIndex或助手章节改写本书边界；当前资料只负责标出仍然成立的机制与需要迁移的接口。",
  },
  "lae-preface": {
    duty: "界定本书受众、五章主线、示例复现方式和版本差异记录",
    question:
      "怎样把一本快速变化领域的入门书变成可复现课程，而不是复制当年的模型名和SDK调用？",
    invariant:
      "每次练习记录原书坐标、接口时代、依赖版本、输入、预期、实际输出和人工判断",
    fault: "把一次成功响应当成稳定能力证明，且没有保存版本、输入或验收标准",
    scenario:
      "学习者从前言制定九页学习合同，所有示例只做离线状态模拟，不调用真实API，也不要求提交密钥。",
    stages: ["声明学习范围与版本", "设计可重放实验记录", "建立风险与迁移日志"],
    boundaries: ["学习目标", "版本快照", "实验输入", "输出评估", "迁移日志"],
    sources: [SOURCES.catalog, SOURCES.original, SOURCES.responses],
    artifact:
      "学习者画像、先备知识、章节地图、版本快照、实验记录模板、费用上限、风险清单和迁移日志。",
    opening:
      "前言页先建立证据纪律：目录告诉我们学什么，运行记录才说明某个接口和模型在何种条件下做了什么，二者不能互相替代。",
  },
  "lae-01": {
    duty: "解释语言模型、Transformer、标记化、预测、GPT演进、用例、幻觉与优化边界",
    question:
      "怎样从下一个标记预测理解模型能力，同时避免把流畅回答、产品案例或模型代际当成真实性证明？",
    invariant:
      "能力陈述连接版本化任务与评测，事实陈述连接外部证据，模型输出保留不确定性和人工复核",
    fault: "模型生成了流畅但无来源的事实，应用仍把它当作已验证结论展示",
    scenario:
      "产品团队评审教育与辅助场景，先用Transformer和标记预测解释生成机制，再为每个产品案例写出验证与拒答边界。",
    stages: ["复原模型机制与演进", "把案例转成任务合同", "为幻觉和优化设门"],
    boundaries: ["文本与标记", "Transformer计算", "候选输出", "事实核对", "产品决策"],
    sources: [SOURCES.transformer, SOURCES.gpt4, SOURCES.safety],
    artifact:
      "机制图、模型时代线、案例任务卡、评测样本、来源记录、幻觉反例、人工复核点和拒答策略。",
    opening:
      "模型基础页把“会生成”与“知道事实”拆开：Transformer与标记预测解释文本怎样形成，却不自动提供事实来源、业务授权或适用性保证。",
  },
  "lae-02": {
    duty: "贯通Playground、Python库、请求输入、响应输出、旧补全、函数、费用、安全及多模态API",
    question:
      "怎样把原书的ChatCompletion调用读懂并封装成可迁移请求合同，而不把旧参数或响应结构写成永久接口？",
    invariant:
      "密钥只在服务端，接口版本与模型快照可追溯，输入输出经模式校验，费用、数据和错误路径受限",
    fault: "前端暴露密钥并假定旧版choices结构永远存在，错误响应仍进入业务流程",
    scenario:
      "团队把书中的Hello World扩展为服务端适配器，同时保留旧ChatCompletion解析测试，并增加Responses迁移合同。",
    stages: ["封装身份与请求输入", "解析响应和工具调用", "核对费用数据与辅助API"],
    boundaries: ["客户端请求", "服务端适配器", "OpenAI接口", "结构解析", "业务响应"],
    sources: [
      SOURCES.responses,
      SOURCES.functions,
      SOURCES.data,
      SOURCES.embeddings,
      SOURCES.moderation,
      SOURCES.audio,
      SOURCES.images,
    ],
    artifact:
      "环境变量清单、接口适配器、请求模式、响应模式、错误分类、用量记录、数据保留决策和迁移测试。",
    opening:
      "API页采用双轨阅读：旧ChatCompletion与Completion只用于理解原书代码坐标，现行实现从Responses迁移指南和当前API文档重新核对。",
  },
  "lae-03": {
    duty: "以四个示例项目落实密钥、隐私、架构、输入输出检查和提示词注入防线",
    question:
      "怎样让新闻稿、视频摘要、游戏专家和语音控制共享安全应用骨架，却保留各自数据与授权边界？",
    invariant:
      "不可信内容不能改变系统策略，模型不能直接执行高影响动作，输出在交付前经过任务特定验证",
    fault: "视频字幕中的指令越过数据边界，诱导模型泄露上下文或触发未授权工具",
    scenario:
      "团队把四个示例做成同一后端的不同任务，逐项标注数据来源、提示边界、工具权限、人工确认与输出证据。",
    stages: ["划分数据和信任边界", "编排模型与最小权限工具", "验证输出并处理故障"],
    boundaries: ["外部内容", "提示组装", "模型建议", "授权工具", "用户确认"],
    sources: [SOURCES.safety, SOURCES.functions, SOURCES.data],
    artifact:
      "威胁模型、密钥边界、数据流、提示模板、工具白名单、注入样本、验证器、人工确认和审计日志。",
    opening:
      "应用页不把四个项目写成四段复制代码，而是抽取共同的信任边界；项目差异落在数据来源、允许动作和验收规则。",
  },
  "lae-04": {
    duty: "用提示设计、任务分解、少样本、评测与微调决策改进结果",
    question:
      "怎样先用评测证明提示改进，再判断微调是否值得，而不是依据几个顺眼样本调整系统？",
    invariant:
      "训练、开发和测试样本分离，提示与数据集有版本，成本、准确率和失败类型用同一评测口径比较",
    fault: "把测试样本泄漏进少样本提示或训练集，离线分数上升却不能代表新输入表现",
    scenario:
      "营销团队为邮件任务建立基线、提示变体和合成数据审查，再把原书微调流程与当前模型优化状态分开记录。",
    stages: ["建立代表性评测基线", "迭代提示与少样本", "评估数据和微调决策"],
    boundaries: ["任务与数据", "提示版本", "模型输出", "自动与人工评分", "优化决策"],
    sources: [SOURCES.optimization, SOURCES.safety],
    artifact:
      "任务定义、数据切分、提示版本、样本来源、评分器、基线报告、成本延迟、微调资格和停止条件。",
    opening:
      "进阶页把提示工程和微调放进同一优化闭环；当前官方资料强调先建评测，而原书的具体微调接口只作为历史流程坐标。",
  },
  "lae-05": {
    duty: "解释动态提示、智能体、工具、记忆、嵌入及旧插件的API、清单、OpenAPI和描述",
    question:
      "怎样把框架和旧插件拆回可审计合同，确保工具参数正确仍不意味着动作已获授权？",
    invariant:
      "框架不扩大权限，记忆有作用域与生命周期，工具调用经过模式校验、策略授权、执行和结果回传",
    fault: "模型生成结构正确的工具参数后，应用跳过身份、权限和幂等检查直接执行",
    scenario:
      "团队复原LangChain与GPT-4插件示例，再把动态提示、记忆、工具和OpenAPI描述映射到当前函数调用的五步循环。",
    stages: ["拆解框架状态与提示", "验证工具合同和授权", "记录执行结果与记忆"],
    boundaries: ["动态提示", "模型选择", "工具参数", "策略执行", "结果与记忆"],
    sources: [
      SOURCES.langchain,
      SOURCES.functions,
      SOURCES.openapi,
      SOURCES.embeddings,
    ],
    artifact:
      "提示版本、记忆作用域、工具模式、允许工具集、授权决策、幂等键、执行日志、结果回传和迁移对照。",
    opening:
      "框架页拒绝把LangChain或插件当作魔法层：所有状态、工具和描述最终都必须落到应用可验证、可授权、可撤销的合同。",
  },
  "lae-glossary": {
    duty: "把全书术语绑定到可观察输入、状态、输出、风险和验证动作",
    question:
      "怎样让术语表不仅解释名词，还能帮助学习者判断一段旧代码应复现、迁移还是拒绝？",
    invariant:
      "每个术语给出时代标签、操作定义、最小证据和常见混淆，不用产品名代替机制",
    fault: "同一个“插件”“记忆”或“函数”在历史和现代语境中指向不同合同却未标注",
    scenario:
      "维护者审阅全书术语，为原书专用名词加历史标签，为稳定机制加测试方法，为现行接口加核对日期。",
    stages: ["区分历史名称与稳定机制", "绑定操作证据和反例", "登记迁移与复核日期"],
    boundaries: ["术语名称", "时代语境", "操作定义", "验证样本", "迁移决定"],
    sources: [SOURCES.responses, SOURCES.functions, SOURCES.optimization],
    artifact:
      "术语卡、时代标签、操作定义、反例、验证方式、迁移目标、来源链接和最近复核日期。",
    opening:
      "术语表页把名词变成维护接口；如果一个术语不能说明如何观察、验证和拒绝，它就不足以指导快速变化的API课程。",
  },
  finalReview: {
    title: "《大模型应用开发极简入门》综合复核：从请求到授权交付",
    duty: "用一个端到端应用串联模型基础、API、架构、提示优化、框架工具和术语迁移",
    question:
      "怎样证明一个LLM应用既覆盖原书88个条目，又能在当前接口下守住数据、工具、质量和成本边界？",
    invariant:
      "目录覆盖、接口版本、数据流、提示、模型、工具授权、输出验证、评测和人工决策形成一条可追溯链",
    fault: "端到端演示只展示成功回答，没有注入攻击、模式错误、超支或人工拒绝路径",
    scenario:
      "综合任务实现一个资料摘要与受控工具建议器，保留旧接口兼容测试，默认走现代请求合同，并演练注入与越权故障。",
    stages: ["锁定任务数据与接口版本", "运行模型工具和验证链", "评测交付并演练回退"],
    boundaries: ["用户与资料", "应用合同", "模型与工具", "验证与评测", "人工交付"],
    sources: [
      SOURCES.responses,
      SOURCES.functions,
      SOURCES.safety,
      SOURCES.optimization,
    ],
    artifact:
      "88条目检查、版本清单、数据流、请求响应、工具授权、攻击样本、评测报告、费用记录、人工决定和回退演练。",
    opening:
      "综合复核只接受端到端证据：模型返回文本不是完成，必须证明应用在正常、注入、越权、结构错误和成本边界下都作出预注册决定。",
  },
};

const manifestDocument = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const previousManifest = manifestDocument.books[BOOK];
if (!previousManifest) throw new Error(`缺少 ${BOOK} fidelity manifest`);
const unitTitles = previousManifest.units.map((unit) => unit.title);

function toPascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function mechanismFor(concept) {
  const rules = [
    [
      /语言模型|NLP|Transformer|标记化|预测步骤/,
      ["把文本编码和条件预测连接起来", "标记序列、注意力结构和候选输出", "流畅度等同事实"],
    ],
    [
      /GPT-1|GPT-2|GPT-3|InstructGPT|GPT-3.5|Codex|ChatGPT|GPT-4|简史/,
      ["按时代记录能力、训练与接口差异", "发布日期、技术报告和版本标签", "代际名称当稳定接口"],
    ],
    [
      /Be My Eyes|摩根士丹利|可汗学院|多邻国|Yabble|Waymark|Inworld|用例|示例产品/,
      ["把产品案例还原成任务与责任合同", "用户、输入、输出、验证和风险", "宣传案例替代复现实验"],
    ],
    [
      /幻觉|限制|考虑/,
      ["把无依据输出转成可测试失败类型", "来源、反例和人工复核", "语气自信当真实性"],
    ],
    [
      /插件和微调|微调/,
      ["用评测判断提示、数据或训练优化", "基线、数据切分、成本和失败类型", "训练自动修复事实问题"],
    ],
    [
      /基本概念|可用模型|Playground|Python库|访问权限|API密钥|Hello World/,
      ["建立服务端身份和版本化请求合同", "密钥边界、模型快照和请求ID", "在客户端暴露密钥"],
    ],
    [
      /ChatCompletion|输入选项|输出格式|文本补全|Completion|从文本补全到函数/,
      ["解析历史请求响应并设计迁移适配器", "输入模式、输出模式、错误和迁移测试", "旧结构永久不变"],
    ],
    [
      /定价|标记限制|安全|隐私/,
      ["在调用前限制成本、数据和访问范围", "用量、保留策略、权限和预算", "成功响应绕过治理"],
    ],
    [
      /嵌入/,
      ["把内容映射为可比较向量表示", "模型版本、向量、距离和检索评测", "相似度等同事实相关性"],
    ],
    [
      /内容审核/,
      ["对输入输出执行安全分类并保留业务策略", "类别、分数、阈值和人工升级", "审核模型替代全部安全设计"],
    ],
    [
      /Whisper|语音控制/,
      ["把音频转写纳入数据与错误边界", "音频来源、转写、置信复核和授权", "转写文本天然可信"],
    ],
    [
      /DALL|图像/,
      ["把图像生成作为独立模态合同", "提示、尺寸、内容检查和资产记录", "文本接口参数直接套用"],
    ],
    [
      /应用程序开发概述|管理API密钥|数据安全|数据隐私|软件架构/,
      ["划分客户端、服务端、模型和存储职责", "数据流、秘密、接口和责任人", "模型SDK成为整体架构"],
    ],
    [
      /漏洞|分析输入和输出|提示词注入/,
      ["把外部内容视作数据而非高优先级指令", "攻击样本、工具白名单和输出验证", "提示文本单独消除注入"],
    ],
    [
      /新闻稿|YouTube|塞尔达|示例项目/,
      ["把示例拆成任务特定数据与验收", "样本、来源、评分和人工确认", "一个提示适配所有项目"],
    ],
    [
      /提示工程|有效的提示词|改善提示效果/,
      ["版本化任务、上下文、约束和输出模式", "提示版本、评测集和失败分类", "凭主观顺眼改提示"],
    ],
    [
      /逐步思考/,
      ["把任务分解为可验证中间产物", "子任务输出、检查点和最终答案", "要求暴露隐藏推理"],
    ],
    [
      /少样本学习/,
      ["用代表性示例约束任务行为", "样本来源、覆盖和未见测试集", "测试样本泄漏进提示"],
    ],
    [
      /合成数据|电子邮件营销|微调的成本|开始微调|使用OpenAI API进行微调|微调的应用/,
      ["在评测闭环中审查训练资格", "数据许可、切分、基线、成本和停止条件", "先训练后定义指标"],
    ],
    [
      /LangChain|动态提示词|智能体|工具|记忆/,
      ["把框架抽象还原为显式状态和调用合同", "提示、状态、工具模式、权限和轨迹", "框架默认值扩大权限"],
    ],
    [
      /GPT-4插件|插件清单|OpenAPI|描述|API$/,
      ["把旧插件描述映射为可验证工具合同", "模式、描述、允许集合、授权和结果回传", "参数正确等同动作获准"],
    ],
    [
      /前言|术语表|小结|总结|第\d章/,
      ["封闭本页范围、证据和迁移边界", "目录坐标、相邻章节和时代标签", "跨章主题任意拼接"],
    ],
  ];
  return (
    rules.find(([pattern]) => pattern.test(concept))?.[1] ?? [
      "把公开目录条目转成应用状态变化",
      "输入、接口、输出、验证和责任",
      "产品名称代替机制",
    ]
  );
}

function termFor(concept, index) {
  const short = concept
    .replace(/^\d+(?:\.\d+)*\s*/, "")
    .replace(/^第\s*\d+\s*章\s*/, "")
    .split(/[——：:]/, 1)[0]
    .trim();
  return short.length > 0 && short.length <= 16 ? short : `应用条目${index + 1}`;
}

function enrichProfile(key, specification, role, unit = null) {
  const chapterPath = PATHS[key];
  const concepts = unit
    ? unit.concepts.map((alternatives) => alternatives[0])
    : unitTitles;
  const title = specification.title ?? unit?.title;
  const normalTrace = [
    `为“${title}”锁定任务、数据分类、接口时代、模型或规则版本和验收标准`,
    `执行${specification.stages[0]}，保存请求输入、信任来源与预期结果`,
    `推进${specification.stages[1]}，记录模型建议、应用决定和工具调用`,
    `完成${specification.stages[2]}，交付${specification.artifact}`,
  ];
  const failureTrace = [
    `复用“${title}”相同的任务、样本、接口版本、模型设置和验收标准`,
    `只注入应用故障：${specification.fault}`,
    "沿用户输入到交付方向定位最早发生信任、结构、授权或验证偏离的位置",
    `依据“${specification.invariant}”拒绝结果并恢复已知安全状态`,
  ];
  const boundaryCards = specification.boundaries.map((name, index) => ({
    name,
    input: `“${title}”的${name}读取${index === 0 ? "已分类任务、数据和用户身份" : "上游已记录的结构化状态"}。`,
    trust: `${name}只信任声明的来源、版本和权限；外部文本与模型输出默认不是授权。`,
    action: `按${specification.stages[index % specification.stages.length]}处理${name}，不得把未验证内容提升为系统指令。`,
    evidence: `${name}输出请求ID、模式校验、策略决定、评测或人工确认之一，供下一边界复核。`,
  }));
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
    normalTrace,
    failureTrace,
    boundaryCards,
  };
}

const profiles = [
  enrichProfile("learningMap", PAGE_SPECS.learningMap, "learning-map"),
  ...previousManifest.units.map((unit) =>
    enrichProfile(unit.id, PAGE_SPECS[unit.id], "chapter", unit),
  ),
  enrichProfile("finalReview", PAGE_SPECS.finalReview, "final-review"),
];
if (profiles.length !== 9)
  throw new Error("《大模型应用开发极简入门》课程必须恰好为9页");

function objectivesBlock(profile) {
  return `<Objectives>

- 能说明“${profile.title}”如何${profile.duty}，并明确第一版历史复现与2026年现行迁移的边界
- 能先预测“${profile.question}”的正常路径，再沿输入、信任、模型、工具、验证和责任逐阶段核对
- 能注入“${profile.fault}”，用“${profile.invariant}”决定接受、人工升级或拒绝交付

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sources
    .map((url, index) => `[技术核对 ${index + 1}](${url})`)
    .join("、");
  return `## 为什么从这个应用任务开始

${profile.opening} “${profile.title}”使用的贯穿任务是：${profile.scenario} 操作前先预测哪个边界最先改变，看到输出后再补理由不算预测。

本页围绕“${profile.question}”建立正常、故障与恢复路径。只有“${profile.title}”保持“${profile.invariant}”并交付${profile.artifact}，模型或框架的运行结果才构成应用证据。

## 书目、88条目与时代双轨

“${profile.title}”以[O'Reilly北京中文书页](${SOURCES.catalog})核对Olivier Caelen、Marie-Alice Blete著，何文斯译，人民邮电出版社2024年2月版、145页、ISBN 9787115636409及完整中文目录；[O'Reilly英文第一版](${SOURCES.original})为“${profile.title}”提供五章结构的交叉核对。课程分母为前言、五章及术语表合计88个公开层级条目。

“${profile.title}”只能取得书目简介和公开目录，没有可授权逐段改写的完整正文；解释、架构、交互、练习与答案均为独立教学重写。第二版新增的RAG、LlamaIndex、助手等内容不倒填进第一版目录。

“${profile.title}”另以${links}核对当前技术事实。原书的ChatCompletion、Completion、GPT-4插件与当时微调流程保留为历史复现轨；Responses、现行函数工具、数据控制与模型优化状态属于2026年迁移轨。现代资料不能反向证明原书出版时的默认模型、参数、价格或数据政策。`;
}

const paragraphPatterns = [
  (profile, concept, mechanism, evidence, caution, index) =>
    `在“${profile.title}”的坐标${index + 1}中，${concept}用于${mechanism}；先声明输入与责任，再用${evidence}复核，出现${caution}时不得交付。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${concept}进入“${profile.title}”后要回答第${index + 1}张合同卡：它怎样${mechanism}、改变什么状态、由哪些${evidence}证明，并如何排除${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `围绕“${profile.question}”，条目${index + 1}把${concept}解释为${mechanism}；复核者先读取${evidence}再判断结果，不能接受${caution}。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `对“${profile.title}”而言，${concept}的最小合同是${mechanism}，第${index + 1}次检查保存${evidence}；若产生${caution}，就回到上游信任边界。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `第${index + 1}个公开条目${concept}服务于${profile.duty}，需要以${evidence}呈现${mechanism}；${caution}会破坏“${profile.invariant}”。`,
  (profile, concept, mechanism, evidence, caution) =>
    `学习者在“${profile.title}”中讨论${concept}前预测${mechanism}会改变哪项应用状态，再读取${evidence}；观察到${caution}时必须保留失败样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `${profile.scenario} 在条目${index + 1}处理${concept}时，要把${mechanism}写进应用合同，把${evidence}写进运行记录，并把${caution}写进攻击或迁移样本。`,
  (profile, concept, mechanism, evidence, caution, index) =>
    `“${profile.invariant}”限定了${concept}的适用域：坐标${index + 1}只能通过${mechanism}推进，由${evidence}复核，而${caution}构成拒绝条件。`,
];

function conceptsSection(profile) {
  return `## 公开目录条目与应用机制

${profile.concepts
  .map((concept, index) => {
    const [mechanism, evidence, caution] = mechanismFor(concept);
    const term = termFor(concept, index);
    const definition = `${term}对应目录条目“${concept}”，在“${profile.title}”中用于${mechanism}，并受时代、信任、授权与验证边界约束。`;
    const paragraph = paragraphPatterns[index % paragraphPatterns.length](
      profile,
      concept,
      mechanism,
      evidence,
      caution,
      index,
    );
    return `### ${concept}

<Term def=${JSON.stringify(definition)}>${term}</Term>

**公开坐标 ${index + 1}/${profile.concepts.length}。** ${paragraph}`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 先预测，再操作三个应用实验

<Callout type="info" title="先写出哪一个信任边界会先变化">
  对“${profile.title}”先选择版本化任务、预期结构与允许动作，再操作请求合同、执行轨迹和授权门；结果与预测不一致时应修改应用假设，不删除失败运行。
</Callout>

<Stepper>
  <Step title="1. 请求合同与信任边界">
    逐个选择“${profile.boundaries.join("、")}”，核对输入、信任、动作与证据怎样连接“${profile.title}”。

    <${profile.componentBase}RequestContractLab />
  </Step>
  <Step title="2. 正常与故障执行轨迹">
    保持“${profile.scenario}”不变，切换正常和故障模式，定位“${profile.fault}”最先破坏结构、授权或验证的位置。

    <${profile.componentBase}ExecutionTraceLab />
  </Step>
  <Step title="3. 授权门与证据包">
    分别切换输入分类、模式校验、动作授权与输出验证，展开${profile.artifact}后决定是否执行或交付。

    <${profile.componentBase}AuthorizationGateLab />
  </Step>
</Stepper>

<Callout type="trap" title="本页应用故障：${profile.fault}">
  “${profile.title}”遇到该故障时应保持任务、样本、接口与验收标准不变，沿输入到交付方向寻找最早偏离；用最终回答看似合理掩盖中间越权，不能证明“${profile.invariant}”。
</Callout>

<Callout type="trap" title="结构正确不等于动作获准">
  ${profile.scenario} 模型产生符合JSON模式的参数，只证明参数可以解析；“${profile.title}”仍需核对用户身份、允许工具、业务策略、幂等和人工确认。
</Callout>

<Callout type="trap" title="现代接口不能倒填原书">
  “${profile.title}”引用现行官方文档是为了核对迁移边界，不能把Responses、现行工具默认值或2026年的优化状态宣称成第一版原有内容。
</Callout>`;
}

function protocolSection(profile) {
  return `## ${profile.title}的可重放应用协议

| 阶段 | 应用动作 | 必留证据 | 拒绝条件 |
| --- | --- | --- | --- |
${profile.stages
  .map(
    (stage, index) =>
      `| ${stage} | ${profile.boundaryCards[index % profile.boundaryCards.length].action} | ${index === 0 ? "任务、数据分类、接口与模型版本" : index === 1 ? "请求ID、模式校验、工具与输出轨迹" : "评测、费用、人工决定与回退目标"} | ${index === 0 ? "输入或版本不可追溯" : index === 1 ? profile.fault : "无法复核或撤销结果"} |`,
  )
  .join("\n")}

\`\`\`yaml
unit: ${JSON.stringify(profile.id)}
question: ${JSON.stringify(profile.question)}
scenario: ${JSON.stringify(profile.scenario)}
boundaries: ${JSON.stringify(profile.boundaries)}
stages: ${JSON.stringify(profile.stages)}
invariant: ${JSON.stringify(profile.invariant)}
fault: ${JSON.stringify(profile.fault)}
evidence: ${JSON.stringify(profile.artifact)}
reset: restore_boundary_mode_step_gates_and_artifact
\`\`\`

该协议要求“${profile.title}”在相同任务、样本、接口版本、模型设置和验收标准下重放。重置后若边界、执行位置、授权门或证据显示没有回到基线，交互状态已经污染比较，不能作为应用证据。`;
}

function synthesisSection(profile) {
  const glossary = profile.concepts
    .map((concept, index) => {
      const [mechanism] = mechanismFor(concept);
      const term = termFor(concept, index);
      return `  <GlossaryItem term=${JSON.stringify(term)}>对应“${concept}”；在“${profile.title}”中用于${mechanism}，需要连接时代、输入、授权、输出与验证。</GlossaryItem>`;
    })
    .join("\n");
  const conceptList = profile.concepts
    .map((concept, index) => {
      const [mechanism, evidence] = mechanismFor(concept);
      return `${index + 1}. “${profile.title}”的${concept}：以“${mechanism}”解释应用作用，用“${evidence}”提供复核。`;
    })
    .join("\n");
  return `## 本页回顾

掌握“${profile.title}”不是记住模型名或SDK调用，而是能围绕“${profile.question}”重建应用状态，并用“${profile.invariant}”拒绝“${profile.fault}”。最终交付为${profile.artifact}

## 练习与答案

<Exercises>

1. **问题 1：请求合同。** “${profile.title}”为什么必须先声明任务、数据、接口时代与允许动作？

<Answer>
  ${profile.scenario} 若时代和信任边界不固定，旧接口、现行接口与外部内容会被混成同一事实；“${profile.title}”先声明这些条件，才能把概率输出连接到可验证对象，并防止结构正确掩盖越权。
</Answer>

2. **问题 2：目录逐项覆盖。** 怎样证明公开条目已经进入机制、交互和练习？

<Answer>
${conceptList}
</Answer>

3. **问题 3：故障恢复。** 怎样证明“${profile.fault}”已经被修正？

<Answer>
  为“${profile.title}”复用同一任务、样本、接口版本、模型设置和验收标准，重放正常路径后只注入“${profile.fault}”；记录最早偏离边界，撤销故障并再次运行。只有请求、模式、授权、输出验证和${profile.artifact}重新满足“${profile.invariant}”，修正才可交付。
</Answer>

</Exercises>

## 名词解释

<Glossary>
${glossary}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="outline-only"
  workTitle="Olivier Caelen、Marie-Alice Blete《大模型应用开发极简入门：基于GPT-4和ChatGPT》"
  adaptedUrl="${SOURCES.catalog}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    boundaryCards: profile.boundaryCards,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    gates: [
      {
        label: "输入分类",
        detail: `“${profile.title}”区分用户指令、外部数据、系统规则与秘密。`,
      },
      {
        label: "模式校验",
        detail: `“${profile.title}”的请求、工具参数与结果符合版本化结构。`,
      },
      {
        label: "动作授权",
        detail: `“${profile.title}”按用户身份、允许工具、业务策略和幂等要求决定执行。`,
      },
      {
        label: "输出验证",
        detail: `“${profile.title}”以来源、评测或人工确认复核结果，不把流畅度当证据。`,
      },
    ],
  };
  return `"use client";

import {
  LlmApplicationEvidenceLab,
  type LlmApplicationEvidenceModel,
} from "./llm-application-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies LlmApplicationEvidenceModel;

export function ${profile.componentBase}RequestContractLab() {
  return <LlmApplicationEvidenceLab model={model} view="request-contract" />;
}

export function ${profile.componentBase}ExecutionTraceLab() {
  return <LlmApplicationEvidenceLab model={model} view="execution-trace" />;
}

export function ${profile.componentBase}AuthorizationGateLab() {
  return <LlmApplicationEvidenceLab model={model} view="authorization-gate" />;
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
import { ${profile.componentBase}RequestContractLab, ${profile.componentBase}ExecutionTraceLab, ${profile.componentBase}AuthorizationGateLab } from "@/components/mdx/${BOOK}/v2/${slug}";

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
    description: `${profile.duty}；用请求合同、故障轨迹和授权门完成独立复核。`,
    demo: true,
    math: false,
    sourceUrl: SOURCES.catalog,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId)
    data.officialUnitId = profile.officialUnitId;
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

manifestDocument.books[BOOK] = {
  ...previousManifest,
  edition:
    "Olivier Caelen、Marie-Alice Blete著，何文斯译《大模型应用开发极简入门：基于GPT-4和ChatGPT》，人民邮电出版社，2024年2月，145页，ISBN 9787115636409",
  sourceKind:
    "official-chinese-complete-catalog-and-original-first-edition-cross-check-with-current-primary-api-sources",
  sourceUrl: SOURCES.catalog,
  secondarySourceUrls: [
    SOURCES.original,
    SOURCES.transformer,
    SOURCES.gpt4,
    SOURCES.responses,
    SOURCES.functions,
    SOURCES.safety,
    SOURCES.optimization,
    SOURCES.embeddings,
    SOURCES.moderation,
    SOURCES.data,
    SOURCES.audio,
    SOURCES.images,
    SOURCES.langchain,
    SOURCES.openapi,
  ],
  verifiedAt: "2026-07-30",
  disclosureNote:
    "O'Reilly北京中文书页确认作者、译者、人民邮电出版社、2024年2月、145页、ISBN 9787115636409和完整中文目录；O'Reilly英文第一版交叉核对五章结构。分母为前言、五章及术语表共88个公开层级条目，课程按7个正式单元完整覆盖，另设学习地图与综合复核，共9页。原书ChatCompletion、Completion、GPT-4插件及当时微调流程保留为历史复现轨；Responses、现行函数工具、数据控制与模型优化状态标为2026年迁移轨，第二版新增主题不倒填。内容均为独立教学重写。",
  units: previousManifest.units.map((unit) => ({
    ...unit,
    chapterPath: PATHS[unit.id],
  })),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/llm-app-dev-essentials-v2-profiles.json",
  factSourcePolicy:
    "书目与目录只限定第一版88条目；Transformer与GPT-4机制由论文核对，现行OpenAI接口、安全、数据、嵌入、审核、音频、图像与模型优化由官方文档核对，LangChain和OpenAPI分别由项目官方文档与规范核对。历史复现和现代迁移分轨标注，不倒填原书。",
};
const manifestOutput = `${JSON.stringify(manifestDocument, null, 2)}\n`;
if (fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestOutput)
  fs.writeFileSync(MANIFEST_PATH, manifestOutput);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      outlineSources: [SOURCES.catalog, SOURCES.original],
      technicalSources: [
        SOURCES.transformer,
        SOURCES.gpt4,
        SOURCES.responses,
        SOURCES.functions,
        SOURCES.safety,
        SOURCES.optimization,
        SOURCES.embeddings,
        SOURCES.moderation,
        SOURCES.data,
        SOURCES.audio,
        SOURCES.images,
        SOURCES.langchain,
        SOURCES.openapi,
      ],
      officialUnits: previousManifest.units.length,
      officialCatalogEntries: previousManifest.units.reduce(
        (sum, unit) => sum + unit.concepts.length,
        0,
      ),
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
        technicalSources: profile.sources,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);

console.log(
  `已重建 ${profiles.length} 页，覆盖 ${previousManifest.units.reduce((sum, unit) => sum + unit.concepts.length, 0)} 个公开目录条目，生成 ${profiles.length * 3} 个交互视图。`,
);
