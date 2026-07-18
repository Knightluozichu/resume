"use client";
import { ComputerOperationLab } from "./official-computer-operation-lab";
const chain = [
  "读取网卡MAC",
  "获取IP配置",
  "观察DHCP租约",
  "追踪路由下一跳",
  "解析DNS与ARP",
  "验证TCP传输",
] as const;
const concepts = [
  "第9章 通过七个简单的实验理解TCP/IP网络",
  "9.1 实验环境",
  "9.2 实验1：查看网卡的MAC地址",
  "9.3 实验2：查看计算机的IP地址",
  "9.4 实验3：了解DHCP服务器的作用",
  "9.5 实验4：路由器是数据传输过程中的指路人",
  "9.6 实验5：查看路由器的路由过程",
  "9.7 实验6：DNS服务器可以把主机名解析成IP地址",
  "9.8 实验7：查看IP地址和MAC地址的对应关系",
  "9.9 TCP的作用及TCP/IP网络的层级模型",
] as const;
const common = {
  title: "第 9 章 通过七个简单的实验理解TCP/IP网络",
  label: "计算机怎样运行 · 网络与数据交换",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Hcw09TcpIpMapLab() {
  return <ComputerOperationLab {...common} view="map" />;
}
export function Hcw09TcpIpExperimentLab() {
  return <ComputerOperationLab {...common} view="experiment" />;
}
export function Hcw09TcpIpEvidenceLab() {
  return <ComputerOperationLab {...common} view="evidence" />;
}
