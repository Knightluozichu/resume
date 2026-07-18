import { OfficialUnixNetworkProgrammingLab } from "./official-unix-network-programming-lab";

const data = {
  title: "第1章 简介",
  label: "简介与TCP/IP",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: ["冻结测试网络","辨认协议层","建立端点","捕获分组","注入断开","关闭并重放"],
  concepts: ["第一部分 简介和TCP/IP","第1章 简介","1.1 概述","1.2 一个简单的时间获取客户程序","1.3 协议无关性","1.4 错误处理：包裹函数","1.5 一个简单的时间获取服务器程序","1.6 本书中客户/服务器程序示例索引表","1.7 OSI模型","1.8 BSD网络支持历史","1.9 测试用网络及主机","1.10 UNIX标准","1.11 64位体系结构","1.12 小结"],
} as const;

export function Unp01IntroductionMapLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="map" />;
}

export function Unp01IntroductionExperimentLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="experiment" />;
}

export function Unp01IntroductionEvidenceLab() {
  return <OfficialUnixNetworkProgrammingLab {...data} view="evidence" />;
}
