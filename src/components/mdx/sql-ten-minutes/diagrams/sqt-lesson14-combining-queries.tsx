"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第14课 组合查询",
  focus: "用UNION与UNION ALL组合列兼容的查询并统一排序",
  invariant: "每个分支列数和类型兼容，去重选择明确，ORDER BY作用于完整组合结果",
  artifact: "分支结果表、去重成本对照和组合结果合同",
  nodes: [
    "14.1 组合查询",
    "14.2 创建组合查询",
    "14.2.1 使用UNION",
    "14.2.2 UNION规则",
    "14.2.3 包含或取消重复的行",
    "14.2.4 对组合查询结果排序",
    "14.3 小结",
    "14.4 挑战题",
  ],
};

export function SqtLesson14CombiningQueriesQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson14CombiningQueriesDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson14CombiningQueriesEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
