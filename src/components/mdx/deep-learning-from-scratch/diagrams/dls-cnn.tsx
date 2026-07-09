"use client";

export function DlsCnnDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="卷积神经网络结构与运算">
      <defs>
        <linearGradient id="dls-cnn-input" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-cnn-conv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-cnn-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dls-cnn-fc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dls-cnn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">CNN：卷积 + 池化 + 全连接</text>

      {/* 输入图像 */}
      <text x="90" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">输入</text>
      <rect x="50" y="90" width="80" height="80" rx="4" fill="url(#dls-cnn-input)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="134" textAnchor="middle" fontSize="10" fill="#1e40af">28×28×1</text>
      <text x="90" y="186" textAnchor="middle" fontSize="9" fill="#475569">H×W×C</text>

      <line x1="130" y1="130" x2="172" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      {/* 卷积层 */}
      <text x="230" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Conv</text>
      <rect x="180" y="90" width="70" height="80" rx="4" fill="url(#dls-cnn-conv)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="215" y="134" textAnchor="middle" fontSize="9" fill="#5b21b6">28×28</text>
      <text x="215" y="148" textAnchor="middle" fontSize="9" fill="#5b21b6">×16</text>
      <text x="215" y="186" textAnchor="middle" fontSize="9" fill="#475569">5×5滤波器</text>

      <line x1="250" y1="130" x2="292" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      {/* 池化层 */}
      <text x="330" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Pool</text>
      <rect x="290" y="100" width="60" height="60" rx="4" fill="url(#dls-cnn-pool)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="134" textAnchor="middle" fontSize="9" fill="#92400e">14×14</text>
      <text x="320" y="148" textAnchor="middle" fontSize="9" fill="#92400e">×16</text>
      <text x="320" y="186" textAnchor="middle" fontSize="9" fill="#475569">2×2 Max</text>

      <line x1="350" y1="130" x2="392" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      {/* Conv-Pool-Conv-Pool */}
      <text x="430" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Conv</text>
      <rect x="390" y="100" width="60" height="60" rx="4" fill="url(#dls-cnn-conv)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="420" y="134" textAnchor="middle" fontSize="9" fill="#5b21b6">14×14</text>
      <text x="420" y="148" textAnchor="middle" fontSize="9" fill="#5b21b6">×32</text>

      <line x1="450" y1="130" x2="472" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      <text x="500" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Pool</text>
      <rect x="470" y="108" width="50" height="44" rx="4" fill="url(#dls-cnn-pool)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="495" y="134" textAnchor="middle" fontSize="9" fill="#92400e">7×7</text>
      <text x="495" y="148" textAnchor="middle" fontSize="9" fill="#92400e">×32</text>

      <line x1="520" y1="130" x2="552" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      {/* 全连接 */}
      <text x="600" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">FC</text>
      <rect x="560" y="95" width="80" height="70" rx="4" fill="url(#dls-cnn-fc)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="124" textAnchor="middle" fontSize="10" fill="#065f46">展平</text>
      <text x="600" y="140" textAnchor="middle" fontSize="9" fill="#065f46">1568→</text>
      <text x="600" y="154" textAnchor="middle" fontSize="9" fill="#065468">softmax</text>

      <line x1="600" y1="165" x2="600" y2="192" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-cnn-arrow)" />

      <rect x="560" y="196" width="80" height="30" rx="4" fill="url(#dls-cnn-fc)" opacity="0.9" />
      <text x="600" y="216" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">10类输出</text>

      {/* 卷积运算细节 */}
      <rect x="40" y="250" width="350" height="120" rx="10" fill="#7c3aed" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="215" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">卷积运算</text>

      <rect x="60" y="284" width="80" height="80" rx="4" fill="#fff" stroke="#64748b" strokeWidth="1" />
      <text x="100" y="312" textAnchor="middle" fontSize="9" fill="#475569">输入区域</text>
      <text x="100" y="328" textAnchor="middle" fontSize="9" fill="#475569">3×3</text>

      <text x="160" y="328" textAnchor="middle" fontSize="14" fill="#7c3aed">⊗</text>

      <rect x="180" y="304" width="50" height="50" rx="4" fill="url(#dls-cnn-conv)" opacity="0.2" stroke="#7c3aed" strokeWidth="1" />
      <text x="205" y="328" textAnchor="middle" fontSize="9" fill="#5b21b6">滤波器</text>
      <text x="205" y="344" textAnchor="middle" fontSize="8" fill="#5b21b6">3×3</text>

      <text x="250" y="328" textAnchor="middle" fontSize="14" fill="#7c3aed">=</text>

      <circle cx="290" cy="324" r="16" fill="url(#dls-cnn-conv)" opacity="0.9" />
      <text x="290" y="328" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1</text>
      <text x="330" y="328" fontSize="9" fill="#475569">逐元素乘加</text>

      {/* im2col */}
      <rect x="410" y="250" width="350" height="120" rx="10" fill="#f59e0b" opacity="0.06" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="585" y="272" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">im2col 优化</text>

      <rect x="430" y="284" width="120" height="70" rx="4" fill="#fff" stroke="#64748b" strokeWidth="1" />
      <text x="490" y="306" textAnchor="middle" fontSize="9" fill="#475569">滑动窗口展开</text>
      <text x="490" y="322" textAnchor="middle" fontSize="9" fill="#475569">→ 大矩阵</text>
      <text x="490" y="340" textAnchor="middle" fontSize="8" fill="#92400e">(OH·OW, FN)</text>

      <text x="570" y="322" textAnchor="middle" fontSize="12" fill="#92400e">矩阵乘法</text>

      <rect x="620" y="284" width="120" height="70" rx="4" fill="#fff" stroke="#64748b" strokeWidth="1" />
      <text x="680" y="310" textAnchor="middle" fontSize="9" fill="#475569">利用 NumPy</text>
      <text x="680" y="326" textAnchor="middle" fontSize="9" fill="#475569">np.dot 高速</text>
      <text x="680" y="342" textAnchor="middle" fontSize="9" fill="#92400e">BLAS 加速</text>

      {/* 底部对比 */}
      <rect x="40" y="390" width="350" height="56" rx="10" fill="#2563eb" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">CNN vs 全连接</text>
      <text x="215" y="430" textAnchor="middle" fontSize="10" fill="#475569">参数共享 · 平移不变 · 保留空间结构</text>

      <rect x="410" y="390" width="350" height="56" rx="10" fill="#059669" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">池化层</text>
      <text x="585" y="430" textAnchor="middle" fontSize="10" fill="#475569">Max / Average · 缩小空间 · 无参数 · 无梯度更新</text>

      <rect x="40" y="460" width="720" height="56" rx="10" fill="url(#dls-cnn-conv)" opacity="0.95" />
      <text x="400" y="484" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">填充（padding）控制输出尺寸 · 步幅（stride）控制滑动间隔</text>
      <text x="400" y="504" textAnchor="middle" fontSize="11" fill="#e9d5ff">OH = (H + 2P - FH) / S + 1</text>
    </svg>
  );
}
