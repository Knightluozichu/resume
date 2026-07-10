import type { ReviewQuestion } from "./types";

export const llmPosttrainingQuestions: ReviewQuestion[] = [
  {
    id: "llm-posttraining-1",
    chapter: "llm-posttraining",
    level: 1,
    question: `SFT（监督微调）的目标和方法是什么？它解决什么问题？`,
    answer:
      `SFT（Supervised Fine-Tuning，监督微调）的目标是让预训练基座模型学会遵循指令并以对话格式回答。方法：收集高质量的指令-回答对数据（通常万级别），用监督学习方式微调预训练模型——输入指令，目标输出为期望回答，最小化交叉熵损失。解决的问题：①预训练模型只会续写文本，不会「对话」——SFT 教模型理解指令并生成结构化回答；②格式规范化——让模型输出符合对话格式（如用户/助手轮次）；③行为引导——初步引导模型行为方向。SFT 是后训练的第一步，效果是让模型从「能说话」变成「会回答」，但还不会区分回答好坏——这需要 RLHF/DPO 进一步优化。SFT 成本中等，万级精标数据即可显著提升指令遵循能力。`,
    tags: ["SFT", "监督微调", "指令遵循", "后训练"],
  },
  {
    id: "llm-posttraining-2",
    chapter: "llm-posttraining",
    level: 2,
    question: `RLHF 的三阶段流程是什么？奖励模型（RM）在其中起什么作用？`,
    answer:
      `RLHF（Reinforcement Learning from Human Feedback）三阶段：①SFT——先用监督微调让模型学会基本对话格式。②训练奖励模型（RM）——对同一个 prompt 生成多个回答，让人类标注员排序偏好，用排序数据训练一个奖励模型，输入 prompt+回答输出标量奖励分数，RM 学习到「人类觉得什么回答更好」。③PPO 强化学习——用 RM 的奖励分数作为强化学习的奖励信号，通过 PPO 算法优化生成策略，让模型生成 RM 给高分的回答，同时加 KL 散度约束防止偏离 SFT 模型太远。RM 的作用：将人类偏好转化为可微分的奖励信号——直接用人类标注做强化学习成本太高（每个样本都要人评），RM 学习人类偏好后可自动给任意回答打分，使大规模强化学习可行。RM 质量直接决定 RLHF 效果上限。`,
    tags: ["RLHF", "奖励模型", "PPO", "三阶段", "人类偏好"],
  },
  {
    id: "llm-posttraining-3",
    chapter: "llm-posttraining",
    level: 2,
    question: `DPO 相比 RLHF 有什么优势？它是如何简化对齐流程的？`,
    answer:
      `DPO（Direct Preference Optimization，直接偏好优化）相比 RLHF 的优势：①无需训练奖励模型——RLHF 需要先训练 RM 再做 PPO，DPO 直接用偏好对数据优化策略模型，跳过 RM 训练。②训练更简单稳定——PPO 是在线强化学习，需要同时维护策略模型、奖励模型、参考模型，训练不稳定且超参数敏感；DPO 是离线优化，只需策略模型和参考模型，类似普通监督训练。③成本更低——省去了 RM 训练和 PPO 的复杂采样循环，训练成本约为 RLHF 的 1/3-1/2。④效果接近——在多数任务上 DPO 效果接近甚至匹配 RLHF。简化原理：DPO 通过数学推导证明，最优的 RLHF 策略可以用偏好对的似然比直接表达，因此可以直接用偏好数据（好回答 vs 差回答）最大化好回答对数似然、最小化差回答对数似然，等价于隐式地优化了 RM+PPO 的目标，但流程大大简化。`,
    tags: ["DPO", "RLHF", "偏好优化", "简化流程"],
  },
  {
    id: "llm-posttraining-4",
    chapter: "llm-posttraining",
    level: 3,
    question: `3H 对齐目标（Helpful、Honest、Harmless）分别是什么？它们之间可能存在什么冲突？如何平衡？`,
    answer:
      `3H 对齐目标：①Helpful（有用）——模型应准确理解用户意图并提供有帮助的回答，解决用户问题。②Honest（诚实）——模型应如实回答，不编造信息（减少幻觉），对不确定的内容表达不确定性。③Harmless（安全）——模型不应输出有害、有毒、违法或歧视性内容，不应协助危险活动。三者冲突：①有用 vs 安全——用户请求有害信息时，有用意味着配合但安全意味着拒绝，如「如何制作危险物品」。②有用 vs 诚实——对不确定的问题，有用可能倾向于给出答案但诚实要求承认不确定，如模糊事实查询。③安全 vs 诚实——过度安全可能导致模型回避正常问题（过度拒绝），表面上安全但不诚实。平衡方法：①分层处理——明确有害请求坚决拒绝，模糊请求给出谨慎回答加不确定性声明，正常请求尽力帮助。②宪法 AI（Constitutional AI）——用规则集约束模型行为，在有用和安全之间找平衡。③红队测试——主动测试边界情况，校准拒绝阈值。④RLHF 偏好数据设计——在标注偏好时同时考虑 3H 权衡。`,
    tags: ["3H对齐", "Helpful", "Honest", "Harmless", "冲突平衡"],
  },
];
