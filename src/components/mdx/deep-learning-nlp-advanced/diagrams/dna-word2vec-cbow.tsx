"use client";

export function DnaWord2vecCbowDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="word2vec CBOW实现与负采样">
      <defs>
        <linearGradient id="dna-cbow-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-cbow-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dna-cbow-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dna-cbow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">CBOW 网络结构与 Softmax 优化</text>

      {/* 左侧：网络结构 */}
      <text x="200" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">CBOW 三层网络</text>

      {/* 输入层 one-hot */}
      <text x="80" y="88" fontSize="10" fill="#475569" fontWeight="600">输入层（one-hot）</text>
      <rect x="50" y="96" width="100" height="24" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="112" textAnchor="middle" fontSize="9" fill="#1e40af">context[0] (V维)</text>
      <rect x="50" y="124" width="100" height="24" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="140" textAnchor="middle" fontSize="9" fill="#1e40af">context[1] (V维)</text>
      <rect x="50" y="152" width="100" height="24" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="168" textAnchor="middle" fontSize="9" fill="#1e40af">context[2] (V维)</text>

      {/* 权重矩阵 W_in */}
      <path d="M150 136 L190 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-cbow-arrow)" />
      <text x="170" y="128" textAnchor="middle" fontSize="9" fill="#64748b">W_in</text>

      {/* 中间层 */}
      <text x="270" y="88" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">中间层（平均）</text>
      <rect x="220" y="96" width="100" height="80" rx="8" fill="url(#dna-cbow-hidden)" opacity="0.9" />
      <text x="270" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">h (H维)</text>
      <text x="270" y="148" textAnchor="middle" fontSize="9" fill="#e9d5ff">= mean(W_in * x)</text>

      {/* 权重矩阵 W_out */}
      <path d="M320 136 L360 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-cbow-arrow)" />
      <text x="340" y="128" textAnchor="middle" fontSize="9" fill="#64748b">W_out</text>

      {/* 输出层 */}
      <text x="430" y="88" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">输出层（Softmax）</text>
      <rect x="380" y="96" width="120" height="80" rx="8" fill="url(#dna-cbow-output)" opacity="0.9" />
      <text x="440" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">scores (V维)</text>
      <text x="440" y="146" textAnchor="middle" fontSize="9" fill="#fef3c7">P(word | context)</text>

      <text x="200" y="212" textAnchor="middle" fontSize="10" fill="#475569">V = 词表大小，H = 隐藏维度（如100）</text>

      {/* 右侧：Softmax 优化对比 */}
      <text x="600" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Softmax 计算瓶颈与优化</text>

      <rect x="500" y="80" width="260" height="70" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="630" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">原始 Softmax</text>
      <text x="630" y="120" textAnchor="middle" fontSize="10" fill="#475569">对整个词表（V=10000+）求分母</text>
      <text x="630" y="136" textAnchor="middle" fontSize="10" fill="#475569">每次预测需遍历所有词</text>

      <path d="M630 150 L630 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-cbow-arrow)" />

      <rect x="500" y="170" width="260" height="70" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="630" y="192" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">负采样（Negative Sampling）</text>
      <text x="630" y="210" textAnchor="middle" fontSize="10" fill="#475569">正样本1个 + 随机负采样k个</text>
      <text x="630" y="226" textAnchor="middle" fontSize="10" fill="#475569">将多分类转为二分类</text>

      <path d="M630 240 L630 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-cbow-arrow)" />

      <rect x="500" y="260" width="260" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="630" y="282" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">分层 Softmax（Hierarchical）</text>
      <text x="630" y="300" textAnchor="middle" fontSize="10" fill="#475569">用霍夫曼树组织词表</text>
      <text x="630" y="316" textAnchor="middle" fontSize="10" fill="#475569">沿树路径做 log(V) 次二分类</text>

      {/* 底部：负采样公式 */}
      <rect x="40" y="360" width="720" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="384" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">负采样损失函数</text>
      <text x="400" y="410" textAnchor="middle" fontSize="13" fill="#1e40af" fontFamily="monospace">L = -log σ(h · w_out[t]) - Σ log σ(-h · w_out[n_i])</text>
      <text x="400" y="434" textAnchor="middle" fontSize="10" fill="#475569">t = 正确目标词，n_i = 从词表中按概率采样的负样本</text>
      <text x="400" y="454" textAnchor="middle" fontSize="10" fill="#475569">采样概率：P(w) ∝ freq(w)^(3/4)（高频词更易被采为负样本，同时平滑长尾）</text>
    </svg>
  );
}
