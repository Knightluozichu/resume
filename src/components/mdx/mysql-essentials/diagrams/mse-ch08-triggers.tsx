"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第8章 操作触发器",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "在明确时机、行上下文和失败语义的前提下实现数据库侧自动规则",
  invariant: "触发器的副作用可追踪、可回滚，不形成递归或隐藏的跨表耦合",
  artifact: "触发器清单、OLD/NEW状态表、失败测试和审计记录",
  nodes: [
    "8.1 触发器的用途和边界",
    "8.2 BEFORE与AFTER时机",
    "8.3 INSERT触发器",
    "8.4 UPDATE触发器",
    "8.5 DELETE触发器",
    "8.6 OLD与NEW行引用",
    "8.7 多语句触发器",
    "8.8 查看触发器",
    "8.9 删除触发器",
    "8.10 触发器与事务回滚",
    "8.11 审计和派生字段案例",
    "8.12 本章验证清单",
  ],
};

export function MseCh08TriggersModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh08TriggersExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh08TriggersEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
