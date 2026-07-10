import { ReviewQuestion } from "./types";

export const dlrPolicyGradientQuestions: ReviewQuestion[] = [
  {
    id: "dlr-policy-gradient-1",
    chapter: "dlr-policy-gradient",
    level: 1,
    question: `策略梯度方法与值函数方法（如 Q学习/DQN）的核心区别是什么？`,
    answer:
      `核心区别：①学习对象——值函数方法学 Q(s,a) 或 V(s)，再通过 argmax 间接得到策略；策略梯度方法直接参数化并学习策略 pi_theta(a|s)，输出动作的概率分布。②动作空间——值函数方法需对每个离散动作计算 Q 再 argmax，无法处理连续动作空间（max 在连续空间无解析解）；策略梯度直接从概率分布采样，天然支持连续动作。③策略类型——值方法产生确定性策略（argmax 选单一动作）；策略梯度产生随机策略（输出概率分布），有利于探索。④优化方式——值方法用 TD 误差更新 Q（回归问题）；策略梯度用目标函数 J(theta) 对 theta 的梯度上升（直接优化策略性能）。⑤理论基础——值方法基于贝尔曼方程；策略梯度基于策略梯度定理。⑥方差与偏差——值方法通过自举有偏但低方差；策略梯度用 MC 回报无偏但高方差（需基线减方差）。⑦适用场景——值方法适合离散动作、小状态空间；策略梯度适合连续动作、需要随机策略、或多模态最优策略的任务。两者并非对立——Actor-Critic 将两者结合，是现代深度 RL（A3C/PPO/SAC）的基础。`,
    tags: ["策略梯度", "值方法", "连续动作"],
  },
  {
    id: "dlr-policy-gradient-2",
    chapter: "dlr-policy-gradient",
    level: 2,
    question: `策略梯度定理是什么？它的直觉含义是什么？`,
    answer:
      `策略梯度定理：grad_theta J(theta) = E_pi [ grad_theta log pi_theta(a|s) * Q_pi(s,a) ]。其中 J(theta) 是策略 pi_theta 的期望累计回报（性能指标），grad_theta log pi_theta(a|s) 是对数策略梯度，Q_pi(s,a) 是动作值函数。直觉含义：①梯度方向——grad_theta log pi_theta(a|s) 指向「增大在状态 s 选动作 a 的概率」的方向。②加权——用 Q_pi(s,a) 加权：Q 大（好动作）的梯度被放大，增大其概率；Q 小（差动作）的梯度被缩小甚至反向，减小其概率。③期望——对所有 (s,a) 按 pi_theta 的概率求期望，即按「实际发生的频率」加权。整体效果：增大好动作概率，减小差动作概率，使策略逐步优化。为什么用 log——直接对 pi 求梯度需处理归一化常数（概率和为1），对 log pi 求梯度利用了 log 的链式法则：grad log pi = grad pi / pi，与采样估计的 1/pi 权重抵消，得到简洁的无偏估计。实践：用 MC 回报 G_t 近似 Q_pi(s,a)，得 REINFORCE 算法：theta ← theta + alpha * grad_theta log pi_theta(a|s) * G_t。策略梯度定理是所有策略方法的数学基础。`,
    tags: ["策略梯度定理", "对数梯度", "加权"],
  },
  {
    id: "dlr-policy-gradient-3",
    chapter: "dlr-policy-gradient",
    level: 2,
    question: `REINFORCE 算法的流程是什么？它有什么主要缺点？如何改进？`,
    answer:
      `REINFORCE（蒙特卡洛策略梯度）流程：①用当前策略 pi_theta 采样一个完整 episode：s_0, a_0, r_1, s_1, a_1, r_2, ..., s_T。②对每步 t 计算回报 G_t = sum_{k=t}^{T} gamma^(k-t) * r_{k+1}。③对每步 t 计算梯度并更新：theta ← theta + alpha * grad_theta log pi_theta(a_t|s_t) * G_t。④重复。主要缺点：①高方差——G_t 是完整 episode 的随机回报，方差很大（尤其在长 episode 中），导致梯度估计噪声大、学习慢。②必须等 episode 结束——MC 需完整回报，无法在线更新，在连续任务中不可用。③样本效率低——每个 episode 只产生一次更新，且无法复用旧数据（在策略）。④无基线——梯度中含大量与策略无关的常数项（如所有动作都增大），增加方差但无益。改进方法：①引入基线——减去一个与动作无关的基线 b(s)（通常用 V(s)）：theta ← theta + alpha * grad log pi(a|s) * (G_t - b(s))。基线不改变梯度期望（E[grad log pi * b] = 0），但大幅降低方差。②Actor-Critic——用 TD 误差替代 G_t：用 Critic 网络学 V(s)，TD 误差 delta = r + gamma*V(s') - V(s) 作为优势函数 A(s,a) 的估计，theta ← theta + alpha * grad log pi(a|s) * delta。降低方差且可在线学习。③优势函数——用 A(s,a) = Q(s,a) - V(s) 替代 Q，进一步降方差。这些改进是 PPO/A3C 等现代算法的基础。`,
    tags: ["REINFORCE", "高方差", "基线", "Actor-Critic"],
  },
  {
    id: "dlr-policy-gradient-4",
    chapter: "dlr-policy-gradient",
    level: 3,
    question: `Actor-Critic 架构是什么？为什么它是现代深度强化学习的基石？`,
    answer:
      `Actor-Critic 架构：包含两个组件——①Actor（策略网络 pi_theta(a|s)）——根据当前状态输出动作概率，负责决策。②Critic（值网络 V_w(s) 或 Q_w(s,a)）——评估当前策略的好坏，负责给 Actor 反馈。两者交替更新：Critic 用 TD 学习更新值函数（w ← w + beta * delta * grad_w V(s)），Actor 用 Critic 的 TD 误差作为优势信号更新策略（theta ← theta + alpha * grad log pi(a|s) * delta）。这就是 GPI 的实例——Actor 是策略改进，Critic 是策略评估。为什么是现代深度 RL 基石：①降方差——用 Critic 的 TD 误差替代 MC 回报，方差大幅降低（只一步随机性），训练更稳定。②在线学习——TD 误差每步可算，无需等 episode 结束。③统一框架——值方法和策略方法的优点结合：Actor 直接优化策略（支持连续动作），Critic 提供低方差梯度（借用值函数的自举优势）。④扩展性——所有主流深度 RL 算法都是 Actor-Critic 的变体：A3C（异步分布式）、A2C（同步）、PPO（裁剪目标函数防止更新过大）、SAC（最大熵正则化鼓励探索）、DDPG/TD3（确定性策略梯度处理连续动作）。这些算法在机器人控制、游戏 AI、大模型 RLHF 等领域取得突破，Actor-Critic 架构是它们共同的骨架。`,
    tags: ["Actor-Critic", "基石", "PPO", "A3C"],
  },
];
