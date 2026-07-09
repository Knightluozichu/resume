"use client";

export function UnpLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="UNIX网络编程卷1全书学习地图">
      <defs>
        <linearGradient id="unp-lm-basic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-lm-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="unp-lm-prod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="unp-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UNIX网络编程卷1 · 知识体系全景</text>

      {/* 左侧：知识分层 */}
      <text x="160" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心知识分层</text>

      <rect x="40" y="72" width="240" height="78" rx="10" fill="url(#unp-lm-prod)" opacity="0.95" />
      <text x="160" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">生产级编程</text>
      <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#fef3c7">守护进程 / IPC / 高级I/O</text>
      <text x="160" y="136" textAnchor="middle" fontSize="10" fill="#fde68a">ch7-8：守护进程与高级I/O</text>

      <rect x="40" y="158" width="240" height="78" rx="10" fill="url(#unp-lm-adv)" opacity="0.95" />
      <text x="160" y="184" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">高级编程</text>
      <text x="160" y="204" textAnchor="middle" fontSize="11" fill="#cffafe">套接字选项 / IPv6 / I/O复用</text>
      <text x="160" y="222" textAnchor="middle" fontSize="10" fill="#67e8f9">ch4-6：I/O模型 / 高级选项 / IPv6</text>

      <rect x="40" y="244" width="240" height="78" rx="10" fill="url(#unp-lm-tcp)" opacity="0.95" />
      <text x="160" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">套接字编程</text>
      <text x="160" y="290" textAnchor="middle" fontSize="11" fill="#e9d5ff">TCP / UDP 客户端-服务端</text>
      <text x="160" y="308" textAnchor="middle" fontSize="10" fill="#c4b5fd">ch2-3：TCP与UDP套接字</text>

      <rect x="40" y="330" width="240" height="78" rx="10" fill="url(#unp-lm-basic)" opacity="0.95" />
      <text x="160" y="356" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">套接字基础</text>
      <text x="160" y="376" textAnchor="middle" fontSize="11" fill="#bfdbfe">socket / bind / listen / accept</text>
      <text x="160" y="394" textAnchor="middle" fontSize="10" fill="#60a5fa">ch1：套接字简介与API</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="72" width="460" height="40" rx="8" fill="url(#unp-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="97" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="97" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 112 L550 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="122" width="460" height="40" rx="8" fill="url(#unp-lm-basic)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">套接字简介——socket API / 地址结构</text>

      <path d="M550 162 L550 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="172" width="460" height="40" rx="8" fill="url(#unp-lm-tcp)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="197" fontSize="12" fontWeight="600" fill="#5b21b6">ch2</text>
      <text x="372" y="197" fontSize="11" fill="#475569">TCP套接字编程——echo客户端/服务端</text>

      <path d="M550 212 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="222" width="460" height="40" rx="8" fill="url(#unp-lm-tcp)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="247" fontSize="12" fontWeight="600" fill="#5b21b6">ch3</text>
      <text x="372" y="247" fontSize="11" fill="#475569">UDP套接字编程——无连接 / recvfrom / sendto</text>

      <path d="M550 262 L550 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="272" width="460" height="40" rx="8" fill="url(#unp-lm-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="297" fontSize="12" fontWeight="600" fill="#0e7490">ch4</text>
      <text x="372" y="297" fontSize="11" fill="#475569">I/O复用模型——select / poll / epoll</text>

      <path d="M550 312 L550 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="322" width="460" height="40" rx="8" fill="url(#unp-lm-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="347" fontSize="12" fontWeight="600" fill="#0e7490">ch5</text>
      <text x="372" y="347" fontSize="11" fill="#475569">高级套接字选项——getsockopt / setsockopt</text>

      <path d="M550 362 L550 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="372" width="460" height="40" rx="8" fill="url(#unp-lm-adv)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="397" fontSize="12" fontWeight="600" fill="#0e7490">ch6</text>
      <text x="372" y="397" fontSize="11" fill="#475569">IPv6与协议无关——sockaddr_in6 / getaddrinfo</text>

      <path d="M550 412 L550 420" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="422" width="460" height="40" rx="8" fill="url(#unp-lm-prod)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="447" fontSize="12" fontWeight="600" fill="#92400e">ch7</text>
      <text x="372" y="447" fontSize="11" fill="#475569">守护进程与IPC——daemon / 管道 / 共享内存</text>

      <path d="M550 462 L550 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="472" width="460" height="40" rx="8" fill="url(#unp-lm-prod)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="497" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="497" fontSize="11" fill="#475569">高级I/O与信号——SIGIO / scatter-gather</text>

      <path d="M550 512 L550 520" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-lm-arrow)" />

      <rect x="320" y="522" width="460" height="40" rx="8" fill="url(#unp-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="547" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="547" fontSize="11" fill="#475569">全书复习与知识整合——知识网络</text>

      {/* 底部学习路径 */}
      <rect x="40" y="572" width="740" height="40" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="597" textAnchor="middle" fontSize="11" fill="#475569">套接字基础 → TCP/UDP编程 → I/O复用 → 高级选项/IPv6 → 守护进程/IPC → 复习整合</text>
    </svg>
  );
}
