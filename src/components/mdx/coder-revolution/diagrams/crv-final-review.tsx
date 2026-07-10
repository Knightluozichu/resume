"use client";

export function CrvFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="码农翻身全书复习知识整合图">
      <defs>
        <linearGradient id="crv-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="crv-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="crv-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：码农翻身知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="150" height="56" rx="8" fill="url(#crv-fr-1)" opacity="0.9" />
      <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="95" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M172 102 L194 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="198" y="74" width="150" height="56" rx="8" fill="url(#crv-fr-1)" opacity="0.9" />
      <text x="273" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="273" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">编程+OOP</text>

      <path d="M350 102 L372 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="376" y="74" width="150" height="56" rx="8" fill="url(#crv-fr-3)" opacity="0.9" />
      <text x="451" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 Web</text>
      <text x="451" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">网络+数据库</text>

      <path d="M528 102 L550 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="554" y="74" width="150" height="56" rx="8" fill="url(#crv-fr-4)" opacity="0.9" />
      <text x="629" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 架构</text>
      <text x="629" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">分布式+JVM</text>

      <path d="M706 102 L728 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="732" y="74" width="48" height="56" rx="8" fill="url(#crv-fr-5)" opacity="0.9" />
      <text x="756" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">ch7-9</text>
      <text x="756" y="116" textAnchor="middle" fontSize="7" fill="#fee2e2">实践+闭环</text>

      {/* 五层知识视角 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层知识视角</text>

      <rect x="20" y="174" width="148" height="150" rx="8" fill="url(#crv-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">基础层</text>
      <text x="94" y="218" textAnchor="middle" fontSize="9" fill="#475569">计算机分层</text>
      <text x="94" y="234" textAnchor="middle" fontSize="9" fill="#475569">代码到执行</text>
      <text x="94" y="250" textAnchor="middle" fontSize="9" fill="#475569">进程与内存</text>
      <text x="94" y="266" textAnchor="middle" fontSize="9" fill="#475569">OOP 四大特性</text>
      <text x="94" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立编程认知</text>

      <rect x="176" y="174" width="148" height="150" rx="8" fill="url(#crv-fr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="250" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">Web层</text>
      <text x="250" y="218" textAnchor="middle" fontSize="9" fill="#475569">HTTP 请求响应</text>
      <text x="250" y="234" textAnchor="middle" fontSize="9" fill="#475569">TCP/IP 四层</text>
      <text x="250" y="250" textAnchor="middle" fontSize="9" fill="#475569">数据库 ACID</text>
      <text x="250" y="266" textAnchor="middle" fontSize="9" fill="#475569">缓存策略</text>
      <text x="250" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">连接与存取</text>

      <rect x="332" y="174" width="148" height="150" rx="8" fill="url(#crv-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="406" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">架构层</text>
      <text x="406" y="218" textAnchor="middle" fontSize="9" fill="#475569">CAP 定理</text>
      <text x="406" y="234" textAnchor="middle" fontSize="9" fill="#475569">微服务拆分</text>
      <text x="406" y="250" textAnchor="middle" fontSize="9" fill="#475569">JVM 内存模型</text>
      <text x="406" y="266" textAnchor="middle" fontSize="9" fill="#475569">垃圾回收</text>
      <text x="406" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">系统化设计</text>

      <rect x="488" y="174" width="148" height="150" rx="8" fill="url(#crv-fr-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="562" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">实践层</text>
      <text x="562" y="218" textAnchor="middle" fontSize="9" fill="#475569">CI/CD 流水线</text>
      <text x="562" y="234" textAnchor="middle" fontSize="9" fill="#475569">云计算模型</text>
      <text x="562" y="250" textAnchor="middle" fontSize="9" fill="#475569">容器编排</text>
      <text x="562" y="266" textAnchor="middle" fontSize="9" fill="#475569">DevOps 文化</text>
      <text x="562" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">工程化交付</text>

      <rect x="644" y="174" width="136" height="150" rx="8" fill="url(#crv-fr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="712" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">成长层</text>
      <text x="712" y="218" textAnchor="middle" fontSize="9" fill="#475569">职业阶梯</text>
      <text x="712" y="234" textAnchor="middle" fontSize="9" fill="#475569">能力矩阵</text>
      <text x="712" y="250" textAnchor="middle" fontSize="9" fill="#475569">学习方法</text>
      <text x="712" y="266" textAnchor="middle" fontSize="9" fill="#475569">双轨路径</text>
      <text x="712" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">持续进化</text>

      {/* 核心原则链 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心知识链</text>

      <rect x="20" y="362" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">基础</text>
      <text x="80" y="402" textAnchor="middle" fontSize="8" fill="#475569">代码+OOP</text>

      <path d="M140 390 L160 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="164" y="362" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="224" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">Web</text>
      <text x="224" y="402" textAnchor="middle" fontSize="8" fill="#475569">网络+存储</text>

      <path d="M284 390 L304 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="308" y="362" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="368" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">架构</text>
      <text x="368" y="402" textAnchor="middle" fontSize="8" fill="#475569">分布式+JVM</text>

      <path d="M428 390 L448 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="452" y="362" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="512" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">实践</text>
      <text x="512" y="402" textAnchor="middle" fontSize="8" fill="#475569">DevOps+云</text>

      <path d="M572 390 L592 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="596" y="362" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="656" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">成长</text>
      <text x="656" y="402" textAnchor="middle" fontSize="8" fill="#475569">职业+方法</text>

      <path d="M716 390 L736 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-fr-arrow)" />

      <rect x="740" y="362" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="394" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">回望</text>

      <text x="400" y="438" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：基础 → Web → 架构 → 实践 → 成长 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="462" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="476" width="370" height="48" rx="8" fill="url(#crv-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="496" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="514" textAnchor="middle" fontSize="9" fill="#475569">理解底层 / 选对结构 / 缓存加速 / 架构权衡 / 自动交付 / 持续成长</text>

      <rect x="410" y="476" width="360" height="48" rx="8" fill="url(#crv-fr-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="496" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="514" textAnchor="middle" fontSize="9" fill="#475569">云原生 / 微服务 / AI辅助 / 全栈视野 / 技术管理 / 终身学习</text>

      {/* 底部总结 */}
      <rect x="30" y="540" width="740" height="32" rx="8" fill="url(#crv-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：基础 → Web数据 → 架构 → 实践成长 → 知识闭环</text>
    </svg>
  );
}
