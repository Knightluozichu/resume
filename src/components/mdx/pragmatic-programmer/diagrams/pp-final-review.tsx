"use client";

export function PpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="程序员修炼之道全书复习知识整合图">
      <defs>
        <linearGradient id="pp-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="pp-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="pp-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="pp-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="pp-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="pp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：程序员修炼之道知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#pp-fr-1)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M142 102 L162 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="166" y="74" width="120" height="56" rx="8" fill="url(#pp-fr-1)" opacity="0.9" />
      <text x="226" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 心智</text>
      <text x="226" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">哲学+方法</text>

      <path d="M288 102 L308 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="312" y="74" width="120" height="56" rx="8" fill="url(#pp-fr-3)" opacity="0.9" />
      <text x="372" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 实践</text>
      <text x="372" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">工具+防御</text>

      <path d="M434 102 L454 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="458" y="74" width="120" height="56" rx="8" fill="url(#pp-fr-4)" opacity="0.9" />
      <text x="518" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 进阶</text>
      <text x="518" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">并发+元编程</text>

      <path d="M580 102 L600 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="604" y="74" width="176" height="56" rx="8" fill="url(#pp-fr-5)" opacity="0.9" />
      <text x="692" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 工艺</text>
      <text x="692" y="116" textAnchor="middle" fontSize="9" fill="#fee2e2">工艺+团队+复习</text>

      {/* 五层知识视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层知识视角</text>

      <rect x="20" y="176" width="148" height="150" rx="8" fill="url(#pp-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">务实心智层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="9" fill="#475569">务实态度</text>
      <text x="94" y="236" textAnchor="middle" fontSize="9" fill="#475569">软件熵</text>
      <text x="94" y="252" textAnchor="middle" fontSize="9" fill="#475569">知识组合</text>
      <text x="94" y="268" textAnchor="middle" fontSize="9" fill="#475569">有效沟通</text>
      <text x="94" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立务实心智</text>

      <rect x="176" y="176" width="148" height="150" rx="8" fill="url(#pp-fr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="250" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">设计方法层</text>
      <text x="250" y="220" textAnchor="middle" fontSize="9" fill="#475569">DRY 原则</text>
      <text x="250" y="236" textAnchor="middle" fontSize="9" fill="#475569">正交性</text>
      <text x="250" y="252" textAnchor="middle" fontSize="9" fill="#475569">可逆性</text>
      <text x="250" y="268" textAnchor="middle" fontSize="9" fill="#475569">曳光弹 / 估算</text>
      <text x="250" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">掌握设计原则</text>

      <rect x="332" y="176" width="148" height="150" rx="8" fill="url(#pp-fr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="406" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">日常实践层</text>
      <text x="406" y="220" textAnchor="middle" fontSize="9" fill="#475569">基本工具</text>
      <text x="406" y="236" textAnchor="middle" fontSize="9" fill="#475569">防御式编程</text>
      <text x="406" y="252" textAnchor="middle" fontSize="9" fill="#475569">契约式设计</text>
      <text x="406" y="268" textAnchor="middle" fontSize="9" fill="#475569">断言 / 异常</text>
      <text x="406" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">构建稳健代码</text>

      <rect x="488" y="176" width="148" height="150" rx="8" fill="url(#pp-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="562" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">高级技艺层</text>
      <text x="562" y="220" textAnchor="middle" fontSize="9" fill="#475569">并发解耦</text>
      <text x="562" y="236" textAnchor="middle" fontSize="9" fill="#475569">Actor / 黑板</text>
      <text x="562" y="252" textAnchor="middle" fontSize="9" fill="#475569">元数据配置</text>
      <text x="562" y="268" textAnchor="middle" fontSize="9" fill="#475569">代码生成</text>
      <text x="562" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">管理复杂系统</text>

      <rect x="644" y="176" width="136" height="150" rx="8" fill="url(#pp-fr-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="712" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">工艺交付层</text>
      <text x="712" y="220" textAnchor="middle" fontSize="9" fill="#475569">德米特法则</text>
      <text x="712" y="236" textAnchor="middle" fontSize="9" fill="#475569">持续重构</text>
      <text x="712" y="252" textAnchor="middle" fontSize="9" fill="#475569">无情测试</text>
      <text x="712" y="268" textAnchor="middle" fontSize="9" fill="#475569">团队自动化</text>
      <text x="712" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">交付高质量软件</text>

      {/* 核心原则链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心原则链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">务实态度</text>
      <text x="80" y="404" textAnchor="middle" fontSize="8" fill="#475569">为结果负责</text>

      <path d="M140 392 L160 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="164" y="364" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="224" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">DRY 正交</text>
      <text x="224" y="404" textAnchor="middle" fontSize="8" fill="#475569">消除重复耦合</text>

      <path d="M284 392 L304 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="308" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="368" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">防御编程</text>
      <text x="368" y="404" textAnchor="middle" fontSize="8" fill="#475569">假设会出错</text>

      <path d="M428 392 L448 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="452" y="364" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">解耦并发</text>
      <text x="512" y="404" textAnchor="middle" fontSize="8" fill="#475569">最小化共享</text>

      <path d="M572 392 L592 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="596" y="364" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="656" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">持续交付</text>
      <text x="656" y="404" textAnchor="middle" fontSize="8" fill="#475569">测试+自动化</text>

      <path d="M716 392 L736 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#pp-fr-arrow)" />

      <rect x="740" y="364" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：务实态度 → 设计原则 → 防御编程 → 解耦并发 → 持续交付 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="478" width="370" height="48" rx="8" fill="url(#pp-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">DRY / 正交性 / 防御编程 / 持续重构 / 无情测试</text>

      <rect x="410" y="478" width="360" height="48" rx="8" fill="url(#pp-fr-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="516" textAnchor="middle" fontSize="9" fill="#475569">AI 辅助编程 / 函数式编程 / DevOps / 微服务</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#pp-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：务实心智 → 日常实践 → 高级技艺 → 代码工艺 → 知识闭环</text>
    </svg>
  );
}
