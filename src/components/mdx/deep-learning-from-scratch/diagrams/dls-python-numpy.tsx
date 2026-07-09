"use client";

export function DlsPythonNumpyDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="NumPy 数组运算与广播机制">
      <defs>
        <linearGradient id="dls-pn-array" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-pn-broadcast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-pn-op" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dls-pn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">NumPy ndarray 核心机制</text>

      {/* 左侧：ndarray 结构 */}
      <text x="180" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ndarray 多维数组</text>

      <rect x="60" y="84" width="240" height="120" rx="10" fill="url(#dls-pn-array)" opacity="0.95" />
      <text x="180" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">np.array</text>
      <text x="180" y="130" textAnchor="middle" fontSize="11" fill="#bfdbfe">shape: 形状 (维度)</text>
      <text x="180" y="150" textAnchor="middle" fontSize="11" fill="#bfdbfe">dtype: 元素类型</text>
      <text x="180" y="170" textAnchor="middle" fontSize="11" fill="#bfdbfe">ndim: 维度数</text>
      <text x="180" y="190" textAnchor="middle" fontSize="11" fill="#bfdbfe">size: 元素总数</text>

      <path d="M180 204 L180 224" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pn-arrow)" />

      <rect x="60" y="228" width="240" height="50" rx="10" fill="url(#dls-pn-op)" opacity="0.95" />
      <text x="180" y="258" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">向量化运算（免循环）</text>

      <path d="M180 278 L180 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pn-arrow)" />

      <rect x="60" y="302" width="240" height="50" rx="10" fill="url(#dls-pn-array)" opacity="0.95" />
      <text x="180" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">轴 axis 指定聚合方向</text>

      {/* 右侧：广播机制 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">广播（Broadcasting）</text>

      <rect x="380" y="84" width="380" height="56" rx="10" fill="url(#dls-pn-broadcast)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="108" fontSize="11" fontWeight="600" fill="#5b21b6">标量广播</text>
      <text x="400" y="128" fontSize="11" fill="#475569">A(3,4) + 5 → 每个元素加 5</text>

      <path d="M570 140 L570 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pn-arrow)" />

      <rect x="380" y="150" width="380" height="56" rx="10" fill="url(#dls-pn-broadcast)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="174" fontSize="11" fontWeight="600" fill="#5b21b6">一维广播</text>
      <text x="400" y="194" fontSize="11" fill="#475569">A(3,4) + B(4,) → B 沿行复制</text>

      <path d="M570 206 L570 212" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pn-arrow)" />

      <rect x="380" y="216" width="380" height="56" rx="10" fill="url(#dls-pn-broadcast)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="240" fontSize="11" fontWeight="600" fill="#5b21b6">二维广播</text>
      <text x="400" y="260" fontSize="11" fill="#475569">A(3,1) + B(1,4) → 均复制成 (3,4)</text>

      <path d="M570 272 L570 278" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pn-arrow)" />

      <rect x="380" y="282" width="380" height="70" rx="10" fill="#7c3aed" opacity="0.08" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 3" />
      <text x="570" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">广播规则</text>
      <text x="570" y="326" textAnchor="middle" fontSize="10" fill="#475569">①维度从尾部对齐 ②缺失或为1的维度复制</text>
      <text x="570" y="342" textAnchor="middle" fontSize="10" fill="#475569">③最终形状取各维度最大值</text>

      {/* 底部：索引与切片 */}
      <rect x="60" y="380" width="700" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="404" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">常用操作</text>
      <text x="410" y="424" textAnchor="middle" fontSize="11" fill="#475569">切片 A[1:3] · 布尔索引 A[A&gt;5] · 花式索引 A[[0,2]] · reshape · np.dot · np.maximum</text>

      <rect x="60" y="448" width="700" height="50" rx="10" fill="url(#dls-pn-broadcast)" opacity="0.95" />
      <text x="410" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">全书所有神经网络代码都基于 NumPy 向量化运算构建</text>
    </svg>
  );
}
