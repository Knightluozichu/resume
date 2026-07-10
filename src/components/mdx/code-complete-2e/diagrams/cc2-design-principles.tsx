"use client";

export function Cc2DesignPrinciplesDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="设计原则：核心设计概念与启发式方法">
      <defs>
        <linearGradient id="cc2-dp-concept" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="cc2-dp-heur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-dp-level" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="cc2-dp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">设计原则</text>

      {/* 设计的困难 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">设计本质上是困难的</text>

      <rect x="30" y="74" width="230" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="145" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">本质复杂</text>
      <text x="145" y="114" textAnchor="middle" fontSize="9" fill="#475569">问题本身复杂</text>
      <text x="145" y="128" textAnchor="middle" fontSize="8" fill="#64748b">需管理不可消除复杂性</text>

      <rect x="285" y="74" width="230" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">需要折中</text>
      <text x="400" y="114" textAnchor="middle" fontSize="9" fill="#475569">多目标相互冲突</text>
      <text x="400" y="128" textAnchor="middle" fontSize="8" fill="#64748b">须平衡速度与质量</text>

      <rect x="540" y="74" width="230" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="655" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b91c1c">无确定性答案</text>
      <text x="655" y="114" textAnchor="middle" fontSize="9" fill="#475569">设计是非确定性过程</text>
      <text x="655" y="128" textAnchor="middle" fontSize="8" fill="#64748b">依赖经验与判断</text>

      {/* 核心设计概念 */}
      <text x="400" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心设计概念</text>

      <rect x="30" y="178" width="175" height="90" rx="8" fill="url(#cc2-dp-concept)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="117" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">抽象</text>
      <text x="117" y="220" textAnchor="middle" fontSize="9" fill="#475569">简化复杂现实</text>
      <text x="117" y="234" textAnchor="middle" fontSize="9" fill="#475569">提取关键特征</text>
      <text x="117" y="248" textAnchor="middle" fontSize="9" fill="#475569">忽略不相关细节</text>
      <text x="117" y="262" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">管理复杂度核心手段</text>

      <rect x="215" y="178" width="175" height="90" rx="8" fill="url(#cc2-dp-concept)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="302" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">封装</text>
      <text x="302" y="220" textAnchor="middle" fontSize="9" fill="#475569">内部实现不可见</text>
      <text x="302" y="234" textAnchor="middle" fontSize="9" fill="#475569">接口与实现分离</text>
      <text x="302" y="248" textAnchor="middle" fontSize="9" fill="#475569">限制交互范围</text>
      <text x="302" y="262" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">降低耦合度</text>

      <rect x="400" y="178" width="175" height="90" rx="8" fill="url(#cc2-dp-concept)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="487" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">信息隐藏</text>
      <text x="487" y="220" textAnchor="middle" fontSize="9" fill="#475569">隐藏设计决策</text>
      <text x="487" y="234" textAnchor="middle" fontSize="9" fill="#475569">只暴露必要接口</text>
      <text x="487" y="248" textAnchor="middle" fontSize="9" fill="#475569">隔离变化影响</text>
      <text x="487" y="262" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">最重要的设计原则</text>

      <rect x="585" y="178" width="185" height="90" rx="8" fill="url(#cc2-dp-concept)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="677" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">模块化</text>
      <text x="677" y="220" textAnchor="middle" fontSize="9" fill="#475569">分解为独立模块</text>
      <text x="677" y="234" textAnchor="middle" fontSize="9" fill="#475569">高内聚低耦合</text>
      <text x="677" y="248" textAnchor="middle" fontSize="9" fill="#475569">独立开发与测试</text>
      <text x="677" y="262" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">管理大型系统</text>

      {/* 设计启发式方法 */}
      <text x="400" y="296" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">设计启发式方法</text>

      <rect x="30" y="310" width="145" height="80" rx="8" fill="url(#cc2-dp-heur)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="102" y="330" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">找现实对象</text>
      <text x="102" y="348" textAnchor="middle" fontSize="8" fill="#475569">辨认问题域中</text>
      <text x="102" y="362" textAnchor="middle" fontSize="8" fill="#475569">的真实实体</text>
      <text x="102" y="380" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">对象建模起点</text>

      <rect x="185" y="310" width="145" height="80" rx="8" fill="url(#cc2-dp-heur)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="257" y="330" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">抽象一致性</text>
      <text x="257" y="348" textAnchor="middle" fontSize="8" fill="#475569">同一抽象层级</text>
      <text x="257" y="362" textAnchor="middle" fontSize="8" fill="#475569">保持概念一致</text>
      <text x="257" y="380" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">降低认知负担</text>

      <rect x="340" y="310" width="145" height="80" rx="8" fill="url(#cc2-dp-heur)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="412" y="330" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">继承 containment</text>
      <text x="412" y="348" textAnchor="middle" fontSize="8" fill="#475569">优先使用包含</text>
      <text x="412" y="362" textAnchor="middle" fontSize="8" fill="#475569">而非继承</text>
      <text x="412" y="380" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">减少耦合</text>

      <rect x="495" y="310" width="145" height="80" rx="8" fill="url(#cc2-dp-heur)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="567" y="330" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">隐藏秘密</text>
      <text x="567" y="348" textAnchor="middle" fontSize="8" fill="#475569">每个模块隐藏</text>
      <text x="567" y="362" textAnchor="middle" fontSize="8" fill="#475569">一个设计决策</text>
      <text x="567" y="380" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">信息隐藏实践</text>

      <rect x="650" y="310" width="120" height="80" rx="8" fill="url(#cc2-dp-heur)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="710" y="330" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">设计模式</text>
      <text x="710" y="348" textAnchor="middle" fontSize="8" fill="#475569">复用已验证</text>
      <text x="710" y="362" textAnchor="middle" fontSize="8" fill="#475569">设计方案</text>
      <text x="710" y="380" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">经验结晶</text>

      {/* 设计层次 */}
      <text x="400" y="420" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">软件设计层次</text>

      <rect x="100" y="434" width="600" height="34" rx="8" fill="url(#cc2-dp-level)" opacity="0.95" />
      <text x="400" y="456" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">第1层：软件系统整体架构（子系统划分）</text>

      <path d="M400 468 L400 472" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dp-arrow)" />

      <rect x="100" y="474" width="600" height="34" rx="8" fill="url(#cc2-dp-level)" opacity="0.75" />
      <text x="400" y="496" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">第2层：分解为包/命名空间/组件</text>

      <path d="M400 508 L400 512" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dp-arrow)" />

      <rect x="100" y="514" width="600" height="34" rx="8" fill="url(#cc2-dp-level)" opacity="0.5" />
      <text x="400" y="536" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">第3层：分解为类与接口（构建期详细设计）</text>

      <path d="M400 548 L400 552" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-dp-arrow)" />

      <rect x="100" y="554" width="600" height="20" rx="8" fill="url(#cc2-dp-level)" opacity="0.25" />
      <text x="400" y="568" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">第4层：分解为子程序与内部数据结构</text>
    </svg>
  );
}
