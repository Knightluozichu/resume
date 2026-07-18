"use client";
import { OfficialSqlTenMinutesLab } from "./official-sql-ten-minutes-lab";

const props = {
  unitTitle: "第16课 更新和删除数据",
  focus: "安全执行UPDATE和DELETE，并以预览、事务和影响行数控制范围",
  invariant: "写操作只命中预期行集，约束持续成立，错误范围可回滚或恢复",
  artifact: "写操作预览、前后快照、回滚脚本和影响行数门禁",
  nodes: [
    "16.1 更新数据",
    "16.2 删除数据",
    "16.3 更新和删除的指导原则",
    "16.4 小结",
    "16.5 挑战题",
  ],
};

export function SqtLesson16UpdatingDeletingQueryLab() {
  return <OfficialSqlTenMinutesLab mode="query" {...props} />;
}
export function SqtLesson16UpdatingDeletingDialectLab() {
  return <OfficialSqlTenMinutesLab mode="dialect" {...props} />;
}
export function SqtLesson16UpdatingDeletingEvidenceLab() {
  return <OfficialSqlTenMinutesLab mode="evidence" {...props} />;
}
