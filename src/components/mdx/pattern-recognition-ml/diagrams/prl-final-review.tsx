"use client";

export function PrlFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="PRML全书复习与知识整合">
      <defs>
        <linearGradient id="prl-fr-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-fr-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prl-fr-uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合：贝叶斯统一视角</text>

      {/* 三层架构 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三层知识架构</text>

      {/* 第一层：概率与推断基础 */}
      <rect x="40" y="78" width="720" height="50" rx="10" fill="url(#prl-fr-fund)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="98" fontSize="11" fontWeight="700" fill="#1e40af">第一层 · 概率与推断基础</text>
      <text x="60" y="116" fontSize="10" fill="#1e40af">ch1 概率论(贝叶斯定理/分布/共轭先验) · 决策论(期望损失/拒绝选项)</text>

      <path d="M400 128 L400 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-fr-arrow)" />

      {/* 第二层：线性模型与神经网络 */}
      <rect x="40" y="138" width="720" height="50" rx="10" fill="url(#prl-fr-linear)" opacity="0.15" stroke="#7c3aed" strokeWidth="2" />
      <text x="60" y="158" fontSize="11" fontWeight="700" fill="#5b21b6">第二层 · 线性模型与神经网络</text>
      <text x="60" y="176" fontSize="10" fill="#5b21b6">ch2 回归(基函数/MLE→MAP→贝叶斯) · ch3 分类(逻辑回归/生成模型) · ch4 神经网络(反向传播/正则化)</text>

      <path d="M400 188 L400 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-fr-arrow)" />

      {/* 第三层：核方法与高级模型 */}
      <rect x="40" y="198" width="720" height="50" rx="10" fill="url(#prl-fr-adv)" opacity="0.15" stroke="#f59e0b" strokeWidth="2" />
      <text x="60" y="218" fontSize="11" fontWeight="700" fill="#92400e">第三层 · 核方法与高级模型</text>
      <text x="60" y="236" fontSize="10" fill="#92400e">ch5 核方法(对偶/高斯过程) · ch6 稀疏核(SVM) · ch7 图模型(贝叶斯网络/MRF) · ch8 混合EM(GMM/EM/变分)</text>

      {/* 贝叶斯统一公式 */}
      <rect x="40" y="268" width="720" height="50" rx="10" fill="url(#prl-fr-uni)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">PRML = 概率建模 + 贝叶斯推断 + 决策论</text>
      <text x="400" y="308" textAnchor="middle" fontSize="10" fill="#059669">一切皆分布 · 先验+似然→后验→预测 · 期望损失最小化做决策</text>

      {/* 核心公式串联 */}
      <text x="400" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">核心公式串联</text>

      <rect x="40" y="356" width="225" height="30" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="152" y="375" textAnchor="middle" fontSize="9" fill="#1e40af">p(θ|D)=p(D|θ)p(θ)/p(D) (ch1)</text>

      <rect x="275" y="356" width="225" height="30" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="387" y="375" textAnchor="middle" fontSize="9" fill="#5b21b6">w_MAP=(ΦᵀΦ+λI)⁻¹Φᵀt (ch2)</text>

      <rect x="510" y="356" width="250" height="30" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="635" y="375" textAnchor="middle" fontSize="9" fill="#5b21b6">σ(a)=1/(1+e^&#123;-a&#125;) (ch3 逻辑回归)</text>

      <rect x="40" y="392" width="225" height="30" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="152" y="411" textAnchor="middle" fontSize="9" fill="#5b21b6">δ_j=h'(a_j)Σw_kjδ_k (ch4 BP)</text>

      <rect x="275" y="392" width="225" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="387" y="411" textAnchor="middle" fontSize="9" fill="#92400e">k(x,x')=φ(x)ᵀφ(x') (ch5 核)</text>

      <rect x="510" y="392" width="250" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="635" y="411" textAnchor="middle" fontSize="9" fill="#92400e">max ½‖w‖² s.t. t_n(wᵀx+b)≥1 (ch6)</text>

      <rect x="40" y="428" width="345" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="212" y="447" textAnchor="middle" fontSize="9" fill="#92400e">p(x)=Πp(x_i|pa(x_i)) (ch7 贝叶斯网络)</text>

      <rect x="395" y="428" width="365" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="577" y="447" textAnchor="middle" fontSize="9" fill="#92400e">γ(z_nk)=π_kN(x_n|μ_k,Σ_k)/Σ_j... (ch8 EM)</text>

      {/* 统一视角 */}
      <text x="400" y="484" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">贝叶斯统一视角</text>

      <rect x="40" y="494" width="225" height="34" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="152" y="510" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">正则化 = 贝叶斯先验</text>
      <text x="152" y="522" textAnchor="middle" fontSize="8" fill="#64748b">L2=高斯先验 · L1=拉普拉斯先验</text>

      <rect x="275" y="494" width="225" height="34" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="387" y="510" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">EM = 变分推断特例</text>
      <text x="387" y="522" textAnchor="middle" fontSize="8" fill="#64748b">E步近似后验 · M步更新参数</text>

      <rect x="510" y="494" width="250" height="34" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="635" y="510" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">核方法 = 贝叶斯+对偶</text>
      <text x="635" y="522" textAnchor="middle" fontSize="8" fill="#64748b">高斯过程=核方法+贝叶斯推断</text>
    </svg>
  );
}
