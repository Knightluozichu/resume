"use client";

import { OfficialModernOsLab } from "./official-modern-os-lab";

const chain = [
  "声明资源需求",
  "分配当前资源",
  "构造等待关系",
  "判定安全序列",
  "检测循环",
  "恢复系统进度",
] as const;
const concepts = [
  "第6章 死锁",
  "6.1 资源",
  "6.1.1 可抢占资源和不可抢占资源",
  "6.1.2 资源获取",
  "6.2 死锁简介",
  "6.2.1 资源死锁的条件",
  "6.2.2 死锁建模",
  "6.3 鸵鸟算法",
  "6.4 死锁检测和死锁恢复",
  "6.4.1 每种类型一个资源的死锁检测",
  "6.4.2 每种类型多个资源的死锁检测",
  "6.4.3 从死锁中恢复",
  "6.5 死锁避免",
  "6.5.1 资源轨迹图",
  "6.5.2 安全状态和不安全状态",
  "6.5.3 单个资源的银行家算法",
  "6.5.4 多个资源的银行家算法",
  "6.6 死锁预防",
  "6.6.1 破坏互斥条件",
  "6.6.2 破坏占有并等待条件",
  "6.6.3 破坏不可抢占条件",
  "6.6.4 破坏环路等待条件",
  "6.7 其他问题",
  "6.7.1 两阶段加锁",
  "6.7.2 通信死锁",
  "6.7.3 活锁",
  "6.7.4 饥饿",
  "6.8 有关死锁的研究",
  "6.9 小结",
] as const;
const common = {
  title: "第 6 章 死锁",
  label: "现代操作系统 · 资源与进度",
  color: "#2563eb",
  soft: "#dbeafe",
  chain,
  concepts,
} as const;

export function Mos06DeadlocksMapLab() {
  return <OfficialModernOsLab {...common} view="map" />;
}
export function Mos06DeadlocksExperimentLab() {
  return <OfficialModernOsLab {...common} view="experiment" />;
}
export function Mos06DeadlocksEvidenceLab() {
  return <OfficialModernOsLab {...common} view="evidence" />;
}
