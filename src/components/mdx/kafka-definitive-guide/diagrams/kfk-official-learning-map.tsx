import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第2版权威学习地图",
  focus:
    "沿14章与2个附录建立从Kafka抽象、客户端、内部机制、可靠性到数据平台与流处理的完整路线",
  invariant:
    "16个正式单元、全部目录节点、实验与证据交付逐一可达，课程不混入第1版的旧目录或书后发布内容",
  artifact: "18页路线、完整目录映射、依赖图、版本边界与全书验收清单",
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

export function KfkOfficialLearningMapTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function KfkOfficialLearningMapReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function KfkOfficialLearningMapEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
