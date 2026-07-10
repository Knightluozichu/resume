import { ReviewQuestion } from "./types";

export const dlrValueFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "dlr-value-functions-1",
    chapter: "dlr-value-functions",
    level: 1,
    question: `状态值函数 V(s) 和动作值函数 Q(s,a) 分别是什么？它们有什么关系？`,
    answer:
      `状态值函数 V_pi(s)：从状态 s 出发，遵循策略 pi 的期望折扣回报，V_pi(s) = E_pi[ G_t | s_t = s ]。它评估「处于状态 s 有多好」，是对该状态长期价值的估计。动作值函数 Q_pi(s,a)：在状态 s 执行动作 a 后，再遵循策略 pi 的期望折扣回报，Q_pi(s,a) = E_pi[ G_t | s_t=s, a_t=a ]。它评估「在状态 s 做动作 a 有多好」，比 V 多了动作维度。两者关系：V_pi(s) = sum_a pi(a|s) * Q_pi(s,a)——状态值是所有动作值的策略加权平均。反之 Q_pi(s,a) = E_s'[ r + gamma * V_pi(s') | s,a ]——动作值用下一步的状态值递归表示。在控制问题中，Q 函数更直接有用：最优策略 pi*(s) = argmax_a Q*(s,a)，只需对 Q 取 argmax 即可得到最优动作，无需知道环境模型。这是 Q 学习等无模型方法的基础。`,
    tags: ["V函数", "Q函数", "值函数关系"],
  },
  {
    id: "dlr-value-functions-2",
    chapter: "dlr-value-functions",
    level: 2,
    question: `什么是贝尔曼方程？它为什么是强化学习的核心？`,
    answer:
      `贝尔曼方程（Bellman Equation）：将值函数递归分解为「即时奖励 + 下一步的值函数」。贝尔曼期望方程：V_pi(s) = sum_a pi(a|s) sum_s' P(s'|s,a) [ R(s,a,s') + gamma * V_pi(s') ]，Q_pi(s,a) = sum_s' P(s'|s,a) [ R(s,a,s') + gamma * V_pi(s') ]。它表达「当前状态的价值 = 即时奖励的期望 + 折扣后的下一状态价值的期望」。贝尔曼最优方程：V*(s) = max_a sum_s' P(s'|s,a) [ R + gamma * V*(s') ]，Q*(s,a) = sum_s' P(s'|s,a) [ R + gamma * max_a' Q*(s',a') ]——用 max 替代 sum，对应最优策略。为什么是核心：①定义了求解目标——所有 RL 算法本质上都在近似求解贝尔曼方程。②提供了递归结构——把无限 horizon 的优化问题分解为逐步递归，可迭代求解。③连接预测与控制——贝尔曼期望方程用于策略评估（预测），贝尔曼最优方程用于策略改进（控制）。④统一框架——DP 精确求解、MC/TD 采样估计、DQN 神经网络近似，都是在用不同方式解贝尔曼方程。`,
    tags: ["贝尔曼方程", "递归分解", "核心"],
  },
  {
    id: "dlr-value-functions-3",
    chapter: "dlr-value-functions",
    level: 2,
    question: `什么是贝尔曼最优方程？最优策略与最优值函数的关系是什么？`,
    answer:
      `贝尔曼最优方程（Bellman Optimality Equation）：V*(s) = max_a sum_s' P(s'|s,a) [ R(s,a,s') + gamma * V*(s') ]，Q*(s,a) = sum_s' P(s'|s,a) [ R(s,a,s') + gamma * max_a' Q*(s',a') ]。与期望方程的区别：用 max_a 替代 sum_a pi(a|s)，直接取最优动作而非按策略加权。最优策略与最优值函数的关系：①pi*(s) = argmax_a Q*(s,a)——给定 Q*，最优策略就是每步选 Q 最大的动作（贪心策略）。②V*(s) = max_a Q*(s,a)——最优状态值是所有动作中最优动作值。③V* 和 Q* 互推——已知 V* 可算 Q*（Q*(s,a) = E[r+gamma*V*(s')]），已知 Q* 可算 V*（V*(s)=max_a Q*(s,a)）。关键特性：贝尔曼最优方程是非线性的（含 max 操作），但一旦求解，最优策略无需知道 pi 的形式，直接从 Q* 贪心选取。这就是为什么 Q 学习等无模型方法直接学 Q* 而不学 pi——避开了策略空间的参数化，且最优策略可从 Q* 直接导出。`,
    tags: ["贝尔曼最优方程", "最优策略", "最优值函数"],
  },
  {
    id: "dlr-value-functions-4",
    chapter: "dlr-value-functions",
    level: 3,
    question: `为什么说值函数是强化学习的「评估标准」？预测问题与控制问题的区别是什么？`,
    answer:
      `值函数作为「评估标准」：RL 的核心目标是学最优策略，而评估一个策略好坏需要量化「遵循它能获得多少回报」——这正是值函数的定义。V_pi(s) 量化策略 pi 在状态 s 的长期价值，Q_pi(s,a) 量化在状态 s 做动作 a 的长期价值。没有值函数，智能体无法判断哪个策略更好，也无法改进策略。预测问题 vs 控制问题：①预测（Prediction）——给定策略 pi，求 V_pi 或 Q_pi（评估这个策略有多好）。这是「已知策略，求值函数」的问题。DP 的策略评估、MC 预测、TD 预测都属于此类。②控制（Control）——求最优策略 pi* 和最优值函数 V*/Q*（找到最好的策略）。这是「未知策略，同时求策略和值函数」的问题。DP 的策略迭代/价值迭代、Q学习、SARSA、DQN 都属于此类。控制问题包含预测：每一步先评估当前策略（预测），再根据值函数改进策略。改进定理保证：对任意策略 pi，贪心改进后的 pi' 满足 V_pi' >= V_pi——策略迭代单调递增直至最优。这就是 RL「评估-改进」循环的理论基础。`,
    tags: ["预测与控制", "评估标准", "策略改进"],
  },
];
