import type { ReviewQuestion } from "./types";

export const ndbgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-final-review-1",
    chapter: "ndbg-final-review",
    level: 3,
    question: `用「一次线上 OOM 事故」描述完整的故障排查旅程，串联全书知识点。`,
    answer:
      `①发现症状（第9章）——APM 监控显示 heapUsed 在数小时内线性增长至 OOM 崩溃，--report-on-fatalerror 生成的报告确认 javascriptHeap 已达 limit，判定为内存泄漏。②建立调试通道（第2章）——在预发环境用 --inspect 启动，通过 SSH 隧道连接 Inspector Protocol，避免生产暴露端口。③拍堆快照定位（第4-5章）——用三快照法拍基线→操作→操作三张快照，Comparison 视图找出增量对象（Array +5000/操作），Retainers 面板追溯 retainer 链：array → Map → global cache → GC Root，确认全局缓存从不淘汰导致泄漏。④修复——给 cache 加 LRU 限制最大 10000 条目。⑤验证（第9章）——部署后观察 APM，heapUsed 稳定在 200-300MB 且 GC 后回落，6 小时未再 OOM。整个过程串联了生产监控、Inspector Protocol、Heap Snapshot、Retainers 分析、APM 验证五个工具链。`,
    tags: ["全书主线", "OOM事故", "故障排查", "调试旅程"],
  },
  {
    id: "ndbg-final-review-2",
    chapter: "ndbg-final-review",
    level: 3,
    question: `面对「响应延迟突然增大」的症状，如何系统化排查？涉及哪些章节的工具？`,
    answer:
      `系统化排查分四步：①量化症状——用 monitorEventLoopDelay 检测事件循环 p99 延迟，确认是偶发尖峰还是持续高延迟（第9章 APM 监控）。②判断类型——如果延迟伴随 CPU 高，用 CPU Profiler 采样找热点函数（第6章），可能是同步阻塞（JSON.parse 大对象/正则回溯/同步循环）；如果 CPU 不高但延迟大，可能是 I/O 瓶颈或异步堆积，用 AsyncHooks 追踪异步调用链找卡点（第8章）。③深入定位——CPU 高用 0x/clinic.js 生成火焰图，找最宽的栈顶帧（第7章）；异步堆积用 AsyncLocalStorage 追踪请求级上下文，找出哪个请求的异步链卡住了（第8章）。④验证修复——改代码后在预发环境压测，用 APM 监控对比修复前后的 p99 延迟（第9章）。涉及第6-9章的工具：monitorEventLoopDelay → CPU Profiler → 火焰图 → AsyncHooks → APM 验证。`,
    tags: ["延迟排查", "事件循环", "CPU Profiler", "AsyncHooks", "系统化"],
  },
  {
    id: "ndbg-final-review-3",
    chapter: "ndbg-final-review",
    level: 4,
    question: `根据症状类型描述调试工具选型决策树，以及事故排查的黄金法则。`,
    answer:
      `工具选型决策树：①OOM 崩溃（内存持续增长）→ process.memoryUsage() 监控 + Heap Snapshot 三快照法（第4-5章）；②CPU 打满（单核 100%）→ --prof 采样 + 0x/clinic.js 火焰图（第6-7章）；③响应延迟高（事件循环延迟）→ monitorEventLoopDelay + CPU Profile + AsyncHooks（第6-8章）；④偶发崩溃（未捕获异常）→ --report + llnode postmortem（第9章）；⑤逻辑 bug（结果不符合预期）→ --inspect + DevTools 断点（第2-3章）。事故排查黄金法则：①先量化——用监控数据确认问题类型（CPU/内存/延迟/错误率），不要凭感觉猜；②再定位——用对应工具精确定位（Profile/Snapshot/断点），不要盲目改代码；③后修复——改代码后用监控验证效果，不要「改了就上线」；④防复发——加监控告警 + 压测回归，防止同类问题再次发生。核心是「先量化症状，再选工具」。`,
    tags: ["工具选型", "决策树", "黄金法则", "系统化排查"],
  },
  {
    id: "ndbg-final-review-4",
    chapter: "ndbg-final-review",
    level: 4,
    question: `为什么说「从 console.log 到完整工具链」是 Node.js 工程师的核心能力进阶？`,
    answer:
      `console.log 只能解决「逻辑 bug」（结果不符合预期）这一类最简单的问题，且有三个致命局限：侵入式（需改代码重启）、静态（只看一个时间点）、无结构（无法展示对象引用关系/函数采样/异步调用链）。真实生产事故远比逻辑 bug 复杂：内存泄漏需要 Heap Snapshot 看 Retained Size 和 retainer 链（第4-5章）；CPU 热点需要 Profiler 采样和火焰图可视化（第6-7章）；异步断裂需要 AsyncHooks 追踪 asyncId 父子关系（第8章）；生产崩溃需要 --report 和 postmortem 事后分析（第9章）。这些工具解决的都是 console.log 完全无能为力的问题。掌握完整工具链意味着：能在任何故障场景下选择正确工具、能读懂工具输出的数据结构、能从数据中推断根因。这是中高级 Node.js 工程师的分水岭——初级工程师只会 console.log，遇到生产事故只能重启服务；高级工程师能用工具链定位根因并永久修复。`,
    tags: ["工程能力", "工具链", "console.log", "全书总结"],
  },
];
