"use client";

export function SqtFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="SQL必知必会全书知识图谱">
      <defs>
        <linearGradient id="sqt-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <linearGradient id="sqt-fr-q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="sqt-fr-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="sqt-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SQL必知必会 · 全书知识图谱</text>

      {/* 核心圆 */}
      <circle cx="400" cy="100" r="40" fill="url(#sqt-fr-core)" />
      <text x="400" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">SELECT</text>
      <text x="400" y="112" textAnchor="middle" fontSize="11" fill="#e0f2fe">数据查询</text>

      {/* 第一层：基础查询 */}
      <rect x="50" y="170" width="200" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="150" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">基础查询层</text>
      <text x="150" y="215" textAnchor="middle" fontSize="11" fill="#1e3a8a">SELECT / FROM / WHERE</text>
      <text x="150" y="233" textAnchor="middle" fontSize="11" fill="#1e3a8a">DISTINCT / LIMIT / ORDER BY</text>
      <path d="M370 130 L200 170" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />

      {/* 第二层：数据处理 */}
      <rect x="300" y="170" width="200" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">数据处理层</text>
      <text x="400" y="215" textAnchor="middle" fontSize="11" fill="#78350f">函数 / 计算字段 / 别名</text>
      <text x="400" y="233" textAnchor="middle" fontSize="11" fill="#78350f">文本 / 数值 / 日期 / 转换</text>
      <path d="M400 140 L400 170" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />

      {/* 第三层：聚合分组 */}
      <rect x="550" y="170" width="200" height="80" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="650" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">聚合分组层</text>
      <text x="650" y="215" textAnchor="middle" fontSize="11" fill="#15803d">COUNT/SUM/AVG/MAX/MIN</text>
      <text x="650" y="233" textAnchor="middle" fontSize="11" fill="#15803d">GROUP BY / HAVING</text>
      <path d="M430 130 L600 170" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />

      {/* 第四层：多表关联 */}
      <rect x="50" y="280" width="340" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="220" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">多表关联层</text>
      <text x="220" y="325" textAnchor="middle" fontSize="11" fill="#5b21b6">INNER / LEFT / RIGHT JOIN</text>
      <text x="220" y="343" textAnchor="middle" fontSize="11" fill="#5b21b6">子查询（标量/列/行/表）· UNION</text>
      <path d="M150 250 L150 280" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />
      <path d="M400 250 L250 280" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />

      {/* 第五层：高级特性 */}
      <rect x="410" y="280" width="340" height="80" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="580" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9d174d">高级特性层</text>
      <text x="580" y="325" textAnchor="middle" fontSize="11" fill="#831843">窗口函数 / CTE / 视图</text>
      <text x="580" y="343" textAnchor="middle" fontSize="11" fill="#831843">RANK / ROW_NUMBER / WITH / VIEW</text>
      <path d="M650 250 L580 280" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />
      <path d="M400 250 L500 280" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sqt-fr-arrow)" />

      {/* 执行顺序总结 */}
      <rect x="50" y="390" width="700" height="70" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="413" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SELECT 执行顺序（全书核心记忆点）</text>
      <text x="400" y="438" textAnchor="middle" fontSize="12" fill="#475569" fontFamily="monospace">FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT</text>

      {/* 两条主线交汇 */}
      <rect x="50" y="480" width="340" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="220" y="503" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线一：数据检索能力</text>
      <text x="220" y="525" textAnchor="middle" fontSize="11" fill="#78350f">查什么 → 怎么过滤 → 怎么排序 → 怎么算</text>

      <rect x="410" y="480" width="340" height="60" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="580" y="503" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">主线二：数据处理思维</text>
      <text x="580" y="525" textAnchor="middle" fontSize="11" fill="#1e3a8a">单行 → 分组 → 多表 → 窗口（思维跃迁）</text>
    </svg>
  );
}
