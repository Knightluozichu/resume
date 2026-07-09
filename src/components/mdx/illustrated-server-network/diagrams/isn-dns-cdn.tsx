"use client";

export function IsnDnsCdnDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="DNS与CDN：域名解析与内容分发">
      <defs>
        <linearGradient id="isn-dns-user" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="isn-dns-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-dns-cdn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-dns-origin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="isn-dns-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DNS与CDN：域名解析与内容分发</text>

      {/* DNS解析流程 */}
      <rect x="30" y="45" width="740" height="200" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">DNS分层解析流程</text>

      <rect x="50" y="85" width="100" height="40" rx="6" fill="url(#isn-dns-user)" opacity="0.95" />
      <text x="100" y="110" textAnchor="middle" fontSize="11" fill="#fff">浏览器缓存</text>
      <path d="M150 105 L165 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />

      <rect x="165" y="85" width="100" height="40" rx="6" fill="url(#isn-dns-user)" opacity="0.95" />
      <text x="215" y="110" textAnchor="middle" fontSize="11" fill="#fff">OS缓存</text>
      <path d="M265 105 L280 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />

      <rect x="280" y="85" width="100" height="40" rx="6" fill="url(#isn-dns-server)" opacity="0.95" />
      <text x="330" y="110" textAnchor="middle" fontSize="11" fill="#fff">本地DNS</text>
      <path d="M380 105 L395 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />

      <rect x="395" y="85" width="100" height="40" rx="6" fill="url(#isn-dns-server)" opacity="0.95" />
      <text x="445" y="110" textAnchor="middle" fontSize="11" fill="#fff">根DNS</text>
      <path d="M495 105 L510 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />

      <rect x="510" y="85" width="100" height="40" rx="6" fill="url(#isn-dns-server)" opacity="0.95" />
      <text x="560" y="110" textAnchor="middle" fontSize="11" fill="#fff">顶级域</text>
      <path d="M610 105 L625 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />

      <rect x="625" y="85" width="120" height="40" rx="6" fill="url(#isn-dns-server)" opacity="0.95" />
      <text x="685" y="110" textAnchor="middle" fontSize="11" fill="#fff">权威DNS</text>

      <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#475569">DNS负载均衡：A记录返回多个IP → 客户端随机选一个</text>
      <text x="400" y="170" textAnchor="middle" fontSize="11" fill="#ef4444">局限：不感知健康状态/负载 · DNS缓存导致切换慢</text>
      <text x="400" y="195" textAnchor="middle" fontSize="11" fill="#059669">GSLB：按地域返回最近机房IP → 全球地域调度</text>
      <text x="400" y="220" textAnchor="middle" fontSize="10" fill="#64748b">配合：DNS做跨机房地域调度 → 机房内LVS/Nginx做精细分发</text>

      {/* CDN工作原理 */}
      <rect x="30" y="260" width="740" height="160" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="285" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CDN内容分发网络</text>

      {/* 用户 */}
      <rect x="40" y="300" width="100" height="50" rx="8" fill="url(#isn-dns-user)" opacity="0.95" />
      <text x="90" y="330" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">北京用户</text>

      {/* CDN边缘节点 */}
      <rect x="200" y="300" width="130" height="50" rx="8" fill="url(#isn-dns-cdn)" opacity="0.95" />
      <text x="265" y="322" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">北京CDN边缘</text>
      <text x="265" y="340" textAnchor="middle" fontSize="10" fill="#d1fae5">缓存命中→直接返回</text>

      {/* 源站 */}
      <rect x="620" y="300" width="130" height="50" rx="8" fill="url(#isn-dns-origin)" opacity="0.95" />
      <text x="685" y="322" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">美国源站</text>
      <text x="685" y="340" textAnchor="middle" fontSize="10" fill="#fef3c7">回源拉取内容</text>

      {/* 箭头 */}
      <path d="M140 325 L200 325" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-dns-arrow)" />
      <path d="M330 325 L620 325" stroke="#64748b" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#isn-dns-arrow)" />
      <text x="475" y="318" textAnchor="middle" fontSize="10" fill="#ef4444">未命中→回源(慢)</text>
      <text x="475" y="335" textAnchor="middle" fontSize="10" fill="#059669">命中→10ms(快)</text>

      {/* CDN缓存机制 */}
      <text x="60" y="380" textAnchor="start" fontSize="11" fill="#475569">缓存命中: 边缘有缓存→直接返回(快)</text>
      <text x="280" y="380" textAnchor="start" fontSize="11" fill="#475569">回源: 无缓存→向源站拉取(慢)</text>
      <text x="500" y="380" textAnchor="start" fontSize="11" fill="#475569">缓存预热/刷新: 主动推送/清除</text>
      <text x="400" y="405" textAnchor="middle" fontSize="10" fill="#64748b">缓存时间由Cache-Control/Expires控制 · CDN可减少50-80%源站流量</text>

      {/* 静态vs动态加速 */}
      <rect x="30" y="440" width="350" height="120" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
      <text x="205" y="465" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">静态加速</text>
      <text x="205" y="490" textAnchor="middle" fontSize="11" fill="#475569">边缘节点缓存静态资源</text>
      <text x="205" y="510" textAnchor="middle" fontSize="11" fill="#475569">命中缓存→就近返回</text>
      <text x="205" y="535" textAnchor="middle" fontSize="10" fill="#64748b">图片/CSS/JS/视频</text>

      <rect x="420" y="440" width="350" height="120" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="595" y="465" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">动态加速</text>
      <text x="595" y="490" textAnchor="middle" fontSize="11" fill="#475569">优化回源链路(智能路由)</text>
      <text x="595" y="510" textAnchor="middle" fontSize="11" fill="#475569">TCP复用/协议优化</text>
      <text x="595" y="535" textAnchor="middle" fontSize="10" fill="#64748b">API/动态页面(不缓存)</text>
    </svg>
  );
}
