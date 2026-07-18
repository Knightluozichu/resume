import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "附录B KONGA安装指南",
  focus:
    "安装书中配套KONGA管理界面并明确它与Kong Admin API之间的信任和权限边界",
  invariant:
    "KONGA只能经受控网络访问目标Admin API，连接配置、凭证、操作审计和停用流程可验证",
  artifact:
    "KONGA版本环境、连接拓扑、最小权限、操作日志、失败诊断和卸载回退记录",
  nodes: ["附录B KONGA安装指南"],
} as const;

export function KgaAppendixBKongaRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaAppendixBKongaRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaAppendixBKongaEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
