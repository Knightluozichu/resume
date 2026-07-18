import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第4章 解决Rabbit相关问题：编码与模式",
  focus:
    "从解耦、异步状态、无负载均衡器扩展、跨语言API进入告警、并行处理和基于reply_to的RPC模式",
  invariant:
    "每个模式写清交换器、队列、绑定、correlation id、reply_to、超时、重复和失败补偿，不以请求已发出代替业务完成",
  artifact:
    "告警拓扑、并行任务工作池、JSON RPC时序、相关ID日志、超时重试与幂等对账",
  nodes: [
    "解耦风雨路：谁将我们推向消息通信",
    "异步状态思维（分离请求和动作）",
    "提供扩展性：没有负载均衡器的世界",
    "零成本API：语言不应成为枷锁",
    "发后即忘模型",
    "发送告警",
    "并行处理",
    "别忘了：用RabbitMQ实现RPC并等待响应",
    "私有队列和发送确认",
    "使用reply_to来实现简单的JSON RPC",
    "总结",
  ],
} as const;

export function Rmq04CodingPatternsTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq04CodingPatternsDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq04CodingPatternsEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
