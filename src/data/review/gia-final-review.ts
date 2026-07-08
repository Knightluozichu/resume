import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const giaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gia-final-review-1",
    chapter: "gia-final-review",
    level: 1,
    question: "Go 语言实战全书四大板块是什么？它们之间的递进关系是什么？",
    answer: "四大板块：Go 入门（学习地图、Go 哲学）→ 核心类型（数组/切片、map/struct）→ 并发模型（goroutine、channel、并发模式）→ 工程实践（测试打包、标准库、总复习）。递进关系：入门建立语言哲学认知（少即是多、组合优于继承），核心类型是日常编程的基础数据结构，并发模型是 Go 的核心差异化能力，工程实践将前三者整合为可维护的生产级代码。",
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "gia-final-review-2",
    level: 2,
    chapter: "gia-final-review",
    question: "解释 Go 的设计哲学"少即是多"在语言层面的三个具体体现。",
    answer: "1) 没有继承——用组合和接口替代，避免了菱形继承和深层类层次；2) 没有泛型（1.18 前）/ 谨慎引入泛型——标准库长期用 interface{} 和代码生成解决复用，避免过度抽象；3) 没有异常——用 error 返回值替代 try/catch，强制开发者面对失败、减少隐式控制流。这些设计让语言简单、编译快、心智负担低，但也要求开发者用更显式的方式组织代码。",
    tags: ["Go 哲学", "设计原则", "理解"],
  },
  {
    id: "gia-final-review-3",
    level: 3,
    chapter: "gia-final-review",
    question: "给定一个需求：读取大文件，统计每行长度，输出 Top 10 最长行。请用切片、map 和 goroutine 设计方案，说明各组件如何协作。",
    answer: "方案：1) 用 bufio.Scanner 逐行读取大文件，避免一次性加载；2) 启动 N 个 worker goroutine，通过 channel 分发行处理任务（fan-out），每个 worker 计算 len(line) 并将结果发送到结果 channel；3) 主 goroutine 从结果 channel 收集所有 (line, length) 对存入切片；4) 用 sort.Slice 按长度降序排序，取前 10。关键点：channel 解耦生产消费，goroutine 并行处理，切片用于收集和排序，map 在此场景非必需（除非需去重）。注意控制 goroutine 数量避免 OOM，用 WaitGroup 或关闭 channel 同步结束。",
    tags: ["综合", "并发", "切片", "实践"],
  },
  {
    id: "gia-final-review-4",
    level: 4,
    chapter: "gia-final-review",
    question: "你要构建一个并发爬虫：从种子 URL 出发，爬取页面中的链接，限制最大并发数为 10，最多爬取 1000 个页面，支持超时和去重。请画出组件协作图，说明 channel、goroutine、sync 原语各自的职责。",
    answer: "组件：1) visited map（sync.Mutex 保护或 sync.Map）——去重，已访问 URL 跳过；2) semaphore（chan struct{}, 容量 10）——限流并发；3) taskCh（带缓冲 channel）——待爬 URL 队列；4) resultCh——收集爬取结果；5) counter（atomic int64）——计数达 1000 后停止。协作流：主 goroutine 种子 URL 入 taskCh → worker pool 从 taskCh 取 URL，获取 semaphore 槽位，context.WithTimeout 控制单页超时，HTTP 请求后解析链接，新 URL 检查 visited 后入 taskCh，计数 +1 达 1000 则关闭 taskCh → 主 goroutine Wait 等 workers 退出。关键：channel 负责任务分发，semaphore 负责限流，mutex 保护 map，atomic 负责计数，context 负责超时。注意避免死锁——关闭 taskCh 前确保 workers 能优雅退出。",
    tags: ["综合设计", "爬虫", "并发", "架构"],
  },
];
