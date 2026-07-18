"use client";
import { OfficialOsConceptsLab } from "./official-os-concepts-lab";
const chain = [
  "发现网络节点",
  "建立通信协议",
  "解析分布式名称",
  "访问远程资源",
  "协调复制状态",
  "处理节点故障",
] as const;
const concepts = [
  "第19章 网络与分布式系统",
  "19.1 分布式系统的优点",
  "19.1.1 资源共享",
  "19.1.2 计算加速",
  "19.1.3 可靠性",
  "19.2 网络结构",
  "19.2.1 局域网",
  "19.2.2 广域网",
  "19.3 通信结构",
  "19.3.1 命名和名称解析",
  "19.3.2 通信协议",
  "19.3.3 TCP/IP示例",
  "19.3.4 网络协议UDP与TCP",
  "19.4 网络与分布式操作系统",
  "19.4.1 网络操作系统",
  "19.4.2 分布式操作系统",
  "19.5 分布式系统的设计问题",
  "19.5.1 健壮性",
  "19.5.2 透明",
  "19.5.3 可扩展性",
  "19.6 分布式文件系统",
  "19.6.1 客户端-服务器DFS模型",
  "19.6.2 基于集群的DFS模型",
  "19.7 DFS命名与透明",
  "19.7.1 命名结构",
  "19.7.2 命名方案",
  "19.7.3 实现技术",
  "19.8 远程文件访问",
  "19.8.1 基本缓存方案",
  "19.8.2 缓存位置",
  "19.8.3 缓存更新策略",
  "19.8.4 一致性",
  "19.9 关于分布式文件系统的结语",
  "19.10 本章小结",
] as const;
const common = {
  title: "第 19 章 网络与分布式系统",
  label: "第八部分 高级主题",
  color: "#b45309",
  soft: "#fef3c7",
  chain,
  concepts,
} as const;
export function Osc19NetworkDistributedMapLab() {
  return <OfficialOsConceptsLab {...common} view="map" />;
}
export function Osc19NetworkDistributedExperimentLab() {
  return <OfficialOsConceptsLab {...common} view="experiment" />;
}
export function Osc19NetworkDistributedEvidenceLab() {
  return <OfficialOsConceptsLab {...common} view="evidence" />;
}
