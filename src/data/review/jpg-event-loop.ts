import type { ReviewQuestion } from "./types";

export const jpgEventLoopQuestions: ReviewQuestion[] = [
  {
    id: "jpg-event-loop-1",
    chapter: "jpg-event-loop",
    level: 2,
    question: "描述单轮事件循环的完整执行顺序。",
    answer:
      "单轮事件循环顺序：① 从宏任务队列取一个任务执行（如 setTimeout 回调、I/O 回调、UI 事件回调）；② 执行过程中产生的微任务进入微任务队列；③ 该宏任务执行完后，清空微任务队列中的所有微任务（注意是全部，非只取一个），执行中新产生的微任务也本轮清空；④ 必要时渲染——先执行 requestAnimationFrame 回调，再布局（layout）和绘制（paint），约每 16.6ms 一次；⑤ 回到 ① 取下一个宏任务。关键：微任务总在下一个宏任务前全部清空；渲染发生在微任务后、下一宏任务前（非每轮都渲染，受帧率限制）。",
    tags: ["事件循环", "宏任务", "微任务", "渲染"],
  },
  {
    id: "jpg-event-loop-2",
    chapter: "jpg-event-loop",
    level: 3,
    question: "为什么 Promise.then 比 setTimeout 先执行？await 之后的代码属于什么任务？",
    answer:
      "Promise.then 的回调是微任务，setTimeout 的回调是宏任务。事件循环规则是每轮先执行一个宏任务，然后清空所有微任务，再取下一个宏任务。所以即使 setTimeout(fn,0) 和 Promise.resolve().then(fn) 在同一同步代码中注册，then 也会在下一次取宏任务前先执行完。await 之后的代码等价于 .then 回调——async 函数遇到 await 时暂停，把后续代码包装成微任务（Promise.then），等 await 的 Promise 落定后排入微任务队列。所以 await 后的代码是微任务，在当前同步代码后、下一个宏任务前执行。这也是为什么 await 后的代码看似同步实则异步。",
    tags: ["微任务", "宏任务", "Promise.then", "setTimeout", "await"],
  },
  {
    id: "jpg-event-loop-3",
    chapter: "jpg-event-loop",
    level: 3,
    question: "分析经典 async/await 输出顺序题的执行过程。",
    answer:
      "题：console.log('script start'); setTimeout(()=>log('setTimeout'),0); async1(); new Promise(r=>{log('promise');r();}).then(()=>log('then')); log('script end')。其中 async1 含 await async2()。执行：① 同步代码——script start → async1 start → async2（await 前同步）→ promise → script end；② 同步清完，清微任务队列：async1 end（await 后的代码）→ then；③ 取宏任务：setTimeout。输出：script start → async1 start → async2 → promise → script end → async1 end → then → setTimeout。关键：await 前的代码同步执行，await 后的代码是微任务；Promise executor 同步执行，then 是微任务；setTimeout 是宏任务最后。",
    tags: ["事件循环", "输出顺序", "async/await", "面试题"],
  },
  {
    id: "jpg-event-loop-4",
    chapter: "jpg-event-loop",
    level: 4,
    question: "setTimeout(fn, 0) 会立即执行吗？为什么想尽快执行应优先用 queueMicrotask？",
    answer:
      "不会。setTimeout(fn,0) 实际最小延迟约 4ms（HTML5 规范，嵌套时更长），且 fn 进入宏任务队列，必须等当前同步代码和所有微任务清空后才执行。所以 Promise.resolve().then(fn) 比 setTimeout(fn,0) 先执行——then 是微任务，在下一个宏任务前全部清空。「想尽快执行但让出主线程」应优先用 queueMicrotask(fn)（微任务，在当前同步代码后立即执行，不等到下一轮宏任务），除非确实需要等到渲染后再执行（用 requestAnimationFrame 与刷新同步，或 setTimeout 让到下一帧）。选择依据：不需等渲染用微任务（queueMicrotask/Promise.then），需等渲染用 rAF，需延迟到下一轮用 setTimeout。",
    tags: ["setTimeout", "queueMicrotask", "微任务", "rAF", "调度"],
  },
];
