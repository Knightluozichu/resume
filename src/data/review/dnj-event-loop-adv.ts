import type { ReviewQuestion } from "./types";

export const dnjEventLoopAdvQuestions: ReviewQuestion[] = [
  {
    id: "dnj-event-loop-adv-1",
    chapter: "dnj-event-loop-adv",
    level: 2,
    question: "Node.js 事件循环有哪六个阶段？每个阶段处理什么回调？",
    answer:
      "六个阶段：①timers——执行到期的 setTimeout/setInterval 回调；②pending callbacks——执行系统级回调（如 TCP errno、DNS 错误）；③idle/prepare——libuv 内部使用，开发者通常不接触；④poll——最重要的阶段，轮询 I/O 事件，取出完成的 I/O 回调执行，若无 I/O 事件则阻塞等待（除非有到期 timer 或 setImmediate）；⑤check——执行 setImmediate 回调；⑥close callbacks——执行 close 事件回调（如 socket.on('close')）。每个阶段有一个 FIFO 队列，执行完队列中所有回调或达到上限后进入下一阶段。阶段切换之间会清空微任务队列（nextTick + Promise）。",
    tags: ["事件循环", "六阶段", "timers", "poll", "check"],
  },
  {
    id: "dnj-event-loop-adv-2",
    chapter: "dnj-event-loop-adv",
    level: 3,
    question: "process.nextTick、Promise.then、setImmediate、setTimeout 的执行优先级是什么？为什么？",
    answer:
      "优先级从高到低：①process.nextTick——在每阶段切换间最先清空，优先于所有微任务和宏任务；②Promise.then / queueMicrotask——微任务队列，在 nextTick 清空后执行；③setImmediate——宏任务，在 check 阶段执行，属于「下一轮循环」；④setTimeout——宏任务，在 timers 阶段执行，也属于下一轮。原因：nextTick 是 Node.js 特有的、设计用于「当前操作完成后立即执行」的机制，优先级被设为最高以保证语义。Promise 是标准微任务，在 nextTick 之后。setImmediate 和 setTimeout 都是宏任务，但在 I/O 回调后 setImmediate 一定先于 setTimeout 执行（因为 check 阶段在 timers 之前），这也是 setImmediate 的命名含义——「立即（在下一轮 check）执行」。",
    tags: ["事件循环", "nextTick", "Promise", "优先级", "微任务"],
  },
  {
    id: "dnj-event-loop-adv-3",
    chapter: "dnj-event-loop-adv",
    level: 3,
    question: "poll 阶段的阻塞策略是什么？它如何决定是否阻塞、阻塞多久？",
    answer:
      "poll 阶段的阻塞策略：①如果有已完成的 I/O 回调在队列中，执行它们，执行完后进入 check 阶段；②如果队列为空（无 I/O 回调），检查是否有 setImmediate 回调——若有则不阻塞，直接进入 check 阶段；③若无 setImmediate 但有到期的 timer，也不阻塞，进入 timers 阶段；④若无 setImmediate 也无到期 timer，则阻塞等待 I/O 事件到来，阻塞时间设为最近一个 timer 的到期时间（确保 timer 到期时能被唤醒）。这个策略保证了：I/O 事件能及时处理（poll 阻塞等待），timer 不会延迟（阻塞时间受 timer 约束），setImmediate 能在 I/O 后立即执行（不阻塞直接跳 check）。",
    tags: ["事件循环", "poll", "阻塞策略", "timers"],
  },
  {
    id: "dnj-event-loop-adv-4",
    chapter: "dnj-event-loop-adv",
    level: 4,
    question: "为什么递归调用 process.nextTick 会导致 I/O 饥饿？如何避免？",
    answer:
      "process.nextTick 的回调在每阶段切换间清空，且优先级最高。如果在 nextTick 回调中再次调用 process.nextTick，会不断向 nextTick 队列添加新回调，导致队列永远清不完，事件循环无法进入下一个阶段（如 poll），I/O 回调被无限延迟——这就是 I/O 饥饿。Node.js 11+ 虽然对 Promise 微任务做了调整（每阶段切换间执行），但 nextTick 仍然是「清空全部」语义。避免方法：①用 setImmediate 代替递归 nextTick——setImmediate 在 check 队列中每轮只执行一次，会允许事件循环进入其他阶段处理 I/O；②用 queueMicrotask 代替 nextTick——它是标准微任务，语义更清晰；③从根本上避免递归调度，改用迭代或分批处理。核心原则：不要在微任务中无限递归调度微任务。",
    tags: ["事件循环", "nextTick", "I/O饥饿", "setImmediate", "性能"],
  },
];
