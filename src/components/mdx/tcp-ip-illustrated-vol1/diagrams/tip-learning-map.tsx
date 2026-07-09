"use client";

export function TipLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 620" className="w-full h-auto" role="img" aria-label="TCP/IP详解卷1全书学习地图">
      <defs>
        <linearGradient id="tip-lm-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tip-lm-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-lm-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tip-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tip-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">TCP/IP 详解卷1 · 知识体系全景</text>

      {/* 左侧：四层协议栈 */}
      <text x="160" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">TCP/IP 四层模型</text>

      <rect x="40" y="72" width="240" height="78" rx="10" fill="url(#tip-lm-app)" opacity="0.95" />
      <text x="160" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">应用层</text>
      <text x="160" y="118" textAnchor="middle" fontSize="11" fill="#fef3c7">HTTP / DNS / SMTP / FTP / SNMP</text>
      <text x="160" y="136" textAnchor="middle" fontSize="10" fill="#fde68a">第8章：应用层协议实战</text>

      <rect x="40" y="158" width="240" height="78" rx="10" fill="url(#tip-lm-trans)" opacity="0.95" />
      <text x="160" y="184" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">传输层</text>
      <text x="160" y="204" textAnchor="middle" fontSize="11" fill="#e9d5ff">TCP / UDP</text>
      <text x="160" y="222" textAnchor="middle" fontSize="10" fill="#c4b5fd">第4-6章：UDP / TCP / 超时重传</text>

      <rect x="40" y="244" width="240" height="78" rx="10" fill="url(#tip-lm-net)" opacity="0.95" />
      <text x="160" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">网络层</text>
      <text x="160" y="290" textAnchor="middle" fontSize="11" fill="#cffafe">IP / ICMP / IGMP / 路由</text>
      <text x="160" y="308" textAnchor="middle" fontSize="10" fill="#67e8f9">第2-3,7章：IP / ICMP / 路由协议</text>

      <rect x="40" y="330" width="240" height="78" rx="10" fill="url(#tip-lm-link)" opacity="0.95" />
      <text x="160" y="356" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">链路层</text>
      <text x="160" y="376" textAnchor="middle" fontSize="11" fill="#bfdbfe">以太网 / ARP / MTU</text>
      <text x="160" y="394" textAnchor="middle" fontSize="10" fill="#60a5fa">第1章：链路层与ARP</text>

      {/* 右侧：10章学习路径 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">十章学习路径</text>

      <rect x="320" y="72" width="460" height="40" rx="8" fill="url(#tip-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="97" fontSize="12" fontWeight="600" fill="#065f46">ch0</text>
      <text x="372" y="97" fontSize="11" fill="#475569">全书学习地图——知识体系与学习路径</text>

      <path d="M550 112 L550 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="122" width="460" height="40" rx="8" fill="url(#tip-lm-link)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="338" y="147" fontSize="12" fontWeight="600" fill="#1e40af">ch1</text>
      <text x="372" y="147" fontSize="11" fill="#475569">链路层——以太网帧 / ARP / MTU</text>

      <path d="M550 162 L550 170" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="172" width="460" height="40" rx="8" fill="url(#tip-lm-net)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="197" fontSize="12" fontWeight="600" fill="#0e7490">ch2</text>
      <text x="372" y="197" fontSize="11" fill="#475569">IP协议与路由——包头 / 子网 / 路由表</text>

      <path d="M550 212 L550 220" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="222" width="460" height="40" rx="8" fill="url(#tip-lm-net)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="247" fontSize="12" fontWeight="600" fill="#0e7490">ch3</text>
      <text x="372" y="247" fontSize="11" fill="#475569">ICMP与IGMP——差错报告 / 组播</text>

      <path d="M550 262 L550 270" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="272" width="460" height="40" rx="8" fill="url(#tip-lm-trans)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="297" fontSize="12" fontWeight="600" fill="#5b21b6">ch4</text>
      <text x="372" y="297" fontSize="11" fill="#475569">UDP协议——无连接 / 伪首部 / 校验和</text>

      <path d="M550 312 L550 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="322" width="460" height="40" rx="8" fill="url(#tip-lm-trans)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="347" fontSize="12" fontWeight="600" fill="#5b21b6">ch5</text>
      <text x="372" y="347" fontSize="11" fill="#475569">TCP可靠传输——握手挥手 / 状态机 / 流控</text>

      <path d="M550 362 L550 370" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="372" width="460" height="40" rx="8" fill="url(#tip-lm-trans)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="338" y="397" fontSize="12" fontWeight="600" fill="#5b21b6">ch6</text>
      <text x="372" y="397" fontSize="11" fill="#475569">TCP超时与重传——RTT / RTO / Karn算法</text>

      <path d="M550 412 L550 420" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="422" width="460" height="40" rx="8" fill="url(#tip-lm-net)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="338" y="447" fontSize="12" fontWeight="600" fill="#0e7490">ch7</text>
      <text x="372" y="447" fontSize="11" fill="#475569">路由协议——RIP / OSPF / BGP</text>

      <path d="M550 462 L550 470" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="472" width="460" height="40" rx="8" fill="url(#tip-lm-app)" opacity="0.12" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="338" y="497" fontSize="12" fontWeight="600" fill="#92400e">ch8</text>
      <text x="372" y="497" fontSize="11" fill="#475569">应用层协议实战——DNS / HTTP / SMTP</text>

      <path d="M550 512 L550 520" stroke="#64748b" strokeWidth="2" markerEnd="url(#tip-lm-arrow)" />

      <rect x="320" y="522" width="460" height="40" rx="8" fill="url(#tip-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="338" y="547" fontSize="12" fontWeight="600" fill="#065f46">ch9</text>
      <text x="372" y="547" fontSize="11" fill="#475569">全书复习与知识整合——知识网络</text>

      {/* 底部学习路径 */}
      <rect x="40" y="572" width="740" height="40" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="597" textAnchor="middle" fontSize="11" fill="#475569">链路层 → 网络层(IP/ICMP) → 传输层(UDP/TCP) → 路由协议 → 应用层 → 复习整合</text>
    </svg>
  );
}
