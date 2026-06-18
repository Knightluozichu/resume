/** 复习题库 · 真实场景解剖：客服智能体与编码智能体为什么适合 agent（agent-agents-in-practice）。《AI 智能体应用开发》第 17 章，改编自 Anthropic《Building Effective Agents》。 */

import type { ReviewQuestion } from "./types";

export const agentAgentsInPracticeQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-aip-1",
    chapter: "agent-agents-in-practice",
    level: 1,
    question:
      "Anthropic Appendix 1 里列出的两个特别适合 agent 的真实场景是什么？",
    answer:
      "是客服（Customer support）和编码智能体（Coding agents）。它们都同时需要对话、工具动作、反馈循环、清晰成功标准和人工监督，所以比单纯问答更容易体现 agent 的价值。",
    tags: ["应用场景", "基础"],
  },
  {
    id: "agent-aip-2",
    chapter: "agent-agents-in-practice",
    level: 1,
    question: "普通聊天框和客服 agent 最核心的差别是什么？",
    answer:
      "普通聊天框主要生成回复，通常不直接读取业务系统、修改状态或验证结果；客服 agent 会在对话中选择工具，查订单、检索知识库、更新工单或发起受控动作，并根据结果判断是否解决。",
    tags: ["客服", "对比", "基础"],
  },
  {
    id: "agent-aip-3",
    chapter: "agent-agents-in-practice",
    level: 1,
    question: "为什么客服场景天然适合接入工具？",
    answer:
      "因为客服经常需要外部信息和动作，例如客户资料、订单历史、知识库文章、工单状态、退款规则。只靠语言回复很难真正办完问题，接入工具后才可能形成“查询-行动-反馈-完成”的闭环。",
    tags: ["客服", "工具", "基础"],
  },
  {
    id: "agent-aip-4",
    chapter: "agent-agents-in-practice",
    level: 1,
    question: "编码 agent 为什么特别依赖自动化测试？",
    answer:
      "因为测试、类型检查、lint 和运行结果能给 agent 提供可验证反馈。它写完补丁后可以跑测试，根据失败信息继续定位和修改，而不是只凭“看起来合理”就声称完成。",
    tags: ["编码", "测试", "基础"],
  },
  {
    id: "agent-aip-5",
    chapter: "agent-agents-in-practice",
    level: 1,
    question: "客服 agent 的解决率（Resolution rate）衡量的是什么？",
    answer:
      "解决率衡量用户问题是否被真正办完，而不是系统回复了多少条消息。它更接近客服 agent 的业务价值，因为用户要的是订单、退款、工单或账号问题被处理掉。",
    tags: ["指标", "客服", "基础"],
  },
  {
    id: "agent-aip-6",
    chapter: "agent-agents-in-practice",
    level: 1,
    question: "什么是人工接管（Human handoff）？",
    answer:
      "人工接管是在系统信心不足、超出权限、用户不满意、重复失败或风险变高时，把上下文交给人继续处理。它不是失败羞耻，而是生产系统必备的安全出口。",
    tags: ["人工接管", "安全", "基础"],
  },

  // —— Level 2 · 理解辨析 ——
  {
    id: "agent-aip-7",
    chapter: "agent-agents-in-practice",
    level: 2,
    question: "为什么“会聊天”不足以证明一个系统是生产可用的 agent？",
    answer:
      "因为生产可用的 agent 不只要生成自然语言，还要能在受控权限内调用工具、读取反馈、更新状态、验证结果，并在风险或不确定时暂停或转人工。只会聊天的系统可能解释得很好，但不会真正推进任务。",
    tags: ["辨析", "agent", "理解"],
  },
  {
    id: "agent-aip-8",
    chapter: "agent-agents-in-practice",
    level: 2,
    question: "为什么“调用了工具”也不一定形成了工具动作闭环？",
    answer:
      "如果工具结果没有进入下一轮状态更新和决策，工具只是装饰。工具动作闭环要求 action 产生可观察 result，result 被写回状态，然后影响下一步是继续查、执行动作、结束还是转人工。",
    tags: ["工具", "反馈", "理解"],
  },
  {
    id: "agent-aip-9",
    chapter: "agent-agents-in-practice",
    level: 2,
    question: "客服 agent 为什么不能只用“回复质量”做验收指标？",
    answer:
      "因为客服的目标不是写出漂亮回复，而是解决用户问题。回复质量可以是局部指标，但还要看解决率、误退款率、转人工率、平均处理时长、用户满意度等结果指标，否则系统可能说得好听却没有办成事。",
    tags: ["指标", "客服", "理解"],
  },
  {
    id: "agent-aip-10",
    chapter: "agent-agents-in-practice",
    level: 2,
    question: "为什么编码 agent 即使通过测试，也仍然需要人工 review？",
    answer:
      "自动化测试只能覆盖一部分可执行行为，不能完全判断架构方向、长期维护性、安全边界、产品意图和代码风格。测试让 agent 有反馈循环，人工 review 则检查更大的系统要求。",
    tags: ["编码", "review", "理解"],
  },
  {
    id: "agent-aip-11",
    chapter: "agent-agents-in-practice",
    level: 2,
    question: "客服和编码两个场景共同满足了哪些 agent 适配条件？",
    answer:
      "它们都有自然对话入口、可用工具、可观察反馈、相对清晰的成功标准，以及可以安排人工监督的风险节点。客服能看订单和解决率，编码能看测试和 diff；这让 agent 的每一步更容易被验证和接管。",
    tags: ["适配条件", "理解"],
  },

  // —— Level 3 · 应用判断 ——
  {
    id: "agent-aip-12",
    chapter: "agent-agents-in-practice",
    level: 3,
    question:
      "选型题：一个系统只需要回答“退货政策是什么”。应该做普通聊天框、固定脚本还是客服 agent？为什么？",
    answer:
      "普通聊天框或固定 workflow 就够。这个任务只需要检索政策并解释，不需要查订单、修改工单、发起退款，也不需要根据工具结果多轮决策。上客服 agent 会增加成本和风险，却没有明显收益。",
    tags: ["选型", "客服", "应用"],
  },
  {
    id: "agent-aip-13",
    chapter: "agent-agents-in-practice",
    level: 3,
    question:
      "选型题：用户说包裹没到，系统需要查订单、判断延误、更新工单，必要时补偿。为什么更像客服 agent？",
    answer:
      "因为下一步取决于实时业务状态和工具结果：先查订单，再看物流状态和政策，可能更新工单或触发补偿，并用是否解决来验收。它不是只生成说明，而是在受控权限内执行动作并读取反馈。",
    tags: ["选型", "客服", "工具动作"],
  },
  {
    id: "agent-aip-14",
    chapter: "agent-agents-in-practice",
    level: 3,
    question:
      "一个编码助手能生成补丁，但不会运行测试，也不会读取错误输出。上线前你会补哪些能力？",
    answer:
      "至少补读取仓库、运行相关测试或类型检查、解析失败输出、记录 diff、限制文件/命令权限、在重复失败或高风险修改时请求人工 review。否则它只是代码生成器，不是能利用反馈推进任务的编码 agent。",
    tags: ["编码", "测试", "应用"],
  },
  {
    id: "agent-aip-15",
    chapter: "agent-agents-in-practice",
    level: 3,
    question:
      "客服 agent 准备执行退款、改地址、关闭工单这类动作时，你会怎样设计检查点？",
    answer:
      "先按风险分层：低风险读取可以自动；中风险更新要记录证据和可回滚信息；退款、改地址、关闭工单等高风险动作默认暂停，展示用户请求、政策依据、工具结果和计划动作，让人或规则确认后再执行。",
    tags: ["检查点", "客服", "应用"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-aip-16",
    chapter: "agent-agents-in-practice",
    level: 4,
    question:
      "你要评审一个“客服 + 编码”双场景 agent 方案。请给出一套共同验收清单，说明哪些条件不满足就应该退回普通聊天框、固定脚本或透明 workflow。",
    answer:
      "共同验收清单可以包括：1. 是否真的需要运行时决策，还是固定脚本足够；2. 是否有清楚工具边界，工具结果是否写回状态并影响下一步；3. 是否有可验证反馈，客服看解决率、转人工率和误操作率，编码看测试、类型检查和 review 结果；4. 是否有检查点和人工接管，高风险动作默认暂停；5. 是否有停机条件、日志和可复现轨迹；6. 是否能证明复杂度带来的收益超过成本与延迟。\n\n如果只是解释 FAQ 或生成代码片段，退回普通聊天框即可；如果流程可预写，退回固定脚本或透明 workflow；如果没有工具动作闭环、没有测试/解决率、没有人工接管，就还不具备生产 agent 条件。",
    tags: ["综合", "验收清单", "生产化"],
  },
];
