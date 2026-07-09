"use client";

export function MlwBayesianDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="贝叶斯分类示意图">
      <defs>
        <linearGradient id="mlw-by-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-by-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-by-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mlw-by-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mlw-by-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">贝叶斯分类：从定理到朴素贝叶斯</text>

      {/* 顶部：贝叶斯定理 */}
      <text x="400" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">贝叶斯定理</text>

      <rect x="250" y="70" width="300" height="40" rx="8" fill="url(#mlw-by-blue)" opacity="0.95" />
      <text x="400" y="95" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">P(c|x) = P(x|c) P(c) / P(x)</text>

      {/* 左侧：朴素贝叶斯 */}
      <text x="160" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">朴素贝叶斯分类器</text>

      <rect x="40" y="144" width="240" height="44" rx="8" fill="url(#mlw-by-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="164" textAnchor="middle" fontSize="10" fill="#1e40af">属性条件独立假设：</text>
      <text x="160" y="180" textAnchor="middle" fontSize="10" fill="#3b82f6">P(x|c) = Π P(xi|c)</text>

      <path d="M160 188 L160 196" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-by-arrow)" />

      <rect x="40" y="198" width="240" height="44" rx="8" fill="url(#mlw-by-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="218" textAnchor="middle" fontSize="10" fill="#1e40af">分类判别：</text>
      <text x="160" y="234" textAnchor="middle" fontSize="10" fill="#3b82f6">h*(x) = argmax P(c) Π P(xi|c)</text>

      <path d="M160 242 L160 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-by-arrow)" />

      <rect x="40" y="252" width="240" height="44" rx="8" fill="url(#mlw-by-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="160" y="272" textAnchor="middle" fontSize="10" fill="#5b21b6">连续属性：概率密度估计</text>
      <text x="160" y="288" textAnchor="middle" fontSize="10" fill="#8b5cf6">p(xi|c) ~ N(μc, σ²c)</text>

      <path d="M160 296 L160 304" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-by-arrow)" />

      <rect x="40" y="306" width="240" height="44" rx="8" fill="url(#mlw-by-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="160" y="326" textAnchor="middle" fontSize="10" fill="#5b21b6">离散属性：频率估计</text>
      <text x="160" y="342" textAnchor="middle" fontSize="10" fill="#8b5cf6">P(xi|c) = |Dc,xi| / |Dc|</text>

      {/* 中间：半朴素贝叶斯 */}
      <text x="400" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">半朴素贝叶斯</text>

      <rect x="280" y="144" width="240" height="44" rx="8" fill="url(#mlw-by-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="164" textAnchor="middle" fontSize="10" fill="#065f46">独依赖估计（ODE）：</text>
      <text x="400" y="180" textAnchor="middle" fontSize="10" fill="#10b981">每个属性最多依赖一个父属性</text>

      <rect x="280" y="198" width="240" height="44" rx="8" fill="url(#mlw-by-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="218" textAnchor="middle" fontSize="10" fill="#065f46">SPODE：超父</text>
      <text x="400" y="234" textAnchor="middle" fontSize="10" fill="#10b981">所有属性依赖同一个「超父」属性</text>

      <rect x="280" y="252" width="240" height="44" rx="8" fill="url(#mlw-by-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="272" textAnchor="middle" fontSize="10" fill="#065f46">TAN：树增强</text>
      <text x="400" y="288" textAnchor="middle" fontSize="10" fill="#10b981">以最大带权生成树确定依赖关系</text>

      <rect x="280" y="306" width="240" height="44" rx="8" fill="url(#mlw-by-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="326" textAnchor="middle" fontSize="10" fill="#92400e">AODE：平均独依赖</text>
      <text x="400" y="342" textAnchor="middle" fontSize="10" fill="#d97706">集成多个 SPODE 取平均</text>

      {/* 右侧：贝叶斯网与 EM */}
      <text x="620" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">贝叶斯网 & EM</text>

      <rect x="520" y="144" width="200" height="56" rx="8" fill="url(#mlw-by-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="620" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">贝叶斯网</text>
      <text x="620" y="184" textAnchor="middle" fontSize="10" fill="#8b5cf6">有向无环图表达属性依赖</text>

      <rect x="520" y="210" width="200" height="56" rx="8" fill="url(#mlw-by-amber)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">EM 算法</text>
      <text x="620" y="250" textAnchor="middle" fontSize="10" fill="#d97706">隐变量迭代求极大似然估计</text>

      <rect x="520" y="276" width="200" height="56" rx="8" fill="url(#mlw-by-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="620" y="298" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">E 步：求期望</text>
      <text x="620" y="316" textAnchor="middle" fontSize="10" fill="#3b82f6">基于当前参数估计隐变量分布</text>

      <rect x="520" y="342" width="200" height="32" rx="8" fill="url(#mlw-by-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="620" y="363" textAnchor="middle" fontSize="10" fill="#1e40af">M 步：极大化期望更新参数</text>

      {/* 底部：拉普拉斯修正 */}
      <rect x="40" y="396" width="720" height="56" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="419" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">拉普拉斯修正（平滑）</text>
      <text x="400" y="439" textAnchor="middle" fontSize="11" fill="#15803d">P(c) = (|Dc|+1) / (|D|+N)，P(xi|c) = (|Dc,xi|+1) / (|Dc|+Ni)</text>

      {/* 底部说明 */}
      <rect x="40" y="472" width="720" height="80" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="495" textAnchor="middle" fontSize="11" fill="#92400e">贝叶斯分类核心：利用先验概率 P(c) 和似然 P(x|c) 计算后验概率 P(c|x)，选最大后验概率类</text>
      <text x="400" y="515" textAnchor="middle" fontSize="11" fill="#b45309">朴素假设使计算可行，但可能牺牲精度；半朴素和贝叶斯网逐步放松独立性假设</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#b45309">EM 算法处理含隐变量的参数估计，是 K-Means、高斯混合模型的基础</text>
    </svg>
  );
}
