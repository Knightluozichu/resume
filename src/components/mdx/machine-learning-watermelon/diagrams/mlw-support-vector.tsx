"use client";

export function MlwSupportVectorDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="支持向量机示意图">
      <defs>
        <linearGradient id="mlw-svm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-svm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-svm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-svm-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-svm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">支持向量机：从间隔到核技巧</text>

      {/* 顶部：最大间隔示意 */}
      <text x="400" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">最大间隔分离超平面</text>

      <rect x="250" y="70" width="300" height="36" rx="8" fill="url(#mlw-svm-blue)" opacity="0.95" />
      <text x="400" y="93" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">超平面 w^T x + b = 0</text>

      {/* 左侧：硬间隔与软间隔 */}
      <text x="160" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">间隔类型</text>

      <rect x="40" y="144" width="240" height="56" rx="8" fill="url(#mlw-svm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">硬间隔 SVM</text>
      <text x="160" y="184" textAnchor="middle" fontSize="10" fill="#3b82f6">要求所有样本严格分类正确</text>

      <rect x="40" y="210" width="240" height="56" rx="8" fill="url(#mlw-svm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="160" y="232" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">软间隔 SVM</text>
      <text x="160" y="250" textAnchor="middle" fontSize="10" fill="#8b5cf6">允许部分样本违反间隔，引入松弛变量 ξ</text>

      <rect x="40" y="276" width="240" height="56" rx="8" fill="url(#mlw-svm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="160" y="298" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">支持向量</text>
      <text x="160" y="316" textAnchor="middle" fontSize="10" fill="#10b981">距离超平面最近的样本点，决定间隔</text>

      {/* 中间：优化问题 */}
      <text x="400" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">优化问题推导</text>

      <rect x="280" y="144" width="240" height="44" rx="8" fill="url(#mlw-svm-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="164" textAnchor="middle" fontSize="10" fill="#92400e">原始问题：</text>
      <text x="400" y="180" textAnchor="middle" fontSize="10" fill="#b45309">min 1/2 ||w||² s.t. yi(w^T xi+b) ≥ 1</text>

      <rect x="280" y="196" width="240" height="44" rx="8" fill="url(#mlw-svm-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="216" textAnchor="middle" fontSize="10" fill="#92400e">拉格朗日对偶：</text>
      <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#b45309">max Σαi - 1/2 Σαiαjyiyj xi^T xj</text>

      <rect x="280" y="248" width="240" height="44" rx="8" fill="url(#mlw-svm-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="268" textAnchor="middle" fontSize="10" fill="#92400e">KKT 条件：</text>
      <text x="400" y="284" textAnchor="middle" fontSize="10" fill="#b45309">w = Σαi yi xi, 仅 αi &gt; 0 为支持向量</text>

      <rect x="280" y="300" width="240" height="32" rx="8" fill="url(#mlw-svm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="321" textAnchor="middle" fontSize="10" fill="#1e40af">软间隔：引入 C 控制惩罚力度</text>

      {/* 右侧：核技巧 */}
      <text x="640" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核技巧</text>

      <rect x="520" y="144" width="200" height="56" rx="8" fill="url(#mlw-svm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="620" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心思想</text>
      <text x="620" y="184" textAnchor="middle" fontSize="10" fill="#8b5cf6">将数据映射到高维空间使其线性可分</text>

      <rect x="520" y="210" width="200" height="44" rx="8" fill="url(#mlw-svm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="620" y="230" textAnchor="middle" fontSize="10" fill="#5b21b6">核函数 K(xi,xj) = φ(xi)^T φ(xj)</text>
      <text x="620" y="246" textAnchor="middle" fontSize="10" fill="#8b5cf6">无需显式计算 φ(·)</text>

      <rect x="520" y="262" width="200" height="44" rx="8" fill="url(#mlw-svm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="282" textAnchor="middle" fontSize="10" fill="#065f46">高斯核 RBF：</text>
      <text x="620" y="298" textAnchor="middle" fontSize="10" fill="#10b981">K(x,z) = exp(-||x-z||²/2σ²)</text>

      <rect x="520" y="314" width="200" height="32" rx="8" fill="url(#mlw-svm-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="335" textAnchor="middle" fontSize="10" fill="#92400e">线性核 / 多项式核 / 拉普拉斯核</text>

      {/* 底部：支持向量回归 */}
      <rect x="40" y="368" width="720" height="72" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="391" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">支持向量回归（SVR）</text>
      <text x="400" y="413" textAnchor="middle" fontSize="11" fill="#15803d">引入 ε 不敏感损失带：仅当 |f(x)-y| &gt; ε 时才计算损失</text>
      <text x="400" y="431" textAnchor="middle" fontSize="11" fill="#15803d">min 1/2||w||² + C Σ(ξi + ξi*)，SVM 从分类推广到回归</text>

      {/* 底部：核函数特性 */}
      <rect x="40" y="456" width="720" height="48" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="476" textAnchor="middle" fontSize="11" fill="#92400e">Mercer 定理：函数是有效核当且仅当其核矩阵半正定</text>
      <text x="400" y="494" textAnchor="middle" fontSize="11" fill="#b45309">表示定理：SVM 的解总可表示为训练样本的线性组合（核方法通用性质）</text>

      {/* 底部说明 */}
      <rect x="40" y="520" width="720" height="40" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="545" textAnchor="middle" fontSize="11" fill="#475569">SVM 三大优势：最大间隔提升泛化 → 核技巧处理非线性 → 凸优化保证全局最优</text>
    </svg>
  );
}
