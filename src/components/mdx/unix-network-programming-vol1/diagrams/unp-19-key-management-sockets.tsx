import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第19章 密钥管理套接字",
  label: "高级套接字 · 内核接口",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["打开控制套接字","构造控制消息","发送查询","解析变长记录","核对内核状态","关闭释放"],
  concepts: ["第19章 密钥管理套接字","19.1 概述","19.2 读和写","19.3 倾泻安全关联数据库","19.4 创建静态安全关联","19.5 动态维护安全关联","19.6 小结"],
} as const;

export function Unp19KeyManagementSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp19KeyManagementSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp19KeyManagementSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
