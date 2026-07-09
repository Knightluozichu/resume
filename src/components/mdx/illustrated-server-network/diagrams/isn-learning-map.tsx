"use client";

export function IsnLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="图解服务端网络架构全书学习地图">
      <defs>
        <linearGradient id="isn-lm-basics" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-lm-lb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="isn-lm-ha" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="isn-lm-dns" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-lm-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="isn-lm-micro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="isn-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">图解服务端网络架构 · 知识体系全景</text>

      {/* 第一层：基础 + 负载均衡 */}
      <rect x="30" y="50" width="160" height="120" rx="12" fill="url(#isn-lm-basics)" opacity="0.95" />
      <text x="110" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">服务器网络基础</text>
      <line x1="45" y1="85" x2="175" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="110" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">TCP/UDP协议</text>
      <text x="110" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">端口与套接字</text>
      <text x="110" y="147" textAnchor="middle" fontSize="11" fill="#bfdbfe">Reactor模型</text>
      <text x="110" y="162" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      <rect x="210" y="50" width="160" height="120" rx="12" fill="url(#isn-lm-lb)" opacity="0.95" />
      <text x="290" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">负载均衡机制</text>
      <line x1="225" y1="85" x2="355" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="290" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">L4/L7负载均衡</text>
      <text x="290" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">调度算法</text>
      <text x="290" y="147" textAnchor="middle" fontSize="11" fill="#a5f3fc">健康检查/会话保持</text>
      <text x="290" y="162" textAnchor="middle" fontSize="10" fill="#67e8f9">实战 · 核心</text>

      {/* 第二层：高可用 + DNS/CDN */}
      <rect x="390" y="50" width="160" height="120" rx="12" fill="url(#isn-lm-ha)" opacity="0.95" />
      <text x="470" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">高可用架构</text>
      <line x1="405" y1="85" x2="535" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="470" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">主备/双活/多活</text>
      <text x="470" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">VIP漂移/VRRP</text>
      <text x="470" y="147" textAnchor="middle" fontSize="11" fill="#fde68a">故障转移/脑裂防御</text>
      <text x="470" y="162" textAnchor="middle" fontSize="10" fill="#fcd34d">中级 · 容灾</text>

      <rect x="570" y="50" width="200" height="120" rx="12" fill="url(#isn-lm-dns)" opacity="0.95" />
      <text x="670" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DNS与CDN</text>
      <line x1="585" y1="85" x2="755" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="670" y="107" textAnchor="middle" fontSize="11" fill="#d1fae5">域名解析/GSLB</text>
      <text x="670" y="127" textAnchor="middle" fontSize="11" fill="#d1fae5">CDN缓存/回源</text>
      <text x="670" y="147" textAnchor="middle" fontSize="11" fill="#a7f3d0">边缘节点/静态动态加速</text>
      <text x="670" y="162" textAnchor="middle" fontSize="10" fill="#6ee7b7">实战 · 加速</text>

      {/* 箭头 第一层→第二层 */}
      <path d="M190 110 L210 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-lm-arrow)" />
      <path d="M370 110 L390 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-lm-arrow)" />
      <path d="M550 110 L570 110" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-lm-arrow)" />

      {/* 第三层：安全 + 代理 */}
      <rect x="120" y="220" width="200" height="120" rx="12" fill="url(#isn-lm-sec)" opacity="0.95" />
      <text x="220" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">防火墙与网络安全</text>
      <line x1="135" y1="255" x2="305" y2="255" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="220" y="277" textAnchor="middle" fontSize="11" fill="#fecaca">包过滤/状态检测/WAF</text>
      <text x="220" y="297" textAnchor="middle" fontSize="11" fill="#fecaca">DDoS防御/ACL规则</text>
      <text x="220" y="317" textAnchor="middle" fontSize="11" fill="#fca5a5">SYN Cookie/纵深防御</text>
      <text x="220" y="332" textAnchor="middle" fontSize="10" fill="#f87171">中级 · 防御</text>

      <rect x="340" y="220" width="200" height="120" rx="12" fill="url(#isn-lm-micro)" opacity="0.95" />
      <text x="440" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">反向代理/网关/微服务</text>
      <line x1="355" y1="255" x2="525" y2="255" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="440" y="277" textAnchor="middle" fontSize="11" fill="#ede9fe">Nginx反向代理/API网关</text>
      <text x="440" y="297" textAnchor="middle" fontSize="11" fill="#ede9fe">服务网格Sidecar/Istio</text>
      <text x="440" y="317" textAnchor="middle" fontSize="11" fill="#ddd6fe">服务发现/限流/熔断</text>
      <text x="440" y="332" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 演进</text>

      {/* 箭头 第二层→第三层 */}
      <path d="M470 170 L220 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lm-arrow)" />
      <path d="M670 170 L440 220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lm-arrow)" />

      {/* 第四层：性能 + 复习 */}
      <rect x="560" y="220" width="200" height="120" rx="12" fill="url(#isn-lm-lb)" opacity="0.95" />
      <text x="660" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">性能调优</text>
      <line x1="575" y1="255" x2="745" y2="255" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="277" textAnchor="middle" fontSize="11" fill="#cffafe">TCP调优/零拷贝</text>
      <text x="660" y="297" textAnchor="middle" fontSize="11" fill="#cffafe">连接池/epoll</text>
      <text x="660" y="317" textAnchor="middle" fontSize="11" fill="#a5f3fc">全链路追踪</text>
      <text x="660" y="332" textAnchor="middle" fontSize="10" fill="#67e8f9">实战 · 优化</text>

      <path d="M440 340 L660 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#isn-lm-arrow)" />

      {/* 学习路径 */}
      <rect x="20" y="380" width="760" height="180" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="405" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（基础 → 负载均衡 → 高可用 → DNS/CDN → 安全/代理 → 微服务/性能 → 复习）</text>
      <text x="400" y="430" textAnchor="middle" fontSize="11" fill="#475569">① 服务器基础（TCP-UDP/端口套接字/Reactor模型）→ ② 负载均衡（L4-L7/调度算法/健康检查/会话保持）</text>
      <text x="400" y="452" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 高可用（主备双活多活/VIP漂移/VRRP/脑裂防御）→ ④ DNS与CDN（域名解析/GSLB/CDN缓存回源/边缘节点）</text>
      <text x="400" y="474" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 防火墙与安全（包过滤/状态检测/WAF/DDoS防御/ACL）→ ⑥ 反向代理与网关（Nginx/API网关/SSL终结/限流）</text>
      <text x="400" y="496" textAnchor="middle" fontSize="11" fill="#475569">→ ⑦ 微服务网络（服务发现/Sidecar/Istio/流量治理）→ ⑧ 性能调优（TCP调优/零拷贝/连接池/全链路追踪）→ ⑨ 复习</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#64748b">核心线索：协议基础 → 流量分发 → 冗余容灾 → 域名加速 → 安全防御 → 代理路由 → 微服务治理 → 性能优化</text>
      <text x="400" y="548" textAnchor="middle" fontSize="11" fill="#64748b">服务端网络 = 分层架构 + 流量分发 + 冗余容灾 + 纵深防御 + 就近服务 + 可观测性</text>
    </svg>
  );
}
