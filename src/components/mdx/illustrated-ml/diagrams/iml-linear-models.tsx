"use client";

export function ImlLinearModelsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="线性回归、梯度下降与正则化">
      <defs>
        <linearGradient id="iml-lm-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-lm-fit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="iml-lm-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">线性回归与梯度下降</text>

      {/* 左侧：线性回归拟合 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">线性回归拟合</text>

      {/* 坐标轴 */}
      <line x1="60" y1="260" x2="340" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="80" x2="60" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="340" y="276" fontSize="11" fill="#64748b">x (特征)</text>
      <text x="48" y="80" fontSize="11" fill="#64748b" textAnchor="end">y</text>

      {/* 拟合直线 */}
      <line x1="80" y1="240" x2="320" y2="100" stroke="url(#iml-lm-fit)" strokeWidth="2.5" />
      <text x="300" y="92" fontSize="11" fontWeight="600" fill="#7c3aed">y = wX + b</text>

      {/* 数据点 */}
      {[[90, 235], [120, 210], [150, 220], [180, 185], [210, 170], [240, 150], [270, 130], [300, 115]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="url(#iml-lm-data)" opacity="0.8" />
      ))}

      {/* 残差线（示例） */}
      <line x1="180" y1="185" x2="180" y2="195" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="195" y="194" fontSize="9" fill="#ef4444">残差</text>

      {/* MSE 公式 */}
      <rect x="60" y="290" width="280" height="34" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="200" y="312" textAnchor="middle" fontSize="11" fill="#475569">MSE = (1/m) * sum((y_hat - y)^2)</text>

      {/* 右侧：梯度下降 */}
      <text x="580" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">梯度下降</text>

      {/* 损失函数曲面（等高线示意） */}
      <ellipse cx="580" cy="170" rx="120" ry="80" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <ellipse cx="580" cy="170" rx="90" ry="60" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <ellipse cx="580" cy="170" rx="60" ry="40" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <ellipse cx="580" cy="170" rx="30" ry="20" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="580" cy="170" r="5" fill="#ef4444" />
      <text x="590" y="168" fontSize="10" fill="#ef4444">最小值</text>

      {/* 梯度下降路径 */}
      <circle cx="690" cy="100" r="4" fill="#2563eb" />
      <path d="M690 100 L670 120 L650 140 L620 158 L600 166 L585 170" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#iml-lm-arr)" />
      <text x="695" y="96" fontSize="10" fill="#2563eb">起点</text>

      {/* 学习率 */}
      <rect x="440" y="270" width="280" height="90" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="580" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">学习率 alpha 的影响</text>
      <text x="460" y="312" fontSize="11" fill="#2563eb">太小：收敛极慢</text>
      <text x="460" y="328" fontSize="11" fill="#059669">适中：正常收敛</text>
      <text x="460" y="344" fontSize="11" fill="#ef4444">太大：震荡或发散</text>

      {/* 底部：正则化对比 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">L1 vs L2 正则化</text>

      <rect x="60" y="414" width="330" height="80" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="225" y="438" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">L1 正则化（Lasso）</text>
      <text x="225" y="458" textAnchor="middle" fontSize="11" fill="#475569">Loss = MSE + lambda * sum(|w|)</text>
      <text x="225" y="476" textAnchor="middle" fontSize="11" fill="#475569">稀疏权重（部分 w=0）/ 特征选择</text>
      <text x="225" y="490" textAnchor="middle" fontSize="10" fill="#64748b">适合：高维稀疏 / 需要特征选择</text>

      <rect x="410" y="414" width="330" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="575" y="438" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">L2 正则化（Ridge）</text>
      <text x="575" y="458" textAnchor="middle" fontSize="11" fill="#475569">Loss = MSE + lambda * sum(w^2)</text>
      <text x="575" y="476" textAnchor="middle" fontSize="11" fill="#475569">平滑权重（所有 w 较小）/ 防过拟合</text>
      <text x="575" y="490" textAnchor="middle" fontSize="10" fill="#64748b">适合：一般回归 / 防过拟合</text>
    </svg>
  );
}
