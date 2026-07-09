"use client";

export function MspFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="微服务架构设计模式全书知识整合">
      <defs>
        <linearGradient id="msp-fr-split" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-fr-comm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="msp-fr-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="msp-fr-event" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="msp-fr-infra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="msp-fr-deploy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="msp-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <marker id="msp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微服务架构设计模式 · 全书知识整合</text>

      {/* 核心交汇：独立数据所有权 + 按业务能力拆分 */}
      <ellipse cx="400" cy="80" rx="180" ry="35" fill="url(#msp-fr-core)" />
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">核心交汇</text>
      <text x="400" y="96" textAnchor="middle" fontSize="11" fill="#94a3b8">按业务能力拆分 + 独立数据所有权</text>

      {/* 六大问题域环绕 */}
      <path d="M400 115 L400 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />
      <path d="M400 115 L200 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />
      <path d="M400 115 L600 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />

      {/* 问题域一：拆分策略 */}
      <rect x="40" y="150" width="120" height="80" rx="10" fill="url(#msp-fr-split)" />
      <text x="100" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">拆分策略</text>
      <text x="100" y="193" textAnchor="middle" fontSize="11" fill="#bfdbfe">怎么拆</text>
      <text x="100" y="210" textAnchor="middle" fontSize="11" fill="#bfdbfe">业务能力/DDD</text>
      <text x="100" y="225" textAnchor="middle" fontSize="11" fill="#60a5fa">独立数据所有权</text>

      {/* 问题域二：进程间通信 */}
      <rect x="170" y="150" width="120" height="80" rx="10" fill="url(#msp-fr-comm)" />
      <text x="230" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">进程间通信</text>
      <text x="230" y="193" textAnchor="middle" fontSize="11" fill="#cffafe">怎么调</text>
      <text x="230" y="210" textAnchor="middle" fontSize="11" fill="#cffafe">REST/gRPC/消息</text>
      <text x="230" y="225" textAnchor="middle" fontSize="11" fill="#67e8f9">超时/熔断/重试</text>

      {/* 问题域三：数据一致性 */}
      <rect x="300" y="150" width="120" height="80" rx="10" fill="url(#msp-fr-data)" />
      <text x="360" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据一致性</text>
      <text x="360" y="193" textAnchor="middle" fontSize="11" fill="#fef3c7">怎么保一致</text>
      <text x="360" y="210" textAnchor="middle" fontSize="11" fill="#fef3c7">Saga/补偿事务</text>
      <text x="360" y="225" textAnchor="middle" fontSize="11" fill="#fcd34d">语义锁</text>

      {/* 问题域四：事件驱动 */}
      <rect x="430" y="150" width="120" height="80" rx="10" fill="url(#msp-fr-event)" />
      <text x="490" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">事件驱动</text>
      <text x="490" y="193" textAnchor="middle" fontSize="11" fill="#ede9fe">怎么解耦</text>
      <text x="490" y="210" textAnchor="middle" fontSize="11" fill="#ede9fe">事件溯源/快照</text>
      <text x="490" y="225" textAnchor="middle" fontSize="11" fill="#c4b5fd">乐观并发</text>

      {/* 问题域五：外部API */}
      <rect x="560" y="150" width="120" height="80" rx="10" fill="url(#msp-fr-infra)" />
      <text x="620" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">外部API</text>
      <text x="620" y="193" textAnchor="middle" fontSize="11" fill="#d1fae5">怎么接入</text>
      <text x="620" y="210" textAnchor="middle" fontSize="11" fill="#d1fae5">API网关/BFF</text>
      <text x="620" y="225" textAnchor="middle" fontSize="11" fill="#6ee7b7">服务发现</text>

      {/* 问题域六：部署 */}
      <rect x="690" y="150" width="70" height="80" rx="10" fill="url(#msp-fr-deploy)" />
      <text x="725" y="173" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">部署</text>
      <text x="725" y="193" textAnchor="middle" fontSize="11" fill="#fce7f3">怎么部署</text>
      <text x="725" y="210" textAnchor="middle" fontSize="11" fill="#fce7f3">容器</text>
      <text x="725" y="225" textAnchor="middle" fontSize="11" fill="#f9a8d4">Serverless</text>

      {/* 理论交汇：Saga - CQRS - 事件溯源 */}
      <rect x="40" y="250" width="350" height="130" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="215" y="275" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">理论交汇：Saga - CQRS - 事件溯源</text>

      <rect x="55" y="285" width="100" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="105" y="310" textAnchor="middle" fontSize="11" fill="#92400e">Saga（协调）</text>

      <path d="M160 305 L200 305" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />

      <rect x="205" y="285" width="100" height="40" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="255" y="310" textAnchor="middle" fontSize="11" fill="#6d28d9">事件溯源（事实）</text>

      <path d="M310 305 L350 305" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />

      <rect x="355" y="285" width="25" height="40" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="367" y="310" textAnchor="middle" fontSize="11" fill="#065f46">CQRS</text>

      <text x="215" y="345" textAnchor="middle" fontSize="11" fill="#78350f">Saga协调流程 → 事件溯源持久化事实 → CQRS读写分离优化查询</text>
      <text x="215" y="365" textAnchor="middle" fontSize="11" fill="#92400e">递进：协调 → 持久化 → 查询优化，三者共同保证最终一致性</text>

      {/* 工程交汇：API网关 - 服务发现 */}
      <rect x="410" y="250" width="350" height="130" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="585" y="275" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">工程交汇：API网关 - 服务发现</text>

      <rect x="425" y="285" width="120" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="485" y="305" textAnchor="middle" fontSize="11" fill="#1d4ed8">API网关</text>
      <text x="485" y="320" textAnchor="middle" fontSize="11" fill="#1e40af">北南向（外部→内部）</text>

      <path d="M550 305 L600 305" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-fr-arrow)" />

      <rect x="605" y="285" width="140" height="40" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="675" y="305" textAnchor="middle" fontSize="11" fill="#92400e">服务发现</text>
      <text x="675" y="320" textAnchor="middle" fontSize="11" fill="#78350f">东西向（服务↔服务）</text>

      <text x="585" y="345" textAnchor="middle" fontSize="11" fill="#047857">网关对外统一入口，服务发现对内寻址</text>
      <text x="585" y="365" textAnchor="middle" fontSize="11" fill="#065f46">二者共同构成服务调用的路由闭环</text>

      {/* 模式选型决策框架 */}
      <rect x="40" y="395" width="720" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="420" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">模式选型6步决策框架</text>
      <text x="400" y="443" textAnchor="middle" fontSize="11" fill="#475569">①明确业务场景 → ②确定服务边界（DDD限界上下文） → ③选型通信方式（REST/gRPC/消息）</text>
      <text x="400" y="463" textAnchor="middle" fontSize="11" fill="#475569">→ ④选型事务方案（编排/编舞Saga） → ⑤选型查询方案（API组合/CQRS） → ⑥选型部署方式（容器/Serverless）</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#92400e">核心原则：不过度设计 / 先单体再拆 / 保留可逆性 / 面向失败设计</text>

      {/* 全书核心公式 */}
      <rect x="40" y="520" width="720" height="65" rx="10" fill="#0f172a" />
      <text x="400" y="545" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">全书核心公式</text>
      <text x="400" y="568" textAnchor="middle" fontSize="11" fill="#94a3b8">微服务 = 拆分 + 通信 + 数据一致性 + 寻址 + 部署 + 面向失败设计</text>
      <text x="400" y="582" textAnchor="middle" fontSize="11" fill="#64748b">按业务能力拆分 / 独立数据所有权 / 最终一致性优先 / 面向失败设计</text>
    </svg>
  );
}
