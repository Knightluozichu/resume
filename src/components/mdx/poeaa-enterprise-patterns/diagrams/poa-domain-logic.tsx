"use client";

export function PoaDomainLogicDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="领域逻辑模式对比图">
      <defs>
        <linearGradient id="poa-dl-ts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-dl-dm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-dl-tm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-dl-sl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="poa-dl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">领域逻辑模式</text>

      {/* 四种模式卡片 */}
      <rect x="30" y="56" width="360" height="120" rx="10" fill="url(#poa-dl-ts)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="80" fontSize="13" fontWeight="700" fill="#0369a1">事务脚本 Transaction Script</text>
      <text x="50" y="100" fontSize="10" fill="#475569">每个业务过程对应一个过程/方法</text>
      <text x="50" y="116" fontSize="10" fill="#475569">直接在方法中编排 SQL 调用</text>
      <text x="50" y="132" fontSize="10" fill="#475569">优点：简单直观，易理解</text>
      <text x="50" y="148" fontSize="10" fill="#475569">缺点：逻辑重复，难扩展</text>
      <rect x="50" y="156" width="80" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="90" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">简单系统</text>

      <rect x="410" y="56" width="360" height="120" rx="10" fill="url(#poa-dl-dm)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="80" fontSize="13" fontWeight="700" fill="#7e22ce">领域模型 Domain Model</text>
      <text x="430" y="100" fontSize="10" fill="#475569">对象同时持有数据和行为</text>
      <text x="430" y="116" fontSize="10" fill="#475569">业务规则封装在对象内部</text>
      <text x="430" y="132" fontSize="10" fill="#475569">优点：逻辑内聚，可扩展</text>
      <text x="430" y="148" fontSize="10" fill="#475569">缺点：学习曲线，映射复杂</text>
      <rect x="430" y="156" width="80" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="470" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">复杂系统</text>

      <rect x="30" y="190" width="360" height="120" rx="10" fill="url(#poa-dl-tm)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="50" y="214" fontSize="13" fontWeight="700" fill="#15803d">表模块 Table Module</text>
      <text x="50" y="234" fontSize="10" fill="#475569">以数据库表为单位组织逻辑</text>
      <text x="50" y="250" fontSize="10" fill="#475569">每个表对应一个模块类</text>
      <text x="50" y="266" fontSize="10" fill="#475569">优点：与数据结构对齐</text>
      <text x="50" y="282" fontSize="10" fill="#475569">缺点：对象无实例身份</text>
      <rect x="50" y="290" width="80" height="16" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="90" y="302" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">折中方案</text>

      <rect x="410" y="190" width="360" height="120" rx="10" fill="url(#poa-dl-sl)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="214" fontSize="13" fontWeight="700" fill="#a16207">服务层 Service Layer</text>
      <text x="430" y="234" fontSize="10" fill="#475569">在领域模型之上封装用例</text>
      <text x="430" y="250" fontSize="10" fill="#475569">对外提供粗粒度 API</text>
      <text x="430" y="266" fontSize="10" fill="#475569">优点：用例边界清晰</text>
      <text x="430" y="282" fontSize="10" fill="#475569">缺点：额外抽象层</text>
      <rect x="430" y="290" width="80" height="16" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="470" y="302" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">企业应用</text>

      {/* 模式选择决策树 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">模式选择决策</text>

      <rect x="300" y="354" width="200" height="40" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">业务逻辑复杂度？</text>

      <path d="M360 394 L200 414" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-dl-arrow)" />
      <path d="M440 394 L600 414" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-dl-arrow)" />

      <rect x="100" y="418" width="200" height="40" rx="8" fill="url(#poa-dl-ts)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="200" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">简单 → 事务脚本</text>

      <rect x="500" y="418" width="200" height="40" rx="8" fill="url(#poa-dl-dm)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="600" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">复杂 → 领域模型</text>

      <path d="M200 458 L200 472" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-dl-arrow)" />
      <path d="M600 458 L600 472" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-dl-arrow)" />

      <rect x="100" y="476" width="200" height="36" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="200" y="498" textAnchor="middle" fontSize="10" fill="#15803d">中量行数据可用表模块</text>

      <rect x="500" y="476" width="200" height="36" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="600" y="498" textAnchor="middle" fontSize="10" fill="#a16207">多入口用例加服务层</text>

      {/* 底部总结 */}
      <rect x="30" y="528" width="740" height="36" rx="8" fill="url(#poa-dl-dm)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="550" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：简单用事务脚本 → 中等用表模块 → 复杂用领域模型 + 服务层</text>
    </svg>
  );
}
