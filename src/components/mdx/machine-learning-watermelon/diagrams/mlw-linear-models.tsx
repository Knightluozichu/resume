"use client";

export function MlwLinearModelsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="线性模型示意图">
      <defs>
        <linearGradient id="mlw-lm-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mlw-lm-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="mlw-lm-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mlw-lm2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">线性模型：从回归到分类</text>

      {/* 左侧：线性回归 */}
      <text x="160" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">线性回归</text>

      <rect x="40" y="76" width="240" height="44" rx="8" fill="url(#mlw-lm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="103" textAnchor="middle" fontSize="11" fill="#1e40af">f(x) = w^T x + b</text>

      <path d="M160 120 L160 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="40" y="130" width="240" height="44" rx="8" fill="url(#mlw-lm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="150" textAnchor="middle" fontSize="11" fill="#1e40af">最小二乘法</text>
      <text x="160" y="166" textAnchor="middle" fontSize="10" fill="#3b82f6">min Σ(yi - f(xi))²</text>

      <path d="M160 174 L160 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="40" y="184" width="240" height="44" rx="8" fill="url(#mlw-lm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="204" textAnchor="middle" fontSize="11" fill="#1e40af">闭式解</text>
      <text x="160" y="220" textAnchor="middle" fontSize="10" fill="#3b82f6">w* = (X^T X)^{-1} X^T y</text>

      <path d="M160 228 L160 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="40" y="238" width="240" height="44" rx="8" fill="url(#mlw-lm-blue)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="258" textAnchor="middle" fontSize="11" fill="#1e40af">广义线性模型</text>
      <text x="160" y="274" textAnchor="middle" fontSize="10" fill="#3b82f6">y = g⁻¹(w^T x + b)</text>

      {/* 中间：对数几率回归 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">对数几率回归（逻辑回归）</text>

      <rect x="280" y="76" width="240" height="44" rx="8" fill="url(#mlw-lm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="103" textAnchor="middle" fontSize="11" fill="#5b21b6">Sigmoid: σ(z) = 1 / (1 + e^{-z})</text>

      <path d="M400 120 L400 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="280" y="130" width="240" height="44" rx="8" fill="url(#mlw-lm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#5b21b6">对数几率</text>
      <text x="400" y="166" textAnchor="middle" fontSize="10" fill="#8b5cf6">ln(p/(1-p)) = w^T x + b</text>

      <path d="M400 174 L400 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="280" y="184" width="240" height="44" rx="8" fill="url(#mlw-lm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="204" textAnchor="middle" fontSize="11" fill="#5b21b6">极大似然估计</text>
      <text x="400" y="220" textAnchor="middle" fontSize="10" fill="#8b5cf6">max Σ[yi ln σ(zi)+(1-yi)ln(1-σ(zi))]</text>

      <path d="M400 228 L400 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="280" y="238" width="240" height="44" rx="8" fill="url(#mlw-lm-purple)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="258" textAnchor="middle" fontSize="11" fill="#5b21b6">梯度下降迭代求解</text>
      <text x="400" y="274" textAnchor="middle" fontSize="10" fill="#8b5cf6">w ← w + η X^T (y - σ(Xw))</text>

      {/* 右侧：LDA */}
      <text x="640" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">线性判别分析 LDA</text>

      <rect x="520" y="76" width="240" height="44" rx="8" fill="url(#mlw-lm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="103" textAnchor="middle" fontSize="11" fill="#065f46">类内散度小，类间散度大</text>

      <path d="M640 120 L640 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="520" y="130" width="240" height="44" rx="8" fill="url(#mlw-lm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="150" textAnchor="middle" fontSize="11" fill="#065f46">目标函数</text>
      <text x="640" y="166" textAnchor="middle" fontSize="10" fill="#10b981">max J = (w^T Sb w)/(w^T Sw w)</text>

      <path d="M640 174 L640 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="520" y="184" width="240" height="44" rx="8" fill="url(#mlw-lm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="204" textAnchor="middle" fontSize="11" fill="#065f46">广义特征值问题</text>
      <text x="640" y="220" textAnchor="middle" fontSize="10" fill="#10b981">Sb w = λ Sw w</text>

      <path d="M640 228 L640 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#mlw-lm2-arrow)" />

      <rect x="520" y="238" width="240" height="44" rx="8" fill="url(#mlw-lm-green)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="258" textAnchor="middle" fontSize="11" fill="#065f46">多类推广：C-1 个投影方向</text>

      {/* 底部：多分类扩展 */}
      <rect x="40" y="310" width="720" height="80" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="400" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">多分类学习策略</text>
      <text x="400" y="358" textAnchor="middle" fontSize="11" fill="#15803d">一对一（OvO）：N(N-1)/2 个二分类器，投票决出结果</text>
      <text x="400" y="376" textAnchor="middle" fontSize="11" fill="#15803d">一对多（OvR）：N 个二分类器，取置信度最高者</text>

      {/* 底部：类别不平衡 */}
      <rect x="40" y="410" width="720" height="56" rx="10" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="400" y="433" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">类别不平衡问题</text>
      <text x="400" y="453" textAnchor="middle" fontSize="11" fill="#b45309">再缩放策略：y'/(1-y') = (y/(1-y)) × (m⁻/m⁺)，阈值从 0.5 调整为 m⁺/(m⁺+m⁻)</text>

      {/* 底部说明 */}
      <rect x="40" y="486" width="720" height="48" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="506" textAnchor="middle" fontSize="11" fill="#475569">线性模型是 ML 的基础：简单可解释，是理解更复杂模型的起点</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#94a3b8">广义线性模型通过 link function g(·) 将线性组合映射到非线性空间</text>
    </svg>
  );
}
