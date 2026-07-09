"use client";

export function RlcPolicyGradientCDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="策略梯度C实现：策略网络与梯度上升">
      <defs>
        <linearGradient id="rlc-pg-policy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-pg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rlc-pg-return" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rlc-pg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">策略梯度C实现：策略网络与梯度上升</text>

      {/* 策略网络 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略网络 π_θ(a|s)</text>

      <rect x="60" y="84" width="100" height="44" rx="8" fill="url(#rlc-pg-policy)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">状态 s</text>

      <path d="M160 106 L196 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-pg-arrow)" />

      <rect x="200" y="84" width="120" height="44" rx="8" fill="url(#rlc-pg-policy)" opacity="0.95" />
      <text x="260" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">策略网络</text>

      <path d="M320 106 L356 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-pg-arrow)" />

      <rect x="360" y="84" width="120" height="44" rx="8" fill="url(#rlc-pg-policy)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="420" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">动作概率</text>
      <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">softmax(π(a|s))</text>

      {/* REINFORCE 流程 */}
      <text x="400" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">REINFORCE 算法流程</text>

      <rect x="60" y="176" width="680" height="40" rx="8" fill="url(#rlc-pg-policy)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">1. 运行策略网络，收集完整轨迹 τ = {(s0,a0,r0), (s1,a1,r1), ...}</text>

      <path d="M400 216 L400 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-pg-arrow)" />

      <rect x="60" y="224" width="680" height="40" rx="8" fill="url(#rlc-pg-return)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="248" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">2. 计算每步回报 G_t = Σ γ^k r_{t+k+1}（从后向前累积）</text>

      <path d="M400 264 L400 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-pg-arrow)" />

      <rect x="60" y="272" width="680" height="40" rx="8" fill="url(#rlc-pg-grad)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">3. 计算梯度 ∇θ J = Σ ∇θ log π(a_t|s_t) · G_t</text>

      <path d="M400 312 L400 318" stroke="#64748b" strokeWidth="2" markerEnd="url(#rlc-pg-arrow)" />

      <rect x="60" y="320" width="680" height="40" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="344" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b91c1c">4. 梯度上升更新 θ ← θ + α · ∇θ J（增大好动作概率）</text>

      {/* 策略梯度定理 */}
      <text x="400" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略梯度定理</text>
      <rect x="80" y="404" width="640" height="50" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="436" textAnchor="middle" fontSize="13" fill="#92400e" fontFamily="monospace">∇θ J(θ) = E[ ∇θ log π_θ(a|s) · G_t ]</text>

      {/* C语言代码 */}
      <text x="400" y="484" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">C语言核心代码</text>
      <rect x="80" y="496" width="640" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="100" y="520" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">// 计算回报并更新策略</text>
      <text x="100" y="538" fontSize="11" fill="#475569" fontFamily="monospace">for (int t = T-1; t &gt;= 0; t--) {</text>
      <text x="100" y="556" fontSize="11" fill="#475569" fontFamily="monospace">  G = G * gamma + rewards[t];  // 折扣回报</text>
      <text x="100" y="574" fontSize="11" fill="#475569" fontFamily="monospace">  log_prob = log_softmax(policy_net, states[t], actions[t]);</text>
      <text x="100" y="592" fontSize="11" fill="#475569" fontFamily="monospace">  loss += -log_prob * G;  // 负号因C库做梯度下降</text>
    </svg>
  );
}
