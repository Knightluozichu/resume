"use client";

export function PdpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="刻意练习全书复习与知识整合图">
      <defs>
        <linearGradient id="pdp-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="pdp-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="pdp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：刻意练习知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="150" height="56" rx="8" fill="url(#pdp-fr-1)" opacity="0.9" />
      <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="95" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M172 102 L194 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="198" y="74" width="150" height="56" rx="8" fill="url(#pdp-fr-1)" opacity="0.9" />
      <text x="273" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="273" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">练习与心理表征</text>

      <path d="M350 102 L372 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="376" y="74" width="150" height="56" rx="8" fill="url(#pdp-fr-2)" opacity="0.9" />
      <text x="451" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 核心</text>
      <text x="451" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">黄金标准与原则</text>

      <path d="M528 102 L550 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="554" y="74" width="150" height="56" rx="8" fill="url(#pdp-fr-3)" opacity="0.9" />
      <text x="629" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 方法</text>
      <text x="629" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">导师与瓶颈</text>

      <path d="M706 102 L728 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="732" y="74" width="48" height="56" rx="8" fill="url(#pdp-fr-4)" opacity="0.9" />
      <text x="756" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">ch7-9</text>
      <text x="756" y="116" textAnchor="middle" fontSize="7" fill="#d1fae5">应用+闭环</text>

      {/* 核心知识链 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="174" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">天真练习</text>
      <text x="80" y="214" textAnchor="middle" fontSize="8" fill="#475569">重复即可</text>

      <path d="M140 202 L160 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="164" y="174" width="120" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="224" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">目的练习</text>
      <text x="224" y="214" textAnchor="middle" fontSize="8" fill="#475569">目标+反馈</text>

      <path d="M284 202 L304 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="308" y="174" width="120" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="368" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">刻意练习</text>
      <text x="368" y="214" textAnchor="middle" fontSize="8" fill="#475569">专家标准</text>

      <path d="M428 202 L448 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="452" y="174" width="120" height="56" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="512" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">心理表征</text>
      <text x="512" y="214" textAnchor="middle" fontSize="8" fill="#475569">持续升级</text>

      <path d="M572 202 L592 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="596" y="174" width="120" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="656" y="194" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">专家表现</text>
      <text x="656" y="214" textAnchor="middle" fontSize="8" fill="#475569">持续突破</text>

      <path d="M716 202 L736 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="740" y="174" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="206" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">循环</text>

      <text x="400" y="252" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：天真练习 → 目的练习 → 刻意练习 → 心理表征升级 → 专家级表现</text>

      {/* 四大应用维度 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">刻意练习四大维度</text>

      <rect x="20" y="294" width="180" height="100" rx="8" fill="url(#pdp-fr-2)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="110" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">心理表征</text>
      <text x="110" y="336" textAnchor="middle" fontSize="9" fill="#475569">专家的核心资产</text>
      <text x="110" y="352" textAnchor="middle" fontSize="9" fill="#475569">识别模式 · 预判规划</text>
      <text x="110" y="368" textAnchor="middle" fontSize="9" fill="#475569">自我监控</text>
      <text x="110" y="384" textAnchor="middle" fontSize="9" fill="#475569">持续升级</text>

      <rect x="212" y="294" width="180" height="100" rx="8" fill="url(#pdp-fr-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="302" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">练习方法</text>
      <text x="302" y="336" textAnchor="middle" fontSize="9" fill="#475569">四大核心原则</text>
      <text x="302" y="352" textAnchor="middle" fontSize="9" fill="#475569">明确目标 · 全神贯注</text>
      <text x="302" y="368" textAnchor="middle" fontSize="9" fill="#475569">即时反馈 · 舒适区外</text>
      <text x="302" y="384" textAnchor="middle" fontSize="9" fill="#475569">循环迭代</text>

      <rect x="404" y="294" width="180" height="100" rx="8" fill="url(#pdp-fr-4)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="494" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">导师反馈</text>
      <text x="494" y="336" textAnchor="middle" fontSize="9" fill="#475569">教练的核心价值</text>
      <text x="494" y="352" textAnchor="middle" fontSize="9" fill="#475569">设计练习 · 提供反馈</text>
      <text x="494" y="368" textAnchor="middle" fontSize="9" fill="#475569">传授表征 · 跨越瓶颈</text>
      <text x="494" y="384" textAnchor="middle" fontSize="9" fill="#475569">无导师时自我反馈</text>

      <rect x="596" y="294" width="184" height="100" rx="8" fill="url(#pdp-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="688" y="316" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">专家之路</text>
      <text x="688" y="336" textAnchor="middle" fontSize="9" fill="#475569">四个发展阶段</text>
      <text x="688" y="352" textAnchor="middle" fontSize="9" fill="#475569">兴趣 → 认真 → 全力</text>
      <text x="688" y="368" textAnchor="middle" fontSize="9" fill="#475569">→ 创新</text>
      <text x="688" y="384" textAnchor="middle" fontSize="9" fill="#475569">终身可塑</text>

      {/* 实践路径 */}
      <text x="400" y="418" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">刻意练习实践路径</text>

      <rect x="20" y="432" width="150" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="95" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">找到目标</text>
      <text x="95" y="474" textAnchor="middle" fontSize="8" fill="#475569">分解子技能</text>

      <path d="M170 460 L190 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="194" y="432" width="150" height="56" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="269" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">设计练习</text>
      <text x="269" y="474" textAnchor="middle" fontSize="8" fill="#475569">舒适区外挑战</text>

      <path d="M344 460 L364 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="368" y="432" width="150" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="443" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706">获取反馈</text>
      <text x="443" y="474" textAnchor="middle" fontSize="8" fill="#475569">导师或标杆</text>

      <path d="M518 460 L538 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="542" y="432" width="150" height="56" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="617" y="454" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">纠正迭代</text>
      <text x="617" y="474" textAnchor="middle" fontSize="8" fill="#475569">构建表征</text>

      <path d="M692 460 L712 460" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-fr-arrow)" />

      <rect x="716" y="432" width="64" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="748" y="464" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">螺旋</text>
      <text x="748" y="478" textAnchor="middle" fontSize="8" fill="#475569">上升</text>

      {/* 底部总结 */}
      <rect x="20" y="506" width="760" height="32" rx="8" fill="url(#pdp-fr-3)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">核心经验：明确目标 + 全神贯注 + 即时反馈 + 舒适区外 = 刻意练习的终身实践</text>

      <rect x="20" y="546" width="760" height="24" rx="8" fill="url(#pdp-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：天真练习 → 目的练习 → 刻意练习 → 心理表征升级 → 专家级表现</text>
    </svg>
  );
}
