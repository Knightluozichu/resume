import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第9章 基本SCTP套接字编程",
  label: "基本套接字编程",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: ["建立多宿主端点","创建关联","选择流","接收通知","注入路径故障","终止关联"],
  concepts: ["第9章 基本SCTP套接字编程","9.1 概述","9.2 接口模型","9.3 sctp_bindx函数","9.4 sctp_connectx函数","9.5 sctp_getpaddrs函数","9.6 sctp_freepaddrs函数","9.7 sctp_getladdrs函数","9.8 sctp_freeladdrs函数","9.9 sctp_sendmsg函数","9.10 sctp_recvmsg函数","9.11 sctp_opt_info函数","9.12 sctp_peeloff函数","9.13 shutdown函数","9.14 通知","9.15 小结"],
} as const;

export function Unp09ElementarySctpSocketsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp09ElementarySctpSocketsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp09ElementarySctpSocketsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
