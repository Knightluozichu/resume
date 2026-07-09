"use client";

export function DnaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="全书复习知识整合">
      <defs>
        <linearGradient id="dna-fr-stage1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-fr-stage2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dna-fr-stage3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-fr-stage4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dna-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">从 word2vec 到 Transformer：NLP 进阶知识演进</text>

      {/* 四阶段演进 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四个演进阶段</text>

      {/* 阶段1：词嵌入 */}
      <rect x="40" y="78" width="160" height="90" rx="10" fill="url(#dna-fr-stage1)" opacity="0.9" />
      <text x="120" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">阶段一：词嵌入</text>
      <text x="120" y="120" textAnchor="middle" fontSize="9" fill="#bfdbfe">word2vec / CBOW</text>
      <text x="120" y="136" textAnchor="middle" fontSize="9" fill="#bfdbfe">分布式假设</text>
      <text x="120" y="152" textAnchor="middle" fontSize="9" fill="#bfdbfe">单词 → 稠密向量</text>

      <path d="M200 123 L240 123" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-fr-arrow)" />

      {/* 阶段2：序列建模 */}
      <rect x="240" y="78" width="160" height="90" rx="10" fill="url(#dna-fr-stage2)" opacity="0.9" />
      <text x="320" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">阶段二：序列建模</text>
      <text x="320" y="120" textAnchor="middle" fontSize="9" fill="#e9d5ff">RNN / LSTM</text>
      <text x="320" y="136" textAnchor="middle" fontSize="9" fill="#e9d5ff">处理变长序列</text>
      <text x="320" y="152" textAnchor="middle" fontSize="9" fill="#e9d5ff">捕获时序依赖</text>

      <path d="M400 123 L440 123" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-fr-arrow)" />

      {/* 阶段3：注意力 */}
      <rect x="440" y="78" width="160" height="90" rx="10" fill="url(#dna-fr-stage3)" opacity="0.9" />
      <text x="520" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">阶段三：注意力</text>
      <text x="520" y="120" textAnchor="middle" fontSize="9" fill="#fef3c7">seq2seq + Attention</text>
      <text x="520" y="136" textAnchor="middle" fontSize="9" fill="#fef3c7">动态上下文向量</text>
      <text x="520" y="152" textAnchor="middle" fontSize="9" fill="#fef3c7">长距离对齐</text>

      <path d="M600 123 L640 123" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-fr-arrow)" />

      {/* 阶段4：Transformer */}
      <rect x="640" y="78" width="120" height="90" rx="10" fill="url(#dna-fr-stage4)" opacity="0.9" />
      <text x="700" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">阶段四</text>
      <text x="700" y="120" textAnchor="middle" fontSize="9" fill="#fecaca">Transformer</text>
      <text x="700" y="136" textAnchor="middle" fontSize="9" fill="#fecaca">纯注意力</text>
      <text x="700" y="152" textAnchor="middle" fontSize="9" fill="#fecaca">并行建模</text>

      {/* 关键跃迁 */}
      <text x="400" y="202" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三个关键跃迁</text>

      <rect x="40" y="216" width="220" height="100" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">离散 → 连续</text>
      <text x="150" y="258" textAnchor="middle" fontSize="10" fill="#475569">one-hot 稀疏高维</text>
      <text x="150" y="274" textAnchor="middle" fontSize="10" fill="#475569">→ 词嵌入稠密低维</text>
      <text x="150" y="296" textAnchor="middle" fontSize="9" fill="#1e40af">单词有了可计算的语义空间</text>

      <rect x="290" y="216" width="220" height="100" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">固定 → 动态</text>
      <text x="400" y="258" textAnchor="middle" fontSize="10" fill="#475569">固定上下文向量</text>
      <text x="400" y="274" textAnchor="middle" fontSize="10" fill="#475569">→ 注意力动态加权</text>
      <text x="400" y="296" textAnchor="middle" fontSize="9" fill="#5b21b6">每步聚焦最相关的信息</text>

      <rect x="540" y="216" width="220" height="100" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">串行 → 并行</text>
      <text x="650" y="258" textAnchor="middle" fontSize="10" fill="#475569">RNN 逐步循环</text>
      <text x="650" y="274" textAnchor="middle" fontSize="10" fill="#475569">→ 自注意力全并行</text>
      <text x="650" y="296" textAnchor="middle" fontSize="9" fill="#92400e">GPU 友好，可大规模扩展</text>

      {/* 知识闭环 */}
      <text x="400" y="350" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识闭环：从零件到系统</text>

      <rect x="60" y="364" width="680" height="130" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">底层统一：一切都是可微矩阵运算 + 梯度下降</text>

      <text x="120" y="414" fontSize="10" fontWeight="600" fill="#1e40af">词嵌入</text>
      <text x="120" y="430" fontSize="9" fill="#475569">W_in * one-hot</text>

      <text x="270" y="414" fontSize="10" fontWeight="600" fill="#5b21b6">RNN/LSTM</text>
      <text x="270" y="430" fontSize="9" fill="#475569">h_t = f(W*h + U*x)</text>

      <text x="420" y="414" fontSize="10" fontWeight="600" fill="#92400e">注意力</text>
      <text x="420" y="430" fontSize="9" fill="#475569">softmax(QK^T)V</text>

      <text x="570" y="414" fontSize="10" fontWeight="600" fill="#991b1b">Transformer</text>
      <text x="570" y="430" fontSize="9" fill="#475569">多头注意力+FFN</text>

      <text x="400" y="462" textAnchor="middle" fontSize="10" fill="#475569">训练：交叉熵损失 + 反向传播 + 梯度下降（全书一以贯之）</text>
      <text x="400" y="482" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">理解本书 = 理解现代 NLP/LLM 的技术基因</text>
    </svg>
  );
}
