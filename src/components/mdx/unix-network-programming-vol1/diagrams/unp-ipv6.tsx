"use client";

export function UnpIpv6Diagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="IPv6与协议无关编程">
      <defs>
        <linearGradient id="unp-v6-v4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-v6-v6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-v6-uni" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-v6-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">协议无关编程：IPv4 与 IPv6 统一</text>

      {/* 传统方式 */}
      <rect x="40" y="50" width="340" height="100" rx="10" fill="url(#unp-v6-v4)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="73" fontSize="13" fontWeight="700" fill="#1e40af">传统方式（硬编码 IPv4）</text>
      <text x="60" y="93" fontSize="10" fill="#475569" fontFamily="monospace">struct sockaddr_in addr;</text>
      <text x="60" y="108" fontSize="10" fill="#475569" fontFamily="monospace">addr.sin_family = AF_INET;</text>
      <text x="60" y="123" fontSize="10" fill="#475569" fontFamily="monospace">inet_pton(AF_INET, "1.2.3.4", &amp;addr.sin_addr);</text>
      <text x="60" y="140" fontSize="9" fill="#94a3b8">问题：代码绑定 IPv4，无法支持 IPv6</text>

      {/* 协议无关方式 */}
      <rect x="420" y="50" width="340" height="100" rx="10" fill="url(#unp-v6-uni)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="73" fontSize="13" fontWeight="700" fill="#065f46">协议无关方式（推荐）</text>
      <text x="440" y="93" fontSize="10" fill="#475569" fontFamily="monospace">struct addrinfo hints, *res;</text>
      <text x="440" y="108" fontSize="10" fill="#475569" fontFamily="monospace">getaddrinfo(host, port, &amp;hints, &amp;res);</text>
      <text x="440" y="123" fontSize="10" fill="#475569" fontFamily="monospace">// res 自适应 IPv4 或 IPv6</text>
      <text x="440" y="140" fontSize="9" fill="#94a3b8">同一代码同时支持 IPv4/IPv6</text>

      {/* 地址结构对比 */}
      <rect x="40" y="165" width="340" height="160" rx="10" fill="url(#unp-v6-v4)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="188" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">sockaddr_in（IPv4 · 16字节）</text>
      <text x="55" y="210" fontSize="10" fill="#475569" fontFamily="monospace">sin_family   (2)  = AF_INET</text>
      <text x="55" y="226" fontSize="10" fill="#475569" fontFamily="monospace">sin_port     (2)  = htons()</text>
      <text x="55" y="242" fontSize="10" fill="#475569" fontFamily="monospace">sin_addr     (4)  = 32位IPv4</text>
      <text x="55" y="258" fontSize="10" fill="#475569" fontFamily="monospace">sin_zero[8]  (8)  = 填充</text>
      <text x="55" y="285" fontSize="10" fill="#1e40af">文本表示：192.168.1.1</text>
      <text x="55" y="302" fontSize="10" fill="#1e40af">函数：inet_pton / inet_ntop</text>

      <rect x="420" y="165" width="340" height="160" rx="10" fill="url(#unp-v6-v6)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="188" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">sockaddr_in6（IPv6 · 28字节）</text>
      <text x="435" y="210" fontSize="10" fill="#475569" fontFamily="monospace">sin6_family   (2)  = AF_INET6</text>
      <text x="435" y="226" fontSize="10" fill="#475569" fontFamily="monospace">sin6_port     (2)  = htons()</text>
      <text x="435" y="242" fontSize="10" fill="#475569" fontFamily="monospace">sin6_flowinfo (4)  = 流标签</text>
      <text x="435" y="258" fontSize="10" fill="#475569" fontFamily="monospace">sin6_addr     (16) = 128位IPv6</text>
      <text x="435" y="274" fontSize="10" fill="#475569" fontFamily="monospace">sin6_scope_id (4)  = 范围ID</text>
      <text x="435" y="302" fontSize="10" fill="#5b21b6">文本表示：2001:db8::1</text>

      {/* getaddrinfo 流程 */}
      <rect x="40" y="340" width="720" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="363" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">getaddrinfo 协议无关流程</text>

      <rect x="60" y="378" width="200" height="36" rx="8" fill="url(#unp-v6-uni)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="160" y="401" textAnchor="middle" fontSize="11" fill="#065f46">设置 hints（AF_UNSPEC）</text>

      <path d="M260 396 L300 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-v6-arrow)" />

      <rect x="300" y="378" width="200" height="36" rx="8" fill="url(#unp-v6-uni)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="401" textAnchor="middle" fontSize="11" fill="#065f46">getaddrinfo() 解析</text>

      <path d="M500 396 L540 396" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-v6-arrow)" />

      <rect x="540" y="378" width="200" height="36" rx="8" fill="url(#unp-v6-uni)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="401" textAnchor="middle" fontSize="11" fill="#065f46">遍历 res 链表</text>

      <path d="M640 414 L640 430" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-v6-arrow)" />

      <rect x="540" y="432" width="200" height="36" rx="8" fill="url(#unp-v6-uni)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="640" y="455" textAnchor="middle" fontSize="11" fill="#065f46">socket() + connect()</text>

      <path d="M540 450 L200 450" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-v6-arrow)" />

      <rect x="60" y="432" width="200" height="36" rx="8" fill="url(#unp-v6-uni)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="160" y="455" textAnchor="middle" fontSize="11" fill="#065f46">成功则 break</text>

      <text x="400" y="495" textAnchor="middle" fontSize="10" fill="#94a3b8">getaddrinfo 返回 addrinfo 链表，每个节点含 sockaddr 结构（可能是 IPv4 或 IPv6）</text>
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#94a3b8">遍历链表逐个尝试，成功则使用；全部失败则报错。用完调 freeaddrinfo 释放。</text>
    </svg>
  );
}
