import type { ReviewQuestion } from "./types";

export const cgptGptArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-gpt-architecture-1",
    chapter: "cgpt-gpt-architecture",
    level: 1,
    question: "GPT 模型采用什么架构？它的核心组件有哪些？",
    answer:
      "GPT 采用纯解码器（Decoder-only）Transformer 架构。核心组件：①Token Embedding 词嵌入，把 token 映射为高维向量。②位置编码，注入位置信息（GPT 用可学习位置编码或旋转位置编码）。③N 层解码器堆叠，每层含掩码多头自注意力 + 前馈网络 FFN，均带残差连接和层归一化。④最终 LayerNorm + LM Head（Softmax）输出下一个 token 的概率分布。GPT-3 有 96 层、1750 亿参数、96 个注意力头。",
    tags: ["GPT架构", "解码器", "核心组件"],
  },
  {
    id: "cgpt-gpt-architecture-2",
    chapter: "cgpt-gpt-architecture",
    level: 2,
    question: "为什么 GPT 用「掩码」自注意力？它如何保证自回归生成？",
    answer:
      "GPT 用掩码自注意力是为了防止每个位置看到未来的 token。在自注意力中，第 t 个位置只能和第 1 到 t 个位置计算注意力，通过对未来位置施加负无穷掩码（softmax 后变 0）实现因果性。这保证了两点：①训练时可并行处理整个序列（用掩码一次性计算），效率高。②生成时严格按顺序逐 token 产出，第 t 个 token 只依赖前面已生成的内容，符合自回归生成的因果约束。掩码是「训练并行」和「生成因果」能统一的关键。",
    tags: ["掩码注意力", "自回归", "因果掩码"],
  },
  {
    id: "cgpt-gpt-architecture-3",
    chapter: "cgpt-gpt-architecture",
    level: 2,
    question: "残差连接和层归一化在 GPT 中起什么作用？",
    answer:
      "残差连接：把子层输入直接加到输出上（output = sublayer(x) + x），让梯度能直接回传，缓解深层网络的梯度消失问题，使堆叠 96 层仍可训练。层归一化：对每个样本的特征维度做归一化，稳定每层输入分布，加速训练收敛、降低对学习率敏感度。GPT 采用 Pre-Norm（先归一化再进子层），比 Post-Norm 训练更稳定。两者结合让超深网络可训练、可收敛，是 Transformer 能堆到上百层的基础。",
    tags: ["残差连接", "层归一化", "深层训练"],
  },
  {
    id: "cgpt-gpt-architecture-4",
    chapter: "cgpt-gpt-architecture",
    level: 3,
    question: "GPT 的「自回归生成」具体是如何工作的？它和编码器架构有什么本质区别？",
    answer:
      "自回归生成：给定输入序列，模型计算下一个 token 的概率分布，采样/取最大概率得到新 token，把新 token 拼到序列末尾，再重复。每次生成都把已有上下文重新输入模型，直到结束符。本质区别：GPT 是解码器架构，单向注意力只能看过去，适合「生成」任务；BERT 是编码器架构，双向注意力能看全句，适合「理解」任务（分类、填空）。生成时 GPT 逐 token 产出无法回改，BERT 一次性对整句编码。GPT 用自回归换来了生成能力，牺牲了双向理解。",
    tags: ["自回归生成", "编码器对比", "生成式模型"],
  },
];
