"use client";

export function DnaNlpBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="NLP基础预处理流程">
      <defs>
        <linearGradient id="dna-nb-step1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dna-nb-step2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dna-nb-step3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dna-nb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">NLP预处理流水线</text>

      {/* 原始文本 */}
      <rect x="40" y="60" width="140" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="110" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">原始文本</text>
      <text x="110" y="104" textAnchor="middle" fontSize="10" fill="#64748b">"I love natural language"</text>

      <path d="M180 90 L220 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-nb-arrow)" />

      {/* 分词 */}
      <rect x="220" y="60" width="140" height="60" rx="10" fill="url(#dna-nb-step1)" opacity="0.9" />
      <text x="290" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">分词 Tokenize</text>
      <text x="290" y="104" textAnchor="middle" fontSize="10" fill="#bfdbfe">["I","love","natural","language"]</text>

      <path d="M360 90 L400 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-nb-arrow)" />

      {/* 构建词表 */}
      <rect x="400" y="60" width="140" height="60" rx="10" fill="url(#dna-nb-step2)" opacity="0.9" />
      <text x="470" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">构建词表</text>
      <text x="470" y="104" textAnchor="middle" fontSize="10" fill="#e9d5ff">word → ID 映射</text>

      <path d="M540 90 L580 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-nb-arrow)" />

      {/* 转为ID */}
      <rect x="580" y="60" width="180" height="60" rx="10" fill="url(#dna-nb-step3)" opacity="0.9" />
      <text x="670" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">转换为ID序列</text>
      <text x="670" y="104" textAnchor="middle" fontSize="10" fill="#fef3c7">[0, 1, 2, 3]</text>

      {/* 第二行：词向量表示 */}
      <text x="400" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">从单词到向量：分布式表示</text>

      {/* 同现矩阵 */}
      <text x="200" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">同现矩阵（计数）</text>
      <rect x="80" y="212" width="240" height="140" rx="8" fill="#fff" stroke="#94a3b8" strokeWidth="1" />
      <text x="110" y="232" fontSize="10" fill="#334155" fontWeight="600">     the  love  lang</text>
      <text x="110" y="250" fontSize="10" fill="#334155">I      0     1     0</text>
      <text x="110" y="268" fontSize="10" fill="#334155">love   1     0     0</text>
      <text x="110" y="286" fontSize="10" fill="#334155">nat    0     0     1</text>
      <text x="110" y="304" fontSize="10" fill="#334155">lang   0     0     0</text>
      <text x="200" y="334" textAnchor="middle" fontSize="10" fill="#64748b">维度 = 词表大小，稀疏</text>

      <path d="M320 282 L380 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#dna-nb-arrow)" />

      {/* 词嵌入 */}
      <text x="550" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#475569">词嵌入（稠密向量）</text>
      <rect x="420" y="212" width="260" height="140" rx="8" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="450" y="240" fontSize="10" fill="#334155" fontWeight="600">love  → [0.21, -0.55, 0.83, ...]</text>
      <text x="450" y="258" fontSize="10" fill="#334155" fontWeight="600">like  → [0.19, -0.48, 0.79, ...]</text>
      <text x="450" y="276" fontSize="10" fill="#334155" fontWeight="600">king  → [0.45, 0.12, -0.33, ...]</text>
      <text x="450" y="294" fontSize="10" fill="#334155" fontWeight="600">queen → [0.41, 0.08, -0.30, ...]</text>
      <text x="550" y="324" textAnchor="middle" fontSize="10" fill="#64748b">维度低（如100），稠密，语义近邻</text>

      {/* 底部对比 */}
      <rect x="40" y="376" width="720" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="11" fill="#92400e">同现矩阵：维度高、稀疏、无语义泛化 ⟶ 词嵌入：维度低、稠密、捕获语义关系（本书核心跃迁）</text>
    </svg>
  );
}
