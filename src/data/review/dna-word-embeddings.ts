import { ReviewQuestion } from "./types";

export const dnaWordEmbeddingsQuestions: ReviewQuestion[] = [
  {
    id: "dna-word-embeddings-1",
    chapter: "dna-word-embeddings",
    level: 1,
    question: `CBOW 和 Skip-gram 模型的原理分别是什么？各有什么特点？`,
    answer:
      `CBOW（连续词袋模型）：用上下文词预测中心词。输入是上下文窗口内的多个词，输出是中心词。例如输入 {the, cat, on, mat} 预测 sat。特点是训练速度快（每个样本只需一次前向传播）、对高频词效果好、适合小语料。Skip-gram（跳字模型）：用中心词预测上下文词。输入是中心词，输出是多个上下文词。例如输入 sat 预测 {the, cat, on, mat}。特点是每个中心词会产生多个训练样本（上下文窗口内每个词都是一个样本）、对低频词效果好（低频词也能通过中心词被充分训练）、适合大语料。两者都基于分布式假设，通过预测任务学习词嵌入矩阵。`,
    tags: ["CBOW", "Skip-gram", "word2vec"],
  },
  {
    id: "dna-word-embeddings-2",
    chapter: "dna-word-embeddings",
    level: 2,
    question: `word2vec 模型的权重矩阵如何成为词嵌入？为什么中间层的权重就是词向量？`,
    answer:
      `word2vec 模型有两层权重：输入层到中间层的权重矩阵 W_in（V×H，V=词表大小，H=隐藏维度）和中间层到输出层的权重矩阵 W_out（H×V）。W_in 成为词嵌入的原因：输入是 one-hot 向量（V维，只有对应位置为1），one-hot 乘以 W_in 实际上就是「提取 W_in 的对应行」。因此 W_in 的第 i 行就是词 i 的嵌入向量。训练过程中，模型通过反向传播不断调整 W_in 的值，使得「上下文相似的词」在 W_in 中的行向量趋于相似（因为它们需要在类似的预测任务中产生类似的结果）。训练完成后，W_in 就是学到的词嵌入矩阵，每一行是一个词的稠密语义向量。W_out 也可以作为词向量，但实践中通常用 W_in。`,
    tags: ["权重矩阵", "词嵌入", "W_in"],
  },
  {
    id: "dna-word-embeddings-3",
    chapter: "dna-word-embeddings",
    level: 2,
    question: `词嵌入能捕获哪些语义关系？举例说明。`,
    answer:
      `词嵌入通过向量空间中的几何关系捕获语义关系：①相似性——含义相近的词向量距离近。如 king 和 queen、cat 和 dog 在向量空间中距离较近。②类比关系——向量加减法可表达语义类比。经典例子：king - man + woman ≈ queen，即 king 与 queen 的向量差 ≈ man 与 woman 的向量差（都编码了「性别」这一语义维度）。③聚类关系——同义词、相关词在向量空间中形成簇。如颜色词（red, blue, green）聚在一起。这些关系不是人工标注的，而是模型通过大量文本的上下文统计自动学习到的。分布式假设保证了「上下文相似的词向量相似」，而线性结构则来源于连续的矩阵乘法运算——语义维度自然地映射到向量空间的正交方向上。`,
    tags: ["语义关系", "类比", "向量空间"],
  },
  {
    id: "dna-word-embeddings-4",
    chapter: "dna-word-embeddings",
    level: 3,
    question: `为什么 Skip-gram 比 CBOW 更适合处理低频词？`,
    answer:
      `Skip-gram 更适合低频词的原因：①训练样本数量——CBOW 中，一个低频词作为中心词只产生一个训练样本（上下文词作为输入），而 Skip-gram 中，低频词作为中心词会产生多个训练样本（中心词作为输入，上下文窗口内每个词都是输出目标）。例如窗口大小为2时，Skip-gram 每个词产生4个训练样本，CBOW 只产生1个。低频词在语料中出现次数少，Skip-gram 通过「一词多样本」放大了低频词的训练机会。②梯度更新——CBOW 中上下文词的梯度被平均（多个上下文词共享一个梯度），低频词的贡献被稀释；Skip-gram 中每个上下文词独立计算梯度，低频词作为中心词时能充分更新自己的嵌入向量。③大语料优势——Skip-gram 的多样本特性需要大语料才能发挥优势（小语料中低频词样本太少），所以 Skip-gram 适合大语料。这也是为什么实践中 Google 的 word2vec 用的是 Skip-gram。`,
    tags: ["Skip-gram", "低频词", "训练样本"],
  },
];
