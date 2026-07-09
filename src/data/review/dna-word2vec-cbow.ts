import { ReviewQuestion } from "../types";

export const dnaWord2vecCbowQuestions: ReviewQuestion[] = [
  {
    id: "dna-word2vec-cbow-1",
    chapter: "dna-word2vec-cbow",
    level: 1,
    question: "CBOW 模型的三层网络结构是什么？前向传播的过程是怎样的？",
    answer:
      "CBOW 三层网络结构：①输入层——上下文窗口内每个词的 one-hot 向量（V维，V=词表大小）。②中间层（隐藏层）——将输入层 one-hot 与权重矩阵 W_in（V×H）相乘得到 H 维向量，多个上下文词的向量取平均（这就是「词袋」的含义——不考虑上下文词的顺序），得到中间层向量 h（H维）。③输出层——将 h 与权重矩阵 W_out（H×V）相乘得到 V 维分数，再经过 Softmax 归一化为概率分布，表示每个词作为中心词的概率。前向传播过程：context one-hot → W_in 查表得嵌入向量 → 取平均得 h → W_out 乘 h 得分数 → Softmax 得概率。训练目标：让正确中心词的概率最大（交叉熵损失）。",
    tags: ["CBOW", "网络结构", "前向传播"],
  },
  {
    id: "dna-word2vec-cbow-2",
    chapter: "dna-word2vec-cbow",
    level: 2,
    question: "原始 Softmax 在 word2vec 中有什么计算瓶颈？负采样和分层 Softmax 如何解决？",
    answer:
      "原始 Softmax 瓶颈：Softmax 分母需要计算所有 V 个词的分数并求和（exp(score_i)），V 通常为上万甚至百万级，每次预测都要遍历整个词表，计算量极大。负采样（Negative Sampling）解决方案：不预测「哪个词是正确的」，而是做二分类——「这个词是不是正确的」。正样本1个（正确目标词）+ 随机采样的负样本 k 个（通常5-15个），将 V 分类问题转化为 k+1 个二分类问题。损失函数：L = -log σ(h·w_t) - Σ log σ(-h·w_{n_i})。分层 Softmax（Hierarchical Softmax）解决方案：用霍夫曼树组织词表，每个词对应树上一条路径，预测变为沿路径做 log(V) 次二分类（左走或右走），复杂度从 O(V) 降为 O(log V)。实践中负采样更常用，实现简单且效果好。",
    tags: ["Softmax", "负采样", "分层Softmax", "计算瓶颈"],
  },
  {
    id: "dna-word2vec-cbow-3",
    chapter: "dna-word2vec-cbow",
    level: 2,
    question: "负采样的采样概率为什么用 freq(w)^(3/4) 而不是直接用词频？",
    answer:
      "负采样用 freq(w)^(3/4) 而非直接词频的原因：平衡高频词和低频词的采样概率。直接用词频的问题：高频词（如 the, of, is）在语料中出现频率极高，按词频采样会几乎只采到这些高频词作为负样本，低频词几乎不会被采为负样本，导致低频词的嵌入向量得不到充分训练。freq(w)^(3/4) 的效果：指数 3/4 小于1，对高频词的频率做「压缩」（如频率0.1的词，0.1^0.75≈0.178，相对占比降低），对低频词的频率做「提升」（如频率0.001的词，0.001^0.75≈0.0056，相对占比提升）。这样高频词仍更容易被采到（符合它们在语料中更常见的现实），但低频词也有合理的被采样概率，使得所有词的嵌入都能得到充分训练。这个 3/4 次方的经验值来自 word2vec 原论文的实验调优。",
    tags: ["负采样", "采样概率", "freq34"],
  },
  {
    id: "dna-word2vec-cbow-4",
    chapter: "dna-word2vec-cbow",
    level: 3,
    question: "用 Python/NumPy 简述 CBOW + 负采样的训练流程，包括前向传播、损失计算和反向传播。",
    answer:
      "CBOW + 负采样训练流程（简化伪代码）：# 前向传播：context_idxs = [word_to_id[w] for w in context_words]  # 上下文词ID；h = np.mean(W_in[context_idxs], axis=0)  # 查表+平均得中间向量(H维)；# 负采样：neg_idxs = np.random.choice(V, size=k, p=neg_sampling_dist)  # 按freq^0.75采样k个负样本；# 正样本分数：pos_score = np.dot(h, W_out[target_idx])  # h·w_out[t]；pos_prob = sigmoid(pos_score)；# 负样本分数：neg_scores = np.dot(h, W_out[neg_idxs])  # h·w_out[neg]；neg_probs = sigmoid(-neg_scores)；# 损失：loss = -np.log(pos_prob) - np.sum(np.log(neg_probs))；# 反向传播：d_pos = pos_prob - 1  # 正样本梯度；d_neg = sigmoid(neg_scores)  # 负样本梯度(=1-sigmoid(-x))；# 更新W_out：W_out[target_idx] -= lr * d_pos * h；W_out[neg_idxs] -= lr * d_neg[:, None] * h；# 更新W_in（梯度传回上下文词）：dh = d_pos * W_out[target_idx] + np.sum(d_neg[:, None] * W_out[neg_idxs], axis=0)；W_in[context_idxs] -= lr * dh / len(context_idxs)  # 平均分摊。核心：正样本让 h·w_t 增大，负样本让 h·w_n 减小。",
    tags: ["CBOW实现", "负采样", "反向传播", "训练流程"],
  },
];
