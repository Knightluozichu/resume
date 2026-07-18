import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第5章 集群并处理失败",
  focus:
    "解释RabbitMQ 2.7集群元数据、队列主节点、分布交换器、内存与磁盘节点、滚动升级和经典镜像队列",
  invariant:
    "集群不自动复制普通队列内容；经典镜像策略、主从位置、节点类型与故障后可用性可由状态和消息集合证明",
  artifact:
    "三节点集群拓扑、元数据与队列位置表、升级步骤、经典镜像策略和主节点故障对账",
  nodes: [
    "开足马力：RabbitMQ集群",
    "集群架构",
    "集群中的队列",
    "分布交换器",
    "是内存节点还是磁盘节点",
    "在你的笔记本电脑上设置集群",
    "将节点分布到更多的机器上",
    "升级集群节点",
    "镜像队列和保留消息",
    "声明并使用镜像队列",
    "镜像队列工作原理",
    "总结",
  ],
} as const;

export function Rmq05ClusteringFailureTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq05ClusteringFailureDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq05ClusteringFailureEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
