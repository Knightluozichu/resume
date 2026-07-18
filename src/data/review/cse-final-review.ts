import type { ReviewQuestion } from "./types";

export const cseFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cse-final-review-1",
    chapter: "cse-final-review",
    level: 1,
    question: "怎样用owner、state和evidence三条线串联官方九章的一次请求？",
    answer: "owner线从RAII/process到acceptor/EventLoop/Connection/worker/result/reconnect timer；state线从listen/accept、read/partial I/O、incremental decode、execute、reply/high-water、close/recover推进；evidence线用build-id/GDB、socket/packet、parser offsets、queues、logs/metrics关联。第8章Redis源码验证真实调用链，第9章让disconnect到ready形成恢复闭环。",
    tags: ["owner", "state", "evidence"],
  },
  {
    id: "cse-final-review-2",
    chapter: "cse-final-review",
    level: 2,
    question: "worker result晚到且fd已复用时，正确设计和验证是什么？",
    answer: "不跨线程传裸fd/raw this；worker持immutable request和weak handle，result作为command回owner loop，按stable connection id/generation验证当前对象，再append/flush output。close由owner注销poller/timer/map并deferred destroy。用延迟result/fd复用测试、TSAN和带generation/thread id的logs证明旧result被丢弃。",
    tags: ["fd reuse", "generation", "lifetime"],
  },
  {
    id: "cse-final-review-3",
    chapter: "cse-final-review",
    level: 3,
    question: "发布前九项production evidence gates至少覆盖哪些风险？",
    answer: "覆盖RAII/shutdown lifetime、production-matching core symbols、thread/data-race synchronization、nonblocking partial I/O、protocol random chunks/fuzz/limits、single-loop bounded queues/buffers/timers、Redis source breakpoint chain、reconnect/heartbeat failure injection，以及logs/error/monitor security/correlation。最后再做load、fault、security与graceful drain综合回归。",
    tags: ["production gates", "故障注入", "发布"],
  },
];
