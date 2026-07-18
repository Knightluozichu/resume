import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第5章 调试",
  label: "第5章 · WinDbg",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "安装调试工具",
    "配置符号源码",
    "建立目标连接",
    "命中驱动断点",
    "检查栈与对象",
    "保存并复盘会话",
  ],
  concepts: [
    "第5章 调试",
    "5.1 Debugging Tools for Windows",
    "5.2 WinDbg简介",
    "5.3 内核调试",
    "5.3.1 本地内核调试",
    "5.3.2 本地内核调试教程",
    "5.4 完整内核调试",
    "5.4.1 配置目标机",
    "5.4.2 配置宿主机",
    "5.5 内核驱动程序调试教程",
    "5.6 总结",
  ],
} as const;

export function Wkp05DebuggingMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp05DebuggingExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp05DebuggingEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
