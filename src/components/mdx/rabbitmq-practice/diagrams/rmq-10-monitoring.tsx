import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第10章 监控",
  focus:
    "用Nagios、AMQP模拟检测、REST、配置文件监测与集群状态检查broker，并从AMQP和REST监控消费者与队列基线",
  invariant:
    "存活、可连接、可发布消费、集群一致和消费者进度分别监测；每个告警绑定阈值、窗口、处置与恢复验证",
  artifact:
    "Nagios探针、AMQP端到端探针、REST检查、配置哈希、集群仪表、队列基线与告警手册",
  nodes: [
    "监控RabbitMQ：密切关注你的warren",
    "为Nagios编写健康检测",
    "使用AMQP模拟检测来确认RabbitMQ是否运行",
    "使用REST API来检测",
    "监控配置文件修改",
    "监控集群状态",
    "确保消费者正常工作",
    "通过AMQP监控队列等级",
    "使用REST API来监控队列级别",
    "建立队列的消息计数基准经验法则",
    "总结",
  ],
} as const;

export function Rmq10MonitoringTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq10MonitoringDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq10MonitoringEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
