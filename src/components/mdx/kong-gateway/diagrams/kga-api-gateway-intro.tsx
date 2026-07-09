"use client";

export function KgaApiGatewayIntroDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="API网关核心职责与Kong定位">
      <defs>
        <linearGradient id="kga-agi-gw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-agi-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-agi-svc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-agi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">API网关：微服务架构统一入口</text>

      {/* 客户端 */}
      <rect x="20" y="60" width="120" height="80" rx="10" fill="url(#kga-agi-client)" opacity="0.95" />
      <text x="80" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>
      <text x="80" y="110" textAnchor="middle" fontSize="10" fill="#cffafe">Web / App / IoT</text>
      <text x="80" y="128" textAnchor="middle" fontSize="10" fill="#67e8f9">外部请求</text>

      {/* API网关 */}
      <rect x="250" y="50" width="300" height="420" rx="12" fill="url(#kga-agi-gw)" opacity="0.92" />
      <text x="400" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Kong API 网关</text>
      <line x1="270" y1="88" x2="530" y2="88" stroke="#fff" strokeWidth="1" opacity="0.4" />

      {/* 五大核心职责 */}
      <rect x="265" y="100" width="270" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="400" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">① 反向代理与路由</text>
      <text x="400" y="138" textAnchor="middle" fontSize="9" fill="#bfdbfe">URL/Method/Host 匹配 → 转发后端</text>
      <text x="400" y="152" textAnchor="middle" fontSize="9" fill="#93c5fd">路径重写 / 负载均衡</text>

      <rect x="265" y="168" width="270" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="400" y="188" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">② 认证与授权</text>
      <text x="400" y="206" textAnchor="middle" fontSize="9" fill="#bfdbfe">JWT / OAuth2 / Key Auth</text>
      <text x="400" y="220" textAnchor="middle" fontSize="9" fill="#93c5fd">集中认证，后端无需重复实现</text>

      <rect x="265" y="236" width="270" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="400" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">③ 流量控制</text>
      <text x="400" y="274" textAnchor="middle" fontSize="9" fill="#bfdbfe">限流 / 缓存 / 熔断</text>
      <text x="400" y="288" textAnchor="middle" fontSize="9" fill="#93c5fd">请求/响应转换</text>

      <rect x="265" y="304" width="270" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="400" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">④ 安全防护</text>
      <text x="400" y="342" textAnchor="middle" fontSize="9" fill="#bfdbfe">CORS / IP限制 / Bot检测</text>
      <text x="400" y="356" textAnchor="middle" fontSize="9" fill="#93c5fd">TLS终止 / 请求大小限制</text>

      <rect x="265" y="372" width="270" height="60" rx="8" fill="#fff" opacity="0.15" />
      <text x="400" y="392" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">⑤ 可观测性</text>
      <text x="400" y="410" textAnchor="middle" fontSize="9" fill="#bfdbfe">日志 / Prometheus / Zipkin</text>
      <text x="400" y="424" textAnchor="middle" fontSize="9" fill="#93c5fd">全链路追踪与监控</text>

      <text x="400" y="455" textAnchor="middle" fontSize="10" fill="#60a5fa">所有横切关注点集中处理</text>

      {/* 后端微服务 */}
      <rect x="660" y="60" width="120" height="50" rx="8" fill="url(#kga-agi-svc)" opacity="0.95" />
      <text x="720" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">用户服务</text>
      <text x="720" y="98" textAnchor="middle" fontSize="9" fill="#ddd6fe">/users/*</text>

      <rect x="660" y="130" width="120" height="50" rx="8" fill="url(#kga-agi-svc)" opacity="0.95" />
      <text x="720" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">订单服务</text>
      <text x="720" y="168" textAnchor="middle" fontSize="9" fill="#ddd6fe">/orders/*</text>

      <rect x="660" y="200" width="120" height="50" rx="8" fill="url(#kga-agi-svc)" opacity="0.95" />
      <text x="720" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">商品服务</text>
      <text x="720" y="238" textAnchor="middle" fontSize="9" fill="#ddd6fe">/products/*</text>

      <rect x="660" y="270" width="120" height="50" rx="8" fill="url(#kga-agi-svc)" opacity="0.95" />
      <text x="720" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">支付服务</text>
      <text x="720" y="308" textAnchor="middle" fontSize="9" fill="#ddd6fe">/payments/*</text>

      {/* Arrows */}
      <path d="M140 100 L250 100" stroke="#475569" strokeWidth="2" markerEnd="url(#kga-agi-arrow)" />
      <path d="M550 85 L660 85" stroke="#475569" strokeWidth="2" markerEnd="url(#kga-agi-arrow)" />
      <path d="M550 155 L660 155" stroke="#475569" strokeWidth="2" markerEnd="url(#kga-agi-arrow)" />
      <path d="M550 225 L660 225" stroke="#475569" strokeWidth="2" markerEnd="url(#kga-agi-arrow)" />
      <path d="M550 295 L660 295" stroke="#475569" strokeWidth="2" markerEnd="url(#kga-agi-arrow)" />

      {/* 底部 Kong 优势 */}
      <rect x="20" y="490" width="760" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="513" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Kong 核心优势</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">OpenResty高性能(数万RPS) + 插件化扩展(100+插件) + 多协议(HTTP/gRPC/TCP) + 多模式部署(DB/DB-less/Hybrid) + 云原生(K8s)</text>
    </svg>
  );
}
