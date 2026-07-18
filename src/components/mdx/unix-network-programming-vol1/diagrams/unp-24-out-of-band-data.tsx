import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第24章 带外数据",
  label: "广播多播与高级传输",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第24章 带外数据","24.1 概述","24.2 TCP带外数据","24.3 sockatmark函数","24.4 TCP带外数据小结","24.5 客户/服务器心搏函数","24.6 小结"],
} as const;

export function Unp24OutOfBandDataMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp24OutOfBandDataExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp24OutOfBandDataEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
