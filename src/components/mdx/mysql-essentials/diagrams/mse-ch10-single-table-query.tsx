"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第10章 单表查询",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "从投影、筛选、分组、排序到分页构造结果确定的单表查询",
  invariant: "结果列、行集、分组口径和顺序都由SQL显式定义，NULL语义被单独验证",
  artifact: "查询用例、结果基线、执行计划和边界数据集",
  nodes: [
    "10.1 SELECT基本语法",
    "10.2 字段、别名与去重",
    "10.3 WHERE条件筛选",
    "10.4 范围、集合与模式匹配",
    "10.5 NULL值判断",
    "10.6 ORDER BY排序",
    "10.7 LIMIT分页",
    "10.8 聚合函数",
    "10.9 GROUP BY分组",
    "10.10 HAVING组过滤",
    "10.11 查询执行顺序",
    "10.12 本章验证清单",
  ],
};

export function MseCh10SingleTableQueryModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh10SingleTableQueryExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh10SingleTableQueryEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
