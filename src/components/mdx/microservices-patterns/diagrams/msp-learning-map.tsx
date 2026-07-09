"use client";

export function MspLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="微服务架构设计模式全书学习地图">
      <defs>
        <linearGradient id="msp-lm-split" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-lm-comm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="msp-lm-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="msp-lm-event" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="msp-lm-infra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="msp-lm-deploy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <marker id="msp-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微服务架构设计模式 · 知识体系全景</text>

      {/* 问题域一：拆分策略 */}
      <rect x="20" y="50" width="120" height="170" rx="12" fill="url(#msp-lm-split)" opacity="0.95" />
      <text x="80" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">拆分策略</text>
      <line x1="35" y1="85" x2="125" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="80" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">单体痛点</text>
      <text x="80" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">业务能力拆分</text>
      <text x="80" y="147" textAnchor="middle" fontSize="11" fill="#bfdbfe">DDD限界上下文</text>
      <text x="80" y="167" textAnchor="middle" fontSize="11" fill="#bfdbfe">独立数据所有权</text>
      <text x="80" y="197" textAnchor="middle" fontSize="11" fill="#60a5fa">入门 · 地基</text>

      {/* 问题域二：进程间通信 */}
      <rect x="150" y="50" width="120" height="170" rx="12" fill="url(#msp-lm-comm)" opacity="0.95" />
      <text x="210" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">进程间通信</text>
      <line x1="165" y1="85" x2="255" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="210" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">REST / gRPC</text>
      <text x="210" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">异步消息</text>
      <text x="210" y="147" textAnchor="middle" fontSize="11" fill="#a5f3fc">幂等 / 版本化</text>
      <text x="210" y="167" textAnchor="middle" fontSize="11" fill="#a5f3fc">超时 / 熔断 / 重试</text>
      <text x="210" y="197" textAnchor="middle" fontSize="11" fill="#67e8f9">中级 · 机制</text>

      {/* 问题域三：数据一致性 */}
      <rect x="280" y="50" width="120" height="170" rx="12" fill="url(#msp-lm-data)" opacity="0.95" />
      <text x="340" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">数据一致性</text>
      <line x1="295" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="340" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">Saga事务</text>
      <text x="340" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">补偿事务</text>
      <text x="340" y="147" textAnchor="middle" fontSize="11" fill="#fde68a">CQRS</text>
      <text x="340" y="167" textAnchor="middle" fontSize="11" fill="#fde68a">API组合</text>
      <text x="340" y="197" textAnchor="middle" fontSize="11" fill="#fcd34d">中级 · 核心</text>

      {/* 问题域四：事件驱动 */}
      <rect x="410" y="50" width="120" height="170" rx="12" fill="url(#msp-lm-event)" opacity="0.95" />
      <text x="470" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">事件驱动</text>
      <line x1="425" y1="85" x2="515" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="470" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">事件存储</text>
      <text x="470" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">快照优化</text>
      <text x="470" y="147" textAnchor="middle" fontSize="11" fill="#ddd6fe">乐观并发控制</text>
      <text x="470" y="167" textAnchor="middle" fontSize="11" fill="#ddd6fe">事件版本化</text>
      <text x="470" y="197" textAnchor="middle" fontSize="11" fill="#c4b5fd">高级 · 进阶</text>

      {/* 问题域五：外部API与基础设施 */}
      <rect x="540" y="50" width="120" height="170" rx="12" fill="url(#msp-lm-infra)" opacity="0.95" />
      <text x="600" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">外部API</text>
      <line x1="555" y1="85" x2="645" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="600" y="107" textAnchor="middle" fontSize="11" fill="#d1fae5">API网关</text>
      <text x="600" y="127" textAnchor="middle" fontSize="11" fill="#d1fae5">BFF模式</text>
      <text x="600" y="147" textAnchor="middle" fontSize="11" fill="#a7f3d0">请求路由聚合</text>
      <text x="600" y="167" textAnchor="middle" fontSize="11" fill="#a7f3d0">服务发现</text>
      <text x="600" y="197" textAnchor="middle" fontSize="11" fill="#6ee7b7">实战 · 落地</text>

      {/* 问题域六：部署与运维 */}
      <rect x="670" y="50" width="110" height="170" rx="12" fill="url(#msp-lm-deploy)" opacity="0.95" />
      <text x="725" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">部署运维</text>
      <line x1="685" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="725" y="107" textAnchor="middle" fontSize="11" fill="#fce7f3">容器化</text>
      <text x="725" y="127" textAnchor="middle" fontSize="11" fill="#fce7f3">Serverless</text>
      <text x="725" y="147" textAnchor="middle" fontSize="11" fill="#fbcfe8">服务网格</text>
      <text x="725" y="167" textAnchor="middle" fontSize="11" fill="#fbcfe8">全书复习</text>
      <text x="725" y="197" textAnchor="middle" fontSize="11" fill="#f9a8d4">实战 · 落地</text>

      {/* Arrows */}
      <path d="M140 135 L150 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-lm-arrow)" />
      <path d="M270 135 L280 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-lm-arrow)" />
      <path d="M400 135 L410 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-lm-arrow)" />
      <path d="M530 135 L540 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-lm-arrow)" />
      <path d="M660 135 L670 135" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-lm-arrow)" />

      {/* 六大模式家族 */}
      <text x="400" y="255" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">六大模式家族</text>

      <rect x="20" y="270" width="120" height="90" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">拆分模式</text>
      <text x="80" y="313" textAnchor="middle" fontSize="11" fill="#1e40af">业务能力 / DDD</text>
      <text x="80" y="333" textAnchor="middle" fontSize="11" fill="#1e40af">独立数据所有权</text>
      <text x="80" y="350" textAnchor="middle" fontSize="11" fill="#1d4ed8">回答「怎么拆」</text>

      <rect x="150" y="270" width="120" height="90" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="210" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">通信模式</text>
      <text x="210" y="313" textAnchor="middle" fontSize="11" fill="#155e75">REST / gRPC</text>
      <text x="210" y="333" textAnchor="middle" fontSize="11" fill="#155e75">异步消息 / 发现</text>
      <text x="210" y="350" textAnchor="middle" fontSize="11" fill="#0e7490">回答「怎么调」</text>

      <rect x="280" y="270" width="120" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="340" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">事务模式</text>
      <text x="340" y="313" textAnchor="middle" fontSize="11" fill="#78350f">Saga编排 / 编舞</text>
      <text x="340" y="333" textAnchor="middle" fontSize="11" fill="#78350f">事件驱动</text>
      <text x="340" y="350" textAnchor="middle" fontSize="11" fill="#92400e">回答「怎么保一致」</text>

      <rect x="410" y="270" width="120" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="470" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">查询模式</text>
      <text x="470" y="313" textAnchor="middle" fontSize="11" fill="#5b21b6">API组合 / CQRS</text>
      <text x="470" y="333" textAnchor="middle" fontSize="11" fill="#5b21b6">物化视图</text>
      <text x="470" y="350" textAnchor="middle" fontSize="11" fill="#6d28d9">回答「怎么查」</text>

      <rect x="540" y="270" width="120" height="90" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="600" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">外部API模式</text>
      <text x="600" y="313" textAnchor="middle" fontSize="11" fill="#065f46">API网关 / BFF</text>
      <text x="600" y="333" textAnchor="middle" fontSize="11" fill="#065f46">请求聚合</text>
      <text x="600" y="350" textAnchor="middle" fontSize="11" fill="#059669">回答「怎么接入」</text>

      <rect x="670" y="270" width="110" height="90" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="725" y="293" textAnchor="middle" fontSize="12" fontWeight="700" fill="#db2777">部署模式</text>
      <text x="725" y="313" textAnchor="middle" fontSize="11" fill="#9d174d">容器 / Serverless</text>
      <text x="725" y="333" textAnchor="middle" fontSize="11" fill="#9d174d">服务网格</text>
      <text x="725" y="350" textAnchor="middle" fontSize="11" fill="#db2777">回答「怎么部署」</text>

      {/* 学习路径 */}
      <rect x="20" y="380" width="760" height="180" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="403" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（拆分策略 → 通信 → 数据一致性 → 事件驱动 → 外部API → 部署 → 整合）</text>
      <text x="400" y="428" textAnchor="middle" fontSize="11" fill="#475569">① 拆分策略（单体痛点/业务能力拆分/DDD限界上下文/分布式单体）→ ② 进程间通信（REST/gRPC/异步消息/幂等/超时熔断重试）</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 数据一致性（Saga编排编舞/补偿事务/语义锁/CQRS/API组合）→ ④ 事件驱动（事件存储/快照/乐观并发/事件版本化）</text>
      <text x="400" y="472" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 外部API与基础设施（API网关/BFF/服务发现/注册中心）→ ⑥ 部署运维（容器化/Serverless/服务网格）→ ⑦ 全书复习整合</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#64748b">两交汇点：「Saga+事件溯源」（事务↔事件驱动）「API网关+服务发现」（外部API↔通信）</text>
      <text x="400" y="522" textAnchor="middle" fontSize="11" fill="#64748b">微服务 = 拆分 + 通信 + 数据一致性 + 寻址 + 部署 + 面向失败设计</text>
      <text x="400" y="544" textAnchor="middle" fontSize="11" fill="#64748b">核心哲学：按业务能力拆分、独立数据所有权、最终一致性优先、面向失败设计</text>
    </svg>
  );
}
