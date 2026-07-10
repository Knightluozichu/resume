import type { ReviewQuestion } from "./types";

/** goroutine 复习题 */
export const gplGoroutinesQuestions: ReviewQuestion[] = [
  {
    id: "gpl-goroutines-1",
    chapter: "gpl-goroutines",
    level: 1,
    question: `goroutine 和操作系统线程有什么区别？`,
    answer: `1.栈大小：goroutine 初始 2KB 可增长到 1GB，OS 线程固定 1-8MB。2.调度：goroutine 由 Go runtime 调度（用户态），OS 线程由内核调度。3.数量：百万 goroutine 轻松，OS 线程数千到极限。4.创建成本：goroutine ~1μs，线程 ~100μs。5.通信：goroutine 用 channel（CSP），线程用共享内存+锁。6.GMP 模型：G(goroutine)-M(线程)-P(处理器) 三层调度。`,
    tags: ["goroutine","线程","GMP","栈","调度"],
  },
  {
    id: "gpl-goroutines-2",
    chapter: "gpl-goroutines",
    level: 2,
    question: `Go 的 GMP 调度模型是什么？`,
    answer: `G(Goroutine) 用户协程含执行栈和状态。M(Machine) OS 线程实际执行 G。P(Processor) 逻辑处理器持本地运行队列数量=GOMAXPROCS。调度：1.G 创建放入当前 P 本地队列（满放全局）。2.M 绑定 P 从本地队列取 G 执行。3.本地空时从全局队列偷再从其他 P 偷（work stealing）。4.G 阻塞时 M 解绑 P 让其他 M 用。5.G 恢复放回某 P 队列。GMP 让少量线程高效调度大量 goroutine。`,
    tags: ["GMP","调度","work stealing","P","M"],
  },
  {
    id: "gpl-goroutines-3",
    chapter: "gpl-goroutines",
    level: 3,
    question: `如何控制 goroutine 生命周期？为什么需要 context？`,
    answer: `goroutine 无内置 ID 和取消机制——启动后无法直接 kill。控制方式：1.用 channel 通知退出：done:=make(chan struct{});go func(){for{select{case<-done:return;default:work()}}}();close(done)。2.用 context 标准化取消：ctx,cancel:=context.WithCancel(bg);go worker(ctx);cancel()。3.超时：context.WithTimeout。4.值传递：context.WithValue。context 优势：取消信号自动传播到子 context（树形），一个 cancel 取消所有派生 goroutine。`,
    tags: ["goroutine","context","取消","超时","生命周期"],
  },
  {
    id: "gpl-goroutines-4",
    chapter: "gpl-goroutines",
    level: 4,
    question: `如何避免 goroutine 泄漏？设计带超时的工作池模式。`,
    answer: `泄漏场景：goroutine 阻塞在 channel 接收但发送方已退出——永远阻塞。避免：始终用 context 或 done channel 提供退出路径。工作池：func workerPool(ctx,jobs<-chan Job,results chan<- Result,n int){var wg sync.WaitGroup;for i:=0;i<n;i++{wg.Add(1);go func(){defer wg.Done();for{select{case<-ctx.Done():return;case job,ok:=<-jobs:if!ok{return};results<-process(job)}}}()};go func(){wg.Wait();close(results)}()}。关键：ctx.Done() 提供退出路径，wg.Wait() 等所有退出后关闭 results 避免接收方阻塞。`,
    tags: ["goroutine泄漏","context","工作池","WaitGroup","select"],
  }
];
