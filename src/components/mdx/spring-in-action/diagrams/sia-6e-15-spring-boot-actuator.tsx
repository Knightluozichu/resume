import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "15 Working with Spring Boot Actuator",
  "15.1 Introducing Actuator",
  "15.1.1 Configuring Actuator’s base path",
  "15.1.2 Enabling and disabling Actuator endpoints",
  "15.2 Consuming Actuator endpoints",
  "15.2.1 Fetching essential application information",
  "15.2.2 Viewing configuration details",
  "15.2.3 Viewing application activity",
  "15.2.4 Tapping runtime metrics",
  "15.3 Customizing Actuator",
  "15.3.1 Contributing information to the /info endpoint",
  "15.3.2 Defining custom health indicators",
  "15.3.3 Registering custom metrics",
  "15.3.4 Creating custom endpoints",
  "15.4 Securing Actuator",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第15章 Spring Boot Actuator" focus="把Actuator端点暴露、健康、信息、活动、指标和自定义端点纳入最小暴露与可观测性设计" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第15章 Spring Boot Actuator" focus="关闭依赖、耗尽线程池、改变配置并发起未授权请求，验证健康、指标和敏感字段" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第15章 Spring Boot Actuator" focus="端点清单、管理面访问策略、健康状态机、指标基数预算和告警验证" nodes={nodes} />;
}
