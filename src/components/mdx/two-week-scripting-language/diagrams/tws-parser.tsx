"use client";

export function TwsParserDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="语法分析器与Parser组合子">
      <defs>
        <linearGradient id="tws-ps-token" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-ps-comb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tws-ps-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-ps-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语法分析器：Token → AST</text>

      {/* 输入 Token 流 */}
      <rect x="40" y="50" width="200" height="100" rx="10" fill="url(#tws-ps-token)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Token 流</text>
      <text x="55" y="95" fontSize="11" fill="#475569" fontFamily="monospace">INT "3"  PLUS "+"</text>
      <text x="55" y="112" fontSize="11" fill="#475569" fontFamily="monospace">INT "4"  STAR "*"</text>
      <text x="55" y="129" fontSize="11" fill="#475569" fontFamily="monospace">INT "5"</text>

      <path d="M240 100 L275 100" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-ps-arrow)" />

      {/* Parser 组合子 */}
      <rect x="275" y="50" width="250" height="100" rx="10" fill="url(#tws-ps-comb)" opacity="0.95" />
      <text x="400" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Parser 组合子</text>
      <text x="400" y="97" textAnchor="middle" fontSize="11" fill="#e9d5ff">递归下降 + BNF 规则</text>
      <text x="400" y="115" textAnchor="middle" fontSize="11" fill="#e9d5ff">or / seq / repeat / option</text>
      <text x="400" y="133" textAnchor="middle" fontSize="11" fill="#e9d5ff">element / primary / factor</text>

      <path d="M525 100 L560 100" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-ps-arrow)" />

      {/* 输出 AST */}
      <rect x="560" y="50" width="200" height="100" rx="10" fill="url(#tws-ps-ast)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">AST 节点树</text>
      <text x="575" y="95" fontSize="11" fill="#065f46" fontFamily="monospace">BinaryExpr(+)</text>
      <text x="575" y="112" fontSize="11" fill="#065f46" fontFamily="monospace">  ├ Number(3)</text>
      <text x="575" y="129" fontSize="11" fill="#065f46" fontFamily="monospace">  └ BinaryExpr(*)</text>

      {/* 基本组合子 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Parser 组合子原语</text>

      <rect x="40" y="195" width="170" height="65" rx="8" fill="url(#tws-ps-comb)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="55" y="215" fontSize="12" fontWeight="600" fill="#5b21b6">token(pattern)</text>
      <text x="55" y="233" fontSize="11" fill="#475569">匹配指定 Token</text>
      <text x="55" y="250" fontSize="11" fill="#475569">成功返回该 Token</text>

      <rect x="225" y="195" width="170" height="65" rx="8" fill="url(#tws-ps-comb)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="240" y="215" fontSize="12" fontWeight="600" fill="#5b21b6">or(p1, p2, ...)</text>
      <text x="240" y="233" fontSize="11" fill="#475569">按序尝试各子 parser</text>
      <text x="240" y="250" fontSize="11" fill="#475569">第一个成功即返回</text>

      <rect x="410" y="195" width="170" height="65" rx="8" fill="url(#tws-ps-comb)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="425" y="215" fontSize="12" fontWeight="600" fill="#5b21b6">seq(p1, p2, ...)</text>
      <text x="425" y="233" fontSize="11" fill="#475569">依次匹配全部子 parser</text>
      <text x="425" y="250" fontSize="11" fill="#475569">全部成功才返回</text>

      <rect x="595" y="195" width="165" height="65" rx="8" fill="url(#tws-ps-comb)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="610" y="215" fontSize="12" fontWeight="600" fill="#5b21b6">repeat / option</text>
      <text x="610" y="233" fontSize="11" fill="#475569">repeat: 零次或多次</text>
      <text x="610" y="250" fontSize="11" fill="#475569">option: 零次或一次</text>

      {/* 表达式文法层次 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">表达式文法层次（递归下降）</text>

      <rect x="150" y="305" width="500" height="36" rx="8" fill="url(#tws-ps-comb)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="328" textAnchor="middle" fontSize="11" fill="#5b21b6">expr → term &lbrace; (&quot;+&quot;|&quot;-&quot;) term &rbrace;</text>

      <path d="M400 341 L400 349" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ps-arrow)" />

      <rect x="150" y="350" width="500" height="36" rx="8" fill="url(#tws-ps-comb)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="373" textAnchor="middle" fontSize="11" fill="#5b21b6">term → factor &lbrace; (&quot;*&quot;|&quot;/&quot;) factor &rbrace;</text>

      <path d="M400 386 L400 394" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ps-arrow)" />

      <rect x="150" y="395" width="500" height="36" rx="8" fill="url(#tws-ps-comb)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="11" fill="#5b21b6">factor → NUMBER | &quot;(&quot; expr &quot;)&quot; | &quot;-&quot; factor</text>

      {/* 优先级 */}
      <rect x="40" y="450" width="340" height="50" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="60" y="470" fontSize="12" fontWeight="600" fill="#92400e">运算符优先级</text>
      <text x="60" y="488" fontSize="11" fill="#475569">expr(±) 层次最低 → term(*/÷) → factor(括号/负号) 层次最高</text>

      {/* 左结合 */}
      <rect x="420" y="450" width="340" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="440" y="470" fontSize="12" fontWeight="600" fill="#334155">左结合实现</text>
      <text x="440" y="488" fontSize="11" fill="#475569">repeat 循环不断取左操作数，自然实现左结合</text>

      {/* 错误处理 */}
      <rect x="40" y="520" width="720" height="30" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="400" y="540" textAnchor="middle" fontSize="11" fill="#991b1b">匹配失败时抛出 ParseExc，携带 Token 行号与期望信息</text>
    </svg>
  );
}
