"use client";

export function RmqConsumersDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="RabbitMQ消费者与QoS机制">
      <defs>
        <linearGradient id="rmq-cs-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rmq-cs-qos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-cs-ack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="rmq-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">消费者消费流程与 QoS 控制机制</text>

      {/* 消费流程 */}
      <rect x="20" y="50" width="760" height="120" rx="10" fill="url(#rmq-cs-flow)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">消息消费流程（basic.consume + Ack）</text>

      <rect x="40" y="90" width="130" height="50" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="105" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">1. 订阅队列</text>
      <text x="105" y="128" textAnchor="middle" fontSize="9" fill="#5b21b6">basic.consume</text>

      <rect x="195" y="90" width="130" height="50" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="260" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">2. 推送消息</text>
      <text x="260" y="128" textAnchor="middle" fontSize="9" fill="#5b21b6">Delivery = body+tag</text>

      <rect x="350" y="90" width="130" height="50" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="415" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">3. 处理消息</text>
      <text x="415" y="128" textAnchor="middle" fontSize="9" fill="#5b21b6">业务逻辑执行</text>

      <rect x="505" y="90" width="130" height="50" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="570" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">4. 确认消息</text>
      <text x="570" y="128" textAnchor="middle" fontSize="9" fill="#5b21b6">basic.ack</text>

      <rect x="660" y="90" width="100" height="50" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="710" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">5. 下一条</text>
      <text x="710" y="128" textAnchor="middle" fontSize="9" fill="#5b21b6">循环消费</text>

      <path d="M170 115 L195 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-cs-arrow)" />
      <path d="M325 115 L350 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-cs-arrow)" />
      <path d="M480 115 L505 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-cs-arrow)" />
      <path d="M635 115 L660 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-cs-arrow)" />

      {/* QoS Prefetch */}
      <rect x="20" y="190" width="370" height="160" rx="10" fill="url(#rmq-cs-qos)" opacity="0.95" />
      <text x="205" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">QoS 预取控制（basic.qos）</text>
      <line x1="35" y1="225" x2="375" y2="225" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="248" textAnchor="middle" fontSize="11" fill="#fef3c7">prefetch_count = N</text>
      <text x="205" y="268" textAnchor="middle" fontSize="10" fill="#fde68a">每个 Channel 最多 N 条未确认消息</text>
      <text x="205" y="290" textAnchor="middle" fontSize="10" fill="#fde68a">prefetch_count = 1 → 严格公平分发</text>
      <text x="205" y="310" textAnchor="middle" fontSize="10" fill="#fde68a">prefetch_count = 0 → 无限制（默认）</text>
      <text x="205" y="332" textAnchor="middle" fontSize="10" fill="#fcd34d">global=true → 整个 Connection 限制</text>

      {/* Ack 模式 */}
      <rect x="410" y="190" width="370" height="160" rx="10" fill="url(#rmq-cs-ack)" opacity="0.95" />
      <text x="595" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Ack 确认模式</text>
      <line x1="425" y1="225" x2="765" y2="225" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="248" textAnchor="middle" fontSize="11" fill="#cffafe">autoAck=true → 自动确认（收到即删）</text>
      <text x="595" y="268" textAnchor="middle" fontSize="10" fill="#a5f3fc">autoAck=false → 手动确认（推荐）</text>
      <text x="595" y="290" textAnchor="middle" fontSize="10" fill="#a5f3fc">basic.ack → 确认成功</text>
      <text x="595" y="310" textAnchor="middle" fontSize="10" fill="#a5f3fc">basic.nack → 拒绝（可批量）</text>
      <text x="595" y="332" textAnchor="middle" fontSize="10" fill="#67e8f9">basic.reject → 拒绝（单条，requeue?）</text>

      {/* 消费者模式对比 */}
      <rect x="20" y="370" width="760" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="395" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">消费可靠性配置策略</text>
      <text x="400" y="420" textAnchor="middle" fontSize="11" fill="#475569">autoAck=false + 手动 Ack → 处理完成才确认，防止消息丢失</text>
      <text x="400" y="440" textAnchor="middle" fontSize="11" fill="#475569">prefetch_count=1 → 严格公平分发，慢消费者不会被压垮</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fill="#475569">nack + requeue=false → 消息进死信队列，防止无限重试</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">消费幂等设计 → 防止重复消费导致数据不一致（唯一ID + 去重表）</text>
    </svg>
  );
}
