"use client";

export function DscSqlRelationalAlgebraDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="SQL与关系代数对应关系">
      <defs>
        <linearGradient id="dsc-sql-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dsc-sql-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">SQL 与关系代数 · 运算对应</text>

      {/* SQL 三类语言 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">SQL 语言分类</text>
      <rect x="40" y="70" width="230" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="155" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">DDL 数据定义</text>
      <text x="155" y="111" textAnchor="middle" fontSize="11" fill="#78350f">CREATE / ALTER / DROP</text>
      <rect x="285" y="70" width="230" height="56" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">DML 数据操作</text>
      <text x="400" y="111" textAnchor="middle" fontSize="11" fill="#155e75">SELECT / INSERT / UPDATE / DELETE</text>
      <rect x="530" y="70" width="230" height="56" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="645" y="91" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">DCL 数据控制</text>
      <text x="645" y="111" textAnchor="middle" fontSize="11" fill="#6d28d9">GRANT / REVOKE / 权限</text>

      {/* 对应表 */}
      <text x="400" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">SQL 子句 ↔ 关系代数运算</text>
      <rect x="40" y="170" width="720" height="30" rx="6" fill="url(#dsc-sql-head)" />
      <text x="120" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">关系代数运算</text>
      <text x="300" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">符号</text>
      <text x="500" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">对应 SQL</text>
      <text x="680" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">含义</text>

      {[
        ["选择 Select", "σ", "WHERE", "按条件选行"],
        ["投影 Project", "π", "SELECT 列", "选列去重"],
        ["自然连接 Join", "⋈", "JOIN ... ON", "按相同列名连接"],
        ["笛卡尔积", "×", "FROM A, B", "所有行组合"],
        ["并 Union", "∪", "UNION", "合并去重"],
        ["差 Difference", "−", "EXCEPT", "A 有 B 无"],
        ["重命名 Rename", "ρ", "AS 别名", "改名"],
      ].map((row, i) => {
        const y = 200 + i * 30;
        const bg = i % 2 === 0 ? "#fffbeb" : "#fff";
        return (
          <g key={i}>
            <rect x="40" y={y} width="720" height="30" fill={bg} stroke="#fde68a" />
            <text x="120" y={y + 20} textAnchor="middle" fontSize="11" fill="#0f172a">{row[0]}</text>
            <text x="300" y={y + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">{row[1]}</text>
            <text x="500" y={y + 20} textAnchor="middle" fontSize="11" fill="#155e75" fontFamily="monospace">{row[2]}</text>
            <text x="680" y={y + 20} textAnchor="middle" fontSize="11" fill="#475569">{row[3]}</text>
          </g>
        );
      })}

      {/* 运算组合 */}
      <rect x="40" y="445" width="720" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">关系代数 = 过程化查询语言（运算的树形组合）</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">SQL: SELECT name FROM student WHERE dept='CS'</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="monospace">代数: π_name( σ_dept='CS'(student) )</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#64748b">基本运算可组合为复杂查询；查询优化器在等价代数式中选最低成本</text>
    </svg>
  );
}
