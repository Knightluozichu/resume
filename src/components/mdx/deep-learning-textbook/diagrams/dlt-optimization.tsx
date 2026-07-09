"use client";

export function DltOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="优化算法核心概念图">
      <defs>
        <linearGradient id="dlt-opt-sgd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-opt-mom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-opt-adam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dlt-opt-lr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlt-opt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">优化算法：在非凸地貌中找路</text>

      {/* SGD */}
      <text x="120" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">SGD</text>

      <rect x="40" y="84" width="160" height="44" rx="8" fill="url(#dlt-opt-sgd)" opacity="0.9" />
      <text x="120" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">θ ← θ - η∇L</text>
      <text x="120" y="120" textAnchor="middle" fontSize="8" fill="#bfdbfe">mini-batch 估计梯度</text>

      <path d="M120 128 L120 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-opt-arrow)" />

      <rect x="40" y="136" width="160" height="36" rx="8" fill="url(#dlt-opt-sgd)" opacity="0.6" />
      <text x="120" y="158" textAnchor="middle" fontSize="9" fill="#bfdbfe">噪声有益·跳出鞍点</text>

      {/* 动量 */}
      <text x="300" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Momentum</text>

      <rect x="220" y="84" width="160" height="44" rx="8" fill="url(#dlt-opt-mom)" opacity="0.9" />
      <text x="300" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">v = μv - η∇L</text>
      <text x="300" y="120" textAnchor="middle" fontSize="8" fill="#ede9fe">θ ← θ + v</text>

      <path d="M300 128 L300 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-opt-arrow)" />

      <rect x="220" y="136" width="160" height="36" rx="8" fill="url(#dlt-opt-mom)" opacity="0.6" />
      <text x="300" y="158" textAnchor="middle" fontSize="9" fill="#ede9fe">累积历史方向·加速</text>

      {/* RMSProp */}
      <text x="480" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">RMSProp</text>

      <rect x="400" y="84" width="160" height="44" rx="8" fill="url(#dlt-opt-adam)" opacity="0.7" />
      <text x="480" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">r = ρr + (1-ρ)∇²</text>
      <text x="480" y="120" textAnchor="middle" fontSize="8" fill="#fef3c7">自适应学习率</text>

      <path d="M480 128 L480 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-opt-arrow)" />

      <rect x="400" y="136" width="160" height="36" rx="8" fill="url(#dlt-opt-adam)" opacity="0.4" />
      <text x="480" y="158" textAnchor="middle" fontSize="9" fill="#fef3c7">指数衰减·不早停</text>

      {/* Adam */}
      <text x="660" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Adam</text>

      <rect x="580" y="84" width="160" height="44" rx="8" fill="url(#dlt-opt-adam)" opacity="0.9" />
      <text x="660" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">动量 + RMSProp</text>
      <text x="660" y="120" textAnchor="middle" fontSize="8" fill="#fef3c7">偏差校正</text>

      <path d="M660 128 L660 134" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlt-opt-arrow)" />

      <rect x="580" y="136" width="160" height="36" rx="8" fill="url(#dlt-opt-adam)" opacity="0.6" />
      <text x="660" y="158" textAnchor="middle" fontSize="9" fill="#fef3c7">最常用·超参数不敏感</text>

      {/* 演进箭头 */}
      <path d="M200 100 L220 100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-opt-arrow)" />
      <path d="M380 100 L400 100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-opt-arrow)" />
      <path d="M560 100 L580 100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlt-opt-arrow)" />

      {/* 学习率调度 */}
      <text x="200" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">学习率调度</text>

      <rect x="40" y="220" width="150" height="30" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="115" y="239" textAnchor="middle" fontSize="9" fill="#065f46">阶梯衰减 γ^⌊t/s⌋</text>
      <rect x="210" y="220" width="150" height="30" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="285" y="239" textAnchor="middle" fontSize="9" fill="#065f46">余弦退火 cos(πt/T)</text>
      <rect x="380" y="220" width="150" height="30" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="455" y="239" textAnchor="middle" fontSize="9" fill="#065f46">Warmup 线性增长</text>
      <rect x="550" y="220" width="190" height="30" rx="6" fill="url(#dlt-opt-lr)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="645" y="239" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">Warmup+余弦 = 大模型标配</text>

      {/* 学习率曲线 */}
      <text x="200" y="280" textAnchor="middle" fontSize="10" fill="#475569">学习率 η</text>
      <path d="M40 320 Q80 290 120 295 L160 300 Q250 310 350 320 Q500 340 700 348" stroke="#059669" strokeWidth="2" fill="none" />
      <text x="60" y="312" fontSize="8" fill="#059669">Warmup</text>
      <text x="300" y="312" fontSize="8" fill="#059669">余弦退火</text>
      <text x="710" y="355" fontSize="8" fill="#64748b">→ 训练步数</text>

      {/* 挑战 */}
      <text x="200" y="380" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">优化挑战</text>
      <rect x="40" y="390" width="160" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="120" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">病态 (Hessian条件数大)</text>
      <rect x="210" y="390" width="160" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="290" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">鞍点 (梯度零但非最优)</text>
      <rect x="380" y="390" width="160" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="460" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">平坦区域 (梯度≈0)</text>
      <rect x="550" y="390" width="190" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="645" y="408" textAnchor="middle" fontSize="9" fill="#991b1b">梯度消失/爆炸</text>

      {/* 一阶 vs 二阶 */}
      <rect x="40" y="440" width="360" height="36" rx="8" fill="url(#dlt-opt-sgd)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="220" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">一阶方法(SGD/Adam): O(N) 可扩展</text>

      <rect x="420" y="440" width="320" height="36" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="580" y="462" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">二阶方法(牛顿): O(N³) 不可行</text>

      {/* 底部 */}
      <rect x="40" y="490" width="740" height="22" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="410" y="505" textAnchor="middle" fontSize="10" fill="#64748b">深度学习优化 = 非凸 + 高维 + 鞍点 · 一阶方法 + GPU并行 = 可扩展训练</text>
    </svg>
  );
}
