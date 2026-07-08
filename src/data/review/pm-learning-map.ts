import type { ReviewQuestion } from "./types";

/** 程序员的数学全书学习地图 复习题 */
export const pmLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pm-learning-map-1",
    chapter: "pm-learning-map",
    level: 1,
    question: "程序员的数学系列全书分为哪四大板块？",
    answer: "数学基础、概率思维、统计思维、高级数学。全书按「表示 → 计数 → 推理 → 分析 → 应用」递进。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "pm-learning-map-2",
    chapter: "pm-learning-map",
    level: 2,
    question: "为什么说数学是程序员的「思维操作系统」？",
    answer: "数学提供了抽象思维和严谨推理的框架。二进制和逻辑运算是计算机本质，排列组合是计数工具，概率统计是推理分析工具，递归是分解问题的思维。这些是编程思维的底层支撑。",
    tags: ["数学思维", "核心"],
  },
  {
    id: "pm-learning-map-3",
    chapter: "pm-learning-map",
    level: 3,
    question: "概率思维和统计思维的区别是什么？",
    answer: "概率思维是从已知模型推导可能结果（正向推理），统计思维是从观测数据推断模型（逆向推理）。概率是「已知分布求事件概率」，统计是「已知数据估分布参数」。",
    tags: ["概率", "统计"],
  },
  {
    id: "pm-learning-map-4",
    chapter: "pm-learning-map",
    level: 4,
    question: "为什么排列组合是概率论的基础？",
    answer: "古典概率定义为「有利事件数 / 总事件数」，计算这两个数需要排列组合。不重不漏地计数是正确计算概率的前提。",
    tags: ["排列组合", "概率基础"],
  },
];
