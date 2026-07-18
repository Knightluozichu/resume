"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第4章 存储引擎和数据类型",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "按事务、并发、容量和语义选择存储引擎与字段类型",
  invariant: "类型能够表达业务域且不丢精度，引擎能力覆盖事务、外键和并发要求",
  artifact: "引擎决策表、字段类型字典和边界值测试集",
  nodes: [
    "4.1 MySQL存储引擎体系",
    "4.2 查看与设置存储引擎",
    "4.3 InnoDB的事务和外键",
    "4.4 MyISAM与MEMORY的适用边界",
    "4.5 整数类型与范围",
    "4.6 定点数和浮点数",
    "4.7 日期与时间类型",
    "4.8 字符串与二进制类型",
    "4.9 ENUM、SET与JSON边界",
    "4.10 NULL、默认值与隐式转换",
    "4.11 类型选择实验",
    "4.12 本章验证清单",
  ],
};

export function MseCh04EnginesDataTypesModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh04EnginesDataTypesExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh04EnginesDataTypesEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
