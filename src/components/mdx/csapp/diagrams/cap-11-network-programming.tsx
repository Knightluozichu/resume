"use client";

import { OfficialCsappLab } from "./official-csapp-lab";

const chain = [
  "解析主机服务",
  "创建套接字",
  "建立连接",
  "收发可靠字节流",
  "解析 HTTP",
  "关闭连接",
] as const;
const concepts = [
  "第11章 网络编程",
  "11.1 客户端服务器编程模型",
  "11.2 网络",
  "11.3 全球IP因特网",
  "11.3.1 IP地址",
  "11.3.2 因特网域名",
  "11.3.3 因特网连接",
  "11.4 套接字接口",
  "11.4.1 套接字地址结构",
  "11.4.2 socket函数",
  "11.4.3 connect函数",
  "11.4.4 bind函数",
  "11.4.5 listen函数",
  "11.4.6 accept函数",
  "11.4.7 主机和服务的转换",
  "11.4.8 套接字接口的辅助函数",
  "11.4.9 echo客户端和服务器的示例",
  "11.5 Web服务器",
  "11.5.1 Web基础",
  "11.5.2 Web内容",
  "11.5.3 HTTP事务",
  "11.5.4 服务动态内容",
  "11.6 综合：TINY Web服务器",
  "11.7 小结",
] as const;
const common = {
  title: "第 11 章 网络编程",
  label: "程序间的交互和通信 · 网络编程",
  color: "#0e7490",
  soft: "#cffafe",
  chain,
  concepts,
} as const;

export function Cap11NetworkProgrammingMapLab() {
  return <OfficialCsappLab {...common} view="map" />;
}

export function Cap11NetworkProgrammingExperimentLab() {
  return <OfficialCsappLab {...common} view="experiment" />;
}

export function Cap11NetworkProgrammingEvidenceLab() {
  return <OfficialCsappLab {...common} view="evidence" />;
}
