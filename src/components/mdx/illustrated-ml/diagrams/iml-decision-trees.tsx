"use client";

export function ImlDecisionTreesDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="决策树结构与集成学习">
      <defs>
        <linearGradient id="iml-dt-root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iml-dt-internal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-dt-leaf-buy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="iml-dt-leaf-no" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="iml-dt-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">决策树与集成学习</text>

      {/* 上半：决策树结构 */}
      <text x="400" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">决策树结构（买房决策示例）</text>

      {/* 根节点 */}
      <rect x="320" y="78" width="160" height="40" rx="8" fill="url(#iml-dt-root)" opacity="0.95" />
      <text x="400" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">年龄?</text>

      {/* 分支 */}
      <line x1="380" y1="118" x2="200" y2="148" stroke="#64748b" strokeWidth="1.5" />
      <line x1="420" y1="118" x2="600" y2="148" stroke="#64748b" strokeWidth="1.5" />
      <text x="270" y="138" fontSize="11" fill="#64748b">&lt; 30</text>
      <text x="510" y="138" fontSize="11" fill="#64748b">&gt;= 30</text>

      {/* 内部节点 */}
      <rect x="120" y="148" width="160" height="40" rx="8" fill="url(#iml-dt-internal)" opacity="0.95" />
      <text x="200" y="173" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">收入?</text>

      {/* 叶节点（年龄>=30） */}
      <rect x="520" y="148" width="160" height="40" rx="8" fill="url(#iml-dt-leaf-no)" opacity="0.9" />
      <text x="600" y="173" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">不买</text>

      {/* 分支 */}
      <line x1="180" y1="188" x2="100" y2="218" stroke="#64748b" strokeWidth="1.5" />
      <line x1="220" y1="188" x2="300" y2="218" stroke="#64748b" strokeWidth="1.5" />
      <text x="110" y="208" fontSize="11" fill="#64748b">高</text>
      <text x="280" y="208" fontSize="11" fill="#64748b">低</text>

      {/* 叶节点 */}
      <rect x="30" y="218" width="120" height="36" rx="8" fill="url(#iml-dt-leaf-no)" opacity="0.9" />
      <text x="90" y="241" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">不买</text>

      <rect x="250" y="218" width="120" height="36" rx="8" fill="url(#iml-dt-leaf-buy)" opacity="0.9" />
      <text x="310" y="241" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">买</text>

      {/* 节点类型标注 */}
      <text x="400" y="275" textAnchor="middle" fontSize="11" fill="#64748b">根节点（第一个划分） → 内部节点（后续划分） → 叶节点（最终决策）</text>

      {/* 下半：集成学习 */}
      <text x="400" y="308" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">集成学习：Bagging vs Boosting</text>

      {/* Bagging */}
      <rect x="40" y="324" width="350" height="190" rx="10" fill="#f1f5f9" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="346" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Bagging（随机森林）</text>
      <text x="215" y="364" textAnchor="middle" fontSize="11" fill="#475569">并行集成 · 降低方差</text>

      {/* 数据采样 */}
      <rect x="60" y="374" width="80" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="394" textAnchor="middle" fontSize="10" fill="#1e40af">有放回采样</text>

      {/* 三棵树并行 */}
      {[0, 1, 2].map(i => (
        <g key={`bag-${i}`}>
          <rect x={70 + i * 95} y="414" width="70" height="30" rx="6" fill="url(#iml-dt-internal)" opacity="0.3" stroke="#2563eb" strokeWidth="1" />
          <text x={105 + i * 95} y="434" textAnchor="middle" fontSize="10" fill="#1e40af">树{i + 1}</text>
        </g>
      ))}

      {/* 投票 */}
      <line x1="105" y1="444" x2="105" y2="458" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />
      <line x1="200" y1="444" x2="200" y2="458" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />
      <line x1="295" y1="444" x2="295" y2="458" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />

      <rect x="100" y="460" width="210" height="30" rx="6" fill="url(#iml-dt-leaf-buy)" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
      <text x="205" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">投票 / 取平均</text>

      <text x="215" y="505" textAnchor="middle" fontSize="10" fill="#64748b">树之间独立 · 可并行 · 不易过拟合</text>

      {/* Boosting */}
      <rect x="410" y="324" width="350" height="190" rx="10" fill="#f1f5f9" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="585" y="346" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Boosting（GBDT）</text>
      <text x="585" y="364" textAnchor="middle" fontSize="11" fill="#475569">串行集成 · 降低偏差</text>

      {/* 串行树 */}
      {[0, 1, 2].map(i => (
        <g key={`bst-${i}`}>
          <rect x={430 + i * 100} y="384" width="70" height="30" rx="6" fill="url(#iml-dt-internal)" opacity="0.3" stroke="#f59e0b" strokeWidth="1" />
          <text x={465 + i * 100} y="404" textAnchor="middle" fontSize="10" fill="#92400e">树{i + 1}</text>
          {i < 2 && <line x1={500 + i * 100} y1="399" x2={530 + i * 100} y2="399" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />}
        </g>
      ))}

      {/* 残差标注 */}
      <text x="585" y="428" textAnchor="middle" fontSize="10" fill="#92400e">每棵树拟合前一棵的残差</text>

      {/* 累加 */}
      <line x1="465" y1="414" x2="465" y2="440" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />
      <line x1="565" y1="414" x2="565" y2="440" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />
      <line x1="665" y1="414" x2="665" y2="440" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#iml-dt-arr)" />

      <rect x="470" y="442" width="210" height="30" rx="6" fill="url(#iml-dt-leaf-no)" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="575" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">加权累加</text>

      <text x="585" y="505" textAnchor="middle" fontSize="10" fill="#64748b">树串行依赖 · 精度高 · 易过拟合</text>
    </svg>
  );
}
