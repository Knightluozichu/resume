"use client";

export function UnpAdvancedSocketsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="高级套接字选项">
      <defs>
        <linearGradient id="unp-as-sock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-as-ip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-as-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="unp-as-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">套接字选项层次与 API</text>

      {/* API 调用 */}
      <rect x="40" y="50" width="720" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">getsockopt / setsockopt API</text>
      <text x="400" y="92" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">getsockopt(fd, level, optname, optval, &amp;optlen)</text>
      <text x="400" y="105" textAnchor="middle" fontSize="10" fill="#94a3b8">level 指定选项层次: SOL_SOCKET / IPPROTO_IP / IPPROTO_TCP</text>

      {/* 三层选项 */}
      <text x="140" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">SOL_SOCKET</text>
      <text x="400" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">IPPROTO_IP</text>
      <text x="660" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">IPPROTO_TCP</text>

      {/* SOL_SOCKET 选项 */}
      <rect x="40" y="150" width="220" height="260" rx="10" fill="url(#unp-as-sock)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="172" fontSize="11" fontWeight="600" fill="#1e40af">通用套接字选项</text>

      <text x="55" y="195" fontSize="10" fill="#475569" fontFamily="monospace">SO_REUSEADDR</text>
      <text x="55" y="208" fontSize="9" fill="#94a3b8">地址重用（TIME_WAIT）</text>

      <text x="55" y="226" fontSize="10" fill="#475569" fontFamily="monospace">SO_KEEPALIVE</text>
      <text x="55" y="239" fontSize="9" fill="#94a3b8">保活探测（TCP）</text>

      <text x="55" y="257" fontSize="10" fill="#475569" fontFamily="monospace">SO_RCVBUF</text>
      <text x="55" y="270" fontSize="9" fill="#94a3b8">接收缓冲区大小</text>

      <text x="55" y="288" fontSize="10" fill="#475569" fontFamily="monospace">SO_SNDBUF</text>
      <text x="55" y="301" fontSize="9" fill="#94a3b8">发送缓冲区大小</text>

      <text x="55" y="319" fontSize="10" fill="#475569" fontFamily="monospace">SO_RCVTIMEO</text>
      <text x="55" y="332" fontSize="9" fill="#94a3b8">接收超时时间</text>

      <text x="55" y="350" fontSize="10" fill="#475569" fontFamily="monospace">SO_SNDTIMEO</text>
      <text x="55" y="363" fontSize="9" fill="#94a3b8">发送超时时间</text>

      <text x="55" y="381" fontSize="10" fill="#475569" fontFamily="monospace">SO_BROADCAST</text>
      <text x="55" y="394" fontSize="9" fill="#94a3b8">允许广播（UDP）</text>

      {/* IPPROTO_IP 选项 */}
      <rect x="290" y="150" width="220" height="260" rx="10" fill="url(#unp-as-ip)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="172" fontSize="11" fontWeight="600" fill="#5b21b6">IP 层选项</text>

      <text x="305" y="195" fontSize="10" fill="#475569" fontFamily="monospace">IP_TTL</text>
      <text x="305" y="208" fontSize="9" fill="#94a3b8">生存时间</text>

      <text x="305" y="226" fontSize="10" fill="#475569" fontFamily="monospace">IP_TOS</text>
      <text x="305" y="239" fontSize="9" fill="#94a3b8">服务类型</text>

      <text x="305" y="257" fontSize="10" fill="#475569" fontFamily="monospace">IP_MULTICAST_TTL</text>
      <text x="305" y="270" fontSize="9" fill="#94a3b8">组播 TTL</text>

      <text x="305" y="288" fontSize="10" fill="#475569" fontFamily="monospace">IP_ADD_MEMBERSHIP</text>
      <text x="305" y="301" fontSize="9" fill="#94a3b8">加入组播组</text>

      <text x="305" y="319" fontSize="10" fill="#475569" fontFamily="monospace">IP_DROP_MEMBERSHIP</text>
      <text x="305" y="332" fontSize="9" fill="#94a3b8">离开组播组</text>

      <text x="305" y="350" fontSize="10" fill="#475569" fontFamily="monospace">IP_HDRINCL</text>
      <text x="305" y="363" fontSize="9" fill="#94a3b8">自定义 IP 头（原始）</text>

      <text x="305" y="381" fontSize="10" fill="#475569" fontFamily="monospace">IP_OPTIONS</text>
      <text x="305" y="394" fontSize="9" fill="#94a3b8">IP 头选项</text>

      {/* IPPROTO_TCP 选项 */}
      <rect x="540" y="150" width="220" height="260" rx="10" fill="url(#unp-as-tcp)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="560" y="172" fontSize="11" fontWeight="600" fill="#0e7490">TCP 层选项</text>

      <text x="555" y="195" fontSize="10" fill="#475569" fontFamily="monospace">TCP_NODELAY</text>
      <text x="555" y="208" fontSize="9" fill="#94a3b8">禁用 Nagle 算法</text>

      <text x="555" y="226" fontSize="10" fill="#475569" fontFamily="monospace">TCP_MAXSEG</text>
      <text x="555" y="239" fontSize="9" fill="#94a3b8">最大分节大小（MSS）</text>

      <text x="555" y="257" fontSize="10" fill="#475569" fontFamily="monospace">TCP_KEEPIDLE</text>
      <text x="555" y="270" fontSize="9" fill="#94a3b8">保活空闲时间</text>

      <text x="555" y="288" fontSize="10" fill="#475569" fontFamily="monospace">TCP_KEEPINTVL</text>
      <text x="555" y="301" fontSize="9" fill="#94a3b8">保活探测间隔</text>

      <text x="555" y="319" fontSize="10" fill="#475569" fontFamily="monospace">TCP_KEEPCNT</text>
      <text x="555" y="332" fontSize="9" fill="#94a3b8">保活探测次数</text>

      <text x="555" y="350" fontSize="10" fill="#475569" fontFamily="monospace">TCP_INFO</text>
      <text x="555" y="363" fontSize="9" fill="#94a3b8">TCP 连接信息</text>

      <text x="555" y="381" fontSize="10" fill="#475569" fontFamily="monospace">TCP_CORK</text>
      <text x="555" y="394" fontSize="9" fill="#94a3b8"> cork 模式（聚合发送）</text>

      {/* 常用场景 */}
      <rect x="40" y="425" width="720" height="95" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常用场景</text>

      <text x="60" y="470" fontSize="10" fill="#475569">SO_REUSEADDR → 服务端重启时绑定处于 TIME_WAIT 的端口</text>
      <text x="60" y="488" fontSize="10" fill="#475569">TCP_NODELAY → 交互式应用禁用 Nagle，降低小包延迟</text>
      <text x="60" y="506" fontSize="10" fill="#475569">SO_KEEPALIVE → 检测对端是否崩溃（需配合 TCP_KEEPIDLE 等）</text>
    </svg>
  );
}
