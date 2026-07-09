"use client";

export function MspServiceDiscoveryDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="服务发现模式对比">
      <defs>
        <linearGradient id="msp-sd-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-sd-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="msp-sd-registry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="msp-sd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">服务发现：客户端发现 vs 服务端发现</text>

      {/* 客户端发现 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">客户端发现</text>

      <rect x="40" y="70" width="320" height="200" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />

      <rect x="60" y="85" width="100" height="40" rx="8" fill="url(#msp-sd-client)" />
      <text x="110" y="110" textAnchor="middle" fontSize="11" fill="#fff">调用方</text>

      <rect x="230" y="85" width="110" height="55" rx="8" fill="url(#msp-sd-registry)" />
      <text x="285" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务注册中心</text>
      <text x="285" y="128" textAnchor="middle" fontSize="11" fill="#fef3c7">实例列表</text>

      <path d="M165 100 L225 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />
      <text x="195" y="93" textAnchor="middle" fontSize="11" fill="#64748b">查询</text>
      <path d="M225 115 L165 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />
      <text x="195" y="128" textAnchor="middle" fontSize="11" fill="#64748b">列表</text>

      <text x="110" y="150" textAnchor="middle" fontSize="11" fill="#1d4ed8">自行负载均衡选择实例</text>

      <rect x="60" y="165" width="80" height="40" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="190" textAnchor="middle" fontSize="11" fill="#1e3a8a">实例A</text>

      <rect x="155" y="165" width="80" height="40" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="195" y="190" textAnchor="middle" fontSize="11" fill="#1e3a8a">实例B</text>

      <rect x="250" y="165" width="80" height="40" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="290" y="190" textAnchor="middle" fontSize="11" fill="#1e3a8a">实例C</text>

      <path d="M110 135 L100 160" stroke="#10b981" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />

      <text x="200" y="230" textAnchor="middle" fontSize="11" fill="#065f46">直连性能好（少一跳）</text>
      <text x="200" y="248" textAnchor="middle" fontSize="11" fill="#dc2626">需各语言SDK实现负载均衡</text>

      {/* 服务端发现 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">服务端发现</text>

      <rect x="440" y="70" width="320" height="200" rx="12" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />

      <rect x="460" y="85" width="100" height="40" rx="8" fill="url(#msp-sd-server)" />
      <text x="510" y="110" textAnchor="middle" fontSize="11" fill="#fff">调用方</text>

      <rect x="600" y="85" width="130" height="40" rx="8" fill="#059669" />
      <text x="665" y="110" textAnchor="middle" fontSize="11" fill="#fff">路由器/负载均衡器</text>

      <path d="M565 105 L595 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />

      <rect x="600" y="140" width="130" height="45" rx="8" fill="url(#msp-sd-registry)" />
      <text x="665" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务注册中心</text>
      <text x="665" y="178" textAnchor="middle" fontSize="11" fill="#fef3c7">查询实例列表</text>

      <path d="M665 128 L665 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />

      <rect x="460" y="165" width="80" height="40" rx="6" fill="#a7f3d0" stroke="#10b981" strokeWidth="1" />
      <text x="500" y="190" textAnchor="middle" fontSize="11" fill="#065f46">实例A</text>

      <rect x="555" y="165" width="80" height="40" rx="6" fill="#a7f3d0" stroke="#10b981" strokeWidth="1" />
      <text x="595" y="190" textAnchor="middle" fontSize="11" fill="#065f46">实例B</text>

      <path d="M600 130 L510 160" stroke="#10b981" strokeWidth="2" markerEnd="url(#msp-sd-arrow)" />

      <text x="600" y="230" textAnchor="middle" fontSize="11" fill="#065f46">调用方逻辑简单/语言无关</text>
      <text x="600" y="248" textAnchor="middle" fontSize="11" fill="#dc2626">多一跳路由</text>

      {/* 注册中心对比 */}
      <text x="400" y="295" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常见服务注册中心对比</text>

      <rect x="40" y="310" width="720" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="60" y="325" width="130" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="125" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Eureka</text>
      <text x="125" y="368" textAnchor="middle" fontSize="11" fill="#78350f">AP（最终一致）</text>
      <text x="125" y="385" textAnchor="middle" fontSize="11" fill="#78350f">Spring Cloud</text>

      <rect x="205" y="325" width="130" height="70" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="270" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Consul</text>
      <text x="270" y="368" textAnchor="middle" fontSize="11" fill="#1e40af">CP（Raft）</text>
      <text x="270" y="385" textAnchor="middle" fontSize="11" fill="#1e40af">多数据中心</text>

      <rect x="350" y="325" width="130" height="70" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="415" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">etcd</text>
      <text x="415" y="368" textAnchor="middle" fontSize="11" fill="#5b21b6">CP（Raft）</text>
      <text x="415" y="385" textAnchor="middle" fontSize="11" fill="#5b21b6">Kubernetes</text>

      <rect x="495" y="325" width="130" height="70" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <text x="560" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Nacos</text>
      <text x="560" y="368" textAnchor="middle" fontSize="11" fill="#047857">AP/CP可切换</text>
      <text x="560" y="385" textAnchor="middle" fontSize="11" fill="#047857">Spring Cloud Alibaba</text>

      <rect x="640" y="325" width="100" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <text x="690" y="348" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">Zookeeper</text>
      <text x="690" y="368" textAnchor="middle" fontSize="11" fill="#b91c1c">CP（ZAB）</text>
      <text x="690" y="385" textAnchor="middle" fontSize="11" fill="#b91c1c">Hadoop生态</text>

      {/* 选AP还是CP */}
      <rect x="40" y="425" width="720" height="125" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="450" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">服务发现通常选AP而非CP</text>
      <text x="400" y="475" textAnchor="middle" fontSize="11" fill="#78350f">AP（如Eureka）：分区时仍可查询（可能返回过期实例），调用失败用重试/熔断处理</text>
      <text x="400" y="495" textAnchor="middle" fontSize="11" fill="#dc2626">CP（如Zookeeper）：分区时拒绝查询（保证一致），导致调用方无法发现服务，更严重</text>
      <text x="400" y="515" textAnchor="middle" fontSize="11" fill="#78350f">K8s用etcd（CP）是因为etcd存集群状态不仅服务发现，通过kube-proxy本地缓存缓解可用性</text>
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#92400e">核心需求：随时能查到实例列表（可用性） &gt; 实例列表短暂过期（一致性）</text>
    </svg>
  );
}
