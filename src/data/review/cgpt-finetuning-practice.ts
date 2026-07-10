import type { ReviewQuestion } from "./types";

export const cgptFinetuningPracticeQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-finetuning-practice-1",
    chapter: "cgpt-finetuning-practice",
    level: 1,
    question: `LoRA 的原理是什么？为什么它只需训练 1% 参数就能接近全参微调效果？`,
    answer:
      `LoRA（低秩适配）原理：冻结原模型全部参数，在每层权重旁路注入两个小矩阵 A 和 B（W' = W + B·A），其中 A、B 是低秩的（秩 r 远小于原维度），只训练 A、B。为什么有效：①「内在维度」假说——模型微调时参数变化是低秩的，用低秩矩阵足以表达任务适配。②原参数冻结保留预训练知识，防灾难遗忘。③可训练参数仅 1% 左右，显存大降。④推理时可将 B·A 合并回原权重，无额外延迟。LoRA 是性价比之王，效果接近全参，资源开销极小，是最主流的微调方法。`,
    tags: ["LoRA", "低秩适配", "PEFT"],
  },
  {
    id: "cgpt-finetuning-practice-2",
    chapter: "cgpt-finetuning-practice",
    level: 2,
    question: `QLoRA 在 LoRA 基础上做了什么改进？它如何让单卡微调 70B 模型成为可能？`,
    answer:
      `QLoRA = 量化 + LoRA：把冻结的基座模型权重量化到 4bit（NF4 量化），只对 LoRA 适配器（A、B 矩阵）用高精度训练。改进：①基座 4bit 存储，显存占用降到原来的 1/4，70B 模型从需多卡降到单卡（约 40GB）。②训练时反量化到高精度计算梯度，保证训练稳定。③LoRA 适配器仍可合并，部署无额外开销。关键技巧：NF4 正态分布量化、双重量化、分页优化器防显存峰值。QLoRA 让消费级显卡（如 RTX 4090）也能微调大模型，极大降低大模型定制门槛，是民主化微调的关键技术。`,
    tags: ["QLoRA", "4bit量化", "单卡微调"],
  },
  {
    id: "cgpt-finetuning-practice-3",
    chapter: "cgpt-finetuning-practice",
    level: 2,
    question: `什么场景该用提示工程、什么场景该用 RAG、什么场景该用微调？`,
    answer:
      `①提示工程——零成本试错，任务简单或想快速验证时优先用。改提示就能解决的不上重武器。②RAG——知识频繁更新、需要溯源、知识量大时用。RAG 把知识放外部库实时检索，模型不动，更新知识只需更新库，适合企业知识库、实时信息。③微调——需固化输出风格/格式、注入领域深度知识、降本提效（减少提示长度）时用。微调把能力内化进权重，适合稳定的领域任务。三者非互斥，实际常组合：RAG 提供事实 + 微调定型风格 + 提示调行为。决策顺序：先提示，不够加 RAG，还不够再微调。`,
    tags: ["提示工程", "RAG", "微调", "选型决策"],
  },
  {
    id: "cgpt-finetuning-practice-4",
    chapter: "cgpt-finetuning-practice",
    level: 3,
    question: `微调的数据准备有哪些要点？为什么「1000 条精标数据胜过 10 万条噪声数据」？`,
    answer:
      `数据准备要点：①任务对齐——数据格式与目标使用场景一致（指令-回答对）。②质量优先——标注准确、回答规范、无矛盾。③多样性——覆盖任务的各种子场景和边界 case，避免分布偏窄。④去重去噪——去除重复和低质样本。⑤数量适度——LoRA 通常几千到几万条即可，过多边际收益递减。为什么质量胜数量：模型学的是数据分布，噪声数据教错规律，10 万条噪声会让模型学到错误模式反而退化；1000 条精标教对规律，模型能正确泛化。「垃圾进垃圾出」在大模型微调上尤为显著，数据质量是微调成败的第一决定因素。`,
    tags: ["数据准备", "数据质量", "精标数据"],
  },
];
