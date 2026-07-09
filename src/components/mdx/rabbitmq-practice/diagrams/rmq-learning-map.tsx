"use client";

export function RmqLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="RabbitMQ实战全书学习地图">
      <defs>
        <linearGradient id="rmq-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rmq-lm-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-lm-rel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RabbitMQ实战 · 知识体系全景</text>

      {/* 第一部分：基础概念 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#rmq-lm-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础概念</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">AMQP协议 / Exchange / Queue</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">Binding / Routing Key</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#93c5fd">消息模型与路由机制</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#93c5fd">Broker / VHost / Connection</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      {/* 第二部分：生产消费 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#rmq-lm-prod)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生产与消费</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">Publisher / Confirm / 事务</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">Consumer / QoS / Ack</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">消息模式 / 死信 / 延迟</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">Prefetch / 消费限流</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">基础 · 核心</text>

      {/* 第三部分：集群与高可用 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#rmq-lm-rel)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">集群与高可用</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">集群 / 节点类型 / 镜像队列</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">Federation / Shovel</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">Quorum Queue / 流复制</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">脑裂 / 告警 / 自动恢复</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">中高 · 深层</text>

      {/* 第四部分：性能与运维 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#rmq-lm-adv)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">性能与运维</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">性能调优 / 连接池</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">监控 / 日志 / 告警</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">Management API / 告警</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">备份 / 安全 / TLS</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 生产级</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rmq-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rmq-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rmq-lm-arrow)" />

      {/* 三条核心主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三条核心主线</text>

      <rect x="20" y="280" width="250" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">主线一：消息模型</text>
      <text x="145" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">Exchange → Binding → Queue</text>
      <text x="145" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">→ Routing Key 路由</text>
      <text x="145" y="367" textAnchor="middle" fontSize="10" fill="#1d4ed8">回答「消息怎么路由」</text>

      <rect x="275" y="280" width="250" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：生产消费</text>
      <text x="400" y="323" textAnchor="middle" fontSize="10" fill="#155e75">Publisher → Confirm → Consumer</text>
      <text x="400" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ QoS → Ack 提交</text>
      <text x="400" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「消息怎么流转」</text>

      <rect x="530" y="280" width="250" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：集群与高可用</text>
      <text x="655" y="323" textAnchor="middle" fontSize="10" fill="#78350f">集群 → 镜像队列 → Quorum</text>
      <text x="655" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ Federation → 故障切换</text>
      <text x="655" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「怎么不丢/高可用」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从基础概念 → 生产消费 → 集群与高可用 → 性能与运维 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 基础概念（AMQP协议/Exchange/Queue/Binding/Routing Key）→ ② 生产消费（Publisher/Confirm/Consumer/QoS/Ack）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 集群与高可用（集群/镜像队列/Quorum/Federation/故障切换）→ ④ 性能与运维（调优/监控/安全/备份）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">三主线在「Exchange-Binding-Queue」（消息模型↔生产消费）与「镜像队列」（消息模型↔高可用）与「Confirm-Ack」（生产消费↔可靠性）处交汇</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">RabbitMQ = AMQP路由 + 消息确认 + 集群镜像 + 流量控制 + 插件生态</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：以Exchange路由为核心，通过Binding解耦，通过镜像队列实现容错</text>
    </svg>
  );
}
