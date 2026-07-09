"use client";

export function TwsAstDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="抽象语法树节点层次与访问者模式">
      <defs>
        <linearGradient id="tws-ast-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="tws-ast-expr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-ast-stmt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tws-ast-visitor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-ast-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">抽象语法树：节点层次与访问者模式</text>

      {/* ASTNode 基类 */}
      <rect x="300" y="50" width="200" height="50" rx="10" fill="url(#tws-ast-base)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ASTNode（抽象基类）</text>

      {/* 分叉箭头 */}
      <path d="M400 100 L400 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ast-arrow)" />
      <path d="M200 110 L200 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ast-arrow)" />
      <path d="M600 110 L600 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-ast-arrow)" />
      <path d="M200 110 L600 110" stroke="#64748b" strokeWidth="2" />

      {/* ASTList 容器节点 */}
      <rect x="100" y="120" width="200" height="40" rx="8" fill="url(#tws-ast-base)" opacity="0.12" stroke="#475569" strokeWidth="1.5" />
      <text x="200" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">ASTList（列表容器）</text>

      {/* ASTLeaf 叶子节点 */}
      <rect x="500" y="120" width="200" height="40" rx="8" fill="url(#tws-ast-base)" opacity="0.12" stroke="#475569" strokeWidth="1.5" />
      <text x="600" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">ASTLeaf（叶子节点）</text>

      {/* 表达式节点 */}
      <text x="200" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">表达式节点（ASTList 子类）</text>

      <rect x="40" y="195" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="120" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">NumberLiteral</text>

      <rect x="210" y="195" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="290" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">StringLiteral</text>

      <rect x="380" y="195" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="460" y="218" textAnchor="middle" fontSize="11" fill="#1e40af">Name（变量引用）</text>

      <rect x="40" y="240" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="120" y="263" textAnchor="middle" fontSize="11" fill="#1e40af">BinaryExpr</text>

      <rect x="210" y="240" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="290" y="263" textAnchor="middle" fontSize="11" fill="#1e40af">PrimaryExpr</text>

      <rect x="380" y="240" width="160" height="36" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="460" y="263" textAnchor="middle" fontSize="11" fill="#1e40af">NegativeExpr</text>

      {/* 语句节点 */}
      <text x="650" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">语句节点（ASTList 子类）</text>

      <rect x="570" y="195" width="190" height="36" rx="8" fill="url(#tws-ast-stmt)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="665" y="218" textAnchor="middle" fontSize="11" fill="#92400e">IfStmnt（条件分支）</text>

      <rect x="570" y="240" width="190" height="36" rx="8" fill="url(#tws-ast-stmt)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="665" y="263" textAnchor="middle" fontSize="11" fill="#92400e">WhileStmnt（循环）</text>

      <rect x="570" y="285" width="190" height="36" rx="8" fill="url(#tws-ast-stmt)" opacity="0.12" stroke="#f59e0b" strokeWidth="1" />
      <text x="665" y="308" textAnchor="middle" fontSize="11" fill="#92400e">BlockStmnt（语句块）</text>

      {/* AST 示例树 */}
      <text x="200" y="315" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">表达式 (3 + 4) * 5 的 AST</text>

      <rect x="150" y="330" width="100" height="32" rx="8" fill="url(#tws-ast-expr)" opacity="0.95" />
      <text x="200" y="351" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">BinaryExpr *</text>

      <path d="M175 362 L120 380" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-ast-arrow)" />
      <path d="M225 362 L280 380" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-ast-arrow)" />

      <rect x="70" y="385" width="100" height="32" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="406" textAnchor="middle" fontSize="11" fill="#1e40af">BinaryExpr +</text>

      <rect x="280" y="385" width="80" height="32" rx="8" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="320" y="406" textAnchor="middle" fontSize="11" fill="#1e40af">Number 5</text>

      <path d="M100 417 L80 435" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-ast-arrow)" />
      <path d="M140 417 L160 435" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-ast-arrow)" />

      <rect x="45" y="440" width="70" height="28" rx="6" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="80" y="459" textAnchor="middle" fontSize="10" fill="#1e40af">Number 3</text>

      <rect x="125" y="440" width="70" height="28" rx="6" fill="url(#tws-ast-expr)" opacity="0.12" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="459" textAnchor="middle" fontSize="10" fill="#1e40af">Number 4</text>

      {/* 访问者模式 */}
      <rect x="490" y="330" width="270" height="180" rx="10" fill="url(#tws-ast-visitor)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="625" y="355" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">访问者模式（Visitor）</text>
      <text x="510" y="378" fontSize="11" fill="#065f46">每个 ASTNode 子类实现 accept：</text>
      <text x="520" y="396" fontSize="11" fill="#475569" fontFamily="monospace">void accept(Visitor v) &lbrace;</text>
      <text x="530" y="412" fontSize="11" fill="#475569" fontFamily="monospace">v.visit(this);</text>
      <text x="520" y="428" fontSize="11" fill="#475569" fontFamily="monospace">&rbrace;</text>
      <text x="510" y="452" fontSize="11" fill="#065f46">Visitor 接口为每种节点定义</text>
      <text x="510" y="468" fontSize="11" fill="#065f46">重载方法，实现双重分派</text>
      <text x="510" y="494" fontSize="11" fill="#065f46">→ 求值器/类型检查器复用此机制</text>
    </svg>
  );
}
