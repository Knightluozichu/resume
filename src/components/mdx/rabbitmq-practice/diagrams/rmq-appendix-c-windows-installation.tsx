import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "附录C 在Windows上安装RabbitMQ",
  focus:
    "在Windows上按Erlang、RabbitMQ安装器、服务、节点环境与端到端收发顺序建立可重放安装过程",
  invariant:
    "Erlang与RabbitMQ 2.7版本匹配，服务账户、节点名、cookie、端口和数据目录明确，重启后仍能完成发布消费",
  artifact:
    "Windows安装步骤、服务配置、环境探针、启动日志、收发测试与卸载清理记录",
  nodes: ["在Windows上安装RabbitMQ"],
} as const;

export function RmqAppendixCWindowsInstallationTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function RmqAppendixCWindowsInstallationDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function RmqAppendixCWindowsInstallationEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
