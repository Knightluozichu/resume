"use client";

export function CntNetworkLayerDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="网络层数据平面转发与IP协议图">
      <defs>
        <linearGradient id="cnt-nl-router" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-nl-ip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-nl-nat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="cnt-nl-v6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="cnt-nl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">网络层数据平面：路由器转发与IP协议</text>

      {/* 路由器转发 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">路由器转发流程（最长前缀匹配）</text>

      <rect x="30" y="70" width="100" height="50" rx="8" fill="url(#cnt-nl-router)" opacity="0.9" />
      <text x="80" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">入口端口</text>
      <text x="80" y="112" textAnchor="middle" fontSize="10" fill="#bfdbfe">收到IP数据报</text>

      <rect x="180" y="70" width="140" height="50" rx="8" fill="url(#cnt-nl-ip)" opacity="0.85" />
      <text x="250" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">查找转发表</text>
      <text x="250" y="112" textAnchor="middle" fontSize="10" fill="#fef3c7">最长前缀匹配</text>

      <rect x="370" y="70" width="100" height="50" rx="8" fill="url(#cnt-nl-router)" opacity="0.9" />
      <text x="420" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">交换结构</text>
      <text x="420" y="112" textAnchor="middle" fontSize="10" fill="#bfdbfe">内存/总线/互联</text>

      <rect x="520" y="70" width="100" height="50" rx="8" fill="url(#cnt-nl-router)" opacity="0.9" />
      <text x="570" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">出口端口</text>
      <text x="570" y="112" textAnchor="middle" fontSize="10" fill="#bfdbfe">队列调度发送</text>

      <rect x="670" y="70" width="100" height="50" rx="8" fill="url(#cnt-nl-nat)" opacity="0.9" />
      <text x="720" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">输出链路</text>
      <text x="720" y="112" textAnchor="middle" fontSize="10" fill="#d1fae5">封装为帧</text>

      <path d="M130 95 L180 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />
      <path d="M320 95 L370 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />
      <path d="M470 95 L520 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />
      <path d="M620 95 L670 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />

      {/* IP数据报格式 */}
      <text x="400" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">IPv4数据报首部格式</text>

      <rect x="30" y="170" width="740" height="130" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />

      <rect x="40" y="180" width="80" height="25" fill="#fbbf24" opacity="0.4" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="80" y="197" textAnchor="middle" fontSize="9" fill="#92400e">版本(4)</text>

      <rect x="120" y="180" width="80" height="25" fill="#fbbf24" opacity="0.3" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="160" y="197" textAnchor="middle" fontSize="9" fill="#92400e">首部长(4)</text>

      <rect x="200" y="180" width="120" height="25" fill="#fbbf24" opacity="0.2" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="260" y="197" textAnchor="middle" fontSize="9" fill="#92400e">服务类型(8)</text>

      <rect x="320" y="180" width="160" height="25" fill="#fbbf24" opacity="0.4" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="400" y="197" textAnchor="middle" fontSize="9" fill="#92400e">总长度(16)</text>

      <rect x="480" y="180" width="140" height="25" fill="#fbbf24" opacity="0.3" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="550" y="197" textAnchor="middle" fontSize="9" fill="#92400e">标识(16)</text>

      <rect x="620" y="180" width="70" height="25" fill="#fbbf24" opacity="0.2" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="655" y="197" textAnchor="middle" fontSize="8" fill="#92400e">标志(3)</text>

      <rect x="690" y="180" width="70" height="25" fill="#fbbf24" opacity="0.2" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="725" y="197" textAnchor="middle" fontSize="8" fill="#92400e">片偏移(13)</text>

      <rect x="40" y="210" width="100" height="25" fill="#f59e0b" opacity="0.5" stroke="#d97706" strokeWidth="0.5" />
      <text x="90" y="227" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">TTL(8)</text>

      <rect x="140" y="210" width="100" height="25" fill="#f59e0b" opacity="0.5" stroke="#d97706" strokeWidth="0.5" />
      <text x="190" y="227" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">协议(8)</text>

      <rect x="240" y="210" width="140" height="25" fill="#f59e0b" opacity="0.4" stroke="#d97706" strokeWidth="0.5" />
      <text x="310" y="227" textAnchor="middle" fontSize="9" fill="#fff">首部校验和(16)</text>

      <rect x="380" y="210" width="380" height="25" fill="#2563eb" opacity="0.3" stroke="#1d4ed8" strokeWidth="0.5" />
      <text x="570" y="227" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">源IP地址(32)</text>

      <rect x="40" y="240" width="720" height="25" fill="#0891b2" opacity="0.2" stroke="#0e7490" strokeWidth="0.5" />
      <text x="400" y="257" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0e7490">目的IP地址(32)</text>

      <rect x="40" y="270" width="720" height="20" fill="#94a3b8" opacity="0.15" stroke="#64748b" strokeWidth="0.5" />
      <text x="400" y="284" textAnchor="middle" fontSize="9" fill="#475569">选项（可选，可变长） + 数据载荷</text>

      {/* NAT */}
      <text x="400" y="328" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">NAT网络地址转换</text>

      <rect x="30" y="340" width="160" height="60" rx="8" fill="url(#cnt-nl-nat)" opacity="0.85" />
      <text x="110" y="365" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">内网主机</text>
      <text x="110" y="383" textAnchor="middle" fontSize="10" fill="#d1fae5">10.0.0.1:3345</text>

      <rect x="320" y="340" width="160" height="60" rx="8" fill="url(#cnt-nl-router)" opacity="0.85" />
      <text x="400" y="365" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">NAT路由器</text>
      <text x="400" y="383" textAnchor="middle" fontSize="10" fill="#bfdbfe">改写: 138.76.29.7:5001</text>

      <rect x="610" y="340" width="160" height="60" rx="8" fill="url(#cnt-nl-ip)" opacity="0.85" />
      <text x="690" y="365" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">互联网</text>
      <text x="690" y="383" textAnchor="middle" fontSize="10" fill="#fef3c7">公网IP</text>

      <path d="M190 370 L320 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />
      <path d="M480 370 L610 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-nl-arrow)" />

      {/* IPv4 vs IPv6 */}
      <rect x="30" y="420" width="360" height="65" rx="8" fill="url(#cnt-nl-ip)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="210" y="442" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">IPv4</text>
      <text x="50" y="460" fontSize="10" fill="#78350f">32位地址 · 20B首部(可变) · 路由器可分片 · 有校验和</text>
      <text x="50" y="476" fontSize="10" fill="#78350f">192.168.1.1（点分十进制）</text>

      <rect x="410" y="420" width="360" height="65" rx="8" fill="url(#cnt-nl-v6)" opacity="0.1" stroke="#8b5cf6" strokeWidth="1" />
      <text x="590" y="442" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">IPv6</text>
      <text x="430" y="460" fontSize="10" fill="#5b21b6">128位地址 · 40B首部(固定) · 仅源端分片 · 无校验和</text>
      <text x="430" y="476" fontSize="10" fill="#5b21b6">2001:db8::8a2e:370:7334（冒号十六进制）</text>
    </svg>
  );
}
