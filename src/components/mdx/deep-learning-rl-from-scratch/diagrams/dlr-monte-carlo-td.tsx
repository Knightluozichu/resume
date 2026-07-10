"use client";

export function DlrMonteCarloTdDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="蒙特卡洛与时序差分方法对比">
      <defs>
        <linearGradient id="dlr-mc-mc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-mc-td" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlr-mc-dp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-mc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">蒙特卡洛 vs 时序差分：无模型预测</text>

      {/* MC */}
      <rect x="40" y="70" width="350" height="150" rx="14" fill="url(#dlr-mc-mc)" opacity="0.92" />
      <text x="215" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">蒙特卡洛 MC</text>
      <text x="215" y="124" textAnchor="middle" fontSize="12" fill="#bfdbfe">用完整 episode 的实际回报 G_t</text>
      <text x="215" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">V(s) ← V(s) + alpha [ G_t - V(s) ]</text>
      <text x="215" y="178" textAnchor="middle" fontSize="11" fill="#bfdbfe">无偏但方差大</text>
      <text x="215" y="196" textAnchor="middle" fontSize="11" fill="#bfdbfe">必须等 episode 结束才能更新</text>

      {/* TD */}
      <rect x="410" y="70" width="350" height="150" rx="14" fill="url(#dlr-mc-td)" opacity="0.92" />
      <text x="585" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">时序差分 TD(0)</text>
      <text x="585" y="124" textAnchor="middle" fontSize="12" fill="#fef3c7">用一步实际奖励 + 下一个状态的估计值</text>
      <text x="585" y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">V(s) ← V(s) + alpha [ r + gamma V(s') - V(s) ]</text>
      <text x="585" y="178" textAnchor="middle" fontSize="11" fill="#fef3c7">有偏但方差小</text>
      <text x="585" y="196" textAnchor="middle" fontSize="11" fill="#fef3c7">每步即可更新（在线学习）</text>

      {/* TD误差 */}
      <text x="400" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TD 误差（TD Error）</text>
      <rect x="100" y="265" width="600" height="50" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="#92400e">delta_t = r_&#123;t+1&#125; + gamma * V(s_&#123;t+1&#125;) - V(s_t)</text>
      <text x="400" y="306" textAnchor="middle" fontSize="11" fill="#475569">TD 误差衡量当前估计与新观测的偏差，是 TD 学习的核心信号</text>

      {/* n步 TD */}
      <text x="400" y="345" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">n 步回报与 TD(lambda)：MC 与 TD 的统一</text>
      <rect x="40" y="360" width="720" height="50" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="383" textAnchor="middle" fontSize="12" fill="#475569">n=1 → TD(0) | n → episode 长度 → MC | TD(lambda) 用 lambda 加权混合所有 n 步回报</text>
      <text x="400" y="401" textAnchor="middle" fontSize="11" fill="#475569">偏差随 n 增大而减小，方差随 n 增大而增大——MC 与 TD 是偏差-方差权衡的两端</text>

      {/* 三者关系 */}
      <rect x="40" y="425" width="720" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">DP 需模型 | MC 无模型、等结束、高方差 | TD 无模型、在线、低方差——TD 是实践中最常用的预测方法</text>
    </svg>
  );
}
