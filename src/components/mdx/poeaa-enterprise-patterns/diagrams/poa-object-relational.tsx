"use client";

export function PoaObjectRelationalDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="对象关系映射模式图">
      <defs>
        <linearGradient id="poa-or-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-or-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-or-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-or-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="poa-or-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">对象关系映射（ORM）</text>

      {/* 映射基础 */}
      <text x="200" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">映射基础模式</text>

      <rect x="30" y="76" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="96" fontSize="11" fontWeight="700" fill="#0369a1">标识域 Identity Field</text>
      <text x="50" y="114" fontSize="9" fill="#475569">为对象保存数据库主键，维持对象身份</text>

      <rect x="30" y="134" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="154" fontSize="11" fontWeight="700" fill="#0369a1">外键映射 Foreign Key Mapping</text>
      <text x="50" y="172" fontSize="9" fill="#475569">将对象间引用映射为表间外键</text>

      <rect x="30" y="192" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="212" fontSize="11" fontWeight="700" fill="#0369a1">关联表映射 Association Table Mapping</text>
      <text x="50" y="230" fontSize="9" fill="#475569">多对多关系通过中间关联表实现</text>

      <rect x="30" y="250" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="270" fontSize="11" fontWeight="700" fill="#0369a1">依赖映射 Dependent Mapping</text>
      <text x="50" y="288" fontSize="9" fill="#475569">子对象由父对象负责映射，无独立映射器</text>

      <rect x="30" y="308" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="328" fontSize="11" fontWeight="700" fill="#0369a1">嵌入值 Embedded Value</text>
      <text x="50" y="346" fontSize="9" fill="#475569">将小对象映射为所属表的若干列</text>

      <rect x="30" y="366" width="340" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="386" fontSize="11" fontWeight="700" fill="#0369a1">序列化大对象 Serialized LOB</text>
      <text x="50" y="404" fontSize="9" fill="#475569">将对象图序列化为大对象存储</text>

      {/* 右侧：核心 ORM 机制 */}
      <text x="580" y="64" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">核心 ORM 机制</text>

      <rect x="410" y="76" width="360" height="80" rx="8" fill="url(#poa-or-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="98" fontSize="12" fontWeight="700" fill="#7e22ce">元数据映射 Metadata Mapping</text>
      <text x="430" y="118" fontSize="10" fill="#475569">用元数据描述对象与表的对应关系</text>
      <text x="430" y="134" fontSize="10" fill="#475569">映射器基于元数据自动完成 CRUD</text>
      <text x="430" y="148" fontSize="10" fill="#475569">是所有 ORM 框架的核心</text>

      <rect x="410" y="164" width="360" height="80" rx="8" fill="url(#poa-or-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="186" fontSize="12" fontWeight="700" fill="#15803d">查询对象 Query Object</text>
      <text x="430" y="206" fontSize="10" fill="#475569">用对象构建查询条件，避免手写 SQL</text>
      <text x="430" y="222" fontSize="10" fill="#475569">支持链式 API 和类型安全</text>
      <text x="430" y="236" fontSize="10" fill="#475569">可翻译为不同数据库方言</text>

      <rect x="410" y="252" width="360" height="80" rx="8" fill="url(#poa-or-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="274" fontSize="12" fontWeight="700" fill="#a16207">资源库 Repository</text>
      <text x="430" y="294" fontSize="10" fill="#475569">将数据访问抽象为集合操作</text>
      <text x="430" y="310" fontSize="10" fill="#475569">add / remove / findByCriteria</text>
      <text x="430" y="324" fontSize="10" fill="#475569">领域层面对持久化的最高抽象</text>

      {/* 加载与并发控制 */}
      <text x="580" y="354" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">加载与并发</text>

      <rect x="410" y="366" width="170" height="50" rx="8" fill="url(#poa-or-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="495" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">标识映射</text>
      <text x="495" y="404" textAnchor="middle" fontSize="9" fill="#475569">Identity Map</text>

      <rect x="590" y="366" width="180" height="50" rx="8" fill="url(#poa-or-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="680" y="386" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">工作单元</text>
      <text x="680" y="404" textAnchor="middle" fontSize="9" fill="#475569">Unit of Work</text>

      <rect x="410" y="424" width="170" height="50" rx="8" fill="url(#poa-or-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="495" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">延迟加载</text>
      <text x="495" y="462" textAnchor="middle" fontSize="9" fill="#475569">Lazy Load</text>

      <rect x="590" y="424" width="180" height="50" rx="8" fill="url(#poa-or-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="680" y="444" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">乐观并发</text>
      <text x="680" y="462" textAnchor="middle" fontSize="9" fill="#475569">Optimistic Lock</text>

      {/* 延迟加载四种方式 */}
      <text x="200" y="448" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">延迟加载方式</text>

      <rect x="30" y="462" width="340" height="26" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="50" y="478" fontSize="10" fill="#0369a1">虚代理 Lazy Initialization —— 首次访问时加载</text>

      <rect x="30" y="492" width="340" height="26" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="50" y="508" fontSize="10" fill="#0369a1">值占位符 Value Holder —— 包装实际值</text>

      <rect x="30" y="522" width="340" height="26" rx="6" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1" />
      <text x="50" y="538" fontSize="10" fill="#0369a9">重写 Virtual Proxy —— 子类化实现延迟</text>

      {/* 底部总结 */}
      <rect x="410" y="490" width="360" height="28" rx="8" fill="url(#poa-or-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="590" y="508" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">标识映射防重复 / 工作单元管事务 / 延迟加载提性能</text>

      <rect x="30" y="556" width="740" height="20" rx="8" fill="url(#poa-or-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="570" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心：元数据驱动映射 → 标识映射 / 工作单元 / 延迟加载协同工作</text>
    </svg>
  );
}
