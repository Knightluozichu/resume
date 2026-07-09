"use client";

export function DnaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="深度学习进阶NLP全书学习地图">
      <defs>
        <linearGradient id="dna-lm-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-lm-embed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dna-lm-seq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-lm-attention" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dna-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dna-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习进阶：自然语言处理（斋藤康毅） · 知识体系全景</text>

      {/* 左侧：三大学习阶段 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">NLP进阶学习主线</text>

      <rect x="40" y="84" width="240" height="58" rx="10" fill="url(#dna-lm-basics)" opacity="0.95" />
      <text x="160" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">语言与词嵌入</text>
      <text x="160" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">NLP基础 / word2vec / CBOW</text>

      <path d="M160 142 L160 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="40" y="150" width="240" height="58" rx="10" fill="url(#dna-lm-seq)" opacity="0.95" />
      <text x="160" y="174" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">序列建模</text>
      <text x="160" y="194" textAnchor="middle" fontSize="11" fill="#fef3c7">RNN / LSTM / seq2seq</text>

      <path d="M160 208 L160 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="40" y="216" width="240" height="58" rx="10" fill="url(#dna-lm-attention)" opacity="0.95" />
      <text x="160" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">注意力与生成</text>
      <text x="160" y="260" textAnchor="middle" fontSize="11" fill="#fecaca">Attention / Transformer / 生成</text>

      <path d="M160 274 L160 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="40" y="282" width="240" height="58" rx="10" fill="url(#dna-lm-review)" opacity="0.95" />
      <text x="160" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">全书整合</text>
      <text x="160" y="326" textAnchor="middle" fontSize="11" fill="#cffafe">从词嵌入到Transformer</text>

      <text x="160" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">用NumPy从零实现NLP核心模型</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="84" width="460" height="38" rx="8" fill="url(#dna-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="108" fontSize="11" fill="#475569">全书学习地图——NLP进阶知识体系</text>

      <path d="M550 122 L550 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="130" width="460" height="38" rx="8" fill="url(#dna-lm-basics)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="154" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="154" fontSize="11" fill="#475569">NLP基础与预处理——分词 / 语料 / 同现矩阵</text>

      <path d="M550 168 L550 174" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="176" width="460" height="38" rx="8" fill="url(#dna-lm-embed)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="200" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="200" fontSize="11" fill="#475569">词嵌入与word2vec——分布式假设 / skip-gram</text>

      <path d="M550 214 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="222" width="460" height="38" rx="8" fill="url(#dna-lm-embed)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="246" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="246" fontSize="11" fill="#475569">word2vec实现——CBOW / Softmax / 负采样</text>

      <path d="M550 260 L550 266" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="268" width="460" height="38" rx="8" fill="url(#dna-lm-seq)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="292" fontSize="12" fontWeight="600" fill="#92400e">ch4</text>
      <text x="372" y="292" fontSize="11" fill="#475569">RNN与LSTM——循环结构 / 时间反向传播 / 门控</text>

      <path d="M550 306 L550 312" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="314" width="460" height="38" rx="8" fill="url(#dna-lm-seq)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="338" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="338" fontSize="11" fill="#475569">序列到序列模型——Encoder / Decoder / 翻译</text>

      <path d="M550 352 L550 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="360" width="460" height="38" rx="8" fill="url(#dna-lm-attention)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="384" fontSize="12" fontWeight="600" fill="#991b1b">ch6</text>
      <text x="372" y="384" fontSize="11" fill="#475569">注意力机制——对齐 / 上下文向量 / Bahdanau</text>

      <path d="M550 398 L550 404" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="406" width="460" height="38" rx="8" fill="url(#dna-lm-attention)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="430" fontSize="12" fontWeight="600" fill="#991b1b">ch7</text>
      <text x="372" y="430" fontSize="11" fill="#475569">Transformer架构——自注意力 / 多头 / 位置编码</text>

      <path d="M550 444 L550 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="452" width="460" height="38" rx="8" fill="url(#dna-lm-attention)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="476" fontSize="12" fontWeight="600" fill="#991b1b">ch8</text>
      <text x="372" y="476" fontSize="11" fill="#475569">文本生成实践——采样 / 评价 / 语言模型应用</text>

      <path d="M550 490 L550 496" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-lm-arrow)" />

      <rect x="320" y="498" width="460" height="38" rx="8" fill="url(#dna-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="522" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="522" fontSize="11" fill="#475569">全书复习与知识整合——从word2vec到Transformer</text>

      {/* 底部学习路径 */}
      <rect x="40" y="550" width="740" height="26" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="567" textAnchor="middle" fontSize="11" fill="#475569">NLP基础 → 词嵌入 → word2vec → RNN → seq2seq → 注意力 → Transformer → 生成 → 整合</text>
    </svg>
  );
}
