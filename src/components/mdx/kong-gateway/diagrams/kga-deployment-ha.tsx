"use client";

export function KgaDeploymentHaDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kong部署模式与高可用">
      <defs>
        <linearGradient id="kga-dh-db" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="kga-dh-dbl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="kga-dh-hyb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="kga-dh-k8s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="kga-dh-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kong 部署模式：DB / DB-less / Hybrid / K8s</text>

      {/* DB模式 */}
      <rect x="20" y="50" width="185" height="200" rx="12" fill="url(#kga-dh-db)" opacity="0.92" />
      <text x="112" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DB 模式</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">PostgreSQL存储配置</text>
      <text x="112" y="127" textAnchor="middle" fontSize="10" fill="#93c5fd">Admin API动态增删</text>
      <text x="112" y="145" textAnchor="middle" fontSize="10" fill="#93c5fd">多节点共享DB同步</text>
      <text x="112" y="165" textAnchor="middle" fontSize="10" fill="#93c5fd">支持OAuth2/Consumer</text>
      <text x="112" y="185" textAnchor="middle" fontSize="10" fill="#bfdbfe">缺点:</text>
      <text x="112" y="203" textAnchor="middle" fontSize="9" fill="#93c5fd">依赖DB(单点风险)</text>
      <text x="112" y="221" textAnchor="middle" fontSize="9" fill="#93c5fd">Admin API有DB延迟</text>
      <text x="112" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合: 动态配置生产环境</text>

      {/* DB-less模式 */}
      <rect x="215" y="50" width="185" height="200" rx="12" fill="url(#kga-dh-dbl)" opacity="0.92" />
      <text x="307" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DB-less 模式</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">无数据库, 内存加载</text>
      <text x="307" y="127" textAnchor="middle" fontSize="10" fill="#a5f3fc">声明式YAML配置</text>
      <text x="307" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">decK工具管理</text>
      <text x="307" y="165" textAnchor="middle" fontSize="10" fill="#a5f3fc">GitOps版本控制</text>
      <text x="307" y="185" textAnchor="middle" fontSize="10" fill="#cffafe">优点:</text>
      <text x="307" y="203" textAnchor="middle" fontSize="9" fill="#a5f3fc">无DB依赖/启动快</text>
      <text x="307" y="221" textAnchor="middle" fontSize="9" fill="#a5f3fc">Admin API只读(安全)</text>
      <text x="307" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合: K8s/容器/GitOps</text>

      {/* Hybrid模式 */}
      <rect x="410" y="50" width="185" height="200" rx="12" fill="url(#kga-dh-hyb)" opacity="0.92" />
      <text x="502" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Hybrid 模式</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">控制面(CP)+数据面(DP)分离</text>
      <text x="502" y="127" textAnchor="middle" fontSize="10" fill="#fde68a">CP: Admin API + PostgreSQL</text>
      <text x="502" y="145" textAnchor="middle" fontSize="10" fill="#fde68a">DP: Proxy, 无Admin API</text>
      <text x="502" y="165" textAnchor="middle" fontSize="10" fill="#fde68a">CP → WebSocket推送 → DP</text>
      <text x="502" y="185" textAnchor="middle" fontSize="10" fill="#fef3c7">优点:</text>
      <text x="502" y="203" textAnchor="middle" fontSize="9" fill="#fde68a">Admin API隔离(安全)</text>
      <text x="502" y="221" textAnchor="middle" fontSize="9" fill="#fde68a">DP无状态水平扩展</text>
      <text x="502" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合: 大规模/多地域</text>

      {/* K8s部署 */}
      <rect x="605" y="50" width="175" height="200" rx="12" fill="url(#kga-dh-k8s)" opacity="0.92" />
      <text x="692" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">K8s 部署</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="10" fill="#ede9fe">Kong Ingress Controller</text>
      <text x="692" y="127" textAnchor="middle" fontSize="10" fill="#ddd6fe">K8s CRD → Kong配置</text>
      <text x="692" y="145" textAnchor="middle" fontSize="10" fill="#ddd6fe">KongPlugin/KongConsumer</text>
      <text x="692" y="165" textAnchor="middle" fontSize="10" fill="#ddd6fe">Helm Chart安装</text>
      <text x="692" y="185" textAnchor="middle" fontSize="10" fill="#ede9fe">优势:</text>
      <text x="692" y="203" textAnchor="middle" fontSize="9" fill="#ddd6fe">kubectl声明式管理</text>
      <text x="692" y="221" textAnchor="middle" fontSize="9" fill="#ddd6fe">自动同步/ConfigMap</text>
      <text x="692" y="240" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">适合: 云原生K8s集群</text>

      {/* 高可用架构 */}
      <rect x="20" y="265" width="760" height="280" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">高可用架构设计</text>
      <text x="400" y="315" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1d4ed8">多DP节点 + Pod水平扩展 + Upstream健康检查 + 跨机房部署</text>
      <text x="400" y="340" textAnchor="middle" fontSize="11" fill="#475569">① DP节点无状态(配置在内存) → HPA按CPU自动扩缩Pod → 不受DB连接数限制</text>
      <text x="400" y="360" textAnchor="middle" fontSize="11" fill="#475569">② Upstream多Target + 主动/被动健康检查 → 后端故障自动剔除 → 流量转移到健康节点</text>
      <text x="400" y="380" textAnchor="middle" fontSize="11" fill="#475569">③ PostgreSQL主从复制 + Patroni高可用 → CP节点数据库故障自动切换</text>
      <text x="400" y="400" textAnchor="middle" fontSize="11" fill="#475569">④ 跨机房DP部署 → DNS故障切换 → CP在中心机房, DP在边缘机房, WAN拉取配置</text>
      <text x="400" y="425" textAnchor="middle" fontSize="12" fontWeight="600" fill="#d97706">Hybrid模式高可用: CP集群(3节点Raft) + DP多副本 + 配置推送TLS加密</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">CP集群: 多CP节点避免单点, DP从任一CP拉取配置, CP故障不影响DP(内存缓存配置继续服务)</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">DP多副本: K8s Deployment replicas=N, Service负载均衡, Pod跨可用区调度</text>
      <text x="400" y="495" textAnchor="middle" fontSize="12" fontWeight="600" fill="#6d28d9">选型路径: 开发用DB模式 → K8s生产用DB-less → 大规模用Hybrid → 全球用多地域Hybrid</text>
      <text x="400" y="525" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">核心: 无状态DP水平扩展 + 有状态CP高可用集群 + 健康检查自动故障转移 = 生产级高可用</text>
    </svg>
  );
}
