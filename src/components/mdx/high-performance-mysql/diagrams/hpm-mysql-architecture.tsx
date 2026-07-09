"use client";

export function HpmMysqlArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="MySQL架构分层">
      <defs>
        <linearGradient id="hpm-arc-conn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hpm-arc-sql" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hpm-arc-engine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hpm-arc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">MySQL 架构 · 三层模型</text>

      {/* 连接层 */}
      <rect x="40" y="50" width="720" height="80" rx="10" fill="url(#hpm-arc-conn)" opacity="0.95" />
      <text x="60" y="75" fontSize="14" fontWeight="700" fill="#fff">连接层 Connectors</text>
      <text x="60" y="95" fontSize="11" fill="#cffafe">客户端连接 / 连接池 / 认证授权 / 线程管理</text>
      <text x="60" y="115" fontSize="11" fill="#a5f3fc">每个连接对应一个线程；连接池复用线程避免频繁创建销毁</text>

      <path d="M400 130 L400 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-arc-arrow)" />

      {/* SQL层 */}
      <rect x="40" y="150" width="720" height="170" rx="10" fill="url(#hpm-arc-sql)" opacity="0.95" />
      <text x="60" y="175" fontSize="14" fontWeight="700" fill="#fff">SQL 层 MySQL Server</text>

      <rect x="60" y="188" width="155" height="55" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="137" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">查询缓存</text>
      <text x="137" y="226" textAnchor="middle" fontSize="10" fill="#78350f">Query Cache（8.0移除）</text>
      <text x="137" y="239" textAnchor="middle" fontSize="10" fill="#78350f">命中率低易失效</text>

      <rect x="225" y="188" width="155" height="55" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="302" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">解析器 Parser</text>
      <text x="302" y="226" textAnchor="middle" fontSize="10" fill="#78350f">词法/语法分析</text>
      <text x="302" y="239" textAnchor="middle" fontSize="10" fill="#78350f">生成解析树</text>

      <rect x="390" y="188" width="155" height="55" rx="6" fill="#fef3c7" stroke="#f59e0b" />
      <text x="467" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">预处理器</text>
      <text x="467" y="226" textAnchor="middle" fontSize="10" fill="#78350f">语义检查</text>
      <text x="467" y="239" textAnchor="middle" fontSize="10" fill="#78350f">权限校验</text>

      <rect x="555" y="188" width="185" height="55" rx="6" fill="#fcd34d" stroke="#d97706" />
      <text x="647" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7c2d12">查询优化器 Optimizer</text>
      <text x="647" y="226" textAnchor="middle" fontSize="10" fill="#78350f">选执行计划/成本估算</text>
      <text x="647" y="239" textAnchor="middle" fontSize="10" fill="#78350f">核心组件</text>

      <text x="400" y="268" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SQL 执行流水线</text>
      <text x="400" y="288" textAnchor="middle" fontSize="11" fill="#fef3c7">客户端 → 查询缓存 → 解析 → 预处理 → 优化 → 执行器</text>
      <text x="400" y="308" textAnchor="middle" fontSize="11" fill="#fde68a">执行器调用存储引擎 API 完成读写；binlog 在执行器层写入</text>

      <path d="M400 320 L400 335" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-arc-arrow)" />

      {/* 存储引擎层 */}
      <rect x="40" y="340" width="720" height="200" rx="10" fill="url(#hpm-arc-engine)" opacity="0.95" />
      <text x="60" y="365" fontSize="14" fontWeight="700" fill="#fff">存储引擎层 Pluggable Storage Engines</text>

      <rect x="60" y="380" width="165" height="145" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="142" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">InnoDB</text>
      <text x="142" y="420" textAnchor="middle" fontSize="10" fill="#5b21b6">默认引擎（5.5+）</text>
      <text x="142" y="438" textAnchor="middle" fontSize="10" fill="#6d28d9">事务 / 行锁 / MVCC</text>
      <text x="142" y="455" textAnchor="middle" fontSize="10" fill="#6d28d9">聚簇索引 / 外键</text>
      <text x="142" y="472" textAnchor="middle" fontSize="10" fill="#6d28d9">崩溃恢复 / Redo Log</text>
      <text x="142" y="498" textAnchor="middle" fontSize="10" fill="#7c3aed">OLTP 首选</text>

      <rect x="235" y="380" width="155" height="145" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="312" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">MyISAM</text>
      <text x="312" y="420" textAnchor="middle" fontSize="10" fill="#5b21b6">早期默认引擎</text>
      <text x="312" y="438" textAnchor="middle" fontSize="10" fill="#6d28d9">表锁 / 无事务</text>
      <text x="312" y="455" textAnchor="middle" fontSize="10" fill="#6d28d9">全文索引 / 压缩</text>
      <text x="312" y="472" textAnchor="middle" fontSize="10" fill="#6d28d9">非聚簇索引</text>
      <text x="312" y="498" textAnchor="middle" fontSize="10" fill="#7c3aed">只读/归档</text>

      <rect x="400" y="380" width="155" height="145" rx="6" fill="#ede9fe" stroke="#8b5cf6" />
      <text x="477" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">Memory</text>
      <text x="477" y="420" textAnchor="middle" fontSize="10" fill="#5b21b6">内存表</text>
      <text x="477" y="438" textAnchor="middle" fontSize="10" fill="#6d28d9">哈希索引 / 极快</text>
      <text x="477" y="455" textAnchor="middle" fontSize="10" fill="#6d28d9">表锁 / 无持久化</text>
      <text x="477" y="472" textAnchor="middle" fontSize="10" fill="#6d28d9">重启丢数据</text>
      <text x="477" y="498" textAnchor="middle" fontSize="10" fill="#7c3aed">临时/缓存</text>

      <rect x="565" y="380" width="175" height="145" rx="6" fill="#c4b5fd" stroke="#6d28d9" />
      <text x="652" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">插件式架构</text>
      <text x="652" y="420" textAnchor="middle" fontSize="10" fill="#5b21b6">Archive / CSV</text>
      <text x="652" y="438" textAnchor="middle" fontSize="10" fill="#5b21b6">NDB Cluster</text>
      <text x="652" y="455" textAnchor="middle" fontSize="10" fill="#5b21b6">RocksDB / TokuDB</text>
      <text x="652" y="472" textAnchor="middle" fontSize="10" fill="#5b21b6">按表选引擎</text>
      <text x="652" y="498" textAnchor="middle" fontSize="10" fill="#6d28d9">SHOW ENGINES</text>
    </svg>
  );
}
