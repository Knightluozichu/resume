"use client";

export function SqtJoinsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="联结查询JOIN类型">
      <defs>
        <marker id="sqt-join-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">JOIN 联结类型与原理</text>

      {/* 两表关系示意 */}
      <rect x="30" y="50" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">为什么需要 JOIN？—— 关系型数据库的核心</text>
      <text x="400" y="95" textAnchor="middle" fontSize="11" fill="#475569">数据分散在多张表中（如 orders 表存订单，customers 表存客户），JOIN 按关联列将行拼接</text>
      <text x="400" y="115" textAnchor="middle" fontSize="11" fill="#475569">外键关系：orders.cust_id → customers.cust_id（主键）</text>

      {/* JOIN 类型 - 用韦恩图风格 */}
      <text x="400" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四大 JOIN 类型</text>

      {/* INNER JOIN */}
      <rect x="30" y="170" width="170" height="160" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="115" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">INNER JOIN</text>
      <circle cx="95" cy="245" r="35" fill="#3b82f6" opacity="0.3" />
      <circle cx="135" cy="245" r="35" fill="#f59e0b" opacity="0.3" />
      <text x="115" y="250" textAnchor="middle" fontSize="22" fill="#1e40af">∩</text>
      <text x="115" y="298" textAnchor="middle" fontSize="11" fill="#1e3a8a">只返回两表匹配的行</text>
      <text x="115" y="315" textAnchor="middle" fontSize="11" fill="#1e3a8a">（交集）</text>

      {/* LEFT JOIN */}
      <rect x="215" y="170" width="170" height="160" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">LEFT JOIN</text>
      <circle cx="280" cy="245" r="35" fill="#f59e0b" opacity="0.4" />
      <circle cx="320" cy="245" r="35" fill="#3b82f6" opacity="0.2" />
      <text x="280" y="250" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">左全</text>
      <text x="300" y="298" textAnchor="middle" fontSize="11" fill="#78350f">返回左表全部行</text>
      <text x="300" y="315" textAnchor="middle" fontSize="11" fill="#78350f">右表无匹配填 NULL</text>

      {/* RIGHT JOIN */}
      <rect x="400" y="170" width="170" height="160" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="485" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">RIGHT JOIN</text>
      <circle cx="465" cy="245" r="35" fill="#f59e0b" opacity="0.2" />
      <circle cx="505" cy="245" r="35" fill="#8b5cf6" opacity="0.4" />
      <text x="505" y="250" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">右全</text>
      <text x="485" y="298" textAnchor="middle" fontSize="11" fill="#5b21b6">返回右表全部行</text>
      <text x="485" y="315" textAnchor="middle" fontSize="11" fill="#5b21b6">左表无匹配填 NULL</text>

      {/* FULL JOIN */}
      <rect x="585" y="170" width="185" height="160" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="677" y="193" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9d174d">FULL OUTER JOIN</text>
      <circle cx="657" cy="245" r="35" fill="#ec4899" opacity="0.3" />
      <circle cx="697" cy="245" r="35" fill="#3b82f6" opacity="0.3" />
      <text x="677" y="250" textAnchor="middle" fontSize="22" fill="#9d174d">∪</text>
      <text x="677" y="298" textAnchor="middle" fontSize="11" fill="#831843">返回两表全部行</text>
      <text x="677" y="315" textAnchor="middle" fontSize="11" fill="#831843">（并集，MySQL用UNION模拟）</text>

      {/* JOIN 语法与自联结 */}
      <rect x="30" y="350" width="360" height="130" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="210" y="373" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">JOIN 标准语法</text>
      <text x="210" y="398" textAnchor="middle" fontSize="11" fill="#15803d" fontFamily="monospace">SELECT a.col, b.col</text>
      <text x="210" y="416" textAnchor="middle" fontSize="11" fill="#15803d" fontFamily="monospace">FROM tableA AS a</text>
      <text x="210" y="434" textAnchor="middle" fontSize="11" fill="#15803d" fontFamily="monospace">INNER JOIN tableB AS b</text>
      <text x="210" y="452" textAnchor="middle" fontSize="11" fill="#15803d" fontFamily="monospace">  ON a.id = b.a_id;</text>
      <text x="210" y="472" textAnchor="middle" fontSize="11" fill="#166534">ON 指定关联条件，AS 给表起别名</text>

      <rect x="410" y="350" width="360" height="130" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="590" y="373" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">自联结（Self-Join）</text>
      <text x="590" y="398" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">SELECT a.name, b.name AS 同事</text>
      <text x="590" y="416" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">FROM employees AS a</text>
      <text x="590" y="434" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">JOIN employees AS b</text>
      <text x="590" y="452" textAnchor="middle" fontSize="11" fill="#7f1d1d" fontFamily="monospace">  ON a.dept = b.dept AND a.id != b.id;</text>
      <text x="590" y="472" textAnchor="middle" fontSize="11" fill="#991b1b">同一张表当作两份，用不同别名区分</text>
    </svg>
  );
}
