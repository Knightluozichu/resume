import type { ReviewQuestion } from "./types";

/** Channel 复习题 */
export const giaChannelsQuestions: ReviewQuestion[] = [
  {
    id: "gia-channels-1",
    chapter: "gia-channels",
    level: 1,
    question: `CSP 模型的核心思想是什么？`,
    answer: `CSP（Communicating Sequential Processes）核心：「不要通过共享内存通信，而要通过通信共享内存」。传统并发是多个线程共享变量加锁互斥访问；Go 的方式是每个 goroutine 拥有数据，通过 channel 把数据发给需要的 goroutine——所有权转移天然避免数据竞争。`,
    tags: ["CSP", "通信共享内存"],
  },
  {
    id: "gia-channels-2",
    chapter: "gia-channels",
    level: 2,
    question: `无缓冲 channel 和有缓冲 channel 的区别？分别适用什么场景？`,
    answer: `无缓冲 make(chan T)：无缓冲区，发送阻塞直到有接收者——同步握手，保证发送瞬间接收方在场。适用同步信号、保证顺序、rendezvous。有缓冲 make(chan T, n)：n 容量缓冲，未满发送不阻塞、非空接收不阻塞——异步解耦。适用生产消费解耦、削峰填谷。原则：默认无缓冲（同步明确强制背压），有明确理由才加缓冲，缓冲过大可能掩盖消费方太慢的设计问题。`,
    tags: ["无缓冲", "有缓冲", "同步异步"],
  },
  {
    id: "gia-channels-3",
    chapter: "gia-channels",
    level: 3,
    question: `以下代码会发生什么？如何正确处理？\nch := make(chan int); go func(){ ch<-1; ch<-2 }(); close(ch)`,
    answer: `panic: send on closed channel。main 执行 close(ch) 后，子 goroutine 执行 ch<-1 时 channel 已关闭，向已关闭 channel 发送会 panic。正确做法：由发送方关闭且关闭后不再发送——go func(){ ch<-1; ch<-2; close(ch) }()。原则：1.关闭只由发送方负责（接收方不知发送方是否还会发）；2.确保关闭后不再发送；3.多发送方用 done channel 或 sync.Once 协调。向已关闭 channel 发送 panic，但从已关闭 channel 接收安全（返回零值+ok=false）。`,
    tags: ["close", "send on closed", "panic"],
  },
  {
    id: "gia-channels-4",
    chapter: "gia-channels",
    level: 4,
    question: `用 select 实现一个带超时和取消的任务执行器，说明 select 的设计要点。`,
    answer: `func doTask(ctx context.Context, task Task) (Result, error) { result := make(chan Result, 1); go func(){ result <- task.Run() }(); select { case r := <-result: return r, nil; case <-time.After(5*time.Second): return Result{}, errors.New(\"timeout\"); case <-ctx.Done(): return Result{}, ctx.Err() } }。设计要点：1. select 同时监听结果 channel、超时 timer、取消 ctx，任一就绪即返回；2. result 用有缓冲 channel（cap=1）确保即使无人接收，goroutine 也不阻塞泄漏（写入后可退出）；3. case 随机选择就绪的，不保证公平但避免饥饿；4. 超时和取消后 goroutine 仍在跑——理想情况下 task.Run 也应接受 ctx 响应取消；5. 用 for+select 构成事件循环处理持续事件。select 是 Go 并发协调的核心，让一个 goroutine 同时等待多个事件。`,
    tags: ["select", "超时", "取消", "综合"],
  },
];
