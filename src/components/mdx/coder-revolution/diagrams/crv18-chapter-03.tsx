import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-03",
  title: "第3章 浪潮之巅的Web",
  family: "web",
  nodes: ["定位资源", "建立连接", "发送请求", "服务处理", "返回表示"],
  concepts: ["第3章 浪潮之巅的Web"],
  mechanism:
    "Web 把 URI 标识、HTTP 消息、客户端呈现和服务端状态放在可独立演进的边界上，一次请求会穿越多层远程故障域",
  success: "第3章 浪潮之巅的Web 的输入、机制、输出与复位轨迹一致",
  failure:
    "第3章 浪潮之巅的Web 在“只画正常请求箭头，未标出超时、重试、认证和重复副作用”处拒绝",
} as const;

export function Crv18Chapter03Lab() {
  return <CoderMechanismLab {...profile} />;
}
