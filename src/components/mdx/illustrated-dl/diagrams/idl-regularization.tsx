"use client";

export function IdlRegularizationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="正则化技术与优化器对比">
      <defs>
        <linearGradient id="idl-reg-overfit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="idl-reg-good" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="idl-reg-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="idl-reg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">正则化技术与优化器</text>

      {/* 上半部分：过拟合 vs 欠拟合 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">过拟合 vs 欠拟合 vs 恰好</text>

      {/* 欠拟合 */}
      <rect x="30" y="75" width="230" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="145" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">欠拟合</text>
      <line x1="50" y1="180" x2="240" y2="110" stroke="#dc2626" strokeWidth="2.5" />
      <circle cx="70" cy="170" r="4" fill="#94a3b8" />
      <circle cx="110" cy="150" r="4" fill="#94a3b8" />
      <circle cx="150" cy="140" r="4" fill="#94a3b8" />
      <circle cx="190" cy="120" r="4" fill="#94a3b8" />
      <circle cx="220" cy="115" r="4" fill="#94a3b8" />
      <text x="145" y="195" textAnchor="middle" fontSize="10" fill="#991b1b">模型太简单，训练集都没学好</text>

      {/* 恰好 */}
      <rect x="285" y="75" width="230" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">恰好拟合</text>
      <path d="M310 175 Q360 130 400 125 Q440 120 490 105" fill="none" stroke="#059669" strokeWidth="2.5" />
      <circle cx="70" cy="170" r="4" fill="#94a3b8" transform="translate(240, 0)" />
      <circle cx="110" cy="150" r="4" fill="#94a3b8" transform="translate(240, 0)" />
      <circle cx="150" cy="140" r="4" fill="#94a3b8" transform="translate(240, 0)" />
      <circle cx="190" cy="120" r="4" fill="#94a3b8" transform="translate(240, 0)" />
      <circle cx="220" cy="115" r="4" fill="#94a3b8" transform="translate(240, 0)" />
      <text x="400" y="195" textAnchor="middle" fontSize="10" fill="#065f46">泛化能力好</text>

      {/* 过拟合 */}
      <rect x="540" y="75" width="230" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="655" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">过拟合</text>
      <path d="M560 170 Q580 120 600 140 Q620 160 640 110 Q660 180 680 120 Q700 150 720 100 Q740 160 760 110" fill="none" stroke="#dc2626" strokeWidth="2" />
      <circle cx="580" cy="135" r="4" fill="#94a3b8" />
      <circle cx="620" cy="145" r="4" fill="#94a3b8" />
      <circle cx="660" cy="125" r="4" fill="#94a3b8" />
      <circle cx="700" cy="130" r="4" fill="#94a3b8" />
      <circle cx="740" cy="120" r="4" fill="#94a3b8" />
      <text x="655" y="195" textAnchor="middle" fontSize="10" fill="#991b1b">记住训练数据，泛化差</text>

      {/* 中部：正则化技术 */}
      <text x="400" y="235" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常见正则化技术</text>

      <rect x="30" y="250" width="170" height="70" rx="8" fill="url(#idl-reg-good)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="115" y="275" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">L2 正则化</text>
      <text x="115" y="295" textAnchor="middle" fontSize="10" fill="#059669">Loss += lambda*||W||^2</text>
      <text x="115" y="310" textAnchor="middle" fontSize="9" fill="#64748b">惩罚大权重</text>

      <rect x="220" y="250" width="170" height="70" rx="8" fill="url(#idl-reg-good)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="305" y="275" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Dropout</text>
      <text x="305" y="295" textAnchor="middle" fontSize="10" fill="#059669">训练时随机丢弃神经元</text>
      <text x="305" y="310" textAnchor="middle" fontSize="9" fill="#64748b">防止共适应</text>

      <rect x="410" y="250" width="170" height="70" rx="8" fill="url(#idl-reg-good)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="495" y="275" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">BatchNorm</text>
      <text x="495" y="295" textAnchor="middle" fontSize="10" fill="#059669">对每层输入做标准化</text>
      <text x="495" y="310" textAnchor="middle" fontSize="9" fill="#64748b">加速训练+正则化</text>

      <rect x="600" y="250" width="170" height="70" rx="8" fill="url(#idl-reg-good)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="685" y="275" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Early Stopping</text>
      <text x="685" y="295" textAnchor="middle" fontSize="10" fill="#059669">验证集损失上升时停止</text>
      <text x="685" y="310" textAnchor="middle" fontSize="9" fill="#64748b">防止过训练</text>

      {/* 下半部分：优化器对比 */}
      <text x="400" y="355" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">优化器对比</text>

      <rect x="30" y="370" width="170" height="80" rx="8" fill="url(#idl-reg-opt)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="115" y="395" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">SGD</text>
      <text x="115" y="415" textAnchor="middle" fontSize="10" fill="#2563eb">W -= lr * dW</text>
      <text x="115" y="435" textAnchor="middle" fontSize="9" fill="#64748b">基础，需调 lr</text>

      <rect x="220" y="370" width="170" height="80" rx="8" fill="url(#idl-reg-opt)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="305" y="395" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Momentum</text>
      <text x="305" y="415" textAnchor="middle" fontSize="10" fill="#2563eb">v = 0.9*v + dW</text>
      <text x="305" y="435" textAnchor="middle" fontSize="9" fill="#64748b">惯性加速收敛</text>

      <rect x="410" y="370" width="170" height="80" rx="8" fill="url(#idl-reg-opt)" opacity="0.15" stroke="#2563eb" strokeWidth="2.5" />
      <text x="495" y="395" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Adam</text>
      <text x="495" y="415" textAnchor="middle" fontSize="10" fill="#2563eb">自适应学习率</text>
      <text x="495" y="435" textAnchor="middle" fontSize="9" fill="#64748b">最常用默认选择</text>

      <rect x="600" y="370" width="170" height="80" rx="8" fill="url(#idl-reg-opt)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="685" y="395" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">RMSprop</text>
      <text x="685" y="415" textAnchor="middle" fontSize="10" fill="#2563eb">梯度平方移动平均</text>
      <text x="685" y="435" textAnchor="middle" fontSize="9" fill="#64748b">适合非平稳目标</text>

      <rect x="30" y="470" width="740" height="35" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="11" fill="#92400e">数据增强（翻转/裁剪/旋转）也是有效正则化手段，通过扩充训练数据提升泛化能力</text>
    </svg>
  );
}
