import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第6章 Linux 网络配置",
  label: "网络 · 地址与服务",
  color: "#166534",
  soft: "#f0fdf4",
  chain: [
    "采集接口状态",
    "计算同网段范围",
    "配置地址路由",
    "验证DNS解析",
    "启动网络服务",
    "端到端排障",
  ],
  concepts: [
    "第6章 Linux 网络配置",
    "6.1 网络基础知识",
    "6.1.1 IP 地址",
    "6.1.2 子网掩码",
    "6.1.3 网关",
    "6.1.4 DNS 服务器",
    "6.2 Linux 操作系统网络配置",
    "6.2.1 图形界面配置网络",
    "6.2.2 指令配置网络",
    "6.3 Linux 操作系统常用网络服务配置",
    "6.3.1 TFTP 服务",
    "6.3.2 NFS 服务",
    "6.3.3 SSH 服务",
    "6.4 本章小结",
  ],
} as const;

export function Lop06NetworkConfigurationMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop06NetworkConfigurationExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop06NetworkConfigurationEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
