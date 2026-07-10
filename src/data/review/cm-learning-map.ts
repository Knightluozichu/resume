import type { ReviewQuestion } from "./types";

/** 具体数学全书学习地图 复习题 */
export const cmLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cm-learning-map-1",
    chapter: "cm-learning-map",
    level: 1,
    question: `具体数学全书分哪四大板块？`,
    answer: `递归问题、求和、数论、高级主题（生成函数与离散概率）。`,
    tags: ["全书结构"],
  },
  {
    id: "cm-learning-map-2",
    chapter: "cm-learning-map",
    level: 2,
    question: `为什么生成函数章排在数论之后？`,
    answer: `生成函数的系数常是二项式系数和 Stirling 数，需要数论章的基础。同时生成函数解递归需要求和技术。它是全书工具的汇合点。`,
    tags: ["学习路径"],
  },
  {
    id: "cm-learning-map-3",
    chapter: "cm-learning-map",
    level: 3,
    question: `给定一个组合计数问题，具体数学的标准解题流程是什么？`,
    answer: `三步法：1. 用小例子找递归关系；2. 对递归展开求和，用扰动法或求和法则化简；3. 若闭式难求，构造生成函数列方程，代数求解后展开系数。`,
    tags: ["方法论"],
  },
  {
    id: "cm-learning-map-4",
    chapter: "cm-learning-map",
    level: 4,
    question: `Concrete Mathematics 的书名含义和全书哲学是什么？`,
    answer: `Concrete = Continuous + Discrete。哲学是：用具体的、可操作的数学方法解决离散问题，反对纯抽象推导。强调先猜后证、成套方法、小例子驱动的实战风格。`,
    tags: ["综合"],
  },
];
