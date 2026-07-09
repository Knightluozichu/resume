"use client";

export function MseSecurityBackupDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="MySQL安全与备份恢复">
      <defs>
        <linearGradient id="mse-sec-auth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="mse-sec-backup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-sec-log" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mse-sec-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">MySQL 安全体系与备份恢复</text>

      {/* 权限体系 */}
      <rect x="20" y="50" width="370" height="210" rx="10" fill="url(#mse-sec-auth)" opacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
      <text x="205" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">权限与用户管理</text>
      <text x="40" y="94" fontSize="11" fill="#991b1b" fontWeight="600">用户创建与认证：</text>
      <text x="40" y="112" fontSize="10" fill="#991b1b" fontFamily="monospace">CREATE USER 'app'@'%' IDENTIFIED BY 'P@ssw0d!';</text>
      <text x="40" y="130" fontSize="10" fill="#991b1b" fontFamily="monospace">'用户'@'主机' → 限制来源IP</text>
      <text x="40" y="150" fontSize="11" fill="#991b1b" fontWeight="600">授权与撤销：</text>
      <text x="40" y="168" fontSize="10" fill="#991b1b" fontFamily="monospace">GRANT SELECT,INSERT ON shop.* TO 'app'@'%';</text>
      <text x="40" y="186" fontSize="10" fill="#991b1b" fontFamily="monospace">REVOKE INSERT ON shop.* FROM 'app'@'%';</text>
      <text x="40" y="206" fontSize="11" fill="#991b1b" fontWeight="600">权限层级：</text>
      <text x="40" y="222" fontSize="10" fill="#991b1b">全局（*.*）→ 库级（db.*）→ 表级 → 列级</text>
      <text x="40" y="238" fontSize="10" fill="#991b1b">最小权限原则：只授必要权限</text>
      <text x="40" y="254" fontSize="10" fill="#b91c1c">常见角色：root/DBA/应用/只读</text>

      {/* 备份恢复 */}
      <rect x="410" y="50" width="370" height="210" rx="10" fill="url(#mse-sec-backup)" opacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="595" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">备份与恢复</text>
      <text x="430" y="94" fontSize="11" fill="#1e3a8a" fontWeight="600">逻辑备份（mysqldump）：</text>
      <text x="430" y="112" fontSize="10" fill="#1e3a8a" fontFamily="monospace">mysqldump -u root -p shop &gt; shop.sql</text>
      <text x="430" y="128" fontSize="10" fill="#1e3a8a" fontFamily="monospace">mysqldump --all-databases &gt; all.sql</text>
      <text x="430" y="144" fontSize="10" fill="#1e3a8a" fontFamily="monospace">恢复：mysql -u root -p shop &lt; shop.sql</text>
      <text x="430" y="164" fontSize="11" fill="#1e3a8a" fontWeight="600">物理备份（拷贝文件）：</text>
      <text x="430" y="180" fontSize="10" fill="#1e3a8a">冷备：停机拷贝数据目录</text>
      <text x="430" y="194" fontSize="10" fill="#1e3a8a">热备：xtrabackup（不停机）</text>
      <text x="430" y="214" fontSize="11" fill="#1e3a8a" fontWeight="600">备份策略：</text>
      <text x="430" y="230" fontSize="10" fill="#1e3a8a">全量（每周）+ 增量（每日）+ binlog（实时）</text>
      <text x="430" y="246" fontSize="10" fill="#1e3a8a">PITR：基于时间点恢复</text>
      <text x="430" y="254" fontSize="10" fill="#1d4ed8">3-2-1原则：3份/2介质/1异地</text>

      {/* 日志体系 */}
      <rect x="20" y="275" width="760" height="120" rx="10" fill="url(#mse-sec-log)" opacity="0.08" stroke="#6d28d9" strokeWidth="1.5" />
      <text x="400" y="297" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">MySQL 三大日志</text>

      <rect x="40" y="310" width="230" height="75" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="155" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">redo log（重做日志）</text>
      <text x="155" y="346" textAnchor="middle" fontSize="10" fill="#78350f">InnoDB引擎层 · 物理日志</text>
      <text x="155" y="362" textAnchor="middle" fontSize="10" fill="#78350f">崩溃恢复（D持久性）</text>
      <text x="155" y="378" textAnchor="middle" fontSize="10" fill="#78350f">WAL：先写日志再写磁盘</text>

      <rect x="285" y="310" width="230" height="75" rx="8" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1" />
      <text x="400" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">undo log（回滚日志）</text>
      <text x="400" y="346" textAnchor="middle" fontSize="10" fill="#1e3a8a">InnoDB引擎层 · 逻辑日志</text>
      <text x="400" y="362" textAnchor="middle" fontSize="10" fill="#1e3a8a">事务回滚（A原子性）</text>
      <text x="400" y="378" textAnchor="middle" fontSize="10" fill="#1e3a8a">MVCC旧版本数据来源</text>

      <rect x="530" y="310" width="230" height="75" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1" />
      <text x="645" y="328" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">binlog（归档日志）</text>
      <text x="645" y="346" textAnchor="middle" fontSize="10" fill="#5b21b6">Server层 · 逻辑日志</text>
      <text x="645" y="362" textAnchor="middle" fontSize="10" fill="#5b21b6">复制 + PITR恢复</text>
      <text x="645" y="378" textAnchor="middle" fontSize="10" fill="#5b21b6">STATEMENT/ROW/MIXED</text>

      {/* 安全最佳实践 */}
      <rect x="20" y="410" width="760" height="115" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="400" y="432" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">安全最佳实践</text>
      <text x="40" y="454" fontSize="11" fill="#991b1b">SQL注入防护：预编译语句（PreparedStatement）+ 参数化查询 + ORM框架</text>
      <text x="40" y="472" fontSize="11" fill="#991b1b">密码安全：mysql_native_password → caching_sha2_password（8.0+默认）</text>
      <text x="40" y="490" fontSize="11" fill="#991b1b">传输加密：SSL/TLS连接（REQUIRE SSL）；列级加密：AES_ENCRYPT()</text>
      <text x="40" y="508" fontSize="11" fill="#991b1b">审计：enterprise audit plugin / MariaDB Audit Plugin 记录操作日志</text>
    </svg>
  );
}
