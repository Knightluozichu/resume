"use client";

export function DlrMdpDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="马尔可夫决策过程五元组与状态转移图">
      <defs>
        <linearGradient id="dlr-mdp-state" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-mdp-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dlr-mdp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">马尔可夫决策过程（MDP）五元组与状态转移</text>

      {/* 五元组 */}
      <rect x="60" y="60" width="680" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">MDP = (S, A, P, R, gamma)</text>
      <text x="400" y="106" textAnchor="middle" fontSize="11" fill="#475569">S=状态集 | A=动作集 | P=转移概率 | R=奖励函数 | gamma=折扣因子</text>

      {/* 状态转移图 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">状态转移示例：网格世界</text>

      {/* 状态 s1 */}
      <circle cx="160" cy="230" r="50" fill="url(#dlr-mdp-state)" opacity="0.9" />
      <text x="160" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">状态 s</text>
      <text x="160" y="244" textAnchor="middle" fontSize="11" fill="#bfdbfe">起点</text>

      {/* 状态 s2 */}
      <circle cx="400" cy="230" r="50" fill="url(#dlr-mdp-trans)" opacity="0.9" />
      <text x="400" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">状态 s'</text>
      <text x="400" y="244" textAnchor="middle" fontSize="11" fill="#fef3c7">中间</text>

      {/* 状态 s3 */}
      <circle cx="640" cy="230" r="50" fill="#059669" opacity="0.9" />
      <text x="640" y="226" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">终止</text>
      <text x="640" y="244" textAnchor="middle" fontSize="11" fill="#cffafe">目标</text>

      {/* 转移箭头 */}
      <path d="M210 215 L350 215" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlr-mdp-arrow)" />
      <text x="280" y="205" textAnchor="middle" fontSize="11" fill="#475569">动作 a, P(s'|s,a)</text>
      <text x="280" y="237" textAnchor="middle" fontSize="11" fill="#475569">奖励 R(s,a,s')</text>

      <path d="M450 215 L590 215" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#dlr-mdp-arrow)" />
      <text x="520" y="205" textAnchor="middle" fontSize="11" fill="#475569">动作 a'</text>
      <text x="520" y="237" textAnchor="middle" fontSize="11" fill="#475569">奖励 R'</text>

      {/* 马尔可夫性质 */}
      <rect x="60" y="310" width="680" height="60" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">马尔可夫性质</text>
      <text x="400" y="356" textAnchor="middle" fontSize="11" fill="#475569">P(s_{t+1} | s_t, a_t, s_{t-1}, a_{t-1}, ...) = P(s_{t+1} | s_t, a_t)</text>

      {/* 回报与折扣 */}
      <rect x="60" y="390" width="680" height="50" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">折扣回报：G_t = r_{t+1} + gamma * r_{t+2} + gamma^2 * r_{t+3} + ...</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">gamma 在 (0,1) 越接近1越重视长远回报</text>
    </svg>
  );
}
