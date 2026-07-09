"use client";

export function MasRationalAgentsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="理性智能体与决策：PEAS、效用与搜索">
      <defs>
        <linearGradient id="mas-ra-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-ra-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-ra-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-ra-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mas-ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">理性智能体与决策</text>

      {/* PEAS 任务环境 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">PEAS 任务环境规范</text>

      <rect x="40" y="76" width="180" height="64" rx="10" fill="url(#mas-ra-blue)" opacity="0.9" />
      <text x="130" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">P 性能度量</text>
      <text x="130" y="120" textAnchor="middle" fontSize="9" fill="#bfdbfe">成功与否的量化标准</text>

      <rect x="232" y="76" width="180" height="64" rx="10" fill="url(#mas-ra-purple)" opacity="0.9" />
      <text x="322" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">E 环境</text>
      <text x="322" y="120" textAnchor="middle" fontSize="9" fill="#ede9fe">外部世界与状态</text>

      <rect x="424" y="76" width="180" height="64" rx="10" fill="url(#mas-ra-amber)" opacity="0.9" />
      <text x="514" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">A 执行器</text>
      <text x="514" y="120" textAnchor="middle" fontSize="9" fill="#fef3c7">可执行动作集合</text>

      <rect x="616" y="76" width="144" height="64" rx="10" fill="url(#mas-ra-green)" opacity="0.9" />
      <text x="688" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">S 传感器</text>
      <text x="688" y="120" textAnchor="middle" fontSize="9" fill="#d1fae5">感知输入来源</text>

      {/* 理性准则 */}
      <text x="400" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">理性行动 = 最大化期望效用</text>

      <rect x="40" y="184" width="720" height="44" rx="8" fill="url(#mas-ra-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="204" textAnchor="middle" fontSize="11" fill="#475569">给定感知序列 + 内建知识，选择使期望效用最大化的动作</text>
      <text x="400" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">理性 ≠ 全知 ≠ 成功 ≠ 永不犯错；理性 = 在信息有限下做最优期望选择</text>

      {/* 效用与决策树 */}
      <text x="220" y="254" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">期望效用决策</text>
      <text x="580" y="254" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">搜索式决策</text>

      <rect x="40" y="268" width="360" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="290" fontSize="11" fontWeight="700" fill="#1e40af">动作 A1</text>
      <text x="60" y="308" fontSize="10" fill="#475569">结果 r1 概率 0.7 效用 +10</text>
      <text x="60" y="324" fontSize="10" fill="#475569">结果 r2 概率 0.3 效用 -4</text>
      <text x="60" y="344" fontSize="10" fontWeight="700" fill="#7c3aed">EU(A1) = 0.7×10 + 0.3×(-4) = 5.8</text>

      <text x="60" y="372" fontSize="11" fontWeight="700" fill="#1e40af">动作 A2</text>
      <text x="60" y="390" fontSize="10" fill="#475569">结果 r1 概率 0.5 效用 +8</text>
      <text x="60" y="406" fontSize="10" fill="#475569">结果 r2 概率 0.5 效用 +2</text>
      <text x="60" y="426" fontSize="10" fontWeight="700" fill="#7c3aed">EU(A2) = 0.5×8 + 0.5×2 = 5.0</text>

      <rect x="280" y="380" width="100" height="44" rx="8" fill="url(#mas-ra-green)" opacity="0.9" />
      <text x="330" y="400" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">选择 A1</text>
      <text x="330" y="416" textAnchor="middle" fontSize="9" fill="#d1fae5">EU 更大</text>

      <rect x="420" y="268" width="340" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="290" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">状态空间搜索</text>

      <rect x="560" y="300" width="60" height="28" rx="6" fill="url(#mas-ra-amber)" opacity="0.9" />
      <text x="590" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">初始</text>

      <path d="M580 328 L540 348" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-ra-arrow)" />
      <path d="M590 328 L590 348" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-ra-arrow)" />
      <path d="M600 328 L640 348" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-ra-arrow)" />

      <rect x="510" y="352" width="50" height="24" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="535" y="368" textAnchor="middle" fontSize="9" fill="#1e40af">s1</text>
      <rect x="565" y="352" width="50" height="24" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="590" y="368" textAnchor="middle" fontSize="9" fill="#1e40af">s2</text>
      <rect x="620" y="352" width="50" height="24" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="645" y="368" textAnchor="middle" fontSize="9" fill="#1e40af">s3</text>

      <path d="M535 376 L535 396" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-ra-arrow)" />
      <path d="M590 376 L590 396" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mas-ra-arrow)" />

      <rect x="510" y="400" width="50" height="24" rx="5" fill="url(#mas-ra-green)" opacity="0.85" />
      <text x="535" y="416" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">目标</text>
      <rect x="565" y="400" width="50" height="24" rx="5" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1" />
      <text x="590" y="416" textAnchor="middle" fontSize="9" fill="#92400e">展开</text>
      <text x="590" y="430" textAnchor="middle" fontSize="9" fill="#64748b">A* / 贪心 / minimax</text>

      {/* 决策要素 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">理性决策四要素</text>

      <rect x="40" y="478" width="172" height="56" rx="8" fill="url(#mas-ra-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="126" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">性能度量</text>
      <text x="126" y="518" textAnchor="middle" fontSize="9" fill="#475569">定义什么是成功</text>

      <rect x="224" y="478" width="172" height="56" rx="8" fill="url(#mas-ra-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">先验知识</text>
      <text x="310" y="518" textAnchor="middle" fontSize="9" fill="#475569">环境规律的内建</text>

      <rect x="408" y="478" width="172" height="56" rx="8" fill="url(#mas-ra-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="494" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">感知序列</text>
      <text x="494" y="518" textAnchor="middle" fontSize="9" fill="#475569">历史可观察输入</text>

      <rect x="592" y="478" width="168" height="56" rx="8" fill="url(#mas-ra-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="676" y="500" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">可行动作</text>
      <text x="676" y="518" textAnchor="middle" fontSize="9" fill="#475569">执行器能力边界</text>

      <rect x="30" y="544" width="740" height="24" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="560" textAnchor="middle" fontSize="10" fill="#475569">OMPP：智能体 = 样机设计 + 工具构建；理性 = 用四要素计算期望效用最高的动作</text>
    </svg>
  );
}
