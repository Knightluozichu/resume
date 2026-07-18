"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第3章 数据库基本操作",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "用DDL建立、选择、修改和删除数据库，并验证字符集契约",
  invariant: "DDL可重复执行或明确失败，目标库名称、字符集与排序规则符合设计",
  artifact: "可重放DDL、数据库清单和字符集验收查询",
  nodes: [
    "3.1 查看数据库",
    "3.2 创建数据库",
    "3.3 IF NOT EXISTS与幂等性",
    "3.4 选择当前数据库",
    "3.5 查看数据库定义",
    "3.6 修改字符集与排序规则",
    "3.7 删除数据库",
    "3.8 information_schema中的元数据",
    "3.9 数据库命名和权限边界",
    "3.10 本章验证清单",
  ],
};

export function MseCh03DatabaseOperationsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh03DatabaseOperationsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh03DatabaseOperationsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
