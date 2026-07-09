"use client";

export function DrlRlFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="强化学习基础与MDP：智能体环境交互循环">
      <defs>
        <linearGradient id="drl-rf-agent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-rf-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-rf-mdp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-rf-val" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-rf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">强化学习基础与MDP</text>

      {/* 智能体-环境交互循环 */}
      <text x="400" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">智能体-环境交互循环</text>

      <rect x="100" y="80" width="180" height="64" rx="12" fill="url(#drl-rf-agent)" opacity="0.95" />
      <text x="190" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">智能体 Agent</text>
      <text x="190" y="128" textAnchor="middle" fontSize="11" fill="#bfdbfe">策略 π(a|s) / Q(s,a)</text>

      <rect x="520" y="80" width="180" height="64" rx="12" fill="url(#drl-rf-env)" opacity="0.95" />
      <text x="610" y="108" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">环境 Environment</text>
      <text x="610" y="128" textAnchor="middle" fontSize="11" fill="#ede9fe">转移 P(s'|s,a) / 奖励 R</text>

      {/* 交互箭头 */}
      <path d="M280 100 L515 100" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#drl-rf-arrow)" />
      <text x="397" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">动作 a</text>

      <path d="M515 128 L285 128" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#drl-rf-arrow)" />
      <text x="400" y="148" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">状态 s, 奖励 r</text>

      {/* MDP五元组 */}
      <text x="400" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">MDP五元组 (S, A, P, R, γ)</text>

      <rect x="40" y="198" width="140" height="56" rx="8" fill="url(#drl-rf-mdp)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="110" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">S 状态集</text>
      <text x="110" y="240" textAnchor="middle" fontSize="10" fill="#475569">离散/连续</text>

      <rect x="190" y="198" width="140" height="56" rx="8" fill="url(#drl-rf-mdp)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="260" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">A 动作集</text>
      <text x="260" y="240" textAnchor="middle" fontSize="10" fill="#475569">离散/连续</text>

      <rect x="340" y="198" width="140" height="56" rx="8" fill="url(#drl-rf-mdp)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">P 转移概率</text>
      <text x="410" y="240" textAnchor="middle" fontSize="10" fill="#475569">P(s'|s,a)</text>

      <rect x="490" y="198" width="140" height="56" rx="8" fill="url(#drl-rf-mdp)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">R 奖励函数</text>
      <text x="560" y="240" textAnchor="middle" fontSize="10" fill="#475569">R(s,a)</text>

      <rect x="640" y="198" width="120" height="56" rx="8" fill="url(#drl-rf-mdp)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="700" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">γ 折扣因子</text>
      <text x="700" y="240" textAnchor="middle" fontSize="10" fill="#475569">0~1</text>

      {/* 值函数 */}
      <text x="400" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">值函数与贝尔曼方程</text>

      <rect x="40" y="294" width="350" height="72" rx="8" fill="url(#drl-rf-val)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="215" y="316" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">状态值函数 V(s)</text>
      <text x="215" y="336" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">V(s) = E[r + γV(s')]</text>
      <text x="215" y="354" textAnchor="middle" fontSize="10" fill="#475569">从状态s出发的期望累积回报</text>

      <rect x="410" y="294" width="350" height="72" rx="8" fill="url(#drl-rf-val)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="316" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">动作值函数 Q(s,a)</text>
      <text x="585" y="336" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">Q(s,a) = E[r + γ max Q(s',a')]</text>
      <text x="585" y="354" textAnchor="middle" fontSize="10" fill="#475569">在状态s执行动作a的期望回报</text>

      {/* 学习目标 */}
      <text x="400" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">RL学习的三个层次</text>

      <rect x="40" y="404" width="240" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">预测问题 Prediction</text>
      <text x="160" y="446" textAnchor="middle" fontSize="10" fill="#475569">给定策略π，估计值函数</text>

      <rect x="290" y="404" width="240" height="60" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">控制问题 Control</text>
      <text x="410" y="446" textAnchor="middle" fontSize="10" fill="#475569">寻找最优策略π*</text>

      <rect x="540" y="404" width="220" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="650" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">探索与利用 Explore</text>
      <text x="650" y="446" textAnchor="middle" fontSize="10" fill="#475569">平衡已知与未知</text>

      {/* 底部总结 */}
      <rect x="40" y="484" width="720" height="72" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="400" y="508" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">核心洞察</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#475569">MDP是RL的数学基础，贝尔曼方程连接当前与未来</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#475569">所有深度RL算法都在求解贝尔曼方程的近似解</text>
    </svg>
  );
}
