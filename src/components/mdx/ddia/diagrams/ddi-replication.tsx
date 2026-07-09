"use client";

export function DdiReplicationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="复制">
      <defs>
        <linearGradient id="ddi-rp-leader" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ddi-rp-multi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ddi-rp-leaderless" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ddi-rp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">复制 · 三种拓扑与复制滞后</text>

      {/* 主从复制 */}
      <rect x="20" y="50" width="245" height="200" rx="12" fill="url(#ddi-rp-leader)" opacity="0.95" />
      <text x="142" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">主从复制（单主）</text>
      <line x1="35" y1="85" x2="250" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="142" y="108" textAnchor="middle" fontSize="11" fill="#cffafe">主库接收写 → 同步到从库</text>
      <text x="142" y="128" textAnchor="middle" fontSize="11" fill="#cffafe">同步复制 / 异步复制</text>
      <text x="142" y="148" textAnchor="middle" fontSize="11" fill="#a5f3fc">配置新从库 / 处理节点宕机</text>
      <text x="142" y="168" textAnchor="middle" fontSize="11" fill="#a5f3fc">故障切换（failover）</text>
      <text x="142" y="200" textAnchor="middle" fontSize="11" fill="#67e8f9">最常见方案，写单点</text>

      {/* 多主复制 */}
      <rect x="275" y="50" width="250" height="200" rx="12" fill="url(#ddi-rp-multi)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">多主复制</text>
      <line x1="290" y1="85" x2="510" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="108" textAnchor="middle" fontSize="11" fill="#fef3c7">多个主库互相同步写入</text>
      <text x="400" y="128" textAnchor="middle" fontSize="11" fill="#fef3c7">适用：多数据中心 / 离线</text>
      <text x="400" y="148" textAnchor="middle" fontSize="11" fill="#fde68a">写冲突 → LWW / 自定义</text>
      <text x="400" y="168" textAnchor="middle" fontSize="11" fill="#fde68a">复制拓扑：环形 / 星形 / 全部</text>
      <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#fcd34d">写扩展，冲突需处理</text>

      {/* 无主复制 */}
      <rect x="535" y="50" width="245" height="200" rx="12" fill="url(#ddi-rp-leaderless)" opacity="0.95" />
      <text x="657" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">无主复制</text>
      <line x1="550" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="657" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">客户端直写多副本（n 个中写 w 个）</text>
      <text x="657" y="128" textAnchor="middle" fontSize="11" fill="#ede9fe">读修复 / 反熵 / 读时一致性</text>
      <text x="657" y="148" textAnchor="middle" fontSize="11" fill="#ddd6fe">Quorum：w + r &gt; n</text>
      <text x="657" y="168" textAnchor="middle" fontSize="11" fill="#ddd6fe">Dynamo 风格 / Cassandra</text>
      <text x="657" y="200" textAnchor="middle" fontSize="11" fill="#c4b5fd">高可用，最终一致</text>

      {/* 复制滞后问题 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">复制滞后带来的三类问题</text>

      <rect x="30" y="295" width="240" height="90" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">读己之写</text>
      <text x="150" y="338" textAnchor="middle" fontSize="11" fill="#155e75">用户写后立即读不到</text>
      <text x="150" y="358" textAnchor="middle" fontSize="11" fill="#155e75">→ 从主库读 / 时间戳</text>
      <text x="150" y="375" textAnchor="middle" fontSize="11" fill="#0e7490">一致性：读写一致性</text>

      <rect x="280" y="295" width="240" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">单调读</text>
      <text x="400" y="338" textAnchor="middle" fontSize="11" fill="#78350f">数据「时光倒流」</text>
      <text x="400" y="358" textAnchor="middle" fontSize="11" fill="#78350f">→ 同用户固定副本</text>
      <text x="400" y="375" textAnchor="middle" fontSize="11" fill="#92400e">一致性：单调读一致性</text>

      <rect x="530" y="295" width="240" height="90" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">一致前缀读</text>
      <text x="650" y="338" textAnchor="middle" fontSize="11" fill="#5b21b6">因果关系被破坏</text>
      <text x="650" y="358" textAnchor="middle" fontSize="11" fill="#5b21b6">→ 分区保序</text>
      <text x="650" y="375" textAnchor="middle" fontSize="11" fill="#6d28d9">一致性：一致前缀读</text>

      {/* 决策矩阵 */}
      <rect x="30" y="405" width="740" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="428" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">选型决策：同步 vs 异步 vs Quorum</text>
      <text x="400" y="451" textAnchor="middle" fontSize="11" fill="#475569">同步复制：强一致但写延迟高，主库宕机有从库确认数据完整</text>
      <text x="400" y="471" textAnchor="middle" fontSize="11" fill="#475569">异步复制：低延迟但可能丢数据，故障切换需权衡数据丢失窗口</text>
      <text x="400" y="491" textAnchor="middle" fontSize="11" fill="#475569">Quorum（w + r &gt; n）：可调一致性与可用性，写读均需多数</text>
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#64748b">复制是分布式数据的基础 → 分区解决数据分片 → 事务解决跨副本一致性</text>
      <text x="400" y="536" textAnchor="middle" fontSize="11" fill="#64748b">复制滞后从「最终一致」到更强保证的取舍 = 一致性级别选择</text>
    </svg>
  );
}
