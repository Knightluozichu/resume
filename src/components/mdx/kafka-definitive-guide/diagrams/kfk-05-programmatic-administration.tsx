import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第5章 编程式管理Kafka",
  focus:
    "用AdminClient异步API管理主题、配置、消费者群组、集群元数据、分区、消息删除、首领选举和副本重分配",
  invariant:
    "管理调用按future结果而非发起动作判定完成，最终一致性窗口有轮询与超时，危险变更具备前置快照、验证和回退",
  artifact:
    "AdminClient操作矩阵、异步完成时序、变更前后快照、测试夹具与回滚手册",
  nodes: [
    "AdminClient概览",
    "异步和最终一致性API",
    "配置参数",
    "扁平的结构",
    "额外的话",
    "AdminClient生命周期：创建、配置和关闭",
    "client.dns.lookup",
    "request.timeout.ms",
    "基本的主题管理操作",
    "配置管理",
    "消费者群组管理",
    "查看消费者群组",
    "修改消费者群组",
    "集群元数据",
    "高级的管理操作",
    "为主题添加分区",
    "从主题中删除消息",
    "首领选举",
    "重新分配副本",
    "测试",
    "小结",
  ],
} as const;

export function Kfk05ProgrammaticAdministrationTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk05ProgrammaticAdministrationReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk05ProgrammaticAdministrationEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
