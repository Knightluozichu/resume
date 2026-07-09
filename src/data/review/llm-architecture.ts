import type { ReviewQuestion } from "./types";

export const llmArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "llm-architecture-1",
    chapter: "llm-architecture",
    level: 1,
    question: "自注意力机制的计算公式是什么？Q、K、V 分别代表什么？",
    answer:
      "缩放点积注意力公式：Attention(Q,K,V) = softmax(QK^T / sqrt(dk)) * V。其中 Q（Query 查询）代表当前 token 的查询向量，K（Key 键）代表所有 token 的索引向量，V（Value 值）代表所有 token 的内容向量。计算过程：①Q 和 K 做点积得到注意力分数矩阵，衡量当前 token 与所有 token 的相关性；②除以 sqrt(dk) 缩放防止梯度消失；③Softmax 归一化为注意力权重；④用权重对 V 加权求和得到输出。直观理解：Q 是「我在找什么」，K 是「我有什么」，V 是「我的实际内容」——注意力让模型动态聚焦相关信息。",
    tags: ["自注意力", "QKV", "缩放点积", "注意力公式"],
  },
  {
    id: "llm-architecture-2",
    chapter: "llm-architecture",
    level: 2,
    question: "多头注意力机制为什么比单头注意力更有效？它是如何工作的？",
    answer:
      "多头注意力将 Q、K、V 分成 h 个头（子空间）并行计算注意力，然后拼接并线性变换输出。优势：①多视角建模——不同头可以关注不同类型的关系（语法、语义、共指等），单头只能学习一种注意力模式；②子空间分解——高维向量分成多个低维子空间，每个头在子空间内计算更高效；③并行计算——各头独立计算可并行，不增加串行开销；④表达能力增强——多头等价于多个注意力函数的集成，模型容量更大。例如 8 头注意力中，某些头可能关注局部依赖（相邻 token），某些头关注长距离依赖，某些头关注实体关系，拼接后线性变换融合多维度信息。实践中 8-96 头是常见配置。",
    tags: ["多头注意力", "子空间", "并行计算", "表达能力"],
  },
  {
    id: "llm-architecture-3",
    chapter: "llm-architecture",
    level: 2,
    question: "Transformer Block 由哪些组件构成？残差连接和 LayerNorm 为什么重要？",
    answer:
      "Transformer Block 由两个子层组成：①多头自注意力 + 残差连接 + LayerNorm；②前馈网络（FFN，两层 MLP + 激活函数）+ 残差连接 + LayerNorm。残差连接（output = x + Sublayer(x)）重要因为：①缓解梯度消失——梯度可通过捷径直接回流，让深层网络可训练；②信息保留——输入信息直接传递到输出，子层只需学习增量；③支持深层堆叠——让数十到上百层 Transformer 可稳定训练。LayerNorm（对每个样本的特征维度归一化）重要因为：①稳定训练——控制每层激活值分布，防止内部协变量偏移；②加速收敛——归一化后梯度更稳定，可用更大学习率；③减少对初始化敏感——不同层有独立的归一化尺度。二者配合让深层 Transformer 训练可行且稳定。",
    tags: ["Transformer Block", "残差连接", "LayerNorm", "深层训练"],
  },
  {
    id: "llm-architecture-4",
    chapter: "llm-architecture",
    level: 3,
    question: "全注意力、因果注意力和稀疏注意力各有什么特点？分别适用于什么场景？",
    answer:
      "三种注意力变体：①全注意力——每个 token 关注序列中所有位置，信息传递最充分，但计算复杂度 O(n^2)，适用于编码器（如 BERT）和短序列场景。②因果注意力（Causal/Masked Attention）——通过上三角掩码让每个 token 只关注当前位置及之前，防止看到未来信息，适用于自回归生成（如 GPT），保证生成时不能偷看后面 token，复杂度仍为 O(n^2) 但可用 KV Cache 优化推理。③稀疏注意力——只关注部分关键位置（如局部窗口 + 全局锚点），将复杂度降为 O(n*log n) 或更低，适用于超长序列场景（如 Longformer, BigBird）。选择原则：短序列用全/因果注意力保证质量，长序列用稀疏注意力平衡效率与效果，生成任务必须用因果注意力防止信息泄露。",
    tags: ["全注意力", "因果注意力", "稀疏注意力", "复杂度", "适用场景"],
  },
];
