"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第7课 创建计算字段",
  focus: "用拼接、别名和算术表达式构造可消费的派生列",
  invariant: "别名稳定，拼接与NULL规则明确，金额计算的类型和精度符合业务口径",
  artifact: "计算字段合同、拼接方言表和金额对账查询",
  nodes: [
    "7.1 计算字段",
    "7.2 拼接字段",
    "使用别名",
    "7.3 执行算术计算",
    "7.4 小结",
    "7.5 挑战题",
  ],
};

export function SqtLesson07CalculatedFieldsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson07CalculatedFieldsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson07CalculatedFieldsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
