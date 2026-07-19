import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-02",
  title: "1.2 TCP/IP之大明内阁",
  family: "network",
  nodes: ["应用数据", "TCP分段", "IP数据报", "链路帧", "逐层解封"],
  concepts: ["1.2 TCP/IP之大明内阁"],
  mechanism:
    "分层协议让应用数据依次获得传输层端到端语义和网络层寻址语义，接收端再按相反顺序解封装",
  success: "1.2 TCP/IP之大明内阁 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.2 TCP/IP之大明内阁 在“把 IP 的尽力交付误写成 TCP 的可靠、有序字节流保证”处拒绝",
} as const;

export function Crv18Section0102Lab() {
  return <CoderMechanismLab {...profile} />;
}
