import { ReviewQuestion } from "../types";

export const iaiReinforcementLearningQuestions: ReviewQuestion[] = [
  {
    id: "iai-reinforcement-learning-1",
    chapter: "iai-reinforcement-learning",
    level: 1,
    question: "强化学习的交互循环是什么？MDP 五元组分别是什么？马尔可夫性质的含义是什么？",
    answer:
      "强化学习交互循环：智能体（Agent）观察当前状态 s_t，根据策略 pi(a|s) 选择动作 a_t，环境（Environment）执行动作后返回新状态 s_{t+1} 和奖励 r_t，智能体根据奖励调整策略，目标是最大化累积折扣回报 G_t = r_t + gamma*r_{t+1} + gamma^2*r_{t+2} + ...。MDP 五元组：①S 状态空间——所有可能状态的集合；②A 动作空间——智能体可执行的所有动作；③P(s'|s,a) 状态转移概率——在状态 s 执行动作 a 后转移到 s' 的概率；④R(s,a) 奖励函数——在状态 s 执行动作 a 获得的即时奖励；⑤gamma 折扣因子（0~1）——权衡即时奖励与长期回报，越接近 1 越重视长期。马尔可夫性质：未来只依赖当前状态，与历史无关，即 P(s_{t+1}|s_t, a_t, s_{t-1}, ...) = P(s_{t+1}|s_t, a_t)。这意味着当前状态包含了做决策所需的全部历史信息，无需记住完整历史，大幅简化了问题。",
    tags: ["强化学习", "交互循环", "MDP", "五元组", "马尔可夫性质"],
  },
  {
    id: "iai-reinforcement-learning-2",
    chapter: "iai-reinforcement-learning",
    level: 2,
    question: "价值法和策略法的区别是什么？Q-learning 和 DQN 如何工作？",
    answer:
      "价值法 vs 策略法：①价值法（Value-based）学习价值函数 Q(s,a)（表示在状态 s 执行动作 a 后的期望累积回报），然后贪心地选择 Q 值最大的动作。适合离散动作空间（如棋类），代表算法 Q-learning、DQN。②策略法（Policy-based）直接学习策略函数 pi(a|s) 输出动作的概率分布，无需通过价值函数间接推导。适合连续动作空间（如机器人控制），代表算法 REINFORCE、PPO。③Actor-Critic 结合两者——Actor 执行策略、Critic 评估价值。Q-learning 工作原理：经典表格法，对每个 (s,a) 对维护一个 Q 值表，用 TD（时序差分）更新——Q(s,a) ← Q(s,a) + alpha * [r + gamma * max_a' Q(s',a') - Q(s,a)]，其中 alpha 是学习率，方括号内是 TD 误差（当前估计与 r + gamma*下一步最优估计的差）。DQN（Deep Q-Network）用深度神经网络逼近 Q 函数，处理高维状态空间（如 Atari 游戏的像素输入）。两个关键创新：①经验回放——将交互数据存入缓冲区，随机采样训练，打破数据相关性；②目标网络——用延迟更新的网络计算目标 Q 值，稳定训练。Double DQN 进一步缓解 Q 值过高估计问题。",
    tags: ["价值法", "策略法", "Q-learning", "DQN", "Actor-Critic", "TD"],
  },
  {
    id: "iai-reinforcement-learning-3",
    chapter: "iai-reinforcement-learning",
    level: 2,
    question: "探索与利用的权衡是什么？常见策略有哪些？",
    answer:
      "探索与利用是强化学习的根本性权衡：利用（Exploitation）是选择已知 Q 值最高的动作，最大化当前期望回报，但可能错过更优的未知动作；探索（Exploration）是尝试非最优动作，可能发现更好的策略，但短期回报可能降低。如果只利用不探索，智能体可能陷入局部最优；如果只探索不利用，智能体无法积累回报。常见策略：①epsilon-greedy——以概率 epsilon 随机选择动作（探索），以 1-epsilon 选择 Q 值最高的动作（利用）。epsilon 通常随时间衰减（早期多探索，后期多利用）。简单有效，最常用。②UCB（Upper Confidence Bound）——优先选择不确定性高（被尝试次数少）的动作，公式 UCB = Q(s,a) + c * sqrt(ln(N) / n(s,a))，其中 N 是总尝试次数，n(s,a) 是该动作被选次数。平衡了 Q 值和不确定性。③Softmax——按 Q 值的 softmax 概率选择动作，Q 值越高被选概率越大但非确定性，温度参数控制探索程度。选择依据：简单场景用 epsilon-greedy，理论保证用 UCB，连续空间用 Softmax。",
    tags: ["探索与利用", "epsilon-greedy", "UCB", "Softmax", "权衡"],
  },
  {
    id: "iai-reinforcement-learning-4",
    chapter: "iai-reinforcement-learning",
    level: 3,
    question: "AlphaGo 的核心技术是什么？它对强化学习领域有什么意义？",
    answer:
      "AlphaGo（2016）的核心技术组合：①监督学习初始化——用人类专业棋谱（约 3000 万步）训练策略网络，学习人类专家的落子习惯，作为初始策略。②强化学习提升——策略网络通过自我对弈（与历史版本对弈）用策略梯度优化，超越人类水平，发现人类未知的策略。③价值网络——评估棋局胜率（当前局面下黑/白获胜的概率），用于 MCTS 的叶节点评估，替代耗时的随机 rollout。④MCTS（蒙特卡洛树搜索）——结合策略网络（缩小搜索范围）和价值网络（评估叶节点）进行搜索，平衡探索与利用。AlphaGo 的意义：①证明了「学习」可以超越「人类经验」——通过自我对弈，AI 发现了人类从未发现的最优策略（如著名的第 37 手）。②为 AlphaZero 奠定基础——AlphaZero 完全不使用人类棋谱，纯从零自对弈学习，在围棋、国际象棋、将棋中均超越人类。③为 RLHF 奠定基础——ChatGPT 的 RLHF（人类反馈强化学习）借鉴了 AlphaGo 用价值网络对齐人类判断的思路。④推动了深度强化学习从游戏到现实的迁移——后续应用于机器人控制、自动驾驶、芯片设计等领域。",
    tags: ["AlphaGo", "MCTS", "策略网络", "价值网络", "自对弈", "RLHF"],
  },
];
