"use client";

export function PrlNeuralNetworksDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="神经网络前馈结构与反向传播">
      <defs>
        <linearGradient id="prl-nn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-nn-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-nn-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="prl-nn-bp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="prl-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="prl-nn-bparrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络：前馈结构与反向传播</text>

      {/* 网络结构 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">前馈网络结构</text>

      {/* 输入层 */}
      <circle cx="120" cy="110" r="18" fill="url(#prl-nn-input)" opacity="0.85" />
      <text x="120" y="114" textAnchor="middle" fontSize="10" fill="#fff">x₁</text>
      <circle cx="120" cy="160" r="18" fill="url(#prl-nn-input)" opacity="0.85" />
      <text x="120" y="164" textAnchor="middle" fontSize="10" fill="#fff">x₂</text>
      <circle cx="120" cy="210" r="18" fill="url(#prl-nn-input)" opacity="0.85" />
      <text x="120" y="214" textAnchor="middle" fontSize="10" fill="#fff">x₃</text>
      <text x="120" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">输入层</text>

      {/* 隐藏层 */}
      <circle cx="320" cy="100" r="18" fill="url(#prl-nn-hidden)" opacity="0.85" />
      <text x="320" y="104" textAnchor="middle" fontSize="10" fill="#fff">z₁</text>
      <circle cx="320" cy="160" r="18" fill="url(#prl-nn-hidden)" opacity="0.85" />
      <text x="320" y="164" textAnchor="middle" fontSize="10" fill="#fff">z₂</text>
      <circle cx="320" cy="220" r="18" fill="url(#prl-nn-hidden)" opacity="0.85" />
      <text x="320" y="224" textAnchor="middle" fontSize="10" fill="#fff">z₃</text>
      <circle cx="320" cy="280" r="18" fill="url(#prl-nn-hidden)" opacity="0.85" />
      <text x="320" y="284" textAnchor="middle" fontSize="10" fill="#fff">z₄</text>
      <text x="320" y="318" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">隐藏层</text>

      {/* 输出层 */}
      <circle cx="520" cy="135" r="18" fill="url(#prl-nn-output)" opacity="0.85" />
      <text x="520" y="139" textAnchor="middle" fontSize="10" fill="#fff">y₁</text>
      <circle cx="520" cy="205" r="18" fill="url(#prl-nn-output)" opacity="0.85" />
      <text x="520" y="209" textAnchor="middle" fontSize="10" fill="#fff">y₂</text>
      <text x="520" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">输出层</text>

      {/* 连接线 */}
      <line x1="138" y1="110" x2="302" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="110" x2="302" y2="160" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="110" x2="302" y2="220" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="110" x2="302" y2="280" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="160" x2="302" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="160" x2="302" y2="160" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="160" x2="302" y2="220" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="160" x2="302" y2="280" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="210" x2="302" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="210" x2="302" y2="160" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="210" x2="302" y2="220" stroke="#94a3b8" strokeWidth="1" />
      <line x1="138" y1="210" x2="302" y2="280" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="100" x2="502" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="160" x2="502" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="220" x2="502" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="280" x2="502" y2="135" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="100" x2="502" y2="205" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="160" x2="502" y2="205" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="220" x2="502" y2="205" stroke="#94a3b8" strokeWidth="1" />
      <line x1="338" y1="280" x2="502" y2="205" stroke="#94a3b8" strokeWidth="1" />

      {/* 公式区 */}
      <rect x="590" y="80" width="180" height="180" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="680" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">层间计算</text>
      <text x="680" y="124" textAnchor="middle" fontSize="10" fill="#5b21b6">a_j = Σ w_ji z_i + b_j</text>
      <text x="680" y="144" textAnchor="middle" fontSize="10" fill="#5b21b6">z_j = h(a_j)</text>
      <text x="680" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">激活函数 h(·)</text>
      <text x="680" y="186" textAnchor="middle" fontSize="9" fill="#5b21b6">tanh: 平滑，零均值</text>
      <text x="680" y="202" textAnchor="middle" fontSize="9" fill="#5b21b6">sigmoid: (0,1) 概率</text>
      <text x="680" y="218" textAnchor="middle" fontSize="9" fill="#5b21b6">ReLU: 稀疏激活</text>
      <text x="680" y="238" textAnchor="middle" fontSize="9" fill="#5b21b6">softmax: 多分类输出</text>
      <text x="680" y="254" textAnchor="middle" fontSize="9" fill="#5b21b6">万能逼近：足够宽→任意函数</text>

      {/* 反向传播 */}
      <text x="400" y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">反向传播：链式法则高效求梯度</text>

      <rect x="40" y="370" width="225" height="80" rx="8" fill="url(#prl-nn-bp)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="152" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">① 前向传播</text>
      <text x="152" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">逐层计算 a_j, z_j</text>
      <text x="152" y="424" textAnchor="middle" fontSize="9" fill="#991b1b">计算输出 y 和损失 E</text>
      <text x="152" y="440" textAnchor="middle" fontSize="9" fill="#991b1b">保存中间激活值</text>

      <path d="M265 410 L288 410" stroke="#dc2626" strokeWidth="2" markerEnd="url(#prl-nn-bparrow)" />

      <rect x="288" y="370" width="225" height="80" rx="8" fill="url(#prl-nn-bp)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">② 反向传播误差</text>
      <text x="400" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">输出层 δ_k = y_k - t_k</text>
      <text x="400" y="424" textAnchor="middle" fontSize="9" fill="#991b1b">隐藏层 δ_j = h'(a_j)Σ w_kj δ_k</text>
      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#991b1b">误差向后递归传播</text>

      <path d="M513 410 L535 410" stroke="#dc2626" strokeWidth="2" markerEnd="url(#prl-nn-bparrow)" />

      <rect x="535" y="370" width="225" height="80" rx="8" fill="url(#prl-nn-bp)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="647" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">③ 权重更新</text>
      <text x="647" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">∂E/∂w_kj = δ_k z_j</text>
      <text x="647" y="424" textAnchor="middle" fontSize="9" fill="#991b1b">w ← w - η ∂E/∂w</text>
      <text x="647" y="440" textAnchor="middle" fontSize="9" fill="#991b1b">梯度下降更新参数</text>

      {/* 底部 */}
      <rect x="40" y="470" width="720" height="60" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">PRML 神经网络特点</text>
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#64748b">万能逼近定理保证表达能力 · 反向传播用链式法则高效求梯度 · 贝叶斯正则化控制过拟合</text>
      <text x="400" y="524" textAnchor="middle" fontSize="10" fill="#64748b">权重衰减(=高斯先验) · 早停 · 输入抖动 · 证据框架自动调超参</text>
    </svg>
  );
}
