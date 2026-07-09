"use client";

export function HpmReplicationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="MySQL复制原理与拓扑">
      <defs>
        <linearGradient id="hpm-rep-master" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hpm-rep-slave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-rep-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="hpm-rep-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">MySQL 复制 · 原理与拓扑</text>

      {/* 复制原理三步 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">复制原理（基于 binlog 的事件回放）</text>

      <rect x="40" y="72" width="220" height="120" rx="8" fill="url(#hpm-rep-master)" />
      <text x="150" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">主库 Master</text>
      <text x="150" y="116" textAnchor="middle" fontSize="11" fill="#d1fae5">① 事务提交写 binlog</text>
      <text x="150" y="135" textAnchor="middle" fontSize="11" fill="#d1fae5">Binlog Dump 线程</text>
      <text x="150" y="155" textAnchor="middle" fontSize="10" fill="#a7f3d0">将 binlog 事件发给从库</text>
      <text x="150" y="178" textAnchor="middle" fontSize="10" fill="#6ee7b7">写：STATEMENT/ROW/MIXED</text>

      <rect x="290" y="72" width="220" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">网络传输</text>
      <text x="400" y="118" textAnchor="middle" fontSize="11" fill="#78350f">② binlog 事件流</text>
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#92400e">异步复制（默认）</text>
      <text x="400" y="158" textAnchor="middle" fontSize="10" fill="#92400e">半同步 / 组复制可选</text>
      <text x="400" y="182" textAnchor="middle" fontSize="10" fill="#b45309">GTID 全局事务标识</text>

      <rect x="540" y="72" width="220" height="120" rx="8" fill="url(#hpm-rep-slave)" />
      <text x="650" y="95" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">从库 Slave</text>
      <text x="650" y="116" textAnchor="middle" fontSize="11" fill="#cffafe">IO 线程收事件写 relay log</text>
      <text x="650" y="135" textAnchor="middle" fontSize="11" fill="#cffafe">③ SQL 线程回放 relay log</text>
      <text x="650" y="155" textAnchor="middle" fontSize="10" fill="#a5f3fc">重放 → 数据最终一致</text>
      <text x="650" y="178" textAnchor="middle" fontSize="10" fill="#67e8f9">主从延迟 = 落后未回放事件</text>

      <path d="M260 110 L290 110" stroke="#059669" strokeWidth="2" markerEnd="url(#hpm-rep-arrow-r)" />
      <path d="M510 110 L540 110" stroke="#059669" strokeWidth="2" markerEnd="url(#hpm-rep-arrow-r)" />

      {/* binlog 格式 */}
      <text x="400" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">binlog 格式对比</text>
      <rect x="40" y="232" width="230" height="95" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="155" y="252" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">STATEMENT 语句</text>
      <text x="155" y="272" textAnchor="middle" fontSize="10" fill="#1e3a8a">记录 SQL 原文</text>
      <text x="155" y="290" textAnchor="middle" fontSize="10" fill="#1e3a8a">日志小，但不确定函数</text>
      <text x="155" y="308" textAnchor="middle" fontSize="10" fill="#1e3a8a">（NOW/UUID）有不一致风险</text>

      <rect x="285" y="232" width="230" height="95" rx="6" fill="#d1fae5" stroke="#10b981" />
      <text x="400" y="252" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">ROW 行（推荐）</text>
      <text x="400" y="272" textAnchor="middle" fontSize="10" fill="#047857">记录行变更</text>
      <text x="400" y="290" textAnchor="middle" fontSize="10" fill="#047857">准确无歧义，可幂等</text>
      <text x="400" y="308" textAnchor="middle" fontSize="10" fill="#047857">日志较大，但最安全</text>

      <rect x="530" y="232" width="230" height="95" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="645" y="252" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">MIXED 混合</text>
      <text x="645" y="272" textAnchor="middle" fontSize="10" fill="#78350f">自动选择</text>
      <text x="645" y="290" textAnchor="middle" fontSize="10" fill="#78350f">安全用 ROW</text>
      <text x="645" y="308" textAnchor="middle" fontSize="10" fill="#78350f">其余用 STATEMENT</text>

      {/* 复制拓扑 */}
      <text x="400" y="350" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">复制拓扑模式</text>
      <rect x="40" y="362" width="175" height="80" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="127" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">一主多从</text>
      <text x="127" y="400" textAnchor="middle" fontSize="10" fill="#5b21b6">读扩展最常见</text>
      <text x="127" y="418" textAnchor="middle" fontSize="10" fill="#5b21b6">从库分担读负载</text>
      <text x="127" y="436" textAnchor="middle" fontSize="10" fill="#6d28d9">主库专注写</text>

      <rect x="230" y="362" width="175" height="80" rx="6" fill="#dbeafe" stroke="#3b82f6" />
      <text x="317" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">链式复制</text>
      <text x="317" y="400" textAnchor="middle" fontSize="10" fill="#1e3a8a">A→B→C 级联</text>
      <text x="317" y="418" textAnchor="middle" fontSize="10" fill="#1e3a8a">减轻主库分发压力</text>
      <text x="317" y="436" textAnchor="middle" fontSize="10" fill="#1e40af">但延迟累积</text>

      <rect x="420" y="362" width="175" height="80" rx="6" fill="#d1fae5" stroke="#10b981" />
      <text x="507" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">双主互备</text>
      <text x="507" y="400" textAnchor="middle" fontSize="10" fill="#047857">互为主从</text>
      <text x="507" y="418" textAnchor="middle" fontSize="10" fill="#047857">需防循环复制</text>
      <text x="507" y="436" textAnchor="middle" fontSize="10" fill="#059669">配合 VIP 切换</text>

      <rect x="610" y="362" width="150" height="80" rx="6" fill="#fee2e2" stroke="#ef4444" />
      <text x="685" y="382" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">组复制 MGR</text>
      <text x="685" y="400" textAnchor="middle" fontSize="10" fill="#991b1b">多主强一致</text>
      <text x="685" y="418" textAnchor="middle" fontSize="10" fill="#991b1b">基于 Paxos 变种</text>
      <text x="685" y="436" textAnchor="middle" fontSize="10" fill="#dc2626">高可用首选</text>

      {/* 复制注意 */}
      <rect x="40" y="455" width="720" height="85" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">复制关键点</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">复制是异步最终一致：主从延迟需监控（Seconds_Behind_Master）</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">GTID 替代文件位点，使故障切换与一致性校验更可靠</text>
      <text x="400" y="536" textAnchor="middle" fontSize="11" fill="#6d28d9">复制解决读扩展与高可用，但不解决写扩展（写仍走主库）</text>
    </svg>
  );
}
