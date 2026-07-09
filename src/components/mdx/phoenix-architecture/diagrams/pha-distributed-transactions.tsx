"use client";

export function PhaDistributedTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="分布式事务方案对比">
      <defs>
        <marker id="pha-dt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分布式事务方案谱系</text>

      {/* 强一致性：2PC / 3PC */}
      <rect x="20" y="50" width="240" height="220" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">强一致性</text>
      <line x1="35" y1="85" x2="245" y2="85" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
      <text x="140" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">2PC 两阶段提交</text>
      <text x="140" y="128" textAnchor="middle" fontSize="9" fill="#3b82f6">Prepare → Commit/Rollback</text>
      <text x="140" y="148" textAnchor="middle" fontSize="9" fill="#3b82f6">协调者 + 参与者</text>
      <text x="140" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">3PC 三阶段提交</text>
      <text x="140" y="195" textAnchor="middle" fontSize="9" fill="#3b82f6">CanCommit → PreCommit → DoCommit</text>
      <text x="140" y="215" textAnchor="middle" fontSize="9" fill="#3b82f6">引入超时 / 降低阻塞</text>
      <text x="140" y="245" textAnchor="middle" fontSize="9" fill="#dc2626">缺点：阻塞 / 协调者单点</text>
      <text x="140" y="261" textAnchor="middle" fontSize="9" fill="#dc2626">性能差 / 不适合高并发</text>

      {/* 最终一致性：TCC / Saga */}
      <rect x="280" y="50" width="240" height="220" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">最终一致性</text>
      <line x1="295" y1="85" x2="505" y2="85" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      <text x="400" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">TCC（Try-Confirm-Cancel）</text>
      <text x="400" y="128" textAnchor="middle" fontSize="9" fill="#d97706">Try 预留 → Confirm 确认 / Cancel 释放</text>
      <text x="400" y="148" textAnchor="middle" fontSize="9" fill="#d97706">业务侵入大 / 性能好</text>
      <text x="400" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">Saga 长事务</text>
      <text x="400" y="195" textAnchor="middle" fontSize="9" fill="#d97706">正向操作序列 + 补偿操作序列</text>
      <text x="400" y="215" textAnchor="middle" fontSize="9" fill="#d97706">无锁 / 适合长流程</text>
      <text x="400" y="245" textAnchor="middle" fontSize="9" fill="#dc2626">缺点：需写补偿逻辑</text>
      <text x="400" y="261" textAnchor="middle" fontSize="9" fill="#dc2626">中间状态可见 / 不隔离</text>

      {/* 消息驱动：本地消息表 / MQ事务 */}
      <rect x="540" y="50" width="240" height="220" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">消息驱动</text>
      <line x1="555" y1="85" x2="765" y2="85" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="660" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">本地消息表</text>
      <text x="660" y="128" textAnchor="middle" fontSize="9" fill="#8b5cf6">本地事务 + 消息表 → MQ</text>
      <text x="660" y="148" textAnchor="middle" fontSize="9" fill="#8b5cf6">定时轮询保证可靠投递</text>
      <text x="660" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">事务消息（RocketMQ）</text>
      <text x="660" y="195" textAnchor="middle" fontSize="9" fill="#8b5cf6">半消息 → 本地事务 → 提交</text>
      <text x="660" y="215" textAnchor="middle" fontSize="9" fill="#8b5cf6">回查机制保证最终一致</text>
      <text x="660" y="245" textAnchor="middle" fontSize="9" fill="#dc2626">缺点：最终一致 / 延迟</text>
      <text x="660" y="261" textAnchor="middle" fontSize="9" fill="#dc2626">消费者须幂等</text>

      {/* 选型决策树 */}
      <text x="400" y="305" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">选型决策树</text>
      <rect x="20" y="320" width="760" height="200" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="345" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">要强一致 + 短事务 + 低并发？</text>
      <text x="400" y="365" textAnchor="middle" fontSize="10" fill="#2563eb">→ 是：2PC/3PC（XA）— 如银行跨行转账核心环节</text>
      <text x="400" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">要高并发 + 可写补偿 + 业务可侵入？</text>
      <text x="400" y="410" textAnchor="middle" fontSize="10" fill="#f59e0b">→ 是：TCC — 如电商扣库存/扣余额</text>
      <text x="400" y="435" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">长流程 + 多步骤 + 无法预留资源？</text>
      <text x="400" y="455" textAnchor="middle" fontSize="10" fill="#f59e0b">→ 是：Saga — 如旅行预订（机酒车）</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">异步解耦 + 最终一致即可？</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#8b5cf6">→ 是：本地消息表/事务消息 — 如下单后发积分/通知</text>

      <text x="400" y="528" textAnchor="middle" fontSize="10" fill="#64748b">原则：能不用分布式事务就不用；优先消息最终一致；TCC用于核心资金；Saga用于长流程编排</text>
    </svg>
  );
}
