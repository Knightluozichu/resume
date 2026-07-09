"use client";

export function DltMlBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="机器学习基础核心概念图">
      <defs>
        <linearGradient id="dlt-ml-form" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-ml-bv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlt-ml-reg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dlt-ml-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器学习基础：从数据中学习函数</text>

      {/* 三要素 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">学习三要素</text>

      <rect x="40" y="84" width="160" height="44" rx="8" fill="url(#dlt-ml-form)" opacity="0.9" />
      <text x="120" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">数据 (x, y)</text>
      <text x="120" y="119" textAnchor="middle" fontSize="9" fill="#bfdbfe">训练样本</text>

      <rect x="220" y="84" width="160" height="44" rx="8" fill="url(#dlt-ml-form)" opacity="0.9" />
      <text x="300" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">模型 f(x;θ)</text>
      <text x="300" y="119" textAnchor="middle" fontSize="9" fill="#bfdbfe">假设空间</text>

      <rect x="400" y="84" width="160" height="44" rx="8" fill="url(#dlt-ml-form)" opacity="0.9" />
      <text x="480" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">损失 L(ŷ, y)</text>
      <text x="480" y="119" textAnchor="middle" fontSize="9" fill="#bfdbfe">交叉熵/MSE</text>

      <text x="620" y="100" fontSize="11" fill="#475569">目标：最小化</text>
      <text x="620" y="116" fontSize="10" fill="#64748b">期望风险 R(θ)</text>

      {/* 偏差方差 */}
      <text x="200" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">偏差-方差权衡</text>

      <rect x="40" y="180" width="100" height="36" rx="6" fill="url(#dlt-ml-bv)" opacity="0.8" />
      <text x="90" y="202" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">高偏差</text>
      <text x="90" y="214" textAnchor="middle" fontSize="8" fill="#fef3c7">欠拟合</text>

      <rect x="160" y="180" width="100" height="36" rx="6" fill="url(#dlt-ml-bv)" opacity="0.6" />
      <text x="210" y="202" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">最优平衡</text>
      <text x="210" y="214" textAnchor="middle" fontSize="8" fill="#fef3c7">目标</text>

      <rect x="280" y="180" width="100" height="36" rx="6" fill="url(#dlt-ml-bv)" opacity="0.4" />
      <text x="330" y="202" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">高方差</text>
      <text x="330" y="214" textAnchor="middle" fontSize="8" fill="#fef3c7">过拟合</text>

      {/* 误差曲线示意 */}
      <path d="M40 280 Q120 260 200 270 Q300 285 400 290" stroke="#2563eb" strokeWidth="2" fill="none" />
      <text x="50" y="295" fontSize="9" fill="#2563eb">训练误差↓</text>
      <path d="M40 280 Q120 240 200 230 Q300 240 400 270" stroke="#dc2626" strokeWidth="2" fill="none" />
      <text x="50" y="275" fontSize="9" fill="#dc2626">测试误差</text>
      <text x="430" y="275" fontSize="9" fill="#64748b">→ 容量增加</text>
      <text x="200" y="320" fontSize="9" fill="#64748b">↑ 误差</text>

      {/* 正则化 */}
      <text x="620" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">正则化</text>

      <rect x="500" y="180" width="260" height="32" rx="6" fill="url(#dlt-ml-reg)" opacity="0.8" />
      <text x="630" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">L2: λ||w||² → 高斯先验MAP</text>

      <rect x="500" y="218" width="260" height="32" rx="6" fill="url(#dlt-ml-reg)" opacity="0.8" />
      <text x="630" y="238" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">L1: λ||w||₁ → 拉普拉斯先验MAP</text>

      <rect x="500" y="256" width="260" height="32" rx="6" fill="url(#dlt-ml-reg)" opacity="0.8" />
      <text x="630" y="276" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">早停 ≡ L2正则化</text>

      <rect x="500" y="294" width="260" height="32" rx="6" fill="url(#dlt-ml-reg)" opacity="0.8" />
      <text x="630" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">Dropout ≈ 集成学习</text>

      {/* 学习范式 */}
      <text x="200" y="360" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">学习范式</text>
      <rect x="40" y="370" width="160" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="120" y="388" textAnchor="middle" fontSize="10" fill="#1e40af">监督学习 (x,y)</text>
      <rect x="220" y="370" width="160" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="300" y="388" textAnchor="middle" fontSize="10" fill="#1e40af">无监督学习 (x)</text>
      <rect x="400" y="370" width="160" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="480" y="388" textAnchor="middle" fontSize="10" fill="#1e40af">强化学习</text>
      <rect x="580" y="370" width="180" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="670" y="388" textAnchor="middle" fontSize="10" fill="#1e40af">半监督/自监督</text>

      {/* 底部 */}
      <rect x="40" y="420" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">ERM：最小化经验风险(训练误差)近似期望风险(泛化误差)</text>

      <rect x="40" y="462" width="740" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="484" textAnchor="middle" fontSize="11" fill="#64748b">表示学习 = 自动特征学习 · 端到端 = 单一损失联合优化所有参数</text>
    </svg>
  );
}
