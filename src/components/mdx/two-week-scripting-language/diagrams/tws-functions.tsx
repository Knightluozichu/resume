"use client";

export function TwsFunctionsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="函数定义调用与闭包环境捕获">
      <defs>
        <linearGradient id="tws-fn-def" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-fn-call" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tws-fn-closure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-fn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">函数与闭包：定义 / 调用 / 环境捕获</text>

      {/* 函数定义 */}
      <rect x="40" y="50" width="350" height="120" rx="10" fill="url(#tws-fn-def)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="72" fontSize="13" fontWeight="700" fill="#1e40af">函数定义（def 语句）</text>
      <text x="60" y="95" fontSize="11" fill="#475569" fontFamily="monospace">def add(x, y) &lbrace;</text>
      <text x="60" y="112" fontSize="11" fill="#475569" fontFamily="monospace">  x + y</text>
      <text x="60" y="129" fontSize="11" fill="#475569" fontFamily="monospace">&rbrace;</text>
      <text x="60" y="152" fontSize="11" fill="#1e40af">→ 创建 Function 对象存入环境</text>

      {/* 函数调用 */}
      <rect x="410" y="50" width="350" height="120" rx="10" fill="url(#tws-fn-call)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="430" y="72" fontSize="13" fontWeight="700" fill="#5b21b6">函数调用过程</text>
      <text x="430" y="95" fontSize="11" fill="#475569" fontFamily="monospace">add(3, 4)</text>
      <text x="430" y="115" fontSize="11" fill="#5b21b6">调用步骤：</text>
      <text x="440" y="132" fontSize="11" fill="#475569">1. 创建新环境（outer = 定义环境）</text>
      <text x="440" y="149" fontSize="11" fill="#475569">2. 绑定参数 x=3, y=4 到新环境</text>
      <text x="440" y="166" fontSize="11" fill="#475569">3. 在新环境中求值函数体</text>

      {/* Function 对象结构 */}
      <text x="400" y="195" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Function 对象结构</text>

      <rect x="100" y="210" width="600" height="70" rx="10" fill="url(#tws-fn-def)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="232" fontSize="12" fontWeight="600" fill="#1e40af">Function（函数对象）</text>
      <text x="130" y="252" fontSize="11" fill="#475569" fontFamily="monospace">parameters: List&lt;String&gt;</text>
      <text x="340" y="252" fontSize="11" fill="#475569" fontFamily="monospace">body: BlockStmnt</text>
      <text x="540" y="252" fontSize="11" fill="#475569" fontFamily="monospace">env: Environment</text>
      <text x="130" y="272" fontSize="11" fill="#1e40af">参数列表 + 函数体 AST + 定义时的环境（闭包关键）</text>

      {/* 闭包环境捕获 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">闭包：函数捕获定义时的环境</text>

      <rect x="40" y="325" width="370" height="170" rx="10" fill="url(#tws-fn-closure)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="347" fontSize="12" fontWeight="700" fill="#065f46">闭包示例</text>
      <text x="60" y="370" fontSize="11" fill="#475569" fontFamily="monospace">def counter(n) &lbrace;</text>
      <text x="60" y="387" fontSize="11" fill="#475569" fontFamily="monospace">  def inc() &lbrace; n = n + 1; n &rbrace;</text>
      <text x="60" y="404" fontSize="11" fill="#475569" fontFamily="monospace">  inc</text>
      <text x="60" y="421" fontSize="11" fill="#475569" fontFamily="monospace">&rbrace;</text>
      <text x="60" y="444" fontSize="11" fill="#475569" fontFamily="monospace">c = counter(0)</text>
      <text x="60" y="461" fontSize="11" fill="#475569" fontFamily="monospace">c()  // → 1</text>
      <text x="60" y="478" fontSize="11" fill="#475569" fontFamily="monospace">c()  // → 2</text>

      <rect x="430" y="325" width="330" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="347" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">环境捕获机制</text>
      <text x="450" y="370" fontSize="11" fill="#475569">1. counter(0) 创建环境 E1</text>
      <text x="450" y="387" fontSize="11" fill="#475569">   E1: n=0, outer=全局</text>
      <text x="450" y="408" fontSize="11" fill="#475569">2. inc 函数对象捕获 E1 作为 env</text>
      <text x="450" y="429" fontSize="11" fill="#475569">3. 调用 c() 创建环境 E2</text>
      <text x="450" y="446" fontSize="11" fill="#475569">   E2: outer=E1</text>
      <text x="450" y="467" fontSize="11" fill="#475569">4. n = n + 1 修改 E1 中的 n</text>
      <text x="450" y="488" fontSize="11" fill="#065f46">→ 闭包 = 函数体 + 定义时环境</text>

      {/* 底部 */}
      <rect x="40" y="510" width="720" height="36" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="400" y="533" textAnchor="middle" fontSize="11" fill="#92400e">闭包让内层函数「记住」外层变量——函数对象持有定义时的环境引用，不是值拷贝</text>
    </svg>
  );
}
