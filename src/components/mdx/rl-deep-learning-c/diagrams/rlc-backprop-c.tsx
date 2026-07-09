"use client";

export function RlcBackpropCDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="反向传播C实现：前向传播与反向传播流程">
      <defs>
        <linearGradient id="rlc-bp-fwd" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-bp-bwd" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="rlc-bp-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rlc-bp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="rlc-bp-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">反向传播C实现：链式法则与梯度计算</text>

      {/* 前向传播流程 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#2563eb">前向传播（蓝色）</text>

      <rect x="60" y="84" width="280" height="40" rx="8" fill="url(#rlc-bp-fwd)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="109" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">输入 x → 计算加权和 z = Wx + b</text>

      <path d="M200 124 L200 130" stroke="#2563eb" strokeWidth="2" markerEnd="url(#rlc-bp-arrow)" />

      <rect x="60" y="132" width="280" height="40" rx="8" fill="url(#rlc-bp-fwd)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="157" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">激活 a = f(z)</text>

      <path d="M200 172 L200 178" stroke="#2563eb" strokeWidth="2" markerEnd="url(#rlc-bp-arrow)" />

      <rect x="60" y="180" width="280" height="40" rx="8" fill="url(#rlc-bp-fwd)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">逐层传播 → 输出 ŷ</text>

      <path d="M200 220 L200 226" stroke="#2563eb" strokeWidth="2" markerEnd="url(#rlc-bp-arrow)" />

      <rect x="60" y="228" width="280" height="40" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="253" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">计算损失 L = ½(ŷ - y)²</text>

      {/* 反向传播流程 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">反向传播（红色）</text>

      <rect x="460" y="228" width="280" height="40" rx="8" fill="url(#rlc-bp-bwd)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="253" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b91c1c">δ_out = ∂L/∂ŷ · f'(z_out)</text>

      <path d="M600 228 L600 222" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rlc-bp-arrow-r)" />

      <rect x="460" y="180" width="280" height="40" rx="8" fill="url(#rlc-bp-bwd)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b91c1c">δ_l = (W_{l+1}^T δ_{l+1}) ⊙ f'(z_l)</text>

      <path d="M600 180 L600 174" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rlc-bp-arrow-r)" />

      <rect x="460" y="132" width="280" height="40" rx="8" fill="url(#rlc-bp-bwd)" opacity="0.12" stroke="#dc2626" strokeWidth="1.5" />
      <text x="600" y="157" textAnchor="middle" fontSize="12" fontWeight="600" fill="#b91c1c">∂L/∂W = δ · a^T</text>

      <path d="M600 132 L600 126" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rlc-bp-arrow-r)" />

      <rect x="460" y="84" width="280" height="40" rx="8" fill="url(#rlc-bp-grad)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="600" y="109" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">更新权重 W ← W - η · ∂L/∂W</text>

      {/* 链式法则公式 */}
      <text x="400" y="302" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">链式法则（核心数学）</text>
      <rect x="80" y="316" width="640" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="347" textAnchor="middle" fontSize="13" fill="#b91c1c" fontFamily="monospace">∂L/∂W_l = ∂L/∂a_l · ∂a_l/∂z_l · ∂z_l/∂W_l</text>

      {/* C语言实现代码 */}
      <text x="400" y="398" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">C语言反向传播核心代码</text>
      <rect x="80" y="410" width="640" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      <text x="100" y="434" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">// 1. 输出层误差</text>
      <text x="100" y="452" fontSize="11" fill="#475569" fontFamily="monospace">delta_out = (y_pred - y_true) * sigmoid_deriv(z_out);</text>

      <text x="100" y="478" fontSize="11" fill="#dc2626" fontFamily="monospace" fontWeight="600">// 2. 逐层反向传播</text>
      <text x="100" y="496" fontSize="11" fill="#475569" fontFamily="monospace">for (int l = n_layers - 2; l &gt;= 0; l--) {</text>
      <text x="100" y="514" fontSize="11" fill="#475569" fontFamily="monospace">  delta[l] = matmul_transpose(W[l+1], delta[l+1]) * deriv(z[l]);</text>
      <text x="100" y="532" fontSize="11" fill="#475569" fontFamily="monospace">  grad_W[l] = outer_product(delta[l], a[l-1]);</text>
      <text x="100" y="550" fontSize="11" fill="#475569" fontFamily="monospace">  grad_b[l] = delta[l];</text>
      <text x="100" y="568" fontSize="11" fill="#475569" fontFamily="monospace">}</text>
      <text x="100" y="586" fontSize="11" fill="#059669" fontFamily="monospace" fontWeight="600">// 3. 梯度下降更新 W[l] -= lr * grad_W[l];</text>
    </svg>
  );
}
