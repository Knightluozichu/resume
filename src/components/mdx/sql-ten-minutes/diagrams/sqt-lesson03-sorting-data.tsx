"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第3课 排序检索数据",
  focus: "用ORDER BY建立单列、多列、位置和方向明确的确定性顺序",
  invariant: "顺序仅由ORDER BY保证；并列行必须用额外唯一键打破平局",
  artifact: "排序键表、并列值样本和稳定分页验证",
  nodes: [
    "3.1 排序数据",
    "3.2 按多个列排序",
    "3.3 按列位置排序",
    "3.4 指定排序方向",
    "3.5 小结",
    "3.6 挑战题",
  ],
};

export function SqtLesson03SortingDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson03SortingDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson03SortingDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
