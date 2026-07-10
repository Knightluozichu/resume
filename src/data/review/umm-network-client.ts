import type { ReviewQuestion } from "./types";

export const ummNetworkClientQuestions: ReviewQuestion[] = [
  {
    id: "umm-network-client-1",
    chapter: "umm-network-client",
    level: 2,
    question: `为什么 MMO 客户端通常选择 Protobuf 而不是 JSON 做序列化？`,
    answer:
      `Protobuf 用字段编号而非字段名传输，二进制编码体积比 JSON 小 3-10 倍；解析速度比 JSON 快一个数量级（无需字符串解析）；自动生成强类型代码，减少手写错误。MMO 每秒收发数百条消息，带宽和 CPU 开销敏感，Protobuf 的紧凑性和性能优势在大量消息场景下尤为明显。`,
    tags: ["Protobuf", "序列化", "网络"],
  },
  {
    id: "umm-network-client-2",
    chapter: "umm-network-client",
    level: 2,
    question: `TCP 粘包/半包问题是什么？客户端如何解决？`,
    answer:
      `TCP 是字节流协议，不保留消息边界。发送方连续发两条消息，接收方可能一次收到两条粘在一起（粘包），也可能只收到半条（半包）。解决方案是「长度前缀」：每条消息前加 4 字节长度头，接收方先读长度，再按长度读取完整 payload。不够就缓存等待，超长就拆分处理。`,
    tags: ["TCP", "粘包", "封包"],
  },
  {
    id: "umm-network-client-3",
    chapter: "umm-network-client",
    level: 3,
    question: `心跳保活和断线重连在 MMO 客户端中如何实现？`,
    answer:
      `心跳：客户端每隔 5-10 秒发送一个空 Ping 包，服务器回复 Pong。如果连续 N 次未收到 Pong，判定连接断开。断线重连：检测到断开后进入重连状态，先指数退避等待（1s/2s/4s...），然后重新建立 TCP 连接，发送 ReconnectReq 携带上次的 sessionId/token，服务器验证后恢复玩家状态，客户端同步断线期间错过的消息。`,
    tags: ["心跳", "重连", "连接管理"],
  },
  {
    id: "umm-network-client-4",
    chapter: "umm-network-client",
    level: 1,
    question: `为什么发送和接收要做成两条独立流水线，而不是在同一个线程里处理？`,
    answer:
      `如果收发在同一线程，Socket.Receive 是阻塞调用，会卡住发送；反过来同理。独立流水线让收发互不阻塞：接收线程持续从网络读数据放入消息队列，发送线程从队列取出消息发出去。主线程（Unity 主循环）只与消息队列交互，不被网络 IO 阻塞。这种解耦保证了游戏帧率不受网络波动影响。`,
    tags: ["线程模型", "消息队列", "网络"],
  },
];
