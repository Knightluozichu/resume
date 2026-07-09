"use client";

export function MseMysqlBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="MySQL架构与客户端服务器模型">
      <defs>
        <linearGradient id="mse-basics-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-basics-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <linearGradient id="mse-basics-engine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mse-basics-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">MySQL 客户端/服务器架构 &amp; 存储引擎</text>

      {/* 客户端 */}
      <rect x="30" y="60" width="150" height="120" rx="10" fill="url(#mse-basics-client)" opacity="0.95" />
      <text x="105" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">客户端</text>
      <line x1="50" y1="92" x2="160" y2="92" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="105" y="112" textAnchor="middle" fontSize="11" fill="#dbeafe">mysql CLI</text>
      <text x="105" y="130" textAnchor="middle" fontSize="11" fill="#dbeafe">Workbench</text>
      <text x="105" y="148" textAnchor="middle" fontSize="11" fill="#dbeafe">JDBC / ODBC</text>
      <text x="105" y="166" textAnchor="middle" fontSize="11" fill="#dbeafe">Navicat / DBeaver</text>

      {/* 连接线 */}
      <path d="M180 120 L230 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-basics-arrow)" />
      <text x="205" y="112" textAnchor="middle" fontSize="10" fill="#64748b">SQL</text>
      <path d="M230 130 L180 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-basics-arrow)" />
      <text x="205" y="148" textAnchor="middle" fontSize="10" fill="#64748b">结果集</text>

      {/* MySQL Server */}
      <rect x="230" y="50" width="340" height="280" rx="12" fill="#f8fafc" stroke="#00758f" strokeWidth="2" />
      <text x="400" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#00758f">MySQL Server</text>

      {/* 连接层 */}
      <rect x="250" y="85" width="300" height="60" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
      <text x="400" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="#075985">连接管理层</text>
      <text x="400" y="125" textAnchor="middle" fontSize="10" fill="#0369a1">连接池 · 认证鉴权 · 线程管理</text>

      {/* SQL层 */}
      <rect x="250" y="155" width="300" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
      <text x="400" y="175" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">SQL 层（Server 层）</text>
      <text x="400" y="193" textAnchor="middle" fontSize="10" fill="#78350f">解析器 → 优化器 → 执行器</text>
      <text x="400" y="210" textAnchor="middle" fontSize="10" fill="#78350f">查询缓存 · 日志（binlog）</text>
      <text x="400" y="227" textAnchor="middle" fontSize="10" fill="#78350f">视图 · 触发器 · 存储过程</text>

      {/* 存储引擎接口 */}
      <rect x="250" y="245" width="300" height="70" rx="8" fill="url(#mse-basics-engine)" opacity="0.2" stroke="#d97706" strokeWidth="1" />
      <text x="400" y="265" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">存储引擎接口</text>
      <text x="400" y="285" textAnchor="middle" fontSize="10" fill="#78350f">InnoDB · MyISAM · Memory</text>
      <text x="400" y="302" textAnchor="middle" fontSize="10" fill="#78350f">CSV · Archive · NDB</text>

      {/* 文件系统 */}
      <rect x="250" y="320" width="300" height="35" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
      <text x="400" y="342" textAnchor="middle" fontSize="11" fill="#475569">文件系统 &amp; 磁盘（.ibd / .frm / redo / undo）</text>

      {/* 存储引擎对比 */}
      <rect x="600" y="50" width="180" height="280" rx="10" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="690" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">存储引擎对比</text>
      <line x1="620" y1="80" x2="760" y2="80" stroke="#c4b5fd" strokeWidth="1" />
      <text x="690" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">InnoDB</text>
      <text x="690" y="118" textAnchor="middle" fontSize="10" fill="#6d28d9">事务 · 行锁 · 外键</text>
      <text x="690" y="133" textAnchor="middle" fontSize="10" fill="#6d28d9">MVCC · 崩溃恢复</text>
      <text x="690" y="148" textAnchor="middle" fontSize="10" fill="#6d28d9">默认引擎（5.5+）</text>
      <line x1="620" y1="160" x2="760" y2="160" stroke="#c4b5fd" strokeWidth="1" />
      <text x="690" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">MyISAM</text>
      <text x="690" y="198" textAnchor="middle" fontSize="10" fill="#6d28d9">表锁 · 全文索引</text>
      <text x="690" y="213" textAnchor="middle" fontSize="10" fill="#6d28d9">无事务 · 无外键</text>
      <text x="690" y="228" textAnchor="middle" fontSize="10" fill="#6d28d9">读密集场景</text>
      <line x1="620" y1="240" x2="760" y2="240" stroke="#c4b5fd" strokeWidth="1" />
      <text x="690" y="260" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">Memory</text>
      <text x="690" y="278" textAnchor="middle" fontSize="10" fill="#6d28d9">全内存 · 哈希索引</text>
      <text x="690" y="293" textAnchor="middle" fontSize="10" fill="#6d28d9">重启丢失 · 临时表</text>
      <text x="690" y="312" textAnchor="middle" fontSize="10" fill="#9333ea">选型：OLTP用InnoDB</text>

      {/* 数据类型速查 */}
      <rect x="30" y="210" width="150" height="120" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="105" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">常用数据类型</text>
      <text x="105" y="252" textAnchor="middle" fontSize="10" fill="#047857">INT / BIGINT</text>
      <text x="105" y="268" textAnchor="middle" fontSize="10" fill="#047857">VARCHAR(n) / CHAR</text>
      <text x="105" y="284" textAnchor="middle" fontSize="10" fill="#047857">TEXT / BLOB</text>
      <text x="105" y="300" textAnchor="middle" fontSize="10" fill="#047857">DATE / DATETIME</text>
      <text x="105" y="316" textAnchor="middle" fontSize="10" fill="#047857">DECIMAL(p,s)</text>

      {/* 库表操作 */}
      <rect x="30" y="350" width="750" height="130" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="372" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">核心 DDL 操作速查</text>
      <text x="50" y="394" fontSize="11" fill="#78350f" fontFamily="monospace">CREATE DATABASE shop;  USE shop;</text>
      <text x="50" y="412" fontSize="11" fill="#78350f" fontFamily="monospace">CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT,</text>
      <text x="50" y="430" fontSize="11" fill="#78350f" fontFamily="monospace">  name VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE,</text>
      <text x="50" y="448" fontSize="11" fill="#78350f" fontFamily="monospace">  age INT DEFAULT 0, created_at DATETIME DEFAULT NOW());</text>
      <text x="50" y="466" fontSize="11" fill="#78350f" fontFamily="monospace">ALTER TABLE users ADD COLUMN phone VARCHAR(20);  DROP TABLE users;</text>
    </svg>
  );
}
