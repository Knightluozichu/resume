"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第19课 使用存储过程",
  focus: "理解存储过程的价值、调用和创建方式及其方言差异",
  invariant: "输入输出、事务和错误语义明确，同名过程在目标DBMS上有可验证定义",
  artifact: "过程参数合同、调用样例、异常路径和方言实现对照",
  nodes: [
    "19.1 存储过程",
    "19.2 为什么要使用存储过程",
    "19.3 执行存储过程",
    "19.4 创建存储过程",
    "19.5 小结",
  ],
};

export function SqtLesson19StoredProceduresQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson19StoredProceduresDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson19StoredProceduresEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
