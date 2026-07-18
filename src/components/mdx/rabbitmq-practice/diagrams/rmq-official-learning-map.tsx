import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "原书权威学习地图",
  focus:
    "沿12章与3个附录建立从AMQP消息基础、模式编码、集群故障到管理监控、安全插件和跨语言客户端的完整路线",
  invariant:
    "15个正式单元、全部160个章/附录/节节点、实验与证据逐一可达，课程固定RabbitMQ 2.7时代且不混入后来的实现",
  artifact: "17页路线、完整目录映射、版本边界、依赖图与全书验收清单",
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

export function RmqOfficialLearningMapTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function RmqOfficialLearningMapDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function RmqOfficialLearningMapEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
