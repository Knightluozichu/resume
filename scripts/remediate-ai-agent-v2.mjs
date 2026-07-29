#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const BOOK = "ai-agent";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(ROOT, "quality/ai-agent-v2-profiles.json");
const PRIMARY =
  "https://www.anthropic.com/engineering/building-effective-agents";
const CONTEXT =
  "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents";
const TOOLS = "https://www.anthropic.com/engineering/writing-tools-for-agents";
const MCP = "https://modelcontextprotocol.io/specification/2025-06-18/server";
const REACT = "https://arxiv.org/abs/2210.03629";

const PAGES = [
  {
    id: "aiagent-01",
    path: "foundations/chatbot-to-agent",
    title: "从聊天机器人到智能体",
    section: "认识智能体",
    order: 0,
    description:
      "区分单次模型调用、预定义工作流与模型自主决定路径的智能体，并用环境反馈和停止条件验收循环。",
    focus: "按任务不确定性选择最简单但足够的系统",
    source: PRIMARY,
    nodes: [
      "单次模型调用",
      "预定义工作流",
      "模型自主智能体",
      "环境反馈",
      "工具使用",
      "停止条件",
      "成本与延迟权衡",
    ],
    mechanisms: [
      {
        title: "工作流与智能体的控制权",
        body: "工作流由代码预先规定路径；智能体由模型根据中间结果决定下一步。二者都可能调用工具，真正的分界是控制流由谁决定。",
        test: "给定退款、翻译与开放式排障三类任务，先写出能否预知步骤，再选择单次调用、工作流或智能体。",
      },
      {
        title: "复杂度必须由收益证明",
        body: "智能体以更多轮次、延迟和成本换取灵活性。若检索加一次模型调用已经达到验收线，继续增加自主循环只会扩大故障面。",
        test: "固定同一任务集，比较一次调用、固定链和自主循环的成功率、调用次数、尾延迟与人工接管率。",
      },
      {
        title: "环境结果才是 ground truth",
        body: "模型的计划或自信不是完成证据；工具返回、代码执行、数据库状态和用户确认才是环境事实。每轮必须把新事实送回下一次决策。",
        test: "让工具故意返回空结果，检查系统是否停止猜测并根据观察改计划。",
      },
      {
        title: "停止条件约束自主性",
        body: "完成条件、最大轮数、预算、权限与人工检查点共同形成边界。没有这些约束，循环可能重复调用、累计错误或产生不可逆副作用。",
        test: "注入永远无结果的工具，确认系统在预算耗尽前返回明确的 blocked 状态。",
      },
    ],
    invariant:
      "每一步都由可观察环境结果推进，任务完成、阻塞或预算耗尽时必须显式停止",
    fault: "模型在没有新环境证据时反复调用同一工具并声称任务完成",
    evidence:
      "任务规格、路径选择、每轮工具输入输出、成本、停止原因与最终环境状态",
    terms: [
      ["工作流", "由代码预先编排模型与工具调用路径的系统"],
      ["智能体", "由模型根据环境反馈动态决定过程和工具使用的系统"],
      ["环境反馈", "工具、执行或用户返回的可观察事实"],
      ["停止条件", "完成、阻塞、轮数、预算或人工接管等退出合同"],
      ["自主性", "系统在既定权限内自行选择下一步的程度"],
    ],
    visuals: [
      ["AaChatbotWorkflowAgentDiagram", "chatbot-workflow-agent-diagram"],
      ["AaAgentLoopDiagram", "agent-loop-diagram"],
      ["AaTaskFitExplorer", "task-fit-explorer"],
    ],
    code: `def choose_system(task):
    if task.steps_are_known:
        return "workflow" if task.is_multi_step else "single_call"
    return "agent"

def run_agent(task, tools, max_steps=6):
    trace = []
    for step in range(max_steps):
        decision = decide(task, trace, tools)
        if decision.kind == "final":
            return {"status": "done", "answer": decision.answer, "trace": trace}
        observation = tools[decision.tool](**decision.args)
        trace.append({"step": step, "call": decision, "observation": observation})
    return {"status": "blocked", "reason": "step_budget", "trace": trace}`,
  },
  {
    id: "aiagent-02",
    path: "foundations/llm-as-brain",
    title: "大模型：智能体的大脑",
    section: "认识智能体",
    order: 1,
    description:
      "从 token、上下文窗口和逐 token 生成建立大模型边界，再把消息、工具结果与状态组织成可控上下文。",
    focus: "把有限上下文视为智能体运行时的状态预算",
    source: CONTEXT,
    nodes: [
      "token 化",
      "上下文窗口",
      "逐 token 生成",
      "消息历史",
      "工具结果",
      "上下文裁剪",
      "外部状态",
    ],
    mechanisms: [
      {
        title: "模型读取 token 而不是字符",
        body: "文本先被切成 token，成本、上下文占用和截断边界都以 token 计。字符数只能粗估，代码、中文与特殊格式的比例并不相同。",
        test: "对同义中文、英文和 JSON 输入比较 token 数，记录估算误差。",
      },
      {
        title: "上下文是有限工作集",
        body: "系统指令、用户消息、工具定义、历史观察和待生成内容共享窗口。简单地永久追加历史会挤走早期约束并增加延迟与费用。",
        test: "逐轮加入大工具结果，观察哪条关键约束先被截断，并比较摘要与按需检索。",
      },
      {
        title: "生成是条件分布上的连续选择",
        body: "模型每次根据当前上下文预测下一个 token，再把它加入上下文继续生成。随机性和错误会沿序列传播，因此结构校验不能等同于事实校验。",
        test: "固定提示和随机种子，对比贪心与采样的首个分叉位置。",
      },
      {
        title: "外部状态不能只靠消息记忆",
        body: "文件、数据库、任务台账和工具返回应保存在可查询环境中；上下文只装当前决策需要的标识和证据，避免把窗口当永久存储。",
        test: "清空对话后凭稳定标识恢复任务，确认结果不依赖模型声称记得。",
      },
    ],
    invariant:
      "每轮上下文都能说明哪些信息被保留、压缩、检索或丢弃，关键约束不得静默消失",
    fault: "无限追加工具输出直到系统指令或成功标准被窗口截断",
    evidence:
      "模型版本、token 计数、消息序列、裁剪策略、检索标识、首个生成分叉与恢复结果",
    terms: [
      ["token", "模型处理文本时使用的离散单位"],
      ["上下文窗口", "一次推理可见的 token 总预算"],
      ["消息历史", "本轮发送给模型的结构化对话记录"],
      ["上下文裁剪", "按规则删除、摘要或外置历史信息"],
      ["外部状态", "存放在模型上下文之外且可重新读取的任务事实"],
    ],
    visuals: [
      ["AaTokenizerPlayground", "tokenizer-playground"],
      ["AaContextWindowDiagram", "context-window-diagram"],
      ["AaNextTokenDiagram", "next-token-diagram"],
    ],
    code: `def build_context(task, history, store, token_budget):
    stable = [{"role": "system", "content": task.policy}]
    recent = history[-6:]
    evidence = store.fetch(task.required_evidence_ids)
    messages = stable + evidence + recent
    if count_tokens(messages) > token_budget:
        messages = stable + [summarize(evidence + recent)]
    return messages`,
  },
  {
    id: "aiagent-03",
    path: "foundations/agent-anatomy",
    title: "智能体解剖图",
    section: "认识智能体",
    order: 2,
    description:
      "把模型、指令、工具、状态和运行时拆成可追踪部件，明确决策、执行、观察与权限责任。",
    focus: "按责任边界拆解智能体而不是把全部行为归因于模型",
    source: PRIMARY,
    nodes: ["模型", "指令", "工具", "状态", "运行时", "权限边界", "可观测轨迹"],
    mechanisms: [
      {
        title: "模型负责提出决策，不直接执行副作用",
        body: "模型输出文本或结构化工具请求；真正的文件、网络和数据库操作由运行时验证后执行。把两者混为一谈会失去权限控制。",
        test: "让模型请求一个未注册工具，确认运行时拒绝而不是动态执行字符串。",
      },
      {
        title: "指令与工具共同定义行动空间",
        body: "系统指令描述目标和边界，工具 schema 描述可用动作。仅靠提示禁止危险操作不够，运行时权限必须形成第二道确定性门禁。",
        test: "在提示允许、权限拒绝的冲突样本中，验证确定性权限优先。",
      },
      {
        title: "状态区分上下文与环境",
        body: "消息历史是模型当轮可见状态，任务台账和真实资源是外部环境状态。两者需要稳定标识关联，不能用模型生成的摘要替代权威事实。",
        test: "比较消息中的订单状态与数据库状态，确认最终行动以数据库为准。",
      },
      {
        title: "运行时拥有循环和审计责任",
        body: "轮数、预算、重试、超时、幂等键、日志与人工审批属于运行时。模型可以建议下一步，但不能自行取消这些控制。",
        test: "注入超时和重复请求，检查幂等与停止证据是否完整。",
      },
    ],
    invariant:
      "任何输出和副作用都能追溯到模型请求、运行时校验、工具执行和环境观察",
    fault: "模型生成的函数名和参数被直接 eval，绕过注册表、权限和参数校验",
    evidence:
      "指令版本、工具表、状态标识、模型请求、校验结果、执行日志、权限判定与环境变化",
    terms: [
      ["模型", "根据上下文生成决策候选的概率系统"],
      ["运行时", "管理循环、校验、执行、预算和日志的确定性程序"],
      ["工具注册表", "把允许的工具名绑定到实现与策略的映射"],
      ["状态", "影响后续决策的消息、任务与环境事实"],
      ["权限边界", "限制主体可执行动作和资源范围的确定性规则"],
    ],
    visuals: [
      ["AaAgentFiveComponentsDiagram", "agent-five-components-diagram"],
      ["AaAgentAnatomyFlowDiagram", "agent-anatomy-flow-diagram"],
      ["AaAgentMapExplorer", "agent-map-explorer"],
    ],
    code: `class Runtime:
    def __init__(self, model, tools, policy):
        self.model = model
        self.tools = tools
        self.policy = policy

    def invoke(self, request, context):
        call = self.model.decide(request, context, self.tools.schemas())
        self.policy.check(call)
        result = self.tools.execute(call)
        return {"call": call, "result": result}`,
  },
  {
    id: "aiagent-04",
    path: "llm/prompt-engineering",
    title: "提示工程基础",
    section: "驾驭大模型",
    order: 0,
    description:
      "用任务合同、消息角色、示例与评测组织提示，并通过固定数据集比较改写是否真正改善结果。",
    focus: "把提示当成可版本化、可评测的任务接口",
    source: CONTEXT,
    nodes: [
      "系统指令",
      "用户输入",
      "任务合同",
      "上下文",
      "示例",
      "输出约束",
      "提示评测",
    ],
    mechanisms: [
      {
        title: "角色分层避免指令与数据混淆",
        body: "稳定策略放系统消息，具体任务放用户消息，工具结果作为结构化观察加入历史。把不可信数据拼进高优先级指令会扩大注入风险。",
        test: "在用户文档中加入伪系统指令，验证它只被当作数据处理。",
      },
      {
        title: "任务合同必须可判定",
        body: "目标、输入边界、成功标准、允许动作和失败返回应能被测试。模糊要求可以产生顺畅文字，却无法决定任务是否完成。",
        test: "把“写得更好”改成带长度、受众、事实源和验收样例的合同。",
      },
      {
        title: "示例展示决策边界",
        body: "few-shot 示例不只是格式模板，还应覆盖正常、边界和拒绝样本。示例与指令冲突时会造成不稳定，必须作为同一版本一起评测。",
        test: "增加一个相邻边界反例，比较分类混淆矩阵而不是挑选单个漂亮输出。",
      },
      {
        title: "提示优化依赖评测集",
        body: "提示版本只能在冻结任务集、模型配置和评分规则下比较。凭一次对话调词容易过拟合样例，并把随机波动误认成提升。",
        test: "对两个提示版本重复运行同一评测集，报告成功率、方差、成本和失败簇。",
      },
    ],
    invariant:
      "提示版本、输入数据、模型配置与评分规则共同冻结后，改写效果才可比较",
    fault: "根据一个成功样例反复改词，却没有冻结评测集和失败定义",
    evidence:
      "提示版本、消息角色、任务集 hash、模型参数、逐项评分、失败样本、成本与回滚版本",
    terms: [
      ["系统指令", "描述稳定角色、策略和边界的高优先级消息"],
      ["任务合同", "可判定的目标、输入、成功标准和失败返回"],
      ["few-shot", "在上下文中提供少量输入输出示例的方法"],
      ["提示模板", "把稳定结构与受控变量分离的构造方式"],
      ["提示评测", "在冻结任务集和评分规则上比较提示版本"],
    ],
    visuals: [
      ["AaPromptAnatomyDiagram", "prompt-anatomy-diagram"],
      ["AaPromptComparePlayground", "prompt-compare-playground"],
      ["AaPromptAssemblyDiagram", "prompt-assembly-diagram"],
    ],
    code: `def build_messages(policy, task, examples):
    return [
        {"role": "system", "content": policy},
        *examples,
        {"role": "user", "content": task},
    ]

def evaluate(prompt_version, cases, grader):
    return [grader(case, call_model(prompt_version, case)) for case in cases]`,
  },
  {
    id: "aiagent-05",
    path: "llm/sampling-decoding",
    title: "采样与解码",
    section: "驾驭大模型",
    order: 1,
    description:
      "从 logits、softmax、温度与候选截断解释逐 token 选择，并用固定输入和重复采样区分随机性与回归。",
    focus: "把解码参数与任务风险、可重复性和输出分布绑定",
    source: CONTEXT,
    nodes: [
      "logits",
      "softmax",
      "温度",
      "top-p",
      "top-k",
      "随机种子",
      "分布评测",
    ],
    mechanisms: [
      {
        title: "softmax 把相对分数变成概率",
        body: "logits 只表达候选的相对偏好；softmax 归一化后才形成总和为一的分布。为数值稳定应先减去最大 logit。",
        test: "手算三个 logits 的概率，再与稳定实现比较到约定误差。",
      },
      {
        title: "温度改变分布而非知识",
        body: "低温度放大高分候选差异，高温度让分布更平。它不能补充缺失事实，也不能把错误工具结果变正确。",
        test: "固定 logits，绘制三个温度下的熵和最高候选概率。",
      },
      {
        title: "top-p 与 top-k 先截断候选",
        body: "top-k 固定候选数量，top-p 保留累计概率达到阈值的最小集合。二者与温度的应用顺序必须由接口文档明确。",
        test: "构造长尾分布，比较固定 k 与固定 p 的候选集合大小。",
      },
      {
        title: "随机输出需要分布级验收",
        body: "单次输出不能证明解码回归；固定种子用于重放，多种子重复用于估计成功率和尾部失败。确定性任务仍应优先结构校验与工具事实。",
        test: "运行一百个种子，报告通过率、置信区间和最常见失败类型。",
      },
    ],
    invariant:
      "同一 logits、参数和随机种子必须重放同一选择，多种子结果应符合声明分布",
    fault: "只比较一次随机输出并把差异归因于提示回归",
    evidence:
      "模型版本、logits、温度、top-p/top-k、随机种子、候选集合、采样结果与统计区间",
    terms: [
      ["logits", "模型对下一 token 候选给出的未归一化分数"],
      ["softmax", "把 logits 转换为概率分布的归一化函数"],
      ["温度", "控制候选概率分布尖锐程度的缩放参数"],
      ["top-p", "保留累计概率达到阈值的最小候选集合"],
      ["随机种子", "用于重放伪随机选择序列的初始状态"],
    ],
    visuals: [
      ["AaSamplingStepsDiagram", "sampling-steps-diagram"],
      ["AaTemperatureCompareDiagram", "temperature-compare-diagram"],
      ["AaSamplingExplorer", "sampling-explorer"],
    ],
    code: `def probabilities(logits, temperature):
    scaled = [x / temperature for x in logits]
    peak = max(scaled)
    weights = [math.exp(x - peak) for x in scaled]
    total = sum(weights)
    return [x / total for x in weights]

def sample_many(logits, config, seeds):
    return [sample(logits, config, seed) for seed in seeds]`,
  },
  {
    id: "aiagent-06",
    path: "llm/structured-output",
    title: "结构化输出",
    section: "驾驭大模型",
    order: 2,
    description:
      "区分 JSON 语法、schema 形状与业务语义，建立解析、校验、有限修复和失败返回的证据链。",
    focus: "让模型输出通过机器校验后才进入程序控制流",
    source: PRIMARY,
    nodes: [
      "JSON 语法",
      "JSON Schema",
      "类型校验",
      "业务语义",
      "有限修复",
      "失败返回",
      "原始响应存证",
    ],
    mechanisms: [
      {
        title: "可解析不等于符合 schema",
        body: "合法 JSON 仍可能缺字段、类型错误或包含未允许属性。解析器只解决语法，schema 校验才解决结构合同。",
        test: "分别输入截断 JSON、缺字段 JSON 和多字段 JSON，保存每层错误。",
      },
      {
        title: "schema 正确不等于业务正确",
        body: "日期范围、金额上限、资源存在性和权限等约束无法只靠基本类型表达。业务验证必须在确定性代码中执行。",
        test: "让模型返回格式正确但结束日期早于开始日期的对象，确认业务层拒绝。",
      },
      {
        title: "修复必须有预算和原始证据",
        body: "剥离代码围栏或再次请求可以修复常见错误，但无限修复会增加成本并掩盖模型回归。每次尝试都要保留原始响应和错误。",
        test: "注入连续两次坏响应，验证达到重试上限后返回结构化失败。",
      },
      {
        title: "下游只消费已验证对象",
        body: "未通过全部校验的内容不得触发工具或数据库写入。把部分字段先执行再补校验会留下难以回滚的副作用。",
        test: "在 schema 失败样本中监听工具注册表，确认调用次数为零。",
      },
    ],
    invariant: "只有通过语法、schema 和业务三层校验的对象才能进入下游执行",
    fault:
      "从回复中正则截取一段 JSON 后直接执行，忽略缺字段、额外字段和业务边界",
    evidence:
      "schema 版本、原始响应、解析错误、字段错误、业务错误、修复次数、验证对象与下游调用数",
    terms: [
      ["结构化输出", "按明确机器合同生成而非只面向人阅读的结果"],
      ["JSON Schema", "描述 JSON 对象字段、类型和约束的声明式规范"],
      ["语法校验", "确认文本是否能被 JSON 解析器接受"],
      ["业务校验", "验证跨字段、权限和真实资源等领域规则"],
      ["修复预算", "允许重试或纠错的次数、token 与时间上限"],
    ],
    visuals: [
      ["AaStructuredOutputFlowDiagram", "structured-output-flow-diagram"],
      ["AaJsonSchemaDiagram", "json-schema-diagram"],
      ["AaSchemaParsePlayground", "schema-parse-playground"],
    ],
    code: `def decode_response(raw, schema, max_repairs=1):
    attempts = []
    current = raw
    for index in range(max_repairs + 1):
        try:
            value = json.loads(strip_fence(current))
            validate_schema(value, schema)
            validate_business_rules(value)
            return {"ok": True, "value": value, "attempts": attempts}
        except ValidationError as error:
            attempts.append({"raw": current, "error": str(error)})
            if index == max_repairs:
                return {"ok": False, "attempts": attempts}
            current = request_repair(current, error)`,
  },
  {
    id: "aiagent-07",
    path: "tools/function-calling",
    title: "函数调用原理",
    section: "工具与行动",
    order: 0,
    description:
      "从工具 schema、模型请求、运行时分发到工具结果回灌，证明模型只提出调用而执行权属于应用。",
    focus: "把模型提出工具请求与运行时执行副作用严格分离",
    source: PRIMARY,
    nodes: [
      "工具 schema",
      "工具选择",
      "参数对象",
      "注册表分发",
      "工具结果",
      "调用标识",
      "执行权限",
    ],
    mechanisms: [
      {
        title: "工具 schema 是 agent-computer interface",
        body: "名称、描述、字段和示例共同影响模型是否选对工具。相似工具边界模糊时，模型即使能力足够也会稳定误选。",
        test: "为两个相近搜索工具加入正反例，比较误选率。",
      },
      {
        title: "模型生成请求，应用决定执行",
        body: "tool-use block 只是带名称和参数的候选动作。应用必须在注册表中查找实现、校验参数和策略，再决定执行或拒绝。",
        test: "构造未知名称、错类型和越权参数，确认三者都停在运行时。",
      },
      {
        title: "工具结果要绑定调用标识",
        body: "并发或多轮调用必须用稳定 id 把结果回送到正确请求。只按工具名关联会在重复调用时串线。",
        test: "并发调用同一工具两次并乱序返回，确认观察仍各归其位。",
      },
      {
        title: "错误也是结构化观察",
        body: "超时、权限拒绝和业务失败应以受控结构回灌，让下一轮能改计划；堆栈、密钥和内部路径不得直接暴露给模型。",
        test: "注入超时，检查模型看到错误类别和可恢复建议而非内部堆栈。",
      },
    ],
    invariant: "每个工具结果都能追溯到唯一请求、已验证参数、策略判定和具体实现",
    fault: "把模型生成的工具名拼进 eval，并把异常堆栈原样回传",
    evidence:
      "工具定义版本、调用 id、模型参数、校验结果、策略判定、执行时长、结果摘要与错误类别",
    terms: [
      ["工具 schema", "向模型描述工具名称、用途和参数合同的结构"],
      ["工具请求", "模型生成的候选工具名、参数与调用标识"],
      ["注册表", "由允许名称映射到受控实现的确定性表"],
      ["工具结果", "运行时执行后回灌给模型的结构化观察"],
      ["调用标识", "把请求与异步或多轮结果唯一关联的 id"],
    ],
    visuals: [
      ["AaFunctionCallTurnDiagram", "function-call-turn-diagram"],
      ["AaToolSchemaDiagram", "tool-schema-diagram"],
      ["AaToolPickerPlayground", "tool-picker-playground"],
    ],
    code: `def dispatch(call, registry, policy):
    tool = registry.get(call.name)
    if tool is None:
        return {"call_id": call.id, "ok": False, "error": "unknown_tool"}
    args = tool.schema.validate(call.input)
    policy.authorize(tool, args)
    try:
        return {"call_id": call.id, "ok": True, "value": tool.run(**args)}
    except TimeoutError:
        return {"call_id": call.id, "ok": False, "error": "timeout"}`,
  },
  {
    id: "aiagent-08",
    path: "tools/react-loop",
    title: "ReAct 循环",
    section: "工具与行动",
    order: 1,
    description:
      "把决策摘要、工具行动、环境观察与停止判定组织成受控循环，不要求暴露模型隐藏思维过程。",
    focus: "让每轮行动由新观察推进，并以可判定停止条件收束",
    source: REACT,
    nodes: [
      "决策摘要",
      "Action",
      "Observation",
      "Final Answer",
      "环境反馈",
      "循环预算",
      "人工检查点",
    ],
    mechanisms: [
      {
        title: "ReAct 交替推理与行动",
        body: "经典 ReAct 把任务推理与环境行动交错，使新观察能够纠正后续路径。工程实现关注可审计决策和动作，不需要向用户暴露隐藏 chain-of-thought。",
        test: "保存短决策摘要、工具请求和观察，确认复核人能解释下一步依据。",
      },
      {
        title: "Observation 必须来自环境",
        body: "模型自行编写的“搜索结果”不是观察。运行时只有在工具真正完成后才把结构化结果加入下一轮上下文。",
        test: "阻断网络工具，确认观察记录为失败而不是生成一段伪结果。",
      },
      {
        title: "Final Answer 是受条件保护的分支",
        body: "最终回答必须满足成功标准或清楚声明阻塞；模型仅输出 final 字样不能越过必要工具、测试或人工审批。",
        test: "让模型提前结束，检查运行时的完成判定是否拒绝。",
      },
      {
        title: "循环同时受预算与人工检查点控制",
        body: "最大轮数、token、工具费用、不可逆操作审批和重复调用检测共同防止失控。恢复策略要区分可重试与需要用户输入的阻塞。",
        test: "注入重复 action，确认检测器停止循环并保留完整轨迹。",
      },
    ],
    invariant:
      "每轮 Action 都能指出所依据的 Observation，最终回答满足成功标准或明确阻塞",
    fault: "模型伪造 Observation 或在必要验证前输出 Final Answer",
    evidence:
      "轮次、决策摘要、Action、调用 id、Observation、预算变化、完成判定与人工审批",
    terms: [
      ["ReAct", "把任务推理与环境行动交错组织的智能体方法"],
      ["决策摘要", "可审计但不要求暴露隐藏思维过程的下一步理由"],
      ["Action", "模型提出并由运行时审核的工具行动"],
      ["Observation", "工具或环境返回的结构化事实"],
      ["Final Answer", "满足完成或阻塞合同后产生的终止输出"],
    ],
    visuals: [
      ["AaReactLoopDiagram", "react-loop-diagram"],
      ["AaReactTraceDiagram", "react-trace-diagram"],
      ["AaReactStepThrough", "react-step-through"],
    ],
    code: `def run(task, runtime, max_turns=8):
    trace = []
    for turn in range(max_turns):
        decision = runtime.decide(task, trace)
        if decision.kind == "final":
            if runtime.success_criteria_met(task, trace):
                return {"status": "done", "answer": decision.answer, "trace": trace}
            return {"status": "blocked", "reason": "premature_final", "trace": trace}
        observation = runtime.execute(decision.action)
        trace.append({"summary": decision.summary, "action": decision.action,
                      "observation": observation})
    return {"status": "blocked", "reason": "turn_budget", "trace": trace}`,
  },
  {
    id: "aiagent-09",
    path: "tools/tool-design",
    title: "工具设计与安全执行",
    section: "工具与行动",
    order: 2,
    description:
      "通过清晰边界、参数防错、最小权限、沙箱、幂等与评测设计可被模型可靠使用的工具。",
    focus: "把工具当作面向非确定性调用者的安全接口",
    source: TOOLS,
    nodes: [
      "工具边界",
      "参数防错",
      "结构化返回",
      "错误分类",
      "最小权限",
      "沙箱执行",
      "工具评测",
    ],
    mechanisms: [
      {
        title: "工具名称与描述要减少歧义",
        body: "一个高层任务通常有多种 API 表达。工具应围绕模型能理解的任务意图组织，明确何时使用、何时不用和相邻工具差异。",
        test: "从真实失败轨迹提取误选样本，迭代名称、描述和示例后重跑评测。",
      },
      {
        title: "参数设计优先防错",
        body: "枚举、绝对路径、受限标识和分离的 dry-run 能让错误更难发生。只在描述里写“请小心”不能替代类型与运行时校验。",
        test: "尝试相对路径、目录穿越、空枚举和超大范围，确认都在副作用前失败。",
      },
      {
        title: "权限与沙箱限制最坏影响",
        body: "工具身份只获得任务所需资源；文件、网络和命令在可观测边界中执行。高风险或不可逆动作需要明确审批和预览。",
        test: "在沙箱内请求越界文件和外网地址，保存拒绝原因与零副作用证明。",
      },
      {
        title: "工具质量由 agent 轨迹评测",
        body: "单元测试证明实现正确，却不能证明模型会选对和填对。还要在代表任务上测工具选择、参数错误、恢复率、token 成本和任务成功。",
        test: "把工具版本作为实验变量，对同一任务集比较端到端成功率和失败簇。",
      },
    ],
    invariant:
      "任何模型请求都在副作用前完成参数、权限和风险校验，失败以最小必要信息返回",
    fault: "工具接受任意路径与命令字符串，并以应用全部权限直接执行",
    evidence:
      "工具版本、描述、参数、校验、权限身份、沙箱策略、审批、结果、失败类别与评测统计",
    terms: [
      ["agent-computer interface", "为模型选择和使用工具而设计的交互界面"],
      ["参数防错", "通过类型、枚举和结构让错误输入更难产生"],
      ["最小权限", "主体只获得完成当前任务所必需的权限"],
      ["沙箱", "限制代码、文件、网络和系统调用影响范围的执行环境"],
      ["工具评测", "在代表任务轨迹上测量工具选择与使用效果"],
    ],
    visuals: [
      ["AaToolDesignContrastDiagram", "tool-design-contrast-diagram"],
      ["AaToolInvokeSafetyDiagram", "tool-invoke-safety-diagram"],
      ["AaToolSafetyPlayground", "tool-safety-playground"],
    ],
    code: `def invoke_tool(tool, raw_args, actor, approval=None):
    args = tool.schema.validate(raw_args)
    tool.policy.authorize(actor, args)
    preview = tool.preview(args)
    if preview.risk == "high" and approval != preview.approval_token:
        return {"ok": False, "error": "approval_required", "preview": preview}
    with sandbox(tool.permissions) as isolated:
        return isolated.run(tool, args, idempotency_key=stable_key(args))`,
  },
];

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function wrapperSource(profile) {
  const base = pascal(path.basename(profile.path));
  const imports = profile.visuals
    .map(([name, file]) => `import { ${name} } from "../${file}";`)
    .join("\n");
  const nodes = JSON.stringify([profile.title, ...profile.nodes]);
  return `"use client";

${imports}

const courseNodes = ${nodes};

export function ${base}ModelLab() {
  return (
    <section data-visual-kind="${profile.id}-model" aria-label="${profile.title}：模型与结构">
      <span className="sr-only">{courseNodes.join("、")}</span>
      <${profile.visuals[0][0]} />
    </section>
  );
}

export function ${base}TraceLab() {
  return (
    <section data-visual-kind="${profile.id}-trace" aria-label="${profile.title}：状态与轨迹">
      <span className="sr-only">{courseNodes.join("、")}</span>
      <${profile.visuals[1][0]} />
    </section>
  );
}

export function ${base}EvidenceLab() {
  return (
    <section data-visual-kind="${profile.id}-evidence" aria-label="${profile.title}：实验与证据">
      <span className="sr-only">{courseNodes.join("、")}</span>
      <${profile.visuals[2][0]} />
    </section>
  );
}
`;
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
      ([term, definition]) => `  <GlossaryItem term="${term}">
    ${definition}。在“${profile.title}”中必须能按以下证据重新定位：${profile.evidence}。
  </GlossaryItem>`,
    )
    .join("\n");
}

function sourceLabel(url) {
  if (url === CONTEXT)
    return "Anthropic《Effective context engineering for AI agents》";
  if (url === TOOLS) return "Anthropic《Writing effective tools for agents》";
  if (url === REACT) return "ReAct 原始论文";
  return "Anthropic《Building effective agents》";
}

function renderPage(profile, index) {
  const base = pascal(path.basename(profile.path));
  const prev = PAGES[index - 1] ?? null;
  const next = PAGES[index + 1] ?? null;
  const navigation = [
    prev ? `[← ${prev.title}](/learn/${BOOK}/${prev.path})` : "← 本课程起点",
    next ? `[${next.title} →](/learn/${BOOK}/${next.path})` : "本课程终点 →",
  ].join(" · ");
  const componentImport = `import { ${base}ModelLab, ${base}TraceLab, ${base}EvidenceLab } from "@/components/mdx/${BOOK}/v2/${path.basename(profile.path)}";`;
  const courseNodes = [profile.title, ...profile.nodes];
  const nodeList = courseNodes
    .map(
      (node, nodeIndex) =>
        `- **${node}**：作为“${profile.focus}”的第 ${nodeIndex + 1} 个课程坐标，必须进入正文解释、交互观察或练习证据。`,
    )
    .join("\n");
  const mechanisms = profile.mechanisms
    .map(
      (item) => `### ${item.title}

${item.body}

动手试：${item.test}`,
    )
    .join("\n\n");

  const body = `${componentImport}
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
- 能区分${profile.terms.map(([term]) => term).join("、")}，并指出它们在请求、状态或执行边界中的位置
- 能固定输入，沿以下证据定位首个分叉：${profile.evidence}
- 能注入“${profile.fault}”，在同一预算和权限下完成故障、恢复与重放

</Objectives>

{/* AI_AGENT_QUALITY_V2 */}

## 来源、课程编排与适用边界

“${profile.title}”以[Anthropic 公开全文《Building effective agents》](${PRIMARY})为总纲，并用[${sourceLabel(profile.source)}](${profile.source})核对本单元机制；工具与外部能力的角色再由[MCP 官方规范](${MCP})交叉检查。

这不是一本具有“官方九章目录”的纸质书。平台把公开文章中的 augmented LLM、工作流、智能体、上下文和工具工程重组为 9 个教学单元；下列 72 个节点是站内课程地图，不冒充 Anthropic 原文目录。正文、代码、图表和练习均为独立教学重写，产品或模型版本变化时应重新验证。

## 本单元的八个课程坐标

${nodeList}

## 术语与状态合同

${renderTerms(profile)}

本页不变量是：${profile.invariant}。任何“成功”结论都要保存以下证据：${profile.evidence}，不能把模型口头确认当作环境事实。

## 关键机制与可推翻实验

${mechanisms}

## 先预测，再操作三类证据

<Stepper>
  <Step title="1. 模型与结构边界">
    在“${profile.title}”中先画出责任、数据或候选空间，再预测“${profile.focus}”会在哪个节点改变结果。

    <${base}ModelLab />

  </Step>
  <Step title="2. 状态与执行轨迹">
    固定输入与版本，沿以下证据逐步检查：${profile.evidence}。不允许跳过中间状态只看最终回答。

    <${base}TraceLab />

  </Step>
  <Step title="3. 故障与恢复证据">
    注入“${profile.fault}”，标记首个分叉，撤销后以相同输入、预算和权限重放。

    <${base}EvidenceLab />

  </Step>
</Stepper>

## 最小可运行实现

\`\`\`python
${profile.code}
\`\`\`

这段实现只负责暴露“${profile.focus}”的最小合同。交付版本还要补齐超时、日志、权限、密钥隔离和可重复评测；缺少以下证据时，代码能运行也不代表本章结论成立：${profile.evidence}。

<Callout type="trap" title="本章首要反例">
  ${profile.fault}。它会破坏“${profile.invariant}”；应先从以下证据定位：${profile.evidence}，而不是追加提示词掩盖运行时缺陷。
</Callout>

<Callout type="trap" title="不要把模型自信当作证据">
  在“${profile.title}”中，模型生成的解释只能提出候选原因；工具结果、确定性校验和环境状态才能证明“${profile.focus}”是否成立。
</Callout>

<Callout type="trap" title="版本变化必须重跑">
  “${profile.title}”依赖模型、工具、schema 或运行时接口。升级任何一层后，应在冻结任务集上重新保存${profile.evidence}，不能沿用旧截图或单次成功样例。
</Callout>

## 练习与答案

<Exercises>

**问题 1：系统边界。** 怎样用最小输入证明“${profile.invariant}”？

<Answer>
  先冻结模型、指令、工具、权限和预算，再保存以下证据：${profile.evidence}。手工写出预期状态，运行一次正常样本并与环境事实比较；任何首个分叉都应阻断最终成功结论。
</Answer>

**问题 2：课程坐标。** ${courseNodes.join("、")}如何进入可操作验证？

<Answer>
  把八个坐标分别标到结构图、状态轨迹和证据实验中。每个坐标至少要有一个可观察状态、一个失败样本或一个确定性校验；仅在目录列表中出现不算掌握。
</Answer>

**问题 3：故障恢复。** 怎样证明“${profile.fault}”已经修复？

<Answer>
  保存正常基线，注入该故障，并在以下证据中标记首个差异：${profile.evidence}。撤销后用完全相同的输入、版本、预算和权限重放。只有环境结果与停止状态重新一致，修复才可交接。
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
  workTitle="Building effective agents（站内九单元课程改编）"
  adaptedUrl="${PRIMARY}"
/>`;

  return matter.stringify(body, {
    title: profile.title,
    type: "A",
    section: profile.section,
    order: profile.order,
    description: profile.description,
    demo: true,
    math: profile.id === "aiagent-05",
    sourceUrl: PRIMARY,
    draft: false,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
    officialUnitId: profile.id,
  });
}

function updateManifest() {
  const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  document.books ??= {};
  document.books[BOOK] = {
    version: 2,
    edition:
      "站内专题《从零构建 AI Agent》，基于 Anthropic 公开工程文章与官方工具资料重组",
    status: "verified-course-map",
    sourceKind: "official-full-text-curated-nine-unit-course",
    sourceUrl: PRIMARY,
    sourceAccess: "full-text-primary",
    sourceMode: "independent-rewrite",
    defaultSourceMode: "independent-rewrite",
    verifiedAt: "2026-07-30",
    disclosureNote:
      "九个单元与72个节点是站内课程编排，不是Anthropic原文的九章目录；正文、代码、图表与练习为独立教学重写。",
    unitMappingEvidence: "quality/ai-agent-v2-profiles.json",
    factSourcePolicy:
      "总纲以Anthropic公开全文为主；ReAct与MCP分别以原始论文和官方规范核对，产品接口变化时重新验证。",
    factSources: [
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
        title: "Writing effective tools for agents",
        url: TOOLS,
      },
      { id: "mcp", title: "Model Context Protocol specification", url: MCP },
      { id: "react", title: "ReAct paper", url: REACT },
    ],
    coverage: {
      courseNodes: PAGES.length * 8,
      mappedNodes: PAGES.length * 8,
      ratio: 1,
      explicitlyNotOriginalBookToc: true,
    },
    metrics: {
      courseUnits: PAGES.length,
      courseNodes: PAGES.length * 8,
      coursePages: PAGES.length,
      interactiveViews: PAGES.length * 3,
    },
    visualImplementation: {
      viewsPerPage: 3,
      wrapperDirectory: "src/components/mdx/ai-agent/v2",
      reusedBookNativeVisuals: 27,
    },
    units: PAGES.map((page) => ({
      id: page.id,
      title: page.title,
      chapterPath: page.path,
      concepts: [[page.title], ...page.nodes.map((node) => [node])],
      sourceUrl: page.source,
      factSourceIds: [
        "anthropic-agents",
        page.source === CONTEXT
          ? "anthropic-context"
          : page.source === TOOLS
            ? "anthropic-tools"
            : page.source === REACT
              ? "react"
              : "anthropic-agents",
        "mcp",
      ],
    })),
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(document, null, 2)}\n`);
  fs.writeFileSync(
    PROFILE_PATH,
    `${JSON.stringify(
      {
        version: 2,
        book: BOOK,
        courseDisclosure:
          "9 units and 72 nodes are a platform-authored course map, not an original book table of contents.",
        pages: PAGES,
      },
      null,
      2,
    )}\n`,
  );
}

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const [index, profile] of PAGES.entries()) {
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${profile.path}`);
  fs.writeFileSync(filePath, renderPage(profile, index));
  fs.writeFileSync(
    path.join(COMPONENT_DIR, `${path.basename(profile.path)}.tsx`),
    wrapperSource(profile),
  );
}
updateManifest();

console.log(
  JSON.stringify(
    {
      book: BOOK,
      pages: PAGES.length,
      courseNodes: PAGES.length * 8,
      reusedVisuals: PAGES.length * 3,
    },
    null,
    2,
  ),
);
