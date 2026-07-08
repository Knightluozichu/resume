import type { ReviewQuestion } from "./types";

/** 概率论 复习题 */
export const mglProbabilityQuestions: ReviewQuestion[] = [
  {
    id: "mgl-probability-1",
    chapter: "mgl-probability",
    level: 1,
    question: "贝叶斯定理的公式是？",
    answer: "P(A|B) = P(B|A)·P(A) / P(B)。贝叶斯定理：P(A|B)=P(B|A)×P(A)/P(B)。后验=似然×先验/证据。根据证据B更新假设A的概率。",
    tags: ["贝叶斯定理", "条件概率"],
  },
  {
    id: "mgl-probability-2",
    chapter: "mgl-probability",
    level: 2,
    question: "发病率1%，检测准确率99%，假阳性率1%。检测阳性时真患病的概率约为？",
    answer: "约 50%。P(病|阳性)=0.99×0.01/(0.99×0.01+0.01×0.99)=0.5。这是基础率谬误：发病率低时假阳性人数接近真阳性。",
    tags: ["基础率谬误", "贝叶斯"],
  },
  {
    id: "mgl-probability-3",
    chapter: "mgl-probability",
    level: 3,
    question: "期望的线性性 E[aX+bY] 等于什么？",
    answer: "aE[X]+bE[Y]。期望线性性：E[aX+bY]=aE[X]+bE[Y]，无论X,Y是否独立。这是随机算法复杂度分析的核心工具。",
    tags: ["期望", "线性性"],
  },
  {
    id: "mgl-probability-4",
    chapter: "mgl-probability",
    level: 4,
    question: "蒙特卡洛方法估计 π 的原理是？",
    answer: "随机撒点统计圆内比例。蒙特卡洛在正方形内随机撒点，统计落入内切圆的比例，π≈4×(圆内点/总点数)。大数定律保证收敛。",
    tags: ["蒙特卡洛", "随机算法"],
  },
];
