import type { ReviewQuestion } from "./types";

export const gspProtocolDesignQuestions: ReviewQuestion[] = [
  {
    id: "gsp-protocol-design-1",
    chapter: "gsp-protocol-design",
    level: "B",
    question: "封包格式中为什么需要魔数？没有会怎样？",
    answer:
      "魔数用于快速识别数据流是否错位。如果上次解包逻辑有 bug 或有人发送恶意数据，后续字节流会与协议格式错位。没有魔数，服务器会持续按错误偏移量解包产生垃圾消息甚至崩溃。有魔数，校验失败就立即断开连接，防止错误扩散。魔数是数据流「自检」的第一道防线。",
    tags: ["封包", "魔数", "协议设计"],
  },
  {
    id: "gsp-protocol-design-2",
    chapter: "gsp-protocol-design",
    level: "B",
    question: "JSON、Protobuf、自定义二进制各适合什么场景？",
    answer:
      "JSON 适合开发调试、Web 接口等对可读性要求高的场景。Protobuf 是游戏服务器主流选择——体积小、速度快、有 schema 约束和版本兼容，适合正式环境大量消息传输。自定义二进制适合对性能有极致要求的场景（如帧同步快照），但编解码代码需手动维护，开发效率低。通常 Protobuf 打底，关键路径用自定义二进制优化。",
    tags: ["序列化", "JSON", "Protobuf", "性能"],
  },
  {
    id: "gsp-protocol-design-3",
    chapter: "gsp-protocol-design",
    level: "C",
    question: "接收端解包时为什么要用环形缓冲区？",
    answer:
      "一次 recv 可能包含 0 个、1 个或多个完整消息，且包头和包体可能不在同一次 recv 中。环形缓冲区暂存所有收到的原始字节流，支持追加（Append）、窥视（Peek）、跳过（Skip）、读取（Read）操作，让解包逻辑可以循环切包：先窥视包头判断长度，整包够了再读取消费，不够则等下次数据到达。",
    tags: ["环形缓冲区", "解包", "协议设计"],
  },
  {
    id: "gsp-protocol-design-4",
    chapter: "gsp-protocol-design",
    level: "A",
    question: "长度前缀法封包格式的完整结构是什么？接收端如何处理半包？",
    answer:
      "封包结构：魔数(2B) + 长度(4B) + 消息ID(2B) + 消息体(NB)。接收端处理半包的流程：先检查缓冲区是否够一个包头大小，不够则等下次数据；够则窥视包头读出长度，计算整包总长度（包头+消息体）；检查缓冲区是否有整包数据，不够则等；够则消费包头、读取消息体、按消息ID路由分发。",
    tags: ["封包", "长度前缀法", "半包", "协议设计"],
  },
];
