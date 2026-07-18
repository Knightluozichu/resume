import { OfficialDdiaLab } from "./official-ddia-lab";

const config = {
  unitTitle: "第7章 事务",
  focus: "用事务边界与隔离级别管理并发交错和部分失败，比较快照、锁与SSI",
  invariant:
    "业务不变量在指定隔离和重试策略下保持，提交、回滚与未知结果都有处理",
  artifact: "事务历史、异常复现、隔离矩阵、重试协议和不变量对账",
  nodes: [
    "事务这个棘手的概念",
    "ACID的含义",
    "单对象与多对象操作",
    "弱隔离级别",
    "读已提交",
    "快照隔离与可重复读",
    "防止丢失更新",
    "写偏差与幻读",
    "可串行化",
    "真正串行执行",
    "两阶段锁定",
    "可串行化快照隔离",
    "小结",
  ],
};

export function Ddi07TransactionsArchitectureLab() {
  return <OfficialDdiaLab {...config} mode="architecture" />;
}

export function Ddi07TransactionsFailureLab() {
  return <OfficialDdiaLab {...config} mode="failure" />;
}

export function Ddi07TransactionsEvidenceLab() {
  return <OfficialDdiaLab {...config} mode="evidence" />;
}
