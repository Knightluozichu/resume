"use client";

export function MsgGrowthMindsetDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="成长型思维特征与行为模式图">
      <defs>
        <linearGradient id="msg-gm-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="msg-gm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">成长型思维：特征与行为模式</text>

      {/* 核心信念 */}
      <rect x="220" y="50" width="360" height="40" rx="8" fill="url(#msg-gm-g)" opacity="0.9" />
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">核心信念：能力可以通过努力和学习不断发展</text>

      <path d="M400 90 L400 94" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-gm-arrow)" />

      {/* 三大关注 */}
      <text x="400" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三大关注焦点</text>

      <rect x="40" y="128" width="230" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="155" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">提升自己</text>
      <text x="155" y="168" textAnchor="middle" fontSize="10" fill="#475569">关注学习和进步过程</text>
      <text x="155" y="182" textAnchor="middle" fontSize="10" fill="#475569">不急于证明已有能力</text>

      <rect x="285" y="128" width="230" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">从错误中学习</text>
      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#475569">犯错是学习的必经之路</text>
      <text x="400" y="182" textAnchor="middle" fontSize="10" fill="#475569">正视并纠正错误</text>

      <rect x="530" y="128" width="230" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="645" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">与他人共成长</text>
      <text x="645" y="168" textAnchor="middle" fontSize="10" fill="#475569">从他人成功中汲取灵感</text>
      <text x="645" y="182" textAnchor="middle" fontSize="10" fill="#475569">合作而非比较</text>

      {/* 行为模式 */}
      <text x="400" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型行为模式</text>

      <rect x="40" y="228" width="350" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="248" fontSize="11" fontWeight="700" fill="#15803d">拥抱挑战</text>
      <text x="60" y="264" fontSize="10" fill="#475569">主动选择有难度的任务以扩展能力</text>

      <rect x="410" y="228" width="350" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="248" fontSize="11" fontWeight="700" fill="#15803d">坚持不懈</text>
      <text x="430" y="264" fontSize="10" fill="#475569">遇到困难时调整策略而非放弃</text>

      <rect x="40" y="280" width="350" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="300" fontSize="11" fontWeight="700" fill="#15803d">从反馈中学习</text>
      <text x="60" y="316" fontSize="10" fill="#475569">把批评当作改进的具体指南</text>

      <rect x="410" y="280" width="350" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="300" fontSize="11" fontWeight="700" fill="#15803d">受他人激励</text>
      <text x="430" y="316" fontSize="10" fill="#475569">别人的成功是榜样而非威胁</text>

      {/* 失败后的反应链条 */}
      <text x="400" y="348" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">失败后的反应链条</text>

      <rect x="30" y="360" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="100" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">遭遇失败</text>
      <text x="100" y="400" textAnchor="middle" fontSize="9" fill="#475569">表现不如预期</text>
      <text x="100" y="414" textAnchor="middle" fontSize="9" fill="#475569">或犯了错误</text>

      <path d="M174 390 L198 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-gm-arrow)" />

      <rect x="202" y="360" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="272" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">分析原因</text>
      <text x="272" y="400" textAnchor="middle" fontSize="9" fill="#475569">「我需要改变」</text>
      <text x="272" y="414" textAnchor="middle" fontSize="9" fill="#475569">「策略不对」</text>

      <path d="M346 390 L370 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-gm-arrow)" />

      <rect x="374" y="360" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="444" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">学习经验</text>
      <text x="444" y="400" textAnchor="middle" fontSize="9" fill="#475569">从错误中提取</text>
      <text x="444" y="414" textAnchor="middle" fontSize="9" fill="#475569">改进信息</text>

      <path d="M518 390 L542 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-gm-arrow)" />

      <rect x="546" y="360" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="616" y="382" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">加倍努力</text>
      <text x="616" y="400" textAnchor="middle" fontSize="9" fill="#475569">投入更多精力</text>
      <text x="616" y="414" textAnchor="middle" fontSize="9" fill="#475569">尝试新策略</text>

      <path d="M690 390 L714 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-gm-arrow)" />

      <rect x="718" y="360" width="52" height="60" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="744" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">持续</text>
      <text x="744" y="400" textAnchor="middle" fontSize="9" fill="#475569">能力</text>
      <text x="744" y="414" textAnchor="middle" fontSize="9" fill="#475569">提升</text>

      {/* 努力观 */}
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">对努力的看法</text>

      <rect x="80" y="460" width="640" height="50" rx="8" fill="url(#msg-gm-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="482" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">「努力是通向精通的必经之路」</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#475569">将努力视为激活和强化神经连接的关键过程，天才也需要努力才能将潜能转化为成就</text>

      {/* 底部总结 */}
      <rect x="40" y="524" width="720" height="36" rx="8" fill="url(#msg-gm-g)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="546" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心效应：成长型思维让人持续突破舒适区，能力的上限由投入和策略决定而非天赋</text>
    </svg>
  );
}
