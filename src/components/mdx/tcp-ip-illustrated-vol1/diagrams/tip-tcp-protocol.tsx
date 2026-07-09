"use client";

export function TipTcpProtocolDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="TCP包头结构与三次握手四次挥手">
      <defs>
        <linearGradient id="tip-tcp-hdr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-tcp-flag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tip-tcp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP 可靠传输</text>

      {/* TCP 包头 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">TCP 包头（固定20字节，可扩展至60B）</text>

      <rect x="30" y="68" width="200" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="130" y="90" textAnchor="middle" fontSize="10" fill="#fff">Source Port（16 bits）</text>

      <rect x="230" y="68" width="200" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="330" y="90" textAnchor="middle" fontSize="10" fill="#fff">Destination Port（16 bits）</text>

      <rect x="430" y="68" width="340" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="600" y="90" textAnchor="middle" fontSize="10" fill="#fff">Sequence Number（32 bits）</text>

      <rect x="30" y="104" width="740" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="400" y="126" textAnchor="middle" fontSize="10" fill="#fff">Acknowledgment Number（32 bits）</text>

      <rect x="30" y="140" width="80" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="70" y="162" textAnchor="middle" fontSize="9" fill="#fff">Offset</text>
      <text x="70" y="173" textAnchor="middle" fontSize="8" fill="#e9d5ff">4 bits</text>

      <rect x="110" y="140" width="60" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="140" y="162" textAnchor="middle" fontSize="9" fill="#fff">Reserved</text>

      <rect x="170" y="140" width="200" height="36" rx="4" fill="url(#tip-tcp-flag)" opacity="0.9" />
      <text x="270" y="162" textAnchor="middle" fontSize="9" fill="#fff">Flags: URG/ACK/PSH/RST/SYN/FIN</text>

      <rect x="370" y="140" width="200" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="470" y="162" textAnchor="middle" fontSize="9" fill="#fff">Window（16 bits）</text>

      <rect x="570" y="140" width="100" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="620" y="162" textAnchor="middle" fontSize="9" fill="#fff">Checksum</text>

      <rect x="670" y="140" width="100" height="36" rx="4" fill="url(#tip-tcp-hdr)" />
      <text x="720" y="162" textAnchor="middle" fontSize="9" fill="#fff">Urgent Ptr</text>

      {/* Flags 说明 */}
      <rect x="30" y="184" width="740" height="36" rx="6" fill="#fef3c7" stroke="#fde047" strokeWidth="1" />
      <text x="50" y="206" fontSize="10" fill="#854d0e">SYN=建立连接  ACK=确认  FIN=关闭连接  RST=重置连接  PSH=推送  URG=紧急指针有效</text>

      {/* 三次握手 */}
      <text x="400" y="244" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">三次握手（建立连接）</text>

      <rect x="60" y="258" width="80" height="100" rx="8" fill="url(#tip-tcp-hdr)" opacity="0.9" />
      <text x="100" y="312" textAnchor="middle" fontSize="11" fill="#fff">客户端</text>

      <rect x="660" y="258" width="80" height="100" rx="8" fill="url(#tip-tcp-hdr)" opacity="0.9" />
      <text x="700" y="312" textAnchor="middle" fontSize="11" fill="#fff">服务端</text>

      <path d="M140 272 L660 272" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="250" y="260" width="300" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="275" textAnchor="middle" fontSize="9" fill="#5b21b6">① SYN, seq=x</text>

      <path d="M660 300 L140 300" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="220" y="288" width="360" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="303" textAnchor="middle" fontSize="9" fill="#5b21b6">② SYN+ACK, seq=y, ack=x+1</text>

      <path d="M140 336 L660 336" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="240" y="324" width="320" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="339" textAnchor="middle" fontSize="9" fill="#5b21b6">③ ACK, seq=x+1, ack=y+1</text>

      {/* 四次挥手 */}
      <text x="400" y="382" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">四次挥手（关闭连接）</text>

      <rect x="60" y="396" width="80" height="140" rx="8" fill="url(#tip-tcp-hdr)" opacity="0.9" />
      <text x="100" y="470" textAnchor="middle" fontSize="11" fill="#fff">客户端</text>

      <rect x="660" y="396" width="80" height="140" rx="8" fill="url(#tip-tcp-hdr)" opacity="0.9" />
      <text x="700" y="470" textAnchor="middle" fontSize="11" fill="#fff">服务端</text>

      <path d="M140 410 L660 410" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="260" y="398" width="280" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="413" textAnchor="middle" fontSize="9" fill="#5b21b6">① FIN, seq=m</text>

      <path d="M660 442 L140 442" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="240" y="430" width="320" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="445" textAnchor="middle" fontSize="9" fill="#5b21b6">② ACK, ack=m+1</text>

      <path d="M660 474 L140 474" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="250" y="462" width="300" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="477" textAnchor="middle" fontSize="9" fill="#5b21b6">③ FIN, seq=n</text>

      <path d="M140 522 L660 522" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#tip-tcp-arrow)" />
      <rect x="240" y="510" width="320" height="22" rx="4" fill="#ede9fe" />
      <text x="400" y="525" textAnchor="middle" fontSize="9" fill="#5b21b6">④ ACK, ack=n+1</text>

      {/* 可靠性机制 */}
      <rect x="30" y="556" width="740" height="52" rx="10" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
      <text x="50" y="578" fontSize="11" fontWeight="700" fill="#0c4a6e">可靠性机制</text>
      <text x="50" y="596" fontSize="10" fill="#075985">序号/确认 + 超时重传 + 滑动窗口流控 + 拥塞控制(慢启动/拥塞避免/快重传/快恢复)</text>
    </svg>
  );
}
