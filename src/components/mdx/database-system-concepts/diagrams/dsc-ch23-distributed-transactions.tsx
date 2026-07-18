import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh23DistributedTransactionsArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第23章 并行与分布式事务处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="在网络分区和节点故障下协调提交、复制、选主与共识"
      invariant="事务决议唯一且可恢复，复制读写满足声明的一致性，任期和日志次序不倒退"
      artifact="两阶段提交时序、故障矩阵、复制一致性测试和共识日志"
      nodes={[
        "23.1 分布式事务",
        "23.2 提交协议",
        "23.3 分布式数据库中的并发控制",
        "23.4 复制",
        "23.5 扩展并发控制协议",
        "23.6 弱一致性复制",
        "23.7 协调者选择",
        "23.8 分布式系统中的共识",
        "23.9 小结",
      ]}
    />
  );
}

export function DscCh23DistributedTransactionsExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第23章 并行与分布式事务处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="在网络分区和节点故障下协调提交、复制、选主与共识"
      invariant="事务决议唯一且可恢复，复制读写满足声明的一致性，任期和日志次序不倒退"
      artifact="两阶段提交时序、故障矩阵、复制一致性测试和共识日志"
      nodes={[
        "23.1 分布式事务",
        "23.2 提交协议",
        "23.3 分布式数据库中的并发控制",
        "23.4 复制",
        "23.5 扩展并发控制协议",
        "23.6 弱一致性复制",
        "23.7 协调者选择",
        "23.8 分布式系统中的共识",
        "23.9 小结",
      ]}
    />
  );
}

export function DscCh23DistributedTransactionsEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第23章 并行与分布式事务处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="在网络分区和节点故障下协调提交、复制、选主与共识"
      invariant="事务决议唯一且可恢复，复制读写满足声明的一致性，任期和日志次序不倒退"
      artifact="两阶段提交时序、故障矩阵、复制一致性测试和共识日志"
      nodes={[
        "23.1 分布式事务",
        "23.2 提交协议",
        "23.3 分布式数据库中的并发控制",
        "23.4 复制",
        "23.5 扩展并发控制协议",
        "23.6 弱一致性复制",
        "23.7 协调者选择",
        "23.8 分布式系统中的共识",
        "23.9 小结",
      ]}
    />
  );
}
