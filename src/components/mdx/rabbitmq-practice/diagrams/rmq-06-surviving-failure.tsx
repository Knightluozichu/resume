import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第6章 从故障中恢复",
  focus:
    "用HAProxy为Rabbit节点分配连接，并在客户端处理中断、重连、拓扑重建、未确认消息和故障转移",
  invariant:
    "负载均衡只选择可连接节点；客户端重连后重新建立channel与拓扑，未确认发布和未ack消费的重复窗口被消息ID对账限定",
  artifact:
    "HAProxy健康检查、连接故障时序、生产消费重连状态机、拓扑重建与重复消息对账",
  nodes: [
    "为Rabbit做负载均衡",
    "安装HAProxy",
    "配置HAProxy",
    "连接丢失和故障转移",
    "总结",
  ],
} as const;

export function Rmq06SurvivingFailureTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq06SurvivingFailureDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq06SurvivingFailureEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
