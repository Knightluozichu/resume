import type { ReviewQuestion } from "./types";

export const ummLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "umm-learning-map-1",
    chapter: "umm-learning-map",
    level: 2,
    question: `Unity MMO 全书的五阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `客户端网络（Protobuf/同步）→ 玩法系统（角色/战斗）→ 世界管理（场景/AOI）→ 生产运维（优化/部署）→ 总复习。顺序由依赖关系决定：先有客户端联网能力，才能做角色和战斗逻辑；有了玩法系统，才需要场景管理和 AOI 来支撑大世界；最后才是性能优化和部署运维。上层依赖下层，不能跳步。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "umm-learning-map-2",
    chapter: "umm-learning-map",
    level: 2,
    question: `为什么说「服务器权威」是 MMO 网游的基石？`,
    answer:
      `在 MMO 中，所有关键游戏逻辑（位置、伤害、经济）必须由服务器计算，客户端的输入只是「请求」而非「指令」。如果不这样做，客户端可以伪造数据（比如给自己加 HP、瞬移、秒杀），作弊无法防范。服务器权威确保了游戏状态的正确性和公平性，是反作弊的第一道防线。`,
    tags: ["服务端权威", "反作弊", "架构"],
  },
  {
    id: "umm-learning-map-3",
    chapter: "umm-learning-map",
    level: 3,
    question: `用「一条玩家操作的旅程」描述全书主线。`,
    answer:
      `玩家点击屏幕 → 客户端联网层封装 Protobuf 消息 → 通过 TCP 发送到服务器 → 服务器按同步策略（状态同步）校验并执行 → 角色属性变更 → 战斗系统判定伤害 → AOI 系统决定广播范围 → 场景流式加载新区域 → 客户端渲染表现 → 性能优化保证流畅 → 部署运维保证不停服。每个环节都对应全书一章。`,
    tags: ["架构", "消息旅程"],
  },
  {
    id: "umm-learning-map-4",
    chapter: "umm-learning-map",
    level: 1,
    question: `Unity MMO 开发与单机游戏开发最大的区别是什么？`,
    answer:
      `最大的区别是「状态权威归属」：单机游戏所有逻辑在本地计算，客户端说了算；MMO 的权威在服务器，客户端只负责输入和渲染。这意味着每一帧的操作都要经过网络往返，引入了延迟、同步、断线重连等单机不需要处理的问题。同时 MMO 还要解决万人同服的性能（AOI）、数据持久化（分服/合服）和长线运营（热更）等工程问题。`,
    tags: ["服务端权威", "架构", "MMO"],
  },
];
