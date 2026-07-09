"use client";

export function EacIrGenerationDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="中间表示生成AST到三地址码SSA与CFG">
      <defs>
        <linearGradient id="eac-ir-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-ir-tac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-ir-ssa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-ir-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">IR 生成：AST → 线性化 → SSA + CFG</text>

      {/* AST */}
      <rect x="20" y="60" width="200" height="200" rx="12" fill="url(#eac-ir-ast)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="120" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">AST（抽象语法树）</text>
      <text x="120" y="110" textAnchor="middle" fontSize="11" fill="#475569">Assign</text>
      <text x="120" y="128" textAnchor="middle" fontSize="11" fill="#475569">├── a</text>
      <text x="120" y="146" textAnchor="middle" fontSize="11" fill="#475569">└── +</text>
      <text x="120" y="164" textAnchor="middle" fontSize="11" fill="#475569">    ├── b</text>
      <text x="120" y="182" textAnchor="middle" fontSize="11" fill="#475569">    └── *</text>
      <text x="120" y="200" textAnchor="middle" fontSize="11" fill="#475569">        ├── c</text>
      <text x="120" y="218" textAnchor="middle" fontSize="11" fill="#475569">        └── 2</text>
      <text x="120" y="248" textAnchor="middle" fontSize="11" fill="#64748b">树形，与源语言耦合</text>

      <path d="M220 160 L260 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-ir-arrow)" />
      <text x="240" y="150" textAnchor="middle" fontSize="10" fill="#64748b">线性化</text>

      {/* TAC */}
      <rect x="260" y="60" width="240" height="200" rx="12" fill="url(#eac-ir-tac)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="380" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">三地址码（TAC）</text>
      <text x="280" y="115" fontSize="12" fill="#475569" fontFamily="monospace">t1 = c * 2</text>
      <text x="280" y="138" fontSize="12" fill="#475569" fontFamily="monospace">t2 = b + t1</text>
      <text x="280" y="161" fontSize="12" fill="#475569" fontFamily="monospace">a  = t2</text>
      <text x="380" y="195" textAnchor="middle" fontSize="11" fill="#475569">每条指令 ≤ 3 操作数</text>
      <text x="380" y="213" textAnchor="middle" fontSize="11" fill="#475569">临时变量展平嵌套</text>
      <text x="380" y="240" textAnchor="middle" fontSize="11" fill="#64748b">线性，机器无关</text>

      <path d="M500 160 L540 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-ir-arrow)" />
      <text x="520" y="150" textAnchor="middle" fontSize="10" fill="#64748b">SSA 化</text>

      {/* SSA + CFG */}
      <rect x="540" y="60" width="240" height="200" rx="12" fill="url(#eac-ir-ssa)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="660" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">SSA + CFG</text>
      <text x="560" y="115" fontSize="11" fill="#475569" fontFamily="monospace">B0: t1 = c * 2</text>
      <text x="560" y="135" fontSize="11" fill="#475569" fontFamily="monospace">    t2 = b + t1</text>
      <text x="560" y="155" fontSize="11" fill="#475569" fontFamily="monospace">    if t2 goto B2</text>
      <text x="560" y="175" fontSize="11" fill="#475569" fontFamily="monospace">B1: t3 = 0</text>
      <text x="560" y="195" fontSize="11" fill="#475569" fontFamily="monospace">B2: t4 = phi(t2,t3)</text>
      <text x="660" y="225" textAnchor="middle" fontSize="11" fill="#065f46">每变量赋值一次</text>
      <text x="660" y="243" textAnchor="middle" fontSize="11" fill="#065f46">φ 函数合并控制流</text>

      {/* 底部：三种 IR 特性 */}
      <text x="400" y="298" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">IR 设计权衡：线性 vs 图形 vs SSA</text>

      <rect x="30" y="315" width="240" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="338" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">线性 IR（TAC / 栈式）</text>
      <text x="150" y="358" textAnchor="middle" fontSize="11" fill="#475569">简单易生成，顺序遍历</text>

      <rect x="280" y="315" width="240" height="60" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="338" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">图形 IR（CFG / 数据流）</text>
      <text x="400" y="358" textAnchor="middle" fontSize="11" fill="#475569">显式控制流，分析友好</text>

      <rect x="530" y="315" width="240" height="60" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="338" textAnchor="middle" fontSize="12" fontWeight="600" fill="#065f46">SSA（静态单赋值）</text>
      <text x="650" y="358" textAnchor="middle" fontSize="11" fill="#475569">优化精确，现代编译器主流</text>

      <rect x="30" y="395" width="740" height="50" rx="8" fill="#0f172a" opacity="0.85" />
      <text x="400" y="420" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">SSA = 显式数据流 + 精确 def-use 链 → 让优化 pass 写得更简单更高效</text>
      <text x="400" y="437" textAnchor="middle" fontSize="11" fill="#94a3b8">LLVM IR / GCC GIMPLE / Java JIT HotSpot 都是 SSA 形式</text>
    </svg>
  );
}
