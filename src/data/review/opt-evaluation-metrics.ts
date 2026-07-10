import type { ReviewQuestion } from "@/data/review/types";

export const optEvaluationMetricsQuestions: ReviewQuestion[] = [
  {
    id: "opt-em-1",
    chapter: "opt-evaluation-metrics",
    level: 1,
    question: "OKR中的O和KR分别是什么？OKR与KPI的核心区别是什么？",
    answer:
      "O（Objective）目标是方向性、鼓舞人心、定性描述的方向；KR（Key Result）关键结果是可量化、有时间限制、可验证的衡量指标。OKR与KPI的核心区别：OKR重方向与挑战（鼓励设定有难度的目标，70%完成度即成功），不与绩效奖金直接挂钩；KPI重考核与达标（目标应可达成），通常与绩效奖金挂钩。OKR驱动探索和创新，KPI驱动执行和达标。",
    tags: ["OKR", "O目标", "KR关键结果", "OKR vs KPI"],
  },
  {
    id: "opt-em-2",
    chapter: "opt-evaluation-metrics",
    level: 2,
    question: "KPI的SMART原则五个字母分别代表什么？",
    answer:
      "SMART原则：S（Specific）具体明确——指标清晰无歧义；M（Measurable）可量化——可以用数据衡量；A（Achievable）可达成——目标具有挑战性但经过努力可以实现；R（Relevant）相关——与组织战略目标直接相关；T（Time-bound）有时限——有明确的完成期限。SMART原则确保KPI不是模糊的口号，而是可执行、可考核的具体指标。",
    tags: ["KPI", "SMART", "具体", "可量化", "可达成", "相关", "有时限"],
  },
  {
    id: "opt-em-3",
    chapter: "opt-evaluation-metrics",
    level: 2,
    question: "平衡计分卡的四个维度分别回答什么核心问题？为什么不能只看财务指标？",
    answer:
      "四个维度的核心问题：财务——股东怎么看我们；客户——客户怎么看我们；内部流程——我们必须擅长什么；学习成长——能否持续创造价值。不能只看财务指标因为：财务是滞后指标（反映过去结果），只看财务会导致短视——为短期利润牺牲长期能力。客户满意度、流程效率和学习成长是领先指标，它们驱动未来的财务表现。四维平衡确保短期与长期、结果与动力的平衡。",
    tags: ["平衡计分卡", "BSC", "四维度", "滞后指标", "领先指标"],
  },
  {
    id: "opt-em-4",
    chapter: "opt-evaluation-metrics",
    level: 1,
    question: "NPS的计算公式是什么？推荐者、被动者和贬损者的分值范围分别是多少？",
    answer:
      "NPS（净推荐值）的计算公式：NPS = 推荐者百分比 - 贬损者百分比。分值范围：推荐者打9-10分（忠实客户，会主动推荐）；被动者打7-8分（满意但不忠诚，容易被竞品吸引）；贬损者打0-6分（不满意，可能负面传播）。NPS的值范围从-100到+100，高分表示客户忠诚度高。它的优势是用一个简单问题就能衡量客户忠诚度，适合快速定期追踪。",
    tags: ["NPS", "净推荐值", "推荐者", "贬损者", "客户忠诚度"],
  },
];
