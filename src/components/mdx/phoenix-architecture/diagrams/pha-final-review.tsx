"use client";

export function PhaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="凤凰架构全书知识整合图">
      <defs>
        <linearGradient id="pha-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="pha-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">凤凰架构 · 全书知识整合</text>

      {/* 中心核心理念 */}
      <circle cx="400" cy="300" r="75" fill="url(#pha-fr-core)" opacity="0.95" />
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">没有银弹</text>
      <text x="400" y="310" textAnchor="middle" fontSize="11" fill="#fef3c7">架构是权衡</text>
      <text x="400" y="328" textAnchor="middle" fontSize="10" fill="#fef3c7">面向失败设计</text>

      {/* 外围四大支柱 */}
      {/* 架构演进 */}
      <rect x="40" y="70" width="200" height="120" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">架构演进</text>
      <text x="55" y="118" fontSize="9" fill="#1e40af">单体 → SOA → 微服务</text>
      <text x="55" y="135" fontSize="9" fill="#1e40af">→ 云原生 → 无服务</text>
      <text x="55" y="158" fontSize="9" fill="#3b82f6">核心：按需演进 / 领域驱动拆分</text>
      <text x="55" y="176" fontSize="9" fill="#3b82f6">独立部署 / 独立数据所有权</text>
      <path d="M240 150 L340 260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-fr-arrow)" />

      {/* 分布式理论 */}
      <rect x="560" y="70" width="200" height="120" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="660" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">分布式理论</text>
      <text x="575" y="118" fontSize="9" fill="#155e75">CAP：CP vs AP（P 不可放弃）</text>
      <text x="575" y="135" fontSize="9" fill="#155e75">事务：2PC/TCC/Saga/消息</text>
      <text x="575" y="158" fontSize="9" fill="#0891b2">共识：Paxos/Raft（多数派）</text>
      <text x="575" y="176" fontSize="9" fill="#0891b2">一致性谱系：线性→最终</text>
      <path d="M560 150 L460 260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-fr-arrow)" />

      {/* 工程实践 */}
      <rect x="40" y="410" width="200" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="140" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">工程实践</text>
      <text x="55" y="458" fontSize="9" fill="#78350f">缓存：Cache-Aside / 读写穿透</text>
      <text x="55" y="475" fontSize="9" fill="#78350f">韧性：限流 / 熔断 / 降级</text>
      <text x="55" y="498" fontSize="9" fill="#d97706">重试：指数退避 / 幂等保证</text>
      <text x="55" y="515" fontSize="9" fill="#d97706">负载均衡：四层 / 七层</text>
      <path d="M240 440 L340 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-fr-arrow)" />

      {/* 未来方向 */}
      <rect x="560" y="410" width="200" height="120" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">未来方向</text>
      <text x="575" y="458" fontSize="9" fill="#5b21b6">Serverless：零运维 / 按量</text>
      <text x="575" y="475" fontSize="9" fill="#5b21b6">Service Mesh：Sidecar 治理</text>
      <text x="575" y="498" fontSize="9" fill="#8b5cf6">EDA：事件驱动 / CQRS</text>
      <text x="575" y="515" fontSize="9" fill="#8b5cf6">混沌工程 / 可观测性</text>
      <path d="M560 440 L460 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pha-fr-arrow)" />

      {/* 底部整合线 */}
      <rect x="40" y="550" width="720" height="25" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fill="#475569">全书线索：演进动因 → CAP权衡 → 事务/共识理论基础 → 缓存/限流/熔断工程韧性 → Serverless/Mesh未来演化 → 凤凰重生</text>
    </svg>
  );
}
