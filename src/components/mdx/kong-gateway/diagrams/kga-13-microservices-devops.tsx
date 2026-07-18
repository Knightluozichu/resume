import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第13章 Kong网关结合微服务架构",
  focus:
    "从微服务收益与十二要素评估迁移，再以CI/CD和Kong构建可发布、可回退的DevOps平台",
  invariant:
    "单体拆分边界、服务契约、网关配置和应用制品作为同一发布单元被追踪，失败发布能在规定时间内回退",
  artifact:
    "迁移决策、服务边界图、CI/CD流水线、Kong配置发布、平台使用与源码扩展验收",
  nodes: [
    "微服务简介",
    "微服务的优点",
    "单体应用和微服务",
    "微服务12要素",
    "单体应用向微服务迁移",
    "采用微服务的注意事项",
    "迁移细节",
    "使用CI/CD流程促进微服务开发",
    "CI/CD流程基础组件",
    "构建CI/CD流程",
    "基于Kong打造DevOps平台",
    "场景描述",
    "设计思路",
    "DevOps平台使用指南",
    "DevOps平台源码解析",
    "DevOps平台扩展",
    "本章小结",
  ],
} as const;

export function Kga13MicroservicesDevopsRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga13MicroservicesDevopsRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga13MicroservicesDevopsEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
