import type { ReviewQuestion } from "./types";

export const mgpConnectionManagementQuestions: ReviewQuestion[] = [
  {
    id: "mgp-connection-management-1",
    chapter: "mgp-connection-management",
    level: 2,
    question: `为什么 UDP 上需要自己实现连接管理？不能直接发包吗？`,
    answer:
      `UDP 是无连接协议，内核不维护连接状态。直接发包有两个问题：一是安全性——任何知道服务器地址的人都能发伪造数据包，服务器无法区分合法与非法客户端；二是资源管理——没有连接概念就无法跟踪会话生命周期，客户端断线后服务器无法感知，死连接会永远占资源。自己实现连接管理（握手验证身份 + 状态机跟踪生命周期 + 超时清理死连接）可以解决这些问题，在无连接的 UDP 之上建立会话语义。`,
    tags: ["UDP", "连接管理", "状态机"],
  },
  {
    id: "mgp-connection-management-2",
    chapter: "mgp-connection-management",
    level: 3,
    question: `描述挑战-响应握手协议的流程，为什么不能只用一个 CONNECT 包？`,
    answer:
      `流程：①客户端生成随机 clientChallenge，发 CONNECT_REQUEST；②服务器生成随机 serverChallenge，回显 clientChallenge，发 CONNECT_CHALLENGE；③客户端验证 clientChallenge 匹配，回显 serverChallenge，发 CONNECT_RESPONSE；④服务器验证 serverChallenge 匹配，分配 clientId，发 CONNECT_ACCEPT。不能只用一个 CONNECT 包的原因：一是防伪造——单包握手无法验证对端身份，攻击者可以伪造源地址发 CONNECT；二是防重放——单包握手可以被录包重放，挑战-响应的随机数让每次握手不可重放；三是防 IP 欺骗——攻击者伪造源 IP 发包时，收不到服务器返回的 challenge，无法完成握手。`,
    tags: ["握手协议", "安全性", "挑战-响应"],
  },
  {
    id: "mgp-connection-management-3",
    chapter: "mgp-connection-management",
    level: 3,
    question: `连接状态机有哪些状态？为什么需要状态机而不是直接通信？`,
    answer:
      `四个状态：Disconnected（未连接）→ Connecting（握手中）→ Connected（已连接，正常通信）→ Disconnecting（正在断开）。需要状态机是因为：①安全性——只有 Connected 状态才允许业务数据交换，防止未认证的客户端直接发游戏数据；②生命周期管理——不同状态有不同的超时和重试策略，Connecting 状态超时重试握手，Connected 状态超时断开连接；③断连清理——Disconnecting 状态发送断连包通知对端，避免对端等待超时。状态机让连接行为可预测，防止非法状态下的数据交换。`,
    tags: ["状态机", "连接管理"],
  },
  {
    id: "mgp-connection-management-4",
    chapter: "mgp-connection-management",
    level: 4,
    question: `如何检测和处理 UDP 连接中的死连接（如客户端突然断电）？`,
    answer:
      `UDP 无内置连接状态，客户端断电不会产生任何通知（不像 TCP 的 FIN/RST）。检测方法：保活心跳 + 超时计时器。客户端定期（如每 1 秒）发送心跳包，如果没有其他数据发送。服务器每次收到任何包（包括心跳）重置该连接的超时计时器。如果累计超过阈值（通常 5-10 秒）没收到任何包，判定为死连接，主动断开并释放资源。阈值选择：太短（如 2 秒）会在网络抖动时误断合法连接；太长（如 30 秒）会让死连接长时间占资源。5-10 秒是经验平衡点。服务器断开时应发送 DISCONNECT 包，虽然死连接收不到，但对正常断开的客户端有用。`,
    tags: ["保活", "超时", "死连接"],
  },
];
