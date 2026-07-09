"use client";

export function DlsBackpropagationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="反向传播计算图与链式法则">
      <defs>
        <linearGradient id="dls-bp-forward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-bp-backward" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="dls-bp-loss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dls-bp-fwd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="dls-bp-bwd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">计算图与反向传播</text>

      {/* 前向传播节点链 */}
      <text x="400" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">前向传播（蓝色，→）</text>

      <circle cx="120" cy="130" r="24" fill="url(#dls-bp-forward)" opacity="0.9" />
      <text x="120" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">x</text>

      <line x1="144" y1="130" x2="226" y2="130" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dls-bp-fwd-arrow)" />

      <circle cx="260" cy="130" r="28" fill="url(#dls-bp-forward)" opacity="0.9" />
      <text x="260" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">x²</text>
      <text x="260" y="140" textAnchor="middle" fontSize="8" fill="#fff">square</text>

      <line x1="288" y1="130" x2="370" y2="130" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dls-bp-fwd-arrow)" />
      <text x="329" y="120" textAnchor="middle" fontSize="10" fill="#1e40af">a</text>

      <circle cx="404" cy="130" r="28" fill="url(#dls-bp-forward)" opacity="0.9" />
      <text x="404" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">a·b</text>
      <text x="404" y="140" textAnchor="middle" fontSize="8" fill="#fff">mul</text>

      <line x1="432" y1="130" x2="514" y2="130" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dls-bp-fwd-arrow)" />
      <text x="473" y="120" textAnchor="middle" fontSize="10" fill="#1e40af">c</text>

      <circle cx="548" cy="130" r="28" fill="url(#dls-bp-loss)" opacity="0.9" />
      <text x="548" y="126" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">L</text>
      <text x="548" y="140" textAnchor="middle" fontSize="8" fill="#fff">loss</text>

      {/* b 输入 */}
      <circle cx="404" cy="230" r="22" fill="url(#dls-bp-forward)" opacity="0.7" />
      <text x="404" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">b</text>
      <line x1="404" y1="208" x2="404" y2="158" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" markerEnd="url(#dls-bp-fwd-arrow)" />

      {/* 反向传播链 */}
      <text x="400" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">反向传播（红色，←）梯度链式传递</text>

      <rect x="80" y="310" width="130" height="44" rx="8" fill="url(#dls-bp-backward)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="145" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">∂L/∂x = 2x·b</text>
      <text x="145" y="344" textAnchor="middle" fontSize="9" fill="#475569">上游梯度 × 局部导数</text>

      <rect x="230" y="310" width="130" height="44" rx="8" fill="url(#dls-bp-backward)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="295" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">∂L/∂a = b</text>
      <text x="295" y="344" textAnchor="middle" fontSize="9" fill="#475569">乘法节点的局部导数</text>

      <rect x="380" y="310" width="130" height="44" rx="8" fill="url(#dls-bp-backward)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="445" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">∂L/∂b = a</text>
      <text x="445" y="344" textAnchor="middle" fontSize="9" fill="#475569">乘法节点的局部导数</text>

      <rect x="530" y="310" width="130" height="44" rx="8" fill="url(#dls-bp-backward)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="595" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">∂L/∂c = 1</text>
      <text x="595" y="344" textAnchor="middle" fontSize="9" fill="#475569">损失对自身导数为1</text>

      {/* 反向箭头 */}
      <line x1="520" y1="310" x2="440" y2="310" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dls-bp-bwd-arrow)" />
      <line x1="380" y1="310" x2="300" y2="310" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dls-bp-bwd-arrow)" />
      <line x1="230" y1="310" x2="210" y2="310" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dls-bp-bwd-arrow)" />

      {/* 底部：关键原理 */}
      <rect x="60" y="390" width="340" height="56" rx="10" fill="#2563eb" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="230" y="412" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">加法节点：梯度原样传递</text>
      <text x="230" y="430" textAnchor="middle" fontSize="10" fill="#475569">∂(x+y)/∂x = 1, ∂(x+y)/∂y = 1</text>

      <rect x="420" y="390" width="340" height="56" rx="10" fill="#ef4444" opacity="0.08" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="412" textAnchor="middle" fontSize="12" fontWeight="600" fill="#dc2626">乘法节点：梯度「翻转」相乘</text>
      <text x="590" y="430" textAnchor="middle" fontSize="10" fill="#475569">∂(x·y)/∂x = y, ∂(x·y)/∂y = x</text>

      <rect x="60" y="460" width="700" height="46" rx="10" fill="url(#dls-bp-loss)" opacity="0.95" />
      <text x="410" y="488" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">链式法则：∂L/∂x = ∂L/∂y · ∂y/∂x，梯度沿计算图反向逐层累积</text>
    </svg>
  );
}
