import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh22ParallelDistributedQueryArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第22章 并行与分布式查询处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="把排序、连接和算子流水线拆到多节点并控制重分区、倾斜与网络成本"
      invariant="并行结果与串行语义一致，分区边界不漏不重，最慢任务与网络字节可观测"
      artifact="并行计划图、交换算子轨迹、倾斜注入和加速比报告"
      nodes={[
        "22.1 概述",
        "22.2 并行排序",
        "22.3 并行连接",
        "22.4 其他运算",
        "22.5 查询计划的并行求值",
        "22.6 共享内存体系结构上的查询处理",
        "22.7 并行执行的查询优化",
        "22.8 流数据的并行处理",
        "22.9 分布式查询处理",
        "22.10 小结",
      ]}
    />
  );
}

export function DscCh22ParallelDistributedQueryExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第22章 并行与分布式查询处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="把排序、连接和算子流水线拆到多节点并控制重分区、倾斜与网络成本"
      invariant="并行结果与串行语义一致，分区边界不漏不重，最慢任务与网络字节可观测"
      artifact="并行计划图、交换算子轨迹、倾斜注入和加速比报告"
      nodes={[
        "22.1 概述",
        "22.2 并行排序",
        "22.3 并行连接",
        "22.4 其他运算",
        "22.5 查询计划的并行求值",
        "22.6 共享内存体系结构上的查询处理",
        "22.7 并行执行的查询优化",
        "22.8 流数据的并行处理",
        "22.9 分布式查询处理",
        "22.10 小结",
      ]}
    />
  );
}

export function DscCh22ParallelDistributedQueryEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第22章 并行与分布式查询处理"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="把排序、连接和算子流水线拆到多节点并控制重分区、倾斜与网络成本"
      invariant="并行结果与串行语义一致，分区边界不漏不重，最慢任务与网络字节可观测"
      artifact="并行计划图、交换算子轨迹、倾斜注入和加速比报告"
      nodes={[
        "22.1 概述",
        "22.2 并行排序",
        "22.3 并行连接",
        "22.4 其他运算",
        "22.5 查询计划的并行求值",
        "22.6 共享内存体系结构上的查询处理",
        "22.7 并行执行的查询优化",
        "22.8 流数据的并行处理",
        "22.9 分布式查询处理",
        "22.10 小结",
      ]}
    />
  );
}
