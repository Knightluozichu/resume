import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "附录A 在Java和.NET上使用Rabbit",
  focus:
    "比较Java与.NET客户端库，以Hello World、事件驱动告警和Java AMQP RPC复现跨语言消息模式",
  invariant:
    "两种客户端对交换器队列绑定、content properties、ack、reply_to和correlation id的映射一致，资源关闭与失败语义明确",
  artifact:
    "Java/.NET API对照、Hello World、事件告警、Java RPC和跨语言消息互操作测试",
  nodes: [
    "再说Hello：库选项与Hello World",
    "重温告警：把告警应用移植到事件驱动.NET",
    "咖啡时间的RPC：用Java实现AMQP RPC",
    "总结",
  ],
} as const;

export function RmqAppendixAJavaDotnetTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function RmqAppendixAJavaDotnetDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function RmqAppendixAJavaDotnetEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
