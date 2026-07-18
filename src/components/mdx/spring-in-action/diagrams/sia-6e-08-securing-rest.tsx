import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "8 Securing REST",
  "8.1 Introducing OAuth 2",
  "8.2 Creating an authorization server",
  "8.3 Securing an API with a resource server",
  "8.4 Developing the client",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第8章 保护REST API" focus="把OAuth2角色、授权流程、令牌受众、作用域与客户端责任映射到信任边界" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第8章 保护REST API" focus="构造错误issuer、audience、scope、过期与重放令牌，观察拒绝层和审计记录" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第8章 保护REST API" focus="信任边界图、流程选择记录、JWT负例集、作用域矩阵与密钥轮换演练" nodes={nodes} />;
}
