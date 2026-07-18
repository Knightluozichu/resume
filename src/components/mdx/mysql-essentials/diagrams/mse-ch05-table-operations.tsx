"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第5章 操作数据表",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "把实体、键、默认值和约束落实为可演进的表结构",
  invariant: "表结构保持主键唯一、外键可达、非空和检查约束与业务规则一致",
  artifact: "建表脚本、变更脚本、约束检查和回滚方案",
  nodes: [
    "5.1 创建数据表",
    "5.2 查看表结构",
    "5.3 主键和唯一约束",
    "5.4 外键和参照动作",
    "5.5 非空、默认值与检查约束",
    "5.6 自增列",
    "5.7 修改表名和字段名",
    "5.8 增加、修改与删除字段",
    "5.9 修改约束和存储引擎",
    "5.10 复制表结构与数据",
    "5.11 清空和删除表",
    "5.12 在线变更与回滚思路",
    "5.13 本章验证清单",
  ],
};

export function MseCh05TableOperationsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh05TableOperationsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh05TableOperationsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
