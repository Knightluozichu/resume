import type { ReviewQuestion } from "./types";

/** 视角 复习题 */
export const ppPerspectivesQuestions: ReviewQuestion[] = [
  {
    id: "pp-perspectives-1",
    chapter: "pp-perspectives",
    level: 1,
    question: "换角度思考的核心是什么？",
    answer: "从不同维度（时间/空间/精确/简洁/通用/专用）分析同一问题，寻找更优方案。每种视角暴露不同机会。",
    tags: ["换角度思考"],
  },
  {
    id: "pp-perspectives-2",
    chapter: "pp-perspectives",
    level: 2,
    question: "计算机科学的核心权衡有哪些？",
    answer: "时间vs空间（缓存/压缩）、精确vs近似（布隆/蒙特卡洛）、通用vs专用（比较排序/计数排序）、简洁vs高效（抽象/内联）。",
    tags: ["核心权衡"],
  },
  {
    id: "pp-perspectives-3",
    chapter: "pp-perspectives",
    level: 3,
    question: "用换角度思维分析散列表、布隆过滤器、位向量的区别。",
    answer: "散列表：精确+通用，空间大。布隆过滤器：近似+通用，空间小有假阳性。位向量：精确+专用（仅整数），空间最优。不同视角适合不同约束。",
    tags: ["对比", "换角度"],
  },
  {
    id: "pp-perspectives-4",
    chapter: "pp-perspectives",
    level: 4,
    question: "请阐述换角度思维在Bentley电话号码案例中的体现。",
    answer: "原始角度：排序（O(n log n)，需比较）。换空间角度：位向量（O(n)，用bit标记存在性，无需比较）。换问题角度：只需去重不需排序。换数据角度：号码是稠密整数范围已知。四个角度的转换最终导向位向量方案——O(n)时间、1.25MB空间。核心洞察：从「比较模型」换到「位级标记模型」，从「排序问题」换到「集合表示问题」。",
    tags: ["综合", "换角度", "位向量"],
  },
];
