"use client";

export function MspMonolithToMicroservicesDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="单体到微服务拆分策略对比">
      <defs>
        <linearGradient id="msp-mono-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="msp-micro-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <marker id="msp-mono-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">单体 vs 微服务架构对比</text>

      {/* 单体架构 */}
      <rect x="40" y="55" width="320" height="280" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="200" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#991b1b">单体架构</text>
      <line x1="60" y1="90" x2="340" y2="90" stroke="#ef4444" strokeWidth="1" opacity="0.4" />

      <rect x="70" y="105" width="90" height="50" rx="6" fill="url(#msp-mono-grad)" opacity="0.8" />
      <text x="115" y="135" textAnchor="middle" fontSize="12" fill="#fff">订单模块</text>

      <rect x="170" y="105" width="90" height="50" rx="6" fill="url(#msp-mono-grad)" opacity="0.8" />
      <text x="215" y="135" textAnchor="middle" fontSize="12" fill="#fff">用户模块</text>

      <rect x="270" y="105" width="90" height="50" rx="6" fill="url(#msp-mono-grad)" opacity="0.8" />
      <text x="315" y="135" textAnchor="middle" fontSize="12" fill="#fff">商品模块</text>

      <text x="200" y="185" textAnchor="middle" fontSize="12" fill="#991b1b">共享代码库 + 共享数据库</text>

      <rect x="70" y="200" width="260" height="60" rx="6" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
      <text x="200" y="225" textAnchor="middle" fontSize="12" fill="#991b1b">共享数据库（Orders + Users + Products）</text>
      <text x="200" y="245" textAnchor="middle" fontSize="11" fill="#b91c1c">进程内调用 / 整体部署 / 整体扩展</text>

      <rect x="70" y="275" width="260" height="50" rx="6" fill="#fef2f2" stroke="#f87171" strokeWidth="1" />
      <text x="200" y="295" textAnchor="middle" fontSize="11" fill="#991b1b">优势：开发/部署/测试简单</text>
      <text x="200" y="313" textAnchor="middle" fontSize="11" fill="#991b1b">痛点：代码臃肿 / 全量部署 / 无法局部扩</text>

      {/* 箭头 */}
      <path d="M370 195 L430 195" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-mono-arrow)" />
      <text x="400" y="185" textAnchor="middle" fontSize="11" fill="#64748b">拆分</text>

      {/* 微服务架构 */}
      <rect x="440" y="55" width="320" height="280" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="600" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">微服务架构</text>
      <line x1="460" y1="90" x2="740" y2="90" stroke="#2563eb" strokeWidth="1" opacity="0.4" />

      <rect x="460" y="105" width="85" height="60" rx="6" fill="url(#msp-micro-grad)" opacity="0.85" />
      <text x="502" y="130" textAnchor="middle" fontSize="12" fill="#fff">订单服务</text>
      <text x="502" y="150" textAnchor="middle" fontSize="11" fill="#bfdbfe">订单DB</text>

      <rect x="555" y="105" width="85" height="60" rx="6" fill="url(#msp-micro-grad)" opacity="0.85" />
      <text x="597" y="130" textAnchor="middle" fontSize="12" fill="#fff">用户服务</text>
      <text x="597" y="150" textAnchor="middle" fontSize="11" fill="#bfdbfe">用户DB</text>

      <rect x="650" y="105" width="85" height="60" rx="6" fill="url(#msp-micro-grad)" opacity="0.85" />
      <text x="692" y="130" textAnchor="middle" fontSize="12" fill="#fff">商品服务</text>
      <text x="692" y="150" textAnchor="middle" fontSize="11" fill="#bfdbfe">商品DB</text>

      <text x="600" y="185" textAnchor="middle" fontSize="12" fill="#1e3a8a">独立代码库 + 独立数据库</text>

      <rect x="460" y="200" width="260" height="60" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="600" y="225" textAnchor="middle" fontSize="12" fill="#1e3a8a">各服务独立数据库（独立数据所有权）</text>
      <text x="600" y="245" textAnchor="middle" fontSize="11" fill="#1d4ed8">网络调用 / 独立部署 / 独立扩展</text>

      <rect x="460" y="275" width="260" height="50" rx="6" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1" />
      <text x="600" y="295" textAnchor="middle" fontSize="11" fill="#1e3a8a">优势：独立部署/扩展/技术栈</text>
      <text x="600" y="313" textAnchor="middle" fontSize="11" fill="#1e3a8a">代价：分布式复杂性 / 数据一致性</text>

      {/* 分布式单体警告 */}
      <rect x="40" y="360" width="720" height="70" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="385" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">反模式警告：分布式单体 = 物理拆了 + 逻辑耦合</text>
      <text x="400" y="408" textAnchor="middle" fontSize="11" fill="#78350f">共享数据库 + 同步调用链长 + 必须一起部署 = 兼具单体和微服务的缺点，是最差的架构选择</text>
      <text x="400" y="423" textAnchor="middle" fontSize="11" fill="#78350f">避免：独立数据库 / 异步通信 / 数据冗余 / 独立代码</text>

      {/* 拆分原则 */}
      <rect x="40" y="445" width="720" height="60" rx="10" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" />
      <text x="400" y="470" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">三大拆分原则</text>
      <text x="400" y="492" textAnchor="middle" fontSize="11" fill="#047857">① 按业务能力拆分（非技术分层）  ② DDD限界上下文确定边界  ③ 独立数据所有权（每个服务独立DB）</text>
    </svg>
  );
}
