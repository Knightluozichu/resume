import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第14章 流式处理",
  focus:
    "用拓扑、时间、状态、流表二元性、窗口和处理保证解释设计模式，并完成Kafka Streams拓扑的构建、优化、测试、扩展与故障恢复",
  invariant:
    "事件时间与处理时间不混淆，状态和变更日志可恢复，连接与窗口边界明确，乱序、重放和故障不会产生未说明结果",
  artifact:
    "流处理拓扑、窗口与乱序样本、状态恢复演练、TopologyTestDriver测试和框架选型矩阵",
  nodes: [
    "什么是流式处理",
    "流式处理相关概念",
    "拓扑",
    "时间",
    "状态",
    "流和表",
    "时间窗口",
    "处理保证",
    "流式处理设计模式",
    "单事件处理",
    "使用本地状态",
    "多阶段处理和重分区",
    "使用外部查找：流和表的连接",
    "表与表的连接",
    "流与流的连接",
    "乱序事件",
    "重新处理",
    "交互式查询",
    "Streams示例",
    "字数统计",
    "股票市场统计",
    "填充点击事件流",
    "Streams架构概览",
    "构建拓扑",
    "优化拓扑",
    "测试拓扑",
    "扩展拓扑",
    "在故障中存活下来",
    "流式处理应用场景",
    "如何选择流式处理框架",
    "小结",
  ],
} as const;

export function Kfk14StreamProcessingTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk14StreamProcessingReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk14StreamProcessingEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
