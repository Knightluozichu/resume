import type { ReviewQuestion } from "./types";

export const gspLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gsp-learning-map-1",
    chapter: "gsp-learning-map",
    level: 2,
    question: `全书四阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `网络基础层（Socket/协议）→ 服务器核心层（架构/线程/数据）→ 扩展运维层（缓存/负载/安全）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有网络通信就没有服务器；没有服务器组织就没有线程分工；没有数据持久化就没有缓存需求；没有缓存和架构就没有负载均衡和安全。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "gsp-learning-map-2",
    chapter: "gsp-learning-map",
    level: 2,
    question: `为什么说「TCP Socket 是服务器网络的地基」？`,
    answer:
      `游戏服务器的所有通信——登录、战斗、聊天、交易——最终都通过 TCP 连接收发字节流。不理解三次握手就无法管理连接生命周期；不理解粘包就无法正确切分消息；不理解 epoll 就无法高效处理数千并发连接。Socket 编程是「数据怎么从客户端到服务器」的底层答案，跳过它学上层架构如同空中楼阁。`,
    tags: ["TCP", "Socket", "网络基础"],
  },
  {
    id: "gsp-learning-map-3",
    chapter: "gsp-learning-map",
    level: 3,
    question: `用「一条消息的旅程」描述全书主线。`,
    answer:
      `Socket 收发 → 协议解包 → 网关转发 → 逻辑路由 → 数据持久化 → 回包下发。每个环节都有对应的安全校验与性能优化，这是串联全书各章节的主线。`,
    tags: ["架构", "消息旅程"],
  },
  {
    id: "gsp-learning-map-4",
    chapter: "gsp-learning-map",
    level: 1,
    question: `游戏服务器的本质职责是什么？它与客户端如何分工？`,
    answer:
      `游戏服务器为客户端提供权威状态管理、逻辑计算与数据持久化。客户端只负责输入（按键、触屏）和渲染（画画面），所有关键逻辑由服务器计算。客户端发的是「请求」而非「指令」，服务器验证后才执行。这就是服务端权威原则。`,
    tags: ["服务端权威", "架构"],
  },
];
