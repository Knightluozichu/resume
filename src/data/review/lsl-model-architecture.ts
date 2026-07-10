import type { ReviewQuestion } from "./types";

export const lslModelArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "lsl-model-architecture-1",
    chapter: "lsl-model-architecture",
    level: 1,
    question: `Transformer Decoder 的核心结构包含哪些层？自注意力机制的工作原理是什么？`,
    answer:
      `Transformer Decoder 的核心结构从底到顶：①Token 嵌入 + 位置编码——将 Token 映射为向量并注入位置信息。②多头自注意力层（因果掩码）——建模序列内 Token 间的依赖关系。③Add & Norm（残差连接 + 层归一化）——缓解梯度消失、稳定训练。④前馈网络（FFN/SwiGLU）——对每个位置做非线性变换。⑤Add & Norm + RMSNorm——再次残差归一化。⑥输出层（LM Head + Softmax）——映射到词表概率分布。自注意力工作原理：对输入序列的每个 Token，通过三个权重矩阵生成 Query、Key、Value 向量；计算 Query 与所有 Key 的点积得到注意力分数，除以 sqrt(d_k) 缩放后经 Softmax 归一化为权重；用权重对所有 Value 加权求和得到输出。因果掩码将未来位置的注意力分数设为负无穷（Softmax 后为 0），保证自回归生成。多头机制将注意力拆到多个子空间并行计算再拼接，增强模型捕捉不同模式的能力。`,
    tags: ["Transformer", "自注意力", "架构层次"],
  },
  {
    id: "lsl-model-architecture-2",
    chapter: "lsl-model-architecture",
    level: 2,
    question: `RoPE 旋转位置编码相比传统正弦位置编码有什么优势？为什么适合长上下文？`,
    answer:
      `RoPE（Rotary Position Embedding）旋转位置编码将位置信息编码为对 Query 和 Key 向量的旋转操作：对位置 m 的向量，在第 i 个二维平面上旋转角度 m*theta_i。优势：①相对位置建模——两个 Token 的注意力分数只依赖它们的相对距离而非绝对位置，天然适合变长序列。②可外推——通过 NTK-aware 等缩放策略，RoPE 可将训练时的上下文长度外推到更长（如从 4K 外推到 32K/128K），而正弦编码外推能力有限。③计算高效——旋转操作可通过元素级乘法实现，无额外参数。④与注意力兼容——位置信息直接编码在 Q/K 中，不影响 V，注意力计算保持不变。适合长上下文的原因：RoPE 的衰减特性使远距离 Token 的注意力自然衰减，配合缩放因子可在保持近距离注意力的同时扩展远距离建模能力，是 LLaMA、Qwen 等主流长上下文模型的标准选择。`,
    tags: ["RoPE", "位置编码", "长上下文"],
  },
  {
    id: "lsl-model-architecture-3",
    chapter: "lsl-model-architecture",
    level: 2,
    question: `MoE（混合专家）架构的工作原理是什么？相比密集模型有哪些优势和挑战？`,
    answer:
      `MoE 工作原理：将 FFN 层替换为多个「专家」FFN，每个 Token 通过一个门控网络（Router）计算路由概率，只激活 Top-K 个专家（通常 K=2）参与计算。这样模型总参数量增大但单次前向只激活一部分，实现「以存储换计算」。优势：①容量大——总参数量可达密集模型的数倍（如 8x7B MoE 总参数 47B 但单次激活仅 13B），知识容量更大。②推理快——单次计算量只相当于激活参数量的密集模型，推理速度快于同等容量的密集模型。③训练高效——相同计算预算下 MoE 比密集模型效果更好。挑战：①负载均衡——Router 可能偏向少数专家导致不均衡，需要辅助损失（load balancing loss）强制均衡。②通信开销——分布式训练中专家分布在不同 GPU，Token 需要跨卡路由（All-to-All 通信）。③显存占用——虽然激活参数少但全部参数需驻留显存。④训练不稳定——路由决策的离散性增加训练难度。代表：Mixtral 8x7B、DeepSeek-MoE。`,
    tags: ["MoE", "混合专家", "稀疏激活", "优劣势分析"],
  },
  {
    id: "lsl-model-architecture-4",
    chapter: "lsl-model-architecture",
    level: 3,
    question: `MQA 和 GQA 如何优化推理显存？SwiGLU 和 RMSNorm 相比传统 FFN 和 LayerNorm 有什么改进？`,
    answer:
      `MQA（Multi-Query Attention）和 GQA（Grouped-Query Attention）优化 KV 缓存显存：标准 MHA 中每个注意力头有独立的 K/V，KV 缓存随头数线性增长。MQA 让所有 Query 头共享一组 K/V，KV 缓存降到 1/n_heads，但可能掉点。GQA 是折中方案——将 Query 头分成 G 组，每组共享一组 K/V，KV 缓存降到 G/n_heads。GQA 在显存节省和质量之间取得平衡，LLaMA-2/3 采用 GQA。SwiGLU 改进 FFN：传统 FFN 为 FFN(x) = W2 * activation(W1 * x)。SwiGLU 引入门控机制 SwiGLU(x) = Swish(W1*x) * (W3*x) * W2，其中 Swish = x*sigmoid(x)。优势：①门控机制让模型自适应控制信息流。②Swish 激活在负区间有非零梯度，缓解神经元死亡。③实验表明 SwiGLU 比传统 ReLU/GeLU FFN 效果更好。代价是多一个权重矩阵（W3），参数量增加约 50%。RMSNorm 改进 LayerNorm：RMSNorm = x / RMS(x) * gamma，其中 RMS(x) = sqrt(mean(x^2))。相比 LayerNorm 去掉了均值减法操作，计算更简单、速度更快，在大模型中效果与 LayerNorm 相当，LLaMA 等模型采用 RMSNorm。`,
    tags: ["MQA", "GQA", "SwiGLU", "RMSNorm", "推理优化", "综合"],
  },
];
