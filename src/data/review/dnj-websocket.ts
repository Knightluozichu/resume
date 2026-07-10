import type { ReviewQuestion } from "./types";

export const dnjWebsocketQuestions: ReviewQuestion[] = [
  {
    id: "dnj-websocket-1",
    chapter: "dnj-websocket",
    level: 2,
    question: `WebSocket 的握手过程是怎样的？为什么说它是「HTTP 升级」协议？`,
    answer:
      `WebSocket 握手基于 HTTP：①客户端发送 HTTP GET 请求，携带 Upgrade: websocket 和 Connection: Upgrade 头，以及随机生成的 Sec-WebSocket-Key；②服务端返回 101 Switching Protocols 响应，携带同样的 Upgrade/Connection 头，以及 Sec-WebSocket-Accept（用 Sec-WebSocket-Key + 固定 GUID 经 SHA-1 + Base64 计算得出，证明服务端理解 WebSocket 协议）；③握手成功后，底层 TCP 连接不再走 HTTP 协议，而是切换为 WebSocket 帧协议，双方可以随时发送帧。之所以叫「HTTP 升级」：握手阶段复用 HTTP（穿防火墙、走 HTTP 端口 80/443），但握手成功后协议「升级」为 WebSocket，后续通信不再是 HTTP 报文格式。这种设计让 WebSocket 能兼容现有 HTTP 基础设施（代理、负载均衡），同时获得全双工通信能力。`,
    tags: ["WebSocket", "握手", "HTTP升级", "101"],
  },
  {
    id: "dnj-websocket-2",
    chapter: "dnj-websocket",
    level: 3,
    question: `WebSocket 帧格式由哪些字段组成？opcode 的含义是什么？客户端为什么要掩码？`,
    answer:
      `帧格式：①FIN（1bit）——是否为最后一个分片帧；②opcode（4bit）——帧类型：0x0 续帧、0x1 文本帧、0x2 二进制帧、0x8 关闭帧、0x9 ping 帧、0xA pong 帧；③MASK（1bit）——是否掩码；④payload length（7/16/64bit）——数据长度，根据值选择扩展长度字段；⑤mask key（32bit，仅客户端发送时）——掩码密钥；⑥payload data——实际数据。客户端必须掩码（RFC 6455 强制），服务端不掩码。掩码原因：防止中间代理缓存污染——攻击者可能利用 HTTP 代理的缓存机制注入恶意数据，掩码使每帧数据与随机 mask key 异或，代理无法预测帧内容。掩码是简单的 XOR 操作，不提供加密（加密靠 wss:// TLS），仅防中间人篡改。分片机制：大消息可拆成多个帧，第一个帧 FIN=0 opcode=数据类型，中间帧 FIN=0 opcode=0x0，最后帧 FIN=1 opcode=0x0。`,
    tags: ["WebSocket", "帧格式", "opcode", "掩码", "协议"],
  },
  {
    id: "dnj-websocket-3",
    chapter: "dnj-websocket",
    level: 3,
    question: `WebSocket、HTTP 轮询、SSE 三种实时通信方式的区别和适用场景？`,
    answer:
      `①HTTP 轮询——客户端定时发 HTTP 请求查新消息。优点：简单、兼容所有环境。缺点：延迟高（间隔越长延迟越大）、空请求浪费带宽和服务器资源。适用：低频更新（如每 30 秒检查一次）。②SSE（Server-Sent Events）——基于 HTTP 长连接，服务端单向推送。优点：简单（EventSource API）、自动重连、走标准 HTTP。缺点：单向（只能服务端→客户端）、仅文本、受 HTTP/1.1 并发连接数限制（每域名 6 个）。适用：通知推送、股票行情等单向实时场景。③WebSocket——全双工双向通信。优点：低延迟、双向、支持二进制帧、低开销（无 HTTP 头部开销）。缺点：实现复杂、需处理重连和心跳。适用：聊天、游戏、协同编辑等高频双向交互。选型原则：单向推送用 SSE，双向实时用 WebSocket，低频更新用轮询。`,
    tags: ["WebSocket", "SSE", "轮询", "实时通信", "对比"],
  },
  {
    id: "dnj-websocket-4",
    chapter: "dnj-websocket",
    level: 4,
    question: `WebSocket 连接如何保活？心跳机制和关闭流程分别是什么？`,
    answer:
      `保活（心跳）：WebSocket 是长连接，但中间代理/负载均衡可能在连接空闲时断开。心跳机制用 ping/pong 帧（opcode 0x9/0xA）：一端发 ping，另一端必须回 pong。通常每隔 30 秒发一次 ping，若连续几次未收到 pong 则判定连接已断，主动关闭并触发重连。Node.js ws 库通过 ws.ping() 和 ws.on('ping') 实现，也可用 ws 库的客户端自动心跳选项。关闭流程：①任一端发送 close 帧（opcode 0x8），携带状态码（1000 正常关闭、1001 端点离开、1002 协议错误、1011 服务端内部错误）和可选关闭原因；②另一端收到后回送 close 帧确认；③双方关闭底层 TCP 连接。若未发 close 直接断 TCP，对端会在下次读写时发现连接已断。生产中必须处理 close 和 error 事件，清理资源并按需重连，否则会导致连接泄漏。`,
    tags: ["WebSocket", "心跳", "ping/pong", "关闭流程", "重连"],
  },
];
