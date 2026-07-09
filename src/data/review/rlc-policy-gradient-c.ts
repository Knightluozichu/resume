import { ReviewQuestion } from "../types";

export const rlcPolicyGradientCQuestions: ReviewQuestion[] = [
  {
    id: "rlc-policy-gradient-c-1",
    chapter: "rlc-policy-gradient-c",
    level: 1,
    question: "策略梯度方法与基于价值的方法（如Q-Learning）有什么本质区别？各自的优势是什么？",
    answer:
      "本质区别：①基于价值方法（Q-Learning/DQN）——学习值函数 `Q(s,a)`，策略是从Q值间接导出的（如 `π(s) = argmax_a Q(s,a)`），策略是确定性的。②策略梯度方法——直接参数化策略 `π_θ(a|s)`，神经网络输出动作的概率分布，策略是随机的。基于价值方法的优势：①样本效率高（off-policy可用经验回放）。②训练相对稳定（回归问题，有明确目标值）。③适合离散动作空间。缺点：①难以处理连续动作空间（连续动作无法argmax）。②只能学确定性策略（虽然可用ε-贪心加随机性，但不够灵活）。策略梯度的优势：①天然支持连续动作空间（输出高斯分布的均值方差，连续采样）。②能学随机策略（在部分可观测环境或石头剪刀布等博弈中有优势）。③目标函数可端到端优化，无需中间的值函数近似。缺点：①方差大（蒙特卡洛采样估计梯度，噪声大）。②通常on-policy，样本效率低（旧策略数据不能复用）。③收敛慢、易陷入局部最优。本书ch5讲DQN（基于价值），ch6讲Policy Gradient（基于策略），两者对比能深刻理解这一权衡。",
    tags: ["策略梯度", "基于价值", "连续动作", "对比"],
  },
  {
    id: "rlc-policy-gradient-c-2",
    chapter: "rlc-policy-gradient-c",
    level: 2,
    question: "写出策略梯度定理的公式，并解释为什么用 `log π` 而不是 `π`。",
    answer:
      "策略梯度定理：`∇θ J(θ) = E_{τ~π_θ} [ Σ_t ∇θ log π_θ(a_t|s_t) · G_t ]`，其中J(θ)是期望累积回报 `E[Σ γ^t r_t]`，τ是一条轨迹，G_t是t时刻的折扣回报。梯度上升 `θ ← θ + α · ∇θ J(θ)` 增大好动作（G_t大）的概率，减小差动作（G_t小）的概率。用 `log π` 而非 `π` 的原因：①数学推导需要——目标函数 `J(θ) = E_τ[R(τ)] = ∫ π_θ(τ) R(τ) dτ`，对θ求梯度时出现 `∇π_θ = π_θ · ∇log π_θ`（对数导数技巧/score function trick），即 `∇π_θ(τ) = π_θ(τ) · ∇log π_θ(τ)`，代入后 `∇J = ∫ π_θ(τ) ∇log π_θ(τ) R(τ) dτ = E[∇log π_θ(τ) R(τ)]`，梯度变成了期望形式，可用蒙特卡洛采样估计。②数值稳定性——`π_θ(a|s)` 是概率∈(0,1)，直接用概率作为权重，梯度可能极小。`log π` 将乘法变加法，数值范围更大、更稳定。③物理直觉——`∇log π_θ(a_t|s_t)` 是「增大动作a_t概率的方向」，乘以G_t（回报）后，回报高的动作概率被增大，回报低的被减小，直观对应「强化好行为」。C语言实现中，`log π` 通过网络输出softmax后取log得到：`log_prob = log(softmax_output[action] + 1e-8)`（加小常数防log(0)）。",
    tags: ["策略梯度定理", "log导数技巧", "score function"],
  },
  {
    id: "rlc-policy-gradient-c-3",
    chapter: "rlc-policy-gradient-c",
    level: 2,
    question: "REINFORCE算法的完整流程是什么？为什么需要计算回报G_t而不是只用即时奖励r_t？",
    answer:
      "REINFORCE算法流程：①初始化策略网络参数θ。②对每个episode：a. 用当前策略π_θ与环境交互，收集完整轨迹 `{(s_0,a_0,r_0), (s_1,a_1,r_1), ..., (s_T,a_T,r_T)}`。b. 对每个时间步t，计算折扣回报 `G_t = Σ_{k=0}^{T-t} γ^k r_{t+k+1}`（从t到episode结束的累积折扣奖励，从后向前递推 `G_t = r_{t+1} + γ·G_{t+1}`）。c. 计算策略梯度 `∇θ J = Σ_t ∇θ log π_θ(a_t|s_t) · G_t`。d. 梯度上升更新 `θ ← θ + α · ∇θ J`。③重复直到收敛。用G_t而非r_t的原因：①信用分配——r_t只是即时奖励，无法体现「当前动作对未来的影响」。比如下棋，一步好棋可能几十步后才得分，只用r_t会忽略这种延迟回报。G_t累积了从t到结束的所有奖励，将「未来的成功」归因于「当前的决策」。②降低方差——虽然 `∇log π · r_t` 也是无偏估计，但方差极大（单步奖励噪声大）。G_t平滑了多步奖励，虽然仍是蒙特卡洛估计（高方差），但比单步r_t更可靠。③与策略梯度定理一致——定理中的G_t是回报，数学上才成立。缺点：G_t需要完整episode（蒙特卡洛方法），不能在线更新，且方差仍较大。Actor-Critic方法用值函数 `V(s)` 估计G_t的期望来降低方差（优势函数 `A_t = G_t - V(s_t)`）。",
    tags: ["REINFORCE", "信用分配", "折扣回报", "方差"],
  },
  {
    id: "rlc-policy-gradient-c-4",
    chapter: "rlc-policy-gradient-c",
    level: 3,
    question: "策略梯度的高方差问题如何缓解？基线（baseline）和优势函数（advantage）的作用是什么？",
    answer:
      "策略梯度高方差的原因：G_t是蒙特卡洛采样的单条轨迹回报，不同轨迹间差异巨大，梯度估计噪声极大，导致训练震荡、收敛慢。缓解方法：①基线（Baseline）——引入与动作无关的基线b(s_t)，将梯度改为 `∇J = E[∇log π(a_t|s_t) · (G_t - b(s_t))]`。数学上可证明减去基线不改变期望（因 `E_{a~π}[∇log π(a|s)] = 0`），但能降低方差。直觉：G_t本身可能很大（如所有奖励都是正的），减去基线后好的动作得正值、差的得负值，梯度方向更明确。常用基线是状态值函数 `b(s_t) = V(s_t)`。②优势函数（Advantage Function）——定义 `A_t = G_t - V(s_t)`（或更精确的 `A_t = Q(s_t,a_t) - V(s_t)`），表示「动作a_t比平均水平好多少」。用优势函数替代G_t：`∇J = E[∇log π(a_t|s_t) · A_t]`。优势：A_t的方差远小于G_t（去除了状态本身的「好坏」只保留动作的「相对优劣」），且仍无偏。这就是Actor-Critic架构——Actor是策略网络π_θ，Critic是值网络V_φ，Critic为Actor提供基线。③其他降方差技术：GAE（Generalized Advantage Estimization）用λ权衡偏差与方差；PPO通过clip策略比率限制更新幅度；TRP用KL散度约束保证策略平稳更新。C语言实现Actor-Critic需要维护两个网络（策略网络和值网络），值网络用TD学习更新 `V(s) ← V(s) + α[r + γV(s') - V(s)]`。",
    tags: ["高方差", "基线", "优势函数", "Actor-Critic"],
  },
];
