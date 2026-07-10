"use client";

export function Cc2ControlFlowDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="控制流与语句：布尔表达式与控制结构">
      <defs>
        <linearGradient id="cc2-cf-bool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-cf-struct" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="cc2-cf-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="cc2-cf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">控制流与语句</text>

      {/* 布尔表达式简化 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">布尔表达式简化原则</text>

      <rect x="30" y="74" width="175" height="90" rx="8" fill="url(#cc2-cf-bool)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="117" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">拆分复杂条件</text>
      <text x="117" y="116" textAnchor="middle" fontSize="8" fill="#475569">将复杂布尔表达式</text>
      <text x="117" y="130" textAnchor="middle" fontSize="8" fill="#475569">拆为命名布尔函数</text>
      <text x="117" y="144" textAnchor="middle" fontSize="8" fill="#475569">或中间布尔变量</text>
      <text x="117" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">提高可读性</text>

      <rect x="215" y="74" width="175" height="90" rx="8" fill="url(#cc2-cf-bool)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="302" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">利用德摩根律</text>
      <text x="302" y="116" textAnchor="middle" fontSize="8" fill="#475569">not(A and B) =</text>
      <text x="302" y="130" textAnchor="middle" fontSize="8" fill="#475569">not A or not B</text>
      <text x="302" y="144" textAnchor="middle" fontSize="8" fill="#475569">转换为更易读形式</text>
      <text x="302" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">简化否定逻辑</text>

      <rect x="400" y="74" width="175" height="90" rx="8" fill="url(#cc2-cf-bool)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="487" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">括号明确优先级</text>
      <text x="487" y="116" textAnchor="middle" fontSize="8" fill="#475569">不要依赖运算符</text>
      <text x="487" y="130" textAnchor="middle" fontSize="8" fill="#475569">优先级记忆</text>
      <text x="487" y="144" textAnchor="middle" fontSize="8" fill="#475569">用括号显式分组</text>
      <text x="487" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">消除歧义</text>

      <rect x="585" y="74" width="185" height="90" rx="8" fill="url(#cc2-cf-bool)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="677" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">肯定式表达</text>
      <text x="677" y="116" textAnchor="middle" fontSize="8" fill="#475569">用 isFound 而非</text>
      <text x="677" y="130" textAnchor="middle" fontSize="8" fill="#475569">isNotFound</text>
      <text x="677" y="144" textAnchor="middle" fontSize="8" fill="#475569">正向更易理解</text>
      <text x="677" y="158" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">减少双重否定</text>

      {/* 控制结构选择 */}
      <text x="400" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">控制结构选择指南</text>

      <rect x="30" y="204" width="175" height="90" rx="8" fill="url(#cc2-cf-struct)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="117" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">if-else 原则</text>
      <text x="117" y="246" textAnchor="middle" fontSize="8" fill="#475569">正常情况放 if</text>
      <text x="117" y="260" textAnchor="middle" fontSize="8" fill="#475569">异常放 else</text>
      <text x="117" y="274" textAnchor="middle" fontSize="8" fill="#475569">最常见在前</text>
      <text x="117" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">先处理后返回</text>

      <rect x="215" y="204" width="175" height="90" rx="8" fill="url(#cc2-cf-struct)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="302" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">case/switch</text>
      <text x="302" y="246" textAnchor="middle" fontSize="8" fill="#475569">按频率排序</text>
      <text x="302" y="260" textAnchor="middle" fontSize="8" fill="#475569">高频放前面</text>
      <text x="302" y="274" textAnchor="middle" fontSize="8" fill="#475569">必须有 default</text>
      <text x="302" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">简化分支逻辑</text>

      <rect x="400" y="204" width="175" height="90" rx="8" fill="url(#cc2-cf-struct)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="487" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">循环选择</text>
      <text x="487" y="246" textAnchor="middle" fontSize="8" fill="#475569">计数循环用 for</text>
      <text x="487" y="260" textAnchor="middle" fontSize="8" fill="#475569">条件循环用 while</text>
      <text x="487" y="274" textAnchor="middle" fontSize="8" fill="#475569">至少一次用 do-while</text>
      <text x="487" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">语义匹配场景</text>

      <rect x="585" y="204" width="185" height="90" rx="8" fill="url(#cc2-cf-struct)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="677" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">表驱动法</text>
      <text x="677" y="246" textAnchor="middle" fontSize="8" fill="#475569">用查表替代</text>
      <text x="677" y="260" textAnchor="middle" fontSize="8" fill="#475569">复杂条件分支</text>
      <text x="677" y="274" textAnchor="middle" fontSize="8" fill="#475569">数据驱动逻辑</text>
      <text x="677" y="288" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">最优雅的选择</text>

      {/* 嵌套控制结构 */}
      <text x="400" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">嵌套控制结构简化</text>

      <rect x="30" y="334" width="240" height="130" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="150" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">深层嵌套（避免）</text>
      <rect x="50" y="366" width="200" height="20" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="150" y="380" textAnchor="middle" fontSize="8" fill="#991b1b">if conditionA</text>
      <rect x="70" y="390" width="180" height="20" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="160" y="404" textAnchor="middle" fontSize="8" fill="#991b1b">if conditionB</text>
      <rect x="90" y="414" width="160" height="20" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="170" y="428" textAnchor="middle" fontSize="8" fill="#991b1b">if conditionC</text>
      <rect x="110" y="438" width="140" height="20" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="180" y="452" textAnchor="middle" fontSize="8" fill="#991b1b">do something</text>
      <text x="150" y="458" textAnchor="middle" fontSize="8" fill="#64748b">3 层嵌套认知负担高</text>

      <path d="M280 400 L310 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-cf-arrow)" />

      <rect x="320" y="334" width="240" height="130" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="440" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">卫语句重构（推荐）</text>
      <rect x="340" y="366" width="200" height="20" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="440" y="380" textAnchor="middle" fontSize="8" fill="#166534">if not A: return</text>
      <rect x="340" y="390" width="200" height="20" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="440" y="404" textAnchor="middle" fontSize="8" fill="#166534">if not B: return</text>
      <rect x="340" y="414" width="200" height="20" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="440" y="428" textAnchor="middle" fontSize="8" fill="#166534">if not C: return</text>
      <rect x="340" y="438" width="200" height="20" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <text x="440" y="452" textAnchor="middle" fontSize="8" fill="#166534">do something</text>
      <text x="440" y="458" textAnchor="middle" fontSize="8" fill="#64748b">扁平结构清晰易懂</text>

      <path d="M570 400 L600 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-cf-arrow)" />

      <rect x="610" y="334" width="160" height="130" rx="8" fill="url(#cc2-cf-depth)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="690" y="356" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a16207">重构策略</text>
      <text x="690" y="376" textAnchor="middle" fontSize="8" fill="#475569">用 if-then-else</text>
      <text x="690" y="390" textAnchor="middle" fontSize="8" fill="#475569">替代嵌套</text>
      <text x="690" y="408" textAnchor="middle" fontSize="8" fill="#475569">用 break/return</text>
      <text x="690" y="422" textAnchor="middle" fontSize="8" fill="#475569">提前退出</text>
      <text x="690" y="440" textAnchor="middle" fontSize="8" fill="#475569">用多态替代</text>
      <text x="690" y="454" textAnchor="middle" fontSize="8" fill="#475569">类型判断</text>

      {/* 控制流复杂度 */}
      <text x="400" y="490" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">控制流复杂度管理</text>

      <rect x="30" y="504" width="180" height="56" rx="8" fill="url(#cc2-cf-depth)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="120" y="524" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">圈复杂度</text>
      <text x="120" y="542" textAnchor="middle" fontSize="8" fill="#475569">每函数建议 ≤ 10</text>

      <rect x="220" y="504" width="180" height="56" rx="8" fill="url(#cc2-cf-depth)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="310" y="524" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">嵌套深度</text>
      <text x="310" y="542" textAnchor="middle" fontSize="8" fill="#475569">建议不超过 3-4 层</text>

      <rect x="410" y="504" width="180" height="56" rx="8" fill="url(#cc2-cf-depth)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="500" y="524" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">路径覆盖</text>
      <text x="500" y="542" textAnchor="middle" fontSize="8" fill="#475569">测试所有分支</text>

      <rect x="600" y="504" width="170" height="56" rx="8" fill="url(#cc2-cf-depth)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="685" y="524" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">goto 避免</text>
      <text x="685" y="542" textAnchor="middle" fontSize="8" fill="#475569">用结构化替代跳转</text>
    </svg>
  );
}
