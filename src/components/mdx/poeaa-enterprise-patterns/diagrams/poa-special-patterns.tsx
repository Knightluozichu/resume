"use client";

export function PoaSpecialPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="特殊模式与离线并发架构图">
      <defs>
        <linearGradient id="poa-sp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-sp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-sp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-sp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="poa-sp-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="poa-sp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">特殊模式与离线</text>

      {/* 离线并发锁 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">离线并发控制</text>

      <rect x="30" y="78" width="360" height="120" rx="10" fill="url(#poa-sp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="100" fontSize="13" fontWeight="700" fill="#0369a1">乐观离线锁 Optimistic Offline Lock</text>
      <text x="50" y="120" fontSize="10" fill="#475569">获取数据时记录版本号</text>
      <text x="50" y="136" fontSize="10" fill="#475569">提交时验证版本是否变化</text>
      <text x="50" y="152" fontSize="10" fill="#475569">冲突时提示用户重新操作</text>
      <text x="50" y="168" fontSize="10" fill="#475569">适用于冲突概率低的场景</text>
      <text x="50" y="188" fontSize="10" fontWeight="600" fill="#0369a1">优势：不阻塞，高可用</text>

      <rect x="410" y="78" width="360" height="120" rx="10" fill="url(#poa-sp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="100" fontSize="13" fontWeight="700" fill="#7e22ce">悲观离线锁 Pessimistic Offline Lock</text>
      <text x="430" y="120" fontSize="10" fill="#475569">编辑前获取独占锁</text>
      <text x="430" y="136" fontSize="10" fill="#475569">其他人无法同时编辑</text>
      <text x="430" y="152" fontSize="10" fill="#475569">需要锁超时和释放机制</text>
      <text x="430" y="168" fontSize="10" fill="#475569">适用于冲突概率高的场景</text>
      <text x="430" y="188" fontSize="10" fontWeight="600" fill="#7e22ce">优势：无冲突，强一致</text>

      <rect x="30" y="208" width="740" height="44" rx="8" fill="url(#poa-sp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="50" y="228" fontSize="11" fontWeight="700" fill="#15803d">粗粒度锁 Coarse-Grained Lock</text>
      <text x="50" y="244" fontSize="10" fill="#475569">锁定一组相关对象，用单一锁管理整个聚合，避免部分锁定导致的不一致</text>
      <text x="430" y="228" fontSize="11" fontWeight="700" fill="#15803d">隐式锁 Implicit Lock</text>
      <text x="430" y="244" fontSize="10" fill="#475569">由框架自动管理锁的获取和释放，减少手动锁管理错误</text>

      {/* 注册表模式 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">注册表模式 Registry</text>

      <rect x="30" y="294" width="240" height="100" rx="8" fill="url(#poa-sp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="150" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">注册表 Registry</text>
      <text x="150" y="336" textAnchor="middle" fontSize="9" fill="#475569">全局对象查找入口</text>
      <text x="150" y="352" textAnchor="middle" fontSize="9" fill="#475569">替代到处传递引用</text>
      <text x="150" y="368" textAnchor="middle" fontSize="9" fill="#475569">getPerson(id) / findXxx()</text>
      <text x="150" y="384" textAnchor="middle" fontSize="9" fill="#475569">需注意生命周期管理</text>

      <rect x="280" y="294" width="240" height="100" rx="8" fill="url(#poa-sp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="400" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#a16207">值列表持有者</text>
      <text x="400" y="336" textAnchor="middle" fontSize="9" fill="#475569">Value List Holder</text>
      <text x="400" y="352" textAnchor="middle" fontSize="9" fill="#475569">缓存查询结果集</text>
      <text x="400" y="368" textAnchor="middle" fontSize="9" fill="#475569">减少重复数据库查询</text>
      <text x="400" y="384" textAnchor="middle" fontSize="9" fill="#475569">提供分页/排序支持</text>

      <rect x="530" y="294" width="240" height="100" rx="8" fill="url(#poa-sp-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="650" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">插件 Plugin</text>
      <text x="650" y="336" textAnchor="middle" fontSize="9" fill="#475569">运行时动态加载实现</text>
      <text x="650" y="352" textAnchor="middle" fontSize="9" fill="#475569">配置驱动组件装配</text>
      <text x="650" y="368" textAnchor="middle" fontSize="9" fill="#475569">工厂 + 配置文件实现</text>
      <text x="650" y="384" textAnchor="middle" fontSize="9" fill="#475569">支持运行时扩展</text>

      {/* 其他特殊模式 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">其他特殊模式</text>

      <rect x="30" y="434" width="240" height="56" rx="8" fill="url(#poa-sp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="456" fontSize="11" fontWeight="700" fill="#0369a1">服务桩 Service Stub</text>
      <text x="50" y="476" fontSize="9" fill="#475569">外部服务的测试替身，隔离依赖</text>

      <rect x="280" y="434" width="240" height="56" rx="8" fill="url(#poa-sp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="300" y="456" fontSize="11" fontWeight="700" fill="#15803d">记录集 Record Set</text>
      <text x="300" y="476" fontSize="9" fill="#475569">表数据的内存表示，与 UI 绑定</text>

      <rect x="530" y="434" width="240" height="56" rx="8" fill="url(#poa-sp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="550" y="456" fontSize="11" fontWeight="700" fill="#a16207">单层控制器</text>
      <text x="550" y="476" fontSize="9" fill="#475569">页面控制器简化版，无层次</text>

      {/* 离线工作流程 */}
      <text x="400" y="518" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">离线编辑工作流程</text>

      <rect x="20" y="530" width="150" height="28" rx="6" fill="url(#poa-sp-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1" />
      <text x="95" y="548" textAnchor="middle" fontSize="9" fill="#0369a1">获取数据+版本号</text>

      <path d="M172 544 L194 544" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-sp-arrow)" />

      <rect x="198" y="530" width="150" height="28" rx="6" fill="url(#poa-sp-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1" />
      <text x="273" y="548" textAnchor="middle" fontSize="9" fill="#a16207">离线编辑</text>

      <path d="M350 544 L372 544" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-sp-arrow)" />

      <rect x="376" y="530" width="150" height="28" rx="6" fill="url(#poa-sp-2)" opacity="0.15" stroke="#9333ea" strokeWidth="1" />
      <text x="451" y="548" textAnchor="middle" fontSize="9" fill="#7e22ce">提交验证版本</text>

      <path d="M528 544 L550 544" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-sp-arrow)" />

      <rect x="554" y="530" width="110" height="28" rx="6" fill="url(#poa-sp-3)" opacity="0.15" stroke="#16a34a" strokeWidth="1" />
      <text x="609" y="548" textAnchor="middle" fontSize="9" fill="#15803d">成功/冲突</text>

      <path d="M666 544 L688 544" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-sp-arrow)" />

      <rect x="692" y="530" width="88" height="28" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1" />
      <text x="736" y="548" textAnchor="middle" fontSize="9" fill="#475569">完成</text>

      <rect x="20" y="566" width="760" height="12" rx="6" fill="url(#poa-sp-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1" />
      <text x="400" y="575" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">核心：离线锁管并发 + 注册表管查找 + 插件管扩展 + 服务桩管测试</text>
    </svg>
  );
}
