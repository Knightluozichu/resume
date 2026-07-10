"use client";

export function PdpGoldenStandardDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="刻意练习的黄金标准图">
      <defs>
        <linearGradient id="pdp-gs-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-gs-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-gs-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-gs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">黄金标准：专家训练的标杆</text>

      {/* 三大领域 */}
      <text x="400" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">刻意练习的经典领域</text>

      <rect x="40" y="80" width="230" height="140" rx="12" fill="url(#pdp-gs-1)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="155" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706">音乐训练</text>
      <text x="155" y="128" textAnchor="middle" fontSize="11" fill="#475569">最完整的刻意练习体系</text>
      <text x="155" y="150" textAnchor="middle" fontSize="10" fill="#475569">- 几百年教学经验积累</text>
      <text x="155" y="168" textAnchor="middle" fontSize="10" fill="#475569">- 标准化练习曲与考级</text>
      <text x="155" y="186" textAnchor="middle" fontSize="10" fill="#475569">- 一对一导师制</text>
      <text x="155" y="204" textAnchor="middle" fontSize="10" fill="#475569">- 清晰的技能阶梯</text>

      <rect x="285" y="80" width="230" height="140" rx="12" fill="url(#pdp-gs-2)" opacity="0.08" stroke="#8b5cf6" strokeWidth="2" />
      <text x="400" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed">国际象棋</text>
      <text x="400" y="128" textAnchor="middle" fontSize="11" fill="#475569">最纯粹的心理表征训练</text>
      <text x="400" y="150" textAnchor="middle" fontSize="10" fill="#475569">- 百年棋谱积累</text>
      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#475569">- 等级分量化水平</text>
      <text x="400" y="186" textAnchor="middle" fontSize="10" fill="#475569">- 复盘研究为核心</text>
      <text x="400" y="204" textAnchor="middle" fontSize="10" fill="#475569">- 开局/中局/残局体系</text>

      <rect x="530" y="80" width="230" height="140" rx="12" fill="url(#pdp-gs-3)" opacity="0.08" stroke="#10b981" strokeWidth="2" />
      <text x="645" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">运动训练</text>
      <text x="645" y="128" textAnchor="middle" fontSize="11" fill="#475569">最科学的身体技能训练</text>
      <text x="645" y="150" textAnchor="middle" fontSize="10" fill="#475569">- 专业教练团队</text>
      <text x="645" y="168" textAnchor="middle" fontSize="10" fill="#475569">- 数据化反馈</text>
      <text x="645" y="186" textAnchor="middle" fontSize="10" fill="#475569">- 分解动作训练</text>
      <text x="645" y="204" textAnchor="middle" fontSize="10" fill="#475569">- 渐进负荷设计</text>

      {/* 黄金标准的核心特征 */}
      <text x="400" y="252" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">黄金标准的六大特征</text>

      <rect x="40" y="266" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="288" fontSize="11" fontWeight="600" fill="#d97706">1.</text>
      <text x="80" y="288" fontSize="11" fill="#475569">在已发展的领域——有成熟的评价标准</text>

      <rect x="410" y="266" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="288" fontSize="11" fontWeight="600" fill="#d97706">2.</text>
      <text x="450" y="288" fontSize="11" fill="#475569">在舒适区外——不断挑战更高难度</text>

      <rect x="40" y="308" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="330" fontSize="11" fontWeight="600" fill="#d97706">3.</text>
      <text x="80" y="330" fontSize="11" fill="#475569">有明确目标——每一步都可衡量</text>

      <rect x="410" y="308" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="330" fontSize="11" fontWeight="600" fill="#d97706">4.</text>
      <text x="450" y="330" fontSize="11" fill="#475569">全神贯注——有意识的行动而非自动</text>

      <rect x="40" y="350" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="372" fontSize="11" fontWeight="600" fill="#d97706">5.</text>
      <text x="80" y="372" fontSize="11" fill="#475569">有反馈和纠错——及时调整</text>

      <rect x="410" y="350" width="350" height="36" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="430" y="372" fontSize="11" fontWeight="600" fill="#d97706">6.</text>
      <text x="450" y="372" fontSize="11" fill="#475569">构建心理表征——持续升级认知</text>

      {/* 伦敦出租车司机案例 */}
      <text x="400" y="416" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">经典案例：伦敦出租车司机</text>

      <rect x="40" y="430" width="720" height="90" rx="10" fill="url(#pdp-gs-2)" opacity="0.06" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="60" y="454" fontSize="11" fontWeight="600" fill="#7c3aed">大脑可塑性的铁证：</text>
      <text x="60" y="474" fontSize="11" fill="#475569">伦敦出租车司机需记忆 320 条路线、25000 条街道，通过「知识考试」平均需 3-4 年刻意训练。</text>
      <text x="60" y="494" fontSize="11" fill="#475569">脑部扫描显示：通过考试者海马体后部显著增大，且训练时间越长增大越明显——大脑因刻意练习而物理改变。</text>
      <text x="60" y="514" fontSize="11" fontWeight="600" fill="#7c3aed">启示：专家不是天生的，而是训练出来的；大脑具有终身可塑性。</text>

      {/* 底部总结 */}
      <rect x="40" y="532" width="720" height="32" rx="8" fill="url(#pdp-gs-1)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="552" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">黄金标准 = 已发展领域 + 舒适区外 + 明确目标 + 全神贯注 + 反馈纠错 + 心理表征</text>
    </svg>
  );
}
