import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第18章 路由套接字",
  label: "高级套接字 · 内核接口",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["打开控制套接字","构造控制消息","发送查询","解析变长记录","核对内核状态","关闭释放"],
  concepts: ["第18章 路由套接字","18.1 概述","18.2 数据链路套接字地址结构","18.3 读和写","18.4 sysctl操作","18.5 get_ifi_info函数","18.6 接口名字和索引函数","18.7 小结"],
} as const;

export function Unp18RoutingSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp18RoutingSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp18RoutingSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
