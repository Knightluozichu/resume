import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第17章 ioctl操作",
  label: "高级套接字 · 内核接口",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["打开控制套接字","构造控制消息","发送查询","解析变长记录","核对内核状态","关闭释放"],
  concepts: ["第17章 ioctl操作","17.1 概述","17.2 ioctl函数","17.3 套接字操作","17.4 文件操作","17.5 接口配置","17.6 get_ifi_info函数","17.7 接口操作","17.8 ARP高速缓存操作","17.9 路由表操作","17.10 小结"],
} as const;

export function Unp17IoctlOperationsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp17IoctlOperationsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp17IoctlOperationsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
