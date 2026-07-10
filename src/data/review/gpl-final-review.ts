import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const gplFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gpl-final-review-1",
    chapter: "gpl-final-review",
    level: 1,
    question: `Go 语言的两大核心特性是什么？`,
    answer: `1.原生并发——goroutine（轻量协程）和 channel（类型化通信管道）是语言级并发原语，基于 CSP 模型。不要通过共享内存通信而通过通信共享内存。2.简单——25 个关键字无类继承显式错误处理快速编译单二进制部署。Go 刻意简化语言特性牺牲表达力换工程效率和可维护性。`,
    tags: ["Go","并发","goroutine","channel","简单"],
  },
  {
    id: "gpl-final-review-2",
    chapter: "gpl-final-review",
    level: 2,
    question: `Go 的并发模型 CSP 是什么？如何理解「通过通信共享内存」？`,
    answer: `CSP：并发实体通过 channel 传递消息通信而非共享变量加锁。传统并发：多线程共享变量用锁保护。Go CSP：goroutine 各自拥有数据需交换时通过 channel 传递值副本（或所有权）不共享变量。「通过通信共享内存」不是共享变量+锁而是把数据从一个 goroutine 通过 channel 发到另一个——发送后原 goroutine 不再访问（所有权转移）接收方独占。避免数据竞争不需锁。Go 也支持 sync.Mutex——channel 适合传递数据 mutex 适合保护共享状态。`,
    tags: ["CSP","channel","共享内存","goroutine","mutex"],
  },
  {
    id: "gpl-final-review-3",
    chapter: "gpl-final-review",
    level: 3,
    question: `Go 中如何选择 channel 和 mutex 处理并发共享状态？`,
    answer: `channel 适合：1.传递数据所有权。2.协调 goroutine（信号等待扇入扇出）。3.结果收集（fan-in）。mutex 适合：1.保护共享数据结构（如 map 并发读写）。2.简单计数器（atomic 更优）。3.缓存读写。判断：如果问题是「谁拥有数据」用 channel（传递所有权），如果「多个 goroutine 需读写同一数据」用 mutex（保护共享）。实际配合：mutex 保护共享 map channel 通知事件。sync.Map 适合读多写少。`,
    tags: ["channel","mutex","共享状态","选择","sync"],
  },
  {
    id: "gpl-final-review-4",
    chapter: "gpl-final-review",
    level: 4,
    question: `综合全书设计 Go 并发 Web 爬虫，要求控制并发数支持超时和取消。`,
    answer: `func Crawl(ctx context.Context,urls []string,maxWorkers int,timeout time.Duration)[]Result{jobs:=make(chan string,len(urls));results:=make(chan Result,len(urls));for _,u:=range urls{jobs<-u};close(jobs);var wg sync.WaitGroup;for i:=0;i<maxWorkers;i++{wg.Add(1);go func(){defer wg.Done();for url:=range jobs{taskCtx,cancel:=context.WithTimeout(ctx,timeout);result:=crawlOne(taskCtx,url);cancel();results<-result}}()};go func(){wg.Wait();close(results)}();var all[]Result;for r:=range results{all=append(all,r)};return all}。综合应用：类型变量(Result struct)、函数(多返回值)、接口(Fetcher+mock)、goroutine(worker pool)、channel(jobs/results)、select(crawlOne 中)、context(超时取消)、WaitGroup(等 worker)、包结构(cmd+internal)、testing(表驱动+httptest)。`,
    tags: ["综合","爬虫","goroutine","channel","context","Worker Pool","接口"],
  }
];
