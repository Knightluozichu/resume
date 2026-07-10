import type { ReviewQuestion } from "./types";

export const ucnLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ucn-learning-map-1",
    chapter: "ucn-learning-map",
    level: 2,
    question: `本书的四阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `C++ 服务器基础（epoll/IOCP/Socket）→ 协议设计（Protobuf/路由）→ Unity 客户端（Native Plugin/网络框架）→ 玩法系统（实时同步/房间匹配）→ 总复习。顺序由依赖关系决定：上层依赖下层。没有服务器 I/O 就没有数据收发；没有协议就不知道字节怎么编码；没有客户端集成就无法接入 Unity；没有同步和匹配就没有联网玩法。先有「能通信」，再有「能编解码」，然后「能接入」，最后「能玩起来」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "ucn-learning-map-2",
    chapter: "ucn-learning-map",
    level: 2,
    question: `为什么本书要用 C++ 写服务器而不是 C# 或 Python？`,
    answer:
      `网络游戏服务器需要处理数千至数万并发连接，对 I/O 性能、内存控制和延迟有极致要求。C++ 提供了零成本抽象、直接内存管理、epoll/IOCP 原生 API 访问能力，可以做到微秒级响应。C# 有 GC 停顿问题，Python 性能不足。此外 C++ 的 Native Plugin 可以被 Unity 直接通过 P/Invoke 调用，客户端和服务器可共享 Protobuf 生成的 C++ 代码，减少重复定义。`,
    tags: ["C++", "架构", "性能"],
  },
  {
    id: "ucn-learning-map-3",
    chapter: "ucn-learning-map",
    level: 3,
    question: `用「一条玩家释放技能的消息旅程」描述全书主线。`,
    answer:
      `① Unity 客户端点击技能按钮 → P/Invoke 调用 C++ 网络层 → ② Protobuf 序列化 CastSkillReq + 长度前缀封包 → TCP 发送 → ③ C++ 服务器 epoll 收包 → 环形缓冲区拆包 → ④ 按 MsgId 查路由表 → 分发到 CombatHandler → ⑤ 服务器校验 CD/蓝量/射程 → 执行技能逻辑 → ⑥ 广播 DamageNotify 给视野内玩家 → ⑦ 客户端收到后预测校正 + 插值渲染 → ⑧ 房间系统管理对局生命周期。每个环节对应全书一到两章。`,
    tags: ["架构", "消息旅程"],
  },
  {
    id: "ucn-learning-map-4",
    chapter: "ucn-learning-map",
    level: 1,
    question: `Unity 与 C++ 网络游戏开发与传统 Web 服务器开发最大的区别是什么？`,
    answer:
      `① 连接模型不同：Web 是短连接请求-响应模式，游戏是 TCP 长连接、双向实时推送；② 延迟要求不同：Web 可接受 100-500ms，游戏要求 &lt; 50ms 才不卡；③ 状态管理不同：Web 是无状态的，游戏服务器维护大量实时状态（位置/HP/CD），断线要恢复；④ 同步模型不同：Web 不需要状态同步，游戏需要预测-校正、插值、增量同步；⑤ 客户端集成不同：Web 用 HTTP 库，游戏需要 C++ Native Plugin 与 Unity 深度集成。`,
    tags: ["架构", "游戏服务器", "对比"],
  },
];
