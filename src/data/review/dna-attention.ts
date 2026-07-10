import { ReviewQuestion } from "./types";

export const dnaAttentionQuestions: ReviewQuestion[] = [
  {
    id: "dna-attention-1",
    chapter: "dna-attention",
    level: 1,
    question: `注意力机制解决了 seq2seq 的什么问题？它的核心思想是什么？`,
    answer:
      `注意力机制解决的问题是 seq2seq 的「固定长度上下文瓶颈」——编码器将整个源序列压缩为一个固定向量，长句子信息丢失，解码器每步只能访问同一个向量。核心思想：解码器在生成每个目标词时，不再只依赖一个固定的上下文向量，而是「动态计算」对编码器每个隐状态的关注程度（注意力权重），然后对所有隐状态加权求和，得到当前步专属的上下文向量 c_t。不同时间步的 c_t 不同，因为解码器在生成不同词时需要关注源序列的不同部分。例如翻译时生成「我」关注 \"I\"，生成「学生」关注 \"student\"。注意力机制让解码器拥有了「选择性关注」的能力，彻底打破了固定瓶颈。`,
    tags: ["注意力", "上下文瓶颈", "动态加权"],
  },
  {
    id: "dna-attention-2",
    chapter: "dna-attention",
    level: 2,
    question: `注意力权重的计算过程分哪几步？写出公式。`,
    answer:
      `注意力权重计算三步：①打分（Score）——计算解码器当前状态 s_t 与编码器每个隐状态 h_i 的相关性分数。常用方法：点积 score(s_t, h_i) = s_t · h_i，或加性注意力 score(s_t, h_i) = v^T · tanh(W·s_t + U·h_i)。②归一化（Softmax）——将分数通过 Softmax 转化为概率分布：α_i = exp(score_i) / Σ_j exp(score_j)。所有 α_i 之和为1，表示注意力在各个编码器隐状态上的分配比例。③加权求和——用注意力权重对编码器隐状态加权求和，得到上下文向量：c_t = Σ_i α_i · h_i。得到 c_t 后，将其与解码器状态 s_t 拼接，用于预测当前目标词。整个过程中 α 是动态的——不同的 s_t 产生不同的 α，从而产生不同的 c_t。`,
    tags: ["注意力计算", "打分", "Softmax", "加权求和"],
  },
  {
    id: "dna-attention-3",
    chapter: "dna-attention",
    level: 2,
    question: `点积注意力和加性注意力有什么区别？各有什么优缺点？`,
    answer:
      `点积注意力：score(s_t, h_i) = s_t · h_i（直接计算解码器状态与编码器隐状态的内积）。优点：计算简单高效（一次矩阵乘法）、可利用高度优化的矩阵乘法库、适合高维向量。缺点：当向量维度很高时，点积值可能很大，导致 Softmax 梯度趋近于0（梯度消失）。Transformer 中的缩放点积注意力用 √d_k 缩放解决这个问题。加性注意力（Bahdanau 注意力）：score(s_t, h_i) = v^T · tanh(W·s_t + U·h_i）（通过一个小的前馈网络计算分数）。优点：更灵活（通过 W 和 U 学习如何组合 s_t 和 h_i）、在低维向量上效果可能更好。缺点：参数更多（W、U、v）、计算量更大（需要两次矩阵乘法+激活函数）。实践中：Transformer 系列几乎全用缩放点积注意力（效率高），Bahdanau 加性注意力主要用于早期 RNN+Attention 模型。`,
    tags: ["点积注意力", "加性注意力", "Bahdanau", "对比"],
  },
  {
    id: "dna-attention-4",
    chapter: "dna-attention",
    level: 3,
    question: `注意力机制中的「查询-键-值」（Query-Key-Value）框架是什么？它如何统一了不同的注意力变体？`,
    answer:
      `Query-Key-Value 框架：将注意力抽象为一个「检索」过程。Query（查询）——当前想要检索信息的向量（seq2seq 中是解码器状态 s_t）。Key（键）——被检索项的「索引」向量（seq2seq 中是编码器隐状态 h_i，用于与 Query 计算相关性）。Value（值）——被检索项的「内容」向量（seq2seq 中也是 h_i，用于加权求和）。统一公式：Attention(Q, K, V) = softmax(score(Q, K)) · V。在 seq2seq 注意力中 Q=s_t, K=V=h_i；在 Transformer 自注意力中 Q=K=V 都是同一序列的变换（Q=W_q·x, K=W_k·x, V=W_v·x）；在交叉注意力中 Q 来自解码器，K=V 来自编码器。这个框架统一了所有注意力变体：区别只在于 Q、K、V 来源不同，计算方式（打分函数）可以通用。理解 QKV 框架是从注意力机制理解 Transformer 的关键——Transformer 的全部核心就是这个框架加上多头和位置编码。`,
    tags: ["Query-Key-Value", "QKV框架", "自注意力", "检索"],
  },
];
