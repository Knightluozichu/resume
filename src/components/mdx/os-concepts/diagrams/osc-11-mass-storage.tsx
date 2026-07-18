"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "提交块请求",
  "映射逻辑块",
  "调度设备队列",
  "执行数据传输",
  "更新冗余校验",
  "验证稳定写入",
] as const;
const concepts = [
  "第11章 大容量存储",
  "11.1 大容量存储结构概述",
  "11.1.1 硬盘驱动器",
  "11.1.2 非易失性存储设备",
  "11.1.3 易失性存储器",
  "11.1.4 二级存储连接方法",
  "11.1.5 地址映射",
  "11.2 HDD调度",
  "11.2.1 FCFS调度",
  "11.2.2 SCAN调度",
  "11.2.3 C-SCAN调度",
  "11.2.4 磁盘调度算法的选择",
  "11.3 NVM调度",
  "11.4 错误检测和纠正",
  "11.5 存储设备管理",
  "11.5.1 驱动器格式化、分区与卷",
  "11.5.2 引导块",
  "11.5.3 坏块",
  "11.6 交换空间管理",
  "11.6.1 交换空间的使用",
  "11.6.2 交换空间位置",
  "11.6.3 交换空间管理的示例",
  "11.7 存储连接",
  "11.7.1 主机连接存储",
  "11.7.2 网络连接存储",
  "11.7.3 云存储",
  "11.7.4 存储区域网络与存储阵列",
  "11.8 RAID结构",
  "11.8.1 通过冗余提高可靠性",
  "11.8.2 通过并行处理提高性能",
  "11.8.3 RAID级别",
  "11.8.4 RAID级别的选择",
  "11.8.5 扩展",
  "11.8.6 RAID的问题",
  "11.8.7 对象存储",
  "11.9 本章小结",
] as const;
const common = {
  title: "第 11 章 大容量存储",
  label: "第五部分 存储管理",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;
export function Osc11MassStorageMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc11MassStorageExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc11MassStorageEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
