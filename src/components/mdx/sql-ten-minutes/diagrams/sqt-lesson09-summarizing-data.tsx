"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第9课 汇总数据",
  focus: "用AVG、COUNT、MAX、MIN、SUM和DISTINCT建立汇总口径",
  invariant: "每个聚集函数的分母、NULL处理和DISTINCT范围均被明确",
  artifact: "聚集口径表、NULL样本和多指标对账",
  nodes: [
    "9.1 聚集函数",
    "9.1.1 AVG函数",
    "9.1.2 COUNT函数",
    "9.1.3 MAX函数",
    "9.1.4 MIN函数",
    "9.1.5 SUM函数",
    "9.2 聚集不同值",
    "9.3 组合聚集函数",
    "9.4 小结",
    "9.5 挑战题",
  ],
};

export function SqtLesson09SummarizingDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson09SummarizingDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson09SummarizingDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
