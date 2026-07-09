"use client";

export function DdiPartitioningDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="分区">
      <defs>
        <linearGradient id="ddi-pt-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ddi-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分区 · 分片策略与再平衡</text>

      {/* 两种分区方式 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两种分区方式</text>

      <rect x="30" y="68" width="370" height="140" rx="12" fill="url(#ddi-pt-grad)" opacity="0.95" />
      <text x="215" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">按键范围分区</text>
      <line x1="50" y1="103" x2="380" y2="103" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="215" y="126" textAnchor="middle" fontSize="11" fill="#fef3c7">键排序 → 每个分区连续范围</text>
      <text x="215" y="146" textAnchor="middle" fontSize="11" fill="#fef3c7">范围查询友好</text>
      <text x="215" y="166" textAnchor="middle" fontSize="11" fill="#fde68a">热点风险：时间戳集中写入</text>
      <text x="215" y="190" textAnchor="middle" fontSize="11" fill="#fcd34d">适用：需要范围扫描的场景</text>

      <rect x="410" y="68" width="360" height="140" rx="12" fill="url(#ddi-pt-grad)" opacity="0.85" />
      <text x="590" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">按键哈希分区</text>
      <line x1="430" y1="103" x2="750" y2="103" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="126" textAnchor="middle" fontSize="11" fill="#fef3c7">hash(key) mod N → 分配分区</text>
      <text x="590" y="146" textAnchor="middle" fontSize="11" fill="#fef3c7">分布均匀，热点少</text>
      <text x="590" y="166" textAnchor="middle" fontSize="11" fill="#fde68a">范围查询不友好</text>
      <text x="590" y="190" textAnchor="middle" fontSize="11" fill="#fcd34d">一致性哈希解决增删节点</text>

      {/* 热点与再平衡 */}
      <text x="400" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">热点与再平衡</text>

      <rect x="30" y="248" width="240" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="271" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">热点问题</text>
      <text x="150" y="291" textAnchor="middle" fontSize="11" fill="#155e75">某个分区负载远超其他</text>
      <text x="150" y="311" textAnchor="middle" fontSize="11" fill="#155e75">→ 名人 key 拆分</text>
      <text x="150" y="331" textAnchor="middle" fontSize="11" fill="#155e75">→ 随机化前缀</text>

      <rect x="280" y="248" width="240" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="271" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">再平衡策略</text>
      <text x="400" y="291" textAnchor="middle" fontSize="11" fill="#78350f">固定分区数 → 增减节点迁移</text>
      <text x="400" y="311" textAnchor="middle" fontSize="11" fill="#78350f">动态分区 → 自动分裂/合并</text>
      <text x="400" y="331" textAnchor="middle" fontSize="11" fill="#78350f">按节点比例分区</text>

      <rect x="530" y="248" width="240" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="271" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">请求路由</text>
      <text x="650" y="291" textAnchor="middle" fontSize="11" fill="#5b21b6">客户端感知分区 → 直连节点</text>
      <text x="650" y="311" textAnchor="middle" fontSize="11" fill="#5b21b6">路由层代理 → 转发</text>
      <text x="650" y="331" textAnchor="middle" fontSize="11" fill="#5b21b6">协议感知（MongoDB/Cassandra）</text>

      {/* 二级索引分区 */}
      <rect x="30" y="365" width="740" height="90" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">二级索引分区（Scatter-Gather 问题）</text>
      <text x="400" y="410" textAnchor="middle" fontSize="11" fill="#475569">本地索引（文档分区索引）：每个分区维护自己的索引 → 写快，读需查所有分区</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">全局索引（词条分区索引）：索引独立分区 → 读快，写需跨分区更新</text>

      {/* 复制+分区联合 */}
      <rect x="30" y="470" width="740" height="75" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="492" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">复制 + 分区联合</text>
      <text x="400" y="513" textAnchor="middle" fontSize="11" fill="#78350f">每个分区有多个副本 → 主副本 + 从副本 → 分区决定数据在哪，复制决定数据有几份</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#92400e">分区 + 复制 = 大规模分布式存储的两大支柱 → 事务解决跨副本一致性</text>
    </svg>
  );
}
