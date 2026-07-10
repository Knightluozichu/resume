import type { ReviewQuestion } from "./types";

export const sqtFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "sqt-fr-1",
    chapter: "sqt-final-review",
    level: 4,
    question: `全书SQL能力分为哪五层？每层的核心问题和关键概念是什么？`,
    answer: `五层能力体系：①基础查询——核心问题\"查什么数据\"，关键概念SELECT/FROM/WHERE/DISTINCT/LIMIT、比较/集合/模式匹配/逻辑运算/NULL；②数据处理——核心问题\"怎么排序和算\"，关键概念ORDER BY ASC/DESC、计算字段/拼接/算术/别名、文本/数值/日期/转换函数；③聚合分组——核心问题\"怎么汇总统计\"，关键概念COUNT/SUM/AVG/MAX/MIN、GROUP BY、HAVING、WHERE vs HAVING；④多表关联——核心问题\"怎么查多表\"，关键概念INNER/LEFT/RIGHT JOIN、自联结、标量/列/行/表子查询、EXISTS、UNION/UNION ALL；⑤高级特性——核心问题\"怎么写复杂查询\"，关键概念窗口函数/RANK/LAG/LEAD、CTE/WITH、视图/CREATE VIEW。`,
    tags: ["五层能力", "知识体系", "综合", "全书复习"],
  },
  {
    id: "sqt-fr-2",
    chapter: "sqt-final-review",
    level: 3,
    question: `SELECT的完整执行顺序是什么？给出3个由执行顺序决定的关键规则。`,
    answer: `执行顺序：\`FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT\`。三个关键规则：①WHERE中不能使用SELECT定义的列别名——因为WHERE在SELECT之前执行，别名还未定义。应直接用表达式 \`WHERE price*1.1 > 10\` 而非 \`WHERE new_price > 10\`；②HAVING可以使用聚合函数而WHERE不行——因为HAVING在GROUP BY之后执行，此时分组已完成可以用聚合函数。WHERE在分组前执行，还没有分组结果；③ORDER BY可以使用SELECT定义的列别名——因为ORDER BY在SELECT之后执行，别名已经定义。这些规则的根本原因是理解\"SQL是声明式语言，你写的是要什么，数据库按自己的执行顺序处理\"。`,
    tags: ["执行顺序", "WHERE", "HAVING", "ORDER BY", "核心概念"],
  },
  {
    id: "sqt-fr-3",
    chapter: "sqt-final-review",
    level: 4,
    question: `编写一个复杂SQL：查询2024年每个部门薪资排名前3的员工姓名、薪资和排名。`,
    answer: `\`\`\`sql\nSELECT * FROM (\n  SELECT name, dept, salary,\n    RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank\n  FROM employees\n  WHERE YEAR(hire_date) <= 2024\n) ranked\nWHERE dept_rank <= 3\nORDER BY dept, dept_rank;\n\`\`\`\n分析：①WHERE先过滤出2024年及之前入职的员工；②窗口函数RANK()按dept分组、salary降序排名——PARTITION BY dept实现分组，ORDER BY salary DESC实现组内排序；③外层查询过滤dept_rank <= 3取前三名；④ORDER BY最终排序输出。这个查询综合运用了WHERE过滤、窗口函数排名、子查询（派生表）过滤三个层级的知识，体现了五层能力的综合运用。`,
    tags: ["综合应用", "窗口函数", "RANK", "子查询", "PARTITION BY"],
  },
  {
    id: "sqt-fr-4",
    chapter: "sqt-final-review",
    level: 4,
    question: `什么是\"从行级到组级到表级到窗口级的思维跃迁\"？为什么这个思维跃迁对写SQL很重要？`,
    answer: `思维跃迁四阶段：①行级思维——WHERE过滤单行、函数处理单行数据、计算字段做行内计算。关注点：\"这一行应该怎样\"；②组级思维——GROUP BY将行分组、聚合函数将多行汇总为一行、HAVING过滤组。关注点：\"这一组应该怎样\"，理解了\"多行变一行\"；③表级思维——JOIN将多张表的行关联、子查询嵌套查询、UNION合并结果。关注点：\"多张表的数据如何组合\"，理解了\"多表变一表\"；④窗口级思维——窗口函数在不减少行数的前提下做跨行计算、CTE分步拆解。关注点：\"行与行之间的关系\"，理解了\"保留明细同时做聚合\"。重要性：每一次思维跃迁都打开了新的查询能力维度。不理解组级思维就写不了统计报表，不理解表级思维就处理不了关系型数据，不理解窗口级思维就做不了排名/累计/对比分析。`,
    tags: ["思维跃迁", "行级", "组级", "表级", "窗口级", "综合"],
  },
];
