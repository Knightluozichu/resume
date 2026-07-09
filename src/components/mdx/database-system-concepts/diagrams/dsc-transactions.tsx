"use client";

export function DscTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="事务管理与ACID特性">
      <defs>
        <linearGradient id="dsc-tx-acid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="dsc-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="dsc-tx-redarrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#ef4444" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">事务管理 · ACID 与状态机</text>

      {/* ACID */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669">ACID 四特性</text>
      <rect x="40" y="70" width="175" height="80" rx="10" fill="url(#dsc-tx-acid)" />
      <text x="127" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">A 原子性</text>
      <text x="127" y="114" textAnchor="middle" fontSize="11" fill="#d1fae5">Atomicity</text>
      <text x="127" y="134" textAnchor="middle" fontSize="10" fill="#a7f3d0">全做或全不做</text>
      <text x="127" y="148" textAnchor="middle" fontSize="10" fill="#a7f3d0">回滚保证</text>

      <rect x="225" y="70" width="175" height="80" rx="10" fill="#34d399" />
      <text x="312" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">C 一致性</text>
      <text x="312" y="114" textAnchor="middle" fontSize="11" fill="#d1fae5">Consistency</text>
      <text x="312" y="134" textAnchor="middle" fontSize="10" fill="#a7f3d0">约束不变</text>
      <text x="312" y="148" textAnchor="middle" fontSize="10" fill="#a7f3d0">由 A/I/D 保证</text>

      <rect x="410" y="70" width="175" height="80" rx="10" fill="#10b981" />
      <text x="497" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">I 隔离性</text>
      <text x="497" y="114" textAnchor="middle" fontSize="11" fill="#d1fae5">Isolation</text>
      <text x="497" y="134" textAnchor="middle" fontSize="10" fill="#a7f3d0">并发互不干扰</text>
      <text x="497" y="148" textAnchor="middle" fontSize="10" fill="#a7f3d0">并发控制负责</text>

      <rect x="595" y="70" width="165" height="80" rx="10" fill="#059669" />
      <text x="677" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">D 持久性</text>
      <text x="677" y="114" textAnchor="middle" fontSize="11" fill="#d1fae5">Durability</text>
      <text x="677" y="134" textAnchor="middle" fontSize="10" fill="#a7f3d0">提交即永久</text>
      <text x="677" y="148" textAnchor="middle" fontSize="10" fill="#a7f3d0">恢复系统保证</text>

      {/* 事务状态机 */}
      <text x="400" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">事务状态机 State Diagram</text>

      <rect x="60" y="205" width="140" height="50" rx="25" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="130" y="235" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">活动 Active</text>

      <rect x="280" y="205" width="160" height="50" rx="25" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="360" y="235" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">部分提交</text>
      <text x="360" y="250" textAnchor="middle" fontSize="10" fill="#92400e">Partially Committed</text>

      <rect x="520" y="205" width="140" height="50" rx="25" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="590" y="235" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">提交 Committed</text>

      <rect x="280" y="310" width="160" height="50" rx="25" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="360" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">失败 Failed</text>

      <rect x="520" y="310" width="140" height="50" rx="25" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">终止 Aborted</text>

      <path d="M200 230 L280 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-tx-arrow)" />
      <text x="240" y="222" textAnchor="middle" fontSize="10" fill="#475569">最后一条语句</text>
      <path d="M440 230 L520 230" stroke="#10b981" strokeWidth="2" markerEnd="url(#dsc-tx-arrow)" />
      <text x="480" y="222" textAnchor="middle" fontSize="10" fill="#059669">提交成功</text>
      <path d="M360 255 L360 310" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dsc-tx-redarrow)" />
      <text x="380" y="285" fontSize="10" fill="#dc2626">失败</text>
      <path d="M130 255 L300 310" stroke="#ef4444" strokeWidth="2" markerEnd="url(#dsc-tx-redarrow)" />
      <text x="180" y="290" fontSize="10" fill="#dc2626">失败</text>
      <path d="M440 335 L520 335" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-tx-arrow)" />
      <text x="480" y="327" textAnchor="middle" fontSize="10" fill="#475569">回滚完成</text>

      {/* 隔离级别 */}
      <rect x="40" y="390" width="370" height="150" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="225" y="413" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四种隔离级别（隔离性由弱到强）</text>
      <text x="225" y="436" textAnchor="middle" fontSize="11" fill="#dc2626">读未提交 → 脏读</text>
      <text x="225" y="456" textAnchor="middle" fontSize="11" fill="#f59e0b">读已提交 → 不可重复读</text>
      <text x="225" y="476" textAnchor="middle" fontSize="11" fill="#0891b2">可重复读 → 幻读</text>
      <text x="225" y="496" textAnchor="middle" fontSize="11" fill="#10b981">可串行化 → 无异常（隔离最强）</text>
      <text x="225" y="524" textAnchor="middle" fontSize="11" fill="#64748b">隔离越强一致性越高但并发越低</text>

      {/* 可串行化 */}
      <rect x="430" y="390" width="330" height="150" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="595" y="413" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">可串行化 Serializability</text>
      <text x="595" y="436" textAnchor="middle" fontSize="11" fill="#047857">并发执行结果 = 某串行执行结果</text>
      <text x="595" y="458" textAnchor="middle" fontSize="11" fill="#0f172a">冲突可串行化：优先图无环</text>
      <text x="595" y="478" textAnchor="middle" fontSize="11" fill="#0f172a">视图可串行化：更宽松但难检测</text>
      <text x="595" y="508" textAnchor="middle" fontSize="11" fill="#64748b">并发控制的目标即实现可串行化</text>
      <text x="595" y="528" textAnchor="middle" fontSize="11" fill="#64748b">事务是并发控制与恢复的基本单位</text>
    </svg>
  );
}
