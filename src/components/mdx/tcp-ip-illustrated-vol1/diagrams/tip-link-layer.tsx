"use client";

export function TipLinkLayerDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="链路层以太网帧结构与ARP工作流程">
      <defs>
        <linearGradient id="tip-ll-frame" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="tip-ll-arp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="tip-ll-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">链路层：以太网帧与ARP</text>

      {/* 以太网 II 帧结构 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">以太网 II 帧结构</text>

      <rect x="30" y="72" width="80" height="50" rx="4" fill="#94a3b8" />
      <text x="70" y="94" textAnchor="middle" fontSize="10" fill="#fff">前导码</text>
      <text x="70" y="110" textAnchor="middle" fontSize="9" fill="#e2e8f0">8B</text>

      <rect x="110" y="72" width="100" height="50" rx="4" fill="url(#tip-ll-frame)" />
      <text x="160" y="94" textAnchor="middle" fontSize="10" fill="#fff">目的MAC</text>
      <text x="160" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">6B</text>

      <rect x="210" y="72" width="100" height="50" rx="4" fill="url(#tip-ll-frame)" />
      <text x="260" y="94" textAnchor="middle" fontSize="10" fill="#fff">源MAC</text>
      <text x="260" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">6B</text>

      <rect x="310" y="72" width="80" height="50" rx="4" fill="#1d4ed8" />
      <text x="350" y="94" textAnchor="middle" fontSize="10" fill="#fff">Type</text>
      <text x="350" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">2B</text>

      <rect x="390" y="72" width="300" height="50" rx="4" fill="#60a5fa" />
      <text x="540" y="94" textAnchor="middle" fontSize="10" fill="#fff">数据 Payload (46-1500B)</text>
      <text x="540" y="110" textAnchor="middle" fontSize="9" fill="#dbeafe">MTU = 1500</text>

      <rect x="690" y="72" width="80" height="50" rx="4" fill="#94a3b8" />
      <text x="730" y="94" textAnchor="middle" fontSize="10" fill="#fff">FCS</text>
      <text x="730" y="110" textAnchor="middle" fontSize="9" fill="#e2e8f0">4B</text>

      <text x="350" y="140" textAnchor="middle" fontSize="10" fill="#64748b">Type: 0x0800=IPv4  0x0806=ARP  0x86DD=IPv6</text>

      {/* Type 字段值 */}
      <rect x="30" y="152" width="740" height="36" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
      <text x="50" y="174" fontSize="11" fill="#0c4a6e">封装：IP数据报 → 以太网Payload → 物理帧在线缆传输</text>

      {/* ARP 工作流程 */}
      <text x="400" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">ARP 地址解析流程</text>

      {/* 主机A */}
      <rect x="40" y="230" width="120" height="56" rx="10" fill="url(#tip-ll-arp)" opacity="0.9" />
      <text x="100" y="254" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">主机A</text>
      <text x="100" y="272" textAnchor="middle" fontSize="10" fill="#e9d5ff">192.168.1.10</text>

      {/* 网关 */}
      <rect x="640" y="230" width="120" height="56" rx="10" fill="url(#tip-ll-arp)" opacity="0.9" />
      <text x="700" y="254" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">网关/目标</text>
      <text x="700" y="272" textAnchor="middle" fontSize="10" fill="#e9d5ff">192.168.1.1</text>

      {/* 步骤1: 查缓存 */}
      <rect x="200" y="240" width="180" height="36" rx="6" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
      <text x="290" y="262" textAnchor="middle" fontSize="10" fill="#4c1d95">①查ARP缓存——无匹配</text>

      {/* 步骤2: ARP广播 */}
      <rect x="200" y="296" width="400" height="40" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="314" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">②ARP Request 广播</text>
      <text x="400" y="328" textAnchor="middle" fontSize="9" fill="#6d28d9">目标MAC=FF:FF:FF:FF:FF:FF——谁是192.168.1.1?</text>
      <path d="M160 296 L200 316" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ll-arrow)" />

      {/* 步骤3: ARP单播应答 */}
      <rect x="200" y="352" width="400" height="40" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="370" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">③ARP Reply 单播</text>
      <text x="400" y="384" textAnchor="middle" fontSize="9" fill="#6d28d9">我是192.168.1.1，MAC=00:50:56:C0:00:08</text>
      <path d="M640 352 L600 372" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ll-arrow)" />

      {/* 步骤4: 缓存 */}
      <rect x="200" y="408" width="400" height="36" rx="6" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
      <text x="400" y="430" textAnchor="middle" fontSize="10" fill="#4c1d95">④缓存IP-MAC映射（TTL约20分钟），后续直接使用</text>
      <path d="M160 416 L200 426" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-ll-arrow)" />

      {/* MTU与分片 */}
      <rect x="30" y="464" width="740" height="80" rx="10" fill="#fefce8" stroke="#fde047" strokeWidth="1.5" />
      <text x="50" y="488" fontSize="12" fontWeight="700" fill="#854d0e">MTU 与 IP 分片</text>
      <text x="50" y="508" fontSize="10" fill="#713f12">以太网 MTU=1500 字节。IP包 &gt; MTU 时路由器分片：</text>
      <text x="50" y="524" fontSize="10" fill="#713f12">DF=1 禁止分片 → 路由器返回ICMP错误（PMTUD）；MF=1 标记后面还有分片</text>
      <text x="50" y="538" fontSize="10" fill="#713f12">目的主机按 Identification + Fragment Offset 重组</text>
    </svg>
  );
}
