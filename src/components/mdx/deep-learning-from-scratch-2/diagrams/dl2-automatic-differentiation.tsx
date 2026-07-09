"use client";

export function Dl2AutomaticDifferentiationDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="正向模式与反向模式自动微分对比">
      <defs>
        <linearGradient id="dl2-ad-forward" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="dl2-ad-reverse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <marker id="dl2-ad-fwd" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <marker id="dl2-ad-rev" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#7c3aed" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">自动微分：正向模式 vs 反向模式</text>
      <text x="400" y="52" textAnchor="middle" fontSize="12" fill="#64748b">以 z = (x + y)^2 为例</text>

      {/* 正向模式 */}
      <text x="200" y="86" textAnchor="middle" fontSize="14" fontWeight="700" fill="#2563eb">正向模式（forward-mode）</text>
      <text x="200" y="106" textAnchor="middle" fontSize="11" fill="#475569">沿计算图前向传递导数</text>

      <rect x="90" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-forward)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">x</text>
      <text x="130" y="156" textAnchor="middle" fontSize="9" fill="#3b82f6">dx=1</text>

      <path d="M170 142 L210 142" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-ad-fwd)" />

      <rect x="210" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-forward)" opacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
      <text x="250" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">t=x+y</text>
      <text x="250" y="156" textAnchor="middle" fontSize="9" fill="#3b82f6">dt=1</text>

      <path d="M290 142 L330 142" stroke="#2563eb" strokeWidth="2" markerEnd="url(#dl2-ad-fwd)" />

      <rect x="330" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-forward)" opacity="0.4" stroke="#2563eb" strokeWidth="1.5" />
      <text x="370" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">z=t^2</text>
      <text x="370" y="156" textAnchor="middle" fontSize="9" fill="#3b82f6">dz=2t</text>

      <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#64748b">一次传播 = 一个输入的导数</text>
      <text x="200" y="206" textAnchor="middle" fontSize="10" fill="#64748b">N 个输入 → N 次传播</text>

      {/* 反向模式 */}
      <text x="600" y="86" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed">反向模式（reverse-mode）</text>
      <text x="600" y="106" textAnchor="middle" fontSize="11" fill="#475569">沿计算图反向传递梯度</text>

      <rect x="490" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-reverse)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="530" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">x</text>
      <text x="530" y="156" textAnchor="middle" fontSize="9" fill="#7c3aed">grad=2t</text>

      <path d="M570 142 L530 142" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#dl2-ad-rev)" />

      <rect x="610" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-reverse)" opacity="0.25" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="650" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">t=x+y</text>
      <text x="650" y="156" textAnchor="middle" fontSize="9" fill="#7c3aed">grad=2t</text>

      <path d="M650 142 L690 142" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#dl2-ad-rev)" />

      <rect x="690" y="122" width="80" height="40" rx="8" fill="url(#dl2-ad-reverse)" opacity="0.4" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="730" y="140" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">z=t^2</text>
      <text x="730" y="156" textAnchor="middle" fontSize="9" fill="#7c3aed">grad=1</text>

      <text x="600" y="190" textAnchor="middle" fontSize="10" fill="#64748b">一次传播 = 所有输入的导数</text>
      <text x="600" y="206" textAnchor="middle" fontSize="10" fill="#64748b">M 个输出 → M 次传播</text>

      {/* 效率对比 */}
      <rect x="60" y="240" width="680" height="90" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">效率对比</text>
      <text x="400" y="286" textAnchor="middle" fontSize="11" fill="#64748b">正向模式：传播次数 = 输入数 N</text>
      <text x="400" y="304" textAnchor="middle" fontSize="11" fill="#64748b">反向模式：传播次数 = 输出数 M</text>
      <text x="400" y="322" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">深度学习：N = 数百万参数，M = 1 个损失 → 反向模式远优</text>

      {/* 链式法则 */}
      <rect x="60" y="350" width="680" height="60" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="374" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">链式法则：沿路径把各节点局部导数相乘</text>
      <text x="400" y="394" textAnchor="middle" fontSize="11" fill="#78350f">dz/dx = (dz/dt) × (dt/dx) = 2t × 1 = 2(x+y)</text>

      <text x="400" y="438" textAnchor="middle" fontSize="11" fill="#64748b">数值微分（差分近似） · 符号微分（代数规则） · 自动微分（计算图+链式法则）</text>
    </svg>
  );
}
