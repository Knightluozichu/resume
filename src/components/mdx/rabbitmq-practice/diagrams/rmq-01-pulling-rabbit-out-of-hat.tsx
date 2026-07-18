import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第1章 天降奇兵",
  focus:
    "从消息系统历史、AMQP开放协议、RabbitMQ选择与UNIX安装建立RabbitMQ 2.7时代的运行基线",
  invariant:
    "Erlang、RabbitMQ 2.7、节点名、cookie、目录和监听端口可由新主机复现，协议与版本结论不越过2012年原书边界",
  artifact:
    "消息系统比较、AMQP定位、RabbitMQ 2.7安装记录、首次启动日志与版本边界表",
  nodes: [
    "住在别人的地下城堡",
    "救世主AMQP",
    "RabbitMQ简史",
    "百里挑一",
    "在UNIX系统上安装RabbitMQ",
    "为什么环境很重要——生活在Erlang的世界里",
    "获取安装包",
    "设置文件夹结构",
    "首次运行Rabbit",
    "总结",
  ],
} as const;

export function Rmq01PullingRabbitOutOfHatTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq01PullingRabbitOutOfHatDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq01PullingRabbitOutOfHatEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
