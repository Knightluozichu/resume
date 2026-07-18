import { OfficialDatabaseSystemConceptsLab } from "./official-database-system-concepts-lab";

export function DscCh15QueryProcessingArchitectureLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="architecture"
      unitTitle="第15章 查询处理"
      part="第六部分 查询处理与优化"
      medium="纸书正文"
      focus="把关系运算映射为扫描、排序、哈希和连接算法并核算I/O与内存"
      invariant="每个物理算子保持逻辑语义，代价估算注明页数、内存页和输入有序性"
      artifact="算子流水线图、三种连接算法实验和I/O成本对账"
      nodes={[
        "15.1 概述",
        "15.2 查询代价的度量",
        "15.3 选择运算",
        "15.4 排序",
        "15.5 连接运算",
        "15.6 其他运算",
        "15.7 表达式求值",
        "15.8 内存中的查询处理",
        "15.9 小结",
      ]}
    />
  );
}

export function DscCh15QueryProcessingExperimentLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="experiment"
      unitTitle="第15章 查询处理"
      part="第六部分 查询处理与优化"
      medium="纸书正文"
      focus="把关系运算映射为扫描、排序、哈希和连接算法并核算I/O与内存"
      invariant="每个物理算子保持逻辑语义，代价估算注明页数、内存页和输入有序性"
      artifact="算子流水线图、三种连接算法实验和I/O成本对账"
      nodes={[
        "15.1 概述",
        "15.2 查询代价的度量",
        "15.3 选择运算",
        "15.4 排序",
        "15.5 连接运算",
        "15.6 其他运算",
        "15.7 表达式求值",
        "15.8 内存中的查询处理",
        "15.9 小结",
      ]}
    />
  );
}

export function DscCh15QueryProcessingEvidenceLab() {
  return (
    <OfficialDatabaseSystemConceptsLab
      mode="evidence"
      unitTitle="第15章 查询处理"
      part="第六部分 查询处理与优化"
      medium="纸书正文"
      focus="把关系运算映射为扫描、排序、哈希和连接算法并核算I/O与内存"
      invariant="每个物理算子保持逻辑语义，代价估算注明页数、内存页和输入有序性"
      artifact="算子流水线图、三种连接算法实验和I/O成本对账"
      nodes={[
        "15.1 概述",
        "15.2 查询代价的度量",
        "15.3 选择运算",
        "15.4 排序",
        "15.5 连接运算",
        "15.6 其他运算",
        "15.7 表达式求值",
        "15.8 内存中的查询处理",
        "15.9 小结",
      ]}
    />
  );
}
