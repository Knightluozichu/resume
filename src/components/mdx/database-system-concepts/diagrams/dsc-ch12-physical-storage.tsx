import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh12PhysicalStorageArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第12章 物理存储系统"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="把延迟、带宽、耐久性和故障模式转化为页布局与I/O策略"
      invariant="性能估算区分随机与顺序访问，耐久性设计覆盖相关故障而非只算容量"
      artifact="介质层次图、I/O成本模型、RAID故障矩阵和页读取实验"
      nodes={[
        "12.1 物理存储介质概述",
        "12.2 存储接口",
        "12.3 磁盘",
        "12.4 闪存",
        "12.5 RAID",
        "12.6 磁盘块访问",
        "12.7 小结",
      ]}
    />
  );
}

export function DscCh12PhysicalStorageExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第12章 物理存储系统"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="把延迟、带宽、耐久性和故障模式转化为页布局与I/O策略"
      invariant="性能估算区分随机与顺序访问，耐久性设计覆盖相关故障而非只算容量"
      artifact="介质层次图、I/O成本模型、RAID故障矩阵和页读取实验"
      nodes={[
        "12.1 物理存储介质概述",
        "12.2 存储接口",
        "12.3 磁盘",
        "12.4 闪存",
        "12.5 RAID",
        "12.6 磁盘块访问",
        "12.7 小结",
      ]}
    />
  );
}

export function DscCh12PhysicalStorageEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第12章 物理存储系统"
      part="第五部分 存储管理与索引"
      medium="纸书正文"
      focus="把延迟、带宽、耐久性和故障模式转化为页布局与I/O策略"
      invariant="性能估算区分随机与顺序访问，耐久性设计覆盖相关故障而非只算容量"
      artifact="介质层次图、I/O成本模型、RAID故障矩阵和页读取实验"
      nodes={[
        "12.1 物理存储介质概述",
        "12.2 存储接口",
        "12.3 磁盘",
        "12.4 闪存",
        "12.5 RAID",
        "12.6 磁盘块访问",
        "12.7 小结",
      ]}
    />
  );
}
