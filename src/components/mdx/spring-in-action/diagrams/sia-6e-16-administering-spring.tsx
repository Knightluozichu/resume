import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "16 Administering Spring",
  "16.1 Using Spring Boot Admin",
  "16.1.1 Creating an Admin server",
  "16.1.2 Registering Admin clients",
  "16.2 Exploring the Admin server",
  "16.2.1 Viewing general application health and information",
  "16.2.2 Watching key metrics",
  "16.2.3 Examining environment properties",
  "16.2.4 Viewing and setting logging levels",
  "16.3 Securing the Admin server",
  "16.3.1 Enabling login in the Admin server",
  "16.3.2 Authenticating with the Actuator",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第16章 管理Spring应用" focus="建立Spring Boot Admin服务端、客户端注册、运行视图和双向认证的管理面合同" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第16章 管理Spring应用" focus="伪造注册、使用过期凭据、越权调日志级别并模拟Admin不可用，确认应用数据面不受影响" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第16章 管理Spring应用" focus="管理面数据流、角色权限、注册认证测试、操作审计与版本兼容矩阵" nodes={nodes} />;
}
