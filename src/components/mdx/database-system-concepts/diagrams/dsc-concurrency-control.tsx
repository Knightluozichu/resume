"use client";

export function DscConcurrencyControlDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="并发控制机制">
      <defs>
        <linearGradient id="dsc-cc-lock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="dsc-cc-ts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="dsc-cc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">并发控制 · 机制总览</text>

      {/* 锁类型相容性矩阵 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">锁类型与相容性</text>
      <rect x="40" y="70" width="320" height="30" fill="url(#dsc-cc-lock)" />
      <text x="120" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">请求 \ 持有</text>
      <text x="220" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">共享 S</text>
      <text x="310" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">排他 X</text>
      <rect x="40" y="100" width="320" height="28" fill="#d1fae5" stroke="#6ee7b7" />
      <text x="120" y="119" textAnchor="middle" fontSize="11" fontWeight="700" fill="#047857">共享 S（读）</text>
      <text x="220" y="119" textAnchor="middle" fontSize="12" fill="#059669">✓ 相容</text>
      <text x="310" y="119" textAnchor="middle" fontSize="12" fill="#dc2626">✗ 冲突</text>
      <rect x="40" y="128" width="320" height="28" fill="#fff" stroke="#6ee7b7" />
      <text x="120" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#047857">排他 X（写）</text>
      <text x="220" y="147" textAnchor="middle" fontSize="12" fill="#dc2626">✗ 冲突</text>
      <text x="310" y="147" textAnchor="middle" fontSize="12" fill="#dc2626">✗ 冲突</text>
      <text x="200" y="178" textAnchor="middle" fontSize="11" fill="#64748b">读读共享，读写/写写互斥</text>

      {/* 2PL */}
      <rect x="40" y="195" width="320" height="90" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="200" y="218" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">两阶段封锁 2PL</text>
      <text x="200" y="240" textAnchor="middle" fontSize="11" fill="#155e75">增长阶段：只加锁</text>
      <text x="200" y="258" textAnchor="middle" fontSize="11" fill="#155e75">收缩阶段：只解锁</text>
      <text x="200" y="278" textAnchor="middle" fontSize="11" fill="#92400e">严格2PL：X锁持有到事务结束（避免级联中止）</text>

      {/* 死锁 */}
      <rect x="40" y="300" width="320" height="80" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="200" y="323" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">死锁 Deadlock</text>
      <text x="200" y="345" textAnchor="middle" fontSize="11" fill="#991b1b">T1 持有 A 等 B，T2 持有 B 等 A</text>
      <text x="200" y="365" textAnchor="middle" fontSize="11" fill="#991b1b">处理：预防（加锁序）/ 检测（等待图有环）/ 超时回滚</text>

      {/* 时间戳与 MVCC */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">时间戳与多版本</text>
      <rect x="430" y="70" width="330" height="80" rx="10" fill="url(#dsc-cc-ts)" />
      <text x="595" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">时间戳排序 TS Ordering</text>
      <text x="595" y="115" textAnchor="middle" fontSize="11" fill="#cffafe">每事务分配唯一时间戳</text>
      <text x="595" y="133" textAnchor="middle" fontSize="11" fill="#cffafe">老事务优先；冲突时回滚年轻事务重启</text>

      <rect x="430" y="160" width="330" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="184" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">多版本并发控制 MVCC</text>
      <text x="595" y="206" textAnchor="middle" fontSize="11" fill="#78350f">每行存多个版本（带版本号）</text>
      <text x="595" y="224" textAnchor="middle" fontSize="11" fill="#78350f">读不阻塞写，写不阻塞读</text>
      <text x="595" y="242" textAnchor="middle" fontSize="11" fill="#78350f">快照隔离 SI：事务看到一致性快照</text>

      <rect x="430" y="260" width="330" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="595" y="284" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">乐观并发控制 OCC</text>
      <text x="595" y="305" textAnchor="middle" fontSize="11" fill="#6d28d9">读阶段无锁 → 校验阶段检测冲突</text>
      <text x="595" y="323" textAnchor="middle" fontSize="11" fill="#6d28d9">→ 写阶段提交；冲突则回滚重启</text>

      <rect x="430" y="350" width="330" height="50" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="595" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">验证机制</text>
      <text x="595" y="390" textAnchor="middle" fontSize="11" fill="#047857">有效性检查 / 冲突可串行化检测</text>

      {/* 对比 */}
      <rect x="40" y="400" width="720" height="140" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="423" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三类并发控制协议对比</text>
      <text x="400" y="446" textAnchor="middle" fontSize="11" fill="#047857">封锁 2PL：悲观，读阻塞写，强一致但并发低，需处理死锁</text>
      <text x="400" y="466" textAnchor="middle" fontSize="11" fill="#92400e">MVCC：多版本快照，读写不互斥，高并发读为主，主流数据库采用</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#6d28d9">乐观 OCC：假设冲突少，无锁读，冲突多则回滚开销大</text>
      <text x="400" y="516" textAnchor="middle" fontSize="11" fill="#0e7490">目标：在正确性（可串行化）与性能（并发度）间权衡</text>
      <text x="400" y="534" textAnchor="middle" fontSize="11" fill="#64748b">写偏斜异常：SI 下仍可能出现，仅可串行化能完全消除</text>
    </svg>
  );
}
