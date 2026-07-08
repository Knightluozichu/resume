import type { ReviewQuestion } from "./types";

/** Goroutine 复习题 */
export const giaGoroutinesQuestions: ReviewQuestion[] = [
  {
    id: "gia-goroutines-1",
    chapter: "gia-goroutines",
    level: 1,
    question: "Goroutine 和 OS 线程的主要区别是什么？",
    answer: "Goroutine：~2KB 栈起步按需增长、用户态调度、创建/切换成本极低、数十万并发轻松、阻塞只挂起 G 不影响其他。OS 线程：~1-8MB 固定栈、内核调度、创建/切换成本高、万级已是上限、阻塞整线程。Goroutine 通过 G-M-P 模型在少量 OS 线程上多路复用。",
    tags: ["goroutine", "OS线程", "轻量"],
  },
  {
    id: "gia-goroutines-2",
    chapter: "gia-goroutines",
    level: 2,
    question: "G-M-P 调度模型的三个组件是什么？work stealing 如何工作？",
    answer: "G(goroutine)是被调度单元，M(OS线程)是执行载体，P(处理器)持有本地运行队列(LRQ)，数量=GOMAXPROCS。调度：G 加入 P 的 LRQ，M 绑定 P 取 G 执行。G 阻塞时 M 释放 P 让其他 M 用；P 队列空时执行 work stealing——从其他 P 偷一半 G 过来，保证负载均衡，避免全局锁竞争。GOMAXPROCS 控制 P 数量=真正并行度。",
    tags: ["G-M-P", "work stealing", "调度器"],
  },
  {
    id: "gia-goroutines-3",
    chapter: "gia-goroutines",
    level: 3,
    question: "以下代码有什么问题？如何修复？\nfor i := 0; i < 3; i++ { go func() { fmt.Println(i) }() }",
    answer: "问题：闭包捕获循环变量 i 的引用而非副本。三个 goroutine 实际执行时循环可能已结束，i 是最终值 3，可能打印三个 3。修复方法 1（传参）：go func(n int){ fmt.Println(n) }(i)，每个 goroutine 获独立副本。修复方法 2（Go 1.22+）：循环变量每次迭代是新变量，闭包捕获独立副本，无需修复。修复方法 3（局部变量）：循环内 i := i。方法 1 传参最清晰。另外用 time.Sleep 等待不可靠，应用 sync.WaitGroup。",
    tags: ["闭包捕获", "循环变量", "并发陷阱"],
  },
  {
    id: "gia-goroutines-4",
    chapter: "gia-goroutines",
    level: 4,
    question: "什么是 goroutine 泄漏？如何检测和预防？设计一个有退出机制的 goroutine。",
    answer: "泄漏：启动后永不退出、无法被回收的 goroutine，通常因忘记设计退出路径（无 context 取消、无 done channel）。长期运行服务中泄漏累积导致内存增长最终 OOM。检测：runtime.NumGoroutine() 监控数量趋势；go tool pprof 的 goroutine profile 查看阻塞位置；pprof web 可视化调用栈。预防：每个 goroutine 启动时就要设计退出路径。设计：func worker(ctx context.Context) { for { select { case <-ctx.Done(): return; case job := <-jobs: process(job) } } }。用 context.WithCancel/WithTimeout 创建 ctx，cancel() 或超时后 goroutine 通过 select 收到 ctx.Done() 退出。用 sync.WaitGroup 等待退出完成实现优雅关闭。",
    tags: ["goroutine泄漏", "context", "pprof", "综合"],
  },
];
