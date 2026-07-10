"use client";

export function PrlProbabilityTheoryDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="概率论基础与贝叶斯推断">
      <defs>
        <linearGradient id="prl-pt-prior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-pt-lik" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prl-pt-post" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">贝叶斯推断：从先验到后验</text>

      {/* 贝叶斯定理三要素 */}
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">贝叶斯定理的三要素</text>

      {/* 先验 */}
      <rect x="40" y="80" width="220" height="70" rx="10" fill="url(#prl-pt-prior)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="150" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">先验 p(θ)</text>
      <text x="150" y="124" textAnchor="middle" fontSize="10" fill="#1e40af">观测数据前对参数的知识</text>
      <text x="150" y="140" textAnchor="middle" fontSize="10" fill="#1e40af">如：均匀分布 / 高斯分布</text>

      {/* 似然 */}
      <rect x="290" y="80" width="220" height="70" rx="10" fill="url(#prl-pt-lik)" opacity="0.15" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">似然 p(D|θ)</text>
      <text x="400" y="124" textAnchor="middle" fontSize="10" fill="#92400e">数据在参数下的概率</text>
      <text x="400" y="140" textAnchor="middle" fontSize="10" fill="#92400e">模型对数据的解释力</text>

      {/* 后验 */}
      <rect x="540" y="80" width="220" height="70" rx="10" fill="url(#prl-pt-post)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="650" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">后验 p(θ|D)</text>
      <text x="650" y="124" textAnchor="middle" fontSize="10" fill="#065f46">观测数据后的更新知识</text>
      <text x="650" y="140" textAnchor="middle" fontSize="10" fill="#065f46">先验 × 似然 / 证据</text>

      {/* 箭头 */}
      <path d="M260 115 L290 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-pt-arrow)" />
      <path d="M510 115 L540 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-pt-arrow)" />

      {/* 贝叶斯公式 */}
      <rect x="180" y="168" width="440" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="189" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">p(θ|D) = p(D|θ) · p(θ) / p(D)</text>

      {/* 频率派 vs 贝叶斯派 */}
      <text x="400" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">频率派 vs 贝叶斯派</text>

      <rect x="40" y="240" width="350" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">频率派（MLE）</text>
      <text x="60" y="284" fontSize="10" fill="#92400e">参数 θ 是固定但未知的常量</text>
      <text x="60" y="302" fontSize="10" fill="#92400e">用最大似然估计 θ = argmax p(D|θ)</text>
      <text x="60" y="320" fontSize="10" fill="#92400e">无先验，依赖大样本渐近性质</text>

      <rect x="410" y="240" width="350" height="100" rx="10" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">贝叶斯派（MAP / 后验）</text>
      <text x="430" y="284" fontSize="10" fill="#065f46">参数 θ 是随机变量，有分布</text>
      <text x="430" y="302" fontSize="10" fill="#065f46">用后验 p(θ|D) 做推断与预测</text>
      <text x="430" y="320" fontSize="10" fill="#065f46">融入先验知识，小样本也可用</text>

      {/* 常见分布 */}
      <text x="400" y="368" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">PRML 核心概率分布</text>

      <rect x="40" y="382" width="170" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">高斯分布</text>
      <text x="125" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">N(μ, σ²) 连续建模主力</text>
      <text x="125" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">共轭先验 / 边缘化</text>

      <rect x="220" y="382" width="170" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="305" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">伯努利分布</text>
      <text x="305" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">Bern(μ) 二分类基础</text>
      <text x="305" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">Beta 共轭先验</text>

      <rect x="400" y="382" width="170" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="485" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">多项式分布</text>
      <text x="485" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">Multi(μ) 多分类</text>
      <text x="485" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">Dirichlet 共轭先验</text>

      <rect x="580" y="382" width="180" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="670" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">指数族分布</text>
      <text x="670" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">统一框架 p(x|η)=h(x)g(η)e^&#123;ηᵀu&#125;</text>
      <text x="670" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">充分统计量 / 共轭</text>

      {/* 底部 */}
      <rect x="40" y="460" width="720" height="60" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">PRML 核心理念：一切皆概率</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#64748b">用概率分布建模不确定性，用贝叶斯定理更新认知，用期望损失做决策</text>
      <text x="400" y="514" textAnchor="middle" fontSize="10" fill="#64748b">预测 = 后验对似然加权积分（边际化）</text>
    </svg>
  );
}
