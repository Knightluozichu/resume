"use client";

export function IlhHeadersDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="HTTP首部分类与结构">
      <defs>
        <linearGradient id="ilh-hd-general" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-hd-req" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ilh-hd-res" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-hd-entity" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP首部分类体系</text>

      {/* 四大分类 */}
      <rect x="20" y="50" width="180" height="130" rx="10" fill="url(#ilh-hd-general)" opacity="0.95" />
      <text x="110" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">通用首部</text>
      <line x1="35" y1="85" x2="185" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="110" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">Cache-Control</text>
      <text x="110" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">Connection</text>
      <text x="110" y="147" textAnchor="middle" fontSize="11" fill="#bfdbfe">Date</text>
      <text x="110" y="167" textAnchor="middle" fontSize="11" fill="#bfdbfe">Transfer-Encoding</text>

      <rect x="210" y="50" width="180" height="130" rx="10" fill="url(#ilh-hd-req)" opacity="0.95" />
      <text x="300" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">请求首部</text>
      <line x1="225" y1="85" x2="375" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="300" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">Host</text>
      <text x="300" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">Accept</text>
      <text x="300" y="147" textAnchor="middle" fontSize="11" fill="#a5f3fc">User-Agent</text>
      <text x="300" y="167" textAnchor="middle" fontSize="11" fill="#a5f3fc">Authorization</text>

      <rect x="400" y="50" width="180" height="130" rx="10" fill="url(#ilh-hd-res)" opacity="0.95" />
      <text x="490" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">响应首部</text>
      <line x1="415" y1="85" x2="565" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="490" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">Location</text>
      <text x="490" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">Server</text>
      <text x="490" y="147" textAnchor="middle" fontSize="11" fill="#fde68a">WWW-Authenticate</text>
      <text x="490" y="167" textAnchor="middle" fontSize="11" fill="#fde68a">Set-Cookie</text>

      <rect x="590" y="50" width="190" height="130" rx="10" fill="url(#ilh-hd-entity)" opacity="0.95" />
      <text x="685" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">实体首部</text>
      <line x1="605" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="685" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">Content-Type</text>
      <text x="685" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">Content-Length</text>
      <text x="685" y="147" textAnchor="middle" fontSize="11" fill="#ddd6fe">Content-Encoding</text>
      <text x="685" y="167" textAnchor="middle" fontSize="11" fill="#ddd6fe">Last-Modified</text>

      {/* 报文结构 */}
      <rect x="20" y="200" width="760" height="280" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="223" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP报文结构（首部在报文中位置）</text>

      {/* 请求报文结构 */}
      <text x="200" y="248" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">请求报文</text>
      <rect x="60" y="255" width="280" height="28" rx="4" fill="#1e293b" />
      <text x="200" y="274" textAnchor="middle" fontSize="10" fill="#e2e8f0" fontFamily="monospace">GET /index.html HTTP/1.1</text>
      <text x="350" y="272" fontSize="10" fill="#64748b">请求行</text>

      <rect x="60" y="286" width="280" height="60" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="75" y="303" fontSize="9" fill="#1e40af" fontFamily="monospace">Host: www.example.com</text>
      <text x="75" y="318" fontSize="9" fill="#1e40af" fontFamily="monospace">Accept: text/html</text>
      <text x="75" y="333" fontSize="9" fill="#1e40af" fontFamily="monospace">User-Agent: Mozilla/5.0</text>
      <text x="350" y="320" fontSize="10" fill="#64748b">请求首部</text>

      <rect x="60" y="349" width="280" height="28" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="75" y="367" fontSize="9" fill="#5b21b6" fontFamily="monospace">Content-Type: application/json</text>
      <text x="350" y="366" fontSize="10" fill="#64748b">实体首部</text>

      {/* 响应报文结构 */}
      <text x="600" y="248" textAnchor="middle" fontSize="12" fontWeight="600" fill="#d97706">响应报文</text>
      <rect x="460" y="255" width="280" height="28" rx="4" fill="#1e293b" />
      <text x="600" y="274" textAnchor="middle" fontSize="10" fill="#e2e8f0" fontFamily="monospace">HTTP/1.1 200 OK</text>
      <text x="750" y="272" textAnchor="end" fontSize="10" fill="#64748b">状态行</text>

      <rect x="460" y="286" width="280" height="60" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="475" y="303" fontSize="9" fill="#78350f" fontFamily="monospace">Server: Apache/2.4.1</text>
      <text x="475" y="318" fontSize="9" fill="#78350f" fontFamily="monospace">Date: Sat, 01 Jan 2022</text>
      <text x="475" y="333" fontSize="9" fill="#78350f" fontFamily="monospace">Set-Cookie: sid=abc123</text>
      <text x="750" y="320" textAnchor="end" fontSize="10" fill="#64748b">响应首部</text>

      <rect x="460" y="349" width="280" height="28" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <text x="475" y="367" fontSize="9" fill="#5b21b6" fontFamily="monospace">Content-Type: text/html</text>
      <text x="750" y="366" textAnchor="end" fontSize="10" fill="#64748b">实体首部</text>

      {/* Cookie说明 */}
      <rect x="60" y="395" width="680" height="65" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
      <text x="400" y="415" textAnchor="middle" fontSize="12" fontWeight="600" fill="#be185d">Cookie机制</text>
      <text x="400" y="433" textAnchor="middle" fontSize="11" fill="#831843">服务器通过响应首部 Set-Cookie 下发Cookie → 客户端保存</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#831843">后续请求通过请求首部 Cookie 携带回服务器（弥补HTTP无状态）</text>
    </svg>
  );
}
