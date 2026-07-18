import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第4章 Kafka消费者——从Kafka读取数据",
  focus:
    "沿消费者群组、订阅、轮询、分区分配、再均衡、偏移量提交、反序列化和退出协议建立可证明消费语义",
  invariant:
    "每个分区在一个群组内同一时刻只有一个有效消费者，处理完成点与提交偏移量关系明确，再均衡和崩溃后可界定重复或丢失窗口",
  artifact:
    "群组分配图、轮询与提交时序、再均衡故障实验、偏移量对账与退出检查表",
  nodes: [
    "Kafka消费者相关概念",
    "消费者和消费者群组",
    "消费者群组和分区再均衡",
    "群组固定成员",
    "创建Kafka消费者",
    "订阅主题",
    "轮询",
    "配置消费者",
    "fetch.min.bytes",
    "fetch.max.wait.ms",
    "fetch.max.bytes",
    "max.poll.records",
    "max.partition.fetch.bytes",
    "session.timeout.ms和heartbeat.interval.ms",
    "max.poll.interval.ms",
    "default.api.timeout.ms",
    "request.timeout.ms",
    "auto.offset.reset",
    "enable.auto.commit",
    "partition.assignment.strategy",
    "client.id",
    "client.rack",
    "group.instance.id",
    "receive.buffer.bytes和send.buffer.bytes",
    "offsets.retention.minutes",
    "提交和偏移量",
    "自动提交",
    "提交当前偏移量",
    "异步提交",
    "同步和异步组合提交",
    "提交特定的偏移量",
    "再均衡监听器",
    "从特定偏移量位置读取记录",
    "如何退出",
    "反序列化器",
    "自定义反序列化器",
    "在消费者里使用Avro反序列器",
    "独立的消费者：为什么以及怎样使用不属于任何群组的消费者",
    "小结",
  ],
} as const;

export function Kfk04KafkaConsumersTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk04KafkaConsumersReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk04KafkaConsumersEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
