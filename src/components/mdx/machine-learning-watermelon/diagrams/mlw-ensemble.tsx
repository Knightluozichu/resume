"use client";

export function MlwEnsembleDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="集成学习示意图">
      <defs>
        <linearGradient id="mlw-en-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-en-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-en-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-en-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-en-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">集成学习：Boosting 与 Bagging</text>

      {/* 顶部：集成学习核心思想 */}
      <rect x="250" y="48" width="300" height="36" rx="8" fill="url(#mlw-en-blue)" opacity="0.95" />
      <text x="400" y="71" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">多个弱学习器 → 组合 → 强学习器</text>

      {/* 左侧：Boosting */}
      <text x="160" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Boosting（串行）</text>

      <rect x="40" y="122" width="240" height="40" rx="8" fill="url(#mlw-en-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="147" textAnchor="middle" fontSize="11" fill="#92400e">训练序列：h1 → h2 → ... → hT</text>

      <path d="M160 162 L160 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="40" y="172" width="240" height="40" rx="8" fill="url(#mlw-en-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="197" textAnchor="middle" fontSize="11" fill="#92400e">后一个关注前一个的错误样本</text>

      <path d="M160 212 L160 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="40" y="222" width="240" height="40" rx="8" fill="url(#mlw-en-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="247" textAnchor="middle" fontSize="11" fill="#92400e">加权重采样 / 加权训练</text>

      <path d="M160 262 L160 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="40" y="272" width="240" height="56" rx="8" fill="url(#mlw-en-amber)" opacity="0.95" />
      <text x="160" y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">AdaBoost 算法</text>
      <text x="160" y="312" textAnchor="middle" fontSize="10" fill="#fef3c7">H(x) = sign(Σ αt ht(x))</text>

      <rect x="40" y="338" width="240" height="56" rx="8" fill="url(#mlw-en-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Boosting Tree / GBDT</text>
      <text x="160" y="378" textAnchor="middle" fontSize="10" fill="#d97706">拟合残差（梯度方向）逐步提升</text>

      {/* 中间：Bagging */}
      <text x="400" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Bagging（并行）</text>

      <rect x="280" y="122" width="240" height="40" rx="8" fill="url(#mlw-en-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="147" textAnchor="middle" fontSize="11" fill="#5b21b6">自助采样（Bootstrap）生成 T 个子集</text>

      <path d="M400 162 L400 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="280" y="172" width="240" height="40" rx="8" fill="url(#mlw-en-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="197" textAnchor="middle" fontSize="11" fill="#5b21b6">每个子集独立训练一个基学习器</text>

      <path d="M400 212 L400 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="280" y="222" width="240" height="40" rx="8" fill="url(#mlw-en-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="247" textAnchor="middle" fontSize="11" fill="#5b21b6">投票（分类）/ 平均（回归）</text>

      <path d="M400 262 L400 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-en-arrow)" />

      <rect x="280" y="272" width="240" height="56" rx="8" fill="url(#mlw-en-purple)" opacity="0.95" />
      <text x="400" y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">随机森林（RF）</text>
      <text x="400" y="312" textAnchor="middle" fontSize="10" fill="#e9d5ff">Bagging + 属性随机选择</text>

      <rect x="280" y="338" width="240" height="56" rx="8" fill="url(#mlw-en-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">包外估计（OOB）</text>
      <text x="400" y="378" textAnchor="middle" fontSize="10" fill="#8b5cf6">未被采样的样本用于验证，无需划分验证集</text>

      {/* 右侧：组合策略与多样性 */}
      <text x="620" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">组合策略 & 多样性</text>

      <rect x="520" y="122" width="200" height="40" rx="8" fill="url(#mlw-en-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="147" textAnchor="middle" fontSize="10" fill="#065f46">平均法 / 投票法 / 学习法（Stacking）</text>

      <rect x="520" y="172" width="200" height="40" rx="8" fill="url(#mlw-en-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="197" textAnchor="middle" fontSize="10" fill="#065f46">多样性度量：不合度量 / 相关系数</text>

      <rect x="520" y="222" width="200" height="40" rx="8" fill="url(#mlw-en-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="247" textAnchor="middle" fontSize="10" fill="#065f46">多样性增强：数据扰动 / 属性扰动</text>

      <rect x="520" y="272" width="200" height="56" rx="8" fill="url(#mlw-en-green)" opacity="0.95" />
      <text x="620" y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">误差-分歧分解</text>
      <text x="620" y="312" textAnchor="middle" fontSize="10" fill="#cffafe">A = Ē - Ē（集成优于单器的充要）</text>

      <rect x="520" y="338" width="200" height="56" rx="8" fill="url(#mlw-en-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">Bagging 降方差</text>
      <text x="620" y="378" textAnchor="middle" fontSize="10" fill="#10b981">Boosting 降偏差</text>

      {/* 底部：对比总结 */}
      <rect x="40" y="416" width="720" height="80" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="439" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">Boosting vs Bagging 对比</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#15803d">Boosting：串行训练、关注错误样本、降偏差、对异常值敏感、过拟合风险（AdaBoost/GBDT/XGBoost）</text>
      <text x="400" y="479" textAnchor="middle" fontSize="11" fill="#15803d">Bagging：并行训练、自助采样、降方差、对异常值鲁棒、适合不稳定学习器（随机森林）</text>

      {/* 底部说明 */}
      <rect x="40" y="512" width="720" height="40" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="537" textAnchor="middle" fontSize="11" fill="#92400e">集成学习核心：好而不同——基学习器准确性 + 多样性，缺一不可</text>
    </svg>
  );
}
