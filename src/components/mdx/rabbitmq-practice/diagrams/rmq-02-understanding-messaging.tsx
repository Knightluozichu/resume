import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第2章 理解消息通信",
  focus:
    "沿生产者、消费者、队列、交换器、绑定、虚拟主机、持久化和发送方确认重建一条消息的一生",
  invariant:
    "交换器按类型和绑定路由，队列所有权与隔离明确，durable、persistent、ack和publisher confirm各自只证明自己的边界",
  artifact:
    "AMQP拓扑图、消息生命周期、持久化组合实验、发送方确认轨迹与消息ID对账",
  nodes: [
    "消费者和生产者（这可不是经济学课程哦）",
    "从底部开始构造：队列",
    "联合起来：交换器和绑定",
    "多租户模式：虚拟主机和隔离",
    "我的消息去哪儿了呢？持久化和你的策略",
    "把所有内容结合起来：一条消息的一生",
    "使用发送方确认模式来确认投递",
    "总结",
  ],
} as const;

export function Rmq02UnderstandingMessagingTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq02UnderstandingMessagingDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq02UnderstandingMessagingEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
