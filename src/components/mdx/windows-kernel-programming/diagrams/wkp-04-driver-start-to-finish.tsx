import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第4章 驱动程序：从头到尾",
  label: "第4章 · 控制设备协议",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "定义协议结构",
    "初始化驱动",
    "创建设备符号链接",
    "打开关闭句柄",
    "分发IOCTL",
    "安装端到端测试",
  ],
  concepts: [
    "第4章 驱动程序：从头到尾",
    "4.1 简介",
    "4.2 驱动程序初始化",
    "4.2.1 将信息传递给驱动程序",
    "4.2.2 客户程序/驱动程序之间的通信协议",
    "4.2.3 创建设备对象",
    "4.3 客户代码",
    "4.4 Create和Close分发例程",
    "4.5 DeviceIoControl分发例程",
    "4.6 安装与测试",
    "4.7 总结",
  ],
} as const;

export function Wkp04DriverStartToFinishMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp04DriverStartToFinishExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp04DriverStartToFinishEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
