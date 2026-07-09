"use client";

export function TbcInstructionSelectionDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书指令选择Maximal Munch树覆盖">
      <defs>
        <linearGradient id="tbc-is-ir" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-is-munch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tbc-is-asm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tbc-is-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">指令选择：Maximal Munch 树覆盖</text>

      {/* 顶部：IR树 → Munch → 汇编 */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">选择过程</text>

      <rect x="40" y="88" width="200" height="58" rx="10" fill="url(#tbc-is-ir)" opacity="0.95" />
      <text x="140" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">规范化 IR 树</text>
      <text x="140" y="132" textAnchor="middle" fontSize="11" fill="#e9d5ff">基本块内表达式树</text>

      <path d="M240 117 L296 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-is-arrow)" />

      <rect x="300" y="88" width="200" height="58" rx="10" fill="url(#tbc-is-munch)" opacity="0.95" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Maximal Munch</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#fef3c7">贪心覆盖最大子树</text>

      <path d="M500 117 L556 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-is-arrow)" />

      <rect x="560" y="88" width="200" height="58" rx="10" fill="url(#tbc-is-asm)" opacity="0.95" />
      <text x="660" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">目标指令序列</text>
      <text x="660" y="132" textAnchor="middle" fontSize="11" fill="#d1fae5">Jouette / MIPS 汇编</text>

      {/* 中部：树覆盖图示 */}
      <text x="200" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">IR 树（MOVE(MEM(+,k), +(TEMP,i))）</text>
      <text x="600" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">指令模板覆盖</text>

      <rect x="40" y="200" width="360" height="170" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="220" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">MOVE</text>
      <line x1="220" y1="232" x2="140" y2="258" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="220" y1="232" x2="300" y2="258" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="140" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">MEM</text>
      <text x="300" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">BINOP(+)</text>
      <line x1="140" y1="264" x2="140" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="300" y1="264" x2="250" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="300" y1="264" x2="350" y2="290" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="140" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">BINOP(+)</text>
      <text x="250" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">TEMP k</text>
      <text x="350" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">CONST i</text>
      <line x1="140" y1="296" x2="100" y2="322" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="140" y1="296" x2="180" y2="322" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="100" y="322" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">CONST j</text>
      <text x="180" y="322" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">TEMP fp</text>
      <rect x="56" y="338" width="240" height="22" rx="4" fill="url(#tbc-is-munch)" opacity="0.16" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="176" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">覆盖①：STORE M[k+j] := (TEMP+i)</text>

      <rect x="420" y="200" width="360" height="170" rx="8" fill="url(#tbc-is-munch)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="440" y="226" fontSize="12" fontWeight="700" fill="#92400e">模板：STORE M[e1] := e2</text>
      <text x="440" y="248" fontSize="11" fill="#475569">匹配 MOVE(MEM(e1), e2)</text>
      <text x="440" y="268" fontSize="11" fill="#475569">→ store 指令，地址 = e1</text>
      <text x="440" y="296" fontSize="12" fontWeight="700" fill="#92400e">模板：+(CONST, TEMP)</text>
      <text x="440" y="318" fontSize="11" fill="#475569">匹配 BINOP(+, CONST j, TEMP fp)</text>
      <text x="440" y="338" fontSize="11" fill="#475569">→ 框架偏移寻址 M[fp+j]</text>
      <text x="440" y="358" fontSize="11" fontWeight="700" fill="#047857">越大模板优先 munch，越少指令</text>

      {/* 底部：算法与输出 */}
      <text x="200" y="406" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Maximal Munch 算法</text>
      <text x="600" y="406" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">生成结果（含 TEMP 待分配）</text>

      <rect x="40" y="420" width="360" height="110" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="444" fontSize="11" fill="#475569">1. 从 IR 树根自顶向下遍历</text>
      <text x="60" y="464" fontSize="11" fill="#475569">2. 尝试用最大指令模板匹配当前子树</text>
      <text x="60" y="484" fontSize="11" fill="#475569">3. 命中则发射指令，递归剩余子树</text>
      <text x="60" y="504" fontSize="11" fill="#475569">4. TEMP 作为虚拟寄存器保留</text>
      <text x="60" y="524" fontSize="11" fontWeight="700" fill="#92400e">贪心未必最优，但实现简单高效</text>

      <rect x="420" y="420" width="360" height="110" rx="8" fill="url(#tbc-is-asm)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="446" fontSize="11" fontWeight="700" fill="#047857">mov t1, fp        # TEMP fp</text>
      <text x="440" y="466" fontSize="11" fontWeight="700" fill="#047857">addi t2, t1, i     # +(fp, i)</text>
      <text x="440" y="486" fontSize="11" fontWeight="700" fill="#047857">load t3, M[k+j]    # 地址 k+j</text>
      <text x="440" y="506" fontSize="11" fontWeight="700" fill="#047857">store t3, t2       # MOVE(MEM, ...)</text>
      <text x="440" y="526" fontSize="11" fill="#475569">t1/t2/t3 交寄存器分配器着色</text>
    </svg>
  );
}
