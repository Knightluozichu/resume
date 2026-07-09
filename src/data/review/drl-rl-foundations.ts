import type { ReviewQuestion } from "./types";

export const drlRlFoundationsQuestions: ReviewQuestion[] = [
  {
    id: "drl-rl-foundations-1",
    chapter: "drl-rl-foundations",
    level: 1,
    question: "什么是马尔可夫决策过程（MDP）？五元组 (S, A, P, R, γ) 各代表什么？",
    answer:
      "马尔可夫决策过程（MDP）是强化学习的数学形式化框架。五元组各元素含义：①S——状态集（State space），环境的所有可能状态。②A——动作集（Action space），智能体可执行的所有动作。③P——转移概率 P(s'|s,a)，在状态s执行动作a后转移到s'的概率。④R——奖励函数 R(s,a)（或 R(s,a,s')），在状态s执行动作a获得的即时奖励。⑤γ——折扣因子（Discount factor），取值0到1，控制未来奖励的权重，γ越接近1越重视长远回报。马尔可夫性质：未来只取决于当前状态，不依赖历史（无记忆性）。MDP是所有RL算法的理论基础，所有深度RL算法都在求解MDP的最优策略。",
    tags: ["MDP", "五元组", "马尔可夫性质"],
  },
  {
    id: "drl-rl-foundations-2",
    chapter: "drl-rl-foundations",
    level: 2,
    question: "贝尔曼方程的作用是什么？状态值函数 V(s) 和动作值函数 Q(s,a) 有何区别？",
    answer:
      "贝尔曼方程的作用：将「无穷horizon的期望累积回报」递归分解为「即时奖励 + γ × 下一状态值」，使最优策略的求解变为可计算的递归关系。它是所有RL算法（Q-Learning、DQN、TD学习等）的理论基石。状态值函数 V(s) 和动作值函数 Q(s,a) 的区别：①V(s) = E[r + γV(s')]——从状态s出发、遵循策略π的期望累积回报，评估「状态s有多好」，不涉及具体动作。②Q(s,a) = E[r + γ max Q(s',a')]——在状态s执行动作a后的期望累积回报，评估「在s做a有多好」，包含了动作选择。③关系：V(s) = max_a Q(s,a)（最优情况下）。④用途：V(s)用于策略评估，Q(s,a)直接指导动作选择（argmax_a Q(s,a)即最优策略）。DQN近似Q函数，策略梯度直接优化策略，两者都源于贝尔曼方程。",
    tags: ["贝尔曼方程", "值函数", "V与Q区别"],
  },
  {
    id: "drl-rl-foundations-3",
    chapter: "drl-rl-foundations",
    level: 2,
    question: "强化学习的三个核心问题（预测、控制、探索利用）分别解决什么问题？",
    answer:
      "强化学习的三个核心问题：①预测问题（Prediction）——给定一个策略π，估计该策略下的值函数V(s)或Q(s,a)。回答「如果按π行事，期望回报是多少」。这是策略评估，不改变策略。例如蒙特卡洛预测、TD(0)预测。②控制问题（Control）——寻找最优策略π*，使期望累积回报最大化。回答「应该怎么做才能得到最多回报」。控制问题包含预测（评估当前策略）+ 改进（ greedify 得到更好策略），如Q-Learning、SARSA。③探索与利用（Exploration vs Exploitation）——平衡「尝试未知动作以发现更优策略」（探索）和「选择已知最优动作以最大化当前收益」（利用）。这是RL区别于监督学习的核心特征，ε-贪心、UCB、熵正则化都是解决此问题的策略。三者关系：控制包含预测，探索利用贯穿控制全过程。",
    tags: ["预测", "控制", "探索利用"],
  },
  {
    id: "drl-rl-foundations-4",
    chapter: "drl-rl-foundations",
    level: 3,
    question: "给定一个走迷宫问题，如何将其建模为MDP？各要素如何定义？",
    answer:
      "走迷宫的MDP建模：①状态集S——迷宫中每个格子是一个状态，用坐标 (x,y) 表示。如果是10x10迷宫，则有100个状态。也可用格子编号0~99。②动作集A——四个方向：上、下、左、右（A = {up, down, left, right}）。③转移概率P——如果迷宫无随机性，P(s'|s,a) = 1（确定性转移，动作a确定地导致下一个状态）。如果地面有打滑，则P(预期s'|s,a) = 0.8，P(垂直s'|s,a) = 0.1 each。④奖励函数R——到达终点R = +100（或+1），撞墙R = -1（停在原地），每步R = -0.01（鼓励快速到达，避免原地徘徊）。⑤折扣因子γ——通常设0.9~0.99，使智能体重视长远回报。建模后可用Q-Learning（表格法）或DQN（如果状态空间大、用图像表示迷宫）求解最优策略。关键设计：奖励符号（正奖励引导目标、负奖励惩罚低效）、γ值（太小则短视、太大则收敛慢）。",
    tags: ["MDP建模", "走迷宫", "应用"],
  },
];
