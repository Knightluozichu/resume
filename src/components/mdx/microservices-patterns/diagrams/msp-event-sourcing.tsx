"use client";

export function MspEventSourcingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="事件溯源核心原理">
      <defs>
        <linearGradient id="msp-es-event" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="msp-es-snap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="msp-es-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">事件溯源：以事件为事实的架构</text>

      {/* 传统CRUD vs 事件溯源 */}
      <text x="400" y="55" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">传统CRUD vs 事件溯源</text>

      <rect x="40" y="65" width="340" height="80" rx="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="210" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">传统CRUD（只存当前状态）</text>
      <text x="210" y="110" textAnchor="middle" fontSize="11" fill="#b91c1c">账户表：余额 = 150</text>
      <text x="210" y="130" textAnchor="middle" fontSize="11" fill="#dc2626">历史丢失，无法审计和回溯</text>

      <rect x="420" y="65" width="340" height="80" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="590" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">事件溯源（存所有事件）</text>
      <text x="590" y="110" textAnchor="middle" fontSize="11" fill="#5b21b6">Created(0) → Deposited(100) → Withdrawn(50)</text>
      <text x="590" y="130" textAnchor="middle" fontSize="11" fill="#7c3aed">回放重建：0+100-50=150，完整审计</text>

      {/* 事件存储结构 */}
      <text x="400" y="170" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">事件存储结构</text>

      <rect x="40" y="185" width="720" height="110" rx="10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="100" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">ID</text>
      <text x="240" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">聚合ID</text>
      <text x="400" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">事件类型</text>
      <text x="560" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">事件数据</text>
      <text x="690" y="208" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">版本号</text>
      <line x1="50" y1="215" x2="750" y2="215" stroke="#c4b5fd" strokeWidth="1" />

      <text x="100" y="238" textAnchor="middle" fontSize="11" fill="#5b21b6">1</text>
      <text x="240" y="238" textAnchor="middle" fontSize="11" fill="#5b21b6">A001</text>
      <text x="400" y="238" textAnchor="middle" fontSize="11" fill="#5b21b6">AccountCreated</text>
      <text x="560" y="238" textAnchor="middle" fontSize="11" fill="#5b21b6">{"{ balance:0 }"}</text>
      <text x="690" y="238" textAnchor="middle" fontSize="11" fill="#5b21b6">1</text>

      <text x="100" y="263" textAnchor="middle" fontSize="11" fill="#5b21b6">2</text>
      <text x="240" y="263" textAnchor="middle" fontSize="11" fill="#5b21b6">A001</text>
      <text x="400" y="263" textAnchor="middle" fontSize="11" fill="#5b21b6">MoneyDeposited</text>
      <text x="560" y="263" textAnchor="middle" fontSize="11" fill="#5b21b6">{"{ amount:100 }"}</text>
      <text x="690" y="263" textAnchor="middle" fontSize="11" fill="#5b21b6">2</text>

      <text x="100" y="288" textAnchor="middle" fontSize="11" fill="#5b21b6">3</text>
      <text x="240" y="288" textAnchor="middle" fontSize="11" fill="#5b21b6">A001</text>
      <text x="400" y="288" textAnchor="middle" fontSize="11" fill="#5b21b6">MoneyWithdrawn</text>
      <text x="560" y="288" textAnchor="middle" fontSize="11" fill="#5b21b6">{"{ amount:50 }"}</text>
      <text x="690" y="288" textAnchor="middle" fontSize="11" fill="#5b21b6">3</text>

      {/* 状态重建 */}
      <text x="400" y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">状态重建：回放事件流</text>

      <rect x="40" y="335" width="120" height="45" rx="8" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="100" y="355" textAnchor="middle" fontSize="11" fill="#6d28d9">Created</text>
      <text x="100" y="372" textAnchor="middle" fontSize="11" fill="#7c3aed">余额=0</text>

      <path d="M165 358 L205 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-es-arrow)" />

      <rect x="210" y="335" width="120" height="45" rx="8" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="270" y="355" textAnchor="middle" fontSize="11" fill="#6d28d9">Deposited</text>
      <text x="270" y="372" textAnchor="middle" fontSize="11" fill="#7c3aed">余额=100</text>

      <path d="M335 358 L375 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-es-arrow)" />

      <rect x="380" y="335" width="120" height="45" rx="8" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="440" y="355" textAnchor="middle" fontSize="11" fill="#6d28d9">Withdrawn</text>
      <text x="440" y="372" textAnchor="middle" fontSize="11" fill="#7c3aed">余额=150</text>

      <path d="M505 358 L545 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-es-arrow)" />

      <rect x="550" y="335" width="120" height="45" rx="8" fill="url(#msp-es-event)" />
      <text x="610" y="355" textAnchor="middle" fontSize="11" fill="#fff">当前状态</text>
      <text x="610" y="372" textAnchor="middle" fontSize="11" fill="#ddd6fe">余额=150</text>

      {/* 快照优化 */}
      <text x="400" y="410" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">快照优化：解决事件回放性能问题</text>

      <rect x="40" y="425" width="720" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="448" textAnchor="middle" fontSize="11" fill="#78350f">事件1~5000</text>
      <text x="380" y="448" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">[快照@5000: 余额=8000]</text>
      <text x="580" y="448" textAnchor="middle" fontSize="11" fill="#78350f">事件5001~10000</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#92400e">重建：加载快照(8000) + 只回放5001~10000 → 复杂度从O(N)降到O(快照间隔)</text>

      {/* 乐观并发控制 */}
      <rect x="40" y="495" width="720" height="55" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">乐观并发控制：不加锁，写入时检查版本号</text>
      <text x="400" y="540" textAnchor="middle" fontSize="11" fill="#475569">加载(版本3) → 计算新事件 → 写入时检查版本仍为3则成功(变4) / 不为3则冲突重试</text>
    </svg>
  );
}
