"use client";

export function CrcOptimizationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="代码优化：机器无关优化与数据流分析">
      <defs>
        <linearGradient id="crc-opt-local" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-opt-global" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-opt-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-opt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代码优化：机器无关优化与数据流分析</text>

      {/* 优化层次 */}
      <text x="400" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">优化层次（从局部到全局）</text>

      <rect x="40" y="75" width="230" height="70" rx="8" fill="url(#crc-opt-local)" opacity="0.95" />
      <text x="155" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">局部优化</text>
      <text x="155" y="118" textAnchor="middle" fontSize="11" fill="#bfdbfe">基本块内</text>
      <text x="155" y="134" textAnchor="middle" fontSize="11" fill="#bfdbfe">常量折叠 / 代数化简</text>

      <path d="M270 110 L300 110" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-opt-arrow)" />

      <rect x="300" y="75" width="230" height="70" rx="8" fill="url(#crc-opt-global)" opacity="0.95" />
      <text x="415" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">全局优化</text>
      <text x="415" y="118" textAnchor="middle" fontSize="11" fill="#e9d5ff">跨基本块</text>
      <text x="415" y="134" textAnchor="middle" fontSize="11" fill="#e9d5ff">死代码消除 / 公共子表达式</text>

      <path d="M530 110 L560 110" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-opt-arrow)" />

      <rect x="560" y="75" width="200" height="70" rx="8" fill="url(#crc-opt-flow)" opacity="0.95" />
      <text x="660" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">循环优化</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#bbf7d0">循环不变量外提</text>
      <text x="660" y="134" textAnchor="middle" fontSize="11" fill="#bbf7d0">归纳变量强度削弱</text>

      {/* 优化示例 */}
      <text x="200" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常量折叠示例</text>

      <rect x="40" y="195" width="320" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="55" y="215" fontSize="11" fill="#991b1b" fontFamily="monospace">优化前: x = 3 * 4 + a</text>

      <path d="M200 225 L200 235" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-opt-arrow)" />

      <rect x="40" y="237" width="320" height="30" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="1" />
      <text x="55" y="257" fontSize="11" fill="#065f46" fontFamily="monospace">优化后: x = 12 + a</text>

      <rect x="40" y="272" width="320" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="55" y="289" fontSize="10" fill="#475569">编译期可计算的常量直接求值</text>

      {/* 死代码消除 */}
      <text x="600" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">死代码消除示例</text>

      <rect x="440" y="195" width="320" height="44" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="455" y="213" fontSize="11" fill="#991b1b" fontFamily="monospace">优化前:</text>
      <text x="455" y="231" fontSize="11" fill="#991b1b" fontFamily="monospace">  x = 1; y = 2; z = x + y;</text>

      <path d="M600 239 L600 249" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-opt-arrow)" />

      <rect x="440" y="251" width="320" height="44" rx="6" fill="#dcfce7" stroke="#059669" strokeWidth="1" />
      <text x="455" y="269" fontSize="11" fill="#065f46" fontFamily="monospace">优化后（z 未被使用）:</text>
      <text x="455" y="287" fontSize="11" fill="#065f46" fontFamily="monospace">  (全部删除)</text>

      {/* 数据流分析 */}
      <text x="400" y="325" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据流分析（优化的理论基础）</text>

      <rect x="40" y="340" width="230" height="90" rx="8" fill="url(#crc-opt-flow)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="60" y="363" fontSize="12" fontWeight="600" fill="#065f46">到达定值（Reaching Def）</text>
      <text x="60" y="382" fontSize="11" fill="#475569">哪些定值能到达某点</text>
      <text x="60" y="399" fontSize="11" fill="#475569">gen / kill / in / out 集合</text>
      <text x="60" y="416" fontSize="11" fill="#475569">前向数据流方程</text>

      <rect x="285" y="340" width="230" height="90" rx="8" fill="url(#crc-opt-flow)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="305" y="363" fontSize="12" fontWeight="600" fill="#065f46">活跃变量（Liveness）</text>
      <text x="305" y="382" fontSize="11" fill="#475569">变量在后续是否被使用</text>
      <text x="305" y="399" fontSize="11" fill="#475569">use / def 集合</text>
      <text x="305" y="416" fontSize="11" fill="#475569">反向数据流方程</text>

      <rect x="530" y="340" width="230" height="90" rx="8" fill="url(#crc-opt-flow)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="550" y="363" fontSize="12" fontWeight="600" fill="#065f46">可用表达式（Available）</text>
      <text x="550" y="382" fontSize="11" fill="#475569">表达式已被计算且未变</text>
      <text x="550" y="399" fontSize="11" fill="#475569">e_gen / e_kill 集合</text>
      <text x="550" y="416" fontSize="11" fill="#475569">公共子表达式消除基础</text>

      {/* 循环优化 */}
      <text x="400" y="465" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">循环优化</text>

      <rect x="40" y="480" width="350" height="65" rx="8" fill="url(#crc-opt-global)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="60" y="503" fontSize="12" fontWeight="600" fill="#5b21b6">循环不变量外提（LICM）</text>
      <text x="60" y="521" fontSize="11" fill="#475569" fontFamily="monospace">for: x = a * b（a,b 不变）→ 提到循环外</text>
      <text x="60" y="538" fontSize="11" fill="#475569">减少循环内重复计算</text>

      <rect x="410" y="480" width="350" height="65" rx="8" fill="url(#crc-opt-global)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="430" y="503" fontSize="12" fontWeight="600" fill="#5b21b6">强度削弱</text>
      <text x="430" y="521" fontSize="11" fill="#475569" fontFamily="monospace">i = i + 1; x = i * 4 → x = x + 4</text>
      <text x="430" y="538" fontSize="11" fill="#475569">用加法替代乘法，降低开销</text>
    </svg>
  );
}
