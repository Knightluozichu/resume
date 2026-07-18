"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "声明资源需求",
  "分配资源实例",
  "构造等待关系",
  "判定安全序列",
  "检测等待循环",
  "抢占终止恢复",
] as const;
const concepts = [
  "第8章 死锁",
  "8.1 系统模型",
  "8.2 多线程应用程序的死锁",
  "8.3 死锁特点",
  "8.3.1 必要条件",
  "8.3.2 资源分配图",
  "8.4 死锁处理方法",
  "8.5 死锁预防",
  "8.5.1 互斥",
  "8.5.2 占有并等待",
  "8.5.3 非抢占",
  "8.5.4 循环等待",
  "8.6 死锁避免",
  "8.6.1 安全状态",
  "8.6.2 资源分配图算法",
  "8.6.3 银行家算法",
  "8.7 死锁检测",
  "8.7.1 每种资源类型只有单个实例",
  "8.7.2 每种资源类型可有多个实例",
  "8.7.3 检测算法的使用",
  "8.8 死锁恢复",
  "8.8.1 进程与线程的中止",
  "8.8.2 资源抢占",
  "8.9 本章小结",
] as const;
const common = {
  title: "第 8 章 死锁",
  label: "第三部分 进程同步",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;
export function Osc08DeadlocksMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc08DeadlocksExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc08DeadlocksEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
