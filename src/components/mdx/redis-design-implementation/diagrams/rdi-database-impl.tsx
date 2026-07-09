"use client";

export function RdiDatabaseImplDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis数据库实现机制">
      <defs>
        <linearGradient id="rdi-db-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rdi-db-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 数据库实现 · 键空间与过期</text>

      {/* 键空间 */}
      <rect x="20" y="50" width="360" height="160" rx="12" fill="url(#rdi-db-grad)" opacity="0.95" />
      <text x="200" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">redisDb 键空间</text>
      <line x1="40" y1="85" x2="360" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="200" y="105" textAnchor="middle" fontSize="11" fill="#fef3c7">dict *dict（键 → 值对象）</text>
      <text x="200" y="125" textAnchor="middle" fontSize="11" fill="#fef3c7">dict *expires（键 → 过期时间）</text>
      <text x="200" y="148" textAnchor="middle" fontSize="10" fill="#fde68a">每个数据库独立隔离（select 切换）</text>
      <text x="200" y="168" textAnchor="middle" fontSize="10" fill="#fde68a">读写操作维护键的 LRU 时钟</text>
      <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#fcd34d">FLUSHDB / FLUSHALL / DBSIZE</text>

      {/* 过期字典 */}
      <rect x="420" y="50" width="360" height="160" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="600" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">expires 过期字典</text>
      <line x1="440" y1="85" x2="760" y2="85" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      <text x="600" y="105" textAnchor="middle" fontSize="11" fill="#78350f">EXPIRE / PEXPIRE / EXPIREAT</text>
      <text x="600" y="125" textAnchor="middle" fontSize="11" fill="#78350f">TTL / PTTL 查看剩余时间</text>
      <text x="600" y="148" textAnchor="middle" fontSize="10" fill="#92400e">PERSIST 移除过期</text>
      <text x="600" y="168" textAnchor="middle" fontSize="10" fill="#92400e">过期键指针指向 dict 中的键</text>
      <text x="600" y="190" textAnchor="middle" fontSize="10" fill="#b45309">过期时间 = ms 时间戳</text>

      {/* 过期删除策略 */}
      <text x="400" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种过期删除策略</text>

      <rect x="20" y="255" width="240" height="120" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="140" y="278" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">定时删除</text>
      <text x="140" y="300" textAnchor="middle" fontSize="10" fill="#991b1b">每个键创建定时器</text>
      <text x="140" y="318" textAnchor="middle" fontSize="10" fill="#991b1b">到时自动删除</text>
      <text x="140" y="340" textAnchor="middle" fontSize="9" fill="#dc382d">优点：内存友好</text>
      <text x="140" y="358" textAnchor="middle" fontSize="9" fill="#dc382d">缺点：CPU 不友好（大量定时器）</text>

      <rect x="280" y="255" width="240" height="120" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="278" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">惰性删除</text>
      <text x="400" y="300" textAnchor="middle" fontSize="10" fill="#155e75">访问键时检查是否过期</text>
      <text x="400" y="318" textAnchor="middle" fontSize="10" fill="#155e75">过期则删除返回 nil</text>
      <text x="400" y="340" textAnchor="middle" fontSize="9" fill="#0891b2">优点：CPU 友好</text>
      <text x="400" y="358" textAnchor="middle" fontSize="9" fill="#0891b2">缺点：内存不友好（不访问不删）</text>

      <rect x="540" y="255" width="240" height="120" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="660" y="278" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">定期删除</text>
      <text x="660" y="300" textAnchor="middle" fontSize="10" fill="#14532d">每隔一段时间随机抽查</text>
      <text x="660" y="318" textAnchor="middle" fontSize="10" fill="#14532d">删除过期的键</text>
      <text x="660" y="340" textAnchor="middle" fontSize="9" fill="#16a34a">优点：平衡 CPU 和内存</text>
      <text x="660" y="358" textAnchor="middle" fontSize="9" fill="#16a34a">缺点：策略调优复杂</text>

      {/* Redis 实际策略 */}
      <rect x="20" y="390" width="760" height="70" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="413" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Redis 实际策略：惰性删除 + 定期删除</text>
      <text x="400" y="436" textAnchor="middle" fontSize="11" fill="#475569">expireIfNeeded()（读/写前检查）+ activeExpireCycle()（serverCron 周期执行）</text>
      <text x="400" y="454" textAnchor="middle" fontSize="10" fill="#64748b">配合 maxmemory + 淘汰策略（noeviction/allkeys-lru/volatile-lru/allkeys-lfu...）兜底</text>

      {/* RDB/AOF 中的过期键处理 */}
      <rect x="20" y="475" width="360" height="85" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="200" y="498" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">过期键在 RDB 中</text>
      <text x="200" y="520" textAnchor="middle" fontSize="10" fill="#5b21b6">SAVE/BGSAVE：过期键不写入新 RDB</text>
      <text x="200" y="540" textAnchor="middle" fontSize="10" fill="#5b21b6">载入：Master 过滤 / Slave 不过滤</text>

      <rect x="420" y="475" width="360" height="85" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="600" y="498" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">过期键在 AOF 中</text>
      <text x="600" y="520" textAnchor="middle" fontSize="10" fill="#991b1b">写入：过期键被删除时追加 DEL 命令</text>
      <text x="600" y="540" textAnchor="middle" fontSize="10" fill="#991b1b">重写：过期键不写入新 AOF</text>
    </svg>
  );
}
