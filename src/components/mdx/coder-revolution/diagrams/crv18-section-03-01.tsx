import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-01",
  title: "3.1 Web的起源",
  family: "web",
  nodes: ["创建URI", "解析目标", "HTTP请求", "返回表示", "跟随链接"],
  concepts: ["3.1 Web的起源"],
  mechanism:
    "Web 的核心组合是 URI 标识资源、HTTP 交换表示、超文本链接连接资源；开放协议让客户端与服务器可分别实现",
  success: "3.1 Web的起源 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.1 Web的起源 在“把 URL、服务器文件路径和资源本身当成同一个对象”处拒绝",
} as const;

export function Crv18Section0301Lab() {
  return <CoderMechanismLab {...profile} />;
}
