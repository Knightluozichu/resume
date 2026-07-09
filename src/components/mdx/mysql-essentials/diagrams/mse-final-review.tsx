"use client";

export function MseFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="MySQL全书知识图谱总复习">
      <defs>
        <linearGradient id="mse-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <linearGradient id="mse-fr-sql" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-fr-opt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mse-fr-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mse-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">MySQL 全书知识图谱 · 四大领域</text>

      {/* 中心圆 */}
      <circle cx="400" cy="280" r="55" fill="url(#mse-fr-core)" opacity="0.9" />
      <text x="400" y="275" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">MySQL</text>
      <text x="400" y="293" textAnchor="middle" fontSize="11" fill="#e0f2fe">数据库应用</text>

      {/* 四象限 */}
      {/* 左上：SQL语言 */}
      <rect x="30" y="60" width="340" height="170" rx="12" fill="url(#mse-fr-sql)" opacity="0.1" stroke="#3b82f6" strokeWidth="2" />
      <text x="200" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">① SQL 语言能力</text>
      <line x1="50" y1="90" x2="350" y2="90" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
      <text x="50" y="110" fontSize="11" fill="#1e3a8a">DDL：CREATE / ALTER / DROP / TRUNCATE</text>
      <text x="50" y="128" fontSize="11" fill="#1e3a8a">DML：INSERT / UPDATE / DELETE</text>
      <text x="50" y="146" fontSize="11" fill="#1e3a8a">DQL：SELECT / WHERE / GROUP BY / HAVING</text>
      <text x="50" y="164" fontSize="11" fill="#1e3a8a">JOIN：INNER / LEFT / RIGHT / FULL</text>
      <text x="50" y="182" fontSize="11" fill="#1e3a8a">子查询：标量/行/列/表 · IN/EXISTS</text>
      <text x="50" y="200" fontSize="11" fill="#1e3a8a">窗口函数：RANK / DENSE_RANK / ROW_NUMBER</text>
      <text x="50" y="218" fontSize="10" fill="#3730a3" fontWeight="600">核心：写对SQL + 理解执行顺序</text>

      {/* 右上：优化 */}
      <rect x="430" y="60" width="340" height="170" rx="12" fill="url(#mse-fr-opt)" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
      <text x="600" y="82" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">② 性能优化</text>
      <line x1="450" y1="90" x2="750" y2="90" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      <text x="450" y="110" fontSize="11" fill="#78350f">索引：B+Tree / 聚簇 / 二级 / 联合</text>
      <text x="450" y="128" fontSize="11" fill="#78350f">最左前缀 / 覆盖索引 / 索引下推</text>
      <text x="450" y="146" fontSize="11" fill="#78350f">EXPLAIN：type / key / rows / Extra</text>
      <text x="450" y="164" fontSize="11" fill="#78350f">避免索引失效：运算/函数/类型转换</text>
      <text x="450" y="182" fontSize="11" fill="#78350f">设计：三大范式 / 反范式 / ER建模</text>
      <text x="450" y="200" fontSize="11" fill="#78350f">数据类型：能小不大 / 定长变长</text>
      <text x="450" y="218" fontSize="10" fill="#b45309" fontWeight="600">核心：建对索引 + 看懂执行计划</text>

      {/* 左下：事务 */}
      <rect x="30" y="330" width="340" height="170" rx="12" fill="url(#mse-fr-ops)" opacity="0.1" stroke="#8b5cf6" strokeWidth="2" />
      <text x="200" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">③ 事务与并发</text>
      <line x1="50" y1="360" x2="350" y2="360" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="50" y="380" fontSize="11" fill="#5b21b6">ACID：原子/一致/隔离/持久</text>
      <text x="50" y="398" fontSize="11" fill="#5b21b6">隔离级别：RC / RR / Serializable</text>
      <text x="50" y="416" fontSize="11" fill="#5b21b6">MVCC：undo版本链 + Read View</text>
      <text x="50" y="434" fontSize="11" fill="#5b21b6">锁：行锁/表锁/间隙锁/Next-Key</text>
      <text x="50" y="452" fontSize="11" fill="#5b21b6">死锁检测与预防</text>
      <text x="50" y="470" fontSize="11" fill="#5b21b6">redo/undo/binlog 三大日志</text>
      <text x="50" y="488" fontSize="10" fill="#7c3aed" fontWeight="600">核心：数据一致性 + 并发安全</text>

      {/* 右下：运维 */}
      <rect x="430" y="330" width="340" height="170" rx="12" fill="url(#mse-fr-ops)" opacity="0.15" stroke="#6d28d9" strokeWidth="2" />
      <text x="600" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">④ 安全与运维</text>
      <line x1="450" y1="360" x2="750" y2="360" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="450" y="380" fontSize="11" fill="#5b21b6">权限：GRANT/REVOKE · 最小权限</text>
      <text x="450" y="398" fontSize="11" fill="#5b21b6">安全：SQL注入防护 · SSL加密</text>
      <text x="450" y="416" fontSize="11" fill="#5b21b6">备份：mysqldump/xtrabackup · PITR</text>
      <text x="450" y="434" fontSize="11" fill="#5b21b6">复制：主从异步/半同步 · 读写分离</text>
      <text x="450" y="452" fontSize="11" fill="#5b21b6">高可用：MHA/MGR/InnoDB Cluster</text>
      <text x="450" y="470" fontSize="11" fill="#5b21b6">监控：缓冲池命中率/慢查询/连接数</text>
      <text x="450" y="488" fontSize="10" fill="#7c3aed" fontWeight="600">核心：数据安全 + 系统可用</text>

      {/* 连接线到中心 */}
      <path d="M200 230 L360 260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-fr-arrow)" />
      <path d="M600 230 L440 260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-fr-arrow)" />
      <path d="M200 330 L360 300" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-fr-arrow)" />
      <path d="M600 330 L440 300" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#mse-fr-arrow)" />

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="30" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="540" textAnchor="middle" fontSize="11" fill="#475569">从入门到精通：会用SQL → 会设计库 → 会优化 → 会运维 → 系统工程师</text>
    </svg>
  );
}
