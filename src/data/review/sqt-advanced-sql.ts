import type { ReviewQuestion } from "./types";

export const sqtAdvancedSqlQuestions: ReviewQuestion[] = [
  {
    id: "sqt-adv-1",
    chapter: "sqt-advanced-sql",
    level: 3,
    question: "窗口函数和GROUP BY有什么本质区别？什么时候应该用窗口函数？",
    answer: "本质区别：GROUP BY将多行合并为一行（行数减少），窗口函数在保留每一行的同时进行聚合计算（行数不变）。用窗口函数的场景：①排名——每个部门内按薪资排名（RANK/DENSE_RANK/ROW_NUMBER）；②累计计算——累计求和/移动平均；③前后行对比——查看前一行/后一行的值（LAG/LEAD）；④占比计算——每行占总和的百分比。核心判断：需要\"既看到明细行又看到聚合值\"时用窗口函数，只需要汇总值时用GROUP BY。",
    tags: ["窗口函数", "GROUP BY", "区别", "核心概念"],
  },
  {
    id: "sqt-adv-2",
    chapter: "sqt-advanced-sql",
    level: 2,
    question: "RANK、DENSE_RANK和ROW_NUMBER有什么区别？给出具体例子。",
    answer: "假设有3个薪资为10000的行和1个薪资为8000的行（按薪资降序排）：①RANK——并列名次跳号，3个10000并列第1名，8000是第4名（1, 1, 1, 4）；②DENSE_RANK——并列名次不跳号，3个10000并列第1名，8000是第2名（1, 1, 1, 2）；③ROW_NUMBER——不并列，连续编号（1, 2, 3, 4），即使值相同也给不同编号。选择：需要真实排名（允许跳号）用RANK，需要紧凑排名用DENSE_RANK，需要唯一编号用ROW_NUMBER。",
    tags: ["RANK", "DENSE_RANK", "ROW_NUMBER", "排名", "窗口函数"],
  },
  {
    id: "sqt-adv-3",
    chapter: "sqt-advanced-sql",
    level: 3,
    question: "CTE的核心优势是什么？与子查询和视图相比有什么不同？",
    answer: "CTE核心优势：①可读性——给子查询起名字，逻辑分步，像写文章一样写SQL；②可复用——同一CTE可在主查询中多次引用；③可递归——递归CTE可处理树形/图结构数据。与子查询相比：CTE可读性更好、可被多次引用（子查询只能用一次）。与视图相比：CTE是临时的（只在当前查询有效），视图是持久化的（存储在数据库中）；CTE不需要CREATE权限，视图需要。选择依据：复杂查询一次性使用用CTE，需要反复复用的查询逻辑用视图。",
    tags: ["CTE", "子查询", "视图", "对比"],
  },
  {
    id: "sqt-adv-4",
    chapter: "sqt-advanced-sql",
    level: 2,
    question: "视图是什么？它有哪些用途和限制？",
    answer: "视图是基于SQL查询创建的虚拟表，不实际存储数据，每次查询时动态执行底层SQL。用途：①简化复杂查询——将多表JOIN和子查询封装为视图，使用者只需 `SELECT * FROM 视图名`；②数据安全——只暴露视图给用户，隐藏底层表结构和敏感列；③统一接口——为应用提供稳定的数据访问层，底层表结构变化时只需改视图。限制：①不存储数据，每次查询都执行底层SQL，复杂视图可能性能差；②含JOIN、聚合、DISTINCT、子查询的视图通常不可更新（不能INSERT/UPDATE/DELETE）；③视图嵌套视图时性能和可维护性会下降；④需要CREATE VIEW权限。",
    tags: ["视图", "VIEW", "虚拟表", "用途", "限制"],
  },
];
