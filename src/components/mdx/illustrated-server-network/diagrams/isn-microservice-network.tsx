"use client";

export function IsnMicroserviceNetworkDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="微服务网络：服务间通信与Sidecar治理">
      <defs>
        <linearGradient id="isn-ms-svc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-ms-sidecar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="isn-ms-reg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-ms-mq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="isn-ms-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">微服务网络：通信与治理</text>

      {/* 同步 vs 异步通信 */}
      <rect x="30" y="45" width="370" height="100" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="215" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">同步通信（HTTP/gRPC）</text>
      <text x="215" y="92" textAnchor="middle" fontSize="11" fill="#475569">服务A → 请求 → 服务B → 响应 → A继续</text>
      <text x="215" y="112" textAnchor="middle" fontSize="10" fill="#64748b">实时反馈 · B挂了A受影响(需熔断)</text>
      <text x="215" y="132" textAnchor="middle" fontSize="10" fill="#64748b">gRPC比REST+JSON快3-10倍 · 内部用gRPC</text>

      <rect x="400" y="45" width="370" height="100" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="585" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8b5cf6">异步通信（消息队列）</text>
      <text x="585" y="92" textAnchor="middle" fontSize="11" fill="#475569">服务A → 消息 → [MQ] → 服务B → 处理</text>
      <text x="585" y="112" textAnchor="middle" fontSize="10" fill="#64748b">解耦削峰 · B挂了消息不丢 · 延迟高</text>
      <text x="585" y="132" textAnchor="middle" fontSize="10" fill="#64748b">适合日志/通知/削峰场景</text>

      {/* 服务发现 */}
      <rect x="30" y="160" width="370" height="120" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
      <text x="215" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">服务发现</text>
      <rect x="50" y="195" width="100" height="40" rx="6" fill="url(#isn-ms-reg)" opacity="0.95" />
      <text x="100" y="220" textAnchor="middle" fontSize="10" fill="#fff">注册中心</text>
      <text x="50" y="250" textAnchor="start" fontSize="10" fill="#475569">Consul/Eureka/Nacos</text>
      <text x="50" y="265" textAnchor="start" fontSize="10" fill="#475569">客户端发现: 调用方拉列表自己选</text>
      <text x="215" y="250" textAnchor="start" fontSize="10" fill="#475569">服务端发现: 代理查注册中心转发</text>
      <text x="215" y="265" textAnchor="start" fontSize="10" fill="#475569">能力: 注册/发现/健康检查/通知</text>

      {/* Sidecar模式 */}
      <rect x="400" y="160" width="370" height="120" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="585" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">Sidecar模式</text>
      <text x="420" y="210" textAnchor="start" fontSize="10" fill="#475569">传统: 代码内嵌[LB+熔断+重试+追踪]</text>
      <text x="420" y="230" textAnchor="start" fontSize="10" fill="#059669">Sidecar: 治理逻辑外移到伴生代理</text>
      <text x="420" y="250" textAnchor="start" fontSize="10" fill="#475569">服务A→[Sidecar A]→网络→[Sidecar B]→服务B</text>
      <text x="420" y="270" textAnchor="start" fontSize="10" fill="#475569">好处: 治理与业务解耦(换语言不重写)</text>

      {/* Sidecar架构图 */}
      <rect x="30" y="295" width="740" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="320" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Sidecar架构：治理逻辑外移</text>

      {/* 服务A + Sidecar A */}
      <rect x="60" y="335" width="120" height="45" rx="6" fill="url(#isn-ms-svc)" opacity="0.95" />
      <text x="120" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务A</text>
      <rect x="60" y="385" width="120" height="35" rx="6" fill="url(#isn-ms-sidecar)" opacity="0.95" />
      <text x="120" y="407" textAnchor="middle" fontSize="10" fill="#fff">Sidecar A (Envoy)</text>
      <text x="120" y="435" textAnchor="middle" fontSize="9" fill="#64748b">LB/熔断/重试/追踪</text>

      {/* 网络 */}
      <path d="M180 395 L300 395" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-ms-arrow)" />
      <text x="240" y="388" textAnchor="middle" fontSize="9" fill="#64748b">gRPC/HTTP</text>

      {/* 服务B + Sidecar B */}
      <rect x="300" y="335" width="120" height="45" rx="6" fill="url(#isn-ms-svc)" opacity="0.95" />
      <text x="360" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务B</text>
      <rect x="300" y="385" width="120" height="35" rx="6" fill="url(#isn-ms-sidecar)" opacity="0.95" />
      <text x="360" y="407" textAnchor="middle" fontSize="10" fill="#fff">Sidecar B (Envoy)</text>
      <text x="360" y="435" textAnchor="middle" fontSize="9" fill="#64748b">LB/熔断/重试/追踪</text>

      {/* 服务C + Sidecar C */}
      <path d="M420 395 L540 395" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-ms-arrow)" />
      <rect x="540" y="335" width="120" height="45" rx="6" fill="url(#isn-ms-svc)" opacity="0.95" />
      <text x="600" y="362" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务C</text>
      <rect x="540" y="385" width="120" height="35" rx="6" fill="url(#isn-ms-sidecar)" opacity="0.95" />
      <text x="600" y="407" textAnchor="middle" fontSize="10" fill="#fff">Sidecar C (Envoy)</text>
      <text x="600" y="435" textAnchor="middle" fontSize="9" fill="#64748b">LB/熔断/重试/追踪</text>

      <text x="400" y="450" textAnchor="middle" fontSize="10" fill="#64748b">所有进出流量经过Sidecar → 治理逻辑与业务代码彻底解耦</text>

      {/* Istio四大能力 */}
      <rect x="30" y="470" width="740" height="90" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="400" y="495" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">Istio四大核心能力</text>
      <text x="120" y="520" textAnchor="middle" fontSize="11" fill="#475569">流量路由</text>
      <text x="120" y="538" textAnchor="middle" fontSize="10" fill="#64748b">金丝雀(v1:90%/v2:10%)</text>
      <text x="310" y="520" textAnchor="middle" fontSize="11" fill="#475569">负载均衡</text>
      <text x="310" y="538" textAnchor="middle" fontSize="10" fill="#64748b">轮询/最少连接/随机</text>
      <text x="500" y="520" textAnchor="middle" fontSize="11" fill="#475569">熔断</text>
      <text x="500" y="538" textAnchor="middle" fontSize="10" fill="#64748b">5次失败→熔断30秒</text>
      <text x="680" y="520" textAnchor="middle" fontSize="11" fill="#475569">链路追踪</text>
      <text x="680" y="538" textAnchor="middle" fontSize="10" fill="#64748b">全链路调用可视化</text>
    </svg>
  );
}
