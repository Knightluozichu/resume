"use client";

export function RlcDqnCDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="深度Q网络C实现：神经网络近似Q值与经验回放">
      <defs>
        <linearGradient id="rlc-dqn-nn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-dqn-replay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rlc-dqn-target" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rlc-dqn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">{`深度Q网络C实现：神经网络 + 经验回放 + 目标网络`}</text>

      {/* DQN架构 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">{`DQN 架构`}</text>

      {/* 状态输入 */}
      <rect x="40" y="84" width="120" height="50" rx="8" fill="url(#rlc-dqn-nn)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">{`状态 s`}</text>
      <text x="100" y="124" textAnchor="middle" fontSize="10" fill="#475569">{`double[STATE_DIM]`}</text>

      <path d="M160 109 L196 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      {/* Q网络 */}
      <rect x="200" y="84" width="120" height="50" rx="8" fill="url(#rlc-dqn-nn)" opacity="0.95" />
      <text x="260" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{`Q网络`}</text>
      <text x="260" y="124" textAnchor="middle" fontSize="10" fill="#bfdbfe">{`NeuralNetwork (C)`}</text>

      <path d="M320 109 L356 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      {/* Q值输出 */}
      <rect x="360" y="84" width="120" height="50" rx="8" fill="url(#rlc-dqn-nn)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="420" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">{`Q(s,a)`}</text>
      <text x="420" y="124" textAnchor="middle" fontSize="10" fill="#475569">{`每个动作的Q值`}</text>

      <path d="M420 134 L420 152" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      {/* 选择动作 */}
      <rect x="360" y="156" width="120" height="40" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="420" y="181" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">{`argmax / ε-贪心`}</text>

      {/* 经验回放 */}
      <text x="600" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">{`经验回放缓冲区`}</text>
      <rect x="520" y="84" width="240" height="112" rx="8" fill="url(#rlc-dqn-replay)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="640" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">{`Replay Buffer`}</text>
      <text x="540" y="130" fontSize="10" fill="#475569" fontFamily="monospace">{`(s, a, r, s', done)`}</text>
      <text x="540" y="148" fontSize="10" fill="#475569" fontFamily="monospace">{`(s, a, r, s', done)`}</text>
      <text x="540" y="166" fontSize="10" fill="#475569" fontFamily="monospace">{`(s, a, r, s', done)`}</text>
      <text x="540" y="184" fontSize="10" fill="#64748b" fontFamily="monospace">{`... 随机采样 minibatch`}</text>

      {/* 训练循环 */}
      <text x="400" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">{`DQN 训练循环`}</text>

      <rect x="60" y="242" width="680" height="44" rx="8" fill="url(#rlc-dqn-nn)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="268" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">{`1. 从环境采样 (s,a,r,s') 存入回放缓冲区`}</text>

      <path d="M400 286 L400 292" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      <rect x="60" y="294" width="680" height="44" rx="8" fill="url(#rlc-dqn-replay)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="320" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">{`2. 从缓冲区随机采样 minibatch {(s,a,r,s')}`}</text>

      <path d="M400 338 L400 344" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      <rect x="60" y="346" width="680" height="44" rx="8" fill="url(#rlc-dqn-target)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="372" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">{`3. 目标网络计算 y = r + γ max_a' Q_target(s',a')`}</text>

      <path d="M400 390 L400 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      <rect x="60" y="398" width="680" height="44" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="424" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b91c1c">{`4. 最小化损失 L = (Q(s,a) - y)² → 反向传播更新Q网络`}</text>

      <path d="M400 442 L400 448" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-dqn-arrow)" />

      <rect x="60" y="450" width="680" height="44" rx="8" fill="url(#rlc-dqn-target)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="476" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">{`5. 每隔 C 步将 Q网络 权重复制到 目标网络`}</text>

      {/* 关键公式 */}
      <rect x="80" y="510" width="640" height="40" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="535" textAnchor="middle" fontSize="12" fill="#92400e" fontFamily="monospace">{`Loss = E[(Q(s,a;θ) - [r + γ max_a' Q(s',a';θ⁻)])²]`}</text>

      {/* 底部 */}
      <rect x="40" y="560" width="720" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="577" textAnchor="middle" fontSize="11" fill="#475569">{`θ = Q网络参数, θ⁻ = 目标网络参数（定期同步）`}</text>
    </svg>
  );
}
