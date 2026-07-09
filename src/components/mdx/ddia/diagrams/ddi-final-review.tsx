"use client";

export function DdiFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="DDIA全书复习知识图谱">
      <defs>
        <linearGradient id="ddi-fr-found" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ddi-fr-dist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ddi-fr-deriv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ddi-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">DDIA 全书知识图谱</text>

      {/* 中心节点 */}
      <circle cx="400" cy="290" r="55" fill="#0f172a" />
      <text x="400" y="285" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">数据密集型</text>
      <text x="400" y="303" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">应用系统</text>

      {/* 第一部分 */}
      <rect x="30" y="60" width="200" height="155" rx="12" fill="url(#ddi-fr-found)" opacity="0.95" />
      <text x="130" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">基础设计</text>
      <line x1="45" y1="95" x2="215" y2="95" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="130" y="115" textAnchor="middle" fontSize="11" fill="#cffafe">可靠性/可扩展性</text>
      <text x="130" y="133" textAnchor="middle" fontSize="11" fill="#cffafe">可维护性</text>
      <text x="130" y="151" textAnchor="middle" fontSize="11" fill="#a5f3fc">数据模型/存储检索</text>
      <text x="130" y="169" textAnchor="middle" fontSize="11" fill="#a5f3fc">编码与演化</text>
      <text x="130" y="195" textAnchor="middle" fontSize="10" fill="#67e8f9">LSM vs B-Tree / MVCC</text>
      <path d="M230 180 Q300 220 345 265" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#ddi-fr-arrow)" />

      {/* 第二部分 上 */}
      <rect x="270" y="55" width="260" height="80" rx="12" fill="url(#ddi-fr-dist)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">复制 + 分区</text>
      <text x="400" y="100" textAnchor="middle" fontSize="11" fill="#fef3c7">主从/多主/无主 · Quorum</text>
      <text x="400" y="120" textAnchor="middle" fontSize="11" fill="#fde68a">范围分区/哈希分区 · 再平衡</text>
      <path d="M400 135 L400 230" stroke="#64748b" strokeWidth="2" markerEnd="url(#ddi-fr-arrow)" />

      {/* 第二部分 下 */}
      <rect x="270" y="440" width="260" height="80" rx="12" fill="url(#ddi-fr-dist)" opacity="0.85" />
      <text x="400" y="465" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">事务 + 一致性与共识</text>
      <text x="400" y="485" textAnchor="middle" fontSize="11" fill="#fef3c7">ACID/隔离级别/SSI</text>
      <text x="400" y="505" textAnchor="middle" fontSize="11" fill="#fde68a">线性一致性/CAP/Raft/2PC</text>
      <path d="M400 440 L400 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#ddi-fr-arrow)" />

      {/* 第三部分 */}
      <rect x="570" y="60" width="200" height="155" rx="12" fill="url(#ddi-fr-deriv)" opacity="0.95" />
      <text x="670" y="85" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">衍生数据</text>
      <line x1="585" y1="95" x2="755" y2="95" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="670" y="115" textAnchor="middle" fontSize="11" fill="#ede9fe">系统记录/衍生数据</text>
      <text x="670" y="133" textAnchor="middle" fontSize="11" fill="#ede9fe">批处理/流处理</text>
      <text x="670" y="151" textAnchor="middle" fontSize="11" fill="#ddd6fe">CDC/事件溯源</text>
      <text x="670" y="169" textAnchor="middle" fontSize="11" fill="#ddd6fe">Lambda/Kappa</text>
      <text x="670" y="195" textAnchor="middle" fontSize="10" fill="#c4b5fd">MapReduce/Flink/Kafka</text>
      <path d="M570 180 Q500 220 455 265" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#ddi-fr-arrow)" />

      {/* 未来方向 */}
      <rect x="270" y="535" width="260" height="35" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="557" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">未来方向：数据集成 / 拆解DB / 端到端正确性 / 伦理</text>

      {/* 三条主线标签 */}
      <text x="130" y="245" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">主线一：系统设计</text>
      <text x="130" y="262" textAnchor="middle" fontSize="10" fill="#155e75">数据怎么建模存取</text>

      <text x="400" y="375" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">主线二：分布式一致性</text>
      <text x="400" y="392" textAnchor="middle" fontSize="10" fill="#78350f">分布式怎么不出错</text>

      <text x="670" y="245" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">主线三：衍生管道</text>
      <text x="670" y="262" textAnchor="middle" fontSize="10" fill="#5b21b6">大规模数据怎么算</text>

      {/* 底部总结 */}
      <rect x="30" y="335" width="180" height="80" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1" opacity="0.6" />
      <text x="120" y="358" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">核心认知</text>
      <text x="120" y="375" textAnchor="middle" fontSize="10" fill="#155e75">分布式 = 不确定性</text>
      <text x="120" y="390" textAnchor="middle" fontSize="10" fill="#155e75">共识 = 消除不确定性</text>
      <text x="120" y="405" textAnchor="middle" fontSize="10" fill="#155e75">衍生 = 可重建可演化</text>

      <rect x="590" y="335" width="180" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
      <text x="680" y="358" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6d28d9">实践智慧</text>
      <text x="680" y="375" textAnchor="middle" fontSize="10" fill="#5b21b6">没有银弹，只有取舍</text>
      <text x="680" y="390" textAnchor="middle" fontSize="10" fill="#5b21b6">先正确再性能</text>
      <text x="680" y="405" textAnchor="middle" fontSize="10" fill="#5b21b6">端到端思维</text>
    </svg>
  );
}
