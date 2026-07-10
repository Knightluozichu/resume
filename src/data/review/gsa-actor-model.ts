import type { ReviewQuestion } from "./types";

export const gsaActorModelQuestions: ReviewQuestion[] = [
  {
    id: "gsa-actor-model-1",
    chapter: "gsa-actor-model",
    level: 2,
    question: `Actor 模型的三要素是什么？为什么能天然避免数据竞争？`,
    answer:
      `三要素：私有状态（只有该 Actor 自己的执行线程能读写）、邮箱（FIFO 消息队列）、行为（收到消息时的处理函数）。避免数据竞争的原因：Actor 一次只处理一条消息（邮箱 FIFO + 单线程消费），处理某条消息时状态不会被并发修改；外部无法直接访问其字段，只能发消息。这把「共享内存 + 锁」替换成「隔离状态 + 消息通信」——根本不存在共享的可变状态，自然无竞争。代价是通信必须异步，消息投递有开销。`,
    tags: ["Actor", "数据竞争", "邮箱"],
  },
  {
    id: "gsa-actor-model-2",
    chapter: "gsa-actor-model",
    level: 3,
    question: `为玩家、场景、匹配服务分别设计 Actor 粒度，说明理由。`,
    answer:
      `玩家一人一 Actor：玩家状态（背包、位置、CD）强一致需求高，单 Actor 串行处理避免锁，玩家间天然隔离。场景一服一 Actor：聚合同场景玩家，场景内广播（伤害事件）通过场景 Actor 中转，避免 N 个玩家 Actor 互相直连造成消息扇出爆炸；场景 Actor 还能做 AOI 兴趣裁剪。匹配服务一个全局 Actor：匹配是跨场景的全局调度，单 Actor 串行处理匹配队列避免多线程抢同一队列加锁；吞吐不够时再按段位分多个匹配 Actor。原则：强隔离状态用细粒度，全局协调用粗粒度。`,
    tags: ["Actor", "粒度", "场景"],
  },
  {
    id: "gsa-actor-model-3",
    chapter: "gsa-actor-model",
    level: 3,
    question: `「Actor 模型比线程池快，因为它无锁」这个说法错在哪里？`,
    answer:
      `Actor 的「无锁」仅指状态访问无锁，但消息投递有成本：消息入队、出队、跨线程唤醒、可能的跨机器网络序列化。对计算密集型任务，Actor 的消息开销可能比直接函数调用慢 10-100 倍。Actor 模型的价值不是「单次更快」，而是「可扩展、可组合、故障隔离」——能放心横向扩容到成百上千 Actor 而不担心锁地狱。选型时想清楚要的是「峰值性能」还是「可维护的并发架构」。计算密集用线程池，I/O 密集且需隔离用 Actor。`,
    tags: ["Actor", "线程池", "性能"],
  },
  {
    id: "gsa-actor-model-4",
    chapter: "gsa-actor-model",
    level: 4,
    question: `Actor 邮箱积压（背压）如何检测与处理？`,
    answer:
      `检测：监控每个 Actor 邮箱长度，超过阈值（如 1000 条）告警；监控消息处理延迟（入队到出队的时间差），持续增长说明消费跟不上生产。处理：①扩容——若 Actor 可分片（如按玩家 ID 拆分多个），加 Actor 实例分担；②降级——丢弃低优先级消息（如旧的位置同步），保关键消息（如战斗指令）；③背压传递——通知上游 Actor 减速或拒绝新请求，避免积压向上游蔓延；④优化处理——单条消息处理太慢时，把重计算拆到线程池异步，Actor 只做协调。根本是让消费速度匹配生产速度。`,
    tags: ["Actor", "背压", "积压"],
  },
];
