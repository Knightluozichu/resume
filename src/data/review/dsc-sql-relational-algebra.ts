import type { ReviewQuestion } from "./types";

export const dscSqlRelationalAlgebraQuestions: ReviewQuestion[] = [
  {
    id: "dsc-sql-1",
    chapter: "dsc-sql-relational-algebra",
    level: 1,
    question: "SQL 分为哪三类语言？各有什么作用并举例。",
    answer: "①DDL 数据定义语言：定义和修改表结构，语句 CREATE/ALTER/DROP，如 `CREATE TABLE course(...)`。②DML 数据操作语言：查询和修改数据，语句 SELECT/INSERT/UPDATE/DELETE，如 `SELECT title FROM course WHERE credits>3`。③DCL 数据控制语言：控制访问权限，语句 GRANT/REVOKE，如 `GRANT SELECT ON course TO user`。三者分别对应\"建结构\"\"操作数据\"\"管权限\"。",
    tags: ["SQL分类", "DDL", "DML", "DCL"],
  },
  {
    id: "dsc-sql-2",
    chapter: "dsc-sql-relational-algebra",
    level: 2,
    question: "将 SQL 语句 `SELECT name FROM student WHERE dept_id='CS'` 翻译为关系代数，并说明执行顺序。",
    answer: "关系代数：`π_name( σ_dept_id='CS'(student) )`。执行顺序（从内到外）：①先执行选择 `σ_dept_id='CS'(student)`，从 student 关系中选出 dept_id='CS' 的所有元组（行），得到中间结果；②再执行投影 `π_name(...)`，从中间结果中取 name 列并去重，得到最终结果。这体现了关系代数的封闭性——每步运算结果是关系，可继续参与下一步运算。",
    tags: ["关系代数", "选择", "投影", "翻译", "执行顺序"],
  },
  {
    id: "dsc-sql-3",
    chapter: "dsc-sql-relational-algebra",
    level: 2,
    question: "选择 σ 和投影 π 有什么区别？它们分别对应 SQL 的什么子句？",
    answer: "选择 σ 是\"水平过滤\"——按条件选出满足条件的元组（行），保留行不变列，对应 SQL 的 WHERE 子句。投影 π 是\"垂直过滤\"——选出指定属性（列）并自动去重，保留列不变行数（可能因去重减少），对应 SQL 的 SELECT 列表。区别：σ 作用于行，π 作用于列；σ 用条件筛选，π 用列名选取。两者常组合使用，如 `π_name(σ_c(student))` 表示先选行再选列。",
    tags: ["选择", "投影", "WHERE", "SELECT", "关系代数运算"],
  },
  {
    id: "dsc-sql-4",
    chapter: "dsc-sql-relational-algebra",
    level: 3,
    question: "什么是关系代数的等价规则？为什么它对查询优化很重要？",
    answer: "等价规则指关系代数表达式可以变换为语义相同的不同形式，如选择级联 `σ_c1(σ_c2(R))=σ_c1∧c2(R)`、选择下推 `σ_c(R×S)=σ_c(R)×S`、连接交换 `R⋈S=S⋈R`。重要性：查询优化器把 SQL 翻译成关系代数表达式树后，用等价规则生成所有等价表达式，在其中搜索代价最低的执行计划。核心策略是把选择和投影\"下推\"到树底部（尽早执行），减小中间结果规模，从而降低 IO 和计算代价。没有等价规则，优化器就无法安全地重排查询。",
    tags: ["等价规则", "查询优化", "选择下推", "代数优化"],
  },
];
