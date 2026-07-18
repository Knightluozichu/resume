"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第13课 创建高级联结",
  focus: "使用表别名、自联结、自然联结、外联结和聚集联结",
  invariant: "外联结保留侧明确，自联结角色别名清楚，聚集前后的行数变化可解释",
  artifact: "联结类型矩阵、保留侧样本和重复计数检查",
  nodes: [
    "13.1 使用表别名",
    "13.2 使用不同类型的联结",
    "13.2.1 自联结",
    "13.2.2 自然联结",
    "13.2.3 外联结",
    "13.3 使用带聚集函数的联结",
    "13.4 使用联结和联结条件",
    "13.5 小结",
    "13.6 挑战题",
  ],
};

export function SqtLesson13AdvancedJoinsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson13AdvancedJoinsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson13AdvancedJoinsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
