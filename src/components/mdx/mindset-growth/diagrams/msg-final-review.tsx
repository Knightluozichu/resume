"use client";

export function MsgFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="终身成长全书复习与知识整合图">
      <defs>
        <linearGradient id="msg-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="msg-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="msg-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="msg-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="msg-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：终身成长知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="150" height="56" rx="8" fill="url(#msg-fr-1)" opacity="0.9" />
      <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="95" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M172 102 L194 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="198" y="74" width="150" height="56" rx="8" fill="url(#msg-fr-1)" opacity="0.9" />
      <text x="273" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-3 基础</text>
      <text x="273" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">两种思维模式</text>

      <path d="M350 102 L372 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="376" y="74" width="150" height="56" rx="8" fill="url(#msg-fr-3)" opacity="0.9" />
      <text x="451" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch4-5 行动</text>
      <text x="451" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">思维在行动</text>

      <path d="M528 102 L550 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="554" y="74" width="150" height="56" rx="8" fill="url(#msg-fr-4)" opacity="0.9" />
      <text x="629" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch6-7 应用</text>
      <text x="629" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">商业 / 人际</text>

      <path d="M706 102 L728 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="732" y="74" width="48" height="56" rx="8" fill="url(#msg-fr-5)" opacity="0.9" />
      <text x="756" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">ch8-9</text>
      <text x="756" y="116" textAnchor="middle" fontSize="7" fill="#f3e8ff">传递+闭环</text>

      {/* 核心知识链 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="174" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">信念</text>
      <text x="80" y="214" textAnchor="middle" fontSize="8" fill="#475569">能力观</text>

      <path d="M140 202 L160 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="164" y="174" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="224" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">固定型</text>
      <text x="224" y="214" textAnchor="middle" fontSize="8" fill="#475569">证明自己</text>

      <path d="M284 202 L304 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="308" y="174" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="368" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">成长型</text>
      <text x="368" y="214" textAnchor="middle" fontSize="8" fill="#475569">提升自己</text>

      <path d="M428 202 L448 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="452" y="174" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">行动</text>
      <text x="512" y="214" textAnchor="middle" fontSize="8" fill="#475569">选择与坚持</text>

      <path d="M572 202 L592 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="596" y="174" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="656" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">成长</text>
      <text x="656" y="214" textAnchor="middle" fontSize="8" fill="#475569">终身进步</text>

      <path d="M716 202 L736 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="740" y="174" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="206" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">回望</text>

      <text x="400" y="252" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：信念决定思维 → 思维驱动行为 → 行为塑造成就 → 成长型思维实现终身成长</text>

      {/* 四大应用领域 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大应用领域</text>

      <rect x="20" y="294" width="180" height="100" rx="8" fill="url(#msg-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="110" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">体育</text>
      <text x="110" y="336" textAnchor="middle" fontSize="9" fill="#475569">乔丹 / 鲁斯 / 哈姆</text>
      <text x="110" y="352" textAnchor="middle" fontSize="9" fill="#475569">冠军 = 持续学习者</text>
      <text x="110" y="368" textAnchor="middle" fontSize="9" fill="#475569">天赋 × 努力 × 策略</text>
      <text x="110" y="384" textAnchor="middle" fontSize="9" fill="#475569">从失败中学习</text>

      <rect x="212" y="294" width="180" height="100" rx="8" fill="url(#msg-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="302" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">商业</text>
      <text x="302" y="336" textAnchor="middle" fontSize="9" fill="#475569">安然 vs 通用电气</text>
      <text x="302" y="352" textAnchor="middle" fontSize="9" fill="#475569">天才文化 vs 发展文化</text>
      <text x="302" y="368" textAnchor="middle" fontSize="9" fill="#475569">领导 = 培养他人</text>
      <text x="302" y="384" textAnchor="middle" fontSize="9" fill="#475569">组织思维模式</text>

      <rect x="404" y="294" width="180" height="100" rx="8" fill="url(#msg-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="494" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">人际</text>
      <text x="494" y="336" textAnchor="middle" fontSize="9" fill="#475569">审判 vs 培养</text>
      <text x="494" y="352" textAnchor="middle" fontSize="9" fill="#475569">关系需要经营</text>
      <text x="494" y="368" textAnchor="middle" fontSize="9" fill="#475569">问题 = 成长契机</text>
      <text x="494" y="384" textAnchor="middle" fontSize="9" fill="#475569">共同成长</text>

      <rect x="596" y="294" width="184" height="100" rx="8" fill="url(#msg-fr-5)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="688" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">教育</text>
      <text x="688" y="336" textAnchor="middle" fontSize="9" fill="#475569">赞美努力非智力</text>
      <text x="688" y="352" textAnchor="middle" fontSize="9" fill="#475569">关注过程非结果</text>
      <text x="688" y="368" textAnchor="middle" fontSize="9" fill="#475569">「还没有」的力量</text>
      <text x="688" y="384" textAnchor="middle" fontSize="9" fill="#475569">高标准 + 支持</text>

      {/* 成长型思维实践路径 */}
      <text x="400" y="418" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">成长型思维实践路径</text>

      <rect x="20" y="432" width="150" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="95" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">觉察信念</text>
      <text x="95" y="474" textAnchor="middle" fontSize="8" fill="#475569">识别固定型思维</text>

      <path d="M170 460 L190 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="194" y="432" width="150" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="269" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">改变语言</text>
      <text x="269" y="474" textAnchor="middle" fontSize="8" fill="#475569">用「还没有」</text>

      <path d="M344 460 L364 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="368" y="432" width="150" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="443" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">行动改变</text>
      <text x="443" y="474" textAnchor="middle" fontSize="8" fill="#475569">拥抱挑战</text>

      <path d="M518 460 L538 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="542" y="432" width="150" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="617" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">持续成长</text>
      <text x="617" y="474" textAnchor="middle" fontSize="8" fill="#475569">终身学习</text>

      <path d="M692 460 L712 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#msg-fr-arrow)" />

      <rect x="716" y="432" width="64" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="748" y="464" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">螺旋</text>
      <text x="748" y="478" textAnchor="middle" fontSize="8" fill="#475569">上升</text>

      {/* 底部总结 */}
      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#msg-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心经验：觉察信念 → 改变语言 → 行动改变 → 持续成长 = 成长型思维的终身实践</text>

      <rect x="20" y="546" width="760" height="24" rx="8" fill="url(#msg-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：信念决定思维 → 思维驱动行为 → 行为塑造成就 → 成长型思维实现终身成长</text>
    </svg>
  );
}
