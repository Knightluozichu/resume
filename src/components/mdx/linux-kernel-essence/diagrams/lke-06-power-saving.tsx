import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第6章 省电",
  label: "虚拟化与省电",
  color: "#15803d",
  soft: "#dcfce7",
  chain: [
    "建立功耗基线",
    "识别系统电源状态",
    "测量CPU驻留",
    "约束设备唤醒",
    "验证网络与存储",
    "回归睡眠唤醒",
  ],
  concepts: [
    "第6章 省电",
    "HACK #40 ACPI",
    "HACK #41 使用ACPI的S状态",
    "HACK #42 使用CPU省电（C、P状态）",
    "HACK #43 PCI设备的热插拔",
    "HACK #44 虚拟环境下的省电",
    "HACK #45 远程管理机器的电源",
    "HACK #46 USB的电力管理",
    "HACK #47 显示器的省电",
    "HACK #48 通过网络设备节省电能",
    "HACK #49 关闭键盘的LED来省电",
    "HACK #50 PowerTOP",
    "HACK #51 硬盘的省电",
  ],
} as const;

export function Lke06PowerSavingMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke06PowerSavingExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke06PowerSavingEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
