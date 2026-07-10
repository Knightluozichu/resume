import type { ReviewQuestion } from "./types";

export const dnjAsyncProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "dnj-async-programming-1",
    chapter: "dnj-async-programming",
    level: 2,
    question: `Promise 有哪三种状态？状态转换的规则是什么？`,
    answer:
      `Promise 有三种状态：①pending——初始态，未决；②fulfilled——已成功，由 resolve() 触发；③rejected——已失败，由 reject() 触发。状态转换规则：只能从 pending → fulfilled 或 pending → rejected，且一旦转换后不可逆（不可回到 pending，也不可在 fulfilled 和 rejected 之间转换）。状态变化后会触发对应的回调：fulfilled 触发 .then(onFulfilled)，rejected 触发 .catch(onRejected)（即 .then(null, onRejected)）。.then 返回的新 Promise 的状态由回调的返回值决定：返回普通值则 fulfilled，返回 Promise 则跟随该 Promise，抛异常则 rejected。这就是错误冒泡的基础——链中任一环节 reject，后续 .then 的 onFulfilled 被跳过，直接到最近的 .catch。`,
    tags: ["Promise", "状态机", "异步编程"],
  },
  {
    id: "dnj-async-programming-2",
    chapter: "dnj-async-programming",
    level: 3,
    question: `async/await 的本质是什么？await 暂停函数时会阻塞事件循环吗？`,
    answer:
      `async/await 本质是 Promise + Generator 的语法糖。async function 总是返回一个 Promise；await expression 等价于：将 expression 包装为 Promise，暂停当前 async 函数的执行（类似 Generator 的 yield），将后续代码作为 .then 回调注册。await 暂停的是「当前 async 函数」的执行，不是事件循环——事件循环继续运行，可以处理其他回调、I/O 事件。当 await 的 Promise settle 后，其后续代码作为微任务进入队列，在下一个微任务清空点恢复执行。这就是「暂停函数不阻塞线程」的原理。关键区别：await 让代码看起来是同步的（顺序书写），但底层仍然是异步的（回调注册 + 微任务调度）。`,
    tags: ["async/await", "Promise", "Generator", "异步编程"],
  },
  {
    id: "dnj-async-programming-3",
    chapter: "dnj-async-programming",
    level: 3,
    question: `Promise.all、Promise.race、Promise.allSettled 有什么区别？分别适用什么场景？`,
    answer:
      `①Promise.all([p1,p2,...])——等全部 fulfilled 后才 fulfilled（结果数组保持顺序），任一 rejected 立即 reject（短路，但其他 Promise 不会取消）。适用：并行加载多个资源，全部成功才继续。②Promise.race([p1,p2,...])——第一个 settle（无论 fulfilled 还是 rejected）的 Promise 决定结果，其余忽略。适用：超时控制——Promise.race([fetch(url), timeout(5000)])，5 秒内没返回则超时。③Promise.allSettled([p1,p2,...])——等全部 settle（无论成功失败），返回 [{status:'fulfilled', value}, {status:'rejected', reason}] 数组，不会短路。适用：批量操作允许部分失败，需要知道每个的结果。三者都不会真正取消 Promise（JS Promise 不可取消），只是决定「等谁、等多久」。`,
    tags: ["Promise", "并发控制", "Promise.all", "Promise.race"],
  },
  {
    id: "dnj-async-programming-4",
    chapter: "dnj-async-programming",
    level: 4,
    question: `为什么在 forEach 中使用 await 不会按预期串行等待？如何正确实现串行和并行？`,
    answer:
      `forEach 的回调是普通函数调用，它不会等待回调中的 Promise resolve——forEach 内部循环执行回调，回调返回的 Promise 被忽略，所以所有迭代几乎同时启动，await 不生效。正确实现：①串行——用 for...of 循环，每次 await 等待前一个完成：\`for (const item of items) { await process(item); }\`；或用 reduce：\`items.reduce((p, item) => p.then(() => process(item)), Promise.resolve())\`。②并行——用 Promise.all + map：\`await Promise.all(items.map(item => process(item)))\`，所有 process 同时启动，等全部完成。③限制并发数——用 p-limit 等库或手写分批。关键认知：map 返回 Promise 数组，Promise.all 接收数组并行等待；for...of 是同步迭代，每次 await 会暂停循环。`,
    tags: ["async/await", "forEach", "串行", "并行", "陷阱"],
  },
];
