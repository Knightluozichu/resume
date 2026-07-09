"use client";

export function TwsEvaluatorDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="求值器树遍历与环境绑定">
      <defs>
        <linearGradient id="tws-ev-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tws-ev-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tws-ev-result" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-ev-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">求值器：AST 遍历 + 环境查找</text>

      {/* AST 输入 */}
      <rect x="40" y="50" width="180" height="90" rx="10" fill="url(#tws-ev-ast)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="130" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">AST 根节点</text>
      <text x="55" y="95" fontSize="11" fill="#475569">从 program 根节点开始</text>
      <text x="55" y="112" fontSize="11" fill="#475569">递归遍历每个子节点</text>
      <text x="55" y="129" fontSize="11" fill="#475569">调用 accept(visitor)</text>

      <path d="M220 95 L260 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-ev-arrow)" />

      {/* 求值器核心 */}
      <rect x="260" y="50" width="260" height="90" rx="10" fill="url(#tws-ev-env)" opacity="0.95" />
      <text x="390" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">BasicEvaluator</text>
      <text x="390" y="97" textAnchor="middle" fontSize="11" fill="#fef3c7">实现 EnvironmentEvalVisitor</text>
      <text x="390" y="115" textAnchor="middle" fontSize="11" fill="#fef3c7">为每种 AST 节点定义 eval 方法</text>
      <text x="390" y="133" textAnchor="middle" fontSize="11" fill="#fef3c7">visit(BinaryExpr) → 递归求值左右子树</text>

      <path d="M520 95 L560 95" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#tws-ev-arrow)" />

      {/* 结果 */}
      <rect x="560" y="50" width="200" height="90" rx="10" fill="url(#tws-ev-result)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">求值结果</text>
      <text x="575" y="95" fontSize="11" fill="#065f46">Integer / String / Object</text>
      <text x="575" y="112" fontSize="11" fill="#065f46">语句返回 null（无值）</text>
      <text x="575" y="129" fontSize="11" fill="#065f46">表达式返回计算值</text>

      {/* 环境结构 */}
      <text x="400" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">环境（Environment）—— 变量绑定查找</text>

      <rect x="40" y="185" width="340" height="130" rx="10" fill="url(#tws-ev-env)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="207" fontSize="12" fontWeight="600" fill="#92400e">环境是一个链表</text>
      <text x="60" y="227" fontSize="11" fill="#475569">每个 Environment 持有:</text>
      <text x="70" y="245" fontSize="11" fill="#475569" fontFamily="monospace">values: Map&lt;String, Object&gt;</text>
      <text x="70" y="262" fontSize="11" fill="#475569" fontFamily="monospace">outer: Environment（外层）</text>
      <text x="60" y="285" fontSize="11" fill="#92400e">变量查找规则：</text>
      <text x="70" y="303" fontSize="11" fill="#475569">当前环境 → 外层 → ... → 全局环境</text>

      {/* 环境链示意 */}
      <rect x="420" y="185" width="340" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="207" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">环境链示意</text>
      <rect x="440" y="218" width="130" height="28" rx="6" fill="url(#tws-ev-env)" opacity="0.20" stroke="#d97706" strokeWidth="1" />
      <text x="505" y="236" textAnchor="middle" fontSize="10" fill="#92400e">全局环境 outer=null</text>
      <text x="575" y="236" fontSize="10" fill="#64748b">→</text>
      <rect x="590" y="218" width="130" height="28" rx="6" fill="url(#tws-ev-env)" opacity="0.30" stroke="#d97706" strokeWidth="1" />
      <text x="655" y="236" textAnchor="middle" fontSize="10" fill="#92400e">函数环境</text>
      <text x="575" y="265" fontSize="10" fill="#64748b">→</text>
      <rect x="440" y="252" width="130" height="28" rx="6" fill="url(#tws-ev-env)" opacity="0.40" stroke="#d97706" strokeWidth="1" />
      <text x="505" y="270" textAnchor="middle" fontSize="10" fill="#92400e">块作用域</text>
      <text x="575" y="265" fontSize="10" fill="#64748b">←</text>
      <text x="440" y="300" fontSize="10" fill="#475569">put 新变量时写入当前环境</text>
      <text x="440" y="315" fontSize="10" fill="#475569">get 变量时沿 outer 链逐层查找</text>

      {/* 各节点求值规则 */}
      <text x="400" y="345" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">各 AST 节点求值规则</text>

      <rect x="40" y="360" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="55" y="378" fontSize="11" fontWeight="600" fill="#0e7490">NumberLiteral</text>
      <text x="55" y="395" fontSize="11" fill="#475569">返回 Integer.valueOf(text)</text>

      <rect x="285" y="360" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="300" y="378" fontSize="11" fontWeight="600" fill="#0e7490">Name（变量名）</text>
      <text x="300" y="395" fontSize="11" fill="#475569">env.get(name) 查找绑定值</text>

      <rect x="530" y="360" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="545" y="378" fontSize="11" fontWeight="600" fill="#0e7490">BinaryExpr</text>
      <text x="545" y="395" fontSize="11" fill="#475569">先求左右子树，再按运算符计算</text>

      <rect x="40" y="414" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="55" y="432" fontSize="11" fontWeight="600" fill="#0e7490">IfStmnt</text>
      <text x="55" y="449" fontSize="11" fill="#475569">求值条件，true 执行 then 块</text>

      <rect x="285" y="414" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="300" y="432" fontSize="11" fontWeight="600" fill="#0e7490">WhileStmnt</text>
      <text x="300" y="449" fontSize="11" fill="#475569">循环求值条件+循环体直到 false</text>

      <rect x="530" y="414" width="230" height="44" rx="8" fill="url(#tws-ev-ast)" opacity="0.10" stroke="#0891b2" strokeWidth="1" />
      <text x="545" y="432" fontSize="11" fontWeight="600" fill="#0e7490">BlockStmnt</text>
      <text x="545" y="449" fontSize="11" fill="#475569">依次求值每条子语句，返回最后值</text>

      {/* 底部 */}
      <rect x="40" y="478" width="720" height="40" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="400" y="503" textAnchor="middle" fontSize="11" fill="#92400e">树遍历解释器 = 递归 eval + 环境链查找，无中间字节码，直接在 AST 上执行</text>

      <rect x="40" y="528" width="720" height="24" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="545" textAnchor="middle" fontSize="10" fill="#475569">运行时类型错误（如对 String 做 +）抛出 StoneExc</text>
    </svg>
  );
}
