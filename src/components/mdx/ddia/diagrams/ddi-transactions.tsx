"use client";

export function DdiTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="事务">
      <defs>
        <linearGradient id="ddi-tx-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="ddi-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">事务 · 隔离级别与并发问题</text>

      {/* ACID */}
      <rect x="30" y="50" width="740" height="70" rx="12" fill="url(#ddi-tx-grad)" opacity="0.95" />
      <text x="400" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">ACID 四特性</text>
      <text x="140" y="100" textAnchor="middle" fontSize="12" fill="#fef3c7">A 原子性</text>
      <text x="330" y="100" textAnchor="middle" fontSize="12" fill="#fef3c7">C 一致性</text>
      <text x="520" y="100" textAnchor="middle" fontSize="12" fill="#fef3c7">I 隔离性</text>
      <text x="690" y="100" textAnchor="middle" fontSize="12" fill="#fef3c7">D 持久性</text>

      {/* 并发问题（从弱到强） */}
      <text x="400" y="145" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">并发异常与隔离级别（从弱到强）</text>

      <rect x="30" y="160" width="180" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="120" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">脏读</text>
      <text x="120" y="203" textAnchor="middle" fontSize="10" fill="#7f1d1d">读到未提交的数据</text>
      <text x="120" y="220" textAnchor="middle" fontSize="10" fill="#7f1d1d">→ 读未提交解决</text>

      <rect x="220" y="160" width="180" height="70" rx="8" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
      <text x="310" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">脏写</text>
      <text x="310" y="203" textAnchor="middle" fontSize="10" fill="#7c2d12">覆盖未提交的写入</text>
      <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#7c2d12">→ 读已提交解决</text>

      <rect x="410" y="160" width="180" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">读倾斜/不可重复读</text>
      <text x="500" y="203" textAnchor="middle" fontSize="10" fill="#78350f">同一事务两次读不同</text>
      <text x="500" y="220" textAnchor="middle" fontSize="10" fill="#78350f">→ 快照隔离解决</text>

      <rect x="600" y="160" width="170" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" />
      <text x="685" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill="#854d0e">更新丢失</text>
      <text x="685" y="203" textAnchor="middle" fontSize="10" fill="#713f12">读-改-写竞争</text>
      <text x="685" y="220" textAnchor="middle" fontSize="10" fill="#713f12">→ 原子写/CAS/显式锁</text>

      {/* 第二行并发问题 */}
      <rect x="30" y="245" width="240" height="70" rx="8" fill="#fef3c7" stroke="#eab308" strokeWidth="1.5" />
      <text x="150" y="268" textAnchor="middle" fontSize="11" fontWeight="700" fill="#854d0e">写倾斜（Write Skew）</text>
      <text x="150" y="288" textAnchor="middle" fontSize="10" fill="#713f12">事务读前提被另一事务改变</text>
      <text x="150" y="305" textAnchor="middle" fontSize="10" fill="#713f12">→ 快照隔离无法防止</text>

      <rect x="280" y="245" width="240" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="400" y="268" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">幻读</text>
      <text x="400" y="288" textAnchor="middle" fontSize="10" fill="#1e3a8a">事务查询条件匹配行变化</text>
      <text x="400" y="305" textAnchor="middle" fontSize="10" fill="#1e3a8a">→ 序列化隔离解决</text>

      <rect x="530" y="245" width="240" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="650" y="268" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">写倾斜 vs 幻读</text>
      <text x="650" y="288" textAnchor="middle" fontSize="10" fill="#1e3a8a">写倾斜：固定行集合</text>
      <text x="650" y="305" textAnchor="middle" fontSize="10" fill="#1e3a8a">幻读：行集合变化</text>

      {/* 隔离级别阶梯 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">隔离级别阶梯（实现机制）</text>

      <rect x="30" y="355" width="740" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="378" fontSize="11" fontWeight="700" fill="#334155">读未提交</text>
      <text x="60" y="395" fontSize="10" fill="#64748b">无锁，可能脏读</text>
      <path d="M170 385 L200 385" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-tx-arrow)" />

      <text x="210" y="378" fontSize="11" fontWeight="700" fill="#334155">读已提交</text>
      <text x="210" y="395" fontSize="10" fill="#64748b">行级锁 + 可见性判断</text>
      <path d="M320 385 L350 385" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-tx-arrow)" />

      <text x="360" y="378" fontSize="11" fontWeight="700" fill="#334155">快照隔离（SI）</text>
      <text x="360" y="395" fontSize="10" fill="#64748b">MVCC 多版本并发控制</text>
      <path d="M480 385 L510 385" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ddi-tx-arrow)" />

      <text x="520" y="378" fontSize="11" fontWeight="700" fill="#334155">可序列化（Serializable）</text>
      <text x="520" y="395" fontSize="10" fill="#64748b">SSI / 2PL / 实际串行</text>

      <text x="400" y="425" textAnchor="middle" fontSize="11" fill="#475569">可序列化实现方式：① 实际串行执行（单线程）② 两阶段锁定（2PL）③ 可序列化快照隔离（SSI）</text>
      <text x="400" y="445" textAnchor="middle" fontSize="11" fill="#475569">SSI = 快照隔离 + 写倾斜检测（追踪事务读写依赖），乐观方案，性能优于 2PL</text>

      {/* 分布式事务 */}
      <rect x="30" y="490" width="740" height="75" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="513" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">分布式事务挑战</text>
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#78350f">跨分区事务 → 两阶段提交（2PC） → 但 2PC 阻塞、协调者单点</text>
      <text x="400" y="552" textAnchor="middle" fontSize="11" fill="#92400e">→ 一致性与共识章节解决：Raft / Paxos 共识算法</text>
    </svg>
  );
}
