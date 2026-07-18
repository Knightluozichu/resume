import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第1章 Windows内部概览",
  label: "第1章 · 内部模型",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "定位进程地址空间",
    "解释页状态",
    "关联线程栈",
    "穿越系统调用",
    "解析句柄对象",
    "访问命名对象",
  ],
  concepts: [
    "第1章 Windows内部概览",
    "1.1 进程",
    "1.2 虚拟内存",
    "1.2.1 页状态",
    "1.2.2 系统内存",
    "1.3 线程",
    "1.4 系统服务",
    "1.5 系统总体架构",
    "1.6 句柄和对象",
    "1.6.1 对象名称",
    "1.6.2 访问已经存在的对象",
  ],
} as const;

export function Wkp01WindowsInternalsOverviewMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp01WindowsInternalsOverviewExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp01WindowsInternalsOverviewEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
