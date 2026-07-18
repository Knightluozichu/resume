"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第20课 管理事务处理",
  focus: "用事务、ROLLBACK、COMMIT和保留点保护多步写入",
  invariant: "多步业务写入要么整体提交，要么回到已知保存点或事务开始状态",
  artifact: "事务时序、保存点实验、失败回滚和并发对账",
  nodes: [
    "20.1 事务处理",
    "20.2 控制事务处理",
    "20.2.1 使用ROLLBACK",
    "20.2.2 使用COMMIT",
    "20.2.3 使用保留点",
    "20.3 小结",
  ],
};

export function SqtLesson20TransactionsQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson20TransactionsDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson20TransactionsEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
