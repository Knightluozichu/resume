import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const rplFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rpl-final-review-1",
    chapter: "rpl-final-review",
    level: 1,
    question: `怎样从 Rust 函数签名读出 ownership contract，并决定 owned T、&T、&mut T、Rc/RefCell 或 Arc/Mutex？`,
    answer: `先判断 value 是 transfer、temporary borrow 还是 shared ownership；再判断 mutation 与 thread boundary。按值 T 转移 owner，&T 允许共享读，&mut T 在 borrow period 内独占。单线程多 owner 用 Rc，runtime interior mutation 加 RefCell；跨线程多 owner 用 Arc，shared mutation 加 Mutex。最后仍需证明 owner/borrow/Drop、cycle、guard scope、lock order 和 shutdown。`,
    tags: ["ownership contract", "borrow", "Rc", "Arc", "Mutex"],
  },
  {
    id: "rpl-final-review-2",
    chapter: "rpl-final-review",
    level: 2,
    question: `enum、generic trait bound、dyn Trait、macro 与 Result/panic 是哪两类独立设计选择？`,
    answer: `前四者选择 abstraction/open-set boundary：closed variants 用 enum+exhaustive match；compile-time concrete implementation 用 generic+bound；runtime heterogeneous open set 用 dyn Trait；必须接 syntax/生成 items 才用 macro。Result/panic 选择 failure policy：caller 有 retry/fallback/propagate 策略用 Result；无法维持 invariant 且无合理恢复才 panic。动态分派不要求 panic，macro 也不替代普通多态。`,
    tags: ["enum", "generic", "dyn Trait", "macro", "Result", "panic"],
  },
  {
    id: "rpl-final-review-3",
    chapter: "rpl-final-review",
    level: 3,
    question: `为什么 Arc<Mutex<T>>、Future 或固定线程池能通过类型检查，仍不能证明并发系统正确？`,
    answer: `类型主要证明 safety：ownership、Send/Sync、guard 排除部分 data race/invalid access。liveness 仍可能被 lock order、guard 跨 job、channel 不关闭、lost wake 或 join placement 破坏；capacity 仍可能被 unbounded queue、slow jobs、blocking executor 与无 timeout/backpressure 破坏。应分别用 deadlock/shutdown tests 与 bounded queue/load metrics 证明后两项。`,
    tags: ["safety", "liveness", "capacity", "backpressure", "shutdown"],
  },
  {
    id: "rpl-final-review-4",
    chapter: "rpl-final-review",
    level: 4,
    question: `用 protocol、capacity、error、test、shutdown 五个门禁审计 Chapter 21 教学服务器，分别要拿出什么证据？`,
    answer: `protocol：request framing/limits/malformed cases 与 byte-accurate response；capacity：fixed workers 之外还有 bounded queue、timeout/reject/backpressure；error：I/O/channel/job panic 不靠 unwrap 隐藏；test：success/404/slow concurrency/queue full/disconnect/cleanup 可复现；shutdown：停止 accept/submit，drop all senders，排空 jobs，RecvError 后 workers break，最后 join。任一门禁缺失整体不能通过。`,
    tags: ["protocol", "capacity", "error", "test", "graceful shutdown"],
  }
];
