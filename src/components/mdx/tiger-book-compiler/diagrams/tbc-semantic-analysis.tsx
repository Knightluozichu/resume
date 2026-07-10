"use client";

export function TbcSemanticAnalysisDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书语义分析与类型检查">
      <defs>
        <linearGradient id="tbc-sem-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-sem-check" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-sem-typed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tbc-sem-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <marker id="tbc-sem-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">{`语义分析与类型检查`}</text>

      {/* 顶部：AST → 类型检查器 → 带类型结果 */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`类型检查流水线`}</text>

      <rect x="40" y="88" width="180" height="58" rx="10" fill="url(#tbc-sem-ast)" opacity="0.95" />
      <text x="130" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{`AST`}</text>
      <text x="130" y="132" textAnchor="middle" fontSize="11" fill="#bfdbfe">{`无类型的语法树`}</text>

      <path d="M220 117 L276 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-sem-arrow)" />

      <rect x="280" y="88" width="240" height="58" rx="10" fill="url(#tbc-sem-check)" opacity="0.95" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{`语义分析器（transVar）`}</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#e9d5ff">{`查环境 + 应用类型规则`}</text>

      <path d="M520 117 L576 117" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-sem-arrow)" />

      <rect x="580" y="88" width="180" height="58" rx="10" fill="url(#tbc-sem-typed)" opacity="0.95" />
      <text x="670" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">{`(exp, ty)`}</text>
      <text x="670" y="132" textAnchor="middle" fontSize="11" fill="#d1fae5">{`IR 片段 + 类型`}</text>

      {/* 中部：双环境结构 */}
      <text x="400" y="186" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`双环境（Symbol → 绑定）`}</text>

      <rect x="60" y="200" width="330" height="150" rx="8" fill="url(#tbc-sem-env)" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="225" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">{`类型环境 tenv`}</text>
      <text x="80" y="250" fontSize="11" fill="#475569">{`int → INT`}</text>
      <text x="80" y="270" fontSize="11" fill="#475569">{`string → STRING`}</text>
      <text x="80" y="290" fontSize="11" fill="#475569">{`type rec = {name: string, age: int}`}</text>
      <text x="80" y="310" fontSize="11" fill="#475569">{`type intList = rec array`}</text>
      <text x="80" y="334" fontSize="11" fill="#0369a1">{`记录类型按唯一性引用相等`}</text>

      <rect x="410" y="200" width="330" height="150" rx="8" fill="url(#tbc-sem-env)" opacity="0.10" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="575" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">{`值环境 venv`}</text>
      <text x="430" y="250" fontSize="11" fill="#475569">{`x → Var(int)`}</text>
      <text x="430" y="270" fontSize="11" fill="#475569">{`print → Func(string → void)`}</text>
      <text x="430" y="290" fontSize="11" fill="#475569">{`greet → Func(unit → void)`}</text>
      <text x="430" y="310" fontSize="11" fill="#475569">{`loop → Var(intList)`}</text>
      <text x="430" y="334" fontSize="11" fill="#0369a1">{`let 进作用域压栈，end 弹出`}</text>

      {/* 底部：Tiger 类型体系 */}
      <text x="400" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`Tiger 类型系统与核心规则`}</text>

      <rect x="40" y="400" width="180" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="130" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">{`基本类型`}</text>
      <text x="60" y="448" fontSize="11" fill="#475569">{`int：整数`}</text>
      <text x="60" y="468" fontSize="11" fill="#475569">{`string：字符串`}</text>
      <text x="60" y="488" fontSize="11" fill="#475569">{`unit（void）：无值`}</text>
      <text x="60" y="508" fontSize="11" fill="#475569">{`nil：record 的零值`}</text>

      <rect x="240" y="400" width="180" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="330" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">{`复合类型`}</text>
      <text x="260" y="448" fontSize="11" fill="#475569">{`record：{字段: 类型}`}</text>
      <text x="260" y="468" fontSize="11" fill="#475569">{`array：同类型序列`}</text>
      <text x="260" y="488" fontSize="11" fill="#475569">{`按声明唯一性相等`}</text>
      <text x="260" y="508" fontSize="11" fill="#475569">{`两个 {x:int} 不相等`}</text>

      <rect x="440" y="400" width="160" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="520" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">{`子类型规则`}</text>
      <text x="460" y="448" fontSize="11" fill="#475569">{`nil ⊑ 任意 record`}</text>
      <text x="460" y="468" fontSize="11" fill="#475569">{`if-then-else 两臂`}</text>
      <text x="460" y="488" fontSize="11" fill="#475569">{`类型必须相同`}</text>
      <text x="460" y="508" fontSize="11" fill="#475569">{`while 条件须 int`}</text>

      <rect x="620" y="400" width="140" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="690" y="424" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">{`检查输出`}</text>
      <text x="640" y="448" fontSize="11" fill="#475569">{`返回 (exp, ty)`}</text>
      <text x="640" y="468" fontSize="11" fill="#475569">{`exp：IR 翻译片段`}</text>
      <text x="640" y="488" fontSize="11" fill="#475569">{`ty：推导出的类型`}</text>
      <text x="640" y="508" fontSize="11" fill="#475569">{`类型错则报错`}</text>
    </svg>
  );
}
