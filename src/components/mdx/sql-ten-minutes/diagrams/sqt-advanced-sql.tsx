"use client";

export function SqtAdvancedSqlDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="高级SQL窗口函数CTE视图">
      <defs>
        <linearGradient id="sqt-adv-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="sqt-adv-cte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="sqt-adv-view" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级 SQL：窗口函数 / CTE / 视图</text>

      {/* 窗口函数 */}
      <rect x="30" y="50" width="740" height="160" rx="10" fill="url(#sqt-adv-win)" opacity="0.95" />
      <text x="400" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">窗口函数（Window Functions）</text>
      <line x1="50" y1="83" x2="750" y2="83" stroke="#fff" strokeWidth="1" opacity="0.3" />

      <text x="50" y="105" fontSize="11" fill="#ede9fe" fontFamily="monospace">SELECT name, dept, salary,</text>
      <text x="50" y="123" fontSize="11" fill="#ddd6fe" fontFamily="monospace">  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank,</text>
      <text x="50" y="141" fontSize="11" fill="#ddd6fe" fontFamily="monospace">  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS row_num,</text>
      <text x="50" y="159" fontSize="11" fill="#ddd6fe" fontFamily="monospace">  LAG(salary, 1) OVER (ORDER BY salary) AS prev_salary,</text>
      <text x="50" y="177" fontSize="11" fill="#ddd6fe" fontFamily="monospace">  SUM(salary) OVER (PARTITION BY dept) AS dept_total</text>
      <text x="50" y="195" fontSize="11" fill="#ddd6fe" fontFamily="monospace">FROM employees;</text>

      <rect x="500" y="95" width="250" height="100" rx="8" fill="#fff" opacity="0.12" />
      <text x="625" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">常用窗口函数</text>
      <text x="625" y="135" textAnchor="middle" fontSize="10" fill="#c4b5fd">RANK() / DENSE_RANK() / ROW_NUMBER()</text>
      <text x="625" y="153" textAnchor="middle" fontSize="10" fill="#c4b5fd">LAG() / LEAD() — 前后行引用</text>
      <text x="625" y="171" textAnchor="middle" fontSize="10" fill="#c4b5fd">SUM/AVG/COUNT OVER — 移动聚合</text>
      <text x="625" y="189" textAnchor="middle" fontSize="10" fill="#c4b5fd">NTILE(n) — 分桶</text>

      {/* CTE */}
      <rect x="30" y="230" width="360" height="160" rx="10" fill="url(#sqt-adv-cte)" opacity="0.95" />
      <text x="210" y="253" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">CTE（公用表表达式）</text>
      <line x1="50" y1="263" x2="370" y2="263" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="50" y="285" fontSize="11" fill="#d1fae5" fontFamily="monospace">WITH dept_avg AS (</text>
      <text x="50" y="303" fontSize="11" fill="#a7f3d0" fontFamily="monospace">  SELECT dept, AVG(salary) AS avg_sal</text>
      <text x="50" y="321" fontSize="11" fill="#a7f3d0" fontFamily="monospace">  FROM employees GROUP BY dept</text>
      <text x="50" y="339" fontSize="11" fill="#d1fae5" fontFamily="monospace">)</text>
      <text x="50" y="357" fontSize="11" fill="#d1fae5" fontFamily="monospace">SELECT e.name, d.avg_sal</text>
      <text x="50" y="375" fontSize="11" fill="#d1fae5" fontFamily="monospace">FROM employees e JOIN dept_avg d ON e.dept=d.dept;</text>

      {/* 视图 */}
      <rect x="410" y="230" width="360" height="160" rx="10" fill="url(#sqt-adv-view)" opacity="0.95" />
      <text x="590" y="253" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">视图（VIEW）</text>
      <line x1="430" y1="263" x2="750" y2="263" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <text x="430" y="285" fontSize="11" fill="#fef3c7" fontFamily="monospace">CREATE VIEW active_cust AS</text>
      <text x="430" y="303" fontSize="11" fill="#fde68a" fontFamily="monospace">SELECT cust_id, name, email</text>
      <text x="430" y="321" fontSize="11" fill="#fde68a" fontFamily="monospace">FROM customers WHERE status='active';</text>
      <text x="430" y="345" fontSize="11" fill="#fef3c7">-- 使用：像表一样查询</text>
      <text x="430" y="363" fontSize="11" fill="#fef3c7" fontFamily="monospace">SELECT * FROM active_cust;</text>
      <text x="430" y="383" fontSize="11" fill="#fde68a">虚拟表，不存数据，每次查询动态生成</text>

      {/* 三者对比 */}
      <rect x="30" y="410" width="740" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="433" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">三者对比与适用场景</text>
      <text x="180" y="458" textAnchor="middle" fontSize="11" fill="#6d28d9">窗口函数：排名/累计/前后行比较</text>
      <text x="180" y="478" textAnchor="middle" fontSize="11" fill="#6d28d9">不聚合行数，保留明细</text>
      <text x="400" y="458" textAnchor="middle" fontSize="11" fill="#0f766e">CTE：复杂查询分步拆解</text>
      <text x="400" y="478" textAnchor="middle" fontSize="11" fill="#0f766e">可读性好，可递归，临时生效</text>
      <text x="620" y="458" textAnchor="middle" fontSize="11" fill="#92400e">视图：复用查询逻辑</text>
      <text x="620" y="478" textAnchor="middle" fontSize="11" fill="#92400e">持久化，权限控制，简化接口</text>
    </svg>
  );
}
