import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第7章 可靠的数据传递",
  focus:
    "把Kafka可靠性保证、复制、broker配置、生产者确认重试、消费者提交和系统验证连成端到端数据交付证明",
  invariant:
    "复制系数、ISR、最少同步副本、acks和提交边界共同满足既定RPO/RTO；任何故障结论都由消息ID与偏移量对账证明",
  artifact:
    "可靠性契约、故障矩阵、生产消费配置组合、丢失重复窗口与生产监控证据",
  nodes: [
    "可靠性保证",
    "复制",
    "broker配置",
    "复制系数",
    "不彻底的首领选举",
    "最少同步副本",
    "保持副本同步",
    "持久化到磁盘",
    "在可靠的系统中使用生产者",
    "发送确认",
    "配置生产者的重试参数",
    "额外的错误处理",
    "在可靠的系统中使用消费者",
    "消费者的可靠性配置",
    "手动提交偏移量",
    "验证系统可靠性",
    "验证配置",
    "验证应用程序",
    "在生产环境中监控可靠性",
    "小结",
  ],
} as const;

export function Kfk07ReliableDataDeliveryTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk07ReliableDataDeliveryReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk07ReliableDataDeliveryEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
