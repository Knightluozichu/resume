import type { ReviewQuestion } from "./types";

export const drlActorCriticQuestions: ReviewQuestion[] = [
  {
    id: "drl-actor-critic-1",
    chapter: "drl-actor-critic",
    level: 1,
    question: `Actor-Critic架构中Actor和Critic分别做什么？它们如何协作？`,
    answer:
      `Actor-Critic架构中两个网络的分工：①Actor（策略网络）——参数化策略π_θ(a|s)，输入状态s，输出动作（或动作概率分布）。负责「决策」——决定在每个状态下做什么。更新方向：沿TD误差δ的正方向更新，增大好动作的概率。②Critic（价值网络）——参数化值函数V_w(s)，输入状态s，输出状态值标量。负责「评估」——评价当前策略下状态s的好坏。更新方向：最小化TD误差的平方，使V_w(s)逼近真实的期望回报。协作方式：Critic计算TD误差 δ = r + γV(s') - V(s)，这是「实际比预期好多少」的信号。δ为正说明动作比预期好，Actor增大该动作概率；δ为负说明比预期差，Actor降低该动作概率。Critic则用δ修正自己的值估计。两者交替更新，Critic越来越准，Actor策略越来越好。相比纯策略梯度用G_t（蒙特卡洛回报，方差大），Actor-Critic用δ（TD误差，方差小），是偏差-方差的最佳平衡。`,
    tags: ["Actor-Critic", "Actor", "Critic", "协作"],
  },
  {
    id: "drl-actor-critic-2",
    chapter: "drl-actor-critic",
    level: 2,
    question: `TD误差δ如何连接Actor和Critic的更新？写出两者的更新公式。`,
    answer:
      `TD误差δ连接Actor和Critic的机制：δ = r + γV_w(s') - V_w(s)。这是Critic计算的「实际比预期好多少」的信号——r + γV(s')是新的估计（有新信息），V(s)是旧估计，差值δ就是修正量。Critic更新：w ← w + β · δ · ∇_w V_w(s)。目标是最小化 TD误差的平方，即让V_w(s)逼近 r + γV_w(s')。δ为正说明V(s)被低估，需增大；δ为负说明被高估，需减小。Actor更新：θ ← θ + α · δ · ∇_θ log π_θ(a|s)。这里用δ代替REINFORCE中的G_t作为权重——δ为正时增大动作a的概率（动作比预期好），δ为负时降低概率（比预期差）。关键区别：REINFORCE用G_t（整条轨迹的回报，方差极大），Actor-Critic用δ（单步TD误差，方差小得多），但引入了Critic估计V(s)的偏差。这就是偏差-方差权衡——Actor-Critic用小偏差换大方差缩减，实践效果远优于纯策略梯度。δ的期望等于优势函数 A(s,a) = Q(s,a) - V(s)，是动作a相对平均值的好坏。`,
    tags: ["TD误差", "更新公式", "Actor更新", "Critic更新"],
  },
  {
    id: "drl-actor-critic-3",
    chapter: "drl-actor-critic",
    level: 2,
    question: `A3C的异步并行训练机制是什么？为什么它比单线程Actor-Critic更有效？`,
    answer:
      `A3C（Asynchronous Advantage Actor-Critic）的异步并行机制：①多个Worker线程各自持有一份Actor-Critic网络的本地拷贝（θ_local, w_local），共享一个全局网络（θ_global, w_global）。②每个Worker独立地与自己的一份环境交互——采集转移、计算TD误差δ和优势A。③Worker用本地梯度更新全局网络：θ_global ← θ_global + α·∇θ（异步写入），w_global ← w_global + β·∇w。④每隔若干步，Worker从全局网络同步参数到本地：θ_local ← θ_global。⑤所有Worker异步运行，无需等待彼此。为什么更有效：①打破数据相关性——多个Worker同时探索不同环境区域，采集的数据天然不相关，相当于天然的「经验回放」（on-policy算法不需要经验回放）。②提高探索效率——不同Worker用不同策略探索不同区域，覆盖更多状态空间。③无需GPU同步——CPU多线程即可，降低硬件门槛。④训练更快——多线程并行采样和梯度更新，吞吐量高。A3C的缺点：异步更新可能导致梯度覆盖（Worker用旧参数算的梯度覆盖了新参数的更新），A2C（同步版）通过去除异步性解决此问题，实际中A2C常与A3C性能相当甚至更优。`,
    tags: ["A3C", "异步并行", "多线程", "Worker"],
  },
  {
    id: "drl-actor-critic-4",
    chapter: "drl-actor-critic",
    level: 3,
    question: `Actor-Critic相比纯策略梯度（REINFORCE）有什么优势和劣势？在什么场景下选择Actor-Critic？`,
    answer:
      `Actor-Critic相比REINFORCE的优势：①方差小——REINFORCE用蒙特卡洛回报G_t（需跑完整个回合，方差极大）；Actor-Critic用TD误差δ（单步估计，方差小得多），训练更稳定、收敛更快。②在线更新——REINFORCE必须等回合结束才能更新（因为G_t需要完整轨迹）；Actor-Critic每步即可更新（TD误差只需r和V(s')），适合长回合或无尽任务。③偏差-方差权衡——Actor-Critic用Critic的估计引入偏差，但大幅缩减方差，实践效果远优于高方差的REINFORCE。劣势：①需要额外训练Critic网络——增加计算量和调参复杂度（多一组超参数：Critic学习率β）。②Critic估计不准时引入偏差——如果V_w(s)估计很差，δ信号不可靠，Actor可能被误导。③训练不稳定——两个网络耦合更新，可能互相干扰（Critic没学好时Actor学不好，Actor策略变化太快Critic追不上）。选择场景：①回合短且简单→REINFORCE够用（方差可控）。②回合长或连续任务→必须用Actor-Critic（不能等回合结束）。③需要快速收敛→Actor-Critic（低方差）。④大规模工业应用→Actor-Critic的进阶版（PPO/SAC/TD3），已解决稳定性问题。现代深度RL几乎不用纯REINFORCE，Actor-Critic是主流范式。`,
    tags: ["Actor-Critic", "REINFORCE", "优劣势", "场景选择"],
  },
];
