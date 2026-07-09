"use client";

export function SlmEmHmmDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="EM算法与隐马尔可夫模型">
      <defs>
        <linearGradient id="slm-em-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="slm-em-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="slm-em-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="slm-em-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="slm-em-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">EM 算法与隐马尔可夫模型</text>

      {/* 左侧：EM 算法 */}
      <text x="200" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">EM 算法</text>

      <rect x="40" y="84" width="320" height="50" rx="10" fill="url(#slm-em-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="114" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">E 步：求期望 Q(θ|θ⁽ⁱ⁾)</text>

      <path d="M200 134 L200 142" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="40" y="144" width="320" height="50" rx="10" fill="url(#slm-em-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">M 步：极大化 Q 求新 θ⁽ⁱ⁺¹⁾</text>

      <path d="M200 194 L200 202" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="40" y="204" width="320" height="50" rx="10" fill="url(#slm-em-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">迭代至收敛</text>

      <path d="M200 254 L200 262" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="40" y="264" width="320" height="50" rx="10" fill="url(#slm-em-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="294" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">高斯混合模型（GMM）应用</text>

      {/* 右侧：HMM 三要素 */}
      <text x="560" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">隐马尔可夫模型</text>

      <rect x="420" y="84" width="280" height="44" rx="8" fill="url(#slm-em-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="560" y="111" textAnchor="middle" fontSize="12" fill="#1e40af">λ = (A, B, π)</text>

      <path d="M560 128 L560 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="420" y="138" width="280" height="44" rx="8" fill="url(#slm-em-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="165" textAnchor="middle" fontSize="12" fill="#5b21b6">A 转移概率 / B 观测概率</text>

      <path d="M560 182 L560 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="420" y="192" width="280" height="44" rx="8" fill="url(#slm-em-orange)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="560" y="219" textAnchor="middle" fontSize="12" fill="#92400e">π 初始状态概率</text>

      <path d="M560 236 L560 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="420" y="246" width="280" height="44" rx="8" fill="url(#slm-em-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="273" textAnchor="middle" fontSize="12" fill="#065f46">两个基本假设：马尔可夫 + 观测独立</text>

      <path d="M560 290 L560 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#slm-em-arrow)" />

      <rect x="420" y="300" width="280" height="44" rx="8" fill="url(#slm-em-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="560" y="327" textAnchor="middle" fontSize="12" fill="#065f46">EM 用于 HMM 学习（Baum-Welch）</text>

      {/* 底部：HMM 三个基本问题 */}
      <rect x="40" y="362" width="720" height="56" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="386" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">HMM 三个基本问题</text>
      <text x="400" y="406" textAnchor="middle" fontSize="11" fill="#64748b">1. 概率计算（前向/后向算法）  2. 学习问题（Baum-Welch/EM）  3. 预测问题（Viterbi 算法）</text>

      {/* 底部：EM 算法性质 */}
      <rect x="40" y="434" width="720" height="80" rx="10" fill="url(#slm-em-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e40af">EM 算法性质</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#64748b">1. 含隐变量的概率模型参数极大似然估计  2. 每次迭代使似然函数单调递增</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#64748b">3. 收敛到局部最优  4. HMM 的学习算法（Baum-Welch）是 EM 的特例</text>
    </svg>
  );
}
