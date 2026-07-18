"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第15课 插入数据",
  focus: "用INSERT完成完整行、部分行、查询结果插入和表复制",
  invariant:
    "列清单与值一一对应，缺省列规则明确，INSERT SELECT的源目标基数可核对",
  artifact: "插入列映射、默认值检查、影响行数和复制对账",
  nodes: [
    "15.1 数据插入",
    "15.1.1 插入完整的行",
    "15.1.2 插入部分行",
    "15.1.3 插入检索出的数据",
    "15.2 从一个表复制到另一个表",
    "15.3 小结",
    "15.4 挑战题",
  ],
};

export function SqtLesson15InsertingDataQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson15InsertingDataDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson15InsertingDataEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
