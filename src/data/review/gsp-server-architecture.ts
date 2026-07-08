import type { ReviewQuestion } from "./types";

export const gspServerArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "gsp-server-architecture-1",
    chapter: "gsp-server-architecture",
    level: "B",
    question: "为什么要分服？分服的核心优势是什么？",
    answer:
      "分服的核心动机是负载分散和数据隔离。单台服务器 CPU、内存、带宽有上限，分服将玩家分散到多个独立进程实现水平扩展。核心优势是隔离性：一个区服的崩溃、卡顿、回档不影响其他区服；区服间数据独立，无需分布式事务，大大简化实现。代价是跨服交互需要额外同步机制。",
    tags: ["分服", "架构", "数据隔离"],
  },
  {
    id: "gsp-server-architecture-2",
    chapter: "gsp-server-architecture",
    level: "B",
    question: "网关层解决了什么问题？如果没有网关层会怎样？",
    answer:
      "网关层解决连接收敛、安全屏障、协议转换和无缝迁移四个问题。没有网关层：逻辑服直接处理客户端连接，网络 IO 消耗逻辑线程时间；逻辑服暴露公网 IP 易被 DDoS；扩容或重启时客户端连接断开掉线；加密/压缩逻辑混在业务代码中。网关层把网络 IO 从逻辑服剥离，让逻辑服专注业务计算。",
    tags: ["网关", "架构", "连接管理"],
  },
  {
    id: "gsp-server-architecture-3",
    chapter: "gsp-server-architecture",
    level: "C",
    question: "跨服架构如何实现？数据同步的挑战是什么？",
    answer:
      "引入跨服中心：各分服通过内部协议将跨服请求发送到跨服服务器，跨服中心维护独立逻辑空间（如跨服副本场景状态），处理完毕后回传结果。跨服中心不直接连客户端，消息仍通过各自分服网关转发。数据同步挑战：玩家装备、属性、状态需在分服和跨服中心间同步。通常进入跨服时发送玩家快照，结束时回传变更结果。",
    tags: ["跨服", "架构", "数据同步"],
  },
  {
    id: "gsp-server-architecture-4",
    chapter: "gsp-server-architecture",
    level: "A",
    question: "从单服到分布式，游戏服务器架构演进的关键驱动力是什么？",
    answer:
      "驱动力是玩家规模增长带来的性能和可用性需求。单服能扛的玩家数有上限（CPU/内存/带宽），超过就需要分服水平扩展。分服后跨服玩法需求催生跨服中心。连接数增长使逻辑服 IO 压力增大，催生网关层剥离网络 IO。单点故障风险催生负载均衡和多节点冗余。每一步演进都是在解决上一步架构的瓶颈。",
    tags: ["架构演进", "分布式", "扩容"],
  },
];
