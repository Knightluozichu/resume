"use client";

export function PpPragmaticPhilosophyDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="务实哲学核心概念图">
      <defs>
        <linearGradient id="pp-pp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-pp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-pp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-pp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-pp-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-pp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">务实哲学：五大核心概念</text>

      {/* 中心：务实态度 */}
      <rect x="300" y="58" width="200" height="50" rx="12" fill="url(#pp-pp-1)" opacity="0.95" />
      <text x="400" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">务实态度</text>
      <text x="400" y="99" textAnchor="middle" fontSize="10" fill="#e0f2fe">为结果负责，提供选择</text>

      {/* 五大概念卡片 */}
      <rect x="30" y="128" width="220" height="90" rx="10" fill="url(#pp-pp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="140" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">软件熵</text>
      <text x="140" y="172" textAnchor="middle" fontSize="10" fill="#475569">破窗理论</text>
      <text x="140" y="188" textAnchor="middle" fontSize="10" fill="#475569">发现即修，不留坏窗</text>
      <text x="140" y="206" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">勿以恶小而为之</text>

      <rect x="290" y="128" width="220" height="90" rx="10" fill="url(#pp-pp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">足够好的软件</text>
      <text x="400" y="172" textAnchor="middle" fontSize="10" fill="#475569">质量与范围平衡</text>
      <text x="400" y="188" textAnchor="middle" fontSize="10" fill="#475569">让用户决定何时够好</text>
      <text x="400" y="206" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">完美是优秀之敌</text>

      <rect x="550" y="128" width="220" height="90" rx="10" fill="url(#pp-pp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="660" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">知识组合</text>
      <text x="660" y="172" textAnchor="middle" fontSize="10" fill="#475569">定期投资</text>
      <text x="660" y="188" textAnchor="middle" fontSize="10" fill="#475569">多元化 / 评估 / 计划</text>
      <text x="660" y="206" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ca8a04">知识会过期</text>

      <rect x="30" y="240" width="340" height="90" rx="10" fill="url(#pp-pp-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">石头汤与我的猫吃了代码</text>
      <text x="200" y="284" textAnchor="middle" fontSize="10" fill="#475569">做变革的催化剂——先展示原型</text>
      <text x="200" y="300" textAnchor="middle" fontSize="10" fill="#475569">为自己的行为负责</text>
      <text x="200" y="318" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">提供选择，别找借口</text>

      <rect x="400" y="240" width="370" height="90" rx="10" fill="url(#pp-pp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="585" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">沟通的艺术</text>
      <text x="585" y="284" textAnchor="middle" fontSize="10" fill="#475569">了解听众 / 选择时机</text>
      <text x="585" y="300" textAnchor="middle" fontSize="10" fill="#475569">调整风格 / 让文档美观</text>
      <text x="585" y="318" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0ea5e9">除非你与人沟通，否则什么都不会发生</text>

      {/* 责任链 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">务实者责任链</text>

      <rect x="20" y="372" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">提供选择</text>
      <text x="80" y="412" textAnchor="middle" fontSize="8" fill="#475569">别找借口</text>

      <path d="M140 400 L160 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-pp-arrow)" />

      <rect x="164" y="372" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="224" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">承担责任</text>
      <text x="224" y="412" textAnchor="middle" fontSize="8" fill="#475569">为结果负责</text>

      <path d="M284 400 L304 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-pp-arrow)" />

      <rect x="308" y="372" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="368" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">打破僵局</text>
      <text x="368" y="412" textAnchor="middle" fontSize="8" fill="#475569">做催化剂</text>

      <path d="M428 400 L448 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-pp-arrow)" />

      <rect x="452" y="372" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">持续学习</text>
      <text x="512" y="412" textAnchor="middle" fontSize="8" fill="#475569">投资知识</text>

      <path d="M572 400 L592 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-pp-arrow)" />

      <rect x="596" y="372" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="656" y="392" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">有效沟通</text>
      <text x="656" y="412" textAnchor="middle" fontSize="8" fill="#475569">让事情发生</text>

      <path d="M716 400 L736 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-pp-arrow)" />

      <rect x="740" y="372" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="404" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      {/* 底部总结 */}
      <rect x="20" y="450" width="760" height="48" rx="8" fill="url(#pp-pp-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心洞见</text>
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#475569">务实 = 负责任的态度 + 不断学习的知识组合 + 有效的沟通 + 对质量的务实平衡</text>

      {/* 底部脉络 */}
      <rect x="20" y="518" width="760" height="44" rx="8" fill="url(#pp-pp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="546" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">务实心智：态度 → 知识 → 沟通 → 实践</text>
    </svg>
  );
}
