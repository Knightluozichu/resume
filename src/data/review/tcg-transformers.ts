import type { ReviewQuestion } from "./types";

export const tcgTransformersQuestions: ReviewQuestion[] = [
  {
    id: "tcg-transformers-1",
    chapter: "tcg-transformers",
    level: 1,
    question: `Transformer架构的核心是什么？它解决了什么问题？`,
    answer:
      `Transformer架构的核心是自注意力（Self-Attention）机制。它解决的核心问题是：如何让模型理解序列中任意两个Token之间的关系，无论它们相距多远。之前的架构（如RNN）按顺序处理Token，远距离的Token之间信息传递需要经过很多中间步骤，导致长程依赖建模困难且无法并行计算。Transformer的自注意力机制让每个Token直接与序列中所有Token计算相关性，一步到位地捕获任意距离的依赖关系，同时所有Token可以并行处理，大幅提高了训练效率。这正是ChatGPT能够理解长文本上下文、生成连贯长篇回答的技术基础。`,
    tags: ["Transformer", "自注意力", "长程依赖", "并行计算"],
  },
  {
    id: "tcg-transformers-2",
    chapter: "tcg-transformers",
    level: 2,
    question: `请详细解释自注意力机制中Q、K、V三个矩阵的作用和计算过程。`,
    answer:
      `自注意力机制中Q、K、V的作用：①Query（查询）——当前Token生成的查询向量，表示\"我在找什么\"，决定当前Token应该关注哪些其他Token。Q = 嵌入向量 × 权重矩阵W_Q。②Key（键）——每个Token生成的键向量，表示\"我有什么\"，被其他Token的Query匹配。K = 嵌入向量 × 权重矩阵W_K。③Value（值）——每个Token生成的值向量，表示\"我的内容\"，是最终被聚合的信息。V = 嵌入向量 × 权重矩阵W_V。计算过程分四步：1.计算相似度——当前Token的Q与所有Token的K做点积，得到当前Token与每个Token的相关性分数。2.归一化——通过softmax将分数转化为概率分布（注意力权重），总和为1。3.加权求和——用注意力权重对所有Token的V进行加权求和。4.输出——得到融合了整个上下文信息的新表示。整个过程让每个Token都能\"看到\"序列中的所有Token，并按相关性加权聚合信息。`,
    tags: ["QKV", "自注意力", "计算过程"],
  },
  {
    id: "tcg-transformers-3",
    chapter: "tcg-transformers",
    level: 2,
    question: `什么是多头注意力？为什么需要多个\"头\"？`,
    answer:
      `多头注意力（Multi-Head Attention）是将自注意力机制并行运行多次（每个称为一个\"头\"），每个头使用不同的Q/K/V权重矩阵，然后将所有头的结果拼接并线性变换后输出。需要多个头的原因：①不同的头可以关注不同类型的关系——一个头可能关注语法关系（主谓一致），另一个头关注语义关系（指代消解），还有一个头关注位置关系（相邻Token）。②单个头的注意力可能被最显著的关系主导，忽略其他重要但不那么显著的关系——多头机制让模型同时从多个角度理解上下文。③多个头的结果拼接后经过线性变换，模型可以学习如何综合不同视角的信息。④多头注意力增加了模型的表达能力，类似于集成学习——多个\"弱注意力\"组合成更强大的理解能力。GPT-3使用了96个注意力头，每个头从不同维度理解语言。`,
    tags: ["多头注意力", "多角度", "并行"],
  },
  {
    id: "tcg-transformers-4",
    chapter: "tcg-transformers",
    level: 3,
    question: `为什么Transformer能取代RNN成为语言模型的主流架构？从并行性、长程依赖和可扩展性三个维度分析。`,
    answer:
      `Transformer取代RNN的三个维度分析：①并行性——RNN必须按顺序处理Token（处理第i个Token需要等第i-1个完成），无法并行化，训练速度受限。Transformer的自注意力机制让所有Token同时计算，充分利用GPU的并行能力，训练速度大幅提升。这使得在海量数据上训练超大模型成为可能。②长程依赖——RNN中远距离Token之间的信息需要经过很多时间步传递，梯度会消失或爆炸，导致难以学习长距离依赖。Transformer中任意两个Token之间的注意力计算是一步到位的（直接做点积），距离不影响信息传递质量，能有效捕获长程依赖。③可扩展性——Transformer架构天然适合规模化：增加层数和参数量可以持续提升性能（Scaling Law），而RNN在规模扩大时面临训练不稳定和效率问题。Transformer的并行性使得大规模分布式训练更加高效。这三点使Transformer成为训练千亿参数大模型的理想架构，奠定了ChatGPT的技术基础。`,
    tags: ["Transformer vs RNN", "并行性", "长程依赖", "可扩展性"],
  },
];
