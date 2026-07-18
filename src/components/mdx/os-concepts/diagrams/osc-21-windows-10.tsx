"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "启动 Windows",
  "进入管理程序内核",
  "创建执行体对象",
  "管理终端会话",
  "访问 NTFS 网络",
  "调用程序员接口",
] as const;
const concepts = [
  "第21章 Windows 10",
  "21.1 历史",
  "21.1.1 Windows XP、Windows Vista和Windows 7",
  "21.1.2 Windows 8",
  "21.1.3 Windows 10",
  "21.2 设计原则",
  "21.2.1 安全性",
  "21.2.2 可靠性",
  "21.2.3 Windows与应用程序兼容性",
  "21.2.4 性能",
  "21.2.5 可扩展性",
  "21.2.6 可移植性",
  "21.2.7 国际支持",
  "21.2.8 能源效率",
  "21.2.9 动态设备支持",
  "21.3 系统组件",
  "21.3.1 Hyper-V管理程序",
  "21.3.2 安全内核",
  "21.3.3 硬件抽象层",
  "21.3.4 内核",
  "21.3.5 执行体",
  "21.4 终端服务与快速用户切换",
  "21.5 文件系统",
  "21.5.1 NTFS内部布局",
  "21.5.2 恢复",
  "21.5.3 安全",
  "21.5.4 压缩",
  "21.5.5 挂载点、符号链接与硬链接",
  "21.5.6 日志变更",
  "21.5.7 卷影副本",
  "21.6 网络",
  "21.6.1 网络接口",
  "21.6.2 协议",
  "21.6.3 重定向器与服务器",
  "21.6.4 域",
  "21.6.5 活动目录",
  "21.7 程序员接口",
  "21.7.1 内核对象访问",
  "21.7.2 进程间对象共享",
  "21.7.3 进程管理",
  "21.7.4 使用Windows消息传递的进程间通信",
  "21.7.5 内存管理",
  "21.8 本章小结",
] as const;
const common = {
  title: "第 21 章 Windows 10",
  label: "第九部分 案例研究",
  color: "#be123c",
  soft: "#ffe4e6",
  chain,
  concepts,
} as const;
export function Osc21Windows10MapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc21Windows10ExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc21Windows10EvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
