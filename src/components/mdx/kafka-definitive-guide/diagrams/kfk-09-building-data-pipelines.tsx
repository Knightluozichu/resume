import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第9章 构建数据管道",
  focus:
    "依据及时性、可靠性、吞吐、格式、转换、安全、故障和耦合约束选择Connect API、客户端API或其他摄取框架",
  invariant:
    "source offset、Kafka offset与sink结果可关联，模式演化可兼容，重试和死信不会破坏可追踪性，扩缩容保持任务所有权清晰",
  artifact:
    "管道需求表、连接器配置、offset链路、单个消息转换测试、故障恢复与数据对账",
  nodes: [
    "构建数据管道时需要考虑的问题",
    "及时性",
    "可靠性",
    "高吞吐量和动态吞吐量",
    "数据格式",
    "转换",
    "安全性",
    "故障处理",
    "耦合性和灵活性",
    "何时使用Connect API或客户端API",
    "Kafka Connect",
    "运行Connect",
    "连接器示例：文件数据源和文件数据池",
    "连接器示例：从MySQL到ElasticSearch",
    "单个消息转换",
    "深入理解Connect",
    "Connect之外的选择",
    "其他数据存储系统的数据摄入框架",
    "基于图形界面的ETL工具",
    "流式处理框架",
    "小结",
  ],
} as const;

export function Kfk09BuildingDataPipelinesTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk09BuildingDataPipelinesReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk09BuildingDataPipelinesEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
