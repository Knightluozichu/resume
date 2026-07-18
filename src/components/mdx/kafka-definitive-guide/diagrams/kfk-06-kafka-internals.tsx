import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第6章 深入Kafka",
  focus:
    "从集群成员关系与控制器进入复制、请求处理、分层存储、分区分配、日志片段、文件格式、索引和日志压实",
  invariant:
    "控制器纪元阻止旧决策生效，ISR与高水位限定可见记录，日志片段、索引和压实后的键语义能够由磁盘证据重建",
  artifact:
    "控制平面状态图、生产与获取请求链、分区副本布局、日志片段检查与压实前后对账",
  nodes: [
    "集群的成员关系",
    "控制器",
    "复制",
    "处理请求",
    "生产请求",
    "获取请求",
    "其他请求",
    "物理存储",
    "分层存储",
    "分区的分配",
    "文件管理",
    "文件格式",
    "索引",
    "压实",
    "压实的工作原理",
    "被删除的事件",
    "何时会压实主题",
    "小结",
  ],
} as const;

export function Kfk06KafkaInternalsTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk06KafkaInternalsReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk06KafkaInternalsEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
