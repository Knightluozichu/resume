"use client";

export function KgaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kong网关全书知识图谱串联">
      <defs>
        <linearGradient id="kga-fr-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-fr-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong网关 · 全书知识图谱串联</text>

      {/* 四部分知识串联 */}
      <rect x="20" y="50" width="185" height="160" rx="12" fill="url(#kga-fr-base)" opacity="0.92" />
      <text x="112" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">基础概念</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">API网关定义/职责</text>
      <text x="112" y="125" textAnchor="middle" fontSize="10" fill="#bfdbfe">Kong定位/优势</text>
      <text x="112" y="145" textAnchor="middle" fontSize="10" fill="#93c5fd">南北向流量入口</text>
      <text x="112" y="163" textAnchor="middle" fontSize="10" fill="#93c5fd">微服务治理基础</text>
      <text x="112" y="183" textAnchor="middle" fontSize="10" fill="#93c5fd">OpenResty高性能</text>
      <text x="112" y="200" textAnchor="middle" fontSize="9" fill="#60a5fa">解决「为什么需要网关」</text>

      <rect x="215" y="50" width="185" height="160" rx="12" fill="url(#kga-fr-core)" opacity="0.92" />
      <text x="307" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">核心架构</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">Service/Route/Consumer</text>
      <text x="307" y="125" textAnchor="middle" fontSize="10" fill="#cffafe">Plugin/Upstream/Target</text>
      <text x="307" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">路由匹配规则</text>
      <text x="307" y="163" textAnchor="middle" fontSize="10" fill="#a5f3fc">插件生命周期/priority</text>
      <text x="307" y="183" textAnchor="middle" fontSize="10" fill="#a5f3fc">Admin API / Proxy</text>
      <text x="307" y="200" textAnchor="middle" fontSize="9" fill="#67e8f9">解决「Kong怎么工作」</text>

      <rect x="410" y="50" width="185" height="160" rx="12" fill="url(#kga-fr-sec)" opacity="0.92" />
      <text x="502" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">安全与流量</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">JWT/OAuth2/Key Auth</text>
      <text x="502" y="125" textAnchor="middle" fontSize="10" fill="#fef3c7">CORS/ACL/IP限制/Bot</text>
      <text x="502" y="145" textAnchor="middle" fontSize="10" fill="#fde68a">限流/缓存/转换</text>
      <text x="502" y="163" textAnchor="middle" fontSize="10" fill="#fde68a">熔断/请求终止</text>
      <text x="502" y="183" textAnchor="middle" fontSize="10" fill="#fde68a">多层安全防护链</text>
      <text x="502" y="200" textAnchor="middle" fontSize="9" fill="#fcd34d">解决「怎么安全/控流」</text>

      <rect x="605" y="50" width="175" height="160" rx="12" fill="url(#kga-fr-adv)" opacity="0.92" />
      <text x="692" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">部署与进阶</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="10" fill="#ede9fe">DB/DB-less/Hybrid</text>
      <text x="692" y="125" textAnchor="middle" fontSize="10" fill="#ede9fe">Docker/K8s Ingress</text>
      <text x="692" y="145" textAnchor="middle" fontSize="10" fill="#ddd6fe">自定义Lua插件/PDK</text>
      <text x="692" y="163" textAnchor="middle" fontSize="10" fill="#ddd6fe">Kong Mesh/Serverless</text>
      <text x="692" y="183" textAnchor="middle" fontSize="10" fill="#ddd6fe">高可用/多地域</text>
      <text x="692" y="200" textAnchor="middle" fontSize="9" fill="#c4b5fd">解决「怎么部署/扩展」</text>

      {/* Arrows */}
      <path d="M205 130 L215 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-fr-arrow)" />
      <path d="M400 130 L410 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-fr-arrow)" />
      <path d="M595 130 L605 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#kga-fr-arrow)" />

      {/* 三个交汇点 */}
      <text x="400" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三个交汇点</text>

      <rect x="20" y="260" width="250" height="110" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Route-Service-Plugin</text>
      <text x="145" y="303" textAnchor="middle" fontSize="10" fill="#1e40af">代理路由 ↔ 插件扩展</text>
      <text x="145" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">路由匹配 → 触发插件链</text>
      <text x="145" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">access阶段: Route→Service→Plugin</text>
      <text x="145" y="363" textAnchor="middle" fontSize="9" fill="#1d4ed8">请求处理的枢纽</text>

      <rect x="275" y="260" width="250" height="110" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">Consumer-Credential-Plugin</text>
      <text x="400" y="303" textAnchor="middle" fontSize="10" fill="#155e75">插件扩展 ↔ 安全流量</text>
      <text x="400" y="323" textAnchor="middle" fontSize="10" fill="#155e75">凭证→认证插件→识别Consumer</text>
      <text x="400" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ACL授权→Rate Limiting限流</text>
      <text x="400" y="363" textAnchor="middle" fontSize="9" fill="#0e7490">安全治理链</text>

      <rect x="530" y="260" width="250" height="110" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="283" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">DB-less-Hybrid-Mesh</text>
      <text x="655" y="303" textAnchor="middle" fontSize="10" fill="#78350f">部署运维 ↔ 扩展能力</text>
      <text x="655" y="323" textAnchor="middle" fontSize="10" fill="#78350f">声明式→CP/DP分离→Mesh</text>
      <text x="655" y="343" textAnchor="middle" fontSize="10" fill="#78350f">配置一致性+安全隔离+全栈</text>
      <text x="655" y="363" textAnchor="middle" fontSize="9" fill="#92400e">云原生演进路径</text>

      {/* 全链路请求处理 */}
      <rect x="20" y="385" width="760" height="80" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="408" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">全链路请求处理</text>
      <text x="400" y="430" textAnchor="middle" fontSize="10" fill="#94a3b8">Client → Nginx(连接) → rewrite(插件) → Route(匹配) → access(插件链: IP/Bot/CORS/JWT/ACL/限流)</text>
      <text x="400" y="450" textAnchor="middle" fontSize="10" fill="#94a3b8">→ Upstream(LB选择Target) → 后端 → header_filter(响应头) → body_filter(响应体) → Client → log(日志/指标)</text>

      {/* Kong核心公式 */}
      <rect x="20" y="480" width="760" height="85" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="503" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Kong 核心公式</text>
      <text x="400" y="525" textAnchor="middle" fontSize="11" fill="#475569">Kong = OpenResty高性能 + Route-Service路由抽象 + Plugin插件化扩展 + Consumer认证授权</text>
      <text x="400" y="545" textAnchor="middle" fontSize="11" fill="#475569">+ 多模式部署(DB/DB-less/Hybrid) + K8s云原生 + 自定义插件 + Mesh全栈 + Serverless弹性</text>
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">设计哲学: 插件化扩展为核心, Route-Service解耦, 多模式部署适配全场景</text>
    </svg>
  );
}
