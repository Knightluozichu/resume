import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Part 1. Foundational Spring",
  "1 Getting started with Spring",
  "2 Developing web applications",
  "3 Working with data",
  "4 Working with nonrelational data",
  "5 Securing Spring",
  "6 Working with configuration properties",
  "Part 2. Integrated Spring",
  "7 Creating REST services",
  "8 Securing REST",
  "9 Sending messages asynchronously",
  "10 Integrating Spring",
  "Part 3. Reactive Spring",
  "11 Introducing Reactor",
  "12 Developing reactive APIs",
  "13 Persisting data reactively",
  "14 Working with RSocket",
  "Part 4. Deployed Spring",
  "15 Working with Spring Boot Actuator",
  "16 Administering Spring",
  "17 Monitoring Spring with JMX",
  "18 Deploying Spring",
  "Appendix. Bootstrapping Spring applications"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="《Spring in Action（第6版）》权威学习地图" focus="沿官方4个Part、18章和附录A规划Taco Cloud从开发到生产的连续证据链" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="《Spring in Action（第6版）》权威学习地图" focus="选择一次订单请求，追踪它跨Web、数据、安全、消息、响应式和部署边界的状态变化" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="《Spring in Action（第6版）》权威学习地图" focus="255节点覆盖矩阵、章节依赖图、版本边界表和全书验收清单" nodes={nodes} />;
}
