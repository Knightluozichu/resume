"use client";

export function SqtSubqueriesDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="子查询与组合查询">
      <defs>
        <marker id="sqt-sub-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <linearGradient id="sqt-sub-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">子查询与组合查询（UNION）</text>

      {/* 子查询类型 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">子查询的四种返回类型</text>

      {/* 标量子查询 */}
      <rect x="30" y="70" width="170" height="130" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="115" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">标量子查询</text>
      <text x="115" y="115" textAnchor="middle" fontSize="10" fill="#1e3a8a">返回单行单列</text>
      <text x="115" y="138" textAnchor="middle" fontSize="10" fill="#1e3a8a" fontFamily="monospace">WHERE price &gt;</text>
      <text x="115" y="155" textAnchor="middle" fontSize="10" fill="#1e3a8a" fontFamily="monospace"> (SELECT AVG(price)</text>
      <text x="115" y="172" textAnchor="middle" fontSize="10" fill="#1e3a8a" fontFamily="monospace">  FROM products)</text>
      <text x="115" y="192" textAnchor="middle" fontSize="10" fill="#166534">用在 =, &gt;, &lt; 等比较中</text>

      {/* 列子查询 */}
      <rect x="215" y="70" width="170" height="130" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">列子查询</text>
      <text x="300" y="115" textAnchor="middle" fontSize="10" fill="#78350f">返回单列多行</text>
      <text x="300" y="138" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">WHERE cust_id IN</text>
      <text x="300" y="155" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace"> (SELECT cust_id</text>
      <text x="300" y="172" textAnchor="middle" fontSize="10" fill="#78350f" fontFamily="monospace">  FROM orders)</text>
      <text x="300" y="192" textAnchor="middle" fontSize="10" fill="#166534">配合 IN / NOT IN 使用</text>

      {/* 行子查询 */}
      <rect x="400" y="70" width="170" height="130" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="485" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">行子查询</text>
      <text x="485" y="115" textAnchor="middle" fontSize="10" fill="#5b21b6">返回单行多列</text>
      <text x="485" y="138" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">WHERE (city, dept) =</text>
      <text x="485" y="155" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace"> (SELECT city, dept</text>
      <text x="485" y="172" textAnchor="middle" fontSize="10" fill="#5b21b6" fontFamily="monospace">  FROM emp WHERE id=1)</text>
      <text x="485" y="192" textAnchor="middle" fontSize="10" fill="#166534">多列同时比较</text>

      {/* 表子查询 */}
      <rect x="585" y="70" width="185" height="130" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="677" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9d174d">表子查询</text>
      <text x="677" y="115" textAnchor="middle" fontSize="10" fill="#831843">返回多行多列</text>
      <text x="677" y="138" textAnchor="middle" fontSize="10" fill="#831843" fontFamily="monospace">FROM (SELECT ...</text>
      <text x="677" y="155" textAnchor="middle" fontSize="10" fill="#831843" fontFamily="monospace">       FROM emp</text>
      <text x="677" y="172" textAnchor="middle" fontSize="10" fill="#831843" fontFamily="monospace">       GROUP BY dept) t</text>
      <text x="677" y="192" textAnchor="middle" fontSize="10" fill="#166534">用作 FROM 的派生表</text>

      {/* 子查询使用位置 */}
      <rect x="30" y="215" width="360" height="125" rx="10" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="210" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534">子查询的使用位置</text>
      <text x="210" y="262" textAnchor="middle" fontSize="11" fill="#15803d">① WHERE 子句：条件过滤（最常见）</text>
      <text x="210" y="282" textAnchor="middle" fontSize="11" fill="#15803d">② SELECT 子句：计算列（标量子查询）</text>
      <text x="210" y="302" textAnchor="middle" fontSize="11" fill="#15803d">③ FROM 子句：派生表（表子查询）</text>
      <text x="210" y="322" textAnchor="middle" fontSize="11" fill="#15803d">④ HAVING 子句：组级条件</text>

      {/* EXISTS */}
      <rect x="410" y="215" width="360" height="125" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="590" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">EXISTS 相关子查询</text>
      <text x="590" y="262" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">SELECT * FROM customers c</text>
      <text x="590" y="280" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">WHERE EXISTS (</text>
      <text x="590" y="298" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">  SELECT 1 FROM orders o</text>
      <text x="590" y="316" textAnchor="middle" fontSize="11" fill="#78350f" fontFamily="monospace">  WHERE o.cust_id = c.cust_id);</text>
      <text x="590" y="332" textAnchor="middle" fontSize="10" fill="#92400e">只判断是否有行，不关心返回值</text>

      {/* UNION */}
      <rect x="30" y="355" width="740" height="125" rx="10" fill="url(#sqt-sub-grad)" opacity="0.95" />
      <text x="400" y="378" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">组合查询 UNION</text>

      <rect x="60" y="390" width="300" height="75" rx="8" fill="#fff" opacity="0.12" />
      <text x="210" y="412" textAnchor="middle" fontSize="11" fill="#ede9fe" fontFamily="monospace">SELECT name FROM customers WHERE city='BJ'</text>
      <text x="210" y="430" textAnchor="middle" fontSize="11" fill="#ede9fe" fontFamily="monospace">UNION</text>
      <text x="210" y="448" textAnchor="middle" fontSize="11" fill="#ede9fe" fontFamily="monospace">SELECT name FROM suppliers WHERE city='BJ';</text>

      <rect x="390" y="390" width="350" height="75" rx="8" fill="#fff" opacity="0.12" />
      <text x="565" y="412" textAnchor="middle" fontSize="11" fill="#ddd6fe">UNION：自动去重，列数必须相同</text>
      <text x="565" y="430" textAnchor="middle" fontSize="11" fill="#ddd6fe">UNION ALL：不去重，性能更好</text>
      <text x="565" y="448" textAnchor="middle" fontSize="11" fill="#ddd6fe">列类型兼容，结果列名取自第一条</text>
    </svg>
  );
}
