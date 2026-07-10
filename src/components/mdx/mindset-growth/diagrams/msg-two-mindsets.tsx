"use client";

export function MsgTwoMindsetsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="固定型思维与成长型思维的核心对比图">
      <defs>
        <linearGradient id="msg-tm-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-tm-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="msg-tm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">两种思维模式：核心对比</text>

      {/* 顶部核心信念 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心信念</text>

      <rect x="30" y="74" width="340" height="56" rx="8" fill="url(#msg-tm-r)" opacity="0.9" />
      <text x="200" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">固定型思维</text>
      <text x="200" y="118" textAnchor="middle" fontSize="11" fill="#fee2e2">「能力是天生的、固定不变的」</text>

      <rect x="430" y="74" width="340" height="56" rx="8" fill="url(#msg-tm-g)" opacity="0.9" />
      <text x="600" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">成长型思维</text>
      <text x="600" y="118" textAnchor="middle" fontSize="11" fill="#dcfce7">「能力可以通过努力发展」</text>

      {/* 核心关注点 */}
      <text x="400" y="156" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心关注点</text>

      <rect x="30" y="168" width="340" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">关注「证明自己」</text>
      <text x="200" y="208" textAnchor="middle" fontSize="10" fill="#475569">每一次表现都是对能力的审判</text>

      <rect x="430" y="168" width="340" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">关注「提升自己」</text>
      <text x="600" y="208" textAnchor="middle" fontSize="10" fill="#475569">每一次表现都是学习的机会</text>

      {/* 面对挑战 */}
      <text x="400" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对挑战与困难</text>

      <rect x="30" y="256" width="340" height="64" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">回避挑战</text>
      <text x="200" y="296" textAnchor="middle" fontSize="10" fill="#475569">害怕失败暴露能力不足</text>
      <text x="200" y="312" textAnchor="middle" fontSize="10" fill="#475569">选择安全路径，过早放弃</text>

      <rect x="430" y="256" width="340" height="64" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">迎接挑战</text>
      <text x="600" y="296" textAnchor="middle" fontSize="10" fill="#475569">视困难为成长的阶梯</text>
      <text x="600" y="312" textAnchor="middle" fontSize="10" fill="#475569">坚持投入，从挫折中学习</text>

      {/* 面对批评与努力 */}
      <text x="400" y="346" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对批评与努力</text>

      <rect x="30" y="358" width="340" height="64" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">忽视有用反馈</text>
      <text x="200" y="398" textAnchor="middle" fontSize="10" fill="#475569">视批评为对自我的否定</text>
      <text x="200" y="414" textAnchor="middle" fontSize="10" fill="#475569">认为努力 = 自己不够聪明</text>

      <rect x="430" y="358" width="340" height="64" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="600" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">从批评中学习</text>
      <text x="600" y="398" textAnchor="middle" fontSize="10" fill="#475569">视反馈为改进的指南</text>
      <text x="600" y="414" textAnchor="middle" fontSize="10" fill="#475569">认为努力 = 通向精通之路</text>

      {/* 中间箭头 */}
      <path d="M374 102 L424 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-tm-arrow)" />
      <path d="M374 193 L424 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-tm-arrow)" />
      <path d="M374 288 L424 288" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-tm-arrow)" />
      <path d="M374 390 L424 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-tm-arrow)" />

      {/* 底部：行为链条 */}
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">行为链条</text>

      <rect x="40" y="460" width="340" height="50" rx="8" fill="url(#msg-tm-r)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="482" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">固定型链条</text>
      <text x="210" y="500" textAnchor="middle" fontSize="9" fill="#475569">天定能力 → 证明自己 → 回避挑战 → 害怕失败 → 停滞不前</text>

      <rect x="420" y="460" width="340" height="50" rx="8" fill="url(#msg-tm-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="482" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">成长型链条</text>
      <text x="590" y="500" textAnchor="middle" fontSize="9" fill="#475569">可塑能力 → 提升自己 → 迎接挑战 → 从失败学习 → 持续成长</text>

      {/* 底部总结 */}
      <rect x="40" y="524" width="720" height="36" rx="8" fill="url(#msg-tm-g)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="546" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心洞察：不是能力决定成就，而是对能力的信念决定行为路径和成长天花板</text>
    </svg>
  );
}
