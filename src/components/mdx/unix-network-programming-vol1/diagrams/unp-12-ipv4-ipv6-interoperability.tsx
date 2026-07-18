import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第12章 IPv4与IPv6的互操作性",
  label: "高级套接字 · 内核接口",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["解析名字服务","遍历候选地址","创建匹配套接字","尝试连接绑定","反向格式化","释放地址链"],
  concepts: ["第三部分 高级套接字编程","第12章 IPv4与IPv6的互操作性","12.1 概述","12.2 IPv4客户与IPv6服务器","12.3 IPv6客户与IPv4服务器","12.4 IPv6地址测试宏","12.5 源代码可移植性","12.6 小结"],
} as const;

export function Unp12Ipv4Ipv6InteroperabilityMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp12Ipv4Ipv6InteroperabilityExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp12Ipv4Ipv6InteroperabilityEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
