"use client";

export function RlcEnvironmentsDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="环境搭建与实验：GridWorld与CartPole环境接口">
      <defs>
        <linearGradient id="rlc-env-grid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-env-cart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rlc-env-iface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rlc-env-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">{`环境搭建与实验：标准RL环境接口`}</text>

      {/* 环境接口 */}
      <text x="400" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">{`C语言环境接口`}</text>
      <rect x="80" y="84" width="640" height="70" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="108" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">{`typedef struct { void* state; double reward; int done; } EnvStep;`}</text>
      <text x="400" y="128" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">{`void env_reset(Env* e);  EnvStep env_step(Env* e, int action);`}</text>
      <text x="400" y="146" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">{`int get_state_dim(Env* e);  int get_action_dim(Env* e);`}</text>

      {/* GridWorld */}
      <text x="200" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">{`GridWorld 环境`}</text>
      <rect x="60" y="196" width="280" height="200" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />

      {/* 网格 */}
      <rect x="80" y="210" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="130" y="210" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="180" y="210" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="230" y="210" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="280" y="210" width="40" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="300" y="240" textAnchor="middle" fontSize="16" fontWeight="700" fill="#92400e">{`G`}</text>

      <rect x="80" y="260" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="130" y="260" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="180" y="260" width="50" height="50" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="205" y="290" textAnchor="middle" fontSize="16" fontWeight="700" fill="#b91c1c">{`H`}</text>
      <rect x="230" y="260" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="280" y="260" width="40" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />

      <rect x="80" y="310" width="50" height="50" fill="#dcfce7" stroke="#059669" strokeWidth="1" />
      <text x="105" y="340" textAnchor="middle" fontSize="16" fontWeight="700" fill="#065f46">{`S`}</text>
      <rect x="130" y="310" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="180" y="310" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="230" y="310" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="280" y="310" width="40" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />

      <text x="200" y="382" textAnchor="middle" fontSize="11" fill="#475569">{`S=起点 G=目标(+1) H=陷阱(-1)`}</text>
      <text x="200" y="396" textAnchor="middle" fontSize="10" fill="#64748b">{`动作: 上/下/左/右 | 离散状态空间`}</text>

      {/* CartPole */}
      <text x="560" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">{`CartPole 环境`}</text>
      <rect x="420" y="196" width="280" height="200" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2" />

      {/* 小车和杆 */}
      <line x1="440" y1="320" x2="680" y2="320" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="520" y="305" width="80" height="15" fill="url(#rlc-env-cart)" opacity="0.85" />
      <circle cx="535" cy="325" r="6" fill="#475569" />
      <circle cx="585" cy="325" r="6" fill="#475569" />
      <line x1="560" y1="305" x2="530" y2="220" stroke="#7c3aed" strokeWidth="3" />
      <rect x="525" y="215" width="10" height="10" fill="#7c3aed" opacity="0.85" />
      <text x="440" y="250" fontSize="11" fill="#5b21b6" fontFamily="monospace">{`θ (角度)`}</text>
      <path d="M460 270 A20 20 0 0 1 480 255" fill="none" stroke="#5b21b6" strokeWidth="1.5" />
      <text x="440" y="280" fontSize="11" fill="#5b21b6" fontFamily="monospace">{`x (位置)`}</text>

      <text x="560" y="352" textAnchor="middle" fontSize="11" fill="#475569">{`状态: [x, ẋ, θ, θ̇] (连续4维)`}</text>
      <text x="560" y="370" textAnchor="middle" fontSize="10" fill="#475569">{`动作: 左推/右推 (离散2)`}</text>
      <text x="560" y="388" textAnchor="middle" fontSize="10" fill="#64748b">{`奖励: 每步+1，杆倒下终止`}</text>

      {/* 实验对比 */}
      <text x="400" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">{`实验设计要点`}</text>

      <rect x="60" y="442" width="220" height="60" rx="8" fill="url(#rlc-env-grid)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="464" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">{`离散 vs 连续`}</text>
      <text x="170" y="482" textAnchor="middle" fontSize="10" fill="#475569">{`GridWorld(离散)适合Q-Learning`}</text>
      <text x="170" y="496" textAnchor="middle" fontSize="10" fill="#475569">{`CartPole(连续)需要DQN`}</text>

      <rect x="290" y="442" width="220" height="60" rx="8" fill="url(#rlc-env-cart)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="464" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">{`奖励设计`}</text>
      <text x="400" y="482" textAnchor="middle" fontSize="10" fill="#475569">{`稀疏奖励 vs 密集奖励`}</text>
      <text x="400" y="496" textAnchor="middle" fontSize="10" fill="#475569">{`奖励塑形影响学习速度`}</text>

      <rect x="520" y="442" width="220" height="60" rx="8" fill="url(#rlc-env-iface)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="630" y="464" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">{`评估指标`}</text>
      <text x="630" y="482" textAnchor="middle" fontSize="10" fill="#475569">{`平均回报 / 收敛速度`}</text>
      <text x="630" y="496" textAnchor="middle" fontSize="10" fill="#475569">{`稳定性 / 泛化能力`}</text>

      {/* 底部 */}
      <rect x="40" y="520" width="720" height="60" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="544" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">{`// 统一训练循环`}</text>
      <text x="60" y="562" fontSize="11" fill="#475569" fontFamily="monospace">{`for (ep = 0; ep &lt; MAX_EPISODES; ep++) { env_reset(&amp;env); while (!done) { a = agent_act(s); step = env_step(&amp;env, a); agent_learn(s,a,step.reward,step.state,step.done); s = step.state; } }`}</text>
    </svg>
  );
}
