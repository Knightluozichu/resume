"use client";

export function IdlBackpropagationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="反向传播算法链式法则与梯度流动">
      <defs>
        <linearGradient id="idl-bp-forward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="idl-bp-backward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="idl-bp-arrow-f" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="idl-bp-arrow-b" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">反向传播：前向计算 + 反向求导</text>

      {/* 前向传播流程（上方箭头） */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">前向传播 →</text>

      <rect x="30" y="75" width="120" height="60" rx="8" fill="url(#idl-bp-forward)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="90" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">输入 x</text>
      <text x="90" y="120" textAnchor="middle" fontSize="10" fill="#475569">原始数据</text>

      <line x1="150" y1="105" x2="200" y2="105" stroke="#2563eb" strokeWidth="2" markerEnd="url(#idl-bp-arrow-f)" />

      <rect x="200" y="75" width="140" height="60" rx="8" fill="url(#idl-bp-forward)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="270" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">z1 = W1*x + b1</text>
      <text x="270" y="120" textAnchor="middle" fontSize="10" fill="#475569">a1 = ReLU(z1)</text>

      <line x1="340" y1="105" x2="390" y2="105" stroke="#2563eb" strokeWidth="2" markerEnd="url(#idl-bp-arrow-f)" />

      <rect x="390" y="75" width="140" height="60" rx="8" fill="url(#idl-bp-forward)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="460" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">z2 = W2*a1 + b2</text>
      <text x="460" y="120" textAnchor="middle" fontSize="10" fill="#475569">a2 = softmax(z2)</text>

      <line x1="530" y1="105" x2="580" y2="105" stroke="#2563eb" strokeWidth="2" markerEnd="url(#idl-bp-arrow-f)" />

      <rect x="580" y="75" width="120" height="60" rx="8" fill="url(#idl-bp-forward)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="640" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">损失 L</text>
      <text x="640" y="120" textAnchor="middle" fontSize="10" fill="#475569">L = CE(a2, y)</text>

      {/* 反向传播流程（下方箭头） */}
      <text x="400" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">← 反向传播（链式法则）</text>

      <rect x="580" y="185" width="120" height="55" rx="8" fill="url(#idl-bp-backward)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="640" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">dL/dz2</text>
      <text x="640" y="225" textAnchor="middle" fontSize="10" fill="#dc2626">= a2 - y</text>

      <line x1="580" y1="212" x2="530" y2="212" stroke="#dc2626" strokeWidth="2" markerEnd="url(#idl-bp-arrow-b)" />

      <rect x="390" y="185" width="140" height="55" rx="8" fill="url(#idl-bp-backward)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="460" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">dL/dW2, dL/db2</text>
      <text x="460" y="225" textAnchor="middle" fontSize="10" fill="#dc2626">dL/da1 = W2^T * dL/dz2</text>

      <line x1="390" y1="212" x2="340" y2="212" stroke="#dc2626" strokeWidth="2" markerEnd="url(#idl-bp-arrow-b)" />

      <rect x="200" y="185" width="140" height="55" rx="8" fill="url(#idl-bp-backward)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="270" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">dL/dz1</text>
      <text x="270" y="225" textAnchor="middle" fontSize="10" fill="#dc2626">= dL/da1 * ReLU'(z1)</text>

      <line x1="200" y1="212" x2="150" y2="212" stroke="#dc2626" strokeWidth="2" markerEnd="url(#idl-bp-arrow-b)" />

      <rect x="30" y="185" width="120" height="55" rx="8" fill="url(#idl-bp-backward)" opacity="0.12" stroke="#dc2626" strokeWidth="2" />
      <text x="90" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">dL/dW1, dL/db1</text>
      <text x="90" y="225" textAnchor="middle" fontSize="10" fill="#dc2626">参数梯度</text>

      {/* 参数更新 */}
      <rect x="200" y="270" width="400" height="50" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
      <text x="400" y="292" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">参数更新：W = W - lr * dL/dW</text>
      <text x="400" y="310" textAnchor="middle" fontSize="11" fill="#059669">lr = 学习率，控制每次更新的步长</text>

      {/* 梯度消失/爆炸说明 */}
      <text x="400" y="355" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">梯度流问题</text>

      <rect x="40" y="370" width="340" height="80" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="394" fontSize="13" fontWeight="700" fill="#dc2626">梯度消失</text>
      <text x="60" y="414" fontSize="11" fill="#991b1b">Sigmoid 导数最大 0.25，多层连乘 → 梯度 → 0</text>
      <text x="60" y="432" fontSize="11" fill="#991b1b">浅层权重几乎不更新，网络无法学习</text>

      <rect x="420" y="370" width="340" height="80" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="440" y="394" fontSize="13" fontWeight="700" fill="#dc2626">梯度爆炸</text>
      <text x="440" y="414" fontSize="11" fill="#991b1b">权重值大时，多层连乘 → 梯度 → 无穷</text>
      <text x="440" y="432" fontSize="11" fill="#991b1b">参数震荡发散，损失变为 NaN</text>

      <rect x="40" y="465" width="720" height="40" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="12" fill="#065f46">解决方案：ReLU 激活函数（正区间导数=1） / BatchNorm / 残差连接 / 梯度裁剪</text>
    </svg>
  );
}
