"use client";

export function IaiNlpDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="自然语言处理流水线">
      <defs>
        <linearGradient id="iai-nlp-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-nlp-embed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-nlp-model" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-nlp-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-nlp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">自然语言处理：从文本到语义</text>

      {/* NLP 处理流水线 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">NLP 处理流水线</text>

      <rect x="30" y="76" width="140" height="60" rx="10" fill="url(#iai-nlp-text)" opacity="0.9" />
      <text x="100" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">原始文本</text>
      <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">"我爱自然语言"</text>

      <path d="M170 106 L190 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-nlp-arrow)" />

      <rect x="190" y="76" width="140" height="60" rx="10" fill="url(#iai-nlp-text)" opacity="0.9" />
      <text x="260" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">分词 Tokenize</text>
      <text x="260" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">[我, 爱, 自然, 语言]</text>

      <path d="M330 106 L350 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-nlp-arrow)" />

      <rect x="350" y="76" width="140" height="60" rx="10" fill="url(#iai-nlp-embed)" opacity="0.9" />
      <text x="420" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">词嵌入 Embed</text>
      <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#e9d5ff">[0.2, -0.5, ...]</text>

      <path d="M490 106 L510 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-nlp-arrow)" />

      <rect x="510" y="76" width="140" height="60" rx="10" fill="url(#iai-nlp-model)" opacity="0.9" />
      <text x="580" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">模型编码</text>
      <text x="580" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">Transformer</text>

      <path d="M650 106 L670 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#iai-nlp-arrow)" />

      <rect x="670" y="76" width="110" height="60" rx="10" fill="url(#iai-nlp-output)" opacity="0.9" />
      <text x="725" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">下游任务</text>
      <text x="725" y="120" textAnchor="middle" fontSize="10" fill="#cffae">分类/生成</text>

      {/* 词嵌入可视化 */}
      <rect x="30" y="158" width="370" height="140" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="182" fontSize="13" fontWeight="700" fill="#0f172a">词嵌入（Word Embedding）</text>
      <text x="50" y="204" fontSize="11" fill="#475569">将离散的词映射为稠密向量，捕捉语义关系</text>
      <text x="50" y="224" fontSize="11" fill="#475569">Word2Vec：CBOW / Skip-gram 两种训练方式</text>
      <text x="50" y="244" fontSize="11" fill="#475569">向量空间中的语义类比：</text>
      <text x="50" y="262" fontSize="11" fill="#64748b">  king - man + woman ≈ queen</text>
      <text x="50" y="280" fontSize="11" fill="#475569">GloVe：基于全局共现矩阵的词向量</text>

      {/* Transformer 架构 */}
      <rect x="420" y="158" width="350" height="140" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="182" fontSize="13" fontWeight="700" fill="#0f172a">Transformer 核心机制</text>
      <text x="440" y="204" fontSize="11" fill="#475569">自注意力：每个词关注序列中所有词</text>
      <text x="440" y="222" fontSize="11" fill="#64748b">  Attention(Q, K, V) = softmax(QK^T / sqrt(d)) * V</text>
      <text x="440" y="242" fontSize="11" fill="#475569">多头注意力：多组 Q/K/V 并行捕获不同模式</text>
      <text x="440" y="262" fontSize="11" fill="#475569">位置编码：注入序列顺序信息</text>
      <text x="440" y="282" fontSize="11" fill="#475569">残差连接 + LayerNorm 稳定训练</text>

      {/* NLP 任务分类 */}
      <rect x="30" y="316" width="740" height="100" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="50" y="340" fontSize="13" fontWeight="700" fill="#0f172a">NLP 核心任务</text>
      <text x="50" y="362" fontSize="11" fill="#475569">文本分类：情感分析、垃圾检测、主题归类</text>
      <text x="50" y="380" fontSize="11" fill="#475569">序列标注：命名实体识别（NER）、词性标注（POS）</text>
      <text x="50" y="398" fontSize="11" fill="#475569">文本生成：机器翻译、摘要、对话（GPT 系列）</text>

      {/* 预训练范式 */}
      <rect x="30" y="432" width="740" height="100" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="456" fontSize="13" fontWeight="700" fill="#92400e">预训练 + 微调范式</text>
      <text x="50" y="478" fontSize="11" fill="#475569">预训练：在大规模无标注语料上学习通用语言表示（BERT 掩码语言模型 / GPT 自回归）</text>
      <text x="50" y="496" fontSize="11" fill="#475569">微调：在小规模有标注任务数据上适配下游任务（分类、QA、生成等）</text>
      <text x="50" y="514" fontSize="11" fill="#475569">Prompt / In-context Learning：通过提示词引导大模型零样本或少样本推理</text>
    </svg>
  );
}
