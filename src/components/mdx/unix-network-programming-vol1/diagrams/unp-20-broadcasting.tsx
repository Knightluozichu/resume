import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第20章 广播",
  label: "广播多播与高级传输",
  color: "#047857",
  soft: "#d1fae5",
  chain: ["选择接口地址","配置广播多播","加入接收组","发送数据报","观察复制范围","离组并关闭"],
  concepts: ["第20章 广播","20.1 概述","20.2 广播地址","20.3 单播和广播的比较","20.4 使用广播的dg_cli函数","20.5 竞争状态","20.6 小结"],
} as const;

export function Unp20BroadcastingMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp20BroadcastingExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp20BroadcastingEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
