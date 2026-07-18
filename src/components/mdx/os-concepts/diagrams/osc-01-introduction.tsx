"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "识别计算环境",
  "枚举硬件资源",
  "响应中断",
  "分配系统资源",
  "执行保护检查",
  "提供运行环境",
] as const;
const concepts = [
  "第1章 导论",
  "1.1 操作系统的功能",
  "1.1.1 用户视角",
  "1.1.2 系统视角",
  "1.1.3 操作系统的定义",
  "1.2 计算机系统的组成",
  "1.2.1 中断",
  "1.2.2 存储结构",
  "1.2.3 I／O结构",
  "1.3 计算机系统的体系结构",
  "1.3.1 单处理器系统",
  "1.3.2 多处理器系统",
  "1.3.3 集群系统",
  "1.4 操作系统的执行",
  "1.4.1 多道程序与多任务",
  "1.4.2 双模式与多模式操作",
  "1.4.3 定时器",
  "1.5 资源管理",
  "1.5.1 进程管理",
  "1.5.2 内存管理",
  "1.5.3 文件系统管理",
  "1.5.4 大容量存储管理",
  "1.5.5 高速缓存管理",
  "1.5.6 I／O系统管理",
  "1.6 安全与保护",
  "1.7 虚拟化",
  "1.8 分布式系统",
  "1.9 内核数据结构",
  "1.9.1 列表、堆栈与队列",
  "1.9.2 树",
  "1.9.3 哈希函数与哈希表",
  "1.9.4 位图",
  "1.10 计算环境",
  "1.10.1 传统计算",
  "1.10.2 移动计算",
  "1.10.3 客户机-服务器计算",
  "1.10.4 对等计算",
  "1.10.5 云计算",
  "1.10.6 实时嵌入式系统",
  "1.11 免费与开源操作系统",
  "1.11.1 开源操作系统的历史",
  "1.11.2 自由操作系统",
  "1.11.3 GNU／Linux",
  "1.11.4 BSD UNIX",
  "1.11.5 Solaris",
  "1.11.6 用作学习的开源操作系统",
  "1.12 本章小结",
] as const;
const common = {
  title: "第 1 章 导论",
  label: "第一部分 概论",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Osc01IntroductionMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc01IntroductionExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc01IntroductionEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
