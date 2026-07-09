"use client";

export function TwsFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="全书知识整合与端到端流程">
      <defs>
        <linearGradient id="tws-fr-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tws-fr-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tws-fr-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tws-fr-integ" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tws-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合：端到端解释器流程</text>

      {/* 端到端流程 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Stone 源码 → 执行结果（完整流水线）</text>

      <rect x="30" y="72" width="140" height="50" rx="10" fill="url(#tws-fr-front)" opacity="0.95" />
      <text x="100" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">源码字符串</text>
      <text x="100" y="114" textAnchor="middle" fontSize="10" fill="#bfdbfe">Stone 程序文本</text>

      <path d="M170 97 L195 97" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-fr-arrow)" />

      <rect x="195" y="72" width="110" height="50" rx="10" fill="url(#tws-fr-front)" opacity="0.95" />
      <text x="250" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Lexer</text>
      <text x="250" y="114" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch1 正则分词</text>

      <path d="M305 97 L330 97" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-fr-arrow)" />

      <rect x="330" y="72" width="110" height="50" rx="10" fill="url(#tws-fr-front)" opacity="0.95" />
      <text x="385" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Parser</text>
      <text x="385" y="114" textAnchor="middle" fontSize="10" fill="#bfdbfe">ch2 组合子</text>

      <path d="M440 97 L465 97" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-fr-arrow)" />

      <rect x="465" y="72" width="110" height="50" rx="10" fill="url(#tws-fr-mid)" opacity="0.95" />
      <text x="520" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">AST</text>
      <text x="520" y="114" textAnchor="middle" fontSize="10" fill="#cffafe">ch3 节点树</text>

      <path d="M575 97 L600 97" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-fr-arrow)" />

      <rect x="600" y="72" width="110" height="50" rx="10" fill="url(#tws-fr-back)" opacity="0.95" />
      <text x="655" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Evaluator</text>
      <text x="655" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">ch4 树遍历</text>

      <path d="M710 97 L725 97" stroke="#64748b" strokeWidth="2" markerEnd="url(#tws-fr-arrow)" />

      <rect x="725" y="72" width="50" height="50" rx="10" fill="url(#tws-fr-integ)" opacity="0.95" />
      <text x="750" y="103" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">结果</text>

      {/* 四层知识体系 */}
      <text x="400" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四层知识体系与章节对应</text>

      <rect x="40" y="170" width="170" height="80" rx="10" fill="url(#tws-fr-front)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">前端分析</text>
      <text x="125" y="210" textAnchor="middle" fontSize="11" fill="#475569">ch1 词法分析</text>
      <text x="125" y="227" textAnchor="middle" fontSize="11" fill="#475569">ch2 语法分析</text>
      <text x="125" y="244" textAnchor="middle" fontSize="10" fill="#1e40af">源码 → Token → AST</text>

      <rect x="225" y="170" width="170" height="80" rx="10" fill="url(#tws-fr-mid)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="310" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">中端表示</text>
      <text x="310" y="210" textAnchor="middle" fontSize="11" fill="#475569">ch3 抽象语法树</text>
      <text x="310" y="227" textAnchor="middle" fontSize="11" fill="#475569">节点 + 访问者</text>
      <text x="310" y="244" textAnchor="middle" fontSize="10" fill="#0e7490">数据结构核心</text>

      <rect x="410" y="170" width="170" height="80" rx="10" fill="url(#tws-fr-back)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="495" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">后端执行</text>
      <text x="495" y="210" textAnchor="middle" fontSize="11" fill="#475569">ch4 求值器</text>
      <text x="495" y="227" textAnchor="middle" fontSize="11" fill="#475569">ch5 函数与闭包</text>
      <text x="495" y="244" textAnchor="middle" fontSize="10" fill="#92400e">解释执行 + 环境</text>

      <rect x="595" y="170" width="165" height="80" rx="10" fill="url(#tws-fr-integ)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="677" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">语言扩展</text>
      <text x="677" y="210" textAnchor="middle" fontSize="11" fill="#475569">ch6 类型/错误</text>
      <text x="677" y="227" textAnchor="middle" fontSize="11" fill="#475569">ch7 类/继承</text>
      <text x="677" y="244" textAnchor="middle" fontSize="11" fill="#475569">ch8 数组/哈希</text>

      {/* 核心概念关联 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心概念关联网络</text>

      <rect x="60" y="295" width="160" height="36" rx="8" fill="url(#tws-fr-mid)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" />
      <text x="140" y="318" textAnchor="middle" fontSize="11" fill="#0e7490">AST = 前端与后端的桥梁</text>

      <rect x="240" y="295" width="160" height="36" rx="8" fill="url(#tws-fr-back)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="320" y="318" textAnchor="middle" fontSize="11" fill="#92400e">环境 = 变量绑定的容器</text>

      <rect x="420" y="295" width="160" height="36" rx="8" fill="url(#tws-fr-integ)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="318" textAnchor="middle" fontSize="11" fill="#065f46">闭包 = 函数 + 环境</text>

      <rect x="600" y="295" width="160" height="36" rx="8" fill="url(#tws-fr-front)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="680" y="318" textAnchor="middle" fontSize="11" fill="#1e40af">访问者 = 双重分派</text>

      {/* 端到端示例 */}
      <text x="400" y="355" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">端到端示例：`even = 0` 的完整旅程</text>

      <rect x="40" y="370" width="720" height="180" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="393" fontSize="11" fontWeight="600" fill="#2563eb">① 词法分析（ch1）</text>
      <text x="70" y="410" fontSize="11" fill="#475569" fontFamily="monospace">Lexer 将 &quot;even = 0&quot; 分为 3 个 Token: IDENT(&quot;even&quot;) EQ(&quot;=&quot;) INT(&quot;0&quot;)</text>

      <text x="60" y="432" fontSize="11" fontWeight="600" fill="#7c3aed">② 语法分析（ch2）</text>
      <text x="70" y="449" fontSize="11" fill="#475569" fontFamily="monospace">Parser 用 primary + EQ + expr 规则匹配，生成 BinaryExpr(=) 节点</text>

      <text x="60" y="471" fontSize="11" fontWeight="600" fill="#0891b2">③ AST 构建（ch3）</text>
      <text x="70" y="488" fontSize="11" fill="#475569" fontFamily="monospace">AST: BinaryExpr(&quot;=&quot;) → left: Name(&quot;even&quot;), right: NumberLiteral(&quot;0&quot;)</text>

      <text x="60" y="510" fontSize="11" fontWeight="600" fill="#d97706">④ 求值执行（ch4）</text>
      <text x="70" y="527" fontSize="11" fill="#475569" fontFamily="monospace">Evaluator 求值 Name → &quot;even&quot;, NumberLiteral → 0, 执行 env.put(&quot;even&quot;, 0)</text>

      <text x="60" y="547" fontSize="11" fontWeight="600" fill="#059669">结果：全局环境中 even 绑定为整数 0</text>
    </svg>
  );
}
