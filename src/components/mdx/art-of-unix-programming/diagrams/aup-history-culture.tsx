"use client";

export function AupHistoryCultureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="UNIX历史与文化演进时间线">
      <defs>
        <linearGradient id="aup-hc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-hc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-hc-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-hc-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-hc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">UNIX 历史与文化演进</text>

      {/* 时间线主轴 */}
      <line x1="60" y1="100" x2="740" y2="100" stroke="#cbd5e1" strokeWidth="3" />

      {/* 四个时代 */}
      <circle cx="120" cy="100" r="12" fill="url(#aup-hc-1)" />
      <text x="120" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">1969</text>

      <circle cx="320" cy="100" r="12" fill="url(#aup-hc-2)" />
      <text x="320" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">1977-1984</text>

      <circle cx="520" cy="100" r="12" fill="url(#aup-hc-3)" />
      <text x="520" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">1991-2000</text>

      <circle cx="700" cy="100" r="12" fill="url(#aup-hc-4)" />
      <text x="700" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">2000+</text>

      {/* 时代详情卡片 */}
      <rect x="30" y="130" width="180" height="160" rx="10" fill="url(#aup-hc-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">起源时代</text>
      <text x="45" y="174" fontSize="9" fill="#475569">Thompson &amp; Ritchie</text>
      <text x="45" y="190" fontSize="9" fill="#475569">Bell Labs 创造 UNIX</text>
      <text x="45" y="206" fontSize="9" fill="#475569">C 语言诞生</text>
      <text x="45" y="222" fontSize="9" fill="#475569">管道机制发明</text>
      <text x="45" y="238" fontSize="9" fill="#475569">以研究为核心</text>
      <rect x="45" y="252" width="120" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="105" y="264" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0369a1">奠定设计基因</text>

      <rect x="230" y="130" width="180" height="160" rx="10" fill="url(#aup-hc-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">分裂时代</text>
      <text x="245" y="174" fontSize="9" fill="#475569">BSD vs System V</text>
      <text x="245" y="190" fontSize="9" fill="#475569">商业化与标准化</text>
      <text x="245" y="206" fontSize="9" fill="#475569">POSIX 标准诞生</text>
      <text x="245" y="222" fontSize="9" fill="#475569">TCP/IP 网络</text>
      <text x="245" y="238" fontSize="9" fill="#475569">GNU 项目启动</text>
      <rect x="245" y="252" width="120" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="305" y="264" textAnchor="middle" fontSize="8" fontWeight="600" fill="#7e22ce">生态扩张</text>

      <rect x="430" y="130" width="180" height="160" rx="10" fill="url(#aup-hc-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">开源时代</text>
      <text x="445" y="174" fontSize="9" fill="#475569">Linux 内核发布</text>
      <text x="445" y="190" fontSize="9" fill="#475569">开源运动兴起</text>
      <text x="445" y="206" fontSize="9" fill="#475569">Apache / Perl / Python</text>
      <text x="445" y="222" fontSize="9" fill="#475569">互联网爆发</text>
      <text x="445" y="238" fontSize="9" fill="#475569">Unix 哲学验证</text>
      <rect x="445" y="252" width="120" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="505" y="264" textAnchor="middle" fontSize="8" fontWeight="600" fill="#15803d">社区驱动</text>

      <rect x="630" y="130" width="140" height="160" rx="10" fill="url(#aup-hc-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="154" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">融合时代</text>
      <text x="645" y="174" fontSize="9" fill="#475569">macOS (Darwin)</text>
      <text x="645" y="190" fontSize="9" fill="#475569">容器化 Docker</text>
      <text x="645" y="206" fontSize="9" fill="#475569">云原生 Kubernetes</text>
      <text x="645" y="222" fontSize="9" fill="#475569">DevOps 文化</text>
      <text x="645" y="238" fontSize="9" fill="#475569">万物皆管道</text>
      <rect x="645" y="252" width="110" height="16" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="700" y="264" textAnchor="middle" fontSize="8" fontWeight="600" fill="#a16207">现代延续</text>

      {/* 文化特征 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">UNIX 文化核心特征</text>

      <rect x="30" y="332" width="180" height="90" rx="8" fill="url(#aup-hc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">源码共享</text>
      <text x="120" y="376" textAnchor="middle" fontSize="9" fill="#475569">早期学术共享传统</text>
      <text x="120" y="392" textAnchor="middle" fontSize="9" fill="#475569">开源运动基石</text>
      <text x="120" y="408" textAnchor="middle" fontSize="9" fill="#475569">「足够好就发布」</text>

      <rect x="230" y="332" width="180" height="90" rx="8" fill="url(#aup-hc-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">工具文化</text>
      <text x="320" y="376" textAnchor="middle" fontSize="9" fill="#475569">偏好小而锋利的工具</text>
      <text x="320" y="392" textAnchor="middle" fontSize="9" fill="#475569">优于大型集成环境</text>
      <text x="320" y="408" textAnchor="middle" fontSize="9" fill="#475569">可组合可替换</text>

      <rect x="430" y="332" width="180" height="90" rx="8" fill="url(#aup-hc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">去中心化</text>
      <text x="520" y="376" textAnchor="middle" fontSize="9" fill="#475569">无单一权威控制</text>
      <text x="520" y="392" textAnchor="middle" fontSize="9" fill="#475569">分布式的协作模式</text>
      <text x="520" y="408" textAnchor="middle" fontSize="9" fill="#475569">通过标准达成共识</text>

      <rect x="630" y="332" width="140" height="90" rx="8" fill="url(#aup-hc-4)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">传承迭代</text>
      <text x="700" y="376" textAnchor="middle" fontSize="9" fill="#475569">Standing on shoulders</text>
      <text x="700" y="392" textAnchor="middle" fontSize="9" fill="#475569">复用优于重写</text>
      <text x="700" y="408" textAnchor="middle" fontSize="9" fill="#475569">渐进式演化</text>

      {/* 影响与启示 */}
      <text x="400" y="452" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">影响与启示</text>

      <rect x="30" y="466" width="740" height="40" rx="8" fill="url(#aup-hc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="10" fill="#475569">UNIX 文化 → Linux 开源生态 → 容器化 / 云原生 / DevOps —— 半个世纪的设计哲学持续影响现代软件工程</text>

      {/* 底部总结 */}
      <rect x="30" y="520" width="740" height="40" rx="8" fill="url(#aup-hc-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="544" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：从 Bell Labs 到开源世界——UNIX 文化的生命力源于简洁设计与共享精神</text>
    </svg>
  );
}
