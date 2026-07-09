"use client";

export function TipFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="TCP/IP详解卷1全书知识网络">
      <defs>
        <linearGradient id="tip-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="tip-fr-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tip-fr-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-fr-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tip-fr-route" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tip-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP/IP 详解卷1 · 知识网络</text>

      {/* 中心节点 */}
      <circle cx="400" cy="300" r="60" fill="url(#tip-fr-core)" />
      <text x="400" y="296" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">TCP/IP</text>
      <text x="400" y="314" textAnchor="middle" fontSize="11" fill="#cbd5e1">协议栈</text>

      {/* 链路层 */}
      <rect x="60" y="80" width="180" height="60" rx="10" fill="url(#tip-fr-link)" opacity="0.9" />
      <text x="150" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">链路层</text>
      <text x="150" y="124" textAnchor="middle" fontSize="9" fill="#bfdbfe">以太网帧 / ARP / MTU</text>
      <line x1="200" y1="140" x2="360" y2="270" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" />
      <path d="M360 270 L354 262" stroke="#3b82f6" strokeWidth="2" />

      {/* 网络层 */}
      <rect x="560" y="80" width="180" height="60" rx="10" fill="url(#tip-fr-net)" opacity="0.9" />
      <text x="650" y="106" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">网络层</text>
      <text x="650" y="124" textAnchor="middle" fontSize="9" fill="#cffafe">IP / ICMP / IGMP</text>
      <line x1="600" y1="140" x2="440" y2="270" stroke="#0891b2" strokeWidth="2" strokeDasharray="4,2" />
      <path d="M440 270 L446 262" stroke="#0891b2" strokeWidth="2" />

      {/* 传输层 */}
      <rect x="560" y="270" width="180" height="60" rx="10" fill="url(#tip-fr-trans)" opacity="0.9" />
      <text x="650" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">传输层</text>
      <text x="650" y="314" textAnchor="middle" fontSize="9" fill="#e9d5ff">TCP / UDP / 重传</text>
      <line x1="560" y1="300" x2="460" y2="300" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,2" />
      <path d="M460 300 L468 294" stroke="#7c3aed" strokeWidth="2" />

      {/* 应用层 */}
      <rect x="560" y="460" width="180" height="60" rx="10" fill="url(#tip-fr-app)" opacity="0.9" />
      <text x="650" y="486" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">应用层</text>
      <text x="650" y="504" textAnchor="middle" fontSize="9" fill="#fef3c7">DNS / HTTP / SMTP</text>
      <line x1="600" y1="460" x2="440" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
      <path d="M440 330 L446 338" stroke="#f59e0b" strokeWidth="2" />

      {/* 路由协议 */}
      <rect x="60" y="460" width="180" height="60" rx="10" fill="url(#tip-fr-route)" opacity="0.9" />
      <text x="150" y="486" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">路由协议</text>
      <text x="150" y="504" textAnchor="middle" fontSize="9" fill="#bbf7d0">RIP / OSPF / BGP</text>
      <line x1="200" y1="460" x2="360" y2="330" stroke="#059669" strokeWidth="2" strokeDasharray="4,2" />
      <path d="M360 330 L354 338" stroke="#059669" strokeWidth="2" />

      {/* 章节关联线 */}
      <text x="400" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">数据封装：上层 → 下层逐层加头</text>
      <path d="M240 110 L560 110" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* 底部知识脉络 */}
      <rect x="20" y="540" width="760" height="48" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="562" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">全书脉络</text>
      <text x="400" y="578" textAnchor="middle" fontSize="10" fill="#475569">封装解封装 ← 逐层头 ← IP路由 ← 端到端可靠(TCP) ← 超时重传 ← 路由协议寻路 ← 应用层服务</text>
    </svg>
  );
}
