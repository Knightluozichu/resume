"use client";

export function DlrPolicyGradientDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="策略梯度方法：直接优化策略">
      <defs>
        <linearGradient id="dlr-pg-policy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-pg-value" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-pg-ac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-pg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">策略梯度方法：直接优化策略 pi_theta</text>

      {/* 值方法 vs 策略方法 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">值方法 vs 策略方法</text>

      <rect x="40" y="80" width="350" height="100" rx="10" fill="url(#dlr-pg-value)" opacity="0.9" />
      <text x="215" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">值方法（Q学习/DQN）</text>
      <text x="215" y="132" textAnchor="middle" fontSize="11" fill="#bfdbfe">学 Q(s,a) → argmax 选动作</text>
      <text x="215" y="152" textAnchor="middle" fontSize="11" fill="#bfdbfe">无法处理连续动作空间</text>
      <text x="215" y="170" textAnchor="middle" fontSize="11" fill="#bfdbfe">确定性策略</text>

      <rect x="410" y="80" width="350" height="100" rx="10" fill="url(#dlr-pg-policy)" opacity="0.9" />
      <text x="585" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">策略方法（Policy Gradient）</text>
      <text x="585" y="132" textAnchor="middle" fontSize="11" fill="#fecaca">学 pi_theta(a|s) 直接输出动作概率</text>
      <text x="585" y="152" textAnchor="middle" fontSize="11" fill="#fecaca">天然支持连续动作</text>
      <text x="585" y="170" textAnchor="middle" fontSize="11" fill="#fecaca">随机策略，可探索</text>

      {/* 策略梯度定理 */}
      <text x="400" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略梯度定理</text>
      <rect x="60" y="228" width="680" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">grad J(theta) = E_pi [ grad_theta log pi_theta(a|s) * Q_pi(s,a) ]</text>
      <text x="400" y="272" textAnchor="middle" fontSize="11" fill="#475569">对数策略梯度 * 动作值 = 目标函数的梯度方向——增大好动作概率，减小差动作概率</text>

      {/* REINFORCE */}
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">REINFORCE 算法（蒙特卡洛策略梯度）</text>
      <rect x="60" y="334" width="680" height="50" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="#991b1b">theta ← theta + alpha * grad_theta log pi_theta(a|s) * G_t</text>
      <text x="400" y="374" textAnchor="middle" fontSize="11" fill="#475569">用完整 episode 的回报 G_t 作为权重——方差大，需基线减方差</text>

      {/* Actor-Critic */}
      <text x="400" y="415" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Actor-Critic：降低方差的结合方法</text>
      <rect x="60" y="428" width="680" height="50" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="450" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">Actor（策略网络）+ Critic（值网络）：用 TD 误差替代 G_t 降低方差</text>
      <text x="400" y="468" textAnchor="middle" fontSize="11" fill="#475569">Actor 决定动作，Critic 评估动作好坏——两者交替更新，是现代深度RL的基石（A3C/PPO/SAC 的基础）</text>
    </svg>
  );
}
