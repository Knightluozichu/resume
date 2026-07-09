"use client";

export function RlcFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="全书复习与知识整合：RL与DL统一视角">
      <defs>
        <linearGradient id="rlc-fr-rl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-fr-dl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rlc-fr-bridge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rlc-fr-result" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="rlc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：RL + DL 统一知识整合</text>

      {/* 左侧：RL知识体系 */}
      <text x="160" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">强化学习主线</text>

      <rect x="40" y="84" width="240" height="44" rx="8" fill="url(#rlc-fr-rl)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">MDP / 值函数 / 策略</text>

      <path d="M160 128 L160 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="40" y="136" width="240" height="44" rx="8" fill="url(#rlc-fr-rl)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Q-Learning (Q表)</text>

      <path d="M160 180 L160 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="40" y="188" width="240" height="44" rx="8" fill="url(#rlc-fr-rl)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">DQN (NN近似Q)</text>

      <path d="M160 232 L160 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="40" y="240" width="240" height="44" rx="8" fill="url(#rlc-fr-rl)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Policy Gradient (NN策略)</text>

      {/* 中间：DL桥接 */}
      <text x="400" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">深度学习桥接</text>

      <rect x="280" y="84" width="240" height="44" rx="8" fill="url(#rlc-fr-dl)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">前馈神经网络 (C)</text>

      <path d="M400 128 L400 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="280" y="136" width="240" height="44" rx="8" fill="url(#rlc-fr-dl)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">反向传播 (链式法则)</text>

      <path d="M400 180 L400 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="280" y="188" width="240" height="44" rx="8" fill="url(#rlc-fr-bridge)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">NN作为函数近似器</text>

      <path d="M400 232 L400 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="280" y="240" width="240" height="44" rx="8" fill="url(#rlc-fr-bridge)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">梯度下降优化RL目标</text>

      {/* 右侧：统一视角 */}
      <text x="640" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">统一视角</text>

      <rect x="520" y="84" width="240" height="44" rx="8" fill="url(#rlc-fr-result)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">DQN = Q-Learning + NN</text>

      <path d="M640 128 L640 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="520" y="136" width="240" height="44" rx="8" fill="url(#rlc-fr-result)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">PG = 策略 + 梯度上升</text>

      <path d="M640 180 L640 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="520" y="188" width="240" height="44" rx="8" fill="url(#rlc-fr-result)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">Actor-Critic = 两者融合</text>

      <path d="M640 232 L640 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-fr-arrow)" />

      <rect x="520" y="240" width="240" height="44" rx="8" fill="url(#rlc-fr-result)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">Deep RL = RL + DL</text>

      {/* 横向连接箭头 */}
      <path d="M280 156 L395 156" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
      <path d="M280 210 L395 210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
      <path d="M520 156 L400 156" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
      <path d="M520 210 L400 210" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />

      {/* 核心概念回顾 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心概念回顾</text>

      <rect x="40" y="322" width="150" height="70" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">贝尔曼方程</text>
      <text x="115" y="363" textAnchor="middle" fontSize="9" fill="#475569">V/Q的递归定义</text>
      <text x="115" y="378" textAnchor="middle" fontSize="9" fill="#475569">RL的理论基石</text>

      <rect x="200" y="322" width="150" height="70" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="275" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">反向传播</text>
      <text x="275" y="363" textAnchor="middle" fontSize="9" fill="#475569">链式法则算梯度</text>
      <text x="275" y="378" textAnchor="middle" fontSize="9" fill="#475569">DL的训练引擎</text>

      <rect x="360" y="322" width="150" height="70" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="435" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">函数近似</text>
      <text x="435" y="363" textAnchor="middle" fontSize="9" fill="#475569">NN逼近Q/π</text>
      <text x="435" y="378" textAnchor="middle" fontSize="9" fill="#475569">RL+DL的桥梁</text>

      <rect x="520" y="322" width="150" height="70" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="595" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">探索与利用</text>
      <text x="595" y="363" textAnchor="middle" fontSize="9" fill="#475569">ε-贪心/softmax</text>
      <text x="595" y="378" textAnchor="middle" fontSize="9" fill="#475569">RL的核心权衡</text>

      <rect x="680" y="322" width="100" height="70" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="730" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">梯度下降</text>
      <text x="730" y="363" textAnchor="middle" fontSize="9" fill="#475569">优化参数</text>
      <text x="730" y="378" textAnchor="middle" fontSize="9" fill="#475569">DL的核心算法</text>

      {/* C语言实现回顾 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">C语言实现回顾</text>

      <rect x="40" y="438" width="740" height="56" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="460" fontSize="11" fill="#475569" fontFamily="monospace">struct → 网络结构 / Q表 | double[][] → 权重矩阵 | for循环 → 前向/反向传播</text>
      <text x="60" y="478" fontSize="11" fill="#475569" fontFamily="monospace">环形缓冲区 → 经验回放 | struct+函数指针 → 环境接口 | 指针 → 共享梯度</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="740" height="70" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="400" y="536" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">学习成果闭环</text>
      <text x="400" y="556" textAnchor="middle" fontSize="11" fill="#475569">从C语言基础 → Q表 → 神经网络 → DQN → 策略梯度 → 环境实验 → 方法选型</text>
      <text x="400" y="572" textAnchor="middle" fontSize="11" fill="#475569">理解"用C语言从零实现RL与DL"的完整路径，建立可迁移的底层直觉</text>
    </svg>
  );
}
