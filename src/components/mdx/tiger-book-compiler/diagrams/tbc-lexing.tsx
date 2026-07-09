"use client";

export function TbcLexingDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="虎书词法分析：字符流到 Token 与自动机转换链路">
      <defs>
        <linearGradient id="tbc-lex-source" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="tbc-lex-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-lex-token" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tbc-lex-chain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="tbc-lex-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">词法分析：Tiger 源码 → Token 序列</text>

      {/* 顶部：字符流 → 扫描器 → Token 流 */}
      <text x="400" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">扫描过程</text>

      <rect x="40" y="92" width="200" height="60" rx="10" fill="url(#tbc-lex-source)" opacity="0.95" />
      <text x="140" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">字符流</text>
      <text x="140" y="138" textAnchor="middle" fontSize="11" fill="#e0f2fe">let x := 1 in x + 2 end</text>

      <path d="M240 122 L296 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lex-arrow)" />

      <rect x="300" y="92" width="200" height="60" rx="10" fill="url(#tbc-lex-scan)" opacity="0.95" />
      <text x="400" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">扫描器（ML-Lex）</text>
      <text x="400" y="138" textAnchor="middle" fontSize="11" fill="#bfdbfe">表驱动 DFA + 最长匹配</text>

      <path d="M500 122 L556 122" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lex-arrow)" />

      <rect x="560" y="92" width="200" height="60" rx="10" fill="url(#tbc-lex-token)" opacity="0.95" />
      <text x="660" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token 序列</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#d1fae5">LET ID(x) ASSIGN INT(1) ...</text>

      {/* 中部：Token 表示例 */}
      <text x="400" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Tiger Token 示例</text>

      <rect x="60" y="204" width="140" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="130" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">关键字</text>
      <text x="130" y="248" textAnchor="middle" fontSize="11" fill="#475569">let in end if then</text>
      <text x="130" y="268" textAnchor="middle" fontSize="11" fill="#475569">else while do for</text>
      <text x="130" y="288" textAnchor="middle" fontSize="11" fill="#475569">to of type var function</text>

      <rect x="220" y="204" width="140" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">标识符 / 整数</text>
      <text x="290" y="248" textAnchor="middle" fontSize="11" fill="#475569">ID: [a-zA-Z][a-zA-Z0-9]*</text>
      <text x="290" y="268" textAnchor="middle" fontSize="11" fill="#475569">INT: [0-9]+</text>
      <text x="290" y="288" textAnchor="middle" fontSize="11" fill="#475569">STRING: "..."</text>

      <rect x="380" y="204" width="140" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="450" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">运算符</text>
      <text x="450" y="248" textAnchor="middle" fontSize="11" fill="#475569">+ - * / &lt; &gt; =</text>
      <text x="450" y="268" textAnchor="middle" fontSize="11" fill="#475569">:= &lt;= &gt;= &lt;&gt;</text>
      <text x="450" y="288" textAnchor="middle" fontSize="11" fill="#475569">&amp; |</text>

      <rect x="540" y="204" width="200" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="640" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">歧义处理</text>
      <text x="640" y="248" textAnchor="middle" fontSize="11" fill="#475569">最长匹配：&lt;= 优先于 &lt; 和 =</text>
      <text x="640" y="268" textAnchor="middle" fontSize="11" fill="#475569">优先级：关键字先于 ID</text>
      <text x="640" y="288" textAnchor="middle" fontSize="11" fill="#475569">注释嵌套：/* ... /* */ */</text>

      {/* 底部：自动机转换链路 */}
      <text x="400" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">从正则规范到扫描器代码</text>

      <rect x="40" y="346" width="150" height="60" rx="10" fill="url(#tbc-lex-chain)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="115" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">正则表达式</text>
      <text x="115" y="392" textAnchor="middle" fontSize="11" fill="#475569">词法模式定义</text>

      <path d="M190 376 L246 376" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lex-arrow)" />

      <rect x="250" y="346" width="150" height="60" rx="10" fill="url(#tbc-lex-chain)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="325" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">NFA</text>
      <text x="325" y="392" textAnchor="middle" fontSize="11" fill="#475569">Thompson 构造</text>

      <path d="M400 376 L456 376" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lex-arrow)" />

      <rect x="460" y="346" width="150" height="60" rx="10" fill="url(#tbc-lex-chain)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="535" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">DFA</text>
      <text x="535" y="392" textAnchor="middle" fontSize="11" fill="#475569">子集构造法</text>

      <path d="M610 376 L666 376" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-lex-arrow)" />

      <rect x="670" y="346" width="90" height="60" rx="10" fill="url(#tbc-lex-token)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="715" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">最小化</text>
      <text x="715" y="392" textAnchor="middle" fontSize="11" fill="#475569">表驱动代码</text>

      <rect x="40" y="432" width="720" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="455" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">ML-Lex：将多规则 NFA 合并为单一 NFA（新起始态经 ε 转移连各规则）</text>
      <text x="400" y="475" textAnchor="middle" fontSize="11" fill="#475569">驱动循环查表转移，到达接受态记录规则与 lexeme 长度，执行最长匹配后运行动作</text>
    </svg>
  );
}
