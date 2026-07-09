"use client";

export function DltDeepNetworksDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="深度网络原理核心概念图">
      <defs>
        <linearGradient id="dlt-dn-fwd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlt-dn-act" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlt-dn-bp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dlt-dn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dlt-dn-back" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#d97706" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">深度网络：可微的函数逼近器</text>

      {/* 前向网络结构 */}
      <text x="400" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">前馈网络结构</text>

      {/* 输入层 */}
      <circle cx="100" cy="120" r="14" fill="url(#dlt-dn-fwd)" opacity="0.9" />
      <circle cx="100" cy="160" r="14" fill="url(#dlt-dn-fwd)" opacity="0.9" />
      <circle cx="100" cy="200" r="14" fill="url(#dlt-dn-fwd)" opacity="0.9" />
      <text x="60" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">输入 x</text>

      {/* 隐藏层1 */}
      <circle cx="280" cy="100" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="280" cy="140" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="280" cy="180" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="280" cy="220" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <text x="280" y="80" textAnchor="middle" fontSize="10" fill="#5b21b6">h⁽¹⁾=σ(W⁽¹⁾x+b⁽¹⁾)</text>

      {/* 隐藏层2 */}
      <circle cx="460" cy="100" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="460" cy="140" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="460" cy="180" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <circle cx="460" cy="220" r="14" fill="url(#dlt-dn-act)" opacity="0.9" />
      <text x="460" y="80" textAnchor="middle" fontSize="10" fill="#5b21b6">h⁽²⁾=σ(W⁽²⁾h⁽¹⁾+b⁽²⁾)</text>

      {/* 输出层 */}
      <circle cx="640" cy="140" r="14" fill="url(#dlt-dn-fwd)" opacity="0.9" />
      <circle cx="640" cy="180" r="14" fill="url(#dlt-dn-fwd)" opacity="0.9" />
      <text x="690" y="160" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">输出 ŷ</text>

      {/* 连接线 */}
      <g stroke="#94a3b8" strokeWidth="0.8" opacity="0.4">
        <line x1="114" y1="120" x2="266" y2="100" />
        <line x1="114" y1="120" x2="266" y2="140" />
        <line x1="114" y1="120" x2="266" y2="180" />
        <line x1="114" y1="120" x2="266" y2="220" />
        <line x1="114" y1="160" x2="266" y2="100" />
        <line x1="114" y1="160" x2="266" y2="140" />
        <line x1="114" y1="160" x2="266" y2="180" />
        <line x1="114" y1="160" x2="266" y2="220" />
        <line x1="114" y1="200" x2="266" y2="100" />
        <line x1="114" y1="200" x2="266" y2="140" />
        <line x1="114" y1="200" x2="266" y2="180" />
        <line x1="114" y1="200" x2="266" y2="220" />
        <line x1="294" y1="100" x2="446" y2="100" />
        <line x1="294" y1="100" x2="446" y2="140" />
        <line x1="294" y1="100" x2="446" y2="180" />
        <line x1="294" y1="100" x2="446" y2="220" />
        <line x1="294" y1="140" x2="446" y2="100" />
        <line x1="294" y1="140" x2="446" y2="140" />
        <line x1="294" y1="140" x2="446" y2="180" />
        <line x1="294" y1="140" x2="446" y2="220" />
        <line x1="294" y1="180" x2="446" y2="100" />
        <line x1="294" y1="180" x2="446" y2="140" />
        <line x1="294" y1="180" x2="446" y2="180" />
        <line x1="294" y1="180" x2="446" y2="220" />
        <line x1="294" y1="220" x2="446" y2="100" />
        <line x1="294" y1="220" x2="446" y2="140" />
        <line x1="294" y1="220" x2="446" y2="180" />
        <line x1="294" y1="220" x2="446" y2="220" />
        <line x1="474" y1="100" x2="626" y2="140" />
        <line x1="474" y1="100" x2="626" y2="180" />
        <line x1="474" y1="140" x2="626" y2="140" />
        <line x1="474" y1="140" x2="626" y2="180" />
        <line x1="474" y1="180" x2="626" y2="140" />
        <line x1="474" y1="180" x2="626" y2="180" />
        <line x1="474" y1="220" x2="626" y2="140" />
        <line x1="474" y1="220" x2="626" y2="180" />
      </g>

      {/* 前向/反向标注 */}
      <path d="M380 270 L420 270" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dlt-dn-arrow)" />
      <text x="430" y="274" fontSize="10" fill="#2563eb">前向传播</text>
      <path d="M460 286 L420 286" stroke="#d97706" strokeWidth="2" markerEnd="url(#dlt-dn-back)" />
      <text x="380" y="290" textAnchor="end" fontSize="10" fill="#d97706">反向传播(梯度)</text>

      {/* 激活函数 */}
      <text x="140" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">激活函数</text>
      <rect x="40" y="350" width="200" height="28" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="140" y="368" textAnchor="middle" fontSize="10" fill="#5b21b6">Sigmoid σ(x)=1/(1+e⁻ˣ)</text>
      <rect x="40" y="384" width="200" height="28" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="140" y="402" textAnchor="middle" fontSize="10" fill="#5b21b6">ReLU max(0,x) ← 默认</text>
      <rect x="40" y="418" width="200" height="28" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="140" y="436" textAnchor="middle" fontSize="10" fill="#5b21b6">Leaky ReLU max(0.01x,x)</text>

      {/* 万能逼近 */}
      <text x="400" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">万能逼近定理</text>
      <rect x="280" y="350" width="240" height="56" rx="8" fill="url(#dlt-dn-fwd)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">足够宽的单隐层网络</text>
      <text x="400" y="386" textAnchor="middle" fontSize="10" fill="#1e40af">→ 任意精度逼近任意连续函数</text>
      <text x="400" y="400" textAnchor="middle" fontSize="9" fill="#64748b">但深度比宽度更高效</text>

      {/* 梯度问题 */}
      <text x="660" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">梯度问题</text>
      <rect x="540" y="350" width="220" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="650" y="368" textAnchor="middle" fontSize="10" fill="#991b1b">梯度消失: sigmoid饱和</text>
      <rect x="540" y="384" width="220" height="28" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="650" y="402" textAnchor="middle" fontSize="10" fill="#991b1b">梯度爆炸: 连乘 &gt; 1</text>
      <rect x="540" y="418" width="220" height="28" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="650" y="436" textAnchor="middle" fontSize="10" fill="#065f46">解决: ReLU/残差/BatchNorm</text>

      {/* 底部 */}
      <rect x="40" y="462" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="484" textAnchor="middle" fontSize="11" fill="#475569">反向传播 = 链式法则在计算图上的高效实现 · 复杂度 O(N) 与参数量同阶</text>
    </svg>
  );
}
