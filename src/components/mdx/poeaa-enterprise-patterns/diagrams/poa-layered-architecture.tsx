"use client";

export function PoaLayeredArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="分层架构与领域逻辑三层结构图">
      <defs>
        <linearGradient id="poa-la-pres" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-la-domain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-la-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <marker id="poa-la-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">分层架构与领域逻辑</text>

      {/* 三层架构主图 */}
      <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三层架构</text>

      <rect x="60" y="80" width="280" height="70" rx="10" fill="url(#poa-la-pres)" opacity="0.9" />
      <text x="200" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">表现层 Presentation</text>
      <text x="200" y="130" textAnchor="middle" fontSize="11" fill="#e0f2fe">控制器 / 视图 / 模板渲染</text>

      <path d="M200 150 L200 162" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" />
      <path d="M200 162 L200 150" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" transform="translate(8,0)" />

      <rect x="60" y="166" width="280" height="70" rx="10" fill="url(#poa-la-domain)" opacity="0.9" />
      <text x="200" y="194" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">领域层 Domain</text>
      <text x="200" y="216" textAnchor="middle" fontSize="11" fill="#f3e8ff">业务逻辑 / 领域模型 / 规则</text>

      <path d="M200 236 L200 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" />
      <path d="M200 248 L200 236" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" transform="translate(8,0)" />

      <rect x="60" y="252" width="280" height="70" rx="10" fill="url(#poa-la-data)" opacity="0.9" />
      <text x="200" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">数据源层 Data Source</text>
      <text x="200" y="302" textAnchor="middle" fontSize="11" fill="#dcfce7">数据库 / 消息 / 事务</text>

      <text x="200" y="346" textAnchor="middle" fontSize="10" fill="#64748b">层间只通过定义良好的接口通信</text>

      {/* 右侧：三种领域逻辑模式 */}
      <text x="590" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">领域逻辑模式</text>

      <rect x="400" y="80" width="380" height="56" rx="8" fill="url(#poa-la-domain)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="420" y="102" fontSize="12" fontWeight="700" fill="#7e22ce">事务脚本 Transaction Script</text>
      <text x="420" y="122" fontSize="10" fill="#475569">每个过程对应一个业务事务，简单直接</text>

      <rect x="400" y="146" width="380" height="56" rx="8" fill="url(#poa-la-domain)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="420" y="168" fontSize="12" fontWeight="700" fill="#7e22ce">领域模型 Domain Model</text>
      <text x="420" y="188" fontSize="10" fill="#475569">对象承载行为和数据，适合复杂逻辑</text>

      <rect x="400" y="212" width="380" height="56" rx="8" fill="url(#poa-la-domain)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="420" y="234" fontSize="12" fontWeight="700" fill="#7e22ce">表模块 Table Module</text>
      <text x="420" y="254" fontSize="10" fill="#475569">以表为单位组织逻辑，折中方案</text>

      <rect x="400" y="278" width="380" height="56" rx="8" fill="url(#poa-la-domain)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="420" y="300" fontSize="12" fontWeight="700" fill="#7e22ce">服务层 Service Layer</text>
      <text x="420" y="320" fontSize="10" fill="#475569">在领域模型之上封装用例，统一入口</text>

      {/* 复杂度 vs 选择 */}
      <text x="400" y="366" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">复杂度与模式选择</text>

      <rect x="40" y="380" width="200" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="140" y="402" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">简单逻辑</text>
      <text x="140" y="422" textAnchor="middle" fontSize="10" fill="#475569">事务脚本</text>

      <path d="M242 408 L278 408" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" />

      <rect x="282" y="380" width="200" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="382" y="402" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">中等复杂</text>
      <text x="382" y="422" textAnchor="middle" fontSize="10" fill="#475569">表模块</text>

      <path d="M484 408 L520 408" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-la-arrow)" />

      <rect x="524" y="380" width="236" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="642" y="402" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">复杂领域</text>
      <text x="642" y="422" textAnchor="middle" fontSize="10" fill="#475569">领域模型 + 服务层</text>

      {/* 分层优势 */}
      <text x="400" y="466" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">分层架构的优势</text>

      <rect x="30" y="480" width="180" height="44" rx="8" fill="url(#poa-la-pres)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="500" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">关注点分离</text>
      <text x="120" y="516" textAnchor="middle" fontSize="9" fill="#475569">各层独立演化</text>

      <rect x="220" y="480" width="180" height="44" rx="8" fill="url(#poa-la-domain)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="310" y="500" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">可替换性</text>
      <text x="310" y="516" textAnchor="middle" fontSize="9" fill="#475569">替换某一层不影响他层</text>

      <rect x="410" y="480" width="180" height="44" rx="8" fill="url(#poa-la-data)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="500" y="500" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">可测试性</text>
      <text x="500" y="516" textAnchor="middle" fontSize="9" fill="#475569">逐层独立测试</text>

      <rect x="600" y="480" width="160" height="44" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="680" y="500" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">标准化</text>
      <text x="680" y="516" textAnchor="middle" fontSize="9" fill="#475569">团队协作清晰</text>

      {/* 底部总结 */}
      <rect x="30" y="538" width="730" height="30" rx="8" fill="url(#poa-la-domain)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="558" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：表现层处理交互 → 领域层承载业务规则 → 数据源层管理持久化</text>
    </svg>
  );
}
