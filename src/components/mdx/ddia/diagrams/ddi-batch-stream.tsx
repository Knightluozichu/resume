"use client";

export function DdiBatchStreamDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="批处理与流处理">
      <defs>
        <linearGradient id="ddi-bs-batch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ddi-bs-stream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ddi-bs-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">批处理与流处理 · 衍生数据的两条管道</text>

      {/* 批处理 */}
      <rect x="20" y="50" width="380" height="220" rx="12" fill="url(#ddi-bs-batch)" opacity="0.95" />
      <text x="210" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">批处理（Batch Processing）</text>
      <line x1="40" y1="85" x2="380" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="210" y="108" textAnchor="middle" fontSize="12" fill="#cffafe">MapReduce / Spark / Hive</text>
      <text x="210" y="130" textAnchor="middle" fontSize="11" fill="#a5f3fc">Map：每条记录独立处理</text>
      <text x="210" y="150" textAnchor="middle" fontSize="11" fill="#a5f3fc">Shuffle：按键分组</text>
      <text x="210" y="170" textAnchor="middle" fontSize="11" fill="#a5f3fc">Reduce：聚合输出</text>
      <text x="210" y="195" textAnchor="middle" fontSize="11" fill="#67e8f9">特点：有界数据、全量处理</text>
      <text x="210" y="215" textAnchor="middle" fontSize="11" fill="#67e8f9">高吞吐、高延迟（分钟~小时）</text>
      <text x="210" y="240" textAnchor="middle" fontSize="11" fill="#67e8f9">适用：离线报表、ML训练、ETL</text>

      {/* 流处理 */}
      <rect x="410" y="50" width="370" height="220" rx="12" fill="url(#ddi-bs-stream)" opacity="0.95" />
      <text x="595" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">流处理（Stream Processing）</text>
      <line x1="430" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="108" textAnchor="middle" fontSize="12" fill="#ede9fe">Kafka Streams / Flink</text>
      <text x="595" y="130" textAnchor="middle" fontSize="11" fill="#ddd6fe">事件流：无界数据持续到达</text>
      <text x="595" y="150" textAnchor="middle" fontSize="11" fill="#ddd6fe">窗口：滚动/跳跃/会话</text>
      <text x="595" y="170" textAnchor="middle" fontSize="11" fill="#ddd6fe">时间：事件时间 vs 处理时间</text>
      <text x="595" y="195" textAnchor="middle" fontSize="11" fill="#c4b5fd">特点：无界数据、增量处理</text>
      <text x="595" y="215" textAnchor="middle" fontSize="11" fill="#c4b5fd">低延迟（毫秒~秒）</text>
      <text x="595" y="240" textAnchor="middle" fontSize="11" fill="#c4b5fd">适用：实时监控、CEP、物化视图</text>

      {/* 对比 */}
      <text x="400" y="295" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心差异与融合</text>

      <rect x="30" y="310" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="335" fontSize="11" fontWeight="700" fill="#334155">批处理</text>
      <text x="60" y="355" fontSize="11" fill="#64748b">有界 / 全量 / 容错简单（重跑即可） / 高延迟</text>
      <text x="60" y="375" fontSize="11" fill="#64748b">容错：失败重试，输出幂等</text>

      <text x="400" y="335" fontSize="11" fontWeight="700" fill="#334155">流处理</text>
      <text x="400" y="355" fontSize="11" fill="#64748b">无界 / 增量 / 容错复杂（检查点+状态） / 低延迟</text>
      <text x="400" y="375" fontSize="11" fill="#64748b">容错：检查点 + exactly-once 语义</text>

      {/* 流处理难点 */}
      <text x="400" y="415" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">流处理三大难点</text>

      <rect x="30" y="428" width="240" height="65" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="450" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">时间语义</text>
      <text x="150" y="468" textAnchor="middle" fontSize="10" fill="#155e75">事件时间 vs 处理时间</text>
      <text x="150" y="484" textAnchor="middle" fontSize="10" fill="#155e75">乱序事件 → 水位线（Watermark）</text>

      <rect x="280" y="428" width="240" height="65" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="450" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">窗口与联结</text>
      <text x="400" y="468" textAnchor="middle" fontSize="10" fill="#78350f">滚动/跳跃/会话窗口</text>
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#78350f">流-流联结 / 流-表联结</text>

      <rect x="530" y="428" width="240" height="65" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="450" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">容错语义</text>
      <text x="650" y="468" textAnchor="middle" fontSize="10" fill="#5b21b6">at-most-once / at-least-once</text>
      <text x="650" y="484" textAnchor="middle" fontSize="10" fill="#5b21b6">exactly-once（幂等+事务）</text>

      {/* 批流融合 */}
      <rect x="30" y="505" width="740" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="528" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">批流融合（Flink / Spark Structured Streaming）：一套引擎，批是流的特例 → Kappa 架构</text>
    </svg>
  );
}
