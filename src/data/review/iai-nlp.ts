import { ReviewQuestion } from "./types";

export const iaiNlpQuestions: ReviewQuestion[] = [
  {
    id: "iai-nlp-1",
    chapter: "iai-nlp",
    level: 1,
    question: `NLP 的处理流水线是什么？词嵌入的原理和语义类比特性是什么？`,
    answer:
      `NLP 处理流水线：原始文本 → 分词（Tokenize，将文本切分为词或子词单元）→ 词嵌入（Embed，将离散词映射为稠密向量）→ 模型编码（如 Transformer 提取上下文特征）→ 下游任务（分类/生成等）。词嵌入原理：将每个词映射为高维稠密向量（如 300 维），使语义相近的词在向量空间中距离相近。Word2Vec 有两种训练方式：CBOW 用上下文词预测中心词，Skip-gram 用中心词预测上下文词。训练后向量空间具有几何结构——方向编码语义关系。语义类比特性：king - man + woman ≈ queen（性别方向上 king→queen 与 man→woman 一致），Paris - France + Italy ≈ Rome（首都方向上一致）。GloVe 则基于全局词共现矩阵学习词向量。这种特性表明词嵌入确实捕捉了词语间的语义关系，而不仅仅是统计共现。`,
    tags: ["NLP", "处理流水线", "分词", "词嵌入", "Word2Vec", "语义类比"],
  },
  {
    id: "iai-nlp-2",
    chapter: "iai-nlp",
    level: 2,
    question: `Transformer 的自注意力机制如何工作？它相比 RNN 有什么优势？`,
    answer:
      `自注意力机制：对于序列中的每个位置，用 Query（Q）与所有位置的 Key（K）做点积，经 softmax 归一化得到注意力权重，再对 Value（V）加权求和。公式为 Attention(Q,K,V) = softmax(QK^T/sqrt(d)) * V，其中 sqrt(d) 是缩放因子防止点积过大导致 softmax 梯度消失。多头注意力是多组 Q/K/V 并行运行，捕获不同子空间的关系模式（语法、语义、共指等），最后拼接。相比 RNN 的优势：①并行性——RNN 必须逐步计算 h_t 依赖 h_{t-1}，无法并行；Transformer 所有位置同时计算自注意力，完全并行，训练速度快得多。②长程依赖——RNN 反向传播时梯度经多层连乘易消失，远距离依赖难学习；Transformer 自注意力直接连接任意两个位置，无论距离多远，一步到位。③表达能力——多头注意力在不同子空间捕获多种关系模式。Transformer 的代价是 O(n^2) 的自注意力复杂度（序列长度的平方），但 GPU 并行计算弥补了这一点。此外 Transformer 需位置编码注入序列顺序信息（因为自注意力本身不含位置信息）。`,
    tags: ["Transformer", "自注意力", "多头注意力", "RNN 对比", "并行性"],
  },
  {
    id: "iai-nlp-3",
    chapter: "iai-nlp",
    level: 2,
    question: `预训练 + 微调范式是什么？BERT 和 GPT 的预训练方式有什么区别？`,
    answer:
      `预训练 + 微调范式：先在大规模无标注语料上预训练学习通用语言表示，再在小规模有标注的任务数据上微调适配下游任务。预训练让模型从海量文本中学习语言规律（语法、语义、世界知识），微调只需少量标注数据即可适配分类、QA、生成等具体任务。BERT 和 GPT 的区别：①BERT（Bidirectional Encoder Representations from Transformers）采用编码器架构，预训练方式为掩码语言模型（MLM）——随机遮盖 15% 的词，让模型根据上下文（双向，左右都看）预测被遮盖的词。BERT 适合理解类任务（分类、QA、NER），因为双向注意力能充分理解上下文。②GPT（Generative Pre-trained Transformer）采用解码器架构，预训练方式为自回归语言模型——根据前文（单向，只看左边）预测下一个词。GPT 适合生成类任务（对话、翻译、摘要、创作），因为生成是自左向右逐词进行的。核心差异在于注意力掩码：BERT 双向看全文，GPT 只看前文（因果掩码）。此外还有 T5 等编码器-解码器架构。`,
    tags: ["预训练", "微调", "BERT", "GPT", "掩码语言模型", "自回归"],
  },
  {
    id: "iai-nlp-4",
    chapter: "iai-nlp",
    level: 3,
    question: `什么是 Prompt / In-context Learning？它与传统的预训练 + 微调有什么不同？`,
    answer:
      `Prompt / In-context Learning（上下文学习）是大语言模型（如 GPT-4）的新范式：通过提示词引导模型完成新任务，无需微调模型参数。零样本（Zero-shot）：直接给指令让模型执行，如「请将以下句子翻译成英文：xxx」，模型凭预训练知识直接完成。少样本（Few-shot）：在提示中给出几个输入-输出示例，再让模型处理新输入，模型从示例中「学习」任务模式。与传统预训练+微调的不同：①无需参数更新——微调需要反向传播更新模型权重，需要标注数据和训练资源；In-context Learning 只需在前向推理时提供提示，不改变模型参数。②任务适配快——微调需要针对每个任务单独训练；In-context Learning 只需修改提示词即可切换任务。③通用性强——一个大模型通过不同提示可完成翻译、分类、摘要、编程等多种任务。④代价——In-context Learning 依赖超大规模模型（数十亿到万亿参数），推理成本高；微调可用较小模型在特定任务上达到更高精度。In-context Learning 代表了从「训练专门模型」到「使用通用模型」的范式转变。`,
    tags: ["Prompt", "In-context Learning", "零样本", "少样本", "大语言模型"],
  },
];
