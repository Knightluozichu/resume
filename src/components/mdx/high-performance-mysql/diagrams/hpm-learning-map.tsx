"use client";

export function HpmLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="高性能MySQL全书学习地图">
      <defs>
        <linearGradient id="hpm-lm-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hpm-lm-perf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hpm-lm-scale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="hpm-lm-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="hpm-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高性能MySQL · 知识体系</text>

      {/* 架构基础篇 */}
      <rect x="20" y="55" width="185" height="180" rx="12" fill="url(#hpm-lm-arch)" opacity="0.95" />
      <text x="112" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">架构基础篇</text>
      <line x1="35" y1="90" x2="190" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="112" textAnchor="middle" fontSize="12" fill="#cffafe">学习地图</text>
      <text x="112" y="134" textAnchor="middle" fontSize="12" fill="#cffafe">MySQL架构</text>
      <text x="112" y="160" textAnchor="middle" fontSize="11" fill="#a5f3fc">连接/SQL/存储引擎</text>
      <text x="112" y="180" textAnchor="middle" fontSize="11" fill="#a5f3fc">InnoDB/事务/锁</text>
      <text x="112" y="212" textAnchor="middle" fontSize="11" fill="#67e8f9">入门 · 理解引擎分层</text>

      {/* 性能优化篇 */}
      <rect x="215" y="55" width="185" height="180" rx="12" fill="url(#hpm-lm-perf)" opacity="0.95" />
      <text x="307" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">性能优化篇</text>
      <line x1="230" y1="90" x2="385" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="112" textAnchor="middle" fontSize="12" fill="#fef3c7">索引设计</text>
      <text x="307" y="134" textAnchor="middle" fontSize="12" fill="#fef3c7">查询优化</text>
      <text x="307" y="160" textAnchor="middle" fontSize="11" fill="#fde68a">B+树/覆盖/前缀</text>
      <text x="307" y="180" textAnchor="middle" fontSize="11" fill="#fde68a">EXPLAIN/执行计划</text>
      <text x="307" y="212" textAnchor="middle" fontSize="11" fill="#fcd34d">中级 · 让查询跑得快</text>

      {/* 扩展高可用篇 */}
      <rect x="410" y="55" width="185" height="180" rx="12" fill="url(#hpm-lm-scale)" opacity="0.95" />
      <text x="502" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">扩展高可用篇</text>
      <line x1="425" y1="90" x2="580" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="112" textAnchor="middle" fontSize="12" fill="#ede9fe">Schema设计</text>
      <text x="502" y="134" textAnchor="middle" fontSize="12" fill="#ede9fe">复制 / 扩展高可用</text>
      <text x="502" y="160" textAnchor="middle" fontSize="11" fill="#ddd6fe">范式/反范式/汇总表</text>
      <text x="502" y="180" textAnchor="middle" fontSize="11" fill="#ddd6fe">主从/分片/故障切换</text>
      <text x="502" y="212" textAnchor="middle" fontSize="11" fill="#c4b5fd">中高 · 让系统撑得住</text>

      {/* 运维保障篇 */}
      <rect x="605" y="55" width="175" height="180" rx="12" fill="url(#hpm-lm-ops)" opacity="0.95" />
      <text x="692" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">运维保障篇</text>
      <line x1="620" y1="90" x2="765" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="112" textAnchor="middle" fontSize="12" fill="#d1fae5">OS与硬件调优</text>
      <text x="692" y="134" textAnchor="middle" fontSize="12" fill="#d1fae5">监控与诊断</text>
      <text x="692" y="160" textAnchor="middle" fontSize="11" fill="#a7f3d0">CPU/内存/磁盘/网络</text>
      <text x="692" y="180" textAnchor="middle" fontSize="11" fill="#a7f3d0">慢查询/Performance Schema</text>
      <text x="692" y="212" textAnchor="middle" fontSize="11" fill="#6ee7b7">高级 · 让系统稳得住</text>

      {/* Arrows */}
      <path d="M205 145 L215 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-lm-arrow)" />
      <path d="M400 145 L410 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-lm-arrow)" />
      <path d="M595 145 L605 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#hpm-lm-arrow)" />

      {/* 两条主线 */}
      <text x="400" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">两条核心主线</text>

      <rect x="40" y="285" width="340" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线一：性能提升能力</text>
      <text x="210" y="328" textAnchor="middle" fontSize="11" fill="#78350f">架构 → 索引 → 查询 → Schema</text>
      <text x="210" y="348" textAnchor="middle" fontSize="11" fill="#78350f">→ 数据类型 / 范式取舍</text>
      <text x="210" y="367" textAnchor="middle" fontSize="11" fill="#92400e">解决「单机查询怎么跑得快」</text>

      <rect x="420" y="285" width="340" height="90" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="590" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">主线二：可靠扩展能力</text>
      <text x="590" y="328" textAnchor="middle" fontSize="11" fill="#1e3a8a">复制 → 扩展高可用 → OS调优</text>
      <text x="590" y="348" textAnchor="middle" fontSize="11" fill="#1e3a8a">→ 监控诊断</text>
      <text x="590" y="367" textAnchor="middle" fontSize="11" fill="#1e40af">解决「系统怎么撑得住、稳得住」</text>

      {/* 学习路径 */}
      <rect x="40" y="395" width="720" height="145" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从懂架构 → 会优化 → 能扩展 → 稳运维）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① MySQL架构 &amp; 存储引擎 → ② 索引设计 &amp; 查询优化 &amp; Schema设计</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 复制 &amp; 扩展高可用 → ④ OS硬件调优 &amp; 监控诊断</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">两条主线在「Schema+复制」与「OS+监控」处交汇</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#64748b">高性能MySQL = 架构理解 + 性能优化 + 扩展高可用 + 运维保障</text>
    </svg>
  );
}
