import type { ReviewQuestion } from "./types";

/** 学习地图 复习题 */
export const rplLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rpl-learning-map-1",
    chapter: "rpl-learning-map",
    level: 1,
    question: `Rust 官方 21 章怎样分成五段学习门禁，五段各解决什么问题？`,
    answer: `Ch1-3 建工具链与共同语法；Ch4-9 建 ownership、data model、module、collection 与 error boundary；Ch10-14 建 generics/traits/lifetimes、tests、CLI project、iterators 与 Cargo delivery；Ch15-17 建 smart-pointer ownership graph、threads/channels/shared state 与 async tasks；Ch18-21 建 dynamic dispatch、patterns、unsafe/macros，并以 thread-pool web server 集成。分段不改变官方编号和顺序。`,
    tags: ["21 章", "学习地图", "官方目录", "阶段门禁"],
  },
  {
    id: "rpl-learning-map-2",
    chapter: "rpl-learning-map",
    level: 2,
    question: `official reading order、concept dependency 与 mastery evidence 有什么区别？`,
    answer: `reading order 是官方章节的线性先后；dependency 是能力成立所需的跨章 contract，例如 ThreadPool 同时依赖 ownership、closures 和 channels；evidence 是可复核的解释、实现、测试和诊断输出。读到 Chapter 21 只证明覆盖，不证明依赖已掌握或能修复生命周期、锁与 shutdown 问题。`,
    tags: ["reading order", "dependency", "evidence", "覆盖率"],
  },
  {
    id: "rpl-learning-map-3",
    chapter: "rpl-learning-map",
    level: 3,
    question: `Chapter 21 的 worker closure 出现 lifetime error 时，为什么不能只在最后一章试错，应该怎样沿依赖链回退？`,
    answer: `先回 Ch4 画 owner/borrow/drop scope；回 Ch10 判断 lifetime relation 与 static bound；回 Ch13 判断 closure capture 和 FnOnce；回 Ch16 检查 move、Send 与 thread completion。static 不会延长局部值，常见修复是把 owned input move 进 Job、重构 owner scope，或使用有结束边界的 scoped borrowing，而不是泄漏 value 或盲目 clone。`,
    tags: ["所有权", "生命周期", "closure", "Send", "回退路径"],
  },
  {
    id: "rpl-learning-map-4",
    chapter: "rpl-learning-map",
    level: 4,
    question: `为什么 Arc<Mutex<T>> 能编译仍不代表并发设计通过，学习门禁还要检查哪两类证据？`,
    answer: `Arc/Mutex/Send/Sync 主要建立 ownership 与 data-race safety；它们不分析 lock order、guard duration、channel shutdown 等 liveness，也不限制 queue growth、worker saturation 与 memory 等 capacity。门禁还要用超时/死锁案例验证活性，用 bounded queue、load tests 和 queue-depth/wait metrics 验证容量与 backpressure。`,
    tags: ["Arc", "Mutex", "liveness", "capacity", "backpressure"],
  }
];
