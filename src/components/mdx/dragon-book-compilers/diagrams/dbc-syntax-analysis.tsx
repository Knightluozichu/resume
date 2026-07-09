"use client";

export function DbcSyntaxAnalysisDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="语法分析：上下文无关文法与LL/LR解析">
      <defs>
        <linearGradient id="dbc-syn-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dbc-syn-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dbc-syn-cfg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="dbc-syn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语法分析：上下文无关文法 → 自顶向下 / 自底向上</text>

      {/* CFG核心 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">上下文无关文法（CFG）四元组 G = (V, T, P, S)</text>

      <rect x="30" y="72" width="180" height="64" rx="10" fill="url(#dbc-syn-cfg)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="120" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">V 非终结符</text>
      <text x="120" y="116" textAnchor="middle" fontSize="11" fill="#475569">语法变量（如 E, T, F）</text>

      <rect x="220" y="72" width="180" height="64" rx="10" fill="url(#dbc-syn-cfg)" opacity="0.18" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">T 终结符</text>
      <text x="310" y="116" textAnchor="middle" fontSize="11" fill="#475569">Token（如 id, +, *）</text>

      <rect x="410" y="72" width="180" height="64" rx="10" fill="url(#dbc-syn-cfg)" opacity="0.24" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="500" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">P 产生式</text>
      <text x="500" y="116" textAnchor="middle" fontSize="11" fill="#475569">E → E + T | T</text>

      <rect x="600" y="72" width="170" height="64" rx="10" fill="url(#dbc-syn-cfg)" opacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="685" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">S 开始符号</text>
      <text x="685" y="116" textAnchor="middle" fontSize="11" fill="#475569">推导的起点</text>

      {/* 自顶向下 vs 自底向上 */}
      <text x="200" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">自顶向下分析</text>
      <text x="600" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">自底向上分析</text>

      <rect x="30" y="186" width="370" height="180" rx="10" fill="url(#dbc-syn-top)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="50" y="212" fontSize="13" fontWeight="700" fill="#1e40af">从开始符号推导到输入串</text>
      <text x="50" y="236" fontSize="12" fontWeight="600" fill="#1e40af">LL 分析（Left-to-right, Leftmost）</text>
      <text x="50" y="258" fontSize="11" fill="#475569">递归下降 / 预测分析表</text>
      <text x="50" y="278" fontSize="11" fill="#475569">FIRST 集：可推导出的首终结符</text>
      <text x="50" y="298" fontSize="11" fill="#475569">FOLLOW 集：可跟随的终结符</text>
      <text x="50" y="320" fontSize="11" fill="#475569">消除左递归 → 提取公共左因子</text>
      <text x="50" y="346" fontSize="11" fill="#64748b">优势：直观易实现 / 局限：表达力弱</text>

      <rect x="410" y="186" width="370" height="180" rx="10" fill="url(#dbc-syn-bot)" opacity="0.08" stroke="#f59e0b" strokeWidth="2" />
      <text x="430" y="212" fontSize="13" fontWeight="700" fill="#92400e">从输入串归约到开始符号</text>
      <text x="430" y="236" fontSize="12" fontWeight="600" fill="#92400e">LR 分析（Left-to-right, Rightmost）</text>
      <text x="430" y="258" fontSize="11" fill="#475569">移进-归约（Shift-Reduce）</text>
      <text x="430" y="278" fontSize="11" fill="#475569">LR(0) → SLR(1) → LALR(1) → LR(1)</text>
      <text x="430" y="298" fontSize="11" fill="#475569">项目集 / ACTION-GOTO 表</text>
      <text x="430" y="320" fontSize="11" fill="#475569">句柄：可归约的最右推导串</text>
      <text x="430" y="346" fontSize="11" fill="#64748b">优势：表达力强 / Yacc 生成 / 冲突处理</text>

      {/* LR家族对比 */}
      <text x="400" y="396" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">LR 分析器家族对比</text>

      <rect x="30" y="410" width="180" height="76" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="120" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">LR(0)</text>
      <text x="120" y="452" textAnchor="middle" fontSize="11" fill="#475569">不看 lookahead</text>
      <text x="120" y="470" textAnchor="middle" fontSize="11" fill="#475569">冲突多 / 表达力弱</text>

      <rect x="220" y="410" width="180" height="76" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">SLR(1)</text>
      <text x="310" y="452" textAnchor="middle" fontSize="11" fill="#475569">用 FOLLOW 消冲突</text>
      <text x="310" y="470" textAnchor="middle" fontSize="11" fill="#475569">简单但不够精确</text>

      <rect x="410" y="410" width="180" height="76" rx="8" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">LALR(1)</text>
      <text x="500" y="452" textAnchor="middle" fontSize="11" fill="#475569">合并同心集 / 状态少</text>
      <text x="500" y="470" textAnchor="middle" fontSize="11" fill="#475569">Yacc 默认 / 工业主流</text>

      <rect x="600" y="410" width="170" height="76" rx="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="685" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">LR(1)</text>
      <text x="685" y="452" textAnchor="middle" fontSize="11" fill="#475569">精确 lookahead</text>
      <text x="685" y="470" textAnchor="middle" fontSize="11" fill="#475569">表达力最强 / 状态多</text>
    </svg>
  );
}
