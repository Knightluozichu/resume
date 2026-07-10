"use client";

export function Cc2VariablesNamesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="变量与命名：变量生命周期与命名规范">
      <defs>
        <linearGradient id="cc2-vn-init" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="cc2-vn-scope" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-vn-name" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="cc2-vn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">变量与命名</text>

      {/* 变量初始化三原则 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">变量初始化原则</text>

      <rect x="30" y="74" width="230" height="76" rx="8" fill="url(#cc2-vn-init)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="145" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">就近初始化</text>
      <text x="145" y="116" textAnchor="middle" fontSize="9" fill="#475569">在声明处或使用前</text>
      <text x="145" y="130" textAnchor="middle" fontSize="9" fill="#475569">立即初始化</text>
      <text x="145" y="144" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">避免使用未定义值</text>

      <rect x="285" y="74" width="230" height="76" rx="8" fill="url(#cc2-vn-init)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">使用前确认</text>
      <text x="400" y="116" textAnchor="middle" fontSize="9" fill="#475569">检查是否已正确</text>
      <text x="400" y="130" textAnchor="middle" fontSize="9" fill="#475569">初始化</text>
      <text x="400" y="144" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">防御式检查</text>

      <rect x="540" y="74" width="230" height="76" rx="8" fill="url(#cc2-vn-init)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="655" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">重置注意</text>
      <text x="655" y="116" textAnchor="middle" fontSize="9" fill="#475569">循环或重入时</text>
      <text x="655" y="130" textAnchor="middle" fontSize="9" fill="#475569">需重新初始化</text>
      <text x="655" y="144" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">避免残留状态</text>

      {/* 变量作用域与持续性 */}
      <text x="400" y="178" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">变量作用域与持续性</text>

      <rect x="30" y="192" width="370" height="130" rx="8" fill="url(#cc2-vn-scope)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="215" y="214" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">作用域原则</text>
      <text x="215" y="234" textAnchor="middle" fontSize="9" fill="#475569">缩小变量作用域到最小可见范围</text>
      <text x="215" y="252" textAnchor="middle" fontSize="9" fill="#475569">缩短变量存活时间（span）</text>
      <text x="215" y="270" textAnchor="middle" fontSize="9" fill="#475569">变量声明与使用越近越好</text>
      <text x="215" y="288" textAnchor="middle" fontSize="9" fill="#475569">循环变量在循环内初始化</text>
      <text x="215" y="306" textAnchor="middle" fontSize="9" fill="#475569">避免全局变量</text>
      <text x="215" y="318" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">作用域越小 → 错误越少</text>

      <rect x="410" y="192" width="360" height="130" rx="8" fill="url(#cc2-vn-scope)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="590" y="214" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">持续性原则</text>
      <text x="590" y="234" textAnchor="middle" fontSize="9" fill="#475569">持续性 = 变量存活的时间跨度</text>
      <text x="590" y="252" textAnchor="middle" fontSize="9" fill="#475569">越短越好：减少状态依赖</text>
      <text x="590" y="270" textAnchor="middle" fontSize="9" fill="#475569">赋值与最后使用间越近越好</text>
      <text x="590" y="288" textAnchor="middle" fontSize="9" fill="#475569">跨函数变量需明确生命周期</text>
      <text x="590" y="306" textAnchor="middle" fontSize="9" fill="#475569">绑定时间越晚越灵活</text>
      <text x="590" y="318" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">持续性越短 → 可维护性越高</text>

      {/* 命名规范 */}
      <text x="400" y="350" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">命名规范与最佳实践</text>

      <rect x="30" y="364" width="175" height="110" rx="8" fill="url(#cc2-vn-name)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="117" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">变量命名</text>
      <text x="117" y="406" textAnchor="middle" fontSize="9" fill="#475569">完全准确描述</text>
      <text x="117" y="420" textAnchor="middle" fontSize="9" fill="#475569">变量代表什么</text>
      <text x="117" y="438" textAnchor="middle" fontSize="9" fill="#475569">名字越长越好</text>
      <text x="117" y="452" textAnchor="middle" fontSize="9" fill="#475569">（作用域越大时）</text>
      <text x="117" y="466" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">计算限定词放末尾</text>

      <rect x="215" y="364" width="175" height="110" rx="8" fill="url(#cc2-vn-name)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="302" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">循环变量</text>
      <text x="302" y="406" textAnchor="middle" fontSize="9" fill="#475569">简单循环用 i j k</text>
      <text x="302" y="420" textAnchor="middle" fontSize="9" fill="#475569">嵌套循环用更</text>
      <text x="302" y="434" textAnchor="middle" fontSize="9" fill="#475569">有意义的名字</text>
      <text x="302" y="452" textAnchor="middle" fontSize="9" fill="#475569">避免用 i 做非</text>
      <text x="302" y="466" textAnchor="middle" fontSize="9" fill="#475569">循环计数用途</text>

      <rect x="400" y="364" width="175" height="110" rx="8" fill="url(#cc2-vn-name)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="487" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">布尔命名</text>
      <text x="487" y="406" textAnchor="middle" fontSize="9" fill="#475569">用 done/error</text>
      <text x="487" y="420" textAnchor="middle" fontSize="9" fill="#475569">found/success</text>
      <text x="487" y="438" textAnchor="middle" fontSize="9" fill="#475569">肯定式命名</text>
      <text x="487" y="452" textAnchor="middle" fontSize="9" fill="#475569">避免否定</text>
      <text x="487" y="466" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">如 notFound 不佳</text>

      <rect x="585" y="364" width="185" height="110" rx="8" fill="url(#cc2-vn-name)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="677" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">命名约定</text>
      <text x="677" y="406" textAnchor="middle" fontSize="9" fill="#475569">统一团队约定</text>
      <text x="677" y="420" textAnchor="middle" fontSize="9" fill="#475569">驼峰/下划线一致</text>
      <text x="677" y="438" textAnchor="middle" fontSize="9" fill="#475569">类型前缀可选</text>
      <text x="677" y="452" textAnchor="middle" fontSize="9" fill="#475569">不与语言冲突</text>
      <text x="677" y="466" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">一致性最重要</text>

      {/* 命名反模式 */}
      <text x="400" y="498" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常见命名问题</text>

      <rect x="30" y="512" width="180" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="120" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">误导性名字</text>
      <text x="120" y="550" textAnchor="middle" fontSize="8" fill="#475569">data 处理不只数据</text>

      <rect x="220" y="512" width="180" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="310" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">无意义名字</text>
      <text x="310" y="550" textAnchor="middle" fontSize="8" fill="#475569">x1 temp foo 无信息</text>

      <rect x="410" y="512" width="180" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="500" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">近似名字</text>
      <text x="500" y="550" textAnchor="middle" fontSize="8" fill="#475569">userUserUsers 混淆</text>

      <rect x="600" y="512" width="170" height="50" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="532" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">魔法数字</text>
      <text x="685" y="550" textAnchor="middle" fontSize="8" fill="#475569">用命名常量替代</text>
    </svg>
  );
}
