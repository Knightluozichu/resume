"use client";

export function ImlFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="全书知识图谱与算法选型">
      <defs>
        <linearGradient id="iml-fr-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="iml-fr-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="iml-fr-nonlinear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="iml-fr-ensemble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="iml-fr-arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合：从线性到非线性</text>

      {/* 四层递进 */}
      <text x="400" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">非线性能力递进</text>

      {/* 线性层 */}
      <rect x="40" y="82" width="720" height="56" rx="10" fill="url(#iml-fr-linear)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="70" cy="110" r="14" fill="url(#iml-fr-linear)" />
      <text x="70" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">1</text>
      <text x="100" y="104" fontSize="13" fontWeight="700" fill="#1e40af">线性层</text>
      <text x="100" y="122" fontSize="11" fill="#475569">线性回归 y=wX+b · 逻辑回归 sigmoid(wX+b) → 线性决策边界</text>
      <text x="660" y="114" fontSize="10" fill="#2563eb">简单可解释</text>

      <path d="M400 138 L400 146" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-fr-arr)" />

      {/* 半线性层 */}
      <rect x="40" y="150" width="720" height="56" rx="10" fill="url(#iml-fr-tree)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <circle cx="70" cy="178" r="14" fill="url(#iml-fr-tree)" />
      <text x="70" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">2</text>
      <text x="100" y="172" fontSize="13" fontWeight="700" fill="#5b21b6">半线性层</text>
      <text x="100" y="190" fontSize="11" fill="#475569">多项式回归（x^2, x^3）· 决策树（递归划分）→ 阶梯状非线性边界</text>
      <text x="660" y="182" fontSize="10" fill="#7c3aed">中等非线性</text>

      <path d="M400 206 L400 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-fr-arr)" />

      {/* 非线性层 */}
      <rect x="40" y="218" width="720" height="56" rx="10" fill="url(#iml-fr-nonlinear)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="70" cy="246" r="14" fill="url(#iml-fr-nonlinear)" />
      <text x="70" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">3</text>
      <text x="100" y="240" fontSize="13" fontWeight="700" fill="#92400e">非线性层</text>
      <text x="100" y="258" fontSize="11" fill="#475569">SVM 核函数（高维映射）· 神经网络（激活函数 + 多层）→ 任意复杂边界</text>
      <text x="660" y="250" fontSize="10" fill="#f59e0b">高度非线性</text>

      <path d="M400 274 L400 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-fr-arr)" />

      {/* 集成层 */}
      <rect x="40" y="286" width="720" height="56" rx="10" fill="url(#iml-fr-ensemble)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <circle cx="70" cy="314" r="14" fill="url(#iml-fr-ensemble)" />
      <text x="70" y="318" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">4</text>
      <text x="100" y="308" fontSize="13" fontWeight="700" fill="#065f46">集成层</text>
      <text x="100" y="326" fontSize="11" fill="#475569">随机森林（Bagging 降方差）· GBDT（Boosting 降偏差）→ 多模型组合</text>
      <text x="660" y="318" fontSize="10" fill="#059669">精度最高</text>

      {/* 下半：ML 项目流程 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">ML 项目完整流程</text>

      {[
        { x: 40, label: "问题定义", desc: "任务/指标/约束", color: "#2563eb" },
        { x: 184, label: "数据准备", desc: "收集/特征/划分", color: "#7c3aed" },
        { x: 328, label: "模型训练", desc: "基线/选模型/调参", color: "#f59e0b" },
        { x: 472, label: "模型评估", desc: "测试集/误差分析", color: "#059669" },
        { x: 616, label: "部署监控", desc: "推理/漂移/重训练", color: "#ef4444" },
      ].map((step, i) => (
        <g key={`step-${i}`}>
          <rect x={step.x} y={386} width={130} height={56} rx={8} fill="#f1f5f9" stroke={step.color} strokeWidth="1.5" />
          <text x={step.x + 65} y={408} textAnchor="middle" fontSize="12" fontWeight="600" fill={step.color}>{step.label}</text>
          <text x={step.x + 65} y={426} textAnchor="middle" fontSize="10" fill="#64748b">{step.desc}</text>
          {i < 4 && <path d={`M${step.x + 130} 414 L${step.x + 148} 414`} stroke="#64748b" strokeWidth="2" markerEnd="url(#iml-fr-arr)" />}
        </g>
      ))}

      {/* 反馈循环 */}
      <path d="M681 442 Q681 470 400 470 Q95 470 95 442" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#iml-fr-arr)" />
      <text x="400" y="486" textAnchor="middle" fontSize="10" fill="#64748b">反馈迭代：发现数据漂移后重新训练</text>

      {/* 底部：算法选型原则 */}
      <rect x="40" y="502" width="720" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">算法选型原则</text>
      <text x="400" y="540" textAnchor="middle" fontSize="10" fill="#475569">先简后繁 · 数据驱动 · 可解释性优先 · No Free Lunch（交叉验证比较）</text>
    </svg>
  );
}
