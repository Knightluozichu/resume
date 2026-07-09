"use client";

export function PhaMonolithToMicroserviceDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="单体到微服务拆分对比">
      <defs>
        <marker id="pha-mm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">单体 vs 微服务架构对比</text>

      {/* 单体架构 */}
      <text x="180" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1d4ed8">单体架构</text>
      <rect x="40" y="70" width="280" height="300" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      {/* 单体内部模块 */}
      <rect x="60" y="90" width="110" height="45" rx="6" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
      <text x="115" y="118" textAnchor="middle" fontSize="11" fill="#1e3a8a">用户模块</text>
      <rect x="190" y="90" width="110" height="45" rx="6" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
      <text x="245" y="118" textAnchor="middle" fontSize="11" fill="#1e3a8a">订单模块</text>
      <rect x="60" y="150" width="110" height="45" rx="6" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
      <text x="115" y="178" textAnchor="middle" fontSize="11" fill="#1e3a8a">商品模块</text>
      <rect x="190" y="150" width="110" height="45" rx="6" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" />
      <text x="245" y="178" textAnchor="middle" fontSize="11" fill="#1e3a8a">支付模块</text>
      {/* 共享数据库 */}
      <ellipse cx="180" cy="250" rx="100" ry="30" fill="#1d4ed8" opacity="0.85" />
      <text x="180" y="256" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="600">共享数据库</text>
      <text x="180" y="310" textAnchor="middle" fontSize="10" fill="#1e40af">同一进程 / 同一部署单元</text>
      <text x="180" y="328" textAnchor="middle" fontSize="10" fill="#1e40af">模块间本地方法调用</text>
      <text x="180" y="346" textAnchor="middle" fontSize="10" fill="#dc2626">紧耦合 / 共享数据模型</text>

      {/* 箭头 */}
      <path d="M330 220 L380 220" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#pha-mm-arrow)" />
      <text x="355" y="210" textAnchor="middle" fontSize="10" fill="#64748b">拆分</text>

      {/* 微服务架构 */}
      <text x="580" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">微服务架构</text>
      {/* 用户服务 */}
      <rect x="420" y="70" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="480" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">用户服务</text>
      <text x="480" y="110" textAnchor="middle" fontSize="9" fill="#78350f">独立DB</text>
      <ellipse cx="480" cy="135" rx="35" ry="12" fill="#d97706" opacity="0.8" />
      <text x="480" y="139" textAnchor="middle" fontSize="8" fill="#fff">user_db</text>

      {/* 订单服务 */}
      <rect x="560" y="70" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="620" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">订单服务</text>
      <text x="620" y="110" textAnchor="middle" fontSize="9" fill="#78350f">独立DB</text>
      <ellipse cx="620" cy="135" rx="35" ry="12" fill="#d97706" opacity="0.8" />
      <text x="620" y="139" textAnchor="middle" fontSize="8" fill="#fff">order_db</text>

      {/* 商品服务 */}
      <rect x="420" y="180" width="120" height="60" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="480" y="203" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0e7490">商品服务</text>
      <text x="480" y="220" textAnchor="middle" fontSize="9" fill="#155e75">独立DB</text>
      <ellipse cx="480" cy="245" rx="35" ry="12" fill="#0e7490" opacity="0.8" />
      <text x="480" y="249" textAnchor="middle" fontSize="8" fill="#fff">product_db</text>

      {/* 支付服务 */}
      <rect x="560" y="180" width="120" height="60" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="620" y="203" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0e7490">支付服务</text>
      <text x="620" y="220" textAnchor="middle" fontSize="9" fill="#155e75">独立DB</text>
      <ellipse cx="620" cy="245" rx="35" ry="12" fill="#0e7490" opacity="0.8" />
      <text x="620" y="249" textAnchor="middle" fontSize="8" fill="#fff">pay_db</text>

      {/* API 网关 */}
      <rect x="440" y="290" width="240" height="35" rx="6" fill="#8b5cf6" opacity="0.9" />
      <text x="560" y="313" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">API 网关（路由 / 鉴权 / 限流）</text>

      <text x="580" y="350" textAnchor="middle" fontSize="10" fill="#92400e">独立部署 / 独立数据库</text>
      <text x="580" y="366" textAnchor="middle" fontSize="10" fill="#92400e">服务间通过网络通信（REST/gRPC）</text>
      <text x="580" y="382" textAnchor="middle" fontSize="10" fill="#dc2626">松耦合 / 分布式复杂性</text>

      {/* 拆分原则 */}
      <rect x="40" y="390" width="720" height="55" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="410" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">拆分原则：领域驱动（DDD限界上下文） / 高内聚低耦合 / 独立数据所有权 / 服务可独立部署 / 团队自治</text>
      <text x="400" y="430" textAnchor="middle" fontSize="10" fill="#64748b">拆分过细 = 分布式单体（网络开销 + 数据一致性噩梦）；拆分过粗 = 伪微服务（失去独立扩展优势）</text>
    </svg>
  );
}
