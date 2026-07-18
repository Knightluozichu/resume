"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第6章 操作索引",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "以查询谓词、排序和选择性设计索引并用执行计划验证",
  invariant: "索引服务于真实查询，最左前缀、覆盖性和选择性与执行计划一致",
  artifact: "索引清单、EXPLAIN前后对照、写放大和容量记录",
  nodes: [
    "6.1 索引的用途与代价",
    "6.2 B+树索引的结构",
    "6.3 普通、唯一和主键索引",
    "6.4 单列与联合索引",
    "6.5 最左前缀规则",
    "6.6 前缀、全文和空间索引",
    "6.7 创建与删除索引",
    "6.8 查看索引元数据",
    "6.9 覆盖索引与回表",
    "6.10 选择性和冗余索引",
    "6.11 EXPLAIN验证",
    "6.12 本章验证清单",
  ],
};

export function MseCh06IndexesModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh06IndexesExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh06IndexesEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
