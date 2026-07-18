import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第12章 管理Kafka",
  focus:
    "系统执行主题、消费者群组、动态配置、生产消费、分区管理、日志检查、副本验证及高风险底层操作",
  invariant:
    "每次管理操作都有对象、前置状态、预期状态、完成证据和回退；不可逆操作只在备份、停止边界和双人复核后执行",
  artifact:
    "管理命令运行手册、变更快照、分区副本计划、日志诊断记录与危险操作审批模板",
  nodes: [
    "主题操作",
    "创建新主题",
    "列出集群中的所有主题",
    "列出主题详情",
    "增加分区",
    "减少分区",
    "删除主题",
    "消费者群组",
    "列出并描述消费者群组信息",
    "删除消费者群组",
    "偏移量管理",
    "动态配置变更",
    "覆盖主题的默认配置",
    "覆盖客户端和用户的默认配置",
    "覆盖broker的默认配置",
    "查看被覆盖的配置",
    "移除被覆盖的配置",
    "生产和消费",
    "控制台生产者",
    "控制台消费者",
    "分区管理",
    "首选首领选举",
    "修改分区的副本",
    "转储日志片段",
    "副本验证",
    "其他工具",
    "不安全的操作",
    "移动集群控制器",
    "移除待删除的主题",
    "手动删除主题",
    "小结",
  ],
} as const;

export function Kfk12AdministeringKafkaTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk12AdministeringKafkaReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk12AdministeringKafkaEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
