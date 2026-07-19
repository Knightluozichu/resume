import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-02",
  title: "3.2 两个程序的爱情故事",
  family: "network",
  nodes: ["构造请求", "连接服务", "传输消息", "处理状态", "接收响应"],
  concepts: ["3.2 两个程序的爱情故事", "好感", "分离", "网络", "Web"],
  mechanism:
    "客户端和服务器是独立进程，借助 socket 与应用协议交换带边界的消息；网络会延迟、重复、丢失或中断连接",
  success: "3.2 两个程序的爱情故事 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.2 两个程序的爱情故事 在“客户端超时后重试非幂等请求，服务器实际已成功而产生两次副作用”处拒绝",
} as const;

export function Crv18Section0302Lab() {
  return <CoderMechanismLab {...profile} />;
}
