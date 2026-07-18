import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第7章 I/O请求包",
  label: "第7章 · IRP",
  color: "#0369a1",
  soft: "#f0f9ff",
  chain: [
    "接收IRP",
    "读取栈位置",
    "验证长度方法",
    "访问系统缓冲",
    "设置完成状态",
    "由客户端核对结果",
  ],
  concepts: [
    "第7章 I/O请求包",
    "7.1 IRP简介",
    "7.2 设备节点",
    "7.3 IRP和I/O栈位置",
    "7.4 分发例程",
    "7.5 访问用户缓冲区",
    "7.5.1 缓冲I/O",
    "7.5.2 直接I/O",
    "7.5.3 IRP_MJ_DEVICE_CONTROL的用户缓冲区",
    "7.6 汇总：Zero驱动程序",
    "7.6.1 使用预编译头",
    "7.6.2 DriverEntry例程",
    "7.6.3 读分发例程",
    "7.6.4 写分发例程",
    "7.6.5 测试应用",
    "7.7 总结",
  ],
} as const;

export function Wkp07IoRequestPacketMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp07IoRequestPacketExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp07IoRequestPacketEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
