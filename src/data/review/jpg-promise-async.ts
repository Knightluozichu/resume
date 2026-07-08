import type { ReviewQuestion } from "./types";

export const jpgPromiseAsyncQuestions: ReviewQuestion[] = [
  {
    id: "jpg-promise-async-1",
    chapter: "jpg-promise-async",
    level: 2,
    question: "Promise 的三态为什么不可逆？这对工程有什么意义？",
    answer:
      "Promise 三态 pending → fulfilled/rejected 一经改变不可逆，fulfilled 与 rejected 不可互转。意义：① 确定性——注册的 then/catch 只触发一次且顺序确定，避免回调被多次调用或状态抖动导致的逻辑混乱；② 可组合——Promise.all/race 等组合器依赖状态稳定性正确聚合；③ 可缓存——已落定的 Promise 可安全传递，注册 then 总会拿到确定结果（终态不再变）。不可逆让 Promise 成为可靠的异步值容器，这是它优于回调的根本——回调无法保证只触发一次、无法保证触发顺序。不可逆使 Promise 可作为「异步操作的不可变快照」安全传递与复用。",
    tags: ["Promise", "三态", "不可逆", "异步"],
  },
  {
    id: "jpg-promise-async-2",
    chapter: "jpg-promise-async",
    level: 3,
    question: "async/await 和 Promise 链是什么关系？await 会阻塞主线程吗？",
    answer:
      "async/await 是 Promise 的语法糖。async 函数始终返回 Promise；await 暂停当前 async 函数执行直到 Promise 落定，期间不阻塞主线程——函数立即返回交出控制权，主线程继续执行后续同步代码、处理其他事件。等 Promise 落定后，事件循环把「await 之后的代码」作为微任务排入队列，在当前同步代码和微任务清空后恢复执行。所以 await 期间页面完全可交互。错误用 try/catch 捕获（等价 .catch）。真正阻塞主线程的是同步 CPU 密集计算（大循环、巨型 JSON.parse），这些要用 Web Worker 拆分，而非 await。",
    tags: ["async/await", "Promise", "语法糖", "微任务", "主线程"],
  },
  {
    id: "jpg-promise-async-3",
    chapter: "jpg-promise-async",
    level: 3,
    question: "串行 await 有什么性能问题？如何修复？",
    answer:
      "const a = await fetchA(); const b = await fetchB(); 是串行的——fetchA 完成后才开始 fetchB，总耗时 = A + B。若两者无依赖，这是浪费。修复：用 Promise.all 并行启动：const [a, b] = await Promise.all([fetchA(), fetchB()])，fetchA 和 fetchB 同时发出，总耗时 ≈ max(A, B)。注意 Promise.all 立即执行传入的所有 Promise（它们已被调用），然后 await 等待全部完成。原则：无依赖的异步操作应并行（Promise.all），有依赖的才串行 await。这是异步性能优化的核心。但要权衡——若操作有速率限制或资源竞争，仍需控制并发数。",
    tags: ["Promise.all", "并行", "串行", "性能优化"],
  },
  {
    id: "jpg-promise-async-4",
    chapter: "jpg-promise-async",
    level: 4,
    question: "Promise.all、race、allSettled、any 四个组合器有何区别？各自适用场景？",
    answer:
      "all：全部成功才成功，任一失败立即失败（短路），返回所有结果的数组。适用——多个无依赖请求需全部成功才继续。race：第一个落定（无论成败）即返回，其余忽略。适用——超时控制（race 一个 setTimeout 的 reject）。allSettled：等全部落定，不短路，返回每个的状态数组（{status,value/reason}）。适用——批量操作需知道每个结果，不因个别失败中断。any：第一个成功即返回（短路），全部失败才失败（AggregateError）。适用——多源竞速取最快成功者。记忆：all 要全成、race 抢第一、allSettled 全等、any 抢首个成功。失败行为：all/any 短路失败，race 不保证成败，allSettled 永不失败。",
    tags: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any", "组合器"],
  },
];
