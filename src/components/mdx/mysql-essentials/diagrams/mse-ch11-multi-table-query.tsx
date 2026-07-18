"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第11章 多表查询",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "依据关系基数选择连接或子查询，并防止行数意外膨胀",
  invariant: "连接条件完整，结果行数与一对一、一对多或多对多基数预测一致",
  artifact: "连接图、基数估算、结果对照和执行计划",
  nodes: [
    "11.1 多表关系与连接条件",
    "11.2 交叉连接",
    "11.3 内连接",
    "11.4 左外连接与右外连接",
    "11.5 自连接",
    "11.6 多表连续连接",
    "11.7 标量和列子查询",
    "11.8 IN与EXISTS子查询",
    "11.9 相关子查询",
    "11.10 派生表",
    "11.11 连接与子查询的选择",
    "11.12 行数膨胀诊断",
    "11.13 本章验证清单",
  ],
};

export function MseCh11MultiTableQueryModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh11MultiTableQueryExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh11MultiTableQueryEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
