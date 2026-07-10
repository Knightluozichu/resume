"use client";

export function MisBeyondBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="超越基础学习与知识迁移图">
      <defs>
        <linearGradient id="mis-bb-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-bb-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-bb-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mis-bb-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mis-bb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">超越基础学习：迁移与精通</text>

      {/* 上半部分：学习层级 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习的四个层级</text>

      <rect x="200" y="76" width="400" height="44" rx="8" fill="url(#mis-bb-1)" opacity="0.9" />
      <text x="400" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">记忆（知道是什么）</text>

      <rect x="200" y="128" width="400" height="44" rx="8" fill="url(#mis-bb-2)" opacity="0.9" />
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">理解（知道为什么）</text>

      <rect x="200" y="180" width="400" height="44" rx="8" fill="url(#mis-bb-3)" opacity="0.9" />
      <text x="400" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">应用（能用出来）</text>

      <rect x="200" y="232" width="400" height="44" rx="8" fill="url(#mis-bb-4)" opacity="0.9" />
      <text x="400" y="260" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">迁移（能用到新领域）</text>

      {/* 向上箭头 */}
      <path d="M620 254 L620 250 L620 202 L620 198 L620 150 L620 146 L620 98" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#mis-bb-arrow)" />
      <text x="635" y="180" fontSize="9" fill="#64748b">逐级</text>
      <text x="635" y="194" fontSize="9" fill="#64748b">递进</text>

      {/* 中间部分：迁移的两种类型 */}
      <text x="400" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">知识迁移的两种类型</text>

      <rect x="40" y="320" width="340" height="100" rx="10" fill="url(#mis-bb-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="210" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">近迁移</text>
      <text x="210" y="366" textAnchor="middle" fontSize="10" fill="#475569">相似情境中应用已有技能</text>
      <text x="210" y="384" textAnchor="middle" fontSize="10" fill="#475569">例：学会 Java 后学 C#</text>
      <text x="210" y="402" textAnchor="middle" fontSize="10" fill="#475569">难度较低，容易实现</text>

      <rect x="420" y="320" width="340" height="100" rx="10" fill="url(#mis-bb-3)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="590" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">远迁移</text>
      <text x="590" y="366" textAnchor="middle" fontSize="10" fill="#475569">跨领域应用底层原理</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fill="#475569">例：用编程思维优化烹饪流程</text>
      <text x="590" y="402" textAnchor="middle" fontSize="10" fill="#475569">难度高，需要深度心智模型</text>

      {/* 下半部分：精通的要素 */}
      <text x="400" y="446" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">精通的四要素</text>

      <rect x="30" y="460" width="170" height="56" rx="8" fill="url(#mis-bb-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="115" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">刻意练习</text>
      <text x="115" y="500" textAnchor="middle" fontSize="9" fill="#475569">走出舒适区</text>
      <text x="115" y="514" textAnchor="middle" fontSize="9" fill="#475569">针对性训练</text>

      <rect x="220" y="460" width="170" height="56" rx="8" fill="url(#mis-bb-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="305" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">结构化知识</text>
      <text x="305" y="500" textAnchor="middle" fontSize="9" fill="#475569">心智模型完善</text>
      <text x="305" y="514" textAnchor="middle" fontSize="9" fill="#475569">知识网络稠密</text>

      <rect x="410" y="460" width="170" height="56" rx="8" fill="url(#mis-bb-3)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="495" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">即时反馈</text>
      <text x="495" y="500" textAnchor="middle" fontSize="9" fill="#475569">快速纠错</text>
      <text x="495" y="514" textAnchor="middle" fontSize="9" fill="#475569">持续校准</text>

      <rect x="600" y="460" width="170" height="56" rx="8" fill="url(#mis-bb-4)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">持久动力</text>
      <text x="685" y="500" textAnchor="middle" fontSize="9" fill="#475569">内在驱动</text>
      <text x="685" y="514" textAnchor="middle" fontSize="9" fill="#475569">成长型思维</text>

      {/* 底部总结 */}
      <rect x="40" y="530" width="720" height="36" rx="8" fill="url(#mis-bb-3)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：精通 = 深度理解 + 刻意练习 + 即时反馈 + 迁移能力</text>
    </svg>
  );
}
