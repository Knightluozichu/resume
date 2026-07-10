import type { ReviewQuestion } from "./types";

export const ndbgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-learning-map-1",
    chapter: "ndbg-learning-map",
    level: 2,
    question: `全书六阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `调试基础（Inspector Protocol/DevTools）→ 内存诊断（内存泄漏/堆快照）→ CPU 分析（CPU Profiling/火焰图）→ 异步追踪（AsyncHooks/生产调试）→ 总复习。顺序由依赖决定：上层依赖下层。没有 Inspector Protocol 就无法建立调试通道；没有 DevTools 断点就无法交互式诊断；没有内存和 CPU 的静态分析方法就无法定位资源类问题；没有异步追踪就无法理清跨 tick 的调用链；没有生产调试工具链就无法在不可重启的线上环境排障。先有「能通信」，再有「能交互」，然后「能定位资源」，接着「能追异步」，最后「能线上排障」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "ndbg-learning-map-2",
    chapter: "ndbg-learning-map",
    level: 2,
    question: `为什么 Node.js 调试需要专门的工具链，不能只靠 console.log？`,
    answer:
      `console.log 有三个致命局限：①侵入式——每次改动都要重启服务，生产环境不可能重启；②静态——只能打印那一刻的值，无法暂停执行上下文去检查完整的变量快照和调用栈；③无结构——面对内存泄漏（哪个对象没被回收）、CPU 热点（哪个函数占比最高）、异步断裂（哪个 Promise 链丢了上下文）这类运行时问题，console.log 完全无能为力。Inspector Protocol 提供了非侵入式的远程调试通道，DevTools 提供了断点/Watch/调用栈的交互能力，Heap Snapshot 提供了对象级的内存显微镜，CPU Profiler 提供了函数级的性能采样仪。这些工具组合起来才构成了完整的调试能力。`,
    tags: ["console.log", "工具链", "调试"],
  },
  {
    id: "ndbg-learning-map-3",
    chapter: "ndbg-learning-map",
    level: 3,
    question: `用「一次线上故障排查」的完整调试旅程描述全书主线。`,
    answer:
      `①建立调试通道（第2章）——node --inspect 启动，Chrome DevTools 通过 WebSocket 连接；②交互断点诊断（第3章）——Sources 面板设断点，暂停后用 Scope/Watch/Call Stack 检查上下文；③拍堆快照定位内存（第4-5章）——三快照法 + Comparison 视图找泄漏对象，Retainers 追溯引用链；④跑 Profiler 定位 CPU（第6-7章）——Profiler 采样生成 .cpuprofile，0x/clinic.js 转火焰图找最宽栈帧；⑤追 AsyncHooks 理清异步（第8章）——asyncId/triggerAsyncId 追踪跨 tick 调用链；⑥用 --report/APM 做生产排障（第9章）——结构化日志 + APM 监控 + postmortem 分析。一个故障贯穿全部六个工具链。`,
    tags: ["架构", "调试旅程", "故障排查"],
  },
  {
    id: "ndbg-learning-map-4",
    chapter: "ndbg-learning-map",
    level: 4,
    question: `会加 console.log 和真正掌握 Node.js 调试工具链有什么本质区别？`,
    answer:
      `会加 console.log 只是表层——往代码里塞打印语句然后重启，照教程就会。真正难点在工具链：Inspector Protocol 的三层通信架构（HTTP 发现 → WebSocket 通道 → V8 Inspector 域）、条件断点和日志断点的场景选择、Heap Snapshot 的 Shallow/Retained Size 区别和三快照法、CPU Profiler 的采样原理和 Self/Total Time 区分、火焰图的宽度即热点原则、AsyncHooks 的 asyncId 父子关系和 AsyncLocalStorage 上下文传递、--report 和 postmortem 的事后分析。这些是「线上事故已经发生」时才需要的硬核能力，也是中高级 Node.js 工程师的分水岭。把 console.log 当终点的人遇到生产事故只能干瞪眼；把工具链当核心的人才能在故障时快速定位根因。`,
    tags: ["调试", "工具链", "工程思维"],
  },
];
