"use client";

export function DnaAttentionDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="注意力机制原理">
      <defs>
        <linearGradient id="dna-attn-enc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-attn-dec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-attn-ctx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dna-attn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">注意力机制：从固定上下文到动态加权</text>

      {/* 编码器隐状态 */}
      <text x="180" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">编码器隐状态 h_1 ... h_N</text>
      <rect x="60" y="74" width="60" height="30" rx="6" fill="url(#dna-attn-enc)" opacity="0.85" />
      <text x="90" y="93" textAnchor="middle" fontSize="10" fill="#fff">h_1</text>
      <rect x="130" y="74" width="60" height="30" rx="6" fill="url(#dna-attn-enc)" opacity="0.85" />
      <text x="160" y="93" textAnchor="middle" fontSize="10" fill="#fff">h_2</text>
      <rect x="200" y="74" width="60" height="30" rx="6" fill="url(#dna-attn-enc)" opacity="0.85" />
      <text x="230" y="93" textAnchor="middle" fontSize="10" fill="#fff">h_3</text>
      <rect x="270" y="74" width="60" height="30" rx="6" fill="url(#dna-attn-enc)" opacity="0.85" />
      <text x="300" y="93" textAnchor="middle" fontSize="10" fill="#fff">h_N</text>

      {/* 注意力权重连线 - 不同粗细 */}
      <text x="400" y="130" textAnchor="middle" fontSize="12" fontWeight="600" fill="#dc2626">注意力权重 α（动态计算）</text>
      <line x1="90" y1="104" x2="350" y2="200" stroke="#dc2626" strokeWidth="1" opacity="0.3" />
      <line x1="160" y1="104" x2="350" y2="200" stroke="#dc2626" strokeWidth="4" opacity="0.8" />
      <line x1="230" y1="104" x2="350" y2="200" stroke="#dc2626" strokeWidth="2" opacity="0.5" />
      <line x1="300" y1="104" x2="350" y2="200" stroke="#dc2626" strokeWidth="1" opacity="0.2" />

      <text x="250" y="155" fontSize="9" fill="#dc2626" fontWeight="600">α_2=0.6（高权重）</text>

      {/* 解码器当前状态 */}
      <text x="400" y="186" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">解码器状态 s_t</text>
      <rect x="350" y="192" width="100" height="30" rx="6" fill="url(#dna-attn-dec)" opacity="0.85" />
      <text x="400" y="211" textAnchor="middle" fontSize="10" fill="#fff">s_t</text>

      {/* 上下文向量 */}
      <path d="M400 222 L400 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-attn-arrow)" />
      <rect x="320" y="252" width="160" height="40" rx="8" fill="url(#dna-attn-ctx)" opacity="0.85" />
      <text x="400" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">上下文向量 c_t</text>
      <text x="400" y="286" textAnchor="middle" fontSize="9" fill="#fecaca">= Σ α_i * h_i（加权求和）</text>

      {/* 右侧：计算步骤 */}
      <rect x="520" y="60" width="240" height="250" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="640" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">注意力计算三步</text>

      <text x="540" y="110" fontSize="10" fontWeight="600" fill="#dc2626">① 打分 score(s_t, h_i)</text>
      <text x="540" y="126" fontSize="9" fill="#475569">　点积：s_t · h_i</text>
      <text x="540" y="140" fontSize="9" fill="#475569">　或加性：v^T tanh(W s_t + U h_i)</text>

      <text x="540" y="166" fontSize="10" fontWeight="600" fill="#dc2626">② 归一化 softmax</text>
      <text x="540" y="182" fontSize="9" fill="#475569">　α_i = exp(score_i) / Σ exp(score_j)</text>

      <text x="540" y="208" fontSize="10" fontWeight="600" fill="#dc2626">③ 加权求和</text>
      <text x="540" y="224" fontSize="9" fill="#475569">　c_t = Σ α_i * h_i</text>

      <text x="540" y="252" fontSize="9" fill="#059669" fontWeight="600">每生成一个词，c_t 都不同</text>
      <text x="540" y="268" fontSize="9" fill="#059669">解码器「动态关注」不同源词</text>
      <text x="540" y="290" fontSize="9" fill="#475569">解决了 seq2seq 固定瓶颈</text>

      {/* 底部对比 */}
      <rect x="40" y="330" width="340" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="352" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">无注意力：c 固定不变</text>
      <text x="210" y="372" textAnchor="middle" fontSize="10" fill="#475569">所有源信息压缩在一个向量中</text>

      <rect x="420" y="330" width="340" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="590" y="352" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">有注意力：c_t 每步动态变化</text>
      <text x="590" y="372" textAnchor="middle" fontSize="10" fill="#475569">解码器每步聚焦最相关的源词</text>

      <rect x="40" y="406" width="720" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="428" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">关键洞察</text>
      <text x="400" y="448" textAnchor="middle" fontSize="11" fill="#475569">注意力 = 「查询-键-值」检索：query=s_t, key=h_i, value=h_i → 这是 Transformer 自注意力的原型</text>
    </svg>
  );
}
