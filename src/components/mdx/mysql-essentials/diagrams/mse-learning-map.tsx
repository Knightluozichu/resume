"use client";

export function MseLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="MySQL数据库应用全书学习地图">
      <defs>
        <linearGradient id="mse-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <linearGradient id="mse-lm-sql" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mse-lm-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="mse-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">MySQL数据库应用从入门到精通 · 知识体系</text>

      {/* 基础篇 */}
      <rect x="20" y="55" width="240" height="200" rx="12" fill="url(#mse-lm-fund)" opacity="0.95" />
      <text x="140" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">基础篇</text>
      <line x1="40" y1="90" x2="240" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="140" y="112" textAnchor="middle" fontSize="12" fill="#e0f2fe">MySQL入门基础</text>
      <text x="140" y="134" textAnchor="middle" fontSize="12" fill="#e0f2fe">SQL基础（DDL/DML/DQL）</text>
      <text x="140" y="156" textAnchor="middle" fontSize="12" fill="#e0f2fe">数据库设计（范式/ER）</text>
      <text x="140" y="180" textAnchor="middle" fontSize="11" fill="#bae6fd">安装配置 · 数据类型 · 建库建表</text>
      <text x="140" y="200" textAnchor="middle" fontSize="11" fill="#bae6fd">三大范式 · ER建模</text>
      <text x="140" y="232" textAnchor="middle" fontSize="11" fill="#7dd3fc">入门 · 从零搭建数据库</text>

      {/* 进阶篇 */}
      <rect x="280" y="55" width="240" height="200" rx="12" fill="url(#mse-lm-sql)" opacity="0.95" />
      <text x="400" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">进阶篇</text>
      <line x1="300" y1="90" x2="500" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="400" y="112" textAnchor="middle" fontSize="12" fill="#fef3c7">高级查询（连接/子查询）</text>
      <text x="400" y="134" textAnchor="middle" fontSize="12" fill="#fef3c7">索引与优化（B+Tree）</text>
      <text x="400" y="156" textAnchor="middle" fontSize="12" fill="#fef3c7">事务与锁（ACID/MVCC）</text>
      <text x="400" y="180" textAnchor="middle" fontSize="11" fill="#fde68a">JOIN/UNION/窗口函数</text>
      <text x="400" y="200" textAnchor="middle" fontSize="11" fill="#fde68a">执行计划 · 事务隔离级别</text>
      <text x="400" y="232" textAnchor="middle" fontSize="11" fill="#fcd34d">中级 · 写对且写得快</text>

      {/* 高级篇 */}
      <rect x="540" y="55" width="240" height="200" rx="12" fill="url(#mse-lm-adv)" opacity="0.95" />
      <text x="660" y="80" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">高级篇</text>
      <line x1="560" y1="90" x2="760" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="660" y="112" textAnchor="middle" fontSize="12" fill="#ede9fe">安全与备份</text>
      <text x="660" y="134" textAnchor="middle" fontSize="12" fill="#ede9fe">数据库管理</text>
      <text x="660" y="156" textAnchor="middle" fontSize="12" fill="#ede9fe">全书复习整合</text>
      <text x="660" y="180" textAnchor="middle" fontSize="11" fill="#ddd6fe">权限/审计/备份恢复</text>
      <text x="660" y="200" textAnchor="middle" fontSize="11" fill="#ddd6fe">主从复制/集群/监控</text>
      <text x="660" y="232" textAnchor="middle" fontSize="11" fill="#c4b5fd">高级 · 上线与运维</text>

      {/* Arrows */}
      <path d="M260 155 L280 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-lm-arrow)" />
      <path d="M520 155 L540 155" stroke="#64748b" strokeWidth="2" markerEnd="url(#mse-lm-arrow)" />

      {/* 两条主线 */}
      <text x="400" y="290" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">两条核心主线</text>

      <rect x="50" y="305" width="320" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="327" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">主线一：SQL语言能力</text>
      <text x="210" y="347" textAnchor="middle" fontSize="11" fill="#78350f">基础SQL → 高级查询 → 优化执行计划</text>
      <text x="210" y="365" textAnchor="middle" fontSize="11" fill="#78350f">DDL/DML/DQL/JOIN/子查询/窗口函数</text>

      <rect x="430" y="305" width="320" height="80" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="590" y="327" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">主线二：数据可靠与运维</text>
      <text x="590" y="347" textAnchor="middle" fontSize="11" fill="#1e3a8a">事务ACID → 索引优化 → 安全备份</text>
      <text x="590" y="365" textAnchor="middle" fontSize="11" fill="#1e3a8a">隔离级别/MVCC/B+Tree/复制</text>

      {/* 学习路径 */}
      <rect x="50" y="405" width="700" height="110" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="428" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从会用 → 会设计 → 会优化 → 会运维）</text>
      <text x="400" y="450" textAnchor="middle" fontSize="11" fill="#475569">① 安装MySQL &amp; SQL基础 → ② 高级查询 &amp; 数据库设计</text>
      <text x="400" y="468" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 索引优化 &amp; 事务并发 → ④ 安全备份 &amp; 运维管理</text>
      <text x="400" y="486" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="505" textAnchor="middle" fontSize="11" fill="#64748b">两条主线在"索引+执行计划"与"事务+备份恢复"交汇</text>
    </svg>
  );
}
