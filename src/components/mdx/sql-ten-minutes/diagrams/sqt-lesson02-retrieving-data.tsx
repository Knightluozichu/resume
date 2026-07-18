"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第2课 检索数据",
  focus: "用SELECT精确声明目标列、去重、限制结果和注释",
  invariant:
    "结果列由投影显式确定，DISTINCT作用于完整行，限制语法不改变查询含义",
  artifact: "SELECT结果合同、列投影对照和限制语法方言表",
  nodes: [
    "2.1 SELECT语句",
    "2.2 检索单个列",
    "2.3 检索多个列",
    "2.4 检索所有列",
    "2.5 检索不同的值",
    "2.6 限制结果",
    "2.7 使用注释",
    "2.8 小结",
    "2.9 挑战题",
  ],
};

export function SqtLesson02RetrievingDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson02RetrievingDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson02RetrievingDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
