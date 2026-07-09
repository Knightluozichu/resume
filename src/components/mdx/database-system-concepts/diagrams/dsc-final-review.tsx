"use client";

export function DscFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="数据库系统概念全书知识图谱">
      <defs>
        <linearGradient id="dsc-fr-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="dsc-fr-q" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dsc-fr-s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dsc-fr-t" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="dsc-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">数据库系统概念 · 全书知识图谱</text>

      {/* 四层中心 */}
      <circle cx="400" cy="110" r="38" fill="url(#dsc-fr-core)" />
      <text x="400" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">数据</text>
      <text x="400" y="122" textAnchor="middle" fontSize="11" fill="#cffafe">建模查询</text>

      <circle cx="250" cy="110" r="34" fill="url(#dsc-fr-q)" />
      <text x="250" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SQL</text>
      <text x="250" y="121" textAnchor="middle" fontSize="10" fill="#fef3c7">关系代数</text>

      <circle cx="550" cy="110" r="34" fill="url(#dsc-fr-s)" />
      <text x="550" y="106" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">存储</text>
      <text x="550" y="121" textAnchor="middle" fontSize="10" fill="#ede9fe">索引</text>

      <line x1="284" y1="110" x2="362" y2="110" stroke="#64748b" strokeWidth="1.5" />
      <line x1="438" y1="110" x2="516" y2="110" stroke="#64748b" strokeWidth="1.5" />

      {/* 第一层：建模层 */}
      <rect x="40" y="180" width="720" height="80" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="60" y="202" fontSize="13" fontWeight="700" fill="#0e7490">第一层：数据建模（怎么组织数据）</text>
      <text x="60" y="224" fontSize="11" fill="#155e75">关系模型：关系/元组/属性/域 → 键（超码→候选码→主码→外码）→ 三类完整性约束</text>
      <text x="60" y="244" fontSize="11" fill="#155e75">ER设计：实体/属性/联系 → 基数 1:1/1:N/M:N → 转关系模式 → 函数依赖 → 规范化 1NF→2NF→3NF→BCNF</text>

      {/* 第二层：查询层 */}
      <rect x="40" y="275" width="720" height="70" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="297" fontSize="13" fontWeight="700" fill="#92400e">第二层：查询处理（怎么取数据）</text>
      <text x="60" y="319" fontSize="11" fill="#78350f">SQL：DDL/DML/DCL ↔ 关系代数 σ/π/⋈/×/∪/−/ρ</text>
      <text x="60" y="337" fontSize="11" fill="#78350f">查询处理：解析→翻译→优化（代数优化+物理优化）→执行（嵌套循环/排序归并/哈希连接）</text>

      {/* 第三层：系统层 */}
      <rect x="40" y="360" width="720" height="70" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="60" y="382" fontSize="13" fontWeight="700" fill="#6d28d9">第三层：系统实现（怎么存怎么跑）</text>
      <text x="60" y="404" fontSize="11" fill="#6d28d9">存储：文件→页→记录 ｜ 索引：B+树/哈希/位图/聚簇 ｜ 缓冲区：LRU替换，命中免IO</text>
      <text x="60" y="422" fontSize="11" fill="#6d28d9">优化：代价=IO+CPU，启发式+代价估算，连接顺序重排剪枝</text>

      {/* 第四层：可靠性层 */}
      <rect x="40" y="445" width="720" height="100" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="60" y="467" fontSize="13" fontWeight="700" fill="#059669">第四层：可靠性与一致性（怎么不出错）</text>
      <text x="60" y="489" fontSize="11" fill="#047857">事务 ACID：原子性(UNDO)/一致性/隔离性(并发控制)/持久性(REDO)</text>
      <text x="60" y="509" fontSize="11" fill="#047857">并发：2PL/MVCC/OCC → 可串行化 → 隔离级别（脏读/不可重复读/幻读）→ 死锁处理</text>
      <text x="60" y="529" fontSize="11" fill="#047857">恢复：日志WAL → 检查点 → ARIES（分析/REDO/UNDO）→ 故障分类（事务/系统/介质）</text>
    </svg>
  );
}
