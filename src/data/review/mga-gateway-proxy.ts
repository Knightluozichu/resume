import type { ReviewQuestion } from "./types";

export const mgaGatewayProxyQuestions: ReviewQuestion[] = [
  {
    id: "mga-gateway-proxy-1",
    chapter: "mga-gateway-proxy",
    level: 2,
    question: `为什么游戏网关常用一致性哈希而不是轮询做负载均衡？`,
    answer:
      `游戏是 TCP 长连接 + 有状态会话——一个玩家的所有消息必须路由到同一后端节点（该节点持有玩家游戏状态）。轮询会把同一玩家的不同消息分发到不同节点，导致状态不一致。一致性哈希按玩家 ID 哈希，保证同一玩家始终路由到同一节点。此外节点扩缩容时一致性哈希只影响哈希环上相邻节点的部分玩家（约 1/N），而不是全量重新分配——迁移成本最小。`,
    tags: ["一致性哈希", "负载均衡", "网关"],
  },
  {
    id: "mga-gateway-proxy-2",
    chapter: "mga-gateway-proxy",
    level: 2,
    question: `网关层做 SSL 卸载有什么好处？为什么不直接在后端服务做？`,
    answer:
      `① 节省后端 CPU——TLS 加解密是 CPU 密集操作，集中到网关可利用硬件加速（AES-NI），后端 CPU 留给游戏逻辑；② 证书管理集中——只需在网关配置证书；③ 协议灵活性——网关外部 TLS 加密（安全），网关到后端明文（高效），内外协议解耦；④ 故障隔离——SSL 握手失败在网关层就拒绝，不会传到后端浪费资源。`,
    tags: ["SSL 卸载", "网关", "性能"],
  },
  {
    id: "mga-gateway-proxy-3",
    chapter: "mga-gateway-proxy",
    level: 3,
    question: `玩家掉线后重连，网关需要做哪些处理？如果原后端节点已宕机怎么办？`,
    answer:
      `正常重连（原节点存活）：① 网关通过 Session ID 识别这是重连 → ② 找到玩家之前连接的后端节点 → ③ 通知后端恢复会话 → ④ 补发断线期间错过的关键消息 → ⑤ 客户端无缝继续游戏。原节点宕机：① 网关检测到原节点不可用 → ② 按一致性哈希重新分配到新节点 → ③ 通知新节点从数据库加载玩家状态 → ④ 客户端重连到新节点 → ⑤ 玩家可能丢失几秒的状态（取决于数据库持久化频率），但能继续游戏。好的重连机制应做到 3 秒内恢复。`,
    tags: ["断线重连", "容错", "网关"],
  },
  {
    id: "mga-gateway-proxy-4",
    chapter: "mga-gateway-proxy",
    level: 4,
    question: `游戏网关和 Web 反向代理（如 Nginx）有什么本质区别？为什么不能直接用 Nginx 当游戏网关？`,
    answer:
      `本质区别在于「连接模型」和「状态管理」：① Web 是短连接无状态请求——每个 HTTP 请求独立路由；游戏是 TCP 长连接有状态会话——同一玩家的所有消息必须路由到同一后端节点。② 协议——Web 用 HTTP（文本协议），游戏用自定义二进制协议（Protobuf + 长度前缀），Nginx 不支持自定义协议解析。③ 断线重连——Web 不需要会话保持，游戏需要 Session 恢复和消息补发。④ 粘包拆包——游戏消息是 TCP 流，需要自定义拆包逻辑。⑤ 后端故障迁移——游戏需要将连接迁移到新节点并恢复状态。Nginx 可以做 SSL 卸载和负载均衡，但上述游戏特有需求需要定制网关。`,
    tags: ["网关", "Nginx", "架构对比"],
  },
];
