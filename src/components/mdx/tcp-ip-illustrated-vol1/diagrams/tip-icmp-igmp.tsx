"use client";

export function TipIcmpIgmpDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="ICMP与IGMP报文类型与工作流程">
      <defs>
        <linearGradient id="tip-ic-icmp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-ic-igmp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="tip-ic-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">ICMP 与 IGMP</text>

      {/* ICMP 报文类型 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">ICMP 报文类型</text>

      <rect x="20" y="72" width="380" height="210" rx="10" fill="#ecfeff" stroke="#67e8f9" strokeWidth="1.5" />
      <text x="40" y="94" fontSize="11" fontWeight="700" fill="#0c4a6e">查询类（类型 0/8）</text>
      <text x="40" y="112" fontSize="10" fill="#075985">Type 8 = Echo Request（ping 请求）</text>
      <text x="40" y="128" fontSize="10" fill="#075985">Type 0 = Echo Reply（ping 应答）</text>

      <text x="40" y="154" fontSize="11" fontWeight="700" fill="#0c4a6e">差错报告类</text>
      <text x="40" y="172" fontSize="10" fill="#075985">Type 3 = Destination Unreachable（目的不可达）</text>
      <text x="40" y="188" fontSize="10" fill="#075985">Type 5 = Redirect（路由重定向）</text>
      <text x="40" y="204" fontSize="10" fill="#075985">Type 11 = Time Exceeded（超时，TTL=0）</text>
      <text x="40" y="220" fontSize="10" fill="#075985">Type 12 = Parameter Problem（参数问题）</text>
      <text x="40" y="236" fontSize="10" fill="#075985">Type 4 = Source Quench（源抑制，已废弃）</text>

      <text x="40" y="262" fontSize="10" fontWeight="600" fill="#0e7490">ICMP 封装在 IP 包中（Protocol=1）</text>
      <text x="40" y="276" fontSize="9" fill="#64748b">Type(1B) + Code(1B) + Checksum(2B) + 数据</text>

      {/* ping 流程 */}
      <text x="200" y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0c4a6e">ping 工作流程</text>
      <rect x="30" y="316" width="120" height="40" rx="8" fill="url(#tip-ic-icmp)" opacity="0.9" />
      <text x="90" y="340" textAnchor="middle" fontSize="11" fill="#fff">主机A</text>
      <rect x="270" y="316" width="120" height="40" rx="8" fill="url(#tip-ic-icmp)" opacity="0.9" />
      <text x="330" y="340" textAnchor="middle" fontSize="11" fill="#fff">主机B</text>
      <path d="M150 328 L270 328" stroke="#0891b2" strokeWidth="2" markerEnd="url(#tip-ic-arrow)" />
      <text x="210" y="322" textAnchor="middle" fontSize="9" fill="#0e7490">Echo Request (Type 8)</text>
      <path d="M270 344 L150 344" stroke="#0891b2" strokeWidth="2" markerEnd="url(#tip-ic-arrow)" />
      <text x="210" y="358" textAnchor="middle" fontSize="9" fill="#0e7490">Echo Reply (Type 0)</text>

      {/* IGMP 组播 */}
      <text x="600" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">IGMP 组播管理</text>

      <rect x="420" y="72" width="360" height="210" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="440" y="94" fontSize="11" fontWeight="700" fill="#4c1d95">IGMP 报文类型（v2）</text>
      <text x="440" y="112" fontSize="10" fill="#5b21b6">0x11 = Membership Query（成员查询）</text>
      <text x="440" y="128" fontSize="10" fill="#5b21b6">0x16 = v2 Membership Report（加入报告）</text>
      <text x="440" y="144" fontSize="10" fill="#5b21b6">0x17 = Leave Group（离开组）</text>
      <text x="440" y="160" fontSize="10" fill="#5b21b6">0x12 = v1 Membership Report（兼容）</text>

      <text x="440" y="186" fontSize="11" fontWeight="700" fill="#4c1d95">组播地址范围</text>
      <text x="440" y="204" fontSize="10" fill="#5b21b6">224.0.0.0 ~ 239.255.255.255（D类）</text>
      <text x="440" y="220" fontSize="10" fill="#5b21b6">224.0.0.1 = 所有主机组</text>
      <text x="440" y="236" fontSize="10" fill="#5b21b6">224.0.0.2 = 所有路由器组</text>
      <text x="440" y="252" fontSize="10" fill="#5b21b6">224.0.0.22 = IGMP v3 报告地址</text>

      <text x="440" y="276" fontSize="10" fontWeight="600" fill="#6d28d9">IGMP 封装在 IP 包中（Protocol=2）</text>

      {/* IGMP 流程 */}
      <text x="600" y="304" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">组播加入与离开</text>

      <rect x="430" y="316" width="100" height="40" rx="8" fill="url(#tip-ic-igmp)" opacity="0.9" />
      <text x="480" y="340" textAnchor="middle" fontSize="10" fill="#fff">主机</text>

      <rect x="670" y="316" width="100" height="40" rx="8" fill="url(#tip-ic-igmp)" opacity="0.9" />
      <text x="720" y="340" textAnchor="middle" fontSize="10" fill="#fff">组播路由器</text>

      <path d="M530 328 L670 328" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ic-arrow)" />
      <text x="600" y="322" textAnchor="middle" fontSize="9" fill="#5b21b6">加入报告 (0x16)</text>

      <path d="M670 344 L530 344" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ic-arrow)" />
      <text x="600" y="358" textAnchor="middle" fontSize="9" fill="#5b21b6">查询 (0x11) / 周期性</text>

      {/* traceroute 原理 */}
      <rect x="20" y="378" width="760" height="146" rx="10" fill="#fffbeb" stroke="#fde047" strokeWidth="1.5" />
      <text x="40" y="402" fontSize="12" fontWeight="700" fill="#854d0e">traceroute 原理（利用 ICMP Time Exceeded）</text>
      <text x="40" y="424" fontSize="10" fill="#713f12">1. 源端发送 TTL=1 的 UDP/ICMP 包 → 第一跳路由器 TTL减为0 → 丢弃并返回 ICMP Type 11</text>
      <text x="40" y="442" fontSize="10" fill="#713f12">2. 源端发送 TTL=2 的包 → 第二跳路由器返回 ICMP Type 11，依此递增 TTL</text>
      <text x="40" y="460" fontSize="10" fill="#713f12">3. 直到包到达目的主机，返回 ICMP Port Unreachable (Type 3 Code 3) 或 Echo Reply</text>
      <text x="40" y="478" fontSize="10" fill="#713f12">4. 每跳记录 RTT，由此推断完整路径与各跳延迟</text>
      <text x="40" y="500" fontSize="10" fontWeight="600" fill="#854d0e">Path MTU Discovery（PMTUD）：设 DF=1 发包，路由器返回 ICMP Type 3 Code 4（需分片但DF置位）</text>
      <text x="40" y="516" fontSize="10" fill="#713f12">从 ICMP 报文中读取下一跳 MTU，逐步降至能不分片通过的最大包长</text>
    </svg>
  );
}
