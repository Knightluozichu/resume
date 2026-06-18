/** 复习题库 · 工具提示工程：让 agent 会用工具而不是猜工具（agent-tool-prompt-engineering）。《AI 智能体应用开发》第 18 章，改编自 Anthropic《Building Effective Agents》Appendix 2。 */

import type { ReviewQuestion } from "./types";

export const agentToolPromptEngineeringQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-tpe-1",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "为什么说工具定义也是提示工程？",
    answer:
      "因为工具定义会进入模型上下文，模型会根据工具名称、description、参数 schema 和返回约定来决定要不要用、用哪个、参数怎么填、结果怎么解释。它不是只给后端看的接口文档，而是写给模型看的操作说明。",
    tags: ["工具定义", "基础"],
  },
  {
    id: "agent-tpe-2",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "一个 agent-ready 工具描述至少应该回答哪四类问题？",
    answer:
      "至少回答：什么时候应该用；什么时候不要用；调用前需要哪些证据或状态；调用后返回结果代表什么、下一步该怎么读。只写“能做什么”通常不够，因为模型还要区分相似工具和风险边界。",
    tags: ["description", "基础"],
  },
  {
    id: "agent-tpe-3",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "参数 schema 的作用是什么？",
    answer:
      "参数 schema 用字段名、类型、必填项、枚举、格式和说明约束模型怎么填参数。它的作用是消除歧义，减少把邮箱、订单号、工单号都塞进 `id`，或把任意文本填进高风险动作的情况。",
    tags: ["schema", "基础"],
  },
  {
    id: "agent-tpe-4",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "什么是工具结果语义（Tool result semantics）？",
    answer:
      '工具结果语义是返回字段背后的业务含义，以及模型读到结果后应该如何继续。例如 `confidence:"low"` 应该提示继续检索或转人工，`eligible:false` 应该阻止创建退款并解释原因。',
    tags: ["返回结果", "基础"],
  },
  {
    id: "agent-tpe-5",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "可恢复错误（Recoverable error）和裸错误码有什么差别？",
    answer:
      "裸错误码只告诉模型失败了，例如 `BAD_REQUEST`；可恢复错误会说明错在哪、能不能重试、该补哪个参数、可换哪个工具。它把失败变成下一轮决策输入，让 agent 有机会自救。",
    tags: ["错误返回", "基础"],
  },
  {
    id: "agent-tpe-6",
    chapter: "agent-tool-prompt-engineering",
    level: 1,
    question: "工具 eval 主要检查哪四件事？",
    answer:
      "主要检查：模型是否选对工具；参数是否完整且格式正确；工具结果是否被正确引用；错误返回是否引导出正确恢复动作。这些结果用来反推工具定义哪里需要迭代。",
    tags: ["eval", "基础"],
  },

  // —— Level 2 · 理解辨析 ——
  {
    id: "agent-tpe-7",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question: "为什么工具 description 不能只写“这个工具能做什么”？",
    answer:
      "因为模型选工具时还需要知道边界：什么时候用、什么时候不用、是否只读、是否会修改状态、和相似工具怎么区分。只写功能会留下猜测空间，尤其在订单查询、退款、知识库查询这类相似工具共存时更容易误选。",
    tags: ["description", "边界", "理解"],
  },
  {
    id: "agent-tpe-8",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question: "为什么“查询订单”和“创建退款申请”最好拆成两个工具？",
    answer:
      "因为查询是只读动作，创建退款是高风险写入动作。拆开后 description 和 schema 可以分别写清边界：查询工具不得退款，退款工具必须先有资格检查结果。这样模型不容易把普通查询误升级成危险动作。",
    tags: ["工具边界", "风险", "理解"],
  },
  {
    id: "agent-tpe-9",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question:
      "为什么 `id`、`query`、`payload` 这类万能字段会让 agent 更容易传错参数？",
    answer:
      "因为它们没有告诉模型字段到底代表什么。`id` 可能是订单号、用户号、工单号；`query` 可能是关键词、SQL、自然语言问题。改成 `order_id`、`customer_email`、`refund_reason` 并补格式说明，模型才知道该填什么。",
    tags: ["schema", "参数消歧", "理解"],
  },
  {
    id: "agent-tpe-10",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question: "工具返回 `eligible:false` 为什么不应该只是一个布尔值？",
    answer:
      "因为布尔值只说明结论，不说明原因和下一步。更好的返回应包含 `reason`、`policy_reference`、`next_options` 等字段，让模型知道不能退款的依据，以及可以向用户提供哪些替代方案。",
    tags: ["返回结果", "理解"],
  },
  {
    id: "agent-tpe-11",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question: "为什么工具错误信息也是下一轮 prompt 的一部分？",
    answer:
      "因为 agent 会把工具返回读进上下文，再决定下一步。错误信息如果只写 `500`，模型很难修正；如果写清缺少 `order_id`、可重试、可先调用 `search_orders_by_email`，模型就能按这条信息恢复。",
    tags: ["错误返回", "反馈循环", "理解"],
  },
  {
    id: "agent-tpe-12",
    chapter: "agent-tool-prompt-engineering",
    level: 2,
    question: "Anthropic 提到的 poka-yoke 思路用在工具参数上是什么意思？",
    answer:
      "意思是把工具参数设计得更不容易犯错。例如退款工具要求 `eligibility_check_id`，就把“先查退款资格”变成参数前置条件；再如要求绝对路径而不是相对路径，可以避免 agent 在目录变化后写错文件。",
    tags: ["poka-yoke", "schema", "理解"],
  },

  // —— Level 3 · 应用判断 ——
  {
    id: "agent-tpe-13",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question:
      "用户问“我的包裹现在在哪里？”你有 `get_order_status`、`check_refund_eligibility`、`create_refund_request` 三个工具。应选哪个？为什么？",
    answer:
      "应选 `get_order_status`。用户目标是查询物流/订单状态，是只读信息需求；还没有表达退款意图，也没有资格检查结果。此时调用退款资格或创建退款申请都会越界。",
    tags: ["工具选择", "订单查询", "应用"],
  },
  {
    id: "agent-tpe-14",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question:
      "用户问“这单还能不能退？”你会先调用退款动作工具吗？请说明正确流程。",
    answer:
      "不应先调用退款动作工具。正确流程是先用 `check_refund_eligibility` 判断资格，读取 `eligible`、`reason` 和政策依据；只有 `eligible=true` 且用户确认要退款时，才调用 `create_refund_request` 这类写入动作。",
    tags: ["退款", "何时用不用", "应用"],
  },
  {
    id: "agent-tpe-15",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question: "把工具描述“refund：给用户退款”改成更适合 agent 的描述。",
    answer:
      "可以改成：`在 check_refund_eligibility 返回 eligible=true 且用户确认退款后，为指定订单创建退款申请。不要用于查询退款政策、查询订单状态或判断是否可退款；高风险金额需要人工确认。` 这样写清了触发条件、排除条件、依赖前置结果和风险边界。",
    tags: ["description", "改写", "应用"],
  },
  {
    id: "agent-tpe-16",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question:
      "一个知识库查询工具返回了 20 篇原文全文，agent 回答经常跑偏。你会怎样改返回格式？",
    answer:
      "不要直接返回 20 篇全文。应返回结构化摘要，例如前 5 条命中、每条的 `title`、`snippet`、`confidence`、`source_url`、`policy_section`，再加是否需要扩大检索的提示。这样模型能抓重点，也不会被上下文噪声淹没。",
    tags: ["知识库", "返回格式", "应用"],
  },
  {
    id: "agent-tpe-17",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question:
      '工具失败返回 `{ ok:false, error:"INVALID_INPUT" }`。请改成可恢复错误。',
    answer:
      '可以改成：`{ ok:false, code:"ORDER_ID_FORMAT_INVALID", message:"order_id 必须形如 ORD-2026-00042。", retryable:true, fix:"请向用户确认订单号，或先调用 search_orders_by_email。" }`。重点是告诉模型错在哪、是否能重试、下一步怎么修。',
    tags: ["错误返回", "改写", "应用"],
  },
  {
    id: "agent-tpe-18",
    chapter: "agent-tool-prompt-engineering",
    level: 3,
    question:
      "你发现 agent 总在知识库问题上误用订单查询工具。工具定义上先排查哪几处？",
    answer:
      "先排查两个工具的 description 是否有明确边界：订单查询是否写清只用于已存在订单状态，知识库查询是否写清用于政策/FAQ/操作指南；再看参数 schema 是否把 `order_id` 和 `question` 区分开；最后看 eval 样本里是否覆盖了政策问题和订单问题的对照。",
    tags: ["误用诊断", "eval", "应用"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-tpe-19",
    chapter: "agent-tool-prompt-engineering",
    level: 4,
    question:
      "请为客服 agent 的三类工具（订单查询、退款资格检查、知识库查询）写一份工具提示工程检查清单。",
    answer:
      "检查清单可以包括：1. 每个工具 description 是否写清何时用和何时不用；2. 查询类工具是否明确只读，写入类工具是否标注风险和前置条件；3. 参数 schema 是否用具体字段名、必填项、枚举和格式消歧；4. 返回结果是否包含业务语义，例如原因、置信度、政策引用和下一步选项；5. 错误是否可恢复，包含 code、message、retryable、fix；6. eval 是否覆盖普通查询、政策问题、退款边界、缺参、格式错、低置信度和高风险动作。",
    tags: ["综合", "检查清单", "生产化"],
  },
  {
    id: "agent-tpe-20",
    chapter: "agent-tool-prompt-engineering",
    level: 4,
    question:
      "一个团队说：“工具 API 已经有 OpenAPI 文档，直接暴露给模型就行。”请结合本章反驳，并给出更稳做法。",
    answer:
      "反驳：OpenAPI 文档主要服务人类开发者和后端集成，不一定适合模型选择工具。它可能暴露内部字段、复用型 payload、含糊描述、过粗或过细的接口，也不一定写清何时不用、结果语义和可恢复错误。\n\n更稳做法是包一层 agent-ready 工具契约：按任务重命名工具，拆清只读和写入边界；用具体 schema、枚举和格式要求消歧；把返回值压缩成模型需要的业务字段；把错误改成可恢复结构；最后用 eval 样本测试模型是否选对、传对、读懂、错了能恢复。",
    tags: ["综合", "OpenAPI", "工具契约"],
  },
];
