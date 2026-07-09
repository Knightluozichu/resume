"use client";

export function RdiFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis设计与实现全书知识图谱">
      <defs>
        <linearGradient id="rdi-fr-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="rdi-fr-obj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rdi-fr-db" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rdi-fr-dist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rdi-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis设计与实现 · 全书知识图谱</text>

      {/* 中心节点 */}
      <circle cx="400" cy="160" r="55" fill="url(#rdi-fr-base)" opacity="0.95" />
      <text x="400" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Redis</text>
      <text x="400" y="173" textAnchor="middle" fontSize="11" fill="#fecaca">设计与实现</text>

      {/* 四大模块辐射 */}
      {/* 数据结构 */}
      <rect x="30" y="240" width="170" height="120" rx="10" fill="url(#rdi-fr-base)" opacity="0.90" />
      <text x="115" y="265" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据结构</text>
      <line x1="45" y1="275" x2="185" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="115" y="295" textAnchor="middle" fontSize="9" fill="#fecaca">SDS / 链表 / 字典</text>
      <text x="115" y="312" textAnchor="middle" fontSize="9" fill="#fecaca">跳跃表 / intset / ziplist</text>
      <text x="115" y="332" textAnchor="middle" fontSize="9" fill="#fca5a5">渐进式 rehash</text>
      <text x="115" y="350" textAnchor="middle" fontSize="9" fill="#fca5a5">O(1)/O(logN) 复杂度</text>
      <path d="M370 160 L180 240" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-fr-arrow)" />

      {/* 对象系统 */}
      <rect x="220" y="240" width="170" height="120" rx="10" fill="url(#rdi-fr-obj)" opacity="0.90" />
      <text x="305" y="265" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">对象系统</text>
      <line x1="235" y1="275" x2="375" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="305" y="295" textAnchor="middle" fontSize="9" fill="#cffafe">string/list/hash/set/zset</text>
      <text x="305" y="312" textAnchor="middle" fontSize="9" fill="#cffafe">多编码 + 编码转换</text>
      <text x="305" y="332" textAnchor="middle" fontSize="9" fill="#a5f3fc">引用计数 / 对象共享</text>
      <text x="305" y="350" textAnchor="middle" fontSize="9" fill="#a5f3fc">LRU/LFU 淘汰策略</text>
      <path d="M390 200 L305 240" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-fr-arrow)" />

      {/* 数据库机制 */}
      <rect x="410" y="240" width="170" height="120" rx="10" fill="url(#rdi-fr-db)" opacity="0.90" />
      <text x="495" y="265" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据库机制</text>
      <line x1="425" y1="275" x2="565" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="495" y="295" textAnchor="middle" fontSize="9" fill="#fef3c7">键空间 / 过期删除</text>
      <text x="495" y="312" textAnchor="middle" fontSize="9" fill="#fef3c7">RDB / AOF 持久化</text>
      <text x="495" y="332" textAnchor="middle" fontSize="9" fill="#fde68a">事件驱动 / 事务 / Lua</text>
      <text x="495" y="350" textAnchor="middle" fontSize="9" fill="#fde68a">发布订阅 / 通知</text>
      <path d="M410 200 L495 240" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-fr-arrow)" />

      {/* 分布式高可用 */}
      <rect x="600" y="240" width="170" height="120" rx="10" fill="url(#rdi-fr-dist)" opacity="0.90" />
      <text x="685" y="265" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">分布式高可用</text>
      <line x1="615" y1="275" x2="755" y2="275" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="685" y="295" textAnchor="middle" fontSize="9" fill="#ede9fe">主从复制 / PSYNC</text>
      <text x="685" y="312" textAnchor="middle" fontSize="9" fill="#ede9fe">Sentinel 哨兵</text>
      <text x="685" y="332" textAnchor="middle" fontSize="9" fill="#ddd6fe">Cluster 集群 / 16384 槽</text>
      <text x="685" y="350" textAnchor="middle" fontSize="9" fill="#ddd6fe">故障转移 / Gossip</text>
      <path d="M430 160 L620 240" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-fr-arrow)" />

      {/* 知识串联 */}
      <rect x="20" y="380" width="760" height="185" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="405" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">知识串联：从底层数据结构到分布式高可用</text>

      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">数据结构 → 对象编码（SDS→string, skiplist+dict→zset, ziplist→小数据压缩）</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">对象系统 → 数据库键空间（redisDb.dict 存储所有键值对对象）</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">数据库 → 持久化（RDB快照/AOF追加 → 磁盘恢复 → 复制传输）</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569">事件驱动 → 单线程模型（文件事件I/O + 时间事件serverCron 统一调度）</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#475569">复制 → 哨兵/集群（主从复制是基础 → Sentinel 高可用 → Cluster 水平扩展）</text>
      <text x="400" y="535" textAnchor="middle" fontSize="10" fill="#64748b">核心设计哲学：内存中用最优数据结构实现KV存储 · 单线程事件驱动避免锁竞争 · 多进程fork利用COW</text>
      <text x="400" y="555" textAnchor="middle" fontSize="10" fill="#64748b">性能基石：纯内存 + 高效数据结构 + 单线程无锁 + I/O多路复用 = 10万+ QPS</text>
    </svg>
  );
}
