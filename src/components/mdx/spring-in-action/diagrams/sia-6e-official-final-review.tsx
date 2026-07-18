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
  return <OfficialSiaLab mode="map" unitTitle="《Spring in Action（第6版）》全书总复习" focus="用一次可部署订单系统答辩串联255个目录节点，并以故障注入证明边界" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="《Spring in Action（第6版）》全书总复习" focus="随机抽取一个目录节点，从生产症状反向定位章节、设计最小实验并给出可推翻结论的反例" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="《Spring in Action（第6版）》全书总复习" focus="全书答辩包、故障时间线、版本迁移差异、复现脚本与整改记录" nodes={nodes} />;
}
