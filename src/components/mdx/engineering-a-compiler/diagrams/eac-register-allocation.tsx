"use client";

export function EacRegisterAllocationDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="寄存器分配干扰图与图着色">
      <defs>
        <linearGradient id="eac-rg-graph" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eac-rg-color" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-rg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">寄存器分配：活跃分析 → 干扰图 → 图着色</text>

      {/* 左侧：活跃分析 */}
      <rect x="20" y="60" width="220" height="180" rx="12" fill="url(#eac-rg-graph)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="130" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">① 活跃变量分析</text>
      <text x="40" y="112" fontSize="11" fill="#475569" fontFamily="monospace">b = a + 1   {a,b}</text>
      <text x="40" y="132" fontSize="11" fill="#475569" fontFamily="monospace">c = b * 2   {b,c}</text>
      <text x="40" y="152" fontSize="11" fill="#475569" fontFamily="monospace">d = a - c   {a,c,d}</text>
      <text x="40" y="172" fontSize="11" fill="#475569" fontFamily="monospace">return d    {d}</text>
      <text x="130" y="200" textAnchor="middle" fontSize="11" fill="#64748b">变量「同时活跃」= 不能</text>
      <text x="130" y="218" textAnchor="middle" fontSize="11" fill="#64748b">共用同一寄存器 → 干扰</text>

      <path d="M240 150 L270 150" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-rg-arrow)" />

      {/* 中间：干扰图 */}
      <rect x="270" y="60" width="260" height="180" rx="12" fill="url(#eac-rg-graph)" opacity="0.14" stroke="#f59e0b" strokeWidth="2" />
      <text x="400" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">② 干扰图（Interference Graph）</text>

      {/* 干扰图节点 */}
      <circle cx="330" cy="130" r="22" fill="#f59e0b" opacity="0.8" />
      <text x="330" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">a</text>

      <circle cx="470" cy="130" r="22" fill="#f59e0b" opacity="0.8" />
      <text x="470" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">b</text>

      <circle cx="400" cy="190" r="22" fill="#f59e0b" opacity="0.8" />
      <text x="400" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">c</text>

      <circle cx="330" cy="210" r="20" fill="#f59e0b" opacity="0.6" />
      <text x="330" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">d</text>

      {/* 干扰边 */}
      <line x1="352" y1="130" x2="448" y2="130" stroke="#dc2626" strokeWidth="2.5" />
      <text x="400" y="124" textAnchor="middle" fontSize="9" fill="#dc2626">a-b</text>

      <line x1="470" y1="152" x2="417" y2="180" stroke="#dc2626" strokeWidth="2.5" />
      <text x="460" y="170" fontSize="9" fill="#dc2626">b-c</text>

      <line x1="382" y1="190" x2="347" y2="200" stroke="#dc2626" strokeWidth="2.5" />
      <text x="350" y="185" fontSize="9" fill="#dc2626">c-d</text>

      <line x1="330" y1="152" x2="330" y2="188" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
      <text x="305" y="172" fontSize="9" fill="#dc2626">a-d</text>

      <path d="M530 150 L560 150" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#eac-rg-arrow)" />

      {/* 右侧：着色结果 */}
      <rect x="560" y="60" width="220" height="180" rx="12" fill="url(#eac-rg-color)" opacity="0.1" stroke="#059669" strokeWidth="2" />
      <text x="670" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">③ 图着色（K=2 寄存器）</text>

      <circle cx="610" cy="125" r="20" fill="#2563eb" />
      <text x="610" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">a</text>
      <text x="610" y="160" textAnchor="middle" fontSize="10" fill="#1e40af">R1</text>

      <circle cx="730" cy="125" r="20" fill="#dc2626" />
      <text x="730" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">b</text>
      <text x="730" y="160" textAnchor="middle" fontSize="10" fill="#991b1b">R2</text>

      <circle cx="670" cy="180" r="20" fill="#2563eb" />
      <text x="670" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">c</text>
      <text x="670" y="215" textAnchor="middle" fontSize="10" fill="#1e40af">R1</text>

      <circle cx="610" cy="210" r="18" fill="#dc2626" />
      <text x="610" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">d</text>
      <text x="610" y="232" textAnchor="middle" fontSize="10" fill="#991b1b">R2</text>

      {/* 底部：溢出 */}
      <rect x="20" y="270" width="760" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="40" y="295" fontSize="13" fontWeight="700" fill="#991b1b">K < 色数时：溢出（Spill）到内存</text>
      <text x="40" y="316" fontSize="11" fill="#475569">选溢出候选（度数最高 / 使用频率最低），在栈上分配，前后插入 LOAD/STORE，重新着色，可能需多轮迭代。</text>

      {/* 底部：线性扫描对比 */}
      <rect x="20" y="350" width="760" height="95" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="40" y="375" fontSize="13" fontWeight="700" fill="#0f172a">线性扫描（Linear Scan）：JIT 的实用折中</text>
      <text x="40" y="397" fontSize="11" fill="#475569">图着色质量最优但 O(n²) 太慢；线性扫描按活跃区间排序贪心分配，O(n log n)，质量略低但足够快</text>
      <text x="40" y="417" fontSize="11" fill="#475569">HotSpot / V8 / LuaJIT 等 JIT 编译器普遍用线性扫描，AOT 编译器（GCC/LLVM -O2）优先用图着色</text>
      <text x="40" y="437" fontSize="11" fill="#475569">权衡：分配质量 vs 编译速度，取决于编译器是离线还是在线</text>
    </svg>
  );
}
