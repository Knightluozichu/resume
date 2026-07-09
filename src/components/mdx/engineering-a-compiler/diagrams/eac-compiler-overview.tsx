"use client";

export function EacCompilerOverviewDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="编译器三段式架构与IR解耦">
      <defs>
        <linearGradient id="eac-ov-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-ov-middle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-ov-backend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="eac-ov-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">编译器三段式架构：IR 解耦前后端</text>

      {/* 前端 */}
      <rect x="30" y="70" width="220" height="160" rx="12" fill="url(#eac-ov-frontend)" opacity="0.1" stroke="#2563eb" strokeWidth="2" />
      <text x="140" y="98" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">前端（Frontend）</text>
      <rect x="50" y="115" width="180" height="32" rx="6" fill="#2563eb" opacity="0.85" />
      <text x="140" y="136" textAnchor="middle" fontSize="12" fill="#fff">词法扫描器 Scanner</text>
      <rect x="50" y="153" width="180" height="32" rx="6" fill="#2563eb" opacity="0.7" />
      <text x="140" y="174" textAnchor="middle" fontSize="12" fill="#fff">语法分析器 Parser</text>
      <rect x="50" y="191" width="180" height="32" rx="6" fill="#2563eb" opacity="0.55" />
      <text x="140" y="212" textAnchor="middle" fontSize="12" fill="#fff">上下文相关分析</text>

      {/* IR 桥梁 */}
      <path d="M250 150 L310 150" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-ov-arrow)" />
      <rect x="310" y="130" width="180" height="40" rx="8" fill="#0f172a" opacity="0.85" />
      <text x="400" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">IR（中间表示）</text>
      <path d="M490 150 L550 150" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-ov-arrow)" />

      {/* 中端：优化器 */}
      <rect x="310" y="70" width="180" height="50" rx="8" fill="url(#eac-ov-middle)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">中端：IR 优化器</text>

      {/* 后端 */}
      <rect x="550" y="70" width="220" height="160" rx="12" fill="url(#eac-ov-backend)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="660" y="98" textAnchor="middle" fontSize="15" fontWeight="700" fill="#92400e">后端（Backend）</text>
      <rect x="570" y="115" width="180" height="32" rx="6" fill="#f59e0b" opacity="0.85" />
      <text x="660" y="136" textAnchor="middle" fontSize="12" fill="#fff">指令选择</text>
      <rect x="570" y="153" width="180" height="32" rx="6" fill="#f59e0b" opacity="0.7" />
      <text x="660" y="174" textAnchor="middle" fontSize="12" fill="#fff">寄存器分配</text>
      <rect x="570" y="191" width="180" height="32" rx="6" fill="#f59e0b" opacity="0.55" />
      <text x="660" y="212" textAnchor="middle" fontSize="12" fill="#fff">指令调度</text>

      {/* 下方：复用矩阵 */}
      <text x="400" y="275" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">M × N 复用矩阵</text>
      <rect x="80" y="295" width="640" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="325" textAnchor="middle" fontSize="12" fill="#1e40af">M 种源语言</text>
      <text x="200" y="338" textAnchor="middle" fontSize="11" fill="#64748b">M 个前端</text>
      <text x="400" y="325" textAnchor="middle" fontSize="12" fill="#5b21b6">1 套 IR + 优化器</text>
      <text x="400" y="338" textAnchor="middle" fontSize="11" fill="#64748b">复用一次</text>
      <text x="600" y="325" textAnchor="middle" fontSize="12" fill="#92400e">N 种目标机</text>
      <text x="600" y="338" textAnchor="middle" fontSize="11" fill="#64748b">N 个后端</text>

      {/* 底部说明 */}
      <rect x="80" y="370" width="640" height="70" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="395" textAnchor="middle" fontSize="13" fontWeight="600" fill="#065f46">核心思想：IR 是前后端之间的契约</text>
      <text x="400" y="418" textAnchor="middle" fontSize="11" fill="#475569">前端只管源语言 → IR，后端只管 IR → 机器码，两端独立演进</text>
    </svg>
  );
}
