import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "附录A Docker安装指南",
  focus:
    "按书中环境准备Docker，使Kong 2.0.5、数据库和示例服务可由固定镜像与网络复现",
  invariant:
    "镜像标识、容器网络、卷、端口和环境变量全部固定，新主机按记录能重建并通过健康与代理测试",
  artifact:
    "Docker环境清单、镜像摘要、网络卷拓扑、启动日志、健康检查和销毁重建记录",
  nodes: ["附录A Docker安装指南"],
} as const;

export function KgaAppendixADockerRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaAppendixADockerRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaAppendixADockerEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
