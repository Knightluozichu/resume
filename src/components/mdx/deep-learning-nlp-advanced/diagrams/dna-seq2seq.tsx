"use client";

export function DnaSeq2seqDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="seq2seq序列到序列模型">
      <defs>
        <linearGradient id="dna-s2s-enc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-s2s-dec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dna-s2s-context" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dna-s2s-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">seq2seq：编码器-解码器架构</text>

      {/* 编码器 */}
      <text x="180" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">编码器 Encoder（LSTM）</text>

      <rect x="60" y="76" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="90" y="95" textAnchor="middle" fontSize="10" fill="#1e40af">I</text>
      <rect x="130" y="76" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="95" textAnchor="middle" fontSize="10" fill="#1e40af">am</text>
      <rect x="200" y="76" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="230" y="95" textAnchor="middle" fontSize="10" fill="#1e40af">a</text>
      <rect x="270" y="76" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="300" y="95" textAnchor="middle" fontSize="10" fill="#1e40af">student</text>

      {/* 编码器RNN单元 */}
      <rect x="60" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-enc)" opacity="0.9" />
      <text x="90" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="130" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-enc)" opacity="0.9" />
      <text x="160" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="200" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-enc)" opacity="0.9" />
      <text x="230" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="270" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-enc)" opacity="0.9" />
      <text x="300" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>

      {/* 隐状态箭头 */}
      <path d="M120 138 L130 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />
      <path d="M190 138 L200 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />
      <path d="M260 138 L270 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />

      {/* 上下文向量 */}
      <path d="M300 156 L400 180" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#dna-s2s-arrow)" />
      <rect x="340" y="176" width="120" height="48" rx="10" fill="url(#dna-s2s-context)" opacity="0.9" />
      <text x="400" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">上下文向量</text>
      <text x="400" y="214" textAnchor="middle" fontSize="9" fill="#e9d5ff">h_encoder（最终隐状态）</text>

      <path d="M460 200 L500 200" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#dna-s2s-arrow)" />

      {/* 解码器 */}
      <text x="620" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">解码器 Decoder（LSTM）</text>

      <rect x="500" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-dec)" opacity="0.9" />
      <text x="530" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="570" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-dec)" opacity="0.9" />
      <text x="600" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="640" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-dec)" opacity="0.9" />
      <text x="670" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>
      <rect x="710" y="120" width="60" height="36" rx="6" fill="url(#dna-s2s-dec)" opacity="0.9" />
      <text x="740" y="142" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">LSTM</text>

      <path d="M560 138 L570 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />
      <path d="M630 138 L640 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />
      <path d="M700 138 L710 138" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dna-s2s-arrow)" />

      {/* 解码器输出 */}
      <rect x="500" y="76" width="60" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="530" y="95" textAnchor="middle" fontSize="10" fill="#92400e">&lt;BOS&gt;</text>
      <rect x="570" y="76" width="60" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="600" y="95" textAnchor="middle" fontSize="10" fill="#92400e">我</text>
      <rect x="640" y="76" width="60" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="670" y="95" textAnchor="middle" fontSize="10" fill="#92400e">是</text>
      <rect x="710" y="76" width="60" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="740" y="95" textAnchor="middle" fontSize="10" fill="#92400e">学生</text>

      {/* 底部说明 */}
      <rect x="40" y="240" width="720" height="46" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">编码器：逐步读入源语言，将完整序列压缩为一个固定长度的上下文向量</text>
      <text x="400" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">解码器：以上下文向量为初始状态，逐词生成目标语言</text>

      {/* 瓶颈问题 */}
      <rect x="40" y="304" width="340" height="140" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">固定长度上下文瓶颈</text>
      <text x="210" y="350" textAnchor="middle" fontSize="10" fill="#475569">整个源序列被压缩为一个向量</text>
      <text x="210" y="368" textAnchor="middle" fontSize="10" fill="#475569">长句子信息丢失严重</text>
      <text x="210" y="386" textAnchor="middle" fontSize="10" fill="#475569">解码器每步只能访问同一向量</text>
      <text x="210" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991b1b">→ 需要注意力机制（下一章）</text>

      {/* 训练策略 */}
      <rect x="420" y="304" width="340" height="140" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="590" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">训练：Teacher Forcing</text>
      <text x="590" y="350" textAnchor="middle" fontSize="10" fill="#475569">训练时解码器输入用「正确答案」</text>
      <text x="590" y="368" textAnchor="middle" fontSize="10" fill="#475569">而非上一步自己的预测</text>
      <text x="590" y="386" textAnchor="middle" fontSize="10" fill="#475569">加速收敛，避免误差累积</text>
      <text x="590" y="416" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">推理时才用自回归（上一步输出）</text>
    </svg>
  );
}
