import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 协议设计复习题 */
export const cseProtocolDesignQuestions: ReviewQuestion[] = [
  {
    id: "cse-protocol-design-1",
    chapter: "cse-protocol-design",
    level: 1,
    question: "TLV 协议帧的各个字段是什么？各自的作用？",
    answer:
      "TLV 协议帧格式（Type-Length-Value）：\n\n1. Magic（魔数，4 字节）：固定值如 0xCAFEBABE，快速判断数据是否合法。不匹配时丢弃，防止垃圾数据注入。\n\n2. Length（负载长度，4 字节）：告诉接收方 Payload 有多少字节。这是粘包的解药——精确知道一条消息有多大。\n\n3. Type（消息类型，2 字节）：区分消息类型（登录、聊天、心跳等），收到完整帧后根据 Type 分发到不同处理器。\n\n4. Payload（负载，N 字节）：业务数据，格式由具体协议定义（JSON、Protobuf、自定义二进制）。\n\n5. Checksum（校验和，4 字节）：对整个帧做 CRC32，防止网络传输中的比特翻转。\n\n帧结构：`| Magic(4B) | Length(4B) | Type(2B) | Payload(N B) | Checksum(4B) |`",
    tags: ["TLV", "帧格式", "粘包"],
  },
  {
    id: "cse-protocol-design-2",
    chapter: "cse-protocol-design",
    level: 2,
    question: "TCP 粘包是什么？粘包处理的核心逻辑是什么？",
    answer:
      "粘包：TCP 是字节流协议，没有消息边界。发送方发两条消息，接收方可能一次收到一条半（粘），也可能一次收到半条（半包）。\n\n粘包处理核心逻辑：**不够不取，够了才取，循环处理**\n\n```cpp\nvoid on_data(Buffer& buf) {\n  while (true) {\n    // 1. 检查是否有完整头部（10 字节）\n    if (buf.readable() < HEADER_SIZE) break;\n    \n    // 2. 预读 Length（不移动读指针）\n    uint32_t payload_len = peek_length(buf);\n    size_t frame_size = HEADER_SIZE + payload_len + CHECKSUM_SIZE;\n    \n    // 3. 检查是否有完整帧\n    if (buf.readable() < frame_size) break;  // 不够，等下次\n    \n    // 4. 够了，解码并处理\n    Message msg;\n    if (decode(buf, msg)) {\n      dispatch(msg);  // 分发处理\n    }\n  }\n  // 循环结束，不够一条完整帧的数据留在缓冲区\n}\n```\n\n关键点：用 while 循环不停尝试解码，够一条处理一条，不够就 break 留到下次。",
    tags: ["粘包", "半包", "循环解码"],
  },
  {
    id: "cse-protocol-design-3",
    chapter: "cse-protocol-design",
    level: 3,
    question: "Magic 不匹配时为什么要逐字节丢弃（retrieve(1)）而不是丢弃整个帧？",
    answer:
      "逐字节丢弃是为了在垃圾数据中找到合法帧的起始位置。\n\n场景：网络传输中可能混入垃圾数据（如对端发了非协议数据、或者之前解析错位了）。如果直接丢弃整个缓冲区，可能丢掉夹杂在垃圾数据后面的合法帧。\n\n```cpp\nbool decode(Buffer& buf, Message& out) {\n  if (buf.readable() < 4) return false;\n  uint32_t magic;\n  memcpy(&magic, buf.peek(), 4);\n  if (ntohl(magic) != MAGIC) {\n    buf.retrieve(1);  // 只丢 1 字节，下次从新位置检查\n    return false;     // 重新尝试\n  }\n  // Magic 匹配，继续解析...\n}\n```\n\n逐字节滑动：每次丢 1 字节，相当于在字节流中滑动窗口搜索 Magic。找到后从 Magic 位置开始解析完整帧。\n\n代价：最坏情况下要滑动 N 次才找到 Magic，但实际场景中垃圾数据很少，通常几次就对齐了。\n\n如果确信数据源都是合法协议（如内部服务间通信），可以跳过 Magic 检查或丢弃更多字节提高效率。",
    tags: ["Magic", "字节对齐", "容错"],
  },
  {
    id: "cse-protocol-design-4",
    chapter: "cse-protocol-design",
    level: 4,
    question: "综合分析：设计一个游戏服务器协议，你会怎么设计帧格式和编解码流程？",
    answer:
      "游戏服务器协议设计：\n\n1. 帧格式：\n```\n| Magic(2B) | Length(2B) | MsgId(2B) | Seq(4B) | Payload(NB) |\n```\n- Magic 缩为 2 字节（游戏消息频繁，省带宽）\n- Length 用 2 字节（单条消息不超过 64KB）\n- MsgId 2 字节（消息类型，如登录=1, 移动=2）\n- Seq 4 字节（序列号，用于可靠传输和去重）\n- 不加 Checksum（TCP 自带 CRC，游戏用 UDP 才需要）\n- 用 Protobuf 编码 Payload（紧凑、跨语言）\n\n2. 编解码流程：\n```cpp\n// 编码\nstd::string encode(uint16_t msg_id, uint32_t seq, const google::protobuf::Message& msg) {\n  std::string payload = msg.SerializeAsString();\n  uint16_t len = payload.size();\n  std::string frame;\n  frame.append((char*)&MAGIC, 2);\n  frame.append((char*)&len, 2);\n  frame.append((char*)&msg_id, 2);\n  frame.append((char*)&seq, 4);\n  frame.append(payload);\n  return frame;\n}\n\n// 解码（粘包处理）\nvoid on_data(Buffer& buf) {\n  while (true) {\n    if (buf.readable() < 8) break;  // 头部不够\n    uint16_t len = peek_length(buf);\n    if (len > 65536) { buf.retrieve(1); continue; }  // 非法长度\n    if (buf.readable() < 8 + len) break;  // 帧不完整\n    // 解码并分发\n    uint16_t msg_id = read_msg_id(buf);\n    std::string payload = buf.retrieve_as_string(len);\n    dispatch(msg_id, payload);\n  }\n}\n```\n\n3. 安全措施：\n- Length 上限检查（防恶意大包）\n- MsgId 白名单（防非法消息）\n- Seq 去重（防重放攻击）\n- 心跳消息（60 秒无心跳踢除）\n\n4. 压缩：大消息（如地图数据）用 zlib 压缩 Payload\n\n核心原则：帧格式紧凑省带宽，粘包处理用 Length 切割，安全用上限检查+白名单，序列化用 Protobuf。",
    tags: ["综合", "协议设计", "Protobuf", "游戏服务器"],
  },
];
