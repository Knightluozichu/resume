"use client";

export function DlsLearningTechniquesDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="神经网络学习技巧全景">
      <defs>
        <linearGradient id="dls-lt-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-lt-init" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-lt-norm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dls-lt-reg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="dls-lt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">神经网络学习技巧四大支柱</text>

      {/* 优化器对比 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">优化器对比</text>

      <rect x="60" y="84" width="280" height="40" rx="8" fill="url(#dls-lt-opt)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="108" fontSize="11" fontWeight="600" fill="#1e40af">SGD</text>
      <text x="130" y="108" fontSize="10" fill="#475569">W ← W - η·∂L/∂W</text>

      <rect x="60" y="130" width="280" height="40" rx="8" fill="url(#dls-lt-opt)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="154" fontSize="11" fontWeight="600" fill="#1e40af">Momentum</text>
      <text x="160" y="154" fontSize="10" fill="#475569">加入动量加速收敛</text>

      <rect x="60" y="176" width="280" height="40" rx="8" fill="url(#dls-lt-opt)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="200" fontSize="11" fontWeight="600" fill="#1e40af">AdaGrad</text>
      <text x="150" y="200" fontSize="10" fill="#475569">自适应学习率（逐参数）</text>

      <rect x="60" y="222" width="280" height="40" rx="8" fill="url(#dls-lt-opt)" opacity="0.18" stroke="#2563eb" strokeWidth="2" />
      <text x="80" y="246" fontSize="11" fontWeight="600" fill="#1e40af">Adam</text>
      <text x="130" y="246" fontSize="10" fill="#475569">Momentum + AdaGrad 融合</text>

      <text x="200" y="286" textAnchor="middle" fontSize="10" fill="#92400e">各方向梯度差异大时 SGD 走「之」字，Adam 更优</text>

      {/* 权重初始化 */}
      <text x="620" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">权重初始化</text>

      <rect x="480" y="84" width="280" height="40" rx="8" fill="url(#dls-lt-init)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="108" fontSize="11" fontWeight="600" fill="#5b21b6">Xavier 初始化</text>
      <text x="590" y="108" fontSize="10" fill="#475569">sigmoid / tanh</text>

      <rect x="480" y="130" width="280" height="40" rx="8" fill="url(#dls-lt-init)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="154" fontSize="11" fontWeight="600" fill="#5b21b6">He 初始化</text>
      <text x="560" y="154" fontSize="10" fill="#475569">ReLU 专用</text>

      <rect x="480" y="176" width="280" height="50" rx="8" fill="#7c3aed" opacity="0.06" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="620" y="198" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">初始化影响激活值分布</text>
      <text x="620" y="216" textAnchor="middle" fontSize="9" fill="#475569">太好 → 梯度消失 / 太差 → 表现力受限</text>

      <rect x="480" y="236" width="280" height="50" rx="8" fill="#ef4444" opacity="0.06" stroke="#ef4444" strokeWidth="1.5" />
      <text x="620" y="258" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">禁用：全部初始化为 0</text>
      <text x="620" y="276" textAnchor="middle" fontSize="9" fill="#475569">所有神经元学到相同特征（对称性问题）</text>

      {/* BatchNorm */}
      <text x="200" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Batch Normalization</text>

      <rect x="60" y="332" width="280" height="50" rx="8" fill="url(#dls-lt-norm)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="352" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">对每层输入做标准化</text>
      <text x="200" y="370" textAnchor="middle" fontSize="10" fill="#475569">μ=0, σ=1 → 可学习 γ, β 缩放偏移</text>

      <rect x="60" y="392" width="280" height="50" rx="8" fill="url(#dls-lt-norm)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">效果：加速学习 + 抑制过拟合</text>
      <text x="200" y="430" textAnchor="middle" fontSize="10" fill="#475569">降低对初始化的依赖</text>

      {/* 正则化 */}
      <text x="620" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">正则化与过拟合对策</text>

      <rect x="480" y="332" width="280" height="50" rx="8" fill="url(#dls-lt-reg)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="620" y="352" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">L2 权重衰减</text>
      <text x="620" y="370" textAnchor="middle" fontSize="10" fill="#475569">损失加 ½λ·||W||²，抑制大权重</text>

      <rect x="480" y="392" width="280" height="50" rx="8" fill="url(#dls-lt-reg)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="620" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">Dropout</text>
      <text x="620" y="430" textAnchor="middle" fontSize="10" fill="#475569">训练时随机丢弃神经元，每次学不同子网</text>

      {/* 底部 */}
      <rect x="60" y="460" width="700" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="484" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">学习技巧 = 让网络学得更快（优化器）+ 学得更稳（初始化+BN）+ 学得更泛（正则化）</text>
      <text x="410" y="504" textAnchor="middle" fontSize="11" fill="#475569">超参数（学习率、权重衰减系数、Dropout比率）需通过验证集调参确定</text>
    </svg>
  );
}
