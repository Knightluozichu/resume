"use client";

export function MseAdvancedSqlDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="高级查询JOIN与子查询图解">
      <defs>
        <linearGradient id="mse-asql-join" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mse-asql-sub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="mse-asql-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">JOIN 类型与子查询</text>

      {/* JOIN 类型 - 韦恩图风格 */}
      <text x="400" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">JOIN 七大类型</text>

      {/* INNER JOIN */}
      <circle cx="130" cy="110" r="35" fill="#3b82f6" opacity="0.3" />
      <circle cx="170" cy="110" r="35" fill="#f59e0b" opacity="0.3" />
      <text x="150" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">INNER</text>
      <text x="150" y="160" textAnchor="middle" fontSize="10" fill="#475569">交集</text>

      {/* LEFT JOIN */}
      <circle cx="290" cy="110" r="35" fill="#3b82f6" opacity="0.5" />
      <circle cx="330" cy="110" r="35" fill="#f59e0b" opacity="0.2" />
      <text x="290" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">LEFT</text>
      <text x="310" y="160" textAnchor="middle" fontSize="10" fill="#475569">左全 + 右匹配</text>

      {/* RIGHT JOIN */}
      <circle cx="470" cy="110" r="35" fill="#3b82f6" opacity="0.2" />
      <circle cx="510" cy="110" r="35" fill="#f59e0b" opacity="0.5" />
      <text x="510" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">RIGHT</text>
      <text x="490" y="160" textAnchor="middle" fontSize="10" fill="#475569">右全 + 左匹配</text>

      {/* FULL JOIN (UNION模拟) */}
      <circle cx="650" cy="110" r="35" fill="#3b82f6" opacity="0.4" />
      <circle cx="690" cy="110" r="35" fill="#f59e0b" opacity="0.4" />
      <text x="670" y="115" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">FULL</text>
      <text x="670" y="160" textAnchor="middle" fontSize="10" fill="#475569">并集（UNION）</text>

      {/* JOIN 示例 */}
      <rect x="20" y="180" width="380" height="170" rx="10" fill="url(#mse-asql-join)" opacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="210" y="202" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">JOIN 查询示例</text>
      <text x="30" y="224" fontSize="10" fill="#1e3a8a" fontFamily="monospace">-- 查询每个订单的客户信息</text>
      <text x="30" y="240" fontSize="10" fill="#1e3a8a" fontFamily="monospace">SELECT o.order_id, c.name, o.total</text>
      <text x="30" y="256" fontSize="10" fill="#1e3a8a" fontFamily="monospace">FROM orders o</text>
      <text x="30" y="272" fontSize="10" fill="#1e3a8a" fontFamily="monospace">INNER JOIN customers c</text>
      <text x="30" y="288" fontSize="10" fill="#1e3a8a" fontFamily="monospace">  ON o.customer_id = c.id</text>
      <text x="30" y="304" fontSize="10" fill="#1e3a8a" fontFamily="monospace">WHERE o.total &gt; 100</text>
      <text x="30" y="320" fontSize="10" fill="#1e3a8a" fontFamily="monospace">ORDER BY o.total DESC;</text>
      <text x="30" y="340" fontSize="10" fill="#1e40af">ON 指定连接条件，WHERE 后过滤</text>

      {/* 子查询 */}
      <rect x="410" y="180" width="370" height="170" rx="10" fill="url(#mse-asql-sub)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="202" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">子查询分类</text>
      <text x="595" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">按位置分：</text>
      <text x="595" y="242" textAnchor="middle" fontSize="10" fill="#92400e">SELECT 子句 → 标量子查询</text>
      <text x="595" y="258" textAnchor="middle" fontSize="10" fill="#92400e">FROM 子句 → 派生表</text>
      <text x="595" y="274" textAnchor="middle" fontSize="10" fill="#92400e">WHERE 子句 → 条件子查询</text>
      <text x="595" y="294" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">按返回分：</text>
      <text x="595" y="312" textAnchor="middle" fontSize="10" fill="#92400e">标量(单值) / 行 / 列 / 表</text>
      <text x="595" y="330" textAnchor="middle" fontSize="10" fill="#92400e">IN / EXISTS / ANY / ALL</text>
      <text x="595" y="344" textAnchor="middle" fontSize="10" fill="#b45309">EXISTS 通常比 IN 更高效</text>

      {/* 窗口函数 */}
      <rect x="20" y="365" width="760" height="160" rx="10" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="400" y="387" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">窗口函数（MySQL 8.0+）</text>
      <text x="30" y="410" fontSize="10" fill="#5b21b6" fontFamily="monospace">-- 按部门排名薪水</text>
      <text x="30" y="426" fontSize="10" fill="#5b21b6" fontFamily="monospace">SELECT name, dept, salary,</text>
      <text x="30" y="442" fontSize="10" fill="#5b21b6" fontFamily="monospace">  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk,</text>
      <text x="30" y="458" fontSize="10" fill="#5b21b6" fontFamily="monospace">  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn,</text>
      <text x="30" y="474" fontSize="10" fill="#5b21b6" fontFamily="monospace">  SUM(salary) OVER (PARTITION BY dept) AS dept_total</text>
      <text x="30" y="490" fontSize="10" fill="#5b21b6" fontFamily="monospace">FROM employees;</text>
      <text x="30" y="512" fontSize="10" fill="#6d28d9">排序：RANK(并列跳号) / DENSE_RANK(并列不跳) / ROW_NUMBER(不并列)</text>
    </svg>
  );
}
