import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-03-10",
  title: "3.10 HTTP Server：一个差生的逆袭",
  family: "web",
  nodes: ["监听连接", "注册兴趣", "等待就绪", "非阻塞读写", "更新兴趣"],
  concepts: [
    "3.10 HTTP Server：一个差生的逆袭",
    "HTTP Server 1.0",
    "HTTP Server 2.0：多进程",
    "HTTP Server 3.0：select模型",
    "HTTP Server 4.0：epoll模型",
  ],
  mechanism:
    "多进程为连接隔离执行上下文，select 扫描描述符集合，epoll 维护关注集合并返回就绪事件；就绪只表示现在可尝试 I/O",
  success: "3.10 HTTP Server：一个差生的逆袭 的输入、机制、输出与复位轨迹一致",
  failure:
    "3.10 HTTP Server：一个差生的逆袭 在“收到可读事件后阻塞读取完整请求，把事件循环卡在一个慢连接上”处拒绝",
} as const;

export function Crv18Section0310Lab() {
  return <CoderMechanismLab {...profile} />;
}
