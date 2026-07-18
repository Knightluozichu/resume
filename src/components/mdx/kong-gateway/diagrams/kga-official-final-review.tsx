import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "全书总复习",
  focus:
    "把16章4附录重组为请求代理、插件扩展、部署运维和云原生应用四条可验证主线",
  invariant:
    "从客户端到Route、Service、Upstream、Target再到插件、日志、集群和应用平台的全链路可预测、故障可恢复",
  artifact:
    "280节点覆盖表、综合拓扑、容量和故障实验、配置与消息对账、恢复回退及独立交接",
  nodes: [
    "第1章 全面了解Kong网关",
    "第2章 Nginx知识",
    "第3章 Lua知识",
    "第4章 OpenResty知识",
    "第5章 Kong网关配置与部署",
    "第6章 Kong网关命令行",
    "第7章 Kong网关代理及鉴权",
    "第8章 Kong网关负载均衡策略与健康检查",
    "第9章 Kong网关插件",
    "第10章 Kong网关日志",
    "第11章 Kong网关运维",
    "第12章 Kong网关安全与集群高可用",
    "第13章 Kong网关结合微服务架构",
    "第14章 Kong网关结合Kubernetes架构方案",
    "第15章 Service Mesh实践之Kuma",
    "第16章 Serverless架构",
    "附录A Docker安装指南",
    "附录B KONGA安装指南",
    "附录C 数据库明细",
    "附录D Admin API",
  ],
} as const;

export function KgaOfficialFinalReviewRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaOfficialFinalReviewRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaOfficialFinalReviewEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
