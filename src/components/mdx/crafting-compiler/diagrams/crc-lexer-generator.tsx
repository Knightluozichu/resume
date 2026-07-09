"use client";

export function CrcLexerGeneratorDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="词法分析生成器：正则到DFA">
      <defs>
        <linearGradient id="crc-lex-regex" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-lex-nfa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-lex-dfa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-lex-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">词法分析生成器：正则 → NFA → DFA</text>

      {/* 四阶段流水线 */}
      <rect x="30" y="55" width="160" height="80" rx="10" fill="url(#crc-lex-regex)" opacity="0.95" />
      <text x="110" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">正则表达式</text>
      <text x="110" y="102" textAnchor="middle" fontSize="11" fill="#bfdbfe">[a-z]+</text>
      <text x="110" y="118" textAnchor="middle" fontSize="11" fill="#bfdbfe">[0-9]+</text>

      <path d="M190 95 L220 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lex-arrow)" />

      <rect x="220" y="55" width="160" height="80" rx="10" fill="url(#crc-lex-nfa)" opacity="0.95" />
      <text x="300" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">NFA</text>
      <text x="300" y="102" textAnchor="middle" fontSize="11" fill="#e9d5ff">Thompson 构造</text>
      <text x="300" y="118" textAnchor="middle" fontSize="11" fill="#e9d5ff">非确定性</text>

      <path d="M380 95 L410 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lex-arrow)" />

      <rect x="410" y="55" width="160" height="80" rx="10" fill="url(#crc-lex-dfa)" opacity="0.95" />
      <text x="490" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DFA</text>
      <text x="490" y="102" textAnchor="middle" fontSize="11" fill="#bbf7d0">子集构造</text>
      <text x="490" y="118" textAnchor="middle" fontSize="11" fill="#bbf7d0">最小化</text>

      <path d="M570 95 L600 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-lex-arrow)" />

      <rect x="600" y="55" width="170" height="80" rx="10" fill="#f59e0b" opacity="0.95" />
      <text x="685" y="82" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token 序列</text>
      <text x="685" y="102" textAnchor="middle" fontSize="11" fill="#fef3c7">IDENT / NUMBER</text>
      <text x="685" y="118" textAnchor="middle" fontSize="11" fill="#fef3c7">KEYWORD / OP</text>

      {/* NFA 示例 */}
      <text x="200" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">NFA 示例（Thompson 构造 a|b）</text>

      <circle cx="80" cy="215" r="16" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
      <text x="80" y="219" textAnchor="middle" fontSize="11" fill="#5b21b6">0</text>

      <path d="M96 215 L150 195" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />
      <text x="118" y="200" fontSize="10" fill="#5b21b6">a</text>

      <path d="M96 215 L150 235" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />
      <text x="118" y="240" fontSize="10" fill="#5b21b6">b</text>

      <circle cx="165" cy="195" r="16" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
      <text x="165" y="199" textAnchor="middle" fontSize="11" fill="#5b21b6">1</text>

      <circle cx="165" cy="235" r="16" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
      <text x="165" y="239" textAnchor="middle" fontSize="11" fill="#5b21b6">2</text>

      <path d="M181 195 L235 215" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />
      <path d="M181 235 L235 215" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />

      <circle cx="250" cy="215" r="16" fill="#dcfce7" stroke="#059669" strokeWidth="2.5" />
      <text x="250" y="219" textAnchor="middle" fontSize="11" fill="#065f46">3</text>

      <text x="165" y="265" textAnchor="middle" fontSize="11" fill="#475569">ε 转移实现分支选择</text>

      {/* DFA 示例 */}
      <text x="560" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DFA 示例（最小化后）</text>

      <circle cx="460" cy="215" r="16" fill="#fff" stroke="#059669" strokeWidth="2" />
      <text x="460" y="219" textAnchor="middle" fontSize="11" fill="#065f46">A</text>

      <path d="M476 215 L530 195" stroke="#059669" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />
      <text x="498" y="200" fontSize="10" fill="#065f46">a</text>

      <path d="M476 215 L530 235" stroke="#059669" strokeWidth="1.5" markerEnd="url(#crc-lex-arrow)" />
      <text x="498" y="240" fontSize="10" fill="#065f46">b</text>

      <circle cx="545" cy="195" r="16" fill="#dcfce7" stroke="#059669" strokeWidth="2.5" />
      <text x="545" y="199" textAnchor="middle" fontSize="11" fill="#065f46">B</text>

      <circle cx="545" cy="235" r="16" fill="#dcfce7" stroke="#059669" strokeWidth="2.5" />
      <text x="545" y="239" textAnchor="middle" fontSize="11" fill="#065f46">C</text>

      <text x="560" y="265" textAnchor="middle" fontSize="11" fill="#475569">每状态每输入最多一条转移</text>

      {/* Token 类型表 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Token 类型与匹配规则</text>

      <rect x="40" y="325" width="720" height="30" rx="6" fill="#0f172a" />
      <text x="60" y="345" fontSize="11" fontWeight="600" fill="#e2e8f0">Token 类型</text>
      <text x="220" y="345" fontSize="11" fontWeight="600" fill="#e2e8f0">正则模式</text>
      <text x="500" y="345" fontSize="11" fontWeight="600" fill="#e2e8f0">示例</text>

      <rect x="40" y="355" width="720" height="26" rx="0" fill="#f8fafc" />
      <text x="60" y="373" fontSize="11" fill="#1e40af" fontFamily="monospace">KEYWORD</text>
      <text x="220" y="373" fontSize="11" fill="#475569" fontFamily="monospace">if|else|while|return</text>
      <text x="500" y="373" fontSize="11" fill="#475569" fontFamily="monospace">if, while</text>

      <rect x="40" y="381" width="720" height="26" rx="0" fill="#fff" />
      <text x="60" y="399" fontSize="11" fill="#1e40af" fontFamily="monospace">IDENT</text>
      <text x="220" y="399" fontSize="11" fill="#475569" fontFamily="monospace">[a-zA-Z_][a-zA-Z0-9_]*</text>
      <text x="500" y="399" fontSize="11" fill="#475569" fontFamily="monospace">x, count</text>

      <rect x="40" y="407" width="720" height="26" rx="0" fill="#f8fafc" />
      <text x="60" y="425" fontSize="11" fill="#1e40af" fontFamily="monospace">NUMBER</text>
      <text x="220" y="425" fontSize="11" fill="#475569" fontFamily="monospace">[0-9]+</text>
      <text x="500" y="425" fontSize="11" fill="#475569" fontFamily="monospace">42, 0</text>

      <rect x="40" y="433" width="720" height="26" rx="0" fill="#fff" />
      <text x="60" y="451" fontSize="11" fill="#1e40af" fontFamily="monospace">OP</text>
      <text x="220" y="451" fontSize="11" fill="#475569" fontFamily="monospace">+|-|*|/|=|==</text>
      <text x="500" y="451" fontSize="11" fill="#475569" fontFamily="monospace">+, ==</text>

      {/* 最长匹配原则 */}
      <rect x="40" y="475" width="340" height="65" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="60" y="498" fontSize="12" fontWeight="600" fill="#92400e">最长匹配（Maximal Munch）</text>
      <text x="60" y="516" fontSize="11" fill="#475569">输入 == 时匹配 == 而非两个 =</text>
      <text x="60" y="532" fontSize="11" fill="#475569">总是消费尽可能多的字符</text>

      <rect x="420" y="475" width="340" height="65" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="440" y="498" fontSize="12" fontWeight="600" fill="#334155">优先级规则</text>
      <text x="440" y="516" fontSize="11" fill="#475569">KEYWORD 优先于 IDENT</text>
      <text x="440" y="532" fontSize="11" fill="#475569">if 匹配为关键字而非标识符</text>
    </svg>
  );
}
