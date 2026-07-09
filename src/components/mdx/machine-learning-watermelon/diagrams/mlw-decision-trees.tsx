"use client";

export function MlwDecisionTreesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="决策树学习算法示意图">
      <defs>
        <linearGradient id="mlw-dt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-dt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-dt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-dt-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-dt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">决策树：从信息增益到剪枝</text>

      {/* 顶部：决策树结构示意 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">决策树结构</text>

      <rect x="340" y="72" width="120" height="36" rx="8" fill="url(#mlw-dt-blue)" opacity="0.95" />
      <text x="400" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">根节点：色泽？</text>

      <path d="M360 108 L260 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-dt-arrow)" />
      <path d="M440 108 L540 140" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-dt-arrow)" />

      <rect x="190" y="140" width="140" height="36" rx="8" fill="url(#mlw-dt-purple)" opacity="0.95" />
      <text x="260" y="163" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">青绿 → 根蒂？</text>

      <rect x="470" y="140" width="140" height="36" rx="8" fill="url(#mlw-dt-amber)" opacity="0.95" />
      <text x="540" y="163" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">乌黑 → 好瓜</text>

      <path d="M220 176 L170 208" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-dt-arrow)" />
      <path d="M300 176 L350 208" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mlw-dt-arrow)" />

      <rect x="110" y="208" width="120" height="32" rx="8" fill="url(#mlw-dt-green)" opacity="0.95" />
      <text x="170" y="229" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">蜷缩 → 好瓜</text>

      <rect x="290" y="208" width="120" height="32" rx="8" fill="url(#mlw-dt-amber)" opacity="0.95" />
      <text x="350" y="229" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">稍蜷 → 坏瓜</text>

      {/* 左下：划分选择准则对比 */}
      <text x="180" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">划分选择准则</text>

      <rect x="40" y="292" width="280" height="56" rx="10" fill="url(#mlw-dt-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="180" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ID3：信息增益</text>
      <text x="180" y="332" textAnchor="middle" fontSize="10" fill="#3b82f6">Gain(D,a) = Ent(D) - Σ |Dv|/|D| Ent(Dv)</text>

      <rect x="40" y="360" width="280" height="56" rx="10" fill="url(#mlw-dt-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="180" y="382" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">C4.5：增益率</text>
      <text x="180" y="400" textAnchor="middle" fontSize="10" fill="#8b5cf6">Gain_ratio(D,a) = Gain(D,a) / IV(a)</text>

      <rect x="40" y="428" width="280" height="56" rx="10" fill="url(#mlw-dt-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="180" y="450" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">CART：基尼指数</text>
      <text x="180" y="468" textAnchor="middle" fontSize="10" fill="#10b981">Gini_index(D,a) = Σ |Dv|/|D| Gini(Dv)</text>

      {/* 右下：剪枝 */}
      <text x="580" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">剪枝策略</text>

      <rect x="440" y="292" width="280" height="56" rx="10" fill="url(#mlw-dt-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="580" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">预剪枝</text>
      <text x="580" y="332" textAnchor="middle" fontSize="10" fill="#d97706">划分前评估，若不能提升泛化则停止</text>

      <rect x="440" y="360" width="280" height="56" rx="10" fill="url(#mlw-dt-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="580" y="382" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">后剪枝</text>
      <text x="580" y="400" textAnchor="middle" fontSize="10" fill="#3b82f6">先生成完整树，自底向上回溯剪枝</text>

      <rect x="440" y="428" width="280" height="56" rx="10" fill="url(#mlw-dt-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="580" y="450" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">对比</text>
      <text x="580" y="468" textAnchor="middle" fontSize="10" fill="#8b5cf6">预剪枝快但欠拟合风险；后剪枝准但开销大</text>

      {/* 底部公式 */}
      <rect x="40" y="508" width="720" height="48" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#475569">信息熵：Ent(D) = -Σ pk log2 pk（pk 为第 k 类样本占比）</text>
      <text x="400" y="546" textAnchor="middle" fontSize="11" fill="#94a3b8">基尼值：Gini(D) = 1 - Σ pk²（衡量数据纯度，越小越纯）</text>
    </svg>
  );
}
