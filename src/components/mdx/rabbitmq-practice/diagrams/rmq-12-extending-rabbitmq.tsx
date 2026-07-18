import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第12章 聪明的Rabbit：扩展RabbitMQ",
  focus:
    "理解RabbitMQ 2.7插件能力、发现安装移除流程、Public Umbrella构建系统、Erlang应用文件与自定义交换器behaviour",
  invariant:
    "插件版本与broker ABI匹配，安装移除可回退，自定义交换器注册、路由语义、编译和隔离测试都有证据",
  artifact:
    "插件目录、安装移除演练、Public Umbrella工程、Erlang应用文件、自定义交换器与路由测试",
  nodes: [
    "RabbitMQ插件",
    "你可以用插件做什么",
    "在哪里可以找到插件",
    "安装插件",
    "移除插件",
    "制作你自己的插件",
    "获取RabbitMQ Public Umbrella",
    "设置文件夹结构",
    "包含插件构建系统",
    "创建Erlang应用文件",
    "创建自定义交换器模块",
    "将交换器注册到RabbitMQ",
    "实现交换器behaviour",
    "编译自定义交换器",
    "测试你的插件",
    "总结",
  ],
} as const;

export function Rmq12ExtendingRabbitmqTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq12ExtendingRabbitmqDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq12ExtendingRabbitmqEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
