"use client";

export function HdgWebHostingDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="Web托管与部署">
      <defs>
        <linearGradient id="hdg-host-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-host-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-host-lb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-host-redirect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-host-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Web 托管与部署</text>

      {/* 虚拟主机 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">虚拟主机（Virtual Hosting）</text>

      <rect x="20" y="68" width="370" height="120" rx="8" fill="url(#hdg-host-server)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="35" y="90" fontSize="12" fontWeight="700" fill="#065f46">基于 IP 的虚拟主机</text>
      <text x="35" y="108" fontSize="10" fill="#475569">每个站点绑定不同 IP 地址</text>
      <text x="35" y="124" fontSize="10" fill="#475569">服务器根据目标 IP 区分站点</text>
      <text x="35" y="140" fontSize="10" fill="#dc2626">缺点：IP 地址消耗大</text>
      <text x="35" y="158" fontSize="10" fill="#475569">优点：实现简单、兼容性好</text>
      <text x="35" y="176" fontSize="10" fill="#64748b">适用于：SSL 证书需独立 IP 的场景</text>

      <rect x="410" y="68" width="370" height="120" rx="8" fill="url(#hdg-host-lb)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="425" y="90" fontSize="12" fontWeight="700" fill="#92400e">基于名字的虚拟主机</text>
      <text x="425" y="108" fontSize="10" fill="#475569">多个站点共享同一 IP 地址</text>
      <text x="425" y="124" fontSize="10" fill="#475569">通过 Host 首部区分站点</text>
      <text x="425" y="140" fontSize="10" fill="#059669">优点：节省 IP 地址</text>
      <text x="425" y="158" fontSize="10" fill="#475569">Host: www.site-a.com → 站点A</text>
      <text x="425" y="176" fontSize="10" fill="#475569">Host: www.site-b.com → 站点B</text>

      {/* 重定向 */}
      <text x="400" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP 重定向</text>

      <rect x="20" y="228" width="760" height="120" rx="8" fill="url(#hdg-host-redirect)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />

      <rect x="40" y="240" width="80" height="30" rx="4" fill="url(#hdg-host-client)" opacity="0.9" />
      <text x="80" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>

      <path d="M125 255 L235 255" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <text x="180" y="248" textAnchor="middle" fontSize="9" fill="#475569">请求 /old-page</text>

      <rect x="240" y="240" width="100" height="30" rx="4" fill="url(#hdg-host-server)" opacity="0.9" />
      <text x="290" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>

      <path d="M345 255 L455 255" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <text x="400" y="248" textAnchor="middle" fontSize="9" fill="#92400e">301/302 + Location</text>

      <path d="M460 255 L570 255" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <text x="515" y="248" textAnchor="middle" fontSize="9" fill="#475569">请求 /new-page</text>

      <rect x="575" y="240" width="100" height="30" rx="4" fill="url(#hdg-host-server)" opacity="0.9" />
      <text x="625" y="260" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>

      <path d="M680 255 L740 255" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <text x="710" y="248" textAnchor="middle" fontSize="9" fill="#059669">200 OK</text>

      <text x="40" y="292" fontSize="10" fontWeight="700" fill="#5b21b6">重定向类型：</text>
      <text x="150" y="292" fontSize="10" fill="#475569">301 永久重定向（缓存）</text>
      <text x="350" y="292" fontSize="10" fill="#475569">302 临时重定向（不缓存）</text>
      <text x="550" y="292" fontSize="10" fill="#475569">307/308 保持方法</text>

      <text x="40" y="312" fontSize="10" fill="#475569">用途：URL 规范化、HTTP→HTTPS 跳转、域名迁移、A/B 测试流量分发、负载均衡</text>
      <text x="40" y="332" fontSize="10" fill="#64748b">重定向代价：额外 RTT，应尽量减少重定向链</text>

      {/* 负载均衡 */}
      <text x="400" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">负载均衡架构</text>

      <rect x="20" y="388" width="760" height="140" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      <rect x="40" y="400" width="80" height="40" rx="6" fill="url(#hdg-host-client)" opacity="0.9" />
      <text x="80" y="425" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>

      <path d="M125 420 L215 420" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />

      <rect x="220" y="400" width="100" height="40" rx="6" fill="url(#hdg-host-lb)" opacity="0.9" />
      <text x="270" y="418" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">负载均衡器</text>
      <text x="270" y="432" textAnchor="middle" fontSize="8" fill="#fef3c7">LB / 反向代理</text>

      <path d="M325 410 L395 410" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <path d="M325 420 L395 440" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />
      <path d="M325 430 L395 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-host-arrow)" />

      <rect x="400" y="398" width="80" height="30" rx="6" fill="url(#hdg-host-server)" opacity="0.9" />
      <text x="440" y="418" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">服务器 1</text>

      <rect x="400" y="432" width="80" height="30" rx="6" fill="url(#hdg-host-server)" opacity="0.9" />
      <text x="440" y="452" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">服务器 2</text>

      <rect x="400" y="466" width="80" height="30" rx="6" fill="url(#hdg-host-server)" opacity="0.9" />
      <text x="440" y="486" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">服务器 3</text>

      <rect x="510" y="398" width="250" height="100" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="525" y="418" fontSize="10" fontWeight="700" fill="#334155">负载均衡策略：</text>
      <text x="525" y="436" fontSize="10" fill="#475569">轮询（Round Robin）— 依次分配</text>
      <text x="525" y="452" fontSize="10" fill="#475569">最少连接 — 分配给连接最少的</text>
      <text x="525" y="468" fontSize="10" fill="#475569">IP 哈希 — 同 IP 固定到同一服务器</text>
      <text x="525" y="486" fontSize="10" fill="#475569">加权 — 按服务器能力分配</text>

      <text x="80" y="510" textAnchor="middle" fontSize="9" fill="#64748b">DNS 轮询也可做简单负载均衡</text>
    </svg>
  );
}
