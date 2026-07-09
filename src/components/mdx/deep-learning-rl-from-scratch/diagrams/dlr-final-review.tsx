"use client";

export function DlrFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="全书复习：强化学习知识闭环">
      <defs>
        <linearGradient id="dlr-fr-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-fr-predict" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlr-fr-control" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlr-fr-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-fr-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlr-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">强化学习全书知识闭环</text>

      {/* 四阶段演进 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四阶段演进：建模 → 预测 → 控制 → 深度</text>

      <rect x="40" y="84" width="170" height="70" rx="10" fill="url(#dlr-fr-basics)" opacity="0.92" />
      <text x="125" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段一：建模</text>
      <text x="125" y="130" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch1 RL基础</text>
      <text x="125" y="146" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch2 MDP</text>

      <path d="M210 119 L250 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-fr-arrow)" />

      <rect x="250" y="84" width="170" height="70" rx="10" fill="url(#dlr-fr-predict)" opacity="0.92" />
      <text x="335" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段二：预测</text>
      <text x="335" y="130" textAnchor="middle" fontSize="10" fill="#ede9fe">ch3 值函数</text>
      <text x="335" y="146" textAnchor="middle" fontSize="10" fill="#ede9fe">ch4 DP / ch5 MC/TD</text>

      <path d="M420 119 L460 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-fr-arrow)" />

      <rect x="460" y="84" width="170" height="70" rx="10" fill="url(#dlr-fr-control)" opacity="0.92" />
      <text x="545" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段三：控制</text>
      <text x="545" y="130" textAnchor="middle" fontSize="10" fill="#fef3c7">ch6 Q学习/SARSA</text>
      <text x="545" y="146" textAnchor="middle" fontSize="10" fill="#fef3c7">无模型最优策略</text>

      <path d="M630 119 L670 119" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlr-fr-arrow)" />

      <rect x="670" y="84" width="120" height="70" rx="10" fill="url(#dlr-fr-deep)" opacity="0.92" />
      <text x="730" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">阶段四：深度</text>
      <text x="730" y="130" textAnchor="middle" fontSize="10" fill="#fecaca">ch7 DQN</text>
      <text x="730" y="146" textAnchor="middle" fontSize="10" fill="#fecaca">ch8 策略梯度</text>

      {/* 核心脉络 */}
      <text x="400" y="195" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心脉络：值函数 → 贝尔曼方程 → 梯度下降</text>

      <rect x="60" y="210" width="680" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">统一框架：所有 RL 算法都在求解贝尔曼方程（或其变体），区别在于「如何近似」</text>
      <text x="180" y="262" textAnchor="middle" fontSize="11" fill="#475569">DP：已知模型，精确求解</text>
      <text x="400" y="262" textAnchor="middle" fontSize="11" fill="#475569">MC/TD：无模型，采样估计</text>
      <text x="620" y="262" textAnchor="middle" fontSize="11" fill="#475569">DQN：神经网络近似 Q</text>
      <text x="180" y="286" textAnchor="middle" fontSize="11" fill="#475569">SARSA：在策略控制</text>
      <text x="400" y="286" textAnchor="middle" fontSize="11" fill="#475569">Q学习：离策略控制</text>
      <text x="620" y="286" textAnchor="middle" fontSize="11" fill="#475569">策略梯度：直接优化 pi</text>
      <text x="400" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">底层统一：可微参数 + 梯度下降 + 贝尔曼递归</text>

      {/* 三个关键跃迁 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三个关键跃迁</text>

      <rect x="40" y="375" width="230" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">有模型 → 无模型</text>
      <text x="155" y="422" textAnchor="middle" fontSize="11" fill="#475569">DP 需要完整 MDP</text>
      <text x="155" y="440" textAnchor="middle" fontSize="11" fill="#475569">MC/TD 只需采样经验</text>

      <rect x="285" y="375" width="230" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">表格 → 函数近似</text>
      <text x="400" y="422" textAnchor="middle" fontSize="11" fill="#475569">小状态用表格存 Q</text>
      <text x="400" y="440" textAnchor="middle" fontSize="11" fill="#475569">大状态用神经网络</text>

      <rect x="530" y="375" width="230" height="80" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="645" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">值方法 → 策略方法</text>
      <text x="645" y="422" textAnchor="middle" fontSize="11" fill="#475569">间接：学 Q 再选动作</text>
      <text x="645" y="440" textAnchor="middle" fontSize="11" fill="#475569">直接：学策略输出动作</text>

      {/* 总结 */}
      <rect x="40" y="480" width="720" height="40" rx="8" fill="url(#dlr-fr-review)" opacity="0.92" />
      <text x="400" y="506" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">从 MDP 建模到深度强化学习——强化学习的核心是「在与环境交互中学习最优策略」</text>
    </svg>
  );
}
