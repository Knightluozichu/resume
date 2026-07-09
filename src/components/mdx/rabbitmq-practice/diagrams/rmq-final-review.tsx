"use client";

export function RmqFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="RabbitMQ实战全书知识图谱">
      <defs>
        <linearGradient id="rmq-fr-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rmq-fr-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-fr-ha" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-fr-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RabbitMQ实战 · 全书知识图谱</text>

      {/* 数据模型层 */}
      <rect x="20" y="50" width="760" height="80" rx="10" fill="url(#rmq-fr-base)" opacity="0.95" />
      <text x="60" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">① 消息模型</text>
      <text x="280" y="75" textAnchor="middle" fontSize="11" fill="#bfdbfe">AMQP协议 / Producer → Exchange → Binding → Queue → Consumer</text>
      <text x="280" y="95" textAnchor="middle" fontSize="10" fill="#93c5fd">direct / fanout / topic / headers 四种路由模式</text>
      <text x="280" y="115" textAnchor="middle" fontSize="10" fill="#60a5fa">死信队列 / 延迟队列 / 优先级队列</text>
      <text x="680" y="95" textAnchor="middle" fontSize="10" fill="#bfdbfe">解决「消息怎么路由」</text>

      {/* 生产消费层 */}
      <rect x="20" y="145" width="760" height="80" rx="10" fill="url(#rmq-fr-prod)" opacity="0.95" />
      <text x="60" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">② 生产消费</text>
      <text x="280" y="170" textAnchor="middle" fontSize="11" fill="#cffafe">Publisher Confirm / 事务 / 消息持久化</text>
      <text x="280" y="190" textAnchor="middle" fontSize="10" fill="#a5f3fc">Consumer / QoS prefetch / 手动Ack / nack+requeue</text>
      <text x="280" y="210" textAnchor="middle" fontSize="10" fill="#67e8f9">autoAck=false + prefetch_count 调优</text>
      <text x="680" y="190" textAnchor="middle" fontSize="10" fill="#cffafe">解决「消息怎么流转」</text>

      {/* 集群与高可用层 */}
      <rect x="20" y="240" width="760" height="80" rx="10" fill="url(#rmq-fr-ha)" opacity="0.95" />
      <text x="60" y="265" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">③ 集群HA</text>
      <text x="280" y="265" textAnchor="middle" fontSize="11" fill="#fef3c7">集群 / Disk Node / RAM Node / 镜像队列</text>
      <text x="280" y="285" textAnchor="middle" fontSize="10" fill="#fde68a">Quorum Queue(Raft) / Federation / Shovel</text>
      <text x="280" y="305" textAnchor="middle" fontSize="10" fill="#fcd34d">脑裂防护 / 故障切换 / pause-minority</text>
      <text x="680" y="285" textAnchor="middle" fontSize="10" fill="#fef3c7">解决「怎么不丢/高可用」</text>

      {/* 性能与运维层 */}
      <rect x="20" y="335" width="760" height="80" rx="10" fill="url(#rmq-fr-ops)" opacity="0.95" />
      <text x="60" y="360" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">④ 运维</text>
      <text x="280" y="360" textAnchor="middle" fontSize="11" fill="#ede9fe">Erlang VM调优 / 内存水位 / 磁盘告警 / 连接池</text>
      <text x="280" y="380" textAnchor="middle" fontSize="10" fill="#ddd6fe">Management API / 核心指标 / 告警策略</text>
      <text x="280" y="400" textAnchor="middle" fontSize="10" fill="#c4b5fd">TLS安全 / 定义导出 / Lazy Queue / 备份恢复</text>
      <text x="680" y="380" textAnchor="middle" fontSize="10" fill="#ede9fe">解决「怎么管/怎么调」</text>

      {/* 交汇点 */}
      <rect x="20" y="430" width="760" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="455" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三条主线交汇点与全链路可靠性</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">Exchange-Binding-Queue（模型↔消费）：路由模式决定消息到达哪些队列，是消息流转的起点</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">Confirm-Ack（生产↔消费）：Publisher Confirm + Consumer 手动Ack = 全链路不丢消息的可靠性保证</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">镜像队列-Quorum（模型↔HA）：队列的多副本复制是数据安全与高可用的交汇点</text>
      <text x="400" y="545" textAnchor="middle" fontSize="11" fill="#64748b">RabbitMQ = AMQP路由模型 + 消息确认机制 + 集群镜像容错 + QoS流量控制 + 丰富插件生态</text>
      <text x="400" y="565" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：以Exchange路由为核心，通过Binding解耦生产与消费，通过镜像队列实现容错</text>
    </svg>
  );
}
