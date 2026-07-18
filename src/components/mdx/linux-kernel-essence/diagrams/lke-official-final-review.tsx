import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "《Linux内核精髓》全书总复习",
  label: "复习 · 证据闭环",
  color: "#111827",
  soft: "#e5e7eb",
  chain: [
    "冻结版本与输入",
    "预测资源状态",
    "采集基线信号",
    "只注入一个故障",
    "停在首个分叉",
    "恢复后重放验收",
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

export function LkeOfficialFinalReviewMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function LkeOfficialFinalReviewExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function LkeOfficialFinalReviewEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
