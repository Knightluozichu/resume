"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第10课 分组数据",
  focus: "用GROUP BY和HAVING建立分组粒度并理解SELECT子句顺序",
  invariant: "结果每行对应一个明确定义的组，非聚集列属于分组键，组过滤口径正确",
  artifact: "分组粒度说明、HAVING对照和子句执行流程",
  nodes: [
    "10.1 数据分组",
    "10.2 创建分组",
    "10.3 过滤分组",
    "10.4 分组和排序",
    "10.5 SELECT子句顺序",
    "10.6 小结",
    "10.7 挑战题",
  ],
};

export function SqtLesson10GroupingDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson10GroupingDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson10GroupingDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
