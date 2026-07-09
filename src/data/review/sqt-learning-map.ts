import type { ReviewQuestion } from "./types";

export const sqtLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "sqt-lm-1",
    chapter: "sqt-learning-map",
    level: 1,
    question: "《SQL必知必会》全书分为哪几个篇章？各自的核心内容是什么？",
    answer: "全书分三个篇章：基础篇——学习地图（知识体系）、SQL基础与SELECT（数据库概念/SELECT/FROM/WHERE）、数据过滤（WHERE/比较/集合/模式匹配）；进阶篇——排序与计算字段（ORDER BY/计算字段/别名）、函数与数据处理（文本/数值/日期/转换）、聚合与分组（COUNT/SUM/AVG/GROUP BY/HAVING）；高级篇——联结查询（INNER/LEFT/RIGHT JOIN）、子查询与组合查询（标量/列/表子查询/UNION）、高级SQL（窗口函数/CTE/视图）、全书复习。递进逻辑：从会查到会算到会连到会写复杂查询。",
    tags: ["知识体系", "三篇递进", "学习路径"],
  },
  {
    id: "sqt-lm-2",
    chapter: "sqt-learning-map",
    level: 2,
    question: "贯穿全书的两条核心主线是什么？它们在哪些章节交汇？",
    answer: "主线一数据检索能力：SELECT → WHERE → ORDER BY → 函数 → 聚合 → 联结 → 子查询 → 窗口函数，解决"如何查到想要的数据"。主线二数据处理思维：行级（WHERE）→ 组级（GROUP BY）→ 表级（JOIN）→ 窗口级（窗口函数），解决"如何用正确思维组织查询"。两条主线在"聚合+窗口函数"（聚合章与高级SQL章）与"联结+子查询"（联结章与子查询章）交汇——聚合函数可嵌入子查询，窗口函数可在联结结果上运算。",
    tags: ["两条主线", "跨章节关联", "数据检索", "处理思维"],
  },
  {
    id: "sqt-lm-3",
    chapter: "sqt-learning-map",
    level: 2,
    question: "为什么学习SQL要遵循"会查→会算→会连→会写复杂查询"的顺序？",
    answer: "顺序依据：会查——建立SQL基本手感，理解数据如何检索（SELECT/WHERE）；会算——掌握排序、函数和聚合，在查询基础上做计算（ORDER BY/函数/GROUP BY）；会连——理解多表关系，掌握JOIN和子查询；会写复杂查询——综合运用窗口函数、CTE和视图解决实际问题。跳过基础的风险：①不理解WHERE和执行顺序，写出的查询结果不对；②不掌握聚合和分组，无法做多表统计；③不理解JOIN，无法处理关系型数据。每一步都是下一步的前提。",
    tags: ["学习路径", "能力递进", "SQL基础"],
  },
  {
    id: "sqt-lm-4",
    chapter: "sqt-learning-map",
    level: 1,
    question: "SQL语句的书写顺序和执行顺序有什么区别？为什么这个区别很重要？",
    answer: "书写顺序：SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT。执行顺序：FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT。区别的核心在于SELECT在执行时排在WHERE和GROUP BY之后。重要性：①WHERE中不能用SELECT定义的别名（WHERE先执行）；②HAVING在GROUP BY之后执行所以可以用聚合函数，WHERE不行；③ORDER BY可以用SELECT定义的别名（最后执行）；④理解执行顺序才能正确排查查询逻辑错误。",
    tags: ["执行顺序", "书写顺序", "核心概念"],
  },
];
