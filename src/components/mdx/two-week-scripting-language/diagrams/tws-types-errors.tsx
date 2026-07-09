"use client";

export function TwsTypesErrorsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="动态类型系统与错误处理层次">
      <defs>
        <linearGradient id="tws-te-type" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-te-err" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="tws-te-check" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-te-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">类型与错误处理：动态类型 + 异常体系</text>

      {/* 动态类型 vs 静态类型 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">动态类型 vs 静态类型</text>

      <rect x="40" y="72" width="320" height="120" rx="10" fill="url(#tws-te-type)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="95" fontSize="12" fontWeight="600" fill="#1e40af">Stone：动态类型语言</text>
      <text x="60" y="115" fontSize="11" fill="#475569">变量无类型声明，值有类型</text>
      <text x="60" y="133" fontSize="11" fill="#475569" fontFamily="monospace">x = 10      // x 绑定 Integer</text>
      <text x="60" y="150" fontSize="11" fill="#475569" fontFamily="monospace">x = &quot;hello&quot; // x 重新绑定 String</text>
      <text x="60" y="172" fontSize="11" fill="#1e40af">类型检查在运行时进行</text>

      <rect x="400" y="72" width="360" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="420" y="95" fontSize="12" fontWeight="600" fill="#334155">Java：静态类型语言</text>
      <text x="420" y="115" fontSize="11" fill="#475569">变量声明时必须指定类型</text>
      <text x="420" y="133" fontSize="11" fill="#475569" fontFamily="monospace">int x = 10;</text>
      <text x="420" y="150" fontSize="11" fill="#475569" fontFamily="monospace">// x = &quot;hello&quot;; 编译错误</text>
      <text x="420" y="172" fontSize="11" fill="#475569">类型检查在编译期完成</text>

      {/* Stone 值类型 */}
      <text x="400" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Stone 运行时值类型</text>

      <rect x="40" y="230" width="170" height="50" rx="8" fill="url(#tws-te-type)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="125" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Integer</text>
      <text x="125" y="270" textAnchor="middle" fontSize="11" fill="#475569">整数（Java int）</text>

      <rect x="225" y="230" width="170" height="50" rx="8" fill="url(#tws-te-type)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="310" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">String</text>
      <text x="310" y="270" textAnchor="middle" fontSize="11" fill="#475569">字符串</text>

      <rect x="410" y="230" width="170" height="50" rx="8" fill="url(#tws-te-type)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="495" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">Function</text>
      <text x="495" y="270" textAnchor="middle" fontSize="11" fill="#475569">函数对象</text>

      <rect x="595" y="230" width="165" height="50" rx="8" fill="url(#tws-te-type)" opacity="0.10" stroke="#2563eb" strokeWidth="1" />
      <text x="677" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">StoneObject</text>
      <text x="677" y="270" textAnchor="middle" fontSize="11" fill="#475569">类实例</text>

      {/* 运行时类型检查流程 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">运行时类型检查流程</text>

      <rect x="60" y="325" width="150" height="36" rx="8" fill="url(#tws-te-check)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="135" y="348" textAnchor="middle" fontSize="11" fill="#065f46">执行运算操作</text>
      <path d="M210 343 L230 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-te-arrow)" />

      <rect x="230" y="325" width="170" height="36" rx="8" fill="url(#tws-te-check)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="315" y="348" textAnchor="middle" fontSize="11" fill="#065f46">检查操作数类型</text>
      <path d="M400 343 L420 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-te-arrow)" />

      <rect x="420" y="325" width="150" height="36" rx="8" fill="url(#tws-te-check)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="495" y="348" textAnchor="middle" fontSize="11" fill="#065f46">类型匹配？</text>
      <path d="M570 343 L590 343" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-te-arrow)" />

      <rect x="590" y="325" width="170" height="36" rx="8" fill="url(#tws-te-check)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="675" y="348" textAnchor="middle" fontSize="11" fill="#065f46">执行并返回结果</text>

      {/* 不匹配时抛出异常 */}
      <path d="M495 361 L495 380" stroke="#dc2626" strokeWidth="2" markerEnd="url(#tws-te-arrow)" />
      <rect x="410" y="380" width="170" height="36" rx="8" fill="url(#tws-te-err)" opacity="0.15" stroke="#dc2626" strokeWidth="1.5" />
      <text x="495" y="403" textAnchor="middle" fontSize="11" fill="#991b1b">不匹配 → 抛 StoneExc</text>

      {/* 异常层次结构 */}
      <text x="400" y="440" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">异常类层次结构</text>

      <rect x="300" y="455" width="200" height="36" rx="8" fill="url(#tws-te-err)" opacity="0.95" />
      <text x="400" y="478" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">StoneExc（基类）</text>

      <path d="M400 491 L200 500" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-te-arrow)" />
      <path d="M400 491 L400 500" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-te-arrow)" />
      <path d="M400 491 L600 500" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tws-te-arrow)" />

      <rect x="80" y="505" width="200" height="30" rx="6" fill="url(#tws-te-err)" opacity="0.12" stroke="#dc2626" strokeWidth="1" />
      <text x="180" y="524" textAnchor="middle" fontSize="11" fill="#991b1b">ParseExc（语法错误）</text>

      <rect x="300" y="505" width="200" height="30" rx="6" fill="url(#tws-te-err)" opacity="0.12" stroke="#dc2626" strokeWidth="1" />
      <text x="400" y="524" textAnchor="middle" fontSize="11" fill="#991b1b">TypeExc（类型错误）</text>

      <rect x="520" y="505" width="200" height="30" rx="6" fill="url(#tws-te-err)" opacity="0.12" stroke="#dc2626" strokeWidth="1" />
      <text x="620" y="524" textAnchor="middle" fontSize="11" fill="#991b1b">其他运行时异常</text>

      <rect x="40" y="545" width="720" height="14" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <text x="400" y="555" textAnchor="middle" fontSize="9" fill="#475569">所有异常携带行号，便于定位错误位置</text>
    </svg>
  );
}
