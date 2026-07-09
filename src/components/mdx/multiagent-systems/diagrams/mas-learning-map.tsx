"use client";

export function MasLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="多智能体系统知识全景图与十章学习路径">
      <defs>
        <linearGradient id="mas-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mas-lm-inter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mas-lm-comm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mas-lm-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mas-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="mas-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">多智能体系统 · 知识全景图</text>

      {/* 左侧：五大学习阶段 */}
      <text x="160" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">学习主线</text>

      <rect x="40" y="78" width="240" height="46" rx="10" fill="url(#mas-lm-found)" opacity="0.95" />
      <text x="160" y="99" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础理论</text>
      <text x="160" y="116" textAnchor="middle" fontSize="11" fill="#bfdbfe">智能体概念 / 理性决策</text>

      <path d="M160 124 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="40" y="132" width="240" height="46" rx="10" fill="url(#mas-lm-inter)" opacity="0.95" />
      <text x="160" y="153" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">交互与博弈</text>
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill="#ede9fe">多智能体交互 / 博弈论</text>

      <path d="M160 178 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="40" y="186" width="240" height="46" rx="10" fill="url(#mas-lm-comm)" opacity="0.95" />
      <text x="160" y="207" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">通信与协调</text>
      <text x="160" y="224" textAnchor="middle" fontSize="11" fill="#fef3c7">通信协商 / 协调合作</text>

      <path d="M160 232 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="40" y="240" width="240" height="46" rx="10" fill="url(#mas-lm-sys)" opacity="0.95" />
      <text x="160" y="261" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">系统架构</text>
      <text x="160" y="278" textAnchor="middle" fontSize="11" fill="#d1fae5">分布式问题求解</text>

      <path d="M160 286 L160 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="40" y="294" width="240" height="46" rx="10" fill="url(#mas-lm-app)" opacity="0.95" />
      <text x="160" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用与整合</text>
      <text x="160" y="332" textAnchor="middle" fontSize="11" fill="#fecaca">应用展望 / 全书复习</text>

      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">从智能体基础到多智能体系统的全链路</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="78" width="460" height="34" rx="8" fill="url(#mas-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="100" fontSize="12" fontWeight="600" fill="#1e40af">ch0</text>
      <text x="372" y="100" fontSize="11" fill="#475569">知识全景图——学习路径总览</text>

      <path d="M550 112 L550 116" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="118" width="460" height="34" rx="8" fill="url(#mas-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="140" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="140" fontSize="11" fill="#475569">智能体基础概念——定义与结构</text>

      <path d="M550 152 L550 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="158" width="460" height="34" rx="8" fill="url(#mas-lm-found)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="180" fontSize="12" fontWeight="600" fill="#1e40af">ch2</text>
      <text x="372" y="180" fontSize="11" fill="#475569">理性智能体与决策——效用与搜索</text>

      <path d="M550 192 L550 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="198" width="460" height="34" rx="8" fill="url(#mas-lm-inter)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="220" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="220" fontSize="11" fill="#475569">多智能体交互——依赖与均衡</text>

      <path d="M550 232 L550 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="238" width="460" height="34" rx="8" fill="url(#mas-lm-inter)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="260" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="260" fontSize="11" fill="#475569">博弈论与策略——纳什均衡</text>

      <path d="M550 272 L550 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="278" width="460" height="34" rx="8" fill="url(#mas-lm-comm)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="300" fontSize="12" fontWeight="600" fill="#92400e">ch5</text>
      <text x="372" y="300" fontSize="11" fill="#475569">通信与协商——言语行为与协议</text>

      <path d="M550 312 L550 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="318" width="460" height="34" rx="8" fill="url(#mas-lm-comm)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="340" fontSize="12" fontWeight="600" fill="#92400e">ch6</text>
      <text x="372" y="340" fontSize="11" fill="#475569">协调与合作机制——组织与规划</text>

      <path d="M550 352 L550 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="358" width="460" height="34" rx="8" fill="url(#mas-lm-sys)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="380" fontSize="12" fontWeight="600" fill="#065f46">ch7</text>
      <text x="372" y="380" fontSize="11" fill="#475569">分布式问题求解——任务分配</text>

      <path d="M550 392 L550 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="398" width="460" height="34" rx="8" fill="url(#mas-lm-app)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="420" fontSize="12" fontWeight="600" fill="#991b1b">ch8</text>
      <text x="372" y="420" fontSize="11" fill="#475569">应用与未来展望——现实系统</text>

      <path d="M550 432 L550 436" stroke="#64748b" strokeWidth="2" markerEnd="url(#mas-lm-arrow)" />

      <rect x="320" y="438" width="460" height="34" rx="8" fill="url(#mas-lm-app)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="338" y="460" fontSize="12" fontWeight="600" fill="#991b1b">ch9</text>
      <text x="372" y="460" fontSize="11" fill="#475569">全书复习与知识整合——闭环</text>

      {/* 底部学习路径 */}
      <rect x="40" y="500" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="520" textAnchor="middle" fontSize="11" fill="#475569">智能体概念 → 理性决策 → 交互博弈 → 通信协商 → 协调合作 → 分布式求解 → 应用展望 → 知识整合</text>

      {/* 底部核心脉络 */}
      <rect x="40" y="542" width="740" height="28" rx="8" fill="url(#mas-lm-inter)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心脉络：理解智能体 → 理性决策 → 交互博弈 → 通信协商 → 协调合作 → 分布式求解 → 系统应用</text>
    </svg>
  );
}
