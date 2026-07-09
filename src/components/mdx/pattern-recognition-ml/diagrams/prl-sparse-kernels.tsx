"use client";

export function PrlSparseKernelsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="稀疏核机与支持向量机">
      <defs>
        <linearGradient id="prl-sk-margin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="prl-sk-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prl-sk-svr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-sk-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">稀疏核机：支持向量机</text>

      {/* 最大间隔分类器 */}
      <text x="400" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">最大间隔分类器</text>

      {/* 示意图：间隔与支持向量 */}
      <rect x="40" y="78" width="350" height="200" rx="10" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="215" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">间隔最大化示意</text>

      {/* 决策边界 */}
      <line x1="80" y1="220" x2="350" y2="110" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="80" y1="250" x2="350" y2="140" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="6 4" />
      <line x1="80" y1="190" x2="350" y2="80" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="355" y="108" fontSize="9" fill="#991b1b">wᵀx+b=0</text>
      <text x="355" y="142" fontSize="9" fill="#991b1b">+间隔</text>
      <text x="355" y="82" fontSize="9" fill="#991b1b">-间隔</text>

      {/* 支持向量（圆点） */}
      <circle cx="120" cy="200" r="6" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="180" cy="178" r="6" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="280" cy="96" r="6" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
      <circle cx="320" cy="78" r="6" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />

      {/* 普通样本（小点） */}
      <circle cx="100" cy="235" r="4" fill="#2563eb" opacity="0.5" />
      <circle cx="140" cy="255" r="4" fill="#2563eb" opacity="0.5" />
      <circle cx="160" cy="220" r="4" fill="#2563eb" opacity="0.5" />
      <circle cx="200" cy="248" r="4" fill="#2563eb" opacity="0.5" />
      <circle cx="300" cy="60" r="4" fill="#dc2626" opacity="0.5" />
      <circle cx="260" cy="55" r="4" fill="#dc2626" opacity="0.5" />
      <circle cx="330" cy="52" r="4" fill="#dc2626" opacity="0.5" />

      <text x="120" y="208" fontSize="8" fill="#1e3a8a">SV</text>
      <text x="280" y="88" fontSize="8" fill="#7f1d1d">SV</text>
      <text x="215" y="270" textAnchor="middle" fontSize="9" fill="#475569">圆圈=支持向量（落在间隔边界）</text>

      {/* 公式 */}
      <rect x="410" y="78" width="350" height="200" rx="10" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="585" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">间隔最大化</text>
      <text x="585" y="120" textAnchor="middle" fontSize="10" fill="#92400e">最大化 2/‖w‖</text>
      <text x="585" y="138" textAnchor="middle" fontSize="10" fill="#92400e">≡ 最小化 ½‖w‖²</text>
      <text x="585" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">约束：t_n(wᵀφ(x_n)+b) ≥ 1</text>
      <text x="585" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">拉格朗日对偶</text>
      <text x="585" y="204" textAnchor="middle" fontSize="9" fill="#991b1b">max L(a) = Σa_n - ½ΣΣ a_n a_m t_n t_m k(x_n,x_m)</text>
      <text x="585" y="222" textAnchor="middle" fontSize="9" fill="#991b1b">约束 0 ≤ a_n, Σa_n t_n = 0</text>
      <text x="585" y="244" textAnchor="middle" fontSize="10" fill="#92400e">a_n &gt; 0 的样本 = 支持向量</text>
      <text x="585" y="262" textAnchor="middle" fontSize="9" fill="#92400e">预测 y(x)=Σ a_n t_n k(x_n,x)+b</text>

      {/* 软间隔 */}
      <rect x="40" y="300" width="370" height="80" rx="8" fill="url(#prl-sk-soft)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="225" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">软间隔：允许少量违反</text>
      <text x="60" y="340" fontSize="9" fill="#92400e">松弛变量 ξ_n ≥ 0   引入容错</text>
      <text x="60" y="356" fontSize="9" fill="#92400e">目标：min ½‖w‖² + C Σξ_n</text>
      <text x="60" y="372" fontSize="9" fill="#92400e">C 大=严格 · C 小=容忍噪声</text>

      {/* 支持向量回归 */}
      <rect x="430" y="300" width="330" height="80" rx="8" fill="url(#prl-sk-svr)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="595" y="320" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">支持向量回归（SVR）</text>
      <text x="450" y="340" fontSize="9" fill="#065f46">ε 不敏感损失：|t-y| &lt; ε 时损失为 0</text>
      <text x="450" y="356" fontSize="9" fill="#065f46">间隔带内样本不计损失 → 稀疏</text>
      <text x="450" y="372" fontSize="9" fill="#065f46">只有间隔带外的样本成为支持向量</text>

      {/* 底部 */}
      <rect x="40" y="400" width="720" height="130" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="422" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">SVM 的稀疏性</text>
      <text x="400" y="440" textAnchor="middle" fontSize="10" fill="#64748b">预测只依赖支持向量（a_n &gt; 0 的样本），大量样本 a_n=0 可丢弃</text>
      <text x="400" y="458" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">与核方法的统一</text>
      <text x="400" y="476" textAnchor="middle" fontSize="10" fill="#64748b">SVM = 核方法 + 最大间隔 + 稀疏性   ·   核技巧隐式高维映射</text>
      <text x="400" y="494" textAnchor="middle" fontSize="10" fill="#64748b">最大间隔控制泛化（结构风险最小化）  ·  稀疏性使预测高效</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#64748b">与高斯过程对比：SVM 稀疏但非概率；GP 概率但非稀疏</text>
    </svg>
  );
}
