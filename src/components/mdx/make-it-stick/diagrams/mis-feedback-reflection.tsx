"use client";

export function MisFeedbackReflectionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="反馈与反思学习循环图">
      <defs>
        <linearGradient id="mis-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="mis-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="mis-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">反馈与反思：校准认知的循环</text>

      {/* 学习循环（四步） */}
      <rect x="280" y="60" width="240" height="56" rx="10" fill="url(#mis-fr-1)" opacity="0.9" />
      <text x="400" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">学习/练习</text>
      <text x="400" y="102" textAnchor="middle" fontSize="10" fill="#e0f2fe">检索练习、生成、间隔</text>

      {/* 向右箭头 */}
      <path d="M524 88 L556 88" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mis-fr-arrow)" />

      <rect x="560" y="60" width="200" height="56" rx="10" fill="url(#mis-fr-2)" opacity="0.9" />
      <text x="660" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">获取反馈</text>
      <text x="660" y="102" textAnchor="middle" fontSize="10" fill="#dcfce7">测验、纠错、评估</text>

      {/* 向下箭头 */}
      <path d="M660 120 L660 148" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mis-fr-arrow)" />

      <rect x="560" y="152" width="200" height="56" rx="10" fill="url(#mis-fr-3)" opacity="0.9" />
      <text x="660" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">反思</text>
      <text x="660" y="194" textAnchor="middle" fontSize="10" fill="#fef9c3">「我哪里错了？为什么？」</text>

      {/* 向左箭头 */}
      <path d="M556 180 L524 180" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mis-fr-arrow)" />

      <rect x="280" y="152" width="240" height="56" rx="10" fill="url(#mis-fr-4)" opacity="0.9" />
      <text x="400" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">调整策略</text>
      <text x="400" y="194" textAnchor="middle" fontSize="10" fill="#f3e8ff">针对性补强、重新规划</text>

      {/* 向上箭头回到学习 */}
      <path d="M400 148 L400 120" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#mis-fr-arrow)" />

      {/* 左侧：反馈的类型 */}
      <text x="140" y="248" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">反馈的三种类型</text>

      <rect x="20" y="262" width="240" height="56" rx="8" fill="url(#mis-fr-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="140" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">结果反馈</text>
      <text x="140" y="302" textAnchor="middle" fontSize="10" fill="#475569">对/错、分数、正确答案</text>

      <rect x="20" y="326" width="240" height="56" rx="8" fill="url(#mis-fr-3)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="140" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">解释反馈</text>
      <text x="140" y="366" textAnchor="middle" fontSize="10" fill="#475569">为什么对/错、原理说明</text>

      <rect x="20" y="390" width="240" height="56" rx="8" fill="url(#mis-fr-4)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">元认知反馈</text>
      <text x="140" y="430" textAnchor="middle" fontSize="10" fill="#475569">你知道自己知道/不知道吗</text>

      {/* 右侧：反思的层次 */}
      <text x="600" y="248" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">反思的三个层次</text>

      <rect x="480" y="262" width="260" height="56" rx="8" fill="url(#mis-fr-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="610" y="284" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">我学到了什么？（复盘）</text>
      <text x="610" y="302" textAnchor="middle" fontSize="10" fill="#475569">梳理已知、确认收获</text>

      <rect x="480" y="326" width="260" height="56" rx="8" fill="url(#mis-fr-3)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="610" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">哪里出了错？（诊断）</text>
      <text x="610" y="366" textAnchor="middle" fontSize="10" fill="#475569">定位盲区、分析原因</text>

      <rect x="480" y="390" width="260" height="56" rx="8" fill="url(#mis-fr-4)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="610" y="412" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">下次如何改进？（策略）</text>
      <text x="610" y="430" textAnchor="middle" fontSize="10" fill="#475569">调整方法、重新规划</text>

      {/* 底部：校准的意义 */}
      <text x="400" y="478" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">校准：消除「知道」与「以为知道」的差距</text>

      <rect x="60" y="492" width="320" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="220" y="514" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">未校准</text>
      <text x="220" y="534" textAnchor="middle" fontSize="10" fill="#475569">以为会了 → 考试才发现不会 → 惊讶</text>

      <rect x="420" y="492" width="320" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="580" y="514" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">已校准</text>
      <text x="580" y="534" textAnchor="middle" fontSize="10" fill="#475569">自测发现不会 → 针对补强 → 考试不意外</text>

      {/* 底部总结 */}
      <rect x="40" y="558" width="720" height="16" rx="6" fill="url(#mis-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="570" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心：反馈揭示盲区，反思驱动改进，循环校准认知</text>
    </svg>
  );
}
