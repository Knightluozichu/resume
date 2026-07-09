"use client";

export function UnpTcpSocketsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="TCP套接字编程流程">
      <defs>
        <linearGradient id="unp-tcp-srv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-tcp-cli" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-tcp-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-tcp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="unp-tcp-arrow-g" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP echo 服务端-客户端交互</text>

      {/* 服务端 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">服务端</text>

      <rect x="80" y="75" width="240" height="36" rx="8" fill="url(#unp-tcp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="98" textAnchor="middle" fontSize="11" fill="#1e40af">socket() → bind() → listen()</text>

      <path d="M200 111 L200 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />

      <rect x="80" y="127" width="240" height="36" rx="8" fill="url(#unp-tcp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="150" textAnchor="middle" fontSize="11" fill="#1e40af">accept() 返回已连接套接字</text>

      {/* 客户端 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">客户端</text>

      <rect x="480" y="75" width="240" height="36" rx="8" fill="url(#unp-tcp-cli)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="98" textAnchor="middle" fontSize="11" fill="#5b21b6">socket()</text>

      <path d="M600 111 L600 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />

      <rect x="480" y="127" width="240" height="36" rx="8" fill="url(#unp-tcp-cli)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="150" textAnchor="middle" fontSize="11" fill="#5b21b6">connect() 建立连接</text>

      {/* 连接建立 */}
      <path d="M480 145 L320 145" stroke="#059669" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#unp-tcp-arrow-g)" />
      <text x="400" y="138" textAnchor="middle" fontSize="10" fill="#059669">三次握手</text>

      {/* 数据交互循环 */}
      <path d="M200 163 L200 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />
      <path d="M600 163 L600 176" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />

      <rect x="80" y="179" width="240" height="36" rx="8" fill="url(#unp-tcp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="202" textAnchor="middle" fontSize="11" fill="#065f46">read() 等待客户端数据</text>

      <rect x="480" y="179" width="240" height="36" rx="8" fill="url(#unp-tcp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="202" textAnchor="middle" fontSize="11" fill="#065f46">fgets() 读取用户输入</text>

      <path d="M600 215 L320 215" stroke="#059669" strokeWidth="2" markerEnd="url(#unp-tcp-arrow-g)" />
      <text x="400" y="208" textAnchor="middle" fontSize="10" fill="#059669">write() 发送</text>

      <path d="M200 215 L200 228" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />
      <path d="M600 215 L600 228" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />

      <rect x="80" y="231" width="240" height="36" rx="8" fill="url(#unp-tcp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="254" textAnchor="middle" fontSize="11" fill="#065f46">write() 回显数据</text>

      <rect x="480" y="231" width="240" height="36" rx="8" fill="url(#unp-tcp-data)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="254" textAnchor="middle" fontSize="11" fill="#065f46">read() 接收回显</text>

      <path d="M320 267 L480 267" stroke="#059669" strokeWidth="2" markerEnd="url(#unp-tcp-arrow-g)" />
      <text x="400" y="260" textAnchor="middle" fontSize="10" fill="#059669">echo 回显</text>

      {/* 关闭 */}
      <path d="M200 267 L200 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />
      <path d="M600 267 L600 280" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-tcp-arrow)" />

      <rect x="80" y="283" width="240" height="36" rx="8" fill="url(#unp-tcp-srv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="306" textAnchor="middle" fontSize="11" fill="#1e40af">close() 关闭已连接套接字</text>

      <rect x="480" y="283" width="240" height="36" rx="8" fill="url(#unp-tcp-cli)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="306" textAnchor="middle" fontSize="11" fill="#5b21b6">close() 关闭套接字</text>

      <path d="M600 319 L320 319" stroke="#059669" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#unp-tcp-arrow-g)" />
      <text x="400" y="312" textAnchor="middle" fontSize="10" fill="#059669">FIN / ACK 四次挥手</text>

      {/* 字节序转换 */}
      <rect x="80" y="360" width="640" height="170" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="385" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">字节序转换函数</text>

      <rect x="100" y="400" width="290" height="55" rx="8" fill="url(#unp-tcp-srv)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="245" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">主机序 → 网络序</text>
      <text x="115" y="442" fontSize="10" fill="#475569" fontFamily="monospace">htons() — 端口（16位）</text>

      <rect x="410" y="400" width="290" height="55" rx="8" fill="url(#unp-tcp-cli)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="555" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">网络序 → 主机序</text>
      <text x="425" y="442" fontSize="10" fill="#475569" fontFamily="monospace">ntohs() — 端口（16位）</text>

      <rect x="100" y="465" width="290" height="55" rx="8" fill="url(#unp-tcp-srv)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="245" y="487" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">主机序 → 网络序</text>
      <text x="115" y="507" fontSize="10" fill="#475569" fontFamily="monospace">htonl() — IP地址（32位）</text>

      <rect x="410" y="465" width="290" height="55" rx="8" fill="url(#unp-tcp-cli)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="555" y="487" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">网络序 → 主机序</text>
      <text x="425" y="507" fontSize="10" fill="#475569" fontFamily="monospace">ntohl() — IP地址（32位）</text>
    </svg>
  );
}
