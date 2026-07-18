"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第8课 使用函数处理数据",
  focus: "使用文本、日期时间和数值函数，同时管理不可移植性",
  invariant: "函数的参数、返回类型、NULL、时区和精度行为在目标DBMS上可重放",
  artifact: "函数能力表、输入输出样本和跨DBMS等价改写",
  nodes: [
    "8.1 函数",
    "函数带来的问题",
    "8.2 使用函数",
    "8.2.1 文本处理函数",
    "8.2.2 日期和时间处理函数",
    "8.2.3 数值处理函数",
    "8.3 小结",
    "8.4 挑战题",
  ],
};

export function SqtLesson08FunctionsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson08FunctionsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson08FunctionsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
