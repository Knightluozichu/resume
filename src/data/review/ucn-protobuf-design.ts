import type { ReviewQuestion } from "./types";

export const ucnProtobufDesignQuestions: ReviewQuestion[] = [
  {
    id: "ucn-protobuf-design-1",
    chapter: "ucn-protobuf-design",
    level: "B",
    question: "Protobuf 相比 JSON 在游戏网络通信中的优势是什么？",
    answer:
      "① 体积小：Protobuf 用 varint 变长编码和 field_num 标签，不传输字段名，比 JSON 小 3-10 倍——游戏每秒收发上百条消息，省带宽就是省钱；② 解析快：Protobuf 是二进制格式，直接内存映射，不需要字符串解析，比 JSON 快 10-100 倍；③ 类型安全：proto 文件生成强类型 C++/C# 类，编译期检查字段名和类型，减少运行时错误；④ 前后兼容：新增字段用新 field_num，旧端忽略未知字段，不需要所有客户端同时更新；⑤ 工具链成熟：protoc 一键生成多语言代码，客户端和服务器共享同一份 proto 定义。",
    tags: ["Protobuf", "序列化", "JSON", "性能"],
  },
  {
    id: "ucn-protobuf-design-2",
    chapter: "ucn-protobuf-design",
    level: "B",
    question: "Protobuf 的字段编号（field number）为什么重要？1-15 和 16+ 有什么区别？",
    answer:
      "Protobuf 用 field number 而非字段名来标识字段——序列化后只有 field number 和值，没有字段名，这是它比 JSON 小的关键。1-15 的字段编号在序列化时 tag 只占 1 字节（field_num 和 wire_type 编码在一起），16-2047 占 2 字节，2048+ 占 3+ 字节。因此高频字段（如 player_id、position）应分配 1-15 的编号以节省空间。一旦发布后 field number 绝不能更改或复用——旧客户端会按编号解析，改了会导致数据错乱。新增字段用新编号，删除字段需 reserved 标记防止复用。",
    tags: ["Protobuf", "序列化", "字段编号"],
  },
  {
    id: "ucn-protobuf-design-3",
    chapter: "ucn-protobuf-design",
    level: "C",
    question: "如何设计 Protobuf 的消息号（MsgId）体系？消息号和 Protobuf message 类型如何对应？",
    answer:
      "① 按 module 分配 MsgId 区间：登录模块 1001-1099，战斗模块 2001-2099，房间模块 3001-3099——方便路由层按区段预过滤；② 建立 MsgId → message 类型的映射表，通常用代码生成或宏注册：REGISTER_MSG(1001, LoginReq, LoginHandler::OnLogin)；③ 请求和响应配对，如 1001=LoginReq, 1002=LoginAck；④ 广播消息单独编号，如 2005=DamageNotify（服务器主动推）；⑤ MsgId 用 uint16（0-65535），够大部分游戏用；⑥ 在 proto 文件中用 enum 统一定义所有 MsgId，protoc 生成后 C++ 和 C# 共享。",
    tags: ["Protobuf", "消息号", "路由", "协议设计"],
  },
  {
    id: "ucn-protobuf-design-4",
    chapter: "ucn-protobuf-design",
    level: "A",
    question: "Protobuf 的 proto3 相比 proto2 有哪些变化？为什么游戏开发推荐用 proto3？",
    answer:
      "proto3 的变化：① 去掉了 required 字段——所有字段默认 optional，避免旧端因缺少 required 字段而反序列化失败，这对线上版本兼容至关重要；② 去掉了 default 值指定——标量类型有隐式默认值（int=0, string="", bool=false），序列化时不传输默认值（省空间）；③ 新增 map 类型——替代 repeated message 做键值对；④ 去掉了 optional 关键字（proto3.15 又加回了 optional 表示显式存在性）。游戏开发推荐 proto3 因为：版本兼容性好（没有 required 约束）、序列化更紧凑（默认值不传输）、语法更简洁。",
    tags: ["Protobuf", "proto3", "版本兼容", "协议设计"],
  },
];
