"use client";

export function DlrQLearningDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="Q学习与SARSA算法对比">
      <defs>
        <linearGradient id="dlr-ql-q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlr-ql-sarsa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlr-ql-common" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlr-ql-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Q学习 vs SARSA：无模型控制</text>

      {/* Q-Learning */}
      <rect x="40" y="70" width="350" height="170" rx="14" fill="url(#dlr-ql-q)" opacity="0.92" />
      <text x="215" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">Q学习（离策略）</text>
      <text x="215" y="126" textAnchor="middle" fontSize="12" fill="#fecaca">用「下一个状态的最优动作」更新</text>
      <text x="215" y="156" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">Q(s,a) ← Q(s,a) +</text>
      <text x="215" y="176" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">  alpha [ r + gamma * max_a' Q(s',a') - Q(s,a) ]</text>
      <text x="215" y="202" textAnchor="middle" fontSize="11" fill="#fecaca">目标 = r + gamma * max Q(s',a')</text>
      <text x="215" y="220" textAnchor="middle" fontSize="11" fill="#fecaca">行为策略与目标策略可不同</text>

      {/* SARSA */}
      <rect x="410" y="70" width="350" height="170" rx="14" fill="url(#dlr-ql-sarsa)" opacity="0.92" />
      <text x="585" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">SARSA（在策略）</text>
      <text x="585" y="126" textAnchor="middle" fontSize="12" fill="#bfdbfe">用「下一个状态的实际动作」更新</text>
      <text x="585" y="156" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">Q(s,a) ← Q(s,a) +</text>
      <text x="585" y="176" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fef3c7">  alpha [ r + gamma * Q(s',a') - Q(s,a) ]</text>
      <text x="585" y="202" textAnchor="middle" fontSize="11" fill="#bfdbfe">目标 = r + gamma * Q(s',a')</text>
      <text x="585" y="220" textAnchor="middle" fontSize="11" fill="#bfdbfe">行为策略 = 目标策略</text>

      {/* SARSA 名字来源 */}
      <text x="400" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SARSA 名字来源：(s, a, r, s', a') 五元组</text>

      {/* 探索策略 */}
      <rect x="40" y="290" width="350" height="80" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="215" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">epsilon-贪心探索</text>
      <text x="215" y="336" textAnchor="middle" fontSize="11" fill="#475569">以 epsilon 概率随机探索</text>
      <text x="215" y="354" textAnchor="middle" fontSize="11" fill="#475569">以 1-epsilon 选 argmax Q</text>

      {/* 关键差异 */}
      <rect x="410" y="290" width="350" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="585" y="314" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">关键差异</text>
      <text x="585" y="336" textAnchor="middle" fontSize="11" fill="#475569">Q学习用 max（乐观，可能在悬崖附近过估）</text>
      <text x="585" y="354" textAnchor="middle" fontSize="11" fill="#475569">SARSA 用实际 a'（保守，考虑探索代价）</text>

      {/* 实践建议 */}
      <rect x="40" y="390" width="720" height="70" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="414" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">实践建议</text>
      <text x="400" y="436" textAnchor="middle" fontSize="11" fill="#475569">Q学习：离策略，可用旧经验回放，样本效率高，适合 DQN</text>
      <text x="400" y="452" textAnchor="middle" fontSize="11" fill="#475569">SARSA：在策略，更安全稳定，适合需要在线控制且有探索代价的场景（如悬崖行走）</text>
    </svg>
  );
}
