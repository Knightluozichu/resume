"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第12课 联结表",
  focus: "从关系表和键出发建立正确的内联结与多表联结",
  invariant: "每条联结谓词对应真实关系，结果行数与一对一或一对多基数预测一致",
  artifact: "联结图、基数预测、笛卡尔积反例和结果对账",
  nodes: [
    "12.1 联结",
    "12.1.1 关系表",
    "12.1.2 为什么使用联结",
    "12.2 创建联结",
    "12.2.1 WHERE子句的重要性",
    "12.2.2 内联结",
    "12.2.3 联结多个表",
    "12.3 小结",
    "12.4 挑战题",
  ],
};

export function SqtLesson12JoiningTablesQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson12JoiningTablesDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson12JoiningTablesEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
