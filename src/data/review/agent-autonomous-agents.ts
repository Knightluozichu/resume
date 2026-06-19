/** 复习题库 · 自主智能体：让模型在环境反馈里自己推进任务（agent-autonomous-agents）。《AI 智能体应用开发》第 15 章，改编自 Anthropic《Building Effective Agents》。 */

import type { ReviewQuestion } from "./types";

export const agentAutonomousAgentsQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-aa-1",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "一句话说清：什么是自主智能体（Autonomous agent）？",
    answer:
      "自主智能体是让模型在一个循环里，根据当前目标、工具结果和环境反馈，自己决定下一步做什么、是否继续、什么时候停下的系统。它适合开放、多步、路径难以提前写死的任务。",
    tags: ["自主智能体", "基础"],
  },
  {
    id: "agent-aa-2",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "固定工作流和自主智能体最大的结构差别是什么？",
    answer:
      "固定工作流的步骤、分支和停点由人提前写好，模型只在预设槽位里工作；自主智能体会在运行中读取反馈、选择工具、观察结果，再决定下一步。一个是“按写好的路走”，一个是“边看路况边走”。",
    tags: ["固定工作流", "对比", "基础"],
  },
  {
    id: "agent-aa-3",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "Anthropic 建议 agents 主要用于什么类型的任务？",
    answer:
      "主要用于开放、多步、难以预写固定路径的任务。这类任务的下一步往往取决于刚刚拿到的环境反馈，例如工具返回值、测试结果、网页内容、日志或文件 diff。",
    tags: ["适用场景", "基础"],
  },
  {
    id: "agent-aa-4",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "环境反馈在 agent loop 里起什么作用？",
    answer:
      "环境反馈是 agent 判断下一步的依据。没有反馈，系统只是反复自我改写；有了日志、测试、检索结果、工具返回值等新信息，模型才能知道刚才的行动是否有效，并调整下一步。",
    tags: ["环境反馈", "基础"],
  },
  {
    id: "agent-aa-5",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "真实标准（Ground truth）为什么重要？",
    answer:
      "真实标准用来判断当前行动是否真的更接近目标，例如测试是否通过、事实来源是否可靠、业务规则是否满足或人工是否确认。没有它，agent 很容易把“听起来合理”误当成“问题已解决”。",
    tags: ["ground truth", "基础"],
  },
  {
    id: "agent-aa-6",
    chapter: "agent-autonomous-agents",
    level: 1,
    question: "自主智能体上线前至少要准备哪些安全边界？",
    answer:
      "至少要准备停机条件、沙盒、护栏和人工检查点。停机条件防止无限探索；沙盒限制可破坏范围；护栏拦截危险动作和越权行为；人工检查点负责高风险节点的确认。",
    tags: ["安全", "停机条件", "基础"],
  },

  // —— Level 2 · 理解辨析 ——
  {
    id: "agent-aa-7",
    chapter: "agent-autonomous-agents",
    level: 2,
    question: "为什么说“循环调用模型”不等于自主智能体？",
    answer:
      "因为关键不在循环次数，而在每一轮是否根据外部反馈推进任务。评估-优化也有循环，但它通常在固定 rubric 下打磨同一份输出；如果系统只是反复让模型自我反思，没有读取工具结果、测试结果或新证据，那只是自嗨循环，不是能推进开放任务的 agent。",
    tags: ["辨析", "环境反馈", "理解"],
  },
  {
    id: "agent-aa-8",
    chapter: "agent-autonomous-agents",
    level: 2,
    question: "为什么固定工作流通常应该是工程默认值？",
    answer:
      "因为固定工作流更便宜、更快、更容易测试和复现。只要任务路线能提前写清，固定步骤、路由、并行或评估-优化往往更稳。Agent 的自由度会带来额外成本、延迟和错误累积，所以只有固定骨架确实不够时，才值得放权。",
    tags: ["工程取舍", "固定工作流", "理解"],
  },
  {
    id: "agent-aa-9",
    chapter: "agent-autonomous-agents",
    level: 2,
    question: "为什么没有环境反馈的 agent loop 容易变成“自嗨循环”？",
    answer:
      "因为模型没有拿到新证据，只是在旧上下文里换说法。它看起来像在反思和规划，但并没有通过工具、测试、日志或检索结果缩小问题范围。要避免这个问题，可以要求每轮必须消费一个外部结果，或明确说明为什么可以结束。",
    tags: ["误区", "环境反馈", "理解"],
  },
  {
    id: "agent-aa-10",
    chapter: "agent-autonomous-agents",
    level: 2,
    question: "为什么自主智能体必须有停机条件？",
    answer:
      "因为开放探索天然会诱发“再查一下、再试一次”。没有停机条件，系统可能在同一问题上无限消耗 token、时间和工具调用。明确的最大步数、预算上限、目标达成、重复失败和人工接管条件，是把 agent 留在可控范围内的关键。",
    tags: ["停机条件", "理解"],
  },
  {
    id: "agent-aa-11",
    chapter: "agent-autonomous-agents",
    level: 2,
    question: "为什么说 agent 的代价不只是“多花一点 token”？",
    answer:
      "因为 agent 往往会多轮调用工具和模型，带来更高成本与更长延迟；同时每一步判断都可能出错，错误还会被带入后续决策，形成错误累积。若权限没限制，错误甚至会影响文件、数据或外部系统。",
    tags: ["成本", "风险", "理解"],
  },

  // —— Level 3 · 应用判断（含选型）——
  {
    id: "agent-aa-12",
    chapter: "agent-autonomous-agents",
    level: 3,
    question:
      "选型题：每天凌晨检查五个固定服务是否健康，并生成一条状态报告。更适合固定工作流还是自主智能体？为什么？",
    answer:
      "更适合固定工作流。检查对象、步骤、阈值和输出格式都能提前写清，甚至可以并行检查五个服务再汇总。硬上自主智能体只会增加成本、延迟和不确定性，并不会带来真正的探索价值。",
    tags: ["选型", "固定工作流", "应用"],
  },
  {
    id: "agent-aa-13",
    chapter: "agent-autonomous-agents",
    level: 3,
    question:
      "选型题：用户偶发支付失败，团队不知道根因在日志、配置、数据库连接、近期发布还是第三方接口。更适合固定工作流还是自主智能体？前提是什么？",
    answer:
      "更适合考虑自主智能体，因为下一步要查什么高度依赖刚拿到的线索，路径难以预写。前提是要有可靠反馈和真实标准，例如日志、测试、可复现实验、事实来源；同时要设停机条件、沙盒、工具权限、人工检查点和护栏。",
    tags: ["选型", "开放任务", "应用"],
  },
  {
    id: "agent-aa-14",
    chapter: "agent-autonomous-agents",
    level: 3,
    question:
      "一个 agent 准备执行 `writeFile`、`deploy`、`sendEmail` 这类动作，你应该怎样设计权限策略？",
    answer:
      "把这类动作列为高风险动作，默认要求人工检查点，而不是让 agent 直接执行。策略上应限制 allowedTools、blockedPaths、网络和写权限；低风险读取可以自动，高风险写入、部署、对外发送必须暂停并让人确认。越自主，越要限权。",
    tags: ["权限", "人工检查点", "应用"],
  },
  {
    id: "agent-aa-15",
    chapter: "agent-autonomous-agents",
    level: 3,
    question:
      "你看到一个系统连续三轮调用模型“重新思考下一步”，但没有新工具结果，也没有测试或外部证据。最可能的问题是什么？该怎么改？",
    answer:
      "最可能的问题是 agent loop 退化成没有环境反馈的自嗨循环。修法是规定每轮必须基于外部结果更新状态，例如读日志、跑测试、检索来源或执行受控工具；如果拿不到新证据，就触发停机或转人工，而不是继续让模型空想。",
    tags: ["排错", "环境反馈", "应用"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-aa-16",
    chapter: "agent-autonomous-agents",
    level: 4,
    question:
      "有人说：“自主智能体更先进，所以所有复杂任务都应该直接交给 agent loop。”请用本章框架反驳，并给出更稳的选型顺序。",
    answer:
      "反驳：agent 不是更高级的默认选项，而是针对开放、多步、路径难预写任务的高成本工具。很多复杂任务仍然能被拆成链式、路由、并行、编排-工作者或评估-优化，这些固定工作流更便宜、更快、更易测。直接交给 agent loop 会引入更高成本、延迟、错误累积和权限风险。\n\n更稳的选型顺序是：先问路线能不能提前写清；能，就用固定工作流。不能，再问下一步是否强依赖环境反馈；是，才考虑 agent。考虑 agent 前，还要确认有真实标准、可用工具、停机条件、沙盒、护栏和人工检查点。没有这些边界，先补工程保护，再谈放权。",
    tags: ["综合", "工程判断", "取舍"],
  },
];
