"use client";

export function RlcQLearningCDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="Q学习C语言实现：Q表与贝尔曼更新流程">
      <defs>
        <linearGradient id="rlc-ql-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-ql-update" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rlc-ql-code" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="rlc-ql-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Q学习C语言实现：Q表与贝尔曼更新</text>

      {/* Q表结构 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Q表数据结构</text>
      <rect x="60" y="84" width="280" height="180" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">double q_table[N_STATES][N_ACTIONS]</text>
      <line x1="80" y1="120" x2="320" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <text x="100" y="140" fontSize="11" fill="#475569" fontWeight="600">状态\动作</text>
      <text x="180" y="140" fontSize="11" fill="#475569" fontWeight="600">LEFT</text>
      <text x="240" y="140" fontSize="11" fill="#475569" fontWeight="600">RIGHT</text>
      <text x="300" y="140" fontSize="11" fill="#475569" fontWeight="600">UP</text>
      <text x="100" y="162" fontSize="11" fill="#475569">s0</text>
      <text x="180" y="162" fontSize="11" fill="#1e40af" fontFamily="monospace">0.12</text>
      <text x="240" y="162" fontSize="11" fill="#1e40af" fontFamily="monospace">0.85</text>
      <text x="300" y="162" fontSize="11" fill="#1e40af" fontFamily="monospace">0.03</text>
      <text x="100" y="184" fontSize="11" fill="#475569">s1</text>
      <text x="180" y="184" fontSize="11" fill="#1e40af" fontFamily="monospace">0.67</text>
      <text x="240" y="184" fontSize="11" fill="#1e40af" fontFamily="monospace">0.21</text>
      <text x="300" y="184" fontSize="11" fill="#1e40af" fontFamily="monospace">0.10</text>
      <text x="100" y="206" fontSize="11" fill="#475569">s2</text>
      <text x="180" y="206" fontSize="11" fill="#1e40af" fontFamily="monospace">0.05</text>
      <text x="240" y="206" fontSize="11" fill="#1e40af" fontFamily="monospace">0.92</text>
      <text x="300" y="206" fontSize="11" fill="#1e40af" fontFamily="monospace">0.01</text>
      <text x="100" y="228" fontSize="11" fill="#475569">...</text>
      <text x="180" y="228" fontSize="11" fill="#475569">...</text>
      <text x="240" y="228" fontSize="11" fill="#475569">...</text>
      <text x="300" y="228" fontSize="11" fill="#475569">...</text>
      <text x="200" y="252" textAnchor="middle" fontSize="10" fill="#64748b">Q[s][a] = 状态s下动作a的期望回报</text>

      {/* 更新流程 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Q学习更新流程</text>

      <rect x="420" y="84" width="280" height="44" rx="8" fill="url(#rlc-ql-update)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">1. 观察状态 s，选择动作 a (ε-贪心)</text>

      <path d="M560 128 L560 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-ql-arrow)" />

      <rect x="420" y="136" width="280" height="44" rx="8" fill="url(#rlc-ql-update)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">2. 执行动作，获得 r 和 s'</text>

      <path d="M560 180 L560 186" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-ql-arrow)" />

      <rect x="420" y="188" width="280" height="44" rx="8" fill="url(#rlc-ql-update)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">3. 计算TD目标: r + γ max_a' Q(s',a')</text>

      <path d="M560 232 L560 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-ql-arrow)" />

      <rect x="420" y="240" width="280" height="44" rx="8" fill="url(#rlc-ql-update)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">4. 更新 Q(s,a) ← Q(s,a) + α[TD目标-Q(s,a)]</text>

      {/* 贝尔曼更新公式 */}
      <text x="400" y="306" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Q学习更新公式</text>
      <rect x="80" y="320" width="640" height="50" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="351" textAnchor="middle" fontSize="13" fill="#92400e" fontFamily="monospace">Q(s,a) ← Q(s,a) + α [ r + γ · max_a' Q(s',a') - Q(s,a) ]</text>

      {/* C语言核心代码 */}
      <text x="400" y="404" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">C语言核心代码片段</text>
      <rect x="80" y="416" width="640" height="168" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="100" y="440" fontSize="11" fill="#059669" fontFamily="monospace">double alpha = 0.1, gamma = 0.95, epsilon = 0.1;</text>
      <text x="100" y="460" fontSize="11" fill="#475569" fontFamily="monospace">int a = epsilon_greedy(q_table, s, epsilon);</text>
      <text x="100" y="480" fontSize="11" fill="#475569" fontFamily="monospace">step(env, a, &amp;s_next, &amp;reward, &amp;done);</text>
      <text x="100" y="500" fontSize="11" fill="#475569" fontFamily="monospace">double max_q = max_action_value(q_table[s_next]);</text>
      <text x="100" y="520" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">double td_target = reward + gamma * max_q;</text>
      <text x="100" y="540" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">q_table[s][a] += alpha * (td_target - q_table[s][a]);</text>
      <text x="100" y="560" fontSize="11" fill="#475569" fontFamily="monospace">s = s_next;</text>

      {/* 底部说明 */}
      <rect x="80" y="590" width="640" height="0" rx="6" fill="none" />
    </svg>
  );
}
