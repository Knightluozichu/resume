"use client";

export function K8sServicesNetworkingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Service网络、Endpoints与Ingress路由">
      <defs>
        <linearGradient id="k8s-svc-type" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-svc-ep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-svc-ing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-svc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Service 网络与服务发现</text>

      {/* Service 四种类型 */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-svc-type)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Service 四种类型</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">① ClusterIP (默认) — 集群内部虚拟IP</text>
      <text x="35" y="126" fontSize="9" fill="#93c5fd">   微服务间通信, 仅集群内可访问</text>
      <text x="35" y="148" fontSize="10" fill="#bfdbfe">② NodePort — 节点端口(30000-32767)</text>
      <text x="35" y="166" fontSize="9" fill="#93c5fd">   外部通过 nodeIP:nodePort 访问</text>
      <text x="35" y="188" fontSize="10" fill="#bfdbfe">③ LoadBalancer — 云厂商外部LB</text>
      <text x="35" y="206" fontSize="9" fill="#93c5fd">   自动创建ELB/ALB, 生产对外暴露</text>
      <text x="35" y="228" fontSize="10" fill="#bfdbfe">④ ExternalName — DNS CNAME别名</text>
      <text x="35" y="246" fontSize="9" fill="#93c5fd">   引用外部服务(db.example.com)</text>

      {/* Endpoints 关联 */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-svc-ep)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Endpoints 与 label selector</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="105" textAnchor="middle" fontSize="10" fill="#cffafe">Service (selector: app=web)</text>
      <text x="590" y="125" textAnchor="middle" fontSize="10" fill="#a5f3fc">→ 自动匹配 labels 匹配的 Pod</text>
      <text x="590" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">→ readinessProbe 通过才加入 Endpoints</text>
      <text x="590" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">kube-proxy → iptables DNAT</text>
      <text x="590" y="188" textAnchor="middle" fontSize="9" fill="#a5f3fc">ClusterIP:80 → 随机选Endpoint → Pod:8080</text>
      <text x="590" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">CoreDNS 自动解析</text>
      <text x="590" y="228" textAnchor="middle" fontSize="9" fill="#a5f3fc">web-svc.default.svc.cluster.local → ClusterIP</text>
      <text x="590" y="246" textAnchor="middle" fontSize="9" fill="#a5f3fc">跨命名空间: web-svc.production</text>

      {/* Ingress */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-svc-ing)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Ingress 七层路由</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">host + path 路由到不同 Service</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fde68a">api.example.com/users → user-svc</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">api.example.com/orders → order-svc</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">TLS 集中终止 (Ingress Controller)</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">一个LB服务多个域 (成本优化)</text>

      {/* 请求流程 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">请求访问全链路</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">Client → DNS解析 → CoreDNS返回ClusterIP</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">→ ClusterIP:80 → kube-proxy iptables</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">→ DNAT随机选Endpoint → Pod:8080</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">→ Pod处理 → 响应返回Client</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">Service(稳定) → Endpoints(动态) → Pod(易变)</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># Service + Ingress 定义</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">apiVersion: v1</text>
      <text x="35" y="466" fontSize="9" fill="#4ade80">kind: Service</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">  type: ClusterIP</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">  selector: &#123; app: web &#125;</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">  ports: [&#123; port:80, targetPort:8080 &#125;]</text>
      <text x="35" y="536" fontSize="9" fill="#94a3b8"># selector自动匹配Pod → Endpoints动态维护</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">apiVersion: networking.k8s.io/v1</text>
      <text x="400" y="466" fontSize="9" fill="#4ade80">kind: Ingress</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">  rules:</text>
      <text x="400" y="508" fontSize="9" fill="#cbd5e1">  - host: api.example.com</text>
      <text x="400" y="522" fontSize="9" fill="#cbd5e1">    http:</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">      paths: [&#123;path:/users, backend:&#123;svc:user-svc&#125;&#125;]</text>
    </svg>
  );
}
