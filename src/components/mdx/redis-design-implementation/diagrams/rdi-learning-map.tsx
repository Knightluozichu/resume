"use client";

export function RdiLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis设计与实现全书学习地图">
      <defs>
        <linearGradient id="rdi-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="rdi-lm-obj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rdi-lm-db" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rdi-lm-dist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rdi-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis设计与实现 · 知识体系全景</text>

      {/* 第一部分：数据结构底座 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#rdi-lm-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">数据结构底座</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#fecaca">SDS / 链表 / 字典</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#fecaca">跳跃表 / intset / ziplist</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#fca5a5">底层数据组织方式</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#fca5a5">内存效率 &amp; 操作复杂度</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#fda4a4">入门 · 地基</text>

      {/* 第二部分：对象系统 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#rdi-lm-obj)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">对象系统与编码</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">string/list/hash/set/zset</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">多编码 &amp; 编码转换</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">对象共享/引用计数/LRU</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">类型检查 &amp; 命令多态</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">基础 · 桥梁</text>

      {/* 第三部分：数据库实现 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#rdi-lm-db)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">数据库实现</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">键空间 / 过期删除</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">RDB / AOF 持久化</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">事件驱动 / 事务 / Lua</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">发布订阅 / 通知</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">中高 · 核心机制</text>

      {/* 第四部分：分布式与高可用 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#rdi-lm-dist)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">分布式与高可用</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">主从复制 / PSYNC</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">Sentinel 哨兵</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">Cluster 集群 / 槽位</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">故障转移 / 一致性</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 生产级</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rdi-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rdi-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#rdi-lm-arrow)" />

      {/* 四条主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四条核心主线</text>

      <rect x="20" y="280" width="185" height="100" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="112" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">主线一：数据结构</text>
      <text x="112" y="323" textAnchor="middle" fontSize="10" fill="#991b1b">SDS → 链表 → 字典 → 跳跃表</text>
      <text x="112" y="343" textAnchor="middle" fontSize="10" fill="#991b1b">→ intset → ziplist</text>
      <text x="112" y="367" textAnchor="middle" fontSize="10" fill="#b91c1c">回答「数据怎么存」</text>

      <rect x="215" y="280" width="185" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：对象系统</text>
      <text x="307" y="323" textAnchor="middle" fontSize="10" fill="#155e75">5种类型 → 多编码</text>
      <text x="307" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ 编码转换 → 命令多态</text>
      <text x="307" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「用户怎么用」</text>

      <rect x="410" y="280" width="185" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="502" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：数据库机制</text>
      <text x="502" y="323" textAnchor="middle" fontSize="10" fill="#78350f">键空间 → 持久化 → 事件</text>
      <text x="502" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ 事务 → 发布订阅</text>
      <text x="502" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「单机怎么跑」</text>

      <rect x="605" y="280" width="175" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="692" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">主线四：分布式高可用</text>
      <text x="692" y="323" textAnchor="middle" fontSize="10" fill="#5b21b6">复制 → 哨兵 → 集群</text>
      <text x="692" y="343" textAnchor="middle" fontSize="10" fill="#5b21b6">→ 故障转移 → 分区</text>
      <text x="692" y="367" textAnchor="middle" fontSize="10" fill="#6d28d9">回答「多机怎么协作」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从数据结构 → 对象系统 → 数据库实现 → 分布式高可用 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 底层数据结构（SDS/链表/字典/跳跃表/intset/ziplist）→ ② 对象系统（5种类型 &amp; 编码转换）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 数据库实现（键空间/过期/持久化/事件驱动）→ ④ 事务 &amp; 发布订阅（单机进阶机制）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 复制 &amp; 哨兵 &amp; 集群（分布式高可用）→ ⑥ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">四条主线在「对象编码」（数据结构决定编码）与「持久化+复制」（单机机制延伸到多机）处交汇</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">Redis = 高效数据结构 + 灵活对象系统 + 事件驱动单机 + 分布式高可用</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：用最合适的底层数据结构，在内存中实现最高效的KV存储</text>
    </svg>
  );
}
