"use client";

export function HdgProxyGatewayDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="代理与网关架构">
      <defs>
        <linearGradient id="hdg-px-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-px-proxy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hdg-px-gateway" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-px-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="hdg-px-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="hdg-px-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">代理与网关架构</text>

      {/* 直接连接 vs 代理连接 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">直接连接 vs 代理连接</text>

      {/* 直接连接 */}
      <rect x="20" y="68" width="360" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="40" y="84" width="100" height="48" rx="6" fill="url(#hdg-px-client)" opacity="0.9" />
      <text x="90" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>
      <path d="M145 108 L255 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />
      <path d="M255 118 L145 118" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#hdg-px-arrow-r)" />
      <rect x="260" y="84" width="100" height="48" rx="6" fill="url(#hdg-px-server)" opacity="0.9" />
      <text x="310" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">服务器</text>
      <text x="200" y="138" textAnchor="middle" fontSize="9" fill="#64748b">直接连接：客户端 ↔ 服务器</text>

      {/* 代理连接 */}
      <rect x="410" y="68" width="370" height="80" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="425" y="84" width="80" height="48" rx="6" fill="url(#hdg-px-client)" opacity="0.9" />
      <text x="465" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>
      <path d="M510 108 L555 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />
      <rect x="560" y="84" width="80" height="48" rx="6" fill="url(#hdg-px-proxy)" opacity="0.9" />
      <text x="600" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">代理</text>
      <text x="600" y="124" textAnchor="middle" fontSize="8" fill="#cffafe">Proxy</text>
      <path d="M645 108 L690 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />
      <rect x="695" y="84" width="70" height="48" rx="6" fill="url(#hdg-px-server)" opacity="0.9" />
      <text x="730" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>
      <text x="595" y="138" textAnchor="middle" fontSize="9" fill="#64748b">代理连接：客户端 → 代理 → 服务器</text>

      {/* 代理 vs 网关 */}
      <text x="400" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代理 vs 网关</text>

      <rect x="20" y="188" width="370" height="120" rx="8" fill="url(#hdg-px-proxy)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="35" y="210" fontSize="12" fontWeight="700" fill="#0e7490">代理（Proxy）</text>
      <text x="35" y="230" fontSize="10" fill="#475569">两端使用相同协议（HTTP ↔ HTTP）</text>
      <text x="35" y="248" fontSize="10" fill="#475569">代表客户端发起请求，对服务器透明</text>
      <text x="35" y="266" fontSize="10" fill="#475569">用途：过滤、缓存、匿名化、负载均衡</text>
      <text x="35" y="284" fontSize="10" fill="#475569">类型：正向代理（客户端配置）</text>
      <text x="35" y="300" fontSize="10" fill="#475569">类型：反向代理（服务器侧部署）</text>

      <rect x="410" y="188" width="370" height="120" rx="8" fill="url(#hdg-px-gateway)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="425" y="210" fontSize="12" fontWeight="700" fill="#92400e">网关（Gateway）</text>
      <text x="425" y="230" fontSize="10" fill="#475569">两端使用不同协议（HTTP ↔ FTP/SMTP）</text>
      <text x="425" y="248" fontSize="10" fill="#475569">代表服务器接收请求，对客户端透明</text>
      <text x="425" y="266" fontSize="10" fill="#475569">用途：协议转换、资源映射、集成</text>
      <text x="425" y="284" fontSize="10" fill="#475569">示例：HTTP/POP3 网关读取邮件</text>
      <text x="425" y="300" fontSize="10" fill="#475569">示例：HTTP/HTTPS 资源转换网关</text>

      {/* 代理链 */}
      <text x="400" y="336" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代理链（Proxy Chaining）</text>

      <rect x="20" y="348" width="760" height="70" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />

      <rect x="40" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-client)" opacity="0.9" />
      <text x="80" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>

      <path d="M125 383 L165 383" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />

      <rect x="170" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-proxy)" opacity="0.9" />
      <text x="210" y="383" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">代理 1</text>
      <text x="210" y="398" textAnchor="middle" fontSize="8" fill="#cffafe">缓存</text>

      <path d="M255 383 L295 383" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />

      <rect x="300" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-proxy)" opacity="0.9" />
      <text x="340" y="383" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">代理 2</text>
      <text x="340" y="398" textAnchor="middle" fontSize="8" fill="#cffafe">过滤</text>

      <path d="M385 383 L425 383" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />

      <rect x="430" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-gateway)" opacity="0.9" />
      <text x="470" y="383" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">网关</text>
      <text x="470" y="398" textAnchor="middle" fontSize="8" fill="#fef3c7">协议转换</text>

      <path d="M515 383 L555 383" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />

      <rect x="560" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-proxy)" opacity="0.9" />
      <text x="600" y="383" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">代理 3</text>
      <text x="600" y="398" textAnchor="middle" fontSize="8" fill="#cffafe">负载均衡</text>

      <path d="M645 383 L685 383" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-px-arrow)" />

      <rect x="690" y="360" width="80" height="46" rx="6" fill="url(#hdg-px-server)" opacity="0.9" />
      <text x="730" y="388" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>

      {/* 隧道与中继 */}
      <rect x="20" y="432" width="370" height="92" rx="8" fill="url(#hdg-px-gateway)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="35" y="454" fontSize="12" fontWeight="700" fill="#92400e">隧道（Tunnel）</text>
      <text x="35" y="474" fontSize="10" fill="#475569">盲转发 HTTP 数据，不解析不修改</text>
      <text x="35" y="492" fontSize="10" fill="#475569">根据 CONNECT 建立盲转通路</text>
      <text x="35" y="510" fontSize="10" fill="#475569">用途：HTTPS 经 HTTP 代理穿透</text>

      <rect x="410" y="432" width="370" height="92" rx="8" fill="url(#hdg-px-client)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="425" y="454" fontSize="12" fontWeight="700" fill="#1e40af">中继（Relay）</text>
      <text x="425" y="474" fontSize="10" fill="#475569">不完整代理，只做简单转发</text>
      <text x="425" y="492" fontSize="10" fill="#475569">不处理首部、不盲转 CONNECT</text>
      <text x="425" y="510" fontSize="10" fill="#475569">可能导致连接管理问题，应避免</text>
    </svg>
  );
}
