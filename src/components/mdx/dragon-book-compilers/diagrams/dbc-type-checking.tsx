"use client";

export function DbcTypeCheckingDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="类型检查与类型系统">
      <defs>
        <linearGradient id="dbc-tc-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dbc-tc-check" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="dbc-tc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">类型检查与类型系统</text>

      {/* 类型系统组成 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">类型系统的三要素</text>

      <rect x="30" y="72" width="240" height="90" rx="10" fill="url(#dbc-tc-sys)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">类型表达式</text>
      <text x="150" y="118" textAnchor="middle" fontSize="11" fill="#475569">基本类型：int, float, char, bool</text>
      <text x="150" y="138" textAnchor="middle" fontSize="11" fill="#475569">类型构造器：array, pointer, record</text>
      <text x="150" y="156" textAnchor="middle" fontSize="11" fill="#475569">函数类型：s → t</text>

      <rect x="290" y="72" width="240" height="90" rx="10" fill="url(#dbc-tc-sys)" opacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="410" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">类型规则</text>
      <text x="410" y="118" textAnchor="middle" fontSize="11" fill="#475569">if f: s → t and e: s then f(e): t</text>
      <text x="410" y="138" textAnchor="middle" fontSize="11" fill="#475569">if e1: int and e2: int</text>
      <text x="410" y="156" textAnchor="middle" fontSize="11" fill="#475569">then e1 + e2: int</text>

      <rect x="550" y="72" width="220" height="90" rx="10" fill="url(#dbc-tc-sys)" opacity="0.28" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="660" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">类型等价</text>
      <text x="660" y="118" textAnchor="middle" fontSize="11" fill="#475569">结构等价：递归比较结构</text>
      <text x="660" y="138" textAnchor="middle" fontSize="11" fill="#475569">名字等价：类型名相同</text>
      <text x="660" y="156" textAnchor="middle" fontSize="11" fill="#475569">Pascal / C 各有取舍</text>

      {/* 类型转换 */}
      <text x="400" y="196" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">类型转换与提升</text>

      <rect x="30" y="210" width="370" height="100" rx="10" fill="url(#dbc-tc-check)" opacity="0.08" stroke="#2563eb" strokeWidth="2" />
      <text x="50" y="234" fontSize="13" fontWeight="700" fill="#1e40af">隐式转换（自动 widening）</text>
      <text x="50" y="258" fontSize="11" fill="#475569">int → float → double（安全提升）</text>
      <text x="50" y="278" fontSize="11" fill="#475569">编译器自动插入转换指令</text>
      <text x="50" y="298" fontSize="11" fill="#475569">如 3 + 2.5 → (float)3 + 2.5</text>

      <rect x="410" y="210" width="360" height="100" rx="10" fill="url(#dbc-tc-check)" opacity="0.16" stroke="#2563eb" strokeWidth="2" />
      <text x="430" y="234" fontSize="13" fontWeight="700" fill="#1e40af">显式转换（cast）</text>
      <text x="430" y="258" fontSize="11" fill="#475569">程序员指定 (int)3.14</text>
      <text x="430" y="278" fontSize="11" fill="#475569">可能丢失精度（narrowing）</text>
      <text x="430" y="298" fontSize="11" fill="#475569">需类型检查器验证合法性</text>

      {/* 多态与重载 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">多态与重载</text>

      <rect x="30" y="362" width="240" height="100" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">参数多态（泛型）</text>
      <text x="150" y="408" textAnchor="middle" fontSize="11" fill="#475569">同一函数适配多种类型</text>
      <text x="150" y="428" textAnchor="middle" fontSize="11" fill="#475569">ML: id(x) = x 对任意类型</text>
      <text x="150" y="448" textAnchor="middle" fontSize="11" fill="#475569">类型变量 α（全称量化）</text>

      <rect x="290" y="362" width="240" height="100" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="410" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">重载（overloading）</text>
      <text x="410" y="408" textAnchor="middle" fontSize="11" fill="#475569">同名操作不同含义</text>
      <text x="410" y="428" textAnchor="middle" fontSize="11" fill="#475569">+ 既可整数加也可浮点加</text>
      <text x="410" y="448" textAnchor="middle" fontSize="11" fill="#475569">由参数类型消歧</text>

      <rect x="550" y="362" width="220" height="100" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="386" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">子类型多态</text>
      <text x="660" y="408" textAnchor="middle" fontSize="11" fill="#475569">子类型可替换父类型</text>
      <text x="660" y="428" textAnchor="middle" fontSize="11" fill="#475569">OOP: Dog : Animal</text>
      <text x="660" y="448" textAnchor="middle" fontSize="11" fill="#475569">Liskov 替换原则</text>
    </svg>
  );
}
