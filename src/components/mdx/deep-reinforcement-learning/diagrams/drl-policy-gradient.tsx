"use client";

export function DrlPolicyGradientDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="策略梯度方法：REINFORCE与策略梯度定理">
      <defs>
        <linearGradient id="drl-pg-policy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="drl-pg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="drl-pg-reward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="drl-pg-result" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="drl-pg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">策略梯度方法</text>

      {/* 策略网络流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">策略网络 π_θ(a|s)</text>

      <rect x="30" y="78" width="130" height="56" rx="8" fill="url(#drl-pg-policy)" opacity="0.9" />
      <text x="95" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">状态 s</text>
      <text x="95" y="120" textAnchor="middle" fontSize="10" fill="#bfdbfe">观测输入</text>

      <path d="M160 106 L195 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="200" y="78" width="180" height="56" rx="8" fill="url(#drl-pg-grad)" opacity="0.9" />
      <text x="290" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">策略网络 π_θ</text>
      <text x="290" y="120" textAnchor="middle" fontSize="10" fill="#ede9fe">NN输出动作概率</text>

      <path d="M380 106 L415 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="420" y="78" width="140" height="56" rx="8" fill="url(#drl-pg-reward)" opacity="0.9" />
      <text x="490" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">采样动作 a</text>
      <text x="490" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">按概率π(a|s)</text>

      <path d="M560 106 L595 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="600" y="78" width="170" height="56" rx="8" fill="url(#drl-pg-result)" opacity="0.9" />
      <text x="685" y="102" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">累积回报 G</text>
      <text x="685" y="120" textAnchor="middle" fontSize="10" fill="#d1fae5">指导梯度方向</text>

      {/* 策略梯度定理 */}
      <text x="400" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">策略梯度定理</text>

      <rect x="80" y="180" width="640" height="64" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="204" textAnchor="middle" fontSize="13" fill="#475569" fontFamily="monospace">∇J(θ) = E_τ~π_θ [ Σ_t ∇_θ log π_θ(a_t|s_t) · G_t ]</text>
      <text x="400" y="228" textAnchor="middle" fontSize="11" fill="#475569">梯度方向 = log似然梯度 × 回报，高回报动作增大概率，低回报动作降低概率</text>

      {/* REINFORCE算法 */}
      <text x="400" y="272" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">REINFORCE 算法流程</text>

      <rect x="30" y="286" width="170" height="76" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="115" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">1. 采样轨迹</text>
      <text x="115" y="326" textAnchor="middle" fontSize="10" fill="#475569">用π_θ跑完一回合</text>
      <text x="115" y="344" textAnchor="middle" fontSize="10" fill="#475569">记录 (s,a,r) 序列</text>

      <path d="M200 324 L225 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="230" y="286" width="170" height="76" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">2. 计算回报</text>
      <text x="315" y="326" textAnchor="middle" fontSize="10" fill="#475569">G_t = Σ γ^k r_{t+k+1}</text>
      <text x="315" y="344" textAnchor="middle" fontSize="10" fill="#475569">折扣累积奖励</text>

      <path d="M400 324 L425 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="430" y="286" width="170" height="76" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="515" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">3. 计算梯度</text>
      <text x="515" y="326" textAnchor="middle" fontSize="10" fill="#475569">∇log π · G_t</text>
      <text x="515" y="344" textAnchor="middle" fontSize="10" fill="#475569">似然梯度乘回报</text>

      <path d="M600 324 L625 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#drl-pg-arrow)" />

      <rect x="630" y="286" width="140" height="76" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="700" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">4. 更新参数</text>
      <text x="700" y="326" textAnchor="middle" fontSize="10" fill="#475569">θ ← θ + α · ∇J</text>
      <text x="700" y="344" textAnchor="middle" fontSize="10" fill="#475569">梯度上升</text>

      {/* 优势与改进 */}
      <text x="400" y="390" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键改进：降低方差</text>

      <rect x="30" y="404" width="240" height="76" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">回报减基线</text>
      <text x="150" y="444" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">G_t - b(s_t)</text>
      <text x="150" y="460" textAnchor="middle" fontSize="10" fill="#475569">减去状态值V(s)降方差</text>
      <text x="150" y="474" textAnchor="middle" fontSize="9" fill="#64748b">优势函数 A = G - V</text>

      <rect x="290" y="404" width="240" height="76" rx="8" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">因果性回报</text>
      <text x="410" y="444" textAnchor="middle" fontSize="10" fill="#475569">只用未来奖励</text>
      <text x="410" y="460" textAnchor="middle" fontSize="10" fill="#475569">过去动作不依赖未来回报</text>
      <text x="410" y="474" textAnchor="middle" fontSize="9" fill="#64748b">减少噪声</text>

      <rect x="550" y="404" width="220" height="76" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="426" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">连续/离散通用</text>
      <text x="660" y="444" textAnchor="middle" fontSize="10" fill="#475569">离散：softmax输出</text>
      <text x="660" y="460" textAnchor="middle" fontSize="10" fill="#475569">连续：高斯μ+σ</text>
      <text x="660" y="474" textAnchor="middle" fontSize="9" fill="#64748b">策略梯度的优势</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="62" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">适用场景：连续动作空间 / 随机策略 / 端到端学习</text>
      <text x="400" y="542" textAnchor="middle" fontSize="11" fill="#475569">核心思想：直接参数化策略π_θ，用梯度上升最大化期望回报J(θ)</text>
    </svg>
  );
}
