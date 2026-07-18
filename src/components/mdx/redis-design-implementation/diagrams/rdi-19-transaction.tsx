import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第19章 事务",
  focus: "沿MULTI、命令入队、WATCH乐观锁、EXEC和DISCARD判断Redis事务的ACID边界",
  invariant:
    "入队顺序确定，WATCH键变化使EXEC中止，执行期命令错误按Redis语义返回而非自动回滚",
  artifact: "事务状态机、WATCH竞态实验、错误矩阵和ACID边界表",
  nodes: [
    "事务的实现",
    "WATCH命令的实现",
    "事务的ACID性质",
    "重点回顾",
    "参考资料",
  ],
};

export function Rdi19TransactionStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi19TransactionTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi19TransactionEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
