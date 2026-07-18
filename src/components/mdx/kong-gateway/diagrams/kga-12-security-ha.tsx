import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第12章 Kong网关安全与集群高可用",
  focus:
    "组合网络限制、Admin API回路与Nginx配置，理解Kong集群缓存，并用HAProxy构建和故障验证高可用",
  invariant:
    "管理面不可从业务入口越权访问，节点配置和缓存最终可解释，任一网关节点故障时代理流量在目标上界内恢复",
  artifact:
    "威胁边界、管理回路测试、缓存传播轨迹、HAProxy拓扑、节点故障注入和恢复对账",
  nodes: [
    "Kong网关安全配置",
    "网络层访问限制",
    "Kong API回路",
    "自定义Nginx配置",
    "Kong集群",
    "Kong集群简介",
    "Kong集群缓存",
    "Kong网关高可用",
    "架构设计",
    "引入HAProxy层",
    "高可用方案测试",
    "本章小结",
  ],
} as const;

export function Kga12SecurityHaRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga12SecurityHaRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga12SecurityHaEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
