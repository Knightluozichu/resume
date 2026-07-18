import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第7章 warren和Shovel：故障转移和复制",
  focus:
    "比较基于负载均衡器的主从warren与RabbitMQ集群，并用Shovel跨远距离broker复制消息",
  invariant:
    "复制方向、源队列、目标交换器、确认点、断线重试和重复语义明确，远距离链路恢复后源目标消息集合可对账",
  artifact:
    "warren主从拓扑、HAProxy切换演练、Shovel安装配置、跨站延迟与重复丢失对账",
  nodes: [
    "warren：另一种集群方式",
    "设定负载均衡器——基于主/从的集群",
    "远距离通信和复制",
    "给Rabbit装备Shovel：Shovel插件介绍",
    "安装Shovel",
    "配置并运行Shovel",
    "总结",
  ],
} as const;

export function Rmq07WarrensShovelsTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq07WarrensShovelsDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq07WarrensShovelsEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
