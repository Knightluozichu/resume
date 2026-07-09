"use client";

export function TcgEmbeddingsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="词嵌入与语义空间：从词到向量到语义关系">
      <defs>
        <linearGradient id="tcg-em-word" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tcg-em-vec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tcg-em-space" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tcg-em-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">词嵌入与语义空间</text>

      {/* 词到向量的映射 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">从词到向量</text>

      <rect x="40" y="80" width="140" height="44" rx="8" fill="url(#tcg-em-word)" opacity="0.85" />
      <text x="110" y="107" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">king</text>

      <rect x="40" y="132" width="140" height="44" rx="8" fill="url(#tcg-em-word)" opacity="0.85" />
      <text x="110" y="159" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">queen</text>

      <rect x="40" y="184" width="140" height="44" rx="8" fill="url(#tcg-em-word)" opacity="0.85" />
      <text x="110" y="211" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">man</text>

      <path d="M180 102 L220 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />
      <path d="M180 154 L220 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />
      <path d="M180 206 L220 206" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />

      <rect x="230" y="80" width="180" height="44" rx="8" fill="url(#tcg-em-vec)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="107" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[0.21, -0.45, ...]</text>

      <rect x="230" y="132" width="180" height="44" rx="8" fill="url(#tcg-em-vec)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="159" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[0.19, -0.42, ...]</text>

      <rect x="230" y="184" width="180" height="44" rx="8" fill="url(#tcg-em-vec)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="211" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">[0.15, -0.51, ...]</text>

      <path d="M410 102 L450 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />
      <path d="M410 154 L450 154" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />
      <path d="M410 206 L450 206" stroke="#64748b" strokeWidth="2" markerEnd="url(#tcg-em-arrow)" />

      <rect x="460" y="76" width="300" height="156" rx="10" fill="url(#tcg-em-space)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="610" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">高维语义空间</text>
      <circle cx="540" cy="130" r="6" fill="#2563eb" />
      <text x="554" y="134" fontSize="11" fill="#475569">king</text>
      <circle cx="560" cy="160" r="6" fill="#7c3aed" />
      <text x="574" y="164" fontSize="11" fill="#475569">queen</text>
      <circle cx="520" cy="180" r="6" fill="#f59e0b" />
      <text x="534" y="184" fontSize="11" fill="#475569">man</text>
      <circle cx="680" cy="140" r="6" fill="#dc2626" />
      <text x="694" y="144" fontSize="11" fill="#475569">woman</text>
      <circle cx="640" cy="200" r="6" fill="#059669" />
      <text x="654" y="204" fontSize="11" fill="#475569">child</text>
      <text x="610" y="224" textAnchor="middle" fontSize="10" fill="#64748b">相似词在空间中距离更近</text>

      {/* 语义关系 */}
      <text x="400" y="264" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">语义关系：向量运算捕获意义</text>

      <rect x="40" y="280" width="350" height="110" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">经典例子： king - man + woman ≈ queen</text>
      <text x="215" y="328" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">vec(king) - vec(man) + vec(woman)</text>
      <text x="215" y="350" textAnchor="middle" fontSize="11" fill="#475569">→ 最接近的向量是 vec(queen)</text>
      <text x="215" y="372" textAnchor="middle" fontSize="10" fill="#64748b">向量减法捕获了"性别"这个语义维度</text>

      <rect x="410" y="280" width="350" height="110" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">语义相似度 = 向量距离</text>
      <text x="585" y="328" textAnchor="middle" fontSize="11" fill="#475569">"猫"和"狗"的向量距离很近</text>
      <text x="585" y="350" textAnchor="middle" fontSize="11" fill="#475569">"猫"和"汽车"的向量距离很远</text>
      <text x="585" y="372" textAnchor="middle" fontSize="10" fill="#64748b">余弦相似度衡量语义接近程度</text>

      {/* 嵌入的作用 */}
      <text x="400" y="418" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">嵌入为何重要</text>

      <rect x="40" y="434" width="230" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">离散 → 连续</text>
      <text x="155" y="478" textAnchor="middle" fontSize="10" fill="#475569">将离散token映射为连续向量</text>

      <rect x="285" y="434" width="230" height="60" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">语义可计算</text>
      <text x="400" y="478" textAnchor="middle" fontSize="10" fill="#475569">意义关系变为数学运算</text>

      <rect x="530" y="434" width="230" height="60" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">可学习</text>
      <text x="645" y="478" textAnchor="middle" fontSize="10" fill="#475569">嵌入向量在训练中自动优化</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="52" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心思想</text>
      <text x="400" y="552" textAnchor="middle" fontSize="11" fill="#475569">词嵌入 = 将语言的意义编码为高维空间中的位置 → 语义相似度 = 空间距离</text>
    </svg>
  );
}
