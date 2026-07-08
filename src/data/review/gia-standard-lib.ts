import type { ReviewQuestion } from "./types";

/** 标准库精要 复习题 */
export const giaStandardLibQuestions: ReviewQuestion[] = [
  {
    id: "gia-standard-lib-1",
    chapter: "gia-standard-lib",
    level: 1,
    question: "io.Reader 接口定义了什么方法？为什么它是 Go 标准库的基石之一？",
    answer: "io.Reader 定义了 Read(p []byte) (n int, err error) 方法。它表示「从某处读取数据到 p」的抽象——文件、网络连接、内存缓冲、压缩流都可以实现 io.Reader。标准库大量函数接受 io.Reader 参数，使得任何实现了该接口的数据源都能无缝接入，实现了「组合优于继承」的设计哲学。",
    tags: ["io.Reader", "接口", "标准库"],
  },
  {
    id: "gia-standard-lib-2",
    level: 2,
    chapter: "gia-standard-lib",
    question: "context.Context 的两个主要职责是什么？为什么 Go 要求函数链路中显式传递 context？",
    answer: "context.Context 有两个职责：1) 传播取消信号——通过 WithCancel/WithTimeout 创建可取消的 context，父取消时所有子自动取消，用于超时控制和主动中断；2) 携带请求作用域的值——通过 WithValue 存取链路数据（如 trace ID）。Go 要求显式传递而非全局变量，是为了让取消和值的生命周期可追踪、避免隐式依赖，并强制开发者在函数签名中声明对 context 的需求，使并发安全可见。",
    tags: ["context", "取消", "并发"],
  },
  {
    id: "gia-standard-lib-3",
    level: 3,
    chapter: "gia-standard-lib",
    question: "用 sync.WaitGroup 实现一个并发下载器：启动 3 个 goroutine 下载不同 URL，主 goroutine 等待全部完成后退出。",
    answer: "func downloadAll(urls []string) {\n  var wg sync.WaitGroup\n  for _, url := range urls {\n    wg.Add(1)\n    go func(u string) {\n      defer wg.Done()\n      // download(u) ...\n      fmt.Println(\"done:\", u)\n    }(url)\n  }\n  wg.Wait()\n}。关键点：Add 在启动 goroutine 前调用、Done 在 defer 中调用保证异常也计数、循环变量需作为参数传入避免闭包捕获问题。Wait 阻塞直到计数器归零。",
    tags: ["sync.WaitGroup", "并发", "实践"],
  },
  {
    id: "gia-standard-lib-4",
    level: 4,
    chapter: "gia-standard-lib",
    question: "设计一个带超时和并发的 HTTP 请求批量处理器：最多 5 个并发，每个请求 3 秒超时，全部完成后收集结果。请说明涉及的标注库包及协作方式。",
    answer: "涉及 net/http（发起请求）、context（超时控制）、sync（WaitGroup 等待 + Mutex 保护结果切片）或 channel（收集结果）。思路：1) 用 semaphore channel（容量 5）控制并发数；2) 每个请求用 context.WithTimeout(ctx, 3*time.Second) 创建超时 context，传给 http.NewRequestWithContext；3) 启动 goroutine 内 defer wg.Done() + <-sem 释放槽位，结果通过带缓冲 channel 发回；4) 主 goroutine wg.Wait() 后关闭 channel，遍历收集。关键协作：context 负责超时传播，channel 负责并发限流和数据传递，WaitGroup 负责同步等待。注意 http.Client 默认无超时，必须用 context 或 Transport.Timeout 控制。",
    tags: ["net/http", "context", "并发设计", "综合"],
  },
];
