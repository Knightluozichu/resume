"use client";

export function PoaConcurrencySessionDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="并发与会话状态管理模式图">
      <defs>
        <linearGradient id="poa-cs-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-cs-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-cs-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-cs-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="poa-cs-5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="poa-cs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">并发与会话状态</text>

      {/* 并发策略 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">并发控制策略</text>

      <rect x="30" y="78" width="360" height="110" rx="10" fill="url(#poa-cs-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="100" fontSize="13" fontWeight="700" fill="#0369a1">乐观并发 Optimistic Lock</text>
      <text x="50" y="120" fontSize="10" fill="#475569">假设冲突很少发生</text>
      <text x="50" y="136" fontSize="10" fill="#475569">提交时检查版本号是否变化</text>
      <text x="50" y="152" fontSize="10" fill="#475569">冲突时回滚重试</text>
      <text x="50" y="168" fontSize="10" fill="#475569">优点：无锁等待，高吞吐</text>
      <rect x="50" y="176" width="120" height="8" rx="4" fill="#0ea5e9" opacity="0.3" />

      <rect x="410" y="78" width="360" height="110" rx="10" fill="url(#poa-cs-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="100" fontSize="13" fontWeight="700" fill="#7e22ce">悲观并发 Pessimistic Lock</text>
      <text x="430" y="120" fontSize="10" fill="#475569">假设冲突经常发生</text>
      <text x="430" y="136" fontSize="10" fill="#475569">读取时即加锁，阻塞其他事务</text>
      <text x="430" y="152" fontSize="10" fill="#475569">提交后释放锁</text>
      <text x="430" y="168" fontSize="10" fill="#475569">优点：无冲突，强一致</text>
      <rect x="430" y="176" width="120" height="8" rx="4" fill="#9333ea" opacity="0.3" />

      <rect x="30" y="198" width="740" height="50" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="50" y="218" fontSize="11" fontWeight="700" fill="#334155">粗粒度锁 Coarse-Grained Lock</text>
      <text x="50" y="236" fontSize="10" fill="#475569">用一个锁锁定一组相关对象，避免死锁，简化锁管理</text>
      <text x="430" y="218" fontSize="11" fontWeight="700" fill="#334155">隐式锁 Implicit Lock</text>
      <text x="430" y="236" fontSize="10" fill="#475569">通过框架/数据库自动管理锁，开发者无需显式处理</text>

      {/* 会话状态 */}
      <text x="400" y="276" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">会话状态存储</text>

      <rect x="30" y="290" width="150" height="100" rx="8" fill="url(#poa-cs-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="105" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">客户端会话</text>
      <text x="105" y="330" textAnchor="middle" fontSize="9" fill="#475569">Client Session State</text>
      <text x="105" y="348" textAnchor="middle" fontSize="9" fill="#475569">Cookie / URL 参数</text>
      <text x="105" y="364" textAnchor="middle" fontSize="9" fill="#475569">优点：无服务端存储</text>
      <text x="105" y="380" textAnchor="middle" fontSize="9" fill="#475569">缺点：数据量受限</text>

      <rect x="190" y="290" width="150" height="100" rx="8" fill="url(#poa-cs-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="265" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">服务端会话</text>
      <text x="265" y="330" textAnchor="middle" fontSize="9" fill="#475569">Server Session State</text>
      <text x="265" y="348" textAnchor="middle" fontSize="9" fill="#475569">内存 / Redis</text>
      <text x="265" y="364" textAnchor="middle" fontSize="9" fill="#475569">优点：数据量灵活</text>
      <text x="265" y="380" textAnchor="middle" fontSize="9" fill="#475569">缺点：需会话亲和</text>

      <rect x="350" y="290" width="150" height="100" rx="8" fill="url(#poa-cs-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="425" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">数据库会话</text>
      <text x="425" y="330" textAnchor="middle" fontSize="9" fill="#475569">Database Session State</text>
      <text x="425" y="348" textAnchor="middle" fontSize="9" fill="#475569">序列化存入 DB</text>
      <text x="425" y="364" textAnchor="middle" fontSize="9" fill="#475569">优点：可持久化</text>
      <text x="425" y="380" textAnchor="middle" fontSize="9" fill="#475569">缺点：序列化开销</text>

      <rect x="510" y="290" width="260" height="100" rx="8" fill="url(#poa-cs-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="640" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">选择建议</text>
      <text x="640" y="332" textAnchor="middle" fontSize="9" fill="#475569">小数据 / 安全性低 → 客户端</text>
      <text x="640" y="348" textAnchor="middle" fontSize="9" fill="#475569">中等数据 / 高频访问 → 服务端</text>
      <text x="640" y="364" textAnchor="middle" fontSize="9" fill="#475569">需持久化 / 跨重启 → 数据库</text>
      <text x="640" y="380" textAnchor="middle" fontSize="9" fill="#475569">混合策略可组合使用</text>

      {/* 工作单元与事务 */}
      <text x="400" y="416" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">事务管理</text>

      <rect x="30" y="430" width="180" height="56" rx="8" fill="url(#poa-cs-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="120" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">工作单元</text>
      <text x="120" y="472" textAnchor="middle" fontSize="9" fill="#475569">维护对象变更列表</text>

      <rect x="220" y="430" width="180" height="56" rx="8" fill="url(#poa-cs-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="310" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">事务脚本</text>
      <text x="310" y="472" textAnchor="middle" fontSize="9" fill="#475569">过程内管理事务边界</text>

      <rect x="410" y="430" width="180" height="56" rx="8" fill="url(#poa-cs-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="500" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">标识映射</text>
      <text x="500" y="472" textAnchor="middle" fontSize="9" fill="#475569">保证一个事务一对象</text>

      <rect x="600" y="430" width="170" height="56" rx="8" fill="url(#poa-cs-5)" opacity="0.1" stroke="#dc2626" strokeWidth="1.5" />
      <text x="685" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">隔离级别</text>
      <text x="685" y="472" textAnchor="middle" fontSize="9" fill="#475569">读已提交 / 可重复读</text>

      {/* 底部总结 */}
      <rect x="30" y="506" width="740" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="526" textAnchor="middle" fontSize="10" fill="#475569">并发控制：乐观（无锁） vs 悲观（加锁）| 会话状态：客户端 vs 服务端 vs 数据库</text>

      <rect x="30" y="546" width="740" height="28" rx="8" fill="url(#poa-cs-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="564" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心：乐观并发高吞吐 + 会话状态分层存储 + 工作单元管事务</text>
    </svg>
  );
}
