"use client";

export function SqtLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="SQL必知必会全书学习地图">
      <defs>
        <linearGradient id="sqt-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <linearGradient id="sqt-lm-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="sqt-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="sqt-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SQL必知必会 · 知识体系</text>

      {/* 基础篇 */}
      <rect x="20" y="55" width="240" height="200" rx="12" fill="url(#sqt-lm-base)" opacity="0.95" />
      <text x="140" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">基础篇</text>
      <line x1="40" y1="90" x2="240" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="140" y="112" textAnchor="middle" fontSize="12" fill="#e0f2fe">学习地图</text>
      <text x="140" y="134" textAnchor="middle" fontSize="12" fill="#e0f2fe">SQL基础与SELECT</text>
      <text x="140" y="156" textAnchor="middle" fontSize="12" fill="#e0f2fe">数据过滤（WHERE）</text>
      <text x="140" y="180" textAnchor="middle" fontSize="11" fill="#bae6fd">SELECT / FROM / WHERE</text>
      <text x="140" y="200" textAnchor="middle" fontSize="11" fill="#bae6fd">AND / OR / IN / LIKE</text>
      <text x="140" y="232" textAnchor="middle" fontSize="11" fill="#7dd3fc">入门 · 会写基本查询</text>

      {/* 进阶篇 */}
      <rect x="280" y="55" width="240" height="200" rx="12" fill="url(#sqt-lm-mid)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">进阶篇</text>
      <line x1="300" y1="90" x2="500" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="112" textAnchor="middle" fontSize="12" fill="#fef3c7">排序与计算字段</text>
      <text x="400" y="134" textAnchor="middle" fontSize="12" fill="#fef3c7">函数与数据处理</text>
      <text x="400" y="156" textAnchor="middle" fontSize="12" fill="#fef3c7">聚合与分组</text>
      <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#fde68a">ORDER BY / 别名 / 拼接</text>
      <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#fde68a">COUNT/SUM/AVG · GROUP BY</text>
      <text x="400" y="232" textAnchor="middle" fontSize="11" fill="#fcd34d">中级 · 会算会排会分组</text>

      {/* 高级篇 */}
      <rect x="540" y="55" width="240" height="200" rx="12" fill="url(#sqt-lm-adv)" opacity="0.95" />
      <text x="660" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">高级篇</text>
      <line x1="560" y1="90" x2="760" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="112" textAnchor="middle" fontSize="12" fill="#ede9fe">联结查询</text>
      <text x="660" y="134" textAnchor="middle" fontSize="12" fill="#ede9fe">子查询与组合查询</text>
      <text x="660" y="156" textAnchor="middle" fontSize="12" fill="#ede9fe">高级SQL（窗口/CTE/视图）</text>
      <text x="660" y="180" textAnchor="middle" fontSize="11" fill="#ddd6fe">INNER/LEFT JOIN · UNION</text>
      <text x="660" y="200" textAnchor="middle" fontSize="11" fill="#ddd6fe">RANK/ROW_NUMBER · CTE · VIEW</text>
      <text x="660" y="232" textAnchor="middle" fontSize="11" fill="#c4b5fd">高级 · 多表与复杂查询</text>

      {/* Arrows */}
      <path d="M260 155 L280 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-lm-arrow)" />
      <path d="M520 155 L540 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-lm-arrow)" />

      {/* 两条主线 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">两条核心主线</text>

      <rect x="50" y="305" width="320" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="327" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线一：数据检索能力</text>
      <text x="210" y="347" textAnchor="middle" fontSize="11" fill="#78350f">SELECT → WHERE → ORDER BY → 函数</text>
      <text x="210" y="365" textAnchor="middle" fontSize="11" fill="#78350f">聚合分组 → 联结 → 子查询 → 窗口</text>

      <rect x="430" y="305" width="320" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="590" y="327" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">主线二：数据处理思维</text>
      <text x="590" y="347" textAnchor="middle" fontSize="11" fill="#1e3a8a">单表过滤 → 计算 → 聚合 → 多表关联</text>
      <text x="590" y="365" textAnchor="middle" fontSize="11" fill="#1e3a8a">从行级到组级到表级的思维跃迁</text>

      {/* 学习路径 */}
      <rect x="50" y="405" width="700" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="428" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从会查 → 会算 → 会连 → 会写复杂查询）</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">① SELECT &amp; WHERE → ② ORDER BY &amp; 函数 &amp; 聚合</text>
      <text x="400" y="468" textAnchor="middle" fontSize="11" fill="#475569">→ ③ JOIN &amp; 子查询 &amp; UNION → ④ 窗口函数 &amp; CTE &amp; 视图</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="505" textAnchor="middle" fontSize="11" fill="#64748b">两条主线在"联结+子查询"与"聚合+窗口函数"处交汇</text>
    </svg>
  );
}
