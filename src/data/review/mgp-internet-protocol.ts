import type { ReviewQuestion } from "./types";

export const mgpInternetProtocolQuestions: ReviewQuestion[] = [
  {
    id: "mgp-internet-protocol-1",
    chapter: "mgp-internet-protocol",
    level: 2,
    question: `为什么网络协议统一使用大端序（网络字节序）？`,
    answer:
      `统一使用大端序是为了消除跨平台通信时的歧义。不同 CPU 架构使用不同字节序（x86/ARM 小端，部分 MIPS/PowerPC 大端），如果各自直接发送内存中的原始字节，接收方可能以错误顺序解读数据。网络字节序规定统一使用大端序，发送方在发送前用 \`htons\`/\`htonl\` 转换，接收方用 \`ntohs\`/\`ntohl\` 转回主机序。这保证了任何平台发出的数据在任何平台都能正确解析。`,
    tags: ["字节序", "序列化"],
  },
  {
    id: "mgp-internet-protocol-2",
    chapter: "mgp-internet-protocol",
    level: 2,
    question: `为什么不能直接 memcpy 结构体进行网络传输？正确做法是什么？`,
    answer:
      `直接 memcpy 有三个问题：①字节序不兼容——小端序机器发的数据在大端序机器上解析错误；②内存对齐填充不同——不同编译器/平台对结构体的 padding 可能不同，导致同结构体大小不一致；③指针无意义——结构体中的指针地址在另一台机器上完全无效。正确做法是逐字段序列化：为每个字段手动控制字节序（统一大端序）和字节布局，写成独立的 Write/Read 方法。这样确保任何平台产生的字节流都一致，且不依赖编译器对齐规则。`,
    tags: ["序列化", "字节序", "跨平台"],
  },
  {
    id: "mgp-internet-protocol-3",
    chapter: "mgp-internet-protocol",
    level: 3,
    question: `IP 地址和端口号各自的作用是什么？为什么需要两个？`,
    answer:
      `IP 地址标识网络中的主机（「哪栋楼」），端口号标识主机上的进程（「哪个房间」）。需要两个是因为一台主机上可能同时运行多个网络进程——如果只有 IP 地址，操作系统收到数据包后不知道该交给哪个进程。IP + 端口组成套接字地址（socket address），唯一确定一个通信端点。端口号是 16 位整数（0-65535），其中 0-1023 是知名端口，游戏通常使用 1024 以上的注册端口或动态端口。`,
    tags: ["IP", "端口", "套接字"],
  },
  {
    id: "mgp-internet-protocol-4",
    chapter: "mgp-internet-protocol",
    level: 3,
    question: `设计一个 PacketBuilder/PacketReader 类，说明序列化浮点数的方法。`,
    answer:
      `序列化浮点数的方法：先用 memcpy 把 float 的 4 字节内存表示复制到 uint32_t，然后按大端序写入字节流（高字节在前）。读取时逆向操作：按大端序读出 4 字节组装成 uint32_t，再 memcpy 回 float。这样做保证：①跨平台字节序一致（统一大端序）；②不依赖 IEEE 754 实现细节（虽然大多数平台都用 IEEE 754）；③复用 uint32 的序列化逻辑。PacketBuilder 应提供 WriteUint8/16/32/Float 方法，PacketReader 对应提供 Read 方法，通过 pos 指针顺序读取。`,
    tags: ["序列化", "浮点数", "实现"],
  },
];
