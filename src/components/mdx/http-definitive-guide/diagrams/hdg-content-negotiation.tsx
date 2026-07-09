"use client";

export function HdgContentNegotiationDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="内容协商与转码">
      <defs>
        <linearGradient id="hdg-cn-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-cn-agent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-cn-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-cn-proxy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-cn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">内容协商与转码</text>

      {/* 服务器驱动协商 */}
      <text x="200" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">服务器驱动协商</text>

      <rect x="20" y="68" width="380" height="190" rx="8" fill="url(#hdg-cn-server)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />

      <rect x="35" y="80" width="80" height="30" rx="4" fill="url(#hdg-cn-agent)" opacity="0.9" />
      <text x="75" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>

      <path d="M120 95 L200 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cn-arrow)" />

      <rect x="205" y="80" width="80" height="30" rx="4" fill="url(#hdg-cn-server)" opacity="0.9" />
      <text x="245" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>

      <rect x="35" y="120" width="350" height="56" rx="4" fill="#dbeafe" />
      <text x="45" y="138" fontSize="10" fontWeight="600" fill="#1e40af">客户端发送 Accept 首部：</text>
      <text x="45" y="154" fontSize="9" fontFamily="monospace" fill="#475569">Accept: text/html, application/json</text>
      <text x="45" y="168" fontSize="9" fontFamily="monospace" fill="#475569">Accept-Language: zh-CN, en</text>

      <path d="M245 182 L245 192" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cn-arrow)" />

      <rect x="35" y="196" width="350" height="52" rx="4" fill="#d1fae5" />
      <text x="45" y="214" fontSize="10" fontWeight="600" fill="#065f46">服务器选择最佳表示并返回：</text>
      <text x="45" y="230" fontSize="9" fontFamily="monospace" fill="#475569">Content-Type: text/html</text>
      <text x="45" y="244" fontSize="9" fontFamily="monospace" fill="#475569">Content-Language: zh-CN</text>

      {/* 客户端驱动协商 */}
      <text x="600" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">客户端驱动协商</text>

      <rect x="420" y="68" width="360" height="190" rx="8" fill="url(#hdg-cn-agent)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />

      <rect x="435" y="80" width="70" height="30" rx="4" fill="url(#hdg-cn-agent)" opacity="0.9" />
      <text x="470" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>

      <path d="M510 95 L590 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cn-arrow)" />

      <rect x="595" y="80" width="70" height="30" rx="4" fill="url(#hdg-cn-server)" opacity="0.9" />
      <text x="630" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">服务器</text>

      <rect x="435" y="120" width="330" height="30" rx="4" fill="#d1fae5" />
      <text x="600" y="139" textAnchor="middle" fontSize="10" fill="#065f46">1. 请求资源（不指定偏好）</text>

      <path d="M630 155 L510 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cn-arrow)" />

      <rect x="435" y="160" width="330" height="30" rx="4" fill="#fef3c7" />
      <text x="600" y="179" textAnchor="middle" fontSize="10" fill="#92400e">2. 300 Multiple Choices（可用表示列表）</text>

      <path d="M470 195 L590 195" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cn-arrow)" />

      <rect x="435" y="200" width="330" height="30" rx="4" fill="#d1fae5" />
      <text x="600" y="219" textAnchor="middle" fontSize="10" fill="#065f46">3. 客户端选择后发起新请求</text>

      <text x="600" y="248" textAnchor="middle" fontSize="9" fill="#64748b">客户端自主选择，服务器不决策</text>

      {/* 透明协商 */}
      <text x="200" y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">透明协商</text>

      <rect x="20" y="300" width="380" height="90" rx="8" fill="url(#hdg-cn-proxy)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="35" y="322" fontSize="11" fontWeight="700" fill="#5b21b6">中间代理负责协商</text>
      <text x="35" y="340" fontSize="10" fill="#475569">代理同时联系服务器和客户端</text>
      <text x="35" y="356" fontSize="10" fill="#475569">代理根据 Accept 首部选择最佳表示</text>
      <text x="35" y="372" fontSize="10" fill="#475569">服务器无需协商逻辑，代理可缓存</text>

      {/* 转码 */}
      <text x="600" y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">转码（Transcoding）</text>

      <rect x="420" y="300" width="360" height="90" rx="8" fill="url(#hdg-cn-trans)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="435" y="322" fontSize="11" fontWeight="700" fill="#92400e">代理/网关修改内容表示</text>
      <text x="435" y="340" fontSize="10" fill="#475569">格式转换：HTML → WML（旧手机）</text>
      <text x="435" y="356" fontSize="10" fill="#475569">压缩：Gzip 压缩减少传输量</text>
      <text x="435" y="372" fontSize="10" fill="#475569">内容适配：图片缩放、语言翻译</text>

      {/* Accept 首部汇总 */}
      <rect x="20" y="408" width="760" height="96" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="430" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">内容协商核心 Accept 首部</text>

      <rect x="40" y="442" width="170" height="50" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <text x="125" y="460" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Accept</text>
      <text x="125" y="476" textAnchor="middle" fontSize="9" fill="#475569">期望的 MIME 类型</text>
      <text x="125" y="488" textAnchor="middle" fontSize="9" fill="#64748b">text/html, image/*</text>

      <rect x="230" y="442" width="170" height="50" rx="6" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="315" y="460" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">Accept-Language</text>
      <text x="315" y="476" textAnchor="middle" fontSize="9" fill="#475569">期望的语言</text>
      <text x="315" y="488" textAnchor="middle" fontSize="9" fill="#64748b">zh-CN, en;q=0.8</text>

      <rect x="420" y="442" width="170" height="50" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
      <text x="505" y="460" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Accept-Encoding</text>
      <text x="505" y="476" textAnchor="middle" fontSize="9" fill="#475569">期望的编码方式</text>
      <text x="505" y="488" textAnchor="middle" fontSize="9" fill="#64748b">gzip, deflate, br</text>

      <rect x="610" y="442" width="150" height="50" rx="6" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
      <text x="685" y="460" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Accept-Charset</text>
      <text x="685" y="476" textAnchor="middle" fontSize="9" fill="#475569">期望的字符集</text>
      <text x="685" y="488" textAnchor="middle" fontSize="9" fill="#64748b">UTF-8, ISO-8859-1</text>
    </svg>
  );
}
