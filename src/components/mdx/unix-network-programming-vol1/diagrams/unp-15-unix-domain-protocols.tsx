import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第15章 UNIX域协议",
  label: "高级套接字 · 内核接口",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["解析监听地址","创建绑定监听","接受连接","传输字节流","处理半关闭","回收连接"],
  concepts: ["第15章 UNIX域协议","15.1 概述","15.2 UNIX域套接字地址结构","15.3 socketpair函数","15.4 套接字函数","15.5 UNIX域字节流客户/服务器程序","15.6 UNIX域数据报客户/服务器程序","15.7 描述符传递","15.8 接收发送者的凭证","15.9 小结"],
} as const;

export function Unp15UnixDomainProtocolsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp15UnixDomainProtocolsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp15UnixDomainProtocolsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
