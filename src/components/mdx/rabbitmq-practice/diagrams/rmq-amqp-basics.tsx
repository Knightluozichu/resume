"use client";

export function RmqAmqpBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="AMQP协议与RabbitMQ核心模型">
      <defs>
        <linearGradient id="rmq-ab-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-ab-broker" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-ab-cons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-ab-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">AMQP 0-9-1 模型：Producer → Broker → Consumer</text>

      {/* Producer */}
      <rect x="20" y="60" width="160" height="120" rx="12" fill="url(#rmq-ab-prod)" opacity="0.95" />
      <text x="100" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Producer</text>
      <text x="100" y="112" textAnchor="middle" fontSize="10" fill="#cffafe">创建消息</text>
      <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#cffafe">指定 Exchange</text>
      <text x="100" y="148" textAnchor="middle" fontSize="10" fill="#cffafe">指定 Routing Key</text>
      <text x="100" y="166" textAnchor="middle" fontSize="10" fill="#67e8f9">basic.publish</text>

      {/* Broker (RabbitMQ) */}
      <rect x="230" y="50" width="340" height="280" rx="12" fill="#f8fafc" stroke="#d97706" strokeWidth="2" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">RabbitMQ Broker</text>

      {/* Exchange */}
      <rect x="260" y="95" width="280" height="80" rx="8" fill="url(#rmq-ab-broker)" opacity="0.9" />
      <text x="400" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Exchange（交换器）</text>
      <text x="400" y="140" textAnchor="middle" fontSize="10" fill="#fef3c7">direct | fanout | topic | headers</text>
      <text x="400" y="160" textAnchor="middle" fontSize="10" fill="#fde68a">接收消息，根据 Binding 路由到 Queue</text>

      {/* Bindings */}
      <text x="400" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">Binding（绑定关系）</text>
      <path d="M320 210 L280 250" stroke="#d97706" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#rmq-ab-arrow)" />
      <path d="M400 210 L400 250" stroke="#d97706" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#rmq-ab-arrow)" />
      <path d="M480 210 L520 250" stroke="#d97706" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#rmq-ab-arrow)" />

      {/* Queues */}
      <rect x="255" y="250" width="90" height="65" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="300" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Queue A</text>
      <text x="300" y="290" textAnchor="middle" fontSize="9" fill="#78350f">持久化队列</text>
      <text x="300" y="305" textAnchor="middle" fontSize="9" fill="#78350f">FIFO 有序</text>

      <rect x="355" y="250" width="90" height="65" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="400" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Queue B</text>
      <text x="400" y="290" textAnchor="middle" fontSize="9" fill="#78350f">死信队列</text>
      <text x="400" y="305" textAnchor="middle" fontSize="9" fill="#78350f">DLX 绑定</text>

      <rect x="475" y="250" width="90" height="65" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="520" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">Queue C</text>
      <text x="520" y="290" textAnchor="middle" fontSize="9" fill="#78350f">延迟队列</text>
      <text x="520" y="305" textAnchor="middle" fontSize="9" fill="#78350f">TTL + DLX</text>

      {/* Consumer */}
      <rect x="620" y="60" width="160" height="120" rx="12" fill="url(#rmq-ab-cons)" opacity="0.95" />
      <text x="700" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Consumer</text>
      <text x="700" y="112" textAnchor="middle" fontSize="10" fill="#ede9fe">订阅 Queue</text>
      <text x="700" y="130" textAnchor="middle" fontSize="10" fill="#ede9fe">接收消息</text>
      <text x="700" y="148" textAnchor="middle" fontSize="10" fill="#ede9fe">Ack 确认</text>
      <text x="700" y="166" textAnchor="middle" fontSize="10" fill="#c4b5fd">basic.consume</text>

      {/* Arrows: Producer → Exchange */}
      <path d="M180 110 L260 115" stroke="#475569" strokeWidth="2.5" markerEnd="url(#rmq-ab-arrow)" />
      {/* Queue → Consumer */}
      <path d="M565 275 L620 130" stroke="#475569" strokeWidth="2" markerEnd="url(#rmq-ab-arrow)" />

      {/* AMQP 层次 */}
      <rect x="20" y="350" width="760" height="150" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="375" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">AMQP 0-9-1 核心层次结构</text>
      <text x="400" y="400" textAnchor="middle" fontSize="11" fill="#475569">Connection（TCP长连接）→ Channel（虚拟连接，多路复用）→ Exchange/Queue/Binding（消息模型）</text>
      <text x="400" y="420" textAnchor="middle" fontSize="11" fill="#475569">VHost（虚拟主机，资源隔离）→ 用户权限 / Queue 独立 / Exchange 独立</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#64748b">Exchange 类型：direct（精确匹配）/ fanout（广播）/ topic（模式匹配）/ headers（头匹配）</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#64748b">消息属性：content_type / delivery_mode(2=持久化) / priority / correlation_id / reply_to</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#64748b">核心：Producer 不直接发到 Queue，而是发到 Exchange，由 Binding 决定路由到哪些 Queue</text>
    </svg>
  );
}
