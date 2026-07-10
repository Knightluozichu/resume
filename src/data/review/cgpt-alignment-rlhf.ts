import type { ReviewQuestion } from "./types";

export const cgptAlignmentRlhfQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-alignment-rlhf-1",
    chapter: "cgpt-alignment-rlhf",
    level: 1,
    question: `什么是「对齐」？为什么预训练模型需要对齐才能服务用户？`,
    answer:
      `对齐是让模型行为符合人类意图和价值观的过程。预训练基座模型只会「续写文本」：给个开头它接着写，但它不懂对话格式，可能续写成无关内容；它没有安全意识，可能产出有害、偏见、虚假内容；它不会拒绝，可能被诱导做坏事。对齐解决三个问题：①让它学会以「助手」身份对话（SFT）。②让它偏好人类认可的回答（RM+RLHF）。③让它拒绝有害请求。没有对齐，GPT-3 早就发布了但没人用；有了对齐才有 ChatGPT 的爆发。`,
    tags: ["对齐", "预训练局限", "3H目标"],
  },
  {
    id: "cgpt-alignment-rlhf-2",
    chapter: "cgpt-alignment-rlhf",
    level: 2,
    question: `RLHF 的三个阶段分别做什么？它们如何衔接？`,
    answer:
      `三阶段：①SFT 监督微调——人工编写高质量「指令-回答」对，监督学习微调基座模型，让它学会对话格式和基础指令遵循，产出 SFT 模型。②RM 奖励模型——让 SFT 模型对同一问题生成多个回答，人工排序，用排序数据训练一个打分模型（奖励模型），它学会给更好回答打更高分。③PPO 强化学习——用奖励模型给 SFT 模型的回答打分，用 PPO 算法优化模型策略让它生成高分回答，加 KL 散度约束防止偏离 SFT 太远，产出最终对齐模型。三者递进：SFT 定格式，RM 学偏好，PPO 优化行为。`,
    tags: ["RLHF", "SFT", "RM", "PPO"],
  },
  {
    id: "cgpt-alignment-rlhf-3",
    chapter: "cgpt-alignment-rlhf",
    level: 2,
    question: `对齐的 3H 目标是什么？它们之间可能有什么冲突？`,
    answer:
      `3H 目标：①Helpful 有用——准确完成用户意图，给高质量回答，拒绝无效请求。②Honest 诚实——不编造事实，承认不确定，减少幻觉。③Harmless 无害——拒绝有害请求，不输出违法内容，不产生偏见歧视。冲突：Helpful 和 Harmless 常冲突——用户问有害问题，有用要求满足，无害要求拒绝，需权衡。Helpful 和 Honest 也冲突——用户想听确定答案，但诚实要求承认不确定。对齐的本质就是在这三者间找平衡，不同应用场景侧重不同：客服偏 Harmless，创意写作偏 Helpful。`,
    tags: ["3H目标", "目标冲突", "对齐权衡"],
  },
  {
    id: "cgpt-alignment-rlhf-4",
    chapter: "cgpt-alignment-rlhf",
    level: 3,
    question: `DPO 相比 RLHF 有什么改进？为什么说它「更简单又更稳定」？`,
    answer:
      `DPO（直接偏好优化）跳过奖励模型和 PPO，直接用人类偏好对（好回答 vs 坏回答）优化模型。原理：把「奖励最大化」问题转化为一个分类问题——让模型给好回答的概率高于坏回答，用偏好数据直接微调策略。改进：①省去训练单独的奖励模型，少一个可能出错的环节。②省去 PPO 的在线采样和复杂超参，训练更稳定、更易复现。③计算开销小，工程简单。代价：DPO 是离线方法，不能像 PPO 那样探索新策略，某些场景上限略低。但对大多数应用，DPO 的简单稳定优势使其成为新主流。`,
    tags: ["DPO", "RLHF对比", "偏好优化"],
  },
];
