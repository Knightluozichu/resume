import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "17 Monitoring Spring with JMX",
  "17.1 Working with Actuator MBeans",
  "17.2 Creating your own MBeans",
  "17.3 Sending notifications",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第17章 使用JMX监控Spring" focus="区分Actuator MBean、自定义管理操作、属性和通知，并控制远程JMX攻击面" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第17章 使用JMX监控Spring" focus="重复注册对象、断开监听器、并发调用写操作并使用未授权远程连接，观察保护边界" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第17章 使用JMX监控Spring" focus="MBean对象模型、操作权限表、通知丢失实验和远程连接安全清单" nodes={nodes} />;
}
