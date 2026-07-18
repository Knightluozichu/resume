import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh21ParallelDistributedStorageArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第21章 并行与分布式存储"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="用分区、复制、并行索引和分布式文件组织大规模数据"
      invariant="每条记录的放置规则确定，复制版本收敛，节点故障与热点下仍满足目标可用性"
      artifact="分片函数、倾斜直方图、复制故障实验和再平衡计划"
      nodes={[
        "21.1 概述",
        "21.2 数据分区",
        "21.3 处理分区倾斜",
        "21.4 复制",
        "21.5 并行索引",
        "21.6 分布式文件系统",
        "21.7 并行键值存储",
        "21.8 小结",
      ]}
    />
  );
}

export function DscCh21ParallelDistributedStorageExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第21章 并行与分布式存储"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="用分区、复制、并行索引和分布式文件组织大规模数据"
      invariant="每条记录的放置规则确定，复制版本收敛，节点故障与热点下仍满足目标可用性"
      artifact="分片函数、倾斜直方图、复制故障实验和再平衡计划"
      nodes={[
        "21.1 概述",
        "21.2 数据分区",
        "21.3 处理分区倾斜",
        "21.4 复制",
        "21.5 并行索引",
        "21.6 分布式文件系统",
        "21.7 并行键值存储",
        "21.8 小结",
      ]}
    />
  );
}

export function DscCh21ParallelDistributedStorageEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第21章 并行与分布式存储"
      part="第八部分 并行与分布式数据库"
      medium="纸书正文"
      focus="用分区、复制、并行索引和分布式文件组织大规模数据"
      invariant="每条记录的放置规则确定，复制版本收敛，节点故障与热点下仍满足目标可用性"
      artifact="分片函数、倾斜直方图、复制故障实验和再平衡计划"
      nodes={[
        "21.1 概述",
        "21.2 数据分区",
        "21.3 处理分区倾斜",
        "21.4 复制",
        "21.5 并行索引",
        "21.6 分布式文件系统",
        "21.7 并行键值存储",
        "21.8 小结",
      ]}
    />
  );
}
