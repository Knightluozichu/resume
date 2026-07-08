import type { ReviewQuestion } from "./types";

export const ndgEventLoopQuestions: ReviewQuestion[] = [
  {
    id: "ndg-event-loop-1",
    chapter: "ndg-event-loop",
    level: 2,
    question: "Node.js 事件循环的六个阶段分别是什么？每个阶段处理什么回调？",
    answer:
      "①timers：执行 setTimeout/setInterval 到期的回调；②pending callbacks：执行上一轮循环延迟的 I/O 回调（如 TCP 错误回调）；③idle/prepare：仅内部使用，开发者不接触；④poll：最重要的阶段——轮询 I/O 事件，取出完成的 I/O 回调执行，若无 I/O 则根据 timers 是否到期决定阻塞或跳过；⑤check：执行 setImmediate 回调；⑥close callbacks：执行 close 事件回调（如 socket.on('close')）。每个阶段有自己的 FIFO 队列，阶段切换之间清空微任务队列（process.nextTick 优先于 Promise.then）。",
    tags: ["事件循环", "六阶段", "poll"],
  },
  {
    id: "ndg-event-loop-2",
    chapter: "ndg-event-loop",
    level: 3,
    question: "process.nextTick、Promise.then、setImmediate、setTimeout 的执行顺序是什么？为什么？",
    answer:
      "同一轮中：process.nextTick > Promise.then > setTimeout/setImmediate（取决于上下文）。原因：nextTick 和 Promise 是微任务，在每个阶段切换之间清空，nextTick 队列优先于 Promise 微任务队列。setTimeout 和 setImmediate 是宏任务：setTimeout 在 timers 阶段、setImmediate 在 check 阶段。在主模块中两者顺序不确定（取决于 1ms 定时器精度）；但在 I/O 回调中 setImmediate 一定先于 setTimeout（因为 I/O 回调在 poll 阶段执行，下一阶段就是 check，再下一轮才是 timers）。这就是推荐在 I/O 回调中用 setImmediate 而非 setTimeout(0) 的原因。",
    tags: ["微任务", "宏任务", "nextTick", "setImmediate"],
  },
  {
    id: "ndg-event-loop-3",
    chapter: "ndg-event-loop",
    level: 3,
    question: "poll 阶段在什么情况下会阻塞？什么情况下不会？",
    answer:
      "poll 阶段的行为取决于两个条件：①如果没有定时器到期（timers 队列为空）且没有 setImmediate 待执行，则 poll 会阻塞等待 I/O 事件到来（让进程不空转）；②如果有定时器即将到期，poll 会计算到最近 timer 的时间差，阻塞最多这么久就返回（确保 timer 能准时执行）；③如果 poll 队列为空且 check 队列有 setImmediate，则不阻塞直接跳到 check 阶段；④如果 poll 队列处理完后仍有回调，会在当前阶段继续执行直到清空或达到限制，再进入下一阶段。这种设计让 Node.js 在无 I/O 时不浪费 CPU，有 I/O 时立即响应。",
    tags: ["poll", "阻塞", "timers"],
  },
  {
    id: "ndg-event-loop-4",
    chapter: "ndg-event-loop",
    level: 4,
    question: "一段 CPU 密集的同步代码运行 5 秒，会对事件循环造成什么影响？如何解决？",
    answer:
      "同步代码在主线程上执行，会阻塞事件循环整整 5 秒。这 5 秒内：所有 I/O 回调无法执行（poll 阶段进不去）、定时器无法触发（timers 阶段进不去）、新连接无法接受、已有请求无法响应。从外部看服务器就像「卡死了」。解决方案：①用 worker_threads 把 CPU 密集任务放到独立线程执行，主线程通过 postMessage 接收结果；②把大任务拆分成小块，用 setImmediate 让出事件循环（process chunk → setImmediate(next chunk)）；③如果必须同步执行，用 cluster 启动多进程，一个 Worker 阻塞不影响其他 Worker 处理请求。核心原则：事件循环是共享资源，任何一段同步代码都是全局阻塞点。",
    tags: ["阻塞", "worker_threads", "CPU密集", "性能"],
  },
];
