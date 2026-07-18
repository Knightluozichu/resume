import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "附录D Admin API",
  focus:
    "按实体与操作整理Kong 2.0.5 Admin API，并用鉴权、幂等、分页、错误和审计约束自动化调用",
  invariant:
    "每次配置写入有请求、响应、操作者、前后状态和回退证据，Admin API不直接暴露不可信网络",
  artifact: "端点清单、请求响应样例、错误矩阵、自动化脚本、审计日志和配置回退",
  nodes: ["附录D Admin API"],
} as const;

export function KgaAppendixDAdminApiRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaAppendixDAdminApiRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaAppendixDAdminApiEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
