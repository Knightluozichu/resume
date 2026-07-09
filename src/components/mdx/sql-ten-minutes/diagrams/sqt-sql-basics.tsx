"use client";

export function SqtSqlBasicsDiagram() {
  return (
    <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="SQL基础与SELECT语句结构">
      <defs>
        <linearGradient id="sqt-sb-head" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00758f" />
          <stop offset="100%" stopColor="#00566f" />
        </linearGradient>
        <marker id="sqt-sb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SELECT 语句结构与执行顺序</text>

      {/* 书写顺序 */}
      <rect x="30" y="50" width="740" height="70" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">书写顺序</text>
      <text x="400" y="95" textAnchor="middle" fontSize="13" fill="#15803d" fontFamily="monospace">SELECT 列 → FROM 表 → WHERE 条件 → GROUP BY → HAVING → ORDER BY → LIMIT</text>

      {/* 执行顺序箭头流 */}
      <rect x="30" y="140" width="740" height="120" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">实际执行顺序（关键！）</text>

      <rect x="50" y="175" width="100" height="35" rx="6" fill="#00758f" />
      <text x="100" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">FROM</text>

      <rect x="170" y="175" width="100" height="35" rx="6" fill="#0891b2" />
      <text x="220" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">WHERE</text>

      <rect x="290" y="175" width="100" height="35" rx="6" fill="#0d9488" />
      <text x="340" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">GROUP BY</text>

      <rect x="410" y="175" width="100" height="35" rx="6" fill="#65a30d" />
      <text x="460" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">HAVING</text>

      <rect x="530" y="175" width="100" height="35" rx="6" fill="#ca8a04" />
      <text x="580" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">SELECT</text>

      <rect x="650" y="175" width="100" height="35" rx="6" fill="#9333ea" />
      <text x="700" y="197" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">ORDER BY</text>

      <path d="M150 193 L170 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sb-arrow)" />
      <path d="M270 193 L290 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sb-arrow)" />
      <path d="M390 193 L410 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sb-arrow)" />
      <path d="M510 193 L530 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sb-arrow)" />
      <path d="M630 193 L650 193" stroke="#64748b" strokeWidth="2" markerEnd="url(#sqt-sb-arrow)" />

      <text x="400" y="235" textAnchor="middle" fontSize="11" fill="#78350f">先确定数据来源(FROM) → 过滤(WHERE) → 分组(GROUP BY) → 组过滤(HAVING)</text>
      <text x="400" y="252" textAnchor="middle" fontSize="11" fill="#78350f">→ 选取列(SELECT) → 排序(ORDER BY) → 限制行数(LIMIT)</text>

      {/* 数据库基本概念 */}
      <rect x="30" y="285" width="230" height="155" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="145" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">数据库核心概念</text>
      <text x="145" y="332" textAnchor="middle" fontSize="11" fill="#1e3a8a">数据库（Database）</text>
      <text x="145" y="350" textAnchor="middle" fontSize="11" fill="#1e3a8a">  └── 表（Table）</text>
      <text x="145" y="368" textAnchor="middle" fontSize="11" fill="#1e3a8a">       └── 列（Column）/ 行（Row）</text>
      <text x="145" y="386" textAnchor="middle" fontSize="11" fill="#1e3a8a">主键（Primary Key）</text>
      <text x="145" y="404" textAnchor="middle" fontSize="11" fill="#1e3a8a">  · 唯一标识每行</text>
      <text x="145" y="422" textAnchor="middle" fontSize="11" fill="#1e3a8a">  · 非空 + 不重复</text>

      {/* SELECT 语法要素 */}
      <rect x="280" y="285" width="230" height="155" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="395" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">SELECT 核心要素</text>
      <text x="395" y="332" textAnchor="middle" fontSize="11" fill="#78350f">SELECT *  → 查所有列</text>
      <text x="395" y="350" textAnchor="middle" fontSize="11" fill="#78350f">SELECT 列名  → 查指定列</text>
      <text x="395" y="368" textAnchor="middle" fontSize="11" fill="#78350f">DISTINCT  → 去重</text>
      <text x="395" y="386" textAnchor="middle" fontSize="11" fill="#78350f">LIMIT n  → 限制行数</text>
      <text x="395" y="404" textAnchor="middle" fontSize="11" fill="#78350f">AS 别名  → 重命名列</text>
      <text x="395" y="422" textAnchor="middle" fontSize="11" fill="#78350f">注释：-- 或 /* */</text>

      {/* SQL 语句分类 */}
      <rect x="530" y="285" width="240" height="155" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="650" y="308" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">SQL 语句分类</text>
      <text x="650" y="332" textAnchor="middle" fontSize="11" fill="#5b21b6">DQL：SELECT（查询）</text>
      <text x="650" y="350" textAnchor="middle" fontSize="11" fill="#5b21b6">DML：INSERT/UPDATE/DELETE</text>
      <text x="650" y="368" textAnchor="middle" fontSize="11" fill="#5b21b6">DDL：CREATE/ALTER/DROP</text>
      <text x="650" y="386" textAnchor="middle" fontSize="11" fill="#5b21b6">DCL：GRANT/REVOKE</text>
      <text x="650" y="410" textAnchor="middle" fontSize="11" fill="#7c3aed">本书聚焦 DQL（数据查询）</text>
    </svg>
  );
}
