"use client";

export function KfkProducersDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka生产者发送流程">
      <defs>
        <linearGradient id="kfk-pr-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="kfk-pr-acks" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="kfk-pr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 生产者发送流程与 acks 语义</text>

      {/* 发送流程 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">消息发送全流程</text>

      <rect x="20" y="65" width="110" height="60" rx="8" fill="url(#kfk-pr-flow)" />
      <text x="75" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">send(record)</text>
      <text x="75" y="108" textAnchor="middle" fontSize="9" fill="#d1fae5">异步返回Future</text>

      <rect x="150" y="65" width="110" height="60" rx="8" fill="url(#kfk-pr-flow)" opacity="0.9" />
      <text x="205" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">序列化</text>
      <text x="205" y="108" textAnchor="middle" fontSize="9" fill="#d1fae5">Serializer</text>

      <rect x="280" y="65" width="110" height="60" rx="8" fill="url(#kfk-pr-flow)" opacity="0.8" />
      <text x="335" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">分区器</text>
      <text x="335" y="108" textAnchor="middle" fontSize="9" fill="#d1fae5">Partitioner</text>

      <rect x="410" y="65" width="110" height="60" rx="8" fill="url(#kfk-pr-flow)" opacity="0.7" />
      <text x="465" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">累加器</text>
      <text x="465" y="108" textAnchor="middle" fontSize="9" fill="#d1fae5">RecordAccumulator</text>

      <rect x="540" y="65" width="110" height="60" rx="8" fill="url(#kfk-pr-flow)" opacity="0.6" />
      <text x="595" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Sender线程</text>
      <text x="595" y="108" textAnchor="middle" fontSize="9" fill="#d1fae5">ProduceRequest</text>

      <rect x="670" y="65" width="110" height="60" rx="8" fill="#2563eb" />
      <text x="725" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">Broker</text>
      <text x="725" y="108" textAnchor="middle" fontSize="9" fill="#bfdbfe">Leader写入</text>

      <path d="M130 95 L150 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-pr-arrow)" />
      <path d="M260 95 L280 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-pr-arrow)" />
      <path d="M390 95 L410 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-pr-arrow)" />
      <path d="M520 95 L540 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-pr-arrow)" />
      <path d="M650 95 L670 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-pr-arrow)" />

      {/* 批处理细节 */}
      <rect x="350" y="150" width="340" height="80" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="520" y="172" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">RecordAccumulator 批处理</text>
      <text x="370" y="194" fontSize="10" fill="#475569">batch.size = 16KB（满则发送）</text>
      <text x="370" y="210" fontSize="10" fill="#475569">linger.ms = 0~5ms（等待凑批）</text>
      <text x="370" y="226" fontSize="10" fill="#475569">buffer.memory = 32MB（缓冲区总大小）</text>

      {/* 三种 acks */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三种 acks 模式</text>

      <rect x="30" y="280" width="245" height="110" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="152" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">acks = 0</text>
      <text x="152" y="325" textAnchor="middle" fontSize="10" fill="#991b1b">Fire and Forget</text>
      <text x="50" y="347" fontSize="9" fill="#b91c1c">发送后不等任何确认</text>
      <text x="50" y="363" fontSize="9" fill="#b91c1c">最高吞吐、最低延迟</text>
      <text x="50" y="379" fontSize="9" fill="#b91c1c">可能丢数据（网络/宕机）</text>

      <rect x="285" y="280" width="245" height="110" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="407" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">acks = 1</text>
      <text x="407" y="325" textAnchor="middle" fontSize="10" fill="#92400e">Leader 确认</text>
      <text x="305" y="347" fontSize="9" fill="#78350f">Leader写入即返回确认</text>
      <text x="305" y="363" fontSize="9" fill="#78350f">不等Follower同步</text>
      <text x="305" y="379" fontSize="9" fill="#78350f">Leader切换时可能丢</text>

      <rect x="540" y="280" width="230" height="110" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="655" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">acks = all (-1)</text>
      <text x="655" y="325" textAnchor="middle" fontSize="10" fill="#1d4ed8">ISR 全确认</text>
      <text x="560" y="347" fontSize="9" fill="#1e40af">等ISR所有副本同步后确认</text>
      <text x="560" y="363" fontSize="9" fill="#1e40af">最可靠（不丢），延迟最高</text>
      <text x="560" y="379" fontSize="9" fill="#1e40af">配合 min.insync.replicas</text>

      {/* 分区策略 */}
      <text x="400" y="422" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">分区器策略</text>

      <rect x="30" y="435" width="240" height="130" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">指定 Partition</text>
      <text x="150" y="480" textAnchor="middle" fontSize="10" fill="#1e40af">ProducerRecord.partition</text>
      <text x="50" y="505" fontSize="9" fill="#3b82f6">直接使用指定分区号</text>
      <text x="50" y="521" fontSize="9" fill="#3b82f6">不走分区器逻辑</text>
      <text x="50" y="541" fontSize="9" fill="#3b82f6">适用：精确控制分区</text>
      <text x="50" y="557" fontSize="9" fill="#3b82f6">如：按地域路由</text>

      <rect x="285" y="435" width="240" height="130" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="405" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">Key 哈希分区（默认）</text>
      <text x="405" y="480" textAnchor="middle" fontSize="10" fill="#155e75">murmur2(key) % partitions</text>
      <text x="305" y="505" fontSize="9" fill="#0e7490">同一key始终进同一分区</text>
      <text x="305" y="521" fontSize="9" fill="#0e7490">保证key级有序性</text>
      <text x="305" y="541" fontSize="9" fill="#0e7490">分区数变化时映射改变</text>
      <text x="305" y="557" fontSize="9" fill="#0e7490">适用：按用户ID分区</text>

      <rect x="540" y="435" width="230" height="130" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="655" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">Sticky 分区（无Key）</text>
      <text x="655" y="480" textAnchor="middle" fontSize="10" fill="#5b21b6">2.4+ 默认无Key策略</text>
      <text x="560" y="505" fontSize="9" fill="#6d28d9">随机选分区并尽量复用</text>
      <text x="560" y="521" fontSize="9" fill="#6d28d9">batch满后切换分区</text>
      <text x="560" y="541" fontSize="9" fill="#6d28d9">减少请求数，提高吞吐</text>
      <text x="560" y="557" fontSize="9" fill="#6d28d9">适用：无Key场景</text>
    </svg>
  );
}
