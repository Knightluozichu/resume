"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "启动 Linux",
  "加载内核模块",
  "创建调度进程",
  "管理内存 I/O",
  "访问 VFS ext3",
  "执行安全检查",
] as const;
const concepts = [
  "第20章 Linux",
  "20.1 历史",
  "20.1.1 Linux内核",
  "20.1.2 Linux系统",
  "20.1.3 Linux发行",
  "20.1.4 Linux许可",
  "20.2 设计原则",
  "20.3 内核模块",
  "20.3.1 模块管理",
  "20.3.2 驱动程序注册",
  "20.3.3 冲突解决",
  "20.4 进程管理",
  "20.4.1 fork()与exec()进程模型",
  "20.4.2 进程与线程",
  "20.5 调度",
  "20.5.1 线程调度",
  "20.5.2 实时调度",
  "20.5.3 内核同步",
  "20.5.4 对称多处理",
  "20.6 内存管理",
  "20.6.1 物理内存的管理",
  "20.6.2 虚拟内存",
  "20.6.3 执行与加载用户程序",
  "20.7 文件系统",
  "20.7.1 虚拟文件系统",
  "20.7.2 Linux ext3文件系统",
  "20.7.3 日志",
  "20.7.4 Linux进程文件系统",
  "20.8 输入与输出",
  "20.8.1 块设备",
  "20.8.2 字符设备",
  "20.9 进程间通信",
  "20.9.1 同步与信号",
  "20.9.2 进程间的数据传递",
  "20.10 网络结构",
  "20.11 安全",
  "20.11.1 认证",
  "20.11.2 访问控制",
  "20.12 本章小结",
] as const;
const common = {
  title: "第 20 章 Linux",
  label: "第九部分 案例研究",
  color: "#047857",
  soft: "#d1fae5",
  chain,
  concepts,
} as const;
export function Osc20LinuxMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc20LinuxExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc20LinuxEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
