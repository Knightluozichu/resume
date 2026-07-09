"use client";

export function LslTheoryFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="理论基础与语言建模 从统计语言模型到神经网络语言模型的演进">
      <defs>
        <linearGradient id="lsl-tf-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-tf-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-tf-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="lsl-tf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">理论基础与语言建模</text>

      {/* 语言模型演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">语言模型演进</text>

      <rect x="30" y="74" width="150" height="56" rx="8" fill="url(#lsl-tf-blue)" opacity="0.9" />
      <text x="105" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">统计语言模型</text>
      <text x="105" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">N-gram / 马尔可夫</text>

      <path d="M180 102 L198 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-tf-arrow)" />

      <rect x="203" y="74" width="160" height="56" rx="8" fill="url(#lsl-tf-purple)" opacity="0.9" />
      <text x="283" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">神经网络语言模型</text>
      <text x="283" y="114" textAnchor="middle" fontSize="9" fill="#ede9fe">词嵌入 / NNLM</text>

      <path d="M363 102 L381 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-tf-arrow)" />

      <rect x="386" y="74" width="170" height="56" rx="8" fill="url(#lsl-tf-amber)" opacity="0.9" />
      <text x="471" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">循环神经网络</text>
      <text x="471" y="114" textAnchor="middle" fontSize="9" fill="#fef3c7">RNN / LSTM / GRU</text>

      <path d="M556 102 L574 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-tf-arrow)" />

      <rect x="579" y="74" width="190" height="56" rx="8" fill="url(#lsl-tf-blue)" opacity="0.9" />
      <text x="674" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Transformer语言模型</text>
      <text x="674" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">自注意力 / 并行训练</text>

      {/* 核心数学基础 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心数学基础</text>

      <rect x="30" y="176" width="180" height="100" rx="8" fill="url(#lsl-tf-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">概率论基础</text>
      <text x="120" y="220" textAnchor="middle" fontSize="10" fill="#475569">条件概率 P(w|context)</text>
      <text x="120" y="238" textAnchor="middle" fontSize="10" fill="#475569">链式法则分解</text>
      <text x="120" y="256" textAnchor="middle" fontSize="10" fill="#475569">交叉熵损失</text>

      <rect x="220" y="176" width="180" height="100" rx="8" fill="url(#lsl-tf-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">信息论度量</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#475569">熵 H(X) = -sum p log p</text>
      <text x="310" y="238" textAnchor="middle" fontSize="10" fill="#475569">困惑度 Perplexity</text>
      <text x="310" y="256" textAnchor="middle" fontSize="10" fill="#475569">KL 散度</text>

      <rect x="410" y="176" width="180" height="100" rx="8" fill="url(#lsl-tf-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">优化理论</text>
      <text x="500" y="220" textAnchor="middle" fontSize="10" fill="#475569">梯度下降 SGD</text>
      <text x="500" y="238" textAnchor="middle" fontSize="10" fill="#475569">Adam 自适应优化</text>
      <text x="500" y="256" textAnchor="middle" fontSize="10" fill="#475569">学习率调度</text>

      <rect x="600" y="176" width="170" height="100" rx="8" fill="url(#lsl-tf-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="685" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">线性代数</text>
      <text x="685" y="220" textAnchor="middle" fontSize="10" fill="#475569">向量空间表示</text>
      <text x="685" y="238" textAnchor="middle" fontSize="10" fill="#475569">矩阵运算</text>
      <text x="685" y="256" textAnchor="middle" fontSize="10" fill="#475569">特征值分解</text>

      {/* 关键技术对比 */}
      <text x="400" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">语言模型关键技术对比</text>

      <rect x="30" y="326" width="240" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">N-gram 模型</text>
      <text x="150" y="368" textAnchor="middle" fontSize="9" fill="#475569">基于计数 / 窗口有限</text>
      <text x="150" y="384" textAnchor="middle" fontSize="9" fill="#475569">数据稀疏 / 无法泛化</text>
      <text x="150" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">局限：维度灾难</text>

      <rect x="290" y="326" width="240" height="80" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">神经网络语言模型</text>
      <text x="410" y="368" textAnchor="middle" fontSize="9" fill="#475569">连续向量表示 / 可泛化</text>
      <text x="410" y="384" textAnchor="middle" fontSize="9" fill="#475569">词嵌入 Word2Vec</text>
      <text x="410" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">优势：语义相似度</text>

      <rect x="550" y="326" width="220" height="80" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">自回归语言模型</text>
      <text x="660" y="368" textAnchor="middle" fontSize="9" fill="#475569">因果掩码 / 左到右生成</text>
      <text x="660" y="384" textAnchor="middle" fontSize="9" fill="#475569">GPT 系列 / 生成式</text>
      <text x="660" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">优势：文本生成</text>

      {/* 训练目标 */}
      <text x="400" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练目标与损失函数</text>

      <rect x="30" y="452" width="240" height="56" rx="8" fill="url(#lsl-tf-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="474" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">最大似然估计</text>
      <text x="150" y="494" textAnchor="middle" fontSize="9" fill="#475569">max prod P(wi | context)</text>

      <rect x="290" y="452" width="240" height="56" rx="8" fill="url(#lsl-tf-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="474" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">交叉熵损失</text>
      <text x="410" y="494" textAnchor="middle" fontSize="9" fill="#475569">L = -sum log P(wi | context)</text>

      <rect x="550" y="452" width="220" height="56" rx="8" fill="url(#lsl-tf-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="474" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">困惑度</text>
      <text x="660" y="494" textAnchor="middle" fontSize="9" fill="#475569">PPL = exp(L / N)</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="32" rx="8" fill="url(#lsl-tf-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="548" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：概率建模 → 词嵌入 → 循环网络 → 自注意力 → 大规模预训练</text>
    </svg>
  );
}
