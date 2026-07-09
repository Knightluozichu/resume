"use client";

export function DltProbabilityInfoDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="概率论与信息论核心概念图">
      <defs>
        <linearGradient id="dlt-pi-bayes" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-pi-info" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-pi-uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlt-pi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">概率论与信息论：不确定性建模</text>

      {/* 贝叶斯定理 */}
      <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">贝叶斯定理</text>

      <rect x="40" y="84" width="320" height="50" rx="8" fill="url(#dlt-pi-bayes)" opacity="0.9" />
      <text x="200" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">P(y|x) = P(x|y) · P(y) / P(x)</text>
      <text x="200" y="122" textAnchor="middle" fontSize="10" fill="#bfdbfe">后验 = 似然 × 先验 / 证据</text>

      <path d="M200 134 L200 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-pi-arrow)" />

      <rect x="40" y="142" width="150" height="40" rx="8" fill="url(#dlt-pi-bayes)" opacity="0.7" />
      <text x="115" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">MLE</text>
      <text x="115" y="174" textAnchor="middle" fontSize="9" fill="#bfdbfe">max P(x|θ)</text>

      <rect x="210" y="142" width="150" height="40" rx="8" fill="url(#dlt-pi-bayes)" opacity="0.7" />
      <text x="285" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">MAP</text>
      <text x="285" y="174" textAnchor="middle" fontSize="9" fill="#bfdbfe">max P(x|θ)P(θ)</text>

      <rect x="40" y="192" width="320" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="200" y="214" textAnchor="middle" fontSize="10" fill="#475569">L2正则=高斯先验MAP · L1正则=拉普拉斯先验MAP</text>

      {/* 信息论 */}
      <text x="560" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">信息论</text>

      <rect x="400" y="84" width="320" height="40" rx="8" fill="url(#dlt-pi-info)" opacity="0.9" />
      <text x="560" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">自信息 I(x) = -log P(x)</text>
      <text x="560" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">越不可能的事件信息量越大</text>

      <path d="M560 124 L560 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-pi-arrow)" />

      <rect x="400" y="132" width="320" height="40" rx="8" fill="url(#dlt-pi-info)" opacity="0.9" />
      <text x="560" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">香农熵 H(P) = -Σ P log P</text>
      <text x="560" y="164" textAnchor="middle" fontSize="9" fill="#ede9fe">分布的不确定性</text>

      <path d="M560 172 L560 178" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-pi-arrow)" />

      <rect x="400" y="180" width="320" height="40" rx="8" fill="url(#dlt-pi-info)" opacity="0.9" />
      <text x="560" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">交叉熵 H(P,Q) = -Σ P log Q</text>
      <text x="560" y="212" textAnchor="middle" fontSize="9" fill="#ede9fe">用Q编码P的数据</text>

      <path d="M560 220 L560 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-pi-arrow)" />

      <rect x="400" y="228" width="320" height="40" rx="8" fill="url(#dlt-pi-info)" opacity="0.85" />
      <text x="560" y="244" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">KL散度 D_KL(P||Q) = H(P,Q) - H(P)</text>
      <text x="560" y="260" textAnchor="middle" fontSize="9" fill="#ede9fe">非负 · 非对称 · 分布差异</text>

      {/* 统一视角 */}
      <rect x="40" y="300" width="740" height="50" rx="10" fill="url(#dlt-pi-uni)" opacity="0.12" stroke="#059669" strokeWidth="2" />
      <text x="410" y="322" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">统一视角：最大似然 = 最小化负对数似然 = 最小化交叉熵 = 最小化KL散度</text>
      <text x="410" y="340" textAnchor="middle" fontSize="11" fill="#059669">min_θ D_KL(P̂_data || P_model) = min_θ -E[log P_model(x;θ)] = 负对数似然</text>

      {/* 常见分布 */}
      <text x="200" y="384" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">常见分布</text>
      <rect x="40" y="392" width="150" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="115" y="412" textAnchor="middle" fontSize="10" fill="#1e40af">伯努利 Bernoulli</text>
      <rect x="210" y="392" width="150" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="285" y="412" textAnchor="middle" fontSize="10" fill="#1e40af">分类 Categorical</text>
      <rect x="380" y="392" width="150" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="455" y="412" textAnchor="middle" fontSize="10" fill="#1e40af">正态 N(μ,σ²)</text>
      <rect x="550" y="392" width="150" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="625" y="412" textAnchor="middle" fontSize="10" fill="#1e40af">Laplace</text>

      {/* 底部 */}
      <rect x="40" y="448" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="470" textAnchor="middle" fontSize="11" fill="#475569">分类损失 = 交叉熵 = KL散度最小化 · VAE ELBO 包含 KL 项 · 蒙特卡洛采样近似期望</text>

      <rect x="40" y="490" width="740" height="22" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="505" textAnchor="middle" fontSize="10" fill="#64748b">概率论 = 不确定性建模 · 信息论 = 不确定性度量 · 贝叶斯 = 信念更新</text>
    </svg>
  );
}
