import type { ReviewQuestion } from "./types";

export const ndbgProductionDebugQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-production-debug-1",
    chapter: "ndbg-production-debug",
    level: 2,
    question: "生产环境调试与开发环境调试的核心差异是什么？各自依赖什么工具？",
    answer:
      "核心差异在于约束条件：开发环境可以随意重启、设断点、改代码重跑，以「实时交互」为主（DevTools 断点、Heap Snapshot、CPU Profiler）；生产环境不能暂停服务（断点阻塞事件循环）、不能随意重启（影响用户）、问题可能偶发难复现，以「事后分析」为主。生产环境依赖三类工具：①结构化日志（pino/winston 输出 JSON + request ID 关联），相当于黑匣子记录每个请求的操作链；②APM 监控（PM2/New Relic/Datadog 采集 CPU/内存/事件循环延迟趋势），相当于塔台雷达从外部观察；③postmortem 分析（--abort-on-uncaught-exception 生成 core dump + llnode 检查崩溃瞬间的堆状态），相当于残骸分析。三层证据交叉验证还原事故根因。开发环境用 DevTools/Inspector Protocol 交互式调试，生产环境用日志/APM/--report 事后分析。",
    tags: ["生产调试", "开发调试", "APM", "postmortem"],
  },
  {
    id: "ndbg-production-debug-2",
    chapter: "ndbg-production-debug",
    level: 3,
    question: "--report 诊断报告包含哪些信息？它在生产排障中解决什么问题？",
    answer:
      "--report 报告包含：①header——Node 版本、平台、PID、触发原因（fatalerror/manual/signal）；②javascriptStack——崩溃时的 JS 调用栈；③nativeStack——C++ 层调用栈；④javascriptHeap——堆内存详情（total/used/limit/fragmentation）；⑤libuv——事件循环状态（active handles 如未关闭的 Timer/Socket/FS、active requests）；⑥environmentVariables——环境变量；⑦os/environment——操作系统信息。它在生产排障中解决的问题：①OOM 崩溃——看 javascriptHeap 确认内存使用量，看 active handles 找未关闭的资源；②事件循环卡死——看 nativeStack 找 C++ 层阻塞，看 libuv 找堆积的请求；③内存泄漏——对比多次 report 的 javascriptHeap 趋势，看堆是否持续增长；④未捕获异常崩溃——看 javascriptStack 定位崩溃位置。--report 的优势是开销极小（只在触发时生成）且不阻塞事件循环，适合生产环境。通过 --report-on-fatalerror 可以在进程崩溃时自动生成。",
    tags: ["--report", "诊断报告", "OOM", "事件循环"],
  },
  {
    id: "ndbg-production-debug-3",
    chapter: "ndbg-production-debug",
    level: 3,
    question: "结构化日志在生产调试中起什么作用？如何用 request ID 关联一个请求的全部日志？",
    answer:
      "结构化日志的作用：以 JSON 格式输出每条日志（而非人类可读的文本），便于日志系统（ELK/Loki/Datadog）采集、索引和检索。在生产排障时，可通过字段过滤快速定位问题请求。用 request ID 关联的方法：①在请求入口（中间件）生成或提取 request ID（如从 x-request-id 头获取，没有则 crypto.randomUUID() 生成）；②用 pino 的 child logger 绑定 request ID：const reqLog = logger.child({ requestId, path, method })；③后续该请求的所有日志都通过 reqLog 输出，自动携带 requestId 字段；④在 ELK 中搜索 requestId:abc-123 即可看到该请求从入口到响应的完整日志链——包括数据库查询、外部 API 调用、错误信息等。优势：不需要在每行 console.log 中手动拼接 requestId，且日志结构统一便于自动化告警（如某个 requestId 的日志中出现 error 级别则触发告警）。",
    tags: ["结构化日志", "request ID", "pino", "ELK", "日志关联"],
  },
  {
    id: "ndbg-production-debug-4",
    chapter: "ndbg-production-debug",
    level: 4,
    question: "postmortem 分析的完整流程是什么？为什么生产环境出问题不能直接用 --inspect 远程调试？",
    answer:
      "postmortem 流程：①启动时加 --abort-on-uncaught-exception，进程遇到未捕获异常时 abort 并生成 core dump（配合 ulimit -c unlimited 确保不被截断）；②用 lldb -c core.node.server.12345 加载 core dump；③在 LLDB 中加载 llnode 插件（plugin load llnode.so）；④用 v8 bt 查看 JS 调用栈、v8 bt full 查看栈帧中的变量值、v8 findjsobjs 列出堆中的 JS 对象、v8 findjsinstances -d 10 String 找最多的 10 个 String 对象。也可以用 --heapsnapshot-signal=SIGUSR2 在 OOM 前手动发信号拍堆快照。不能直接用 --inspect 远程调试的原因：①安全风险——Inspector Protocol 可执行任意代码（Runtime.evaluate），端口被未授权访问等于服务器被完全控制；②断点暂停阻塞事件循环——一个断点可能导致整个服务不可用；③WebSocket 不加密——命令可被中间人篡改。正确做法：用 SSH 隧道（ssh -L 9229:localhost:9229 server）隔离，或用 --report/postmortem 事后分析替代在线断点。",
    tags: ["postmortem", "llnode", "core dump", "--inspect安全", "生产环境"],
  },
];
