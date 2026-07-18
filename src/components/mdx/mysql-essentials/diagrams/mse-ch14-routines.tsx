"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第14章 存储过程和函数的操作",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "建立参数、局部状态、流程控制、游标和异常处理明确的存储程序",
  invariant: "例程输入输出明确、事务边界可见、异常不会留下半完成状态",
  artifact: "例程定义、参数合同、异常路径和调用测试",
  nodes: [
    "14.1 存储过程与函数概述",
    "14.2 DELIMITER与创建语法",
    "14.3 IN、OUT和INOUT参数",
    "14.4 变量声明与赋值",
    "14.5 BEGIN END复合语句",
    "14.6 IF与CASE分支",
    "14.7 LOOP、WHILE与REPEAT",
    "14.8 游标的声明和遍历",
    "14.9 条件与处理程序",
    "14.10 调用存储过程和函数",
    "14.11 查看、修改与删除例程",
    "14.12 权限和确定性声明",
    "14.13 本章验证清单",
  ],
};

export function MseCh14RoutinesModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh14RoutinesExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh14RoutinesEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
