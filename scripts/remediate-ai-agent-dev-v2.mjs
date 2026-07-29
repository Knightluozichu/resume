import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "ai-agent-dev";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/ai-agent-dev-v2-profiles.json");

const PRIMARY =
  "https://www.anthropic.com/engineering/building-effective-agents";
const CONTEXT =
  "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents";
const TOOL_USE =
  "https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works";
const TOOLS = "https://www.anthropic.com/engineering/writing-tools-for-agents";
const REACT = "https://arxiv.org/abs/2210.03629";
const RAG = "https://arxiv.org/abs/2005.11401";
const LOST = "https://arxiv.org/abs/2307.03172";
const MULTI_AGENT =
  "https://www.anthropic.com/engineering/multi-agent-research-system";
const EVALS =
  "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents";
const SECURITY = "https://www.anthropic.com/engineering/claude-code-sandboxing";
const PRODUCTION = "https://www.anthropic.com/engineering/managed-agents";

const PATHS = [
  "foundations/what-is-agent",
  "foundations/llm-brain",
  "foundations/prompting-roles",
  "core-mechanisms/react-loop",
  "core-mechanisms/tool-calling",
  "core-mechanisms/memory",
  "core-mechanisms/planning",
  "knowledge-rag/rag",
  "knowledge-rag/context-engineering",
  "multi-agent/multi-agent-patterns",
  "multi-agent/orchestration",
  "enterprise/evaluation-observability",
  "enterprise/safety-guardrails",
  "enterprise/production-deployment",
];

const DETAILS = {
  "foundations/what-is-agent": {
    source: PRIMARY,
    focus: "用感知、决策、行动、观察和可调自主性定义可运行的 Agent 边界",
    invariant: "每一次行动都来自明确任务合同，并由新的环境观察推动下一步或停止",
    fault:
      "系统把多轮聊天包装成 Agent，却没有工具执行、环境观察或可验证完成状态",
    evidence:
      "任务输入、控制权、动作请求、环境观察、轮次预算、最终状态与人工接管",
    stages: ["接收目标", "选择控制权", "请求动作", "读取观察", "完成或接管"],
    signals: ["任务合同", "动作", "观察", "停止"],
    terms: [
      ["Agent", "模型在运行时依据环境反馈选择工具和后续步骤的系统"],
      ["感知", "把用户输入和环境状态转成当前可用事实"],
      ["行动", "通过受控工具读取或改变外部环境"],
      ["观察", "行动执行后返回并进入下一轮决策的结果"],
      ["自主性", "模型在权限和预算内自行决定路径的程度"],
    ],
    lessons: [
      [
        "四要素形成闭环",
        "只有模型、工具、状态和运行时共同工作，系统才从文本生成走向可验证行动。",
        "删除其中一个要素，记录任务在哪个阶段失去闭环。",
      ],
      [
        "控制权决定系统类型",
        "固定代码决定路径的是工作流，模型根据观察决定路径的才是 Agent。",
        "把同一任务分别实现为状态机和动态循环，标出决策主体。",
      ],
      [
        "自主性必须逐级放开",
        "读权限、写权限和不可逆操作不应一次性全部交给模型。",
        "逐档开放权限，比较成功率、风险事件和接管率。",
      ],
      [
        "停止状态不能含糊",
        "完成、阻塞、拒绝和人工接管需要不同状态与证据。",
        "让工具连续失败，确认预算耗尽不会被标为 done。",
      ],
    ],
    code: `async function run(goal: Goal, runtime: Runtime) {
  const trace: Event[] = [];
  for (let step = 0; step < runtime.maxSteps; step += 1) {
    const decision = await runtime.decide(goal, trace);
    if (decision.kind === "final") return runtime.verify(decision, trace);
    trace.push(await runtime.execute(decision));
  }
  return { status: "blocked", reason: "step_budget", trace };
}`,
  },
  "foundations/llm-brain": {
    source: CONTEXT,
    focus:
      "理解 token、上下文、逐 token 生成和采样边界，避免把语言流畅误当事实检索",
    invariant:
      "模型输出只能作为概率候选，事实、结构和副作用必须由外部证据或确定性校验确认",
    fault: "模型以高置信语气编造不存在的接口，运行时未检索或校验就执行后续步骤",
    evidence:
      "模型版本、消息、token 预算、采样参数、原始响应、来源检索与验证结果",
    stages: ["编码输入", "组装上下文", "生成分布", "采样 token", "外部验证"],
    signals: ["版本", "上下文", "采样", "验证"],
    terms: [
      ["token", "模型处理文本时使用的离散单元"],
      ["上下文窗口", "一次推理能接收的 token 集合与上限"],
      ["logits", "模型对候选下一 token 给出的未归一化分数"],
      ["temperature", "调节候选分布平坦程度的采样参数"],
      ["幻觉", "模型生成流畅但缺少可靠事实依据的内容"],
    ],
    lessons: [
      [
        "模型处理 token 而不是人类字符",
        "分词会影响长度、成本和边界，不能用字符数直接代替 token 预算。",
        "对中英混合、代码和 emoji 分词，比较字符数与 token 数。",
      ],
      [
        "上下文是有限工作区",
        "窗口能装下不等于模型能同等利用所有信息，长上下文还会稀释注意。",
        "移动关键事实的位置，测量同一问题的召回变化。",
      ],
      [
        "采样改变分布而非知识",
        "温度和 top-p 控制候选选择，不会把未知事实变成已知。",
        "固定提示多次采样，比较多样性与事实校验通过率。",
      ],
      [
        "流畅输出仍需验证",
        "下一 token 预测可以生成貌似合理的接口和引用，Agent 必须用工具取得 ground truth。",
        "加入一个不存在的 API 名称，确认执行前被检索或注册表挡住。",
      ],
    ],
    code: `const request = {
  model: pinnedModel,
  messages: fitContext(messages, tokenBudget),
  temperature: 0.2,
};
const response = await model.generate(request);
const claims = extractVerifiableClaims(response);
const verified = await verifyWithTools(claims);
return attachEvidence(response, verified);`,
  },
  "foundations/prompting-roles": {
    source: CONTEXT,
    focus:
      "分离系统角色、任务指令、用户数据、示例和结构合同，并用评测而非直觉改提示",
    invariant: "可信指令与不可信数据边界清晰，输出要求可被机器校验和回归测试",
    fault: "把用户提交的文档直接拼进系统指令，文档中的伪命令改变了工具权限",
    evidence: "提示版本、分区、输入样本、原始输出、schema 错误、评分与版本差异",
    stages: [
      "定义角色",
      "写任务合同",
      "隔离用户数据",
      "加入示例",
      "结构化验收",
    ],
    signals: ["提示版本", "信任边界", "schema", "回归"],
    terms: [
      ["角色设定", "规定模型职责、边界和长期行为的系统层说明"],
      ["任务指令", "描述本次要完成什么及成功标准的要求"],
      ["few-shot", "用少量代表性输入输出示范目标行为"],
      ["结构化输出", "按机器可验证 schema 返回结果"],
      ["prompt injection", "不可信数据试图冒充高优先级指令的攻击"],
    ],
    lessons: [
      [
        "角色不能代替任务合同",
        "“你是专家”不说明输入、产物、边界或成功标准，只会增加风格暗示。",
        "删除角色形容词，保留合同，比较任务正确率。",
      ],
      [
        "分区表达优先级",
        "背景、指令、工具规则、示例与用户数据应明确分隔，防止角色混淆。",
        "在用户数据中放入越权命令，确认工具政策不变。",
      ],
      [
        "示例覆盖行为边界",
        "精选正常、边界与拒绝样本比堆积大量相似例更节省注意预算。",
        "用相同 token 预算比较重复例与多样例。",
      ],
      [
        "结构输出进入确定性门禁",
        "合法 JSON 仍要通过 schema 与业务规则，失败对象不能触发执行。",
        "注入缺字段和越权对象，确认下游调用数为零。",
      ],
    ],
    code: `const prompt = composeSections({
  role: trustedRole,
  task: taskContract,
  toolRules,
  examples: canonicalExamples,
  userData: markUntrusted(userInput),
});
const raw = await model.generate(prompt);
return businessRules.parse(outputSchema.parse(JSON.parse(raw)));`,
  },
  "core-mechanisms/react-loop": {
    source: REACT,
    focus:
      "把决策、行动与环境观察交错成可追踪循环，并避免暴露或依赖不可验证的私密推理",
    invariant:
      "下一步只依据任务状态、允许的动作和真实 observation 更新，调用与结果严格配对",
    fault: "工具失败后模型忽略 observation，继续沿旧计划重复相同副作用",
    evidence:
      "状态摘要、action、参数、tool_use_id、observation、错误、下一步与停止原因",
    stages: ["状态摘要", "选择行动", "执行工具", "接收观察", "更新或停止"],
    signals: ["状态", "行动", "观察", "停止"],
    terms: [
      ["ReAct", "把任务推理与环境行动交错进行的方法"],
      ["Action", "模型向运行时提出的结构化工具请求"],
      ["Observation", "环境执行动作后返回的事实"],
      ["状态摘要", "供下一轮决策使用的可审计任务状态"],
      ["循环预算", "限制轮数、时间、token 和成本的退出边界"],
    ],
    lessons: [
      [
        "行动把推理接到环境",
        "纯文本推演无法取得新事实，工具调用让系统能查询、执行和纠错。",
        "切断工具后比较回答是否仍错误声称取得外部事实。",
      ],
      [
        "观察必须改变状态",
        "空结果、错误与拒绝都是信息，不能被吞掉后继续旧计划。",
        "返回 permission_denied，检查下一步是否转人工。",
      ],
      [
        "调用结果按标识配对",
        "并行工具完成顺序不稳定，数组位置会导致观察串线。",
        "反转结果顺序，确认状态摘要仍正确。",
      ],
      [
        "可观测摘要优于泄露私密推理",
        "工程系统需要决策依据、动作和证据，不应依赖展示未必可靠的隐藏思维链。",
        "只保留状态摘要与外部事件，确认仍能复盘首错。",
      ],
    ],
    code: `while (budget.remaining()) {
  const decision = await decide({ goal, state, allowedTools });
  if (decision.kind === "final") return verifyFinal(decision, state);
  const observation = await executeAuthorized(decision.action);
  state = reduceState(state, {
    actionId: decision.id,
    observation,
  });
}
return blocked("budget");`,
  },
  "core-mechanisms/tool-calling": {
    source: TOOL_USE,
    focus:
      "实现工具定义、模型选择、参数验证、应用执行、结果回灌和停止原因状态机",
    invariant: "模型只生成调用请求，应用始终负责验证、授权、执行和返回真实结果",
    fault: "执行器用反射运行任意工具名，并把未经业务校验的参数直接交给函数",
    evidence:
      "工具版本、描述、input_schema、tool_use、权限、执行日志、tool_result 与 stop_reason",
    stages: ["声明工具", "模型选择", "验证授权", "执行函数", "回灌与退出"],
    signals: ["schema", "授权", "执行", "结果"],
    terms: [
      ["工具定义", "提供给模型的名称、描述和输入 schema"],
      ["tool_use", "模型发出的结构化工具调用块"],
      ["tool_result", "应用送回模型的执行结果块"],
      ["工具注册表", "允许名称到受控实现的显式映射"],
      ["stop_reason", "说明一轮因工具、完成、拒绝或限制而停止的字段"],
    ],
    lessons: [
      [
        "描述决定是否选对",
        "边界重叠的工具会让模型猜测，名称和描述要同时写适用与不适用场景。",
        "用相邻意图构建工具选择混淆矩阵。",
      ],
      [
        "schema 不等于权限",
        "参数形状正确后仍要检查主体、资源范围和操作风险。",
        "提交合法但越权的资源 ID，确认执行器拒绝。",
      ],
      [
        "注册表阻断任意执行",
        "模型名称不能进入 eval、shell 或任意反射，应只匹配显式白名单。",
        "请求未知工具，确认返回错误且零副作用。",
      ],
      [
        "错误也必须回灌",
        "可恢复错误要用匹配 ID 的 tool_result 返回，下一轮才能改参数或换工具。",
        "注入缺字段错误，检查模型是否按错误提示修复。",
      ],
    ],
    code: `async function execute(call: ToolUse, actor: Actor) {
  const tool = registry.get(call.name);
  if (!tool) return toolError(call.id, "unknown_tool");
  const args = tool.schema.parse(call.input);
  await policy.authorize(actor, tool, args);
  try {
    return toolResult(call.id, await tool.run(args));
  } catch (error) {
    return toolError(call.id, classify(error));
  }
}`,
  },
  "core-mechanisms/memory": {
    source: CONTEXT,
    focus:
      "分离工作记忆与长期记忆，设计带来源、租户、保留期和删除语义的写入检索流程",
    invariant:
      "记忆只能在正确主体、权限和生命周期内读写，检索结果进入上下文前再次核验",
    fault: "全局向量库未按租户过滤，把另一用户的偏好和历史写进当前回答",
    evidence:
      "memory_id、租户、来源、写入理由、向量版本、检索分数、过期时间与删除日志",
    stages: ["选择写入", "加元数据", "索引保存", "权限检索", "使用或遗忘"],
    signals: ["租户", "来源", "检索分数", "生命周期"],
    terms: [
      ["工作记忆", "当前任务上下文中的短期状态"],
      ["长期记忆", "跨轮次或会话保存在外部存储的状态"],
      ["语义检索", "按向量相似度寻找含义接近的记录"],
      ["记忆写入策略", "决定哪些信息值得保存以及保存多久的规则"],
      ["遗忘", "按过期、用户删除或低价值规则移除记忆"],
    ],
    lessons: [
      [
        "不是所有对话都该记",
        "把临时请求、敏感值和错误结论长期保存会污染后续任务。",
        "对候选记忆执行保存/不保存分类并审查误写。",
      ],
      [
        "语义相似不代表有权读取",
        "向量分数只衡量含义接近，租户、ACL 和时效要先做确定性过滤。",
        "用两个租户的相似记录验证零串读。",
      ],
      [
        "来源让记忆可纠正",
        "没有创建时间和事实来源的记忆无法判断过期，也难以撤销。",
        "更新来源事实后找到并失效所有派生记忆。",
      ],
      [
        "遗忘是系统能力",
        "用户删除、保留期和低价值淘汰必须真正影响索引与备份。",
        "执行删除后从主库、索引和读取路径逐层验证。",
      ],
    ],
    code: `async function retrieveMemory(query: Query, actor: Actor) {
  const candidates = await vectorIndex.search(embed(query.text));
  return candidates
    .filter((item) => item.tenantId === actor.tenantId)
    .filter((item) => !isExpired(item) && policy.canRead(actor, item))
    .slice(0, 5)
    .map(withProvenance);
}`,
  },
  "core-mechanisms/planning": {
    source: PRIMARY,
    focus:
      "把大目标拆成带依赖和验收条件的任务图，并在环境反馈否定假设时有限重规划",
    invariant: "计划中的每个任务都有输入、输出、依赖、责任主体和可验证完成条件",
    fault:
      "计划只列自然语言步骤，没有依赖或验收器，某一步失败后仍把后续全部标为完成",
    evidence:
      "目标版本、任务图、依赖、计划变更、工具观察、失败原因、重规划次数与验收结果",
    stages: ["冻结目标", "拆任务图", "检查依赖", "执行观察", "重规划或验收"],
    signals: ["目标", "依赖图", "观察", "重规划"],
    terms: [
      ["任务分解", "把目标拆成可执行且可验收的子任务"],
      ["任务图", "用节点和依赖边表示执行关系的结构"],
      ["先规划后执行", "先形成显式计划，再按计划调用工具的策略"],
      ["重规划", "环境反馈否定原假设时修改剩余任务的过程"],
      ["验收条件", "确定性判断一个任务是否完成的规则"],
    ],
    lessons: [
      [
        "分解要落到可执行边界",
        "“研究并解决”仍不可执行，子任务要明确产物、工具和完成条件。",
        "把模糊节点继续拆分，直到可由单次工具或检查器处理。",
      ],
      [
        "依赖决定并发与顺序",
        "没有依赖图就无法判断哪些任务能并行，也难以阻断下游。",
        "删除一个前置产物，确认所有依赖节点保持 pending。",
      ],
      [
        "计划不是事实",
        "模型写出的步骤是假设，执行观察可能要求换路或缩小目标。",
        "让关键 API 不可用，检查计划是否产生替代路径。",
      ],
      [
        "重规划必须有限",
        "每轮全量重写计划会抖动并消耗预算，应只修改受影响子图。",
        "连续制造同类失败，确认达到上限后转人工。",
      ],
    ],
    code: `const plan = validateTaskGraph(await planner(goal));
for (const node of topologicalOrder(plan)) {
  if (!dependenciesPassed(node, plan)) continue;
  const observation = await executeNode(node);
  record(node, observation);
  if (!node.acceptance(observation)) {
    await replanAffectedSubgraph(plan, node, { maxReplans: 2 });
  }
}
return verifyGoal(plan, goal);`,
  },
  "knowledge-rag/rag": {
    source: RAG,
    focus:
      "构建解析、切块、索引、检索、重排、生成和引用闭环，并分开评估检索与回答",
    invariant:
      "回答中的可验证事实必须由当前授权语料支持，引用能定位到稳定文档版本和片段",
    fault: "检索命中高相似但过期片段，生成器混入参数记忆并伪造了不存在的引用",
    evidence:
      "文档版本、chunk_id、切块参数、查询、召回集、重排分数、引用、答案与事实断言",
    stages: ["解析切块", "建立索引", "召回重排", "带证据生成", "引用验收"],
    signals: ["文档版本", "召回", "重排", "引用"],
    terms: [
      ["RAG", "检索外部语料并将相关证据提供给生成模型的方法"],
      ["embedding", "把文本映射为可比较的向量表示"],
      ["chunk", "从原文切出的可索引片段"],
      ["召回", "从索引取得候选相关片段的过程"],
      ["重排", "用更精细模型或规则重新排序候选"],
    ],
    lessons: [
      [
        "切块决定可检索单位",
        "块过小丢上下文，过大稀释相关性并浪费 token；参数应按文档结构评测。",
        "改变块大小和重叠，比较证据完整率与冗余。",
      ],
      [
        "向量召回不是事实判定",
        "相似度高的片段可能过期、越权或答非所问，需要过滤和重排。",
        "混入高相似旧版本，确认版本过滤先于生成。",
      ],
      [
        "检索和生成分开测",
        "答案错可能来自没召回，也可能来自有证据却没使用，单一总分无法定位。",
        "分别计算 recall@k、引用精度和答案正确率。",
      ],
      [
        "引用必须可定位",
        "展示文档名不够，应保存版本、片段和字符或段落范围。",
        "更新文档后验证旧回答仍能指向历史版本。",
      ],
    ],
    code: `const queryVector = await embed(query);
const candidates = await index.search(queryVector, { tenantId, k: 20 });
const filtered = candidates.filter(isCurrentAndAuthorized);
const passages = await rerank(query, filtered, 5);
const answer = await generateGrounded(query, passages);
assertEveryClaimHasCitation(answer, passages);
return answer;`,
  },
  "knowledge-rag/context-engineering": {
    source: LOST,
    focus:
      "在有限注意预算中选择、排序、压缩和按需加载上下文，并用位置扰动验证稳健性",
    invariant: "上下文重组后必须保留目标、约束、决定、开放问题和来源引用",
    fault: "按消息年龄截断历史，把仍生效的安全约束和未解决错误一起删除",
    evidence:
      "token 预算、内容类别、位置、压缩映射、保留断言、引用与位置扰动结果",
    stages: ["盘点信息", "分配预算", "按需加载", "压缩排序", "扰动评测"],
    signals: ["预算", "位置", "保留事实", "扰动"],
    terms: [
      ["上下文工程", "为每轮推理选择和维护高信号 token 的工程过程"],
      ["注意预算", "模型在长上下文中可靠利用信息的有限能力"],
      ["lost in the middle", "关键信息位于长上下文中部时利用率下降的现象"],
      ["压缩", "保留关键事实并缩短表示的过程"],
      ["按需加载", "只在当前步骤需要时从外部取回内容"],
    ],
    lessons: [
      [
        "窗口容量不是有效容量",
        "长上下文模型仍可能随位置和噪声出现性能梯度，不能只看标称 token 数。",
        "把同一事实放在首、中、尾三处测召回。",
      ],
      [
        "预算按价值而非来源平均分",
        "系统指令、未解决错误和当前证据通常比陈旧工具原文更值得保留。",
        "删掉低价值结果后比较任务一致性。",
      ],
      [
        "压缩要能回指原始证据",
        "摘要可能遗漏细节或引入错误，应保留来源 ID 和按需展开入口。",
        "从摘要中的每条决定回查原始事件。",
      ],
      [
        "按需检索减少污染",
        "路径、查询和文档标识可先留在上下文，需要时再读取内容。",
        "比较一次性加载与逐步加载的 token、延迟和正确率。",
      ],
    ],
    code: `function assembleContext(state: State, budget: number) {
  const mandatory = [state.goal, state.constraints, state.openIssues];
  const recent = state.events.slice(-6);
  const summary = compressWithCitations(state.events.slice(0, -6));
  const context = fitBudget([...mandatory, summary, ...recent], budget);
  assertFactsPreserved(state, context);
  return context;
}`,
  },
  "multi-agent/multi-agent-patterns": {
    source: MULTI_AGENT,
    focus:
      "按并行价值、上下文隔离和角色专长选择 supervisor、pipeline 或分散协作拓扑",
    invariant:
      "只有可独立验证的子任务才交给独立 Agent，最终结果由明确聚合器验收",
    fault:
      "为了展示多 Agent 把强依赖任务并行化，工作者各自基于不同旧状态产出冲突结果",
    evidence:
      "拓扑、任务图、角色提示、上下文切片、工作者结果、冲突、聚合规则、token 与耗时",
    stages: ["评估必要性", "选择拓扑", "隔离上下文", "并行执行", "聚合验收"],
    signals: ["任务独立性", "上下文", "冲突", "聚合"],
    terms: [
      ["supervisor", "由中心 Agent 分配任务并综合工作者结果的拓扑"],
      ["pipeline", "多个 Agent 按固定顺序处理中间产物的拓扑"],
      ["swarm", "参与者通过局部交接或共享环境协作的分散拓扑"],
      ["角色专精", "让每个 Agent 只承担边界清晰的任务类型"],
      ["聚合器", "去重、处理冲突并验证最终结果的组件"],
    ],
    lessons: [
      [
        "多 Agent 的价值来自并行和上下文分离",
        "单任务复制多个角色只会增加协调成本，子任务应能独立推进。",
        "比较单 Agent 与多 Agent 的成功率、token 和墙钟时间。",
      ],
      [
        "拓扑匹配依赖结构",
        "固定阶段适合 pipeline，动态拆分适合 supervisor，不能凭名称选架构。",
        "为任务画依赖图后再选择拓扑。",
      ],
      [
        "角色边界要减少重叠",
        "多个工作者都修改同一对象会制造冲突与重复。",
        "计算各角色读写集合并阻断重叠写。",
      ],
      [
        "聚合必须有证据标准",
        "把文本拼接起来不等于综合，应处理冲突、来源和覆盖缺口。",
        "注入互斥结论，确认聚合器要求进一步验证。",
      ],
    ],
    code: `const plan = await supervisor.decompose(task);
assertIndependent(plan.parallelTasks);
const results = await Promise.all(
  plan.parallelTasks.map((item) => runWorker(item, isolatedContext(item))),
);
const merged = aggregate(results, {
  requireCitations: true,
  rejectConflicts: true,
});
return acceptance.verify(merged);`,
  },
  "multi-agent/orchestration": {
    source: MULTI_AGENT,
    focus: "用消息信封、共享黑板、调度器和全局终止检测组织多 Agent 协作",
    invariant:
      "消息与共享状态都有版本、所有者和因果标识，终止条件覆盖成功、死锁、预算与人工接管",
    fault:
      "两个 Agent 基于同一旧版本覆盖共享黑板，调度器未检测循环等待而无限转发消息",
    evidence:
      "message_id、correlation_id、状态版本、读写者、调度事件、等待图、预算与终止原因",
    stages: ["发布消息", "读取状态", "调度任务", "合并版本", "检测终止"],
    signals: ["消息 ID", "状态版本", "等待图", "终止"],
    terms: [
      ["消息信封", "包含发送者、接收者、关联标识和载荷的通信结构"],
      ["共享黑板", "多个 Agent 读写的版本化协作状态"],
      ["调度器", "决定任务何时运行、重试或转交的组件"],
      ["死锁", "参与者互相等待且没有任务能继续的状态"],
      ["全局终止", "依据整体任务、活动工作者和消息队列判断系统退出"],
    ],
    lessons: [
      [
        "消息需要因果关联",
        "仅凭文本内容无法可靠配对请求、响应和子任务。",
        "打乱消息到达顺序，确认 correlation_id 保持链路。",
      ],
      [
        "共享状态必须版本化",
        "last-write-wins 会静默丢失并发更新，应使用乐观锁或合并策略。",
        "让两个 Agent 更新同一版本，确认第二次写入冲突。",
      ],
      [
        "调度器处理背压",
        "工作者速度不同时，无限入队会消耗内存并扩大过期任务。",
        "限制队列和并发，观察高负载下的拒绝与恢复。",
      ],
      [
        "终止是全局属性",
        "某个 Agent 没有新动作不代表系统完成，还要看队列、等待和验收。",
        "构造互相等待，确认死锁检测进入 blocked。",
      ],
    ],
    code: `async function coordinate(task: Task) {
  const state = versionedBlackboard(task);
  while (budget.remaining()) {
    const runnable = scheduler.next(state);
    if (runnable.length === 0) return classifyQuiescence(state);
    const events = await runWithLimit(runnable, 4);
    state.apply(events, { rejectStaleWrites: true });
    if (acceptance.passed(state)) return done(state);
  }
  return blocked("budget", state);
}`,
  },
  "enterprise/evaluation-observability": {
    source: EVALS,
    focus:
      "用 trace、span、环境状态、确定性 grader 与校准后的模型 grader 建立回归和生产监控",
    invariant:
      "每个评分都能回到输入、完整轨迹、环境结果、grader 版本和可复跑样本",
    fault: "只评价最终回答是否顺眼，忽略越权工具调用、绕路、成本和错误恢复",
    evidence:
      "eval case、模型版本、完整 messages、tool events、环境快照、grader、分数、延迟与成本",
    stages: ["定义任务", "采集轨迹", "运行 graders", "聚合指标", "回归告警"],
    signals: ["任务", "轨迹", "grader", "回归"],
    terms: [
      ["trace", "一次 Agent 运行的完整事件链"],
      ["span", "trace 中一个模型、工具或业务步骤的时间区间"],
      ["grader", "对结果、轨迹或环境状态进行评分的函数"],
      ["回归集", "用于比较版本变化的冻结代表任务集合"],
      ["在线监控", "生产流量中持续观察质量、延迟、成本和风险信号"],
    ],
    lessons: [
      [
        "任务定义先于指标",
        "没有明确输入、环境和成功状态，单个分数无法解释。",
        "把“回答得好”改写为可验证任务与结果。",
      ],
      [
        "结果与轨迹都要评分",
        "最终正确但调用越权、成本异常或走了脆弱路径仍应失败。",
        "加入工具次数、权限和首错 grader。",
      ],
      [
        "模型 grader 需要校准",
        "主观维度可用模型评审，但要与人工标签对齐并监控漂移。",
        "计算 grader 与双人标注的一致率。",
      ],
      [
        "生产反馈回流离线集",
        "线上新失败簇应脱敏后进入回归集，避免只优化旧样本。",
        "从告警中抽样、分类并新增最小复现用例。",
      ],
    ],
    code: `const run = await harness.execute(evalCase);
const scores = await Promise.all([
  taskResultGrader(run.environment),
  toolPolicyGrader(run.trace),
  latencyCostGrader(run.metrics),
  calibratedModelGrader(run.messages),
]);
storeEval({ evalCase, run, scores, versions });
assertNoRegression(scores, baseline);`,
  },
  "enterprise/safety-guardrails": {
    source: SECURITY,
    focus:
      "以数据/指令隔离、最小权限、风险分级、沙箱、预算和人工批准构建纵深防御",
    invariant:
      "不可信内容永远不能自行扩大工具、资源或身份权限，高风险副作用必须先预览再批准",
    fault:
      "网页中的 prompt injection 要求导出密钥，Agent 把它当系统命令并调用发送工具",
    evidence:
      "输入来源、信任标签、策略版本、权限、工具参数、风险级别、批准、沙箱日志与副作用",
    stages: ["标记信任", "策略判定", "最小授权", "沙箱预览", "批准或拒绝"],
    signals: ["来源", "策略", "权限", "副作用"],
    terms: [
      ["prompt injection", "不可信内容试图改变模型指令或诱导越权的攻击"],
      ["最小权限", "主体只获得当前任务必需的能力和资源范围"],
      ["护栏", "在输入、决策、工具和输出边界执行的安全控制"],
      ["风险分级", "按动作影响和可逆性选择自动、确认或禁止策略"],
      ["人工批准", "人在高风险动作执行前审查具体参数和影响"],
    ],
    lessons: [
      [
        "数据不是指令",
        "网页、邮件和工具结果都可能携带攻击文本，应标记来源并限制其角色。",
        "在文档中嵌入越权命令，确认工具政策不变。",
      ],
      [
        "权限在执行器强制",
        "提示里的“不要越权”不是安全边界，运行时必须校验主体、动作和资源。",
        "删除提示警告后确认越权请求仍被拒绝。",
      ],
      [
        "高风险动作先预览",
        "付款、发送、删除和发布要展示具体对象、参数和影响，再等待批准。",
        "取消批准，确认副作用计数为零。",
      ],
      [
        "预算也是安全控制",
        "攻击可能诱导无限工具循环或大规模检索，应限制轮次、token、费用和速率。",
        "注入重复调用，确认预算耗尽进入 blocked。",
      ],
    ],
    code: `async function guardedExecute(request: ToolRequest, actor: Actor) {
  const labeled = labelTrustBoundary(request);
  const decision = policy.evaluate(actor, labeled);
  if (decision.effect === "deny") return denied(decision.reason);
  const preview = await sandbox.preview(request);
  if (preview.risk === "high") await requireApproval(preview);
  return sandbox.execute(request, { permissions: decision.permissions });
}`,
  },
  "enterprise/production-deployment": {
    source: PRODUCTION,
    focus:
      "把模型决策与执行基础设施解耦，补齐队列、并发、超时、幂等、降级、灰度和回滚",
    invariant:
      "每个请求都有稳定身份、资源预算和可恢复状态，重试不会重复副作用，版本可安全回退",
    fault: "模型超时后网关无幂等键地重试写操作，造成重复下单并在全量发布中扩大",
    evidence:
      "request_id、idempotency_key、队列事件、超时、重试、模型版本、灰度指标、回滚与补偿日志",
    stages: ["接入排队", "限并发执行", "超时降级", "灰度观测", "回滚补偿"],
    signals: ["请求身份", "重试", "灰度", "补偿"],
    terms: [
      ["异步队列", "把请求接收与长耗时执行解耦的缓冲层"],
      ["幂等键", "让重复请求只产生一次业务副作用的稳定标识"],
      ["降级", "主依赖不可用时转向能力较低但安全的处理路径"],
      ["灰度发布", "逐步扩大新版本流量并观察指标的发布策略"],
      ["补偿", "撤销或抵消已发生外部副作用的业务操作"],
    ],
    lessons: [
      [
        "脑与手保持稳定接口",
        "模型和 harness 会迭代，执行、状态和权限接口应能独立扩缩与升级。",
        "替换模型版本，确认执行协议和历史任务仍兼容。",
      ],
      [
        "重试前先判断幂等",
        "查询可安全重试，扣款和发送需要幂等键或补偿，不能一套策略覆盖所有工具。",
        "制造响应丢失，确认同一请求只执行一次。",
      ],
      [
        "超时与背压保护下游",
        "无限等待和无限并发会把局部慢调用放大成系统雪崩。",
        "降低下游容量，检查队列上限、拒绝和恢复。",
      ],
      [
        "回滚不仅是代码版本",
        "新版本已产生的订单、消息和文件不会随镜像回退，需要补偿与审计。",
        "灰度中制造错误写入，演练版本回滚和状态补偿。",
      ],
    ],
    code: `async function handle(job: Job) {
  return idempotency.run(job.key, async () =>
    timeout(
      concurrencyLimit.run(() => agentService.execute(job)),
      30_000,
      () => safeFallback(job),
    ),
  );
}

await rollout.canary(newVersion, {
  steps: [0.05, 0.25, 0.5, 1],
  rollbackOn: regressionPolicy,
});`,
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
  const labels = {
    [PRIMARY]: "Anthropic《Building effective agents》",
    [CONTEXT]: "Anthropic《Effective context engineering for AI agents》",
    [TOOL_USE]: "Claude Platform《How tool use works》",
    [TOOLS]: "Anthropic《Writing effective tools for agents》",
    [REACT]: "ReAct 原始论文",
    [RAG]: "RAG 原始论文",
    [LOST]: "《Lost in the Middle》原始论文",
    [MULTI_AGENT]: "Anthropic 多智能体研究系统工程复盘",
    [EVALS]: "Anthropic《Demystifying evals for AI agents》",
    [SECURITY]: "Anthropic Agent 安全工程文章",
    [PRODUCTION]: "Anthropic Managed Agents 工程文章",
  };
  return labels[url] ?? url;
}

function sourceId(url) {
  const ids = {
    [PRIMARY]: "anthropic-agents",
    [CONTEXT]: "anthropic-context",
    [TOOL_USE]: "claude-tool-use",
    [TOOLS]: "anthropic-tools",
    [REACT]: "react",
    [RAG]: "rag",
    [LOST]: "lost-middle",
    [MULTI_AGENT]: "anthropic-multi-agent",
    [EVALS]: "anthropic-evals",
    [SECURITY]: "anthropic-security",
    [PRODUCTION]: "anthropic-managed-agents",
  };
  return ids[url];
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
} from "@/components/mdx/ai-agent-apps/v2/application-pattern-lab";

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
  const nodeList = profile.concepts
    .map(
      (node, nodeIndex) =>
        `- **${node}**：这是“${profile.focus}”的第 ${nodeIndex + 1} 个工程坐标；必须进入机制解释、运行轨迹或故障证据，不能只停在目录。`,
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
- 能区分${profile.terms.map(([term]) => term).join("、")}，并标出控制权、状态和副作用边界
- 能冻结输入与版本，沿以下证据定位首个分叉：${profile.evidence}
- 能注入“${profile.fault}”，完成阻断、恢复、复位和同输入重放

</Objectives>

{/* AI_AGENT_DEV_QUALITY_V2 */}

## 来源、课程身份与适用边界

“${profile.title}”以[Anthropic 公开全文《Building effective agents》](${PRIMARY})建立工程总纲，并用[${sourceLabel(profile.source)}](${profile.source})核对本章机制。

这不是一本名为《AI Agent 开发实战》的官方出版物，也不存在官方十四章目录。平台把公开工程文章、官方开发文档和原始论文重组为 14 个工程单元；下列 112 个节点是站内课程地图。正文、代码、图表、实验与练习均为独立教学重写，模型、API、协议或安全边界变化时必须重新验证。

## 本单元的八个工程坐标

${nodeList}

## 术语与运行合同

${renderTerms(profile)}

本页不变量是：${profile.invariant}。任何“成功”结论都要保存${profile.evidence}；模型自评、最终措辞和单次 demo 都不能替代环境事实。

## 工程机制与反证实验

${lessons}

## 从架构到故障重放

<Stepper>
  <Step title="1. 架构复杂度实验">
    在“${profile.title}”中切换简单基线、受控工作流和自主循环，先判断“${profile.focus}”是否真的需要更高自主性，再比较延迟、成本、可观测性与风险。

    <${base}ModelLab />

  </Step>
  <Step title="2. 逐阶段运行轨迹">
    固定模型、任务、工具、权限和预算，沿${profile.stages.join(" → ")}逐步推进；每个阶段只消费上一阶段已经验收的状态。

    <${base}TraceLab />

  </Step>
  <Step title="3. 单故障、恢复与复位">
    注入“${profile.fault}”，在${profile.evidence}中标记首个分叉；撤销故障后重置控件，用完全相同的输入和权限重放。

    <${base}EvidenceLab />

  </Step>
</Stepper>

## 最小可运行切片

\`\`\`ts
${profile.code}
\`\`\`

切片只表达“${profile.focus}”的核心合同。生产实现还要补齐持久化、超时、密钥隔离、结构化日志、幂等和批量评测；如果不能重新取得${profile.evidence}，代码跑通也不能证明机制正确。

<Callout type="trap" title="本章首要反例">
  ${profile.fault}。它会破坏“${profile.invariant}”；应从${profile.evidence}定位首个分叉，而不是追加提示词掩盖运行时缺陷。
</Callout>

<Callout type="trap" title="结果正确也可能轨迹错误">
  “${profile.title}”必须同时验收环境结果和完整轨迹。偶然得到正确文本，但发生越权调用、证据缺失、成本失控或错误停止，仍然是失败运行。
</Callout>

<Callout type="trap" title="升级后重新校准">
  模型、提示、工具、向量、协议或运行时变化都可能改变“${profile.focus}”的行为分布。升级后应在冻结任务集上重跑${profile.evidence}。
</Callout>

## 练习与答案

<Exercises>

**问题 1：最小证明。** 怎样用正常、边界和单故障三类样本证明“${profile.invariant}”？

<Answer>
  冻结模型、任务、工具、权限和预算，手工写出三类预期，再保存${profile.evidence}。任何未解释的首个分叉、未配对事件或失败副作用都应阻断通过。
</Answer>

**问题 2：节点覆盖。** ${profile.concepts.join("、")}如何从目录词变成工程证据？

<Answer>
  把八个坐标分别映射到架构决策、状态轨迹和故障重放。每个坐标至少对应一个可观察状态、一个确定性判断或一个反例；只出现在列表里不算掌握。
</Answer>

**问题 3：恢复验收。** 怎样证明“${profile.fault}”已经修复？

<Answer>
  保存正常基线，注入故障并在${profile.evidence}中标出首个差异；撤销后复位全部状态，用相同输入、版本、预算和权限重放。结果、轨迹与停止状态都回到基线才可交接。
</Answer>

</Exercises>

## 本章回顾

- “${profile.title}”解决的是${profile.focus}。
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
  workTitle="Anthropic Agent 工程资料与原始论文（站内十四单元开发课程改编）"
  adaptedUrl="${PRIMARY}"
/>`;

  return matter.stringify(body, {
    title: profile.title,
    type: profile.type,
    section: profile.section,
    order: profile.order,
    description: `${profile.title}：${profile.focus}，以架构、轨迹与故障重放完成工程验收。`,
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
  throw new Error("每个工程单元必须映射八个节点");

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
  { id: "anthropic-agents", title: "Building effective agents", url: PRIMARY },
  {
    id: "anthropic-context",
    title: "Effective context engineering for AI agents",
    url: CONTEXT,
  },
  { id: "claude-tool-use", title: "How tool use works", url: TOOL_USE },
  {
    id: "anthropic-tools",
    title: "Writing effective tools for AI agents",
    url: TOOLS,
  },
  { id: "react", title: "ReAct original paper", url: REACT },
  { id: "rag", title: "RAG original paper", url: RAG },
  { id: "lost-middle", title: "Lost in the Middle original paper", url: LOST },
  {
    id: "anthropic-multi-agent",
    title: "How we built our multi-agent research system",
    url: MULTI_AGENT,
  },
  {
    id: "anthropic-evals",
    title: "Demystifying evals for AI agents",
    url: EVALS,
  },
  {
    id: "anthropic-security",
    title: "Beyond permission prompts",
    url: SECURITY,
  },
  {
    id: "anthropic-managed-agents",
    title: "Scaling Managed Agents",
    url: PRODUCTION,
  },
];

manifestRoot.books[BOOK] = {
  version: 2,
  edition:
    "站内工程专题《AI Agent 开发实战》，基于 Anthropic 公开工程资料、Claude Platform 与原始论文重组",
  status: "verified-course-map",
  sourceKind: "official-full-text-curated-fourteen-unit-engineering-course",
  sourceUrl: PRIMARY,
  sourceAccess: "full-text-primary",
  sourceMode: "independent-rewrite",
  defaultSourceMode: "independent-rewrite",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "十四个单元与112个节点是站内课程编排，不是官方出版物或Anthropic原文目录；正文、代码、图表与练习为独立教学重写。",
  unitMappingEvidence: "quality/ai-agent-dev-v2-profiles.json",
  factSourcePolicy:
    "Agent总纲以Anthropic公开工程资料为主；ReAct、RAG与长上下文机制由原始论文核对，多Agent、评测、安全与部署由对应官方工程文章核对。",
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
    factSourceIds: ["anthropic-agents", sourceId(profile.source)],
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
        "14 units and 112 nodes are a platform-authored engineering course map, not an official book table of contents.",
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
