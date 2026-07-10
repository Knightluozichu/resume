"use client";

export function MisRetrievalPracticeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="检索练习与重复阅读效果对比图">
      <defs>
        <linearGradient id="mis-rp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-rp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mis-rp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mis-rp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">检索练习 vs 重复阅读</text>

      {/* 上半部分：两种学习方式对比 */}
      <text x="200" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#b91c1c">重复阅读（被动）</text>
      <text x="600" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">检索练习（主动）</text>

      {/* 左：重复阅读流程 */}
      <rect x="40" y="80" width="320" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">阅读文本</text>
      <text x="200" y="116" textAnchor="middle" fontSize="10" fill="#475569">眼睛扫过 → 跟不上思考</text>

      <path d="M200 124 L200 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="40" y="132" width="320" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">再读一遍</text>
      <text x="200" y="168" textAnchor="middle" fontSize="10" fill="#475569">感觉更熟悉了 → 流畅性错觉</text>

      <path d="M200 176 L200 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="40" y="184" width="320" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">画重点线</text>
      <text x="200" y="220" textAnchor="middle" fontSize="10" fill="#475569">被动标记 → 未深度加工</text>

      <path d="M200 228 L200 232" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="40" y="236" width="320" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="256" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">结果：短期熟悉，长期遗忘</text>
      <text x="200" y="272" textAnchor="middle" fontSize="10" fill="#475569">知识留在「工作记忆」，未入「长期记忆」</text>

      {/* 右：检索练习流程 */}
      <rect x="440" y="80" width="320" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">阅读一次</text>
      <text x="600" y="116" textAnchor="middle" fontSize="10" fill="#475569">理解大意 → 建立初步编码</text>

      <path d="M600 124 L600 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="440" y="132" width="320" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">合上书回忆</text>
      <text x="600" y="168" textAnchor="middle" fontSize="10" fill="#475569">主动提取 → 强化神经通路</text>

      <path d="M600 176 L600 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="440" y="184" width="320" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">自测/小测验</text>
      <text x="600" y="220" textAnchor="middle" fontSize="10" fill="#475569">发现盲区 → 针对性补强</text>

      <path d="M600 228 L600 232" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-rp-arrow)" />

      <rect x="440" y="236" width="320" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="600" y="256" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">结果：长期记忆，随时可提取</text>
      <text x="600" y="272" textAnchor="middle" fontSize="10" fill="#475569">知识进入「长期记忆」，检索路径巩固</text>

      {/* 下半部分：效果对比柱状图 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">记忆保持率对比（一周后测试）</text>

      {/* 坐标轴 */}
      <line x1="100" y1="500" x2="720" y2="500" stroke="#475569" strokeWidth="2" />
      <line x1="100" y1="340" x2="100" y2="500" stroke="#475569" strokeWidth="2" />

      {/* Y 轴标签 */}
      <text x="90" y="345" textAnchor="end" fontSize="10" fill="#64748b">100%</text>
      <text x="90" y="420" textAnchor="end" fontSize="10" fill="#64748b">50%</text>
      <text x="90" y="500" textAnchor="end" fontSize="10" fill="#64748b">0%</text>

      {/* 柱子：重复阅读 */}
      <rect x="160" y="420" width="100" height="80" rx="4" fill="url(#mis-rp-2)" opacity="0.8" />
      <text x="210" y="414" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">~28%</text>
      <text x="210" y="518" textAnchor="middle" fontSize="10" fill="#475569">重复阅读</text>

      {/* 柱子：检索练习 */}
      <rect x="320" y="360" width="100" height="140" rx="4" fill="url(#mis-rp-3)" opacity="0.8" />
      <text x="370" y="354" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">~60%</text>
      <text x="370" y="518" textAnchor="middle" fontSize="10" fill="#475569">检索练习</text>

      {/* 柱子：检索+间隔 */}
      <rect x="480" y="340" width="100" height="160" rx="4" fill="url(#mis-rp-1)" opacity="0.8" />
      <text x="530" y="334" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">~75%</text>
      <text x="530" y="518" textAnchor="middle" fontSize="10" fill="#475569">检索+间隔</text>

      {/* 柱子：检索+间隔+穿插 */}
      <rect x="640" y="350" width="70" height="150" rx="4" fill="url(#mis-rp-3)" opacity="0.9" />
      <text x="675" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">~70%</text>
      <text x="675" y="518" textAnchor="middle" fontSize="9" fill="#475569">检索+间隔+穿插</text>

      {/* 底部总结 */}
      <rect x="40" y="540" width="720" height="28" rx="8" fill="url(#mis-rp-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="558" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心：每一次检索都在强化记忆通路，检索本身就是学习</text>
    </svg>
  );
}
