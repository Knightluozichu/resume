"use client";

export function MseDbAdministrationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="MySQL数据库管理与主从复制">
      <defs>
        <linearGradient id="mse-admin-repl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-admin-cluster" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mse-admin-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="mse-admin-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">主从复制 · 高可用 · 运维监控</text>

      {/* 主从复制架构 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">主从复制架构（一主多从）</text>

      {/* Master */}
      <rect x="50" y="70" width="200" height="180" rx="10" fill="url(#mse-admin-repl)" opacity="0.1" stroke="#3b82f6" strokeWidth="2" />
      <text x="150" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Master 主库</text>
      <line x1="70" y1="100" x2="230" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
      <text x="150" y="120" textAnchor="middle" fontSize="11" fill="#1e3a8a">读写（RW）</text>
      <rect x="70" y="130" width="160" height="30" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="150" y="149" textAnchor="middle" fontSize="10" fill="#92400e">binlog（二进制日志）</text>
      <text x="150" y="180" textAnchor="middle" fontSize="10" fill="#1e3a8a">Dump Thread</text>
      <text x="150" y="196" textAnchor="middle" fontSize="10" fill="#1e3a8a">推送binlog事件</text>
      <text x="150" y="220" textAnchor="middle" fontSize="10" fill="#3730a3" fontWeight="600">写操作 → binlog</text>
      <text x="150" y="238" textAnchor="middle" fontSize="10" fill="#3730a3">server-id=1</text>

      {/* 复制流向 */}
      <path d="M250 130 L350 130" stroke="#475569" strokeWidth="2" markerEnd="url(#mse-admin-arrow)" />
      <text x="300" y="122" textAnchor="middle" fontSize="10" fill="#64748b">binlog</text>
      <path d="M250 160 L350 160" stroke="#475569" strokeWidth="2" markerEnd="url(#mse-admin-arrow)" />
      <text x="300" y="180" textAnchor="middle" fontSize="9" fill="#64748b">网络传输</text>

      {/* Slave1 */}
      <rect x="350" y="70" width="190" height="180" rx="10" fill="url(#mse-admin-repl)" opacity="0.08" stroke="#3b82f6" strokeWidth="2" />
      <text x="445" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Slave1 从库</text>
      <line x1="370" y1="100" x2="520" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
      <text x="445" y="120" textAnchor="middle" fontSize="11" fill="#1e3a8a">只读（RO）</text>
      <rect x="370" y="130" width="150" height="30" rx="6" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1" />
      <text x="445" y="149" textAnchor="middle" fontSize="10" fill="#1e40af">relay log（中继日志）</text>
      <text x="445" y="180" textAnchor="middle" fontSize="10" fill="#1e3a8a">IO Thread：接收binlog</text>
      <text x="445" y="196" textAnchor="middle" fontSize="10" fill="#1e3a8a">SQL Thread：回放relay</text>
      <text x="445" y="220" textAnchor="middle" fontSize="10" fill="#3730a3" fontWeight="600">relay → 回放SQL</text>
      <text x="445" y="238" textAnchor="middle" fontSize="10" fill="#3730a3">server-id=2</text>

      {/* Slave2 */}
      <rect x="560" y="70" width="190" height="180" rx="10" fill="url(#mse-admin-repl)" opacity="0.08" stroke="#3b82f6" strokeWidth="2" />
      <text x="655" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">Slave2 从库</text>
      <line x1="580" y1="100" x2="730" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
      <text x="655" y="120" textAnchor="middle" fontSize="11" fill="#1e3a8a">只读（RO）</text>
      <rect x="580" y="130" width="150" height="30" rx="6" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1" />
      <text x="655" y="149" textAnchor="middle" fontSize="10" fill="#1e40af">relay log（中继日志）</text>
      <text x="655" y="180" textAnchor="middle" fontSize="10" fill="#1e3a8a">IO Thread + SQL Thread</text>
      <text x="655" y="196" textAnchor="middle" fontSize="10" fill="#1e3a8a">读写分离承载读流量</text>
      <text x="655" y="220" textAnchor="middle" fontSize="10" fill="#3730a3" fontWeight="600">异步/半同步复制</text>
      <text x="655" y="238" textAnchor="middle" fontSize="10" fill="#3730a3">server-id=3</text>

      <path d="M250 130 L560 130" stroke="#475569" strokeWidth="1" strokeDasharray="5,3" markerEnd="url(#mse-admin-arrow)" />

      {/* 复制类型 */}
      <rect x="20" y="270" width="760" height="80" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="292" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">复制模式对比</text>
      <text x="40" y="314" fontSize="11" fill="#78350f">异步复制：Master写binlog即返回，Slave延迟追赶（默认，性能好但可能丢数据）</text>
      <text x="40" y="332" fontSize="11" fill="#78350f">半同步复制：Master等至少1个Slave确认收到binlog才返回（兼顾性能与安全）</text>
      <text x="40" y="346" fontSize="11" fill="#78350f">组复制MGR：基于Paxos的多数派共识，自动选主，强一致（3节点集群）</text>

      {/* 性能监控 */}
      <rect x="20" y="365" width="380" height="175" rx="10" fill="url(#mse-admin-mon)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="210" y="387" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">性能监控核心指标</text>
      <text x="40" y="410" fontSize="11" fill="#047857" fontWeight="600">连接：SHOW STATUS LIKE 'Threads%';</text>
      <text x="40" y="426" fontSize="10" fill="#047857">Threads_connected / Threads_running / Max_used</text>
      <text x="40" y="446" fontSize="11" fill="#047857" fontWeight="600">缓冲池：SHOW STATUS LIKE 'Innodb_buffer%';</text>
      <text x="40" y="462" fontSize="10" fill="#047857">命中率 = 1 - (read_requests - reads) / read_requests</text>
      <text x="40" y="480" fontSize="11" fill="#047857" fontWeight="600">慢查询：SHOW VARIABLES LIKE 'slow_query%';</text>
      <text x="40" y="496" fontSize="10" fill="#047857">long_query_time &gt; 1s 的查询记录到慢日志</text>
      <text x="40" y="516" fontSize="11" fill="#047857" fontWeight="600">复制延迟：SHOW SLAVE STATUS \G</text>
      <text x="40" y="532" fontSize="10" fill="#047857">Seconds_Behind_Master = 0 表示无延迟</text>

      {/* 常用运维 */}
      <rect x="410" y="365" width="370" height="175" rx="10" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="595" y="387" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常用运维操作</text>
      <text x="430" y="410" fontSize="10" fill="#475569" fontFamily="monospace">SHOW PROCESSLIST;  -- 查看活跃连接</text>
      <text x="430" y="426" fontSize="10" fill="#475569" fontFamily="monospace">KILL &lt;id&gt;;  -- 终止会话</text>
      <text x="430" y="442" fontSize="10" fill="#475569" fontFamily="monospace">SHOW ENGINE INNODB STATUS;  -- 引擎状态</text>
      <text x="430" y="458" fontSize="10" fill="#475569" fontFamily="monospace">OPTIMIZE TABLE t;  -- 重建表碎片整理</text>
      <text x="430" y="474" fontSize="10" fill="#475569" fontFamily="monospace">ANALYZE TABLE t;  -- 更新统计信息</text>
      <text x="430" y="490" fontSize="10" fill="#475569" fontFamily="monospace">FLUSH TABLES;  -- 清理表缓存</text>
      <text x="430" y="510" fontSize="11" fill="#475569" fontWeight="600">高可用方案：</text>
      <text x="430" y="526" fontSize="10" fill="#475569">MHA / Orchestrator / MGR / MySQL InnoDB Cluster</text>
    </svg>
  );
}
