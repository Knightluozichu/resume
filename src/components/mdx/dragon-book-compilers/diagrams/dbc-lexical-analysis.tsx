"use client";

export function DbcLexicalAnalysisDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="词法分析：正则到自动机到Token">
      <defs>
        <linearGradient id="dbc-lex-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dbc-lex-auto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dbc-lex-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">词法分析：源码 → 正则 → 自动机 → Token</text>

      {/* 源码到Token流程 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">词法扫描流程</text>

      <rect x="30" y="72" width="150" height="56" rx="10" fill="url(#dbc-lex-flow)" opacity="0.95" />
      <text x="105" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">源码文本</text>
      <text x="105" y="114" textAnchor="middle" fontSize="11" fill="#bfdbfe">if (x &lt;= 10)</text>

      <path d="M180 100 L210 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />

      <rect x="215" y="72" width="150" height="56" rx="10" fill="url(#dbc-lex-flow)" opacity="0.85" />
      <text x="290" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">扫描器</text>
      <text x="290" y="114" textAnchor="middle" fontSize="11" fill="#bfdbfe">逐字符读入</text>

      <path d="M365 100 L395 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />

      <rect x="400" y="72" width="170" height="56" rx="10" fill="url(#dbc-lex-flow)" opacity="0.75" />
      <text x="485" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">模式匹配</text>
      <text x="485" y="114" textAnchor="middle" fontSize="11" fill="#bfdbfe">最长匹配 + 优先级</text>

      <path d="M570 100 L600 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />

      <rect x="605" y="72" width="165" height="56" rx="10" fill="url(#dbc-lex-flow)" opacity="0.65" />
      <text x="687" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token 流</text>
      <text x="687" y="114" textAnchor="middle" fontSize="11" fill="#bfdbfe">&lt;IF&gt;&lt;LP&gt;...</text>

      {/* 正则到自动机转换 */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">模式编译：正则 → NFA → DFA → 最小化 DFA</text>

      <rect x="30" y="182" width="160" height="64" rx="10" fill="url(#dbc-lex-auto)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="110" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">正则表达式</text>
      <text x="110" y="226" textAnchor="middle" fontSize="11" fill="#475569">a(b|c)*</text>
      <text x="110" y="240" textAnchor="middle" fontSize="10" fill="#64748b">词法模式的数学描述</text>

      <path d="M190 214 L220 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />
      <text x="205" y="206" textAnchor="middle" fontSize="10" fill="#64748b">Thompson</text>

      <rect x="225" y="182" width="160" height="64" rx="10" fill="url(#dbc-lex-auto)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="305" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">NFA</text>
      <text x="305" y="226" textAnchor="middle" fontSize="11" fill="#475569">非确定有限自动机</text>
      <text x="305" y="240" textAnchor="middle" fontSize="10" fill="#64748b">ε 转移 / 多状态并存</text>

      <path d="M385 214 L415 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />
      <text x="400" y="206" textAnchor="middle" fontSize="10" fill="#64748b">子集构造</text>

      <rect x="420" y="182" width="160" height="64" rx="10" fill="url(#dbc-lex-auto)" opacity="0.28" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">DFA</text>
      <text x="500" y="226" textAnchor="middle" fontSize="11" fill="#475569">确定有限自动机</text>
      <text x="500" y="240" textAnchor="middle" fontSize="10" fill="#64748b">单状态 / 无 ε 转移</text>

      <path d="M580 214 L610 214" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-lex-arrow)" />
      <text x="595" y="206" textAnchor="middle" fontSize="10" fill="#64748b">Hopcroft</text>

      <rect x="615" y="182" width="155" height="64" rx="10" fill="url(#dbc-lex-auto)" opacity="0.36" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="692" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">最小化 DFA</text>
      <text x="692" y="226" textAnchor="middle" fontSize="11" fill="#475569">状态数最少</text>
      <text x="692" y="240" textAnchor="middle" fontSize="10" fill="#64748b">表驱动扫描</text>

      {/* Token结构 */}
      <text x="400" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Token 结构与分类</text>

      <rect x="30" y="302" width="240" height="80" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">&lt;token-type, lexeme, attr&gt;</text>
      <text x="150" y="348" textAnchor="middle" fontSize="11" fill="#475569">token-type: 词法类别（关键字/标识符）</text>
      <text x="150" y="366" textAnchor="middle" fontSize="11" fill="#475569">lexeme: 原始字符串</text>

      <rect x="290" y="302" width="240" height="80" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">最长匹配原则</text>
      <text x="410" y="348" textAnchor="middle" fontSize="11" fill="#475569">贪心读入尽可能多的字符</text>
      <text x="410" y="366" textAnchor="middle" fontSize="11" fill="#475569">如 &lt;= 而非 &lt; 和 =</text>

      <rect x="550" y="302" width="220" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="326" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Lex 工具</text>
      <text x="660" y="348" textAnchor="middle" fontSize="11" fill="#475569">正则 → C 扫描器代码</text>
      <text x="660" y="366" textAnchor="middle" fontSize="11" fill="#475569">声明 / 规则 / 代码三段</text>

      {/* 底部状态转换表 */}
      <rect x="30" y="400" width="740" height="60" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="50" y="424" fontSize="13" fontWeight="700" fill="#065f46">表驱动扫描：状态转移表（state × input → next-state）</text>
      <text x="50" y="446" fontSize="11" fill="#475569">查表 O(1) 转移，无需回溯；扫描器只需「当前状态 + 当前字符」即可决定动作，是工业级词法分析器的标准实现方式。</text>
    </svg>
  );
}
