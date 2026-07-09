"use client";

export function CntFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="全书复习与知识整合端到端流程图">
      <defs>
        <linearGradient id="cnt-fr-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-fr-trans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-fr-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-fr-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="cnt-fr-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="cnt-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合：端到端数据流程</text>

      {/* 端到端封装流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">一个HTTP请求的逐层封装与传输</text>

      <rect x="30" y="70" width="740" height="180" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 发送方封装 */}
      <rect x="50" y="85" width="140" height="30" rx="6" fill="url(#cnt-fr-app)" opacity="0.9" />
      <text x="120" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">应用层: HTTP报文</text>

      <rect x="50" y="120" width="170" height="30" rx="6" fill="url(#cnt-fr-trans)" opacity="0.9" />
      <text x="135" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">传输层: TCP头 + HTTP</text>

      <rect x="50" y="155" width="210" height="30" rx="6" fill="url(#cnt-fr-net)" opacity="0.9" />
      <text x="155" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">网络层: IP头 + TCP + HTTP</text>

      <rect x="50" y="190" width="260" height="30" rx="6" fill="url(#cnt-fr-link)" opacity="0.9" />
      <text x="180" y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">链路层: 帧头 + IP + TCP + HTTP + CRC</text>

      <text x="160" y="235" textAnchor="middle" fontSize="10" fill="#64748b">发送方逐层封装（加头部）</text>

      {/* 传输网络 */}
      <path d="M320 205 L400 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-fr-arrow)" />
      <text x="360" y="198" textAnchor="middle" fontSize="10" fill="#64748b">比特流</text>
      <text x="360" y="220" textAnchor="middle" fontSize="9" fill="#94a3b8">物理层传输</text>

      {/* 路由器转发 */}
      <rect x="400" y="180" width="160" height="50" rx="8" fill="url(#cnt-fr-net)" opacity="0.7" />
      <text x="480" y="200" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">路由器转发</text>
      <text x="480" y="217" textAnchor="middle" fontSize="10" fill="#fef3c7">最长前缀匹配 · TTL-1</text>

      <path d="M560 205 L640 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-fr-arrow)" />

      {/* 接收方解封装 */}
      <rect x="640" y="85" width="120" height="30" rx="6" fill="url(#cnt-fr-app)" opacity="0.7" />
      <text x="700" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">应用层</text>

      <rect x="640" y="120" width="120" height="30" rx="6" fill="url(#cnt-fr-trans)" opacity="0.7" />
      <text x="700" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">传输层</text>

      <rect x="640" y="155" width="120" height="30" rx="6" fill="url(#cnt-fr-net)" opacity="0.7" />
      <text x="700" y="175" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">网络层</text>

      <rect x="640" y="190" width="120" height="30" rx="6" fill="url(#cnt-fr-link)" opacity="0.7" />
      <text x="700" y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">链路层</text>

      <text x="700" y="235" textAnchor="middle" fontSize="10" fill="#64748b">接收方逐层解封装</text>

      {/* 各层核心机制 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">各层核心机制对比</text>

      <rect x="30" y="295" width="145" height="95" rx="8" fill="url(#cnt-fr-app)" opacity="0.1" stroke="#2563eb" strokeWidth="1" />
      <text x="102" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">应用层</text>
      <text x="40" y="334" fontSize="9" fill="#1e3a8a">HTTP: 请求-响应</text>
      <text x="40" y="348" fontSize="9" fill="#1e3a8a">DNS: 递归+迭代</text>
      <text x="40" y="362" fontSize="9" fill="#1e3a8a">Cookie/缓存</text>
      <text x="40" y="376" fontSize="9" fill="#1e3a8a">Socket API</text>

      <rect x="185" y="295" width="145" height="95" rx="8" fill="url(#cnt-fr-trans)" opacity="0.1" stroke="#0891b2" strokeWidth="1" />
      <text x="257" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">传输层</text>
      <text x="195" y="334" fontSize="9" fill="#0e7490">TCP: 可靠+有序</text>
      <text x="195" y="348" fontSize="9" fill="#0e7490">UDP: 快速无连接</text>
      <text x="195" y="362" fontSize="9" fill="#0e7490">流量控制(rwnd)</text>
      <text x="195" y="376" fontSize="9" fill="#0e7490">拥塞控制(cwnd)</text>

      <rect x="340" y="295" width="145" height="95" rx="8" fill="url(#cnt-fr-net)" opacity="0.1" stroke="#f59e0b" strokeWidth="1" />
      <text x="412" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">网络层</text>
      <text x="350" y="334" fontSize="9" fill="#78350f">IP: 最佳努力交付</text>
      <text x="350" y="348" fontSize="9" fill="#78350f">最长前缀匹配转发</text>
      <text x="350" y="362" fontSize="9" fill="#78350f">OSPF/BGP路由</text>
      <text x="350" y="376" fontSize="9" fill="#78350f">NAT地址转换</text>

      <rect x="495" y="295" width="145" height="95" rx="8" fill="url(#cnt-fr-link)" opacity="0.1" stroke="#10b981" strokeWidth="1" />
      <text x="567" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">链路层</text>
      <text x="505" y="334" fontSize="9" fill="#065f46">CRC差错检测</text>
      <text x="505" y="348" fontSize="9" fill="#065f46">CSMA/CD(以太网)</text>
      <text x="505" y="362" fontSize="9" fill="#065f46">交换机自学习</text>
      <text x="505" y="376" fontSize="9" fill="#065f46">VLAN隔离</text>

      <rect x="650" y="295" width="120" height="95" rx="8" fill="url(#cnt-fr-sec)" opacity="0.1" stroke="#ef4444" strokeWidth="1" />
      <text x="710" y="315" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">安全</text>
      <text x="660" y="334" fontSize="9" fill="#7f1d1d">混合加密</text>
      <text x="660" y="348" fontSize="9" fill="#7f1d1d">TLS握手</text>
      <text x="660" y="362" fontSize="9" fill="#7f1d1d">IPsec VPN</text>
      <text x="660" y="376" fontSize="9" fill="#7f1d1d">防火墙/IDS</text>

      {/* 核心设计原则 */}
      <rect x="30" y="410" width="740" height="115" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心设计原则与关键对比</text>

      <text x="50" y="458" fontSize="11" fontWeight="600" fill="#1e40af">端到端原则：</text>
      <text x="160" y="458" fontSize="11" fill="#475569">功能放端系统，网络核心简单（TCP可靠由端系统实现）</text>

      <text x="50" y="478" fontSize="11" fontWeight="600" fill="#0e7490">流量控制 vs 拥塞控制：</text>
      <text x="230" y="478" fontSize="11" fill="#475569">rwnd保护接收方 · cwnd保护网络 · 发送窗口=min(cwnd,rwnd)</text>

      <text x="50" y="498" fontSize="11" fontWeight="600" fill="#92400e">TCP vs UDP：</text>
      <text x="160" y="498" fontSize="11" fill="#475569">可靠+有序+慢 vs 无连接+快 · 根据应用需求选型</text>

      <text x="50" y="516" fontSize="11" fontWeight="600" fill="#065f46">寻址体系：</text>
      <text x="140" y="516" fontSize="11" fill="#475569">域名→DNS→IP→ARP→MAC · 层层转换实现端到端交付</text>
    </svg>
  );
}
