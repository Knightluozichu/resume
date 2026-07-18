"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第15章 事务",
  part: "第2篇 MySQL数据库操作和应用篇",
  focus: "以ACID、不变量、隔离级别和锁等待保护跨行业务操作",
  invariant:
    "订单、库存和支付等跨表状态要么整体提交，要么整体回滚，隔离异常可复现",
  artifact: "事务时序图、并发会话脚本、锁等待记录和回滚验证",
  nodes: [
    "15.1 事务与ACID",
    "15.2 自动提交与显式事务",
    "15.3 COMMIT与ROLLBACK",
    "15.4 SAVEPOINT",
    "15.5 并发异常",
    "15.6 四种隔离级别",
    "15.7 一致性读与当前读",
    "15.8 行锁和间隙锁",
    "15.9 锁等待与超时",
    "15.10 死锁检测和重试",
    "15.11 事务边界与外部调用",
    "15.12 并发实验",
    "15.13 本章验证清单",
  ],
};

export function MseCh15TransactionsModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh15TransactionsExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh15TransactionsEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
