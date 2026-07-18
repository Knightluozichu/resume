"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第9章 数据的操作",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "安全完成插入、更新、删除和批量导入，并验证影响行数",
  invariant: "每次写操作命中预期行集，约束持续成立，失败时能够回滚或补偿",
  artifact: "DML脚本、前后快照、影响行数和补偿方案",
  nodes: [
    "9.1 插入完整行",
    "9.2 插入指定字段",
    "9.3 批量插入",
    "9.4 INSERT SELECT",
    "9.5 更新数据",
    "9.6 删除数据",
    "9.7 TRUNCATE与DELETE差异",
    "9.8 重复键处理",
    "9.9 数据导入与导出",
    "9.10 影响行数和安全更新",
    "9.11 事务化变更脚本",
    "9.12 本章验证清单",
  ],
};

export function MseCh09DataManipulationModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh09DataManipulationExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh09DataManipulationEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
