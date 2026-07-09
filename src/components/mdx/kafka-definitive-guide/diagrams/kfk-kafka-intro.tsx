"use client";

export function KfkKafkaIntroDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kafka入门与发布订阅模型">
      <defs>
        <linearGradient id="kfk-ki-broker" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kfk-ki-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="kfk-ki-cons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="kfk-ki-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 发布订阅模型与四大 API</text>

      {/* Producer */}
      <rect x="20" y="60" width="130" height="70" rx="10" fill="url(#kfk-ki-prod)" />
      <text x="85" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Producer</text>
      <text x="85" y="108" textAnchor="middle" fontSize="10" fill="#d1fae5">消息生产者</text>
      <text x="85" y="123" textAnchor="middle" fontSize="10" fill="#d1fae5">写入 Topic</text>

      {/* Kafka Cluster (Broker + Topic) */}
      <rect x="250" y="50" width="300" height="180" rx="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
      <text x="400" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Kafka Cluster</text>

      {/* Topic A with 2 partitions */}
      <rect x="270" y="85" width="120" height="130" rx="8" fill="url(#kfk-ki-broker)" opacity="0.9" />
      <text x="330" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Topic A</text>
      <rect x="285" y="115" width="90" height="40" rx="4" fill="#dbeafe" stroke="#2563eb" />
      <text x="330" y="132" textAnchor="middle" fontSize="9" fill="#1e40af">Partition 0</text>
      <text x="330" y="147" textAnchor="middle" fontSize="9" fill="#1e40af">[0,1,2,3...]</text>
      <rect x="285" y="162" width="90" height="40" rx="4" fill="#dbeafe" stroke="#2563eb" />
      <text x="330" y="179" textAnchor="middle" fontSize="9" fill="#1e40af">Partition 1</text>
      <text x="330" y="194" textAnchor="middle" fontSize="9" fill="#1e40af">[0,1,2,3...]</text>

      {/* Topic B */}
      <rect x="410" y="85" width="120" height="130" rx="8" fill="url(#kfk-ki-broker)" opacity="0.7" />
      <text x="470" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Topic B</text>
      <rect x="425" y="115" width="90" height="40" rx="4" fill="#e0e7ff" stroke="#4f46e5" />
      <text x="470" y="132" textAnchor="middle" fontSize="9" fill="#3730a3">Partition 0</text>
      <text x="470" y="147" textAnchor="middle" fontSize="9" fill="#3730a3">[0,1,2...]</text>
      <rect x="425" y="162" width="90" height="40" rx="4" fill="#e0e7ff" stroke="#4f46e5" />
      <text x="470" y="179" textAnchor="middle" fontSize="9" fill="#3730a3">Partition 1</text>
      <text x="470" y="194" textAnchor="middle" fontSize="9" fill="#3730a3">[0,1,2...]</text>

      {/* Consumer Group A */}
      <rect x="640" y="55" width="140" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="710" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Consumer Group A</text>
      <text x="710" y="95" textAnchor="middle" fontSize="9" fill="#78350f">C1 ← Partition 0</text>
      <text x="710" y="110" textAnchor="middle" fontSize="9" fill="#78350f">C2 ← Partition 1</text>
      <text x="710" y="125" textAnchor="middle" fontSize="9" fill="#92400e">（负载均衡）</text>

      {/* Consumer Group B */}
      <rect x="640" y="150" width="140" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="710" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Consumer Group B</text>
      <text x="710" y="190" textAnchor="middle" fontSize="9" fill="#5b21b6">C3 ← 全量消息</text>
      <text x="710" y="205" textAnchor="middle" fontSize="9" fill="#5b21b6">（独立消费/广播）</text>
      <text x="710" y="220" textAnchor="middle" fontSize="9" fill="#6d28d9">有自己的 Offset</text>

      {/* Arrows */}
      <path d="M150 95 L265 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-ki-arrow)" />
      <path d="M390 120 L635 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-ki-arrow)" />
      <path d="M390 180 L635 185" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-ki-arrow)" />

      {/* 四大 API */}
      <text x="400" y="268" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Kafka 四大核心 API</text>

      <rect x="30" y="285" width="175" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Producer API</text>
      <text x="117" y="328" textAnchor="middle" fontSize="10" fill="#1e40af">发布消息到 Topic</text>
      <text x="117" y="348" textAnchor="middle" fontSize="10" fill="#1e40af">序列化 + 分区器</text>
      <text x="117" y="372" textAnchor="middle" fontSize="10" fill="#1d4ed8">数据写入</text>

      <rect x="220" y="285" width="175" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">Consumer API</text>
      <text x="307" y="328" textAnchor="middle" fontSize="10" fill="#155e75">从 Topic 订阅消息</text>
      <text x="307" y="348" textAnchor="middle" fontSize="10" fill="#155e75">消费者组 + Offset</text>
      <text x="307" y="372" textAnchor="middle" fontSize="10" fill="#0e7490">数据消费</text>

      <rect x="410" y="285" width="175" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="497" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">Streams API</text>
      <text x="497" y="328" textAnchor="middle" fontSize="10" fill="#5b21b6">输入流 → 输出流</text>
      <text x="497" y="348" textAnchor="middle" fontSize="10" fill="#5b21b6">KStream/KTable/窗口</text>
      <text x="497" y="372" textAnchor="middle" fontSize="10" fill="#6d28d9">流处理</text>

      <rect x="600" y="285" width="175" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="687" y="308" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Connect API</text>
      <text x="687" y="328" textAnchor="middle" fontSize="10" fill="#78350f">Source/Sink Connector</text>
      <text x="687" y="348" textAnchor="middle" fontSize="10" fill="#78350f">系统间数据导入导出</text>
      <text x="687" y="372" textAnchor="middle" fontSize="10" fill="#92400e">数据集成</text>

      {/* 底部总结 */}
      <rect x="30" y="400" width="745" height="145" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="423" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Kafka vs 传统消息队列</text>
      <text x="50" y="448" fontSize="10" fill="#475569">传统MQ：消息消费后即删除 · 临时队列 · 推送模型 · 不可重放</text>
      <text x="50" y="466" fontSize="10" fill="#475569">Kafka  ：消息持久化在日志 · 有保留期 · 拉取模型 · 可多次重放</text>
      <text x="400" y="492" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">核心特征：分布式提交日志 · 高吞吐 · 低延迟 · 可水平扩展 · 持久化 · 可重放</text>
      <text x="400" y="512" textAnchor="middle" fontSize="11" fill="#64748b">消费者组实现「同组负载均衡 + 跨组广播」· 同组内每分区仅一个消费者</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#64748b">典型场景：消息队列 · 行为追踪 · 运营指标 · 日志聚合 · 流处理</text>
    </svg>
  );
}
