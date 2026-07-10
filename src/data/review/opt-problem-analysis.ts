import type { ReviewQuestion } from "@/data/review/types";

export const optProblemAnalysisQuestions: ReviewQuestion[] = [
  {
    id: "opt-pa-1",
    chapter: "opt-problem-analysis",
    level: 1,
    question: "5W2H分析法的七个维度分别是什么？",
    answer:
      "5W2H的七个维度是：What（何事，界定问题本身）、Why（何因，明确问题意义）、Who（何人，识别利益相关者）、When（何时，确定时间范围）、Where（何地，确定空间范围）、How（如何，描述发生机制）、How much（几何，量化问题严重性）。",
    tags: ["5W2H", "问题界定", "七维度"],
  },
  {
    id: "opt-pa-2",
    chapter: "opt-problem-analysis",
    level: 2,
    question: "SWOT分析的四个象限如何区分内部与外部、正向与负向？",
    answer:
      "SWOT从两个维度构建四象限：内部/外部维度和正向/负向维度。S（优势）是内部正向因素——组织的核心竞争力；W（劣势）是内部负向因素——组织的短板和不足；O（机会）是外部正向因素——环境提供的有利条件；T（威胁）是外部负向因素——环境带来的挑战。",
    tags: ["SWOT", "四象限", "内外分析"],
  },
  {
    id: "opt-pa-3",
    chapter: "opt-problem-analysis",
    level: 2,
    question: "力场分析如何帮助管理者制定变革策略？",
    answer:
      "力场分析认为任何现状都是驱动力和阻力动态平衡的结果。它帮助管理者：①识别推动变革的驱动力（如资源支持、高层推动）；②识别阻碍变革的阻力（如习惯惯性、成本压力）；③制定策略——增强驱动力或削弱阻力或两者并行。这比简单「强力推动」更有效，因为忽视阻力的变革往往反弹。",
    tags: ["力场分析", "变革管理", "驱动力", "阻力"],
  },
  {
    id: "opt-pa-4",
    chapter: "opt-problem-analysis",
    level: 3,
    question: "MECE原则为什么是所有分析工具的底层思维？违反MECE会导致什么后果？",
    answer:
      "MECE（相互独立、完全穷尽）要求拆解后的子项不重叠、不遗漏，是所有分析工具的底层思维因为：不独立会导致重复计算和混淆，不穷尽会导致遗漏关键因素。违反MECE的后果：问题分析出现盲区（遗漏重要原因），或资源浪费在重叠的部分，最终解决方案不完整或低效。5W2H、SWOT、鱼骨图等工具都是MECE原则的具体应用。",
    tags: ["MECE", "底层思维", "相互独立", "完全穷尽"],
  },
];
