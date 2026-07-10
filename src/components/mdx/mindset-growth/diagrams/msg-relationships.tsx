"use client";

export function MsgRelationshipsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="人际关系中两种思维模式对比图">
      <defs>
        <linearGradient id="msg-rs-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-rs-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-rs-p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="msg-rs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">人际关系：两种思维模式</text>

      {/* 关系中的思维 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">关系中的核心差异</text>

      <rect x="30" y="74" width="340" height="56" rx="8" fill="url(#msg-rs-r)" opacity="0.9" />
      <text x="200" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">固定型：审判与比较</text>
      <text x="200" y="118" textAnchor="middle" fontSize="11" fill="#fee2e2">伴侣必须完美匹配，关系不需要努力</text>

      <rect x="430" y="74" width="340" height="56" rx="8" fill="url(#msg-rs-g)" opacity="0.9" />
      <text x="600" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">成长型：培养与成长</text>
      <text x="600" y="118" textAnchor="middle" fontSize="11" fill="#dcfce7">关系需要经营，问题是成长的契机</text>

      {/* 三个维度对比 */}
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三个维度对比</text>

      <rect x="30" y="168" width="340" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="188" fontSize="11" fontWeight="700" fill="#b91c1c">面对问题</text>
      <text x="50" y="206" fontSize="10" fill="#475569">问题 = 性格不合 = 关系的死刑判决</text>

      <rect x="430" y="168" width="340" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="188" fontSize="11" fontWeight="700" fill="#15803d">面对问题</text>
      <text x="450" y="206" fontSize="10" fill="#475569">问题 = 沟通和理解的契机，共同解决</text>

      <rect x="30" y="228" width="340" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="248" fontSize="11" fontWeight="700" fill="#b91c1c">面对伴侣缺点</text>
      <text x="50" y="266" fontSize="10" fill="#475569">指责对方性格有缺陷，试图改变对方</text>

      <rect x="430" y="228" width="340" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="248" fontSize="11" fontWeight="700" fill="#15803d">面对伴侣缺点</text>
      <text x="450" y="266" fontSize="10" fill="#475569">理解包容，帮助对方成长，也反思自己</text>

      <rect x="30" y="288" width="340" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="308" fontSize="11" fontWeight="700" fill="#b91c1c">面对竞争</text>
      <text x="50" y="326" fontSize="10" fill="#475569">通过贬低对方来确认自己的优越感</text>

      <rect x="430" y="288" width="340" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="308" fontSize="11" fontWeight="700" fill="#15803d">面对竞争</text>
      <text x="450" y="326" fontSize="10" fill="#475569">为对方的进步感到高兴，互相激励</text>

      {/* 害羞与霸凌 */}
      <text x="400" y="362" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">害羞与霸凌</text>

      <rect x="30" y="374" width="370" height="64" rx="8" fill="url(#msg-rs-p)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="50" y="394" fontSize="11" fontWeight="700" fill="#7e22ce">固定型与害羞</text>
      <text x="50" y="412" fontSize="10" fill="#475569">害怕社交评价，回避社交场合</text>
      <text x="50" y="428" fontSize="10" fill="#475569">担心暴露不足，从而更加孤立</text>

      <rect x="410" y="374" width="370" height="64" rx="8" fill="url(#msg-rs-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="394" fontSize="11" fontWeight="700" fill="#15803d">成长型与害羞</text>
      <text x="430" y="412" fontSize="10" fill="#475569">虽然紧张但主动参与社交</text>
      <text x="430" y="428" fontSize="10" fill="#475569">视社交为可练习的技能，逐步克服</text>

      <rect x="30" y="448" width="370" height="50" rx="8" fill="url(#msg-rs-r)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="468" fontSize="11" fontWeight="700" fill="#b91c1c">霸凌者</text>
      <text x="50" y="486" fontSize="10" fill="#475569">通过贬低他人确认自己的优越感和权力</text>

      <rect x="410" y="448" width="370" height="50" rx="8" fill="url(#msg-rs-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="468" fontSize="11" fontWeight="700" fill="#15803d">受害者恢复</text>
      <text x="430" y="486" fontSize="10" fill="#475569">用成长型思维重建自信，不将欺凌内化为自我标签</text>

      {/* 底部总结 */}
      <rect x="40" y="512" width="720" height="32" rx="8" fill="url(#msg-rs-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">成长型关系：不追求「天生一对」，而是用心经营、共同成长</text>

      <rect x="40" y="552" width="720" height="20" rx="8" fill="url(#msg-rs-p)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="566" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">关系的质量不在于找到完美的人，而在于两人如何面对问题</text>
    </svg>
  );
}
