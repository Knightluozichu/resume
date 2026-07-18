import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第1章 初识Kafka",
  focus:
    "从发布订阅需求推导消息、批次、模式、主题、分区、生产者、消费者、broker、集群和多集群的完整抽象",
  invariant:
    "同一分区内记录顺序和偏移量单调可解释，生产者与消费者通过持久日志解耦，扩容不会暗中改变键的顺序契约",
  artifact: "需求到Kafka抽象映射、分区键样本、端到端消息轨迹与多集群边界表",
  nodes: [
    "发布与订阅消息系统",
    "如何开始",
    "独立的队列系统",
    "Kafka登场",
    "消息和批次",
    "模式",
    "主题和分区",
    "生产者和消费者",
    "broker和集群",
    "多集群",
    "为什么选择Kafka",
    "多个生产者",
    "多个消费者",
    "基于磁盘的数据保留",
    "伸缩性",
    "高性能",
    "平台特性",
    "数据生态系统",
    "起源故事",
    "LinkedIn的问题",
    "Kafka的诞生",
    "走向开源",
    "商业化",
    "命名",
    "开始Kafka之旅",
  ],
} as const;

export function Kfk01MeetKafkaTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk01MeetKafkaReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk01MeetKafkaEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
