import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "5 Securing Spring",
  "5.1 Enabling Spring Security",
  "5.2 Configuring authentication",
  "5.2.1 In-memory user details service",
  "5.2.2 Customizing user authentication",
  "5.3 Securing web requests",
  "5.3.1 Securing requests",
  "5.3.2 Creating a custom login page",
  "5.3.3 Enabling third-party authentication",
  "5.3.4 Logging out",
  "5.3.5 Preventing cross-site request forgery",
  "5.4 Applying method-level security",
  "5.5 Knowing your user",
  "5.6 Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第5章 保护Spring应用" focus="把认证、授权、会话、CSRF、方法安全和当前主体分成可独立验证的安全合同" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第5章 保护Spring应用" focus="用匿名、普通用户、越权用户、伪造CSRF和过期会话重放同一命令，确认每层拒绝一致" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第5章 保护Spring应用" focus="威胁模型、过滤链规则表、授权矩阵、CSRF测试与主体传播记录" nodes={nodes} />;
}
