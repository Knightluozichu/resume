"use client";

export function UnpFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="全书知识网络与复习地图">
      <defs>
        <linearGradient id="unp-fr-basic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-fr-conn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-fr-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="unp-fr-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="unp-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UNP 卷1 知识网络与复习路线</text>

      {/* 中心节点 */}
      <rect x="300" y="50" width="200" height="50" rx="25" fill="url(#unp-fr-conn)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">套接字编程核心</text>

      {/* 第一层：基础 API */}
      <path d="M400 100 L200 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-fr-arrow)" />
      <path d="M400 100 L400 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-fr-arrow)" />
      <path d="M400 100 L600 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-fr-arrow)" />

      <rect x="100" y="148" width="200" height="40" rx="8" fill="url(#unp-fr-basic)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="173" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch1 套接字 API</text>

      <rect x="300" y="148" width="200" height="40" rx="8" fill="url(#unp-fr-basic)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="173" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch2 TCP 套接字</text>

      <rect x="500" y="148" width="200" height="40" rx="8" fill="url(#unp-fr-basic)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="600" y="173" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e40af">ch3 UDP 套接字</text>

      {/* 第二层：连接到高级 */}
      <path d="M200 188 L300 228" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#unp-fr-arrow)" />
      <path d="M400 188 L400 228" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#unp-fr-arrow)" />
      <path d="M600 188 L500 228" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#unp-fr-arrow)" />

      <rect x="150" y="230" width="200" height="40" rx="8" fill="url(#unp-fr-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="250" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0e7490">ch4 I/O 复用模型</text>

      <rect x="300" y="230" width="200" height="40" rx="8" fill="url(#unp-fr-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0e7490">ch5 套接字选项</text>

      <rect x="450" y="230" width="200" height="40" rx="8" fill="url(#unp-fr-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="550" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0e7490">ch6 IPv6 协议无关</text>

      {/* 第三层：生产级 */}
      <path d="M250 270 L300 310" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#unp-fr-arrow)" />
      <path d="M550 270 L500 310" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#unp-fr-arrow)" />

      <rect x="200" y="312" width="200" height="40" rx="8" fill="url(#unp-fr-prod)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="337" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">ch7 守护进程与 IPC</text>

      <rect x="400" y="312" width="200" height="40" rx="8" fill="url(#unp-fr-prod)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="337" textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">ch8 高级 I/O 与信号</text>

      {/* 复习要点矩阵 */}
      <rect x="40" y="370" width="720" height="230" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="393" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">知识整合复习要点</text>

      <rect x="60" y="405" width="150" height="28" rx="6" fill="url(#unp-fr-basic)" opacity="0.15" />
      <text x="135" y="424" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">主题</text>
      <rect x="210" y="405" width="270" height="28" rx="6" fill="url(#unp-fr-conn)" opacity="0.15" />
      <text x="345" y="424" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">核心知识点</text>
      <rect x="480" y="405" width="270" height="28" rx="6" fill="url(#unp-fr-adv)" opacity="0.15" />
      <text x="615" y="424" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0e7490">贯穿线索</text>

      <text x="135" y="448" textAnchor="middle" fontSize="10" fill="#475569">套接字 API</text>
      <text x="345" y="448" textAnchor="middle" fontSize="10" fill="#475569">socket/bind/listen/accept/connect</text>
      <text x="615" y="448" textAnchor="middle" fontSize="10" fill="#475569">从基础到高级的统一接口</text>

      <text x="135" y="470" textAnchor="middle" fontSize="10" fill="#475569">TCP vs UDP</text>
      <text x="345" y="470" textAnchor="middle" fontSize="10" fill="#475569">字节流 vs 数据报 / 连接 vs 无连接</text>
      <text x="615" y="470" textAnchor="middle" fontSize="10" fill="#475569">编程模型差异贯穿全书</text>

      <text x="135" y="492" textAnchor="middle" fontSize="10" fill="#475569">I/O 模型演进</text>
      <text x="345" y="492" textAnchor="middle" fontSize="10" fill="#475569">阻塞→非阻塞→复用→信号→异步</text>
      <text x="615" y="492" textAnchor="middle" fontSize="10" fill="#475569">并发能力逐步提升</text>

      <text x="135" y="514" textAnchor="middle" fontSize="10" fill="#475569">协议无关</text>
      <text x="345" y="514" textAnchor="middle" fontSize="10" fill="#475569">getaddrinfo / sockaddr_in6</text>
      <text x="615" y="514" textAnchor="middle" fontSize="10" fill="#475569">IPv4/IPv6 统一编程</text>

      <text x="135" y="536" textAnchor="middle" fontSize="10" fill="#475569">服务端架构</text>
      <text x="345" y="536" textAnchor="middle" fontSize="10" fill="#475569">守护进程 / IPC / 并发服务</text>
      <text x="615" y="536" textAnchor="middle" fontSize="10" fill="#475569">从单连接到生产级服务</text>

      <text x="135" y="558" textAnchor="middle" fontSize="10" fill="#475569">高级 I/O</text>
      <text x="345" y="558" textAnchor="middle" fontSize="10" fill="#475569">recvmsg/sendmsg / scatter-gather</text>
      <text x="615" y="558" textAnchor="middle" fontSize="10" fill="#475569">性能优化与 fd 传递</text>

      <text x="135" y="580" textAnchor="middle" fontSize="10" fill="#475569">选项控制</text>
      <text x="345" y="580" textAnchor="middle" fontSize="10" fill="#475569">getsockopt/setsockopt 三层</text>
      <text x="615" y="580" textAnchor="middle" fontSize="10" fill="#475569">SOL_SOCKET/IP/TCP 统一接口</text>
    </svg>
  );
}
