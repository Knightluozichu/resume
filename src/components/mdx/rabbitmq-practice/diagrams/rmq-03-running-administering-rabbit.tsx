import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第3章 运行和管理Rabbit",
  focus:
    "掌握节点与应用启停、配置文件、用户权限、统计日志和Erlang分布式节点故障诊断",
  invariant:
    "节点进程与Rabbit应用状态分开判断，用户对vhost的configure、write、read权限可验证，故障诊断保留命令、日志和cookie证据",
  artifact:
    "启停矩阵、配置快照、最小权限测试、统计基线、日志时间线与badrpc诊断树",
  nodes: [
    "服务器管理",
    "启动节点",
    "停止节点",
    "关闭和重启应用程序：有何差别",
    "Rabbit配置文件",
    "请求许可",
    "管理用户",
    "Rabbit的权限系统",
    "检查",
    "查看数据统计",
    "理解RabbitMQ日志",
    "修复Rabbit：疑难解答",
    "由badrpc、nodedown和其他Erlang引起的问题",
    "总结",
  ],
} as const;

export function Rmq03RunningAdministeringRabbitTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq03RunningAdministeringRabbitDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq03RunningAdministeringRabbitEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
