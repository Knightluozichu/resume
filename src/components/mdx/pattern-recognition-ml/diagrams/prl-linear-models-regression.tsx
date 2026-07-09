"use client";

export function PrlLinearModelsRegressionDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="线性回归模型从频率派到贝叶斯">
      <defs>
        <linearGradient id="prl-lr-freq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prl-lr-bayes" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="prl-lr-full" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="prl-lr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">线性回归：从最大似然到贝叶斯</text>

      {/* 三层递进 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三层递进</text>

      {/* 第一层：最大似然 */}
      <rect x="40" y="78" width="720" height="80" rx="10" fill="url(#prl-lr-freq)" opacity="0.12" stroke="#f59e0b" strokeWidth="2" />
      <text x="60" y="100" fontSize="12" fontWeight="700" fill="#92400e">第一层 · 最大似然线性回归（MLE）</text>
      <text x="60" y="120" fontSize="10" fill="#92400e">y(x,w) = Σ w_j φ_j(x) = wᵀφ(x)   基函数线性组合</text>
      <text x="60" y="138" fontSize="10" fill="#92400e">最小化平方误差 ≡ 高斯噪声下的最大似然   w_ML = (ΦᵀΦ)⁻¹Φᵀt</text>
      <text x="60" y="152" fontSize="10" fill="#92400e">问题：过拟合 / 无法量化参数不确定性</text>

      <path d="M400 158 L400 166" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lr-arrow)" />

      {/* 第二层：MAP / 正则化 */}
      <rect x="40" y="168" width="720" height="80" rx="10" fill="url(#prl-lr-bayes)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="60" y="190" fontSize="12" fontWeight="700" fill="#065f46">第二层 · 最大后验（MAP）/ 正则化</text>
      <text x="60" y="210" fontSize="10" fill="#065f46">加入先验 p(w) = N(0, α⁻¹I)   →   最小化 (平方误差 + λ‖w‖²)</text>
      <text x="60" y="228" fontSize="10" fill="#065f46">w_MAP = (ΦᵀΦ + λI)⁻¹Φᵀt   L2 正则化 = 高斯先验的 MAP</text>
      <text x="60" y="242" fontSize="10" fill="#065f46">效果：抑制过拟合，但仍是点估计</text>

      <path d="M400 248 L400 256" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-lr-arrow)" />

      {/* 第三层：全贝叶斯 */}
      <rect x="40" y="258" width="720" height="80" rx="10" fill="url(#prl-lr-full)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="60" y="280" fontSize="12" fontWeight="700" fill="#5b21b6">第三层 · 全贝叶斯回归（后验分布）</text>
      <text x="60" y="300" fontSize="10" fill="#5b21b6">后验 p(w|D) ∝ p(D|w)·p(w) = N(m_N, S_N)   参数有完整分布</text>
      <text x="60" y="318" fontSize="10" fill="#5b21b6">预测分布 p(t|x,D) = ∫p(t|x,w)p(w|D)dw   积分出参数不确定性</text>
      <text x="60" y="332" fontSize="10" fill="#5b21b6">效果：量化预测置信区间，自动控制复杂度</text>

      {/* 基函数类型 */}
      <text x="400" y="368" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常用基函数 φ_j(x)</text>

      <rect x="40" y="382" width="170" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">多项式基</text>
      <text x="125" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">φ_j(x) = x^j</text>
      <text x="125" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">全局影响，边缘振荡</text>

      <rect x="220" y="382" width="170" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="305" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">高斯基</text>
      <text x="305" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">φ_j(x) = exp(-(x-μ_j)²/2s²)</text>
      <text x="305" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">局部影响，紧凑</text>

      <rect x="400" y="382" width="170" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="485" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">sigmoid 基</text>
      <text x="485" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">φ_j(x) = σ((x-μ_j)/s)</text>
      <text x="485" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">神经网络联系</text>

      <rect x="580" y="382" width="180" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="670" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">傅里叶基</text>
      <text x="670" y="420" textAnchor="middle" fontSize="9" fill="#1e40af">sin/cos 分量</text>
      <text x="670" y="434" textAnchor="middle" fontSize="9" fill="#1e40af">周期信号建模</text>

      {/* 底部 */}
      <rect x="40" y="460" width="720" height="60" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="482" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">贝叶斯视角的统一</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#64748b">MLE(无先验) → MAP(高斯先验=L2) → 全贝叶斯(后验分布+预测分布)</text>
      <text x="400" y="514" textAnchor="middle" fontSize="10" fill="#64748b">正则化 = 先验 · 点估计 → 分布估计 · 过拟合由先验自动控制</text>
    </svg>
  );
}
