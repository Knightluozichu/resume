"use client";

export function MsgMindsetInActionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="思维模式在行动中的四种场景对比图">
      <defs>
        <linearGradient id="msg-mia-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-mia-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="msg-mia-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">思维模式在行动：四种场景对比</text>

      {/* 场景一：面对成功 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对成功</text>

      <rect x="40" y="74" width="320" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="94" fontSize="11" fontWeight="700" fill="#b91c1c">固定型：成功 = 证明了自己</text>
      <text x="60" y="110" fontSize="10" fill="#475569">感到优越、骄傲，认为自己天生不同</text>
      <text x="60" y="124" fontSize="10" fill="#475569">不再努力，躺在功劳簿上</text>

      <rect x="440" y="74" width="320" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="460" y="94" fontSize="11" fontWeight="700" fill="#15803d">成长型：成功 = 努力的回报</text>
      <text x="460" y="110" fontSize="10" fill="#475569">感到激励，确认策略有效</text>
      <text x="460" y="124" fontSize="10" fill="#475569">设定更高目标，继续投入</text>

      <path d="M364 102 L436 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-mia-arrow)" />

      {/* 场景二：面对失败 */}
      <text x="200" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对失败</text>

      <rect x="40" y="168" width="320" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="188" fontSize="11" fontWeight="700" fill="#b91c1c">固定型：失败 = 我不够好</text>
      <text x="60" y="204" fontSize="10" fill="#475569">贴标签「我是失败者」</text>
      <text x="60" y="218" fontSize="10" fill="#475569">逃避、沮丧、放弃该领域</text>

      <rect x="440" y="168" width="320" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="460" y="188" fontSize="11" fontWeight="700" fill="#15803d">成长型：失败 = 学习机会</text>
      <text x="460" y="204" fontSize="10" fill="#475569">分析原因，调整策略</text>
      <text x="460" y="218" fontSize="10" fill="#475569">「还没有」掌握，继续尝试</text>

      <path d="M364 196 L436 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-mia-arrow)" />

      {/* 场景三：面对努力 */}
      <text x="200" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对努力</text>

      <rect x="40" y="262" width="320" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="282" fontSize="11" fontWeight="700" fill="#b91c1c">固定型：努力 = 不够聪明</text>
      <text x="60" y="298" fontSize="10" fill="#475569">需要努力说明天赋不足</text>
      <text x="60" y="312" fontSize="10" fill="#475569">追求毫不费力的天才形象</text>

      <rect x="440" y="262" width="320" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="460" y="282" fontSize="11" fontWeight="700" fill="#15803d">成长型：努力 = 精通之路</text>
      <text x="460" y="298" fontSize="10" fill="#475569">努力激活并强化神经连接</text>
      <text x="460" y="312" fontSize="10" fill="#475569">即使天才也需努力</text>

      <path d="M364 290 L436 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-mia-arrow)" />

      {/* 场景四：面对批评 */}
      <text x="200" y="344" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对批评与反馈</text>

      <rect x="40" y="356" width="320" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="376" fontSize="11" fontWeight="700" fill="#b91c1c">固定型：批评 = 人身攻击</text>
      <text x="60" y="392" fontSize="10" fill="#475569">防御、反驳、忽视反馈</text>
      <text x="60" y="406" fontSize="10" fill="#475569">感到被否定和受伤</text>

      <rect x="440" y="356" width="320" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="460" y="376" fontSize="11" fontWeight="700" fill="#15803d">成长型：批评 = 改进指南</text>
      <text x="460" y="392" fontSize="10" fill="#475569">认真倾听、冷静评估</text>
      <text x="460" y="406" fontSize="10" fill="#475569">用反馈指导下一步行动</text>

      <path d="M364 384 L436 384" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-mia-arrow)" />

      {/* 底部：「还没有」的力量 */}
      <text x="400" y="440" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">「还没有」的力量</text>

      <rect x="40" y="452" width="720" height="50" rx="8" fill="url(#msg-mia-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="474" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">成长型思维的语言：「我还没有掌握」而非「我做不到」</text>
      <text x="400" y="492" textAnchor="middle" fontSize="10" fill="#475569">「还没有」暗示能力是可发展的过程，将失败从终点转变为路标</text>

      {/* 底部总结 */}
      <rect x="40" y="514" width="720" height="46" rx="8" fill="url(#msg-mia-g)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="534" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">同一情境下两种思维产生截然不同的行为路径</text>
      <text x="400" y="550" textAnchor="middle" fontSize="10" fill="#475569">固定型走向回避与停滞，成长型走向学习与突破</text>
    </svg>
  );
}
