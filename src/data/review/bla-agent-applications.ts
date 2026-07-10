import type { ReviewQuestion } from "./types";

export const blaAgentApplicationsQuestions: ReviewQuestion[] = [
  {
    id: "bla-agent-applications-1",
    chapter: "bla-agent-applications",
    level: 1,
    question: `Agent 的核心推理循环是什么？它与 Chains 的固定执行路径有什么区别？`,
    answer:
      `Agent核心推理循环是「感知-推理-行动-观察」：①感知——接收用户任务或环境状态。②推理——LLM分析当前状态，决定下一步行动。③行动——调用工具执行操作（搜索/计算/API/代码执行）。④观察——获取行动结果，反馈给LLM进入下一轮循环。循环持续进行直到任务完成或达到最大循环次数。与Chains的区别：①执行路径——Chains是预定义固定顺序（输入→步骤A→步骤B→输出），Agent是LLM自主决策动态路径（根据中间结果选择下一步）。②可控性——Chains高度可控（每步确定），Agent可控性低（LLM可能选择意外路径）。③成本——Chains成本可预测（固定步数），Agent成本不可预测（循环次数不定）。④灵活性——Chains灵活性低（无法应对意外），Agent灵活性高（可动态调整策略）。⑤适用场景——Chains适合流程确定的任务（标准RAG流程），Agent适合需要灵活决策的任务（信息搜集、多步探索）。`,
    tags: ["Agent", "推理循环", "Chains对比"],
  },
  {
    id: "bla-agent-applications-2",
    chapter: "bla-agent-applications",
    level: 2,
    question: `Agent 的四大组件分别是什么？它们如何协作？`,
    answer:
      `Agent四大组件：①LLM大脑——负责推理、决策、规划，是Agent的核心。选择能力强的模型（GPT-4/Claude）效果更好，支持Function Calling的模型更合适。②记忆——管理上下文与经验积累。短期记忆：对话历史，用BufferMemory保留最近几轮。长期记忆：向量存储，用VectorStoreRetrieverMemory跨会话积累经验。③工具集——执行具体操作的函数集合。常见工具：搜索引擎、计算器、API调用、代码执行、数据库查询。工具描述的质量直接影响Agent的工具选择准确率。④规划——分解复杂任务为子步骤。ReAct模式每轮做一步规划，Plan-and-Execute模式先规划全部步骤再逐步执行。协作方式：用户任务输入→LLM大脑感知并推理→选择工具→执行行动→观察结果→更新记忆→继续推理→直到完成。记忆为推理提供上下文，工具集为行动提供能力，规划为多步任务提供路线图，LLM大脑统筹全局。`,
    tags: ["Agent组件", "LLM大脑", "记忆", "工具集", "规划"],
  },
  {
    id: "bla-agent-applications-3",
    chapter: "bla-agent-applications",
    level: 2,
    question: `ReAct、Plan-and-Execute、Multi-Agent 三种 Agent 类型各有什么特点？`,
    answer:
      `三种Agent类型对比：①ReAct Agent——推理与行动交替执行，每轮先思考（Thought）再行动（Action）再观察（Observation）。特点：反应式、逐步决策、灵活调整。优点：简单直接、适应性强、每步可根据结果调整。缺点：缺乏全局规划、可能陷入循环、token消耗随步骤线性增长。适合：大多数通用任务、信息检索、简单工具调用。②Plan-and-Execute Agent——先规划完整步骤（Plan），再逐步执行（Execute）。特点：先全局规划再执行、执行阶段更高效。优点：有全局视野、执行阶段token消耗低、适合复杂多步任务。缺点：规划阶段消耗较多token、初始规划可能不准确需中途调整。适合：复杂多步任务、项目分解、需要全局视角的任务。③Multi-Agent——多个Agent协作，各司其职。如一个Planner规划、一个Executor执行、一个Reviewer审核。特点：角色分工、协作完成。优点：专业化分工、可并行、容错性好。缺点：通信开销大、架构复杂、协调困难。适合：角色分工明确的系统、复杂工作流、需要多视角的任务。`,
    tags: ["Agent类型", "ReAct", "Plan-and-Execute", "Multi-Agent"],
  },
  {
    id: "bla-agent-applications-4",
    chapter: "bla-agent-applications",
    level: 3,
    question: `构建 Agent 应用时需要注意哪些设计要点？如何控制成本和风险？`,
    answer:
      `Agent设计六大要点：①工具描述清晰——函数名和参数说明要明确，让LLM准确选择工具。好的描述包含：清晰函数名、完整参数说明、使用场景示例。描述不清导致工具选择错误。②控制循环次数——设置最大迭代数（如10次），防止无限循环消耗成本。超限后返回当前最佳结果或降级处理。③错误处理与重试——工具调用可能失败（API超时、参数错误），需要重试机制（如指数退避重试3次）和降级策略（工具不可用时切换备用方案）。④结果验证——对Agent输出做验证，防止错误结果传递。如用第二个LLM验证答案合理性、检查输出格式是否符合要求。⑤成本与延迟可控——Agent多轮调用成本高，需监控：设置单次任务token上限、用小模型做简单决策、缓存常见工具结果。⑥人在回路兜底——高风险操作（如发送邮件、执行交易、修改数据库）需人工确认，避免Agent自主造成不可逆损失。成本控制：模型路由（简单决策用小模型）、缓存工具结果、限制循环次数。风险控制：人在回路、操作白名单、沙箱执行、审计日志。`,
    tags: ["Agent设计", "成本控制", "风险控制", "最佳实践"],
  },
];
