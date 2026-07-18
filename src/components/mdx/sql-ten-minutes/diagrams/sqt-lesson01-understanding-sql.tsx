"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第1课 了解SQL",
  focus: "以数据库、表、列、数据类型、行和主键建立关系数据的最小词汇",
  invariant:
    "每行可由稳定主键识别，列值服从数据类型，所有SQL都指向已确认的数据库对象",
  artifact: "样例库对象字典、主键检查和跨DBMS环境卡",
  nodes: [
    "1.1 数据库基础",
    "1.1.1 数据库",
    "1.1.2 表",
    "1.1.3 列和数据类型",
    "1.1.4 行",
    "1.1.5 主键",
    "1.2 什么是SQL",
    "1.3 动手实践",
    "1.4 小结",
  ],
};

export function SqtLesson01UnderstandingSqlQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson01UnderstandingSqlDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson01UnderstandingSqlEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
