"use client";

export function PhaFutureArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="未来架构方向">
      <defs>
        <marker id="pha-fa-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">未来架构方向</text>

      {/* Serverless */}
      <rect x="20" y="55" width="240" height="200" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d4ed8">Serverless 无服务</text>
      <line x1="35" y1="90" x2="245" y2="90" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
      <text x="35" y="112" fontSize="10" fill="#1e40af">FaaS：函数即服务（AWS Lambda）</text>
      <text x="35" y="130" fontSize="10" fill="#1e40af">BaaS：后端即服务（数据库/存储）</text>
      <text x="35" y="155" fontSize="10" fill="#3b82f6">优势：零运维 / 按量付费 / 自动伸缩</text>
      <text x="35" y="180" fontSize="10" fill="#dc2626">挑战：冷启动延迟 / 有状态难</text>
      <text x="35" y="198" fontSize="10" fill="#dc2626">调试难 / 厂商锁定 / 长任务受限</text>
      <text x="35" y="225" fontSize="9" fill="#64748b">适合：事件驱动 / 突发流量 / 低频</text>
      <text x="35" y="243" fontSize="9" fill="#64748b">不适合：长连接 / 重计算 / 强一致</text>

      {/* 服务网格 */}
      <rect x="280" y="55" width="240" height="200" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Service Mesh 服务网格</text>
      <line x1="295" y1="90" x2="505" y2="90" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      <text x="295" y="112" fontSize="10" fill="#78350f">Sidecar 代理（Envoy）</text>
      <text x="295" y="130" fontSize="10" fill="#78350f">数据面 + 控制面分离</text>
      <text x="295" y="155" fontSize="10" fill="#d97706">优势：流量治理与业务解耦</text>
      <text x="295" y="173" fontSize="10" fill="#d97706">熔断/限流/可观测 对业务透明</text>
      <text x="295" y="198" fontSize="10" fill="#dc2626">挑战：Sidecar 性能开销</text>
      <text x="295" y="216" fontSize="10" fill="#dc2626">运维复杂 / 升级风险</text>
      <text x="295" y="243" fontSize="9" fill="#64748b">代表：Istio / Linkerd / Cilium</text>

      {/* 事件驱动 */}
      <rect x="540" y="55" width="240" height="200" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">事件驱动架构 EDA</text>
      <line x1="555" y1="90" x2="765" y2="90" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
      <text x="555" y="112" fontSize="10" fill="#5b21b6">事件溯源 Event Sourcing</text>
      <text x="555" y="130" fontSize="10" fill="#5b21b6">CQRS 读写分离模型</text>
      <text x="555" y="155" fontSize="10" fill="#8b5cf6">优势：松耦合 / 可回放</text>
      <text x="555" y="173" fontSize="10" fill="#8b5cf6">异步高吞吐 / 可扩展</text>
      <text x="555" y="198" fontSize="10" fill="#dc2626">挑战：最终一致 / 调试难</text>
      <text x="555" y="216" fontSize="10" fill="#dc2626">事件模式演进 / 有序性</text>
      <text x="555" y="243" fontSize="9" fill="#64748b">代表：Kafka / Pulsar / EventBridge</text>

      {/* 凤凰工程理念 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">凤凰工程理念</text>
      <rect x="20" y="305" width="760" height="170" rx="10" fill="#1e293b" />
      <text x="400" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fbbf24">「没有银弹」— 架构是权衡的艺术</text>
      <text x="400" y="355" textAnchor="middle" fontSize="11" fill="#94a3b8">演进而非革命：每次架构升级解决上一代的痛点，也引入新的复杂性</text>
      <text x="400" y="377" textAnchor="middle" fontSize="11" fill="#94a3b8">单体 → SOA → 微服务 → 云原生 → 无服务：每一代都有适用场景，没有「最佳」只有「最合适」</text>
      <text x="400" y="402" textAnchor="middle" fontSize="11" fill="#94a3b8">面向失败设计：接受故障不可避免，用韧性模式让系统在降级中存活</text>
      <text x="400" y="424" textAnchor="middle" fontSize="11" fill="#94a3b8">可观测性优先：日志 + 指标 + 链路追踪是分布式系统的「眼睛」</text>
      <text x="400" y="446" textAnchor="middle" fontSize="11" fill="#94a3b8">自动化是基础：CI/CD + 容器编排 + 混沌工程 = 从手工运维到自愈系统</text>
      <text x="400" y="468" textAnchor="middle" fontSize="11" fill="#fbbf24">凤凰：在灰烬中重生 — 系统不是不崩溃，而是崩溃后能快速恢复</text>
    </svg>
  );
}
