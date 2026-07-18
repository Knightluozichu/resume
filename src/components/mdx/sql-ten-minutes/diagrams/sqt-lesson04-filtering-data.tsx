"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第4课 过滤数据",
  focus: "用WHERE、比较、范围和空值判断定义目标行集",
  invariant: "过滤谓词对等值、不等值、范围端点和NULL分别给出可预测结果",
  artifact: "谓词真值表、边界数据集和NULL反例",
  nodes: [
    "4.1 使用WHERE子句",
    "4.2 WHERE子句操作符",
    "4.2.1 检查单个值",
    "4.2.2 不匹配检查",
    "4.2.3 范围值检查",
    "4.2.4 空值检查",
    "4.3 小结",
    "4.4 挑战题",
  ],
};

export function SqtLesson04FilteringDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson04FilteringDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson04FilteringDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
