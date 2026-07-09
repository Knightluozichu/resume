"use client";

export function RlcNeuralNetworksCDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="神经网络C语言实现：前馈网络结构与前向传播">
      <defs>
        <linearGradient id="rlc-nn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rlc-nn-hidden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rlc-nn-output" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rlc-nn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络C语言实现：前馈网络与前向传播</text>

      {/* 网络结构 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">网络结构 (输入2 → 隐藏3 → 输出2)</text>

      {/* 输入层 */}
      <text x="120" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">输入层</text>
      <circle cx="120" cy="140" r="20" fill="url(#rlc-nn-input)" opacity="0.85" />
      <text x="120" y="145" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">x0</text>
      <circle cx="120" cy="220" r="20" fill="url(#rlc-nn-input)" opacity="0.85" />
      <text x="120" y="225" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">x1</text>

      {/* 隐藏层 */}
      <text x="340" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">隐藏层</text>
      <circle cx="340" cy="110" r="20" fill="url(#rlc-nn-hidden)" opacity="0.85" />
      <text x="340" y="115" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">h0</text>
      <circle cx="340" cy="180" r="20" fill="url(#rlc-nn-hidden)" opacity="0.85" />
      <text x="340" y="185" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">h1</text>
      <circle cx="340" cy="250" r="20" fill="url(#rlc-nn-hidden)" opacity="0.85" />
      <text x="340" y="255" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">h2</text>

      {/* 输出层 */}
      <text x="560" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">输出层</text>
      <circle cx="560" cy="140" r="20" fill="url(#rlc-nn-output)" opacity="0.85" />
      <text x="560" y="145" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">y0</text>
      <circle cx="560" cy="220" r="20" fill="url(#rlc-nn-output)" opacity="0.85" />
      <text x="560" y="225" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">y1</text>

      {/* 连接线 */}
      <g stroke="#94a3b8" strokeWidth="1" opacity="0.6">
        <line x1="140" y1="140" x2="320" y2="110" />
        <line x1="140" y1="140" x2="320" y2="180" />
        <line x1="140" y1="140" x2="320" y2="250" />
        <line x1="140" y1="220" x2="320" y2="110" />
        <line x1="140" y1="220" x2="320" y2="180" />
        <line x1="140" y1="220" x2="320" y2="250" />
        <line x1="360" y1="110" x2="540" y2="140" />
        <line x1="360" y1="110" x2="540" y2="220" />
        <line x1="360" y1="180" x2="540" y2="140" />
        <line x1="360" y1="180" x2="540" y2="220" />
        <line x1="360" y1="250" x2="540" y2="140" />
        <line x1="360" y1="250" x2="540" y2="220" />
      </g>

      {/* 前向传播公式 */}
      <text x="200" y="310" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">前向传播</text>
      <rect x="60" y="322" width="280" height="100" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="346" textAnchor="middle" fontSize="11" fill="#1e40af" fontFamily="monospace">z = W·x + b</text>
      <text x="200" y="368" textAnchor="middle" fontSize="11" fill="#1e40af" fontFamily="monospace">a = sigmoid(z) 或 relu(z)</text>
      <text x="200" y="390" textAnchor="middle" fontSize="11" fill="#1e40af" fontFamily="monospace">逐层计算: h → h → ... → y</text>
      <text x="200" y="412" textAnchor="middle" fontSize="10" fill="#64748b">C中用二维数组存储权重矩阵</text>

      {/* C语言数据结构 */}
      <text x="560" y="310" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">C语言数据结构</text>
      <rect x="420" y="322" width="280" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="346" fontSize="11" fill="#475569" fontFamily="monospace">typedef struct {</text>
      <text x="450" y="364" fontSize="11" fill="#1e40af" fontFamily="monospace">double W[LAYER][NEURON][NEURON];</text>
      <text x="450" y="382" fontSize="11" fill="#1e40af" fontFamily="monospace">double b[LAYER][NEURON];</text>
      <text x="450" y="400" fontSize="11" fill="#1e40af" fontFamily="monospace">double a[LAYER][NEURON];</text>
      <text x="440" y="418" fontSize="11" fill="#475569" fontFamily="monospace">} NeuralNetwork;</text>

      {/* 激活函数 */}
      <text x="400" y="456" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常用激活函数（C语言实现）</text>

      <rect x="60" y="470" width="220" height="56" rx="8" fill="url(#rlc-nn-input)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="170" y="492" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Sigmoid</text>
      <text x="170" y="512" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">1.0 / (1.0 + exp(-x))</text>

      <rect x="290" y="470" width="220" height="56" rx="8" fill="url(#rlc-nn-hidden)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">ReLU</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">x &gt; 0 ? x : 0</text>

      <rect x="520" y="470" width="220" height="56" rx="8" fill="url(#rlc-nn-output)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="630" y="492" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">Tanh</text>
      <text x="630" y="512" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">tanh(x)</text>

      {/* 前向传播代码 */}
      <rect x="60" y="540" width="680" height="44" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="562" fontSize="11" fill="#475569" fontFamily="monospace">for (int j = 0; j &lt; n_out; j++) {</text>
      <text x="80" y="578" fontSize="11" fill="#475569" fontFamily="monospace">  z = b[j]; for (int i = 0; i &lt; n_in; i++) z += W[j][i] * a[i];  a_out[j] = sigmoid(z); }</text>
    </svg>
  );
}
