"use client";

export function DdiDerivedDataDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="衍生数据">
      <defs>
        <linearGradient id="ddi-dd-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="ddi-dd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">衍生数据 · 系统记录与数据集成</text>

      {/* 记录系统 vs 衍生数据 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">系统记录 vs 衍生数据</text>

      <rect x="30" y="68" width="370" height="120" rx="12" fill="url(#ddi-dd-grad)" opacity="0.95" />
      <text x="215" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">系统记录（System of Record）</text>
      <line x1="50" y1="103" x2="380" y2="103" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="215" y="126" textAnchor="middle" fontSize="11" fill="#ede9fe">数据的权威来源（True Source）</text>
      <text x="215" y="146" textAnchor="middle" fontSize="11" fill="#ddd6fe">写入路径：用户操作 → 系统记录</text>
      <text x="215" y="166" textAnchor="middle" fontSize="11" fill="#ddd6fe">要求：一致、可恢复、权威</text>
      <text x="215" y="180" textAnchor="middle" fontSize="11" fill="#c4b5fd">如：OLTP 数据库的主库</text>

      <rect x="410" y="68" width="360" height="120" rx="12" fill="url(#ddi-dd-grad)" opacity="0.75" />
      <text x="590" y="93" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">衍生数据（Derived Data）</text>
      <line x1="430" y1="103" x2="750" y2="103" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="126" textAnchor="middle" fontSize="11" fill="#ede9fe">从系统记录计算得到的数据</text>
      <text x="590" y="146" textAnchor="middle" fontSize="11" fill="#ddd6fe">读路径：衍生数据 → 查询服务</text>
      <text x="590" y="166" textAnchor="middle" fontSize="11" fill="#ddd6fe">可从源头重建，可丢弃可重建</text>
      <text x="590" y="180" textAnchor="middle" fontSize="11" fill="#c4b5fd">如：索引、物化视图、缓存、搜索索引</text>

      <path d="M400 128 L410 128" stroke="#64748b" strokeWidth="2" markerEnd="url(#ddi-dd-arrow)" />

      {/* 衍生数据的三种形式 */}
      <text x="400" y="215" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">衍生数据的三种形式</text>

      <rect x="30" y="228" width="240" height="120" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="150" y="251" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">物化视图与索引</text>
      <text x="150" y="271" textAnchor="middle" fontSize="11" fill="#155e75">同库内衍生</text>
      <text x="150" y="291" textAnchor="middle" fontSize="11" fill="#155e75">触发器 / 物化视图</text>
      <text x="150" y="311" textAnchor="middle" fontSize="11" fill="#155e75">搜索索引（ES）</text>
      <text x="150" y="335" textAnchor="middle" fontSize="11" fill="#0e7490">同步：CDC / 双写 / 批 ETL</text>

      <rect x="280" y="228" width="240" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="251" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">批处理衍生</text>
      <text x="400" y="271" textAnchor="middle" fontSize="11" fill="#78350f">MapReduce / Spark</text>
      <text x="400" y="291" textAnchor="middle" fontSize="11" fill="#78350f">定期全量计算</text>
      <text x="400" y="311" textAnchor="middle" fontSize="11" fill="#78350f">离线分析 / 机器学习</text>
      <text x="400" y="335" textAnchor="middle" fontSize="11" fill="#92400e">适合：大批量、延迟容忍</text>

      <rect x="530" y="228" width="240" height="120" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="251" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">流处理衍生</text>
      <text x="650" y="271" textAnchor="middle" fontSize="11" fill="#5b21b6">Kafka / Flink</text>
      <text x="650" y="291" textAnchor="middle" fontSize="11" fill="#5b21b6">实时增量计算</text>
      <text x="650" y="311" textAnchor="middle" fontSize="11" fill="#5b21b6">物化视图维护</text>
      <text x="650" y="335" textAnchor="middle" fontSize="11" fill="#6d28d9">适合：低延迟、增量更新</text>

      {/* 数据集成 */}
      <text x="400" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据集成：让衍生数据保持同步</text>

      <rect x="30" y="390" width="740" height="75" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="170" y="413" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">变更数据捕获（CDC）</text>
      <text x="170" y="433" textAnchor="middle" fontSize="11" fill="#475569">捕获系统记录的变更日志</text>
      <text x="170" y="450" textAnchor="middle" fontSize="11" fill="#475569">→ 转为事件流 → 衍生系统消费</text>

      <text x="400" y="413" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">事件溯源</text>
      <text x="400" y="433" textAnchor="middle" fontSize="11" fill="#475569">以事件为系统记录</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">→ 状态由事件回放得到</text>

      <text x="630" y="413" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">CDC vs 事件溯源</text>
      <text x="630" y="433" textAnchor="middle" fontSize="11" fill="#475569">CDC：数据库变更的副产品</text>
      <text x="630" y="450" textAnchor="middle" fontSize="11" fill="#475569">事件溯源：事件即真相源</text>

      {/* 分离写路径 */}
      <rect x="30" y="475" width="740" height="70" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="400" y="498" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">Lambda 架构 vs Kappa 架构</text>
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#78350f">Lambda：批层（全量准确）+ 速度层（增量快速）→ 合并层。复杂但容错</text>
      <text x="400" y="536" textAnchor="middle" fontSize="11" fill="#92400e">Kappa：只用流处理，用日志重放替代批层。简洁但流引擎需够强</text>
    </svg>
  );
}
