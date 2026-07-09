"use client";

export function DnaTransformerDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Transformer架构">
      <defs>
        <linearGradient id="dna-tf-enc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-tf-dec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-tf-attn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dna-tf-ff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dna-tf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Transformer：完全基于注意力的序列建模</text>

      {/* 左侧：编码器 */}
      <text x="160" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">编码器 × N</text>
      <rect x="60" y="74" width="200" height="300" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />

      {/* 输入嵌入+位置编码 */}
      <rect x="80" y="88" width="160" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="106" textAnchor="middle" fontSize="10" fill="#1e40af">输入嵌入 + 位置编码</text>

      <path d="M160 116 L160 126" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />

      {/* 多头自注意力 */}
      <rect x="80" y="130" width="160" height="36" rx="6" fill="url(#dna-tf-attn)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="160" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">多头自注意力</text>

      <path d="M160 166 L160 174" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />
      <text x="200" y="178" fontSize="8" fill="#64748b">Add &amp; Norm</text>

      {/* 前馈网络 */}
      <rect x="80" y="182" width="160" height="36" rx="6" fill="url(#dna-tf-ff)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="160" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">前馈网络 FFN</text>

      <path d="M160 218 L160 226" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />
      <text x="200" y="230" fontSize="8" fill="#64748b">Add &amp; Norm</text>

      {/* 输出 */}
      <rect x="100" y="234" width="120" height="24" rx="6" fill="url(#dna-tf-enc)" opacity="0.85" />
      <text x="160" y="250" textAnchor="middle" fontSize="10" fill="#fff">编码器输出</text>

      <text x="160" y="296" textAnchor="middle" fontSize="9" fill="#475569">自注意力：Q=K=V</text>
      <text x="160" y="312" textAnchor="middle" fontSize="9" fill="#475569">（同序列内相互关注）</text>
      <text x="160" y="340" textAnchor="middle" fontSize="9" fill="#475569">并行计算，无循环</text>

      {/* 右侧：解码器 */}
      <text x="620" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">解码器 × N</text>
      <rect x="520" y="74" width="200" height="400" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />

      {/* 输出嵌入+位置编码 */}
      <rect x="540" y="88" width="160" height="28" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="620" y="106" textAnchor="middle" fontSize="10" fill="#92400e">输出嵌入 + 位置编码</text>

      <path d="M620 116 L620 126" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />

      {/* 掩码多头自注意力 */}
      <rect x="540" y="130" width="160" height="36" rx="6" fill="url(#dna-tf-attn)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="620" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">掩码多头自注意力</text>

      <path d="M620 166 L620 174" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />
      <text x="660" y="178" fontSize="8" fill="#64748b">Add &amp; Norm</text>

      {/* 编码器-解码器交叉注意力 */}
      <rect x="540" y="182" width="160" height="36" rx="6" fill="url(#dna-tf-attn)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="620" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">编码器-解码器注意力</text>

      <path d="M620 218 L620 226" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />
      <text x="660" y="230" fontSize="8" fill="#64748b">Add &amp; Norm</text>

      {/* 前馈网络 */}
      <rect x="540" y="234" width="160" height="36" rx="6" fill="url(#dna-tf-ff)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="620" y="256" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">前馈网络 FFN</text>

      <path d="M620 270 L620 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-tf-arrow)" />
      <text x="660" y="282" fontSize="8" fill="#64748b">Add &amp; Norm</text>

      {/* 线性+Softmax */}
      <rect x="540" y="288" width="160" height="28" rx="6" fill="url(#dna-tf-dec)" opacity="0.85" />
      <text x="620" y="306" textAnchor="middle" fontSize="10" fill="#fff">Linear + Softmax</text>

      <text x="620" y="348" textAnchor="middle" fontSize="9" fill="#475569">Q=解码器, K=V=编码器输出</text>
      <text x="620" y="364" textAnchor="middle" fontSize="9" fill="#475569">（解码器关注源序列）</text>
      <text x="620" y="392" textAnchor="middle" fontSize="9" fill="#475569">掩码：防止看到未来词</text>
      <text x="620" y="418" textAnchor="middle" fontSize="9" fill="#475569">（自回归生成）</text>

      {/* 中间连接 */}
      <path d="M260 246 L540 200" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#dna-tf-arrow)" />
      <text x="380" y="220" fontSize="9" fill="#64748b" fontWeight="600">编码器输出 → K,V</text>

      {/* 底部：核心公式 */}
      <rect x="40" y="494" width="720" height="48" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="514" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">缩放点积注意力</text>
      <text x="400" y="532" textAnchor="middle" fontSize="12" fill="#dc2626" fontFamily="monospace">Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V</text>
    </svg>
  );
}
