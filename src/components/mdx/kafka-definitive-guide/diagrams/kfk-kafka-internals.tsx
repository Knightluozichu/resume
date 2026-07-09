"use client";

export function KfkKafkaInternalsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kafka内部原理与请求处理">
      <defs>
        <linearGradient id="kfk-in-ctrl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="kfk-in-broker" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="kfk-in-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kafka 集群架构与请求处理流程</text>

      {/* ZK / KRaft */}
      <rect x="300" y="48" width="200" height="45" rx="8" fill="url(#kfk-in-ctrl)" />
      <text x="400" y="76" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">ZooKeeper / KRaft（元数据）</text>

      {/* Controller */}
      <rect x="300" y="110" width="200" height="45" rx="8" fill="url(#kfk-in-ctrl)" opacity="0.85" />
      <text x="400" y="138" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Controller（集群管理者）</text>
      <text x="400" y="152" textAnchor="middle" fontSize="8" fill="#ddd6fe">Leader选举 / 分区管理 / Broker上下线</text>

      <path d="M400 93 L400 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#kfk-in-arrow)" />

      {/* Brokers */}
      <rect x="30" y="180" width="220" height="100" rx="10" fill="url(#kfk-in-broker)" opacity="0.9" />
      <text x="140" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Broker 1</text>
      <text x="140" y="225" textAnchor="middle" fontSize="9" fill="#bfdbfe">Leader: P0, P1</text>
      <text x="140" y="240" textAnchor="middle" fontSize="9" fill="#bfdbfe">Follower: P2, P3</text>
      <text x="140" y="260" textAnchor="middle" fontSize="9" fill="#bfdbfe">Acceptor → Processor</text>
      <text x="140" y="272" textAnchor="middle" fontSize="9" fill="#bfdbfe">→ RequestQueue → IO线程</text>

      <rect x="290" y="180" width="220" height="100" rx="10" fill="url(#kfk-in-broker)" opacity="0.9" />
      <text x="400" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Broker 2</text>
      <text x="400" y="225" textAnchor="middle" fontSize="9" fill="#bfdbfe">Leader: P2, P3</text>
      <text x="400" y="240" textAnchor="middle" fontSize="9" fill="#bfdbfe">Follower: P0, P1</text>
      <text x="400" y="260" textAnchor="middle" fontSize="9" fill="#bfdbfe">Acceptor → Processor</text>
      <text x="400" y="272" textAnchor="middle" fontSize="9" fill="#bfdbfe">→ RequestQueue → IO线程</text>

      <rect x="550" y="180" width="220" height="100" rx="10" fill="url(#kfk-in-broker)" opacity="0.9" />
      <text x="660" y="205" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Broker 3</text>
      <text x="660" y="225" textAnchor="middle" fontSize="9" fill="#bfdbfe">Leader: P4, P5</text>
      <text x="660" y="240" textAnchor="middle" fontSize="9" fill="#bfdbfe">Follower: P0, P2</text>
      <text x="660" y="260" textAnchor="middle" fontSize="9" fill="#bfdbfe">Acceptor → Processor</text>
      <text x="660" y="272" textAnchor="middle" fontSize="9" fill="#bfdbfe">→ RequestQueue → IO线程</text>

      <path d="M400 155 L140 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M400 155 L400 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M400 155 L660 180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />

      {/* 请求处理 Reactor 模型 */}
      <text x="400" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Broker 请求处理（Reactor 多线程模型）</text>

      <rect x="20" y="330" width="105" height="55" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="72" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">Acceptor</text>
      <text x="72" y="370" textAnchor="middle" fontSize="8" fill="#1e40af">监听端口</text>
      <text x="72" y="380" textAnchor="middle" fontSize="8" fill="#1e40af">接受连接</text>

      <rect x="145" y="330" width="105" height="55" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="197" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">Processor</text>
      <text x="197" y="370" textAnchor="middle" fontSize="8" fill="#155e75">网络线程 NIO</text>
      <text x="197" y="380" textAnchor="middle" fontSize="8" fill="#155e75">读写请求/响应</text>

      <rect x="270" y="330" width="105" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="322" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">RequestQueue</text>
      <text x="322" y="370" textAnchor="middle" fontSize="8" fill="#78350f">全局共享</text>
      <text x="322" y="380" textAnchor="middle" fontSize="8" fill="#78350f">队列</text>

      <rect x="395" y="330" width="105" height="55" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="447" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6d28d9">IO线程</text>
      <text x="447" y="370" textAnchor="middle" fontSize="8" fill="#5b21b6">RequestHandler</text>
      <text x="447" y="380" textAnchor="middle" fontSize="8" fill="#5b21b6">处理请求</text>

      <rect x="520" y="330" width="105" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="572" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">ResponseQueue</text>
      <text x="572" y="370" textAnchor="middle" fontSize="8" fill="#78350f">按Processor隔离</text>

      <rect x="645" y="330" width="135" height="55" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="712" y="353" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">Processor</text>
      <text x="712" y="370" textAnchor="middle" fontSize="8" fill="#155e75">NIO写回客户端</text>

      <path d="M125 357 L145 357" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M250 357 L270 357" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M375 357 L395 357" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M500 357 L520 357" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />
      <path d="M625 357 L645 357" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#kfk-in-arrow)" />

      {/* 消息格式 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">消息格式 v2（RecordBatch）</text>

      <rect x="30" y="435" width="740" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">RecordBatch（批量 + 变长编码 + 幂等/事务支持）</text>

      <rect x="50" y="470" width="210" height="80" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="155" y="492" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">Batch Header</text>
      <text x="60" y="512" fontSize="9" fill="#1e40af">BaseOffset / Length / PID</text>
      <text x="60" y="528" fontSize="9" fill="#1e40af">Epoch / BaseSeq / Timestamp</text>
      <text x="60" y="544" fontSize="9" fill="#1e40af">压缩格式 / 属性</text>

      <rect x="280" y="470" width="220" height="80" rx="6" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
      <text x="390" y="492" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">Record 0</text>
      <text x="290" y="512" fontSize="9" fill="#155e75">OffsetDelta（Varint增量）</text>
      <text x="290" y="528" fontSize="9" fill="#155e75">TimestampDelta / KeyLen / Key</text>
      <text x="290" y="544" fontSize="9" fill="#155e75">ValueLen / Value / Headers</text>

      <rect x="520" y="470" width="220" height="80" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="630" y="492" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6d28d9">Record 1...N</text>
      <text x="530" y="512" fontSize="9" fill="#5b21b6">变长编码减少字节</text>
      <text x="530" y="528" fontSize="9" fill="#5b21b6">整Batch一次压缩</text>
      <text x="530" y="544" fontSize="9" fill="#5b21b6">PID+Seq支持幂等去重</text>
    </svg>
  );
}
