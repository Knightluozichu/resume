import type { ReviewQuestion } from "./types";

export const dscDatabaseDesignQuestions: ReviewQuestion[] = [
  {
    id: "dsc-dd-1",
    chapter: "dsc-database-design",
    level: 1,
    question: "ER 模型有哪三要素？联系基数有哪几种？举例说明。",
    answer: "三要素：实体（矩形，独立存在的对象，如学生）、属性（椭圆，实体的特征，如姓名）、联系（菱形，实体间的关联，如选修）。联系基数三种：①1:1 一对一，如一个部门有一个经理；②1:N 一对多，如一个系有多个学生；③M:N 多对多，如一个学生选多门课、一门课有多个学生。弱实体依赖强实体存在，无独立主码，如家属依赖员工。",
    tags: ["ER模型", "实体", "属性", "联系", "基数"],
  },
  {
    id: "dsc-dd-2",
    chapter: "dsc-database-design",
    level: 2,
    question: "说明 M:N 联系如何转换为关系模式，并解释主码为什么是两端主码的组合。",
    answer: "M:N 联系转换方式：新建一个关系，包含两端实体的主码作为外码，加上联系自身的属性，主码为两端主码的组合。例如学生(M)选修(N)课程，新建 `takes(student_id, course_id, grade)`，主码 = (student_id, course_id)。主码是组合的原因：单独 student_id 不能唯一标识一条记录（一个学生选多门课），单独 course_id 也不能（一门课有多个学生），只有 (student_id, course_id) 组合才能唯一标识\"某学生选某门课的成绩\"这条记录。",
    tags: ["ER转换", "M:N联系", "关系模式", "主码"],
  },
  {
    id: "dsc-dd-3",
    chapter: "dsc-database-design",
    level: 2,
    question: "什么是部分依赖和传递依赖？它们分别违反哪个范式？",
    answer: "部分依赖：非主属性对主码的部分依赖，即主码的真子集就能决定该非主属性。例如关系 `sc(sid, cid, sname)` 主码是 (sid, cid)，但 sid→sname（sid 是主码的真子集），sname 部分依赖主码，违反 2NF。传递依赖：非主属性对主码的传递依赖，即 X→Y→Z 且 Y 不能决定 X。例如 `student(sid, dept_id, dept_name)` 中 sid→dept_id→dept_name，dept_name 传递依赖 sid，违反 3NF。2NF 消除部分依赖，3NF 消除传递依赖。",
    tags: ["函数依赖", "部分依赖", "传递依赖", "2NF", "3NF"],
  },
  {
    id: "dsc-dd-4",
    chapter: "dsc-database-design",
    level: 3,
    question: "不规范的设计会产生哪些异常？规范化如何解决？反范式在什么情况下适用？",
    answer: "三类异常：①插入异常——缺主码值无法插入（如新生未选课无法录入信息）；②更新异常——冗余导致改一处需改多处，漏改则不一致；③删除异常——删一行丢失其他信息（如删掉唯一选课的学生丢失课程信息）。规范化通过拆分关系消除不良函数依赖（部分依赖、传递依赖），使每个关系只描述一个主题，从而消除冗余和异常。反范式在\"读多写少\"且对查询性能要求高的场景适用——适度冗余列减少连接（空间换时间），但需额外维护一致性（触发器/应用层同步），权衡一致性与性能。",
    tags: ["设计异常", "插入异常", "更新异常", "删除异常", "规范化", "反范式"],
  },
];
