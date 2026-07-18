import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第10章 SCTP客户/服务器程序例子",
  label: "基本套接字编程",
  color: "#b45309",
  soft: "#fef3c7",
  chain: ["建立多宿主端点","创建关联","选择流","接收通知","注入路径故障","终止关联"],
  concepts: ["第10章 SCTP客户/服务器程序例子","10.1 概述","10.2 SCTP一到多式流分回射服务器程序：main函数","10.3 SCTP一到多式流分回射客户程序：main函数","10.4 SCTP流分回射客户程序：sctpstr_cli函数","10.5 探究头端阻塞","10.6 控制流的数目","10.7 控制终结","10.8 小结"],
} as const;

export function Unp10SctpClientServerExampleMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp10SctpClientServerExampleExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp10SctpClientServerExampleEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
