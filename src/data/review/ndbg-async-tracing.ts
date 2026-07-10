import type { ReviewQuestion } from "./types";

export const ndbgAsyncTracingQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-async-tracing-1",
    chapter: "ndbg-async-tracing",
    level: 2,
    question: `AsyncHooks 的 asyncId 和 triggerAsyncId 分别是什么？它们如何解决异步调用链断裂问题？`,
    answer:
      `asyncId 是每个异步资源（Promise、Timer、FS 操作、HTTP 请求等）的唯一标识符，从 1 开始递增。triggerAsyncId 是创建当前异步资源的「父」异步资源的 asyncId——即「是谁触发了这个异步操作」。它们解决异步调用链断裂的原理：同步代码中调用栈天然维护调用关系（函数 A 调用 B，B 的栈帧在 A 之上），但异步操作切换时调用栈是全新的（Promise.then 的回调栈里看不到创建 Promise 的代码）。AsyncHooks 通过 asyncId → triggerAsyncId 的父子关系，构建了一棵「异步调用树」——不管异步操作跨了多少个 tick，都能通过 triggerAsyncId 链追溯到最初的发起者。例如 HTTP 回调（asyncId=5）中创建了 fs.readFile（asyncId=9, triggerAsyncId=5），fs 回调中创建了 Promise（asyncId=11, triggerAsyncId=9），通过 11→9→5 的链就能知道这个 Promise 最终是由 HTTP 请求 5 触发的。`,
    tags: ["asyncId", "triggerAsyncId", "异步调用链", "AsyncHooks"],
  },
  {
    id: "ndbg-async-tracing-2",
    chapter: "ndbg-async-tracing",
    level: 3,
    question: `AsyncLocalStorage 如何实现跨异步边界的上下文传递？相比手动参数透传有什么优势？`,
    answer:
      `AsyncLocalStorage 的原理：①als.run(store, callback) 在当前执行上下文（当前 asyncId）上绑定 store；②后续在 callback 中创建的异步资源会继承 triggerAsyncId 的 store（沿 asyncId → triggerAsyncId 链向上查找）；③als.getStore() 在任意异步回调中都能查找到最近的祖先上下文中绑定的 store。这实现了「请求级上下文」的自动传递——一个 HTTP 请求中所有同步和异步代码都能通过 als.getStore() 获取该请求的上下文（如 requestId、userId）。相比手动参数透传的优势：①非侵入式——不需要修改函数签名加 requestId 参数，老代码无需改动；②不遗漏——手动透传容易在某个中间层忘记传参，AsyncLocalStorage 自动传递不会断；③可组合——多个中间件可以嵌套 als.run 叠加上下文。Node.js 16+ 对 AsyncLocalStorage 做了性能优化，开销约 1-3%，可在生产环境长期开启。`,
    tags: ["AsyncLocalStorage", "上下文传递", "异步边界", "请求级上下文"],
  },
  {
    id: "ndbg-async-tracing-3",
    chapter: "ndbg-async-tracing",
    level: 3,
    question: `createHook 的四个回调（init/before/after/destroy）分别在什么时候触发？各自有什么用途？`,
    answer:
      `①init(asyncId, type, triggerAsyncId, resource)——异步资源创建时触发，type 是资源类型（如 PROMISE/TIMER/FSREQCallback/HTTPINCOMINGMESSAGE），可在此记录异步资源的创建信息和父子关系。用途：建立异步调用树、追踪资源创建源头。②before(asyncId)——异步回调即将执行前触发。用途：标记异步回调开始、记录执行开始时间。③after(asyncId)——异步回调执行完毕后触发。用途：标记异步回调结束、计算执行耗时。④destroy(asyncId)——异步资源销毁时触发。用途：清理追踪记录、检测资源是否被正确释放。典型用法：init 时把 asyncId 存入 Map（记录创建栈和 triggerAsyncId），before/after 时记录执行时间，destroy 时从 Map 删除。通过分析 Map 中长时间不 destroy 的资源，可发现泄漏的 Promise/Timer。注意：destroy 可能在进程退出前不触发（V8 GC 时机不确定），不能完全依赖它做清理计数。`,
    tags: ["createHook", "init", "before", "after", "destroy", "生命周期"],
  },
  {
    id: "ndbg-async-tracing-4",
    chapter: "ndbg-async-tracing",
    level: 4,
    question: `AsyncHooks 的性能开销有多大？生产环境使用时有哪些最佳实践？`,
    answer:
      `性能开销：全量 AsyncHooks（四个回调都注册）可能导致 5-15% 的性能下降——Node.js 应用每秒创建数千个异步资源（每个 Promise、Timer、I/O 回调），每个资源都触发 init 回调，before/after 在每次回调执行时各触发一次，开销累积显著。AsyncLocalStorage（Node.js 16+）做了优化，开销约 1-3%，可长期开启。生产环境最佳实践：①仅在排障时临时开启全量 AsyncHooks，用 if (process.env.DEBUG_ASYNC) 守卫按需开关；②AsyncLocalStorage 可长期开启，用于请求级上下文传递（替代参数透传）；③避免在 init 回调中做重操作——init 触发频率最高（每个异步资源创建都触发），不要在其中做 JSON.stringify、网络请求、文件 I/O；④避免在 init 中 new Error().stack 获取调用栈——堆栈序列化开销极大，每个异步资源都做会导致严重性能问题；⑤用 destroy 回调检测泄漏时设置超时兜底——V8 的 GC 时机不确定，destroy 可能延迟很久，不能完全依赖它。`,
    tags: ["AsyncHooks", "性能开销", "最佳实践", "生产环境"],
  },
];
