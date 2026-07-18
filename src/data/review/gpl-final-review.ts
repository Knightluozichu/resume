import type { ReviewQuestion } from "./types";

/** 官方 13 章综合验收题。 */
export const gplFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gpl-final-review-1",
    chapter: "gpl-final-review",
    level: 1,
    question: "为什么总复习不能只列出 Go 的语言特性？",
    answer: "语言特性只有进入同一条 producer-to-consumer 链，才能暴露真实依赖：第 1-4 章决定 shape 和 ownership，第 5-7 章决定调用及动态分派，第 8-9 章证明生命周期和共享不变量，第 10-11 章产出构建与测试证据，第 12-13 章限制运行时和 ABI 边界。合格产物应是可运行系统、失败路径和可复查证据，而不是术语清单。",
    tags: ["官方目录", "端到端", "工程证据"],
  },
  {
    id: "gpl-final-review-2",
    chapter: "gpl-final-review",
    level: 2,
    question: "一个 slice race 应如何沿章节依赖回退？",
    answer: "先回第 4 章确认复制的是 slice header 还是 backing array，标出所有读写 owner；再到第 8 章判断是否能通过 channel 转移所有权，到第 9 章为确需共享的短不变量建立 Mutex 或其他 happens-before；最后在第 11 章加入同步测试并运行 go test -race -count=100。只在症状处增加 sleep 不能修复 ownership contract。",
    tags: ["slice", "race", "ownership", "happens-before"],
  },
  {
    id: "gpl-final-review-3",
    chapter: "gpl-final-review",
    level: 3,
    question: "如何证明 worker pool 在取消后不会泄漏 goroutine？",
    answer: "先定义 channel 的唯一关闭者、accepted job 与 result 的对应关系，并让所有阻塞发送和接收同时监听 ctx.Done。测试用 fake fetcher 的 started 信号建立确定时序，取消后在 deadline 内等待 results 关闭；由 WaitGroup 等待全部 worker 后再关闭输出。重复运行取消测试并配合 race detector，检查缓存等共享状态也有同步。",
    tags: ["goroutine", "channel", "context", "cancellation"],
  },
  {
    id: "gpl-final-review-4",
    chapter: "gpl-final-review",
    level: 4,
    question: "引入 reflection 或 unsafe 优化前，发布门禁应包含什么？",
    answer: "先用 production-like benchmark 和 profile 证明 typed 方案的真实瓶颈，保留安全 reference 或 fallback。reflection 要限制 nil、cycle、depth、size、addressability 和 unsupported Kind；unsafe/cgo 要固定 Go 版本、GOOS/GOARCH、layout、alignment、allocation owner、pointer lifetime 与 free path。最后运行等价性、边界、fuzz、race、checkptr 或 cgo 测试，任何证据缺失都不发布。",
    tags: ["reflection", "unsafe", "cgo", "发布门禁"],
  },
];
