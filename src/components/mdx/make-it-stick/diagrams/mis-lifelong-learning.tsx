"use client";

export function MisLifelongLearningDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="终身学习策略对比图">
      <defs>
        <linearGradient id="mis-ll-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-ll-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-ll-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mis-ll-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="mis-ll-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mis-ll-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">终身学习策略：持续成长</text>

      {/* 上半部分：固定型 vs 成长型思维 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两种思维模式对比</text>

      <rect x="30" y="76" width="340" height="36" rx="8" fill="url(#mis-ll-5)" opacity="0.9" />
      <text x="200" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">固定型思维</text>

      <rect x="430" y="76" width="340" height="36" rx="8" fill="url(#mis-ll-2)" opacity="0.9" />
      <text x="600" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">成长型思维</text>

      <rect x="30" y="118" width="340" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="144" textAnchor="middle" fontSize="10" fill="#475569">「我天生不擅长这个」</text>

      <rect x="430" y="118" width="340" height="40" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="144" textAnchor="middle" fontSize="10" fill="#475569">「我还不会，但可以学会」</text>

      <rect x="30" y="164" width="340" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#475569">回避挑战，害怕失败暴露不足</text>

      <rect x="430" y="164" width="340" height="40" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="190" textAnchor="middle" fontSize="10" fill="#475569">迎接挑战，将失败视为学习机会</text>

      <rect x="30" y="210" width="340" height="40" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="236" textAnchor="middle" fontSize="10" fill="#475569">努力 = 说明你不够聪明</text>

      <rect x="430" y="210" width="340" height="40" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="236" textAnchor="middle" fontSize="10" fill="#475569">努力 = 通向精通的必经之路</text>

      {/* 中间部分：终身学习的五大策略 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">终身学习五大策略</text>

      <rect x="30" y="296" width="140" height="80" rx="8" fill="url(#mis-ll-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">检索练习</text>
      <text x="100" y="340" textAnchor="middle" fontSize="9" fill="#475569">主动回忆</text>
      <text x="100" y="356" textAnchor="middle" fontSize="9" fill="#475569">而非被动</text>
      <text x="100" y="370" textAnchor="middle" fontSize="9" fill="#475569">重复阅读</text>

      <rect x="190" y="296" width="140" height="80" rx="8" fill="url(#mis-ll-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="260" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">间隔穿插</text>
      <text x="260" y="340" textAnchor="middle" fontSize="9" fill="#475569">分散练习</text>
      <text x="260" y="356" textAnchor="middle" fontSize="9" fill="#475569">混合题型</text>
      <text x="260" y="370" textAnchor="middle" fontSize="9" fill="#475569">利用遗忘</text>

      <rect x="350" y="296" width="140" height="80" rx="8" fill="url(#mis-ll-3)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="420" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">精细化</text>
      <text x="420" y="340" textAnchor="middle" fontSize="9" fill="#475569">用自己的话</text>
      <text x="420" y="356" textAnchor="middle" fontSize="9" fill="#475569">解释概念</text>
      <text x="420" y="370" textAnchor="middle" fontSize="9" fill="#475569">建立关联</text>

      <rect x="510" y="296" width="140" height="80" rx="8" fill="url(#mis-ll-4)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="580" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">反馈反思</text>
      <text x="580" y="340" textAnchor="middle" fontSize="9" fill="#475569">自测校准</text>
      <text x="580" y="356" textAnchor="middle" fontSize="9" fill="#475569">定位盲区</text>
      <text x="580" y="370" textAnchor="middle" fontSize="9" fill="#475569">持续改进</text>

      <rect x="670" y="296" width="100" height="80" rx="8" fill="url(#mis-ll-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="720" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">心智模型</text>
      <text x="720" y="340" textAnchor="middle" fontSize="9" fill="#475569">结构化</text>
      <text x="720" y="356" textAnchor="middle" fontSize="9" fill="#475569">可迁移</text>
      <text x="720" y="370" textAnchor="middle" fontSize="9" fill="#475569">可迭代</text>

      {/* 下半部分：学习曲线对比 */}
      <text x="400" y="402" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习成长曲线对比</text>

      {/* 坐标轴 */}
      <line x1="80" y1="540" x2="740" y2="540" stroke="#475569" strokeWidth="2" />
      <line x1="80" y1="420" x2="80" y2="540" stroke="#475569" strokeWidth="2" />

      <text x="70" y="426" textAnchor="end" fontSize="9" fill="#64748b">高</text>
      <text x="70" y="540" textAnchor="end" fontSize="9" fill="#64748b">低</text>
      <text x="745" y="544" fontSize="9" fill="#64748b">时间</text>

      {/* 固定型：停滞 */}
      <path d="M80 440 Q200 445 400 450 Q600 455 740 458" stroke="#dc2626" strokeWidth="2.5" fill="none" />
      <text x="600" y="438" fontSize="10" fontWeight="600" fill="#b91c1c">固定型（停滞）</text>

      {/* 成长型：持续上升 */}
      <path d="M80 530 Q200 500 400 470 Q550 445 740 425" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <text x="580" y="470" fontSize="10" fontWeight="600" fill="#15803d">成长型（持续上升）</text>

      {/* 底部总结 */}
      <rect x="40" y="552" width="720" height="22" rx="6" fill="url(#mis-ll-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1" />
      <text x="400" y="568" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心：成长型思维 + 科学方法 = 终身持续成长</text>
    </svg>
  );
}
