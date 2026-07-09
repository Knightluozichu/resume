"use client";

export function DrlFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="深度强化学习全书复习与知识整合">
      <defs>
        <linearGradient id="drl-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-fr-value" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-fr-policy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-fr-advanced" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="drl-fr-unified" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：深度RL知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="140" height="56" rx="8" fill="url(#drl-fr-found)" opacity="0.9" />
      <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch1 RL基础</text>
      <text x="90" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">MDP / 贝尔曼</text>

      <path d="M160 102 L180 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-fr-arrow)" />

      <rect x="185" y="74" width="140" height="56" rx="8" fill="url(#drl-fr-value)" opacity="0.9" />
      <text x="255" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch2 DQN族</text>
      <text x="255" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">价值函数近似</text>

      <path d="M325 102 L345 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-fr-arrow)" />

      <rect x="350" y="74" width="140" height="56" rx="8" fill="url(#drl-fr-policy)" opacity="0.9" />
      <text x="420" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch3-4 策略</text>
      <text x="420" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">PG / Actor-Critic</text>

      <path d="M490 102 L510 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-fr-arrow)" />

      <rect x="515" y="74" width="130" height="56" rx="8" fill="url(#drl-fr-advanced)" opacity="0.9" />
      <text x="580" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch5 进阶</text>
      <text x="580" y="116" textAnchor="middle" fontSize="9" fill="#fecaca">PPO/SAC/TD3</text>

      <path d="M645 102 L665 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-fr-arrow)" />

      <rect x="670" y="74" width="110" height="56" rx="8" fill="url(#drl-fr-unified)" opacity="0.9" />
      <text x="725" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">ch6-9 实践</text>
      <text x="725" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">应用+整合</text>

      {/* 三大范式统一 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三大范式统一视角</text>

      <rect x="30" y="176" width="240" height="120" rx="8" fill="url(#drl-fr-value)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">基于价值 Value-based</text>
      <text x="150" y="220" textAnchor="middle" fontSize="10" fill="#475569">学Q(s,a)，间接得策略</text>
      <text x="150" y="238" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">a* = argmax Q(s,a)</text>
      <text x="150" y="258" textAnchor="middle" fontSize="10" fill="#475569">代表：DQN / Double / Dueling</text>
      <text x="150" y="276" textAnchor="middle" fontSize="9" fill="#64748b">离散动作 / off-policy / 高样本效率</text>
      <text x="150" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">核心：贝尔曼方程 + 函数近似</text>

      <rect x="280" y="176" width="240" height="120" rx="8" fill="url(#drl-fr-policy)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">基于策略 Policy-based</text>
      <text x="400" y="220" textAnchor="middle" fontSize="10" fill="#475569">直接学π_θ(a|s)</text>
      <text x="400" y="238" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">∇J = E[∇log π · G]</text>
      <text x="400" y="258" textAnchor="middle" fontSize="10" fill="#475569">代表：REINFORCE / PPO</text>
      <text x="400" y="276" textAnchor="middle" fontSize="9" fill="#64748b">连续动作 / on-policy / 随机策略</text>
      <text x="400" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">核心：策略梯度定理 + 梯度上升</text>

      <rect x="530" y="176" width="240" height="120" rx="8" fill="url(#drl-fr-unified)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="198" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">Actor-Critic 混合</text>
      <text x="650" y="220" textAnchor="middle" fontSize="10" fill="#475569">Actor学策略 + Critic学值</text>
      <text x="650" y="238" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">δ = r + γV(s') - V(s)</text>
      <text x="650" y="258" textAnchor="middle" fontSize="10" fill="#475569">代表：A3C / SAC / TD3</text>
      <text x="650" y="276" textAnchor="middle" fontSize="9" fill="#64748b">连续动作 / off-policy / 低方差</text>
      <text x="650" y="290" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">核心：TD误差连接双网络</text>

      {/* 核心公式回顾 */}
      <text x="400" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">全书核心公式</text>

      <rect x="30" y="338" width="350" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="358" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">贝尔曼方程（RL基石）</text>
      <text x="205" y="378" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">Q(s,a) = E[r + γ max Q(s',a')]</text>

      <rect x="420" y="338" width="350" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="358" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">策略梯度定理（PG基石）</text>
      <text x="595" y="378" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">∇J = E[∇log π_θ(a|s) · A(s,a)]</text>

      {/* 算法选型总结 */}
      <text x="400" y="422" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">算法选型速查</text>

      <rect x="30" y="436" width="180" height="56" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">离散动作</text>
      <text x="120" y="476" textAnchor="middle" fontSize="10" fill="#475569">DQN → PPO</text>

      <rect x="220" y="436" width="180" height="56" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">连续动作</text>
      <text x="310" y="476" textAnchor="middle" fontSize="10" fill="#475569">SAC / TD3 / PPO</text>

      <rect x="410" y="436" width="180" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">稀疏奖励</text>
      <text x="500" y="476" textAnchor="middle" fontSize="10" fill="#475569">ICM + PPO</text>

      <rect x="600" y="436" width="170" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="456" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">工业首选</text>
      <text x="685" y="476" textAnchor="middle" fontSize="10" fill="#475569">PPO（稳定易调）</text>

      {/* 底部总结 */}
      <rect x="30" y="510" width="740" height="52" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="400" y="532" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">学习成果闭环</text>
      <text x="400" y="552" textAnchor="middle" fontSize="11" fill="#475569">RL基础 → DQN → 策略梯度 → Actor-Critic → PPO/SAC/TD3 → 探索 → 奖励设计 → 应用 → 统一视角</text>
    </svg>
  );
}
