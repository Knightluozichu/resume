"use client";

export function RmqClusteringDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="RabbitMQ集群与镜像队列架构">
      <defs>
        <linearGradient id="rmq-cl-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rmq-cl-ram" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-cl-mirror" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-cl-quorum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-cl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">RabbitMQ 集群架构与镜像队列</text>

      {/* 集群节点 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">集群节点拓扑</text>

      <rect x="40" y="70" width="200" height="110" rx="10" fill="url(#rmq-cl-disc)" opacity="0.95" />
      <text x="140" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Node A（Disk）</text>
      <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">磁盘节点</text>
      <text x="140" y="136" textAnchor="middle" fontSize="10" fill="#bfdbfe">元数据持久化</text>
      <text x="140" y="154" textAnchor="middle" fontSize="9" fill="#93c5fd">Exchange/Queue/Binding</text>
      <text x="140" y="170" textAnchor="middle" fontSize="9" fill="#60a5fa">集群状态管理</text>

      <rect x="300" y="70" width="200" height="110" rx="10" fill="url(#rmq-cl-ram)" opacity="0.95" />
      <text x="400" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Node B（RAM）</text>
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#cffafe">内存节点</text>
      <text x="400" y="136" textAnchor="middle" fontSize="10" fill="#cffafe">元数据仅在内存</text>
      <text x="400" y="154" textAnchor="middle" fontSize="9" fill="#a5f3fc">高性能路由</text>
      <text x="400" y="170" textAnchor="middle" fontSize="9" fill="#67e8f9">重启后需同步</text>

      <rect x="560" y="70" width="200" height="110" rx="10" fill="url(#rmq-cl-disc)" opacity="0.95" />
      <text x="660" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Node C（Disk）</text>
      <text x="660" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">磁盘节点</text>
      <text x="660" y="136" textAnchor="middle" fontSize="10" fill="#bfdbfe">元数据持久化</text>
      <text x="660" y="154" textAnchor="middle" fontSize="9" fill="#93c5fd">故障切换候选</text>
      <text x="660" y="170" textAnchor="middle" fontSize="9" fill="#60a5fa">高可用保障</text>

      <path d="M240 115 L300 115" stroke="#475569" strokeWidth="2" markerEnd="url(#rmq-cl-arrow)" />
      <path d="M500 115 L560 115" stroke="#475569" strokeWidth="2" markerEnd="url(#rmq-cl-arrow)" />

      {/* 镜像队列 */}
      <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">镜像队列（Classic Mirror Queue）</text>

      <rect x="40" y="225" width="200" height="120" rx="10" fill="url(#rmq-cl-mirror)" opacity="0.95" />
      <text x="140" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Master（主）</text>
      <text x="140" y="273" textAnchor="middle" fontSize="10" fill="#fef3c7">Node A 上的 Queue</text>
      <text x="140" y="293" textAnchor="middle" fontSize="9" fill="#fde68a">所有写操作先到 Master</text>
      <text x="140" y="311" textAnchor="middle" fontSize="9" fill="#fde68a">同步给 Slave</text>
      <text x="140" y="330" textAnchor="middle" fontSize="9" fill="#fcd34d">Master 宕 → Slave 升主</text>

      <rect x="300" y="225" width="200" height="120" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="400" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Slave（从）</text>
      <text x="400" y="273" textAnchor="middle" fontSize="10" fill="#78350f">Node B 上的镜像</text>
      <text x="400" y="293" textAnchor="middle" fontSize="9" fill="#78350f">同步 Master 消息</text>
      <text x="400" y="311" textAnchor="middle" fontSize="9" fill="#78350f">可参与读（不推荐）</text>
      <text x="400" y="330" textAnchor="middle" fontSize="9" fill="#92400e">x-ha-policy: all/nodes/exactly</text>

      <rect x="560" y="225" width="200" height="120" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="660" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Slave（从）</text>
      <text x="660" y="273" textAnchor="middle" fontSize="10" fill="#78350f">Node C 上的镜像</text>
      <text x="660" y="293" textAnchor="middle" fontSize="9" fill="#78350f">同步 Master 消息</text>
      <text x="660" y="311" textAnchor="middle" fontSize="9" fill="#78350f">数据冗余</text>
      <text x="660" y="330" textAnchor="middle" fontSize="9" fill="#92400e">高可用保障</text>

      {/* Quorum Queue */}
      <rect x="20" y="365" width="370" height="150" rx="10" fill="url(#rmq-cl-quorum)" opacity="0.95" />
      <text x="205" y="390" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Quorum Queue（仲裁队列）</text>
      <line x1="35" y1="400" x2="375" y2="400" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="423" textAnchor="middle" fontSize="11" fill="#ede9fe">基于 Raft 共识协议</text>
      <text x="205" y="445" textAnchor="middle" fontSize="10" fill="#ddd6fe">无 Master/Slave 区分，所有副本平等</text>
      <text x="205" y="465" textAnchor="middle" fontSize="10" fill="#ddd6fe">多数派写入即可确认</text>
      <text x="205" y="485" textAnchor="middle" fontSize="10" fill="#ddd6fe">数据安全保证更强（无脑裂）</text>
      <text x="205" y="505" textAnchor="middle" fontSize="10" fill="#c4b5fd">推荐替代 Classic 镜像队列</text>

      {/* 节点类型对比 */}
      <rect x="410" y="365" width="370" height="150" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="390" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">节点类型对比</text>
      <text x="595" y="415" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">Disk Node（磁盘节点）</text>
      <text x="595" y="435" textAnchor="middle" fontSize="10" fill="#64748b">元数据写入磁盘，重启不丢</text>
      <text x="595" y="455" textAnchor="middle" fontSize="10" fill="#64748b">集群至少需要一个 Disk 节点</text>
      <text x="595" y="478" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">RAM Node（内存节点）</text>
      <text x="595" y="498" textAnchor="middle" fontSize="10" fill="#64748b">元数据仅内存，性能高但不持久</text>
    </svg>
  );
}
