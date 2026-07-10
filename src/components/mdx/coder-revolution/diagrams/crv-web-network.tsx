"use client";

export function CrvWebNetworkDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Web与网络HTTP请求响应与TCP/IP分层图">
      <defs>
        <linearGradient id="crv-wn-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-wn-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-wn-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-wn-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-wn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Web 与网络：请求的旅程</text>

      {/* HTTP 请求/响应 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">HTTP 请求与响应</text>

      <rect x="30" y="74" width="220" height="100" rx="10" fill="url(#crv-wn-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="140" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">浏览器</text>
      <text x="140" y="118" textAnchor="middle" fontSize="10" fill="#475569">输入 URL</text>
      <text x="140" y="134" textAnchor="middle" fontSize="10" fill="#475569">DNS 解析域名</text>
      <text x="140" y="150" textAnchor="middle" fontSize="10" fill="#475569">建立 TCP 连接</text>
      <text x="140" y="166" textAnchor="middle" fontSize="10" fill="#475569">发送 HTTP 请求</text>

      <path d="M250 124 L320 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />
      <text x="285" y="116" textAnchor="middle" fontSize="9" fill="#64748b">请求</text>

      <rect x="324" y="74" width="220" height="100" rx="10" fill="url(#crv-wn-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="434" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">服务器</text>
      <text x="434" y="118" textAnchor="middle" fontSize="10" fill="#475569">接收请求</text>
      <text x="434" y="134" textAnchor="middle" fontSize="10" fill="#475569">路由分发</text>
      <text x="434" y="150" textAnchor="middle" fontSize="10" fill="#475569">业务处理</text>
      <text x="434" y="166" textAnchor="middle" fontSize="10" fill="#475569">返回 HTTP 响应</text>

      <path d="M544 124 L614 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />
      <text x="579" y="116" textAnchor="middle" fontSize="9" fill="#64748b">响应</text>

      <rect x="618" y="74" width="152" height="100" rx="10" fill="url(#crv-wn-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="694" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">渲染</text>
      <text x="694" y="118" textAnchor="middle" fontSize="10" fill="#475569">解析 HTML</text>
      <text x="694" y="134" textAnchor="middle" fontSize="10" fill="#475569">构建 DOM 树</text>
      <text x="694" y="150" textAnchor="middle" fontSize="10" fill="#475569">加载 CSS/JS</text>
      <text x="694" y="166" textAnchor="middle" fontSize="10" fill="#475569">页面呈现</text>

      {/* TCP/IP 四层模型 */}
      <text x="400" y="204" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TCP/IP 四层模型</text>

      <rect x="60" y="216" width="680" height="38" rx="8" fill="url(#crv-wn-1)" opacity="0.9" />
      <text x="100" y="240" fontSize="12" fontWeight="700" fill="#fff">应用层</text>
      <text x="200" y="240" fontSize="11" fill="#e0f2fe">HTTP / HTTPS / DNS / FTP——负责应用间通信</text>

      <path d="M400 254 L400 258" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />

      <rect x="60" y="262" width="680" height="38" rx="8" fill="url(#crv-wn-2)" opacity="0.9" />
      <text x="100" y="286" fontSize="12" fontWeight="700" fill="#fff">传输层</text>
      <text x="200" y="286" fontSize="11" fill="#f3e8ff">TCP（可靠）/ UDP（快速）——端到端数据传输</text>

      <path d="M400 300 L400 304" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />

      <rect x="60" y="308" width="680" height="38" rx="8" fill="url(#crv-wn-3)" opacity="0.9" />
      <text x="100" y="332" fontSize="12" fontWeight="700" fill="#fff">网络层</text>
      <text x="200" y="332" fontSize="11" fill="#dcfce7">IP / ICMP / 路由——跨网络数据包传输</text>

      <path d="M400 346 L400 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />

      <rect x="60" y="354" width="680" height="38" rx="8" fill="url(#crv-wn-4)" opacity="0.9" />
      <text x="100" y="378" fontSize="12" fontWeight="700" fill="#fff">链路层</text>
      <text x="200" y="378" fontSize="11" fill="#fef9c3">以太网 / ARP——物理帧传输</text>

      {/* TCP 三次握手 */}
      <text x="400" y="418" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TCP 三次握手</text>

      <rect x="30" y="430" width="180" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="454" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">SYN</text>
      <text x="120" y="472" textAnchor="middle" fontSize="9" fill="#475569">客户端发起连接</text>

      <path d="M210 458 L280 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />

      <rect x="284" y="430" width="180" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="374" y="454" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">SYN + ACK</text>
      <text x="374" y="472" textAnchor="middle" fontSize="9" fill="#475569">服务器确认并回应</text>

      <path d="M464 458 L534 458" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-wn-arrow)" />

      <rect x="538" y="430" width="180" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="628" y="454" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">ACK</text>
      <text x="628" y="472" textAnchor="middle" fontSize="9" fill="#475569">客户端确认建立</text>

      {/* 底部总结 */}
      <rect x="30" y="504" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="524" textAnchor="middle" fontSize="10" fill="#475569">URL → DNS → TCP三次握手 → HTTP请求 → 服务器处理 → HTTP响应 → 浏览器渲染</text>

      <rect x="30" y="544" width="740" height="28" rx="8" fill="url(#crv-wn-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心：应用层 → 传输层 → 网络层 → 链路层，数据逐层封装</text>
    </svg>
  );
}
