"use client";

export function RlcRlFoundationsDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="强化学习基础：智能体与环境交互循环">
      <defs>
        <linearGradient id="rlc-rl-agent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-rl-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rlc-rl-value" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rlc-rl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="rlc-rl-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">强化学习：智能体-环境交互循环</text>

      {/* 智能体 */}
      <rect x="100" y="100" width="200" height="120" rx="14" fill="url(#rlc-rl-agent)" opacity="0.95" />
      <text x="200" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">智能体 Agent</text>
      <text x="200" y="164" textAnchor="middle" fontSize="12" fill="#bfdbfe">策略 π(a|s)</text>
      <text x="200" y="184" textAnchor="middle" fontSize="12" fill="#bfdbfe">值函数 V(s) / Q(s,a)</text>
      <text x="200" y="204" textAnchor="middle" fontSize="12" fill="#bfdbfe">模型 P(s'|s,a)</text>

      {/* 环境 */}
      <rect x="500" y="100" width="200" height="120" rx="14" fill="url(#rlc-rl-env)" opacity="0.95" />
      <text x="600" y="140" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">环境 Environment</text>
      <text x="600" y="164" textAnchor="middle" fontSize="12" fill="#fef3c7">状态转移 p(s'|s,a)</text>
      <text x="600" y="184" textAnchor="middle" fontSize="12" fill="#fef3c7">奖励函数 r(s,a)</text>
      <text x="600" y="204" textAnchor="middle" fontSize="12" fill="#fef3c7">终止条件</text>

      {/* 交互箭头 */}
      <path d="M300 150 L495 150" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#rlc-rl-arrow)" />
      <text x="397" y="140" textAnchor="middle" fontSize="13" fontWeight="600" fill="#475569">动作 a_t</text>

      <path d="M500 180 L305 180" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#rlc-rl-arrow-r)" />
      <text x="397" y="198" textAnchor="middle" fontSize="13" fontWeight="600" fill="#dc2626">状态 s_&#123;t+1&#125; + 奖励 r_&#123;t+1&#125;</text>

      {/* MDP 五元组 */}
      <text x="400" y="266" textAnchor="middle" fontSize="15" fontWeight="700" fill="#334155">马尔可夫决策过程 MDP 五元组 (S, A, P, R, γ)</text>

      <rect x="80" y="286" width="140" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">S 状态集</text>
      <text x="150" y="324" textAnchor="middle" fontSize="10" fill="#475569">环境的所有可能状态</text>

      <rect x="240" y="286" width="140" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">A 动作集</text>
      <text x="310" y="324" textAnchor="middle" fontSize="10" fill="#475569">智能体可执行动作</text>

      <rect x="400" y="286" width="140" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="470" y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">P 转移概率</text>
      <text x="470" y="324" textAnchor="middle" fontSize="10" fill="#475569">P(s'|s,a) 状态转移</text>

      <rect x="560" y="286" width="100" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="610" y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">R 奖励</text>
      <text x="610" y="324" textAnchor="middle" fontSize="10" fill="#475569">r(s,a) 反馈信号</text>

      <rect x="680" y="286" width="40" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="700" y="316" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">γ</text>
      <text x="700" y="330" textAnchor="middle" fontSize="9" fill="#475569">折扣</text>

      {/* 值函数与策略 */}
      <text x="400" y="376" textAnchor="middle" fontSize="15" fontWeight="700" fill="#334155">核心方程</text>

      <rect x="60" y="392" width="340" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="230" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">贝尔曼方程（状态值）</text>
      <text x="230" y="434" textAnchor="middle" fontSize="11" fill="#475569">V(s) = Σ_a π(a|s) Σ_s' P(s'|s,a)[R + γV(s')]</text>

      <rect x="420" y="392" width="340" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">贝尔曼方程（动作值）</text>
      <text x="590" y="434" textAnchor="middle" fontSize="11" fill="#475569">Q(s,a) = Σ_s' P(s'|s,a)[R + γ max_a' Q(s',a')]</text>

      {/* 三大方法分类 */}
      <text x="400" y="486" textAnchor="middle" fontSize="15" fontWeight="700" fill="#334155">RL 三大方法族</text>

      <rect x="60" y="502" width="220" height="50" rx="8" fill="url(#rlc-rl-agent)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">基于价值</text>
      <text x="170" y="540" textAnchor="middle" fontSize="10" fill="#475569">Q-Learning / SARSA / DQN</text>

      <rect x="290" y="502" width="220" height="50" rx="8" fill="url(#rlc-rl-value)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">基于策略</text>
      <text x="400" y="540" textAnchor="middle" fontSize="10" fill="#475569">REINFORCE / Actor-Critic</text>

      <rect x="520" y="502" width="220" height="50" rx="8" fill="url(#rlc-rl-env)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="630" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">基于模型</text>
      <text x="630" y="540" textAnchor="middle" fontSize="10" fill="#475569">Dyna-Q / MCTS / 世界模型</text>

      {/* 底部说明 */}
      <rect x="40" y="568" width="720" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="583" textAnchor="middle" fontSize="11" fill="#475569">目标：最大化期望累积折扣回报 G_t = Σ γ^k r_&#123;t+k+1&#125;</text>
    </svg>
  );
}
