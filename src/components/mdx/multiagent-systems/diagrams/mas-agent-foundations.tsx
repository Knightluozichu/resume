"use client";

export function MasAgentFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="智能体基础概念：环境-感知-决策-执行循环">
      <defs>
        <linearGradient id="mas-af-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-af-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-af-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-af-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mas-af-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">智能体基础概念</text>

      {/* 智能体基本循环：环境 ↔ 感知 ↔ 决策 ↔ 执行 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">智能体基本循环</text>

      <rect x="60" y="80" width="200" height="60" rx="10" fill="url(#mas-af-blue)" opacity="0.9" />
      <text x="160" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">环境 Environment</text>
      <text x="160" y="126" textAnchor="middle" fontSize="10" fill="#bfdbfe">世界状态 / 可观察量</text>

      <path d="M160 140 L160 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />
      <text x="172" y="152" fontSize="9" fill="#64748b">感知</text>

      <rect x="60" y="160" width="200" height="60" rx="10" fill="url(#mas-af-purple)" opacity="0.9" />
      <text x="160" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">感知 Percepts</text>
      <text x="160" y="206" textAnchor="middle" fontSize="10" fill="#ede9fe">传感器输入序列</text>

      <path d="M160 220 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="60" y="240" width="200" height="60" rx="10" fill="url(#mas-af-amber)" opacity="0.9" />
      <text x="160" y="266" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">智能体函数</text>
      <text x="160" y="286" textAnchor="middle" fontSize="10" fill="#fef3c7">percept → action 映射</text>

      <path d="M160 300 L160 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />
      <text x="172" y="312" fontSize="9" fill="#64748b">动作</text>

      <rect x="60" y="320" width="200" height="60" rx="10" fill="url(#mas-af-green)" opacity="0.9" />
      <text x="160" y="346" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">执行器 Actuators</text>
      <text x="160" y="366" textAnchor="middle" fontSize="10" fill="#d1fae5">作用于环境</text>

      <path d="M60 350 L40 350 L40 110 L60 110" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#mas-af-arrow)" />

      {/* 右侧：智能体类型谱系 */}
      <text x="560" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">智能体类型谱系</text>

      <rect x="320" y="80" width="460" height="46" rx="8" fill="url(#mas-af-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="340" y="100" fontSize="11" fontWeight="700" fill="#1e40af">简单反射型</text>
      <text x="340" y="118" fontSize="10" fill="#475569">仅依赖当前感知，条件-动作规则</text>

      <path d="M550 126 L550 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="320" y="132" width="460" height="46" rx="8" fill="url(#mas-af-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="340" y="152" fontSize="11" fontWeight="700" fill="#1e40af">基于模型的反射型</text>
      <text x="340" y="170" fontSize="10" fill="#475569">维护内部状态，跟踪不可见世界</text>

      <path d="M550 178 L550 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="320" y="184" width="460" height="46" rx="8" fill="url(#mas-af-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="340" y="204" fontSize="11" fontWeight="700" fill="#5b21b6">基于目标型</text>
      <text x="340" y="222" fontSize="10" fill="#475569">显式目标驱动，目标导向搜索</text>

      <path d="M550 230 L550 234" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="320" y="236" width="460" height="46" rx="8" fill="url(#mas-af-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="340" y="256" fontSize="11" fontWeight="700" fill="#92400e">基于效用型</text>
      <text x="340" y="274" fontSize="10" fill="#475569">效用函数量化偏好，最大化收益</text>

      <path d="M550 282 L550 286" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-af-arrow)" />

      <rect x="320" y="288" width="460" height="46" rx="8" fill="url(#mas-af-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="340" y="308" fontSize="11" fontWeight="700" fill="#065f46">学习型智能体</text>
      <text x="340" y="326" fontSize="10" fill="#475569">性能元件 + 学习元件 + 评价 + 生成器</text>

      {/* 多智能体特性 */}
      <text x="400" y="408" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">多智能体系统的关键特性</text>

      <rect x="40" y="422" width="180" height="60" rx="8" fill="url(#mas-af-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="130" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">自主性</text>
      <text x="130" y="466" textAnchor="middle" fontSize="9" fill="#475569">无需人干预自主行动</text>

      <rect x="232" y="422" width="180" height="60" rx="8" fill="url(#mas-af-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="322" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">反应性</text>
      <text x="322" y="466" textAnchor="middle" fontSize="9" fill="#475569">及时感知并响应环境</text>

      <rect x="424" y="422" width="180" height="60" rx="8" fill="url(#mas-af-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="514" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">主动性</text>
      <text x="514" y="466" textAnchor="middle" fontSize="9" fill="#475569">目标驱动主动行为</text>

      <rect x="616" y="422" width="144" height="60" rx="8" fill="url(#mas-af-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="688" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">社交性</text>
      <text x="688" y="466" textAnchor="middle" fontSize="9" fill="#475569">与他者交互协作</text>

      {/* 底部核心脉络 */}
      <rect x="30" y="508" width="740" height="28" rx="8" fill="url(#mas-af-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心：智能体 = 通过传感器感知环境、通过执行器作用于环境的实体；自主 · 反应 · 主动 · 社交</text>

      <rect x="30" y="544" width="740" height="24" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="560" textAnchor="middle" fontSize="10" fill="#475569">Wooldridge 定义：智能体是置身于环境中、能自主行动以达成目标的计算机系统</text>
    </svg>
  );
}
