"use client";

export function IaiDeepLearningDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="深度学习神经网络结构图">
      <defs>
        <linearGradient id="iai-dl-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iai-dl-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iai-dl-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iai-dl-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iai-dl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度学习：神经网络与反向传播</text>

      {/* 神经网络结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">前馈神经网络结构</text>

      {/* 输入层 */}
      <text x="150" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">输入层</text>
      <circle cx="150" cy="110" r="16" fill="url(#iai-dl-input)" opacity="0.85" />
      <text x="150" y="114" textAnchor="middle" fontSize="10" fill="#fff">x1</text>
      <circle cx="150" cy="150" r="16" fill="url(#iai-dl-input)" opacity="0.85" />
      <text x="150" y="154" textAnchor="middle" fontSize="10" fill="#fff">x2</text>
      <circle cx="150" cy="190" r="16" fill="url(#iai-dl-input)" opacity="0.85" />
      <text x="150" y="194" textAnchor="middle" fontSize="10" fill="#fff">x3</text>

      {/* 连接线 输入→隐藏层1 */}
      <line x1="166" y1="110" x2="334" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="110" x2="334" y2="140" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="110" x2="334" y2="180" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="150" x2="334" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="150" x2="334" y2="140" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="150" x2="334" y2="180" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="190" x2="334" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="190" x2="334" y2="140" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="166" y1="190" x2="334" y2="180" stroke="#cbd5e1" strokeWidth="1" />

      {/* 隐藏层1 */}
      <text x="350" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">隐藏层 1</text>
      <circle cx="350" cy="100" r="16" fill="url(#iai-dl-hidden)" opacity="0.85" />
      <text x="350" y="104" textAnchor="middle" fontSize="10" fill="#fff">h1</text>
      <circle cx="350" cy="140" r="16" fill="url(#iai-dl-hidden)" opacity="0.85" />
      <text x="350" y="144" textAnchor="middle" fontSize="10" fill="#fff">h2</text>
      <circle cx="350" cy="180" r="16" fill="url(#iai-dl-hidden)" opacity="0.85" />
      <text x="350" y="184" textAnchor="middle" fontSize="10" fill="#fff">h3</text>

      {/* 连接线 隐藏层1→隐藏层2 */}
      <line x1="366" y1="100" x2="534" y2="110" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="366" y1="100" x2="534" y2="160" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="366" y1="140" x2="534" y2="110" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="366" y1="140" x2="534" y2="160" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="366" y1="180" x2="534" y2="110" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="366" y1="180" x2="534" y2="160" stroke="#cbd5e1" strokeWidth="1" />

      {/* 隐藏层2 */}
      <text x="550" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">隐藏层 2</text>
      <circle cx="550" cy="110" r="16" fill="url(#iai-dl-hidden)" opacity="0.85" />
      <text x="550" y="114" textAnchor="middle" fontSize="10" fill="#fff">h4</text>
      <circle cx="550" cy="160" r="16" fill="url(#iai-dl-hidden)" opacity="0.85" />
      <text x="550" y="164" textAnchor="middle" fontSize="10" fill="#fff">h5</text>

      {/* 连接线 隐藏层2→输出 */}
      <line x1="566" y1="110" x2="684" y2="130" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="566" y1="160" x2="684" y2="130" stroke="#cbd5e1" strokeWidth="1" />

      {/* 输出层 */}
      <text x="700" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">输出层</text>
      <circle cx="700" cy="130" r="16" fill="url(#iai-dl-output)" opacity="0.85" />
      <text x="700" y="134" textAnchor="middle" fontSize="10" fill="#fff">y</text>

      {/* 前向传播箭头 */}
      <path d="M150 230 L700 230" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#iai-dl-arrow)" />
      <text x="425" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">前向传播：z = Wx + b, a = activation(z)</text>

      {/* 反向传播箭头 */}
      <path d="M700 256 L150 256" stroke="#059669" strokeWidth="2" strokeDasharray="6 3" markerEnd="url(#iai-dl-arrow)" />
      <text x="425" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">反向传播：链式法则计算梯度，更新权重</text>

      {/* 激活函数 */}
      <rect x="40" y="292" width="350" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="316" fontSize="13" fontWeight="700" fill="#0f172a">常见激活函数</text>
      <text x="60" y="338" fontSize="11" fill="#475569">ReLU：f(x) = max(0, x)，计算快，缓解梯度消失</text>
      <text x="60" y="356" fontSize="11" fill="#475569">Sigmoid：f(x) = 1 / (1 + e^(-x))，输出 (0,1)</text>
      <text x="60" y="374" fontSize="11" fill="#475569">Tanh：f(x) = (e^x - e^(-x)) / (e^x + e^(-x))</text>
      <text x="60" y="392" fontSize="11" fill="#475569">Softmax：多分类输出层，归一化为概率分布</text>

      {/* 经典架构 */}
      <rect x="410" y="292" width="350" height="120" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="430" y="316" fontSize="13" fontWeight="700" fill="#0f172a">经典深度学习架构</text>
      <text x="430" y="338" fontSize="11" fill="#475569">CNN（卷积网络）：局部感知 + 权值共享，擅长图像</text>
      <text x="430" y="356" fontSize="11" fill="#475569">RNN（循环网络）：隐藏状态传递，擅长序列</text>
      <text x="430" y="374" fontSize="11" fill="#475569">LSTM / GRU：门控机制解决 RNN 长程依赖</text>
      <text x="430" y="392" fontSize="11" fill="#475569">Transformer：自注意力并行，当今 NLP 基石</text>

      {/* 反向传播公式 */}
      <rect x="40" y="428" width="720" height="100" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="452" fontSize="13" fontWeight="700" fill="#065f46">反向传播与梯度下降</text>
      <text x="60" y="474" fontSize="11" fill="#475569">损失 L 对权重 W 的梯度通过链式法则逐层反传：dL/dW = (dL/da) * (da/dz) * (dz/dW)</text>
      <text x="60" y="492" fontSize="11" fill="#475569">权重更新：W = W - learning_rate * dL/dW（SGD / Momentum / Adam 等优化器）</text>
      <text x="60" y="510" fontSize="11" fill="#475569">梯度消失：深层网络中梯度趋零，ReLU + 残差连接（ResNet）缓解</text>
    </svg>
  );
}
