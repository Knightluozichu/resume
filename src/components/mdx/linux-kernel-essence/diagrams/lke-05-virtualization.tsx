import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第5章 虚拟化",
  label: "虚拟化与省电",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain: [
    "冻结宿主客户基线",
    "创建虚拟机",
    "布局vCPU与内存",
    "验证二级页表",
    "隔离设备直通",
    "调试并恢复客户机",
  ],
  concepts: [
    "第5章 虚拟化",
    "HACK #28 如何使用Xen",
    "HACK #29 如何使用KVM",
    "HACK #30 如何不使用DVD安装操作系统",
    "HACK #31 更改虚拟CPU分配方法，提高性能",
    "HACK #32 如何使用EPT提高客户端操作系统的性能",
    "HACK #33 使用IOMMU提高客户端操作系统运行速度",
    "HACK #34 使用IOMMU+SR-IOV提高客户端操作系统速度",
    "HACK #35 SR-IOV带宽控制",
    "HACK #36 使用KSM节约内存",
    "HACK #37 如何挂载客户端操作系统的磁盘",
    "HACK #38 从客户端操作系统识别虚拟机环境",
    "HACK #39 如何调试客户端操作系统",
  ],
} as const;

export function Lke05VirtualizationMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke05VirtualizationExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke05VirtualizationEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
