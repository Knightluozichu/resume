"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第11课 使用子查询",
  focus: "用子查询完成行集过滤和标量计算，并验证返回基数",
  invariant: "子查询返回列数与行数符合所在上下文，相关引用和NULL语义明确",
  artifact: "内外查询数据流、基数断言和联结等价改写",
  nodes: [
    "11.1 子查询",
    "11.2 利用子查询进行过滤",
    "11.3 作为计算字段使用子查询",
    "11.4 小结",
    "11.5 挑战题",
  ],
};

export function SqtLesson11SubqueriesQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson11SubqueriesDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson11SubqueriesEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
