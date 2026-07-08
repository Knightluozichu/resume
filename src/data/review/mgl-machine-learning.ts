import type { ReviewQuestion } from "./types";

/** 机器学习 复习题 */
export const mglMachineLearningQuestions: ReviewQuestion[] = [
  {
    id: "mgl-machine-learning-1",
    chapter: "mgl-machine-learning",
    level: 1,
    question: "梯度下降参数更新的公式是？",
    answer: "w ← w - η · ∂L/∂w。梯度下降沿负梯度方向更新：w←w-η∂L/∂w。梯度指向增长最快方向，负梯度是下降最快方向。",
    tags: ["梯度下降", "参数更新"],
  },
  {
    id: "mgl-machine-learning-2",
    chapter: "mgl-machine-learning",
    level: 2,
    question: "神经网络反向传播算法本质用的是什么数学法则？",
    answer: "链式法则（微积分）。反向传播本质是链式法则：∂L/∂w=∂L/∂f·∂f/∂g·∂g/∂h·∂h/∂w，逐层传递梯度。",
    tags: ["反向传播", "链式法则"],
  },
  {
    id: "mgl-machine-learning-3",
    chapter: "mgl-machine-learning",
    level: 3,
    question: "为什么神经网络需要激活函数？",
    answer: "引入非线性，否则多层等价于单层线性变换。没有激活函数，多层线性变换的复合仍是线性的，等价于单层。激活函数（ReLU/Sigmoid）引入非线性，使网络能逼近复杂函数。",
    tags: ["激活函数", "非线性"],
  },
  {
    id: "mgl-machine-learning-4",
    chapter: "mgl-machine-learning",
    level: 4,
    question: "监督学习和无监督学习的区别是？",
    answer: "监督学习有标签，无监督学习无标签。监督学习从标注数据（输入-输出对）学映射，如回归/分类。无监督学习从无标签数据发现结构，如聚类/降维。",
    tags: ["监督学习", "无监督学习"],
  },
];
