import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "10 Integrating Spring",
  "10.1 Declaring a simple integration flow",
  "10.1.1 Defining integration flows with XML",
  "10.1.2 Configuring integration flows in Java",
  "10.1.3 Using Spring Integration’s DSL configuration",
  "10.2 Surveying the Spring Integration landscape",
  "10.2.1 Message channels",
  "10.2.2 Filters",
  "10.2.3 Transformers",
  "10.2.4 Routers",
  "10.2.5 Splitters",
  "10.2.6 Service activators",
  "10.2.7 Gateways",
  "10.2.8 Channel adapters",
  "10.2.9 Endpoint modules",
  "10.3 Creating an email integration flow",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第10章 Spring Integration" focus="用消息、通道与端点组合过滤、转换、路由、拆分、网关和适配器，显式表达企业集成模式" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第10章 Spring Integration" focus="让过滤器拒绝、转换器抛错、路由无目标、邮件适配器超时，观察错误是否到达预定恢复路径" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第10章 Spring Integration" focus="集成流拓扑、消息模式、通道容量预算、端点合同测试和邮件故障回放" nodes={nodes} />;
}
