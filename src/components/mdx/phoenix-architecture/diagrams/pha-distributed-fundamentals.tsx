"use client";

export function PhaDistributedFundamentalsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="CAP定理与分布式基础">
      <defs>
        <marker id="pha-df-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">CAP 定理 · 分布式系统三要素</text>

      {/* CAP 三角形 */}
      <polygon points="400,90 250,280 550,280" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,3" />

      {/* C 一致性 */}
      <circle cx="400" cy="90" r="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="400" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1d4ed8">C</text>
      <text x="400" y="106" textAnchor="middle" fontSize="10" fill="#1e40af">一致性</text>

      {/* A 可用性 */}
      <circle cx="250" cy="280" r="45" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="250" y="276" textAnchor="middle" fontSize="16" fontWeight="700" fill="#92400e">A</text>
      <text x="250" y="296" textAnchor="middle" fontSize="10" fill="#78350f">可用性</text>

      {/* P 分区容忍 */}
      <circle cx="550" cy="280" r="45" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
      <text x="550" y="276" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6d28d9">P</text>
      <text x="550" y="296" textAnchor="middle" fontSize="10" fill="#5b21b6">分区容忍</text>

      {/* 三选二标签 */}
      <text x="325" y="180" textAnchor="middle" fontSize="10" fill="#475569">CP</text>
      <text x="475" y="180" textAnchor="middle" fontSize="10" fill="#475569">AP</text>
      <text x="400" y="300" textAnchor="middle" fontSize="10" fill="#475569">CA（无分区时）</text>

      {/* CP 选择 */}
      <rect x="20" y="350" width="245" height="120" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="142" y="373" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">CP：保一致性 + 分区容忍</text>
      <text x="142" y="395" textAnchor="middle" fontSize="10" fill="#1e40af">分区时拒绝写入（不可用）</text>
      <text x="142" y="413" textAnchor="middle" fontSize="10" fill="#1e40af">代表：ZooKeeper / etcd</text>
      <text x="142" y="433" textAnchor="middle" fontSize="9" fill="#3b82f6">场景：配置管理 / 分布式锁</text>
      <text x="142" y="455" textAnchor="middle" fontSize="9" fill="#64748b">宁可不可用，不可数据错</text>

      {/* AP 选择 */}
      <rect x="278" y="350" width="245" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="373" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">AP：保可用性 + 分区容忍</text>
      <text x="400" y="395" textAnchor="middle" fontSize="10" fill="#78350f">分区时允许写入（最终一致）</text>
      <text x="400" y="413" textAnchor="middle" fontSize="10" fill="#78350f">代表：Cassandra / DynamoDB</text>
      <text x="400" y="433" textAnchor="middle" fontSize="9" fill="#d97706">场景：高可用 / 海量数据</text>
      <text x="400" y="455" textAnchor="middle" fontSize="9" fill="#64748b">宁可数据暂时不一致</text>

      {/* 分区容忍不可放弃 */}
      <rect x="535" y="350" width="245" height="120" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="657" y="373" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">P 不可放弃</text>
      <text x="657" y="395" textAnchor="middle" fontSize="10" fill="#5b21b6">分布式系统必然存在网络分区</text>
      <text x="657" y="413" textAnchor="middle" fontSize="10" fill="#5b21b6">实际选择：CP 或 AP</text>
      <text x="657" y="433" textAnchor="middle" fontSize="9" fill="#8b5cf6">CA 只在单机/无分区时成立</text>
      <text x="657" y="455" textAnchor="middle" fontSize="9" fill="#64748b">CAP 是「三选二」实为误导</text>

      {/* 分布式八大问题 */}
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">分布式核心问题：网络不可靠 / 时钟不同步 / 消息延迟与乱序 / 节点故障 / 拜占庭故障 / 状态分歧 / 部分失败 / 三态（成功/失败/超时）</text>
    </svg>
  );
}
