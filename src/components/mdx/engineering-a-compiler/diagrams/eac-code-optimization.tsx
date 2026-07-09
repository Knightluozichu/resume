"use client";

export function EacCodeOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="代码优化数据流分析框架与冗余消除">
      <defs>
        <linearGradient id="eac-opt-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-opt-redund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-opt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代码优化：数据流分析 → 冗余消除 → 循环变换</text>

      {/* 数据流分析框架 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">数据流分析框架（四要素）</text>

      <rect x="30" y="78" width="180" height="70" rx="8" fill="url(#eac-opt-flow)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="120" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">① 方向 D</text>
      <text x="120" y="123" textAnchor="middle" fontSize="11" fill="#475569">前向 / 后向</text>
      <text x="120" y="139" textAnchor="middle" fontSize="11" fill="#475569">控制流传播方向</text>

      <rect x="220" y="78" width="180" height="70" rx="8" fill="url(#eac-opt-flow)" opacity="0.18" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">② 值域 V</text>
      <text x="310" y="123" textAnchor="middle" fontSize="11" fill="#475569">格（Lattice）</text>
      <text x="310" y="139" textAnchor="middle" fontSize="11" fill="#475569">如 {⊥, T, F, ⊤}</text>

      <rect x="410" y="78" width="180" height="70" rx="8" fill="url(#eac-opt-flow)" opacity="0.24" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">③ 传递函数 F</text>
      <text x="500" y="123" textAnchor="middle" fontSize="11" fill="#475569">block 内如何变换</text>
      <text x="500" y="139" textAnchor="middle" fontSize="11" fill="#475569">OUT[b] = F_b(IN[b])</text>

      <rect x="600" y="78" width="180" height="70" rx="8" fill="url(#eac-opt-flow)" opacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="690" y="103" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">④ 交汇运算 ∧</text>
      <text x="690" y="123" textAnchor="middle" fontSize="11" fill="#475569">前驱汇合</text>
      <text x="690" y="139" textAnchor="middle" fontSize="11" fill="#475569">IN[b] = ∧ OUT[p]</text>

      {/* 冗余消除三剑客 */}
      <text x="400" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">冗余消除三剑客</text>

      <rect x="30" y="205" width="230" height="120" rx="10" fill="url(#eac-opt-redund)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="145" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">局部值编号（LVN）</text>
      <text x="145" y="252" textAnchor="middle" fontSize="11" fill="#475569">基本块内：给每个值编号</text>
      <text x="145" y="270" textAnchor="middle" fontSize="11" fill="#475569">相同表达式 → 复用结果</text>
      <text x="145" y="290" textAnchor="middle" fontSize="11" fill="#475569">a+b 与 c+d 若编号相同</text>
      <text x="145" y="308" textAnchor="middle" fontSize="11" fill="#475569">→ 删除冗余计算</text>

      <rect x="285" y="205" width="230" height="120" rx="10" fill="url(#eac-opt-redund)" opacity="0.14" stroke="#059669" strokeWidth="2" />
      <text x="400" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">可用表达式</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#475569">全局前向分析</text>
      <text x="400" y="270" textAnchor="middle" fontSize="11" fill="#475569">表达式已计算且操作数未变</text>
      <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#475569">→ 直接复用，不重算</text>
      <text x="400" y="308" textAnchor="middle" fontSize="11" fill="#475569">IN[b] = ∧ OUT[p]</text>

      <rect x="540" y="205" width="230" height="120" rx="10" fill="url(#eac-opt-redund)" opacity="0.2" stroke="#059669" strokeWidth="2" />
      <text x="655" y="230" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">死代码消除（DCE）</text>
      <text x="655" y="252" textAnchor="middle" fontSize="11" fill="#475569">后向活跃变量分析</text>
      <text x="655" y="270" textAnchor="middle" fontSize="11" fill="#475569">结果无人使用 → 删除</text>
      <text x="655" y="290" textAnchor="middle" fontSize="11" fill="#475569">OUT[b] = ∧ IN[s]</text>
      <text x="655" y="308" textAnchor="middle" fontSize="11" fill="#475569">级联删除整条死链</text>

      {/* 循环优化 */}
      <rect x="30" y="345" width="740" height="100" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="370" fontSize="13" fontWeight="700" fill="#92400e">循环优化（基于支配关系与归纳变量）</text>
      <text x="50" y="393" fontSize="11" fill="#475569">归纳变量简化：用更便宜的变量替换昂贵运算（i++ 替代 p += 4）</text>
      <text x="50" y="413" fontSize="11" fill="#475569">循环不变量外提（LICM）：将循环中不变的运算移到循环前</text>
      <text x="50" y="433" fontSize="11" fill="#475569">强度削弱：用加法替代乘法（i*4 → t += 4），减少循环内开销</text>
    </svg>
  );
}
