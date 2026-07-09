"use client";

export function DnaRnnLstmDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="RNN与LSTM结构">
      <defs>
        <linearGradient id="dna-rnn-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-lstm-gate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dna-rnn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">RNN 展开与 LSTM 门控结构</text>

      {/* 上半：RNN 展开 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">RNN 时间展开</text>

      {/* t-1 */}
      <rect x="80" y="80" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="110" y="102" textAnchor="middle" fontSize="10" fill="#92400e">x_t-1</text>
      <rect x="80" y="128" width="60" height="40" rx="6" fill="url(#dna-rnn-cell)" opacity="0.9" />
      <text x="110" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">RNN</text>
      <rect x="80" y="180" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="110" y="202" textAnchor="middle" fontSize="10" fill="#92400e">h_t-1</text>

      <path d="M140 148 L196 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-rnn-arrow)" />

      {/* t */}
      <rect x="200" y="80" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="230" y="102" textAnchor="middle" fontSize="10" fill="#92400e">x_t</text>
      <rect x="200" y="128" width="60" height="40" rx="6" fill="url(#dna-rnn-cell)" opacity="0.9" />
      <text x="230" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">RNN</text>
      <rect x="200" y="180" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="230" y="202" textAnchor="middle" fontSize="10" fill="#92400e">h_t</text>

      <path d="M260 148 L316 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-rnn-arrow)" />

      {/* t+1 */}
      <rect x="320" y="80" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="350" y="102" textAnchor="middle" fontSize="10" fill="#92400e">x_t+1</text>
      <rect x="320" y="128" width="60" height="40" rx="6" fill="url(#dna-rnn-cell)" opacity="0.9" />
      <text x="350" y="152" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">RNN</text>
      <rect x="320" y="180" width="60" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="350" y="202" textAnchor="middle" fontSize="10" fill="#92400e">h_t+1</text>

      <text x="200" y="236" textAnchor="middle" fontSize="10" fill="#475569">h_t = tanh(W_x * x_t + W_h * h_t-1 + b)　梯度沿时间反复乘以 W_h</text>

      {/* 右上：梯度消失 */}
      <rect x="480" y="76" width="280" height="170" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="620" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">RNN 的梯度消失问题</text>
      <text x="620" y="124" textAnchor="middle" fontSize="10" fill="#475569">反向传播时梯度 = ∏ (∂h_t/∂h_t-1)</text>
      <text x="620" y="142" textAnchor="middle" fontSize="10" fill="#475569">当 |W_h| &lt; 1 时，连乘 → 0（消失）</text>
      <text x="620" y="160" textAnchor="middle" fontSize="10" fill="#475569">当 |W_h| &gt; 1 时，连乘 → ∞（爆炸）</text>
      <text x="620" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">→ 长距离依赖丢失</text>
      <text x="620" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">LSTM 用门控 + 细胞状态解决</text>

      {/* 下半：LSTM 门控 */}
      <text x="400" y="280" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">LSTM 内部四门结构</text>

      {/* 细胞状态通道 */}
      <rect x="40" y="300" width="720" height="30" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="319" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">C_t-1 ──────────────── 细胞状态（信息高速公路，梯度直接流动） ──────────────── C_t</text>

      {/* 遗忘门 */}
      <rect x="60" y="348" width="140" height="76" rx="8" fill="url(#dna-lstm-gate)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="130" y="370" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">遗忘门 f_t</text>
      <text x="130" y="390" textAnchor="middle" fontSize="9" fill="#475569">σ(W_f · [h_t-1, x_t])</text>
      <text x="130" y="408" textAnchor="middle" fontSize="9" fill="#475569">决定丢弃多少旧信息</text>

      {/* 输入门 */}
      <rect x="220" y="348" width="140" height="76" rx="8" fill="url(#dna-lstm-gate)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="290" y="370" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">输入门 i_t</text>
      <text x="290" y="390" textAnchor="middle" fontSize="9" fill="#475569">σ(W_i · [h_t-1, x_t])</text>
      <text x="290" y="408" textAnchor="middle" fontSize="9" fill="#475569">决定写入多少新信息</text>

      {/* 候选值 */}
      <rect x="380" y="348" width="140" height="76" rx="8" fill="url(#dna-lstm-gate)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="450" y="370" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">候选值 g_t</text>
      <text x="450" y="390" textAnchor="middle" fontSize="9" fill="#475569">tanh(W_g · [h_t-1, x_t])</text>
      <text x="450" y="408" textAnchor="middle" fontSize="9" fill="#475569">生成候选新信息</text>

      {/* 输出门 */}
      <rect x="540" y="348" width="140" height="76" rx="8" fill="url(#dna-lstm-gate)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="610" y="370" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">输出门 o_t</text>
      <text x="610" y="390" textAnchor="middle" fontSize="9" fill="#475569">σ(W_o · [h_t-1, x_t])</text>
      <text x="610" y="408" textAnchor="middle" fontSize="9" fill="#475569">决定输出多少信息</text>

      {/* 底部公式 */}
      <rect x="40" y="444" width="720" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">LSTM 细胞更新</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#5b21b6" fontFamily="monospace">C_t = f_t * C_t-1 + i_t * g_t　　　h_t = o_t * tanh(C_t)</text>
    </svg>
  );
}
