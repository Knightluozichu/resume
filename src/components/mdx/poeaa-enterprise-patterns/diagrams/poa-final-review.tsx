"use client";

export function PoaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="企业应用架构模式全书复习知识整合图">
      <defs>
        <linearGradient id="poa-fr-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-fr-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-fr-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-fr-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="poa-fr-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="poa-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：企业应用架构模式知识整合</text>

      {/* 知识演进路径 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识演进路径</text>

      <rect x="20" y="74" width="150" height="56" rx="8" fill="url(#poa-fr-1)" opacity="0.9" />
      <text x="95" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch0 全景</text>
      <text x="95" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">知识图谱</text>

      <path d="M172 102 L194 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="198" y="74" width="150" height="56" rx="8" fill="url(#poa-fr-1)" opacity="0.9" />
      <text x="273" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch1-2 基础</text>
      <text x="273" y="116" textAnchor="middle" fontSize="9" fill="#e0f2fe">分层+领域逻辑</text>

      <path d="M350 102 L372 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="376" y="74" width="150" height="56" rx="8" fill="url(#poa-fr-3)" opacity="0.9" />
      <text x="451" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch3-4 数据</text>
      <text x="451" y="116" textAnchor="middle" fontSize="9" fill="#dcfce7">数据源+ORM</text>

      <path d="M528 102 L550 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="554" y="74" width="150" height="56" rx="8" fill="url(#poa-fr-4)" opacity="0.9" />
      <text x="629" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">ch5-6 表现</text>
      <text x="629" y="116" textAnchor="middle" fontSize="9" fill="#fef9c3">Web+并发</text>

      <path d="M706 102 L728 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="732" y="74" width="48" height="56" rx="8" fill="url(#poa-fr-5)" opacity="0.9" />
      <text x="756" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">ch7-9</text>
      <text x="756" y="116" textAnchor="middle" fontSize="7" fill="#fee2e2">分布+特殊</text>

      {/* 五层知识视角 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五层知识视角</text>

      <rect x="20" y="174" width="148" height="150" rx="8" fill="url(#poa-fr-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="94" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">架构基础层</text>
      <text x="94" y="218" textAnchor="middle" fontSize="9" fill="#475569">分层架构</text>
      <text x="94" y="234" textAnchor="middle" fontSize="9" fill="#475569">表现/领域/数据</text>
      <text x="94" y="250" textAnchor="middle" fontSize="9" fill="#475569">关注点分离</text>
      <text x="94" y="266" textAnchor="middle" fontSize="9" fill="#475569">层间通信</text>
      <text x="94" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0ea5e9">建立架构骨架</text>

      <rect x="176" y="174" width="148" height="150" rx="8" fill="url(#poa-fr-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="250" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">领域逻辑层</text>
      <text x="250" y="218" textAnchor="middle" fontSize="9" fill="#475569">事务脚本</text>
      <text x="250" y="234" textAnchor="middle" fontSize="9" fill="#475569">领域模型</text>
      <text x="250" y="250" textAnchor="middle" fontSize="9" fill="#475569">表模块</text>
      <text x="250" y="266" textAnchor="middle" fontSize="9" fill="#475569">服务层</text>
      <text x="250" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">承载业务规则</text>

      <rect x="332" y="174" width="148" height="150" rx="8" fill="url(#poa-fr-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="406" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">数据源层</text>
      <text x="406" y="218" textAnchor="middle" fontSize="9" fill="#475569">网关模式</text>
      <text x="406" y="234" textAnchor="middle" fontSize="9" fill="#475569">活动记录</text>
      <text x="406" y="250" textAnchor="middle" fontSize="9" fill="#475569">数据映射器</text>
      <text x="406" y="266" textAnchor="middle" fontSize="9" fill="#475569">ORM 机制</text>
      <text x="406" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">管理持久化</text>

      <rect x="488" y="174" width="148" height="150" rx="8" fill="url(#poa-fr-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="562" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">Web 表现层</text>
      <text x="562" y="218" textAnchor="middle" fontSize="9" fill="#475569">MVC 模式</text>
      <text x="562" y="234" textAnchor="middle" fontSize="9" fill="#475569">控制器策略</text>
      <text x="562" y="250" textAnchor="middle" fontSize="9" fill="#475569">视图渲染</text>
      <text x="562" y="266" textAnchor="middle" fontSize="9" fill="#475569">并发与会话</text>
      <text x="562" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ca8a04">处理用户交互</text>

      <rect x="644" y="174" width="136" height="150" rx="8" fill="url(#poa-fr-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="712" y="196" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">分布式层</text>
      <text x="712" y="218" textAnchor="middle" fontSize="9" fill="#475569">远程外观</text>
      <text x="712" y="234" textAnchor="middle" fontSize="9" fill="#475569">数据传输对象</text>
      <text x="712" y="250" textAnchor="middle" fontSize="9" fill="#475569">离线锁</text>
      <text x="712" y="266" textAnchor="middle" fontSize="9" fill="#475569">注册表/插件</text>
      <text x="712" y="302" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">跨节点协作</text>

      {/* 核心原则链 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心原则链</text>

      <rect x="20" y="362" width="120" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="80" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">分层架构</text>
      <text x="80" y="402" textAnchor="middle" fontSize="8" fill="#475569">关注点分离</text>

      <path d="M140 390 L160 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="164" y="362" width="120" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="224" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">领域逻辑</text>
      <text x="224" y="402" textAnchor="middle" fontSize="8" fill="#475569">模式选择</text>

      <path d="M284 390 L304 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="308" y="362" width="120" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="368" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">数据源</text>
      <text x="368" y="402" textAnchor="middle" fontSize="8" fill="#475569">解耦持久化</text>

      <path d="M428 390 L448 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="452" y="362" width="120" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="512" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">Web 表现</text>
      <text x="512" y="402" textAnchor="middle" fontSize="8" fill="#475569">用户交互</text>

      <path d="M572 390 L592 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="596" y="362" width="120" height="56" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="656" y="382" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">分布式</text>
      <text x="656" y="402" textAnchor="middle" fontSize="8" fill="#475569">最小化远程</text>

      <path d="M716 390 L736 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-fr-arrow)" />

      <rect x="740" y="362" width="40" height="56" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="760" y="394" textAnchor="middle" fontSize="8" fontWeight="600" fill="#475569">闭环</text>

      <text x="400" y="438" textAnchor="middle" fontSize="9" fill="#64748b">逻辑链：分层架构 → 领域逻辑 → 数据源 → Web 表现 → 分布式 → 知识闭环</text>

      {/* 核心经验与演进方向 */}
      <text x="400" y="462" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心经验与演进方向</text>

      <rect x="30" y="476" width="370" height="48" rx="8" fill="url(#poa-fr-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="215" y="496" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心经验</text>
      <text x="215" y="514" textAnchor="middle" fontSize="9" fill="#475569">分层 / 事务脚本 / 领域模型 / 数据映射器 / 远程外观 + DTO</text>

      <rect x="410" y="476" width="360" height="48" rx="8" fill="url(#poa-fr-5)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="496" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">演进方向</text>
      <text x="590" y="514" textAnchor="middle" fontSize="9" fill="#475569">微服务 / DDD / CQRS / 事件驱动架构 / 云原生</text>

      {/* 底部总结 */}
      <rect x="30" y="540" width="740" height="32" rx="8" fill="url(#poa-fr-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心脉络：分层架构 → 领域逻辑 → 数据源 → Web 表现 → 分布式 → 知识闭环</text>
    </svg>
  );
}
