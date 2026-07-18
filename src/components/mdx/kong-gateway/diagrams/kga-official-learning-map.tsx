import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "原书权威学习地图",
  focus:
    "沿入门、基础、进阶、应用四篇建立16章4附录的依赖图和Kong 2.0.5版本边界",
  invariant:
    "20个正式单元与280个唯一目录节点全部可达，章节实验、证据和版本差异均能回指权威目录",
  artifact:
    "完整目录映射、四篇依赖图、版本边界、实验索引、证据门和全书验收清单",
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

export function KgaOfficialLearningMapRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function KgaOfficialLearningMapRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function KgaOfficialLearningMapEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
