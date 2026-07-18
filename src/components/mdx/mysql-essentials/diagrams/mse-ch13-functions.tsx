"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第13章 常用函数",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "用内置函数完成字符串、数值、日期和条件转换并控制可索引性",
  invariant:
    "函数输入域、NULL行为、时区、精度和字符集均显式，过滤条件不无谓破坏索引",
  artifact: "函数样例表、时区与字符集测试、等价改写对照",
  nodes: [
    "13.1 数学函数",
    "13.2 字符串函数",
    "13.3 日期和时间函数",
    "13.4 条件判断函数",
    "13.5 系统信息函数",
    "13.6 加密与散列函数",
    "13.7 类型转换函数",
    "13.8 NULL处理函数",
    "13.9 函数与索引可用性",
    "13.10 时区、精度与字符集",
    "13.11 本章验证清单",
  ],
};

export function MseCh13FunctionsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh13FunctionsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh13FunctionsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
