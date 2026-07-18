import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第13章 监控Kafka",
  focus:
    "从指标来源和应用健康出发建立SLI、SLO与告警，覆盖broker、主题分区、JVM、操作系统、日志、客户端、配额、滞后和端到端监控",
  invariant:
    "每个告警绑定用户可见风险、时间窗口和处置动作；broker健康、客户端交付、消费者滞后与端到端新鲜度不能互相替代",
  artifact:
    "指标字典、SLO预算、告警规则、非同步分区诊断树、客户端与端到端仪表盘",
  nodes: [
    "指标基础",
    "指标来自哪里",
    "需要哪些指标",
    "应用程序健康检测",
    "服务级别目标",
    "服务级别定义",
    "哪些指标是好的SLI",
    "将SLO用于告警",
    "broker的指标",
    "诊断集群问题",
    "非同步分区的艺术",
    "broker指标",
    "主题的指标和分区的指标",
    "Java虚拟机监控",
    "操作系统监控",
    "日志",
    "客户端监控",
    "生产者指标",
    "消费者指标",
    "配额",
    "滞后监控",
    "端到端监控",
    "小结",
  ],
} as const;

export function Kfk13MonitoringKafkaTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk13MonitoringKafkaReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk13MonitoringKafkaEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
