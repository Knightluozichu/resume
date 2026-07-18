import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh17TransactionsArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第17章 事务"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用状态转换、调度图和隔离现象解释ACID如何被实现与验证"
      invariant="提交事务的效果持久，回滚事务无残留，并发调度等价于允许的串行或隔离级别语义"
      artifact="转账状态机、冲突图、隔离现象矩阵和提交故障实验"
      nodes={[
        "17.1 事务概念",
        "17.2 简单事务模型",
        "17.3 存储结构",
        "17.4 事务原子性与持久性",
        "17.5 事务隔离性",
        "17.6 可串行化",
        "17.7 事务隔离性与原子性",
        "17.8 事务隔离级别",
        "17.9 隔离级别的实现",
        "17.10 作为SQL语句的事务",
        "17.11 小结",
      ]}
    />
  );
}

export function DscCh17TransactionsExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第17章 事务"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用状态转换、调度图和隔离现象解释ACID如何被实现与验证"
      invariant="提交事务的效果持久，回滚事务无残留，并发调度等价于允许的串行或隔离级别语义"
      artifact="转账状态机、冲突图、隔离现象矩阵和提交故障实验"
      nodes={[
        "17.1 事务概念",
        "17.2 简单事务模型",
        "17.3 存储结构",
        "17.4 事务原子性与持久性",
        "17.5 事务隔离性",
        "17.6 可串行化",
        "17.7 事务隔离性与原子性",
        "17.8 事务隔离级别",
        "17.9 隔离级别的实现",
        "17.10 作为SQL语句的事务",
        "17.11 小结",
      ]}
    />
  );
}

export function DscCh17TransactionsEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第17章 事务"
      part="第七部分 事务管理"
      medium="纸书正文"
      focus="用状态转换、调度图和隔离现象解释ACID如何被实现与验证"
      invariant="提交事务的效果持久，回滚事务无残留，并发调度等价于允许的串行或隔离级别语义"
      artifact="转账状态机、冲突图、隔离现象矩阵和提交故障实验"
      nodes={[
        "17.1 事务概念",
        "17.2 简单事务模型",
        "17.3 存储结构",
        "17.4 事务原子性与持久性",
        "17.5 事务隔离性",
        "17.6 可串行化",
        "17.7 事务隔离性与原子性",
        "17.8 事务隔离级别",
        "17.9 隔离级别的实现",
        "17.10 作为SQL语句的事务",
        "17.11 小结",
      ]}
    />
  );
}
