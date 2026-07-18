import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第11章 其他主题",
  label: "第11章 · 签名、Verifier与过滤",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "建立签名信任",
    "启用定向Verifier",
    "调用原生API",
    "附加过滤设备",
    "监视转发请求",
    "评估挂钩与内核库",
  ],
  concepts: [
    "第11章 其他主题",
    "11.1 驱动程序签名",
    "11.2 驱动程序验证器",
    "11.3 使用原生API",
    "11.4 过滤驱动程序",
    "11.4.1 过滤驱动程序的实现",
    "11.4.2 附加过滤器",
    "11.4.3 在任意时刻附加过滤器",
    "11.4.4 过滤器的清理",
    "11.4.5 基于硬件的过滤驱动程序的更多内容",
    "11.5 设备监视器",
    "11.5.1 增加过滤设备",
    "11.5.2 移除过滤设备",
    "11.5.3 初始化和卸载",
    "11.5.4 处理请求",
    "11.5.5 测试驱动程序",
    "11.5.6 请求的结果",
    "11.6 驱动程序挂钩",
    "11.7 内核库",
    "11.8 总结",
  ],
} as const;

export function Wkp11MiscellaneousTopicsMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp11MiscellaneousTopicsExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp11MiscellaneousTopicsEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
