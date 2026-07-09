import type { ReviewQuestion } from "./types";

export const sqtSqlBasicsQuestions: ReviewQuestion[] = [
  {
    id: "sqt-sb-1",
    chapter: "sqt-sql-basics",
    level: 2,
    question: "SQL语句的书写顺序和执行顺序分别是什么？为什么这个区别很重要？",
    answer: "书写顺序：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT。执行顺序：FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT。区别的核心在于SELECT在执行时排在WHERE和GROUP BY之后。重要性：①WHERE中不能用SELECT定义的别名（WHERE先执行）；②HAVING可以用聚合函数而WHERE不行（HAVING在GROUP BY之后）；③ORDER BY可以用SELECT定义的别名（最后执行）；④理解执行顺序才能正确排查查询逻辑错误。",
    tags: ["执行顺序", "书写顺序", "SELECT", "核心概念"],
  },
  {
    id: "sqt-sb-2",
    chapter: "sqt-sql-basics",
    level: 1,
    question: "`SELECT *` 在生产环境中为什么不被推荐？应该怎么写？",
    answer: "`SELECT *` 不被推荐的原因：①浪费带宽和内存——传输了不需要的列；②表结构变化时可能破坏应用——新增列导致结果集结构变化；③无法利用覆盖索引——查询所有列必然需要回表。正确做法是明确指定需要的列名，如 `SELECT prod_name, prod_price FROM products`，这样更安全、更高效、更可读。",
    tags: ["SELECT", "最佳实践", "性能"],
  },
  {
    id: "sqt-sb-3",
    chapter: "sqt-sql-basics",
    level: 1,
    question: "什么是主键？它有哪些特性？为什么关系型数据库需要主键？",
    answer: "主键是表中唯一标识每一行的列（或列组合），具有两个核心特性：①唯一性——每行的主键值不重复；②非空性——主键不能为NULL。关系型数据库需要主键的原因：①确保数据的唯一性——通过主键可以精确定位每一行；②建立表间关系——外键引用的就是另一张表的主键；③提高查询效率——主键自动创建索引，主键查询速度最快；④保证数据完整性——防止插入重复或空值记录。",
    tags: ["主键", "数据库概念", "关系型数据库"],
  },
  {
    id: "sqt-sb-4",
    chapter: "sqt-sql-basics",
    level: 1,
    question: "SQL语言分为哪四大类？《SQL必知必会》主要聚焦哪一类？",
    answer: "SQL四大分类：①DQL（数据查询语言）——SELECT语句，用于检索数据；②DML（数据操作语言）——INSERT/UPDATE/DELETE，用于修改数据；③DDL（数据定义语言）——CREATE/ALTER/DROP，用于定义和修改表结构；④DCL（数据控制语言）——GRANT/REVOKE，用于管理权限。《SQL必知必会》主要聚焦DQL，以SELECT语句为核心，系统讲解数据检索的各种技巧，DML/DDL/DCL作为补充知识。",
    tags: ["SQL分类", "DQL", "DML", "DDL", "DCL"],
  },
];
