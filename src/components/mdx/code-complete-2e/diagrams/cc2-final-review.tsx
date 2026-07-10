"use client";

export function Cc2FinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="代码大全全书复习知识整合图">
      <defs>
        <linearGradient id="cc2-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="cc2-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="cc2-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="cc2-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="cc2-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="cc2-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：代码大全知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="120" height="56" rx="8" fill="url(#cc2-fr-1)" opacity="0.9" />
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="80" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M142 102 L162 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="166" y="74" width="120" height="56" rx="8" fill="url(#cc2-fr-1)" opacity="0.9" />
      <text x="226" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="226" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">构建+设计</text>

      <path d="M288 102 L308 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="312" y="74" width="120" height="56" rx="8" fill="url(#cc2-fr-3)" opacity="0.9" />
      <text x="372" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 编码</text>
      <text x="372" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">变量+控制流</text>

      <path d="M434 102 L454 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="458" y="74" width="120" height="56" rx="8" fill="url(#cc2-fr-4)" opacity="0.9" />
      <text x="518" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 质量</text>
      <text x="518" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">质量+重构</text>

      <path d="M580 102 L600 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="604" y="74" width="176" height="56" rx="8" fill="url(#cc2-fr-5)" opacity="0.9" />
      <text x="692" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch7-9 工艺</text>
      <text x="692" y="116" textAnchor="middle" fontSize="9" fill="#fee2e2">调试+团队+复习</text>

      {/* 五层知识视角 */}
      <text x="400" y="162" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层知识视角</text>

      <rect x="20" y="176" width="148" height="150" rx="8" fill="url(#cc2-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">构建基础层</text>
      <text x="94" y="220" textAnchor="middle" fontSize="9" fill="#475569">构建的重要性</text>
      <text x="94" y="236" textAnchor="middle" fontSize="9" fill="#475569">构建生命周期</text>
      <text x="94" y="252" textAnchor="middle" fontSize="9" fill="#475569">构建隐喻</text>
      <text x="94" y="268" textAnchor="middle" fontSize="9" fill="#475569">质量目标</text>
      <text x="94" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">认知构建本质</text>

      <rect x="176" y="176" width="148" height="150" rx="8" fill="url(#cc2-fr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="250" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">设计原则层</text>
      <text x="250" y="220" textAnchor="middle" fontSize="9" fill="#475569">抽象/封装</text>
      <text x="250" y="236" textAnchor="middle" fontSize="9" fill="#475569">信息隐藏</text>
      <text x="250" y="252" textAnchor="middle" fontSize="9" fill="#475569">设计启发式</text>
      <text x="250" y="268" textAnchor="middle" fontSize="9" fill="#475569">设计层次</text>
      <text x="250" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">管理设计复杂度</text>

      <rect x="332" y="176" width="148" height="150" rx="8" fill="url(#cc2-fr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="406" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">代码编写层</text>
      <text x="406" y="220" textAnchor="middle" fontSize="9" fill="#475569">变量初始化</text>
      <text x="406" y="236" textAnchor="middle" fontSize="9" fill="#475569">作用域持续性</text>
      <text x="406" y="252" textAnchor="middle" fontSize="9" fill="#475569">命名规范</text>
      <text x="406" y="268" textAnchor="middle" fontSize="9" fill="#475569">控制流简化</text>
      <text x="406" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">编写可读代码</text>

      <rect x="488" y="176" width="148" height="150" rx="8" fill="url(#cc2-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="562" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">质量保障层</text>
      <text x="562" y="220" textAnchor="middle" fontSize="9" fill="#475569">防御式编程</text>
      <text x="562" y="236" textAnchor="middle" fontSize="9" fill="#475569">测试方法</text>
      <text x="562" y="252" textAnchor="middle" fontSize="9" fill="#475569">代码审查</text>
      <text x="562" y="268" textAnchor="middle" fontSize="9" fill="#475569">重构集成</text>
      <text x="562" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">保障代码质量</text>

      <rect x="644" y="176" width="136" height="150" rx="8" fill="url(#cc2-fr-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="712" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">工艺协作层</text>
      <text x="712" y="220" textAnchor="middle" fontSize="9" fill="#475569">调试流程</text>
      <text x="712" y="236" textAnchor="middle" fontSize="9" fill="#475569">性能调优</text>
      <text x="712" y="252" textAnchor="middle" fontSize="9" fill="#475569">代码布局</text>
      <text x="712" y="268" textAnchor="middle" fontSize="9" fill="#475569">团队标准</text>
      <text x="712" y="304" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">精进编程工艺</text>

      {/* 核心原则链 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">代码大全核心原则链</text>

      <rect x="20" y="364" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">构建为王</text>
      <text x="80" y="404" textAnchor="middle" fontSize="8" fill="#475569">源代码即真理</text>

      <path d="M140 392 L160 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="164" y="364" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="224" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">信息隐藏</text>
      <text x="224" y="404" textAnchor="middle" fontSize="8" fill="#475569">设计核心原则</text>

      <path d="M284 392 L304 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="308" y="364" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="368" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">可读性优先</text>
      <text x="368" y="404" textAnchor="middle" fontSize="8" fill="#475569">人读多于机器</text>

      <path d="M428 392 L448 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="452" y="364" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">防御编程</text>
      <text x="512" y="404" textAnchor="middle" fontSize="8" fill="#475569">假设输入有错</text>

      <path d="M572 392 L592 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="596" y="364" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="656" y="384" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">持续重构</text>
      <text x="656" y="404" textAnchor="middle" fontSize="8" fill="#475569">设计不断演进</text>

      <path d="M716 392 L736 392" stroke="#64748b" strokeWidth="2" markerEnd="url(#cc2-fr-arrow)" />

      <rect x="740" y="364" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="396" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      <text x="400" y="440" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：构建认知 → 设计原则 → 代码编写 → 质量保障 → 工艺精进 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="464" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="478" width="370" height="48" rx="8" fill="url(#cc2-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="516" textAnchor="middle" fontSize="9" fill="#475569">信息隐藏 / 可读性优先 / 防御式编程 / 持续重构 / 代码审查</text>

      <rect x="410" y="478" width="360" height="48" rx="8" fill="url(#cc2-fr-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="498" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="516" textAnchor="middle" fontSize="9" fill="#475569">自动化构建 / AI 辅助编码 / 领域驱动设计 / 测试驱动开发</text>

      {/* 底部总结 */}
      <rect x="30" y="542" width="740" height="32" rx="8" fill="url(#cc2-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：构建基础 → 设计原则 → 代码编写 → 质量保障 → 工艺协作 → 知识闭环</text>
    </svg>
  );
}
