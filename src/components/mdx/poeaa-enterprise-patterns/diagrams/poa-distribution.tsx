"use client";

export function PoaDistributionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="分布式策略架构模式图">
      <defs>
        <linearGradient id="poa-di-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-di-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-di-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-di-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="poa-di-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分布式策略</text>

      {/* 分布式对象的第一法则 */}
      <rect x="30" y="52" width="740" height="40" rx="8" fill="url(#poa-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">分布式对象第一法则：不要分布式</text>

      {/* 远程外观 */}
      <text x="200" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">远程外观 Remote Facade</text>

      <rect x="30" y="128" width="340" height="180" rx="10" fill="url(#poa-di-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="150" fontSize="11" fontWeight="700" fill="#0369a1">客户端</text>
      <text x="50" y="168" fontSize="9" fill="#475569">一次远程调用获取完整订单信息</text>

      <rect x="60" y="180" width="280" height="36" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="200" y="202" textAnchor="middle" fontSize="10" fill="#0369a1">RemoteFacade.getOrder(orderId)</text>

      <path d="M200 216 L200 226" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-di-arrow)" />

      <rect x="60" y="230" width="280" height="36" rx="6" fill="url(#poa-di-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="200" y="252" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">远程外观：粗粒度 API</text>

      <path d="M200 266 L200 276" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-di-arrow)" />

      <rect x="60" y="280" width="280" height="20" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="200" y="294" textAnchor="middle" fontSize="9" fill="#15803d">领域模型（多对象协作）</text>

      <text x="200" y="324" textAnchor="middle" fontSize="9" fill="#64748b">将多次细粒度调用合并为一次粗粒度调用</text>

      {/* 数据传输对象 */}
      <text x="590" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据传输对象 DTO</text>

      <rect x="410" y="128" width="360" height="180" rx="10" fill="url(#poa-di-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="150" fontSize="11" fontWeight="700" fill="#15803d">作用</text>
      <text x="430" y="168" fontSize="9" fill="#475569">在远程调用间传递数据的容器</text>
      <text x="430" y="184" fontSize="9" fill="#475569">无行为，纯数据序列化结构</text>

      <text x="430" y="208" fontSize="11" fontWeight="700" fill="#15803d">特征</text>
      <text x="430" y="226" fontSize="9" fill="#475569">1. 序列化友好（JSON / Protobuf）</text>
      <text x="430" y="242" fontSize="9" fill="#475569">2. 扁平化对象图，减少嵌套</text>
      <text x="430" y="258" fontSize="9" fill="#475569">3. 可组装不同领域对象的子集</text>
      <text x="430" y="274" fontSize="9" fill="#475569">4. 需要组装/反组装逻辑</text>

      <text x="430" y="296" fontSize="9" fill="#64748b">远程外观 + DTO = 分布式通信最小单元</text>

      {/* 分布式代价 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分布式的代价</text>

      <rect x="30" y="354" width="180" height="56" rx="8" fill="url(#poa-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="120" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">网络延迟</text>
      <text x="120" y="396" textAnchor="middle" fontSize="9" fill="#475569">远比方法调用慢</text>

      <rect x="220" y="354" width="180" height="56" rx="8" fill="url(#poa-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="310" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">序列化开销</text>
      <text x="310" y="396" textAnchor="middle" fontSize="9" fill="#475569">对象编解码成本</text>

      <rect x="410" y="354" width="180" height="56" rx="8" fill="url(#poa-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="500" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">可靠性降低</text>
      <text x="500" y="396" textAnchor="middle" fontSize="9" fill="#475569">网络不可靠风险</text>

      <rect x="600" y="354" width="170" height="56" rx="8" fill="url(#poa-di-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="685" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">部署复杂</text>
      <text x="685" y="396" textAnchor="middle" fontSize="9" fill="#475569">多节点运维成本</text>

      {/* 何时分布式 */}
      <text x="400" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">何时该分布式</text>

      <rect x="30" y="452" width="240" height="44" rx="8" fill="url(#poa-di-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="150" y="470" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">团队协作需要</text>
      <text x="150" y="488" textAnchor="middle" fontSize="9" fill="#475569">独立团队独立部署</text>

      <rect x="280" y="452" width="240" height="44" rx="8" fill="url(#poa-di-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="470" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">性能瓶颈隔离</text>
      <text x="400" y="488" textAnchor="middle" fontSize="9" fill="#475569">独立扩展热点模块</text>

      <rect x="530" y="452" width="240" height="44" rx="8" fill="url(#poa-di-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="650" y="470" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">技术异构</text>
      <text x="650" y="488" textAnchor="middle" fontSize="9" fill="#475569">不同语言/平台协作</text>

      {/* 最佳实践 */}
      <rect x="30" y="510" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="530" textAnchor="middle" fontSize="10" fill="#475569">最佳实践：优先单体 → 必要时拆分 → 用远程外观 + DTO 最小化远程调用</text>

      <rect x="30" y="550" width="740" height="24" rx="8" fill="url(#poa-di-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="566" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心：远程外观聚合细粒度调用 + DTO 承载序列化数据</text>
    </svg>
  );
}
