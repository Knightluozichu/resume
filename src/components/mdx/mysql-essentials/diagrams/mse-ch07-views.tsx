"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第7章 操作视图",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "用视图封装稳定查询边界，同时明确可更新性与安全限制",
  invariant: "视图列语义稳定、底层依赖可追踪，更新行为和权限不超出设计",
  artifact: "视图定义、依赖关系、权限矩阵和一致性检查",
  nodes: [
    "7.1 视图的概念与用途",
    "7.2 创建视图",
    "7.3 查看视图定义",
    "7.4 修改与替换视图",
    "7.5 删除视图",
    "7.6 MERGE与TEMPTABLE算法",
    "7.7 可更新视图的条件",
    "7.8 WITH CHECK OPTION",
    "7.9 SQL SECURITY定义者与调用者",
    "7.10 视图依赖和迁移",
    "7.11 本章验证清单",
  ],
};

export function MseCh07ViewsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh07ViewsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh07ViewsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
