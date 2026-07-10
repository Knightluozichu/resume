import type { ReviewQuestion } from "./types";

export const cgptPluginToolsQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-plugin-tools-1",
    chapter: "cgpt-plugin-tools",
    level: 1,
    question: `Function Calling 的工作流程是怎样的？它比让模型自己输出文本有什么优势？`,
    answer:
      `Function Calling 流程：①应用声明可用工具（name、description、parameters 的 JSON Schema）。②用户提问传入模型。③模型推理判断需要调用哪个工具，输出结构化的工具名和参数。④应用拿到参数调用真实函数。⑤把函数返回值回传模型。⑥模型基于结果继续推理或给出最终答案。优势：①结构化输出，无需正则解析模型文本，可靠不翻车。②模型只负责决策「调什么、传什么」，应用负责执行，职责清晰。③参数格式由 Schema 约束，类型安全。④支持并行调用多个工具降低延迟。这是工具调用的工业标准方式。`,
    tags: ["Function Calling", "工具调用", "结构化输出"],
  },
  {
    id: "cgpt-plugin-tools-2",
    chapter: "cgpt-plugin-tools",
    level: 2,
    question: `工具调用循环（Thought-Action-Observation）是如何终止的？如何防止无限循环？`,
    answer:
      `终止条件：①模型判断信息已充足，输出最终答案不再请求工具。②达到最大迭代次数限制（max_iterations）。③工具执行出错且无重试价值。防止无限循环：①设 max_iterations（如 10），到上限强制停止并返回当前结果。②设超时限制单次工具调用时长。③工具描述要清晰，让模型准确判断是否真需要调用，减少无意义调用。④handle_parsing_errors 处理模型输出格式错误，避免卡死。⑤观察结果回传后给模型明确信号「信息已足够，请直接回答」。工程上必须设兜底，不能信任模型一定自行终止。`,
    tags: ["工具循环", "终止条件", "max_iterations"],
  },
  {
    id: "cgpt-plugin-tools-3",
    chapter: "cgpt-plugin-tools",
    level: 2,
    question: `设计工具时，工具的 description 和 parameters 为什么至关重要？`,
    answer:
      `模型选工具完全依赖 description 和 parameters 描述，因为它看不到工具的实现代码。①description 决定模型「何时」调用——必须清晰说明工具用途、适用场景、不适用场景，模糊描述导致误调或漏调。②parameters 决定模型「怎么」调用——每个参数的类型、含义、是否必填、取值范围都要在 JSON Schema 写清楚，模型据此填充参数。设计原则：description 用动词开头说清做什么；参数命名自解释；加 enum 限制取值；必填项标注清楚。工具设计质量直接决定调用成功率，是 Agent 工程的核心技能。`,
    tags: ["工具设计", "description", "parameters", "JSON Schema"],
  },
  {
    id: "cgpt-plugin-tools-4",
    chapter: "cgpt-plugin-tools",
    level: 3,
    question: `构建一个能查天气、订机票、发邮件的助手，工具调用系统如何设计？安全如何保障？`,
    answer:
      `工具设计：①get_weather(location, date)——查天气 API。②search_flights(from, to, date)——查航班。③book_flight(flight_id, passenger)——订机票（需确认）。④send_email(to, subject, body)——发邮件。Agent 用 Function Calling 循环，系统提示设定助手角色。流程：用户问「明天北京天气如何，适合出行的话帮我订去上海的机票」→ 模型先调 get_weather → 观察天气好 → 调 search_flights → 选航班 → book_flight 前需用户确认 → 订票后可选 send_email 发凭证。安全：①高风险工具（订票、发邮件）加确认环节，模型不能擅自执行。②参数校验防注入。③权限校验只允许操作本人资源。④工具执行沙箱隔离。⑤全程日志可审计。⑥敏感操作限频。`,
    tags: ["工具系统设计", "安全", "确认机制", "综合应用"],
  },
];
