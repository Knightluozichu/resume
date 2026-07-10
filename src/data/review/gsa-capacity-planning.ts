import type { ReviewQuestion } from "./types";

export const gsaCapacityPlanningQuestions: ReviewQuestion[] = [
  {
    id: "gsa-capacity-planning-1",
    chapter: "gsa-capacity-planning",
    level: 2,
    question: `用 Little's Law 推算：目标登录 QPS 5 万，平均响应 20ms，单机扛 300 并发，需几台机器？`,
    answer:
      `Little's Law：并发数 = QPS × 平均响应时间 = 50000 × 0.02s = 1000 个在途请求。单机扛 300 并发，理论需 1000/300 ≈ 3.3 台。但必须乘安全系数（1.5-2）应对突发流量与单机故障降容——实际部署 4 台时若挂 1 台只剩 3 台，每台扛 333 并发刚好过载；故取 2 倍冗余 → 7 台（向上取整）。容量规划宁滥毋缺，开服当天炸服的损失远超几台机器的成本。同时要压测验证单机 300 并发时 P99 是否达标，不能只算理论值。`,
    tags: ["容量规划", "Little's Law", "压测"],
  },
  {
    id: "gsa-capacity-planning-2",
    chapter: "gsa-capacity-planning",
    level: 3,
    question: `压测有哪四个层次？各自要发现什么问题？`,
    answer:
      `基准压测：单接口单机逐步加压，找拐点（P99 飙升或 CPU > 80%），得出单机安全容量。负载压测：模拟日常 70% 峰值负载持续 1-2 小时，发现中短期问题如连接堆积、缓存预热不足。压力压测：加压到崩溃，找系统天花板与崩溃模式（OOM、超时雪崩、连接耗尽），知道「最坏会怎样」。稳定性压测：日常负载跑 24-72 小时，抓慢泄漏——内存每小时涨 10MB，72 小时后 OOM，单靠短时压测发现不了。游戏服务器还要全链路压测，模拟真实玩家从登录到战斗的完整行为，避免单接口过但组合崩。`,
    tags: ["压测", "基准压测", "稳定性压测"],
  },
  {
    id: "gsa-capacity-planning-3",
    chapter: "gsa-capacity-planning",
    level: 3,
    question: `「压测只要 QPS 够高就算过」这个说法错在哪里？`,
    answer:
      `QPS 高但 P99 飙到 2 秒照样是灾难——玩家感受到的是延迟不是吞吐。压测通过的真正标准是「在目标 QPS 下，P99 延迟低于业务阈值（如 100ms）且资源利用率有余量（CPU < 70%）」。只看 QPS 会掩盖「靠排队堆吞吐」的假象——系统靠让请求等 2 秒换来高 QPS，但玩家早掉了。另一个坑是「单接口压测过，全链路崩」——登录单测 5 万 QPS，但登录要查 DB+Redis+写日志，组合起来 DB 连接池打满。必须全链路压测，看 P99 与资源利用率，而非只看 QPS。`,
    tags: ["压测", "QPS", "P99"],
  },
  {
    id: "gsa-capacity-planning-4",
    chapter: "gsa-capacity-planning",
    level: 4,
    question: `压测发现单机 CPU 没满但 P99 已经飙高，可能的原因有哪些？如何定位？`,
    answer:
      `CPU 没满说明不是计算瓶颈，P99 高通常是「等待」导致。可能原因：①锁竞争——多线程抢同一把锁，线程都在 wait 而非 run，CPU 低但延迟高；②I/O 阻塞——同步 DB/Redis 调用阻塞线程，线程在 I/O wait，CPU 空闲；③连接池打满——请求排队等连接，队列等待时间计入 P99；④GC 停顿——内存分配频繁导致频繁 GC，STW 期间所有请求暂停；⑤网络抖动——内网 RTT 飙升。定位方法：看线程状态（jstack/strace，是否大量 BLOCKED/WAITING）、看 I/O wait（top 的 wa%、是否高）、看连接池水位（是否满）、看 GC 日志（停顿时间与频率）、抓火焰图找热点。先看监控区分是「等锁」「等 I/O」还是「等 GC」。`,
    tags: ["压测", "P99", "瓶颈定位"],
  },
];
