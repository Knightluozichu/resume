"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第12章 运算符",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "掌握算术、比较、逻辑、位和模式运算中的类型与三值逻辑",
  invariant: "表达式结果在NULL、零值、字符串数字和边界值下均符合预期",
  artifact: "真值表、类型转换样例和边界表达式测试",
  nodes: [
    "12.1 算术运算符",
    "12.2 比较运算符",
    "12.3 等值与安全等值",
    "12.4 BETWEEN与IN",
    "12.5 LIKE与REGEXP",
    "12.6 IS NULL与三值逻辑",
    "12.7 逻辑运算符",
    "12.8 位运算符",
    "12.9 运算符优先级",
    "12.10 隐式类型转换",
    "12.11 本章验证清单",
  ],
};

export function MseCh12OperatorsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh12OperatorsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh12OperatorsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
