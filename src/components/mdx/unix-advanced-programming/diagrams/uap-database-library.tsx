import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第20章 数据库函数库",
  label: "综合应用",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "定义记录合同",
    "构建索引",
    "执行读写",
    "注入并发",
    "模拟崩溃",
    "重建测量",
  ],
  concepts: [
    "第20章 数据库函数库",
    "20.1 引言",
    "20.2 历史",
    "20.3 函数库",
    "20.4 实现概述",
    "20.5 集中式或非集中式",
    "20.6 并发",
    "20.7 构造函数库",
    "20.8 源代码",
    "20.9 性能",
    "20.10 小结",
  ],
} as const;

export function UapDatabaseLibraryMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapDatabaseLibraryExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapDatabaseLibraryEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
