"use client";

export function WpaDnsDhcpDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="DNS与DHCP协议分析">
      <defs>
        <linearGradient id="wpa-dd-dns" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-dd-dhcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="wpa-dd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="wpa-dd-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DNS 与 DHCP 分析</text>

      {/* DNS 查询流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">DNS 查询流程</text>

      <rect x="20" y="70" width="760" height="160" rx="8" fill="url(#wpa-dd-dns)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />

      <text x="80" y="94" fontSize="11" fontWeight="700" fill="#1d4ed8">Client</text>
      <text x="300" y="94" fontSize="11" fontWeight="700" fill="#1d4ed8">Local DNS</text>
      <text x="550" y="94" fontSize="11" fontWeight="700" fill="#1d4ed8">Root / TLD / Auth</text>

      <text x="80" y="118" fontSize="9" fill="#475569" fontFamily="monospace">1. Query: www.example.com A?</text>
      <path d="M120 114 L260 114" stroke="#2563eb" strokeWidth="2" markerEnd="url(#wpa-dd-arrow-r)" />

      <text x="80" y="142" fontSize="9" fill="#475569" fontFamily="monospace">← 2. Response: 93.184.216.34</text>
      <path d="M260 138 L120 138" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow)" />

      <text x="300" y="166" fontSize="9" fill="#475569">↑ 递归查询：Local DNS 代为向 Root → TLD → 权威服务器逐级解析</text>
      <path d="M340 170 L510 170" stroke="#2563eb" strokeWidth="2" markerEnd="url(#wpa-dd-arrow-r)" />
      <path d="M510 180 L340 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow)" />

      <text x="40" y="206" fontSize="10" fill="#1d4ed8">DNS 记录类型：A（IPv4）/ AAAA（IPv6）/ CNAME（别名）/ MX（邮件）/ TXT（文本）/ NS（名称服务器）/ PTR（反向）</text>
      <text x="40" y="224" fontSize="10" fill="#64748b">查询方式：递归查询（Client → Local DNS）+ 迭代查询（Local DNS → 各级 DNS 服务器）</text>

      {/* DNS 过滤器 */}
      <rect x="20" y="242" width="370" height="96" rx="8" fill="url(#wpa-dd-dns)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="264" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">Wireshark DNS 过滤器</text>
      <text x="40" y="286" fontSize="9" fill="#475569" fontFamily="monospace">dns</text>
      <text x="200" y="286" fontSize="9" fill="#94a3b8">所有 DNS 流量</text>
      <text x="40" y="302" fontSize="9" fill="#475569" fontFamily="monospace">dns.qry.name == "example.com"</text>
      <text x="40" y="318" fontSize="9" fill="#475569" fontFamily="monospace">dns.flags.response == 1</text>
      <text x="250" y="318" fontSize="9" fill="#94a3b8">只看响应包</text>
      <text x="40" y="334" fontSize="9" fill="#475569" fontFamily="monospace">dns.qry.type == 1</text>
      <text x="200" y="334" fontSize="9" fill="#94a3b8">只看 A 记录查询</text>

      {/* DHCP 流程 */}
      <text x="600" y="264" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">DHCP 分配流程（DORA）</text>

      <rect x="410" y="278" width="370" height="180" rx="8" fill="url(#wpa-dd-dhcp)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />

      <text x="450" y="302" fontSize="11" fontWeight="700" fill="#92400e">Client</text>
      <text x="680" y="302" fontSize="11" fontWeight="700" fill="#92400e">DHCP Server</text>

      <text x="450" y="326" fontSize="9" fill="#475569">D - Discover（广播发现）</text>
      <path d="M490 322 L650 322" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow-r)" />
      <text x="450" y="340" fontSize="8" fill="#94a3b8">"谁是 DHCP 服务器?"</text>

      <text x="450" y="362" fontSize="9" fill="#475569">O - Offer（提供租约）</text>
      <path d="M650 358 L490 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow)" />
      <text x="450" y="376" fontSize="8" fill="#94a3b8">"我可以给你 10.0.0.50"</text>

      <text x="450" y="400" fontSize="9" fill="#475569">R - Request（请求租约）</text>
      <path d="M490 396 L650 396" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow-r)" />
      <text x="450" y="414" fontSize="8" fill="#94a3b8">"我要 10.0.0.50"</text>

      <text x="450" y="438" fontSize="9" fill="#475569">A - Acknowledge（确认租约）</text>
      <path d="M650 434 L490 434" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-dd-arrow)" />
      <text x="450" y="452" fontSize="8" fill="#94a3b8">"确认，租期 24h"</text>

      {/* DHCP 过滤器 */}
      <rect x="20" y="350" width="370" height="108" rx="8" fill="url(#wpa-dd-dhcp)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="205" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Wireshark DHCP 过滤器</text>
      <text x="40" y="394" fontSize="9" fill="#475569" fontFamily="monospace">bootp</text>
      <text x="200" y="394" fontSize="9" fill="#94a3b8">所有 DHCP 流量（基于 BOOTP）</text>
      <text x="40" y="412" fontSize="9" fill="#475569" fontFamily="monospace">bootp.option.type == 53</text>
      <text x="200" y="412" fontSize="9" fill="#94a3b8">DHCP 消息类型选项</text>
      <text x="40" y="430" fontSize="9" fill="#475569" fontFamily="monospace">bootp.type == 1</text>
      <text x="200" y="430" fontSize="9" fill="#94a3b8">Discover / Request</text>
      <text x="40" y="448" fontSize="9" fill="#475569" fontFamily="monospace">bootp.type == 2</text>
      <text x="200" y="448" fontSize="9" fill="#94a3b8">Offer / ACK</text>

      {/* 分析要点 */}
      <rect x="20" y="470" width="760" height="118" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="494" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">分析要点</text>

      <text x="40" y="516" fontSize="10" fontWeight="600" fill="#1d4ed8">DNS 异常：</text>
      <text x="140" y="516" fontSize="10" fill="#475569">大量 NXDOMAIN 响应=域名不存在，可能是 DNS 隧道或配置错误</text>

      <text x="40" y="536" fontSize="10" fontWeight="600" fill="#1d4ed8">DNS 劫持：</text>
      <text x="140" y="536" fontSize="10" fill="#475569">响应 IP 与预期不符，检查 DNS 响应来源是否为可信服务器</text>

      <text x="40" y="556" fontSize="10" fontWeight="600" fill="#92400e">DHCP 饥饿：</text>
      <text x="140" y="556" fontSize="10" fill="#475569">大量 Discover 来自不同 MAC，耗尽 IP 池</text>

      <text x="40" y="576" fontSize="10" fontWeight="600" fill="#92400e">DHCP 欺骗：</text>
      <text x="140" y="576" fontSize="10" fill="#475569">非授权 DHCP 服务器响应 Offer，分配恶意网关/DNS</text>
    </svg>
  );
}
