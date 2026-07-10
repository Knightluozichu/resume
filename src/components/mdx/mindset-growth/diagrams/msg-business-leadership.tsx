"use client";

export function MsgBusinessLeadershipDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="商业与领导力思维模式对比图">
      <defs>
        <linearGradient id="msg-bl-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-bl-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-bl-o" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="msg-bl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">商业与领导力：两种思维模式</text>

      {/* 两种领导者 */}
      <text x="200" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">固定型领导者</text>
      <text x="600" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">成长型领导者</text>

      <rect x="30" y="74" width="340" height="56" rx="8" fill="url(#msg-bl-r)" opacity="0.9" />
      <text x="200" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">天才文化</text>
      <text x="200" y="118" textAnchor="middle" fontSize="11" fill="#fee2e2">招募天才，证明自己最聪明</text>

      <rect x="430" y="74" width="340" height="56" rx="8" fill="url(#msg-bl-g)" opacity="0.9" />
      <text x="600" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">发展文化</text>
      <text x="600" y="118" textAnchor="middle" fontSize="11" fill="#dcfce7">培养团队，共同成长进步</text>

      {/* 典型案例 */}
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">典型案例对比</text>

      <rect x="30" y="168" width="340" height="90" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="188" fontSize="12" fontWeight="700" fill="#b91c1c">安然（Enron）</text>
      <text x="50" y="206" fontSize="10" fill="#475569">「我们只招最聪明的人」</text>
      <text x="50" y="222" fontSize="10" fill="#475569">员工互相比拼、掩盖错误</text>
      <text x="50" y="238" fontSize="10" fill="#475569">为维持「天才」形象而造假</text>
      <text x="50" y="254" fontSize="10" fill="#475569">最终因系统性欺诈而崩溃</text>

      <rect x="430" y="168" width="340" height="90" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="188" fontSize="12" fontWeight="700" fill="#15803d">通用电气（杰克·韦尔奇）</text>
      <text x="450" y="206" fontSize="10" fill="#475569">花大量时间在员工发展上</text>
      <text x="450" y="222" fontSize="10" fill="#475569">深入一线倾听、学习</text>
      <text x="450" y="238" fontSize="10" fill="#475569">视错误为学习机会</text>
      <text x="450" y="254" fontSize="10" fill="#475569">团队成长 = 企业成功</text>

      {/* 领导行为对比 */}
      <text x="400" y="282" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">领导行为对比</text>

      <rect x="30" y="294" width="340" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="50" y="314" fontSize="11" fontWeight="700" fill="#a16207">自我中心</text>
      <text x="50" y="330" fontSize="10" fill="#475569">企业是展示个人天才的舞台</text>

      <rect x="430" y="294" width="340" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="314" fontSize="11" fontWeight="700" fill="#15803d">团队赋能</text>
      <text x="450" y="330" fontSize="10" fill="#475569">企业是培养人才和解决问题的地方</text>

      <rect x="30" y="346" width="340" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="50" y="366" fontSize="11" fontWeight="700" fill="#a16207">压制异见</text>
      <text x="50" y="382" fontSize="10" fill="#475569">不同意见被视为对自己权威的挑战</text>

      <rect x="430" y="346" width="340" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="366" fontSize="11" fontWeight="700" fill="#15803d">欢迎批评</text>
      <text x="450" y="382" fontSize="10" fill="#475569">主动寻找不同意见，坦诚面对问题</text>

      {/* 组织思维模式 */}
      <text x="400" y="416" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">组织思维模式</text>

      <rect x="40" y="428" width="350" height="64" rx="8" fill="url(#msg-bl-r)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="215" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">固定型组织</text>
      <text x="215" y="468" textAnchor="middle" fontSize="10" fill="#475569">奖励「看起来聪明」而非「真正学习」</text>
      <text x="215" y="484" textAnchor="middle" fontSize="10" fill="#475569">掩盖错误、内部竞争、信息壁垒</text>

      <rect x="410" y="428" width="350" height="64" rx="8" fill="url(#msg-bl-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="585" y="450" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">成长型组织</text>
      <text x="585" y="468" textAnchor="middle" fontSize="10" fill="#475569">奖励「学习、冒险、合作」</text>
      <text x="585" y="484" textAnchor="middle" fontSize="10" fill="#475569">公开复盘、协作共享、持续改进</text>

      {/* 底部总结 */}
      <rect x="40" y="508" width="720" height="36" rx="8" fill="url(#msg-bl-o)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="530" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">领导力的核心：不是证明自己最聪明，而是让团队和组织持续成长</text>

      <rect x="40" y="552" width="720" height="20" rx="8" fill="url(#msg-bl-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="566" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">成长型领导者 = 培养他人 + 拥抱失败 + 持续学习</text>
    </svg>
  );
}
