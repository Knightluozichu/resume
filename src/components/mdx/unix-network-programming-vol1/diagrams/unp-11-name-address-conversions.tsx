import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第11章 名字与地址转换",
  label: "基本套接字编程",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: ["解析名字服务","遍历候选地址","创建匹配套接字","尝试连接绑定","反向格式化","释放地址链"],
  concepts: ["第11章 名字与地址转换","11.1 概述","11.2 域名系统","11.3 gethostbyname函数","11.4 gethostbyaddr函数","11.5 getservbyname和getservbyport函数","11.6 getaddrinfo函数","11.7 gai_strerror函数","11.8 freeaddrinfo函数","11.9 getaddrinfo函数：IPv6","11.10 getaddrinfo函数：例子","11.11 host_serv函数","11.12 tcp_connect函数","11.13 tcp_listen函数","11.14 udp_client函数","11.15 udp_connect函数","11.16 udp_server函数","11.17 getnameinfo函数","11.18 可重入函数","11.19 gethostbyname_r和gethostbyaddr_r函数","11.20 作废的IPv6地址解析函数","11.21 其他网络相关信息","11.22 小结"],
} as const;

export function Unp11NameAddressConversionsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp11NameAddressConversionsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp11NameAddressConversionsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
