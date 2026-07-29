import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "ai-agent-apps";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/ai-agent-apps-v2-profiles.json");

const PRIMARY =
  "https://www.anthropic.com/engineering/building-effective-agents";
const CONTEXT =
  "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents";
const TOOLS = "https://www.anthropic.com/engineering/writing-tools-for-agents";
const TOOL_USE =
  "https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works";
const MCP = "https://modelcontextprotocol.io/specification/2025-06-18/server";
const EVALS =
  "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents";

const PATHS = [
  "foundations/what-is-an-agent",
  "foundations/augmented-llm",
  "foundations/agentic-loop",
  "foundations/first-agent",
  "context-engineering/prompt-engineering",
  "context-engineering/context-window",
  "context-engineering/structured-output",
  "tool-use/function-calling",
  "tool-use/tool-design",
  "tool-use/mcp",
  "agentic-patterns/workflow-vs-agent",
  "agentic-patterns/chaining-and-routing",
  "agentic-patterns/parallelization-and-orchestrator-workers",
  "agentic-patterns/evaluator-optimizer",
  "agentic-patterns/autonomous-agents",
  "agentic-patterns/combining-patterns",
  "production/agents-in-practice",
  "production/tool-prompt-engineering",
  "production/production-readiness-checklist",
];

const DETAILS = {
  "foundations/what-is-an-agent": {
    source: PRIMARY,
    focus: "用控制权、环境反馈和停止条件区分模型调用、工作流与智能体",
    invariant: "每次自主决策都受工具权限、环境事实和显式停止条件约束",
    fault: "模型只凭自己的上一段文字继续推演，却把没有工具证据的结论标成完成",
    evidence: "任务合同、控制权归属、工具调用、环境结果、轮次预算与停止原因",
    stages: ["任务合同", "控制权选择", "工具行动", "环境反馈", "停止验收"],
    signals: ["控制权", "外部事实", "预算", "停止原因"],
    terms: [
      ["工作流", "由代码预先规定模型和工具调用路径的系统"],
      ["智能体", "由模型根据环境反馈动态决定下一步的系统"],
      ["环境反馈", "来自工具、执行器或用户的可观察事实"],
      ["自主性", "系统在既定权限内自行选择下一步的程度"],
      ["停止条件", "完成、阻塞、预算耗尽或人工接管的退出合同"],
    ],
    lessons: [
      [
        "控制流才是分界",
        "两种系统都能调用工具；区别在路径由代码预写还是由模型根据中间结果选择。",
        "把退款、翻译和未知故障分别放入三种实现，标出真正决定下一步的主体。",
      ],
      [
        "自主性是一段区间",
        "从单次调用、固定链到开放循环，自主性增加时成本、延迟和故障面也同步增加。",
        "固定任务集，逐档比较成功率、尾延迟、调用数和人工接管率。",
      ],
      [
        "外部事实推进循环",
        "计划和解释只能提出候选动作，工具结果与环境状态才有资格改变任务状态。",
        "让工具返回空结果，检查系统是否停止猜测并重新规划。",
      ],
      [
        "完成必须可判定",
        "最大轮数不是成功条件；系统还要区分 done、blocked、rejected 与 handoff。",
        "注入永远无结果的工具，确认系统不会把预算耗尽伪装成完成。",
      ],
    ],
    code: `type Status = "done" | "blocked" | "handoff";

async function runAgent(task: Task, tools: Tool[], maxSteps = 6) {
  const trace: Event[] = [];
  for (let step = 0; step < maxSteps; step += 1) {
    const decision = await decide(task, tools, trace);
    if (decision.kind === "final") return { status: "done" as Status, trace };
    trace.push(await executeAndObserve(decision, tools));
  }
  return { status: "blocked" as Status, reason: "step_budget", trace };
}`,
  },
  "foundations/augmented-llm": {
    source: PRIMARY,
    focus:
      "把检索、工具与记忆作为可替换能力接到模型外部，并验证每种增强是否真的改善任务",
    invariant: "进入上下文或执行链的增强结果必须有来源、版本、权限和失败语义",
    fault: "检索返回过期资料、记忆混入其他用户状态，模型仍把它们当作可信上下文",
    evidence:
      "查询、命中文档、工具 schema、记忆键、来源时间、权限判定与最终引用",
    stages: ["请求分类", "按需检索", "工具选择", "记忆读写", "证据回答"],
    signals: ["命中来源", "工具契约", "记忆隔离", "引用一致"],
    terms: [
      ["增强型 LLM", "接入检索、工具和记忆等外部能力的模型调用"],
      ["检索", "按查询从外部语料取回与任务相关证据"],
      ["工具", "让模型请求外部读取、计算或副作用的结构化接口"],
      ["工作记忆", "当前任务期间保留并可清理的状态"],
      ["长期记忆", "跨会话保存且必须有租户、权限和生命周期的状态"],
    ],
    lessons: [
      [
        "增强发生在模型外",
        "权重没有因一次检索或工具调用而改变；运行时只是把新证据送入下一次推理。",
        "固定模型版本，切断检索后比较可用信息而不是宣称模型被训练。",
      ],
      [
        "检索先验收再拼接",
        "相关性、时效、权限和去重共同决定文档能否进入上下文。",
        "混入一条高相似但过期文档，验证排序后的确定性过滤。",
      ],
      [
        "工具结果也是不可信输入",
        "网络响应、数据库字段和第三方文本都可能为空、超时或包含注入内容。",
        "让工具返回缺字段对象，确认校验失败时不进入回答。",
      ],
      [
        "记忆必须隔离和可撤销",
        "跨会话状态需要命名空间、过期策略和用户可见的删除路径。",
        "用两个租户写入同名键，验证读取结果不串线。",
      ],
    ],
    code: `async function augmentedCall(request: Request, actor: Actor) {
  const documents = await retrieve(request.query, { actor, limit: 5 });
  const memory = await loadMemory(actor.tenantId, request.sessionId);
  const context = validateContext({ documents, memory });
  const response = await model.generate({ request, context, tools: safeTools(actor) });
  return { response, provenance: context.sources };
}`,
  },
  "foundations/agentic-loop": {
    source: TOOL_USE,
    focus:
      "实现“决策—工具执行—结果回灌—重新决策”的循环，并正确处理所有停止原因",
    invariant:
      "每个 tool_use 都由运行时执行并以匹配调用标识的 tool_result 回到下一轮",
    fault: "运行时漏回一个工具结果或错配调用标识，下一轮却继续消费不完整历史",
    evidence:
      "消息序列、stop_reason、tool_use_id、参数、tool_result、错误标记与循环计数",
    stages: ["发送请求", "解析停止原因", "执行工具", "回灌结果", "继续或退出"],
    signals: ["停止原因", "调用标识", "结果配对", "循环计数"],
    terms: [
      ["agentic loop", "模型请求工具、运行时执行并把结果送回模型的循环"],
      ["tool_use", "模型产生的结构化工具调用请求块"],
      ["tool_result", "应用返回的工具执行结果块"],
      ["stop_reason", "说明本轮为何结束或暂停的协议字段"],
      ["调用标识", "配对请求与结果，防止并行工具响应串线的标识"],
    ],
    lessons: [
      [
        "模型不直接执行客户端工具",
        "模型只生成调用请求；数据库、文件和网络副作用发生在应用运行时。",
        "记录模型输出与执行器日志，确认两者边界清晰。",
      ],
      [
        "停止原因驱动状态机",
        "tool_use、end_turn、max_tokens、refusal 和 pause_turn 不能都按最终答案处理。",
        "逐个注入停止原因，断言状态机进入对应分支。",
      ],
      [
        "并行结果按标识配对",
        "返回顺序可能变化，数组位置不能替代 tool_use_id。",
        "反转两个工具的完成顺序，验证下一轮消息仍正确配对。",
      ],
      [
        "循环预算约束恢复",
        "重试需要次数、总时长、成本和副作用幂等边界。",
        "让同一工具连续超时，确认系统进入 blocked 而不是无限旋转。",
      ],
    ],
    code: `while (true) {
  const response = await callModel(messages, tools);
  messages.push(response.message);
  if (response.stopReason !== "tool_use") return finish(response, messages);
  const results = await Promise.all(response.toolUses.map(executeSafely));
  messages.push(asToolResultMessage(results));
}`,
  },
  "foundations/first-agent": {
    source: TOOL_USE,
    focus:
      "用一个只读工具、一个显式状态机和一个确定性验收器组装最小可运行智能体",
    invariant: "最小实现也必须分离模型决策、工具执行、权限检查和成功判定",
    fault:
      "把模型返回的工具名直接映射到任意函数，并允许未经校验的参数触发副作用",
    evidence: "工具白名单、输入校验、执行日志、结果消息、退出状态与验收断言",
    stages: ["注册工具", "模型选择", "校验参数", "受控执行", "验收退出"],
    signals: ["白名单", "参数校验", "执行日志", "退出状态"],
    terms: [
      ["工具注册表", "从公开工具名到受控执行函数的显式映射"],
      ["输入 schema", "限定参数字段、类型、枚举和必填项的合同"],
      ["分发器", "校验调用后选择并执行白名单工具的运行时代码"],
      ["执行结果", "包含成功值或结构化错误的工具回执"],
      ["验收器", "根据环境事实判断任务是否真正完成的确定性逻辑"],
    ],
    lessons: [
      [
        "先选无副作用切片",
        "首个 Agent 应使用天气、计算或查询等只读工具，先证明协议闭环。",
        "把工具替换为返回固定值的测试替身，验证消息序列。",
      ],
      [
        "schema 不是授权",
        "字段合法只说明形状正确，资源范围与操作者权限仍要单独判断。",
        "提交格式正确但越权的资源标识，确认执行器拒绝。",
      ],
      [
        "注册表阻断任意调用",
        "模型产生的名称永远不能直接进入 eval、反射或 shell。",
        "注入未注册工具名，断言零副作用并返回 structured error。",
      ],
      [
        "验收独立于模型措辞",
        "模型说“已经完成”不能替代数据库、文件或测试断言。",
        "让模型错误声称完成，确认验收器仍返回 blocked。",
      ],
    ],
    code: `const registry = { get_weather: getWeather } satisfies ToolRegistry;

async function dispatch(call: ToolCall, actor: Actor) {
  const tool = registry[call.name as keyof typeof registry];
  if (!tool) return { ok: false, error: "unknown_tool" };
  const args = tool.schema.parse(call.input);
  await authorize(actor, call.name, args);
  return { ok: true, value: await tool.run(args) };
}`,
  },
  "context-engineering/prompt-engineering": {
    source: CONTEXT,
    focus: "把系统指令、任务输入、示例和输出合同分层组织，并用失败样本驱动迭代",
    invariant:
      "提示中的优先级、数据边界和成功标准必须可读、可测试且不依赖隐藏共享背景",
    fault: "把用户数据拼进系统指令区，导致数据中的命令覆盖任务合同",
    evidence: "提示版本、分区内容、测试样本、原始响应、评分维度与回归差异",
    stages: ["任务合同", "指令分区", "精选示例", "输出约束", "评测迭代"],
    signals: ["版本", "边界", "样本", "回归"],
    terms: [
      ["系统指令", "定义角色、边界和长期行为的高优先级上下文"],
      ["任务合同", "本次输入、期望输出、限制条件和成功标准"],
      ["少样本示例", "用少量代表性输入输出展示期望行为"],
      ["输出合同", "规定结果结构、字段和不允许出现内容的约束"],
      ["提示评测", "在冻结数据集上衡量提示版本行为的过程"],
    ],
    lessons: [
      [
        "正确高度介于僵硬与含糊之间",
        "逐条硬编码所有路径会脆弱，只有口号又无法指导模型；应给清晰启发式和边界。",
        "让同一任务分别使用过细、过宽和适中指令，比较边界失败。",
      ],
      [
        "上下文分区表达信任边界",
        "背景、指令、工具说明和用户数据应有明确分隔，避免内容角色混淆。",
        "在用户数据中放置伪指令，验证它不会改变系统合同。",
      ],
      [
        "示例要少而有代表性",
        "堆满边角案例会挤压注意预算；应覆盖正常、边界与拒绝三类典型行为。",
        "删除冗余示例后重跑冻结集，比较正确率与 token 成本。",
      ],
      [
        "失败样本决定下一次改动",
        "不要凭单次漂亮回答继续加句子；每次改动应绑定一个已观测失败簇。",
        "保存版本 A/B 的逐样本评分，确认改善没有制造新回归。",
      ],
    ],
    code: `const prompt = [
  section("background", trustedBackground),
  section("instructions", taskContract),
  section("tool_guidance", toolRules),
  section("examples", canonicalExamples),
  section("user_data", untrustedInput),
].join("\\n\\n");

const result = await evaluatePrompt(prompt, frozenDataset);`,
  },
  "context-engineering/context-window": {
    source: CONTEXT,
    focus:
      "把上下文视为有限注意预算，用按需检索、压缩和结构化笔记保留高信号信息",
    invariant: "压缩或裁剪后必须保留任务目标、关键决定、未解决问题和可追溯引用",
    fault: "按最旧消息直接截断，连同尚未解决的约束和工具错误一起删除",
    evidence:
      "token 预算、消息分类、保留清单、压缩前后事实断言、引用与任务结果",
    stages: ["信息盘点", "按需检索", "重要性排序", "压缩裁剪", "回归验证"],
    signals: ["预算", "保留项", "引用", "事实召回"],
    terms: [
      ["上下文窗口", "一次推理时模型可接收的 token 集合"],
      ["注意预算", "上下文增长时仍能可靠利用信息的有限能力"],
      ["按需检索", "运行时只加载当前步骤需要的信息"],
      ["压缩", "把长轨迹提炼为保留关键事实的较短表示"],
      ["结构化笔记", "把目标、决定、证据和待办存为可持续更新的外部状态"],
    ],
    lessons: [
      [
        "更长不等于更可靠",
        "上下文增加会带来边际收益递减和注意分散，应优先提高信号密度。",
        "固定模型和任务，逐档增加无关材料，测量关键事实召回。",
      ],
      [
        "按需加载优于一次塞满",
        "文件路径、查询和资源标识可作为轻量索引，真正内容在需要时获取。",
        "比较预加载全库与逐步检索的 token、延迟和答案证据。",
      ],
      [
        "压缩先追求召回",
        "初版摘要应保留全部关键决定，再逐步去除冗余，不能一开始激进删减。",
        "对压缩前后的事实清单做确定性断言。",
      ],
      [
        "工具结果可以清理但要留结论",
        "深层历史中的大段原始输出可移出窗口，同时保留来源、摘要和复取方式。",
        "清掉旧结果后让智能体重放，确认能按引用重新取得证据。",
      ],
    ],
    code: `function compact(trace: Event[], budget: number) {
  const mustKeep = trace.filter(isGoalDecisionOrOpenIssue);
  const recent = trace.slice(-6);
  const summary = summarizeWithCitations(trace.slice(0, -6));
  const next = dedupe([...mustKeep, summary, ...recent]);
  assertFactsPreserved(trace, next);
  return fitTokenBudget(next, budget);
}`,
  },
  "context-engineering/structured-output": {
    source: TOOL_USE,
    focus: "让模型结果经过语法、schema 和业务三层校验后才进入程序控制流",
    invariant: "只有完全验证的对象可以触发工具、数据库写入或后续自动化",
    fault:
      "从自由文本中正则截取 JSON 后直接执行，忽略缺字段、额外字段和业务边界",
    evidence:
      "schema 版本、原始响应、解析错误、字段错误、业务错误、修复次数与下游调用数",
    stages: ["生成请求", "语法解析", "schema 校验", "业务校验", "受控消费"],
    signals: ["原始响应", "schema", "业务规则", "下游调用"],
    terms: [
      ["结构化输出", "按机器可验证合同生成的结果"],
      ["JSON Schema", "描述对象字段、类型和约束的声明式规范"],
      ["语法校验", "确认文本能否被 JSON 解析器接受"],
      ["业务校验", "检查跨字段、权限和真实资源等领域规则"],
      ["修复预算", "允许纠错请求消耗的次数、时间和 token 上限"],
    ],
    lessons: [
      [
        "合法 JSON 仍可能不合 schema",
        "解析成功不代表字段齐全、类型正确或没有多余属性。",
        "分别输入截断、缺字段和额外字段样本，保存每层错误。",
      ],
      [
        "schema 正确仍可能业务非法",
        "结束时间早于开始时间、金额越权等规则需要确定性业务代码。",
        "构造格式正确但越权的对象，确认业务层拒绝。",
      ],
      [
        "修复必须有限且留原文",
        "自动纠错可能掩盖模型回归；每轮都要保留原始响应与错误。",
        "连续返回两次坏对象，验证达到预算后结构化失败。",
      ],
      [
        "失败对象零副作用",
        "不能先执行部分字段再补校验，否则会留下不可回滚状态。",
        "监听工具注册表，确认所有失败样本的调用数为零。",
      ],
    ],
    code: `function decode(raw: string, schema: Schema) {
  const parsed = JSON.parse(stripFence(raw));
  const value = schema.parse(parsed);
  validateBusinessRules(value);
  return value;
}

const value = decode(rawResponse, requestSchema);
await dispatchOnlyValidated(value);`,
  },
  "tool-use/function-calling": {
    source: TOOL_USE,
    focus: "把工具调用实现为模型选接口、应用执行、结果回灌的显式协议",
    invariant: "模型只提出结构化调用，真正执行和授权始终属于应用运行时",
    fault: "把 tool_use 当成已经执行的事实，未运行工具就据此生成成功答复",
    evidence:
      "工具列表、选择原因、调用块、参数校验、执行日志、结果块与 stop_reason",
    stages: ["暴露工具", "模型选择", "解析调用", "应用执行", "结果回灌"],
    signals: ["工具菜单", "调用块", "执行日志", "结果块"],
    terms: [
      ["function calling", "模型输出结构化函数请求、应用负责执行的集成模式"],
      ["工具描述", "帮助模型判断何时使用某个工具的自然语言合同"],
      ["input_schema", "限定调用参数形状的 JSON Schema"],
      ["tool_choice", "控制模型是否自动、强制或禁用工具选择的策略"],
      ["tool_result", "应用执行后送回模型的结构化结果"],
    ],
    lessons: [
      [
        "协议两侧职责不同",
        "模型能看到名称、描述和 schema，看不到你的函数实现，也不会自动运行客户端代码。",
        "把执行器替换为记录器，确认模型输出本身没有副作用。",
      ],
      [
        "工具描述影响选择",
        "名称相近或边界重叠会增加误选；描述要说明使用条件与禁用条件。",
        "用相邻意图数据集测混淆矩阵，而不是只看一个成功例。",
      ],
      [
        "并行调用仍要逐个验收",
        "同一轮可有多个 tool_use，每个结果必须按标识配对并分别处理错误。",
        "随机改变完成顺序，验证响应不会串线。",
      ],
      [
        "所有停止原因都要处理",
        "end_turn、max_tokens、refusal 与 pause_turn 不是同一种完成状态。",
        "为每个停止原因写状态机测试。",
      ],
    ],
    code: `const response = await client.messages.create({ messages, tools });
if (response.stop_reason === "tool_use") {
  const calls = response.content.filter(isToolUse);
  const results = await Promise.all(calls.map(validateAuthorizeAndRun));
  messages.push(response, toToolResultMessage(results));
} else {
  return classifyStop(response.stop_reason);
}`,
  },
  "tool-use/tool-design": {
    source: TOOLS,
    focus: "把工具设计成模型容易选、难以误用、结果紧凑且错误可恢复的操作界面",
    invariant:
      "工具名称、边界、参数和返回语义共同指向一个清晰动作，危险操作默认不可达",
    fault: "提供多个功能重叠的万能工具，参数含糊，错误只返回 internal error",
    evidence:
      "工具选择混淆矩阵、参数错误率、恢复率、token 成本、权限拒绝与任务成功率",
    stages: ["任务轨迹", "边界切分", "参数防错", "结果压缩", "评测迭代"],
    signals: ["误选率", "参数错误", "恢复率", "任务成功"],
    terms: [
      ["ACI", "面向智能体设计的计算机操作界面"],
      ["工具边界", "一个工具负责和明确不负责的动作范围"],
      ["poka-yoke", "通过接口结构让常见错误更难发生的防错设计"],
      ["结构化错误", "包含错误类型、可否重试和恢复提示的结果"],
      ["工具评测", "在代表轨迹上测量选择、参数、结果理解和恢复的过程"],
    ],
    lessons: [
      [
        "工具定义本身就是提示",
        "模型依据名称、描述、参数和示例选择工具，它们需要与系统提示同等评测。",
        "只改工具描述，在冻结任务集上比较选择混淆矩阵。",
      ],
      [
        "贴近模型自然表达",
        "要求复杂转义、手工行号或冗长 diff header 会制造格式错误。",
        "比较整段重写与复杂补丁接口的首轮成功率。",
      ],
      [
        "参数结构承担防错",
        "绝对路径、枚举、互斥字段和资源标识可把错误挡在执行前。",
        "提交相对路径或冲突参数，确认 schema 直接拒绝。",
      ],
      [
        "结果只返回决策所需信息",
        "原样倾倒大对象浪费上下文；应给摘要、稳定标识和按需深入入口。",
        "比较原始响应与紧凑结果的 token 和下一步正确率。",
      ],
    ],
    code: `const readFileTool = defineTool({
  name: "read_file",
  description: "读取工作区内一个绝对路径；目录请改用 list_directory",
  schema: z.object({ absolutePath: workspacePath }),
  run: async ({ absolutePath }) => ({
    content: await readLimited(absolutePath),
    truncated: false,
  }),
});`,
  },
  "tool-use/mcp": {
    source: MCP,
    focus: "按 MCP 的 host、client、server 与三类原语边界集成外部上下文和动作",
    invariant: "协商后的能力、原语控制权和用户确认策略必须在每次调用中保持一致",
    fault:
      "客户端把 server 暴露的模型控制工具当作自动可信操作，绕过用户确认直接写外部系统",
    evidence:
      "协议版本、能力协商、tools/list、调用请求、用户确认、结果与权限日志",
    stages: ["连接初始化", "能力协商", "发现原语", "用户确认", "调用与结果"],
    signals: ["协议版本", "能力", "确认", "调用结果"],
    terms: [
      ["Host", "承载模型体验、权限和多个 MCP client 的应用"],
      ["Client", "与一个 MCP server 维持协议连接的组件"],
      ["Server", "通过协议暴露 prompts、resources 或 tools 的服务"],
      ["Resources", "由应用控制并提供给模型的结构化上下文"],
      ["Tools", "由模型发现和请求调用的可执行函数"],
    ],
    lessons: [
      [
        "MCP 标准化连接而非信任",
        "协议统一发现和调用方式，但不会自动证明 server、工具或结果安全。",
        "接入同名恶意 server，确认 Host 仍执行来源和权限校验。",
      ],
      [
        "三类原语控制权不同",
        "prompts 由用户选择，resources 由应用管理，tools 可由模型请求。",
        "为三类原语分别写 UI 与授权测试。",
      ],
      [
        "初始化先协商能力",
        "客户端不能假设所有 server 都支持工具、订阅或列表变更通知。",
        "移除 tools capability，验证客户端隐藏相关操作。",
      ],
      [
        "工具调用需要可见确认",
        "高风险操作应展示工具、参数和影响范围，允许用户拒绝。",
        "对写文件和发消息样本检查确认与取消路径。",
      ],
    ],
    code: `const session = await connect(serverUrl);
const initialized = await session.initialize({
  protocolVersion: "2025-06-18",
  capabilities: clientCapabilities,
});
if (!initialized.capabilities.tools) return { tools: [] };
const tools = await session.listTools();
return tools.filter((tool) => policy.allowsDiscovery(tool));`,
  },
  "agentic-patterns/workflow-vs-agent": {
    source: PRIMARY,
    focus: "按路径可预知性、反馈需求和风险预算选择单次调用、工作流或智能体",
    invariant: "新增自主性必须在冻结评测集上证明收益大于延迟、成本和风险增量",
    fault: "因为任务有多个步骤就直接选择自治 Agent，忽略步骤其实完全可预写",
    evidence:
      "任务分类、简单基线、成功率、调用数、尾延迟、成本、故障率与接管率",
    stages: ["任务分类", "简单基线", "工作流候选", "Agent 候选", "指标决策"],
    signals: ["可预知性", "基线", "收益", "风险"],
    terms: [
      ["单次调用", "一次模型请求即可完成且不需要中间环境反馈的方案"],
      ["工作流", "由代码预先安排步骤与分支的多步系统"],
      ["智能体", "由模型根据中间结果动态选择后续路径的系统"],
      ["复杂度门槛", "允许增加架构层次前必须满足的量化收益条件"],
      ["人工接管率", "任务需要转由人完成或判断的比例"],
    ],
    lessons: [
      [
        "步数不是分界",
        "十步固定流程仍是工作流，两步若第二步取决于未知环境反馈也可能需要 Agent。",
        "给任务画出决策点，标记哪些能在执行前确定。",
      ],
      [
        "先建立最简单基线",
        "没有单次调用或固定工作流基线，就无法证明自治循环值得。",
        "在同一数据集上保存各方案的完整指标。",
      ],
      [
        "工作流换来可预测性",
        "路径明确时，显式代码更容易测试、限权和估算成本。",
        "对退款审批写固定状态机并注入边界输入。",
      ],
      [
        "Agent 换来适应性",
        "步骤不可预知且环境能提供清晰反馈时，模型动态规划才可能有价值。",
        "用未知代码故障任务比较固定脚本与反馈循环。",
      ],
    ],
    code: `function chooseArchitecture(task: Task, baseline: Metrics) {
  if (!task.needsExternalFeedback) return "single_call";
  if (task.pathCanBeEnumerated) return "workflow";
  if (!baseline.agentGainExceedsRiskBudget) return "workflow";
  return "agent";
}`,
  },
  "agentic-patterns/chaining-and-routing": {
    source: PRIMARY,
    focus:
      "用提示链分解固定阶段，用路由把不同输入送入专用处理器，并为中间节点设置门禁",
    invariant: "链中每步都有输入输出合同，路由中的每类都有兜底和可测混淆边界",
    fault: "路由置信度不足时仍强行进入高风险专用分支，导致错误动作",
    evidence:
      "阶段输入输出、门禁结果、路由标签、置信度、混淆矩阵、兜底与最终指标",
    stages: ["入口校验", "链式分解", "分类路由", "专用处理", "结果门禁"],
    signals: ["中间合同", "路由标签", "置信度", "兜底"],
    terms: [
      ["提示链", "让多个模型调用按固定顺序消费前一步输出的工作流"],
      ["门禁", "在中间结果不合格时阻断或回退的确定性检查"],
      ["路由", "先分类输入，再选择专用提示、模型或工具的工作流"],
      ["混淆矩阵", "统计真实类别与预测类别组合的评测表"],
      ["兜底分支", "类别未知或置信不足时采取的安全处理路径"],
    ],
    lessons: [
      [
        "链式让每步更简单",
        "把提纲、检查、成稿分开可提高可测性，但会增加往返延迟。",
        "保存每步输出并定位首次不合格节点。",
      ],
      [
        "门禁阻断错误放大",
        "前一步输出不合格时继续执行，只会让后续模型把错误包装得更完整。",
        "在提纲缺字段时确认成稿阶段不运行。",
      ],
      [
        "路由需要清晰类别",
        "类别重叠或分类不可测时，专用分支反而会增加错误。",
        "用边界样本构建混淆矩阵并设置拒绝阈值。",
      ],
      [
        "链与路由可以组合",
        "先路由再走各自固定链，仍然是可预测工作流而非自治 Agent。",
        "画出控制流并确认所有分支在运行前可枚举。",
      ],
    ],
    code: `async function handle(input: Input) {
  const route = await classify(input);
  if (route.confidence < 0.82) return safeFallback(input);
  const outline = await handlers[route.label].outline(input);
  assertOutline(outline);
  return handlers[route.label].complete(outline);
}`,
  },
  "agentic-patterns/parallelization-and-orchestrator-workers": {
    source: PRIMARY,
    focus: "区分预先可分的并行任务与由编排者动态拆解的工作者任务",
    invariant:
      "子任务边界、共享状态、合并规则和失败策略必须在执行前或规划后显式落盘",
    fault: "多个工作者同时写同一资源，合并器只保留最后完成者的结果",
    evidence:
      "任务图、依赖边、工作者输入输出、完成顺序、冲突、合并决策、耗时与成本",
    stages: ["依赖分析", "任务拆分", "并发执行", "结果合并", "冲突验收"],
    signals: ["依赖图", "完成顺序", "冲突", "合并结果"],
    terms: [
      ["sectioning", "把预先已知且相互独立的子任务并行执行"],
      ["voting", "对同一任务运行多个候选并按规则聚合"],
      ["orchestrator", "根据具体输入动态拆分任务并综合结果的模型"],
      ["worker", "执行一个明确子任务并返回结构化结果的模型或进程"],
      ["合并器", "按依赖、冲突和质量规则整合多个结果的确定性组件"],
    ],
    lessons: [
      [
        "并行的前提是独立",
        "有写依赖或共享可变状态的任务不能只因技术上可并发就同时运行。",
        "为子任务建立读写集合，检测冲突后再调度。",
      ],
      [
        "投票需要聚合合同",
        "多跑几次不自动提高可靠性；阈值、偏差和弃权必须预先定义。",
        "改变票数与阈值，观察假阳性和假阴性。",
      ],
      [
        "编排者动态决定子任务",
        "与固定并行的关键差别是拆分结果依赖具体输入。",
        "给两个规模不同的代码任务，比较生成的工作者计划。",
      ],
      [
        "合并不是拼接",
        "重复、矛盾、依赖顺序和质量门禁都要由合并器处理。",
        "注入两个互斥补丁，确认系统阻断而不是 last-write-wins。",
      ],
    ],
    code: `const plan = await orchestrator.decompose(task);
assertAcyclic(plan.dependencies);
const results = await scheduler.run(plan, {
  maxConcurrency: 4,
  isolateWrites: true,
});
const merged = mergeWithConflicts(results);
return verifyMergedResult(merged, task.acceptance);`,
  },
  "agentic-patterns/evaluator-optimizer": {
    source: PRIMARY,
    focus: "在评价标准清晰且反馈能带来可测改进时运行生成—评价—修订循环",
    invariant:
      "评价器必须依据冻结 rubric 给出可执行反馈，并由预算和达标条件终止循环",
    fault: "评价器每轮改变标准，优化器只追逐措辞而质量指标没有提升",
    evidence: "rubric 版本、初稿、逐项评分、反馈、修订差异、轮次成本与停止原因",
    stages: [
      "生成初稿",
      "按 rubric 评分",
      "定位差距",
      "定向修订",
      "达标或停止",
    ],
    signals: ["rubric", "评分", "修订差异", "停止原因"],
    terms: [
      ["evaluator", "按明确标准审查候选并给出反馈的模型或程序"],
      ["optimizer", "根据反馈定向修订候选的模型调用"],
      ["rubric", "列出评价维度、等级和通过阈值的固定标准"],
      ["改进增量", "相邻两轮在冻结指标上的质量变化"],
      ["停止规则", "达标、无改进、轮次或预算耗尽时退出的条件"],
    ],
    lessons: [
      [
        "适配信号有两个",
        "人能清楚给反馈，且候选根据反馈确实可改进，二者缺一都不适合循环。",
        "先用少量样本验证人工反馈能否带来稳定增益。",
      ],
      [
        "评价标准必须冻结",
        "每轮改 rubric 会让分数不可比较，也可能让系统无限追逐新要求。",
        "保存 rubric 哈希并拒绝循环内静默变更。",
      ],
      [
        "反馈要可执行",
        "“不够好”无法指导修订；应定位维度、证据和期望变化。",
        "比较泛化反馈与逐项反馈的下一轮增量。",
      ],
      [
        "无改进就停止",
        "重复改写不是优化；连续低增益时应保留最佳版本并退出。",
        "注入两轮同分结果，确认系统触发 plateau。",
      ],
    ],
    code: `let best = await generate(task);
for (let round = 0; round < 3; round += 1) {
  const review = await evaluate(best, frozenRubric);
  if (review.score >= 0.9) return { best, reason: "threshold" };
  const next = await revise(best, review.actionableFeedback);
  if ((await score(next)) <= (await score(best))) break;
  best = next;
}
return { best, reason: "plateau_or_budget" };`,
  },
  "agentic-patterns/autonomous-agents": {
    source: PRIMARY,
    focus:
      "让模型在开放问题中依据真实环境反馈自主推进，同时保留沙箱、预算和人工检查点",
    invariant:
      "每轮行动都在最小权限内执行，可观察、可停止，并能把真实结果送回下一轮",
    fault: "Agent 在生产权限下反复尝试不可逆操作，错误随轮次累积且无人能暂停",
    evidence:
      "计划、工具参数、权限、环境结果、检查点、成本、首错位置、恢复与最终状态",
    stages: ["澄清目标", "制定计划", "受控行动", "吸收反馈", "检查点与退出"],
    signals: ["目标", "权限", "环境结果", "检查点"],
    terms: [
      ["自治 Agent", "模型在多轮环境反馈中动态决定过程和工具使用的系统"],
      ["沙箱", "限制代码、文件、网络和系统调用影响范围的环境"],
      ["检查点", "暂停自动推进并允许人审查、批准或纠偏的位置"],
      ["误差累积", "早期错误经后续决策放大为更大偏离的现象"],
      ["恢复策略", "遇到工具错误、阻塞或低置信时的重试、回退和接管规则"],
    ],
    lessons: [
      [
        "开放路径才值得自治",
        "若步骤可预写，工作流通常更便宜、更稳定；Agent 适合步骤数量和内容难以预测的任务。",
        "对同一任务先尝试固定方案，记录其失败边界。",
      ],
      [
        "环境反馈是 ground truth",
        "模型自评不能证明代码、订单或数据库已改变，必须读取真实环境。",
        "让执行器拒绝一次动作，确认下一轮能看到并处理拒绝。",
      ],
      [
        "沙箱阻止错误扩散",
        "广泛权限与多轮尝试组合会放大风险，应限制路径、网络、资源和动作类型。",
        "尝试越界写入，确认在工具边界阻断。",
      ],
      [
        "检查点处理不可逆动作",
        "付款、发送、删除与发布应在预览后等待明确授权。",
        "验证批准前后副作用计数分别为零和一。",
      ],
    ],
    code: `for (let step = 0; step < budget.maxSteps; step += 1) {
  const action = await planNext(goal, trace);
  const preview = await sandbox.preview(action);
  if (preview.irreversible) await requireHumanApproval(preview);
  const observation = await sandbox.execute(action);
  trace.push({ action, observation });
  if (acceptance.isSatisfied(observation, trace)) return done(trace);
}
return blocked("budget", trace);`,
  },
  "agentic-patterns/combining-patterns": {
    source: PRIMARY,
    focus:
      "按可测需求组合检索、路由、链式、并行、评价和自治环节，并保留透明回退路径",
    invariant: "每增加一个模式都对应独立失败假设、指标收益和可撤销边界",
    fault:
      "把所有模式堆进 mega-agent，无法定位质量提升来自哪一层，也无法单独回退",
    evidence: "架构版本、逐层消融指标、阶段轨迹、错误归属、成本增量与回退结果",
    stages: ["简单基线", "识别瓶颈", "增加一层", "消融评测", "保留或回退"],
    signals: ["基线", "增量", "归因", "回退"],
    terms: [
      ["模式组合", "把多个简单构件按任务需要连接成透明系统"],
      ["消融实验", "移除一个构件并观察指标变化以判断其真实贡献"],
      ["复杂度预算", "系统允许承担的额外调用、延迟、成本和维护负担"],
      ["回退路径", "新层失效或收益不足时恢复较简单方案的机制"],
      ["可归因性", "能够把结果变化定位到具体架构层或输入差异的性质"],
    ],
    lessons: [
      [
        "模式是积木不是处方",
        "文章列出的模式不是成熟度阶梯，也不要求全部使用。",
        "从单次调用开始，只针对首个失败簇选一个构件。",
      ],
      [
        "一次只增加一个主要变量",
        "同时加入路由、并行和评价会让收益不可归因。",
        "按版本逐层评测并保存差异。",
      ],
      [
        "组合边界需要显式合同",
        "路由输出、链式中间物和工作者结果都应可独立校验。",
        "让某一层输出缺字段，确认错误在边界处停止。",
      ],
      [
        "回退比升级更重要",
        "新模式在真实分布下退化时，系统要能恢复已知可用基线。",
        "关闭新增层，用相同输入验证回退结果与历史基线一致。",
      ],
    ],
    code: `let system = singleCallBaseline;
for (const candidate of proposedLayers) {
  const next = compose(system, candidate);
  const delta = await evaluateDelta(system, next, frozenSuite);
  if (delta.quality > 0 && delta.cost <= budget) system = next;
  else recordRejectedLayer(candidate, delta);
}
return system;`,
  },
  "production/agents-in-practice": {
    source: PRIMARY,
    focus:
      "用客服与编码场景验证 Agent 适配条件：对话加行动、清晰成功标准、反馈循环和人工监督",
    invariant:
      "场景必须同时提供可执行工具、可验证结果和可接管边界，不能只展示流畅对话",
    fault:
      "客服 Agent 在缺少订单事实与退款权限时仍承诺已退款，编码 Agent 在测试失败时仍提交结果",
    evidence:
      "任务类型、工具调用、环境状态、成功断言、用户确认、测试结果、接管与副作用",
    stages: ["识别场景", "取得事实", "执行动作", "验证结果", "人工审查"],
    signals: ["外部事实", "动作", "成功断言", "人工审查"],
    terms: [
      ["解决率", "任务达到用户定义成功状态的比例"],
      ["反馈循环", "执行结果进入下一轮决策并推动修正的机制"],
      ["环境断言", "由数据库、测试或外部系统证明结果的确定性检查"],
      ["人工监督", "人在关键检查点审查、批准或接管任务"],
      ["副作用", "退款、写文件、提交代码等改变外部状态的动作"],
    ],
    lessons: [
      [
        "客服同时需要对话和行动",
        "理解诉求只是开始，查询订单、退款或更新工单才构成解决。",
        "把只回答与实际执行两种系统放在同一解决率口径下比较。",
      ],
      [
        "编码拥有强反馈",
        "编译、测试、静态检查和 diff 为 Agent 提供可重复环境事实。",
        "注入失败测试，确认系统继续定位而不是宣告完成。",
      ],
      [
        "清晰成功标准降低漂移",
        "“让用户满意”难以验收，订单状态或测试通过更适合闭环。",
        "把模糊目标改写为可查询状态并运行断言。",
      ],
      [
        "自动测试不能替代人工审查",
        "功能通过仍可能违反架构、安全或产品意图。",
        "在通过测试的补丁中注入越权变更，确认 review 门禁拦截。",
      ],
    ],
    code: `async function resolve(caseFile: CaseFile) {
  const facts = await loadAuthorizedFacts(caseFile);
  const action = await proposeAction(caseFile, facts);
  const approved = action.risk === "high" ? await humanReview(action) : true;
  if (!approved) return handoff(caseFile);
  const result = await execute(action);
  return assertEnvironmentState(result.expectedState);
}`,
  },
  "production/tool-prompt-engineering": {
    source: TOOLS,
    focus: "把工具定义当作可评测提示，迭代名称、描述、参数、返回与错误恢复",
    invariant: "工具改动必须在代表轨迹上同时验证选对、填对、读懂和恢复四个环节",
    fault: "只看工具函数单元测试通过，却从不测模型是否会选择和正确填写它",
    evidence:
      "工具定义版本、任务集、选择率、参数通过率、结果理解率、恢复率与失败轨迹",
    stages: ["收集轨迹", "定位误用", "改写接口", "批量评测", "发布或回退"],
    signals: ["选择率", "参数通过", "结果理解", "恢复率"],
    terms: [
      ["工具提示工程", "通过迭代工具定义改善模型使用行为的过程"],
      ["选择精度", "需要该工具的任务中模型正确选择它的比例"],
      ["参数通过率", "模型生成参数一次通过 schema 与业务校验的比例"],
      ["结果理解率", "模型能否依据工具返回做出正确下一步的比例"],
      ["恢复率", "工具返回可恢复错误后模型能修正并继续的比例"],
    ],
    lessons: [
      [
        "从真实失败轨迹开始",
        "凭直觉润色描述容易优化错误问题，应先聚类误选、误填和误读。",
        "标注一批失败轨迹并计算各类占比。",
      ],
      [
        "边界描述比功能口号重要",
        "“搜索数据”太宽，应该说明数据域、何时使用和与相邻工具的区别。",
        "用相邻意图样本测误选率。",
      ],
      [
        "参数名要消除歧义",
        "抽象缩写、隐式单位和布尔开关会增加猜测，应改成语义明确的枚举和结构。",
        "比较改名前后的首轮 schema 通过率。",
      ],
      [
        "错误返回指导下一步",
        "错误需说明缺什么、能否重试、何时转人工，不能只给内部代码。",
        "注入缺权限、速率限制和不存在资源三类错误，测恢复路径。",
      ],
    ],
    code: `for (const version of toolDefinitionCandidates) {
  const runs = await runToolEval(version, representativeTasks);
  report(version, {
    selection: precision(runs),
    arguments: schemaPassRate(runs),
    comprehension: nextStepAccuracy(runs),
    recovery: recoveryRate(runs),
  });
}`,
  },
  "production/production-readiness-checklist": {
    source: EVALS,
    focus:
      "用简单性、透明轨迹、ACI、安全、评测、回滚和人工接管门禁决定 Agent 能否上线",
    invariant: "没有可重复评测、最小权限、停止恢复和回滚证据的系统不得进入生产",
    fault: "演示样本成功后直接开放生产写权限，没有回归集、监控、停机或回滚路径",
    evidence:
      "版本、评测集、通过阈值、权限矩阵、轨迹日志、告警、停机演练、回滚与审批记录",
    stages: ["简单性审查", "离线评测", "沙箱试运行", "灰度监控", "回滚演练"],
    signals: ["评测", "权限", "监控", "回滚"],
    terms: [
      ["生产门禁", "上线前必须满足且可审计的检查条件"],
      ["离线评测", "在冻结任务集与环境中重复运行并评分"],
      ["轨迹评测", "检查完整消息、工具和环境事件而非只看最终答案"],
      ["灰度发布", "只向有限流量开放并持续观察的上线方式"],
      ["回滚演练", "在受控环境验证能恢复上一稳定版本和状态的操作"],
    ],
    lessons: [
      [
        "简单性是上线资产",
        "层次越少越容易观察、限权、测试和回退；复杂度必须有评测收益。",
        "移除一层框架做消融，确认是否真的降低质量。",
      ],
      [
        "评测要看结果也看轨迹",
        "最终答案偶然正确时，越权调用和无效绕路仍是生产缺陷。",
        "为成功样本加入工具次数、权限和首错断言。",
      ],
      [
        "安全边界要演练",
        "文档里写有停机按钮不够，必须在沙箱和灰度中实际触发。",
        "注入高风险调用，验证告警、暂停和人工接管。",
      ],
      [
        "回滚包含代码与外部状态",
        "退回旧版本不能自动撤销已发送消息或已写数据库，需要补偿和审计。",
        "执行一次可逆副作用，演练补偿后核对环境状态。",
      ],
    ],
    code: `const gates = [
  evaluate(frozenSuite),
  verifyLeastPrivilege(permissionMatrix),
  replayCriticalTraces(),
  drillStopAndHandoff(),
  drillRollbackAndCompensation(),
];

if (gates.some((gate) => !gate.pass)) throw new Error("release_blocked");
await release.canary({ traffic: 0.01, monitors, rollbackPlan });`,
  },
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function sourceLabel(url) {
  if (url === CONTEXT)
    return "Anthropic《Effective context engineering for AI agents》";
  if (url === TOOLS) return "Anthropic《Writing effective tools for agents》";
  if (url === TOOL_USE) return "Claude Platform《How tool use works》";
  if (url === MCP) return "MCP 2025-06-18 官方规范";
  if (url === EVALS) return "Anthropic《Demystifying evals for AI agents》";
  return "Anthropic《Building effective agents》";
}

function sourceId(url) {
  if (url === CONTEXT) return "anthropic-context";
  if (url === TOOLS) return "anthropic-tools";
  if (url === TOOL_USE) return "claude-tool-use";
  if (url === MCP) return "mcp";
  if (url === EVALS) return "anthropic-evals";
  return "anthropic-agents";
}

function renderTerms(profile) {
  const items = profile.terms.map(([term, definition]) => ({
    term,
    def: `${term}：${definition}；在“${profile.title}”中按以下证据核对：${profile.evidence}。`,
  }));
  return `<TermSequence items={${JSON.stringify(items)}} suffix="。" />`;
}

function renderGlossary(profile) {
  return profile.terms
    .map(
      ([term, definition]) => `  <GlossaryItem term=${JSON.stringify(term)}>
    ${definition}。在“${profile.title}”中必须能按以下证据重新定位：${profile.evidence}。
  </GlossaryItem>`,
    )
    .join("\n");
}

function wrapperSource(profile) {
  const base = pascal(path.basename(profile.path));
  const model = {
    title: profile.title,
    focus: profile.focus,
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    stages: profile.stages,
    signals: profile.signals,
  };
  return `"use client";

import {
  AgentApplicationPatternLab,
  type AgentApplicationModel,
} from "./application-pattern-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies AgentApplicationModel;

export function ${base}ModelLab() {
  return <AgentApplicationPatternLab mode="model" model={model} />;
}

export function ${base}TraceLab() {
  return <AgentApplicationPatternLab mode="trace" model={model} />;
}

export function ${base}EvidenceLab() {
  return <AgentApplicationPatternLab mode="evidence" model={model} />;
}
`;
}

function renderPage(profile, index, profiles) {
  const base = pascal(path.basename(profile.path));
  const previous = profiles[index - 1] ?? null;
  const next = profiles[index + 1] ?? null;
  const navigation = [
    previous
      ? `[← ${previous.title}](/learn/${BOOK}/${previous.path})`
      : "← 本课程起点",
    next ? `[${next.title} →](/learn/${BOOK}/${next.path})` : "本课程终点 →",
  ].join(" · ");
  const courseNodes = profile.concepts;
  const nodeList = courseNodes
    .map(
      (node, nodeIndex) =>
        `- **${node}**：这是“${profile.focus}”的第 ${nodeIndex + 1} 个课程坐标；必须进入机制解释、实验观察或练习证据，不能只停在目录。`,
    )
    .join("\n");
  const lessons = profile.lessons
    .map(
      ([title, body, test]) => `### ${title}

${body}

动手验证：${test}`,
    )
    .join("\n\n");

  const body = `import { ${base}ModelLab, ${base}TraceLab, ${base}EvidenceLab } from "@/components/mdx/${BOOK}/v2/${path.basename(profile.path)}";
import {
  Objectives,
  Callout,
  Glossary,
  GlossaryItem,
  TermSequence,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能解释“${profile.title}”如何${profile.focus}
- 能区分${profile.terms.map(([term]) => term).join("、")}，并指出控制权、数据与副作用边界
- 能固定输入与版本，沿以下证据定位首个分叉：${profile.evidence}
- 能注入“${profile.fault}”，完成阻断、恢复、复位和同输入重放

</Objectives>

{/* AI_AGENT_APPS_QUALITY_V2 */}

## 来源、课程编排与适用边界

“${profile.title}”以[Anthropic 公开全文《Building effective agents》](${PRIMARY})为总纲，并用[${sourceLabel(profile.source)}](${profile.source})核对本单元机制；涉及 MCP 的控制权边界再由[MCP 2025-06-18 官方规范](${MCP})交叉检查。

这不是 Anthropic 出版的“19 章教材”。平台把公开文章、官方工具文档与协议规范重组为 19 个应用单元；下列 152 个节点是站内课程地图，不冒充原文目录。正文、代码、图表、实验和练习均为独立教学重写；产品接口、模型行为或协议版本变化时必须重新验证。

## 本单元的八个课程坐标

${nodeList}

## 术语与运行合同

${renderTerms(profile)}

本页不变量是：${profile.invariant}。任何“成功”结论都要保存以下证据：${profile.evidence}，模型生成的计划或自信不能替代环境事实。

## 关键机制与可推翻实验

${lessons}

## 先预测，再操作三类证据

<Stepper>
  <Step title="1. 架构与复杂度边界">
    在“${profile.title}”中切换简单基线、受控工作流与自主循环，先预测“${profile.focus}”在哪个阶段需要增加控制权，再比较延迟、成本、可观测性和自主性。

    <${base}ModelLab />

  </Step>
  <Step title="2. 状态与决策轨迹">
    固定任务、工具、权限和预算，沿${profile.stages.join(" → ")}逐步推进；每一步只读取上一阶段已经通过的状态。

    <${base}TraceLab />

  </Step>
  <Step title="3. 故障、恢复与重放">
    注入“${profile.fault}”，观察以下证据的首个分叉：${profile.evidence}。撤销后重置实验，并用相同输入与权限重放。

    <${base}EvidenceLab />

  </Step>
</Stepper>

## 最小可运行实现

\`\`\`ts
${profile.code}
\`\`\`

这段切片只暴露“${profile.focus}”的最小运行合同。交付版本还要补齐超时、密钥隔离、结构化日志、幂等和批量评测；缺少${profile.evidence}时，代码能运行也不代表本章结论成立。

<Callout type="trap" title="本章首要反例">
  ${profile.fault}。它会破坏“${profile.invariant}”；应从${profile.evidence}定位首个分叉，而不是追加提示词掩盖运行时缺陷。
</Callout>

<Callout type="trap" title="不要把模型自评当作验收">
  在“${profile.title}”中，模型解释只能提出候选原因；协议字段、工具结果、确定性断言和真实环境状态才能证明“${profile.focus}”是否成立。
</Callout>

<Callout type="trap" title="版本变化必须重跑">
  “${profile.title}”依赖模型、工具、schema、协议或运行时接口。升级任一层后，应在冻结任务集上重新保存${profile.evidence}，不能沿用旧截图或单次成功样例。
</Callout>

## 练习与答案

<Exercises>

**问题 1：最小证明。** 怎样用最少样本证明“${profile.invariant}”？

<Answer>
  冻结模型、指令、工具、权限和预算，写出正常、边界与单故障三类预期，再保存${profile.evidence}。只要首个分叉未解释或失败样本产生副作用，就不能判定通过。
</Answer>

**问题 2：课程覆盖。** ${courseNodes.join("、")}如何进入可操作验证？

<Answer>
  把八个坐标分别标到架构决策图、状态轨迹和故障证据链中。每个坐标至少拥有一个可观察状态、一个明确判断或一个失败样本；只在目录中出现不算覆盖。
</Answer>

**问题 3：恢复闭环。** 怎样证明“${profile.fault}”已经修复？

<Answer>
  保存正常基线，注入故障并在${profile.evidence}中标出首个差异；撤销后复位全部控件，以完全相同的输入、版本、预算和权限重放。环境结果与停止状态都回到基线才算修复。
</Answer>

</Exercises>

## 本章回顾

- “${profile.title}”的主问题是${profile.focus}。
- 核心不变量是${profile.invariant}。
- 首要反例是${profile.fault}。
- 最小证据包包含${profile.evidence}。

<Glossary>
${renderGlossary(profile)}
</Glossary>

## 阅读导航

${navigation}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle="Building effective agents 与官方应用工程资料（站内十九单元课程改编）"
  adaptedUrl="${PRIMARY}"
/>`;

  return matter.stringify(body, {
    title: profile.title,
    type: profile.type,
    section: profile.section,
    order: profile.order,
    description: `${profile.title}：${profile.focus}，通过架构、轨迹和故障重放完成验收。`,
    demo: true,
    math: false,
    sourceUrl: profile.source,
    draft: false,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
    officialUnitId: profile.id,
  });
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const oldManifest = manifestRoot.books[BOOK];
if (!oldManifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (oldManifest.units.length !== PATHS.length)
  throw new Error(`单元数不一致：${oldManifest.units.length}`);

const profiles = PATHS.map((chapterPath, index) => {
  const filePath = path.join(CONTENT_DIR, `${chapterPath}.mdx`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const unit = oldManifest.units[index];
  const detail = DETAILS[chapterPath];
  if (!detail) throw new Error(`缺少页面配置：${chapterPath}`);
  if (String(parsed.data.title) !== unit.title)
    throw new Error(`标题与清单不一致：${chapterPath}`);
  return {
    ...detail,
    id: unit.id,
    title: unit.title,
    concepts: unit.concepts.flat().map(String),
    path: chapterPath,
    type: String(parsed.data.type ?? "A"),
    section: String(parsed.data.section),
    order: Number(parsed.data.order),
  };
});

if (profiles.some((profile) => profile.concepts.length !== 8))
  throw new Error("每个课程单元必须映射八个节点");

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const [index, profile] of profiles.entries()) {
  fs.writeFileSync(
    path.join(CONTENT_DIR, `${profile.path}.mdx`),
    renderPage(profile, index, profiles),
  );
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${path.basename(profile.path)}.tsx`),
    wrapperSource(profile),
  );
}

const factSources = [
  {
    id: "anthropic-agents",
    title: "Building effective agents",
    url: PRIMARY,
  },
  {
    id: "anthropic-context",
    title: "Effective context engineering for AI agents",
    url: CONTEXT,
  },
  {
    id: "anthropic-tools",
    title: "Writing effective tools for AI agents",
    url: TOOLS,
  },
  {
    id: "claude-tool-use",
    title: "How tool use works",
    url: TOOL_USE,
  },
  {
    id: "mcp",
    title: "Model Context Protocol specification 2025-06-18",
    url: MCP,
  },
  {
    id: "anthropic-evals",
    title: "Demystifying evals for AI agents",
    url: EVALS,
  },
];

manifestRoot.books[BOOK] = {
  version: 2,
  edition:
    "站内应用专题《AI 智能体应用开发》，基于 Anthropic 公开全文、Claude Platform 与 MCP 官方规范重组",
  status: "verified-course-map",
  sourceKind: "official-full-text-curated-nineteen-unit-application-course",
  sourceUrl: PRIMARY,
  sourceAccess: "full-text-primary",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "十九个单元与152个节点是站内课程编排，不是Anthropic原文的十九章目录；正文、代码、图表与练习为独立教学重写。",
  unitMappingEvidence: "quality/ai-agent-apps-v2-profiles.json",
  factSourcePolicy:
    "总纲以Anthropic公开全文为主；工具调用、MCP、上下文与评测分别由对应官方资料核对，接口或协议变化时重新验证。",
  factSources,
  coverage: {
    courseNodes: profiles.length * 8,
    mappedNodes: profiles.length * 8,
    ratio: 1,
    explicitlyNotOriginalBookToc: true,
  },
  metrics: {
    courseUnits: profiles.length,
    courseNodes: profiles.length * 8,
    coursePages: profiles.length,
    interactiveViews: profiles.length * 3,
  },
  visualImplementation: {
    viewsPerPage: 3,
    sharedLab:
      "src/components/mdx/ai-agent-apps/v2/application-pattern-lab.tsx",
    pageSpecificModels: profiles.length,
  },
  units: profiles.map((profile) => ({
    id: profile.id,
    title: profile.title,
    chapterPath: profile.path,
    concepts: profile.concepts.map((concept) => [concept]),
    sourceUrl: profile.source,
    factSourceIds: [
      "anthropic-agents",
      sourceId(profile.source),
      ...(profile.path === "tool-use/mcp" ? [] : ["mcp"]),
    ],
  })),
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      courseDisclosure:
        "19 units and 152 nodes are a platform-authored application course map, not an original Anthropic table of contents.",
      sources: factSources,
      pages: profiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: profiles.length,
      courseNodes: profiles.length * 8,
      interactiveViews: profiles.length * 3,
    },
    null,
    2,
  ),
);
