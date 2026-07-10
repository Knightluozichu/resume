import type { ReviewQuestion } from "./types";

/** 并发模式 复习题 */
export const giaConcurrencyPatternsQuestions: ReviewQuestion[] = [
  {
    id: "gia-concurrency-patterns-1",
    chapter: "gia-concurrency-patterns",
    level: 1,
    question: `Go 经典并发模式有哪四个？`,
    answer: `Worker Pool（工作池）：N 个 worker 从 jobs channel 取任务写 results，限制并发数。Pipeline（流水线）：多 stage 串联，每 stage 一个 goroutine + channel，流式处理。Fan-out/Fan-in（扇出扇入）：多个 goroutine 并行处理再合并结果。context 取消：用 context.Context 统一管理 goroutine 超时与取消，防泄漏。`,
    tags: ["并发模式", "WorkerPool", "Pipeline"],
  },
  {
    id: "gia-concurrency-patterns-2",
    chapter: "gia-concurrency-patterns",
    level: 2,
    question: `Worker Pool 模式中 worker 数应该如何设定？为什么不能每个任务起一个 goroutine？`,
    answer: `worker 数 = 并发上限，应根据下游资源容量设定（如 DB 连接池大小、API 速率限制）。设太大（如 10000）会耗尽下游资源；设太小（如 1）退化为串行。不能每任务起一个 goroutine 的原因：1. goroutine 虽轻量但数量失控仍耗内存（数十万时）；2. 下游资源有限（DB 连接、文件描述符），过多并发反而因竞争变慢甚至失败；3. 无法控制速率，可能触发下游限流。Worker Pool 用固定 worker 数 + 缓冲 channel 削峰，实现可控并发。`,
    tags: ["WorkerPool", "限流", "并发控制"],
  },
  {
    id: "gia-concurrency-patterns-3",
    chapter: "gia-concurrency-patterns",
    level: 3,
    question: `Pipeline 模式中每个 stage 的 channel 为什么必须关闭？忘记关闭会怎样？`,
    answer: `必须关闭因为下游 for v := range in 依赖 channel 关闭来退出循环。如果上游 stage 不 close(out)，下游 range 会永久阻塞——它以为还有数据，导致 goroutine 泄漏 + 死锁。规则：发送方负责关闭，用 defer close(out) 确保异常退出也关闭。每个 stage 的 goroutine 在处理完输入后 close 自己的输出 channel，让下游感知结束。带 context 的 pipeline 还应在 select 中同时监听 ctx.Done() 和输入 channel，取消时关闭输出并返回。`,
    tags: ["Pipeline", "channel关闭", "泄漏"],
  },
  {
    id: "gia-concurrency-patterns-4",
    chapter: "gia-concurrency-patterns",
    level: 4,
    question: `设计一个支持限流、超时、优雅关闭的并发任务处理器，说明用到的并发模式与机制。`,
    answer: `设计：1. Worker Pool 限流——N 个 worker 从 jobs channel 取任务，N=资源上限；2. context 超时与取消——每个任务用 context.WithTimeout 设超时，全局用 context.WithCancel 供优雅关闭；3. select 响应取消——worker 内 select { case <-ctx.Done(): return; case job := <-jobs: process(ctx, job) }；4. sync.WaitGroup 优雅关闭——关闭 jobs channel 后 wg.Wait() 等待所有 worker 完成；5. results channel 收集结果。优雅关闭流程：监听 SIGINT/SIGTERM → cancel() 取消 context（所有 worker 收到 ctx.Done() 退出）→ close(jobs)（若无在途）→ wg.Wait() 等待退出 → 关闭 results。这综合了 Worker Pool（限流）+ context（超时取消）+ WaitGroup（优雅关闭）+ select（响应取消），是生产级并发服务的标准骨架。`,
    tags: ["WorkerPool", "context", "优雅关闭", "综合"],
  },
];
