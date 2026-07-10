"use client";

export function TwsLexerDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="词法分析器工作流程">
      <defs>
        <linearGradient id="tws-lx-src" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="tws-lx-token" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-lx-type" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-lx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">词法分析器：源码 → Token 序列</text>

      {/* 源码输入 */}
      <rect x="40" y="50" width="300" height="120" rx="10" fill="url(#tws-lx-src)" opacity="0.12" stroke="#475569" strokeWidth="1.5" />
      <text x="60" y="72" fontSize="13" fontWeight="700" fill="#334155">Stone 源码</text>
      <text x="60" y="95" fontSize="12" fill="#475569" fontFamily="monospace">even = 0</text>
      <text x="60" y="112" fontSize="12" fill="#475569" fontFamily="monospace">odd = 0</text>
      <text x="60" y="129" fontSize="12" fill="#475569" fontFamily="monospace">i = 0</text>
      <text x="60" y="146" fontSize="12" fill="#475569" fontFamily="monospace">while i &lt; 10 &lbrace;</text>
      <text x="60" y="163" fontSize="12" fill="#475569" fontFamily="monospace">  ...</text>

      {/* 箭头 */}
      <path d="M340 110 L380 110" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-lx-arrow)" />
      <text x="360" y="100" textAnchor="middle" fontSize="11" fill="#64748b">词法分析</text>

      {/* Lexer 核心 */}
      <rect x="380" y="50" width="180" height="120" rx="10" fill="url(#tws-lx-token)" opacity="0.95" />
      <text x="470" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Lexer</text>
      <text x="470" y="102" textAnchor="middle" fontSize="11" fill="#bfdbfe">正则表达式匹配</text>
      <text x="470" y="120" textAnchor="middle" fontSize="11" fill="#bfdbfe">逐字符扫描</text>
      <text x="470" y="138" textAnchor="middle" fontSize="11" fill="#bfdbfe">跳过空白/注释</text>
      <text x="470" y="156" textAnchor="middle" fontSize="11" fill="#bfdbfe">记录行号</text>

      {/* 箭头 */}
      <path d="M560 110 L600 110" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-lx-arrow)" />

      {/* Token 输出 */}
      <rect x="600" y="50" width="160" height="120" rx="10" fill="url(#tws-lx-type)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="620" y="72" fontSize="13" fontWeight="700" fill="#065f46">Token 序列</text>
      <text x="620" y="95" fontSize="11" fill="#065f46" fontFamily="monospace">IDENT  "even"</text>
      <text x="620" y="112" fontSize="11" fill="#065f46" fontFamily="monospace">EQ     "="</text>
      <text x="620" y="129" fontSize="11" fill="#065f46" fontFamily="monospace">INT    "0"</text>
      <text x="620" y="146" fontSize="11" fill="#065f46" fontFamily="monospace">IDENT  "odd"</text>
      <text x="620" y="163" fontSize="11" fill="#065f46" fontFamily="monospace">...</text>

      {/* Token 类型表 */}
      <text x="400" y="205" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Token 类型与正则匹配</text>

      <rect x="40" y="220" width="340" height="50" rx="8" fill="url(#tws-lx-token)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="55" y="240" fontSize="12" fontWeight="600" fill="#1e40af">标识符 Identifier</text>
      <text x="55" y="258" fontSize="11" fill="#475569" fontFamily="monospace">[A-Za-z_][A-Za-z0-9_]*</text>

      <rect x="420" y="220" width="340" height="50" rx="8" fill="url(#tws-lx-token)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="435" y="240" fontSize="12" fontWeight="600" fill="#1e40af">整数字面量 Integer</text>
      <text x="435" y="258" fontSize="11" fill="#475569" fontFamily="monospace">[0-9]+</text>

      <rect x="40" y="280" width="340" height="50" rx="8" fill="url(#tws-lx-token)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="55" y="300" fontSize="12" fontWeight="600" fill="#1e40af">字符串字面量 String</text>
      <text x="55" y="318" fontSize="11" fill="#475569" fontFamily="monospace">&quot;(\\&quot;|\\\\|\\n|[^&quot;])*&quot;</text>

      <rect x="420" y="280" width="340" height="50" rx="8" fill="url(#tws-lx-token)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="435" y="300" fontSize="12" fontWeight="600" fill="#1e40af">运算符 / 关键字</text>
      <text x="435" y="318" fontSize="11" fill="#475569" fontFamily="monospace">== &lt;= &gt;= &amp;&amp; || | \p&#123;Punct&#125;</text>

      {/* 正则匹配流程 */}
      <text x="400" y="365" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">逐行扫描流程</text>

      <rect x="60" y="380" width="140" height="36" rx="8" fill="url(#tws-lx-token)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="130" y="403" textAnchor="middle" fontSize="11" fill="#1e40af">读取下一行</text>
      <path d="M200 398 L225 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-lx-arrow)" />

      <rect x="225" y="380" width="140" height="36" rx="8" fill="url(#tws-lx-token)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="295" y="403" textAnchor="middle" fontSize="11" fill="#1e40af">Pattern.match</text>
      <path d="M365 398 L390 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-lx-arrow)" />

      <rect x="390" y="380" width="140" height="36" rx="8" fill="url(#tws-lx-token)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="460" y="403" textAnchor="middle" fontSize="11" fill="#1e40af">识别 Token 类型</text>
      <path d="M530 398 L555 398" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-lx-arrow)" />

      <rect x="555" y="380" width="185" height="36" rx="8" fill="url(#tws-lx-type)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="647" y="403" textAnchor="middle" fontSize="11" fill="#065f46">生成 Token 对象入列</text>

      {/* 注释处理 */}
      <rect x="60" y="440" width="680" height="50" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="80" y="460" fontSize="12" fontWeight="600" fill="#92400e">注释与空白</text>
      <text x="80" y="478" fontSize="11" fill="#475569">正则中 (//.*) 匹配行注释，(\\s*) 匹配前导空白，匹配到空组时跳过不生成 Token</text>

      {/* 底部行号 */}
      <rect x="60" y="510" width="680" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">每个 Token 携带 line 行号，用于后续语法/运行时错误定位</text>
    </svg>
  );
}
