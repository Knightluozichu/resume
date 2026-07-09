import type { ReviewQuestion } from "./types";

export const mseSqlFundamentalsQuestions: ReviewQuestion[] = [
  {
    id: "mse-sql-1",
    chapter: "mse-sql-fundamentals",
    level: 1,
    question: "SQL语言分为哪四大类？每类包含哪些核心语句？",
    answer: "SQL四大分类：①DDL（数据定义语言）——CREATE创建、ALTER修改、DROP删除、TRUNCATE清空，操作数据库/表/视图/索引的结构；②DML（数据操作语言）——INSERT插入、UPDATE更新、DELETE删除、REPLACE替换，操作表中的数据行；③DQL（数据查询语言）——SELECT查询、FROM指定表、WHERE条件、GROUP BY分组、HAVING过滤、ORDER BY排序、LIMIT限制，用于数据检索；④DCL（数据控制语言）——GRANT授权、REVOKE撤销权限、COMMIT提交事务、ROLLBACK回滚事务，控制权限和事务。其中DQL在实际中常被归入DML的查询子集，但教学上常独立分类。",
    tags: ["SQL分类", "DDL", "DML", "DQL", "DCL"],
  },
  {
    id: "mse-sql-2",
    chapter: "mse-sql-fundamentals",
    level: 2,
    question: "SELECT语句的书写顺序和实际执行顺序分别是什么？为什么这个区别很重要？",
    answer: "书写顺序：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT。实际执行顺序：FROM（确定数据源）→ ON（JOIN条件）→ JOIN（连接表）→ WHERE（过滤行）→ GROUP BY（分组）→ HAVING（过滤分组）→ SELECT（选择列/计算聚合）→ DISTINCT（去重）→ ORDER BY（排序）→ LIMIT（限制行数）。重要性：①WHERE在GROUP BY之前执行，不能用聚合函数（如WHERE COUNT(*)>1是错的，要用HAVING）；②SELECT在GROUP BY之后执行，所以WHERE不能引用SELECT中的别名（某些数据库支持但MySQL不保证）；③ORDER BY在SELECT之后，可以用列别名；④理解执行顺序才能正确写复杂查询和优化SQL。",
    tags: ["执行顺序", "SELECT", "WHERE", "HAVING", "GROUP BY"],
  },
  {
    id: "mse-sql-3",
    chapter: "mse-sql-fundamentals",
    level: 3,
    question: "WHERE和HAVING有什么区别？请用一个查询示例说明：查询平均薪资大于10000的部门。",
    answer: "区别：①执行时机不同——WHERE在分组前过滤行（FROM之后GROUP BY之前），HAVING在分组后过滤组（GROUP BY之后）；②WHERE不能使用聚合函数（COUNT/SUM/AVG等），HAVING可以；③WHERE过滤的是单行数据，HAVING过滤的是分组结果。查询示例：\nSELECT dept, AVG(salary) as avg_salary\nFROM employees\nWHERE status = 'active'  -- 先过滤掉非活跃员工\nGROUP BY dept\nHAVING AVG(salary) > 10000  -- 再过滤平均薪资不够的部门\nORDER BY avg_salary DESC;\n这里WHERE先排除非活跃员工（分组前），HAVING再筛选平均薪资>10000的部门（分组后）。如果只用WHERE写AVG(salary)>10000会报错。",
    tags: ["WHERE", "HAVING", "聚合函数", "GROUP BY", "实践"],
  },
  {
    id: "mse-sql-4",
    chapter: "mse-sql-fundamentals",
    level: 2,
    question: "COUNT(*)、COUNT(列名)和COUNT(DISTINCT 列名)有什么区别？哪种性能最好？",
    answer: "区别：①COUNT(*)——统计总行数，包括NULL行，不关心任何列，InnoDB专门优化过（遍历最小索引），性能最好；②COUNT(列名)——统计该列非NULL值的数量，会跳过NULL行；③COUNT(DISTINCT 列名)——统计该列去重后的非NULL值数量，需要去重排序，性能最差。性能排序：COUNT(*) >= COUNT(1) > COUNT(列名) > COUNT(DISTINCT 列名)。注意：COUNT(1)和COUNT(*)在InnoDB中性能等价（优化器处理）。MySQL对COUNT(*)的优化：InnoDB不会扫描全表，而是选择最小的索引扫描（二级索引比聚簇索引页少）。建议：统计总行数用COUNT(*)，统计某列非空数量用COUNT(列名)，避免在大表上用COUNT(DISTINCT)。",
    tags: ["COUNT", "聚合函数", "NULL", "性能"],
  },
];
