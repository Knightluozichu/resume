"use client";

export function PrlGraphicalModelsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="图模型贝叶斯网络与马尔可夫随机场">
      <defs>
        <linearGradient id="prl-gm-bn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="prl-gm-mrf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prl-gm-inf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="prl-gm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图模型：概率依赖的可视化</text>

      {/* 贝叶斯网络 */}
      <text x="200" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">贝叶斯网络（有向）</text>

      <rect x="40" y="78" width="330" height="200" rx="10" fill="url(#prl-gm-bn)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />

      {/* 节点 */}
      <circle cx="120" cy="120" r="20" fill="url(#prl-gm-bn)" opacity="0.85" />
      <text x="120" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₁</text>
      <circle cx="280" cy="120" r="20" fill="url(#prl-gm-bn)" opacity="0.85" />
      <text x="280" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₂</text>
      <circle cx="200" cy="210" r="20" fill="url(#prl-gm-bn)" opacity="0.85" />
      <text x="200" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₃</text>
      <circle cx="120" cy="250" r="20" fill="url(#prl-gm-bn)" opacity="0.85" />
      <text x="120" y="254" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₄</text>
      <circle cx="280" cy="250" r="20" fill="url(#prl-gm-bn)" opacity="0.85" />
      <text x="280" y="254" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₅</text>

      {/* 有向边 */}
      <path d="M136 120 L264 120" stroke="#1e40af" strokeWidth="2" markerEnd="url(#prl-gm-arrow)" />
      <path d="M120 140 L185 195" stroke="#1e40af" strokeWidth="2" markerEnd="url(#prl-gm-arrow)" />
      <path d="M280 140 L215 195" stroke="#1e40af" strokeWidth="2" markerEnd="url(#prl-gm-arrow)" />
      <path d="M185 225 L134 236" stroke="#1e40af" strokeWidth="2" markerEnd="url(#prl-gm-arrow)" />
      <path d="M215 225 L266 236" stroke="#1e40af" strokeWidth="2" markerEnd="url(#prl-gm-arrow)" />

      <text x="205" y="100" textAnchor="middle" fontSize="9" fill="#1e40af">有向无环图（DAG）</text>

      <rect x="50" y="290" width="310" height="24" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="205" y="306" textAnchor="middle" fontSize="9" fill="#1e40af">联合分布 = Π p(x_i | pa(x_i))</text>

      {/* 马尔可夫随机场 */}
      <text x="590" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">马尔可夫随机场（无向）</text>

      <rect x="430" y="78" width="330" height="200" rx="10" fill="url(#prl-gm-mrf)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />

      {/* 节点 */}
      <circle cx="510" cy="120" r="20" fill="url(#prl-gm-mrf)" opacity="0.85" />
      <text x="510" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₁</text>
      <circle cx="680" cy="120" r="20" fill="url(#prl-gm-mrf)" opacity="0.85" />
      <text x="680" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₂</text>
      <circle cx="590" cy="210" r="20" fill="url(#prl-gm-mrf)" opacity="0.85" />
      <text x="590" y="214" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₃</text>
      <circle cx="510" cy="250" r="20" fill="url(#prl-gm-mrf)" opacity="0.85" />
      <text x="510" y="254" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₄</text>
      <circle cx="680" cy="250" r="20" fill="url(#prl-gm-mrf)" opacity="0.85" />
      <text x="680" y="254" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x₅</text>

      {/* 无向边 */}
      <line x1="530" y1="120" x2="660" y2="120" stroke="#5b21b6" strokeWidth="2.5" />
      <line x1="510" y1="140" x2="590" y2="190" stroke="#5b21b6" strokeWidth="2.5" />
      <line x1="680" y1="140" x2="590" y2="190" stroke="#5b21b6" strokeWidth="2.5" />
      <line x1="590" y1="230" x2="525" y2="240" stroke="#5b21b6" strokeWidth="2.5" />
      <line x1="590" y1="230" x2="665" y2="240" stroke="#5b21b6" strokeWidth="2.5" />
      <line x1="510" y1="270" x2="510" y2="270" stroke="#5b21b6" strokeWidth="2.5" />

      <text x="595" y="100" textAnchor="middle" fontSize="9" fill="#5b21b6">无向图 + 团势能</text>

      <rect x="440" y="290" width="310" height="24" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="595" y="306" textAnchor="middle" fontSize="9" fill="#5b21b6">联合分布 = (1/Z) Π ψ_C(x_C)</text>

      {/* 推断方法 */}
      <text x="400" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">图模型中的推断</text>

      <rect x="40" y="354" width="225" height="80" rx="8" fill="url(#prl-gm-inf)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="152" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">精确推断</text>
      <text x="60" y="394" fontSize="9" fill="#065f46">变量消除（VE）</text>
      <text x="60" y="410" fontSize="9" fill="#065f46">和积算法（树结构）</text>
      <text x="60" y="426" fontSize="9" fill="#065f46">置信传播 / 割集调整</text>

      <rect x="288" y="354" width="225" height="80" rx="8" fill="url(#prl-gm-inf)" opacity="0.18" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">近似推断</text>
      <text x="308" y="394" fontSize="9" fill="#065f46">变分推断（VI）</text>
      <text x="308" y="410" fontSize="9" fill="#065f46">环状置信传播</text>
      <text x="308" y="426" fontSize="9" fill="#065f46">采样方法（MCMC）</text>

      <rect x="535" y="354" width="225" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="647" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">学习</text>
      <text x="555" y="394" fontSize="9" fill="#1e40af">参数学习（MLE/贝叶斯）</text>
      <text x="555" y="410" fontSize="9" fill="#1e40af">结构学习</text>
      <text x="555" y="426" fontSize="9" fill="#1e40af">隐变量模型（EM 连接 ch8）</text>

      {/* 底部 */}
      <rect x="40" y="450" width="720" height="80" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="472" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">图模型的价值</text>
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#64748b">用图结构编码变量间条件独立性 → 联合分布的因子化分解 → 推断计算量指数级降低</text>
      <text x="400" y="506" textAnchor="middle" fontSize="10" fill="#64748b">贝叶斯网络=有向因果建模 · 马尔可夫随机场=无向相关建模 · 因子图统一两种</text>
      <text x="400" y="522" textAnchor="middle" fontSize="10" fill="#64748b">是混合模型（ch8）、变分推断、贝叶斯深度学习的基础表示工具</text>
    </svg>
  );
}
