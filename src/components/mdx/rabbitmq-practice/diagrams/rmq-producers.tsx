"use client";

export function RmqProducersDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="RabbitMQ生产者发送与确认机制">
      <defs>
        <linearGradient id="rmq-pd-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-pd-confirm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-pd-tx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-pd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生产者消息发送与确认机制</text>

      {/* 发送流程 */}
      <rect x="20" y="50" width="760" height="140" rx="10" fill="url(#rmq-pd-flow)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">消息发送流程（basic.publish）</text>

      <rect x="45" y="90" width="120" height="50" rx="6" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
      <text x="105" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#155e75">1. 创建连接</text>
      <text x="105" y="128" textAnchor="middle" fontSize="9" fill="#155e75">Connection Factory</text>

      <rect x="190" y="90" width="120" height="50" rx="6" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
      <text x="250" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#155e75">2. 创建 Channel</text>
      <text x="250" y="128" textAnchor="middle" fontSize="9" fill="#155e75">虚拟连接复用</text>

      <rect x="335" y="90" width="120" height="50" rx="6" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
      <text x="395" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#155e75">3. 声明 Exchange</text>
      <text x="395" y="128" textAnchor="middle" fontSize="9" fill="#155e75">exchange.declare</text>

      <rect x="480" y="90" width="120" height="50" rx="6" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
      <text x="540" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#155e75">4. 构建消息</text>
      <text x="540" y="128" textAnchor="middle" fontSize="9" fill="#155e75">props + body</text>

      <rect x="625" y="90" width="120" height="50" rx="6" fill="#cffafe" stroke="#0e7490" strokeWidth="1" />
      <text x="685" y="112" textAnchor="middle" fontSize="11" fontWeight="600" fill="#155e75">5. 发送消息</text>
      <text x="685" y="128" textAnchor="middle" fontSize="9" fill="#155e75">basic.publish</text>

      <path d="M165 115 L190 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-pd-arrow)" />
      <path d="M310 115 L335 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-pd-arrow)" />
      <path d="M455 115 L480 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-pd-arrow)" />
      <path d="M600 115 L625 115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#rmq-pd-arrow)" />

      <text x="400" y="168" textAnchor="middle" fontSize="10" fill="#67e8f9">delivery_mode=2 持久化 | content_type | priority | correlation_id | reply_to（RPC模式）</text>

      {/* Publisher Confirm */}
      <rect x="20" y="210" width="370" height="160" rx="10" fill="url(#rmq-pd-confirm)" opacity="0.95" />
      <text x="205" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Publisher Confirm（发布确认）</text>
      <line x1="35" y1="245" x2="375" y2="245" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="268" textAnchor="middle" fontSize="11" fill="#fef3c7">channel.confirmSelect() 开启</text>
      <text x="205" y="290" textAnchor="middle" fontSize="10" fill="#fde68a">异步模式：addConfirmListener 回调</text>
      <text x="205" y="310" textAnchor="middle" fontSize="10" fill="#fde68a">  ack → 消息成功到达 Broker</text>
      <text x="205" y="328" textAnchor="middle" fontSize="10" fill="#fde68a">  nack → 消息未确认，需重发</text>
      <text x="205" y="350" textAnchor="middle" fontSize="10" fill="#fcd34d">同步模式：waitForConfirms() 阻塞等待</text>

      {/* 事务模式 */}
      <rect x="410" y="210" width="370" height="160" rx="10" fill="url(#rmq-pd-tx)" opacity="0.95" />
      <text x="595" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">事务模式（txSelect）</text>
      <line x1="425" y1="245" x2="765" y2="245" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="268" textAnchor="middle" fontSize="11" fill="#ede9fe">channel.txSelect() 开启事务</text>
      <text x="595" y="290" textAnchor="middle" fontSize="10" fill="#ddd6fe">basic.publish() × N（发送多条）</text>
      <text x="595" y="310" textAnchor="middle" fontSize="10" fill="#ddd6fe">channel.txCommit() 提交</text>
      <text x="595" y="328" textAnchor="middle" fontSize="10" fill="#ddd6fe">channel.txRollback() 回滚</text>
      <text x="595" y="350" textAnchor="middle" fontSize="10" fill="#c4b5fd">性能差（同步阻塞），不推荐生产使用</text>

      {/* 对比表 */}
      <rect x="20" y="390" width="760" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="415" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">发送可靠性对比</text>
      <text x="180" y="440" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">普通发送</text>
      <text x="180" y="460" textAnchor="middle" fontSize="10" fill="#64748b">fire-and-forget，可能丢消息</text>
      <text x="180" y="478" textAnchor="middle" fontSize="10" fill="#64748b">性能最高，可靠性最低</text>
      <text x="400" y="440" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">Publisher Confirm</text>
      <text x="400" y="460" textAnchor="middle" fontSize="10" fill="#64748b">异步确认，性能好</text>
      <text x="400" y="478" textAnchor="middle" fontSize="10" fill="#64748b">推荐生产使用，兼顾可靠与性能</text>
      <text x="620" y="440" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">事务模式</text>
      <text x="620" y="460" textAnchor="middle" fontSize="10" fill="#64748b">同步阻塞，性能差 250x</text>
      <text x="620" y="478" textAnchor="middle" fontSize="10" fill="#64748b">仅用于强事务场景，不推荐</text>
    </svg>
  );
}
