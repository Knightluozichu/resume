import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第2章 开始内核开发",
  label: "第2章 · 工具与首个驱动",
  color: "#7c2d12",
  soft: "#fff7ed",
  chain: [
    "冻结工具版本",
    "创建驱动项目",
    "实现入口卸载",
    "构建签名",
    "部署加载",
    "跟踪并卸载",
  ],
  concepts: [
    "第2章 开始内核开发",
    "2.1 安装工具",
    "2.2 创建一个驱动程序项目",
    "2.3 DriverEntry和Unload例程",
    "2.4 部署驱动程序",
    "2.5 简单的跟踪",
    "2.7 总结",
  ],
} as const;

export function Wkp02GettingStartedKernelDevelopmentMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp02GettingStartedKernelDevelopmentExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp02GettingStartedKernelDevelopmentEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
