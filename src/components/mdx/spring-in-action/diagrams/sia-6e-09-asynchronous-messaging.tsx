import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "9 Sending messages asynchronously",
  "9.1 Sending messages with JMS",
  "9.1.1 Setting up JMS",
  "9.1.2 Sending messages with JmsTemplate",
  "9.1.3 Receiving JMS messages",
  "9.2 Working with RabbitMQ and AMQP",
  "9.2.1 Adding RabbitMQ to Spring",
  "9.2.2 Sending messages with RabbitTemplate",
  "9.2.3 Receiving messages from RabbitMQ",
  "9.3 Messaging with Kafka",
  "9.3.1 Setting up Spring for Kafka messaging",
  "9.3.2 Sending messages with KafkaTemplate",
  "9.3.3 Writing Kafka listeners",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第9章 异步消息" focus="比较JMS、RabbitMQ与Kafka的路由、保留、顺序、确认、重试和消费组语义" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第9章 异步消息" focus="在发送后、确认前、处理后分别注入故障，记录每种中间件下重复和丢失窗口" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第9章 异步消息" focus="消息合同、交付语义表、幂等键设计、死信重放步骤与故障时间线" nodes={nodes} />;
}
