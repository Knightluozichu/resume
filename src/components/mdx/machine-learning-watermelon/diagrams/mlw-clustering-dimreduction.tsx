"use client";

export function MlwClusteringDimreductionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="聚类与降维示意图">
      <defs>
        <linearGradient id="mlw-cl-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-cl-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-cl-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-cl-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-cl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">聚类与降维：无监督学习两大任务</text>

      {/* 左侧：聚类算法 */}
      <text x="160" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">聚类算法</text>

      <rect x="40" y="74" width="240" height="56" rx="8" fill="url(#mlw-cl-blue)" opacity="0.95" />
      <text x="160" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">原型聚类</text>
      <text x="160" y="114" textAnchor="middle" fontSize="10" fill="#bfdbfe">K-Means / 学习向量量化 LVQ</text>
      <text x="160" y="128" textAnchor="middle" fontSize="10" fill="#bfdbfe">高斯混合聚类 GMM</text>

      <path d="M160 130 L160 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="40" y="140" width="240" height="48" rx="8" fill="url(#mlw-cl-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">K-Means 核心</text>
      <text x="160" y="176" textAnchor="middle" fontSize="10" fill="#3b82f6">min Σ Σ ||x-μi||²</text>
      <text x="160" y="190" textAnchor="middle" fontSize="10" fill="#3b82f6">分配 → 更新均值 → 迭代</text>

      <path d="M160 188 L160 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="40" y="198" width="240" height="56" rx="8" fill="url(#mlw-cl-purple)" opacity="0.95" />
      <text x="160" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">层次聚类</text>
      <text x="160" y="238" textAnchor="middle" fontSize="10" fill="#e9d5ff">AGNES（自底向上聚合）</text>
      <text x="160" y="252" textAnchor="middle" fontSize="10" fill="#e9d5ff">DIANA（自顶向下分裂）</text>

      <path d="M160 254 L160 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="40" y="264" width="240" height="48" rx="8" fill="url(#mlw-cl-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="160" y="284" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">距离度量</text>
      <text x="160" y="300" textAnchor="middle" fontSize="10" fill="#8b5cf6">最小距离 / 最大距离 / 平均距离</text>

      <rect x="40" y="322" width="240" height="48" rx="8" fill="url(#mlw-cl-green)" opacity="0.95" />
      <text x="160" y="344" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">密度聚类 DBSCAN</text>
      <text x="160" y="362" textAnchor="middle" fontSize="10" fill="#cffafe">基于密度可达，可发现任意形状簇</text>

      {/* 右侧：降维方法 */}
      <text x="620" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">降维方法</text>

      <rect x="460" y="74" width="300" height="56" rx="8" fill="url(#mlw-cl-amber)" opacity="0.95" />
      <text x="610" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">主成分分析 PCA</text>
      <text x="610" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">最大化投影方差 / 最小化重构误差</text>
      <text x="610" y="128" textAnchor="middle" fontSize="10" fill="#fef3c7">协方差矩阵特征值分解</text>

      <path d="M610 130 L610 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="460" y="140" width="300" height="48" rx="8" fill="url(#mlw-cl-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="610" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">PCA 步骤</text>
      <text x="610" y="176" textAnchor="middle" fontSize="10" fill="#d97706">中心化 → 协方差矩阵 → 特征值排序 → 取前 d' 维</text>

      <path d="M610 188 L610 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="460" y="198" width="300" height="56" rx="8" fill="url(#mlw-cl-green)" opacity="0.95" />
      <text x="610" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">核化线性降维 KPCA</text>
      <text x="610" y="238" textAnchor="middle" fontSize="10" fill="#cffafe">用核技巧将线性 PCA 推广到非线性</text>
      <text x="610" y="252" textAnchor="middle" fontSize="10" fill="#cffafe">与 SVM 核技巧思路一致</text>

      <path d="M610 254 L610 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-cl-arrow)" />

      <rect x="460" y="264" width="300" height="56" rx="8" fill="url(#mlw-cl-purple)" opacity="0.95" />
      <text x="610" y="286" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">流形学习</text>
      <text x="610" y="304" textAnchor="middle" fontSize="10" fill="#e9d5ff">MDS / Isomap / LLE / t-SNE</text>
      <text x="610" y="318" textAnchor="middle" fontSize="10" fill="#e9d5ff">保持局部邻域结构降维</text>

      <rect x="460" y="330" width="300" height="40" rx="8" fill="url(#mlw-cl-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="610" y="355" textAnchor="middle" fontSize="10" fill="#1e40af">度量学习：学习马氏距离 w^T w 替代欧氏距离</text>

      {/* 底部：性能度量 */}
      <rect x="40" y="390" width="360" height="56" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="220" y="412" textAnchor="middle" fontSize="12" fontWeight="700" fill="#166534">聚类性能度量</text>
      <text x="220" y="430" textAnchor="middle" fontSize="10" fill="#15803d">外部指标：RI / Jaccard / FM / F1（与参考模型对比）</text>
      <text x="220" y="446" textAnchor="middle" fontSize="10" fill="#15803d">内部指标：DBI / Dunn（簇内密 / 簇间疏）</text>

      <rect x="420" y="390" width="340" height="56" rx="10" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="590" y="412" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">降维本质</text>
      <text x="590" y="430" textAnchor="middle" fontSize="10" fill="#b45309">高维数据 → 低维表示，保留主要信息</text>
      <text x="590" y="446" textAnchor="middle" fontSize="10" fill="#b45309">缓解维度灾难，可视化，去噪，特征提取</text>

      {/* 底部说明 */}
      <rect x="40" y="466" width="720" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">聚类目标：将样本分成若干组，组内相似、组间相异（无标签）</text>
      <text x="400" y="508" textAnchor="middle" fontSize="11" fill="#475569">降维目标：从高维空间映射到低维空间，保留数据本质结构</text>
      <text x="400" y="526" textAnchor="middle" fontSize="11" fill="#94a3b8">两者都是无监督学习的核心任务，常配合使用：先降维再聚类</text>
    </svg>
  );
}
