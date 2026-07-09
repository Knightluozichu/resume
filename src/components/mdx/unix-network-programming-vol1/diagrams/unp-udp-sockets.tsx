"use client";

export function UnpUdpSocketsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="UDP套接字编程流程">
      <defs>
        <linearGradient id="unp-udp-srv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-udp-cli" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-udp-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-udp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="unp-udp-arrow-g" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UDP 套接字编程（无连接）</text>

      {/* 服务端 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">服务端</text>

      <rect x="80" y="75" width="240" height="36" rx="8" fill="url(#unp-udp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="98" textAnchor="middle" fontSize="11" fill="#1e40af">socket() 创建数据报套接字</text>

      <path d="M200 111 L200 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />

      <rect x="80" y="127" width="240" height="36" rx="8" fill="url(#unp-udp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="150" textAnchor="middle" fontSize="11" fill="#1e40af">bind() 绑定地址</text>

      <path d="M200 163 L200 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />

      <rect x="80" y="179" width="240" height="36" rx="8" fill="url(#unp-udp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="202" textAnchor="middle" fontSize="11" fill="#065f46">recvfrom() 等待数据报</text>

      {/* 客户端 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">客户端</text>

      <rect x="480" y="75" width="240" height="36" rx="8" fill="url(#unp-udp-cli)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="98" textAnchor="middle" fontSize="11" fill="#5b21b6">socket() 创建数据报套接字</text>

      <path d="M600 111 L600 179" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />

      <rect x="480" y="179" width="240" height="36" rx="8" fill="url(#unp-udp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="202" textAnchor="middle" fontSize="11" fill="#065f46">sendto() 发送数据报</text>

      {/* 数据报传输 */}
      <path d="M480 197 L320 197" stroke="#059669" strokeWidth="2" markerEnd="url(#unp-udp-arrow-g)" />
      <text x="400" y="190" textAnchor="middle" fontSize="10" fill="#059669">数据报（含源地址）</text>

      {/* 回送 */}
      <path d="M200 215 L200 228" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />
      <path d="M600 215 L600 228" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />

      <rect x="80" y="231" width="240" height="36" rx="8" fill="url(#unp-udp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="254" textAnchor="middle" fontSize="11" fill="#065f46">sendto() 回送数据报</text>

      <rect x="480" y="231" width="240" height="36" rx="8" fill="url(#unp-udp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="254" textAnchor="middle" fontSize="11" fill="#065f46">recvfrom() 接收回送</text>

      <path d="M320 249 L480 249" stroke="#059669" strokeWidth="2" markerEnd="url(#unp-udp-arrow-g)" />
      <text x="400" y="242" textAnchor="middle" fontSize="10" fill="#059669">回送数据报</text>

      {/* 关闭 */}
      <path d="M200 267 L200 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />
      <path d="M600 267 L600 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-udp-arrow)" />

      <rect x="80" y="283" width="240" height="36" rx="8" fill="url(#unp-udp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="306" textAnchor="middle" fontSize="11" fill="#1e40af">close() 关闭套接字</text>

      <rect x="480" y="283" width="240" height="36" rx="8" fill="url(#unp-udp-cli)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="306" textAnchor="middle" fontSize="11" fill="#5b21b6">close() 关闭套接字</text>

      {/* TCP vs UDP 对比 */}
      <rect x="80" y="340" width="640" height="160" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="365" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">TCP 与 UDP 套接字对比</text>

      <rect x="100" y="378" width="180" height="30" rx="6" fill="#e2e8f0" />
      <text x="190" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">特性</text>
      <rect x="280" y="378" width="210" height="30" rx="6" fill="url(#unp-udp-srv)" opacity="0.15" />
      <text x="385" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">TCP</text>
      <rect x="490" y="378" width="210" height="30" rx="6" fill="url(#unp-udp-cli)" opacity="0.15" />
      <text x="595" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">UDP</text>

      <text x="190" y="424" textAnchor="middle" fontSize="10" fill="#475569">连接</text>
      <text x="385" y="424" textAnchor="middle" fontSize="10" fill="#1e40af">面向连接（connect）</text>
      <text x="595" y="424" textAnchor="middle" fontSize="10" fill="#5b21b6">无连接</text>

      <text x="190" y="442" textAnchor="middle" fontSize="10" fill="#475569">数据函数</text>
      <text x="385" y="442" textAnchor="middle" fontSize="10" fill="#1e40af">read / write</text>
      <text x="595" y="442" textAnchor="middle" fontSize="10" fill="#5b21b6">recvfrom / sendto</text>

      <text x="190" y="460" textAnchor="middle" fontSize="10" fill="#475569">可靠性</text>
      <text x="385" y="460" textAnchor="middle" fontSize="10" fill="#1e40af">可靠（ACK/重传）</text>
      <text x="595" y="460" textAnchor="middle" fontSize="10" fill="#5b21b6">不可靠（尽力交付）</text>

      <text x="190" y="478" textAnchor="middle" fontSize="10" fill="#475569">边界</text>
      <text x="385" y="478" textAnchor="middle" fontSize="10" fill="#1e40af">字节流（无边界）</text>
      <text x="595" y="478" textAnchor="middle" fontSize="10" fill="#5b21b6">数据报（保留边界）</text>
    </svg>
  );
}
