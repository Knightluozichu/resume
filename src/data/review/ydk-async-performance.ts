import type { ReviewQuestion } from "./types";

export const ydkAsyncPerformanceQuestions: ReviewQuestion[] = [
  {
    id: "ydk-async-performance-1",
    chapter: "ydk-async-performance",
    level: 2,
    question: `三个独立网络请求各 200ms，串行和并发各需多久？何时该用哪种？`,
    answer:
      `串行约 600ms（200+200+200，累加），并发约 200ms（三个同时发出，等最慢的，取最大）。判断依据是请求之间有无依赖：有依赖（后一个需要前一个的结果，如用 a 的 id 请求 b）必须串行，无法并发；无依赖（三个独立请求，如并行加载多张图片、多个独立接口）应该用 Promise.all 并发，显著缩短总耗时。串行通用模式是 reduce 串联 Promise 或 for...of + await；并发用 Promise.all。注意 Promise.all 结果数组顺序与传入顺序一致（不按完成先后），且任一 reject 整体 reject。`,
    tags: ["串行", "并发", "Promise.all"],
  },
  {
    id: "ydk-async-performance-2",
    chapter: "ydk-async-performance",
    level: 3,
    question: `Promise.all / allSettled / race / any 各自的语义和适用场景是什么？`,
    answer:
      `Promise.all：全部成功才成功，任一 reject 立即整体 reject，结果顺序与传入一致——适合「全部都要成功」的并行加载。Promise.allSettled：等全部落定（无论成功失败），每个是 {status, value/reason}——适合「即使部分失败也要拿到其余成功结果」，如批量请求容错。Promise.race：取最先落定的（含失败），常用于超时熔断（race([fetch(url), timeout])）。Promise.any：取首个成功的结果，全部失败才 reject——适合「多个源取最快成功的」，如多镜像竞速。选型：全成才成用 all、全落定用 allSettled、最快落定（含失败）用 race、首个成功用 any。`,
    tags: ["Promise.all", "allSettled", "race", "any"],
  },
  {
    id: "ydk-async-performance-3",
    chapter: "ydk-async-performance",
    level: 3,
    question: `为什么微任务密集会「饿死」宏任务？如何用 await 让出主线程？`,
    answer:
      `事件循环规则：每个宏任务执行完后，清空全部微任务，再执行下一个宏任务。Promise 回调进微任务队列，若一个微任务又产生新微任务（如 then 链不断），微任务队列持续非空，事件循环一直处理微任务，宏任务（渲染、IO 回调、setTimeout）被无限推迟——这就是「饿死」，表现为页面卡顿、点击无响应。让出主线程的方法：在长循环中插入 await Promise.resolve()（让出一次微任务轮次）或 await new Promise(r => setTimeout(r, 0))（让出到下一个宏任务），给渲染和其它任务执行机会。本质是主动把控制权交还事件循环。CPU 密集任务更适合用 Web Worker 完全脱离主线程，低优先级任务用 requestIdleCallback。`,
    tags: ["微任务", "宏任务", "让出主线程", "事件循环"],
  },
  {
    id: "ydk-async-performance-4",
    chapter: "ydk-async-performance",
    level: 4,
    question: `任务量大时为什么不能直接 Promise.all 一次性全发？限流池如何工作？`,
    answer:
      `Promise.all 一次发出所有请求，任务量大时会压垮下游服务器、触发限流（429）、占满连接池、甚至被风控封禁。限流池控制并发数：维护进行中任务的 Set，遍历任务时每发起一个加入 Set，当 Set 大小达到并发上限就 await Promise.race(executing) 等任一完成再发下一个，每个任务完成（finally）从 Set 删除并补一个新任务。这样并发数始终不超上限（如 5 个），既并发又不压垮下游。p-limit 等库封装了此模式。配合 allSettled 思想可收集所有结果（含失败）。限流池是处理大批量异步任务（批量爬虫、批量上传、批量接口）的标准模式，平衡吞吐与下游承受力。`,
    tags: ["限流池", "并发控制", "Promise.all"],
  },
];
