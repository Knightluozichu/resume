import { OfficialLinuxKernelLab } from "./official-linux-kernel-lab";

const data = {
  title: "第4章 网络",
  label: "存储与网络",
  color: "#b91c1c",
  soft: "#fee2e2",
  chain: [
    "绘制接口拓扑",
    "生成固定流量",
    "施加队列规则",
    "叠加二层虚拟设备",
    "注入链路故障",
    "定位丢包层级",
  ],
  concepts: [
    "第4章 网络",
    "HACK #22 如何控制网络的带宽",
    "HACK #23 TUN/TAP设备",
    "HACK #24 网桥设备",
    "HACK #25 VLAN",
    "HACK #26 bonding驱动程序",
    "HACK #27 Network Drop Monitor",
  ],
} as const;

export function Lke04NetworkingMapLab() {
  return <OfficialLinuxKernelLab {...data} view="map" />;
}

export function Lke04NetworkingExperimentLab() {
  return <OfficialLinuxKernelLab {...data} view="experiment" />;
}

export function Lke04NetworkingEvidenceLab() {
  return <OfficialLinuxKernelLab {...data} view="evidence" />;
}
