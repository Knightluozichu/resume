"use client";

export function TipUdpProtocolDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="UDP报文头结构与伪首部校验和">
      <defs>
        <linearGradient id="tip-udp-hdr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-udp-pseudo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tip-udp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UDP 协议：无连接传输</text>

      {/* UDP 报文头 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">UDP 报文头（固定 8 字节）</text>

      <rect x="100" y="72" width="280" height="50" rx="6" fill="url(#tip-udp-hdr)" />
      <text x="240" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Source Port（16 bits）</text>
      <text x="240" y="112" textAnchor="middle" fontSize="9" fill="#e9d5ff">源端口号</text>

      <rect x="380" y="72" width="280" height="50" rx="6" fill="url(#tip-udp-hdr)" />
      <text x="520" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Destination Port（16 bits）</text>
      <text x="520" y="112" textAnchor="middle" fontSize="9" fill="#e9d5ff">目的端口号</text>

      <rect x="100" y="122" width="280" height="50" rx="6" fill="url(#tip-udp-hdr)" />
      <text x="240" y="144" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Length（16 bits）</text>
      <text x="240" y="162" textAnchor="middle" fontSize="9" fill="#e9d5ff">UDP头+数据总长（最小8）</text>

      <rect x="380" y="122" width="280" height="50" rx="6" fill="#a78bfa" />
      <text x="520" y="144" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">Checksum（16 bits）</text>
      <text x="520" y="162" textAnchor="middle" fontSize="9" fill="#ede9fe">校验和（可选但建议）</text>

      {/* 数据区 */}
      <rect x="100" y="172" width="560" height="40" rx="6" fill="#c4b5fd" opacity="0.5" />
      <text x="380" y="196" textAnchor="middle" fontSize="11" fill="#4c1d95">数据 Data（0+ 字节，受IP包总长限制）</text>

      {/* 伪首部 */}
      <text x="400" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">伪首部（Pseudo Header）——校验和计算用</text>

      <rect x="100" y="254" width="560" height="36" rx="4" fill="url(#tip-udp-pseudo)" opacity="0.8" />
      <text x="380" y="276" textAnchor="middle" fontSize="11" fill="#fff">Source IP（32 bits）</text>

      <rect x="100" y="290" width="560" height="36" rx="4" fill="url(#tip-udp-pseudo)" opacity="0.8" />
      <text x="380" y="312" textAnchor="middle" fontSize="11" fill="#fff">Destination IP（32 bits）</text>

      <rect x="100" y="326" width="280" height="36" rx="4" fill="url(#tip-udp-pseudo)" opacity="0.6" />
      <text x="240" y="348" textAnchor="middle" fontSize="10" fill="#fff">Zero（8 bits=0）</text>

      <rect x="380" y="326" width="140" height="36" rx="4" fill="url(#tip-udp-pseudo)" opacity="0.6" />
      <text x="450" y="348" textAnchor="middle" fontSize="10" fill="#fff">Protocol（8 bits=17）</text>

      <rect x="520" y="326" width="140" height="36" rx="4" fill="url(#tip-udp-pseudo)" opacity="0.6" />
      <text x="590" y="348" textAnchor="middle" fontSize="10" fill="#fff">UDP Length（16 bits）</text>

      <text x="400" y="384" textAnchor="middle" fontSize="10" fill="#64748b">伪首部不在网络中传输，仅参与校验和计算——确保数据送达正确主机与协议</text>

      {/* UDP 特点 */}
      <rect x="20" y="404" width="380" height="60" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="40" y="426" fontSize="11" fontWeight="700" fill="#14532d">UDP 特点</text>
      <text x="40" y="444" fontSize="10" fill="#166534">无连接 / 不可靠 / 无流控 / 无拥塞控制</text>
      <text x="40" y="458" fontSize="10" fill="#166534">头部仅8B / 实时性好 / 支持广播与组播</text>

      <rect x="400" y="404" width="380" height="60" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
      <text x="420" y="426" fontSize="11" fontWeight="700" fill="#7f1d1d">典型应用</text>
      <text x="420" y="444" fontSize="10" fill="#991b1b">DNS(53) / DHCP(67,68) / SNMP(161) / TFTP(69)</text>
      <text x="420" y="458" fontSize="10" fill="#991b1b">NTP(123) / 实时音视频(RTP) / 游戏同步</text>
    </svg>
  );
}
