import type { ReviewQuestion } from "./types";

export const drlFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "drl-final-review-1",
    chapter: "drl-final-review",
    level: 1,
    question: "深度RL的三大范式（基于价值、基于策略、Actor-Critic）的核心区别是什么？请从学习对象、动作空间、策略类型、数据使用四个维度对比。",
    answer:
      "三大范式四维度对比：①学习对象——价值法学习Q(s,a;θ)，间接得策略 a*=argmax Q(s,a)；策略法直接学π_θ(a|s)；Actor-Critic同时学策略π_θ和值函数V_w，Actor负责决策、Critic负责评估。②动作空间——价值法适合离散动作（需枚举所有动作取argmax）；策略法和Actor-Critic天然支持连续动作（网络输出高斯分布参数μ/σ）。③策略类型——价值法学确定性策略（argmax选一个动作）；策略法和Actor-Critic学随机策略（输出概率分布），有利于探索且能在多智能体中保持不可预测性。④数据使用——价值法off-policy（Q-Learning/DQN可用旧数据，经验回放）；纯策略梯度on-policy（必须当前策略采的数据）；Actor-Critic可on-policy（A3C/PPO）或off-policy（SAC/TD3），更灵活。额外维度：⑤方差——价值法方差小（TD目标）；策略法方差大（蒙特卡洛回报）；Actor-Critic方差中等（TD误差）。⑥代表算法——价值法：DQN/Double/Dueling；策略法：REINFORCE/PPO；Actor-Critic：A3C/SAC/TD3。现代深度RL以Actor-Critic为主流，因为它融合了前两者的优势。",
    tags: ["三大范式", "对比", "价值", "策略", "Actor-Critic"],
  },
  {
    id: "drl-final-review-2",
    chapter: "drl-final-review",
    level: 2,
    question: "贝尔曼方程和策略梯度定理分别是价值法和策略法的基石，它们如何统一于Actor-Critic框架？",
    answer:
      "贝尔曼方程和策略梯度定理的统一：①贝尔曼方程（价值法基石）——Q(s,a) = E[r + γ max Q(s',a')]，定义了最优值函数的递归关系。DQN用它构造TD目标 y = r + γ max Q(s',a';θ⁻)，用梯度下降最小化 (Q(s,a;θ) - y)²。贝尔曼方程提供「目标」。②策略梯度定理（策略法基石）——∇J = E[∇log π_θ(a|s) · G_t]，定义了策略梯度的计算方式。REINFORCE用它直接更新策略参数θ。策略梯度定理提供「方向」。③Actor-Critic的统一——Critic用贝尔曼方程学习值函数V_w(s)，计算TD误差 δ = r + γV_w(s') - V_w(s)。δ是贝尔曼方程的「残差」，即实际比预期好多少。Actor用δ替代G_t作为策略梯度的权重：θ ← θ + α · δ · ∇log π_θ(a|s)。这里δ的期望等于优势函数 A(s,a) = Q(s,a) - V(s) = E[G_t - V(s)]，即策略梯度定理中的G_t减去基线V(s)。④统一视角——贝尔曼方程通过Critic提供「评估信号」（δ），策略梯度定理通过Actor提供「优化方向」（∇log π），两者在Actor-Critic中合二为一：贝尔曼方程定义Critic的学习目标（→δ），策略梯度定理定义Actor的更新方向（δ×∇log π）。这就是「Actor学策略，Critic评估策略，TD误差连接两者」的数学本质。",
    tags: ["贝尔曼方程", "策略梯度定理", "Actor-Critic", "统一"],
  },
  {
    id: "drl-final-review-3",
    chapter: "drl-final-review",
    level: 2,
    question: "全书核心公式贝尔曼方程和策略梯度定理如何贯穿所有深度RL算法？请举例说明。",
    answer:
      "两个核心公式贯穿所有算法：①贝尔曼方程 Q(s,a) = E[r + γ max Q(s',a')]——a) Q-Learning：表格法直接更新 Q[s][a] += α(r + γ max Q[s'][a'] - Q[s][a])。b) DQN：NN近似Q函数，损失 L = (Q(s,a;θ) - [r + γ max Q(s',a';θ⁻)])²。c) TD3：双Q网络取min，y = r + γ min(Q1,Q2) - β·noise。d) SAC：软贝尔曼方程，y = r + α·H(π) + γ·V_target(s')，在标准贝尔曼方程中加熵项。②策略梯度定理 ∇J = E[∇log π_θ(a|s) · A]——a) REINFORCE：用G_t代替A，θ ← θ + α·∇log π·G_t。b) Actor-Critic：用TD误差δ代替A，θ ← θ + α·∇log π·δ。c) PPO：截断重要性采样比 L = clip(π_new/π_old, 1-ε, 1+ε)·A，本质仍是策略梯度+方差控制。d) SAC：策略目标包含期望Q值和熵，∇J = E[∇log π·(Q - log π)]，策略梯度定理的熵正则化版。③统一视角——所有基于价值的算法（DQN族、TD3）以贝尔曼方程为核心，通过最小化TD误差学习值函数。所有基于策略的算法（REINFORCE、PPO）以策略梯度定理为核心，通过梯度上升优化策略。Actor-Critic算法（A3C、SAC）同时使用两者——贝尔曼方程训练Critic，策略梯度定理训练Actor。SAC是两者的终极融合：软贝尔曼方程（Critic）+ 最大熵策略梯度（Actor）+ off-policy经验回放（样本效率），代表了2018-2019年深度RL算法的成熟。",
    tags: ["贝尔曼方程", "策略梯度定理", "贯穿", "统一视角"],
  },
  {
    id: "drl-final-review-4",
    chapter: "drl-final-review",
    level: 3,
    question: "学完全书后，面对一个新RL任务，描述完整的决策与实现流程。从任务分析到算法部署的每一步。",
    answer:
      "新RL任务的完整决策与实现流程：①任务分析——状态空间（离散/连续、维度、是否有图像输入）、动作空间（离散/连续、维度）、奖励性质（稀疏/密集、是否有安全约束）、样本成本（仿真免费 vs 真实昂贵）、horizon长度（短回合 vs 持续任务）。②环境搭建——选择仿真器（Gym/MuJoCo/Isaac Gym），实现reset/step接口，定义状态编码（图像用CNN预处理、连续状态归一化）、动作映射、奖励函数（遵循稠密+可学+一致三原则）、终止条件。先用随机策略验证环境正确性。③算法选择——离散动作+图像输入→DQN/PPO；连续动作+大规模仿真→PPO（稳定）；连续动作+样本贵→SAC（高效）；连续控制+高精度→TD3。不确定时先跑PPO baseline。④网络设计——图像输入用CNN（NatureCNN/ResNet）+ 全连接；向量输入用MLP（2-3层，256-512神经元）。输出层：离散用softmax，连续用高斯μ+σ。⑤训练配置——学习率1e-4~3e-4（Adam）、γ=0.99、batch size 64-256、经验回放1e5~1e6（off-policy）、epoch 10（PPO）、探索ε=0.1衰减或α自适应（SAC）。⑥训练监控——绘制回报曲线、loss曲线、Q值范围、梯度范数。定期关闭探索评估真实策略。⑦调试——不收敛：检查奖励符号/尺度、状态归一化、梯度爆炸/消失、学习率、探索是否充分。震荡：检查目标网络更新频率、奖励是否太稀疏。⑧域随机化+课程学习——随机化环境参数提高鲁棒性，由易到难逐步提升。⑨评估——成功率、累积奖励、安全指标（碰撞次数等）、与baseline对比。⑩部署——模型量化压缩、推理优化、安全监控、异常回滚。持续迭代：收集数据→发现问题→改进奖励/环境→重新训练→验证→上线。",
    tags: ["决策流程", "实现流程", "综合应用", "工程实践"],
  },
];
