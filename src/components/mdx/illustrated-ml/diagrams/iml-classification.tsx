"use client";

export function ImlClassificationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="逻辑回归、sigmoid 函数与决策边界">
      <defs>
        <linearGradient id="iml-cl-positive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-cl-negative" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-cl-sigmoid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="iml-cl-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">逻辑回归与决策边界</text>

      {/* 左侧：Sigmoid 函数 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Sigmoid 函数</text>

      {/* 坐标轴 */}
      <line x1="60" y1="240" x2="340" y2="240" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="200" y1="80" x2="200" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="340" y="256" fontSize="11" fill="#64748b">z</text>
      <text x="210" y="84" fontSize="11" fill="#64748b">p</text>
      <text x="195" y="256" textAnchor="end" fontSize="10" fill="#64748b">0</text>
      <text x="195" y="100" textAnchor="end" fontSize="10" fill="#64748b">1</text>
      <text x="195" y="170" textAnchor="end" fontSize="10" fill="#64748b">0.5</text>

      {/* Sigmoid 曲线（近似路径） */}
      <path d="M70 272 Q120 270 160 260 Q180 240 200 160 Q220 80 260 72 Q300 70 330 70" fill="none" stroke="url(#iml-cl-sigmoid)" strokeWidth="2.5" />

      {/* 标注 */}
      <text x="80" y="288" fontSize="10" fill="#f59e0b">z 很负 → p≈0</text>
      <text x="260" y="66" fontSize="10" fill="#2563eb">z 很正 → p≈1</text>
      <text x="210" y="160" fontSize="10" fill="#7c3aed">z=0 → p=0.5</text>

      {/* 公式 */}
      <rect x="60" y="300" width="280" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="200" y="320" textAnchor="middle" fontSize="11" fill="#475569">p = 1 / (1 + e^(-z))</text>

      {/* 右侧：决策边界 */}
      <text x="580" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">决策边界</text>

      {/* 坐标轴 */}
      <line x1="420" y1="290" x2="740" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="420" y1="80" x2="420" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="740" y="306" fontSize="11" fill="#64748b">x1</text>
      <text x="408" y="84" fontSize="11" fill="#64748b">x2</text>

      {/* 决策边界线 */}
      <line x1="440" y1="100" x2="720" y2="270" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
      <text x="700" y="100" fontSize="10" fill="#ef4444">w^T*x + b = 0</text>

      {/* 正类样本（蓝） */}
      {[[460, 110], [490, 130], [470, 145], [510, 120], [530, 155], [500, 165]].map(([cx, cy], i) => (
        <circle key={`p${i}`} cx={cx} cy={cy} r="5" fill="url(#iml-cl-positive)" opacity="0.8" />
      ))}
      <text x="475" y="100" fontSize="10" fill="#2563eb">正类</text>

      {/* 负类样本（橙） */}
      {[[620, 200], [650, 220], [630, 240], [670, 210], [690, 250], [660, 265]].map(([cx, cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r="5" fill="url(#iml-cl-negative)" opacity="0.8" />
      ))}
      <text x="660" y="278" fontSize="10" fill="#f59e0b">负类</text>

      {/* 阈值标注 */}
      <rect x="420" y="310" width="320" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="580" y="330" textAnchor="middle" fontSize="11" fill="#475569">p &gt;= 0.5 → 正类 | p &lt; 0.5 → 负类</text>

      {/* 底部：交叉熵损失 */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交叉熵损失</text>

      <rect x="60" y="394" width="330" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="225" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">二分类交叉熵</text>
      <text x="225" y="440" textAnchor="middle" fontSize="11" fill="#475569">Loss = -[y*log(p) + (1-y)*log(1-p)]</text>
      <text x="225" y="460" textAnchor="middle" fontSize="10" fill="#64748b">y=1: -log(p)，p→1 损失→0</text>
      <text x="225" y="476" textAnchor="middle" fontSize="10" fill="#64748b">y=0: -log(1-p)，p→0 损失→0</text>
      <text x="225" y="490" textAnchor="middle" fontSize="10" fill="#64748b">预测越准损失越小，越错损失越大</text>

      <rect x="410" y="394" width="330" height="100" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="575" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">多分类交叉熵 + Softmax</text>
      <text x="575" y="440" textAnchor="middle" fontSize="11" fill="#475569">Loss = -sum(y_i * log(p_i))</text>
      <text x="575" y="460" textAnchor="middle" fontSize="10" fill="#64748b">Softmax: p_i = e^(z_i) / sum(e^(z_j))</text>
      <text x="575" y="476" textAnchor="middle" fontSize="10" fill="#64748b">所有类别概率之和 = 1</text>
      <text x="575" y="490" textAnchor="middle" fontSize="10" fill="#64748b">概率最大的类别为预测类别</text>
    </svg>
  );
}
