import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第3章 Kafka生产者——向Kafka写入数据",
  focus:
    "追踪ProducerRecord经序列化、分区、批处理、压缩、网络请求、确认与重试写入Kafka的全过程",
  invariant:
    "成功确认与失败语义由acks、超时、重试和幂等配置共同定义，序列化与分区规则稳定，重试不制造不可解释重复",
  artifact:
    "生产请求时序、分区分布、批次吞吐实验、错误分类表与幂等写入验收记录",
  nodes: [
    "生产者概览",
    "创建Kafka生产者",
    "发送消息到Kafka",
    "同步发送消息",
    "异步发送消息",
    "生产者配置",
    "client.id",
    "acks",
    "消息传递时间",
    "linger.ms",
    "buffer.memory",
    "compression.type",
    "batch.size",
    "max.in.flight.requests.per.connection",
    "max.request.size",
    "receive.buffer.bytes和send.buffer.bytes",
    "enable.idempotence",
    "序列化器",
    "自定义序列化器",
    "使用Avro序列化数据",
    "在Kafka中使用Avro记录",
    "分区",
    "标头",
    "拦截器",
    "配额和节流",
    "小结",
  ],
} as const;

export function Kfk03KafkaProducersTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk03KafkaProducersReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk03KafkaProducersEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
