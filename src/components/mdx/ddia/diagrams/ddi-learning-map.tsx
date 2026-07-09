"use client";

export function DdiLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="数据密集型应用系统设计全书学习地图">
      <defs>
        <linearGradient id="ddi-lm-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ddi-lm-dist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ddi-lm-deriv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ddi-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DDIA · 知识体系全景</text>

      {/* 第一部分：数据系统基础 */}
      <rect x="20" y="55" width="245" height="195" rx="12" fill="url(#ddi-lm-found)" opacity="0.95" />
      <text x="142" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">第一部分：数据系统基础</text>
      <line x1="35" y1="90" x2="250" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="142" y="112" textAnchor="middle" fontSize="12" fill="#cffafe">学习地图</text>
      <text x="142" y="132" textAnchor="middle" fontSize="12" fill="#cffafe">数据系统基础</text>
      <text x="142" y="158" textAnchor="middle" fontSize="11" fill="#a5f3fc">可靠性/可扩展性/可维护性</text>
      <text x="142" y="178" textAnchor="middle" fontSize="11" fill="#a5f3fc">数据模型/存储检索/编码演化</text>
      <text x="142" y="210" textAnchor="middle" fontSize="11" fill="#67e8f9">入门 · 建立数据系统认知</text>

      {/* 第二部分：分布式数据 */}
      <rect x="275" y="55" width="250" height="195" rx="12" fill="url(#ddi-lm-dist)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">第二部分：分布式数据</text>
      <line x1="290" y1="90" x2="510" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="112" textAnchor="middle" fontSize="12" fill="#fef3c7">复制 / 分区</text>
      <text x="400" y="132" textAnchor="middle" fontSize="12" fill="#fef3c7">事务 / 一致性与共识</text>
      <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#fde68a">主从/多主/无主复制</text>
      <text x="400" y="178" textAnchor="middle" fontSize="11" fill="#fde68a">隔离级别/线性一致性/共识</text>
      <text x="400" y="210" textAnchor="middle" fontSize="11" fill="#fcd34d">中高 · 分布式核心难点</text>

      {/* 第三部分：衍生数据 */}
      <rect x="535" y="55" width="245" height="195" rx="12" fill="url(#ddi-lm-deriv)" opacity="0.95" />
      <text x="657" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">第三部分：衍生数据</text>
      <line x1="550" y1="90" x2="765" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="657" y="112" textAnchor="middle" fontSize="12" fill="#ede9fe">衍生数据</text>
      <text x="657" y="132" textAnchor="middle" fontSize="12" fill="#ede9fe">批处理与流处理 / 未来</text>
      <text x="657" y="158" textAnchor="middle" fontSize="11" fill="#ddd6fe">MapReduce/批流融合</text>
      <text x="657" y="178" textAnchor="middle" fontSize="11" fill="#ddd6fe">数据集成/未来方向</text>
      <text x="657" y="210" textAnchor="middle" fontSize="11" fill="#c4b5fd">高级 · 走向数据平台</text>

      {/* Arrows */}
      <path d="M265 152 L275 152" stroke="#64748b" strokeWidth="2" markerEnd="url(#ddi-lm-arrow)" />
      <path d="M525 152 L535 152" stroke="#64748b" strokeWidth="2" markerEnd="url(#ddi-lm-arrow)" />

      {/* 三条主线 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">三条核心主线</text>

      <rect x="30" y="295" width="240" height="95" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">主线一：数据系统设计</text>
      <text x="150" y="338" textAnchor="middle" fontSize="11" fill="#155e75">可靠性 → 可扩展性 → 可维护性</text>
      <text x="150" y="358" textAnchor="middle" fontSize="11" fill="#155e75">→ 数据模型 / 存储 / 编码</text>
      <text x="150" y="378" textAnchor="middle" fontSize="11" fill="#0e7490">回答「数据系统怎么设计」</text>

      <rect x="280" y="295" width="240" height="95" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线二：分布式一致性</text>
      <text x="400" y="338" textAnchor="middle" fontSize="11" fill="#78350f">复制 → 分区 → 事务 → 共识</text>
      <text x="400" y="358" textAnchor="middle" fontSize="11" fill="#78350f">→ CAP / 线性一致性 / Raft</text>
      <text x="400" y="378" textAnchor="middle" fontSize="11" fill="#92400e">回答「分布式怎么不出错」</text>

      <rect x="530" y="295" width="240" height="95" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="318" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">主线三：衍生数据管道</text>
      <text x="650" y="338" textAnchor="middle" fontSize="11" fill="#5b21b6">批处理 → 流处理 → 数据集成</text>
      <text x="650" y="358" textAnchor="middle" fontSize="11" fill="#5b21b6">→ Lambda / Kappa 架构</text>
      <text x="650" y="378" textAnchor="middle" fontSize="11" fill="#6d28d9">回答「大规模数据怎么算」</text>

      {/* 学习路径 */}
      <rect x="30" y="405" width="740" height="155" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="428" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从基础认知 → 分布式核心 → 衍生数据 → 全书整合）</text>
      <text x="400" y="451" textAnchor="middle" fontSize="11" fill="#475569">① 数据系统基础（可靠性/数据模型/存储/编码）→ ② 复制 &amp; 分区</text>
      <text x="400" y="471" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 事务 &amp; 一致性与共识（分布式最难部分）→ ④ 衍生数据 &amp; 批流处理</text>
      <text x="400" y="491" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 未来方向 &amp; 全书复习整合</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#64748b">三条主线在「存储+复制」与「事务+共识」与「批流+集成」处交汇</text>
      <text x="400" y="540" textAnchor="middle" fontSize="11" fill="#64748b">DDIA = 基础设计 + 分布式一致性 + 衍生数据管道</text>
    </svg>
  );
}
