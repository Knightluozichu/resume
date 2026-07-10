"use client";

export function PoaDataSourceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="数据源架构模式对比图">
      <defs>
        <linearGradient id="poa-ds-tdg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-ds-rdg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-ds-ar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-ds-dm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="poa-ds-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据源架构模式</text>

      {/* 四种模式 */}
      <rect x="30" y="56" width="360" height="130" rx="10" fill="url(#poa-ds-tdg)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="80" fontSize="13" fontWeight="700" fill="#0369a1">表数据入口 Table Data Gateway</text>
      <text x="50" y="100" fontSize="10" fill="#475569">一个对象充当数据库表的网关</text>
      <text x="50" y="116" fontSize="10" fill="#475569">包含 findAll / findById / insert / update / delete</text>
      <text x="50" y="132" fontSize="10" fill="#475569">领域逻辑与数据库访问完全分离</text>
      <text x="50" y="148" fontSize="10" fill="#475569">返回 Record Set 供上层使用</text>
      <rect x="50" y="160" width="100" height="18" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="100" y="173" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">简单 / 事务脚本</text>

      <rect x="410" y="56" width="360" height="130" rx="10" fill="url(#poa-ds-rdg)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="80" fontSize="13" fontWeight="700" fill="#7e22ce">行数据入口 Row Data Gateway</text>
      <text x="430" y="100" fontSize="10" fill="#475569">每行记录对应一个对象实例</text>
      <text x="430" y="116" fontSize="10" fill="#475569">对象只含数据 + 持久化方法</text>
      <text x="430" y="132" fontSize="10" fill="#475569">无业务逻辑，纯粹数据代理</text>
      <text x="430" y="148" fontSize="10" fill="#475569">update / delete 操作自身行</text>
      <rect x="430" y="160" width="100" height="18" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="480" y="173" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">中等复杂度</text>

      <rect x="30" y="200" width="360" height="130" rx="10" fill="url(#poa-ds-ar)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="50" y="224" fontSize="13" fontWeight="700" fill="#15803d">活动记录 Active Record</text>
      <text x="50" y="244" fontSize="10" fill="#475569">行数据入口 + 领域逻辑</text>
      <text x="50" y="260" fontSize="10" fill="#475569">对象同时承载数据、行为和持久化</text>
      <text x="50" y="276" fontSize="10" fill="#475569">最常见的数据源模式</text>
      <text x="50" y="292" fontSize="10" fill="#475569">Rails ActiveRecord 即此模式</text>
      <rect x="50" y="304" width="100" height="18" rx="4" fill="#16a34a" opacity="0.2" />
      <text x="100" y="317" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">中等 / 单表逻辑</text>

      <rect x="410" y="200" width="360" height="130" rx="10" fill="url(#poa-ds-dm)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="224" fontSize="13" fontWeight="700" fill="#a16207">数据映射器 Data Mapper</text>
      <text x="430" y="244" fontSize="10" fill="#475569">独立映射器负责持久化</text>
      <text x="430" y="260" fontSize="10" fill="#475569">领域对象完全不知道数据库存在</text>
      <text x="430" y="276" fontSize="10" fill="#475569">最高解耦，最复杂</text>
      <text x="430" y="292" fontSize="10" fill="#475569">Hibernate / TypeORM 核心思想</text>
      <rect x="430" y="304" width="100" height="18" rx="4" fill="#ca8a04" opacity="0.2" />
      <text x="480" y="317" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">复杂 / 领域模型</text>

      {/* 解耦程度递进 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">解耦程度递进</text>

      <rect x="40" y="376" width="160" height="50" rx="8" fill="url(#poa-ds-tdg)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">表数据入口</text>
      <text x="120" y="416" textAnchor="middle" fontSize="9" fill="#475569">表级网关</text>

      <path d="M202 401 L238 401" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-ds-arrow)" />

      <rect x="242" y="376" width="160" height="50" rx="8" fill="url(#poa-ds-rdg)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="322" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">行数据入口</text>
      <text x="322" y="416" textAnchor="middle" fontSize="9" fill="#475569">行级代理</text>

      <path d="M404 401 L440 401" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-ds-arrow)" />

      <rect x="444" y="376" width="160" height="50" rx="8" fill="url(#poa-ds-ar)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="524" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">活动记录</text>
      <text x="524" y="416" textAnchor="middle" fontSize="9" fill="#475569">+ 领域逻辑</text>

      <path d="M606 401 L642 401" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-ds-arrow)" />

      <rect x="646" y="376" width="120" height="50" rx="8" fill="url(#poa-ds-dm)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="706" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">数据映射器</text>
      <text x="706" y="416" textAnchor="middle" fontSize="9" fill="#475569">完全解耦</text>

      <text x="400" y="448" textAnchor="middle" fontSize="10" fill="#64748b">领域对象与数据库的耦合度逐渐降低 →</text>

      {/* 与领域逻辑配合 */}
      <text x="400" y="478" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">与领域逻辑模式配合</text>

      <rect x="30" y="492" width="240" height="44" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="510" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">事务脚本</text>
      <text x="150" y="528" textAnchor="middle" fontSize="9" fill="#475569">+ 表数据入口</text>

      <rect x="290" y="492" width="240" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="410" y="510" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">表模块</text>
      <text x="410" y="528" textAnchor="middle" fontSize="9" fill="#475569">+ 表数据入口</text>

      <rect x="550" y="492" width="220" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="660" y="510" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">领域模型</text>
      <text x="660" y="528" textAnchor="middle" fontSize="9" fill="#475569">+ 数据映射器</text>

      {/* 底部总结 */}
      <rect x="30" y="548" width="740" height="24" rx="8" fill="url(#poa-ds-dm)" opacity="0.08" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="564" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">核心：从表入口到数据映射器，领域逻辑与数据库逐步解耦</text>
    </svg>
  );
}
