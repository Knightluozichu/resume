import type { ReviewQuestion } from "./types";

export const ndgPerformanceDebugQuestions: ReviewQuestion[] = [
  {
    id: "ndg-performance-debug-1",
    chapter: "ndg-performance-debug",
    level: 2,
    question: `Node.js 性能分析的三大维度是什么？各自用什么工具？`,
    answer:
      `①CPU 分析——找热点函数（哪个函数占 CPU 最多）：用 node --prof 运行生成 V8 tick 日志，node --prof-process 解析为可读报告；或用 clinic flame 生成火焰图；或通过 inspector.Session 编程式采集 CPU Profile。②内存分析——找泄漏（谁引用了不该留的对象）：用 node --inspect 连接 Chrome DevTools，手动或定时拍 Heap Snapshot，对比两个快照的 diff 找增长对象；用 process.memoryUsage() 监控 RSS/heapUsed 趋势；retainers 面板查看对象被谁引用。③事件循环延迟——找阻塞点（哪段同步代码卡住了循环）：用 perf_hooks.monitorEventLoopDelay 实时监控 p99 延迟（>10ms 说明有阻塞）；用 clinic doctor 综合诊断；同步代码是延迟的唯一来源。三个维度分别回答「CPU 在忙什么」「内存为什么涨」「为什么响应变慢」。`,
    tags: ["性能分析", "CPU", "内存", "事件循环"],
  },
  {
    id: "ndg-performance-debug-2",
    chapter: "ndg-performance-debug",
    level: 3,
    question: `如何用 --inspect 连接 Chrome DevTools 调试 Node.js 程序？生产环境能用吗？`,
    answer:
      `用法：node --inspect=9229 app.js 启动，程序输出 ws://localhost:9229 端点地址。在 Chrome 打开 chrome://inspect，点击 inspect 打开 DevTools——支持断点调试、步进、变量查看、Console、CPU Profile、Heap Snapshot、Coverage 等面板。VS Code 也可通过 launch.json 配置 type: node 连接。生产环境使用注意：①--inspect 暴露 WebSocket 端点，任何人连上可执行任意代码，极度危险；②如需生产调试必须绑定内网 IP（--inspect=127.0.0.1:9229）且加防火墙；③更安全的方式是用 inspector.Session 编程式采集——在代码中主动启动/停止 Profiler，导出数据到文件分析，不暴露端口；④SIGUSR1 信号可动态开启 inspector（仅在已运行的进程上），用完再关。社区推荐生产用 APM（如 Clinic.js/DataDog）而非裸 --inspect。`,
    tags: ["inspect", "DevTools", "调试", "生产安全"],
  },
  {
    id: "ndg-performance-debug-3",
    chapter: "ndg-performance-debug",
    level: 3,
    question: `如何诊断 Node.js 应用的内存泄漏？完整流程是什么？`,
    answer:
      `①确认泄漏：监控 process.memoryUsage()，如果 heapUsed 持续单调增长且 GC 后不回落，基本确认泄漏。RSS 增长也可能是 native 内存泄漏（Buffer/C++ 扩展）。②拍快照：--inspect 连接 DevTools，在 Memory 面板拍三张 Heap Snapshot——S1（正常状态基准）、S2（压测/操作后增长）、S3（再操作后）。③对比分析：DevTools 选 S3 vs S2 的 delta，按「Objects allocated between S1 and S2」过滤，看哪些对象只增不减。④查 retainers：点击增长最多的对象类型（如 closures/arrays），看 retainer 链——谁持有了它的引用导致 GC 无法回收。常见泄漏原因：全局 Map/Set 缓存无上限、闭包捕获大对象、事件监听器未移除（EventEmitter 内存泄漏警告）、定时器引用旧对象。⑤修复后验证：再压测确认 heapUsed 稳定。`,
    tags: ["内存泄漏", "Heap Snapshot", "retainers", "诊断流程"],
  },
  {
    id: "ndg-performance-debug-4",
    chapter: "ndg-performance-debug",
    level: 4,
    question: `Node.js 事件循环延迟（Event Loop Lag）如何测量？p99 延迟 50ms 意味着什么？`,
    answer:
      `测量方法：①perf_hooks.monitorEventLoopDelay()——返回 Histogram，实时统计每轮事件循环的延迟分布，可读 p50/p99/max；②手动测量——用 setTimeout(fn, 0) 或 setImmediate(fn)，记录预期触发时间和实际触发时间的差值，差值就是事件循环被阻塞的时长；③clinic doctor 自动测量并可视化。p99 延迟 50ms 意味着：1% 的事件循环轮次被阻塞了 50ms 以上。影响：99% 的请求响应正常，但 1% 的请求延迟会增加 50ms——在高并发下（10000 req/s），每秒有 100 个请求受影响。排查：延迟的根源是同步代码——某段同步逻辑执行了 50ms。用 CPU Profile 在延迟时段采样找到热点函数。常见原因：JSON.parse 超大对象、正则回溯、同步加密、大量循环。解决：拆分到 worker_threads 或分块用 setImmediate 让出。指标阈值参考：p99 < 10ms 健康，10-50ms 需关注，>50ms 需优化。`,
    tags: ["事件循环延迟", "monitorEventLoopDelay", "p99", "阻塞"],
  },
];
