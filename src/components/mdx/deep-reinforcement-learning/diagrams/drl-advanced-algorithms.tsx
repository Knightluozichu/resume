"use client";

export function DrlAdvancedAlgorithmsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="高级算法PPO SAC TD3对比图">
      <defs>
        <linearGradient id="drl-aa-ppo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-aa-sac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-aa-td3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-aa-common" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-aa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级算法：PPO / SAC / TD3</text>

      {/* 三大算法卡片 */}
      <rect x="30" y="58" width="240" height="180" rx="10" fill="url(#drl-aa-ppo)" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
      <rect x="30" y="58" width="240" height="36" rx="10" fill="url(#drl-aa-ppo)" opacity="0.9" />
      <text x="150" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">PPO</text>
      <text x="150" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">Proximal Policy Optimization</text>
      <text x="150" y="132" textAnchor="middle" fontSize="10" fill="#475569">on-policy 策略优化</text>
      <text x="150" y="152" textAnchor="middle" fontSize="10" fill="#475569">截断重要性采样比</text>
      <text x="150" y="168" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">clip(r, 1-ε, 1+ε)</text>
      <text x="150" y="190" textAnchor="middle" fontSize="10" fill="#475569">限制策略更新幅度</text>
      <text x="150" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">稳定 + 易调参 + 工业首选</text>
      <text x="150" y="228" textAnchor="middle" fontSize="9" fill="#64748b">适用：离散/连续，大规模训练</text>

      <rect x="280" y="58" width="240" height="180" rx="10" fill="url(#drl-aa-sac)" opacity="0.1" stroke="#7c3aed" strokeWidth="2" />
      <rect x="280" y="58" width="240" height="36" rx="10" fill="url(#drl-aa-sac)" opacity="0.9" />
      <text x="400" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">SAC</text>
      <text x="400" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Soft Actor-Critic</text>
      <text x="400" y="132" textAnchor="middle" fontSize="10" fill="#475569">off-policy 最大熵RL</text>
      <text x="400" y="152" textAnchor="middle" fontSize="10" fill="#475569">奖励 + α · 策略熵</text>
      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">J = E[r + αH(π)]</text>
      <text x="400" y="190" textAnchor="middle" fontSize="10" fill="#475569">自动平衡探索与利用</text>
      <text x="400" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">样本效率高 + 内置探索</text>
      <text x="400" y="228" textAnchor="middle" fontSize="9" fill="#64748b">适用：连续动作，样本昂贵</text>

      <rect x="530" y="58" width="240" height="180" rx="10" fill="url(#drl-aa-td3)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <rect x="530" y="58" width="240" height="36" rx="10" fill="url(#drl-aa-td3)" opacity="0.9" />
      <text x="650" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">TD3</text>
      <text x="650" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Twin Delayed DDPG</text>
      <text x="650" y="132" textAnchor="middle" fontSize="10" fill="#475569">off-policy 确定性策略</text>
      <text x="650" y="152" textAnchor="middle" fontSize="10" fill="#475569">双Q网络取最小值</text>
      <text x="650" y="168" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">min(Q1, Q2) - β·噪声</text>
      <text x="650" y="190" textAnchor="middle" fontSize="10" fill="#475569">延迟策略更新 + 目标平滑</text>
      <text x="650" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">解决Q值过估计</text>
      <text x="650" y="228" textAnchor="middle" fontSize="9" fill="#64748b">适用：连续控制，机器人</text>

      {/* 共享技术 */}
      <text x="400" y="266" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">共享核心技术</text>

      <rect x="30" y="280" width="180" height="60" rx="8" fill="url(#drl-aa-common)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="120" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">目标网络</text>
      <text x="120" y="320" textAnchor="middle" fontSize="10" fill="#475569">软更新 τ·θ + (1-τ)θ⁻</text>
      <text x="120" y="334" textAnchor="middle" fontSize="9" fill="#64748b">稳定TD目标</text>

      <rect x="220" y="280" width="180" height="60" rx="8" fill="url(#drl-aa-common)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="310" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">经验回放</text>
      <text x="310" y="320" textAnchor="middle" fontSize="10" fill="#475569">off-policy必备</text>
      <text x="310" y="334" textAnchor="middle" fontSize="9" fill="#64748b">PPO除外（on-policy）</text>

      <rect x="410" y="280" width="180" height="60" rx="8" fill="url(#drl-aa-common)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">梯度裁剪</text>
      <text x="500" y="320" textAnchor="middle" fontSize="10" fill="#475569">防止梯度爆炸</text>
      <text x="500" y="334" textAnchor="middle" fontSize="9" fill="#64748b">clip ∇ to [-c, c]</text>

      <rect x="600" y="280" width="170" height="60" rx="8" fill="url(#drl-aa-common)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="302" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">双Q网络</text>
      <text x="685" y="320" textAnchor="middle" fontSize="10" fill="#475569">SAC / TD3</text>
      <text x="685" y="334" textAnchor="middle" fontSize="9" fill="#64748b">消除正向偏差</text>

      {/* 选型决策树 */}
      <text x="400" y="370" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">算法选型决策</text>

      <rect x="280" y="384" width="240" height="42" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="410" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">任务需求分析</text>

      <path d="M340 426 L200 446" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-aa-arrow)" />
      <path d="M400 426 L400 446" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-aa-arrow)" />
      <path d="M460 426 L600 446" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#drl-aa-arrow)" />

      <rect x="80" y="448" width="220" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="190" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">需要稳定性+易调参</text>
      <text x="190" y="486" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">→ PPO</text>

      <rect x="310" y="448" width="180" height="50" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">样本贵+需探索</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c3aed">→ SAC</text>

      <rect x="500" y="448" width="220" height="50" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="610" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">连续控制+高精度</text>
      <text x="610" y="486" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">→ TD3</text>

      {/* 底部总结 */}
      <rect x="30" y="514" width="740" height="48" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="536" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">PPO=稳定易用 / SAC=高效探索 / TD3=精确控制</text>
      <text x="400" y="554" textAnchor="middle" fontSize="10" fill="#475569">三者代表了2018-2019年深度RL算法的成熟，至今仍是工业界和学术界的标配基线</text>
    </svg>
  );
}
