"use client";

export function DlrRlBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="强化学习基础：智能体与环境交互闭环">
      <defs>
        <linearGradient id="dlr-rb-agent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-rb-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlr-rb-action" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-rb-obs" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlr-rb-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
        <marker id="dlr-rb-arrow-l" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">强化学习：智能体—环境交互闭环</text>

      {/* 智能体 */}
      <rect x="80" y="120" width="220" height="120" rx="14" fill="url(#dlr-rb-agent)" opacity="0.95" />
      <text x="190" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">智能体 Agent</text>
      <text x="190" y="186" textAnchor="middle" fontSize="12" fill="#bfdbfe">策略 pi(a|s)</text>
      <text x="190" y="206" textAnchor="middle" fontSize="12" fill="#bfdbfe">值函数 V/Q</text>
      <text x="190" y="226" textAnchor="middle" fontSize="12" fill="#bfdbfe">模型（可选）</text>

      {/* 环境 */}
      <rect x="500" y="120" width="220" height="120" rx="14" fill="url(#dlr-rb-env)" opacity="0.95" />
      <text x="610" y="160" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">环境 Environment</text>
      <text x="610" y="186" textAnchor="middle" fontSize="12" fill="#fef3c7">状态转移 P(s'|s,a)</text>
      <text x="610" y="206" textAnchor="middle" fontSize="12" fill="#fef3c7">奖励函数 R(s,a)</text>
      <text x="610" y="226" textAnchor="middle" fontSize="12" fill="#fef3c7">外部世界</text>

      {/* 动作箭头：智能体 → 环境 */}
      <path d="M300 170 L500 170" stroke="url(#dlr-rb-action)" strokeWidth="3" markerEnd="url(#dlr-rb-arrow-r)" />
      <rect x="340" y="148" width="120" height="22" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="400" y="163" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">动作 action a_t</text>

      {/* 观测+奖励箭头：环境 → 智能体 */}
      <path d="M500 210 L300 210" stroke="url(#dlr-rb-obs)" strokeWidth="3" markerEnd="url(#dlr-rb-arrow-l)" />
      <rect x="330" y="218" width="140" height="22" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="400" y="233" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">状态 s_&#123;t+1&#125; + 奖励 r_&#123;t+1&#125;</text>

      {/* 底部：RL三大要素 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">强化学习三大要素</text>

      <rect x="60" y="310" width="200" height="90" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">探索与利用</text>
      <text x="160" y="358" textAnchor="middle" fontSize="11" fill="#475569">尝试新动作 vs</text>
      <text x="160" y="374" textAnchor="middle" fontSize="11" fill="#475569">利用已知最优</text>

      <rect x="300" y="310" width="200" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">延迟奖励</text>
      <text x="400" y="358" textAnchor="middle" fontSize="11" fill="#475569">当前动作的回报</text>
      <text x="400" y="374" textAnchor="middle" fontSize="11" fill="#475569">可能在未来才出现</text>

      <rect x="540" y="310" width="200" height="90" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="640" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">序贯决策</text>
      <text x="640" y="358" textAnchor="middle" fontSize="11" fill="#475569">当前决策影响</text>
      <text x="640" y="374" textAnchor="middle" fontSize="11" fill="#475569">后续所有状态</text>

      <text x="400" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">目标：学习一个策略 pi，使累计期望回报最大化</text>
    </svg>
  );
}
