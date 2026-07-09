import type { ReviewQuestion } from "./types";

export const lslAlignmentTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "lsl-alignment-techniques-1",
    chapter: "lsl-alignment-techniques",
    level: 1,
    question: "大模型对齐的三个阶段（SFT、RLHF、DPO）分别解决什么问题？各自的核心流程是什么？",
    answer:
      "三阶段解决不同层次的对齐问题：①SFT（监督微调）——解决「指令遵循」问题，让预训练基座学会按指令格式回答。流程：收集指令-回答对（1万-10万条），用最大似然损失微调模型。优点是简单稳定，是对齐必经第一步。②RLHF（人类反馈强化学习）——解决「偏好优化」问题，让模型输出更符合人类偏好的回答。流程：a) 用 SFT 模型对同一 prompt 生成多个回答，人工排序得到偏好数据；b) 训练奖励模型（RM）预测偏好排序；c) 用 PPO 算法以 RM 的奖励为信号优化策略模型，同时用 KL 散度约束防止偏离 SFT 模型太远。③DPO（直接偏好优化）——RLHF 的简化替代，跳过 RM 训练和 PPO，直接用偏好对微调。流程：用偏好对（chosen, rejected）直接优化一个分类损失，让模型增大 chosen 概率、降低 rejected 概率。优点是无需 RM、训练简单稳定，缺点是效果略逊 RLHF。",
    tags: ["SFT", "RLHF", "DPO", "对齐流程"],
  },
  {
    id: "lsl-alignment-techniques-2",
    chapter: "lsl-alignment-techniques",
    level: 2,
    question: "RLHF 中 PPO 训练涉及哪几个模型？为什么需要 KL 散度惩罚？",
    answer:
      "PPO 训练涉及四个模型：①策略模型（Actor）——待优化的目标模型，生成回答。②奖励模型（Reward Model）——对生成的回答打分，提供奖励信号。③参考模型（Reference）——冻结的 SFT 模型，用于计算 KL 散度惩罚。④价值模型（Critic）——估计状态价值，辅助 PPO 计算优势函数（advantage）。需要 KL 散度惩罚的原因：①防止奖励黑客——若不加约束，策略模型可能找到 RM 的漏洞生成「高分但无意义」的文本（如重复高分短语）。②防止分布漂移——策略模型可能偏离预训练学到的语言分布，生成不流畅或无意义的文本。③保持语言能力——KL 惩罚强制策略模型与参考（SFT）模型保持一定相似度，在优化偏好的同时保留语言能力。具体做法：总奖励 = RM 奖励 - beta * KL(策略 || 参考)，beta 控制约束强度。KL 太大模型不变好，KL 太小模型跑偏，需调参。这也是 RLHF 训练不稳定的主要原因之一。",
    tags: ["PPO", "KL散度", "奖励黑客", "RLHF细节"],
  },
  {
    id: "lsl-alignment-techniques-3",
    chapter: "lsl-alignment-techniques",
    level: 2,
    question: "DPO 相比 RLHF 有哪些优势和局限？DPO 的损失函数核心思想是什么？",
    answer:
      "DPO 优势：①无需奖励模型——RLHF 需先训练 RM 再用 PPO，DPO 直接从偏好数据端到端优化，省去 RM 训练。②无需在线采样——PPO 需要策略模型在线生成回答再打分，DPO 离线用已有偏好对训练，无需推理生成。③训练简单——DPO 本质是分类损失，用标准监督学习训练即可，无需 PPO 的复杂强化学习机制。④稳定——没有 PPO 的训练不稳定问题（如奖励黑客、价值函数估计偏差）。⑤资源省——只需 2 个模型（策略+参考），RLHF 需 4 个。DPO 局限：①效果上限略低——DPO 是 RLHF 的近似，在复杂偏好场景下效果不如精心调参的 RLHF。②离线数据依赖——DPO 用固定偏好对训练，无法像 PPO 那样通过在线探索发现新的优化方向。③对数据质量敏感——偏好对质量直接决定效果，噪声数据影响更大。损失函数核心思想：DPO 推导出最优策略与奖励函数的关系，将 RLHF 的奖励最大化转化为直接分类问题。损失 L = -log sigmoid(beta * (log(pi(chosen)/ref(chosen)) - log(pi(rejected)/ref(rejected))))。核心是让策略模型相对参考模型，增大 chosen 概率同时降低 rejected 概率，beta 控制偏离程度。",
    tags: ["DPO", "RLHF对比", "损失函数", "优劣势"],
  },
  {
    id: "lsl-alignment-techniques-4",
    chapter: "lsl-alignment-techniques",
    level: 3,
    question: "对齐的 3H 目标（Helpful、Honest、Harmless）之间存在哪些张力？实践中如何平衡？",
    answer:
      "3H 张力：①Helpful vs Harmless——为了有用需要充分回答问题，但某些有用回答可能有害（如「如何制作危险品」的详细步骤既有用又有害）。过度无害导致模型拒绝太多正常请求（过度对齐/rrfusal），降低有用性。②Helpful vs Honest——为了有用可能需要给出确定答案，但诚实的模型应承认不确定性。过度有用可能导致编造信息（幻觉），降低诚实性。③Honest vs Harmless——诚实披露某些信息可能造成伤害（如如实回答敏感信息）。平衡策略：①分阶段对齐——SFT 教基础能力，RLHF/DPO 优化偏好，安全微调（safety fine-tuning）专门处理 Harmless，各阶段有不同数据配比。②红队测试——主动构造攻击性 prompt 测试模型安全边界，用 bad case 驱动安全微调。③ Constitutional AI——用一组「宪法」规则指导模型自我批评和修正，减少对人工标注的依赖，Anthropic 的方法。④安全护栏（Guardrails）——在推理时加规则过滤或分类器拦截有害输出，作为模型安全的最后一道防线。⑤RLAIF——用 AI 反馈替代部分人工反馈，可大规模生成安全偏好数据。⑥动态权衡——根据应用场景调整 3H 权重：客服场景重 Harmless，研究场景重 Honest，通用场景平衡三者。没有银弹，需根据具体场景和数据持续迭代。",
    tags: ["3H目标", "张力平衡", "安全对齐", "综合分析"],
  },
];
