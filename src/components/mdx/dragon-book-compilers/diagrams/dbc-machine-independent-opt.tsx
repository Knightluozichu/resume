"use client";

export function DbcMachineIndependentOptDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="机器无关优化：数据流分析与冗余消除">
      <defs>
        <linearGradient id="dbc-mio-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dbc-mio-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dbc-mio-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">机器无关优化：数据流分析 → 冗余消除 → 循环变换</text>

      {/* 数据流分析 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">数据流分析（迭代到不动点）</text>

      <rect x="30" y="72" width="240" height="90" rx="10" fill="url(#dbc-mio-flow)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">到达定义分析</text>
      <text x="150" y="118" textAnchor="middle" fontSize="11" fill="#475569">前向 / 并集交汇</text>
      <text x="150" y="138" textAnchor="middle" fontSize="11" fill="#475569">哪些定义能到达某点</text>
      <text x="150" y="156" textAnchor="middle" fontSize="11" fill="#475569">OUT = GEN ∪ (IN - KILL)</text>

      <rect x="290" y="72" width="240" height="90" rx="10" fill="url(#dbc-mio-flow)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">可用表达式分析</text>
      <text x="410" y="118" textAnchor="middle" fontSize="11" fill="#475569">前向 / 交集交汇</text>
      <text x="410" y="138" textAnchor="middle" fontSize="11" fill="#475569">已计算且操作数未变</text>
      <text x="410" y="156" textAnchor="middle" fontSize="11" fill="#475569">IN = ∩ OUT[p]</text>

      <rect x="550" y="72" width="220" height="90" rx="10" fill="url(#dbc-mio-flow)" opacity="0.28" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="660" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">活跃变量分析</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#475569">后向 / 并集交汇</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#475569">变量在之后是否被使用</text>
      <text x="660" y="156" textAnchor="middle" fontSize="11" fill="#475569">OUT = ∪ IN[s]</text>

      {/* 优化技术 */}
      <text x="400" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">核心优化技术</text>

      <rect x="30" y="210" width="370" height="100" rx="10" fill="url(#dbc-mio-opt)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="50" y="234" fontSize="13" fontWeight="700" fill="#065f46">公共子表达式消除（CSE）</text>
      <text x="50" y="258" fontSize="11" fill="#475569">a = b + c; d = b + c → d = a</text>
      <text x="50" y="278" fontSize="11" fill="#475569">基于可用表达式分析</text>
      <text x="50" y="298" fontSize="11" fill="#475569">消除重复计算，复用已有结果</text>

      <rect x="410" y="210" width="360" height="100" rx="10" fill="url(#dbc-mio-opt)" opacity="0.16" stroke="#059669" strokeWidth="2" />
      <text x="430" y="234" fontSize="13" fontWeight="700" fill="#065f46">常量传播（Constant Propagation）</text>
      <text x="430" y="258" fontSize="11" fill="#475569">x = 5; y = x + 1 → y = 6</text>
      <text x="430" y="278" fontSize="11" fill="#475569">前向数据流，值域 &#123;⊥, c, NAC, ⊤&#125;</text>
      <text x="430" y="298" fontSize="11" fill="#475569">编译期计算常量表达式</text>

      {/* 循环优化 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">循环优化（基于支配关系）</text>

      <rect x="30" y="362" width="240" height="120" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="150" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">代码外提（LICM）</text>
      <text x="150" y="408" textAnchor="middle" fontSize="11" fill="#475569">循环不变量移到循环外</text>
      <text x="150" y="428" textAnchor="middle" fontSize="11" fill="#475569">x * y 不变 → 提前计算</text>
      <text x="150" y="448" textAnchor="middle" fontSize="11" fill="#475569">需确保无异常路径</text>
      <text x="150" y="468" textAnchor="middle" fontSize="11" fill="#64748b">减少重复计算次数</text>

      <rect x="290" y="362" width="240" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="410" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">归纳变量优化</text>
      <text x="410" y="408" textAnchor="middle" fontSize="11" fill="#475569">i++ 与 j = i*4 同步递增</text>
      <text x="410" y="428" textAnchor="middle" fontSize="11" fill="#475569">删除冗余归纳变量</text>
      <text x="410" y="448" textAnchor="middle" fontSize="11" fill="#475569">强度削弱：乘法 → 加法</text>
      <text x="410" y="468" textAnchor="middle" fontSize="11" fill="#64748b">j += 4 替代 j = i * 4</text>

      <rect x="550" y="362" width="220" height="120" rx="10" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">死代码消除（DCE）</text>
      <text x="660" y="408" textAnchor="middle" fontSize="11" fill="#475569">结果无人使用 → 删除</text>
      <text x="660" y="428" textAnchor="middle" fontSize="11" fill="#475569">后向活跃变量驱动</text>
      <text x="660" y="448" textAnchor="middle" fontSize="11" fill="#475569">级联删除暴露的新死代码</text>
      <text x="660" y="468" textAnchor="middle" fontSize="11" fill="#64748b">需迭代至收敛</text>
    </svg>
  );
}
