"use client";

export function RdiReplicationClusterDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis复制与集群">
      <defs>
        <linearGradient id="rdi-rc-grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="rdi-rc-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="rdi-rc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="rdi-rc-arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#8b5cf6" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 复制 · 哨兵 · 集群</text>

      {/* 主从复制 */}
      <rect x="20" y="50" width="760" height="150" rx="12" fill="url(#rdi-rc-grad1)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">主从复制（Replication）</text>
      <line x1="40" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <rect x="50" y="95" width="150" height="45" rx="8" fill="#ddd6fe" stroke="#fff" strokeWidth="1" />
      <text x="125" y="123" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">Master 主服务器</text>
      <path d="M200 117 L300 117" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#rdi-rc-arrow2)" />
      <text x="250" y="108" textAnchor="middle" fontSize="9" fill="#ddd6fe">SYNC/PSYNC</text>
      <rect x="310" y="95" width="150" height="45" rx="8" fill="#ede9fe" stroke="#fff" strokeWidth="1" />
      <text x="385" y="123" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">Slave 从服务器</text>
      <path d="M460 117 L560 117" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#rdi-rc-arrow2)" />
      <rect x="570" y="95" width="150" height="45" rx="8" fill="#ede9fe" stroke="#fff" strokeWidth="1" />
      <text x="645" y="123" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">Slave 级联复制</text>
      <text x="125" y="160" textAnchor="middle" fontSize="10" fill="#c4b5fd">读写分离 · 数据冗余</text>
      <text x="385" y="160" textAnchor="middle" fontSize="10" fill="#c4b5fd">只读 · 异步复制</text>
      <text x="645" y="160" textAnchor="middle" fontSize="10" fill="#c4b5fd">PSYNC 部分重同步</text>
      <text x="400" y="185" textAnchor="middle" fontSize="9" fill="#ddd6fe">旧版 SYNC（全量）→ 新版 PSYNC（部分+全量） · 复制偏移量 + 复制积压缓冲区(runid+offset)</text>

      {/* Sentinel */}
      <rect x="20" y="215" width="370" height="160" rx="12" fill="url(#rdi-rc-grad2)" opacity="0.95" />
      <text x="205" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Sentinel 哨兵</text>
      <line x1="40" y1="250" x2="360" y2="250" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="272" textAnchor="middle" fontSize="11" fill="#fecaca">监控 + 自动故障转移 + 通知</text>
      <text x="205" y="292" textAnchor="middle" fontSize="10" fill="#fca5a5">主观下线 SDOWN（单个哨兵判定）</text>
      <text x="205" y="312" textAnchor="middle" fontSize="10" fill="#fca5a5">客观下线 ODOWN（quorum 个哨兵同意）</text>
      <text x="205" y="332" textAnchor="middle" fontSize="10" fill="#fca5a5">选举 Leader → 选新主 → 通知客户端</text>
      <text x="205" y="352" textAnchor="middle" fontSize="9" fill="#fda4a4">Raft 变种选举 · 优先级选主</text>
      <text x="205" y="368" textAnchor="middle" fontSize="9" fill="#fda4a4">pub/sub 发现哨兵与从服务器</text>

      {/* Cluster */}
      <rect x="410" y="215" width="370" height="160" rx="12" fill="#0891b2" opacity="0.95" />
      <text x="595" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Cluster 集群</text>
      <line x1="430" y1="250" x2="760" y2="250" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="272" textAnchor="middle" fontSize="11" fill="#cffafe">16384 个槽位（slot）分片</text>
      <text x="595" y="292" textAnchor="middle" fontSize="10" fill="#a5f3fc">CRC16(key) mod 16384 → 槽位</text>
      <text x="595" y="312" textAnchor="middle" fontSize="10" fill="#a5f3fc">Gossip 协议节点通信</text>
      <text x="595" y="332" textAnchor="middle" fontSize="10" fill="#a5f3fc">MOVED / ASK 重定向</text>
      <text x="595" y="352" textAnchor="middle" fontSize="9" fill="#67e8f9">每个节点负责一部分槽位</text>
      <text x="595" y="368" textAnchor="middle" fontSize="9" fill="#67e8f9">主从自动故障转移</text>

      {/* 复制流程 */}
      <text x="400" y="400" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">PSYNC 部分重同步流程</text>

      <rect x="20" y="415" width="760" height="70" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="60" y="440" fontSize="10" fill="#475569">① 从服务器发送 PSYNC ? -1（首次）</text>
      <text x="300" y="440" fontSize="10" fill="#475569">② 主服务器 BGSAVE + 发送 RDB</text>
      <text x="550" y="440" fontSize="10" fill="#475569">③ 发送积压缓冲区命令</text>
      <text x="60" y="465" fontSize="10" fill="#475569">④ 非首次: PSYNC runid offset</text>
      <text x="300" y="465" fontSize="10" fill="#475569">⑤ offset 在缓冲区内 → 部分重同步</text>
      <text x="550" y="465" fontSize="10" fill="#475569">⑥ 否则 → 全量重同步</text>

      {/* 对比 */}
      <rect x="20" y="500" width="240" height="65" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="140" y="522" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">主从复制</text>
      <text x="140" y="542" textAnchor="middle" fontSize="9" fill="#5b21b6">简单 · 一主多从 · 异步</text>
      <text x="140" y="558" textAnchor="middle" fontSize="9" fill="#5b21b6">无自动故障转移</text>

      <rect x="280" y="500" width="240" height="65" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="400" y="522" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">Sentinel 哨兵</text>
      <text x="400" y="542" textAnchor="middle" fontSize="9" fill="#991b1b">高可用 · 自动故障转移</text>
      <text x="400" y="558" textAnchor="middle" fontSize="9" fill="#991b1b">额外部署哨兵进程</text>

      <rect x="540" y="500" width="240" height="65" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="660" y="522" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">Cluster 集群</text>
      <text x="660" y="542" textAnchor="middle" fontSize="9" fill="#155e75">水平扩展 · 分片 · 去中心化</text>
      <text x="660" y="558" textAnchor="middle" fontSize="9" fill="#155e75">不支持跨槽位多键操作</text>
    </svg>
  );
}
