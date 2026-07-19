import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-03",
  title: "1.3 TCP/IP之大明邮差",
  family: "network",
  nodes: ["写入字节", "分配序号", "网络传送", "确认窗口", "超时重传"],
  concepts: ["1.3 TCP/IP之大明邮差"],
  mechanism:
    "TCP 用序号、累计确认、接收窗口、重传和拥塞控制，把可能丢失或乱序的分组整理成有序字节流",
  success: "1.3 TCP/IP之大明邮差 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.3 TCP/IP之大明邮差 在“只增加重传次数却不限制在途数据，使拥塞期间的丢包继续放大”处拒绝",
} as const;

export function Crv18Section0103Lab() {
  return <CoderMechanismLab {...profile} />;
}
