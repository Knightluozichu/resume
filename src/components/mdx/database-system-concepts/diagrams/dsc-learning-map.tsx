"use client";

export function DscLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数据库系统概念全书学习地图">
      <defs>
        <linearGradient id="dsc-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="dsc-lm-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dsc-lm-sys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dsc-lm-tx" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="dsc-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据库系统概念 · 知识体系</text>

      {/* 基础篇 */}
      <rect x="20" y="55" width="185" height="180" rx="12" fill="url(#dsc-lm-base)" opacity="0.95" />
      <text x="112" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">基础篇</text>
      <line x1="35" y1="90" x2="190" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="112" textAnchor="middle" fontSize="12" fill="#cffafe">学习地图</text>
      <text x="112" y="134" textAnchor="middle" fontSize="12" fill="#cffafe">关系模型</text>
      <text x="112" y="160" textAnchor="middle" fontSize="11" fill="#a5f3fc">关系/元组/属性/域</text>
      <text x="112" y="180" textAnchor="middle" fontSize="11" fill="#a5f3fc">键/完整性约束</text>
      <text x="112" y="212" textAnchor="middle" fontSize="11" fill="#67e8f9">入门 · 建立数据模型认知</text>

      {/* SQL篇 */}
      <rect x="215" y="55" width="185" height="180" rx="12" fill="url(#dsc-lm-mid)" opacity="0.95" />
      <text x="307" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">SQL与设计篇</text>
      <line x1="230" y1="90" x2="385" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="112" textAnchor="middle" fontSize="12" fill="#fef3c7">SQL与关系代数</text>
      <text x="307" y="134" textAnchor="middle" fontSize="12" fill="#fef3c7">数据库设计与ER模型</text>
      <text x="307" y="160" textAnchor="middle" fontSize="11" fill="#fde68a">DDL/DML/关系代数运算</text>
      <text x="307" y="180" textAnchor="middle" fontSize="11" fill="#fde68a">ER模型/范式/规范化</text>
      <text x="307" y="212" textAnchor="middle" fontSize="11" fill="#fcd34d">中级 · 会用SQL会建模</text>

      {/* 系统篇 */}
      <rect x="410" y="55" width="185" height="180" rx="12" fill="url(#dsc-lm-sys)" opacity="0.95" />
      <text x="502" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">系统实现篇</text>
      <line x1="425" y1="90" x2="580" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="112" textAnchor="middle" fontSize="12" fill="#ede9fe">存储与索引</text>
      <text x="502" y="134" textAnchor="middle" fontSize="12" fill="#ede9fe">查询处理与优化</text>
      <text x="502" y="160" textAnchor="middle" fontSize="11" fill="#ddd6fe">文件/页/B+树/哈希</text>
      <text x="502" y="180" textAnchor="middle" fontSize="11" fill="#ddd6fe">解析/优化/执行计划</text>
      <text x="502" y="212" textAnchor="middle" fontSize="11" fill="#c4b5fd">中高 · 理解引擎内部</text>

      {/* 事务篇 */}
      <rect x="605" y="55" width="175" height="180" rx="12" fill="url(#dsc-lm-tx)" opacity="0.95" />
      <text x="692" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">事务与恢复篇</text>
      <line x1="620" y1="90" x2="765" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="112" textAnchor="middle" fontSize="12" fill="#d1fae5">事务管理</text>
      <text x="692" y="134" textAnchor="middle" fontSize="12" fill="#d1fae5">并发控制/恢复系统</text>
      <text x="692" y="160" textAnchor="middle" fontSize="11" fill="#a7f3d0">ACID/2PL/MVCC</text>
      <text x="692" y="180" textAnchor="middle" fontSize="11" fill="#a7f3d0">日志/检查点/ARIES</text>
      <text x="692" y="212" textAnchor="middle" fontSize="11" fill="#6ee7b7">高级 · 保证正确与可靠</text>

      {/* Arrows */}
      <path d="M205 145 L215 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-lm-arrow)" />
      <path d="M400 145 L410 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-lm-arrow)" />
      <path d="M595 145 L605 145" stroke="#64748b" strokeWidth="2" markerEnd="url(#dsc-lm-arrow)" />

      {/* 两条主线 */}
      <text x="400" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">两条核心主线</text>

      <rect x="40" y="285" width="340" height="90" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线一：数据建模与查询能力</text>
      <text x="210" y="328" textAnchor="middle" fontSize="11" fill="#78350f">关系模型 → SQL → 关系代数 → ER设计</text>
      <text x="210" y="348" textAnchor="middle" fontSize="11" fill="#78350f">→ 规范化 → 查询处理 → 优化</text>
      <text x="210" y="367" textAnchor="middle" fontSize="11" fill="#92400e">解决「数据怎么组织、怎么查」</text>

      <rect x="420" y="285" width="340" height="90" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="590" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">主线二：系统可靠性与实现能力</text>
      <text x="590" y="328" textAnchor="middle" fontSize="11" fill="#1e3a8a">存储索引 → 事务 → 并发控制</text>
      <text x="590" y="348" textAnchor="middle" fontSize="11" fill="#1e3a8a">→ 恢复系统 → 一致性保证</text>
      <text x="590" y="367" textAnchor="middle" fontSize="11" fill="#1e40af">解决「数据怎么存、怎么不出错」</text>

      {/* 学习路径 */}
      <rect x="40" y="395" width="720" height="145" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从会建模 → 会查询 → 会实现 → 会保障）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 关系模型 &amp; 完整性约束 → ② SQL &amp; 关系代数 &amp; ER设计 &amp; 范式</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 存储索引 &amp; 查询处理优化 → ④ 事务 &amp; 并发 &amp; 恢复</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">两条主线在「查询处理+事务」与「存储+并发恢复」处交汇</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fill="#64748b">数据库 = 数据模型 + 查询语言 + 系统实现 + 可靠性保障</text>
    </svg>
  );
}
