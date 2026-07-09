"use client";

export function PrlMixtureEmDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="混合模型与EM算法">
      <defs>
        <linearGradient id="prl-me-gmm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-me-em" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-me-lv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-me-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">混合模型与 EM 算法</text>

      {/* 混合高斯 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">混合高斯模型（GMM）</text>

      <rect x="40" y="78" width="720" height="70" rx="10" fill="url(#prl-me-gmm)" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
      <text x="60" y="100" fontSize="11" fontWeight="700" fill="#1e40af">p(x) = Σ π_k N(x | μ_k, Σ_k)</text>
      <text x="60" y="120" fontSize="10" fill="#1e40af">K 个高斯分量加权求和 · π_k 为混合系数（Σπ_k=1） · 引入隐变量 z 指示样本属于哪个分量</text>
      <text x="60" y="138" fontSize="10" fill="#1e40af">问题：直接最大似然无解析解（对数里有 Σ → logΣ 无法分离）</text>

      {/* EM 算法 */}
      <text x="400" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">EM 算法：隐变量模型的迭代优化</text>

      {/* E步 */}
      <rect x="40" y="190" width="225" height="110" rx="10" fill="url(#prl-me-em)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="152" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">E 步（期望）</text>
      <text x="152" y="232" textAnchor="middle" fontSize="10" fill="#5b21b6">计算隐变量后验</text>
      <text x="60" y="252" fontSize="9" fill="#5b21b6">γ(z_nk) = p(z_nk=1|x_n)</text>
      <text x="60" y="268" fontSize="9" fill="#5b21b6">= π_k N(x_n|μ_k,Σ_k) / Σ_j π_j N(x_n|μ_j,Σ_j)</text>
      <text x="60" y="286" fontSize="9" fill="#5b21b6">责任度（responsibility）</text>

      <path d="M265 245 L288 245" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-me-arrow)" />

      {/* M步 */}
      <rect x="288" y="190" width="225" height="110" rx="10" fill="url(#prl-me-em)" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">M 步（最大化）</text>
      <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#5b21b6">用责任度更新参数</text>
      <text x="308" y="252" fontSize="9" fill="#5b21b6">N_k = Σ_n γ(z_nk)</text>
      <text x="308" y="268" fontSize="9" fill="#5b21b6">μ_k = (1/N_k) Σ_n γ(z_nk) x_n</text>
      <text x="308" y="284" fontSize="9" fill="#5b21b6">π_k = N_k / N, Σ_k 按责任加权</text>

      <path d="M513 245 L535 245" stroke="#64748b" strokeWidth="2" markerEnd="url(#prl-me-arrow)" />

      {/* 收敛 */}
      <rect x="535" y="190" width="225" height="110" rx="10" fill="url(#prl-me-em)" opacity="0.18" stroke="#7c3aed" strokeWidth="2" />
      <text x="647" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">收敛保证</text>
      <text x="555" y="232" fontSize="9" fill="#5b21b6">每轮 EM 使对数似然</text>
      <text x="555" y="248" fontSize="9" fill="#5b21b6">单调不减（ln p(X) ↑）</text>
      <text x="555" y="268" fontSize="9" fill="#5b21b6">E+M = 最大化下界</text>
      <text x="555" y="284" fontSize="9" fill="#5b21b6">收敛到局部最优</text>
      <text x="555" y="298" fontSize="9" fill="#5b21b6">需多次初始化</text>

      {/* EM 的推广 */}
      <text x="400" y="330" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">EM 的推广与变分推断</text>

      <rect x="40" y="344" width="225" height="90" rx="8" fill="url(#prl-me-lv)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="152" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">隐变量视角</text>
      <text x="60" y="384" fontSize="9" fill="#065f46">显式隐变量 z（GMM/聚类）</text>
      <text x="60" y="400" fontSize="9" fill="#065f46">EM = KL 散度最小化</text>
      <text x="60" y="416" fontSize="9" fill="#065f46">E步: q(Z)→p(Z|X) 近似</text>

      <rect x="288" y="344" width="225" height="90" rx="8" fill="url(#prl-me-lv)" opacity="0.18" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">变分 EM</text>
      <text x="308" y="384" fontSize="9" fill="#065f46">后验不可解析时</text>
      <text x="308" y="400" fontSize="9" fill="#065f46">用 q(Z) 近似 p(Z|X)</text>
      <text x="308" y="416" fontSize="9" fill="#065f46">最大化 ELBO = ln p(X) - KL(q||p)</text>

      <rect x="535" y="344" width="225" height="90" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="647" y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">应用与连接</text>
      <text x="555" y="384" fontSize="9" fill="#1e40af">聚类（K-means=GMM 极限）</text>
      <text x="555" y="400" fontSize="9" fill="#1e40af">图模型推断（ch7 连接）</text>
      <text x="555" y="416" fontSize="9" fill="#1e40af">VAE / 深度生成模型基础</text>

      {/* 底部 */}
      <rect x="40" y="450" width="720" height="80" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">EM 的本质</text>
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#64748b">通过引入隐变量将困难的最大似然问题分解为可交替求解的 E 步和 M 步</text>
      <text x="400" y="506" textAnchor="middle" fontSize="10" fill="#64748b">E 步推断隐变量分布 → M 步在已知隐变量分布下更新参数 → 对数似然单调上升</text>
      <text x="400" y="522" textAnchor="middle" fontSize="10" fill="#64748b">是变分推断、VAE、贝叶斯参数学习的通用框架</text>
    </svg>
  );
}
