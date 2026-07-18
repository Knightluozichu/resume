import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "全书总复习",
  focus:
    "贯通15个正式单元，交付一套RabbitMQ 2.7时代可部署、可编码、可故障恢复、可管理监控、可加固扩展的消息系统",
  invariant:
    "目录、拓扑、交付语义、故障、运维、安全和消息对账七类证据同时通过，局部吞吐或在线率不能平均掉失败门",
  artifact: "全书架构、容量与可靠性实验、故障演练、监控安全证据和独立交接包",
  nodes: [
    "第1章 天降奇兵",
    "第2章 理解消息通信",
    "第3章 运行和管理Rabbit",
    "第4章 解决Rabbit相关问题：编码与模式",
    "第5章 集群并处理失败",
    "第6章 从故障中恢复",
    "第7章 warren和Shovel：故障转移和复制",
    "第8章 从Web端管理RabbitMQ",
    "第9章 使用REST API控制Rabbit",
    "第10章 监控",
    "第11章 提升性能，保障安全",
    "第12章 聪明的Rabbit：扩展RabbitMQ",
    "附录A 在Java和.NET上使用Rabbit",
    "附录B 在线资源",
    "附录C 在Windows上安装RabbitMQ",
  ],
} as const;

export function RmqOfficialFinalReviewTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function RmqOfficialFinalReviewDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function RmqOfficialFinalReviewEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
