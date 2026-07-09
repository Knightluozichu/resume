"use client";

export function UnpSocketIntroDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="套接字API核心流程">
      <defs>
        <linearGradient id="unp-si-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-si-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-si-conn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-si-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="unp-si-arrow-r" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#059669" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">套接字 API 核心流程</text>

      {/* 服务端流程 */}
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">服务端</text>

      <rect x="80" y="75" width="240" height="40" rx="8" fill="url(#unp-si-server)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="100" textAnchor="middle" fontSize="12" fill="#1e40af">socket() 创建监听套接字</text>

      <path d="M200 115 L200 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="80" y="130" width="240" height="40" rx="8" fill="url(#unp-si-server)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="155" textAnchor="middle" fontSize="12" fill="#1e40af">bind() 绑定地址与端口</text>

      <path d="M200 170 L200 183" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="80" y="185" width="240" height="40" rx="8" fill="url(#unp-si-server)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="210" textAnchor="middle" fontSize="12" fill="#1e40af">listen() 进入监听状态</text>

      <path d="M200 225 L200 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="80" y="240" width="240" height="40" rx="8" fill="url(#unp-si-server)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="265" textAnchor="middle" fontSize="12" fill="#1e40af">accept() 等待连接（阻塞）</text>

      <path d="M200 280 L200 293" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="80" y="295" width="240" height="40" rx="8" fill="url(#unp-si-conn)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="200" y="320" textAnchor="middle" fontSize="12" fill="#065f46">read() / write() 数据交互</text>

      {/* 客户端流程 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#5b21b6">客户端</text>

      <rect x="480" y="75" width="240" height="40" rx="8" fill="url(#unp-si-client)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="100" textAnchor="middle" fontSize="12" fill="#5b21b6">socket() 创建套接字</text>

      <path d="M600 115 L600 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="480" y="130" width="240" height="40" rx="8" fill="url(#unp-si-client)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="600" y="155" textAnchor="middle" fontSize="12" fill="#5b21b6">connect() 发起连接</text>

      <path d="M600 170 L600 258" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-si-arrow)" />

      <rect x="480" y="260" width="240" height="40" rx="8" fill="url(#unp-si-conn)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="600" y="285" textAnchor="middle" fontSize="12" fill="#065f46">write() / read() 数据交互</text>

      {/* 连接线 */}
      <path d="M320 260 L480 150" stroke="#059669" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#unp-si-arrow-r)" />
      <text x="410" y="195" textAnchor="middle" fontSize="10" fill="#059669">三次握手</text>

      <path d="M320 315 L480 280" stroke="#059669" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#unp-si-arrow-r)" />
      <text x="410" y="308" textAnchor="middle" fontSize="10" fill="#059669">已连接</text>

      {/* 地址结构 */}
      <rect x="80" y="370" width="640" height="160" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="395" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">套接字地址结构</text>

      <rect x="100" y="410" width="280" height="105" rx="8" fill="url(#unp-si-server)" opacity="0.08" stroke="#2563eb" strokeWidth="1" />
      <text x="240" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">sockaddr_in (IPv4)</text>
      <text x="115" y="452" fontSize="10" fill="#475569" fontFamily="monospace">sin_family   = AF_INET</text>
      <text x="115" y="468" fontSize="10" fill="#475569" fontFamily="monospace">sin_port     = htons(8080)</text>
      <text x="115" y="484" fontSize="10" fill="#475569" fontFamily="monospace">sin_addr     = INADDR_ANY</text>
      <text x="115" y="500" fontSize="10" fill="#475569" fontFamily="monospace">sin_zero[8]  = 填充</text>

      <rect x="420" y="410" width="280" height="105" rx="8" fill="url(#unp-si-client)" opacity="0.08" stroke="#7c3aed" strokeWidth="1" />
      <text x="560" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="#5b21b6">通用 sockaddr</text>
      <text x="435" y="452" fontSize="10" fill="#475569" fontFamily="monospace">sa_family    = 地址族</text>
      <text x="435" y="468" fontSize="10" fill="#475569" fontFamily="monospace">sa_data[14]  = 协议地址</text>
      <text x="435" y="488" fontSize="10" fill="#64748b">所有地址结构强制转换为此类型</text>
      <text x="435" y="504" fontSize="10" fill="#64748b">传给 bind / connect / accept</text>
    </svg>
  );
}
