"use client";

export function HpmScalingHaDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="扩展与高可用策略">
      <defs>
        <linearGradient id="hpm-sc-read" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hpm-sc-write" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hpm-sc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">扩展与高可用 · 策略全景</text>

      {/* 扩展方向 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">两种扩展方向</text>

      <rect x="40" y="72" width="350" height="100" rx="8" fill="url(#hpm-sc-read)" />
      <text x="215" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">垂直扩展 Scale Up</text>
      <text x="215" y="116" textAnchor="middle" fontSize="11" fill="#cffafe">单机加 CPU / 内存 / SSD</text>
      <text x="215" y="135" textAnchor="middle" fontSize="11" fill="#a5f3fc">简单但有天花板，硬件成本指数上升</text>
      <text x="215" y="155" textAnchor="middle" fontSize="11" fill="#67e8f9">适合：单机扛得住的早期阶段</text>

      <rect x="410" y="72" width="350" height="100" rx="8" fill="url(#hpm-sc-write)" />
      <text x="585" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">水平扩展 Scale Out</text>
      <text x="585" y="116" textAnchor="middle" fontSize="11" fill="#ede9fe">多机分担负载（读写分离 / 分片）</text>
      <text x="585" y="135" textAnchor="middle" fontSize="11" fill="#ddd6fe">无上限但架构复杂，需处理一致性</text>
      <text x="585" y="155" textAnchor="middle" fontSize="11" fill="#c4b5fd">适合：单机扛不住的大规模</text>

      {/* 读写分离 */}
      <text x="200" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">读写分离</text>
      <rect x="40" y="212" width="360" height="135" rx="8" fill="#ecfeff" stroke="#0891b2" />
      <rect x="170" y="222" width="100" height="32" rx="4" fill="url(#hpm-sc-read)" />
      <text x="220" y="242" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">主库 Master</text>
      <rect x="60" y="278" width="100" height="32" rx="4" fill="#cffafe" stroke="#0891b2" />
      <text x="110" y="298" textAnchor="middle" fontSize="11" fill="#0e7490">从库1（读）</text>
      <rect x="170" y="278" width="100" height="32" rx="4" fill="#cffafe" stroke="#0891b2" />
      <text x="220" y="298" textAnchor="middle" fontSize="11" fill="#0e7490">从库2（读）</text>
      <rect x="280" y="278" width="100" height="32" rx="4" fill="#cffafe" stroke="#0891b2" />
      <text x="330" y="298" textAnchor="middle" fontSize="11" fill="#0e7490">从库3（读）</text>
      <path d="M220 254 L110 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <path d="M220 254 L220 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <path d="M220 254 L330 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <text x="220" y="328" textAnchor="middle" fontSize="10" fill="#155e75">写走主库，读分发到从库</text>
      <text x="220" y="343" textAnchor="middle" fontSize="10" fill="#155e75">复制延迟导致读旧数据需处理</text>

      {/* 分片 */}
      <text x="600" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">分片 Sharding</text>
      <rect x="420" y="212" width="340" height="135" rx="8" fill="#f5f3ff" stroke="#8b5cf6" />
      <rect x="540" y="222" width="100" height="32" rx="4" fill="url(#hpm-sc-write)" />
      <text x="590" y="242" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">分片路由</text>
      <rect x="435" y="278" width="95" height="32" rx="4" fill="#ddd6fe" stroke="#8b5cf6" />
      <text x="482" y="298" textAnchor="middle" fontSize="11" fill="#6d28d9">分片0</text>
      <rect x="540" y="278" width="95" height="32" rx="4" fill="#ddd6fe" stroke="#8b5cf6" />
      <text x="587" y="298" textAnchor="middle" fontSize="11" fill="#6d28d9">分片1</text>
      <rect x="645" y="278" width="95" height="32" rx="4" fill="#ddd6fe" stroke="#8b5cf6" />
      <text x="692" y="298" textAnchor="middle" fontSize="11" fill="#6d28d9">分片2</text>
      <path d="M590 254 L482 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <path d="M590 254 L587 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <path d="M590 254 L692 278" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#hpm-sc-arrow)" />
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#5b21b6">按键哈希/范围路由到不同分片</text>
      <text x="590" y="343" textAnchor="middle" fontSize="10" fill="#5b21b6">写扩展，但跨片查询/事务极难</text>

      {/* 高可用机制 */}
      <text x="400" y="372" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">高可用机制</text>
      <rect x="40" y="384" width="175" height="75" rx="6" fill="#d1fae5" stroke="#10b981" />
      <text x="127" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">故障检测</text>
      <text x="127" y="422" textAnchor="middle" fontSize="10" fill="#047857">心跳/探活</text>
      <text x="127" y="440" textAnchor="middle" fontSize="10" fill="#047857">MHA/Orchestrator</text>

      <rect x="230" y="384" width="175" height="75" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="317" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">主从切换</text>
      <text x="317" y="422" textAnchor="middle" fontSize="10" fill="#78350f">提升从库为新主</text>
      <text x="317" y="440" textAnchor="middle" fontSize="10" fill="#92400e">VIP/代理重路由</text>

      <rect x="420" y="384" width="175" height="75" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="507" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">负载均衡</text>
      <text x="507" y="422" textAnchor="middle" fontSize="10" fill="#1e3a8a">ProxySQL/HAProxy</text>
      <text x="507" y="440" textAnchor="middle" fontSize="10" fill="#1e40af">读写分流/故障剔除</text>

      <rect x="610" y="384" width="150" height="75" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="685" y="404" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">共识协议</text>
      <text x="685" y="422" textAnchor="middle" fontSize="10" fill="#5b21b6">MGR / Paxos</text>
      <text x="685" y="440" textAnchor="middle" fontSize="10" fill="#6d28d9">自动选主强一致</text>

      {/* RPO/RTO */}
      <rect x="40" y="472" width="720" height="68" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="494" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">高可用核心指标</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#475569">RPO（恢复点目标）：可容忍丢失多少数据 → 决定复制同步级别</text>
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#475569">RTO（恢复时间目标）：可容忍多快恢复 → 决定切换自动化程度</text>
    </svg>
  );
}
