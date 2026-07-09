"use client";

export function MspCqrsDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="CQRS与API组合模式">
      <defs>
        <linearGradient id="msp-cqrs-write" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-cqrs-read" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="msp-cqrs-api" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="msp-cqrs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">跨服务查询：API组合 vs CQRS</text>

      {/* API组合模式 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">方案一：API组合模式</text>

      <rect x="40" y="70" width="100" height="40" rx="8" fill="url(#msp-cqrs-api)" />
      <text x="90" y="95" textAnchor="middle" fontSize="11" fill="#fff">客户端</text>

      <path d="M145 90 L195 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />

      <rect x="200" y="70" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="260" y="95" textAnchor="middle" fontSize="11" fill="#92400e">API聚合层</text>

      <path d="M325 80 L375 60" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />
      <path d="M325 90 L375 90" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />
      <path d="M325 100 L375 120" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />

      <rect x="380" y="45" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="425" y="68" textAnchor="middle" fontSize="11" fill="#1d4ed8">订单服务</text>

      <rect x="380" y="85" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="425" y="108" textAnchor="middle" fontSize="11" fill="#1d4ed8">用户服务</text>

      <rect x="380" y="125" width="90" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <text x="425" y="148" textAnchor="middle" fontSize="11" fill="#1d4ed8">商品服务</text>

      <text x="600" y="68" textAnchor="middle" fontSize="11" fill="#78350f">并行调用 + 内存拼装</text>
      <text x="600" y="88" textAnchor="middle" fontSize="11" fill="#78350f">简单实时，但性能一般</text>
      <text x="600" y="108" textAnchor="middle" fontSize="11" fill="#78350f">不适合大量服务JOIN</text>
      <text x="600" y="128" textAnchor="middle" fontSize="11" fill="#78350f">不适合分页排序聚合</text>

      {/* 分隔线 */}
      <line x1="40" y1="185" x2="760" y2="185" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,4" />

      {/* CQRS模式 */}
      <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">方案二：CQRS（命令查询职责分离）</text>

      {/* 写侧 */}
      <rect x="40" y="225" width="320" height="220" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e3a8a">写侧（命令）</text>
      <line x1="60" y1="260" x2="340" y2="260" stroke="#2563eb" strokeWidth="1" opacity="0.4" />

      <rect x="60" y="275" width="120" height="40" rx="8" fill="url(#msp-cqrs-write)" />
      <text x="120" y="300" textAnchor="middle" fontSize="11" fill="#fff">CreateOrder</text>

      <path d="M185 295 L235 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />

      <rect x="240" y="275" width="100" height="40" rx="8" fill="#1e40af" />
      <text x="290" y="300" textAnchor="middle" fontSize="11" fill="#fff">领域模型</text>

      <rect x="60" y="330" width="280" height="40" rx="8" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
      <text x="200" y="355" textAnchor="middle" fontSize="11" fill="#1e3a8a">写数据库（关系型DB + 事务）</text>

      <rect x="60" y="385" width="280" height="45" rx="8" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1" />
      <text x="200" y="405" textAnchor="middle" fontSize="11" fill="#1d4ed8">发布领域事件</text>
      <text x="200" y="422" textAnchor="middle" fontSize="11" fill="#1d4ed8">OrderCreated / PaymentAuthorized</text>

      {/* 事件箭头 */}
      <path d="M360 407 L440 407" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#msp-cqrs-arrow)" />
      <text x="400" y="400" textAnchor="middle" fontSize="11" fill="#92400e">事件订阅</text>

      {/* 读侧 */}
      <rect x="440" y="225" width="320" height="220" rx="12" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
      <text x="600" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">读侧（查询）</text>
      <line x1="460" y1="260" x2="740" y2="260" stroke="#10b981" strokeWidth="1" opacity="0.4" />

      <rect x="460" y="275" width="120" height="40" rx="8" fill="url(#msp-cqrs-read)" />
      <text x="520" y="300" textAnchor="middle" fontSize="11" fill="#fff">查询请求</text>

      <path d="M585 295 L635 295" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-cqrs-arrow)" />

      <rect x="640" y="275" width="100" height="40" rx="8" fill="#059669" />
      <text x="690" y="300" textAnchor="middle" fontSize="11" fill="#fff">查询视图</text>

      <rect x="460" y="330" width="280" height="40" rx="8" fill="#a7f3d0" stroke="#10b981" strokeWidth="1" />
      <text x="600" y="355" textAnchor="middle" fontSize="11" fill="#065f46">读数据库（Redis / ES / MongoDB）</text>

      <rect x="460" y="385" width="280" height="45" rx="8" fill="#ecfdf5" stroke="#34d399" strokeWidth="1" />
      <text x="600" y="405" textAnchor="middle" fontSize="11" fill="#047857">订阅事件，更新查询视图</text>
      <text x="600" y="422" textAnchor="middle" fontSize="11" fill="#047857">最终一致 / 反范式化优化查询</text>

      {/* 底部对比 */}
      <rect x="40" y="460" width="720" height="50" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="482" textAnchor="middle" fontSize="11" fill="#475569">API组合：简单实时，适合查询简单服务少 / CQRS：读写分离事件驱动，适合查询复杂读写差异大</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">CQRS核心价值：写侧保证业务一致（关系型DB），读侧优化查询（NoSQL + 反范式化），事件异步同步最终一致</text>
    </svg>
  );
}
