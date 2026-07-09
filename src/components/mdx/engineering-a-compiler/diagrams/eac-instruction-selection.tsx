"use client";

export function EacInstructionSelectionDiagram() {
  return (
    <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="指令选择树重写与动态规划">
      <defs>
        <linearGradient id="eac-isel-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eac-isel-dp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-isel-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">指令选择：IR 树 → 目标指令（树重写 + 动态规划）</text>

      {/* 左侧：IR 树 */}
      <rect x="20" y="60" width="280" height="200" rx="12" fill="url(#eac-isel-tree)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="160" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">IR 树（待覆盖）</text>
      <text x="60" y="115" fontSize="13" fill="#475569" fontFamily="monospace">      +</text>
      <text x="60" y="135" fontSize="13" fill="#475569" fontFamily="monospace">     / \</text>
      <text x="60" y="155" fontSize="13" fill="#475569" fontFamily="monospace">    a   *</text>
      <text x="60" y="175" fontSize="13" fill="#475569" fontFamily="monospace">       / \</text>
      <text x="60" y="195" fontSize="13" fill="#475569" fontFamily="monospace">      b   4</text>
      <text x="160" y="230" textAnchor="middle" fontSize="11" fill="#64748b">a + (b * 4) 的树形 IR</text>
      <text x="160" y="248" textAnchor="middle" fontSize="11" fill="#64748b">需用目标指令覆盖</text>

      <path d="M300 160 L340 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-isel-arrow)" />
      <text x="320" y="150" textAnchor="middle" fontSize="10" fill="#64748b">匹配</text>

      {/* 中间：树重写规则 */}
      <rect x="340" y="60" width="220" height="200" rx="12" fill="url(#eac-isel-tree)" opacity="0.14" stroke="#f59e0b" strokeWidth="2" />
      <text x="450" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">树重写规则</text>
      <text x="360" y="112" fontSize="11" fill="#475569" fontFamily="monospace">rule1: + → ADD  cost 1</text>
      <text x="360" y="132" fontSize="11" fill="#475569" fontFamily="monospace">rule2: * → MUL  cost 3</text>
      <text x="360" y="152" fontSize="11" fill="#475569" fontFamily="monospace">rule3: *(x,4) →</text>
      <text x="360" y="170" fontSize="11" fill="#475569" fontFamily="monospace">       SHL(x,2) cost 1</text>
      <text x="360" y="195" fontSize="11" fill="#475569" fontFamily="monospace">rule4: const → LOAD</text>
      <text x="450" y="225" textAnchor="middle" fontSize="11" fill="#64748b">每条规则 = 瓦片</text>
      <text x="450" y="243" textAnchor="middle" fontSize="11" fill="#64748b">+ 成本（周期数）</text>

      <path d="M560 160 L600 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-isel-arrow)" />
      <text x="580" y="150" textAnchor="middle" fontSize="10" fill="#64748b">DP 选优</text>

      {/* 右侧：最优覆盖 */}
      <rect x="600" y="60" width="180" height="200" rx="12" fill="url(#eac-isel-dp)" opacity="0.1" stroke="#059669" strokeWidth="2" />
      <text x="690" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">最优覆盖</text>
      <text x="620" y="115" fontSize="12" fill="#475569" fontFamily="monospace">SHL b, 2  → r1</text>
      <text x="620" y="138" fontSize="12" fill="#475569" fontFamily="monospace">LOAD a    → r2</text>
      <text x="620" y="161" fontSize="12" fill="#475569" fontFamily="monospace">ADD r2, r1→ r3</text>
      <text x="690" y="195" textAnchor="middle" fontSize="11" fill="#065f46">总成本 = 1+1+1 = 3</text>
      <text x="690" y="215" textAnchor="middle" fontSize="11" fill="#64748b">优于 MUL(3)+ADD(1)</text>
      <text x="690" y="235" textAnchor="middle" fontSize="11" fill="#64748b">= 4</text>

      {/* 底部：DP 说明 */}
      <text x="400" y="298" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">动态规划求最优覆盖</text>

      <rect x="30" y="315" width="740" height="110" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="50" y="340" fontSize="12" fontWeight="600" fill="#5b21b6">核心思路：对 IR 树每个子树，记录「用各规则覆盖的最小成本」，自底向上递推</text>
      <text x="50" y="362" fontSize="11" fill="#475569">Cost(node, rule) = rule.cost + Σ Cost(child, best_rule_for_child)</text>
      <text x="50" y="384" fontSize="11" fill="#475569">树形 DP 天然适合递归 IR：叶节点成本已知，内部节点取「自身规则成本 + 子树最优成本」的最小组合</text>
      <text x="50" y="406" fontSize="11" fill="#475569">边界：无规则可覆盖 = +∞（非法覆盖）；整棵树根的最优 rule 即全局最优指令序列</text>
    </svg>
  );
}
