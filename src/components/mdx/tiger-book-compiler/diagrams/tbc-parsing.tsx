"use client";

export function TbcParsingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书语法分析：Token到AST与LR移进归约">
      <defs>
        <linearGradient id="tbc-par-frontend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-par-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tbc-par-lr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-par-warn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tbc-par-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">语法分析：Token → AST（ML-Yacc，LALR(1)）</text>

      {/* 顶部：Token → LR 分析器 → AST */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">分析过程</text>

      <rect x="40" y="88" width="180" height="58" rx="10" fill="url(#tbc-par-frontend)" opacity="0.95" />
      <text x="130" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Token 流</text>
      <text x="130" y="132" textAnchor="middle" fontSize="11" fill="#bfdbfe">ID + INT $</text>

      <path d="M220 117 L276 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-par-arrow)" />

      <rect x="280" y="88" width="240" height="58" rx="10" fill="url(#tbc-par-lr)" opacity="0.95" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">LR 分析器（栈 + ACTION-GOTO）</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#e9d5ff">移进 / 归约 / 接受 / 报错</text>

      <path d="M520 117 L576 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-par-arrow)" />

      <rect x="580" y="88" width="180" height="58" rx="10" fill="url(#tbc-par-ast)" opacity="0.95" />
      <text x="670" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">AST</text>
      <text x="670" y="132" textAnchor="middle" fontSize="11" fill="#d1fae5">抽象语法树</text>

      {/* 中部：移进-归约过程 */}
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">移进-归约示例（文法 E → E + E | INT）</text>

      <rect x="40" y="200" width="220" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="224" fontSize="11" fontWeight="700" fill="#334155">栈</text>
      <text x="110" y="224" fontSize="11" fill="#475569">INT</text>
      <rect x="270" y="200" width="200" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="224" fontSize="11" fontWeight="700" fill="#334155">剩余</text>
      <text x="340" y="224" fontSize="11" fill="#475569">+ INT $</text>
      <rect x="480" y="200" width="280" height="40" rx="6" fill="url(#tbc-par-warn)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="224" fontSize="11" fontWeight="700" fill="#92400e">动作</text>
      <text x="548" y="224" fontSize="11" fill="#475569">移进 INT</text>

      <path d="M400 240 L400 246" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-par-arrow)" />

      <rect x="40" y="250" width="220" height="40" rx="6" fill="url(#tbc-par-lr)" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="274" fontSize="11" fontWeight="700" fill="#334155">栈</text>
      <text x="110" y="274" fontSize="11" fill="#475569">E</text>
      <rect x="270" y="250" width="200" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="274" fontSize="11" fontWeight="700" fill="#334155">剩余</text>
      <text x="340" y="274" fontSize="11" fill="#475569">+ INT $</text>
      <rect x="480" y="250" width="280" height="40" rx="6" fill="url(#tbc-par-ast)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="274" fontSize="11" fontWeight="700" fill="#047857">动作</text>
      <text x="548" y="274" fontSize="11" fill="#475569">归约 INT → E</text>

      <path d="M400 290 L400 296" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-par-arrow)" />

      <rect x="40" y="300" width="220" height="40" rx="6" fill="url(#tbc-par-lr)" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="324" fontSize="11" fontWeight="700" fill="#334155">栈</text>
      <text x="110" y="324" fontSize="11" fill="#475569">E +</text>
      <rect x="270" y="300" width="200" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="324" fontSize="11" fontWeight="700" fill="#334155">剩余</text>
      <text x="340" y="324" fontSize="11" fill="#475569">INT $</text>
      <rect x="480" y="300" width="280" height="40" rx="6" fill="url(#tbc-par-warn)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="324" fontSize="11" fontWeight="700" fill="#92400e">动作</text>
      <text x="548" y="324" fontSize="11" fill="#475569">移进 +</text>

      <path d="M400 340 L400 346" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-par-arrow)" />

      <rect x="40" y="350" width="220" height="40" rx="6" fill="url(#tbc-par-ast)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="374" fontSize="11" fontWeight="700" fill="#334155">栈</text>
      <text x="110" y="374" fontSize="11" fill="#475569">E</text>
      <rect x="270" y="350" width="200" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="374" fontSize="11" fontWeight="700" fill="#334155">剩余</text>
      <text x="340" y="374" fontSize="11" fill="#475569">$</text>
      <rect x="480" y="350" width="280" height="40" rx="6" fill="url(#tbc-par-ast)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="374" fontSize="11" fontWeight="700" fill="#047857">动作</text>
      <text x="548" y="374" fontSize="11" fill="#475569">归约 E + E → E，接受</text>

      {/* 底部：LL vs LR 与 LR 家族 */}
      <text x="200" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">递归下降 vs Yacc</text>
      <text x="600" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">LR 家族递进</text>

      <rect x="40" y="438" width="360" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="460" fontSize="12" fontWeight="700" fill="#1e40af">递归下降（手写）</text>
      <text x="60" y="480" fontSize="11" fill="#475569">每个非终结符一个函数，预测分析</text>
      <text x="60" y="500" fontSize="11" fill="#475569">易控错误恢复，适合 Tiger 抽象文法</text>
      <text x="60" y="520" fontSize="11" fill="#475569">需处理左递归与公共前缀</text>

      <rect x="420" y="438" width="340" height="92" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="460" fontSize="12" fontWeight="700" fill="#5b21b6">LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1)</text>
      <text x="440" y="480" fontSize="11" fill="#475569">ML-Yacc 默认 LALR(1)：状态少且精确</text>
      <text x="440" y="500" fontSize="11" fill="#475569">error 伪终结符做错误恢复</text>
      <text x="440" y="520" fontSize="11" fill="#475569">移进-归约 / 归约-归约冲突需消解</text>
    </svg>
  );
}
