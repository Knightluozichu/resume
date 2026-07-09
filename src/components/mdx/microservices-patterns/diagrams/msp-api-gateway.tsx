"use client";

export function MspApiGatewayDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="API网关与BFF模式">
      <defs>
        <linearGradient id="msp-gw-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-bff-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="msp-gw-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">API网关与BFF模式</text>

      {/* 普通API网关 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">普通API网关（一个网关服务所有客户端）</text>

      <rect x="40" y="70" width="60" height="40" rx="6" fill="#64748b" />
      <text x="70" y="95" textAnchor="middle" fontSize="11" fill="#fff">Web</text>

      <rect x="40" y="120" width="60" height="40" rx="6" fill="#64748b" />
      <text x="70" y="145" textAnchor="middle" fontSize="11" fill="#fff">iOS</text>

      <rect x="40" y="170" width="60" height="40" rx="6" fill="#64748b" />
      <text x="70" y="195" textAnchor="middle" fontSize="11" fill="#fff">Android</text>

      <path d="M105 90 L195 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M105 140 L195 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M105 190 L195 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />

      <rect x="200" y="110" width="140" height="60" rx="10" fill="url(#msp-gw-grad)" />
      <text x="270" y="135" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">API网关</text>
      <text x="270" y="155" textAnchor="middle" fontSize="11" fill="#bfdbfe">路由/聚合/认证/限流</text>

      <path d="M345 130 L395 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M345 140 L395 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M345 150 L395 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />

      <rect x="400" y="70" width="90" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="445" y="95" textAnchor="middle" fontSize="11" fill="#1d4ed8">订单服务</text>

      <rect x="400" y="120" width="90" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="445" y="145" textAnchor="middle" fontSize="11" fill="#1d4ed8">用户服务</text>

      <rect x="400" y="170" width="90" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="445" y="195" textAnchor="middle" fontSize="11" fill="#1d4ed8">商品服务</text>

      <text x="600" y="100" textAnchor="middle" fontSize="11" fill="#dc2626">问题：</text>
      <text x="600" y="120" textAnchor="middle" fontSize="11" fill="#dc2626">不同客户端需求不同</text>
      <text x="600" y="138" textAnchor="middle" fontSize="11" fill="#dc2626">一个网关变臃肿</text>
      <text x="600" y="156" textAnchor="middle" fontSize="11" fill="#dc2626">改一个影响全部</text>

      {/* 分隔线 */}
      <line x1="40" y1="225" x2="760" y2="225" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,4" />

      {/* BFF模式 */}
      <text x="400" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#6d28d9">BFF模式（每种客户端一个专用网关）</text>

      <rect x="40" y="265" width="60" height="35" rx="6" fill="#64748b" />
      <text x="70" y="288" textAnchor="middle" fontSize="11" fill="#fff">Web</text>

      <rect x="40" y="310" width="60" height="35" rx="6" fill="#64748b" />
      <text x="70" y="333" textAnchor="middle" fontSize="11" fill="#fff">iOS</text>

      <rect x="40" y="355" width="60" height="35" rx="6" fill="#64748b" />
      <text x="70" y="378" textAnchor="middle" fontSize="11" fill="#fff">Android</text>

      <path d="M105 282 L175 282" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M105 327 L175 327" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M105 372 L175 372" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />

      <rect x="180" y="265" width="100" height="35" rx="8" fill="url(#msp-bff-grad)" />
      <text x="230" y="288" textAnchor="middle" fontSize="11" fill="#fff">Web BFF</text>

      <rect x="180" y="310" width="100" height="35" rx="8" fill="url(#msp-bff-grad)" />
      <text x="230" y="333" textAnchor="middle" fontSize="11" fill="#fff">iOS BFF</text>

      <rect x="180" y="355" width="100" height="35" rx="8" fill="url(#msp-bff-grad)" />
      <text x="230" y="378" textAnchor="middle" fontSize="11" fill="#fff">Android BFF</text>

      <path d="M285 282 L345 282" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M285 327 L345 327" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />
      <path d="M285 372 L345 372" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-gw-arrow)" />

      <rect x="350" y="265" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="395" y="288" textAnchor="middle" fontSize="11" fill="#1d4ed8">订单服务</text>

      <rect x="350" y="310" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="395" y="333" textAnchor="middle" fontSize="11" fill="#1d4ed8">用户服务</text>

      <rect x="350" y="355" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="395" y="378" textAnchor="middle" fontSize="11" fill="#1d4ed8">商品服务</text>

      <text x="600" y="285" textAnchor="middle" fontSize="11" fill="#065f46">优势：</text>
      <text x="600" y="305" textAnchor="middle" fontSize="11" fill="#065f46">精确裁剪数据（移动端精简）</text>
      <text x="600" y="323" textAnchor="middle" fontSize="11" fill="#065f46">定制聚合逻辑</text>
      <text x="600" y="341" textAnchor="middle" fontSize="11" fill="#065f46">独立演进（改iOS不影响Android）</text>
      <text x="600" y="359" textAnchor="middle" fontSize="11" fill="#92400e">代价：网关数量增加</text>

      {/* 网关核心职责 */}
      <rect x="40" y="410" width="720" height="115" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="435" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">API网关七大核心职责</text>
      <text x="170" y="460" textAnchor="middle" fontSize="11" fill="#1e40af">请求路由</text>
      <text x="310" y="460" textAnchor="middle" fontSize="11" fill="#1e40af">请求聚合</text>
      <text x="450" y="460" textAnchor="middle" fontSize="11" fill="#1e40af">协议转换(HTTP→gRPC)</text>
      <text x="620" y="460" textAnchor="middle" fontSize="11" fill="#1e40af">认证授权</text>
      <text x="170" y="485" textAnchor="middle" fontSize="11" fill="#1e40af">限流熔断</text>
      <text x="310" y="485" textAnchor="middle" fontSize="11" fill="#1e40af">缓存</text>
      <text x="450" y="485" textAnchor="middle" fontSize="11" fill="#1e40af">日志监控</text>
      <text x="620" y="485" textAnchor="middle" fontSize="11" fill="#1e40af">CORS处理</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">反模式：网关含业务逻辑/直连数据库/单一网关做所有事</text>
    </svg>
  );
}
