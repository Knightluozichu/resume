"use client";

export function DlgFlowModelsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="流模型：可逆变换与标准化流">
      <defs>
        <linearGradient id="dlg-fm-simple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-fm-complex" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlg-fm-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dlg-fm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dlg-fm-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">标准化流（Normalizing Flow）</text>

      {/* 简单分布 -> 复杂分布 */}
      <rect x="40" y="60" width="140" height="60" rx="10" fill="url(#dlg-fm-simple)" opacity="0.9" />
      <text x="110" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">简单分布</text>
      <text x="110" y="106" textAnchor="middle" fontSize="11" fill="#bfdbfe">z ~ N(0, I)</text>

      {/* 变换链 */}
      <path d="M180 90 L230 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlg-fm-arrow)" />
      <rect x="230" y="68" width="70" height="44" rx="8" fill="url(#dlg-fm-trans)" opacity="0.9" />
      <text x="265" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">f_1</text>
      <text x="265" y="102" textAnchor="middle" fontSize="9" fill="#fef3c7">可逆变换</text>

      <path d="M300 90 L330 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-fm-arrow)" />
      <rect x="330" y="68" width="70" height="44" rx="8" fill="url(#dlg-fm-trans)" opacity="0.9" />
      <text x="365" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">f_2</text>
      <text x="365" y="102" textAnchor="middle" fontSize="9" fill="#fef3c7">可逆变换</text>

      <path d="M400 90 L430 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-fm-arrow)" />
      <text x="445" y="86" fontSize="14" fontWeight="700" fill="#475569">...</text>

      <path d="M465 90 L490 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-fm-arrow)" />
      <rect x="490" y="68" width="70" height="44" rx="8" fill="url(#dlg-fm-trans)" opacity="0.9" />
      <text x="525" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">f_K</text>
      <text x="525" y="102" textAnchor="middle" fontSize="9" fill="#fef3c7">可逆变换</text>

      <path d="M560 90 L610 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlg-fm-arrow)" />

      <rect x="610" y="60" width="150" height="60" rx="10" fill="url(#dlg-fm-complex)" opacity="0.9" />
      <text x="685" y="86" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">复杂分布</text>
      <text x="685" y="106" textAnchor="middle" fontSize="11" fill="#fecaca">x ~ P_data</text>

      {/* 反向流 */}
      <text x="400" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">反向（生成）：z = f_K^(-1)(...f_1^(-1)(x))</text>
      <path d="M610 130 L180 130" stroke="#059669" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#dlg-fm-arrow-r)" />

      {/* 变量替换公式 */}
      <rect x="40" y="168" width="720" height="56" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">变量替换定理</text>
      <text x="400" y="212" textAnchor="middle" fontSize="11" fill="#475569">log P(x) = log P(z) + sum log |det(df_i/dz_i)|</text>

      {/* 关键性质 */}
      <text x="400" y="252" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">流模型的关键性质</text>

      <rect x="40" y="268" width="220" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="150" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">精确对数似然</text>
      <text x="150" y="310" textAnchor="middle" fontSize="10" fill="#475569">可精确计算 P(x)</text>
      <text x="150" y="326" textAnchor="middle" fontSize="10" fill="#475569">不像 VAE 用下界近似</text>
      <text x="150" y="342" textAnchor="middle" fontSize="10" fill="#475569">可直接用最大似然训练</text>

      <rect x="290" y="268" width="220" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">双向可逆</text>
      <text x="400" y="310" textAnchor="middle" fontSize="10" fill="#475569">正向：x → z（编码）</text>
      <text x="400" y="326" textAnchor="middle" fontSize="10" fill="#475569">反向：z → x（生成）</text>
      <text x="400" y="342" textAnchor="middle" fontSize="10" fill="#475569">需雅可比行列式易计算</text>

      <rect x="540" y="268" width="220" height="80" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="650" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">架构约束</text>
      <text x="650" y="310" textAnchor="middle" fontSize="10" fill="#475569">变换必须可逆</text>
      <text x="650" y="326" textAnchor="middle" fontSize="10" fill="#475569">维度保持不变</text>
      <text x="650" y="342" textAnchor="middle" fontSize="10" fill="#475569">三角雅可比加速计算</text>

      {/* 代表模型 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">代表模型</text>

      <rect x="80" y="396" width="180" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="170" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">NICE</text>
      <text x="170" y="432" textAnchor="middle" fontSize="10" fill="#64748b">加性耦合层</text>

      <rect x="310" y="396" width="180" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">RealNVP</text>
      <text x="400" y="432" textAnchor="middle" fontSize="10" fill="#64748b">仿射耦合层</text>

      <rect x="540" y="396" width="180" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="630" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">Glow</text>
      <text x="630" y="432" textAnchor="middle" fontSize="10" fill="#64748b">可逆 1x1 卷积</text>
    </svg>
  );
}
