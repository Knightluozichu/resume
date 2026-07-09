"use client";

export function TbcTranslationIrDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书翻译到Tree中间表示">
      <defs>
        <linearGradient id="tbc-ir-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-ir-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-ir-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tbc-ir-exp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <marker id="tbc-ir-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">翻译到中间表示（Tree IR）</text>

      {/* 顶部：AST → Translate → Tree IR */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">翻译流水线</text>

      <rect x="40" y="88" width="180" height="58" rx="10" fill="url(#tbc-ir-ast)" opacity="0.95" />
      <text x="130" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">带类型 AST</text>
      <text x="130" y="132" textAnchor="middle" fontSize="11" fill="#bfdbfe">transVar / transExp 递归</text>

      <path d="M220 117 L276 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-ir-arrow)" />

      <rect x="280" y="88" width="240" height="58" rx="10" fill="url(#tbc-ir-trans)" opacity="0.95" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Translate 模块</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#e9d5ff">Ex / Nx / Cx 三形式</text>

      <path d="M520 117 L576 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-ir-arrow)" />

      <rect x="580" y="88" width="180" height="58" rx="10" fill="url(#tbc-ir-tree)" opacity="0.95" />
      <text x="670" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Tree IR</text>
      <text x="670" y="132" textAnchor="middle" fontSize="11" fill="#d1fae5">树形中间表示</text>

      {/* 中部：Tree IR 节点分类 */}
      <text x="200" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">表达式节点（求值为值）</text>
      <text x="600" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">语句节点（无返回值）</text>

      <rect x="40" y="200" width="360" height="150" rx="8" fill="url(#tbc-ir-exp)" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="60" y="224" fontSize="12" fontWeight="700" fill="#0369a1">CONST(i)：常量</text>
      <text x="60" y="244" fontSize="11" fill="#475569">NAME(label)：跳转标签名</text>
      <text x="60" y="264" fontSize="11" fill="#475569">TEMP(t)：临时变量/寄存器</text>
      <text x="60" y="284" fontSize="11" fill="#475569">BINOP(op, e1, e2)：二元运算</text>
      <text x="60" y="304" fontSize="11" fill="#475569">MEM(e)：内存读/写目标</text>
      <text x="60" y="324" fontSize="11" fill="#475569">CALL(f, args)：函数调用</text>
      <text x="60" y="344" fontSize="11" fontWeight="700" fill="#0369a1">ESEQ(stmt, e)：语句后求值（待规范化）</text>

      <rect x="420" y="200" width="360" height="150" rx="8" fill="url(#tbc-ir-tree)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="224" fontSize="12" fontWeight="700" fill="#047857">MOVE(dst, src)：赋值</text>
      <text x="440" y="244" fontSize="11" fill="#475569">EXP(e)：丢弃表达式值</text>
      <text x="440" y="264" fontSize="11" fill="#475569">JUMP(exp, labels)：跳转</text>
      <text x="440" y="284" fontSize="11" fill="#475569">CJUMP(op, e1, e2, t, f)：条件跳转</text>
      <text x="440" y="304" fontSize="11" fill="#475569">SEQ(s1, s2)：语句序列</text>
      <text x="440" y="324" fontSize="11" fill="#475569">LABEL(name)：标记跳转目标</text>
      <text x="440" y="344" fontSize="11" fontWeight="700" fill="#047857">控制流通过 JUMP / CJUMP 串联</text>

      {/* 底部：Ex / Nx / Cx 三形式 */}
      <text x="400" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三种翻译形式与转换</text>

      <rect x="40" y="400" width="220" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="150" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">Ex（表达式）</text>
      <text x="60" y="448" fontSize="11" fill="#475569">求值为一个值</text>
      <text x="60" y="468" fontSize="11" fill="#475569">例：BINOP(PLUS, a, b)</text>
      <text x="60" y="492" fontSize="11" fontWeight="700" fill="#0369a1">unEx → 包装成求值表达式</text>
      <text x="60" y="512" fontSize="11" fill="#475569">a + b 直接返回 BINOP 树</text>

      <rect x="290" y="400" width="220" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">Nx（语句）</text>
      <text x="310" y="448" fontSize="11" fill="#475569">无返回值，仅副作用</text>
      <text x="310" y="468" fontSize="11" fill="#475569">例：MOVE(MEM(x), v)</text>
      <text x="310" y="492" fontSize="11" fontWeight="700" fill="#5b21b6">unNx → 丢弃值成为语句</text>
      <text x="310" y="512" fontSize="11" fill="#475569">Ex 转 Nx：包一层 EXP</text>

      <rect x="540" y="400" width="220" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="650" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Cx（条件）</text>
      <text x="560" y="448" fontSize="11" fill="#475569">跳转到真/假标签</text>
      <text x="560" y="468" fontSize="11" fill="#475569">例：a &lt; b 的条件判断</text>
      <text x="560" y="492" fontSize="11" fontWeight="700" fill="#92400e">unCx → 生成 CJUMP</text>
      <text x="560" y="512" fontSize="11" fill="#475569">短路 &amp; / | 用 Cx 串联</text>
    </svg>
  );
}
