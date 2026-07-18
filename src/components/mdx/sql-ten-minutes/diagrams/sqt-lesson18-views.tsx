"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第18课 使用视图",
  focus: "用视图封装联结、格式化、过滤和计算字段",
  invariant: "视图列语义稳定、底层依赖可追踪、过滤和更新限制在目标DBMS上明确",
  artifact: "视图定义、依赖表、权限边界和结果一致性检查",
  nodes: [
    "18.1 视图",
    "18.1.1 为什么使用视图",
    "18.1.2 视图的规则和限制",
    "18.2 创建视图",
    "18.2.1 利用视图简化复杂的联结",
    "18.2.2 用视图重新格式化检索出的数据",
    "18.2.3 用视图过滤不想要的数据",
    "18.2.4 使用视图与计算字段",
    "18.3 小结",
    "18.4 挑战题",
  ],
};

export function SqtLesson18ViewsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson18ViewsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson18ViewsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
