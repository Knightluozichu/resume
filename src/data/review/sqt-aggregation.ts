import type { ReviewQuestion } from "./types";

export const sqtAggregationQuestions: ReviewQuestion[] = [
  {
    id: "sqt-agg-1",
    chapter: "sqt-aggregation",
    level: 2,
    question: "`COUNT(*)` 和 `COUNT(列名)` 有什么区别？在什么场景下应该用哪个？",
    answer: "`COUNT(*)` 统计所有行，包括含NULL值的行；`COUNT(列名)` 只统计该列非NULL的行数。使用场景：①统计总行数（不管任何列是否有NULL）用 `COUNT(*)`；②统计某列有值的行数用 `COUNT(列名)`；③统计某列有多少个不同的值用 `COUNT(DISTINCT 列名)`。例如 `SELECT COUNT(*) FROM users` 统计总用户数，`SELECT COUNT(email) FROM users` 统计有邮箱的用户数，`SELECT COUNT(DISTINCT dept) FROM employees` 统计部门数。",
    tags: ["COUNT", "聚合函数", "NULL", "核心概念"],
  },
  {
    id: "sqt-agg-2",
    chapter: "sqt-aggregation",
    level: 2,
    question: "WHERE和HAVING有什么区别？它们在执行流程中的位置分别是什么？",
    answer: "三个核心区别：①过滤对象——WHERE过滤行（原始数据），HAVING过滤组（分组后的结果）；②聚合函数——WHERE不能使用聚合函数，HAVING可以（如HAVING COUNT(*) > 5）；③执行位置——WHERE在GROUP BY之前执行，HAVING在GROUP BY之后执行。执行流程：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY。典型用法：WHERE先过滤不需要的行，GROUP BY分组，HAVING再过滤不符合条件的组。例如 `WHERE price >= 4 GROUP BY vend_id HAVING COUNT(*) >= 2`。",
    tags: ["WHERE", "HAVING", "GROUP BY", "执行顺序"],
  },
  {
    id: "sqt-agg-3",
    chapter: "sqt-aggregation",
    level: 3,
    question: "SELECT中的非聚合列为什么必须出现在GROUP BY中？",
    answer: "因为GROUP BY将多行分组为一行，对于非聚合列，每组有多行的值，数据库不知道该显示哪个值。例如 `SELECT vend_id, prod_name, COUNT(*) FROM products GROUP BY vend_id` 中，一个vend_id可能对应多行不同的prod_name，数据库无法决定显示哪个prod_name。规则：SELECT中不在聚合函数中的列必须出现在GROUP BY中，这样每组内该列的值是相同的（因为按它分组的），可以安全显示。MySQL旧版本（only_full_group_by=OFF）会随机选一个值，但这不规范且可能导致错误结果。",
    tags: ["GROUP BY", "聚合列", "SQL规则", "核心概念"],
  },
  {
    id: "sqt-agg-4",
    chapter: "sqt-aggregation",
    level: 3,
    question: "聚合函数如何处理NULL值？如果需要把NULL当作0参与计算怎么做？",
    answer: "除COUNT(*)外，所有聚合函数（COUNT(列名)、SUM、AVG、MAX、MIN）都自动忽略NULL值。影响：①AVG——NULL不计入分母，`AVG(col)` 只对非NULL值求平均，如果3行中有1行NULL，AVG是另外2行的平均值（除以2不是3）；②COUNT(列名)——NULL行不计入计数；③SUM——NULL行被忽略，不影响总和。如果需要把NULL当作0参与计算：用 `AVG(COALESCE(col, 0))` 或 `SUM(COALESCE(col, 0))`，COALESCE将NULL替换为0，这样NULL行也会被纳入计算。注意COUNT(*)仍然统计所有行，不忽略NULL。",
    tags: ["聚合函数", "NULL", "COALESCE", "AVG"],
  },
];
