"use client";

export function DnaWordEmbeddingsDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="词嵌入与word2vec原理">
      <defs>
        <linearGradient id="dna-we-cbow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-we-sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dna-we-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">word2vec：两种模型架构</text>

      {/* 左侧：CBOW */}
      <text x="200" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">CBOW（连续词袋）</text>
      <rect x="60" y="76" width="280" height="300" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />

      {/* 上下文输入 */}
      <rect x="80" y="90" width="80" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="120" y="109" textAnchor="middle" fontSize="10" fill="#1e40af">the</text>
      <rect x="170" y="90" width="80" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="210" y="109" textAnchor="middle" fontSize="10" fill="#1e40af">cat</text>
      <rect x="260" y="90" width="60" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="290" y="109" textAnchor="middle" fontSize="10" fill="#1e40af">on</text>

      <text x="200" y="140" textAnchor="middle" fontSize="10" fill="#475569">上下文（输入）</text>

      <path d="M200 144 L200 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-we-arrow)" />

      {/* 中间层 */}
      <rect x="120" y="164" width="160" height="40" rx="8" fill="url(#dna-we-cbow)" opacity="0.9" />
      <text x="200" y="189" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">中间层（投影）</text>

      <path d="M200 204 L200 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-we-arrow)" />

      {/* 输出 */}
      <rect x="140" y="224" width="120" height="30" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="243" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">sat（目标词）</text>

      <text x="200" y="280" textAnchor="middle" fontSize="10" fill="#475569">原理：用上下文预测中心词</text>
      <text x="200" y="296" textAnchor="middle" fontSize="10" fill="#475569">输入：{the, cat, on, mat}</text>
      <text x="200" y="312" textAnchor="middle" fontSize="10" fill="#475569">输出：sat</text>
      <text x="200" y="344" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">适合：高频词，小语料快</text>

      {/* 右侧：Skip-gram */}
      <text x="600" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">Skip-gram（跳字模型）</text>
      <rect x="460" y="76" width="280" height="300" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />

      {/* 输入 */}
      <rect x="520" y="90" width="160" height="30" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="109" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">sat（中心词输入）</text>

      <text x="600" y="140" textAnchor="middle" fontSize="10" fill="#475569">中心词（输入）</text>

      <path d="M600 144 L600 160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-we-arrow)" />

      {/* 中间层 */}
      <rect x="520" y="164" width="160" height="40" rx="8" fill="url(#dna-we-sg)" opacity="0.9" />
      <text x="600" y="189" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">中间层（嵌入）</text>

      <path d="M600 204 L600 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-we-arrow)" />

      {/* 输出多个上下文词 */}
      <rect x="480" y="224" width="70" height="30" rx="6" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="515" y="243" textAnchor="middle" fontSize="10" fill="#5b21b6">the</text>
      <rect x="558" y="224" width="70" height="30" rx="6" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="593" y="243" textAnchor="middle" fontSize="10" fill="#5b21b6">cat</text>
      <rect x="636" y="224" width="70" height="30" rx="6" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="671" y="243" textAnchor="middle" fontSize="10" fill="#5b21b6">on</text>

      <text x="600" y="280" textAnchor="middle" fontSize="10" fill="#475569">原理：用中心词预测上下文</text>
      <text x="600" y="296" textAnchor="middle" fontSize="10" fill="#475569">输入：sat</text>
      <text x="600" y="312" textAnchor="middle" fontSize="10" fill="#475569">输出：{the, cat, on, mat}</text>
      <text x="600" y="344" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">适合：低频词，大语料效果好</text>

      {/* 底部：分布式假设 */}
      <rect x="40" y="400" width="720" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="422" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">分布式假设</text>
      <text x="400" y="440" textAnchor="middle" fontSize="11" fill="#475569">"一个词的含义由它的上下文决定" —— 相似上下文中出现的词具有相似含义</text>
    </svg>
  );
}
