"use client";

export function ImlNeuralNetworksDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="神经网络结构与反向传播">
      <defs>
        <linearGradient id="iml-nn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-nn-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iml-nn-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-nn-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="iml-nn-arr-bwd" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络结构与训练流程</text>

      {/* 网络结构 */}
      <text x="400" y="66" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">多层感知机（MLP）</text>

      {/* 输入层 */}
      <text x="120" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">输入层</text>
      {[0, 1, 2].map(i => (
        <circle key={`in-${i}`} cx={120} cy={120 + i * 50} r="16" fill="url(#iml-nn-input)" opacity="0.85" />
      ))}
      <text x="120" y="125" textAnchor="middle" fontSize="9" fill="#fff">x1</text>
      <text x="120" y="175" textAnchor="middle" fontSize="9" fill="#fff">x2</text>
      <text x="120" y="225" textAnchor="middle" fontSize="9" fill="#fff">x3</text>

      {/* 隐藏层1 */}
      <text x="300" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#7c3aed">隐藏层1</text>
      {[0, 1, 2, 3].map(i => (
        <circle key={`h1-${i}`} cx={300} cy={110 + i * 45} r="16" fill="url(#iml-nn-hidden)" opacity="0.85" />
      ))}

      {/* 隐藏层2 */}
      <text x="480" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#7c3aed">隐藏层2</text>
      {[0, 1, 2, 3].map(i => (
        <circle key={`h2-${i}`} cx={480} cy={110 + i * 45} r="16" fill="url(#iml-nn-hidden)" opacity="0.85" />
      ))}

      {/* 输出层 */}
      <text x="660" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="#059669">输出层</text>
      <circle cx={660} cy={155} r="16" fill="url(#iml-nn-output)" opacity="0.85" />
      <text x="660" y="160" textAnchor="middle" fontSize="9" fill="#fff">y</text>

      {/* 连接线（稀疏示意） */}
      <g stroke="#cbd5e1" strokeWidth="1" opacity="0.5">
        {/* 输入 → 隐藏1 */}
        {[0, 1, 2].map(i => [0, 1, 2, 3].map(j => (
          <line key={`c1-${i}-${j}`} x1={136} y1={120 + i * 50} x2={284} y2={110 + j * 45} />
        )))}
        {/* 隐藏1 → 隐藏2 */}
        {[0, 1, 2, 3].map(i => [0, 1, 2, 3].map(j => (
          <line key={`c2-${i}-${j}`} x1={316} y1={110 + i * 45} x2={464} y2={110 + j * 45} />
        )))}
        {/* 隐藏2 → 输出 */}
        {[0, 1, 2, 3].map(i => (
          <line key={`c3-${i}`} x1={496} y1={110 + i * 45} x2={644} y2={155} />
        ))}
      </g>

      {/* 激活函数标注 */}
      <rect x="220" y="310" width="360" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="330" textAnchor="middle" fontSize="11" fill="#475569">每层：a = activation(W * x + b) · 激活函数引入非线性</text>

      {/* 前向传播与反向传播 */}
      <text x="400" y="368" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">训练流程：前向传播 + 反向传播</text>

      {/* 前向传播箭头 */}
      <rect x="40" y="382" width="720" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="408" fontSize="11" fontWeight="600" fill="#1e40af">前向传播</text>
      <text x="140" y="408" fontSize="11" fill="#475569">x → z1=W1x+b1 → a1=ReLU(z1) → z2=W2a1+b2 → a2=sigmoid(z2) → 预测</text>
      <path d="M680 400 L720 400" stroke="#2563eb" strokeWidth="2" markerEnd="url(#iml-nn-arr)" />

      {/* 反向传播箭头 */}
      <rect x="40" y="436" width="720" height="44" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M40 458 L80 458" stroke="#ef4444" strokeWidth="2" markerEnd="url(#iml-nn-arr-bwd)" />
      <text x="90" y="462" fontSize="11" fontWeight="600" fill="#991b1b">反向传播</text>
      <text x="180" y="462" fontSize="11" fill="#475569">Loss ← dL/dW2 ← dL/da1 ← dL/dz1 ← dL/dW1（链式法则逐层求梯度）</text>

      {/* 参数更新 */}
      <rect x="40" y="490" width="720" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fill="#475569">参数更新：W = W - alpha * dL/dW · 重复前向→损失→反向→更新直到收敛</text>
    </svg>
  );
}
