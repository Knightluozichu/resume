import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第8章 精确一次性语义",
  focus:
    "区分幂等生产者与事务，解释生产者ID、序列号、事务ID、隔离级别和事务协调如何限定精确一次性语义",
  invariant:
    "精确一次只在明确的Kafka读处理写边界成立；事务记录、偏移量与输出原子提交，外部副作用不被口号式纳入保证",
  artifact: "重复写入反例、事务状态时序、隔离读实验、失败恢复轨迹与适用边界表",
  nodes: [
    "幂等生产者",
    "幂等生产者的工作原理",
    "幂等生产者的局限性",
    "如何使用幂等生产者",
    "事务",
    "事务的应用场景",
    "事务可以解决哪些问题",
    "事务是如何保证精确一次性的",
    "事务不能解决哪些问题",
    "如何使用事务",
    "事务ID和隔离",
    "事务的工作原理",
    "事务的性能",
    "小结",
  ],
} as const;

export function Kfk08ExactlyOnceSemanticsTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk08ExactlyOnceSemanticsReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk08ExactlyOnceSemanticsEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
