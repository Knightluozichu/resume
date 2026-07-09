"use client";

export function MseTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="事务ACID与隔离级别锁机制">
      <defs>
        <linearGradient id="mse-tx-acid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-tx-iso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mse-tx-lock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mse-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">事务 ACID · 隔离级别 · 锁机制</text>

      {/* ACID */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">ACID 四大特性</text>

      <rect x="20" y="70" width="185" height="100" rx="10" fill="url(#mse-tx-acid)" opacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="112" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">A 原子性</text>
      <text x="112" y="112" textAnchor="middle" fontSize="10" fill="#1e3a8a">Atomicity</text>
      <text x="112" y="132" textAnchor="middle" fontSize="10" fill="#1e3a8a">全部成功或全部回滚</text>
      <text x="112" y="152" textAnchor="middle" fontSize="10" fill="#3730a3">靠 undo log 实现</text>

      <rect x="215" y="70" width="185" height="100" rx="10" fill="url(#mse-tx-acid)" opacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="307" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">C 一致性</text>
      <text x="307" y="112" textAnchor="middle" fontSize="10" fill="#1e3a8a">Consistency</text>
      <text x="307" y="132" textAnchor="middle" fontSize="10" fill="#1e3a8a">事务前后数据合法</text>
      <text x="307" y="152" textAnchor="middle" fontSize="10" fill="#3730a3">由 A/I/D 共同保证</text>

      <rect x="410" y="70" width="185" height="100" rx="10" fill="url(#mse-tx-acid)" opacity="0.25" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="502" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">I 隔离性</text>
      <text x="502" y="112" textAnchor="middle" fontSize="10" fill="#1e3a8a">Isolation</text>
      <text x="502" y="132" textAnchor="middle" fontSize="10" fill="#1e3a8a">并发事务互不干扰</text>
      <text x="502" y="152" textAnchor="middle" fontSize="10" fill="#3730a3">靠锁 + MVCC 实现</text>

      <rect x="605" y="70" width="175" height="100" rx="10" fill="url(#mse-tx-acid)" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="692" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">D 持久性</text>
      <text x="692" y="112" textAnchor="middle" fontSize="10" fill="#1e3a8a">Durability</text>
      <text x="692" y="132" textAnchor="middle" fontSize="10" fill="#1e3a8a">提交后永久保存</text>
      <text x="692" y="152" textAnchor="middle" fontSize="10" fill="#3730a3">靠 redo log 实现</text>

      {/* 隔离级别 */}
      <text x="400" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四个事务隔离级别（从低到高）</text>

      <rect x="20" y="215" width="185" height="95" rx="8" fill="url(#mse-tx-iso)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="112" y="237" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">读未提交</text>
      <text x="112" y="255" textAnchor="middle" fontSize="10" fill="#78350f">READ UNCOMMITTED</text>
      <text x="112" y="275" textAnchor="middle" fontSize="10" fill="#b45309">脏读 ✗</text>
      <text x="112" y="292" textAnchor="middle" fontSize="10" fill="#b45309">不可重复读 ✗</text>
      <text x="112" y="305" textAnchor="middle" fontSize="10" fill="#b45309">幻读 ✗</text>

      <rect x="215" y="215" width="185" height="95" rx="8" fill="url(#mse-tx-iso)" opacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="307" y="237" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">读已提交</text>
      <text x="307" y="255" textAnchor="middle" fontSize="10" fill="#78350f">READ COMMITTED (RC)</text>
      <text x="307" y="275" textAnchor="middle" fontSize="10" fill="#b45309">脏读 ✓</text>
      <text x="307" y="292" textAnchor="middle" fontSize="10" fill="#b45309">不可重复读 ✗</text>
      <text x="307" y="305" textAnchor="middle" fontSize="10" fill="#b45309">幻读 ✗</text>

      <rect x="410" y="215" width="185" height="95" rx="8" fill="url(#mse-tx-iso)" opacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="502" y="237" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">可重复读</text>
      <text x="502" y="255" textAnchor="middle" fontSize="10" fill="#78350f">REPEATABLE READ (RR)</text>
      <text x="502" y="275" textAnchor="middle" fontSize="10" fill="#059669">脏读 ✓</text>
      <text x="502" y="292" textAnchor="middle" fontSize="10" fill="#059669">不可重复读 ✓</text>
      <text x="502" y="305" textAnchor="middle" fontSize="10" fill="#b45309">幻读 ✗(InnoDB解决)</text>

      <rect x="605" y="215" width="175" height="95" rx="8" fill="url(#mse-tx-iso)" opacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="692" y="237" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">串行化</text>
      <text x="692" y="255" textAnchor="middle" fontSize="10" fill="#78350f">SERIALIZABLE</text>
      <text x="692" y="275" textAnchor="middle" fontSize="10" fill="#059669">脏读 ✓</text>
      <text x="692" y="292" textAnchor="middle" fontSize="10" fill="#059669">不可重复读 ✓</text>
      <text x="692" y="305" textAnchor="middle" fontSize="10" fill="#059669">幻读 ✓（性能最差）</text>

      <text x="400" y="332" textAnchor="middle" fontSize="10" fill="#64748b">InnoDB 默认 RR，通过 MVCC + Next-Key Lock 解决幻读</text>

      {/* MVCC */}
      <rect x="20" y="345" width="380" height="110" rx="10" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="210" y="367" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">MVCC 多版本并发控制</text>
      <text x="40" y="389" fontSize="11" fill="#5b21b6">每行隐藏列： trx_id（事务ID）/ roll_pointer（回滚指针）</text>
      <text x="40" y="407" fontSize="11" fill="#5b21b6">undo log 版本链： 旧版本通过 roll_pointer 串联</text>
      <text x="40" y="425" fontSize="11" fill="#5b21b6">Read View： 事务开始时生成可见性快照</text>
      <text x="40" y="443" fontSize="11" fill="#5b21b6">RC：每次 SELECT 生成新 Read View</text>
      <text x="40" y="461" fontSize="10" fill="#7c3aed">RR：第一次 SELECT 生成，后续复用</text>

      {/* 锁 */}
      <rect x="410" y="345" width="370" height="110" rx="10" fill="url(#mse-tx-lock)" opacity="0.1" stroke="#6d28d9" strokeWidth="1.5" />
      <text x="595" y="367" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">InnoDB 锁体系</text>
      <text x="430" y="389" fontSize="11" fill="#5b21b6">粒度：行锁（默认）/ 表锁 / 间隙锁（Gap Lock）</text>
      <text x="430" y="407" fontSize="11" fill="#5b21b6">模式：共享锁 S（读锁）/ 排他锁 X（写锁）</text>
      <text x="430" y="425" fontSize="11" fill="#5b21b6">Next-Key Lock = Record Lock + Gap Lock</text>
      <text x="430" y="443" fontSize="11" fill="#5b21b6">意向锁 IS/IX：表级标记行锁意向</text>
      <text x="430" y="461" fontSize="10" fill="#7c3aed">死锁：wait-for graph 检测 + 回滚代价小的事务</text>

      {/* 事务语法 */}
      <rect x="20" y="470" width="760" height="95" rx="10" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="492" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">事务控制语句</text>
      <text x="40" y="514" fontSize="11" fill="#047857" fontFamily="monospace">BEGIN;  -- 或 START TRANSACTION 开启事务</text>
      <text x="40" y="532" fontSize="11" fill="#047857" fontFamily="monospace">SAVEPOINT sp1;  -- 设置保存点</text>
      <text x="40" y="550" fontSize="11" fill="#047857" fontFamily="monospace">COMMIT;  -- 提交（持久化）  /  ROLLBACK;  -- 回滚  /  ROLLBACK TO sp1;</text>
    </svg>
  );
}
