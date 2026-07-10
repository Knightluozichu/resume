import type { ReviewQuestion } from "./types";

export const gspFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gsp-final-review-1",
    chapter: "gsp-final-review",
    level: 2,
    question: `用「一条消息的旅程」描述从客户端发出攻击消息到所有相关玩家看到伤害的完整流程。`,
    answer:
      `① TCP Socket：消息作为字节流到达 IO 线程，epoll 唤醒，recv 读取。② 协议解包：环形缓冲区切包，魔数校验→读长度→读消息ID→反序列化。③ 网关转发：鉴权+解密后路由到对应区服逻辑服。④ 逻辑处理：逻辑线程按消息ID路由到攻击处理函数，服务端权威计算伤害，更新血量和Buff。⑤ 数据持久化：更新 Redis 标记脏，定时落库 MySQL。⑥ 安全校验：HMAC 签名、Token 鉴权、距离/CD/蓝量校验贯穿全程。⑦ 回包下发：逻辑线程产出回包和广播包，投递到 IO 线程发送队列，通过 TCP 发给相关玩家。`,
    tags: ["消息旅程", "总复习", "架构"],
  },
  {
    id: "gsp-final-review-2",
    chapter: "gsp-final-review",
    level: 2,
    question: `全书三组核心权衡是什么？各举一例说明。`,
    answer:
      `① 性能 vs 一致性：Redis 缓存提升读性能但引入不一致窗口——用 Cache-Aside + 定时落库取平衡。② 简单 vs 可扩展：单服简单但不可扩展，分服引入跨服复杂度但实现水平扩展——按玩家量级选择。③ 安全 vs 体验：服务端权威最安全但增加延迟——关键操作做严格校验，非关键操作放宽以减少延迟。三组权衡贯穿全书每个设计决策。`,
    tags: ["核心权衡", "总复习", "架构"],
  },
  {
    id: "gsp-final-review-3",
    chapter: "gsp-final-review",
    level: 3,
    question: `全书六大主题之间是什么依赖关系？`,
    answer:
      `网络基础（Socket/协议）是通信基石，没有它上层都无法通信。服务器架构（分服/网关/跨服）建立在网络之上，解决组织问题。线程模型（IO/逻辑/定时器）是架构的内部实现，决定执行模型。数据持久化（MySQL/Redis）是逻辑层的存储后端。缓存策略是数据层的性能优化。负载均衡和安全是架构和数据的扩展层，解决规模和安全问题。依赖自下而上，上层复用下层能力。`,
    tags: ["依赖关系", "总复习", "架构"],
  },
  {
    id: "gsp-final-review-4",
    chapter: "gsp-final-review",
    level: 1,
    question: `如果让你设计一个支持 10 万并发的游戏服务器，你会如何分层？关键瓶颈在哪里？`,
    answer:
      `分层：网关层（多个网关分摊连接，每网关扛 1-2 万连接）→ 逻辑服（按区服/场景分片，每片单线程串行）→ 数据层（Redis 集群缓存 + MySQL 分库分表）→ 跨服中心（独立进程处理跨服玩法）→ 监控/扩容系统。关键瓶颈：① 网络IO（用 epoll + 非阻塞解决）；② 逻辑串行（按场景分片到多逻辑线程解决）；③ 数据库IO（Redis 缓存 + 定时落库解决）；④ 跨服同步（快照+回传解决）；⑤ 单点故障（负载均衡+一致性哈希解决）。每层都有对应的扩展方案，核心思想是「分而治之」。`,
    tags: ["架构设计", "高并发", "总复习"],
  },
];
