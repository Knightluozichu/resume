"use client";

export function EacContextSensitiveDiagram() {
  return (
    <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="上下文相关分析属性文法与符号表类型检查">
      <defs>
        <linearGradient id="eac-cs-attr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="eac-cs-sym" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="eac-cs-type" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="eac-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">上下文相关分析：语法管不住的规则</text>

      {/* 三列 */}
      <rect x="30" y="60" width="230" height="180" rx="12" fill="url(#eac-cs-attr)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="145" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">属性文法</text>
      <text x="145" y="112" textAnchor="middle" fontSize="11" fill="#475569">在文法节点上挂属性</text>
      <rect x="50" y="125" width="190" height="30" rx="6" fill="#2563eb" opacity="0.7" />
      <text x="145" y="145" textAnchor="middle" fontSize="11" fill="#fff">综合属性 ↑ 自底向上</text>
      <rect x="50" y="160" width="190" height="30" rx="6" fill="#2563eb" opacity="0.5" />
      <text x="145" y="180" textAnchor="middle" fontSize="11" fill="#fff">继承属性 ↓ 自顶向下</text>
      <text x="145" y="210" textAnchor="middle" fontSize="11" fill="#475569">E.type = E1.type</text>
      <text x="145" y="228" textAnchor="middle" fontSize="11" fill="#475569">语法制导翻译 SDT</text>

      <rect x="285" y="60" width="230" height="180" rx="12" fill="url(#eac-cs-sym)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">符号表</text>
      <text x="400" y="112" textAnchor="middle" fontSize="11" fill="#475569">记录名字 → 信息映射</text>
      <rect x="305" y="125" width="190" height="30" rx="6" fill="#7c3aed" opacity="0.7" />
      <text x="400" y="145" textAnchor="middle" fontSize="11" fill="#fff">作用域栈（嵌套可见性）</text>
      <rect x="305" y="160" width="190" height="30" rx="6" fill="#7c3aed" opacity="0.5" />
      <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#fff">声明：插入；引用：查找</text>
      <text x="400" y="210" textAnchor="middle" fontSize="11" fill="#475569">哈希表 / 树 / 链表实现</text>
      <text x="400" y="228" textAnchor="middle" fontSize="11" fill="#475569">支持嵌套作用域的进/出</text>

      <rect x="540" y="60" width="230" height="180" rx="12" fill="url(#eac-cs-type)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="655" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">类型检查与推断</text>
      <text x="655" y="112" textAnchor="middle" fontSize="11" fill="#475569">验证操作类型合法</text>
      <rect x="560" y="125" width="190" height="30" rx="6" fill="#059669" opacity="0.7" />
      <text x="655" y="145" textAnchor="middle" fontSize="11" fill="#fff">类型规则：T1 × T2 → T3</text>
      <rect x="560" y="160" width="190" height="30" rx="6" fill="#059669" opacity="0.5" />
      <text x="655" y="180" textAnchor="middle" fontSize="11" fill="#fff">隐式转换 / 强制提升</text>
      <text x="655" y="210" textAnchor="middle" fontSize="11" fill="#475569">类型推断（Hindley-Milner）</text>
      <text x="655" y="228" textAnchor="middle" fontSize="11" fill="#475569">多态 / 泛型类型系统</text>

      {/* 底部：为什么需要上下文相关分析 */}
      <rect x="30" y="270" width="740" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="295" fontSize="13" fontWeight="700" fill="#92400e">为什么语法分析不够？</text>
      <text x="50" y="315" fontSize="11" fill="#475569">语法（CFG）只能判断 "x = y + z" 结构合法，但管不住：x 是否已声明？y 和 z 类型是否兼容？返回值是否匹配？这些是上下文相关性质。</text>

      {/* 底部：广告语 */}
      <rect x="30" y="345" width="740" height="80" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="370" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5b21b6">属性流：综合属性自底向上传，继承属性自顶向下传</text>
      <text x="400" y="392" textAnchor="middle" fontSize="11" fill="#475569">语法制导翻译（SDT）= 遍历 AST 时按属性依赖求值，把类型 / 符号 / 语义检查嵌入语法结构</text>
      <text x="400" y="412" textAnchor="middle" fontSize="11" fill="#475569">求值顺序需满足属性依赖图的无环约束（Adorned AST）</text>
    </svg>
  );
}
