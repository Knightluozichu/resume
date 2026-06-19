/** 复习题库 · 组合与定制模式：把简单积木拼成合适系统（agent-combining-patterns）。《AI 智能体应用开发》第 16 章，改编自 Anthropic《Building Effective Agents》。 */

import type { ReviewQuestion } from "./types";

export const agentCombiningPatternsQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-cp-1",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "一句话说清：为什么说智能体模式是“积木”，不是“处方”？",
    answer:
      "因为链式、路由、并行、编排、评估-优化和 agent loop 都是可组合的 building blocks，不是必须照单全上的固定模板。工程上应该按任务形状选择需要的几块，并验证每块是否真的改善结果。",
    tags: ["组合模式", "基础"],
  },
  {
    id: "agent-cp-2",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "本章的核心工程原则是什么？",
    answer:
      "从最简单的方案开始，先建立可测基线；只有当更复杂的组合能用指标证明结果更好时，才增加复杂度。能用单次调用或透明工作流解决，就不要直接上 mega-agent。",
    tags: ["简单优先", "基础"],
  },
  {
    id: "agent-cp-3",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "什么是可度量指标（Evaluation metric）？举三个例子。",
    answer:
      "可度量指标是证明系统是否真的变好的可观察信号。例子包括通过率、正确率、成本、延迟、人工返工率、失败原因分布、用户满意度。没有指标，就无法判断复杂度是否值回成本。",
    tags: ["指标", "基础"],
  },
  {
    id: "agent-cp-4",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "透明组合 workflow 至少要看得见哪些东西？",
    answer:
      "至少要看得见每一步的 prompt、tool definition、model response、tool result、评估结果和状态转移。这样出错时才能定位是路由、检索、生成、评估还是工具接口出了问题。",
    tags: ["透明度", "基础"],
  },
  {
    id: "agent-cp-5",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "什么是回退路径（Rollback path）？",
    answer:
      "回退路径是新模式没有带来指标收益或触发风险时，系统能退回到更简单版本的明确路线。例如关闭评估循环、绕过 agent loop、回到单次调用或上一版 workflow。",
    tags: ["回退", "基础"],
  },
  {
    id: "agent-cp-6",
    chapter: "agent-combining-patterns",
    level: 1,
    question: "为什么本章不鼓励把所有能力塞进一个 mega-agent？",
    answer:
      "因为 mega-agent 把分类、检索、生成、评估、工具调用和升级决策混在一起，失败后很难知道哪一步错了，也难以单独测试和回退。很多稳定步骤其实更适合拆成透明 workflow。",
    tags: ["mega-agent", "基础"],
  },

  // —— Level 2 · 理解辨析 ——
  {
    id: "agent-cp-7",
    chapter: "agent-combining-patterns",
    level: 2,
    question: "为什么“系统更复杂”不能自动推出“系统更强”？",
    answer:
      "复杂度会带来更多调用、更长延迟、更多状态、更多调试点和更高回滚成本。只有当指标证明新增模式显著改善结果，并且收益超过这些复杂度预算时，复杂系统才算更强；否则只是更难维护。",
    tags: ["复杂度预算", "理解"],
  },
  {
    id: "agent-cp-8",
    chapter: "agent-combining-patterns",
    level: 2,
    question: "为什么 Anthropic 建议从简单 prompt 和 eval 开始，而不是先搭多步 agentic system？",
    answer:
      "因为很多任务用单次 LLM 调用、检索和上下文示例就足够了。先优化简单 prompt 并建立 eval，可以得到便宜、稳定、可对照的基线；只有当简单方案明显不够时，再加多步工作流或 agent 才有明确收益。",
    tags: ["简单优先", "eval", "理解"],
  },
  {
    id: "agent-cp-9",
    chapter: "agent-combining-patterns",
    level: 2,
    question: "框架为什么可能让调试变难？",
    answer:
      "框架能快速搭建系统，但过厚的抽象层可能遮住底层 prompt、工具定义、模型响应和工具结果。出错时，如果只能看到“run failed”，却看不到模型为什么选这个工具、工具返回了什么，就很难定位和修复。",
    tags: ["框架", "透明度", "理解"],
  },
  {
    id: "agent-cp-10",
    chapter: "agent-combining-patterns",
    level: 2,
    question: "透明 workflow 和一锅端 mega-agent 在控制权上有什么差别？",
    answer:
      "透明 workflow 的控制流由人显式编排：先路由、再检索、再生成、再评估，每一步输入输出都可见；mega-agent 则把多种责任交给一个大循环或大 prompt 临场处理，控制权和责任边界更模糊。",
    tags: ["对比", "控制流", "理解"],
  },
  {
    id: "agent-cp-11",
    chapter: "agent-combining-patterns",
    level: 2,
    question: "为什么组合模式必须“可测可回退”？",
    answer:
      "因为组合越多，故障来源越多。可测能证明哪一层带来收益、哪一层制造问题；可回退能在新模式延迟变高、成本失控或质量下降时退回基线，避免团队被复杂结构绑住。",
    tags: ["可测", "回退", "理解"],
  },

  // —— Level 3 · 应用判断（含选型）——
  {
    id: "agent-cp-12",
    chapter: "agent-combining-patterns",
    level: 3,
    question:
      "一个客服系统 FAQ 已能用单次检索回答 80%，但退款类问题经常答错。你会先加自主 agent，还是先加别的模式？为什么？",
    answer:
      "先加别的模式，通常是路由和专门的退款政策检索。因为失败集中在退款类，说明先把问题分流到专门流程更稳；必要时再加评估-优化检查是否引用了正确政策。只有当系统必须操作后台并根据结果动态决定下一步时，才考虑 agent loop。",
    tags: ["选型", "客服", "应用"],
  },
  {
    id: "agent-cp-13",
    chapter: "agent-combining-patterns",
    level: 3,
    question:
      "你准备把“单次回答”升级成“路由 + 检索 + 评估-优化”。上线前至少要定义哪些指标？",
    answer:
      "至少定义质量指标和代价指标：质量上看通过率、正确率、人工返工率、失败原因分布；代价上看延迟、模型/工具调用成本、超时率。还要保留基线对照，否则不知道组合版本是否真的优于单次回答。",
    tags: ["指标设计", "应用"],
  },
  {
    id: "agent-cp-14",
    chapter: "agent-combining-patterns",
    level: 3,
    question:
      "某框架让你 10 分钟搭出 agent，但日志里只显示最终回答和总耗时。你会要求补什么，才敢进生产？",
    answer:
      "要补关键可观察性：每轮 prompt、可用工具列表、模型选择的 tool、tool input/output、model response、评估分数、状态转移、错误栈和回退原因。还要能复现某次运行，否则生产故障很难定位。",
    tags: ["框架", "日志", "应用"],
  },
  {
    id: "agent-cp-15",
    chapter: "agent-combining-patterns",
    level: 3,
    question:
      "如果组合版本质量分数略高，但延迟翻倍、人工返工率也升高，你会怎么处理？",
    answer:
      "不应该直接保留组合版本。质量分数略高不足以覆盖延迟和人工返工率的代价，说明复杂度预算可能被打穿。更稳的做法是回退到基线或只保留真正有收益的子步骤，再分析失败原因，重新小流量验证。",
    tags: ["回退", "复杂度预算", "应用"],
  },

  // —— Level 4 · 综合 ——
  {
    id: "agent-cp-16",
    chapter: "agent-combining-patterns",
    level: 4,
    question:
      "有人说：“为了未来扩展性，我们把客服、检索、退款、质检、升级人工都塞进一个 mega-agent，省得以后改流程。”请用本章框架反驳，并给出更稳的组合方案。",
    answer:
      "反驳：把所有能力塞进 mega-agent 并不等于扩展性，反而会牺牲透明度、可测性和回退能力。分类错、检索错、回复错、评估错都会混在一个黑盒里，团队很难知道该改 prompt、工具、路由还是策略；同时成本、延迟和错误累积都会变高。\n\n更稳的组合方案是：先建立单次回答或检索回答基线；再用路由把 FAQ、退款、技术支持分开；对退款类接专门政策检索和模板；对高风险回复加评估-优化；只有需要后台操作并根据结果动态决策的部分，才引入受限 agent loop。每一层都绑定通过率、延迟、成本、人工返工率等指标，并保留关闭该层、回到上一版 workflow 的回退路径。",
    tags: ["综合", "架构设计", "取舍"],
  },
];
