"use client";

export function TbcRegisterAllocationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="虎书寄存器分配图着色算法">
      <defs>
        <linearGradient id="tbc-ra-in" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tbc-ra-graph" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-ra-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tbc-ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">寄存器分配：干涉图 + 图着色</text>

      {/* 顶部：含TEMP指令 → 图着色 → 机器寄存器 */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">分配流程</text>

      <rect x="40" y="88" width="200" height="58" rx="10" fill="url(#tbc-ra-in)" opacity="0.95" />
      <text x="140" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">虚拟寄存器指令</text>
      <text x="140" y="132" textAnchor="middle" fontSize="11" fill="#fef3c7">t1 t2 t3 ...（无限 TEMP）</text>

      <path d="M240 117 L296 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-ra-arrow)" />

      <rect x="300" y="88" width="200" height="58" rx="10" fill="url(#tbc-ra-graph)" opacity="0.95" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">干涉图着色</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#e9d5ff">Chaitin-Briggs 算法</text>

      <path d="M500 117 L556 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-ra-arrow)" />

      <rect x="560" y="88" width="200" height="58" rx="10" fill="url(#tbc-ra-out)" opacity="0.95" />
      <text x="660" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">机器寄存器</text>
      <text x="660" y="132" textAnchor="middle" fontSize="11" fill="#d1fae5">r0 r1 r2 ...（有限 K 个）</text>

      {/* 中部：干涉图 + 着色过程 */}
      <text x="200" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">干涉图（同时活跃则连边）</text>
      <text x="600" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Simplify / Spill / Select</text>

      <rect x="40" y="200" width="360" height="180" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="120" cy="250" r="22" fill="url(#tbc-ra-graph)" opacity="0.30" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="120" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">t1</text>
      <circle cx="220" cy="250" r="22" fill="url(#tbc-ra-graph)" opacity="0.30" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="220" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">t2</text>
      <circle cx="320" cy="250" r="22" fill="url(#tbc-ra-graph)" opacity="0.30" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">t3</text>
      <circle cx="170" cy="340" r="22" fill="url(#tbc-ra-graph)" opacity="0.30" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="170" y="345" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">t4</text>
      <circle cx="270" cy="340" r="22" fill="url(#tbc-ra-graph)" opacity="0.30" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="270" y="345" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">t5</text>
      <line x1="142" y1="250" x2="198" y2="250" stroke="#475569" strokeWidth="1.8" />
      <line x1="242" y1="250" x2="298" y2="250" stroke="#475569" strokeWidth="1.8" />
      <line x1="120" y1="272" x2="170" y2="318" stroke="#475569" strokeWidth="1.8" />
      <line x1="220" y1="272" x2="170" y2="318" stroke="#475569" strokeWidth="1.8" />
      <line x1="220" y1="272" x2="270" y2="318" stroke="#475569" strokeWidth="1.8" />
      <line x1="320" y1="272" x2="270" y2="318" stroke="#475569" strokeWidth="1.8" />
      <line x1="192" y1="340" x2="248" y2="340" stroke="#475569" strokeWidth="1.8" />
      <text x="220" y="376" textAnchor="middle" fontSize="11" fill="#475569">边 = 两临时变量同时活跃（干涉）</text>

      <rect x="420" y="200" width="360" height="180" rx="8" fill="url(#tbc-ra-graph)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="224" fontSize="12" fontWeight="700" fill="#5b21b6">1. Simplify（简化）</text>
      <text x="440" y="244" fontSize="11" fill="#475569">删度数 &lt; K 的节点，压入栈</text>
      <text x="440" y="270" fontSize="12" fontWeight="700" fill="#b91c1c">2. Spill（潜在溢出）</text>
      <text x="440" y="290" fontSize="11" fill="#475569">无低度数节点时选一个标记</text>
      <text x="440" y="310" fontSize="11" fill="#475569">潜在溢出节点，压栈继续简化</text>
      <text x="440" y="336" fontSize="12" fontWeight="700" fill="#047857">3. Select（选择着色）</text>
      <text x="440" y="356" fontSize="11" fill="#475569">弹栈，选与邻居都不同的颜色</text>
      <text x="440" y="376" fontSize="11" fill="#475569">着色失败 → 实际溢出，重写后重来</text>

      {/* 底部：溢出与 move coalescing */}
      <text x="200" y="416" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">实际溢出处理</text>
      <text x="600" y="416" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">move coalescing（合并）</text>

      <rect x="40" y="430" width="360" height="120" rx="8" fill="url(#tbc-ra-in)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="454" fontSize="12" fontWeight="700" fill="#92400e">着色失败的临时变量溢出到栈</text>
      <text x="60" y="476" fontSize="11" fill="#475569">1. 在栈帧为它分配一个槽位</text>
      <text x="60" y="496" fontSize="11" fill="#475569">2. 每次使用前插入 load</text>
      <text x="60" y="516" fontSize="11" fill="#475569">3. 每次定义后插入 store</text>
      <text x="60" y="538" fontSize="11" fontWeight="700" fill="#b91c1c">重写后重建干涉图重新着色</text>

      <rect x="420" y="430" width="360" height="120" rx="8" fill="url(#tbc-ra-out)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="454" fontSize="12" fontWeight="700" fill="#047857">合并 move 相关节点消除 move 指令</text>
      <text x="440" y="476" fontSize="11" fill="#475569">MOVE(a, b) 且 a, b 不干涉</text>
      <text x="440" y="496" fontSize="11" fill="#475569">→ 合并为同一寄存器</text>
      <text x="440" y="516" fontSize="11" fill="#475569">减少 move 指令，提升性能</text>
      <text x="440" y="538" fontSize="11" fontWeight="700" fill="#5b21b6">Briggs / George 准则保证不引入溢出</text>
    </svg>
  );
}
