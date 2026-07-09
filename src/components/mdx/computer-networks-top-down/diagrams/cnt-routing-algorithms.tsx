"use client";

export function CntRoutingAlgorithmsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="路由算法与协议对比图">
      <defs>
        <linearGradient id="cnt-ra-ls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-ra-dv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-ra-ospf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-ra-bgp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="cnt-ra-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">路由算法：链路状态 vs 距离向量 vs BGP</text>

      {/* LS vs DV 对比 */}
      <rect x="30" y="50" width="360" height="170" rx="10" fill="url(#cnt-ra-ls)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1e40af">链路状态（LS）</text>
      <line x1="50" y1="86" x2="370" y2="86" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
      <text x="50" y="106" fontSize="11" fill="#1e3a8a">信息：全网络拓扑（洪泛LSA）</text>
      <text x="50" y="126" fontSize="11" fill="#1e3a8a">计算：Dijkstra最短路径算法</text>
      <text x="50" y="146" fontSize="11" fill="#1e3a8a">复杂度：O(n^2)</text>
      <text x="50" y="166" fontSize="11" fill="#1e3a8a">优点：收敛快、无计数到无穷</text>
      <text x="50" y="186" fontSize="11" fill="#1e3a8a">缺点：LSA洪泛开销大、存储全拓扑</text>
      <text x="50" y="206" fontSize="11" fontWeight="600" fill="#1d4ed8">代表协议：OSPF / IS-IS</text>

      <rect x="410" y="50" width="360" height="170" rx="10" fill="url(#cnt-ra-dv)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="#92400e">距离向量（DV）</text>
      <line x1="430" y1="86" x2="750" y2="86" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
      <text x="430" y="106" fontSize="11" fill="#78350f">信息：仅邻居距离向量</text>
      <text x="430" y="126" fontSize="11" fill="#78350f">计算：Bellman-Ford方程迭代</text>
      <text x="430" y="146" fontSize="11" fill="#78350f">公式：Dx(y) = min{c(x,v)+Dv(y)}</text>
      <text x="430" y="166" fontSize="11" fill="#78350f">优点：消息开销小、存储低</text>
      <text x="430" y="186" fontSize="11" fill="#78350f">缺点：收敛慢、计数到无穷问题</text>
      <text x="430" y="206" fontSize="11" fontWeight="600" fill="#b45309">代表协议：RIP（毒性逆转解决环路）</text>

      {/* OSPF分层 */}
      <text x="200" y="258" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">OSPF分层区域</text>

      <rect x="120" y="270" width="160" height="80" rx="8" fill="url(#cnt-ra-ospf)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" />
      <text x="200" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">区域0（骨干）</text>
      <text x="200" y="312" textAnchor="middle" fontSize="10" fill="#0e7490">R1 ─── R2</text>
      <text x="200" y="330" textAnchor="middle" fontSize="10" fill="#475569">区域边界路由器(ABR)</text>

      <rect x="30" y="360" width="130" height="55" rx="8" fill="url(#cnt-ra-ospf)" opacity="0.08" stroke="#0891b2" strokeWidth="1" />
      <text x="95" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0e7490">区域1</text>
      <text x="95" y="400" textAnchor="middle" fontSize="10" fill="#475569">R3  R4</text>

      <rect x="240" y="360" width="130" height="55" rx="8" fill="url(#cnt-ra-ospf)" opacity="0.08" stroke="#0891b2" strokeWidth="1" />
      <text x="305" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0e7490">区域2</text>
      <text x="305" y="400" textAnchor="middle" fontSize="10" fill="#475569">R5  R6</text>

      <path d="M95 360 L140 350" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cnt-ra-arrow)" />
      <path d="M305 360 L260 350" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cnt-ra-arrow)" />

      {/* BGP */}
      <text x="590" y="258" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">BGP自治系统互联</text>

      <rect x="430" y="270" width="120" height="60" rx="8" fill="url(#cnt-ra-bgp)" opacity="0.85" />
      <text x="490" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">AS100</text>
      <text x="490" y="313" textAnchor="middle" fontSize="10" fill="#ede9fe">ISP-A</text>

      <rect x="630" y="270" width="120" height="60" rx="8" fill="url(#cnt-ra-bgp)" opacity="0.85" />
      <text x="690" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">AS200</text>
      <text x="690" y="313" textAnchor="middle" fontSize="10" fill="#ede9fe">ISP-B</text>

      <path d="M550 300 L630 300" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#cnt-ra-arrow)" />
      <path d="M630 305 L550 305" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#cnt-ra-arrow)" />
      <text x="590" y="290" textAnchor="middle" fontSize="10" fill="#5b21b6" fontWeight="600">eBGP</text>

      <rect x="430" y="350" width="120" height="55" rx="8" fill="url(#cnt-ra-bgp)" opacity="0.6" />
      <text x="490" y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">AS300</text>
      <text x="490" y="390" textAnchor="middle" fontSize="10" fill="#ede9fe">企业A</text>

      <rect x="630" y="350" width="120" height="55" rx="8" fill="url(#cnt-ra-bgp)" opacity="0.6" />
      <text x="690" y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">AS400</text>
      <text x="690" y="390" textAnchor="middle" fontSize="10" fill="#ede9fe">企业B</text>

      <path d="M490 350 L490 330" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cnt-ra-arrow)" />
      <path d="M690 350 L690 330" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cnt-ra-arrow)" />

      {/* SDN */}
      <rect x="30" y="430" width="740" height="55" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="452" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">SDN：数据平面(交换机转发) ↔ 控制平面(集中式控制器) 分离</text>
      <text x="400" y="470" textAnchor="middle" fontSize="11" fill="#475569">应用层 ←Northbound API→ 控制器 ←OpenFlow(Southbound)→ 交换机</text>
    </svg>
  );
}
