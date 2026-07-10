"use client";

export function PdpMentalRepresentationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="心理表征：专家与新手的认知差异图">
      <defs>
        <linearGradient id="pdp-mr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="pdp-mr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pdp-mr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="pdp-mr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">心理表征：专家的大脑里有什么</text>

      {/* 新手 vs 专家 信息处理对比 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">新手</text>
      <text x="600" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">专家</text>

      {/* 新手：碎片化表征 */}
      <rect x="40" y="80" width="320" height="180" rx="12" fill="url(#pdp-mr-2)" opacity="0.06" stroke="#0ea5e9" strokeWidth="2" />

      <circle cx="100" cy="130" r="20" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="134" textAnchor="middle" fontSize="9" fill="#0369a1">信息A</text>

      <circle cx="180" cy="110" r="18" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="180" y="114" textAnchor="middle" fontSize="9" fill="#0369a1">信息B</text>

      <circle cx="260" cy="140" r="20" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="260" y="144" textAnchor="middle" fontSize="9" fill="#0369a1">信息C</text>

      <circle cx="140" cy="200" r="18" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="140" y="204" textAnchor="middle" fontSize="9" fill="#0369a1">信息D</text>

      <circle cx="240" cy="210" r="18" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="240" y="214" textAnchor="middle" fontSize="9" fill="#0369a1">信息E</text>

      <text x="200" y="250" textAnchor="middle" fontSize="11" fill="#0369a1">孤立碎片 · 工作记忆过载</text>

      {/* 专家：结构化表征 */}
      <rect x="440" y="80" width="320" height="180" rx="12" fill="url(#pdp-mr-1)" opacity="0.06" stroke="#8b5cf6" strokeWidth="2" />

      <circle cx="520" cy="130" r="22" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="520" y="134" textAnchor="middle" fontSize="9" fill="#7c3aed">模式</text>

      <circle cx="600" cy="110" r="20" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="600" y="114" textAnchor="middle" fontSize="9" fill="#7c3aed">组块</text>

      <circle cx="680" cy="140" r="22" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="680" y="144" textAnchor="middle" fontSize="9" fill="#7c3aed">模式</text>

      <circle cx="560" cy="200" r="20" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="560" y="204" textAnchor="middle" fontSize="9" fill="#7c3aed">组块</text>

      <circle cx="660" cy="210" r="20" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="214" textAnchor="middle" fontSize="9" fill="#7c3aed">组块</text>

      <line x1="520" y1="130" x2="600" y2="110" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="600" y1="110" x2="680" y2="140" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="520" y1="130" x2="560" y2="200" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="680" y1="140" x2="660" y2="210" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="560" y1="200" x2="660" y2="210" stroke="#8b5cf6" strokeWidth="1.5" />
      <line x1="600" y1="110" x2="560" y2="200" stroke="#8b5cf6" strokeWidth="1.5" />

      <text x="600" y="250" textAnchor="middle" fontSize="11" fill="#7c3aed">结构化组块 · 工作记忆高效</text>

      {/* 心理表征的核心功能 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">心理表征的三大功能</text>

      <rect x="40" y="304" width="230" height="100" rx="10" fill="url(#pdp-mr-2)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="155" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">1. 识别模式</text>
      <text x="155" y="350" textAnchor="middle" fontSize="10" fill="#475569">瞬间从海量信息中</text>
      <text x="155" y="366" textAnchor="middle" fontSize="10" fill="#475569">提取关键特征</text>
      <text x="155" y="386" textAnchor="middle" fontSize="10" fill="#475569">（棋手看棋盘）</text>

      <rect x="285" y="304" width="230" height="100" rx="10" fill="url(#pdp-mr-1)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">2. 预判与规划</text>
      <text x="400" y="350" textAnchor="middle" fontSize="10" fill="#475569">提前模拟可能的发展</text>
      <text x="400" y="366" textAnchor="middle" fontSize="10" fill="#475569">预演应对策略</text>
      <text x="400" y="386" textAnchor="middle" fontSize="10" fill="#475569">（足球中场看跑位）</text>

      <rect x="530" y="304" width="230" height="100" rx="10" fill="url(#pdp-mr-3)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="645" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d97706">3. 自我监控</text>
      <text x="645" y="350" textAnchor="middle" fontSize="10" fill="#475569">实时评估自己的表现</text>
      <text x="645" y="366" textAnchor="middle" fontSize="10" fill="#475569">发现偏差并纠正</text>
      <text x="645" y="386" textAnchor="middle" fontSize="10" fill="#475569">（音乐家听自己的演奏）</text>

      {/* 表征升级循环 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">心理表征升级循环</text>

      <rect x="80" y="446" width="140" height="50" rx="10" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">练习技能</text>
      <text x="150" y="484" textAnchor="middle" fontSize="9" fill="#475569">在舒适区外训练</text>

      <path d="M220 471 L290 471" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-mr-arrow)" />

      <rect x="294" y="446" width="140" height="50" rx="10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="364" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">构建表征</text>
      <text x="364" y="484" textAnchor="middle" fontSize="9" fill="#475569">形成模式与组块</text>

      <path d="M434 471 L504 471" stroke="#64748b" strokeWidth="2" markerEnd="url(#pdp-mr-arrow)" />

      <rect x="508" y="446" width="140" height="50" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="578" y="468" textAnchor="middle" fontSize="11" fontWeight="600" fill="#d97706">表现提升</text>
      <text x="578" y="484" textAnchor="middle" fontSize="9" fill="#475569">更高水平的表现</text>

      <path d="M578 446 Q578 420 364 420 Q150 420 150 446" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#pdp-mr-arrow)" />
      <text x="364" y="412" textAnchor="middle" fontSize="9" fill="#64748b">更高水平的练习需要更强表征 → 循环升级</text>

      {/* 底部总结 */}
      <rect x="40" y="516" width="720" height="48" rx="8" fill="url(#pdp-mr-1)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="538" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">核心洞察：刻意练习的本质 = 持续构建和升级高质量心理表征</text>
      <text x="400" y="556" textAnchor="middle" fontSize="10" fill="#475569">表征越精细 → 识别越快 → 预判越准 → 表现越好 → 练习越有效</text>
    </svg>
  );
}
