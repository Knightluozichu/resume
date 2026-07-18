import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第31章 流",
  label: "并发、原始网络与设计范式",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["列出描述符","注册兴趣集合","等待就绪","推进连接状态","处理短计数","注销并关闭"],
  concepts: ["第31章 流","31.1 概述","31.2 概貌","31.3 getmsg和putmsg函数","31.4 getpmsg和putpmsg函数","31.5 ioctl函数","31.6 TPI：传输提供者接口","31.7 小结"],
} as const;

export function Unp31StreamsMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp31StreamsExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp31StreamsEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
