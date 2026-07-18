"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "识别业务实体",
  "拆分规范化表",
  "声明主外键",
  "按查询设计索引",
  "通过SQL执行CRUD",
  "在事务中提交",
] as const;
const concepts = [
  "第8章 一用就会的数据库",
  "8.1 数据库是数据的基地",
  "8.2 数据文件、DBMS和数据库应用程序",
  "8.3 设计数据库",
  "8.4 通过拆表和整理数据实现规范化",
  "8.5 用主键和外键在表间建立关系",
  "8.6 索引能够提升数据的检索速度",
  "8.7 设计用户界面",
  "8.8 向DBMS发送CRUD操作的SQL语句",
  "8.9 使用数据对象向DBMS发送SQL语句",
  "8.10 事务控制也可以交给DBMS处理",
  "COLUMN 来自企业培训现场：培训新人编程时推荐使用什么编程语言？",
] as const;
const common = {
  title: "第 8 章 一用就会的数据库",
  label: "计算机怎样运行 · 数据与对象",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain,
  concepts,
} as const;
export function Hcw08DatabaseMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw08DatabaseExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw08DatabaseEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
