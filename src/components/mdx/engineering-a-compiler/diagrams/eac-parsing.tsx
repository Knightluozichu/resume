"use client";

export function EacParsingDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="语法分析器LL与LR对比及移进归约机制">
      <defs>
        <linearGradient id="eac-parse-ll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-parse-lr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="eac-parse-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语法分析：自顶向下 LL vs 自底向上 LR</text>

      {/* 左侧：LL 自顶向下 */}
      <rect x="30" y="60" width="350" height="200" rx="12" fill="url(#eac-parse-ll)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="205" y="88" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">自顶向下（LL 分析）</text>
      <text x="205" y="108" textAnchor="middle" fontSize="11" fill="#475569">从起始符号出发，预测推导</text>

      <rect x="50" y="125" width="310" height="30" rx="6" fill="#2563eb" opacity="0.7" />
      <text x="205" y="145" textAnchor="middle" fontSize="12" fill="#fff">起始符号 S → 展开最左非终结符</text>

      <text x="205" y="175" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">递归下降 / 预测分析表</text>
      <text x="205" y="195" textAnchor="middle" fontSize="11" fill="#475569">FIRST 集 → 预测用哪条产生式</text>
      <text x="205" y="213" textAnchor="middle" fontSize="11" fill="#475569">无回溯需 LL(1)：FIRST 无交集</text>

      <rect x="50" y="225" width="310" height="25" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="205" y="242" textAnchor="middle" fontSize="11" fill="#92400e">弱点：不能处理左递归文法</text>

      {/* 右侧：LR 自底向上 */}
      <rect x="420" y="60" width="350" height="200" rx="12" fill="url(#eac-parse-lr)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="595" y="88" textAnchor="middle" fontSize="15" fontWeight="700" fill="#5b21b6">自底向上（LR 分析）</text>
      <text x="595" y="108" textAnchor="middle" fontSize="11" fill="#475569">从输入串出发，归约到起始符号</text>

      <rect x="440" y="125" width="310" height="30" rx="6" fill="#7c3aed" opacity="0.7" />
      <text x="595" y="145" textAnchor="middle" fontSize="12" fill="#fff">移进 Token → 归约句柄 → S</text>

      <text x="595" y="175" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">移进-归约分析 + LR 分析表</text>
      <text x="595" y="195" textAnchor="middle" fontSize="11" fill="#475569">LR(0) → SLR(1) → LALR(1) → LR(1)</text>
      <text x="595" y="213" textAnchor="middle" fontSize="11" fill="#475569">能力递增，状态数递增</text>

      <rect x="440" y="225" width="310" height="25" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
      <text x="595" y="242" textAnchor="middle" fontSize="11" fill="#065f46">优点：表达力强，能处理左递归</text>

      {/* 下方：移进归约栈 */}
      <text x="400" y="298" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">移进-归约：栈的演化</text>

      <rect x="40" y="315" width="720" height="60" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="340" fontSize="11" fill="#1e40af" fontWeight="600">步骤 1（移进）</text>
      <text x="80" y="358" fontSize="11" fill="#475569">栈：[ id ]  输入：= expr</text>
      <text x="260" y="340" fontSize="11" fill="#1e40af" fontWeight="600">步骤 2（移进）</text>
      <text x="260" y="358" fontSize="11" fill="#475569">栈：[ id = ]  输入：expr</text>
      <text x="480" y="340" fontSize="11" fill="#5b21b6" fontWeight="600">步骤 3（归约）</text>
      <text x="480" y="358" fontSize="11" fill="#475569">栈：[ id = expr ] → 归约为 Assign</text>

      <rect x="40" y="390" width="720" height="55" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="413" fontSize="12" fontWeight="600" fill="#5b21b6">核心冲突</text>
      <text x="60" y="432" fontSize="11" fill="#475569">移进-归约冲突：栈顶可移进也可归约时如何选择？归约-归约冲突：多条规则同时可归约？LR 表设计要消除这些歧义。</text>
    </svg>
  );
}
