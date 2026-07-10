"use client";

export function MisSpacedInterleavingDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="间隔练习与穿插练习示意图">
      <defs>
        <linearGradient id="mis-si-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-si-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mis-si-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="mis-si-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">间隔练习与穿插练习</text>

      {/* 上半部分：集中练习 vs 间隔练习 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">集中练习 vs 间隔练习</text>

      {/* 左：集中练习 */}
      <text x="180" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">集中练习（突击）</text>
      <rect x="40" y="94" width="280" height="28" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="180" y="113" textAnchor="middle" fontSize="10" fill="#b91c1c">第1天：连续练习 4 小时</text>

      <rect x="40" y="128" width="280" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="180" y="147" textAnchor="middle" fontSize="10" fill="#94a3b8">第2-7天：不练习</text>

      <rect x="40" y="162" width="280" height="28" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="180" y="181" textAnchor="middle" fontSize="10" fill="#a16207">一周后测试：遗忘 ~70%</text>

      {/* 右：间隔练习 */}
      <text x="580" y="86" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">间隔练习（分散）</text>
      <rect x="440" y="94" width="280" height="28" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="580" y="113" textAnchor="middle" fontSize="10" fill="#15803d">第1天：练习 40 分钟</text>

      <rect x="440" y="128" width="280" height="28" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="580" y="147" textAnchor="middle" fontSize="10" fill="#15803d">第3天：练习 40 分钟</text>

      <rect x="440" y="162" width="280" height="28" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="580" y="181" textAnchor="middle" fontSize="10" fill="#15803d">一周后测试：遗忘 ~25%</text>

      {/* 中间部分：遗忘曲线 */}
      <text x="400" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">遗忘曲线：间隔如何巩固记忆</text>

      {/* 坐标轴 */}
      <line x1="80" y1="400" x2="740" y2="400" stroke="#475569" strokeWidth="2" />
      <line x1="80" y1="240" x2="80" y2="400" stroke="#475569" strokeWidth="2" />

      <text x="70" y="248" textAnchor="end" fontSize="10" fill="#64748b">100%</text>
      <text x="70" y="324" textAnchor="end" fontSize="10" fill="#64748b">50%</text>
      <text x="70" y="400" textAnchor="end" fontSize="10" fill="#64748b">0%</text>

      <text x="745" y="404" fontSize="10" fill="#64748b">时间</text>

      {/* 集中练习曲线（快速下降） */}
      <path d="M80 250 Q160 260 240 310 Q320 350 400 370 Q500 385 600 390 Q680 393 740 395" stroke="#dc2626" strokeWidth="2.5" fill="none" />
      <text x="620" y="370" fontSize="10" fontWeight="600" fill="#b91c1c">集中练习（快速遗忘）</text>

      {/* 间隔练习曲线（每次复习后回升） */}
      <path d="M80 250 Q120 260 160 300" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <circle cx="160" cy="300" r="4" fill="#16a34a" />
      <text x="170" y="295" fontSize="9" fill="#15803d">复习1</text>

      <path d="M160 270 Q200 275 240 305" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <circle cx="240" cy="305" r="4" fill="#16a34a" />
      <text x="250" y="300" fontSize="9" fill="#15803d">复习2</text>

      <path d="M240 275 Q320 280 400 300" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <circle cx="400" cy="300" r="4" fill="#16a34a" />
      <text x="410" y="295" fontSize="9" fill="#15803d">复习3</text>

      <path d="M400 280 Q550 285 740 290" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      <text x="580" y="280" fontSize="10" fontWeight="600" fill="#15803d">间隔练习（记忆牢固）</text>

      {/* 下半部分：穿插练习 */}
      <text x="400" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">穿插练习：混合不同类型</text>

      <rect x="40" y="446" width="340" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="468" fontSize="11" fontWeight="700" fill="#b91c1c">集中（不穿插）：</text>
      <text x="180" y="468" fontSize="10" fill="#475569">AAAA BBBB CCCC DDDD</text>

      <rect x="440" y="446" width="340" height="34" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="460" y="468" fontSize="11" fontWeight="700" fill="#15803d">穿插（混合）：</text>
      <text x="560" y="468" fontSize="10" fill="#475569">ABCD BACD CDAB DCBA</text>

      {/* 穿插效果说明 */}
      <rect x="40" y="492" width="340" height="50" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="210" y="512" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">集中练习</text>
      <text x="210" y="530" textAnchor="middle" fontSize="10" fill="#475569">短期快、长期差；</text>
      <text x="210" y="538" textAnchor="middle" fontSize="10" fill="#475569">产生「我会了」的错觉</text>

      <rect x="440" y="492" width="340" height="50" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="610" y="512" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">穿插练习</text>
      <text x="610" y="530" textAnchor="middle" fontSize="10" fill="#475569">短期慢、长期好；</text>
      <text x="610" y="538" textAnchor="middle" fontSize="10" fill="#475569">培养辨识和迁移能力</text>

      {/* 底部总结 */}
      <rect x="40" y="552" width="720" height="22" rx="6" fill="url(#mis-si-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1" />
      <text x="400" y="568" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心：间隔让遗忘发挥作用，穿插让大脑学会区分和迁移</text>
    </svg>
  );
}
