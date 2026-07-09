"use client";

export function HpmFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="高性能MySQL全书知识图谱">
      <defs>
        <linearGradient id="hpm-fr-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hpm-fr-perf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hpm-fr-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="hpm-fr-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高性能MySQL · 四层知识图谱</text>

      {/* 四层 */}
      <rect x="20" y="50" width="760" height="90" rx="10" fill="url(#hpm-fr-arch)" opacity="0.95" />
      <text x="40" y="75" fontSize="14" fontWeight="700" fill="#fff">第一层：架构理解</text>
      <text x="40" y="97" fontSize="11" fill="#cffafe">连接层 / SQL 层 / 存储引擎层 · InnoDB 事务锁 MVCC</text>
      <text x="40" y="117" fontSize="11" fill="#a5f3fc">核心问题：MySQL 内部如何分层？引擎如何插拔？</text>
      <text x="40" y="134" fontSize="11" fill="#67e8f9">章节：学习地图 → MySQL架构</text>

      <rect x="20" y="150" width="760" height="90" rx="10" fill="url(#hpm-fr-perf)" opacity="0.95" />
      <text x="40" y="175" fontSize="14" fontWeight="700" fill="#fff">第二层：性能优化</text>
      <text x="40" y="197" fontSize="11" fill="#fef3c7">B+树/聚簇/覆盖/最左前缀 · EXPLAIN/执行计划 · Schema/数据类型</text>
      <text x="40" y="217" fontSize="11" fill="#fde68a">核心问题：单机查询怎么跑得快？</text>
      <text x="40" y="234" fontSize="11" fill="#fcd34d">章节：索引设计 → 查询优化 → Schema设计</text>

      <rect x="20" y="250" width="760" height="90" rx="10" fill="url(#hpm-fr-scale)" opacity="0.95" />
      <text x="40" y="275" fontSize="14" fontWeight="700" fill="#fff">第三层：扩展高可用</text>
      <text x="40" y="297" fontSize="11" fill="#ede9fe">binlog 复制 · 读写分离/分片 · 故障切换/负载均衡</text>
      <text x="40" y="317" fontSize="11" fill="#ddd6fe">核心问题：系统怎么撑得住？怎么不宕机？</text>
      <text x="40" y="334" fontSize="11" fill="#c4b5fd">章节：复制 → 扩展高可用</text>

      <rect x="20" y="350" width="760" height="90" rx="10" fill="url(#hpm-fr-ops)" opacity="0.95" />
      <text x="40" y="375" fontSize="14" fontWeight="700" fill="#fff">第四层：运维保障</text>
      <text x="40" y="397" fontSize="11" fill="#d1fae5">CPU/内存/磁盘/网络 · 缓冲池/刷盘策略 · Performance Schema/慢日志</text>
      <text x="40" y="417" fontSize="11" fill="#a7f3d0">核心问题：系统怎么稳得住？出问题怎么查？</text>
      <text x="40" y="434" fontSize="11" fill="#6ee7b7">章节：OS调优 → 监控诊断</text>

      {/* 脉络 */}
      <rect x="20" y="455" width="760" height="85" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">全书核心脉络</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">高性能MySQL = 架构理解 + 性能优化 + 扩展高可用 + 运维保障</text>
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#475569">懂架构 → 会优化（索引/查询/Schema）→ 能扩展（复制/分片）→ 稳运维（OS/监控）</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#6d28d9">两条主线交汇：Schema+复制 决定数据分布，OS+监控 决定运行质量</text>
    </svg>
  );
}
