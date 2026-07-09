"use client";

export function IsnFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="全书复习：端到端请求流转与知识整合">
      <defs>
        <linearGradient id="isn-fr-dns" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-fr-cdn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-fr-lb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="isn-fr-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="isn-fr-gw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-fr-ms" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="isn-fr-perf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="isn-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书复习：端到端请求流转</text>

      {/* 端到端请求流转链 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">用户请求从DNS到响应的完整流转</text>

      {/* ① DNS */}
      <rect x="20" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-dns)" opacity="0.95" />
      <text x="70" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">① DNS</text>
      <text x="70" y="112" textAnchor="middle" fontSize="9" fill="#d1fae5">域名解析</text>
      <text x="70" y="127" textAnchor="middle" fontSize="9" fill="#d1fae5">GSLB调度</text>
      <text x="70" y="142" textAnchor="middle" fontSize="8" fill="#a7f3d0">怎么找到服务器</text>

      <path d="M120 110 L135 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ② CDN */}
      <rect x="135" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-cdn)" opacity="0.95" />
      <text x="185" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">② CDN</text>
      <text x="185" y="112" textAnchor="middle" fontSize="9" fill="#d1fae5">边缘缓存</text>
      <text x="185" y="127" textAnchor="middle" fontSize="9" fill="#d1fae5">回源拉取</text>
      <text x="185" y="142" textAnchor="middle" fontSize="8" fill="#a7f3d0">怎么就近获取</text>

      <path d="M235 110 L250 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ③ 负载均衡 */}
      <rect x="250" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-lb)" opacity="0.95" />
      <text x="300" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">③ LB</text>
      <text x="300" y="112" textAnchor="middle" fontSize="9" fill="#cffafe">LVS(L4)分发</text>
      <text x="300" y="127" textAnchor="middle" fontSize="9" fill="#cffafe">Nginx(L7)路由</text>
      <text x="300" y="142" textAnchor="middle" fontSize="8" fill="#a5f3fc">怎么分担流量</text>

      <path d="M350 110 L365 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ④ 安全 */}
      <rect x="365" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-sec)" opacity="0.95" />
      <text x="415" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">④ 安全</text>
      <text x="415" y="112" textAnchor="middle" fontSize="9" fill="#fecaca">WAF拦截</text>
      <text x="415" y="127" textAnchor="middle" fontSize="9" fill="#fecaca">ACL过滤</text>
      <text x="415" y="142" textAnchor="middle" fontSize="8" fill="#fca5a5">怎么挡住攻击</text>

      <path d="M465 110 L480 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ⑤ 网关 */}
      <rect x="480" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-gw)" opacity="0.95" />
      <text x="530" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">⑤ 网关</text>
      <text x="530" y="112" textAnchor="middle" fontSize="9" fill="#bfdbfe">SSL终结</text>
      <text x="530" y="127" textAnchor="middle" fontSize="9" fill="#bfdbfe">认证/限流</text>
      <text x="530" y="142" textAnchor="middle" fontSize="8" fill="#60a5fa">怎么路由过滤</text>

      <path d="M580 110 L595 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ⑥ 微服务 */}
      <rect x="595" y="70" width="100" height="80" rx="8" fill="url(#isn-fr-ms)" opacity="0.95" />
      <text x="645" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">⑥ 微服务</text>
      <text x="645" y="112" textAnchor="middle" fontSize="9" fill="#ede9fe">Sidecar代理</text>
      <text x="645" y="127" textAnchor="middle" fontSize="9" fill="#ede9fe">gRPC通信</text>
      <text x="645" y="142" textAnchor="middle" fontSize="8" fill="#ddd6fe">怎么拆分通信</text>

      <path d="M695 110 L710 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-fr-arrow)" />

      {/* ⑦ 性能 */}
      <rect x="710" y="70" width="80" height="80" rx="8" fill="url(#isn-fr-perf)" opacity="0.95" />
      <text x="750" y="93" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">⑦ 性能</text>
      <text x="750" y="112" textAnchor="middle" fontSize="9" fill="#fef3c7">连接池</text>
      <text x="750" y="127" textAnchor="middle" fontSize="9" fill="#fef3c7">零拷贝/追踪</text>
      <text x="750" y="142" textAnchor="middle" fontSize="8" fill="#fde68a">怎么调到最优</text>

      {/* 四条核心知识线索 */}
      <rect x="30" y="170" width="740" height="180" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="195" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四条核心知识线索</text>

      <text x="60" y="222" textAnchor="start" fontSize="12" fontWeight="700" fill="#0891b2">线索一：流量入口演进</text>
      <text x="60" y="240" textAnchor="start" fontSize="11" fill="#475569">单机 → 负载均衡(L4/L7) → CDN+GSLB → API网关</text>

      <text x="60" y="265" textAnchor="start" fontSize="12" fontWeight="700" fill="#f59e0b">线索二：可靠性演进</text>
      <text x="60" y="283" textAnchor="start" fontSize="11" fill="#475569">单点 → 主备(冗余) → 双活(同时) → 多活(异地) → 服务网格(自愈)</text>

      <text x="60" y="308" textAnchor="start" fontSize="12" fontWeight="700" fill="#ef4444">线索三：安全纵深</text>
      <text x="60" y="326" textAnchor="start" fontSize="11" fill="#475569">ACL(网络层) → 状态检测(连接层) → WAF(应用层) → 零信任(全面认证)</text>

      <text x="60" y="351" textAnchor="start" fontSize="12" fontWeight="700" fill="#8b5cf6">线索四：性能优化</text>
      <text x="400" y="351" textAnchor="start" fontSize="11" fill="#475569">短连接 → 长连接 → 连接池 → 零拷贝 → epoll多路复用</text>

      {/* 架构选型 */}
      <rect x="30" y="365" width="370" height="95" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="215" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">负载均衡选型</text>
      <text x="50" y="412" textAnchor="start" fontSize="10" fill="#475569">高速L4: LVS(内核态最快)</text>
      <text x="50" y="428" textAnchor="start" fontSize="10" fill="#475569">HTTP路由: Nginx(L7+SSL终结)</text>
      <text x="50" y="444" textAnchor="start" fontSize="10" fill="#475569">全球调度: DNS+GSLB</text>
      <text x="260" y="412" textAnchor="start" fontSize="10" fill="#475569">微服务内部: Envoy</text>
      <text x="260" y="428" textAnchor="start" fontSize="10" fill="#475569">原则: 没有银弹</text>
      <text x="260" y="444" textAnchor="start" fontSize="10" fill="#475569">组合使用·渐进演进</text>

      <rect x="400" y="365" width="370" height="95" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="585" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">高可用选型</text>
      <text x="420" y="412" textAnchor="start" fontSize="10" fill="#475569">Nginx: Keepalived+VIP(主备)</text>
      <text x="420" y="428" textAnchor="start" fontSize="10" fill="#475569">数据库: 主从+故障转移</text>
      <text x="420" y="444" textAnchor="start" fontSize="10" fill="#475569">异地: 双活/多活</text>
      <text x="630" y="412" textAnchor="start" fontSize="10" fill="#475569">防脑裂: 仲裁+Fencing</text>
      <text x="630" y="428" textAnchor="start" fontSize="10" fill="#475569">按需求选型</text>
      <text x="630" y="444" textAnchor="start" fontSize="10" fill="#475569">消除单点故障</text>

      {/* 五大设计原则 */}
      <rect x="30" y="475" width="740" height="85" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="500" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">五大核心设计原则</text>
      <text x="400" y="525" textAnchor="middle" fontSize="11" fill="#475569">①分层架构 ②消除单点 ③纵深防御 ④就近服务 ⑤可观测性</text>
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#64748b">服务端网络 = 分层架构 + 流量分发 + 冗余容灾 + 纵深防御 + 就近服务 + 可观测性</text>
    </svg>
  );
}
