"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "读取源码",
  "形成目标文件",
  "装入地址空间",
  "解释机器指令",
  "访问层次存储",
  "跨网络输出",
] as const;
const concepts = [
  "第1章 计算机系统漫游",
  "1.1 信息就是位+上下文",
  "1.2 程序被其他程序翻译成不同的格式",
  "1.3 了解编译系统如何工作是大有益处的",
  "1.4 处理器读并解释储存在内存中的指令",
  "1.4.1 系统的硬件组成",
  "1.4.2 运行hello程序",
  "1.5 高速缓存至关重要",
  "1.6 存储设备形成层次结构",
  "1.7 操作系统管理硬件",
  "1.7.1 进程",
  "1.7.2 线程",
  "1.7.3 虚拟内存",
  "1.7.4 文件",
  "1.8 系统之间利用网络通信",
  "1.9 重要主题",
  "1.9.1 Amdahl定律",
  "1.9.2 并发和并行",
  "1.9.3 计算机系统中抽象的重要性",
  "1.10 小结",
] as const;
const common = {
  title: "第 1 章 计算机系统漫游",
  label: "程序结构和执行 · 系统漫游",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;

export function Cap01SystemTourMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap01SystemTourExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap01SystemTourEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
