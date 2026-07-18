"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第22课 高级SQL特性",
  focus: "用约束、索引、触发器和数据库安全收束数据完整性与访问边界",
  invariant:
    "非法数据被约束拒绝，索引服务于已知查询，触发器副作用可追踪，权限遵循最小化",
  artifact: "约束矩阵、索引验证、触发器副作用表和最小权限清单",
  nodes: [
    "22.1 约束",
    "22.1.1 主键",
    "22.1.2 外键",
    "22.1.3 唯一约束",
    "22.1.4 检查约束",
    "22.2 索引",
    "22.3 触发器",
    "22.4 数据库安全",
    "22.5 小结",
  ],
};

export function SqtLesson22AdvancedFeaturesQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson22AdvancedFeaturesDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson22AdvancedFeaturesEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
