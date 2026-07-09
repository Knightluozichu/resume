"use client";

export function DltFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="全书复习与知识整合图">
      <defs>
        <linearGradient id="dlt-fr-math" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-fr-theory" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-fr-prac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlt-fr-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlt-fr-uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlt-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合：从数学到研究前沿</text>

      {/* 三层架构 */}
      <text x="400" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三层知识架构</text>

      {/* 第一层：数学地基 */}
      <rect x="40" y="80" width="720" height="50" rx="10" fill="url(#dlt-fr-math)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="100" fontSize="11" fontWeight="700" fill="#1e40af">第一层 · 数学地基</text>
      <text x="60" y="118" fontSize="10" fill="#1e40af">ch1 线性代数(向量/矩阵/SVD/范数) · ch2 概率与信息论(贝叶斯/熵/KL散度)</text>

      <path d="M400 130 L400 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-fr-arrow)" />

      {/* 第二层：学习理论 */}
      <rect x="40" y="140" width="720" height="50" rx="10" fill="url(#dlt-fr-theory)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="60" y="160" fontSize="11" fontWeight="700" fill="#5b21b6">第二层 · 学习理论</text>
      <text x="60" y="178" fontSize="10" fill="#5b21b6">ch3 机器学习基础(假设空间/容量/偏差方差) · ch4 深度网络(前馈/激活/反向传播/万能逼近)</text>

      <path d="M400 190 L400 198" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-fr-arrow)" />

      {/* 第三层：工程实践与研究 */}
      <rect x="40" y="200" width="720" height="50" rx="10" fill="url(#dlt-fr-prac)" opacity="0.15" stroke="#f59e0b" strokeWidth="2" />
      <text x="60" y="220" fontSize="11" fontWeight="700" fill="#92400e">第三层 · 工程实践与研究</text>
      <text x="60" y="238" fontSize="10" fill="#92400e">ch5 正则化 · ch6 优化 · ch7 CNN/RNN · ch8 研究前沿(生成模型/表示学习/蒙特卡洛)</text>

      {/* 统一公式 */}
      <rect x="40" y="270" width="720" height="50" rx="10" fill="url(#dlt-fr-uni)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="400" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">深度学习 = 自动表示学习 + 端到端优化 + 大数据 + 算力</text>
      <text x="400" y="310" textAnchor="middle" fontSize="10" fill="#059669">数据 → 表示学习(多层非线性) → 任务头 → 预测 → 损失驱动优化(反向传播)</text>

      {/* 六个核心公式 */}
      <text x="400" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">六个核心公式串联</text>

      <rect x="40" y="356" width="225" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="152" y="375" textAnchor="middle" fontSize="9" fill="#1e40af">A = UΣVᵀ (ch1 SVD)</text>

      <rect x="275" y="356" width="225" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="387" y="375" textAnchor="middle" fontSize="9" fill="#1e40af">D_KL(P||Q) = ΣP log(P/Q) (ch2)</text>

      <rect x="510" y="356" width="250" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="635" y="375" textAnchor="middle" fontSize="9" fill="#1e40af">误差 = Bias² + Var + Noise (ch3)</text>

      <rect x="40" y="392" width="225" height="30" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="152" y="411" textAnchor="middle" fontSize="9" fill="#5b21b6">h = σ(W·h+b) (ch4 前馈)</text>

      <rect x="275" y="392" width="225" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="387" y="411" textAnchor="middle" fontSize="9" fill="#92400e">L_reg = L + λ||w||² (ch5 L2)</text>

      <rect x="510" y="392" width="250" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="635" y="411" textAnchor="middle" fontSize="9" fill="#92400e">θ ← θ - η·ŝ/(√r̂+ε) (ch6 Adam)</text>

      {/* 统一视角 */}
      <text x="400" y="450" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">统一视角</text>

      <rect x="40" y="460" width="225" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="152" y="476" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">交叉熵 = KL散度 = MLE</text>
      <text x="152" y="488" textAnchor="middle" fontSize="8" fill="#64748b">让模型分布逼近数据分布</text>

      <rect x="275" y="460" width="225" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="387" y="476" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">正则化 = 贝叶斯先验</text>
      <text x="387" y="488" textAnchor="middle" fontSize="8" fill="#64748b">L2=高斯 · L1=拉普拉斯</text>

      <rect x="510" y="460" width="250" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="635" y="476" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">SGD噪声 = 隐式正则化</text>
      <text x="635" y="488" textAnchor="middle" fontSize="8" fill="#64748b">找到平坦最小值→泛化好</text>

      {/* 底部 */}
      <rect x="40" y="510" width="720" height="36" rx="8" fill="url(#dlt-fr-front)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#991b1b">花书(2016) → 延伸：Transformer(2017) · 扩散模型(2020) · 大语言模型(GPT) · 多模态(CLIP)</text>
    </svg>
  );
}
