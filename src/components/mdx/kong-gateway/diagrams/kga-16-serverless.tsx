import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第16章 Serverless架构",
  focus:
    "沿系统架构和部署方式演化理解Serverless内核，搭建环境并交付一个经Kong代理的Web应用服务",
  invariant:
    "函数冷启动、并发、超时、重试和成本边界可测，Kong到函数入口的认证、路由与错误映射可追踪",
  artifact:
    "演化比较、开发环境、函数部署、Web代理链、冷启动压测、失败重试和成本记录",
  nodes: [
    "Serverless简介",
    "系统架构演化",
    "部署方式演化",
    "Serverless内核",
    "Serverless实践",
    "搭建开发环境",
    "Web应用服务",
    "本章小结",
  ],
} as const;

export function Kga16ServerlessRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga16ServerlessRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga16ServerlessEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
