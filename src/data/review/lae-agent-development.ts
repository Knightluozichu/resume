import type { ReviewQuestion } from "./types";

export const laeAgentDevelopmentQuestions: ReviewQuestion[] = [
  {
    id: "lae-agent-development-1",
    chapter: "lae-agent-development",
    level: 1,
    question: `什么是AI Agent？它的核心执行循环是怎样的？`,
    answer:
      `AI Agent是以大语言模型为\"大脑\"，能够自主感知环境、规划决策、调用工具、执行行动的智能系统。核心执行循环遵循ReAct模式（Reasoning+Acting）：①思考（Thought）——分析当前状态和目标，推理下一步应该做什么。②行动（Action）——根据思考结果选择并调用工具（搜索、计算、代码执行等）或生成回复。③观察（Observation）——获取工具返回的结果，更新对环境的认知。④循环——将观察结果加入上下文，回到思考步骤，直到任务完成或达到终止条件。这个循环让Agent从\"被动问答\"进化为\"主动执行\"——它不再只是回答问题，而是能够分解任务、使用工具、根据反馈调整策略，像人一样解决复杂的多步骤问题。`,
    tags: ["Agent", "ReAct", "执行循环", "核心概念"],
  },
  {
    id: "lae-agent-development-2",
    chapter: "lae-agent-development",
    level: 2,
    question: `Agent的四大核心组件是什么？它们各自的功能和关系是怎样的？`,
    answer:
      `四大核心组件：①规划器（Planner）——负责任务分解、步骤排序和动态调整计划。由LLM驱动，将复杂目标分解为可执行的子步骤，根据执行反馈调整后续计划。②记忆（Memory）——管理上下文信息。短期记忆保存当前对话和工作状态，长期记忆通过向量存储保存历史经验，工作记忆跟踪当前任务进展。支持检索相关历史信息辅助决策。③工具（Tools）——扩展模型能力边界的接口。包括搜索引擎（获取实时信息）、计算器（精确计算）、代码执行器（数据处理）、数据库查询、API调用等。工具定义了Agent能做什么。④执行器（Executor）——负责调度工具调用、提取参数、解析结果、处理错误。将规划器的决策落地为具体行动。关系：规划器决定\"做什么\"，记忆提供\"经验参考\"，工具提供\"能力扩展\"，执行器负责\"行动落地\"。四者协同构成自主Agent。`,
    tags: ["Agent组件", "规划器", "记忆", "工具", "执行器"],
  },
  {
    id: "lae-agent-development-3",
    chapter: "lae-agent-development",
    level: 2,
    question: `ReAct、Plan-and-Execute、多Agent协作和Function Calling四种Agent架构模式有什么区别？`,
    answer:
      `四种架构模式：①ReAct——思考-行动-观察交替进行，每步都调用LLM决策。优点：灵活适应性强。缺点：每步都调LLM成本高、速度慢。适合：探索性任务、需要动态调整的复杂任务。②Plan-and-Execute——先用LLM一次性生成完整计划，再逐步执行（可用小模型执行）。优点：减少LLM调用次数、成本低。缺点：计划可能需要中途调整。适合：流程较固定的任务、成本敏感场景。③多Agent协作——多个Agent角色分工合作（如研究员+写手+审核员），通过讨论、审查、汇总完成任务。优点：各Agent专精、质量高。缺点：架构复杂、协调成本高。适合：复杂创作、需要多视角的任务。④Function Calling——利用模型原生的函数调用能力，模型直接输出结构化的工具调用请求。优点：最可靠、参数提取准确。缺点：需要模型支持。适合：需要可靠工具调用的生产场景。选择原则：简单任务用Function Calling，复杂任务用ReAct，成本敏感用Plan-and-Execute，高质量需求用多Agent。`,
    tags: ["Agent架构", "ReAct", "Plan-and-Execute", "多Agent", "Function Calling"],
  },
  {
    id: "lae-agent-development-4",
    chapter: "lae-agent-development",
    level: 3,
    question: `Agent开发中的关键挑战有哪些？如何解决循环控制、错误恢复和上下文窗口管理问题？`,
    answer:
      `关键挑战及解决方案：①循环控制——Agent可能陷入无限循环（反复调用同一工具）。解决：设置最大迭代次数限制、检测重复行动模式并强制终止、引入\"反思\"步骤让Agent评估是否应该停止。②错误恢复——工具调用可能失败（网络错误、参数错误）。解决：每个工具调用包裹try-catch、工具执行失败时让Agent重新规划替代方案、实现重试机制、提供错误描述让Agent理解失败原因并调整。③上下文窗口管理——长对话和多步执行会超出上下文窗口限制。解决：对话历史压缩（用LLM总结早期对话）、滑动窗口（只保留最近N轮）、长期记忆外置（将历史存入向量数据库按需检索）、工作记忆分离（只保留当前任务关键信息）。④工具选择准确性——Agent可能选错工具或传错参数。解决：清晰的工具描述、使用Function Calling的结构化输出、参数校验和类型检查。⑤成本控制——多步推理消耗大量Token。解决：Plan-and-Execute减少LLM调用、小模型执行简单步骤、缓存中间结果。`,
    tags: ["Agent挑战", "循环控制", "错误恢复", "上下文管理", "成本控制"],
  },
];
