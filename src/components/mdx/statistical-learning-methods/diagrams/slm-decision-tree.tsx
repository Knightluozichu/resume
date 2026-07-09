"use client";

export function SlmDecisionTreeDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="决策树模型与算法对比">
      <defs>
        <linearGradient id="slm-dt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-dt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-dt-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-dt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-dt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">决策树 · 特征选择与算法对比</text>

      {/* 左侧：特征选择准则 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">特征选择准则</text>

      <rect x="40" y="84" width="320" height="60" rx="10" fill="url(#slm-dt-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="108" fontSize="13" fontWeight="600" fill="#1e40af">信息增益（ID3）</text>
      <text x="60" y="128" fontSize="11" fill="#475569">g(D,A) = H(D) - H(D|A)</text>
      <text x="60" y="142" fontSize="11" fill="#64748b">信息熵减少量</text>

      <path d="M200 144 L200 152" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-dt-arrow)" />

      <rect x="40" y="154" width="320" height="60" rx="10" fill="url(#slm-dt-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="178" fontSize="13" fontWeight="600" fill="#5b21b6">信息增益比（C4.5）</text>
      <text x="60" y="198" fontSize="11" fill="#475569">gR(D,A) = g(D,A) / HA(D)</text>
      <text x="60" y="212" fontSize="11" fill="#64748b">修正取值多的特征的偏好</text>

      <path d="M200 214 L200 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-dt-arrow)" />

      <rect x="40" y="224" width="320" height="60" rx="10" fill="url(#slm-dt-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="248" fontSize="13" fontWeight="600" fill="#92400e">基尼指数（CART）</text>
      <text x="60" y="268" fontSize="11" fill="#475569">Gini(D) = 1 - Σ(pk)²</text>
      <text x="60" y="282" fontSize="11" fill="#64748b">度量集合不确定性</text>

      {/* 右侧：三种算法对比 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">算法对比</text>

      <rect x="420" y="84" width="280" height="40" rx="8" fill="url(#slm-dt-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="440" y="108" fontSize="12" fontWeight="600" fill="#1e40af">ID3</text>
      <text x="475" y="108" fontSize="11" fill="#475569">信息增益 / 多叉树 / 离散值</text>

      <path d="M560 124 L560 132" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-dt-arrow)" />

      <rect x="420" y="134" width="280" height="40" rx="8" fill="url(#slm-dt-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="158" fontSize="12" fontWeight="600" fill="#5b21b6">C4.5</text>
      <text x="475" y="158" fontSize="11" fill="#475569">信息增益比 / 多叉树 / 连续值</text>

      <path d="M560 174 L560 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-dt-arrow)" />

      <rect x="420" y="184" width="280" height="40" rx="8" fill="url(#slm-dt-orange)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="440" y="208" fontSize="12" fontWeight="600" fill="#92400e">CART</text>
      <text x="475" y="208" fontSize="11" fill="#475569">基尼指数 / 二叉树 / 回归+分类</text>

      <path d="M560 224 L560 232" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-dt-arrow)" />

      <rect x="420" y="234" width="280" height="40" rx="8" fill="url(#slm-dt-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="258" fontSize="12" fontWeight="600" fill="#065f46">共性</text>
      <text x="475" y="258" fontSize="11" fill="#475569">递归选最优特征 / 剪枝防过拟合</text>

      {/* 底部：剪枝 */}
      <rect x="40" y="296" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="320" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">决策树剪枝</text>
      <text x="400" y="340" textAnchor="middle" fontSize="11" fill="#64748b">预剪枝（提前停止）+ 后剪枝（自底向上回溯）→ 极小化损失函数 Ca(T) = C(T) + α|T|</text>

      {/* 底部：决策树学习流程 */}
      <rect x="40" y="370" width="720" height="56" rx="10" fill="url(#slm-dt-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="394" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">决策树学习流程</text>
      <text x="400" y="414" textAnchor="middle" fontSize="11" fill="#64748b">开始 → 选择最优特征划分 → 递归构建子树 → 所有样本同类或无特征则停 → 剪枝 → 输出树</text>

      {/* 底部：关键性质 */}
      <rect x="40" y="444" width="720" height="70" rx="10" fill="url(#slm-dt-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">关键性质</text>
      <text x="400" y="488" textAnchor="middle" fontSize="11" fill="#64748b">1. if-then 规则集合  2. 特征空间划分  3. 条件概率分布</text>
      <text x="400" y="504" textAnchor="middle" fontSize="11" fill="#64748b">4. 可解释性强  5. 剪枝是正则化手段</text>
    </svg>
  );
}
