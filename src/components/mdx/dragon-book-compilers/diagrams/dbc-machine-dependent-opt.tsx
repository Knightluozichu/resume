"use client";

export function DbcMachineDependentOptDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="机器相关优化：指令调度与窥孔优化">
      <defs>
        <linearGradient id="dbc-mdo-sched" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dbc-mdo-peep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dbc-mdo-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器相关优化：指令调度 / 寄存器 / 窥孔</text>

      {/* 指令调度 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">指令调度（Instruction Scheduling）</text>

      <rect x="30" y="72" width="240" height="90" rx="10" fill="url(#dbc-mdo-sched)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="150" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">数据依赖</text>
      <text x="150" y="118" textAnchor="middle" fontSize="11" fill="#475569">RAW：写后读（真依赖）</text>
      <text x="150" y="138" textAnchor="middle" fontSize="11" fill="#475569">WAR：读后写（反依赖）</text>
      <text x="150" y="156" textAnchor="middle" fontSize="11" fill="#475569">WAW：写后写（输出依赖）</text>

      <rect x="290" y="72" width="240" height="90" rx="10" fill="url(#dbc-mdo-sched)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">列表调度</text>
      <text x="410" y="118" textAnchor="middle" fontSize="11" fill="#475569">优先级调度 + 资源约束</text>
      <text x="410" y="138" textAnchor="middle" fontSize="11" fill="#475569">每周期选无依赖指令发射</text>
      <text x="410" y="156" textAnchor="middle" fontSize="11" fill="#475569">填充分支延迟槽</text>

      <rect x="550" y="72" width="220" height="90" rx="10" fill="url(#dbc-mdo-sched)" opacity="0.28" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">流水线延迟</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#475569">访存延迟 / 分支延迟</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#475569">重排指令避免流水线停顿</text>
      <text x="660" y="156" textAnchor="middle" fontSize="11" fill="#475569">提高 ILP（指令级并行）</text>

      {/* 寄存器分配 */}
      <text x="400" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">寄存器分配与窥孔优化</text>

      <rect x="30" y="210" width="370" height="100" rx="10" fill="url(#dbc-mdo-peep)" opacity="0.08" stroke="#dc2626" strokeWidth="2" />
      <text x="50" y="234" fontSize="13" fontWeight="700" fill="#991b1b">寄存器分配（机器相关）</text>
      <text x="50" y="258" fontSize="11" fill="#475569">图着色：k 着色 = k 个物理寄存器</text>
      <text x="50" y="278" fontSize="11" fill="#475569">溢出：无法着色时存入内存</text>
      <text x="50" y="298" fontSize="11" fill="#475569">寄存器合并：消除不必要 move</text>

      <rect x="410" y="210" width="360" height="100" rx="10" fill="url(#dbc-mdo-peep)" opacity="0.16" stroke="#dc2626" strokeWidth="2" />
      <text x="430" y="234" fontSize="13" fontWeight="700" fill="#991b1b">窥孔优化（Peephole）</text>
      <text x="430" y="258" fontSize="11" fill="#475569">在目标码滑动窗口内做局部替换</text>
      <text x="430" y="278" fontSize="11" fill="#475569">冗余 load/store 消除</text>
      <text x="430" y="298" fontSize="11" fill="#475569">强度削弱：x*1 → x / x*0 → 0</text>

      {/* 缓存与分支优化 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">缓存与分支优化</text>

      <rect x="30" y="362" width="240" height="100" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">缓存友好布局</text>
      <text x="150" y="408" textAnchor="middle" fontSize="11" fill="#475569">循环交换 / 分块</text>
      <text x="150" y="428" textAnchor="middle" fontSize="11" fill="#475569">数据局部性优化</text>
      <text x="150" y="448" textAnchor="middle" fontSize="11" fill="#475569">减少 cache miss</text>

      <rect x="290" y="362" width="240" height="100" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">分支预测优化</text>
      <text x="410" y="408" textAnchor="middle" fontSize="11" fill="#475569">likely / unlikely 提示</text>
      <text x="410" y="428" textAnchor="middle" fontSize="11" fill="#475569">热点代码内联展开</text>
      <text x="410" y="448" textAnchor="middle" fontSize="11" fill="#475569">减少分支惩罚</text>

      <rect x="550" y="362" width="220" height="100" rx="10" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">指令选择</text>
      <text x="660" y="408" textAnchor="middle" fontSize="11" fill="#475569">树重写 / 模式匹配</text>
      <text x="660" y="428" textAnchor="middle" fontSize="11" fill="#475569">选择最省的指令序列</text>
      <text x="660" y="448" textAnchor="middle" fontSize="11" fill="#475569">如 LEA 替代 ADD+MOV</text>
    </svg>
  );
}
