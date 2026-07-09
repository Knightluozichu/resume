"use client";

export function PrlKernelMethodsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="核方法与高斯过程">
      <defs>
        <linearGradient id="prl-km-dual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-km-kernel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-km-gp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-km-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">核方法：从对偶表示到高斯过程</text>

      {/* 对偶表示 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">对偶表示：权重用训练样本表示</text>

      <rect x="40" y="78" width="345" height="100" rx="10" fill="url(#prl-km-dual)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="100" fontSize="11" fontWeight="700" fill="#1e40af">原始（ primal ）表示</text>
      <text x="60" y="120" fontSize="10" fill="#1e40af">y(x) = wᵀφ(x) = Σ w_j φ_j(x)</text>
      <text x="60" y="138" fontSize="10" fill="#1e40af">参数维度 = 特征空间维度 M</text>
      <text x="60" y="156" fontSize="10" fill="#1e40af">w = (ΦᵀΦ + λI)⁻¹Φᵀt</text>
      <text x="60" y="172" fontSize="10" fill="#1e40af">特征空间大时计算昂贵</text>

      <path d="M385 128 L420 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-km-arrow)" />

      <rect x="420" y="78" width="345" height="100" rx="10" fill="url(#prl-km-dual)" opacity="0.18" stroke="#2563eb" strokeWidth="2" />
      <text x="440" y="100" fontSize="11" fontWeight="700" fill="#1e40af">对偶（ dual ）表示</text>
      <text x="440" y="120" fontSize="10" fill="#1e40af">y(x) = Σ a_n k(x_n, x)</text>
      <text x="440" y="138" fontSize="10" fill="#1e40af">参数维度 = 训练样本数 N</text>
      <text x="440" y="156" fontSize="10" fill="#1e40af">a = (K + λI)⁻¹t</text>
      <text x="440" y="172" fontSize="10" fill="#1e40af">只需核函数，无需显式特征</text>

      {/* 核函数 */}
      <text x="400" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核函数：隐式的高维特征映射</text>

      <rect x="40" y="220" width="345" height="56" rx="8" fill="url(#prl-km-kernel)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="240" fontSize="10" fontWeight="700" fill="#5b21b6">核技巧 k(x, x') = φ(x)ᵀφ(x')</text>
      <text x="60" y="258" fontSize="9" fill="#5b21b6">直接计算内积，不显式构造 φ(x) → 无限维也可</text>
      <text x="60" y="270" fontSize="9" fill="#5b21b6">Mercer 定理：半正定对称即可作为核</text>

      <rect x="395" y="220" width="365" height="56" rx="8" fill="url(#prl-km-kernel)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="415" y="240" fontSize="10" fontWeight="700" fill="#5b21b6">常用核函数</text>
      <text x="415" y="258" fontSize="9" fill="#5b21b6">线性核 k=xᵀx' · 多项式核 k=(xᵀx'+c)^d</text>
      <text x="415" y="270" fontSize="9" fill="#5b21b6">高斯核 k=exp(-‖x-x'‖²/2σ²) · 核组合律</text>

      {/* 高斯过程 */}
      <text x="400" y="306" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">高斯过程（GP）：贝叶斯核方法</text>

      <rect x="40" y="320" width="225" height="100" rx="8" fill="url(#prl-km-gp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="152" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">先验：函数分布</text>
      <text x="152" y="360" textAnchor="middle" fontSize="9" fill="#065f46">p(y) = N(0, K)</text>
      <text x="152" y="378" textAnchor="middle" fontSize="9" fill="#065f46">核函数定义函数先验</text>
      <text x="152" y="394" textAnchor="middle" fontSize="9" fill="#065f46">协方差矩阵 K_nk=k(x_n,x_k)</text>
      <text x="152" y="410" textAnchor="middle" fontSize="9" fill="#065f46">无需指定参数数量</text>

      <path d="M265 370 L288 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-km-arrow)" />

      <rect x="288" y="320" width="225" height="100" rx="8" fill="url(#prl-km-gp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">后验：观测数据后</text>
      <text x="400" y="360" textAnchor="middle" fontSize="9" fill="#065f46">p(y*|D) = N(m*, s*²)</text>
      <text x="400" y="378" textAnchor="middle" fontSize="9" fill="#065f46">m* = k*ᵀ(K+σ²I)⁻¹y</text>
      <text x="400" y="394" textAnchor="middle" fontSize="9" fill="#065f46">s*² = k(x*,x*) - k*ᵀ(...)</text>
      <text x="400" y="410" textAnchor="middle" fontSize="9" fill="#065f46">均值+方差=预测+不确定度</text>

      <path d="M513 370 L535 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-km-arrow)" />

      <rect x="535" y="320" width="225" height="100" rx="8" fill="url(#prl-km-gp)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="647" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">超参学习</text>
      <text x="647" y="360" textAnchor="middle" fontSize="9" fill="#065f46">最大化边际似然</text>
      <text x="647" y="378" textAnchor="middle" fontSize="9" fill="#065f46">ln p(y|X) 优化核参数</text>
      <text x="647" y="394" textAnchor="middle" fontSize="9" fill="#065f46">自动平衡拟合与平滑</text>
      <text x="647" y="410" textAnchor="middle" fontSize="9" fill="#065f46">证据框架自动选模型</text>

      {/* 底部 */}
      <rect x="40" y="440" width="720" height="90" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">核方法统一视角</text>
      <text x="400" y="480" textAnchor="middle" fontSize="10" fill="#64748b">线性回归 → 对偶表示 → 核技巧（隐式高维映射） → 高斯过程（贝叶斯化核方法）</text>
      <text x="400" y="496" textAnchor="middle" fontSize="10" fill="#64748b">关键洞察：核函数定义相似性度量，对偶表示让复杂度依赖样本数而非特征维度</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#64748b">高斯过程 = 核方法 + 贝叶斯推断 → 预测自带不确定度，自动控制复杂度</text>
    </svg>
  );
}
