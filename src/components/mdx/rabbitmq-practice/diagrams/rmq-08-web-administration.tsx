import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第8章 从Web端管理RabbitMQ",
  focus:
    "启用RabbitMQ 2.7 Management插件，从Web观察Erlang VM、导入配置、管理用户交换器队列，并使用rabbitmqadmin",
  invariant:
    "Web与CLI操作都落到同一broker状态，导入和声明具有前后快照，用户权限最小化，危险操作具有目标、验证和回退",
  artifact:
    "插件依赖清单、VM指标快照、配置导入导出、用户权限测试与rabbitmqadmin运行手册",
  nodes: [
    "超越rabbitmqctl：RabbitMQ Management插件",
    "为何需要Management插件",
    "Management插件功能",
    "启用Management插件",
    "从Web控制台来管理RabbitMQ",
    "监控Erlang VM",
    "从JSON文件导入配置",
    "从Web控制台管理用户",
    "创建用户",
    "管理用户的权限",
    "从Web控制台管理交换器和队列",
    "列出队列信息",
    "创建队列",
    "回到命令行",
    "为什么需要另一个CLI",
    "CLI管理：一种更简单的方式",
    "安装rabbitmqadmin脚本",
    "清空队列、创建交换器等",
    "总结",
  ],
} as const;

export function Rmq08WebAdministrationTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq08WebAdministrationDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq08WebAdministrationEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
