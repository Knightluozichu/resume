"use client";

export function CrcSemanticsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="语义分析与类型检查">
      <defs>
        <linearGradient id="crc-sem-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-sem-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-sem-check" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-sem-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语义分析与类型检查</text>

      {/* 流程 */}
      <rect x="30" y="55" width="150" height="60" rx="10" fill="url(#crc-sem-ast)" opacity="0.95" />
      <text x="105" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">AST</text>
      <text x="105" y="100" textAnchor="middle" fontSize="11" fill="#bfdbfe">语法正确</text>

      <path d="M180 85 L210 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-sem-arrow)" />

      <rect x="210" y="55" width="170" height="60" rx="10" fill="url(#crc-sem-table)" opacity="0.95" />
      <text x="295" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">符号表构建</text>
      <text x="295" y="100" textAnchor="middle" fontSize="11" fill="#e9d5ff">收集声明 / 作用域</text>

      <path d="M380 85 L410 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-sem-arrow)" />

      <rect x="410" y="55" width="170" height="60" rx="10" fill="url(#crc-sem-check)" opacity="0.95" />
      <text x="495" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">类型检查</text>
      <text x="495" y="100" textAnchor="middle" fontSize="11" fill="#bbf7d0">推导 / 匹配 / 标注</text>

      <path d="M580 85 L610 85" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-sem-arrow)" />

      <rect x="610" y="55" width="160" height="60" rx="10" fill="#f59e0b" opacity="0.95" />
      <text x="690" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">带注解 AST</text>
      <text x="690" y="100" textAnchor="middle" fontSize="11" fill="#fef3c7">语义正确</text>

      {/* 符号表 */}
      <text x="200" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">符号表（Symbol Table）</text>

      <rect x="40" y="175" width="320" height="28" rx="6" fill="#0f172a" />
      <text x="60" y="194" fontSize="11" fontWeight="600" fill="#e2e8f0">名字</text>
      <text x="180" y="194" fontSize="11" fontWeight="600" fill="#e2e8f0">类型</text>
      <text x="280" y="194" fontSize="11" fontWeight="600" fill="#e2e8f0">作用域</text>

      <rect x="40" y="203" width="320" height="24" rx="0" fill="#f8fafc" />
      <text x="60" y="220" fontSize="10" fill="#5b21b6" fontFamily="monospace">x</text>
      <text x="180" y="220" fontSize="10" fill="#475569" fontFamily="monospace">int</text>
      <text x="280" y="220" fontSize="10" fill="#475569" fontFamily="monospace">global</text>

      <rect x="40" y="227" width="320" height="24" rx="0" fill="#fff" />
      <text x="60" y="244" fontSize="10" fill="#5b21b6" fontFamily="monospace">sum</text>
      <text x="180" y="244" fontSize="10" fill="#475569" fontFamily="monospace">int</text>
      <text x="280" y="244" fontSize="10" fill="#475569" fontFamily="monospace">block</text>

      <rect x="40" y="251" width="320" height="24" rx="0" fill="#f8fafc" />
      <text x="60" y="268" fontSize="10" fill="#5b21b6" fontFamily="monospace">add</text>
      <text x="180" y="268" fontSize="10" fill="#475569" fontFamily="monospace">int(int,int)</text>
      <text x="280" y="268" fontSize="10" fill="#475569" fontFamily="monospace">global</text>

      {/* 作用域链 */}
      <text x="600" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">作用域链</text>

      <rect x="440" y="175" width="320" height="36" rx="6" fill="url(#crc-sem-table)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="600" y="198" textAnchor="middle" fontSize="11" fill="#5b21b6">全局作用域：x, add</text>

      <path d="M600 211 L600 219" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-sem-arrow)" />

      <rect x="440" y="221" width="320" height="36" rx="6" fill="url(#crc-sem-table)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="600" y="244" textAnchor="middle" fontSize="11" fill="#5b21b6">函数作用域：参数 a, b</text>

      <path d="M600 257 L600 265" stroke="#64748b" strokeWidth="2" markerEnd="url(#crc-sem-arrow)" />

      <rect x="440" y="267" width="320" height="36" rx="6" fill="url(#crc-sem-table)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="600" y="290" textAnchor="middle" fontSize="11" fill="#5b21b6">块作用域：局部变量 sum</text>

      {/* 类型检查规则 */}
      <text x="400" y="335" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">类型检查规则</text>

      <rect x="40" y="350" width="350" height="80" rx="8" fill="url(#crc-sem-check)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="60" y="373" fontSize="12" fontWeight="600" fill="#065f46">赋值类型匹配</text>
      <text x="60" y="392" fontSize="11" fill="#475569" fontFamily="monospace">int x = "abc";  ← 类型错误</text>
      <text x="60" y="409" fontSize="11" fill="#475569" fontFamily="monospace">int x = 42;    ← 正确</text>
      <text x="60" y="424" fontSize="11" fill="#475569" fontFamily="monospace">左右类型必须兼容</text>

      <rect x="410" y="350" width="350" height="80" rx="8" fill="url(#crc-sem-check)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="430" y="373" fontSize="12" fontWeight="600" fill="#065f46">函数调用签名</text>
      <text x="430" y="392" fontSize="11" fill="#475569" fontFamily="monospace">add(1, 2)       ← 参数数 / 类型匹配</text>
      <text x="430" y="409" fontSize="11" fill="#475569" fontFamily="monospace">add(1)          ← 参数不足</text>
      <text x="430" y="424" fontSize="11" fill="#475569" fontFamily="monospace">返回类型参与推导</text>

      {/* 类型推导 */}
      <rect x="40" y="445" width="350" height="50" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="60" y="467" fontSize="12" fontWeight="600" fill="#1e40af">类型推导（Type Inference）</text>
      <text x="60" y="485" fontSize="11" fill="#475569">从子表达式推导未知类型，无需全部显式标注</text>

      {/* 语义错误 */}
      <rect x="410" y="445" width="350" height="50" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="430" y="467" fontSize="12" fontWeight="600" fill="#991b1b">语义错误检测</text>
      <text x="430" y="485" fontSize="11" fill="#475569">未声明变量 / 重复定义 / 类型不匹配 / 参数不匹配</text>

      {/* 输出 */}
      <rect x="40" y="510" width="720" height="35" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="533" textAnchor="middle" fontSize="11" fill="#475569">输出：每个 AST 节点标注类型信息，供后续 IR 生成使用</text>
    </svg>
  );
}
