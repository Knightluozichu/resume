"use client";

export function IlhHttpBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="HTTP基础：TCP/IP协议栈与请求响应模型">
      <defs>
        <linearGradient id="ilh-hb-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-hb-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ilh-hb-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-hb-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ilh-hb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP/IP 四层协议栈与HTTP</text>

      {/* 发送方协议栈 */}
      <text x="150" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">客户端（发送方）</text>
      <rect x="70" y="70" width="160" height="50" rx="8" fill="url(#ilh-hb-app)" opacity="0.95" />
      <text x="150" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">应用层</text>
      <text x="150" y="110" textAnchor="middle" fontSize="11" fill="#bfdbfe">HTTP / FTP / DNS</text>

      <rect x="70" y="130" width="160" height="50" rx="8" fill="url(#ilh-hb-trans)" opacity="0.95" />
      <text x="150" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">传输层</text>
      <text x="150" y="170" textAnchor="middle" fontSize="11" fill="#cffafe">TCP / UDP</text>

      <rect x="70" y="190" width="160" height="50" rx="8" fill="url(#ilh-hb-net)" opacity="0.95" />
      <text x="150" y="212" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">网络层</text>
      <text x="150" y="230" textAnchor="middle" fontSize="11" fill="#fef3c7">IP / ICMP</text>

      <rect x="70" y="250" width="160" height="50" rx="8" fill="url(#ilh-hb-link)" opacity="0.95" />
      <text x="150" y="272" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">数据链路层</text>
      <text x="150" y="290" textAnchor="middle" fontSize="11" fill="#ede9fe">以太网 / Wi-Fi</text>

      {/* 接收方协议栈 */}
      <text x="650" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">服务器（接收方）</text>
      <rect x="570" y="70" width="160" height="50" rx="8" fill="url(#ilh-hb-app)" opacity="0.95" />
      <text x="650" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">应用层</text>
      <text x="650" y="110" textAnchor="middle" fontSize="11" fill="#bfdbfe">HTTP / FTP / DNS</text>

      <rect x="570" y="130" width="160" height="50" rx="8" fill="url(#ilh-hb-trans)" opacity="0.95" />
      <text x="650" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">传输层</text>
      <text x="650" y="170" textAnchor="middle" fontSize="11" fill="#cffafe">TCP / UDP</text>

      <rect x="570" y="190" width="160" height="50" rx="8" fill="url(#ilh-hb-net)" opacity="0.95" />
      <text x="650" y="212" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">网络层</text>
      <text x="650" y="230" textAnchor="middle" fontSize="11" fill="#fef3c7">IP / ICMP</text>

      <rect x="570" y="250" width="160" height="50" rx="8" fill="url(#ilh-hb-link)" opacity="0.95" />
      <text x="650" y="272" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">数据链路层</text>
      <text x="650" y="290" textAnchor="middle" fontSize="11" fill="#ede9fe">以太网 / Wi-Fi</text>

      {/* 数据流箭头 */}
      <path d="M230 95 L570 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hb-arrow)" />
      <text x="400" y="88" textAnchor="middle" fontSize="10" fill="#475569">HTTP数据流</text>
      <path d="M230 155 L570 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hb-arrow)" />
      <text x="400" y="148" textAnchor="middle" fontSize="10" fill="#475569">TCP分段</text>
      <path d="M230 215 L570 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hb-arrow)" />
      <text x="400" y="208" textAnchor="middle" fontSize="10" fill="#475569">IP数据包</text>
      <path d="M230 275 L570 275" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hb-arrow)" />
      <text x="400" y="268" textAnchor="middle" fontSize="10" fill="#475569">帧传输</text>

      {/* 请求-响应模型 */}
      <rect x="20" y="330" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">HTTP请求-响应模型</text>

      <rect x="60" y="370" width="250" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="185" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1d4ed8">HTTP请求</text>
      <text x="185" y="408" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">GET /index.html HTTP/1.1</text>
      <text x="185" y="420" textAnchor="middle" fontSize="10" fill="#1e40af" fontFamily="monospace">Host: www.example.com</text>

      <path d="M315 395 L485 395" stroke="#64748b" strokeWidth="2" markerEnd="url(#ilh-hb-arrow)" />

      <rect x="490" y="370" width="250" height="55" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="615" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">HTTP响应</text>
      <text x="615" y="408" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">HTTP/1.1 200 OK</text>
      <text x="615" y="420" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">Content-Type: text/html</text>

      <text x="400" y="455" textAnchor="middle" fontSize="11" fill="#475569">无状态：每个请求独立，服务器不保留客户端状态</text>
      <text x="400" y="475" textAnchor="middle" fontSize="11" fill="#475569">URI = 统一资源标识符，URL = 统一资源定位符（URI的子集）</text>
      <text x="400" y="495" textAnchor="middle" fontSize="11" fill="#64748b">HTTP默认端口80，HTTPS默认端口443</text>
    </svg>
  );
}
