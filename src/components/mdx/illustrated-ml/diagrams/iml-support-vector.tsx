"use client";

export function ImlSupportVectorDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="支持向量机最大间隔与核函数">
      <defs>
        <linearGradient id="iml-sv-positive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-sv-negative" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-sv-sv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="iml-sv-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">支持向量机：最大间隔与核函数</text>

      {/* 左侧：最大间隔 */}
      <text x="220" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">最大间隔分类</text>

      {/* 坐标轴 */}
      <line x1="60" y1="290" x2="380" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="80" x2="60" y2="290" stroke="#94a3b8" strokeWidth="1.5" />

      {/* 间隔区域 */}
      <rect x="130" y="80" width="140" height="210" fill="#f1f5f9" opacity="0.5" />

      {/* 间隔边界 */}
      <line x1="130" y1="80" x2="130" y2="290" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />
      <line x1="270" y1="80" x2="270" y2="290" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6,3" />

      {/* 决策边界 */}
      <line x1="200" y1="80" x2="200" y2="290" stroke="#ef4444" strokeWidth="2.5" />
      <text x="210" y="96" fontSize="11" fill="#ef4444">w^T*x+b=0</text>

      {/* 间隔标注 */}
      <line x1="130" y1="260" x2="270" y2="260" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#iml-sv-arr)" markerStart="url(#iml-sv-arr)" />
      <text x="200" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">间隔 2/||w||</text>

      {/* 正类样本 */}
      {[[300, 110], [320, 140], [340, 170], [310, 200]].map(([cx, cy], i) => (
        <circle key={`p${i}`} cx={cx} cy={cy} r="5" fill="url(#iml-sv-positive)" opacity="0.8" />
      ))}
      {/* 正类支持向量 */}
      <circle cx={270} cy={120} r="6" fill="url(#iml-sv-positive)" stroke="url(#iml-sv-sv)" strokeWidth="2.5" />
      <circle cx={270} cy={220} r="6" fill="url(#iml-sv-positive)" stroke="url(#iml-sv-sv)" strokeWidth="2.5" />
      <text x="330" y="100" fontSize="10" fill="#2563eb">正类</text>

      {/* 负类样本 */}
      {[[80, 110], [100, 150], [80, 200], [110, 240]].map(([cx, cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r="5" fill="url(#iml-sv-negative)" opacity="0.8" />
      ))}
      {/* 负类支持向量 */}
      <circle cx={130} cy={130} r="6" fill="url(#iml-sv-negative)" stroke="url(#iml-sv-sv)" strokeWidth="2.5" />
      <circle cx={130} cy={250} r="6" fill="url(#iml-sv-negative)" stroke="url(#iml-sv-sv)" strokeWidth="2.5" />
      <text x="75" y="100" fontSize="10" fill="#f59e0b">负类</text>

      {/* 支持向量标注 */}
      <text x="200" y="308" textAnchor="middle" fontSize="10" fill="#ef4444">红圈 = 支持向量（决定决策边界）</text>

      {/* 右侧：核函数 */}
      <text x="580" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核函数映射</text>

      {/* 原始空间 */}
      <rect x="430" y="82" width="140" height="120" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="500" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">原始空间（线性不可分）</text>

      {/* 环形数据示意 */}
      <circle cx="500" cy="150" r="35" fill="none" stroke="#f59e0b" strokeWidth="2" />
      {[[490, 130], [510, 140], [485, 160], [520, 165]].map(([cx, cy], i) => (
        <circle key={`inner-${i}`} cx={cx} cy={cy} r="3" fill="#f59e0b" />
      ))}
      {[[470, 120], [530, 120], [465, 170], [535, 175]].map(([cx, cy], i) => (
        <circle key={`outer-${i}`} cx={cx} cy={cy} r="3" fill="#2563eb" />
      ))}

      {/* 映射箭头 */}
      <path d="M580 140 L620 140" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#iml-sv-arr)" />
      <text x="600" y="132" textAnchor="middle" fontSize="9" fill="#7c3aed">phi(x)</text>

      {/* 高维空间 */}
      <rect x="630" y="82" width="140" height="120" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="700" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">高维空间（线性可分）</text>

      {/* 分离数据示意 */}
      <line x1="650" y1="150" x2="750" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
      {[[670, 125], [690, 130], [710, 120], [730, 128]].map(([cx, cy], i) => (
        <circle key={`hi-${i}`} cx={cx} cy={cy} r="3" fill="#2563eb" />
      ))}
      {[[670, 175], [690, 180], [710, 170], [730, 178]].map(([cx, cy], i) => (
        <circle key={`lo-${i}`} cx={cx} cy={cy} r="3" fill="#f59e0b" />
      ))}

      {/* 核函数公式 */}
      <rect x="430" y="214" width="340" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="600" y="234" textAnchor="middle" fontSize="11" fill="#475569">K(x_i, x_j) = phi(x_i)^T * phi(x_j)</text>

      {/* 常用核函数表 */}
      <text x="220" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常用核函数</text>

      <rect x="40" y="374" width="680" height="28" rx="6" fill="#e2e8f0" />
      <text x="160" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">核函数</text>
      <text x="400" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">公式</text>
      <text x="620" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">适用场景</text>

      {[
        ["线性核", "K(x,y) = x^T * y", "线性可分 / 高维稀疏"],
        ["多项式核", "K(x,y) = (x^T*y + 1)^d", "中等非线性"],
        ["RBF 核（高斯）", "K(x,y) = exp(-gamma*||x-y||^2)", "通用非线性（最常用）"],
        ["Sigmoid 核", "K(x,y) = tanh(alpha*x^T*y + c)", "特殊场景"],
      ].map(([name, formula, scene], i) => (
        <g key={`kernel-${i}`}>
          <rect x="40" y={404 + i * 30} width="680" height="28" rx="0" fill={i % 2 === 0 ? "#f8fafc" : "#fff"} stroke="#e2e8f0" strokeWidth="0.5" />
          <text x="160" y={422 + i * 30} textAnchor="middle" fontSize="10" fill="#475569">{name}</text>
          <text x="400" y={422 + i * 30} textAnchor="middle" fontSize="10" fill="#475569">{formula}</text>
          <text x="620" y={422 + i * 30} textAnchor="middle" fontSize="10" fill="#475569">{scene}</text>
        </g>
      ))}

      {/* 软间隔 + C 参数 */}
      <rect x="40" y="510" width="680" height="24" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="526" textAnchor="middle" fontSize="11" fill="#92400e">软间隔：C 大 → 严格分类（易过拟合） · C 小 → 宽间隔容忍错误（易欠拟合）</text>
    </svg>
  );
}
