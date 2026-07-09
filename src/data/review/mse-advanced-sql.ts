import type { ReviewQuestion } from "./types";

export const mseAdvancedSqlQuestions: ReviewQuestion[] = [
  {
    id: "mse-asql-1",
    chapter: "mse-advanced-sql",
    level: 2,
    question: "INNER JOIN、LEFT JOIN、RIGHT JOIN、FULL JOIN的区别是什么？",
    answer: "①INNER JOIN（内连接）——只返回两表中满足连接条件的交集行，不匹配的行被丢弃；②LEFT JOIN（左连接）——返回左表所有行，右表无匹配则右表字段为NULL；③RIGHT JOIN（右连接）——返回右表所有行，左表无匹配则左表字段为NULL；④FULL JOIN（全外连接）——返回两表所有行，无匹配的另一侧为NULL。MySQL不直接支持FULL JOIN，需用LEFT JOIN UNION RIGHT JOIN模拟。选择原则：需要两表都有的数据用INNER JOIN；需要保留某侧全部数据（如查所有用户包括没下单的）用LEFT JOIN。ON指定连接条件，WHERE在连接后过滤（LEFT JOIN中WHERE过滤右表NULL会将外连接退化为内连接，需用AND ON替代）。",
    tags: ["JOIN", "INNER JOIN", "LEFT JOIN", "连接查询"],
  },
  {
    id: "mse-asql-2",
    chapter: "mse-advanced-sql",
    level: 3,
    question: "什么是子查询？按返回结果和位置各如何分类？IN和EXISTS在子查询中有什么性能差异？",
    answer: "子查询是嵌套在另一个查询中的SELECT语句。按返回结果分：标量子查询（返回单行单列，可用在SELECT/WHERE中）、行子查询（返回单行多列）、列子查询（返回单列多行，搭配IN/ANY/ALL）、表子查询（返回多行多列，用在FROM中称派生表）。按位置分：SELECT子句（标量子查询）、FROM子句（派生表/内联视图）、WHERE/HAVING子句（条件子查询）。IN vs EXISTS：IN先执行子查询得到结果集，再对外表逐行检查是否在集合中——适合子查询结果集小、外表大的场景；EXISTS对外表逐行执行子查询检查是否返回行——适合外表小、子查询结果集大的场景。一般原则：小表驱动大表，外表小用IN，内表小用EXISTS。MySQL 5.6+优化器会自动改写，差异缩小。",
    tags: ["子查询", "IN", "EXISTS", "标量子查询", "派生表"],
  },
  {
    id: "mse-asql-3",
    chapter: "mse-advanced-sql",
    level: 3,
    question: "请写出使用窗口函数的SQL：查询每个部门按薪资降序排名的员工，显示排名和部门薪资合计。RANK、DENSE_RANK、ROW_NUMBER有什么区别？",
    answer: "SELECT name, dept, salary,\n  RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk,\n  DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dense_rnk,\n  ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn,\n  SUM(salary) OVER (PARTITION BY dept) AS dept_total\nFROM employees;\n三者区别（以薪资 8000,8000,7000 为例）：①RANK——并列第一给1，第三给3（跳号：1,1,3）；②DENSE_RANK——并列第一给1，第三给2（不跳号：1,1,2）；③ROW_NUMBER——不给并列，连续编号（1,2,3）。选择：需要真实排名（如竞赛）用RANK，需要连续名次用DENSE_RANK，需要唯一序号用ROW_NUMBER。窗口函数OVER(PARTITION BY...ORDER BY...)在不减少行数的情况下分组计算，比GROUP BY更灵活。",
    tags: ["窗口函数", "RANK", "DENSE_RANK", "ROW_NUMBER", "实践"],
  },
  {
    id: "mse-asql-4",
    chapter: "mse-advanced-sql",
    level: 2,
    question: "UNION和UNION ALL的区别是什么？在什么场景下应该用哪个？",
    answer: "UNION——合并两个查询结果集并去重（内部做DISTINCT），需要排序去重，性能较差。UNION ALL——合并两个查询结果集不去重，直接拼接，性能好。区别本质：UNION = UNION ALL + DISTINCT。使用原则：①确定两个结果集无重复数据时优先用UNION ALL（省去去重排序开销）；②需要去重时用UNION（但大结果集去重耗内存）；③UNION/UNION ALL要求两个查询的列数相同、对应列类型兼容、列顺序一致（结果集列名取第一个查询的）。常见场景：合并多表同类数据（如合并多个部门员工表），跨时间维度合并数据。生产环境默认用UNION ALL，需去重再改UNION。",
    tags: ["UNION", "UNION ALL", "去重", "结果集合并"],
  },
];
