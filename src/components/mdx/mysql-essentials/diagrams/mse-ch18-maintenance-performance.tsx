"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第18章 数据库维护和性能提高",
  part: "第3篇 MySQL数据库管理篇",
  focus: "把备份恢复、统计信息、执行计划、索引和参数调优组成可回退闭环",
  invariant: "恢复目标可达，优化前后使用同一负载和数据，收益与副作用均被量化",
  artifact: "恢复演练记录、性能基线、执行计划差异和变更回退单",
  nodes: [
    "18.1 维护目标与基线",
    "18.2 逻辑备份",
    "18.3 物理备份边界",
    "18.4 完整恢复与时间点恢复",
    "18.5 CHECK、ANALYZE和OPTIMIZE TABLE",
    "18.6 表统计信息",
    "18.7 EXPLAIN执行计划",
    "18.8 慢查询定位",
    "18.9 索引优化",
    "18.10 SQL改写",
    "18.11 缓冲、连接和临时表参数",
    "18.12 容量与并发压测",
    "18.13 变更、观测与回退",
    "18.14 PowerDesigner与模型核对",
    "18.15 本章验证清单",
  ],
};

export function MseCh18MaintenancePerformanceModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh18MaintenancePerformanceExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh18MaintenancePerformanceEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
