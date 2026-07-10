"use client";

export function CrvDatabaseCacheDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="数据库与缓存ACID与缓存策略图">
      <defs>
        <linearGradient id="crv-dc-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="crv-dc-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="crv-dc-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="crv-dc-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="crv-dc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据库与缓存：数据存取</text>

      {/* ACID 四大特性 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">事务 ACID 特性</text>

      <rect x="30" y="74" width="180" height="100" rx="10" fill="url(#crv-dc-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">原子性</text>
      <text x="120" y="120" textAnchor="middle" fontSize="10" fill="#475569">Atomicity</text>
      <text x="120" y="140" textAnchor="middle" fontSize="10" fill="#475569">要么全做</text>
      <text x="120" y="156" textAnchor="middle" fontSize="10" fill="#475569">要么全不做</text>
      <text x="120" y="172" textAnchor="middle" fontSize="10" fill="#475569">回滚机制</text>

      <rect x="230" y="74" width="180" height="100" rx="10" fill="url(#crv-dc-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="320" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">一致性</text>
      <text x="320" y="120" textAnchor="middle" fontSize="10" fill="#475569">Consistency</text>
      <text x="320" y="140" textAnchor="middle" fontSize="10" fill="#475569">数据约束</text>
      <text x="320" y="156" textAnchor="middle" fontSize="10" fill="#475569">前后一致</text>
      <text x="320" y="172" textAnchor="middle" fontSize="10" fill="#475569">完整性保持</text>

      <rect x="430" y="74" width="180" height="100" rx="10" fill="url(#crv-dc-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="520" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">隔离性</text>
      <text x="520" y="120" textAnchor="middle" fontSize="10" fill="#475569">Isolation</text>
      <text x="520" y="140" textAnchor="middle" fontSize="10" fill="#475569">并发事务</text>
      <text x="520" y="156" textAnchor="middle" fontSize="10" fill="#475569">互不干扰</text>
      <text x="520" y="172" textAnchor="middle" fontSize="10" fill="#475569">锁机制</text>

      <rect x="630" y="74" width="140" height="100" rx="10" fill="url(#crv-dc-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="700" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a16207">持久性</text>
      <text x="700" y="120" textAnchor="middle" fontSize="10" fill="#475569">Durability</text>
      <text x="700" y="140" textAnchor="middle" fontSize="10" fill="#475569">提交后永久</text>
      <text x="700" y="156" textAnchor="middle" fontSize="10" fill="#475569">故障不丢</text>
      <text x="700" y="172" textAnchor="middle" fontSize="10" fill="#475569">日志保障</text>

      {/* 缓存读写策略 */}
      <text x="400" y="204" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">缓存读写策略</text>

      <rect x="30" y="216" width="230" height="120" rx="10" fill="url(#crv-dc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="145" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">Cache Aside</text>
      <text x="145" y="258" textAnchor="middle" fontSize="9" fill="#475569">读：先查缓存</text>
      <text x="145" y="272" textAnchor="middle" fontSize="9" fill="#475569">未命中再查DB</text>
      <text x="145" y="288" textAnchor="middle" fontSize="9" fill="#475569">写：更新DB</text>
      <text x="145" y="302" textAnchor="middle" fontSize="9" fill="#475569">再删缓存</text>
      <text x="145" y="322" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">最常用策略</text>

      <rect x="285" y="216" width="230" height="120" rx="10" fill="url(#crv-dc-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">Read/Write Through</text>
      <text x="400" y="258" textAnchor="middle" fontSize="9" fill="#475569">读：缓存同步读DB</text>
      <text x="400" y="272" textAnchor="middle" fontSize="9" fill="#475569">写：缓存同步写DB</text>
      <text x="400" y="288" textAnchor="middle" fontSize="9" fill="#475569">应用只感知缓存</text>
      <text x="400" y="302" textAnchor="middle" fontSize="9" fill="#475569">一致性较好</text>
      <text x="400" y="322" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">缓存层代理</text>

      <rect x="540" y="216" width="230" height="120" rx="10" fill="url(#crv-dc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="655" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">Write Behind</text>
      <text x="655" y="258" textAnchor="middle" fontSize="9" fill="#475569">写：只写缓存</text>
      <text x="655" y="272" textAnchor="middle" fontSize="9" fill="#475569">异步刷入DB</text>
      <text x="655" y="288" textAnchor="middle" fontSize="9" fill="#475569">写入性能极高</text>
      <text x="655" y="302" textAnchor="middle" fontSize="9" fill="#475569">可能丢数据</text>
      <text x="655" y="322" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">异步回写</text>

      {/* 数据流向 */}
      <text x="400" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据访问链路</text>

      <rect x="30" y="372" width="140" height="56" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">应用</text>
      <text x="100" y="414" textAnchor="middle" fontSize="9" fill="#475569">读写请求</text>

      <path d="M170 400 L214 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc-arrow)" />

      <rect x="218" y="372" width="140" height="56" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="288" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">缓存</text>
      <text x="288" y="414" textAnchor="middle" fontSize="9" fill="#475569">内存级速度</text>

      <path d="M358 400 L402 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc-arrow)" />
      <text x="380" y="392" textAnchor="middle" fontSize="9" fill="#64748b">未命中</text>

      <rect x="406" y="372" width="140" height="56" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="476" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">数据库</text>
      <text x="476" y="414" textAnchor="middle" fontSize="9" fill="#475569">持久化存储</text>

      <path d="M546 400 L590 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#crv-dc-arrow)" />

      <rect x="594" y="372" width="176" height="56" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="682" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a16207">磁盘</text>
      <text x="682" y="414" textAnchor="middle" fontSize="9" fill="#475569">物理持久化</text>

      {/* 缓存问题 */}
      <text x="400" y="452" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">缓存经典问题</text>

      <rect x="30" y="464" width="240" height="80" rx="8" fill="url(#crv-dc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="150" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">缓存穿透</text>
      <text x="150" y="506" textAnchor="middle" fontSize="9" fill="#475569">查询不存在的数据</text>
      <text x="150" y="520" textAnchor="middle" fontSize="9" fill="#475569">绕过缓存直击DB</text>
      <text x="150" y="534" textAnchor="middle" fontSize="9" fill="#475569">对策：布隆过滤器/空值缓存</text>

      <rect x="290" y="464" width="240" height="80" rx="8" fill="url(#crv-dc-2)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="410" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">缓存雪崩</text>
      <text x="410" y="506" textAnchor="middle" fontSize="9" fill="#475569">大量缓存同时失效</text>
      <text x="410" y="520" textAnchor="middle" fontSize="9" fill="#475569">DB 瞬间压力暴增</text>
      <text x="410" y="534" textAnchor="middle" fontSize="9" fill="#475569">对策：随机过期/限流降级</text>

      <rect x="550" y="464" width="220" height="80" rx="8" fill="url(#crv-dc-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="660" y="488" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">缓存击穿</text>
      <text x="660" y="506" textAnchor="middle" fontSize="9" fill="#475569">热点 key 过期</text>
      <text x="660" y="520" textAnchor="middle" fontSize="9" fill="#475569">并发直查 DB</text>
      <text x="660" y="534" textAnchor="middle" fontSize="9" fill="#475569">对策：互斥锁/永不过期</text>

      <rect x="30" y="552" width="740" height="22" rx="6" fill="url(#crv-dc-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="567" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">核心：ACID 保障可靠 / 缓存加速读取 / 合理策略平衡一致性与性能</text>
    </svg>
  );
}
