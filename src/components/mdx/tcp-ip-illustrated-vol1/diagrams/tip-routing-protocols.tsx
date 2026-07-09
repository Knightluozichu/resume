"use client";

export function TipRoutingProtocolsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="路由协议分类与对比">
      <defs>
        <linearGradient id="tip-rp-rip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="tip-rp-ospf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tip-rp-bgp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tip-rp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">路由协议分类</text>

      {/* 分类树 */}
      <rect x="300" y="50" width="200" height="44" rx="8" fill="#475569" />
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">路由协议</text>

      <path d="M400 94 L200 120" stroke="#64748b" strokeWidth="2" />
      <path d="M400 94 L600 120" stroke="#64748b" strokeWidth="2" />

      <rect x="100" y="120" width="200" height="40" rx="8" fill="#0891b2" />
      <text x="200" y="144" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">IGP（内部网关协议）</text>

      <rect x="500" y="120" width="200" height="40" rx="8" fill="#d97706" />
      <text x="600" y="144" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">EGP（外部网关协议）</text>

      <path d="M200 160 L120 188" stroke="#64748b" strokeWidth="2" />
      <path d="M200 160 L280 188" stroke="#64748b" strokeWidth="2" />

      <rect x="40" y="188" width="160" height="36" rx="6" fill="url(#tip-rp-rip)" />
      <text x="120" y="210" textAnchor="middle" fontSize="11" fill="#fff">RIP（距离矢量）</text>

      <rect x="220" y="188" width="160" height="36" rx="6" fill="url(#tip-rp-ospf)" />
      <text x="300" y="210" textAnchor="middle" fontSize="11" fill="#fff">OSPF（链路状态）</text>

      <path d="M600 160 L600 188" stroke="#64748b" strokeWidth="2" />

      <rect x="520" y="188" width="160" height="36" rx="6" fill="url(#tip-rp-bgp)" />
      <text x="600" y="210" textAnchor="middle" fontSize="11" fill="#fff">BGP（路径矢量）</text>

      {/* RIP 详情 */}
      <rect x="20" y="240" width="240" height="140" rx="10" fill="#ecfeff" stroke="#67e8f9" strokeWidth="1.5" />
      <text x="40" y="264" fontSize="12" fontWeight="700" fill="#0c4a6e">RIP（Routing Info Protocol）</text>
      <text x="40" y="284" fontSize="10" fill="#075985">度量：跳数（max 15，16=不可达）</text>
      <text x="40" y="300" fontSize="10" fill="#075985">更新：每30秒广播全部路由表</text>
      <text x="40" y="316" fontSize="10" fill="#075985">算法：Bellman-Ford 距离矢量</text>
      <text x="40" y="332" fontSize="10" fill="#075985">问题：计数到无穷、收敛慢</text>
      <text x="40" y="348" fontSize="10" fill="#075985">缓解：水平分割/毒化逆转</text>
      <text x="40" y="366" fontSize="10" fill="#075985">版本：RIPv1(广播) / RIPv2(组播)</text>

      {/* OSPF 详情 */}
      <rect x="270" y="240" width="240" height="140" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="290" y="264" fontSize="12" fontWeight="700" fill="#4c1d95">OSPF（Open Shortest Path First）</text>
      <text x="290" y="284" fontSize="10" fill="#5b21b6">度量：带宽代价（cost=10^8/bw）</text>
      <text x="290" y="300" fontSize="10" fill="#5b21b6">算法：Dijkstra 最短路径优先</text>
      <text x="290" y="316" fontSize="10" fill="#5b21b6">更新：LSA 泛洪，触发更新</text>
      <text x="290" y="332" fontSize="10" fill="#5b21b6">分层：骨干区域0 + 非骨干区域</text>
      <text x="290" y="348" fontSize="10" fill="#5b21b6">组播：224.0.0.5 / 224.0.0.6</text>
      <text x="290" y="366" fontSize="10" fill="#5b21b6">协议号：89，收敛快，适合大型网络</text>

      {/* BGP 详情 */}
      <rect x="520" y="240" width="240" height="140" rx="10" fill="#fffbeb" stroke="#fde047" strokeWidth="1.5" />
      <text x="540" y="264" fontSize="12" fontWeight="700" fill="#854d0e">BGP（Border Gateway Protocol）</text>
      <text x="540" y="284" fontSize="10" fill="#713f12">度量：路径属性（AS_PATH等）</text>
      <text x="540" y="300" fontSize="10" fill="#713f12">算法：路径矢量协议</text>
      <text x="540" y="316" fontSize="10" fill="#713f12">用途：AS间路由，互联网骨干</text>
      <text x="540" y="332" fontSize="10" fill="#713f12">TCP：端口179，可靠传输</text>
      <text x="540" y="348" fontSize="10" fill="#713f12">属性：LOCAL_PREF/MED/NEXT_HOP</text>
      <text x="540" y="366" fontSize="10" fill="#713f12">版本：BGP-4 支持 CIDR</text>

      {/* 对比表 */}
      <rect x="20" y="396" width="760" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="40" y="420" fontSize="12" fontWeight="700" fill="#334155">路由协议对比</text>

      <rect x="40" y="430" width="120" height="24" rx="4" fill="#e2e8f0" />
      <text x="100" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">特性</text>
      <rect x="160" y="430" width="160" height="24" rx="4" fill="#cffafe" />
      <text x="240" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0c4a6e">RIP</text>
      <rect x="320" y="430" width="220" height="24" rx="4" fill="#ede9fe" />
      <text x="430" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4c1d95">OSPF</text>
      <rect x="540" y="430" width="220" height="24" rx="4" fill="#fef3c7" />
      <text x="650" y="446" textAnchor="middle" fontSize="10" fontWeight="600" fill="#854d0e">BGP</text>

      <text x="100" y="470" textAnchor="middle" fontSize="9" fill="#475569">度量</text>
      <text x="240" y="470" textAnchor="middle" fontSize="9" fill="#075985">跳数</text>
      <text x="430" y="470" textAnchor="middle" fontSize="9" fill="#5b21b6">带宽代价</text>
      <text x="650" y="470" textAnchor="middle" fontSize="9" fill="#713f12">路径属性</text>

      <text x="100" y="488" textAnchor="middle" fontSize="9" fill="#475569">算法</text>
      <text x="240" y="488" textAnchor="middle" fontSize="9" fill="#075985">距离矢量</text>
      <text x="430" y="488" textAnchor="middle" fontSize="9" fill="#5b21b6">链路状态(Dijkstra)</text>
      <text x="650" y="488" textAnchor="middle" fontSize="9" fill="#713f12">路径矢量</text>

      <text x="100" y="506" textAnchor="middle" fontSize="9" fill="#475569">范围</text>
      <text x="240" y="506" textAnchor="middle" fontSize="9" fill="#075985">IGP(小型)</text>
      <text x="430" y="506" textAnchor="middle" fontSize="9" fill="#5b21b6">IGP(大型)</text>
      <text x="650" y="506" textAnchor="middle" fontSize="9" fill="#713f12">EGP(AS间)</text>

      <text x="100" y="524" textAnchor="middle" fontSize="9" fill="#475569">收敛速度</text>
      <text x="240" y="524" textAnchor="middle" fontSize="9" fill="#075985">慢</text>
      <text x="430" y="524" textAnchor="middle" fontSize="9" fill="#5b21b6">快</text>
      <text x="650" y="524" textAnchor="middle" fontSize="9" fill="#713f12">中</text>
    </svg>
  );
}
