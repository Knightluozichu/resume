import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第2版全书总复习",
  focus:
    "贯通16个正式单元，设计一套可部署、可靠、安全、可监控、可跨集群恢复并支持流处理的数据平台",
  invariant:
    "目录、拓扑、性能、交付语义、安全、运维和数据对账七类证据同时通过，任何单点成功不能平均掉失败门",
  artifact: "全书架构决策、容量与可靠性实验、故障演练、SLO仪表和独立交接包",
  nodes: [
    "第1章 初识Kafka",
    "第2章 安装Kafka",
    "第3章 Kafka生产者——向Kafka写入数据",
    "第4章 Kafka消费者——从Kafka读取数据",
    "第5章 编程式管理Kafka",
    "第6章 深入Kafka",
    "第7章 可靠的数据传递",
    "第8章 精确一次性语义",
    "第9章 构建数据管道",
    "第10章 跨集群数据镜像",
    "第11章 保护Kafka",
    "第12章 管理Kafka",
    "第13章 监控Kafka",
    "第14章 流式处理",
    "附录A 在其他操作系统中安装Kafka",
    "附录B 其他Kafka工具",
  ],
} as const;

export function KfkOfficialFinalReviewTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function KfkOfficialFinalReviewReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function KfkOfficialFinalReviewEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
