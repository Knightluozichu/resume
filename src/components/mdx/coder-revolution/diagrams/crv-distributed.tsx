"use client";

export function CrvDistributedDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="分布式架构CAP定理与微服务图">
      <defs>
        <linearGradient id="crv-di-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-di-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-di-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-di-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-di-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分布式与架构：CAP 定理</text>

      {/* CAP 三角 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CAP 定理</text>

      <rect x="300" y="74" width="200" height="56" rx="10" fill="url(#crv-di-1)" opacity="0.9" />
      <text x="400" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">一致性</text>
      <text x="400" y="118" textAnchor="middle" fontSize="11" fill="#e0f2fe">Consistency——所有节点数据一致</text>

      <path d="M340 130 L220 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-di-arrow)" />
      <path d="M460 130 L580 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-di-arrow)" />

      <rect x="100" y="176" width="200" height="56" rx="10" fill="url(#crv-di-3)" opacity="0.9" />
      <text x="200" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">可用性</text>
      <text x="200" y="220" textAnchor="middle" fontSize="11" fill="#dcfce7">Availability——每次请求有响应</text>

      <rect x="500" y="176" width="200" height="56" rx="10" fill="url(#crv-di-4)" opacity="0.9" />
      <text x="600" y="200" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">分区容错</text>
      <text x="600" y="220" textAnchor="middle" fontSize="11" fill="#fef9c3">Partition——网络分区可容忍</text>

      <path d="M300 204 L500 204" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />

      <rect x="200" y="252" width="400" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="272" textAnchor="middle" fontSize="10" fill="#475569">分布式系统最多满足其中两个——P 不可省，故在 C 与 A 之间取舍</text>

      {/* 微服务架构 */}
      <text x="400" y="312" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">微服务架构</text>

      <rect x="30" y="324" width="140" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="348" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">API 网关</text>
      <text x="100" y="366" textAnchor="middle" fontSize="9" fill="#475569">统一入口</text>

      <path d="M170 352 L214 352" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-di-arrow)" />

      <rect x="218" y="324" width="120" height="56" rx="8" fill="url(#crv-di-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="278" y="348" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">用户服务</text>
      <text x="278" y="366" textAnchor="middle" fontSize="9" fill="#475569">独立部署</text>

      <path d="M338 352 L382 352" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-di-arrow)" />

      <rect x="386" y="324" width="120" height="56" rx="8" fill="url(#crv-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="446" y="348" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">订单服务</text>
      <text x="446" y="366" textAnchor="middle" fontSize="9" fill="#475569">独立部署</text>

      <path d="M506 352 L550 352" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-di-arrow)" />

      <rect x="554" y="324" width="120" height="56" rx="8" fill="url(#crv-di-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="614" y="348" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">支付服务</text>
      <text x="614" y="366" textAnchor="middle" fontSize="9" fill="#475569">独立部署</text>

      {/* 分布式核心问题 */}
      <text x="400" y="410" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分布式核心挑战</text>

      <rect x="30" y="422" width="180" height="100" rx="8" fill="url(#crv-di-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">负载均衡</text>
      <text x="120" y="464" textAnchor="middle" fontSize="9" fill="#475569">轮询 / 加权</text>
      <text x="120" y="478" textAnchor="middle" fontSize="9" fill="#475569">最少连接</text>
      <text x="120" y="492" textAnchor="middle" fontSize="9" fill="#475569">一致性哈希</text>
      <text x="120" y="510" textAnchor="middle" fontSize="9" fill="#475569">流量分发</text>

      <rect x="225" y="422" width="180" height="100" rx="8" fill="url(#crv-di-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="315" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">分布式锁</text>
      <text x="315" y="464" textAnchor="middle" fontSize="9" fill="#475569">互斥访问</text>
      <text x="315" y="478" textAnchor="middle" fontSize="9" fill="#475569">Redis / ZooKeeper</text>
      <text x="315" y="492" textAnchor="middle" fontSize="9" fill="#475569">租约与续约</text>
      <text x="315" y="510" textAnchor="middle" fontSize="9" fill="#475569"> fencing 防脑裂</text>

      <rect x="420" y="422" width="180" height="100" rx="8" fill="url(#crv-di-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="510" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">数据分片</text>
      <text x="510" y="464" textAnchor="middle" fontSize="9" fill="#475569">水平拆分</text>
      <text x="510" y="478" textAnchor="middle" fontSize="9" fill="#475569">哈希分片</text>
      <text x="510" y="492" textAnchor="middle" fontSize="9" fill="#475569">范围分片</text>
      <text x="510" y="510" textAnchor="middle" fontSize="9" fill="#475569">副本与同步</text>

      <rect x="615" y="422" width="155" height="100" rx="8" fill="url(#crv-di-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="692" y="446" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">消息队列</text>
      <text x="692" y="464" textAnchor="middle" fontSize="9" fill="#475569">异步解耦</text>
      <text x="692" y="478" textAnchor="middle" fontSize="9" fill="#475569">削峰填谷</text>
      <text x="692" y="492" textAnchor="middle" fontSize="9" fill="#475569">最终一致性</text>
      <text x="692" y="510" textAnchor="middle" fontSize="9" fill="#475569">Kafka / RabbitMQ</text>

      <rect x="30" y="534" width="740" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="549" textAnchor="middle" fontSize="10" fill="#475569">单体 → 垂直拆分 → 面向服务 → 微服务——架构演进由业务规模驱动</text>

      <rect x="30" y="562" width="740" height="14" rx="6" fill="url(#crv-di-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="573" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心：CAP 取舍 / 服务拆分 / 分布式协调——用复杂性换可扩展性</text>
    </svg>
  );
}
