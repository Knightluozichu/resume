"use client";

export function MspSagaPatternDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Saga事务模式核心原理">
      <defs>
        <linearGradient id="msp-saga-orch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-saga-chore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="msp-saga-comp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="msp-saga-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="msp-saga-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#dc2626" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Saga事务模式：正向执行与补偿</text>

      {/* 编排式Saga */}
      <text x="400" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">编排式（Orchestration）— 中央协调器</text>

      <rect x="320" y="75" width="160" height="45" rx="8" fill="url(#msp-saga-orch)" />
      <text x="400" y="103" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Saga协调器</text>

      {/* 正向流程 */}
      <text x="100" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">正向流程</text>

      <rect x="40" y="155" width="110" height="45" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="95" y="178" textAnchor="middle" fontSize="11" fill="#065f46">创建订单</text>
      <text x="95" y="193" textAnchor="middle" fontSize="11" fill="#047857">T1</text>

      <path d="M155 177 L195 177" stroke="#10b981" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="200" y="155" width="110" height="45" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="255" y="178" textAnchor="middle" fontSize="11" fill="#065f46">扣款</text>
      <text x="255" y="193" textAnchor="middle" fontSize="11" fill="#047857">T2</text>

      <path d="M315 177 L355 177" stroke="#10b981" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="360" y="155" width="110" height="45" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="415" y="178" textAnchor="middle" fontSize="11" fill="#065f46">锁库存</text>
      <text x="415" y="193" textAnchor="middle" fontSize="11" fill="#047857">T3</text>

      <path d="M475 177 L515 177" stroke="#10b981" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="520" y="155" width="110" height="45" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="575" y="178" textAnchor="middle" fontSize="11" fill="#065f46">发货</text>
      <text x="575" y="193" textAnchor="middle" fontSize="11" fill="#047857">T4</text>

      {/* 补偿流程 */}
      <text x="100" y="230" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">补偿流程（T3失败时）</text>

      <rect x="40" y="240" width="110" height="45" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="95" y="263" textAnchor="middle" fontSize="11" fill="#991b1b">取消订单</text>
      <text x="95" y="278" textAnchor="middle" fontSize="11" fill="#b91c1c">C1</text>

      <path d="M155 262 L195 262" stroke="#dc2626" strokeWidth="2" markerEnd="url(#msp-saga-arrow-r)" />

      <rect x="200" y="240" width="110" height="45" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="255" y="263" textAnchor="middle" fontSize="11" fill="#991b1b">退款</text>
      <text x="255" y="278" textAnchor="middle" fontSize="11" fill="#b91c1c">C2</text>

      <path d="M315 262 L355 262" stroke="#dc2626" strokeWidth="2" markerEnd="url(#msp-saga-arrow-r)" />

      <rect x="360" y="240" width="110" height="45" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="415" y="263" textAnchor="middle" fontSize="11" fill="#92400e">T3失败</text>
      <text x="415" y="278" textAnchor="middle" fontSize="11" fill="#b45309">触发补偿</text>

      <text x="520" y="265" textAnchor="middle" fontSize="11" fill="#78350f">← 反向执行补偿事务</text>

      {/* 编舞式Saga */}
      <text x="400" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">编舞式（Choreography）— 事件驱动</text>

      <rect x="40" y="330" width="140" height="55" rx="8" fill="url(#msp-saga-chore)" opacity="0.9" />
      <text x="110" y="353" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">订单服务</text>
      <text x="110" y="372" textAnchor="middle" fontSize="11" fill="#ddd6fe">OrderCreated</text>

      <path d="M185 358 L235 358" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="240" y="330" width="140" height="55" rx="8" fill="url(#msp-saga-chore)" opacity="0.9" />
      <text x="310" y="353" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">支付服务</text>
      <text x="310" y="372" textAnchor="middle" fontSize="11" fill="#ddd6fe">PaymentAuthorized</text>

      <path d="M385 358 L435 358" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="440" y="330" width="140" height="55" rx="8" fill="url(#msp-saga-chore)" opacity="0.9" />
      <text x="510" y="353" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">库存服务</text>
      <text x="510" y="372" textAnchor="middle" fontSize="11" fill="#ddd6fe">InventoryReserved</text>

      <path d="M585 358 L635 358" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />

      <rect x="640" y="330" width="120" height="55" rx="8" fill="url(#msp-saga-chore)" opacity="0.9" />
      <text x="700" y="353" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">物流服务</text>
      <text x="700" y="372" textAnchor="middle" fontSize="11" fill="#ddd6fe">事件驱动</text>

      {/* 语义锁 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">语义锁：隔离Saga中间状态</text>

      <rect x="40" y="435" width="220" height="55" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="150" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">PENDING</text>
      <text x="150" y="477" textAnchor="middle" fontSize="11" fill="#78350f">Saga进行中 / 语义锁持有</text>

      <path d="M265 462 L315 462" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-saga-arrow)" />
      <text x="290" y="454" textAnchor="middle" fontSize="11" fill="#64748b">全部成功</text>

      <rect x="320" y="435" width="220" height="55" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="430" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">APPROVED</text>
      <text x="430" y="477" textAnchor="middle" fontSize="11" fill="#047857">Saga成功 / 释放锁</text>

      <rect x="560" y="435" width="200" height="55" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="660" y="458" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">CANCELLED</text>
      <text x="660" y="477" textAnchor="middle" fontSize="11" fill="#b91c1c">补偿完成 / 释放锁</text>

      {/* 底部总结 */}
      <rect x="40" y="510" width="720" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">补偿事务 ≠ 回滚：补偿是执行反向操作抵消效果（退款而非撤销扣款），必须幂等 / Saga放弃ACID隔离性追求最终一致</text>
    </svg>
  );
}
