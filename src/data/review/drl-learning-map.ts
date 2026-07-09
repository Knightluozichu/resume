import type { ReviewQuestion } from "./types";

export const drlLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "drl-learning-map-1",
    chapter: "drl-learning-map",
    level: 1,
    question: "深度强化学习的定义是什么？它与传统强化学习、深度学习之间是什么关系？",
    answer:
      "深度强化学习（Deep Reinforcement Learning）是强化学习与深度学习的融合，用神经网络作为函数近似器处理RL中的值函数或策略。关系：①RL解决「如何通过试错学习最优决策」的问题，提供MDP、贝尔曼方程、探索利用等理论框架。②DL解决「如何用神经网络逼近复杂函数」的问题，提供前馈网络、反向传播、梯度下降等工具。③融合点在于「函数近似」——当RL的状态空间或动作空间太大无法用表格存储时，用神经网络作为函数近似器。DQN用NN近似Q函数，策略梯度用NN参数化策略，Actor-Critic用双NN同时近似两者。深度学习为强化学习提供了「函数近似」和「梯度优化」两大能力。",
    tags: ["深度强化学习", "定义", "RL与DL关系", "函数近似"],
  },
  {
    id: "drl-learning-map-2",
    chapter: "drl-learning-map",
    level: 2,
    question: "全书十章如何组织？分为哪几个学习阶段？",
    answer:
      "全书十章分为四个学习阶段：①基础理论（ch0-ch1）——知识全景图定位方向，强化学习基础建立MDP五元组、策略、值函数、贝尔曼方程等地基。②核心算法（ch2-ch4）——DQN族讲解基于价值的方法和经验回放/目标网络，策略梯度讲解REINFORCE和策略梯度定理，Actor-Critic讲解双网络协同和A3C。③进阶技术（ch5-ch6）——高级算法对比PPO/SAC/TD3的原理和适用场景，探索策略讲解ε-贪心/UCB/ICM等方法。④工程实践（ch7-ch9）——奖励设计讲解塑形和避坑，实战应用覆盖游戏/机器人/自动驾驶，全书复习以统一视角整合知识闭环。",
    tags: ["章节组织", "四阶段", "学习路径"],
  },
  {
    id: "drl-learning-map-3",
    chapter: "drl-learning-map",
    level: 2,
    question: "深度RL的三大范式（基于价值、基于策略、Actor-Critic）各自的核心思想和区别是什么？",
    answer:
      "三大范式的核心区别：①基于价值（Value-based）——学习值函数Q(s,a)，间接得到策略 a* = argmax Q(s,a)，代表算法DQN。特点是离策略（off-policy）、样本效率高、适合离散动作空间，但难以处理连续动作。②基于策略（Policy-based）——直接参数化策略π_θ(a|s)，用梯度上升最大化期望回报，代表算法REINFORCE/PPO。特点是同策略（on-policy）、适合连续动作空间、能学习随机策略，但样本效率较低、方差较大。③Actor-Critic（混合）——Actor学策略、Critic学值函数，用TD误差连接两者，代表算法A3C/SAC/TD3。特点是兼顾两者优势、方差小、可离策略，是当前最主流的范式。核心公式：价值法用贝尔曼方程，策略法用策略梯度定理，AC用TD误差统一两者。",
    tags: ["三大范式", "价值", "策略", "Actor-Critic"],
  },
  {
    id: "drl-learning-map-4",
    chapter: "drl-learning-map",
    level: 3,
    question: "全书十章如何形成一个从RL基础到深度RL工程应用的完整知识闭环？",
    answer:
      "全书形成一个「理论→算法→进阶→实践→整合」的知识演进：①理论层（ch1）——MDP、贝尔曼方程建立RL的理论框架，回答「什么是最优决策」。②核心算法层（ch2-ch4）——DQN将NN接入Q-Learning实现价值近似，策略梯度用NN直接参数化策略，Actor-Critic融合两者用TD误差降低方差。这三章展示了RL+DL融合的三种范式。③进阶层（ch5-ch6）——PPO/SAC/TD3代表算法成熟期，解决稳定性、探索、样本效率等关键问题；探索策略深入讲解RL特有的探索利用权衡。④工程层（ch7-ch8）——奖励设计定义「目标」，环境工程提供「平台」，应用展示从游戏到机器人的工业化路径。⑤整合层（ch9）——统一视角串联：贝尔曼方程和策略梯度定理贯穿全书，函数近似是RL+DL的桥梁，三大范式各有适用场景。全书的核心脉络是：RL定义目标和框架，DL提供工具和能力，融合产生深度RL，工程实现落地应用。",
    tags: ["知识闭环", "知识演进", "统一视角"],
  },
];
