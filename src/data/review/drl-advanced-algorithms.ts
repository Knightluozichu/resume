import type { ReviewQuestion } from "./types";

export const drlAdvancedAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "drl-advanced-algorithms-1",
    chapter: "drl-advanced-algorithms",
    level: 1,
    question: "PPO的核心思想是什么？为什么它成为工业界首选的RL算法？",
    answer:
      "PPO（Proximal Policy Optimization）的核心思想：限制每次策略更新的幅度，防止新策略偏离旧策略太远导致崩溃。具体做法：用截断的重要性采样比 clip(r, 1-ε, 1+ε)（r = π_new(a|s)/π_old(a|s)）来限制更新。当r超出[1-ε, 1+ε]范围时截断梯度，阻止策略做过大调整。PPO是TRPO（信任域策略优化）的简化版——TRPO用KL散度约束保证单调改进但计算复杂，PPO用clip达到类似效果但实现简单。成为工业界首选的原因：①稳定可靠——clip机制防止策略崩溃，训练曲线平滑，几乎不需要精细调参就能work。②on-policy但高效——多步epoch重用数据（通常在一个batch上做4-10个epoch的SGD），比纯on-policy更高效。③通用性强——同时支持离散和连续动作空间，可用于各种任务。④易于实现和扩展——代码简洁，配合GAE（广义优势估计）效果优秀。⑤OpenAI背书——大量验证和工程经验积累。⑥大规模训练友好——支持分布式数据采集和GPU训练。缺点：on-policy样本效率不如SAC，但稳定性优势使其在工业场景中更受青睐。",
    tags: ["PPO", "clip", "策略更新", "工业首选"],
  },
  {
    id: "drl-advanced-algorithms-2",
    chapter: "drl-advanced-algorithms",
    level: 2,
    question: "SAC的最大熵原理如何平衡探索与利用？它的目标函数与普通RL有什么不同？",
    answer:
      "SAC（Soft Actor-Critic）的最大熵原理：在标准RL目标（最大化累积奖励）上增加策略熵奖励，目标函数变为 J = E[Σ_t (r_t + α · H(π(·|s_t)))]，其中H(π)是策略熵，α是温度系数控制探索强度。与普通RL的区别：①普通RL只最大化奖励 Σ r_t，学到的策略是确定性的（选最优动作）。②SAC同时最大化奖励和策略熵，鼓励策略保持随机性——高熵意味着动作分布更均匀，即更多探索。③α的作用——α大时偏重探索（鼓励高熵），α小时偏重利用（趋向确定性策略）。SAC的关键创新是自动调节α：通过约束优化让策略熵保持在目标值（如-dim(A)），α自动随训练动态调整——早期α大（多探索），后期α小（多利用）。SAC的其他特点：①off-policy——用经验回放，样本效率高。②双Q网络——取min(Q1,Q2)消除过估计偏差。③软目标更新——θ⁻ ← τθ + (1-τ)θ⁻，平滑稳定。SAC在连续控制任务上效果优异，是样本效率最高的算法之一，特别适合样本昂贵的真实场景（如机器人）。",
    tags: ["SAC", "最大熵", "探索利用", "温度系数"],
  },
  {
    id: "drl-advanced-algorithms-3",
    chapter: "drl-advanced-algorithms",
    level: 2,
    question: "TD3的三个核心改进分别解决什么问题？每个改进的原理是什么？",
    answer:
      "TD3（Twin Delayed DDPG）在DDPG基础上的三个改进：①双Q网络（Twin Q）——问题：DDPG的Q网络存在过估计偏差（max操作放大噪声），导致策略追随错误的Q值。原理：训练两个独立Q网络Q1、Q2，TD目标用两者最小值 y = r + γ min(Q1(s',a'), Q2(s',a'))。取min使估计更保守，避免正向偏差累积。②延迟策略更新（Delayed Policy Update）——问题：DDPG中Actor和Critic同步更新，但Critic尚未收敛时Actor跟随错误的Q值，导致训练不稳定。原理：Critic每步更新，Actor每d步（d=2）才更新一次，且目标网络也每d步同步一次。等Critic相对准确后再更新Actor，减少错误梯度。③目标策略平滑（Target Policy Smoothing）——问题：DDPG在连续动作空间中Q函数对动作极其敏感，微小的动作变化导致Q值跳变，容易被利用为漏洞。原理：在TD目标的动作上添加截断噪声 a' = μ(s') + clip(Noise, -c, c)，使Q函数对动作的依赖更平滑，防止策略利用Q函数的尖峰。三个改进共同解决了DDPG训练不稳定和Q值过估计的问题，使TD3成为连续控制的强基线。",
    tags: ["TD3", "双Q网络", "延迟更新", "策略平滑"],
  },
  {
    id: "drl-advanced-algorithms-4",
    chapter: "drl-advanced-algorithms",
    level: 3,
    question: "面对一个连续控制任务，如何在PPO、SAC、TD3之间选择？需要考虑哪些因素？",
    answer:
      "连续控制任务中PPO/SAC/TD3的选择决策：①样本成本——如果环境仿真快、样本免费（如Mujoco仿真），选PPO（on-policy但稳定，大规模并行采集效率高）。如果样本昂贵（如真实机器人），选SAC（off-policy + 经验回放，样本效率最高，可能比PPO少用10倍样本）。②训练稳定性——PPO最稳定，几乎不需要调参就能work；SAC需要调α和Q网络；TD3需调噪声参数。如果追求「开箱即用」，选PPO。③探索需求——如果任务需要持续探索（复杂环境、稀疏奖励），SAC的最大熵机制自动探索，效果最好。如果任务简单、确定性策略足够，TD3的确定性策略更精确。④动作维度——低维（如3-6维关节）三个都行；高维（如人形机器人30+维）SAC和TD3的off-policy优势明显。⑤是否需要随机策略——如果部署时需要随机策略（如多智能体博弈），SAC天然输出分布；PPO也行；TD3是确定性的。⑥工程成熟度——PPO最成熟、社区支持最好；SAC近年来成为学术界新标配。总结：大规模仿真+追求稳定→PPO；真实环境+样本贵→SAC；精确控制+低维→TD3。不确定时先用PPO跑baseline，再试SAC。",
    tags: ["算法选型", "PPO", "SAC", "TD3", "连续控制"],
  },
];
