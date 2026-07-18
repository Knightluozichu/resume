import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "《Linux内核精髓》权威学习地图",
  label: "导读 · 75个HACK总览",
  color: "#334155",
  soft: "#e2e8f0",
  chain: [
    "核对版本与目录",
    "搭建可恢复环境",
    "完成开发资源实验",
    "验证存储网络路径",
    "比较虚拟化省电",
    "用调试追踪闭环",
  ],
  concepts: [
    "第1章 内核入门",
    "HACK #1 如何获取Linux内核",
    "HACK #2 如何编译Linux内核",
    "第2章 资源管理",
    "HACK #7 Cgroup、Namespace、Linux容器",
    "HACK #8 调度策略",
    "第3章 文件系统",
    "HACK #17 如何使用ext4",
    "HACK #18 向ext4转换",
    "第4章 网络",
    "HACK #22 如何控制网络的带宽",
    "HACK #23 TUN/TAP设备",
    "第5章 虚拟化",
    "HACK #28 如何使用Xen",
    "HACK #29 如何使用KVM",
    "第6章 省电",
    "HACK #40 ACPI",
    "HACK #41 使用ACPI的S状态",
    "第7章 调试",
    "HACK #52 SysRq键",
    "HACK #53 使用diskdump提取内核崩溃转储",
    "第8章 概要分析与追踪",
    "HACK #64 使用perf tools的概要分析（1）",
    "HACK #65 使用perf tools的概要分析（2）",
  ],
} as const;

export function LkeOfficialLearningMapMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function LkeOfficialLearningMapExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function LkeOfficialLearningMapEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
