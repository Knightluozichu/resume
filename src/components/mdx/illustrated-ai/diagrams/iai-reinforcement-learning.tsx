"use client";

export function IaiReinforcementLearningDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="强化学习循环与算法分类图">
      <defs>
        <linearGradient id="iai-rl-agent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-rl-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-rl-value" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-rl-policy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-rl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="iai-rl-arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="iai-rl-arrow-orange" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#f59e0b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">强化学习：智能体与环境的交互循环</text>

      {/* Agent-Environment 循环 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">强化学习交互循环</text>

      {/* Agent */}
      <rect x="100" y="100" width="200" height="80" rx="12" fill="url(#iai-rl-agent)" opacity="0.9" />
      <text x="200" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">智能体 Agent</text>
      <text x="200" y="150" textAnchor="middle" fontSize="11" fill="#bfdbfe">策略 pi(a|s) / 价值 Q(s,a)</text>
      <text x="200" y="168" textAnchor="middle" fontSize="10" fill="#bfdbfe">观察状态 → 选择动作</text>

      {/* Environment */}
      <rect x="500" y="100" width="200" height="80" rx="12" fill="url(#iai-rl-env)" opacity="0.9" />
      <text x="600" y="130" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">环境 Environment</text>
      <text x="600" y="150" textAnchor="middle" fontSize="11" fill="#fef3c7">转移函数 P(s'|s,a)</text>
      <text x="600" y="168" textAnchor="middle" fontSize="10" fill="#fef3c7">执行动作 → 返回新状态和奖励</text>

      {/* Action 箭头：Agent → Env */}
      <path d="M300 125 L500 125" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#iai-rl-arrow-blue)" />
      <text x="400" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">动作 action a_t</text>

      {/* State+Reward 箭头：Env → Agent */}
      <path d="M500 155 L300 155" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#iai-rl-arrow-orange)" />
      <text x="400" y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">状态 s_&#123;t+1&#125; + 奖励 r_t</text>

      {/* MDP 要素 */}
      <rect x="40" y="210" width="370" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="234" fontSize="13" fontWeight="700" fill="#0f172a">马尔可夫决策过程（MDP）五元组</text>
      <text x="60" y="256" fontSize="11" fill="#475569">S：状态空间（State space）</text>
      <text x="60" y="274" fontSize="11" fill="#475569">A：动作空间（Action space）</text>
      <text x="60" y="292" fontSize="11" fill="#475569">P(s'|s,a)：状态转移概率</text>
      <text x="60" y="310" fontSize="11" fill="#475569">R(s,a)：奖励函数</text>
      <text x="60" y="324" fontSize="11" fill="#64748b">gamma：折扣因子（0~1），权衡即时与长期回报</text>

      {/* 两大方法族 */}
      <rect x="430" y="210" width="330" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="450" y="234" fontSize="13" fontWeight="700" fill="#0f172a">强化学习两大方法族</text>
      <text x="450" y="256" fontSize="11" fill="#1e40af">价值法：学习 Q(s,a)，贪心选动作</text>
      <text x="450" y="274" fontSize="10" fill="#64748b">  Q-learning / DQN / Double DQN</text>
      <text x="450" y="296" fontSize="11" fill="#065f46">策略法：直接学习 pi(a|s)</text>
      <text x="450" y="314" fontSize="10" fill="#64748b">  REINFORCE / PPO / Actor-Critic</text>

      {/* 关键概念 */}
      <rect x="40" y="348" width="370" height="90" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="372" fontSize="13" fontWeight="700" fill="#92400e">核心概念</text>
      <text x="60" y="394" fontSize="11" fill="#475569">探索 vs 利用：尝试新动作 vs 利用已知最优</text>
      <text x="60" y="412" fontSize="11" fill="#475569">贝尔曼方程：V(s) = max_a [R(s,a) + gamma * E[V(s')]]</text>
      <text x="60" y="430" fontSize="11" fill="#475569">时序差分（TD）：用一步实际回报 + 估计值更新</text>

      {/* 经典算法 */}
      <rect x="430" y="348" width="330" height="90" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="450" y="372" fontSize="13" fontWeight="700" fill="#065f46">里程碑算法</text>
      <text x="450" y="394" fontSize="11" fill="#475569">Q-learning (1989)：经典表格法 TD 控制</text>
      <text x="450" y="412" fontSize="11" fill="#475569">DQN (2013)：用深度网络逼近 Q 函数</text>
      <text x="450" y="430" fontSize="11" fill="#475569">AlphaGo (2016)：MCTS + 深度强化学习</text>

      {/* 底部 */}
      <rect x="40" y="458" width="720" height="80" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="482" fontSize="13" fontWeight="700" fill="#0f172a">强化学习 vs 监督学习</text>
      <text x="60" y="504" fontSize="11" fill="#475569">监督学习：有标准答案，静态数据集，一次学习</text>
      <text x="60" y="522" fontSize="11" fill="#475569">强化学习：无标准答案，只有奖励信号，序列决策，试错学习，延迟回报</text>
    </svg>
  );
}
